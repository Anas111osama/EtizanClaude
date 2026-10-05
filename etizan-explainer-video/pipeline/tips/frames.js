const puppeteer = require('puppeteer-core');
const path = require('path');
const ts = process.argv.slice(2).map(Number);
(async () => {
  const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--allow-file-access-from-files'] });
  const p = await b.newPage();
  p.on('console', m => console.log('console:', m.text()));
  p.on('pageerror', e => console.log('ERR', e.message));
  await p.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
  await p.goto('file:///' + path.resolve('video.html').split(path.sep).join('/') + '?ep=' + (process.env.EP || 'ep01') + (process.env.NOCAP ? '&nocap=1' : ''));
  await p.evaluate(() => window.READY);
  for (const t of ts) { await p.evaluate(t => window.seek(t), t); await p.screenshot({ path: `tmp/f_${t}.jpg`, type: 'jpeg', quality: 85 }); }
  await b.close();
})();
