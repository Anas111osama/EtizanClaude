# أوقات مراجعة: آخر كلمة في كل فقرة + لحظات معيّنة (بعد الفواصل) — python build/keytimes.py
import json, re
T = json.loads(open('build/times.js', encoding='utf-8').read()[len('window.TIMES='):-1])['lines']
G = {int(k): float(v) for k, v in re.findall(r'(\d+):\s*([\d.]+)', re.search(r'gaps:\s*\{([^}]*)\}', open('scenes.js', encoding='utf-8').read()).group(1))}
off, OFF = 0, []
for i in range(len(T)): OFF.append(off); off += G.get(i + 1, 0)
print(' '.join(str(round(l['end'] + OFF[i] - 0.25, 2)) for i, l in enumerate(T)), round(T[3]['end'] + 2.3, 2), round(T[-1]['end'] + OFF[-1] + 5, 2))
