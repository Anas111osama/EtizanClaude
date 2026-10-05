"""python mix.py epNN — صوت + مؤثرات (من غير مزيكا) ← epNN/mix.wav بـ -14 LUFS"""
import numpy as np, json, subprocess, wave, sys, os
ep = sys.argv[1]; R = os.path.join('..', ep)
SR = 48000
def load(path, extra=''):
    cmd = ['ffmpeg', '-v', 'error', '-i', path] + (['-af', extra] if extra else []) + ['-f', 'f32le', '-ac', '2', '-ar', str(SR), '-']
    return np.frombuffer(subprocess.check_output(cmd), dtype='<f4').reshape(-1, 2).copy()
def db(x): return 10 ** (x / 20)
info = json.load(open(os.path.join(R, 'sfx_events.json')))
voice = load(os.path.join(R, 'VOICE_OVER.wav'), 'highpass=f=70,acompressor=threshold=-20dB:ratio=2.5:attack=8:release=120:makeup=2,loudnorm=I=-15:TP=-2:LRA=8')
N = int((info['duration'] + 0.1) * SR)
out = np.zeros((N, 2), np.float32); out[:len(voice)] += voice[:N]
# المؤثرات بتوطى تحت الكلام
mono = np.abs(voice).mean(1)
def mavg(x, w):
    c = np.cumsum(np.concatenate([np.zeros(w), x, np.zeros(w)])); y = (c[w:] - c[:-w]) / w
    return y[w // 2: w // 2 + len(x)]
sp = mavg(np.clip(mavg(mono, int(.2 * SR)) / 0.03, 0, 1), int(.3 * SR)); sp = np.concatenate([sp, np.zeros(max(0, N - len(sp)))])[:N]
duck = (1 - 0.35 * sp)[:, None]
NAMES = ['whoosh', 'swish', 'pop', 'slap', 'rise', 'marker', 'impact', 'lowhit']
S = {n: load(f'sfx/{n}.wav') for n in NAMES}
GAIN = {'whoosh': db(-12), 'swish': db(-17), 'pop': db(-15), 'slap': db(-11), 'rise': db(-12), 'marker': db(-10), 'impact': db(-6), 'lowhit': db(-9)}
PRI = {'impact': 0, 'rise': 0, 'marker': 0, 'lowhit': 1, 'whoosh': 1, 'slap': 1, 'pop': 2, 'swish': 3}
ev = sorted(info['events'], key=lambda e: (e['t'], PRI[e['name']]))
keep, last = [], -9
for e in ev:
    if e['t'] < 0: continue
    if e['name'] in ('pop', 'swish') and e['t'] - last < 0.3: continue
    keep.append(e); last = e['t']
fx = np.zeros_like(out)
for e in keep:
    s = S[e['name']] * GAIN[e['name']] * e.get('gain', 1); i = int(e['t'] * SR); L = min(len(s), N - i)
    if L > 0: fx[i:i + L] += s[:L]
out += fx * duck
print('events kept', len(keep), 'of', len(ev), ' peak', round(20 * np.log10(np.abs(out).max()), 1))
out = np.clip(out, -1, 1)
raw = os.path.join(R, 'mix_raw.wav')
with wave.open(raw, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype('<i2').tobytes())
# كسب ثابت لـ-14 ثم ليميتر (من غير loudnorm الديناميكي اللي بيبوّظ الضربات)
m = subprocess.run(['ffmpeg', '-v', 'info', '-i', raw, '-af', 'ebur128', '-f', 'null', '-'], capture_output=True, text=True).stderr
I = float(m.rsplit('I:', 1)[1].split('LUFS')[0])
subprocess.check_call(['ffmpeg', '-y', '-v', 'error', '-i', raw, '-af', f'volume={-14 - I:.2f}dB,alimiter=limit=0.89:level=false', '-ar', '48000', os.path.join(R, 'mix.wav')])
print('in', I, '-> mix.wav')
