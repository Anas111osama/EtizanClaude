// EP=ep01 O=h node render.js <startFrame> <endFrame> <out.mp4>
const { open } = require('./lib'); const { spawn } = require('child_process');
const EP = process.env.EP || 'ep01', O = process.env.O || 'h', FPS = 30;
const [a, b, outFile] = [+process.argv[2], +process.argv[3], process.argv[4]];
(async () => {
  const { b: br, p } = await open(EP, O); const cdp = await p.target().createCDPSession();
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', String(FPS), outFile], { stdio: ['pipe', 'inherit', 'inherit'] });
  const t0 = Date.now();
  for (let f = a; f < b; f++) {
    await p.evaluate(t => window.seek(t), f / FPS);
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 92, optimizeForSpeed: true });
    if (!ff.stdin.write(Buffer.from(data, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    if ((f - a) % 300 === 0) console.log(outFile, f, ((Date.now() - t0) / 1000).toFixed(0) + 's', ((f - a + 1) / ((Date.now() - t0) / 1000)).toFixed(1) + 'fps');
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r));
  console.log('done', outFile, ((Date.now() - t0) / 1000).toFixed(0) + 's'); await br.close();
})();
