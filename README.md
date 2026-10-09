# Castleshaw Centre: homepage concepts

One project that builds into one static folder:

| URL | What it is |
|---|---|
| `/` | Version chooser: logo, one-line intro, and two choices with preview thumbnails |
| `/v1/` | Version 1: the illustrated homepage, unchanged apart from asset paths and an "All versions" link |
| `/v2/` | Version 2: the same illustrated top half, then the hills come alive as a scroll-scrubbed film |

## Run it locally

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5175. Open `/`, `/v1/` or `/v2/` from there.

## Build and check the upload

```bash
npm run build
npm run preview
```

`npm run build` writes everything to `dist/`. `npm run preview` serves that build at http://localhost:4175, so you can check `/`, `/v1/` and `/v2/` exactly as they will be uploaded.

## Deploy on Vercel

1. In Vercel, choose **Add New → Project** and import `jameswilliamgriffin-spec/castleshaw`.
2. Leave the settings as detected. `vercel.json` already sets the Vite framework, `npm run build` and the `dist` output.
3. Deploy. `/`, `/v1/` and `/v2/` all work, and `/v1` and `/v2` redirect to the slashed URLs.

## Upload

Upload the **contents of `dist/`** to any static host (Netlify, Vercel, GitHub Pages, S3, or plain FTP to a web server). There is no server code.

Every URL is relative (Vite `base: './'`), so it works at a domain root or in a subfolder such as `example.com/castleshaw/`. If you link to a version, use the trailing slash: `/v2/` rather than `/v2`. Each version page also redirects to the slashed URL itself.

## Folder layout

```
index.html, chooser/        the version chooser (plain HTML and CSS, no framework)
v1/                         Version 1 (React): index.html and src/
v2/                         Version 2 (React): index.html and src/
v2/video-src/               film source material, drafts, masters and scripts (not uploaded)
public/shared/images/       photos and logo, used by both versions
public/shared/thumbs/       chooser thumbnails
public/v2/video/            v2 only: frame sequences, posters, ambience, PROMPTS.md
```

## Version 2: how the film works

- **Scrubbing technique:** a WebP frame sequence painted to a `<canvas>`, rather than seeking a `<video>` element. Setting `video.currentTime` from scroll is unreliable in Safari and Firefox even with all-keyframe encodes, and it can only seek as fast as the decoder allows. Frames give exact, instant, reversible scrubbing in every browser.
- **Film source:** six 5-second Seedance 2.5 clips (via Runway), each starting on the previous clip's last frame. The first frame is the page's own drawing, and chapter 5 lands on the centre's own marshmallow photo. Stitched and graded by `v2/video-src/stitch.sh`.
- **Frame sizes:** 1600px wide on desktop and 800px on mobile, at 12 frames per second, which is plenty when the scroll is the clock.
- **Loading:** frames load progressively (every 16th, then every 8th, 4th, 2nd, then all), starting only when the reader gets within about one and a half screens of the film. The top of the page and the chooser stay light.
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
