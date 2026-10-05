// node shoot.js [أرقام الفريمات] → out/fN.png (1920×1080)
const puppeteer = require('../../../etizan-explainer-video/pipeline/node_modules/puppeteer-core');
const path = require('path'); const fs = require('fs');
const ids = process.argv.slice(2).length ? process.argv.slice(2) : ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
(async () => {
  const b = await puppeteer.launch({ executablePath: process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--allow-file-access-from-files'] });
  const p = await b.newPage(); await p.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  p.on('pageerror', e => console.log('ERR', e.message));
  fs.mkdirSync(path.join(__dirname, 'out'), { recursive: true });
  for (const id of ids) {
    await p.goto('file:///' + path.resolve(__dirname, 'styleframes.html').split(path.sep).join('/') + '?f=' + id);
    await p.evaluate(() => window.READY);
    await p.screenshot({ path: path.join(__dirname, 'out', 'f' + id + '.png') });
    console.log('f' + id);
  }
  await b.close();
})();
