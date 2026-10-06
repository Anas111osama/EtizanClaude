#!/bin/sh
# بيرندر النسختين على ٤ عمّال، وبعدين يجمّع ويركّب الصوت ← out/ep05_16x9.mp4 و out/ep05_9x16.mp4
cd "$(dirname "$0")/.." && export CHROME="${CHROME:-$(cd ../../.. && pwd)/etizan-explainer-video/pipeline/linux-chrome.sh}"
F=$(python3 -c "import json,math;print(math.ceil(json.load(open('build/plan.json'))['duration']*30))"); M=$((F/2))
mkdir -p build/parts out
for O in h v; do
  EP=ep05 O=$O node ../engine/render.js 0 $M build/parts/${O}1.mp4 > build/parts/${O}1.log 2>&1 &
  EP=ep05 O=$O node ../engine/render.js $M $F build/parts/${O}2.mp4 > build/parts/${O}2.log 2>&1 &
done
wait
for O in h v; do
  printf "file '%s'\nfile '%s'\n" ${O}1.mp4 ${O}2.mp4 > build/parts/${O}.txt
  N=$([ $O = h ] && echo 16x9 || echo 9x16)
  ffmpeg -y -v error -f concat -safe 0 -i build/parts/${O}.txt -i build/mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart out/ep05_${N}.mp4
done
ls -la out
