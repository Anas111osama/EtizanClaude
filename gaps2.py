exec(open('gaps.py', encoding='utf-8').read().split("for i in range(len(T) - 1):")[0])
print('floor pct', [round(float(np.percentile(dbv, p)),1) for p in (5, 10, 20, 30, 50)])
starts = [4,7,12,17,21,26,30,34,39,42,44,45,47,49,52,54]
for s in starts:
    a, b = T[s-1]['end'], T[s]['start']
    regs = speech(a - 1.0, b + 1.2, thr=-52)
    print(f"line{s:2d} end={a} start={b} blobs={regs}")
