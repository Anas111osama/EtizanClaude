# python stock/fetch.py — بينزّل لقطات الواقع للحلقة ٤ (Mixkit Free License) بأعلى جودة متاحة.
# الفيديوهات نفسها مش في git (كبيرة)؛ الملف ده + credits.txt هما المرجع.
import os, urllib.request
HERE = os.path.dirname(os.path.abspath(__file__))
PICKS = [  # (اسم الملف، Mixkit id، الوصف، الفقرات) — رجالة بمظهر محافظ بس أو من غير ناس (مفيش ستات، ولا في الخلفية، ولا على شاشة موبايل؛ ومفيش حلق أو بيرسينج أو خمور)
    ('H11', 8829, 'fridge door opens on full shelves (only a hand, no faces)', '1, 20'),
    ('H10', 4634, 'man in a suit talking, then pauses ("what was I saying?")', '2'),
    ('H03', 48297, 'light bulb lights up in the dark, then fades out (an idea that slips away)', '2'),
    ('H04', 5507, 'pensive man stroking his beard by the window', '3, 20'),
    ('H05', 25382, 'washing machine drum spinning (no people)', '10'),
    ('H06', 15774, 'man in his living room thinking and writing in a notebook', '14'),
    ('H07', 5416, 'man thinking hard while working on his laptop at home', '16'),
    ('H08', 4830, 'man working on his laptop in the kitchen', '18'),
    ('H09', 9188, 'man thinks before starting work, then opens his laptop', '6'),
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
