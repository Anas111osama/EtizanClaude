# python stock/fetch.py — بينزّل لقطات الواقع للحلقة ٧ (Mixkit Free License) بأعلى جودة متاحة.
# الفيديوهات نفسها مش في git (كبيرة)؛ الملف ده + credits.txt هما المرجع.
import os, urllib.request
HERE = os.path.dirname(os.path.abspath(__file__))
PICKS = [  # (اسم الملف، Mixkit id، الوصف، الفقرات) — رجالة بمظهر محافظ بس أو من غير ناس (مفيش ستات، ولا في الخلفية، ولا على شاشة موبايل؛ ومفيش حلق أو بيرسينج أو خمور)
    ('Q01', 11528, 'man on his laptop in a cafe (the online course)', '1'),
    ('Q02', 24344, 'focused man working late at night (first week, all in)', '2'),
    ('Q03', 24063, 'exhausted man at his desk at night, gets up and walks away', '2, 11'),
    ('Q04', 14763, 'bored man in front of his computer', '3'),
    ('Q05', 16225, 'same man from Q01 scrolling his phone in the cafe (screen not visible)', '3, 4'),
    ('Q06', 47877, 'legs running on a treadmill (working hard, not moving)', '11'),
    ('Q07', 4793, 'young man happily writing at his desk', '14'),
    ('Q08', 48298, 'three light bulbs light up one by one (no people)', '15'),
    ('Q09', 9090, 'man studying on his laptop in a park (a new place)', '16'),
    ('Q10', 14421, 'light bulb slowly turning on (no people)', '17'),
    ('Q11', 35362, 'man writing in a notebook at his desk (hands only)', '18'),
    ('Q12', 35903, 'man in a suit writing in his diary (hands only)', '19'),
    ('Q13', 23242, 'man walking down a rural road, seen from behind', '20'),
    ('Q14', 7809, 'match being struck in the dark (no people)', '7'),
]
UA = {'User-Agent': 'Mozilla/5.0'}
def ok(u):
    try: return urllib.request.urlopen(urllib.request.Request(u, method='HEAD', headers=UA), timeout=20).status == 200 and \
                int(urllib.request.urlopen(urllib.request.Request(u, method='HEAD', headers=UA), timeout=20).headers.get('Content-Length') or 0) > 0
    except Exception: return False
lines = ['ID | Mixkit id | quality | description | paragraphs | source | license']
for name, i, desc, paras in PICKS:
    for q in ('2160', '1080', '720'):
        u = f'https://assets.mixkit.co/videos/{i}/{i}-{q}.mp4'
        if ok(u): break
    out = os.path.join(HERE, f'{name}.mp4')
    if not os.path.exists(out):
        urllib.request.urlretrieve(u, out)
    print(name, i, q, round(os.path.getsize(out) / 1e6), 'MB')
    lines.append(f'{name} | {i} | {q}p | {desc} | {paras} | https://mixkit.co/free-stock-video/-{i}/ | Mixkit Free License (https://mixkit.co/license/)')
open(os.path.join(HERE, 'credits.txt'), 'w', encoding='utf-8').write('\n'.join(lines) + '\n')
