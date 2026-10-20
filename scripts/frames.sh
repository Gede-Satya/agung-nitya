#!/usr/bin/env bash
# usage: scripts/frames.sh <name> <clip.mp4> [frames]
set -e
NAME=$1; SRC=$2; COUNT=${3:-121}
OUT="public/films/$NAME"
mkdir -p "$OUT/768"
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$SRC")
FPS=$(python3 -c "print($COUNT/$DUR)")
ffmpeg -y -i "$SRC" -vf "fps=$FPS,scale='min(1920,iw)':-2" -frames:v $COUNT \
  -c:v libwebp -quality 78 -compression_level 6 -preset picture "$OUT/f_%03d.webp"
ffmpeg -y -i "$SRC" -vf "fps=$FPS,scale=768:-2" -frames:v $COUNT \
  -c:v libwebp -quality 72 -compression_level 6 -preset picture "$OUT/768/f_%03d.webp"
echo "{\"tiers\":{\"768\":{\"count\":$COUNT},\"1440\":{\"count\":$COUNT}}}" > "$OUT/manifest.json"
du -sh "$OUT" "$OUT/768"
