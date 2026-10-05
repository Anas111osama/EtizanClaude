const puppeteer = require('puppeteer-core'); const fs = require('fs');
const [url, ...clicks] = process.argv.slice(2);
(async () => {
  const b = await puppeteer.launch({ executablePath: process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new' });
  const p = await b.newPage(); await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  await p.goto('http://localhost:8123/logo.png'); await p.evaluate(fs.readFileSync('seed.js', 'utf8'));
  await p.goto('http://localhost:8123/' + url, { waitUntil: 'networkidle2' }); await new Promise(r => setTimeout(r, 1500));
  const list = () => p.evaluate(() => [...document.querySelectorAll('button, [onclick], li, .chip, .opt')].filter(e => e.offsetParent !== null).map(e => (e.innerText || '').trim().replace(/\s+/g, ' ')).filter(t => t && t.length < 60));
  console.log('START', JSON.stringify(await list()));
  for (const c of clicks) {
    await p.evaluate(txt => { const els = [...document.querySelectorAll('button, [onclick], li, .chip, a')].filter(e => e.offsetParent !== null && (e.innerText || '').includes(txt)); els.sort((a, b) => a.innerText.length - b.innerText.length); if (els[0]) els[0].click(); else console.log('nf'); }, c);
    await new Promise(r => setTimeout(r, 1800));
    console.log('AFTER', c, JSON.stringify(await list()));
  }
  await p.screenshot({ path: 'tmp/explore.png' });
  await b.close();
})();
