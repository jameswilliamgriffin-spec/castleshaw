#!/usr/bin/env python3
"""Phone- and tablet-sized WebP copies of the site's photos, so phones don't download full-size JPEGs.

For every JPEG/PNG photo in public/shared/images/{site,gallery,team} and public/shared/images/*.jpg,
writes public/shared/images/rs/<folder>/<name>-<width>.webp at 480, 720 and 960 pixels wide (never wider
than the original), and lists them in v2/src/content/responsive.json, which the page components read
to offer a srcset. Re-run after adding or replacing photos; unchanged photos are skipped.

    python3 scripts/responsive.py
"""
import json, os
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(ROOT, 'public')
OUT = os.path.join(PUB, 'shared/images/rs')
MANIFEST = os.path.join(ROOT, 'v2/src/content/responsive.json')
WIDTHS = [480, 720, 960]
QUALITY = 72

def sources():
    base = os.path.join(PUB, 'shared/images')
    for name in sorted(os.listdir(base)):
        if name.lower().endswith(('.jpg', '.jpeg')) and not name.startswith('logo'):
            yield f'shared/images/{name}'
    for folder in ('site', 'gallery', 'team'):
        d = os.path.join(base, folder)
        for name in sorted(os.listdir(d)):
            if name.lower().endswith(('.jpg', '.jpeg', '.png')):
                yield f'shared/images/{folder}/{name}'

manifest, made = {}, 0
for rel in sources():
    src = os.path.join(PUB, rel)
    stem = os.path.splitext(rel[len('shared/images/'):])[0]
    with Image.open(src) as im:
        im = ImageOps.exif_transpose(im)
        w, h = im.size
        widths = [x for x in WIDTHS if x < w] or [w]
        for tw in widths:
            dest = os.path.join(OUT, f'{stem}-{tw}.webp')
            if os.path.exists(dest) and os.path.getmtime(dest) >= os.path.getmtime(src):
                continue
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            th = round(h * tw / w)
            im.convert('RGB').resize((tw, th), Image.LANCZOS).save(dest, 'WEBP', quality=QUALITY, method=6)
            made += 1
    manifest[rel] = {'w': w, 'h': h, 'widths': widths}

with open(MANIFEST, 'w') as f:
    json.dump(manifest, f, indent=1, sort_keys=True)
    f.write('\n')
print(f'responsive: {len(manifest)} photos, {made} WebP files written')
