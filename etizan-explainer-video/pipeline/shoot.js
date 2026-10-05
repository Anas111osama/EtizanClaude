const puppeteer = require('puppeteer-core');
const fs = require('fs');
const BASE = 'http://localhost:8123/';
const shots = require('./shots.js');
const only = process.argv.slice(2);
const clock = (h, m) => `(() => { const R = Date; const tgt = new R(); tgt.setHours(${h}, ${m}, 0, 0); const off = tgt.getTime() - R.now();
  class D extends R { constructor(...a){ if(a.length===0) super(R.now()+off); else super(...a); } static now(){ return R.now()+off; } }
  window.Date = D; })();`;
(async () => {
  const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args:['--lang=ar','--force-prefers-reduced-motion=false'] });
  const rects = fs.existsSync('../screens/rects.json') ? JSON.parse(fs.readFileSync('../screens/rects.json','utf8')) : {};
  for (const s of shots) {
    if (only.length && !only.includes(s.name)) continue;
    const ctx = await b.createBrowserContext();
    const p = await ctx.newPage();
    await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
    await p.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
    await p.evaluateOnNewDocument(clock(s.hour ?? 10, s.min ?? 40));
    p.on('pageerror', e => console.log('  ERR', s.name, e.message.slice(0,120)));
    await p.goto(BASE + 'logo.png');
    await p.evaluate(fs.readFileSync('seed.js','utf8'));
    if (s.extraSeed) await p.evaluate(s.extraSeed);
    await p.goto(BASE + s.url, { waitUntil: 'networkidle2', timeout: 30000 }).catch(e=>console.log('nav',e.message));
    await new Promise(r => setTimeout(r, s.wait ?? 2500));
    if (s.act) { await p.evaluate(s.act).catch(e=>console.log('  act err', e.message)); await new Promise(r => setTimeout(r, s.wait2 ?? 1500)); }
    if (s.full) await p.evaluate(() => { for (const e of document.querySelectorAll('body *')) { const cs = getComputedStyle(e); if (cs.position === 'fixed' || cs.position === 'sticky') { const r = e.getBoundingClientRect(); if (r.top > innerHeight * 0.55 && r.height < innerHeight * 0.4) e.style.visibility = 'hidden'; } } });
    const out = `../screens/${s.name}.png`;
    await p.screenshot({ path: out, fullPage: !!s.full, captureBeyondViewport: !!s.full });
    const info = await p.evaluate((targets, full) => {
      const res = {}; const SX = full ? scrollX : 0, SY = full ? scrollY : 0;
      const all = [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none'; });
      for (const [key, q] of Object.entries(targets || {})) {
        let el = null;
        let [qq, up] = q.split('@');
        if (qq.startsWith('$')) el = document.querySelector(qq.slice(1));
        else { const cands = all.filter(e => (e.innerText || '').includes(qq)); cands.sort((a,b)=> (a.innerText.length - b.innerText.length)); el = cands[0]; }
        if (el && up) el = el.closest(up) || el;
        if (qq.startsWith('&')) { const [sel, n] = qq.slice(1).split(':'); const els = [...document.querySelectorAll(sel)].slice(0, +n || 99);
          if (els.length) { const rs = els.map(e => e.getBoundingClientRect()); const x0 = Math.min(...rs.map(r => r.left)), y0 = Math.min(...rs.map(r => r.top)), x1 = Math.max(...rs.map(r => r.right)), y1 = Math.max(...rs.map(r => r.bottom));
            res[key] = { x: x0 + SX, y: y0 + SY, w: x1 - x0, h: y1 - y0 }; } else res[key] = null; continue; }
        if (el) { let r = el.getBoundingClientRect(); res[key] = { x: r.left + SX, y: r.top + SY, w: r.width, h: r.height }; } else res[key] = null;
      }
      return { H: full ? document.documentElement.scrollHeight : innerHeight, rects: res };
    }, s.targets || {}, !!s.full);
    rects[s.name] = { url: s.url, full: !!s.full, ...info };
    console.log(s.name, 'H=' + info.H, Object.entries(info.rects).map(([k,v]) => k + (v ? '✓' : '✗')).join(' '));
    await ctx.close();
  }
  fs.writeFileSync('../screens/rects.json', JSON.stringify(rects, null, 1));
  await b.close();
})();
