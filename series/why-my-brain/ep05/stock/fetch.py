# python stock/fetch.py — بينزّل لقطات الواقع للحلقة ٥ (Mixkit Free License) بأعلى جودة متاحة.
# الفيديوهات نفسها مش في git (كبيرة)؛ الملف ده + credits.txt هما المرجع.
import os, urllib.request
HERE = os.path.dirname(os.path.abspath(__file__))
PICKS = [  # (اسم الملف، Mixkit id، الوصف، الفقرات) — رجالة بس أو من غير ناس (مفيش ستات، ولا في الخلفية، ولا على شاشة موبايل)
    ('K01', 4793, 'young man writing a plan at his desk (lamp, papers)', '1'),
    ('K02', 21222, "man's hands writing a detailed itinerary (close-up)", '1'),
    ('K03', 5608, 'stressed businessman leans back, exhausted at his desk', '2'),
    ('K04', 45922, 'young businessman overwhelmed with paperwork', '12'),
    ('K05', 23073, 'man on a phone call at his desk', '12'),
    ('K06', 8904, 'man at his laptop, then rubs his face, tired', '3'),
    ('K08', 9188, 'man thinks, then opens his laptop and starts', '21'),
    ('K10', 45922, 'young businessman overwhelmed with paperwork', '12'),
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
