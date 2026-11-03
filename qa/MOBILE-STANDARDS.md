# Mobile standard (proposed)

Applies with `qa/STANDARDS.md`. Desktop (900px and up) stays as it is.

## Breakpoints

| Name | Range | Notes |
|---|---|---|
| Small phone | 320–359 | Tightest gutters; nothing may assume 360. |
| Phone | 360–599 | The main phone layout. |
| Large phone, phone landscape | 600–899, or any width with `max-height: 500px` | Landscape phones use a compact two-column hero and a short header. |
| Tablet | 768–1099 | Two columns where content allows. |
| Desktop | 900+ | Unchanged. |

Landscape is detected with `(orientation: landscape) and (max-height: 500px)`, not width alone.

## Gutters and spacing

- **Side gutter:** `max(1.25rem, env(safe-area-inset-left))` (20px) at 320–599, `clamp(1.25rem, 4vw, 2rem)` at 600–899 (also respecting the safe area), then the existing `--g`.
- **Spacing scale:** the existing `--s-1` to `--s-6` (8, 16, 24, 32, 48, 72px). Section padding on phones `clamp(3.5rem, 12vw, 4.5rem)`.
- **Reading width:** paragraphs fill the column on phones (no artificial measure under 600px); 40rem from 600px.

## Type (fluid)

| Role | Value | Floor |
|---|---|---|
| Body | `1.0625rem/1.65` | 17px; never below 16px |
| Small text (captions, meta, notes, form hints, card lists) | `max(1rem, …)` | 16px on phones |
| Labels, eyebrows, tags | `.8125rem`, 650 weight, tracking .1em | 13px, only for one-word or short labels, never sentences |
| H1 | `clamp(2.4rem, 9.5vw, 3.4rem)` on phones | wraps on whole words, `text-wrap: balance` |
| H2 | `clamp(1.85rem, 7.5vw, 2.6rem)` on phones | |
| Line length | 30–75 characters | |

Long strings (emails, URLs, what3words) get `overflow-wrap: anywhere`.

## Touch

- **Tap targets:** at least 44×44px, with at least 8px between neighbouring targets. Inline links in running text are exempt, but get a 44px-tall hit area where they stand alone (lists, footers, card links). Full-width stacked rows at least 48px tall with a divider between them (accordion and FAQ rows) count as separated.
- **Hover:** every `:hover` effect sits inside `@media (hover: hover) and (pointer: fine)`. Touch gets an `:active` pressed state (scale .98 or a tint, 100ms) and the same state on `:focus-visible`.
- **Tap behaviour:** `touch-action: manipulation` on buttons, links and controls; `-webkit-tap-highlight-color: transparent` with a visible `:active` state instead.
- **Swipe:** horizontal rows (chips, card rows, sliders) use `scroll-snap-type: x mandatory` with `overscroll-behavior-x: contain` and never trap vertical scroll; the active chip scrolls into view.
- **Hover-only content:** none. Anything revealed on hover is visible or tap-revealed on touch.

## Fixed and sticky elements

- **Header:** 64px on phones, 56px in landscape; `padding-top: env(safe-area-inset-top)`; left and right padding respect the safe area.
- **Bottom controls** (journey Call and Sound): `bottom: calc(.75rem + env(safe-area-inset-bottom))`; the content they float over reserves their height plus 16px (`--dock`), so nothing interactive is ever beneath them. They hide while the keyboard is open (focus inside a form).
- **Only one sticky row under the header:** a page with an "On this page" row hides the duplicate section chips once the row sticks.
- **Anchors:** `scroll-margin-top` = header height + sticky row + 16px.

## Viewport

- Full-height sections use `100svh` (fallback `100vh` first); `dvh` only where the size should follow the address bar.
- No section pins for longer than it needs; pinned sections never block vertical scroll.
- **Menu:** full-screen overlay, scroll lock that holds on iOS, focus trap, Esc and the back button close it, focus returns to the burger.

## Forms

- **Inputs:** 16px or larger, full width on phones, 48px tall, with correct `type`, `inputmode`, `autocomplete` and `enterkeyhint`.
- **Checkboxes and radios:** 24px boxes with a 44px label hit area.
- **Errors:** inline, under the field, in text as well as colour; the first invalid field is focused and scrolled into view.
- **Keyboard:** the focused field scrolls into view above the keyboard; fixed controls hide while typing.

