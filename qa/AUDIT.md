# Internal pages audit (Phase 0)

Branch `polish/internal-pages`. 33 inner pages under `/v2/`, each screenshotted full-page at 1440, 1024, 768 and 390px (`qa/before/<page>/<width>.jpg`; side-by-side sheets of 1440 and 390 in `qa/before/_sheets/`). Automated checks per page and width are in `qa/before/metrics.json`.

## How the pages are built

- **Stack:** Vite multi-page build (`npm run dev`, port 5175; `npm run build`), React 19, GSAP and Lenis (homepage only), with Bricolage Grotesque for display type and Literata for body text.
- **Site map:** `v2/src/site.mjs` drives pages, nav, breadcrumbs and generation. `scripts/gen-pages.mjs` writes `v2/<path>/index.html`, and every inner page renders through `v2/src/inner.jsx` and `ui/inner/Shell.jsx`.
- **Page content:** `v2/src/pages/{activities,advice,stay,courses,about,misc}.jsx`.
- **Building blocks:** `v2/src/ui/inner/blocks.jsx` (Hero, Band, Intro, Split, Ticks, Ledger, Steps, TileLinks, ActivityList, Gallery, Quote(s), People, Timeline, Faq, Downloads, LinkList, Facilities, Kit, Callout, CtaBand, EnquiryForm, AdviceNote, SubNav, Breadcrumbs), styled by `v2/src/inner.css`.
- **The advice landing:** `Landing` in `pages/advice.jsx` plus `advice-landing.css`, with `ui/advice/{LeadForm,parts}.jsx`.
- **Shared look:**
  - Tokens: `v2/src/styles.css` `:root` (brand colours, fonts, `--g`, `--out`) and `ui/tokens.css` (`--cs-*` navy, line, eyebrow, radius, pill, `--cs-out`, `--cs-fast`, `--cs-draw`).
  - Shared styles in `ui/tokens.css`: the squiggle (`.sq`/`.sq-host`), contours, and the reveal class `.rv`.
- **Reusable homepage pieces:**
  - `ui/Squiggle.jsx`: `Squiggle`, `Contours`, `useReveal`.
  - `ui/shape/ShapedImage.jsx` and `shapes.js`/`shapes.css`: organic masks, backdrops, floats.
  - `ui/ScrollCue.jsx`: the idle scroll prompt.
  - `ui/AreaIcon.jsx`: six category icons.
  - `ui/Button.jsx` (`.b`, rolling label).
  - `ui/Menu.jsx`, `ui/Contact.jsx` (Footer), `ui/Top.jsx` (Header).
- **Two button systems:** the homepage uses `.b` (`ui/Button.jsx`); inner pages use `.ib` (`blocks.jsx` `Btn`).

## Automated results (all 33 pages × 4 widths)

| Check | Result |
|---|---|
| Horizontal page scroll | **None.** `body { overflow-x: clip }`. The only elements wider than the viewport are the decorative hero ridge SVGs (110% wide, clipped by the hero), which are harmless. |
| Broken images | None |
| Console errors | None |
| Text-on-solid contrast below AA | None found. The sampler only checks text on solid backgrounds; text over photos is reviewed by eye. |
| One `<h1>` | Yes, on every page |
| Heading levels skipped (h1 → h3, no h2) | 14 pages (see below) |
| Tap targets under 40px at 390 | 29 pages. Mainly the section page-link pills (30–36px), plus small inline links in cards. |
| Text overlapping text | Only on the advice landing and Questions at 390. These are false positives from collapsed FAQ answers, confirmed visually. |

## Shared root causes, ranked

1. **Nested grids collapse.** `Intro` is a two-column heading/body grid, and `Quotes`/`.cols` are multi-column. When they're placed inside a `.cols-2` half, headings break into 3–4 lines and quote cards become tall, narrow strips.
   - Worst on *What people say* ("Secondary and specialist groups", "Families and other groups").
   - The same pattern risks other pages that put `Intro` inside cards or columns.
2. **Type scale is too small and flat compared with the homepage.**
   - Inner h2 (`.h2i`) tops out at 2.9rem against the homepage's `.h2` at 5.2rem; card text is 0.98rem; meta text is 0.85–0.9rem.
   - At 1440 pages look sparse and small-print, without the homepage's confident hierarchy, and leads and intros don't step up enough.
