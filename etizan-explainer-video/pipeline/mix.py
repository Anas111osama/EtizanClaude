import numpy as np, json, subprocess, wave
SR = 48000
def load(path, extra=''):
    cmd = ['ffmpeg', '-v', 'error', '-i', path] + (['-af', extra] if extra else []) + ['-f', 'f32le', '-ac', '2', '-ar', str(SR), '-']
    return np.frombuffer(subprocess.check_output(cmd), dtype='<f4').reshape(-1, 2).copy()
def db(x): return 10 ** (x / 20)
voice = load('../source/voice/VOICE_OVER.wav', 'highpass=f=70,acompressor=threshold=-20dB:ratio=2.5:attack=8:release=120:makeup=2,loudnorm=I=-16:TP=-2:LRA=9')
N = len(voice) + int(1.0 * SR)
out = np.zeros((N, 2), dtype=np.float32)
out[:len(voice)] += voice
# غلاف الصوت للـducking
mono = np.abs(voice).mean(1)
def mavg(x, w):
    c = np.cumsum(np.concatenate([np.zeros(w), x, np.zeros(w)])); y = (c[w:] - c[:-w]) / w
    return y[w // 2: w // 2 + len(x)]
envv = mavg(mono, int(0.25 * SR)); envv = np.concatenate([envv, np.zeros(N - len(envv))])
speaking = mavg(np.clip(envv / 0.03, 0, 1), int(0.4 * SR))
# الهوا: لوب بكروس-فيد، واطي جداً وبيوطى أكتر وقت الكلام
wind = load('../source/sfx/wind.mp3')
wind = wind / (np.sqrt((wind ** 2).mean()) + 1e-9) * db(-40)
xf = int(3 * SR); amb = np.zeros((N, 2), np.float32); pos = 0
while pos < N:
    seg = wind.copy(); L = min(len(seg), N - pos)
    fade = np.ones(len(seg)); fade[:xf] = np.linspace(0, 1, xf); fade[-xf:] = np.linspace(1, 0, xf)
    amb[pos:pos + L] += (seg * fade[:, None])[:L]; pos += len(seg) - xf
g = (1 - 0.45 * speaking)[:, None]
fin = np.ones(N); fin[:int(2 * SR)] = np.linspace(0, 1, int(2 * SR)); fin[-int(3 * SR):] = np.linspace(1, 0, int(3 * SR))
out += amb * g * fin[:, None]
# المؤثرات
S = {n: load(f'sfx/{n}.wav') for n in ['whoosh', 'swish', 'pop', 'slap', 'rise']}
bird = load('../source/sfx/bird.mp3'); b0, b1 = int(0.35 * SR), int(1.45 * SR)
bs = bird[b0:b1].copy(); f = int(0.08 * SR); bs[:f] *= np.linspace(0, 1, f)[:, None]; bs[-f:] *= np.linspace(1, 0, f)[:, None]
S['bird'] = bs / (np.abs(bs).max() + 1e-9) * 0.5
pen = load('../source/sfx/pencil_check_mark-105940.mp3'); S['pencil'] = pen / (np.abs(pen).max() + 1e-9) * 0.45
GAIN = {'whoosh': db(-11), 'swish': db(-17), 'pop': db(-15), 'slap': db(-9), 'rise': db(-10), 'bird': db(-6), 'pencil': db(-8)}
ev = json.load(open('sfx_events.json'))
keep, last = [], -9
PRI = {'bird': 0, 'pencil': 0, 'rise': 0, 'whoosh': 1, 'slap': 1, 'pop': 2, 'swish': 3}
ev.sort(key=lambda e: (e['t'], PRI[e['name']]))
for e in ev:
    if e['t'] < 0: continue
    if e['name'] in ('pop', 'swish') and e['t'] - last < 0.7: continue
    keep.append(e); last = e['t']
for e in keep:
    s = S[e['name']] * GAIN[e['name']] * e.get('gain', 1) / (0.5 if e['name'] == 'swish' and e.get('gain') else 1)
    i = int(e['t'] * SR); L = min(len(s), N - i)
    if L > 0: out[i:i + L] += s[:L]
print('events kept', len(keep), 'of', len(ev))
pk = np.abs(out).max(); print('peak', 20 * np.log10(pk))
out = np.clip(out, -1, 1)
with wave.open('mix_raw.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype('<i2').tobytes())
subprocess.check_call(['ffmpeg', '-y', '-v', 'error', '-i', 'mix_raw.wav', '-af', 'loudnorm=I=-15:TP=-1.5:LRA=11', '-ar', '48000', 'mix.wav'])
print('done')
