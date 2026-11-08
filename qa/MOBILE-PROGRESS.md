# Mobile clean-up: progress

Branch `mobile/cleanup` (from `imagery/internal-pages`). Audit: `qa/MOBILE-AUDIT.md`. Standard: `qa/MOBILE-STANDARDS.md`.

| Phase | Status | Notes |
|---|---|---|
| 0: Setup | Done | Vite + React; source `v2/` (Vite root), served from `/`. Dev `npm run dev` (5175), build `npm run build`, preview `npm run preview` (4175). Testing with the Playwright MCP and Chrome DevTools emulation (touch, DPR, CPU and network throttling); nothing to install. |
| 1: Audit | Done, approved | 34 pages, 6 viewports; 14 shared root causes. |
| 2: Shared layer | Done, approved | `ui/mobile.css`; hover gated in all stylesheets; safe areas; header 64/56px; type floors; inner hero proportions and landscape layout; portraits two-up at 320; menu back button; form controls and `enterkeyhint`; `svh`. Desktop verified pixel-identical on inner pages at 1440. |
| 3: Homepage and signature interactions | Done, approved | Sticky panels reachable; Call/Sound bar tucks over the form and while typing; homepage targets 44px; journey loop lighter, stills fallback on slow phones; hero headline; Call button on one line at 320. |
| 4: Pilot internal page | Done (Plan your visit), awaiting feedback | Kit lists as tap-to-open sections on phones; "On this page" label on phones; footer and CTA links 44px at all touch sizes. |
| 5: Remaining pages | Batch 1 (Activities) done and approved; batch 2 approved; batches 1–3 done (Advice restructured afterwards); batch 4 done, awaiting go-ahead | |
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
| Roman and local history (batch 2) | Done | db15537 | The four Local history cards are `TopicCard`s ("The Industrial Revolution" stays open). Desktop unchanged. |
| Team building (batch 2) | Done, no page change | — | Its only card group has three cards (below the four-card threshold); all checks clean; desktop 5,243px. |
| How it works (batch 2) | Done | 0295052 | The four "What we look at" cards are `TopicCard`s ("Planning" stays open; Risk management is the alternative). Steps and the two Evolve cards unchanged. 390: 7,566 → 7,178px; desktop unchanged (5,752px). |
| Service agreement (batch 2) | Done | ddaff60 | Of the six "What's included" cards, four are `TopicCard`s ("Advice and approval" stays open); Training and Emergency support hold links, so they stay plain (mixed rhythm on phones: decision for the user). Phone numbers no longer split at 320 (non-breaking spaces). 390: 7,286 → 6,559px; desktop unchanged (4,794px). |
| Who it's for (batch 2) | Done | 815da7d, 3271751 | The four "Who can join" cards are `TopicCard`s ("Oldham maintained schools" stays open). They are link targets from the advice landing page's audience tabs, so `TopicCard` now takes an `id` and a link to the card opens it (shared change, 815da7d). 390: 5,895 → 5,076px; desktop unchanged (4,251px). |
| Shared: three-photo galleries (batch 2) | Done | 214d18a | At 600–899px a gallery of exactly three photos sits three across, not two and one. |
| Plan your visit (pilot) | Done | see git log (`mobile: plan-your-visit`) | 390: 11,525px → 9,775px. No overflow, no targets under 44px, headings in order, no console errors at 320/360/390/430/768/844×390; works at 200% text zoom; keyboard opens the kit lists; desktop unchanged (7,551px, lists open). No hero CTA added (content rule): the page's booking CTA stays at the end. |

## Decisions and notes

- **Open (batch 2):** on Service agreement, Training and Emergency support stay as open cards among the collapsed rows because they hold links. They could become `TopicCard`s if the rule allows a trailing "more" link. How it works keeps Planning open (Risk management is the alternative).

- **Optional desktop fix (not made):** at 1440 the three "At a glance" values on Land, Water and Bushcraft don't sit level (one is 51px higher). `align-content: start` on `.glance > div` fixes it; it is applied below 900px only, to leave desktop unchanged.

- The small floating accent beside some hero photos is picked from a hash of the image address, so it changed shape when the site moved from `/v2/` to `/` (earlier commit). Decorative only; left as is.

- The brief refers to the homepage at `/v2/`; since the root change it is at `/`.

