# بيطلّع أوقات مراجعة (بعد الفواصل) لكلمات معيّنة: python build/keytimes.py
import json, re
T = json.loads(open('build/times.js', encoding='utf-8').read()[len('window.TIMES='):-1])['lines']
G = json.loads(re.search(r'gaps:\s*(\{[^}]*\})', open('scenes.js', encoding='utf-8').read()).group(1).replace(' ', '').replace('{', '{"').replace(',', ',"').replace(':', '":'))
off, OFF = 0, []
for i in range(len(T)): OFF.append(off); off += G.get(str(i + 1), 0)
K = [(1, 3), (1, 10), (2, 6), (2, 10), (2, 16), (3, 2), (3, 16), (4, 1), (4, 9), (5, 0), (5, 15), (6, 12), (7, 6), (7, 22), (7, 34), (8, 2), (8, 15), (9, 14), (9, 24),
     (10, 10), (11, 21), (12, 25), (13, 18), (14, 9), (14, 20), (15, 18), (16, 0), (16, 17), (17, 12), (18, 20), (19, 20), (20, 14), (21, 9), (21, 26), (22, 22), (23, 6), (24, 8), (25, 9)]
ts = []
for n, k in K:
    w = T[n - 1]['w'][k]; ts.append(round(w + OFF[n - 1] + 0.45, 2))
print(' '.join(map(str, ts)))
ts2 = [ts[0] - 1.2] + [round(T[3]['end'] + 2.2, 2), round(T[24]['end'] + OFF[24] + 5, 2)]
print(' '.join(map(str, ts2)))
