// node render.js <startFrame> <endFrame> <out.mp4>
const puppeteer = require('puppeteer-core'); const path = require('path'); const { spawn } = require('child_process');
const FPS = 30;
const [a, b, outFile] = [+process.argv[2], +process.argv[3], process.argv[4]];
(async () => {
  const br = await puppeteer.launch({ executablePath: process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--allow-file-access-from-files', '--disable-gpu-vsync', '--force-color-profile=srgb'] });
  const p = await br.newPage(); await p.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
  p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('file:///' + path.resolve('video.html').split(path.sep).join('/') + '?ep=' + (process.env.EP || 'ep01') + (process.env.NOCAP ? '&nocap=1' : ''));
  await p.evaluate(() => window.READY);
  const cdp = await p.target().createCDPSession();
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', '-r', String(FPS), outFile], { stdio: ['pipe', 'inherit', 'inherit'] });
  const t0 = Date.now();
  for (let f = a; f < b; f++) {
    await p.evaluate(t => window.seek(t), f / FPS);
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 93, optimizeForSpeed: true });
    if (!ff.stdin.write(Buffer.from(data, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    if ((f - a) % 300 === 0) console.log(outFile, f, ((Date.now() - t0) / 1000).toFixed(0) + 's');
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r));
  console.log('done', outFile, ((Date.now() - t0) / 1000).toFixed(0) + 's');
  await br.close();
})();
