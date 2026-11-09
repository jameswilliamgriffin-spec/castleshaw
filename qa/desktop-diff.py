#!/usr/bin/env python3
"""Compares the desktop screenshots from qa/desktop-compare.js (baseline vs now, 1440 wide).

For each page: the share of pixels that differ, the vertical bands where they differ, and a sheet
qa/_tmp/desk/_diff-<slug>.jpg (baseline | now | differences in red), scaled down to look at.
    python3 qa/desktop-diff.py
"""
import os
from PIL import Image, ImageChops

D = os.path.join(os.path.dirname(os.path.abspath(__file__)), '_tmp/desk')
for slug in ['home', 'stay', 'activities--adventure-on-land', 'about--what-people-say', 'advice-and-guidance']:
    a = Image.open(os.path.join(D, f'base-{slug}.png')).convert('RGB')
    b = Image.open(os.path.join(D, f'now-{slug}.png')).convert('RGB')
    h = max(a.height, b.height)
    A = Image.new('RGB', (1440, h), 'white'); A.paste(a, (0, 0))
    B = Image.new('RGB', (1440, h), 'white'); B.paste(b, (0, 0))
    diff = ImageChops.difference(A, B).convert('L').point(lambda v: 255 if v > 24 else 0)
    changed = sum(1 for v in diff.getdata() if v)
    # vertical bands (in 20px rows) that contain differences
    rows = [y for y in range(0, h, 20) if diff.crop((0, y, 1440, min(h, y + 20))).getbbox()]
    bands, start, prev = [], None, None
    for y in rows:
        if start is None: start = prev = y
        elif y - prev > 40: bands.append((start, prev + 20)); start = y
        prev = y
    if start is not None: bands.append((start, prev + 20))
    print(f'{slug}: heights {a.height} -> {b.height}, {100 * changed / (1440 * h):.2f}% of pixels differ; bands: {bands[:8]}{" …" if len(bands) > 8 else ""}')
    red = Image.new('RGB', (1440, h), (255, 255, 255)); red.paste((220, 30, 30), mask=diff)
    sheet = Image.new('RGB', (1440 * 3 + 40, h), (60, 60, 60))
    for i, im in enumerate((A, B, red)): sheet.paste(im, (i * 1460, 0))
    sheet.thumbnail((1500, 4000))
    sheet.save(os.path.join(D, f'_diff-{slug}.jpg'), quality=70)
