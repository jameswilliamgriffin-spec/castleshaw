# Imagery audit: internal pages (Phase 1)

Branch `imagery/internal-pages`. Screenshots at 1440 and 390 in `qa/imagery-before/<page>/` (contact sheets `_sheet-0..2.jpg`). Standards: `qa/STANDARDS.md`.

## What's there now

The internal pages are already rich in **real photographs of the centre** (about 170 in use across 33 pages, in heroes, card thumbnails, galleries and split sections). Generated imagery today is limited to the educational visits advice section (7 AI photographs) plus one illustration on the Courses and clubs hub.

Image types by folder:

| Folder | Type |
|---|---|
| `public/shared/images/site/`, `gallery/`, `team/`, root `*.jpg` | Real photographs (centre, activities, staff, archive, children's letters and drawings) |
| `public/shared/images/generated/` | AI-generated photographs (7) |
| `public/shared/images/illustrations/` | Illustrations. Only `courses-camp.jpg` is in use |

### Existing generated images checked against the new rules

| Image | Used on | Verdict |
|---|---|---|
| `boots-gritstone` | Advice landing hero | **Breaks rules**: legs and boots. Replace. |
| `wellies-puddle` | Advice landing "Who it's for"; Who it's for hero | **Breaks rules**: legs. Replace. |
| `hands-carabiner` | Advice landing "The whole visit"; Service agreement hero | **Breaks rules**: hands, rope and carabiner (safety kit). Replace. |
| `compass-moss` | How it works hero | Borderline: a compass is kit but not safety kit. Keep for now; can be replaced in the same set if you prefer. |
| `moor-dusk` | Advice landing incident band; Emergency support hero | Complies. Keep. |
| `drystone-wall` | Guidance and resources hero | Complies. Keep. |
| `stream-stones` | Advice landing guide section | Complies. Keep. |
| `illustrations/courses-camp` | Courses and clubs hub hero | **Remove** (your decision). Illustration, and shows a canoe and helmet. Replace with a real photograph. |

### Unused real photographs (54)

54 real photos in the library aren't used anywhere. Most show people at activities or are children's letters. Those suited to atmospheric slots, and used below in place of generated images: `roman-stone-1`, `roman-stone-2`, `roman-stone-3` (carved stones), `sec-pond` (pond and hills, no people), `water-kayaks` (for the Courses hub hero).

## Slot types

- **Hero swap (HS):** an existing page-header image frame, keeping its current shape and size; only the picture changes.
- **Break banner (BR):** a full-width image between two long text sections. 21:9 desktop, 3:2 mobile. No text on it. Lazy-loaded.
- **Side image (SD):** beside copy in an existing two-column section, keeping its current frame (4:5).
- **Quote backdrop (QB):** a low-key image behind a navy quote band, under a navy scrim so the quote meets AA contrast. Full bleed; text sits left and centre, so the image's interest sits right or is evenly textured. 16:9 desktop, 4:5 mobile.

## Slots (17)

| # | Slot ID | Page | Position | Type | Ratio (desktop / mobile) | Text safe area | Mood | Colour family | Source |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `advice-landing-hero` | Advice landing | Hero image beside the h1 | HS | current frame, 16:10 / 4:3 | none | Wet gritstone and heather, moving water, open moor | slate and stone | generated |
| 2 | `advice-landing-who` | Advice landing | "Any school, college…" side image | SD | 4:5 / 4:5 | none | Puddle on a peat track reflecting sky | water blue | generated |
| 3 | `advice-landing-whole-visit` | Advice landing | "The whole visit…" side image | SD | 4:5 / 4:5 | none | Lichen and moss on gritstone, macro | sage | generated |
| 4 | `advice-how-break` | How it works | Between "Which visits come to us" and "What we look at" | BR | 21:9 / 3:2 | none | Mist lifting off moorland, layered hills | slate | generated |
| 5 | `advice-agreement-hero` | Service agreement | Hero image | HS | 4:5 / 4:5 | none | Weathered dry-stone wall top, tuft of wool on stone | stone grey | generated |
| 6 | `advice-agreement-break` | Service agreement | Between "What's included" and "Packages and prices" | BR | 21:9 / 3:2 | none | Wind ripples on reservoir water | slate blue | generated |
| 7 | `advice-who-hero` | Who it's for | Hero image | HS | 4:5 / 4:5 | none | Rain-dimpled puddle in a gritstone track, grass edge | water blue | generated |
| 8 | `advice-advisers-quote` | Our advisers | Behind the navy "What inspectors say" quote | QB | 16:9 / 4:5 | left and centre | Moorland ridge at blue hour, very low key | slate blue | generated |
| 9 | `activities-hub-quote` | Activities hub | Behind the navy "What schools say" quote | QB | 16:9 / 4:5 | left and centre | Bracken slope in late light, soft focus | land green | generated |
| 10 | `activities-team-quote` | Team building | Behind the navy "What schools say" quote | QB | 16:9 / 4:5 | left and centre | Rain on heather and grass, macro, dark | sage and green | generated |
| 11 | `activities-bushcraft-break` | Bushcraft | Between "What you can do" and "At a glance" | BR | 21:9 / 3:2 | none | Embers and thin smoke on a woodland floor | bushcraft amber | generated |
| 12 | `activities-env-break` | Environmental education | Between "Primary geography" and "Secondary field studies" | BR | 21:9 / 3:2 | none | Pond reflecting sky and hills | environment sage | **real** (`sec-pond`) |
| 13 | `activities-roman-break` | Roman and local history | Between "Local history" and "For secondary groups" | BR (three-up strip) | 3 × 1:1 / 3 × 1:1 | none | Carved Roman-style stones | Romans brick | **real** (`roman-stone-1..3`) |
| 14 | `activities-plan-break` | Plan your visit | Between "Information for group leaders" and "What to bring" | BR | 21:9 / 3:2 | none | Mud, puddles and wet grass on a track | land green and peat | generated |
| 15 | `stay-evening-break` | Stay and hire | Between "Ways to book" and "Facilities" | BR | 21:9 / 3:2 | none | Lamplight on rough stone and old timber, macro (no room, no furniture) | Stay warm neutral | generated |
| 16 | `courses-hub-hero` | Courses and clubs hub | Hero image (replaces the illustration) | HS | current photo frame | none | Real kayaking session | water blue | **real** (`water-kayaks`) |
| 17 | `courses-clubs-quote` | Holiday clubs | Behind the navy "What parents say" quote | QB | 16:9 / 4:5 | left and centre | Backlit grass seed heads, summer evening | land green, warm | generated |

**Totals:** 17 slots on 12 pages: 14 generated, 3 real. Of the 14 generated, 5 replace existing AI images that break the rules, and 9 are new.

## Pages and sections left without new imagery, and why

| Page | Reason |
|---|---|
| Adventure on land, Adventure on water | Already image-rich: 7–8 real activity photos plus a split photo. |
| Environmental education (other sections) | One break banner is enough on a long page with 8 real photos. |
| Training, Emergency support, Guidance and resources | Short pages; heroes already carry imagery; content is cards and lists. |
| Questions | FAQ; content-dense. |
| Get a quote, Contact | The form is the point of the page; an image would compete with it. |
| Privacy | Legal text. |
| Activity courses, Outdoor awards, Holiday clubs (other sections) | Already have real photos and galleries. |
| About hub, Where we are, Around the valley | Real places; generated imagery would imply it shows the valley. |
| Accreditation, What people say (testimonials and Hall of Fame), Our team, History (including Remembering Nick Price), News | Authenticity matters: no generated imagery. |
| Closing call-to-action bands (every page) | Approved design, repeated on every page; an image would repeat site-wide. |
| Homepage | Out of scope. |

## Where real photography is needed

1. **Educational visits advice (priority):** all 10 generated images on the advice pages, ideally replaced with real Castleshaw landscape and texture photography (gritstone, moor, reservoir, walls, streams, in the valley). A half-day shoot would cover it. No people needed.
2. **Where we are:** the entrance, the coach drop-off point and parking, to sit with the directions once supplied.
3. **Stay and hire:** food and dining photos if catering is offered; confirm the room photos are current.
4. **Our team and Our advisers:** current portraits for any staff changes, and higher-resolution adviser portraits.
5. **Holiday clubs and courses:** 2026 session photos once they run.
6. **News:** a photo with each new item.
7. **Consent:** confirm consent covers the existing photos of children on the new site (question A14 in the client document).
