# Imagery: progress

Branch `imagery/internal-pages` (from `polish/internal-pages`). Audit: `qa/IMAGERY-AUDIT.md`.

| Phase | Status | Notes |
|---|---|---|
| 0: Tools | Done | Image tool connected: `codex-images` (ChatGPT image generation), the one used for the existing advice photos. |
| 1: Audit | Done, approved | 18 slots on 12 pages: 15 generated, 3 real (compass added). |
| 2: Shot list, style guide, style test | Done, approved | 13 images for 15 slots (`assets/imagery/SHOTLIST.md`). Style: `assets/imagery/STYLE.md`. Test images: `assets/generated/style-test/`. |
| 3: Generate | Done, approved | 13 images in `assets/generated/raw/`; contact sheets `qa/contact-sheet-1.html`, `qa/contact-sheet-2.html`. |
| 4: Implement | Pilot approved; batch 1 (Advice) done, awaiting feedback | Manifest `v2/src/content/imagery.json`; build `python3 scripts/imagery.py` (AVIF, WebP, JPEG at 480/768/1200/1536, sizes in `qa/IMAGERY-SIZES.md`); component `v2/src/ui/inner/Slot.jsx` (`Picture`, `slot()`; `ShapedImage` takes `picture`). Hero preload now uses the slot's AVIF srcset. Landing: perf 85 → 91, LCP 4.1 → 3.2 s, CLS 0, page weight 369 KB. |
| 5: QA | Not started | |

## Decisions

- **Courses and clubs illustration:** remove (user, Phase 1). Replace with a real photograph (`water-kayaks` proposed).
- **Existing AI images that break the rules:** `boots-gritstone`, `wellies-puddle`, `hands-carabiner` to be replaced in the same set. `compass-moss` also to be replaced (user, Phase 1): new slot `advice-how-hero`.

## New blocks

- `ImageBreak` (full-width image between sections, 30vw tall up to 30rem; 3:2 on phones; reveals once; decorative).
- `Band backdrop="slot"` (image behind a navy band under a navy scrim: 93% to 74% left to right, 86% flat on phones).
- `Hero` / `PageTop` `image={{ slot, key }}` (manifest image in the existing hero frame; `key` keeps the old shape picks).

## Pages

| Page | Slots | Status | Commit |
|---|---|---|---|
| Advice landing (pilot) | `advice-landing-hero`, `advice-landing-who`, `advice-landing-whole-visit` | Done | `7bf4da2` |
| How it works (batch 1) | `advice-how-hero`, `advice-how-break` | Done | batch 1 |
| Service agreement (batch 1) | `advice-agreement-hero`, `advice-agreement-break` | Done | batch 1 |
| Who it's for (batch 1) | `advice-who-hero` | Done | batch 1 |
| Our advisers (batch 1) | `advice-advisers-quote` | Done; text over image measured: white 7.1:1 or better, sky 5.3:1 or better | batch 1 |

## How to resume

Dev server: `npm run dev` in `site/` (port 5175). Read `qa/IMAGERY-AUDIT.md`, then this file, and continue from the first phase not marked Done.
