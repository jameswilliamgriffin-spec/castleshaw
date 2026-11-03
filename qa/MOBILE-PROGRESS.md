# Mobile clean-up: progress

Branch `mobile/cleanup` (from `imagery/internal-pages`). Audit: `qa/MOBILE-AUDIT.md`. Standard: `qa/MOBILE-STANDARDS.md`.

| Phase | Status | Notes |
|---|---|---|
| 0: Setup | Done | Vite + React; source `v2/` (Vite root), served from `/`. Dev `npm run dev` (5175), build `npm run build`, preview `npm run preview` (4175). Testing with the Playwright MCP and Chrome DevTools emulation (touch, DPR, CPU and network throttling); nothing to install. |
| 1: Audit | Done, approved | 34 pages, 6 viewports; 14 shared root causes. |
| 2: Shared layer | Done, approved | `ui/mobile.css`; hover gated in all stylesheets; safe areas; header 64/56px; type floors; inner hero proportions and landscape layout; portraits two-up at 320; menu back button; form controls and `enterkeyhint`; `svh`. Desktop verified pixel-identical on inner pages at 1440. |
| 3: Homepage and signature interactions | Done, approved | Sticky panels reachable; Call/Sound bar tucks over the form and while typing; homepage targets 44px; journey loop lighter, stills fallback on slow phones; hero headline; Call button on one line at 320. |
| 4: Pilot internal page | Done (Plan your visit), awaiting feedback | Kit lists as tap-to-open sections on phones; "On this page" label on phones; footer and CTA links 44px at all touch sizes. |
| 5: Remaining pages | Batch 1 (Activities) done, awaiting go-ahead | |
| 6: Site-wide QA | Not started | |

## Phase 2 results (inner pages, 390 unless stated)

- Tap targets under 44px: 3 per page → 0. Targets closer than 8px: 11–22 per page → 4 (the footer accordion rows, which count as separated rows).
- Text under 16px in sentences: about 30 styles → 0 (short labels 13px). Breadcrumbs stay at 14.4px (navigation labels).
- Our team at 320: 7,745px → 4,706px (portraits two to a row).
- Landscape (844×390): inner heroes are copy beside a small photo; header 56px; Stay's first section moves from the third screen to the second.
- No horizontal scroll at any width; desktop (1440) pixel-identical on Plan your visit and Stay; Holiday clubs and the homepage differ only in animated accents.
- Not yet done (Phase 3, homepage): journey controls covering content, "Six ways" chips, homepage targets, journey performance, homepage card images without dimensions.

## Phase 3 results (homepage)

- Planner panel: at 320, 509 of 627px could be seen → all 635px; in landscape 331 of 573px → all 582px. Testimonial stack: at 320, 509 of 833px → all 876px; in landscape 331 of 818px → all 842px.
- The contact form's Send button and message field are no longer covered (the bar tucks away over the contact panel and while typing).
- Homepage tap targets under 44px at 390: 21 → 0 (the hero link uses an invisible 44px hit area around its underline).
- Journey frame time on a 4×-throttled phone (DPR 3): 16.7ms median (60fps), 95th percentile 18.5ms portrait and 33ms landscape, with or without the new loop; the 30fps reading in Phase 1 did not reproduce in controlled runs (cold and warm). The loop now does less work per frame and has an automatic stills fallback for phones that really are slow.
- Swipe on the testimonial stack works with a real touch (1 of 12 → 2 of 12).

## Pages

| Page | Status | Commit | Notes |
|---|---|---|---|
| Activities hub (batch 1) | Done, no page change | — | Shared fixes it found: ledger figures had shrunk to 13px (fixed); hub tiles 16:9 on phones. "Who it's for" cards are long on phones (no shared tap-to-open block for cards yet). |
| Adventure on land (batch 1) | Done, no page change | — | Shared fixes it found: At a glance values level at 768; activity thumbnails 64px below 375px; What to bring box padding 24px under 600px. |
| Adventure on water (batch 1) | Done, no page change | — | Shared fix it found: "To confirm" boxes stack their label above the text under 900px (390: 6,852 → 6,585px). |
| Bushcraft (batch 1) | Done, no page change | — | Two activity images (Campcraft, Woodland skills) have empty alt text (valid, treated as decorative); adding alt text would be new copy: for the client. |
| Environmental education (batch 1) | Done | `mobile: environmental-education` | User approved tap-to-open topic cards and swipeable galleries on phones. The 10 topic cards are now `TopicCard`s ("Countryside adventures" stays open); 390: 10,772 → 7,850px. Desktop unchanged (7,103px). |
| Plan your visit (pilot) | Done | see git log (`mobile: plan-your-visit`) | 390: 11,525px → 9,775px. No overflow, no targets under 44px, headings in order, no console errors at 320/360/390/430/768/844×390; works at 200% text zoom; keyboard opens the kit lists; desktop unchanged (7,551px, lists open). No hero CTA added (content rule): the page's booking CTA stays at the end. |

## Decisions and notes

- **Optional desktop fix (not made):** at 1440 the three "At a glance" values on Land, Water and Bushcraft don't sit level (one is 51px higher). `align-content: start` on `.glance > div` fixes it; it is applied below 900px only, to leave desktop unchanged.

- The small floating accent beside some hero photos is picked from a hash of the image address, so it changed shape when the site moved from `/v2/` to `/` (earlier commit). Decorative only; left as is.

- The brief refers to the homepage at `/v2/`; since the root change it is at `/`.

## How to resume

Run `npm run build && npm run preview` in `site/` (port 4175). Measure with `qa/mobile-audit.js` (Playwright MCP `browser_run_code_unsafe` with `filename`; first navigate to `http://localhost:4175/#["route/", ...]` to pass the routes). Continue from the first phase not marked Done.
