# Mobile audit (Phase 1)

Branch `mobile/cleanup`. Production build (`npm run build`, `npm run preview`, port 4175), emulated with Chrome DevTools via Playwright: touch on, device pixel ratio 2 (3 for the journey), at 320×568, 360×740, 390×844, 430×932, 768×1024 and 844×390. Screenshots (320, 390, 768, 844×390) are in `qa/mobile-before/<page>/`; contact sheets `qa/mobile-before/_s320-*.jpg`, `_land-*.jpg`, `_home390.jpg`, `_journey.jpg`. The measuring script is `qa/mobile-audit.js`.

Note: since the last change the homepage is at `/` (not `/v2/`) and inner pages at `/<section>/…`.

## Pages

| Page | Route | File |
|---|---|---|
| Homepage | `/` | `v2/src/App.jsx` and `v2/src/ui/*` (Hero, Activities, AdviceBand, Journey, Planner, Contact) |
| Activities hub | `/activities/` | `v2/src/pages/activities.jsx` `Hub` |
| Adventure on land | `/activities/adventure-on-land/` | `activities.jsx` `Land` |
| Adventure on water | `/activities/adventure-on-water/` | `activities.jsx` `Water` |
| Bushcraft | `/activities/bushcraft/` | `activities.jsx` `Bushcraft` |
| Environmental education | `/activities/environmental-education/` | `activities.jsx` `Environment` |
| Roman and local history | `/activities/roman-history/` | `activities.jsx` `History` |
| Team building | `/activities/team-building/` | `activities.jsx` `Team` |
| Plan your visit | `/activities/plan-your-visit/` | `activities.jsx` `Plan` |
| Advice landing | `/advice-and-guidance/` | `v2/src/pages/advice.jsx` `Landing` (+ `advice-landing.css`, `ui/advice/*`) |
| How it works | `/advice-and-guidance/how-it-works/` | `advice.jsx` `How` |
| Service agreement | `/advice-and-guidance/service-agreement/` | `advice.jsx` `Agreement` |
| Who it's for | `/advice-and-guidance/who-its-for/` | `advice.jsx` `Who` |
| Training | `/advice-and-guidance/training/` | `advice.jsx` `Training` |
| Emergency support | `/advice-and-guidance/emergency-support/` | `advice.jsx` `Emergency` |
| Guidance and resources | `/advice-and-guidance/guidance-and-resources/` | `advice.jsx` `Resources` |
| Our advisers | `/advice-and-guidance/our-advisers/` | `advice.jsx` `Advisers` |
| Questions | `/advice-and-guidance/questions/` | `advice.jsx` `Questions` |
| Get a quote | `/advice-and-guidance/get-a-quote/` | `advice.jsx` `QuotePage` |
| Stay and hire | `/stay/` | `v2/src/pages/stay.jsx` `Stay` |
| Courses and clubs hub | `/courses-and-clubs/` | `v2/src/pages/courses.jsx` `Hub` |
| Holiday clubs | `/courses-and-clubs/holiday-clubs/` | `courses.jsx` `Clubs` |
| Activity courses | `/courses-and-clubs/activity-courses/` | `courses.jsx` `ActivityCourses` |
| Outdoor awards | `/courses-and-clubs/outdoor-awards/` | `courses.jsx` `Awards` |
| About hub | `/about/` | `v2/src/pages/about.jsx` `Hub` |
| Where we are | `/about/where-we-are/` | `about.jsx` `Where` |
| Around the valley | `/about/where-we-are/around-the-valley/` | `about.jsx` `Valley` |
| Our team | `/about/our-team/` | `about.jsx` `Team` |
| Accreditation | `/about/accreditation/` | `about.jsx` `Accreditation` |
| What people say | `/about/what-people-say/` | `about.jsx` `Say` |
| History | `/about/history/` | `about.jsx` `History` |
| News | `/about/news/` | `about.jsx` `News` |
| Contact | `/contact/` | `v2/src/pages/misc.jsx` `Contact` |
| Privacy | `/privacy/` | `misc.jsx` `Privacy` |

Shared: `v2/src/ui/inner/blocks.jsx` (Hero/PageTop, Band, SubNav, OnThisPage, CtaBand…), `ui/inner/Shell.jsx`, `ui/Top.jsx` (header), `ui/Menu.jsx` + `menu.css`, `ui/Contact.jsx` (footer) + `footer.css`, `ui/tokens.css`, `inner.css`, `styles.css` (homepage).

