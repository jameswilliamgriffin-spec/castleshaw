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
| 3: Batch 2 (Plan, Activities hub) | Done, approved | see below |
| 3: Batch 3 (Stay, Courses and clubs, About, Contact, Privacy, two Advice pages) | Done | see below |
| 3: Batch 4 (deferred: Outdoor awards, eight Advice pages) | Done, awaiting go-ahead for Phase 4 | see below |

## Pages

| Page | Status | Commit | Open issues |
|---|---|---|---|
| Adventure on land | Done (pilot) | `polish: adventure-on-land` | Who it suits, How long and Cost still To confirm (content). |
| Adventure on water | Done (batch 1) | `f91a5d9` | Quote heading is "What parents say" (the quotes are from parents). At a glance facts To confirm. |
| Bushcraft | Done (batch 1) | `24dc03f` | Two same-tone bands merged into one. At a glance facts To confirm. |
| Environmental education | Done (batch 1) | `c3efe7d` | Has `OnThisPage` (four sections). |
| Roman and local history | Done (batch 1) | `f3abe83` | Has `OnThisPage`. Sky band headed "Local history". The `SqLink` above the link cards sits a little tight. |
| Plan your visit | Done (batch 2) | `7f22b4e` | Has `OnThisPage`. Kit lists still fairly dense at 1440 (shared `.kit` text size; revisit in Phase 4). |
| How it works (Advice) | Done | `901d9b3` | "Using Evolve" heading added; Evolve cards light until the login address is confirmed. |
| Service agreement (Advice) | Done | `97c9055` | Three "Ask for a quote" links merged into one key link under the packages. |
| Stay and hire | Done | `b9d8272` | Has `OnThisPage`. Food and Prices merged into one "Food and prices" section with two cards. |
| Courses and clubs hub | Done | `659693e` | Short page (content gap). |
| Holiday clubs | Done | `e3fd24a` | Mostly To confirm (dates, ages, prices). |
| Activity courses | Done | `7fcb0f6` | Mostly To confirm. |
| About hub | Done | `69d651f` | |
| Where we are | Done | `2af323f` | Getting here still To confirm. |
| Around the valley | Done | `48f4559` + `687ad07` | Subagent added a closing CTA; removed (new content). User confirmed: leave it out. |
| Our team | Done | `876f11c` | Part-time staff roles To confirm. |
| Accreditation | Done | `4105252` | |
| What people say | Done | `20a757b` | Two-column band split into two full-width bands (same order and content). Has `OnThisPage`. |
| History (About) | Done | `832e7c9` | No `OnThisPage` (three sections). Linking timeline eras would need ids in the shared `Timeline` block: open for decision. |
| News | Done | `77a941c` | |
| Contact | Done | `64e31c6` | Form unchanged. |
| Privacy | Done | `0ecea5c` | Uses an inline 46rem wrapper; could move to a shared reading-column class. |
| Outdoor awards | Done (batch 4) | `b69bd1a` | Has `OnThisPage`. |
| Who it's for (Advice) | Done (batch 4) | `de23712` | "Who can join" heading. |
| Training (Advice) | Done (batch 4) | `e8961ff` | "Our courses", "Other training we run". |
| Emergency support (Advice) | Done (batch 4) | `0cc81e5` | Incident number unchanged; 44px+ tap at all widths. |
| Guidance and resources (Advice) | Done (batch 4) | `8f7e5ea` | Short page (content gap). |
| Our advisers (Advice) | Done (batch 4) | `7c5c362` | Quote band heading outweighs the one-word quote (matches other quote bands). |
| Questions (Advice) | Done (batch 4) | `20fe596` | FAQ rows 62px; keyboard OK. |
| Get a quote (Advice) | Done (batch 4) | `60e6708` | Form unchanged. Optional: sticky side column (not done). |
| Advice landing | Done (batch 4) | `0c7574a` | Tap targets only (no redesign). Stats strip under the hero has no h2, by choice. |
| Activities hub | Done (batch 2) | `ac3077f` + lead fix | No `OnThisPage` (hub; tiles and subnav already navigate). Subagent moved the quote band; the lead put it back (section order is content) and fixed the spacing in shared CSS instead. |
| Team building | Done (batch 1) | `2f43347` | No `OnThisPage` (four short sections, like Land). Two quote sections now: the Oldham band and "What schools say". |

## Deferred (user decision)

Outdoor awards (Courses and clubs), plus Advice pages Who it's for, Training, Emergency support, Guidance and resources, Advisers, Questions, Get a quote and the Advice landing: deferred until after the rest of the site (Courses and clubs, About, Contact, Privacy), then polished as a final batch.

## Decisions and notes

- **Batch 3 shared fixes:** exactly three cards or tiles stay in one row at mid widths; quote grids adapt to two, three or five quotes; a single download is full width; section-head leads capped at 40rem; narrow bands restored; small people grids without empty tracks; galleries of five or ten in rows of five; timeline photos two to a row on phones; news photo beside the story at tablet width.
- **For Phase 4:** card internals (aligning To confirm boxes to card bottoms) would need `.icard` as a flex column site-wide; kit list text at 1440 is dense; About History could link timeline eras (needs ids in the shared `Timeline`).
- **No added blocks:** subagents may not add CTAs or reorder sections (both count as content).

- **Hidden section headings:** to fix heading order without adding visible copy, sections with no visible heading get a visually hidden h2 ("Activities on land", "At a glance", "What schools say"). Screen readers announce them; the visible page is unchanged.
- **At a glance:** the shared `AtAGlance` (Land, Water, Bushcraft) is now a hairline facts strip that can sit beside "What to bring". Water and Bushcraft pick up the new look and get their own pass in Phase 3.
- **Section headings (pilot feedback):** hidden headings replaced with visible `SectionHead`s throughout (rule in `STANDARDS.md`).
- **Shared fixes from batch 1:** `.cols-3` is two columns at 900–1099px (`7ae1e91`); `OnThisPage` resets to the first item above the first section (`7ae1e91`); galleries of three show three columns from 900px, and `Gallery` images take optional `fit: 'contain'` and `pos` (`f591667`, used for the Roman auxiliary drawing); big quotes keep their size and galleries of six sit as 3 + 3 (batch 1 close). Batch 2: a callout after a band's link or download list gets group spacing (`11f29ae`); the advice note gets top padding after a tinted or navy band; ledger figures are bigger from 1100px.
- **Shared fixes made during the pilot** (`inner.css`): 44px tap targets for key links on touch screens; equal-height quote cards; split photos sized for phones.

## How to resume

Run `npm run dev` in `site/` (port 5175). Pages are in `v2/src/pages/*.jsx`, blocks in `v2/src/ui/inner/blocks.jsx`, styles in `v2/src/inner.css` (shared layer at the end). Follow the page procedure in the brief, then commit as `polish: <page>` and add a row above.
