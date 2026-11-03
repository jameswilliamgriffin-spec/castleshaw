# Generated image register

Every image here is AI-generated (not a photograph of the Castleshaw Centre) and can be swapped for real photography at any time. Prompts are the base prompt and negative list in `assets/imagery/STYLE.md` plus the subject lines in `assets/imagery/SHOTLIST.md`.

| Image ID | File | Tool / model | Date | Intended slots | Status |
|---|---|---|---|---|---|
| `g13-grass-backlit` (style test) | `style-test/g13-grass-backlit.png` | codex-images (ChatGPT image generation) | 2026-11-03 | `activities-hub-quote`, `courses-clubs-quote` | Style test; superseded by the batch 2 version |
| `g07-reservoir-ripples` (style test) | `style-test/g07-reservoir-ripples.png` | codex-images (ChatGPT image generation) | 2026-11-03 | `advice-agreement-break` | Style test; superseded by the batch 2 version |
| `g10-embers` (style test) | `style-test/g10-embers.png` | codex-images (ChatGPT image generation) | 2026-11-03 | `activities-bushcraft-break` | Style test; copied unchanged to `raw/` as the final |
| `g12-lamplight-stone` (style test) | `style-test/g12-lamplight-stone.png` | codex-images (ChatGPT image generation) | 2026-11-03 | `stay-evening-break` | Style test; superseded by the batch 2 version |
| `g01-moor-stream` | `raw/g01-moor-stream.png` | codex-images (ChatGPT image generation) | 2026-11-03 | `advice-landing-hero` | Approved (batch 1); in use |
| `g02-peat-puddle` | `raw/g02-peat-puddle.png` | codex-images (ChatGPT image generation) | 2026-11-03 | `advice-landing-who` | Approved (batch 1); in use |
| `g03-lichen-gritstone` | `raw/g03-lichen-gritstone.png` | codex-images (ChatGPT image generation) | 2026-11-03 | `advice-landing-whole-visit` | Approved (batch 1); in use |
| `g04-moor-mist` | `raw/g04-moor-mist.png` | codex-images (ChatGPT image generation) | 2026-11-03 | `advice-how-break`, `advice-advisers-quote` | Approved (batch 1); in use |
| `g05-bilberry-heather` | `raw/g05-bilberry-heather.png` | codex-images (ChatGPT image generation) | 2026-11-03 | `advice-how-hero` | Approved (batch 1); in use |
| `g06-wall-wool` | `raw/g06-wall-wool.png` | codex-images (ChatGPT image generation) | 2026-11-03 | `advice-agreement-hero` | Approved (batch 1); in use |
| `g08-cotton-grass` | `raw/g08-cotton-grass.png` | codex-images (ChatGPT image generation) | 2026-11-03 | `advice-who-hero` | Approved (batch 1); in use |
| `g09-heather-rain` | `raw/g09-heather-rain.png` | codex-images (ChatGPT image generation) | 2026-11-03 | `activities-team-quote` | Approved (batch 1); in use |
| `g07-reservoir-ripples` | `raw/g07-reservoir-ripples.png` | codex-images (ChatGPT image generation) | 2026-11-03 | `advice-agreement-break` | Approved (batch 2); in use |
| `g10-embers` | `raw/g10-embers.png` | codex-images (ChatGPT image generation) | 2026-11-03 | `activities-bushcraft-break` | Approved (batch 2); in use |
| `g11-mud-track` | `raw/g11-mud-track.png` | codex-images (ChatGPT image generation) | 2026-11-03 | `activities-plan-break` | Approved (batch 2); in use |
| `g12-lamplight-stone` | `raw/g12-lamplight-stone.png` | codex-images (ChatGPT image generation) | 2026-11-03 | `stay-evening-break` | Approved (batch 2); in use |
| `g13-grass-backlit` | `raw/g13-grass-backlit.png` | codex-images (ChatGPT image generation) | 2026-11-03 | `activities-hub-quote`, `courses-clubs-quote` | Approved (batch 2); in use |

**In use:** all 13 images, built into `public/shared/images/gen/` and mapped to slots in `v2/src/content/imagery.json` (`source: generated`). To replace one with a real photograph, point its `from` at the photo (and set `source` to `real`), then run `python3 scripts/imagery.py`.
