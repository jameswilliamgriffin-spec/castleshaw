# Internal pages polish: progress

Branch `polish/internal-pages`. Standards: `qa/STANDARDS.md`. Audit: `qa/AUDIT.md`.
Screenshots: `qa/before/<page>/`, `qa/after/<page>/` (each has a `_compare.jpg`: before and after at 1440, 1024, 768 and 390).

## Phases

| Phase | Status | Commit |
|---|---|---|
| 0: Audit and standards | Done | `0da163c` |
| 1: Shared layer | Done | `bb56eda` |
| 2: Pilot (Adventure on land) | Done, approved | see below |
| 3: Batch 1 (Activities) | Done, approved | see below |
| 3: Batch 2 (Plan, Activities hub) | Done, awaiting go-ahead | see below |

## Pages

| Page | Status | Commit | Open issues |
|---|---|---|---|
| Adventure on land | Done (pilot) | `polish: adventure-on-land` | Who it suits, How long and Cost still To confirm (content). |
| Adventure on water | Done (batch 1) | `f91a5d9` | Quote heading is "What parents say" (the quotes are from parents). At a glance facts To confirm. |
| Bushcraft | Done (batch 1) | `24dc03f` | Two same-tone bands merged into one. At a glance facts To confirm. |
| Environmental education | Done (batch 1) | `c3efe7d` | Has `OnThisPage` (four sections). |
| Roman and local history | Done (batch 1) | `f3abe83` | Has `OnThisPage`. Sky band headed "Local history". The `SqLink` above the link cards sits a little tight. |
| Plan your visit | Done (batch 2) | `7f22b4e` | Has `OnThisPage`. Kit lists still fairly dense at 1440 (shared `.kit` text size; revisit in Phase 4). |
| Activities hub | Done (batch 2) | `ac3077f` + lead fix | No `OnThisPage` (hub; tiles and subnav already navigate). Subagent moved the quote band; the lead put it back (section order is content) and fixed the spacing in shared CSS instead. |
| Team building | Done (batch 1) | `2f43347` | No `OnThisPage` (four short sections, like Land). Two quote sections now: the Oldham band and "What schools say". |

## Decisions and notes

- **Hidden section headings:** to fix heading order without adding visible copy, sections with no visible heading get a visually hidden h2 ("Activities on land", "At a glance", "What schools say"). Screen readers announce them; the visible page is unchanged.
- **At a glance:** the shared `AtAGlance` (Land, Water, Bushcraft) is now a hairline facts strip that can sit beside "What to bring". Water and Bushcraft pick up the new look and get their own pass in Phase 3.
- **Section headings (pilot feedback):** hidden headings replaced with visible `SectionHead`s throughout (rule in `STANDARDS.md`).
- **Shared fixes from batch 1:** `.cols-3` is two columns at 900–1099px (`7ae1e91`); `OnThisPage` resets to the first item above the first section (`7ae1e91`); galleries of three show three columns from 900px, and `Gallery` images take optional `fit: 'contain'` and `pos` (`f591667`, used for the Roman auxiliary drawing); big quotes keep their size and galleries of six sit as 3 + 3 (batch 1 close). Batch 2: a callout after a band's link or download list gets group spacing (`11f29ae`); the advice note gets top padding after a tinted or navy band; ledger figures are bigger from 1100px.
- **Shared fixes made during the pilot** (`inner.css`): 44px tap targets for key links on touch screens; equal-height quote cards; split photos sized for phones.

## How to resume

Run `npm run dev` in `site/` (port 5175). Pages are in `v2/src/pages/*.jsx`, blocks in `v2/src/ui/inner/blocks.jsx`, styles in `v2/src/inner.css` (shared layer at the end). Follow the page procedure in the brief, then commit as `polish: <page>` and add a row above.