## How to resume

Run `npm run build && npm run preview` in `site/` (port 4175). Measure with `qa/mobile-audit.js` (Playwright MCP `browser_run_code_unsafe` with `filename`; first navigate to `http://localhost:4175/#["route/", ...]` to pass the routes). Continue from the first phase not marked Done.

## Paused (batch 3)

- Done: Training (a3dc006), Emergency support (no change), Guidance and resources (no change), Our advisers (no page change; shared people fix 8bb16f5), Questions (d6acbc0), Get a quote (7580676). Shared fixes 3a4a4d1, 8f4bea3, 8bb16f5.
- **Found:** `qa/mobile-check.js` measured overflow against `innerWidth`, which grows under mobile emulation when content overflows, so earlier "200% zoom: no overflow" results were not reliable. Fixed (it now measures against the device width). New `qa/overflow-sweep.js` (every page, 320/390/768 and 200% text at 320/390) and `qa/heights.js` (page heights, to prove a shared change leaves normal text alone).
- **In progress, committed as WIP:** large-text fixes in `mobile.css` (words break instead of widening columns on phones; the header's button steps aside when the header can't fit it; `.contact-grid` children can shrink; form error text 16px; error-summary links 44px). Heights at normal text size unchanged on 32 of 34 pages; Advice landing at 320 +416px (its 35px overflow now wraps) and Stay at 320 +28px (to check).
- **Still overflowing at 200% text:** the activities pages' `.adv-note-link` span; the homepage Call/Sound bar (`.j-controls`); Training's `dd`/`.tbc` at 320; Advice landing's `.tbc-tag` and `.qbar`.
- **Left in batch 3:** Advice landing (`export function Landing`; it overflows 35px at 320 from `.al-person` at normal size).
- **Resume:** `npm run build && npm run preview` in `site/`; run `qa/overflow-sweep.js`, fix the remaining items above, check `qa/heights.js` against the values before; then the Advice landing subagent; then the batch 3 sheets and stop.

## Site streamlined (8 November 2026, branch `streamline/advice-news`)

- **Advice:** 10 pages → 2. The landing page holds the whole service (proof and who it's for, how it works with what we check, what's included, the incident line, the advisers, questions with national guidance, the guide and quote form); Training keeps its own page. How it works, Service agreement, Who it's for, Emergency support, Guidance and resources, Our advisers, Questions and Get a quote redirect to the matching section (vercel.json). The batch 3 mobile passes on those pages no longer apply; the landing page still needs its own mobile pass.
- **News:** its own section at `/news/`, in the header, the phone menu and the footer, with a page per story. Stories are files in `v2/src/content/news/` (see the README there); `scripts/news.mjs` builds them. `/about/news/` redirects to `/news/`.
- **Homepage:** the testimonial stack is replaced by the advice call to action (a card in the scroll journey, same sticky timing); the separate advice band near the top is gone.
- **Fixes found on the way:** the header's phone number steps aside at 1080–1279px so six sections fit; the footer's four columns go two by two below 1280px (they overflowed at 1100–1260px before).
- Health check clean on all 32 pages (desktop and phone).

## Batch 4 (8 November 2026, branch `mobile/remaining`)

| Page | Status | Commit | Notes |
|---|---|---|---|
| Advice landing | Done | 5dc45ef, 8863936 | Phone-only rules in `advice-landing.css`: shorter hero, landscape hero side by side, incident number on one line at 320, Stepper and final panel fit at 200% text, smaller guide cover and image strip; quote bar above the home indicator and now steps aside at the emergency band. 390: 11,803 → 11,620px. Desktop unchanged (8,025px). |
| Stay | Done, no page change | — | Already clean at every size; first booking action is in the hero. "To confirm" boxes in Food and prices use two styles (placeholders, left). |
| News list and story pages | Done | 5ba777c + follow-up | "All news" 44px; story text 40rem wide (also on desktop, where a general rule had widened it to 60rem); cards pressed state on touch; "More news" shows two cards at two-across sizes. |
| Shared | Done | 8863936 | Footer small links 44px wide; "What we look at" headings full size; advisers fit at 200% text; `mobile-check.js` measures desktop height in a fresh tab. |

Content note: the "The end of another era" photo is only 204×153px (soft on phones); a larger photo can be uploaded in Sanity.