3. **Mobile proportions.**
   - The hero `ShapedImage` takes almost the full width, so the hero runs to around 1.3 screens before any content.
   - `People` uses `minmax(11rem, 1fr)`, which falls to one column at 390, so each portrait fills the screen (Our team is about 14 screens long).
   - Galleries go one image per full-width row, and floating accents land awkwardly beside the image.
4. **Section rhythm is inconsistent.**
   - `.band + .band` cuts the next band's top padding to `clamp(1rem, 3vw, 2.5rem)`, while tinted bands force full padding with `!important`, so gaps alternate between tight and loose.
   - Bands holding a single small item (often a To confirm box) leave large empty areas: Stay's "Food" and "Prices", the Who it suits / How long / Cost row.
5. **Lists and paragraphs run together.** `.inner p + p` is the only flow spacing, so a paragraph directly after a `Ticks` list, or a list after a paragraph, has no gap.
   - Seen on Outdoor awards (DofE, Training for leaders), How it works ("Which visits come to us") and Plan your visit.
6. **The fixed "All versions" tag** sits at the bottom left on every page and width, over headings, captions and the section page links. It's a dev tool and isn't part of the design.
7. **Heading levels skip** from h1 to h3: `ActivityList`, `People`, card rows (`.icard h3` in bands without an h2), `Facilities`, `Kit`. Affects 14 pages: Land, Water, Bushcraft, Team building, Service agreement, Training, Stay, Holiday clubs, Activity courses, Around the valley, Accreditation, History, News, Contact.
8. **Small tap targets on phones:** the `SubNav` pills (about 30px), card links and the Downloads meta. The page-link row is also cut off at the right edge with no sign that it scrolls.
9. **Imagery treatment is uneven.**
   - `ActivityList` thumbnails are tiny at desktop (7.5rem).
   - Gallery masonry leaves a lonely last tile and uneven bottoms.
   - Timeline thumbnails are small.
   - The floating squiggle in the hero sometimes clips at the hero edge.
10. **Interaction is thinner than on the homepage.**
    - Only the shaped photos reveal on scroll, and there's no squiggle on key links.
    - Long pages (Plan your visit, Environmental education, Roman history, History) have no in-page navigation, and there's no scroll prompt.
    - Content cards have no hover state; only tiles, links and buttons do.
11. **Two button systems** (`.b` on the homepage, `.ib` inner) with different heights, weights and hover behaviour.
12. **Two easing curves:** `--out` `cubic-bezier(.16,1,.3,1)` on the homepage, and `--cs-out` `cubic-bezier(.22,1,.36,1)` in the menu, footer and shapes.

## Page by page

**Reviewed visually** (contact sheets) marks pages I looked at closely in Phase 0. The others share the same blocks and the automated results above; each page gets a full visual review in its own polish step.