## What is already good

- **No horizontal scroll** on any page at any width (`scrollWidth = innerWidth` everywhere, no element past the right edge).
- **Zoom is allowed** (`width=device-width, initial-scale=1` only).
- **Inputs are 16px or larger** everywhere (no iOS focus zoom); most have `autocomplete`, the advice form has `type`/`inputmode`.
- **No hover-only reveals:** everything that appears on hover also appears on focus.
- **Canvases already cap pixel ratio at 1.5**; the film already checks Save-Data and slow connections.
- The menu has a focus trap, Escape to close, focus return, one-open-at-a-time accordions and 44px tap areas (from the last pass).

## Shared root causes (ranked)

1. **Fixed journey controls cover content (homepage).** The Call and Sound buttons (`.j-controls`, 43px, fixed at the bottom) sit over the "Send message" button and the message field of the Stay-the-night form, the bottom of the testimonial stack, and (in landscape) the body text of the chapters. No space is reserved for them.
2. **Inner-page hero proportions on phones and in landscape.** Every inner hero stacks a large shaped photo under the copy; at 320 the first real section starts on the third screen, and at 844×390 the first screen shows only the heading and lead (the stacked phone layout is used up to 899px wide, so landscape phones get it).
3. **Sticky hover on touch.** 79 `:hover` effects (lifts, colour shifts, nudging arrows, image zooms) are not gated by `(hover: hover)`, so they stick after a tap. No `:active` pressed states; no `touch-action: manipulation`; default tap highlight.
4. **Small tap targets in the shared chrome (every page).** Header logo 70×42 and Enquire button 92×42 (or 120×42); footer email 258×28; a footer link 207×21; footer and card links closer than 8px apart (11–22 pairs per page at 390).
5. **Text below 16px in shared components.** Figure captions 15px, the CTA band email line 15px, card and kit lists 14px, "To confirm" tags 12px, advice eyebrows 13px, form notes 14px.
6. **Two rows of chips on long pages.** `SubNav` and the sticky `OnThisPage` stack as two horizontal pill rows (Plan your visit, Environmental education, Roman history, Stay, Outdoor awards, What people say).
7. **Viewport units that jump with the iOS address bar.** `vh` in the homepage hero (`.land` 46vh, `.hero-h` 14vh) and the menu (3vh, 11vh).
8. **Header height in landscape.** 74px of a 390px-tall screen (19%); together with the journey controls, landscape leaves about 270px for content.
9. **Safe areas.** Only the journey controls use `env(safe-area-inset-*)`; the header, menu, footer and the horizontal gutters (landscape notch) don't.
10. **Images without dimensions.** Homepage 9, Activities hub 6, About hub 6, Courses hub 3 (tile and card images): layout-shift risk while loading.
11. **Long strings.** No global `overflow-wrap`; the email address in the Privacy callout presses against the edge at 320.
12. **Menu and the back button.** Opening the menu doesn't push a history entry, so Android back leaves the page instead of closing the menu. Scroll lock is `overflow: hidden` on `html` (works on current iOS; to verify on a device).
13. **People grids at 320.** `People` drops to one column at 320 (Our team is 7,745px tall at 320 against 4,643px at 360).
14. **Journey performance on a throttled phone.** With 4× CPU and DPR 3: portrait median 33ms a frame (about 30fps), 95th percentile 67ms, 107 of 788 frames over 50ms; landscape median 50ms (20fps), 95th percentile 117ms. The pinned journey is 9,859px tall at 390 (about 12 screens).

## Page by page

