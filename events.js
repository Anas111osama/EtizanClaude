const puppeteer = require('puppeteer-core'); const path = require('path'); const fs = require('fs');
(async () => {
  const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--allow-file-access-from-files'] });
  const p = await b.newPage(); await p.setViewport({ width: 1080, height: 1920 });
  p.on('console', m => console.log('console:', m.text()));
  await p.goto('file:///' + path.resolve('video.html').split(path.sep).join('/'));
  await p.evaluate(() => window.READY);
  const ev = await p.evaluate(() => window.SFX_EVENTS);
  fs.writeFileSync('sfx_events.json', JSON.stringify(ev, null, 0));
  const c = {}; ev.forEach(e => c[e.name] = (c[e.name] || 0) + 1); console.log(ev.length, JSON.stringify(c));
  await b.close();
})();
