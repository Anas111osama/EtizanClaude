// node shoot.js [ids] → ../out/<id>.png (1080×1350)
const puppeteer = require('puppeteer-core'); const path = require('path'); const fs = require('fs');
global.window = {}; require('./posts.js'); const ids = process.argv.slice(2).length ? process.argv.slice(2) : window.POSTS.map(p => p.id);
(async () => {
  const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--allow-file-access-from-files'] });
  const p = await b.newPage(); p.on('pageerror', e => console.log('ERR', e.message));
  await p.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 1 });
  for (const id of ids) {
    await p.goto('file:///' + path.resolve('post.html').split(path.sep).join('/') + '?id=' + id);
    await p.evaluate(() => window.READY);
    await p.screenshot({ path: '../out/' + id + '.png' });
    console.log(id);
  }
  await b.close();
})();
