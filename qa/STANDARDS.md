# Castleshaw v2: design standard for internal pages

Derived from the homepage (`/v2/`), the menu and the footer. Token names are the real ones in `v2/src/styles.css` `:root` and `v2/src/ui/tokens.css`. Every token below now exists. The Phase 1 shared layer lives in `ui/tokens.css`, the end of `inner.css` and `ui/inner/blocks.jsx`.

## Colour

| Role | Token | Value |
|---|---|---|
| Text, our black | `--ink` | #0a2a3c |
| Deep water: links on light, labels, white-text panels | `--deep` | #034a6e |
| Water: accents only, never small text | `--water` | #0480bc |
| Sky, pale sky | `--sky`, `--sky-pale` | #bfe4f7, #e4f3fb |
| Sage, moss (the lime accent) | `--sage`, `--moss` | #c1d284, #8dba08 |
| Chalk: page background | `--chalk` | #fbfdf8 |
| Navy family (menu, CTA, footer) | `--cs-ink`, `--cs-ink-2`, `--cs-ink-deep` | #0a2a3c, #0f3a52, #08222f |
| On navy: text, soft, muted, hairline, eyebrow | `--cs-text`, `--cs-soft`, `--cs-muted`, `--cs-line`, `--cs-eyebrow` | #fff, 86% white, 70% white, 13% white, #b9d46a |
| Small labels on light backgrounds (AA) | `--label` | #036796 |

Section tones are chalk, `--sky-pale`, sage-pale `#eef3dc`, paper `#fffaf0`, and navy for at most one band per page plus the closing CTA. Text is always `--ink` on light and `--cs-text`/`--cs-soft` on navy. Never use opacity to dim text.

## Type

- **Fonts:** display `--disp` (Bricolage Grotesque Variable, with metric-matched fallback), headings at `font-variation-settings: 'wdth' 76–84`; body `--text` (Literata Variable, with metric-matched fallback).
- **Serif or sans:** serif is for descriptive copy (paragraphs, quotes); sans is for all interface text (nav, buttons, labels, meta, card titles).

| Step | Token | Value | Use |
|---|---|---|---|
| Display | `--t-h1` | `clamp(2.75rem, 6.4vw, 5.6rem)/.95`, weight 770, tracking −.032em | Page h1 (homepage hero 8.6rem) |
| H2 | `--t-h2` | `clamp(2.1rem, 4.4vw, 3.8rem)/1`, weight 750, wdth 80 | Section headings (homepage `.h2` reaches 5.2rem) |
| H3 | `--t-h3` | `clamp(1.25rem, 1.6vw, 1.5rem)/1.2`, weight 720 | Card and item titles |
| Lead | `--t-lead` | `clamp(1.15rem, 1.4vw, 1.3rem)/1.55` | Hero lead, section intros |
| Body | (body) | `1.0625rem/1.72` | Paragraphs; never below 1rem in cards |
| Small | `--t-small` | `.92rem/1.5` | Meta, captions |
| Eyebrow | `--t-eyebrow` | `.78rem`, weight 650, `.12em` tracking, uppercase, `--label` | Kickers above headings |

Paragraphs are capped at a 40rem measure and `text-wrap: pretty`; headings use `text-wrap: balance`.

## Space and layout

- **Gutter:** `--g: clamp(1rem, 4vw, 3.5rem)`.
- **Container:** `--wrap: 84rem`; narrow `60rem`; text measure `40rem`.
- **Spacing scale (proposed):** `--s-1 .5rem`, `--s-2 1rem`, `--s-3 1.5rem`, `--s-4 2rem`, `--s-5 3rem`, `--s-6 4.5rem`.
- **Section padding:** `--s-section: clamp(4rem, 8vw, 7rem)`. The same on every band, top and bottom, and never collapsed between bands. Consecutive bands of the same tone are merged into one band instead.
- **Inside a section:** heading block to content `--s-5`; between groups `--s-5`; card grid gaps `--s-3` (desktop `2rem 2.5rem`).
- **Flow spacing:** any element following a paragraph or list gets `--s-2` (`.flow > * + *`). Lists and paragraphs never touch.
- **Grids:**
  - Cards: `repeat(auto-fit, minmax(min(100%, 18rem), 1fr))`.
  - Two-up layouts: 7/5 or 5/7 split at ≥ 900px; one column below.
  - **No nesting:** never put a two-column `Intro` inside a column.
