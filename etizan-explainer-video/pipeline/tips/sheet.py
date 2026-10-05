import sys, glob
from PIL import Image, ImageDraw
fs = sys.argv[2:]; out = sys.argv[1]
w, h = 360, 640; cols = min(6, len(fs)); rows = (len(fs) + cols - 1) // cols
S = Image.new('RGB', (cols * w, rows * (h + 30)), 'white'); d = ImageDraw.Draw(S)
for i, f in enumerate(fs):
    im = Image.open(f).resize((w, h)); x, y = (i % cols) * w, (i // cols) * (h + 30)
    S.paste(im, (x, y + 30)); d.text((x + 8, y + 8), f.split('_')[-1], fill='black')
S.save(out, quality=85)
