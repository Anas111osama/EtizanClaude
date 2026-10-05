# مؤثرات مصنوعة من ضوضاء مفلترة بس — مفيش أي نغمة أو آلة
import numpy as np, wave
SR = 48000
rng = np.random.default_rng(7)
def svf_bp(x, f, q=0.7):
    """state-variable bandpass مع تردد متغير (array)"""
    lp = bp = 0.0; out = np.zeros_like(x); f = np.broadcast_to(f, x.shape)
    for i in range(len(x)):
        g = 2 * np.sin(np.pi * min(f[i], SR / 6) / SR)
        hp = x[i] - lp - q * bp; bp += g * hp; lp += g * bp; out[i] = bp
    return out
def lowpass(x, fc):
    a = np.exp(-2 * np.pi * fc / SR); y = np.zeros_like(x); s = 0.0
    for i in range(len(x)): s = (1 - a) * x[i] + a * s; y[i] = s
    return y
def env(n, a, d, shape=2.0):
    t = np.arange(n) / SR; A = int(a * SR)
    e = np.minimum(1, t / max(a, 1e-4)) ** 1.5
    e[A:] = np.exp(-((t[A:] - a) / d) * shape)
    return e
def norm(x, peak): return x / (np.abs(x).max() + 1e-9) * peak
def save(name, x):
    x = np.clip(x, -1, 1); st = np.stack([x, x], 1)
    with wave.open(f'sfx/{name}.wav', 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st * 32767).astype('<i2').tobytes())
import os; os.makedirs('sfx', exist_ok=True)
# whoosh: ضوضاء بتعدّي من واطي لعالي وترجع
n = int(0.75 * SR); t = np.linspace(0, 1, n)
f = 300 + 2600 * np.sin(np.pi * t) ** 2
x = svf_bp(rng.standard_normal(n), f, 0.9) * (np.sin(np.pi * t) ** 2.2)
save('whoosh', norm(x, 0.55))
# swish: أقصر وأعلى
n = int(0.38 * SR); t = np.linspace(0, 1, n)
x = svf_bp(rng.standard_normal(n), 1200 + 4200 * t, 1.0) * (np.sin(np.pi * t) ** 1.6)
save('swish', norm(x, 0.4))
# pop: نقرة ناعمة قصيرة
n = int(0.09 * SR)
x = svf_bp(rng.standard_normal(n), np.full(n, 1700.0), 0.35) * env(n, 0.002, 0.018, 1.0)
x += lowpass(rng.standard_normal(n), 400) * env(n, 0.001, 0.012, 1.0) * 2
save('pop', norm(x, 0.5))
# slap: ورقة بتلزق
n = int(0.16 * SR)
x = lowpass(rng.standard_normal(n), 1800) * env(n, 0.001, 0.03, 1.0)
x += svf_bp(rng.standard_normal(n), np.full(n, 3500.0), 0.5) * env(n, 0.001, 0.012, 1.0) * 0.5
save('slap', norm(x, 0.6))
# rise: صعود طويل ناعم للّوجو
n = int(1.6 * SR); t = np.linspace(0, 1, n)
x = svf_bp(rng.standard_normal(n), 200 + 3000 * t ** 2, 0.8) * (t ** 2.5) * (1 - np.clip((t - 0.93) / 0.07, 0, 1))
save('rise', norm(x, 0.5))
print('ok')
