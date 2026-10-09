#!/usr/bin/env bash
# Stitch chapter clips into one master. Clips are chained (each starts on the
# previous clip's last frame), so the first frame of every clip after the first
# is a duplicate and is dropped to avoid a one-frame stall.
#   usage: ./stitch.sh out.mp4 ch1.mp4 ch2.mp4 ... ch6.mp4
set -euo pipefail
OUT="$1"; shift
ARGS=(); FILT=""; i=0
for f in "$@"; do
  ARGS+=(-i "$f")
  if [ $i -eq 0 ]; then FILT+="[$i:v]fps=24,scale=1920:1080:flags=lanczos,setsar=1,format=yuv420p[v$i];"
  else FILT+="[$i:v]trim=start_frame=1,setpts=PTS-STARTPTS,fps=24,scale=1920:1080:flags=lanczos,setsar=1,format=yuv420p[v$i];"; fi
  i=$((i+1))
done
for ((k=0;k<i;k++)); do FILT+="[v$k]"; done
# Grade: a gentle lift and warmth toward the brand's brighter palette. It eases in over the
# first 2s (so frame one still matches the illustration exactly) and eases out after 24s
# (so the dusk chapter stays dark).
K="min(1\\,t/2)*if(lt(t\\,24)\\,1\\,max(0\\,1-(t-24)/2))"
FILT+="concat=n=$i:v=1:a=0,eq=eval=frame:brightness='0.05*$K':saturation='1+0.1*$K':gamma_r='1+0.05*$K':gamma_b='1-0.03*$K'[out]"
ffmpeg -v error -y "${ARGS[@]}" -filter_complex "$FILT" -map "[out]" -c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p "$OUT"
ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT"
