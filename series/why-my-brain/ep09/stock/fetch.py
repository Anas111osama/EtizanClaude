# python stock/fetch.py — بينزّل لقطات الواقع للحلقة ٧ (Mixkit Free License) بأعلى جودة متاحة.
# الفيديوهات نفسها مش في git (كبيرة)؛ الملف ده + credits.txt هما المرجع.
import os, urllib.request
HERE = os.path.dirname(os.path.abspath(__file__))
PICKS = [  # (اسم الملف، Mixkit id، الوصف، الفقرات) — رجالة بمظهر محافظ بس أو من غير ناس (مفيش ستات، ولا في الخلفية، ولا على شاشة؛ ومفيش حلق أو بيرسينج أو خمور)
    ('S01', 17450, 'hands typing on a laptop late at night (no screen shown)', '1'),
    ('S02', 11606, 'man lying on his bed scrolling his phone (screen not visible)', '2'),
    ('S03', 45923, 'man in a suit writing next to a tall stack of papers', '3'),
    ('S04', 29956, 'man in silhouette by an office window, the day going by', '3, 4'),
    ('S05', 49341, 'man comparing microwave ovens in a store', '11'),
    ('S06', 6102, 'grocery shelves full of produce (too many options, no people)', '14, 15'),
    ('S07', 39823, 'phone countdown timer on a table (no people)', '16'),
    ('S08', 49889, 'chess clock on a marble board (no people)', '17'),
    ('S09', 5419, 'businessman thinking by the window', '18'),
    ('S10', 5338, 'hand moving a chess piece (the decision)', '19'),
    ('S11', 45460, 'man in a shemagh smiling at his laptop', '20'),
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
