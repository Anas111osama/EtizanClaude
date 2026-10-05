# مؤثرات التريلر: ضوضاء مفلترة وترددات واطية بس — مفيش نغمة ولا لحن
import numpy as np, wave, os
SR = 48000
rng = np.random.default_rng(11)
def lp(x, fc):
    a = np.exp(-2 * np.pi * fc / SR); y = np.empty_like(x); s = 0.0
    for i in range(len(x)): s = (1 - a) * x[i] + a * s; y[i] = s
    return y
def hp(x, fc): return x - lp(x, fc)
def bp_sweep(x, f, q=0.8):
    lo = b = 0.0; y = np.empty_like(x)
    for i in range(len(x)):
        g = 2 * np.sin(np.pi * min(f[i], SR / 6) / SR); h = x[i] - lo - q * b; b += g * h; lo += g * b; y[i] = b
    return y
def conv(x, ir):
    n = len(x) + len(ir) - 1; N = 1 << (n - 1).bit_length()
    return np.fft.irfft(np.fft.rfft(x, N) * np.fft.rfft(ir, N), N)[:n]
def ir(sec, damp=2200):
    n = int(sec * SR); t = np.arange(n) / SR
    return lp(rng.standard_normal(n), damp) * np.exp(-t / (sec / 5))
def sub(f0, f1, dur, tau):
    n = int(dur * SR); t = np.arange(n) / SR
    f = f1 + (f0 - f1) * np.exp(-t / (dur / 4)); ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t / tau) * np.minimum(1, t / 0.004)
def burst(dur, fc, tau):
    n = int(dur * SR); t = np.arange(n) / SR
    return lp(rng.standard_normal(n), fc) * np.exp(-t / tau)
def norm(x, pk): return x / (np.abs(x).max() + 1e-9) * pk
def pad(x, n): return np.concatenate([x, np.zeros(max(0, n - len(x)))])
def save(name, x, wide=0.0):
    x = np.clip(x, -1, 1)
    # ستيريو خفيف: نسخة متأخرة شوية في قناة
    d = int(wide * SR); L = x; R = np.concatenate([np.zeros(d), x[:len(x) - d]]) if d else x
    st = np.stack([L, R], 1)
    with wave.open(f'sfx/{name}.wav', 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st * 32767).astype('<i2').tobytes())
os.makedirs('sfx', exist_ok=True)
# ١) الصدمة الغامضة الكبيرة: ساب نازل + خبطة + تكة + ذيل صدى طويل
n = int(3.2 * SR)
dry = pad(sub(62, 27, 3.2, 0.9), n) * 1.0 + pad(burst(0.6, 700, 0.12), n) * 0.9 + pad(hp(burst(0.02, 20000, 0.004), 2500), n) * 0.5
wet = conv(dry, ir(2.6, 1800))[:n]
save('impact', norm(dry + norm(wet, np.abs(dry).max()) * 0.45, 0.95), 0.012)
# ٢) خبطة واطية قصيرة
n = int(1.0 * SR)
x = pad(sub(52, 34, 1.0, 0.28), n) + pad(burst(0.25, 400, 0.06), n) * 0.7
save('lowhit', norm(x + norm(conv(x, ir(0.9, 900))[:n], 1) * 0.25, 0.9))
# ٣) ووش قوي
n = int(1.1 * SR); t = np.linspace(0, 1, n)
x = bp_sweep(rng.standard_normal(n), 250 + 3200 * np.sin(np.pi * t) ** 1.5, 0.7) * np.sin(np.pi * t) ** 2.4
x += lp(rng.standard_normal(n), 300) * np.sin(np.pi * t) ** 3 * 0.6
save('whoosh_big', norm(x + norm(conv(x, ir(0.8))[:n], 1) * 0.2, 0.85), 0.008)
# ٤) رايزر متصاعد (٣ ثواني) بنبضات بتسرع، وبيتقطع فجأة
n = int(3.0 * SR); t = np.linspace(0, 1, n)
f = 300 * (20 ** t)
pulse = 0.55 + 0.45 * np.sign(np.sin(2 * np.pi * np.cumsum(2 + 14 * t ** 2) / SR))
x = bp_sweep(rng.standard_normal(n), f, 0.6) * t ** 2.2 * pulse
x += pad(sub(30, 45, 3.0, 99), n) * t ** 2 * 0.5
x[-int(0.01 * SR):] *= np.linspace(1, 0, int(0.01 * SR))
save('riser', norm(x, 0.7), 0.01)
# ٥) سحب عكسي قبل الصدمة الأخيرة
n = int(0.9 * SR)
x = conv(burst(0.05, 3000, 0.01), ir(0.9, 2500))[:n][::-1]
save('reverse', norm(x * np.linspace(0.2, 1, n) ** 2, 0.7), 0.01)
# ٦) تكة جلتش للقطعات السريعة
n = int(0.07 * SR); x = hp(rng.standard_normal(n), 3000) * np.exp(-np.arange(n) / SR / 0.012)
x = np.repeat(x[::6], 6)[:n]   # تقطيع خشن
save('glitch', norm(x, 0.6))
# ٧) درون مكتوم طول التريلر
n = int(16 * SR); t = np.arange(n) / SR
br = np.cumsum(rng.standard_normal(n)); br -= lp(br, 8)
x = lp(lp(br, 140), 140) * (0.75 + 0.25 * np.sin(2 * np.pi * 0.17 * t))
save('drone', norm(x, 0.5), 0.02)
print('ok')
# ٨) ستينجر لقفلة «جاية!»: سحب عكسي قصير → خبطة ساب + طرقعة لامعة
pre = conv(burst(0.03, 4000, 0.008), ir(0.45, 3000))[:int(0.45 * SR)][::-1]
pre = pre / (np.abs(pre).max() + 1e-9) * np.linspace(0.1, 1, len(pre)) ** 2 * 0.6
n = int(1.4 * SR)
hitx = pad(sub(70, 32, 1.4, 0.32), n) + pad(burst(0.18, 1500, 0.035), n) * 0.8 + pad(hp(burst(0.03, 20000, 0.006), 4000), n) * 0.6
hitx = hitx + norm(conv(hitx, ir(1.2, 2600))[:n], np.abs(hitx).max()) * 0.3
save('stinger', norm(np.concatenate([pre, hitx]), 0.95), 0.01)
# ٩) بووم القفلة على الأسود: ساب عميق وذيل صدى
n = int(2.2 * SR)
b = pad(sub(48, 24, 2.2, 0.7), n) + pad(burst(0.4, 300, 0.1), n) * 0.7
save('boom', norm(b + norm(conv(b, ir(2.0, 900))[:n], np.abs(b).max()) * 0.4, 0.95), 0.015)
