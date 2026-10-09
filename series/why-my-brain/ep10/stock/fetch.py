# python stock/fetch.py — بينزّل لقطات الواقع للحلقة ٧ (Mixkit Free License) بأعلى جودة متاحة.
# الفيديوهات نفسها مش في git (كبيرة)؛ الملف ده + credits.txt هما المرجع.
import os, urllib.request
HERE = os.path.dirname(os.path.abspath(__file__))
PICKS = [  # (اسم الملف، Mixkit id، الوصف، الفقرات) — رجالة بمظهر محافظ بس أو من غير ناس (مفيش ستات، ولا في الخلفية، ولا على شاشة؛ ومفيش حلق أو بيرسينج أو خمور)
    ('U01', 14856, 'man at his kitchen table with tea and a laptop (a full day)', '1'),
    ('U02', 24504, 'hands kneading dough (cooked dinner)', '1'),
    ('U03', 16138, 'man awake at night, face lit by a tablet', '1'),
    ('U04', 46755, 'two men in suits shaking hands ("well done")', '2'),
    ('U05', 8843, 'man in a dark room staring, the inner voice', '3, 4'),
    ('U06', 1446, 'tape measure along a block of wood (the ruler)', '7'),
    ('U07', 21589, 'empty school library (old voices from years ago)', '18'),
    ('U08', 13881, 'man with a pen and a blank sheet (write three things)', '14'),
    ('U09', 46977, 'magnifying glass over papers (seeing what is there)', '15'),
    ('U10', 14723, 'man walking up a long flight of stairs', '16'),
    ('U11', 3679, 'digital stopwatch counting (ten minutes)', '17'),
    ('U12', 14612, 'calm, focused man at his laptop', '19'),
    ('U13', 38418, 'man sitting by a lake at sunset', '20'),
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