- **Breakpoints:** 600 (phone), 900 (two-column), 1100 (wide grids), 1280.

## Motion

- **Easing:** one curve for interface motion, `--ease` = `var(--out)` `cubic-bezier(.16, 1, .3, 1)`. `--cs-out` maps to it. Clip reveals keep `--cs-reveal`.
- **Durations:** hover and focus 200ms (`--cs-fast`); draw-in 450ms (`--cs-draw`); scroll reveal 500–600ms; stagger 40–60ms.
- **Rules:**
  - Animate `transform` and `opacity` only, and reveal once.
  - Never animate layout.
  - No motion under `prefers-reduced-motion`, where everything simply fades.

## Components and patterns

- **Buttons:**
  - **Primary:** the pill (`.ib-ink` or `.ib-moss`), at least 3rem tall (44px on touch), weight 680, lifting 2px on hover.
  - **Secondary:** outline (`.ib-line`).
  - **Single family:** inner `.ib` is aligned to the homepage `.b` sizes.
- **Links:**
  - **In text:** `--deep`, 1.5px underline, offset .2em; `--water` on hover.
  - **Key links** (section "More…" links, CTAs as text): `.sq-host` with `Squiggle`.
  - **Arrow links:** a trailing → that nudges 3px on hover.
- **Cards:**
  - White, radius 1.2rem, shadow `0 1px 0 var(--line)`.
  - On tinted bands, no shadow.
  - Interactive cards lift 3px and gain a soft shadow on hover; static cards don't move.
- **Images:**
  - Always set `aspect-ratio`, `object-fit: cover`, and an `object-position` per image where the subject sits off-centre.
  - Organic masks via `ShapedImage`: at most one backdrop per section, at most one floating accent per viewport.
  - No more than one arch per page (only the Stay hero uses one).
  - Photo grids (`Gallery`) are an even 2-column (phone) or 4-column grid of 4:3 soft rectangles (radius 1rem). Drawings in `#hall-of-fame` are shown whole at 3:4.
  - On phones the hero photo is at most `min(22rem, 76vw)` with no floating accent. `People` sits two to a row.
- **Scroll reveal:** every `Band` reveals its contents once, automatically. Use `.rv` and `useReveal` only for custom blocks.
- **Section heads:** `SectionHead` (eyebrow, h2, lead). Use it to give card rows and lists a real h2, which fixes heading skips.
- **Key links:** `SqLink` (squiggle underline plus nudging arrow) for a section's "More about…" or next-step link. At most one per section.
- **Accordion:** `Faq` (`details`/`summary`) for FAQ-style and long optional content.
- **Section page links** (`SubNav`): pills at least 44px tall on touch, with a fade showing the row scrolls.
- **In-page navigation:** long pages (four or more sections) get `OnThisPage items={[{ id, label }]}`, a sticky row that marks the section in view. Sections need `id`s.
- **Scroll prompt:** `ScrollCue`. It's built into every inner hero (idle-only, desktop); add it elsewhere only where the next content isn't visible.
- **One primary CTA per page:** the closing `CtaBand`, plus at most one hero action.

## Section headings (from pilot feedback)

- **Every section has a visible h2.** Use `SectionHead` (eyebrow optional, title, optional lead).
- **New headings:** where the original content had no heading, add a short, plain, descriptive one in sentence case, five words at most, that only names what's already there. Examples: "What you can do", "At a glance", "What schools say", "Gallery", "Useful downloads".
- **Don't use headings to add claims or marketing copy.**
- **Hidden headings:** only for sections that are purely visual and self-explanatory, such as a single big quote band. Even then, prefer a visible heading.
- **Eyebrows:** at most one per section, naming the page or theme (for example "Adventure on land").

## Accessibility

- **Structure:** one h1, and headings in order (h2 before any h3).
- **Contrast:** WCAG AA. Small labels use `--label` or `--deep`, never `--water`.
- **Focus:** a visible focus ring everywhere (`:focus-visible` 3px `--focus`).
- **Tap targets:** at least 44px on touch.
- **Decoration:** decorative images and shapes get `alt=""` or `aria-hidden`.
- **Widgets:** tabs, accordions and the menu are keyboard operable with correct ARIA.
- **Fixed elements:** nothing fixed may cover content. The fixed `.versions` dev tag is hidden on inner pages (it stays in the footer's links).
