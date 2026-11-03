# Castleshaw Centre website

One project that builds into one static folder:

| URL | What it is |
|---|---|
| `/` | Redirects to `/v2/` (Vercel redirect in `vercel.json`, with a fallback page for other hosts) |
| `/v2/` | The homepage: the illustrated top half, then the hills come alive as a scroll-scrubbed film |
| `/v2/<section>/…` | The inner pages: 33 pages in six sections (see below) |

Version 1 and the version chooser are retired: they are no longer built or deployed, and `/v1/` redirects to `/v2/`. The Version 1 source stays in `v1/` for reference.

## Run it locally

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5175. Open `/` or `/v2/` from there.

## Build and check the upload

```bash
npm run build
npm run preview
```

`npm run build` writes everything to `dist/`. `npm run preview` serves that build at http://localhost:4175, so you can check the site exactly as it will be uploaded.

## Deploy on Vercel

1. In Vercel, choose **Add New → Project** and import `jameswilliamgriffin-spec/castleshaw`.
2. Leave the settings as detected. `vercel.json` already sets the Vite framework, `npm run build` and the `dist` output.
3. Deploy. `/` and `/v1/` redirect to `/v2/`, and `/v2` redirects to the slashed URL.

## Upload

Upload the **contents of `dist/`** to any static host (Netlify, Vercel, GitHub Pages, S3, or plain FTP to a web server). There is no server code.

Every URL is relative (Vite `base: './'`), so it works at a domain root or in a subfolder such as `example.com/castleshaw/`. Link with the trailing slash: `/v2/` rather than `/v2`. Each page also redirects to the slashed URL itself.

## Folder layout

```
index.html                  redirect from / to /v2/
v1/                         Version 1 (React), retired: kept for reference, not built
v2/                         Version 2 (React): index.html and src/
v2/video-src/               film source material, drafts, masters and scripts (not uploaded)
public/shared/images/       photos and logo, used by both versions
public/v2/video/            v2 only: frame sequences, posters, ambience, PROMPTS.md
public/shared/images/site/  photos from the current castleshawcentre.com, renamed by subject
public/shared/images/illustrations/  AI illustrations in the logo's flat style (inner pages)
content/                    the site structure proposal and OPEN-QUESTIONS.md
```

## Version 2 inner pages

The site map lives in one file, `v2/src/site.mjs`: sections, pages, titles and meta descriptions. The menu, footer, breadcrumbs and section navigation all read from it.

- `scripts/gen-pages.mjs` writes an `index.html` for every page in the map. It runs automatically before `dev` and `build`, so add a page to `site.mjs`, never by hand.
- `v2/src/inner.jsx` maps each path to its component in `v2/src/pages/`.
- The building blocks (hero, bands, splits, quotes, forms and so on) are in `v2/src/ui/inner/blocks.jsx`, styled by `v2/src/inner.css`.
- The advice landing page (`/v2/advice-and-guidance/`) keeps its own entry and motion. Every other inner page is deliberately calm: no film, smooth scrolling or custom cursor, only hover feedback.
- Anything the centre has not yet confirmed is shown with an amber **To confirm** marker (`<TBC>` in the code). The full list is in `content/OPEN-QUESTIONS.md`.
- Forms are concept forms. They show a confirmation but send nothing.
- Images use organic shapes from `v2/src/ui/shape/` (`<ShapedImage />`, with tokens such as `--shape-blob-3`). To compare every shape, backdrop and accent, run `npm run dev` and open `/v2/shape-lab/`. That page is dev-only and is never built or deployed.

## Version 2: how the film works

- **Scrubbing technique:** a WebP frame sequence painted to a `<canvas>`, rather than seeking a `<video>` element. Setting `video.currentTime` from scroll is unreliable in Safari and Firefox even with all-keyframe encodes, and it can only seek as fast as the decoder allows. Frames give exact, instant, reversible scrubbing in every browser.
- **Film source:** six 5-second Seedance 2.5 clips (via Runway), each starting on the previous clip's last frame. The first frame is the page's own drawing, and chapter 5 lands on the centre's own marshmallow photo. Stitched and graded by `v2/video-src/stitch.sh`.
- **Frame sizes:** 1600px wide on desktop and 800px on mobile, at 12 frames per second, which is plenty when the scroll is the clock.
- **Loading:** frames load progressively (every 16th, then every 8th, 4th, 2nd, then all), starting only when the reader gets within about one and a half screens of the film. The top of the page stays light.
- **Smoothing:** GSAP's ticker eases toward the target frame, and Lenis smooths the scroll itself.
- **Fallbacks:**
  - With reduced motion, Save-Data or a 2G connection, the film becomes six still posters that cross-fade by chapter, with no scrubbing.
  - If frames are missing, the posters still show.
- **Archive copies:** all-keyframe H.264 masters (1080p and 720p) are kept in `v2/video-src/masters/` but are not uploaded.
- **The transition:** the illustrated threshold scene (`v2/src/threshold.json`, drawn by `v2/video-src/gen_threshold.py`) is the exact image used as the film's first frame. As you scroll, the drawing fades front to back and leaves its ridge lines as a chalk tracing, while the film beneath it turns the flat shapes into real hills.

### Rebuilding the film

```bash
cd v2/video-src
./stitch.sh masters/castleshaw-film.mp4 finals/ch1.mp4 finals/ch2.mp4 finals/ch3.mp4 finals/ch4.mp4 finals/ch5.mp4 finals/ch6.mp4
./build_film.sh masters/castleshaw-film.mp4 12
```

This regenerates `public/v2/video/frames/*`, the manifests and the chapter posters from a stitched master.

## Notes

- The Version 2 enquiry form is a concept only and does not send. The phone number is real.
- Every film prompt and its clip is logged in `public/v2/video/PROMPTS.md`.
- The ChatGPT suggestions taken and rejected are logged in `v2/video-src/gpt/DECISIONS.md`.

## Measured (production build)

| | First view | After scrolling everything |
|---|---|---|
| Chooser `/` | 137 KB | n/a |
| Version 1 | about 1.7 MB | about 1.7 MB |
| Version 2 | about 0.4 MB | about 15 MB on desktop, about 7 MB on mobile |

- The whole upload (`dist/`) is 26 MB.
- v2 scroll through the transition and film on a desktop Mac: median frame 16.7 ms (60fps), 95th percentile 17.6 ms, no frames over 50 ms, layout shift (CLS) 0.019.
