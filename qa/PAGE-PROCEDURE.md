# Page procedure (every internal page)

Project: `/Users/James/Desktop/0 Code Projects/Castle Shaw/site`. The dev server is already running at `http://localhost:5175` (do not start or stop it). Pages are at `http://localhost:5175/v2/<route>`.

## Rules

- **Don't change** existing copy, page content, URLs, routing or functionality.
- **You may add** short visible section headings, per the "Section headings" rule in `qa/STANDARDS.md`.
- **Edit only your page's component** (one exported function in its `v2/src/pages/*.jsx` file), plus that file's import line.
- **Don't edit shared files:** `v2/src/inner.css`, `v2/src/ui/**`, `v2/src/styles.css`, `v2/src/site.mjs`, `qa/STANDARDS.md`, `qa/AUDIT.md`, `qa/PROGRESS.md`. If the page needs a shared change (a new class, a block option, a CSS fix), **don't make it**: describe it precisely in your report (selector, rule, reason) and use the best option available meanwhile.
- **Use what exists.** Blocks from `v2/src/ui/inner/blocks.jsx`: `PageTop`, `Band`, `SectionHead`, `Intro`, `Split`, `Ticks`, `Ledger`, `Steps`, `TileLinks`, `ActivityList`, `Gallery`, `Quote`, `Quotes`, `People`, `Timeline`, `Faq`, `Downloads`, `LinkList`, `Facilities`, `Kit`, `Callout`, `CtaBand`, `AdviceNote`, `SqLink`, `OnThisPage`, `Btn`, `TBC`, plus the helpers `img`, `gen`, `shared`, `ill`, `gal`.
- **Don't add images** that aren't already in the page, and don't add dependencies.
- **Mutual exclusions:**
  - No `Intro` (two-column) inside a `.cols` column.
  - No more than one arch per page.
  - At most one `SqLink` per section.
  - `OnThisPage` only on pages with four or more sections (give those `Band`s an `id`).

## Steps

1. **Read.** Read `qa/STANDARDS.md`, your page's audit note, and your page's component. Open the page at 1440, 1024, 768 and 390.
2. **Fix layout:** overlaps, clipping, overflow, the grid, section rhythm (one `Band` per section; same-tone neighbours merge), image cropping, and text over images.
3. **Raise the design** to the standard: a visible h2 per section (`SectionHead`), clear hierarchy, consistent tones, and imagery treatment within the rules.
4. **Interaction, sparingly:**
   - Reveals are automatic per `Band`.
   - Use `SqLink` for the key link of a section, `Faq` for long FAQ-style content, and `OnThisPage` for long pages.
   - Keep one clear primary call to action (the closing `CtaBand`).
5. **Mobile at 390:** stacked layout, 44px tap targets, no sideways scroll, readable type.
6. **Accessibility:** one h1, headings in order (h2 before h3), alt text kept, AA contrast, visible focus.
7. **Verify.** Screenshot full-page at 1440, 1024, 768 and 390 into `qa/after/<slug>/<width>.jpg`, then make `qa/after/<slug>/_compare.jpg` (before and after pairs; script below). Look at them critically. Check the console for errors and that `document.documentElement.scrollWidth - innerWidth === 0`. Repeat until it passes.
8. **Commit** only your page file: `git add v2/src/pages/<file>.jsx && git -c user.name="James Griffin" -c user.email="james.griffin@creativealliance.org.uk" commit -m "polish: <slug>"`, with the line `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` at the end of the message. Don't push.

## Screenshot script

Use the Playwright MCP tool `browser_run_code_unsafe`. Replace `ROUTE` and `SLUG`:

```js
async (page) => {
  const ROOT = '/Users/James/Desktop/0 Code Projects/Castle Shaw/site/qa/after/SLUG/'; const out = {};
  for (const w of [1440, 1024, 768, 390]) {
    const errs = []; const onE = (e) => errs.push(e.message); const onC = (m) => { if (m.type() === 'error') errs.push(m.text()) };
    page.on('pageerror', onE); page.on('console', onC);
    await page.setViewportSize({ width: w, height: 900 });
    await page.goto('http://localhost:5175/v2/ROUTE', { waitUntil: 'networkidle' });
    out[w] = await page.evaluate(async () => {
      document.querySelectorAll('img').forEach((i) => { i.loading = 'eager' });
      for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)) }
      scrollTo(0, 0); await new Promise((r) => setTimeout(r, 900));
      const hs = [...document.querySelectorAll('main h1, main h2, main h3')]; let skip = 0, last = 1; for (const h of hs) { const l = +h.tagName[1]; if (l > last + 1) skip++; last = l }
      const small = innerWidth < 600 ? [...document.querySelectorAll('main a, main button')].filter((e) => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 2 && s.visibility !== 'hidden' && !(s.display === 'inline' && e.closest('p, li, dd, td')) && r.height < 40 }).map((e) => e.textContent.trim().slice(0, 24)) : [];
      return { over: document.documentElement.scrollWidth - innerWidth, h1: document.querySelectorAll('main h1').length, skip, small };
    });
    await page.screenshot({ path: `${ROOT}${w}.jpg`, type: 'jpeg', quality: 55, fullPage: true });
    out[w].errs = errs; page.off('pageerror', onE); page.off('console', onC);
  }
  return out;
}
```

Make the compare sheet with Python (Pillow is installed), run from `site/qa`:

```sh
python3 - <<'PY'
from PIL import Image, ImageDraw
Image.MAX_IMAGE_PIXELS=None
page='SLUG'; ims=[]
for w,sc in [('1440',.27),('1024',.36),('768',.42),('390',.6)]:
    for tag,base in [('before','before'),('after','after')]:
        im=Image.open(f'{base}/{page}/{w}.jpg'); ims.append((f'{tag} {w}',im.resize((int(im.width*sc),int(im.height*sc)))))
H=max(i.height for _,i in ims)+40; W=sum(i.width for _,i in ims)+12*(len(ims)+1)
s=Image.new('RGB',(W,H),'#555'); d=ImageDraw.Draw(s); x=12
for lab,im in ims: d.text((x,10),lab,fill='white'); s.paste(im,(x,30)); x+=im.width+12
s.save(f'after/{page}/_compare.jpg',quality=72)
PY
```

To look closely, crop the 1440 and 390 screenshots into sections and view them at near-native scale.

## Report back (keep it short)

- What you changed (bullets).
- Checks: over, h1, skip and small at each width, plus console errors.
- The commit hash.
- Shared changes needed, if any: selector, rule and reason.
- Open issues or ambiguities, such as missing content or a decision you made.
