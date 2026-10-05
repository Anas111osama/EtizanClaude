import json, re, difflib, subprocess
tr = json.load(open('transcript.json', encoding='utf-8'))
js = open('script.js', encoding='utf-8').read()
lines = re.findall(r"\{ t: '([^']+)'", js)
def norm(s):
    s = re.sub(r'[ً-ْـ]', '', s)
    s = re.sub('[أإآا]', 'ا', s).replace('ى', 'ي').replace('ة', 'ه').replace('ؤ', 'و').replace('ئ', 'ي')
    return re.sub(r'[^ء-ي0-9]', '', s)
# whisper chars → word times
wc, wt = [], []
for seg in tr:
    for w in seg['words']:
        n = norm(w['w'])
        for ch in n: wc.append(ch); wt.append((w['s'], w['e']))
sc, sl = [], []
for i, l in enumerate(lines):
    for ch in norm(l): sc.append(ch); sl.append(i)
sm = difflib.SequenceMatcher(None, sc, wc, autojunk=False)
m = {}
for a, b, n in sm.get_matching_blocks():
    for k in range(n): m[a + k] = b + k
# وقت كل كلمة في النص = بداية أول حرف فيها اتطابق
wordtimes = []
for i, l in enumerate(lines):
    ks = [k for k in range(len(sc)) if sl[k] == i]
    pos = 0; wts = []
    for w in l.split():
        n = len(norm(w)); chunk = ks[pos:pos + n]; pos += n
        hit = [m[k] for k in chunk if k in m]
        wts.append(round(wt[hit[0]][0], 2) if hit else None)
    wordtimes.append(wts)
out = []
for i in range(len(lines)):
    idx = [k for k in range(len(sc)) if sl[k] == i and k in m]
    tot = sum(1 for k in range(len(sc)) if sl[k] == i)
    s = wt[m[idx[0]]][0] if idx else None; e = wt[m[idx[-1]]][1] if idx else None
    out.append({'start': s, 'end': e, 'cov': round(len(idx) / max(1, tot), 2)})
dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', '../source/voice/VOICE_OVER.wav']).decode())
# ضبط البدايات على أول صوت فعلي (الـwhisper أحياناً بيحط البداية في السكوت اللي قبلها)
import numpy as np
SRr = 16000
v = np.frombuffer(subprocess.check_output(['ffmpeg','-v','error','-i','../source/voice/VOICE_OVER.wav','-f','f32le','-ac','1','-ar',str(SRr),'-']), dtype='<f4')
hop = SRr // 100
rms = np.sqrt(np.add.reduceat(v ** 2, np.arange(0, len(v), hop)) / hop + 1e-12); dbv = 20 * np.log10(rms)
def onset(t, limit):
    i = int(t * 100)
    while i < min(int(limit * 100), len(dbv) - 5):
        if (dbv[i:i + 5] > -48).all(): return i / 100
        i += 1
    return None
for i, o in enumerate(out):
    nxt = wordtimes[i][1] if len(wordtimes[i]) > 1 and wordtimes[i][1] else o['end']
    on = onset(o['start'], min(o['start'] + 2.5, nxt))
    if on is not None and on - o['start'] > 0.25:
        print('  snap line', i, o['start'], '->', round(on - 0.05, 2))
        o['start'] = on - 0.05; wordtimes[i][0] = round(on - 0.05, 2)
for i, o in enumerate(out):
    print(i, o['start'], o['end'], o['cov'], lines[i][:40])
json.dump({'duration': dur, 'lines': [{'start': round(o['start'], 2), 'end': round(o['end'], 2)} for o in out]}, open('times.json', 'w'))
open('times.js', 'w').write('window.TIMES=' + json.dumps({'duration': dur, 'lines': [{'start': round(o['start'], 2), 'end': round(o['end'], 2), 'w': wordtimes[i]} for i, o in enumerate(out)]}) + ';')
