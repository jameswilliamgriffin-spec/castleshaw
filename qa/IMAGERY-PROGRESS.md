# Imagery: progress

Branch `imagery/internal-pages` (from `polish/internal-pages`). Audit: `qa/IMAGERY-AUDIT.md`.

| Phase | Status | Notes |
|---|---|---|
| 0: Tools | Done | Image tool connected: `codex-images` (ChatGPT image generation), the one used for the existing advice photos. |
| 1: Audit | Done, awaiting approval | 17 slots on 12 pages: 14 generated, 3 real. |
| 2: Shot list, style guide, style test | Not started | |
| 3: Generate | Not started | |
| 4: Implement | Not started | |
| 5: QA | Not started | |

## Decisions

- **Courses and clubs illustration:** remove (user, Phase 1). Replace with a real photograph (`water-kayaks` proposed).
- **Existing AI images that break the rules:** `boots-gritstone`, `wellies-puddle`, `hands-carabiner` to be replaced in the same set. `compass-moss` is borderline and kept unless you say otherwise.

## How to resume

Dev server: `npm run dev` in `site/` (port 5175). Read `qa/IMAGERY-AUDIT.md`, then this file, and continue from the first phase not marked Done.
