#!/usr/bin/env bash
# usage: scripts/loops.sh <name> <photo.png/jpg>
set -e
NAME=$1; SRC=$2
mkdir -p assets/raw public/films
ffmpeg -y -i "$SRC" -vf "scale=3840:2160:force_original_aspect_ratio=increase,crop=3840:2160,zoompan=z='1+0.0012*on':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=120:s=1920x1080:fps=24" \
  -frames:v 120 -an -c:v libx264 -crf 18 -pix_fmt yuv420p "assets/raw/$NAME-fwd.mp4"
ffmpeg -y -i "assets/raw/$NAME-fwd.mp4" \
  -filter_complex "[0:v]split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1:a=0[v]" \
  -map "[v]" -an -c:v libx264 -crf 23 -pix_fmt yuv420p -movflags +faststart "public/films/$NAME-loop.mp4"
ffmpeg -y -i "assets/raw/$NAME-fwd.mp4" -frames:v 1 "public/films/$NAME-loop-poster.jpg"
