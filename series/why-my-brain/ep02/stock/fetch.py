# python stock/fetch.py — بينزّل لقطات الواقع للحلقة ٢ (Mixkit Free License) بأعلى جودة متاحة.
# الفيديوهات نفسها مش في git (كبيرة)؛ الملف ده + credits.txt هما المرجع.
import os, urllib.request
HERE = os.path.dirname(os.path.abspath(__file__))
PICKS = [  # (اسم الملف، Mixkit id، الوصف، الفقرات) — رجالة بمظهر محافظ بس أو من غير ناس (مفيش ستات، ولا في الخلفية، ولا على شاشة موبايل؛ ومفيش حلق أو بيرسينج أو خمور)
    ('E01', 13168, 'man lying on his bed scrolling on his phone', '1-2'),
    ('E02', 31413, 'man in bed at night, phone light on his face (first 8 s only)', '3'),
    ('E03', 28886, 'analog wall clock, minute hand ticking', '2, 8'),
    ('E04', 39779, "man's hand checking his smartwatch", '10'),
    ('E05', 42937, 'pages of a book closing (no people)', '12'),
    ('E06', 34190, 'man reading the newspaper, hands', '12'),
    ('E15', 4801, 'overhead: man at his desk scrolling his phone (screen not readable)', '2'),
    ('E17', 4805, 'businessman texting on the street (screen not visible)', '2'),
    ('E09', 28902, 'alarm clock on a wooden table (no people)', '18'),
    ('E10', 24217, 'man using his phone at his desk at night', '23'),
    ('E11', 1795, 'black cellphone face down on a wooden table', '21'),
    ('E12', 9267, 'pouring tea in a glass cup', '20'),
    ('E13', 35362, "man's hands writing in a notebook", '24'),
    ('E14', 28901, 'sand falling in an hourglass (no people)', '9'),
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
