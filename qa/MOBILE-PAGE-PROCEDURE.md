# Mobile page procedure (Phase 5, one page per subagent)

Project: `/Users/James/Desktop/0 Code Projects/Castle Shaw/site`. Branch `mobile/cleanup`. Read `qa/MOBILE-STANDARDS.md` first: it is the standard, and its last sections show the patterns already applied (the shared layer, the homepage, and the pilot, Plan your visit, `export function Plan` in `v2/src/pages/activities.jsx`).

The production preview runs at `http://localhost:4175` and serves `dist/`. **After every source change run `npm run build` in `site/`** (the preview serves the build, not the source). Do not start or stop the server; if it isn't answering, stop and report.

## Rules

- **Don't change** copy, content, URLs, routing or functionality. Don't add new blocks, links or calls to action. Don't reorder sections.
- **Don't change desktop** (900px and up, mouse). Everything you add must be scoped to phones, small tablets or touch, and you must confirm desktop is unchanged (the check script reports the 1440 height; compare it with the value before your change).
- **Edit only your page's component** (one exported function in its `v2/src/pages/*.jsx` file, plus that file's import line), and CSS scoped to that page if it needs any (put it in `v2/src/ui/mobile.css` **only if told to**; otherwise report it).
- **Shared files are off limits:** `v2/src/ui/**` (including `mobile.css` and `ui/inner/blocks.jsx`), `v2/src/inner.css`, `v2/src/styles.css`, `v2/src/advice-landing.css`, `v2/src/site.mjs`, and the `qa/` documents. If the page needs a shared change, **don't make it**: report it precisely (selector or block, rule, reason, which pages it affects).
- No new dependencies.

## Steps

1. **Read** the page's component, its notes in `qa/MOBILE-AUDIT.md`, and look at its before screenshots in `qa/mobile-before/<slug>/` (320×568, 390×844, 768×1024, 844×390).
2. **Measure:** navigate the Playwright browser to `http://localhost:4175/#"<route>"` (for example `#"activities/bushcraft/"`), then run `browser_run_code_unsafe` with `filename: /Users/James/Desktop/0 Code Projects/Castle Shaw/site/qa/mobile-check.js`. It reports, at 320/360/390/430/768/844×390: overflow, elements past the edge, targets under 44px, heading skips, sentence text under 16px, console errors, page height; plus 200% text zoom and the desktop height.
3. **Fix layout** (no horizontal scroll, overlaps, clipping; columns stack in a sensible order; consistent gutters and spacing; sensible image crops).
4. **Make it feel designed for mobile:** clear hierarchy, generous section spacing, short scannable blocks. **Topic cards:** where a group has 4 or more plain topic cards (`<div className="icard"><h3>…</h3>…</div>`, not link cards), convert them to the shared `<TopicCard title="…">…</TopicCard>` (import it from `../ui/inner/blocks`), keeping the content identical, and mark the single most important card `open` (see `export function Environment` in `activities.jsx`). Don't convert groups of 2–3, cards that are links, or cards holding a form or a call to action. Galleries are already a swipe row on phones. Long pages already have the "On this page" row.
5. **Touch:** 44px targets, no hover-only behaviour, visible pressed states (the shared layer provides these; check nothing on your page escapes them).
6. **Forms and tables:** one-thumb use, correct keyboard types.
7. **Accessibility:** contrast, focus order, headings in order, labels, works at 200% text zoom.
8. **Verify:** rebuild, re-run `qa/mobile-check.js` until it is clean; then screenshot with `filename: qa/mobile-shots.js` (same hash navigation first) and make the compare sheet with `python3 qa/mobile-compare.py <slug>` (run from `site/`). Look at `qa/mobile-after/<slug>/_compare.jpg` critically.
9. **Commit** only your page file: `git add <file> && git -c user.name="James Griffin" -c user.email="james.griffin@creativealliance.org.uk" commit -m "mobile: <slug>"` with the last line `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Don't push. If nothing needed changing in the page file, say so and don't commit.

The slug is the route with slashes turned into `--` (for example `activities--bushcraft`; the hub is `activities`).

## Report (short)

- What you changed (bullets), or "no page change needed" and why.
- The final check results at each size (overflow, small targets, skips, small text, errors), 200% zoom, desktop height before and after.
- The commit hash (or none).
- Shared changes needed: selector/block, rule, reason, pages affected.
- Open issues or decisions.
