# مؤثرات ورق للكتيّب: قلب صفحة · هايلايتر · طابعة — ضوضاء مفلترة بس، من غير أي نغمة
import numpy as np, wave
SR = 48000
rng = np.random.default_rng(21)
def lp(x, fc):
    a = np.exp(-2 * np.pi * fc / SR); y = np.empty_like(x); s = 0.0
    for i in range(len(x)): s = (1 - a) * x[i] + a * s; y[i] = s
    return y
def hp(x, fc): return x - lp(x, fc)
def bp(x, f, q=0.7):
    lo = b = 0.0; y = np.empty_like(x); f = np.broadcast_to(f, x.shape)
    for i in range(len(x)):
        g = 2 * np.sin(np.pi * min(f[i], SR / 6) / SR); h = x[i] - lo - q * b; b += g * h; lo += g * b; y[i] = b
    return y
def norm(x, pk): return x / (np.abs(x).max() + 1e-9) * pk
def save(name, x, wide=0.006):
    x = np.clip(x, -1, 1); d = int(wide * SR); R = np.concatenate([np.zeros(d), x[:len(x) - d]])
    with wave.open(f'sfx/{name}.wav', 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.stack([x, R], 1) * 32767).astype('<i2').tobytes())
# قلب صفحة: خشخشة ورق بترفرف وبتخلص بطقّة خفيفة
n = int(0.55 * SR); t = np.linspace(0, 1, n)
flutter = 0.55 + 0.45 * np.abs(np.sin(2 * np.pi * (6 + 10 * t) * t))
x = bp(rng.standard_normal(n), 1800 + 2600 * np.sin(np.pi * t), 0.5) * np.sin(np.pi * t) ** 1.4 * flutter
tap = np.zeros(n); k = int(0.46 * SR); m = int(0.03 * SR); tap[k:k + m] = lp(rng.standard_normal(m), 900) * np.exp(-np.arange(m) / SR / 0.006)
save('flip', norm(x + tap * 1.5, 0.6))
# هايلايتر: سحبة قلم على ورق
n = int(0.42 * SR); t = np.linspace(0, 1, n)
x = bp(rng.standard_normal(n), np.full(n, 3200.0), 0.35) * (np.minimum(1, t / 0.08) * np.minimum(1, (1 - t) / 0.15)) * (0.8 + 0.2 * np.sin(2 * np.pi * 34 * t))
save('marker', norm(x, 0.45))
# طابعة: سحب ورق بنبضات ميكانيكية واطية
n = int(1.3 * SR); t = np.arange(n) / SR
pulses = (np.sin(2 * np.pi * 22 * t) > 0.6).astype(float)
pulses = lp(pulses, 300)
x = lp(rng.standard_normal(n), 900) * (0.35 + 0.65 * pulses) * np.minimum(1, t / 0.08) * np.minimum(1, (t[-1] - t) / 0.15)
x += hp(rng.standard_normal(n), 2500) * 0.12 * np.minimum(1, t / 0.2)
save('print', norm(x, 0.5))
print('ok')
