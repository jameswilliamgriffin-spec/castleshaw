# Imagery: progress

Branch `imagery/internal-pages` (from `polish/internal-pages`). Audit: `qa/IMAGERY-AUDIT.md`.

| Phase | Status | Notes |
|---|---|---|
| 0: Tools | Done | Image tool connected: `codex-images` (ChatGPT image generation), the one used for the existing advice photos. |
| 1: Audit | Done, approved | 18 slots on 12 pages: 15 generated, 3 real (compass added). |
| 2: Shot list, style guide, style test | Done, approved | 13 images for 15 slots (`assets/imagery/SHOTLIST.md`). Style: `assets/imagery/STYLE.md`. Test images: `assets/generated/style-test/`. |
| 3: Generate | Done, approved | 13 images in `assets/generated/raw/`; contact sheets `qa/contact-sheet-1.html`, `qa/contact-sheet-2.html`. |
| 4: Implement | Pilot and batch 1 approved; batch 2 (Activities) done, awaiting feedback | Manifest `v2/src/content/imagery.json`; build `python3 scripts/imagery.py` (AVIF, WebP, JPEG at 480/768/1200/1536, sizes in `qa/IMAGERY-SIZES.md`); component `v2/src/ui/inner/Slot.jsx` (`Picture`, `slot()`; `ShapedImage` takes `picture`). Hero preload now uses the slot's AVIF srcset. Landing: perf 85 → 91, LCP 4.1 → 3.2 s, CLS 0, page weight 369 KB. |
| 5: QA | Not started | |

## Decisions

- **Courses and clubs illustration:** remove (user, Phase 1). Replace with a real photograph (`water-kayaks` proposed).
- **Existing AI images that break the rules:** `boots-gritstone`, `wellies-puddle`, `hands-carabiner` to be replaced in the same set. `compass-moss` also to be replaced (user, Phase 1): new slot `advice-how-hero`.

## New blocks

- `ImageBreak` (full-width image between sections, 30vw tall up to 30rem; 3:2 on phones; reveals once; decorative).
- `Band backdrop="slot"` (image behind a navy band under a navy scrim: 93% to 82% left to right, 88% flat on phones; text measured on every band and width, worst case sky-blue text 5.1:1, white 6.8:1).
- `ImageBreak` with a multi-image slot draws an even row (the Roman stones).
- Fix: `picture > source { display: none }`, so sources never become grid items when a picture is `display: contents`.
- `Hero` / `PageTop` `image={{ slot, key }}` (manifest image in the existing hero frame; `key` keeps the old shape picks).

## Pages

| Page | Slots | Status | Commit |
|---|---|---|---|
| Advice landing (pilot) | `advice-landing-hero`, `advice-landing-who`, `advice-landing-whole-visit` | Done | `7bf4da2` |
| How it works (batch 1) | `advice-how-hero`, `advice-how-break` | Done | `25a44fa` |
| Service agreement (batch 1) | `advice-agreement-hero`, `advice-agreement-break` | Done | `25a44fa` |
| Who it's for (batch 1) | `advice-who-hero` | Done | `25a44fa` |
| Our advisers (batch 1) | `advice-advisers-quote` | Done | `25a44fa` |
| Activities hub (batch 2) | `activities-hub-quote` | Done | batch 2 |
| Team building (batch 2) | `activities-team-quote` | Done | batch 2 |
| Bushcraft (batch 2) | `activities-bushcraft-break` | Done | batch 2 |
| Environmental education (batch 2) | `activities-env-break` (real photo) | Done | batch 2 |
| Roman and local history (batch 2) | `activities-roman-break` (three real photos) | Done | batch 2 |

## How to resume

Dev server: `npm run dev` in `site/` (port 5175). Read `qa/IMAGERY-AUDIT.md`, then this file, and continue from the first phase not marked Done.
