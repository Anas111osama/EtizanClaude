import sys
from PIL import Image, ImageDraw
out = sys.argv[1]; fs = sys.argv[2:]; w, h = 360, 450; cols = min(6, len(fs)); rows = (len(fs) + cols - 1) // cols
S = Image.new('RGB', (cols * w, rows * (h + 26)), 'white'); d = ImageDraw.Draw(S)
for i, f in enumerate(fs):
    im = Image.open(f).convert('RGB').resize((w, h)); x, y = (i % cols) * w, (i // cols) * (h + 26)
    S.paste(im, (x, y + 26)); d.text((x + 6, y + 6), f.split('/')[-1], fill='black')
S.save(out, quality=88)
