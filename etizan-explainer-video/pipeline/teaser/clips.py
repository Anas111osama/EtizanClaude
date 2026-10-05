# بيقص المقتبسات من التسجيلين ويشيل السكوت من الطرفين بدقة
import numpy as np, subprocess, json
SR = 48000
SRC = {'A': '../../Adult_App/source/voice/VOICE_OVER.wav', 'P': '../../App Video/source/voice/VOICE_OVER.wav', 'E': '../source/ending.wav'}
def load(p):
    return np.frombuffer(subprocess.check_output(['ffmpeg','-v','error','-i',p,'-af','loudnorm=I=-16:TP=-2','-f','f32le','-ac','1','-ar',str(SR),'-']), dtype='<f4').copy()
V = {k: load(p) for k, p in SRC.items()}
# id: (مصدر, من, لحد) — الحدود من توقيت الكلمات، والتنضيف تحت
CLIPS = {
  'one':     ('A', 53.40, 54.95, 'حاجة واحدة بس في المرة.'),
  'w_org':   ('P', 17.40, 18.05, 'يتنظّم'),
  'w_foc':   ('P', 18.00, 19.15, 'ويركّز'),
  'w_calm':  ('P', 19.15, 20.10, 'ويهدى'),
  'lazy':    ('A', 8.32, 9.08, 'ده مش كسل.'),
  'zanto':   ('P', 41.28, 43.00, 'وده زانتو!'),
  'step':    ('A', 95.12, 95.98, 'خطوة صغيرة'),
  'before':  ('P', 128.78, 129.48, 'قبل ما يحصل'),
  'zanto2':  ('P', 42.02, 43.00, 'زانتو!'),
  'etizan':  ('A', 181.62, 182.38, 'اتزان'),
  'ending':  ('E', 0.0, 3.0, 'اتزان... حاجة جديدة جاية!'),
}
hop = int(0.005 * SR)
def trim(x, thr_db=-42):
    n = len(x) // hop
    db = 20 * np.log10(np.sqrt((x[:n * hop].reshape(n, hop) ** 2).mean(1)) + 1e-9)
    on = np.where(db > thr_db)[0]
    if not len(on): return x
    a = max(0, on[0] - 3) * hop; b = min(len(x), (on[-1] + 4) * hop)
    y = x[a:b].copy(); f = int(0.012 * SR)
    y[:f] *= np.linspace(0, 1, f); y[-f:] *= np.linspace(1, 0, f)
    return y
out = {}
import wave
for k, (src, a, b, txt) in CLIPS.items():
    y = trim(V[src][int(a * SR):int(b * SR)])
    if k == 'ending':
        c0, c1 = int(0.85 * SR), int(1.10 * SR)          # جزء من السكتة بعد «اتزان»
        f = int(0.01 * SR); y = np.concatenate([y[:c0] * np.r_[np.ones(c0 - f), np.linspace(1, 0, f)], y[c1:] * np.r_[np.linspace(0, 1, f), np.ones(len(y) - c1 - f)]])
        y = np.frombuffer(subprocess.run(['ffmpeg','-v','error','-f','f32le','-ar',str(SR),'-ac','1','-i','-','-af','atempo=1.06','-f','f32le','-'], input=y.astype('<f4').tobytes(), capture_output=True).stdout, dtype='<f4').copy()
    with wave.open(f'tmp/clip_{k}.wav', 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(y, -1, 1) * 32767).astype('<i2').tobytes())
    out[k] = {'dur': round(len(y) / SR, 3), 'text': txt, 'src': src}
    print(k, src, out[k]['dur'], txt)
json.dump(out, open('clips.json', 'w', encoding='utf-8'), ensure_ascii=False)