## Images and media

- Every image has `width` and `height` or an `aspect-ratio` (no layout shift).
- Responsive `srcset`/`sizes` on large images; below-the-fold images lazy-load; the LCP image is eager with `fetchpriority="high"`.
- Mobile crops are art-directed with `object-position`.
- Phone heroes: the photo is at most 45% of the first screen in portrait and sits beside the copy in landscape.

## Motion and performance budgets

| Item | Budget |
|---|---|
| Initial page weight, inner page (mobile) | ≤ 700 KB |
| Initial page weight, homepage (mobile, before the film) | ≤ 1.2 MB |
| LCP (Lighthouse mobile) | ≤ 3.0s inner, ≤ 3.5s homepage |
| CLS | ≤ 0.05 |
| Canvas pixel ratio | `min(devicePixelRatio, 1.5)` on phones, 2 on desktop |
| Journey frame time on a 4×-throttled phone | median ≤ 20ms; if it can't hold that, use the lighter mode (fewer frames, crossfade) |

- Canvases, film and animations pause off-screen and when the tab is hidden.
- `prefers-reduced-motion` and Save-Data get still frames and no parallax.
- No autoplaying sound; sound is opt-in.
- No heavy effects (parallax, blur, large shadows) below the fold on phones.

## Accessibility

- AA contrast, visible focus everywhere, headings in order, labelled inputs, landmarks.
- Works at 200% text zoom with no overlap or horizontal scroll.

## How the mobile layer is built

- All shared mobile rules live in `v2/src/ui/mobile.css`, imported last by `main.jsx` and `inner.jsx`.
- The build places that file in a stylesheet shared by every page, which loads *before* each page's own CSS, so rules inside its media queries are prefixed with `:root:root` to win on specificity rather than order. Keep that prefix on any rule added there.
- Hover effects are gated with `@media (hover: hover)` in every stylesheet (`scripts/gate-hover.py` did it mechanically; run it again after adding `:hover` rules).
- `--hd-h` is the header height (4.6rem desktop, 4rem phones, 3.5rem landscape phones); the sticky row and anchor offsets follow it. `--g` (the gutter) never sits under a notch; the viewport uses `viewport-fit=cover`.

## Signature interactions (from Phase 3)

- **Sticky panels taller than the screen** (planner, testimonial stack) get a negative `top`, so they scroll normally until their bottom sits just above the Call bar and only then stick: every part stays reachable. Panels that fit keep their CSS `top` (desktop unchanged). `Journey.jsx` sets this with a ResizeObserver.
- **The Call and Sound bar** steps aside while a field has focus and whenever the contact panel (which shows its own number) is on screen. Scrolling text passes under it through a dark fade; nothing interactive is ever beneath it.
- **The journey** recomputes only after a scroll or resize, peels the drawing only while it is moving, draws the film at 1.25× pixel density on touch screens (1.5× elsewhere), and on a touch phone that stays slower than about 30fps while scrolling it switches itself to stills (crossfaded posters).
- **"Six ways":** native horizontal scroll with snap on phones (unchanged), 44px chips 8px apart, the active chip kept in view.
- **Testimonial stack:** swipe with `touch-action: pan-y` (vertical scroll stays with the page) and a reset on `pointercancel`.
- **Hero headline** keeps "the classroom." together at every phone width.

## Content pages (from the Phase 4 pilot, Plan your visit)

- **Long repeated lists** (kit lists, and similar card-per-topic lists) become tap-to-open sections on phones: `<details>` with the card's heading inside the `<summary>`, a 56px tap row and a chevron. They start closed on phones and are always open on desktop (the summary doesn't toggle there). A link to the section's anchor opens them. Keep the one summary block that matters most (for example "Five things visitors most often wish they had brought") always visible.
- **"On this page" row:** its label shows on phones too, as a compact two-line label at the start of the row, so it reads differently from the section links above it; the row stays the same height.
- **Footer and CTA links on touch sizes:** the open footer columns (600–899px), the footer accordion panels, and the CTA band's phone and email links are all 44px tall.
- **Don't add new calls to action** to meet "a primary call to action in the first screen or two": pages keep their existing CTAs (content rule). Where a page's first action is only at the end, note it.
