#!/usr/bin/env bash
# Turn the stitched master film into scrub-ready assets for /v2.
#   usage: ./build_film.sh master.mp4 [fps]
# Output (in site/public/video):
#   frames/desktop/f0001.webp...  1600px wide WebP sequence
#   frames/mobile/f0001.webp...    800px wide WebP sequence
#   frames/*/manifest.json         frame count + naming
#   posters/<chapter>.jpg          one still per chapter (reduced-motion / data-saver fallback)
#   film-1080.mp4, film-720.mp4    all-keyframe H.264 masters (kept as fallbacks/archive)
set -euo pipefail
IN="$1"; FPS="${2:-12}"
OUT="$(cd "$(dirname "$0")/../../public" && pwd)/video"
TMP="$(mktemp -d)"
mkdir -p "$OUT/frames/desktop" "$OUT/frames/mobile" "$OUT/posters"
rm -f "$OUT"/frames/*/f*.webp
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$IN")

for spec in "desktop 1600 74" "mobile 800 70"; do
  set -- $spec; NAME=$1; W=$2; Q=$3
  ffmpeg -v error -i "$IN" -vf "fps=$FPS,scale=$W:-2:flags=lanczos" "$TMP/$NAME-%04d.png"
  N=0
  for f in "$TMP/$NAME"-*.png; do
    N=$((N+1)); cwebp -quiet -q "$Q" -m 5 "$f" -o "$OUT/frames/$NAME/f$(printf %04d $N).webp"
  done
  printf '{"count": %d, "fps": %s, "prefix": "f", "ext": "webp", "width": %d}\n' "$N" "$FPS" "$W" > "$OUT/frames/$NAME/manifest.json"
done

# one poster per chapter, taken two-thirds of the way through each chapter
i=0
for ch in hills woods mud water fire dusk; do
  T=$(python3 -c "print(($i + 0.66) * $DUR / 6)")
  ffmpeg -v error -y -ss "$T" -i "$IN" -frames:v 1 -vf "scale=1600:-2" -q:v 4 "$OUT/posters/$ch.jpg"
  i=$((i+1))
done

# all-intra H.264: every frame a keyframe, so currentTime seeking is instant if ever used
ffmpeg -v error -y -i "$IN" -an -vf "scale=1920:-2" -c:v libx264 -preset slow -crf 26 -g 1 -keyint_min 1 -pix_fmt yuv420p -movflags +faststart "$TMP/film-1080.mp4"
ffmpeg -v error -y -i "$IN" -an -vf "scale=1280:-2" -c:v libx264 -preset slow -crf 27 -g 1 -keyint_min 1 -pix_fmt yuv420p -movflags +faststart "$TMP/film-720.mp4"
mkdir -p "$(dirname "$0")/masters" && mv "$TMP"/film-*.mp4 "$(dirname "$0")/masters/"
rm -rf "$TMP"
du -sh "$OUT/frames/desktop" "$OUT/frames/mobile" "$OUT/posters"
