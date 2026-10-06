# python stock/fetch.py — بينزّل لقطات الواقع للحلقة ٣ (Mixkit Free License) بأعلى جودة متاحة.
# الفيديوهات نفسها مش في git (كبيرة)؛ الملف ده + credits.txt هما المرجع.
import os, urllib.request
HERE = os.path.dirname(os.path.abspath(__file__))
PICKS = [  # (اسم الملف، Mixkit id، الوصف، الفقرات) — رجالة بس أو من غير ناس (مفيش ستات، ولا في الخلفية، ولا على شاشة موبايل)
    ('G01', 28900, 'digital clock in the dark: 11:59 -> 12:00 (no people)', '1'),
    ('G02', 41643, 'programmer working at night, then hands typing on a lit keyboard', '2'),
    ('G03', 17450, 'silhouette hands typing on a laptop at night', '2'),
    ('G04', 8843, 'man in a dark room, face lit by the laptop screen', '2'),
    ('G05', 24055, 'man asleep on his desk at night (city window)', '3'),
    ('G06', 5601, 'tired man rubbing his eyes at the office at night', '12'),
    ('G07', 16139, 'man writing late at night with a cup of tea', '12'),
    ('G08', 722, 'man running on a park trail (from behind)', '13'),
    ('G09', 14734, 'young man studying in a library', '13'),
    ('G10', 35903, 'man writing in his planner', '16'),
    ('G11', 23073, 'man on a phone call at his desk', '18'),
    ('G12', 10441, 'man on a video call with earphones', '18'),
    ('G13', 39825, 'pedestrian traffic light counting down to zero (no people)', '20'),
    ('G14', 48503, 'young man focused, working at his desk in daylight', '21'),
    ('G15', 4827, "man's hands typing on a laptop", '11, 17'),
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
