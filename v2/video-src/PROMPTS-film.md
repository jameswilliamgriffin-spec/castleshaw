# Castleshaw v2: film prompts and clips

The model is Seedance 2.5 via Runway, 16:9, with no audio. Each chapter's first frame is the previous clip's last frame, so the clips chain into one continuous move.
Drafts are 480p and cost 20 credits a second (100 credits per 5-second clip).

| # | Chapter | Stage | First frame | Prompt | Runway task | Result |
|---|---|---|---|---|---|---|
| 1 | Hills | draft A | `video-src/threshold-frame.jpg` (the page's own illustration) | The flat illustrated landscape gradually becomes real: within the first two seconds the flat colour shapes turn into photorealistic footage of real South Pennine moorland in the UK, keeping exactly the same horizon line and composition: rolling green hills on the left and right, a reservoir glinting in the valley between them, a softly glowing low sun behind the far moor. Golden late-afternoon light, clouds drifting slowly across a pale blue sky, grass moving in a light breeze. Slow, steady push-in towards the reservoir. Realistic documentary cinematography, natural light, gentle colour grade with soft greens and pale blues. No people, no text, no logos. | 8d6ee239-168c-4427-aecd-215cef8b897d | `video-src/drafts/ch1-draft-a.mp4`. Turns real by about 1s, and the composition holds. The grade is greyer and duskier than the brand, so the final needs brighter, warmer light. |
| 2 | Woods | draft A | last frame of ch1 draft A | Continuous single shot. The camera glides forward and gently down off the open moorland hillside into the edge of a UK broadleaf woodland of oak and birch, descending under the leaf canopy and settling onto a narrow earth footpath winding between mossy trunks and bracken. Warm afternoon sunlight filters through the leaves in soft shafts, dappled light on the path. Smooth slow drone-to-gimbal style move, realistic documentary cinematography, natural light, soft greens and warm highlights. No people, no faces, no text, no logos. | f09b39ef-51fb-43a9-ad5c-2b7c7f70a1d2 | `video-src/drafts/ch2-draft-a.mp4`. One continuous move from the moor into a birch wood and onto a sunlit path. Works. |
| 3 | Mud | draft A | last frame of ch2 draft A | Continuous single shot. The camera tilts down and drops low to the woodland footpath, then tracks forward just above the ground alongside a pair of muddy green wellington boots striding along the wet earth path; only the boots and lower legs in red waterproof trousers are visible, cropped at the knee. The boots splash through a brown puddle, sending droplets and mud flying in slow motion, ripples spreading across the puddle. Dappled afternoon light, fallen leaves, moss. Low tracking shot, realistic documentary cinematography, natural light, rich earthy browns and greens. No faces, no text, no logos. | b53423cb-268a-4253-a084-cc426969d69e | `video-src/drafts/ch3-draft-a.mp4`. A good splash. The boots have a small brand-style tag, so the final should specify plain, unbranded boots. |
| 4 | Water | draft A | last frame of ch3 draft A | Continuous single shot. The camera pushes down into the rippling puddle surface; the ripples widen and become the calm open water of an upland reservoir in the South Pennines, low moorland hills on the far shore under a soft blue sky. The camera rises to just above the water line beside the bow of a red sit-on kayak, and a paddle blade dips smoothly into the water in the foreground, sending out rings of ripples and drips glinting in warm afternoon sun. Only the paddle blade and a gloved hand at the edge of frame are visible. Realistic documentary cinematography, natural light, cool blues and soft greens. No faces, no text, no logos. | 78b9d1fd-4c31-460e-9f62-b8470634592a | `video-src/drafts/ch4-draft-a.mp4`. The puddle reflection turns into the bow of a red kayak on the reservoir, and the paddle dips in. Works. |
| 5 | Fire | draft A | first frame: last frame of ch4 draft A. **End frame: the centre's own photo `bushcraft-marshmallows.jpg`, cropped to 16:9** (`video-src/marshmallows-16x9.jpg`) | Continuous single shot. The camera lifts from the kayak and glides up the grassy shore, tilting down to look straight down from above onto a small fire burning in a metal stove on the grass. Orange flames and glowing embers, a few sparks rising. Hands reach in from the edges of frame holding long hazel sticks with marshmallows, toasting them over the fire. Only hands and boots visible, no faces. Natural overcast evening light, realistic documentary cinematography. No text, no logos. | 210d67e4-322f-4438-8413-8ed648aa72c6 | `drafts/ch5-draft-a.mp4`: lands on the real photo, but used a sliding split-screen wipe at about 1s. **Rejected.** A first attempt using the photo as a reference image was rejected by the API, because Seedance 2.5 cannot combine start or end frames with reference images. |
| 6 | Dusk | draft A | the same real photo (ch5's end frame), so ch5 and ch6 meet on a real Castleshaw photograph | Continuous single shot. The camera rises slowly straight up from the small fire as the sparks drift upward, tilting up to the horizon and continuing to rise high above, revealing a wide Pennine valley at dusk: dark rolling moorland hills, a reservoir holding the last pale light, and a row of old gritstone cottages on the hillside with warm yellow lit windows. The sky deepens from soft orange at the horizon to deep blue, and the first stars appear. Slow, calm crane-up move, realistic documentary cinematography, natural light. No people, no faces, no text, no logos. | 736c1a8d-901f-4908-b9b9-166201d0e4e7 | `drafts/ch6-draft-a.mp4`: embers and sparks, then a crane up to a dark reservoir valley, a lit cottage, a sunset line and the first stars. Day turns to night within the first second; the final should spread that over the clip. |
| 5 | Fire | draft B (used) | as draft A, same start and end frames | One unbroken, continuous camera move with no cuts, no wipes and no split screen. From the kayak on the reservoir the camera floats up and over the bow, drifts across the water to the grassy bank, and slowly tilts down as it travels until it is looking straight down onto a small fire burning in a round metal stove on the grass. Flames and glowing embers, a few sparks. Hands reach in from the edges of frame with long sticks and marshmallows to toast them. Only hands and boots visible, no faces. Soft evening light, realistic documentary cinematography. No text, no logos. | f3e6590a-b5a1-4cf1-9a36-475cebca6a79 | `drafts/ch5-draft-b.mp4`. A soft cross-dissolve from water to fire rather than a single move. That reads as a deliberate film transition, so it is used. Lands on the real photo. |

## Sound
| Asset | Prompt | Runway task | Cost |
|---|---|---|---|
| `ambience.mp3` (30s loop, re-encoded to 96 kbps) | Gentle outdoor ambience on open Pennine moorland in late afternoon: soft steady breeze through long grass, a distant skylark singing, a small stream trickling over stones nearby, occasional far-off sheep. Calm, natural, spacious, no music, no voices. Even level throughout so it can sit quietly under a web page. | 814f2538-b5ea-4a0b-8b07-aa8fbae14560 | 30 credits |

## Master
`video-src/masters/castleshaw-film-drafts.mp4` is stitched locally with ffmpeg (`stitch.sh`): chapters 1, 2, 3, 4, 5B and 6. The duplicate first frame of each chained clip is dropped. 30.0s at 24fps, then turned into 361 WebP frames at 12fps by `build_film.sh`.


## Finals (approved by the client: "yes go for it")
Each approved draft is re-rendered at 1080p with Runway's draft enhance, which keeps the draft's prompt and frames, so the chain stays intact. Cost: 68 credits a second, 340 per 5-second chapter.

| # | Chapter | Final task | From draft | Notes |
|---|---|---|---|---|
| 1 | Hills | d76a3f99-1a1a-4b67-a6b0-66706a93b711 | 8d6ee239 (A) | |
| 2 | Woods | a34e520a-633e-4311-9772-4a4fac48913d | f09b39ef (A) | |
| 3 | Mud | ab4e48ac-d460-4491-b476-1d1499b87d66 | c0692cab-e65f-4c57-9844-1d7448e12894 (re-draft C) | Re-drafted with "plain, unbranded boots", pinned to the same start frame (ch2's last) and end frame (the old ch3's last, which ch4 starts from), so the chain is unchanged. Prompt: as draft A, plus "plain, unbranded dark green rubber wellington boots with no tags, labels or logos". |
| 4 | Water | d1bdecaf-5bd6-4154-a059-b3de35aafd6f | 78b9d1fd (A) | |
| 5 | Fire | e265c54c-05b3-4082-af3d-af23f1ba115b | f3e6590a (B) | |
| 6 | Dusk | 22dee24e-a0c4-4d6e-b559-c69128545596 | 736c1a8d (A) | |

The grade is applied in `stitch.sh` (ffmpeg `eq`): +0.05 brightness, +10% saturation and slightly warmer, eased in over 0–2s so frame one still matches the illustration, and eased out from 24s so dusk stays dark.

Final master: `video-src/masters/castleshaw-film.mp4` (1920×1080, 30.0s, graded). It becomes 361 WebP frames at 12fps (desktop 1600px, 13 MB; mobile 800px, 5.8 MB) plus six chapter posters.

## Credits
| Item | Credits |
|---|---|
| 7 drafts at 480p (ch1, ch2, ch3, ch4, ch5 A, ch5 B, ch6) | 700 |
| 1 extra draft (ch3 C, unbranded boots) | 100 |
| Ambience loop (30s) | 30 |
| 6 finals at 1080p (6 × 340) | 2,040 |
| **Total** | **2,870** (4,050 → 1,180 remaining) |
