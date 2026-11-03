# Mobile clean-up: progress

Branch `mobile/cleanup` (from `imagery/internal-pages`). Audit: `qa/MOBILE-AUDIT.md`. Standard: `qa/MOBILE-STANDARDS.md`.

| Phase | Status | Notes |
|---|---|---|
| 0: Setup | Done | Vite + React; source `v2/` (Vite root), served from `/`. Dev `npm run dev` (5175), build `npm run build`, preview `npm run preview` (4175). Testing with the Playwright MCP and Chrome DevTools emulation (touch, DPR, CPU and network throttling); nothing to install. |
| 1: Audit | Done, awaiting approval | 34 pages, 6 viewports; 14 shared root causes. |
| 2: Shared layer | Not started | |
| 3: Homepage and signature interactions | Not started | |
| 4: Pilot internal page | Not started | |
| 5: Remaining pages | Not started | |
| 6: Site-wide QA | Not started | |

## Decisions and notes

- The brief refers to the homepage at `/v2/`; since the root change it is at `/`.

## How to resume

Run `npm run build && npm run preview` in `site/` (port 4175). Measure with `qa/mobile-audit.js` (Playwright MCP `browser_run_code_unsafe` with `filename`; first navigate to `http://localhost:4175/#["route/", ...]` to pass the routes). Continue from the first phase not marked Done.
