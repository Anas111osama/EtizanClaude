#!/bin/sh
# النسخة الطولية بس على ٤ عمّال ← out/ep01_9x16.mp4 + نسخة للمشاركة
cd "$(dirname "$0")/.." && export CHROME="${CHROME:-$(cd ../../.. && pwd)/etizan-explainer-video/pipeline/linux-chrome.sh}"
F=$(python3 -c "import json,math;print(math.ceil(json.load(open('build/plan.json'))['duration']*30))"); Q=$((F/4))
for i in 0 1 2 3; do a=$((i*Q)); b=$(( i==3 ? F : (i+1)*Q )); EP=ep01 O=v node ../engine/render.js $a $b build/parts/v$i.mp4 > build/parts/v$i.log 2>&1 & done; wait
printf "file 'v0.mp4'\nfile 'v1.mp4'\nfile 'v2.mp4'\nfile 'v3.mp4'\n" > build/parts/v.txt
ffmpeg -y -v error -f concat -safe 0 -i build/parts/v.txt -i build/mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart out/ep01_9x16.mp4
ffmpeg -y -v error -i out/ep01_9x16.mp4 -c:v libx264 -preset medium -crf 26 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart out/ep01_9x16_share.mp4
ls -la out
