import numpy as np, wave, json
CUTS = [(22.76, 23.87), (40.58, 41.66), (67.15, 68.18)]   # «long pause» المنطوقة
w = wave.open('source/voice/VOICE_OVER_original.wav'); sr = w.getframerate(); ch = w.getnchannels(); sw = w.getsampwidth()
x = np.frombuffer(w.readframes(w.getnframes()), dtype='<i2').astype(np.float32).reshape(-1, ch); w.close()
f = int(0.012 * sr); parts = []; prev = 0
for a, b in CUTS:
    seg = x[prev:int(a * sr)].copy(); seg[-f:] *= np.linspace(1, 0, f)[:, None]
    if parts: seg[:f] *= np.linspace(0, 1, f)[:, None]
    parts.append(seg); prev = int(b * sr)
seg = x[prev:].copy(); seg[:f] *= np.linspace(0, 1, f)[:, None]; parts.append(seg)
y = np.concatenate(parts)
o = wave.open('source/voice/VOICE_OVER.wav', 'wb'); o.setnchannels(ch); o.setsampwidth(sw); o.setframerate(sr); o.writeframes(y.astype('<i2').tobytes()); o.close()
print('old', round(len(x) / sr, 2), 'new', round(len(y) / sr, 2), 'removed', round((len(x) - len(y)) / sr, 2))
json.dump(CUTS, open('build/cuts.json', 'w'))
