import numpy as np, json, subprocess
SR = 16000
v = np.frombuffer(subprocess.check_output(['ffmpeg','-v','error','-i','../source/voice/VOICE_OVER.wav','-f','f32le','-ac','1','-ar',str(SR),'-']), dtype='<f4')
T = json.load(open('times.json'))['lines']
tr = json.load(open('transcript.json', encoding='utf-8'))
words = [(w['s'], w['e'], w['w']) for s in tr for w in s['words']]
hop = int(0.01 * SR)
rms = np.sqrt(np.convolve(v**2, np.ones(hop)/hop, 'valid')[::hop] + 1e-12); dbv = 20*np.log10(rms)
def speech(a, b, thr=-38):
    i0, i1 = int(a*100), int(b*100); seg = dbv[i0:i1] > thr
    regs = []; st = None
    for k, on in enumerate(seg):
        if on and st is None: st = k
        if not on and st is not None:
            if k - st > 8: regs.append((round((i0+st)/100,2), round((i0+k)/100,2)))
            st = None
    if st is not None and len(seg) - st > 8: regs.append((round((i0+st)/100,2), round((i0+len(seg))/100,2)))
    return regs
for i in range(len(T) - 1):
    a, b = T[i]['end'], T[i+1]['start']
    regs = speech(a + 0.02, b - 0.02)
    ws = [w[2] for w in words if w[0] >= a - 0.05 and w[1] <= b + 0.05]
    if b - a > 0.3 or regs:
        print(f"{i:2d}->{i+1:2d}  gap {a:7.2f}-{b:7.2f} ({b-a:4.2f})  speech={regs}  words={ws}")
print('----- boundaries')
starts = [4,7,12,17,21,26,30,34,39,42,44,45,47,49,52,54]
for s in starts:
    a, b = T[s-1]['end'], T[s]['start']
    regs = speech(a - 1.2, b + 1.2)
    ws = [(round(w[0],2), w[2]) for w in words if a - 1.2 <= w[0] <= b + 1.2]
    print(f"scene@line{s:2d} end={a} start={b}  blobs={regs}")
    print('     words', ws)
