"""
vo.py epNN — يجمّع voice/line_NNN.wav (أو line_NNN_lite.wav) في VOICE_OVER.wav بفواصل مقصودة،
ويطلّع times.js بتوقيت كل كلمة (whisper لكل سطر لوحده + مطابقة حروف مع النص).
الفواصل: epNN/gaps.txt اختياري (سطر لكل فاصل بعد السطر رقم i: "i ثواني")، الافتراضي 0.32.
"""
import json, os, re, sys, wave, difflib, subprocess
import numpy as np
os.environ.setdefault('HF_HUB_OFFLINE', '1')
sys.stdout.reconfigure(encoding='utf-8')
ep = sys.argv[1]; root = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', ep)
SR = 24000
lines = [re.sub(r'\s*\[[^\]]+\]\s*', ' ', l).strip() for l in open(os.path.join(root, 'script.txt'), encoding='utf-8') if l.strip()]
gaps = {}
gp = os.path.join(root, 'gaps.txt')
if os.path.exists(gp):
    for l in open(gp):
        if l.strip(): i, g = l.split(); gaps[int(i)] = float(g)
LEAD, DEF, TAIL = 0.25, 0.32, 0.6

def load(i):
    for nm in (f'line_{i:03d}.wav', f'line_{i:03d}_lite.wav'):
        p = os.path.join(root, 'voice', nm)
        if os.path.exists(p):
            w = wave.open(p); assert w.getframerate() == SR
            return np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
    sys.exit(f'ناقص السطر {i}')

def trim(y):
    hop = SR // 100; n = len(y) // hop
    rms = np.sqrt((y[:n * hop].reshape(n, hop) ** 2).mean(1)); on = np.where(20 * np.log10(rms + 1e-9) > -45)[0]
    a = max(0, on[0] * hop - int(0.04 * SR)); b = min(len(y), (on[-1] + 1) * hop + int(0.08 * SR))
    y = y[a:b].copy(); f = int(0.01 * SR); y[:f] *= np.linspace(0, 1, f); y[-f:] *= np.linspace(1, 0, f)
    return y

parts, spans, t = [np.zeros(int(LEAD * SR), np.float32)], [], LEAD
for i in range(1, len(lines) + 1):
    y = trim(load(i)); spans.append((t, t + len(y) / SR)); parts.append(y); t += len(y) / SR
    g = TAIL if i == len(lines) else gaps.get(i, DEF)
    parts.append(np.zeros(int(g * SR), np.float32)); t += g
vo = np.concatenate(parts)
out = os.path.join(root, 'VOICE_OVER.wav')
with wave.open(out, 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(vo, -1, 1) * 32767).astype('<i2').tobytes())
dur = len(vo) / SR
print(f'VOICE_OVER {dur:.2f}s')

def norm(s):
    s = re.sub(r'[ً-ْـ]', '', s)
    s = re.sub('[أإآا]', 'ا', s).replace('ى', 'ي').replace('ة', 'ه').replace('ؤ', 'و').replace('ئ', 'ي')
    return re.sub(r'[^ء-ي0-9]', '', s)

from faster_whisper import WhisperModel
m = WhisperModel('small', device='cpu', compute_type='int8', cpu_threads=8, local_files_only=True)
res = []
for i, l in enumerate(lines):
    s0, s1 = spans[i]; y = vo[int(s0 * SR):int(s1 * SR)]
    tmp = os.path.join(root, '_seg.wav')
    with wave.open(tmp, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((y * 32767).astype('<i2').tobytes())
    segs, _ = m.transcribe(tmp, language='ar', word_timestamps=True, beam_size=5, condition_on_previous_text=False)
    wc, wt = [], []
    for sg in segs:
        for w in sg.words:
            for ch in norm(w.word): wc.append(ch); wt.append(w.start)
    words = l.split(); sc, sw = [], []
    for k, w in enumerate(words):
        for ch in norm(w): sc.append(ch); sw.append(k)
    mt = {}
    for a, b, n in difflib.SequenceMatcher(None, sc, wc, autojunk=False).get_matching_blocks():
        for k in range(n): mt[a + k] = b + k
    wts = [None] * len(words)
    for k in range(len(sc)):
        if k in mt and wts[sw[k]] is None: wts[sw[k]] = round(s0 + wt[mt[k]], 2)
    wts[0] = round(s0, 2)
    for k in range(1, len(wts)):                     # كلمة ماتطابقتش ← بين جيرانها
        if wts[k] is None or wts[k] < wts[k - 1]:
            nx = next((wts[j] for j in range(k + 1, len(wts)) if wts[j] and wts[j] > wts[k - 1]), s1 - 0.15)
            wts[k] = round(wts[k - 1] + (nx - wts[k - 1]) / 2, 2)
    cov = len(mt) / max(1, len(sc))
    print(f'{i + 1:2d} {s0:6.2f}-{s1:6.2f} cov {cov:.2f}  {l[:45]}')
    res.append({'start': round(s0, 2), 'end': round(s1, 2), 'w': wts, 't': l})
os.remove(tmp)
open(os.path.join(root, 'times.js'), 'w', encoding='utf-8').write('window.TIMES=' + json.dumps({'duration': round(dur, 2), 'lines': res}, ensure_ascii=False) + ';')
print('times.js ok')
