# python make.py <رقم> — بيقص الصوت، يبني الخطة (plan.js) والميكس (mix_<n>.wav)
import sys, json, subprocess, wave, re
import numpy as np
from shorts import SHORTS
SR = 48000
N_ID = int(sys.argv[1]); S = SHORTS[N_ID]
LINES = json.load(open('lines.json', encoding='utf-8'))
HOOKS = {h['n']: h for h in json.load(open('../source/hooks/hooks.json', encoding='utf-8'))}
SRC = {'A': '../../Adult_App/source/voice/VOICE_OVER.wav', 'P': '../../App Video/source/voice/VOICE_OVER.wav'}
_cache = {}
def load(p, ch=1, af=None):
    key = (p, ch, af)
    if key not in _cache:
        cmd = ['ffmpeg', '-v', 'error', '-i', p] + (['-af', af] if af else []) + ['-f', 'f32le', '-ac', str(ch), '-ar', str(SR), '-']
        _cache[key] = np.frombuffer(subprocess.check_output(cmd), dtype='<f4').reshape(-1, ch).copy()
    return _cache[key]
hop = int(0.005 * SR)
def trim(y):
    k = len(y) // hop; d = 20 * np.log10(np.sqrt((y[:k * hop].reshape(k, hop) ** 2).mean(1)) + 1e-9)
    on = np.where(d > -42)[0]
    a = max(0, on[0] - 3) * hop; b = min(len(y), (on[-1] + 5) * hop)
    y = y[a:b].copy(); f = int(0.01 * SR); y[:f] *= np.linspace(0, 1, f); y[-f:] *= np.linspace(1, 0, f)
    return y, a / SR
def active_rms(x):
    h = int(0.02 * SR); n = len(x) // h; r = np.sqrt((x[:n * h].reshape(n, h) ** 2).mean(1))
    a = r[20 * np.log10(r + 1e-9) > -40]; return np.sqrt((a ** 2).mean()) if len(a) else 1e-3
def level(x): return x * (10 ** (-15.5 / 20) / active_rms(x))

def cut_vo(src, line, w0, w1):
    L = LINES[src][line]; words = L['t'].split(); wt = L['w']
    w1 = len(words) - 1 if w1 is None else w1
    t0 = (wt[w0] if wt[w0] is not None else L['start']) - 0.08
    nxt = wt[w1 + 1] if w1 + 1 < len(words) and wt[w1 + 1] is not None else None
    t1 = (nxt - 0.02) if nxt is not None else L['end'] + 0.15
    y, off = trim(load(SRC[src])[int(t0 * SR):int(t1 * SR), 0])
    rel = []
    for k in range(w0, w1 + 1):
        v = wt[k]; rel.append(None if v is None else max(0.0, round(v - t0 - off, 3)))
    for k in range(len(rel)):                     # كلمات من غير توقيت: بين اللي قبلها واللي بعدها
        if rel[k] is None: rel[k] = rel[k - 1] + 0.25 if k else 0.0
    text = ' '.join(words[w0:w1 + 1])
    return level(y), text, rel

def hook_clip(n):
    y = load(f'../source/hooks/hook{n:02d}.wav')[:, 0]
    text = HOOKS[n]['text']; words = text.split(); d = len(y) / SR
    wgt = [len(w) + (5 if '...' in w else 0) for w in words]; tot = sum(wgt); acc = 0; rel = []
    for w in wgt: rel.append(round(0.05 + (d - 0.3) * acc / tot, 3)); acc += w
    return level(y), text, rel

# ── الخطة ──
fmt = S['fmt']; vo, sfx = [], []
def fx(name, t, g=1.0): sfx.append({'name': name, 't': round(t, 3), 'gain': g})
t = 0.35 if fmt == 'C' else 0.25
y, text, rel = hook_clip(S['hook'])
hook = {'t': t, 'dur': round(len(y) / SR, 3), 'text': text, 'wt': [round(t + r, 3) for r in rel]}
clips = [(t, y)]
hook_end = t + len(y) / SR
if fmt == 'C':
    fx('lowhit', 0.2, 0.7)
    impact = hook_end + 0.15; fx('reverse', impact - 0.9, 0.8); fx('impact', impact, 1.0)
    t = impact + 1.0
elif fmt == 'A':
    fx('whoosh', 0.1, 0.8); fx('slap', t + 0.05, 0.8)
    impact = hook_end + 0.2; fx('whoosh_big', impact - 0.2, 0.9); fx('lowhit', impact, 0.6)
    t = impact + 1.1
else:
    fx('lowhit', 0.12, 0.8)
    impact = hook_end + 0.1; fx('whoosh_big', impact - 0.25, 0.9)
    t = impact + 0.2
