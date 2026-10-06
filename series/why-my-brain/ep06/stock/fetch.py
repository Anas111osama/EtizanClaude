# python stock/fetch.py — بينزّل لقطات الواقع للحلقة ٦ (Mixkit Free License) بأعلى جودة متاحة.
# الفيديوهات نفسها مش في git (كبيرة)؛ الملف ده + credits.txt هما المرجع.
import os, urllib.request
HERE = os.path.dirname(os.path.abspath(__file__))
PICKS = [  # (اسم الملف، Mixkit id، الوصف، الفقرات) — رجالة بس أو من غير ناس (مفيش ستات، ولا في الخلفية، ولا على شاشة موبايل)
    ('L01', 43526, 'man gaming at night, face lit by the screen', '1'),
    ('L02', 5527, 'bearded man deep in an online game at home', '1, 10'),
    ('L03', 48609, 'man in a suit, bored at his laptop', '2'),
    ('L04', 14763, 'tired, bored man in front of his computer', '3'),
    ('L05', 41638, "man's hands picking up his phone at the desk", '11'),
    ('L06', 43941, 'coffee poured into a cup (no people)', '14'),
    ('L07', 49885, 'man thinking hard (chess)', '16'),
    ('L08', 1795, 'phone face down on a wooden table (no people)', '18'),
    ('L09', 28902, 'alarm clock on a wooden table (no people)', '18'),
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
