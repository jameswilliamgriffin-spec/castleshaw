# Imagery: progress

Branch `imagery/internal-pages` (from `polish/internal-pages`). Audit: `qa/IMAGERY-AUDIT.md`.

| Phase | Status | Notes |
|---|---|---|
| 0: Tools | Done | Image tool connected: `codex-images` (ChatGPT image generation), the one used for the existing advice photos. |
| 1: Audit | Done, approved | 18 slots on 12 pages: 15 generated, 3 real (compass added). |
| 2: Shot list, style guide, style test | Done, approved | 13 images for 15 slots (`assets/imagery/SHOTLIST.md`). Style: `assets/imagery/STYLE.md`. Test images: `assets/generated/style-test/`. |
| 3: Generate | Done, approved | 13 images in `assets/generated/raw/`; contact sheets `qa/contact-sheet-1.html`, `qa/contact-sheet-2.html`. |
| 4: Implement | Done, approved | All 18 slots on 12 pages (pilot and batches 1–3). | Manifest `v2/src/content/imagery.json`; build `python3 scripts/imagery.py` (AVIF, WebP, JPEG at 480/768/1200/1536, sizes in `qa/IMAGERY-SIZES.md`); component `v2/src/ui/inner/Slot.jsx` (`Picture`, `slot()`; `ShapedImage` takes `picture`). Hero preload now uses the slot's AVIF srcset. Landing: perf 85 → 91, LCP 4.1 → 3.2 s, CLS 0, page weight 369 KB. |
| 5: QA | Done | See "Phase 5 results". |

## Decisions

- **Courses and clubs illustration:** removed (user, Phase 1); replaced with the real `water-kayaks` photo, and the file deleted (in git history).
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
| Activities hub (batch 2) | `activities-hub-quote` | Done | `47c8c53` |
| Team building (batch 2) | `activities-team-quote` | Done | `47c8c53` |
| Bushcraft (batch 2) | `activities-bushcraft-break` | Done | `47c8c53` |
| Environmental education (batch 2) | `activities-env-break` (real photo) | Done | `47c8c53` |
| Roman and local history (batch 2) | `activities-roman-break` (three real photos) | Done | `47c8c53` |
| Plan your visit (batch 3) | `activities-plan-break` | Done | `ed6eda7` |
| Stay and hire (batch 3) | `stay-evening-break` | Done (crop raised to show the beam and the light) | batch 3 |
| Courses and clubs hub (batch 3) | `courses-hub-hero` (real photo; the illustration removed) | Done | `ed6eda7` |
| Holiday clubs (batch 3) | `courses-clubs-quote` | Done | `ed6eda7` |

## Phase 5 results

Compared against a build of `1bbb77b` (the site just before this work), all 34 pages at 1440 and 390:

- **Console errors, broken images, sideways scroll:** none. One broken image was found and fixed: the homepage advice band (`ui/AdviceBand.jsx`) still used `hands-carabiner.webp`, which had been removed; the file is restored so the homepage is unchanged (it breaks the imagery rules and should be swapped when the homepage is next touched).
- **Layout shift:** 0 on every page.
- **Keyboard and screen readers:** the number of tab stops and the heading outline are identical on every page. The only change in what screen readers announce is intended: generated images are decorative (hidden), and the three real photos added announce their alt text.
- **Repeats:** no generated image appears twice on a page or on neighbouring pages. Existing repeats were already there before this work (homepage hero photos, the Our team hero portrait, the What people say hero drawing).
- **Balance:** at most 3 new slots on a page (the Advice landing, where they replaced existing images); most pages gained one.
- **Contrast over images:** measured against the brightest background pixel behind the text on every navy quote band (4 pages) and the Advice landing incident band, at every width. All pass AA: worst cases white 6.8:1, sky blue 5.1:1, and the large lime incident number 3.4:1 (large text, needs 3:1).
- **Lighthouse (mobile, production build), before → after:** Advice landing 86 → 91 (LCP 4.1 → 3.2 s); How it works 83 → 92 (4.6 → 3.1 s); Stay 80 → 82 (5.0 → 4.5 s); Courses hub 85 → 86 (4.1 → 3.9 s); Activities hub 79 → 78 (within run-to-run variation; 5.4 s both). Accessibility 100 on all, CLS 0 on all. Initial page weight fell on four of the five (responsive AVIF, lazy-loading below the fold).

## How to resume

Dev server: `npm run dev` in `site/` (port 5175). Read `qa/IMAGERY-AUDIT.md`, then this file, and continue from the first phase not marked Done.
