# python build/prep.py — يجهّز لقطات الـ stock للمحرك: فريمات JPG بـ 30fps و1920×1080 (build/frames/<ID>/00001.jpg…)
# وR01 (اللابتوب الأخضر): فريم واحد ثابت، الأخضر بيتشال (PNG شفاف) + مكان الشاشة.
import os, subprocess, json, glob
import numpy as np
from PIL import Image
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); B = os.path.join(R, 'build')
import sys
CLIPS = json.load(open(os.path.join(R, 'build', 'clips.json'))) if os.path.exists(os.path.join(R, 'build', 'clips.json')) else {'R02': 20, 'R03': 16.4, 'R04a': 18.8, 'R04b': 10.4, 'R05': 12, 'R06': 10.6, 'R07': 11, 'R08': 16, 'R09': 11.6, 'R10': 13.2}
info = {}
for cid, dur in CLIPS.items():
    out = os.path.join(B, 'frames', cid); os.makedirs(out, exist_ok=True)
    if not glob.glob(out + '/*.jpg'):
        subprocess.check_call(['ffmpeg', '-v', 'error', '-i', os.path.join(R, 'stock', cid + '.mp4'), '-t', str(dur), '-vf',
            'fps=30,scale=1920:1080:flags=lanczos,eq=saturation=0.92', '-q:v', '3', os.path.join(out, '%05d.jpg')])
    info[cid] = len(glob.glob(out + '/*.jpg')); print(cid, info[cid], 'frames', flush=True)
# R01: فريم ثابت + كيي للأخضر (الحلقة ١ بس)
if not os.path.exists(os.path.join(R, 'stock', 'R01.mp4')):
    json.dump(info, open(os.path.join(B, 'frames', 'info.json'), 'w')); open(os.path.join(B, 'frames', 'info.js'), 'w').write('window.FOOT=' + json.dumps(info) + ';'); sys.exit(0)
fr = os.path.join(B, 'frames', 'R01_src.png')
if not os.path.exists(fr): subprocess.check_call(['ffmpeg', '-v', 'error', '-y', '-ss', '9', '-i', os.path.join(R, 'stock', 'R01.mp4'), '-frames:v', '1', '-vf', 'scale=1920:1080:flags=lanczos', fr])
im = np.asarray(Image.open(fr).convert('RGB')).astype(np.float32)
r, g, b = im[..., 0], im[..., 1], im[..., 2]
spill = np.where(g > b + 6, g - r, 0)                # الشاشة أخضر مايل للتيل (62,130,112): g-r ≈ 68
a = np.clip(1 - (spill - 30) / 25, 0, 1)            # ٣٠ فأقل = معتم، ٥٥ فأكتر = شفاف
green = spill > 50
ys, xs = np.where(green)
box = {'x': int(xs.min()), 'y': int(ys.min()), 'w': int(xs.max() - xs.min()), 'h': int(ys.max() - ys.min())}
im[..., 1] = np.minimum(g, np.maximum(r, b) + 8)    # شيل الأخضر من الحواف
rgba = np.dstack([im, a * 255]).astype(np.uint8)
Image.fromarray(rgba, 'RGBA').save(os.path.join(B, 'frames', 'R01_key.png'))
info['R01'] = {'screen': box}
json.dump(info, open(os.path.join(B, 'frames', 'info.json'), 'w'))
open(os.path.join(B, 'frames', 'info.js'), 'w').write('window.FOOT=' + json.dumps(info) + ';')
print('R01 screen', box)
