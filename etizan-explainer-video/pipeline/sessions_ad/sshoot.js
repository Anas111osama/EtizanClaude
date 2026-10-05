// شاشات الحجز: التطبيق الحقيقي + Supabase وهمي (mock-sessions.js) — node sshoot.js [names]
const puppeteer = require('puppeteer-core'); const fs = require('fs');
const SEED = '../../Adult_App/build/seed.js';
const shots = [
  { name: 'ask', url: 'ask.html', act: () => { document.getElementById('reportRow').hidden = true; },
    targets: { first: '$.sp-card', verified: 'متحقق منه@.chip', price: '$.sp-price', book: '$[data-book]', hero: '$.ui-card', list: '$#appList' } },
  { name: 'picker', url: 'booking.html?c=c1', act: async () => { const d = [...document.querySelectorAll('.day-chip:not(.none)')]; d[1].click(); await new Promise(r => setTimeout(r, 300)); document.querySelectorAll('.slot')[2].click(); await new Promise(r => setTimeout(r, 300)); document.scrollingElement.scrollLeft = 0; window.scrollTo(0, 0); document.querySelectorAll('*').forEach(e => { if (e.scrollLeft && e.id !== 'dayStrip') e.scrollLeft = 0; }); },
    targets: { head: '$#cName', meta: '$#cMeta', days: '$#dayStrip', slots: '$#slotGrid', sel: '$.slot.sel', cta: '$#toConfirm' } },
  { name: 'hold', url: 'booking.html?ref=ETZ-7K4Q', targets: { status: '$#holdTitle', join: '$#joinBtn', note: '$#joinNote', price: '$#bkPrice', who: '$#bkWho', when: '$#bkWhen' } },
];
const only = process.argv.slice(2);
(async () => {
  const b = await puppeteer.launch({ executablePath: process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new' });
  const rects = fs.existsSync('../screens/rects.json') ? JSON.parse(fs.readFileSync('../screens/rects.json', 'utf8')) : {};
  for (const s of shots) {
    if (only.length && !only.includes(s.name)) continue;
    const ctx = await b.createBrowserContext(); const p = await ctx.newPage();
    await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
    await p.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
    await p.evaluateOnNewDocument(() => { const R = Date; const t = new R(); t.setHours(10, 40, 0, 0); const off = t.getTime() - R.now();
      class D extends R { constructor(...a) { if (a.length === 0) super(R.now() + off); else super(...a); } static now() { return R.now() + off; } } window.Date = D; });
    await p.setRequestInterception(true);
    p.on('request', r => {
      if (r.url().endsWith('/supabase-client.js')) r.respond({ status: 200, contentType: 'application/javascript', body: fs.readFileSync('mock-sessions.js', 'utf8') });
      else r.continue();
    });
    p.on('pageerror', e => console.log('  ERR', s.name, e.message.slice(0, 140)));
    await p.goto('http://localhost:8123/logo.png');
    await p.evaluate(fs.readFileSync(SEED, 'utf8'));
    await p.goto('http://localhost:8123/' + s.url, { waitUntil: 'networkidle2', timeout: 30000 }).catch(e => console.log('nav', e.message));
    await new Promise(r => setTimeout(r, 3000));
    if (s.act) { await p.evaluate(s.act).catch(e => console.log('  act err', e.message)); await new Promise(r => setTimeout(r, 1200)); }
    await p.screenshot({ path: `../screens/${s.name}.png` });
    const info = await p.evaluate(targets => {
      const res = {};
      const all = [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none'; });
      for (const [key, q] of Object.entries(targets)) {
        let [qq, up] = q.split('@'); let el = null;
        if (qq.startsWith('$')) el = document.querySelector(qq.slice(1));
        else { const c = all.filter(e => (e.innerText || '').includes(qq)); c.sort((a, b) => a.innerText.length - b.innerText.length); el = c[0]; }
        if (el && up) el = el.closest(up) || el;
        if (el) { const r = el.getBoundingClientRect(); res[key] = { x: r.left, y: r.top, w: r.width, h: r.height }; } else res[key] = null;
      }
      return { H: innerHeight, rects: res };
    }, s.targets);
    rects[s.name] = { url: s.url, full: false, ...info };
    console.log(s.name, Object.entries(info.rects).map(([k, v]) => k + (v ? '✓' : '✗')).join(' '));
    await ctx.close();
  }
  fs.writeFileSync('../screens/rects.json', JSON.stringify(rects, null, 1));
  await b.close();
})();
