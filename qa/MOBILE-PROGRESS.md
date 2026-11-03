# Mobile clean-up: progress

Branch `mobile/cleanup` (from `imagery/internal-pages`). Audit: `qa/MOBILE-AUDIT.md`. Standard: `qa/MOBILE-STANDARDS.md`.

| Phase | Status | Notes |
|---|---|---|
| 0: Setup | Done | Vite + React; source `v2/` (Vite root), served from `/`. Dev `npm run dev` (5175), build `npm run build`, preview `npm run preview` (4175). Testing with the Playwright MCP and Chrome DevTools emulation (touch, DPR, CPU and network throttling); nothing to install. |
| 1: Audit | Done, approved | 34 pages, 6 viewports; 14 shared root causes. |
| 2: Shared layer | Done, awaiting approval | `ui/mobile.css`; hover gated in all stylesheets; safe areas; header 64/56px; type floors; inner hero proportions and landscape layout; portraits two-up at 320; menu back button; form controls and `enterkeyhint`; `svh`. Desktop verified pixel-identical on inner pages at 1440. |
| 3: Homepage and signature interactions | Not started | |
| 4: Pilot internal page | Not started | |
| 5: Remaining pages | Not started | |
| 6: Site-wide QA | Not started | |

## Phase 2 results (inner pages, 390 unless stated)

- Tap targets under 44px: 3 per page → 0. Targets closer than 8px: 11–22 per page → 4 (the footer accordion rows, which count as separated rows).
- Text under 16px in sentences: about 30 styles → 0 (short labels 13px). Breadcrumbs stay at 14.4px (navigation labels).
- Our team at 320: 7,745px → 4,706px (portraits two to a row).
- Landscape (844×390): inner heroes are copy beside a small photo; header 56px; Stay's first section moves from the third screen to the second.
- No horizontal scroll at any width; desktop (1440) pixel-identical on Plan your visit and Stay; Holiday clubs and the homepage differ only in animated accents.
- Not yet done (Phase 3, homepage): journey controls covering content, "Six ways" chips, homepage targets, journey performance, homepage card images without dimensions.

## Decisions and notes

- The small floating accent beside some hero photos is picked from a hash of the image address, so it changed shape when the site moved from `/v2/` to `/` (earlier commit). Decorative only; left as is.

- The brief refers to the homepage at `/v2/`; since the root change it is at `/`.

## How to resume

Run `npm run build && npm run preview` in `site/` (port 4175). Measure with `qa/mobile-audit.js` (Playwright MCP `browser_run_code_unsafe` with `filename`; first navigate to `http://localhost:4175/#["route/", ...]` to pass the routes). Continue from the first phase not marked Done.
