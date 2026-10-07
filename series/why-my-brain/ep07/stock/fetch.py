# python stock/fetch.py — بينزّل لقطات الواقع للحلقة ٧ (Mixkit Free License) بأعلى جودة متاحة.
# الفيديوهات نفسها مش في git (كبيرة)؛ الملف ده + credits.txt هما المرجع.
import os, urllib.request
HERE = os.path.dirname(os.path.abspath(__file__))
PICKS = [  # (اسم الملف، Mixkit id، الوصف، الفقرات) — رجالة بس أو من غير ناس (مفيش ستات، ولا في الخلفية، ولا على شاشة موبايل)
    ('M01', 12964, 'man on a phone call, his face drops', '1'),
    ('M02', 8744, 'young man upset after reading a message', '2'),
    ('M03', 4701, 'man with his head in his hand, replaying it', '2'),
    ('M04', 31414, 'man restless in bed at night', '3'),
    ('M05', 7194, 'big wave rising and crashing (no people)', '7, 9'),
    ('M06', 25163, 'gentle waves at sunset (no people)', '19'),
    ('M07', 46062, 'man taking a deep breath in a sunny forest', '16'),
    ('M08', 47241, 'light bulb switching on in the dark (no people)', '15'),
    ('M09', 16139, 'man writing late at night with tea', '18'),
    ('M10', 47044, 'pensive man sitting in a park', '20'),
    ('M11', 9294, 'waves breaking over rocks (no people)', '10'),
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