| Page | Route | Findings |
|---|---|---|
| Activities hub | `/v2/activities/` | **Reviewed visually.** Strong tiles. Ledger and audience cards are small at 1440. Quote band and the advice pointer sit tight together. Mobile hero pushes content down. Causes 2, 3, 8. |
| Adventure on land | `/v2/activities/adventure-on-land/` | **Reviewed visually.** Activity thumbnails tiny at 1440. Who it suits / How long / Cost cards mostly empty (To confirm). Split section very tall on mobile. Heading skip. Causes 2, 3, 4, 7, 9. |
| Adventure on water | `/v2/activities/adventure-on-water/` | Same template as Land. Heading skip. Causes 2, 3, 4, 7, 9. |
| Bushcraft | `/v2/activities/bushcraft/` | Same template, little content, so it has awkward gaps. Heading skip. Causes 2, 4, 7. |
| Environmental education | `/v2/activities/environmental-education/` | **Reviewed visually.** Long page with no in-page navigation. Card grid has many short cards with uneven heights. Gallery leaves a lone last image. Mobile gallery one image per row. Causes 2, 3, 9, 10. |
| Roman and local history | `/v2/activities/roman-history/` | Long. Gallery and Split. Causes 2, 3, 9, 10. |
| Team building | `/v2/activities/team-building/` | Heading skip (cards). Gallery. Causes 2, 3, 7, 9. |
| Plan your visit | `/v2/activities/plan-your-visit/` | **Reviewed visually.** Longest page with no in-page navigation. Booking intro paragraphs run straight into the To confirm box. Three kit lists dense at 1440. Lists and paragraphs run together. Causes 2, 4, 5, 10. |
| Advice landing | `/v2/advice-and-guidance/` | Rebuilt recently and in good shape. Only the small tap targets on phones remain (stepper, FAQ). Causes 6, 8. |
| How it works | `/v2/advice-and-guidance/how-it-works/` | **Reviewed visually.** Steps fine. "Which visits come to us" list and paragraph run together. Two mostly empty callouts. Causes 2, 4, 5. |
| Service agreement | `/v2/advice-and-guidance/service-agreement/` | Card grid. Heading skip. Package cards are all To confirm. Causes 2, 4, 7. |
| Who it's for | `/v2/advice-and-guidance/who-its-for/` | Four cards with To confirm blocks inside. Causes 2, 4. |
| Training | `/v2/advice-and-guidance/training/` | Course cards with meta. Heading skip. Causes 2, 7, 8. |
| Emergency support | `/v2/advice-and-guidance/emergency-support/` | Navy hero with a large incident number. Three cards. Causes 2, 4. |
| Guidance and resources | `/v2/advice-and-guidance/guidance-and-resources/` | Link list and a To confirm block. Short, so it has gaps. Causes 2, 4. |
| Our advisers | `/v2/advice-and-guidance/our-advisers/` | Two portraits, ledger and a quote band. Mobile portraits full width. Causes 2, 3. |
| Questions | `/v2/advice-and-guidance/questions/` | Accordion, works. Small tap targets on phones. Cause 8. |
| Get a quote | `/v2/advice-and-guidance/get-a-quote/` | Form fine. Side column sparse. Cause 8. |
| Stay and hire | `/v2/stay/` | **Reviewed visually.** Uses the arch hero (the one allowed arch). Facilities list good. Food and Prices bands nearly empty. Gallery uneven. Heading skip. Causes 2, 4, 7, 9. |
| Courses and clubs hub | `/v2/courses-and-clubs/` | Three tiles and quotes. Short page. Causes 2, 4. |
| Holiday clubs | `/v2/courses-and-clubs/holiday-clubs/` | Mostly To confirm. Gallery. Heading skip. Causes 2, 4, 7, 9. |
| Activity courses | `/v2/courses-and-clubs/activity-courses/` | Heading skip. Short. Causes 2, 4, 7. |
| Outdoor awards and DofE | `/v2/courses-and-clubs/outdoor-awards/` | **Reviewed visually.** Lists and paragraphs run together in DofE and Training for leaders. Three cards with little in them. Gallery of four with mixed heights. Causes 2, 4, 5, 9. |
| About hub | `/v2/about/` | Ledger and tiles. Causes 2, 3. |
| Where we are | `/v2/about/where-we-are/` | Address and a To confirm block. Gaps. Causes 2, 4. |
| Around the valley | `/v2/about/where-we-are/around-the-valley/` | Six cards and a callout. Heading skip. Causes 2, 7. |
| Our team | `/v2/about/our-team/` | **Reviewed visually.** Mobile single-column portraits make a very long page. Desktop portraits small, with lots of empty space to the right on the Staff row. Heading skip via `People`. Causes 2, 3, 7. |
| Accreditation | `/v2/about/accreditation/` | Three cards, downloads, five quotes and a Split. Heading skip. Causes 2, 7. |
| What people say | `/v2/about/what-people-say/` | **Reviewed visually.** **Broken grid:** `Intro` and `Quotes` nested in `.cols-2` give 3–4-line headings and narrow quote strips. Hall of Fame masonry uneven. Causes 1, 2, 9. |
| Our history | `/v2/about/history/` | **Reviewed visually.** Timeline readable. Thumbnails small at 1440. "Back in the day" masonry uneven. Long page with no in-page navigation. Causes 2, 9, 10. |
| News | `/v2/about/news/` | News list. Heading skip. Causes 2, 7. |
| Contact | `/v2/contact/` | **Reviewed visually.** Clean. The details column and form are good. Heading skip (h3 in form). Causes 6, 7. |
| Privacy | `/v2/privacy/` | Short page and fine. Cause 2 only. |

## Not found

The automated checks found no clipped text, no horizontal page scroll, no broken images and no console errors. Text-on-text overlap only appeared as the FAQ false positives. The overlaps in the pages are the fixed dev tag, the floating accents and the nested-grid squeeze on *What people say*. Most of the "doesn't match the homepage" impression comes from causes 2–5.
