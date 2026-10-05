const puppeteer = require('puppeteer-core'); const path = require('path'); const fs = require('fs');
(async () => {
  const b = await puppeteer.launch({ executablePath: process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--allow-file-access-from-files'] });
  const p = await b.newPage(); p.on('pageerror', e => console.log('ERR', e.message));
  await p.setViewport({ width: 1080, height: 1920 });
  await p.goto('file:///' + path.resolve('video.html').split(path.sep).join('/'));
  await p.evaluate(() => window.READY);
  const r = await p.evaluate(() => ({ duration: window.DURATION, events: window.SFX }));
  fs.writeFileSync('sfx_events.json', JSON.stringify(r)); console.log('duration', r.duration.toFixed(2), 'events', r.events.length);
  await b.close();
})();
