#!/bin/sh
# Renders guide/guide.html to the downloadable PDF, plus a cover image for the web page.
# Needs Google Chrome (headless) and macOS sips.
set -e
cd "$(dirname "$0")"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
OUT=../public/shared/docs
mkdir -p "$OUT"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --generate-pdf-document-outline \
  --allow-file-access-from-files --print-to-pdf="$OUT/castleshaw-educational-visits-guide.pdf" "file://$PWD/guide.html" 2>/dev/null
sips -s format png -Z 840 "$OUT/castleshaw-educational-visits-guide.pdf" --out /tmp/guide-cover.png >/dev/null
sips -s format jpeg -s formatOptions 78 /tmp/guide-cover.png --out "$OUT/guide-cover.jpg" >/dev/null && rm -f /tmp/guide-cover.png "$OUT/guide-cover.png"
ls -la "$OUT"
