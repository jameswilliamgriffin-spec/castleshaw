#!/usr/bin/env python3
"""Move every :hover selector into @media (hover: hover), so hover effects never stick after a tap.

Run from site/:  python3 scripts/gate-hover.py v2/src/styles.css v2/src/inner.css ...
For each rule whose selector list contains :hover, the :hover selectors are moved into an
@media (hover: hover) block placed right where the rule was (so the cascade order is kept);
any other selectors in the same list (for example :focus-visible) stay as they are.
Rules already inside a hover media query, and keyframes, are left alone. Safe to run twice.
"""
import re, sys

def blocks(css, i=0):
    """Split css (from index i) into top-level items: ('raw', text) or ('rule', prelude, body)."""
    out, start = [], i
    while i < len(css):
        if css.startswith('/*', i):
            j = css.find('*/', i + 2); i = len(css) if j < 0 else j + 2; continue
        c = css[i]
        if c in '"\'':
            j = i + 1
            while j < len(css) and css[j] != c: j += 2 if css[j] == '\\' else 1
            i = j + 1; continue
        if c == '{':
            pre_start = start
            prelude = css[pre_start:i]
            depth, j = 1, i + 1
            while j < len(css) and depth:
                if css.startswith('/*', j):
                    k = css.find('*/', j + 2); j = len(css) if k < 0 else k + 2; continue
                if css[j] == '{': depth += 1
                elif css[j] == '}': depth -= 1
                j += 1
            out.append(('rule', prelude, css[i + 1:j - 1]))
            i = start = j; continue
        if c == ';' and css[start:i].lstrip().startswith('@'):
            out.append(('raw', css[start:i + 1])); i = start = i + 1; continue
        i += 1
    if start < len(css): out.append(('raw', css[start:]))
    return out

def split_selectors(sel):
    parts, depth, cur = [], 0, ''
    for ch in sel:
        if ch in '([': depth += 1
        elif ch in ')]': depth -= 1
        if ch == ',' and depth == 0: parts.append(cur); cur = ''
        else: cur += ch
    parts.append(cur)
    return parts

def process(css, gated=False):
    res = []
    for item in blocks(css):
        if item[0] == 'raw': res.append(item[1]); continue
        _, prelude, body = item
        p = prelude.strip()
        lead = prelude[:len(prelude) - len(prelude.lstrip())]
        if p.startswith('@'):
            if re.match(r'@(-webkit-)?keyframes', p) or p.startswith('@font-face'):
                res.append(prelude + '{' + body + '}'); continue
            inner_gated = gated or bool(re.search(r'hover:\s*hover', p))
            res.append(prelude + '{' + process(body, inner_gated) + '}'); continue
        sels = split_selectors(p)
        hov = [s.strip() for s in sels if ':hover' in s]
        if gated or not hov:
            res.append(prelude + '{' + body + '}'); continue
        rest = [s.strip() for s in sels if ':hover' not in s]
        if rest: res.append(lead + ', '.join(rest) + ' {' + body + '}\n')
        else: res.append(lead)
        res.append('@media (hover: hover) { ' + ', '.join(hov) + ' {' + body + '} }')
    return ''.join(res)

for path in sys.argv[1:]:
    src = open(path).read()
    out = process(src)
    if out != src:
        open(path, 'w').write(out)
        print(path, ':hover rules left ungated:', len(re.findall(r':hover', re.sub(r'@media \(hover: hover\) \{[^@]*?\} \}', '', out))))