| Page | Height at 320 / 390 | Page-specific findings | Shared causes |
|---|---|---|---|
| **Homepage** | 11,549 / 14,263 | Journey controls cover the Stay-the-night form (Send button, message field) and the testimonial stack; chapter text scrolls up under the header; landscape usable height about 270px; journey about 30fps portrait and 20fps landscape on a throttled phone; "Six ways" chip row cut at the edge with no snap or active-chip scroll; slider cards peek but the swipe needs checking; figure caption 15px and `.j-small` 15px; 9 images without dimensions; hero `vh` units; `.hero-tel` 24px tall at 768+. | 1, 3, 4, 5, 7, 8, 9, 10, 14 |
| Activities hub | 8,505 / 8,038 | 6 tile images without dimensions. | 2, 3, 4, 5, 10 |
| Adventure on land | 7,958 / 7,106 | "To confirm" tags 12px. | 2, 3, 4, 5 |
| Adventure on water | 6,890 / 6,243 | As Land. | 2, 3, 4, 5 |
| Bushcraft | 5,176 / 4,767 | As Land. | 2, 3, 4, 5 |
| **Environmental education** | 11,010 / 10,161 | Long; two chip rows; 15 close targets. | 2, 3, 4, 5, 6 |
| Roman and local history | 7,722 / 7,030 | Two chip rows. | 2, 3, 4, 5, 6 |
| Team building | 6,553 / 6,010 | — | 2, 3, 4, 5 |
| **Plan your visit** | 12,487 / 11,232 | Longest inner page; two chip rows; kit lists and notes 14–15px; dense on phones. | 2, 3, 4, 5, 6 |
| **Advice landing** | 15,409 / 14,308 | Longest page overall; eyebrow 13px, `.al-by`/meta 14px, `.al-sos` 15px; form checkbox 20×20; 21 close targets; `small` 12px. | 3, 4, 5 |
| How it works | 7,565 / 6,944 | Lists 14px. | 2, 3, 4, 5 |
| Service agreement | 7,282 / 6,780 | Lists 14px. | 2, 3, 4, 5 |
| Who it's for | 5,750 / 5,249 | Lists 14px. | 2, 3, 4, 5 |
| Training | 5,926 / 5,441 | Course meta `dd` 15px. | 2, 3, 4, 5 |
| Emergency support | 4,547 / 4,192 | — | 2, 3, 4, 5 |
| Guidance and resources | 3,892 / 3,638 | — | 2, 3, 4, 5 |
| Our advisers | 4,837 / 3,970 | People grid one column at 320. | 2, 3, 4, 5, 13 |
| Questions | 3,214 / 2,932 | 22 close targets (FAQ rows sit tight against each other's edges; rows are 62px tall). | 2, 3, 4 |
| **Get a quote** | 3,620 / 3,401 | Form: guide checkbox 20×20; labels 15px; privacy note 14px; no `enterkeyhint`. | 3, 4, 5 |
| Stay and hire | 8,728 / 8,307 | Two chip rows. | 2, 3, 4, 5, 6 |
| Courses and clubs hub | 4,440 / 4,273 | 3 tile images without dimensions. | 2, 3, 4, 5, 10 |
| Holiday clubs | 4,447 / 4,358 | — | 2, 3, 4, 5 |
| Activity courses | 4,410 / 3,980 | — | 2, 3, 4, 5 |
| Outdoor awards | 6,647 / 6,144 | Two chip rows. | 2, 3, 4, 5, 6 |
| About hub | 5,277 / 5,313 | 6 tile images without dimensions. | 2, 3, 4, 5, 10 |
| Where we are | 4,114 / 3,869 | — | 2, 3, 4, 5 |
| Around the valley | 4,487 / 4,052 | — | 2, 3, 4 |
| **Our team** | 7,745 / 4,667 | People grid one column at 320 (3,100px longer than at 360). | 2, 3, 4, 13 |
| Accreditation | 6,494 / 5,946 | — | 2, 3, 4, 5 |
| What people say | 7,461 / 7,074 | Two chip rows. | 2, 3, 4, 5, 6 |
| History | 8,025 / 7,783 | — | 2, 3, 4 |
| News | 5,514 / 5,343 | — | 2, 3, 4 |
| Contact | 4,011 / 3,843 | Form note 14px; `.contact-big` link 42px tall; no `enterkeyhint`. | 2, 3, 4, 5 |
| Privacy | 2,807 / 2,469 | Long email in the callout presses the edge at 320. | 2, 3, 4, 11 |

## Worst five

1. **Homepage:** fixed controls covering the form and the testimonials; journey frame rate on a mid-range phone; landscape.
2. **Advice landing:** the longest page (15,400px at 320), small type in several components, crowded targets, small form checkbox.
3. **Plan your visit:** 12,500px at 320, two chip rows, dense 14px kit lists.
4. **Environmental education:** 11,000px at 320, two chip rows, crowded targets.
5. **Our team:** the one-column portrait grid at 320.
