"""python engine/mix.py ep01 — صوت + أجواء لكل عالم + مؤثرات (من غير مزيكا) ← <ep>/build/mix.wav بـ -14 LUFS
الفواصل (cuts) والمؤثرات والعوالم من <ep>/build/plan.json (EP=… node engine/events.js)."""
import numpy as np, json, subprocess, wave, sys, os
ep = sys.argv[1]; HERE = os.path.dirname(os.path.abspath(__file__)); R = os.path.join(HERE, '..', ep); B = os.path.join(R, 'build')
SFXDIR = os.path.join(HERE, '..', '..', '..', 'etizan-explainer-video', 'pipeline', 'sfx')
SR = 48000
def load(path, extra=''):
    cmd = ['ffmpeg', '-v', 'error', '-i', path] + (['-af', extra] if extra else []) + ['-f', 'f32le', '-ac', '2', '-ar', str(SR), '-']
    return np.frombuffer(subprocess.check_output(cmd), dtype='<f4').reshape(-1, 2).copy()
def db(x): return 10 ** (x / 20)
plan = json.load(open(os.path.join(B, 'plan.json')))
N = int((plan['duration'] + 0.2) * SR)
# ── الصوت مع الفواصل ──
vo = load(os.path.join(R, 'voice', 'VOICE_OVER.wav'), 'highpass=f=70,acompressor=threshold=-20dB:ratio=2.5:attack=8:release=120:makeup=2,loudnorm=I=-16:TP=-2:LRA=9')
parts, prev = [], 0
for c in plan['cuts']:
    i = min(len(vo), int(c['at'] * SR)); parts += [vo[prev:i], np.zeros((int(c['gap'] * SR), 2), np.float32)]; prev = i
parts.append(vo[prev:]); voice = np.concatenate(parts)[:N]
out = np.zeros((N, 2), np.float32); out[:len(voice)] += voice
def mavg(x, w):
    c = np.cumsum(np.concatenate([np.zeros(w), x, np.zeros(w)])); y = (c[w:] - c[:-w]) / w
    return y[w // 2: w // 2 + len(x)]
sp = mavg(np.clip(mavg(np.abs(out).mean(1), int(.2 * SR)) / 0.03, 0, 1), int(.3 * SR))
# ── الأجواء: real = صوت أوضة، blue = همهمة واطية (drone)، light = هوا خفيف جدًا ──
rng = np.random.default_rng(3)
def lowpass(x, fc):
    a = np.exp(-2 * np.pi * fc / SR); from scipy.signal import lfilter
    return lfilter([1 - a], [1, -a], x)
try:
    import scipy  # noqa
    room = lowpass(np.cumsum(rng.standard_normal(N)) * 0.02 + rng.standard_normal(N) * 0.3, 900)
except ImportError:
    w = int(SR / 900); room = np.convolve(rng.standard_normal(N), np.ones(w) / w, 'same')
room = np.stack([room, np.roll(room, 240)], 1).astype(np.float32); room /= np.sqrt((room ** 2).mean()) + 1e-9
dr = load(os.path.join(SFXDIR, 'drone.wav')); dr /= np.sqrt((dr ** 2).mean()) + 1e-9
xf = int(2 * SR); drone = np.zeros((N, 2), np.float32); pos = 0
while pos < N:
    seg = dr.copy(); fade = np.ones(len(seg)); fade[:xf] = np.linspace(0, 1, xf); fade[-xf:] = np.linspace(1, 0, xf); L = min(len(seg), N - pos)
    drone[pos:pos + L] += (seg * fade[:, None])[:L]; pos += len(seg) - xf
LEVEL = {'real': (db(-44), 0), 'blue': (0, db(-36)), 'light': (db(-52), 0)}
gr, gd = np.zeros(N), np.zeros(N); W = plan['worlds'] + [{'t': plan['duration'], 'w': None}]
for a, b in zip(W, W[1:]):
    i, j = int(a['t'] * SR), int(b['t'] * SR); r_, d_ = LEVEL[a['w']]; gr[i:j] = r_; gd[i:j] = d_
k = int(0.6 * SR); gr = mavg(gr, k); gd = mavg(gd, k)
duck = (1 - 0.45 * sp)
out += (room * gr[:, None] + drone * gd[:, None]) * duck[:, None]
# ── المؤثرات ──
names = sorted({e['name'] for e in plan['sfx']})
S = {n: load(os.path.join(SFXDIR, n + '.wav')) for n in names}
GAIN = {'whoosh': -13, 'swish': -18, 'pop': -16, 'slap': -12, 'rise': -13, 'marker': -11, 'impact': -8, 'lowhit': -10, 'whoosh_big': -12,
        'reverse': -12, 'glitch': -16, 'riser': -14, 'stinger': -9, 'boom': -8, 'flip': -12, 'print': -14,
        'tick': -14, 'ticktock': -17, 'beep': -20, 'typing': -13, 'key': -14, 'pen': -11, 'crumple': -12, 'paper': -10, 'msg': -15, 'page': -12, 'counter': -17, 'switch': -22}
PRI = {'impact': 0, 'lowhit': 0, 'rise': 0, 'marker': 0, 'whoosh_big': 1, 'whoosh': 1, 'slap': 1, 'reverse': 1, 'glitch': 2, 'pop': 2, 'swish': 3}
keep, last = [], -9
for e in sorted(plan['sfx'], key=lambda e: (e['t'], PRI.get(e['name'], 2))):
    if e['name'] in ('pop', 'swish') and e['t'] - last < 0.28: continue
    keep.append(e); last = e['t']
fx = np.zeros_like(out)
for e in keep:
    s = S[e['name']] * db(GAIN.get(e['name'], -14)) * e.get('gain', 1); i = int(e['t'] * SR); L = min(len(s), N - i)
    if L > 0: fx[i:i + L] += s[:L]
out += fx * (1 - 0.3 * sp)[:, None]
fo = int(0.6 * SR); out[-fo:] *= np.linspace(1, 0, fo)[:, None]
print('sfx kept', len(keep), 'of', len(plan['sfx']), 'peak', round(20 * np.log10(np.abs(out).max() + 1e-9), 1))
raw = os.path.join(B, 'mix_raw.wav')
with wave.open(raw, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(out, -1, 1) * 32767).astype('<i2').tobytes())
m = subprocess.run(['ffmpeg', '-v', 'info', '-i', raw, '-af', 'ebur128', '-f', 'null', '-'], capture_output=True, text=True).stderr
I = float(m.rsplit('I:', 1)[1].split('LUFS')[0])
subprocess.check_call(['ffmpeg', '-y', '-v', 'error', '-i', raw, '-af', f'volume={-14 - I:.2f}dB,alimiter=limit=0.89:level=false', '-ar', '48000', os.path.join(B, 'mix.wav')])
os.remove(raw); print('in', I, 'LUFS -> build/mix.wav')
