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

- **Tap targets:** at least 44×44px, with at least 8px between neighbouring targets. Inline links in running text are exempt, but get a 44px-tall hit area where they stand alone (lists, footers, card links).
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