for seg in S['segs']:
    y, text, rel = cut_vo(*seg['vo'])
    d = len(y) / SR
    item = {'t': round(t, 3), 'dur': round(d, 3), 'text': text, 'wt': [round(t + r, 3) for r in rel], 'shot': seg['shot'], 'focus': seg.get('focus')}
    item['then'] = [{'t': round(t + rel[k] - 0.1, 3), 'shot': sh, 'focus': fo} for k, sh, fo in seg.get('then', [])]
    item['chips'] = [{'t': round(t + rel[k], 3), 'text': c} for k, c in seg.get('chips', [])]
    vo.append(item); clips.append((t, y))
    fx('pop', t + 0.45, 0.8)
    for th in item['then']: fx('glitch' if fmt == 'B' else 'pop', th['t'] + 0.3, 0.7)
    for c in item['chips']: fx('swish', c['t'], 0.7)
    t += d + 0.3
# ── الكارت الأخير + «نزّل اتزان النهارده» ──
cta_t = t + 0.25
y, text, rel = cut_vo(S['track'], 41 if S['track'] == 'A' else 57, 0, None)   # الجملة كاملة
fx('whoosh_big', cta_t - 0.35, 0.9); fx('lowhit', cta_t, 0.7)
cv = cta_t + 0.45
cw = text.split()
cta = {'t': round(cta_t, 3), 'voT': round(cv, 3), 'dur': round(len(y) / SR, 3), 'text': ' '.join(cw[:3]).replace('...', ''), 'rest': ' '.join(cw[3:]).rstrip('.'), 'wt': [round(cv + r, 3) for r in rel]}
clips.append((cv, y)); fx('pop', cv + rel[0], 0.8)
END = round(cv + len(y) / SR + 0.9, 2)
plan = {'id': N_ID, 'fmt': fmt, 'track': S['track'], 'label': S['label'], 'title': S['title'], 'ambient': S['ambient'],
        'hook': hook, 'impact': round(impact, 3), 'vo': vo, 'cta': cta, 'sfx': sfx, 'end': END}
json.dump(plan, open(f'plan_{N_ID}.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
open('plan.js', 'w', encoding='utf-8').write('window.PLAN=' + json.dumps(plan, ensure_ascii=False) + ';')

# ── الميكس ──
N = int((END + 0.3) * SR)
VOICE = np.zeros(N, np.float32)
for t0, y in clips:
    i = int(t0 * SR); L = min(len(y), N - i); VOICE[i:i + L] += y[:L]
def mavg(x, w):
    c = np.cumsum(np.concatenate([np.zeros(w), x, np.zeros(w)])); r = (c[w:] - c[:-w]) / w
    return r[w // 2: w // 2 + len(x)]
venv = np.clip(mavg(np.abs(VOICE), int(0.05 * SR)) / 0.03, 0, 1)
duck = 1 - 0.45 * mavg(venv, int(0.15 * SR))
HITS = ('impact', 'lowhit', 'stinger', 'boom')
G = {'impact': 1.0, 'lowhit': 0.8, 'reverse': 0.6, 'whoosh_big': 1.6, 'whoosh': 0.9, 'slap': 0.8, 'pop': 0.55, 'glitch': 0.45, 'swish': 0.5}
out = np.zeros((N, 2), np.float32); BED = np.zeros((N, 2), np.float32)
for s in sfx:
    x = load(f'sfx/{s["name"]}.wav', 2) * G[s['name']] * s['gain']; i = int(s['t'] * SR); L = min(len(x), N - i)
    if L <= 0: continue
    (out if s['name'] in HITS else BED)[i:i + L] += x[:L]
if fmt == 'C':   # درون مكتوم لحد الصدمة
    dr = load('sfx/drone.wav', 2); dn = int(impact * SR)
    env = np.ones(dn); env[:int(0.6 * SR)] = np.linspace(0, 1, int(0.6 * SR)); env[-int(0.05 * SR):] = np.linspace(1, 0, int(0.05 * SR))
    BED[:dn] += dr[:dn] * env[:, None] * 0.5
out += BED * duck[:, None] + np.stack([VOICE, VOICE], 1)
out[-int(0.4 * SR):] *= np.linspace(1, 0, int(0.4 * SR))[:, None]
out = out / max(1.0, np.abs(out).max() / 0.89)
with wave.open('mix_raw.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(out, -1, 1) * 32767).astype('<i2').tobytes())
meas = subprocess.run(['ffmpeg', '-hide_banner', '-i', 'mix_raw.wav', '-af', 'loudnorm=I=-14:TP=-1:print_format=json', '-f', 'null', '-'], capture_output=True, text=True).stderr
m = json.loads(meas[meas.rindex('{'):meas.rindex('}') + 1])
af = f"volume={-14.0 - float(m['input_i']):.2f}dB,alimiter=limit=0.79:attack=2:release=60:level=disabled"
subprocess.check_call(['ffmpeg', '-y', '-v', 'error', '-i', 'mix_raw.wav', '-af', af, '-ar', '48000', f'mix_{N_ID}.wav'])
print(f'short {N_ID} fmt {fmt}: hook {hook["dur"]}s, impact {impact:.2f}, cta {cta_t:.2f}, end {END}')
for v in vo: print('  vo', v['t'], v['dur'], v['text'])
