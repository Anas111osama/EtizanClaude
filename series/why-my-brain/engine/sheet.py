# python sheet.py out.jpg f1.jpg f2.jpg … — شيت مراجعة (بيكتب الوقت فوق كل فريم)
import sys
from PIL import Image, ImageDraw
out, fs = sys.argv[1], sys.argv[2:]
ims = [Image.open(f) for f in fs]; w0, h0 = ims[0].size
W = 640 if w0 > h0 else 300; H = int(W * h0 / w0); cols = 3 if w0 > h0 else 6; rows = (len(fs) + cols - 1) // cols
S = Image.new('RGB', (cols * W, rows * (H + 26)), 'white'); d = ImageDraw.Draw(S)
for i, (f, im) in enumerate(zip(fs, ims)):
    x, y = (i % cols) * W, (i // cols) * (H + 26); S.paste(im.resize((W - 4, H)), (x, y + 24)); d.text((x + 4, y + 6), f.split('_')[-1][:-4] + 's', fill='black')
S.save(out, quality=84)
