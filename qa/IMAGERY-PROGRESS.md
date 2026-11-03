# Imagery: progress

Branch `imagery/internal-pages` (from `polish/internal-pages`). Audit: `qa/IMAGERY-AUDIT.md`.

| Phase | Status | Notes |
|---|---|---|
| 0: Tools | Done | Image tool connected: `codex-images` (ChatGPT image generation), the one used for the existing advice photos. |
| 1: Audit | Done, approved | 18 slots on 12 pages: 15 generated, 3 real (compass added). |
| 2: Shot list, style guide, style test | Done, approved | 13 images for 15 slots (`assets/imagery/SHOTLIST.md`). Style: `assets/imagery/STYLE.md`. Test images: `assets/generated/style-test/`. |
| 3: Generate | Done, approved | 13 images in `assets/generated/raw/`; contact sheets `qa/contact-sheet-1.html`, `qa/contact-sheet-2.html`. |
| 4: Implement | Pilot done (Advice landing), awaiting feedback | Manifest `v2/src/content/imagery.json`; build `python3 scripts/imagery.py` (AVIF, WebP, JPEG at 480/768/1200/1536, sizes in `qa/IMAGERY-SIZES.md`); component `v2/src/ui/inner/Slot.jsx` (`Picture`, `slot()`; `ShapedImage` takes `picture`). Hero preload now uses the slot's AVIF srcset. Landing: perf 85 → 91, LCP 4.1 → 3.2 s, CLS 0, page weight 369 KB. |
| 5: QA | Not started | |

## Decisions

- **Courses and clubs illustration:** remove (user, Phase 1). Replace with a real photograph (`water-kayaks` proposed).
- **Existing AI images that break the rules:** `boots-gritstone`, `wellies-puddle`, `hands-carabiner` to be replaced in the same set. `compass-moss` also to be replaced (user, Phase 1): new slot `advice-how-hero`.

## Pages

| Page | Slots | Status | Commit |
|---|---|---|---|
| Advice landing (pilot) | `advice-landing-hero`, `advice-landing-who`, `advice-landing-whole-visit` | Done | see git log |

## How to resume

Dev server: `npm run dev` in `site/` (port 5175). Read `qa/IMAGERY-AUDIT.md`, then this file, and continue from the first phase not marked Done.
