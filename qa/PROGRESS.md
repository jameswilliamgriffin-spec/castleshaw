# Internal pages polish: progress

Branch `polish/internal-pages`. Standards: `qa/STANDARDS.md`. Audit: `qa/AUDIT.md`.
Screenshots: `qa/before/<page>/`, `qa/after/<page>/` (each has a `_compare.jpg`: before and after at 1440, 1024, 768 and 390).

## Phases

| Phase | Status | Commit |
|---|---|---|
| 0: Audit and standards | Done | `0da163c` |
| 1: Shared layer | Done | `bb56eda` |
| 2: Pilot (Adventure on land) | Done, awaiting feedback | see below |

## Pages

| Page | Status | Commit | Open issues |
|---|---|---|---|
| Adventure on land | Done (pilot) | `polish: adventure-on-land` | Who it suits, How long and Cost still To confirm (content). |

## Decisions and notes

- **Hidden section headings:** to fix heading order without adding visible copy, sections with no visible heading get a visually hidden h2 ("Activities on land", "At a glance", "What schools say"). Screen readers announce them; the visible page is unchanged.
- **At a glance:** the shared `AtAGlance` (Land, Water, Bushcraft) is now a hairline facts strip that can sit beside "What to bring". Water and Bushcraft pick up the new look and get their own pass in Phase 3.
- **Shared fixes made during the pilot** (`inner.css`): 44px tap targets for key links on touch screens; equal-height quote cards; split photos sized for phones.

## How to resume

Run `npm run dev` in `site/` (port 5175). Pages are in `v2/src/pages/*.jsx`, blocks in `v2/src/ui/inner/blocks.jsx`, styles in `v2/src/inner.css` (shared layer at the end). Follow the page procedure in the brief, then commit as `polish: <page>` and add a row above.
