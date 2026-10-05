# python stock/fetch.py — بينزّل لقطات الواقع للحلقة ١ (Mixkit Free License) بأعلى جودة متاحة.
# الفيديوهات نفسها مش في git (كبيرة)؛ الملف ده + credits.txt هما المرجع.
import os, urllib.request
HERE = os.path.dirname(os.path.abspath(__file__))
PICKS = [  # (اسم الملف، Mixkit id، الوصف، الفقرات)
    ('R01', 48285, 'laptop with a green screen (static) — بنركّب عليه شاشة فيها ١٧ تاب', '1-2'),
    ('R03', 21836, 'woman checking her phone in a cafe, laptop open', '2'),
    ('R04a', 34198, 'hand hesitating over a laptop trackpad (close-up, no face)', '3'),
    ('R04b', 5572, 'man thinking at his laptop at night, hand to mouth', '3-4, 15'),
    ('R05', 1781, 'typing on a laptop close-up', '17'),
    ('R06', 43246, 'woman working on her laptop in a coffee shop', '19'),
    ('R07', 39781, 'woman on a video call by tablet', '19'),
    ('R08', 9267, 'pouring tea in a glass cup', '19'),
    ('R09', 1795, 'black cellphone face down on a wooden table', '21'),
    ('R10', 4957, 'young woman working calmly, natural light', '22'),
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
