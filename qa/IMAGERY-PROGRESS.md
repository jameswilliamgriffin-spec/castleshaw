# Imagery: progress

Branch `imagery/internal-pages` (from `polish/internal-pages`). Audit: `qa/IMAGERY-AUDIT.md`.

| Phase | Status | Notes |
|---|---|---|
| 0: Tools | Done | Image tool connected: `codex-images` (ChatGPT image generation), the one used for the existing advice photos. |
| 1: Audit | Done, approved | 18 slots on 12 pages: 15 generated, 3 real (compass added). |
| 2: Shot list, style guide, style test | Done, approved | 13 images for 15 slots (`assets/imagery/SHOTLIST.md`). Style: `assets/imagery/STYLE.md`. Test images: `assets/generated/style-test/`. |
| 3: Generate | Batch 1 of 2 done, awaiting review | Batch 1: g01–g06, g08, g09 (`qa/contact-sheet-1.html`). Batch 2 next: g07, g10 (style test approved as is), g11, g12, g13 with the style-test tweaks. |
| 4: Implement | Not started | |
| 5: QA | Not started | |

## Decisions

- **Courses and clubs illustration:** remove (user, Phase 1). Replace with a real photograph (`water-kayaks` proposed).
- **Existing AI images that break the rules:** `boots-gritstone`, `wellies-puddle`, `hands-carabiner` to be replaced in the same set. `compass-moss` also to be replaced (user, Phase 1): new slot `advice-how-hero`.

## How to resume

Dev server: `npm run dev` in `site/` (port 5175). Read `qa/IMAGERY-AUDIT.md`, then this file, and continue from the first phase not marked Done.
