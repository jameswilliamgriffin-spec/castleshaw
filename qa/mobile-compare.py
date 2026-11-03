# Before/after sheet for one page: python3 qa/mobile-compare.py <slug>  (run from site/)
import sys
from PIL import Image, ImageDraw
Image.MAX_IMAGE_PIXELS = None
slug = sys.argv[1]
views = [('320x568', .5), ('390x844', .42), ('768x1024', .26), ('844x390', .26)]
tiles = []
for v, sc in views:
    for tag, base in (('before', 'qa/mobile-before'), ('after', 'qa/mobile-after')):
        try: im = Image.open(f'{base}/{slug}/{v}.jpg')
        except FileNotFoundError: continue
        tiles.append((f'{tag} {v}', im.resize((int(im.width * sc), int(im.height * sc)))))
H = max(t.height for _, t in tiles) + 30
W = sum(t.width + 12 for _, t in tiles) + 12
s = Image.new('RGB', (W, H), '#555'); d = ImageDraw.Draw(s); x = 12
for lab, t in tiles: d.text((x, 8), lab, fill='white'); s.paste(t, (x, 26)); x += t.width + 12
s.save(f'qa/mobile-after/{slug}/_compare.jpg', quality=70)
print(slug, s.size)
