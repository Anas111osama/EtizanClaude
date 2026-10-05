// شاشات عضو المؤسسة: التطبيق الحقيقي + Supabase وهمي (mock-member.js) — node mshoot.js [names]
const puppeteer = require('puppeteer-core'); const fs = require('fs');
const WWW = '../../app/V2.2 - TESTING/www/';
const SEED = { adult: '../../Adult_App/build/seed.js', kid: '../../App Video/build/seed.js' };
const ORG = "{ code: 'NOUR-K7QXM', school_code: 'NOUR2026', name: 'مدرسة النور الدولية', org_type: 'school', audience: '__AUD__', min_age: 4, max_age: 12, status: 'active' }";
const shots = require('./mshots.js'); const only = process.argv.slice(2);
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
      if (r.url().endsWith('/supabase-client.js')) {
        let js = fs.readFileSync(WWW + '.design/mock-member.js', 'utf8');
        js = js.split("'مركز النور للتخاطب', type: 'speech'").join("'مدرسة النور الدولية', type: 'school'");
        js = js.replace("if (fn === 'org_member_home') return { data: home(), error: null };",
          "if (fn === 'org_member_home') return { data: home(), error: null };\n    if (fn === 'resolve_join_code') return { data: " + ORG.replace('__AUD__', s.aud || 'kid') + ", error: null };");
        const sess = s.anon ? 'null' : "{ user: { id: 'u1' } }";
        js = js.replace("auth: { getSession: async () => ({ data: { session: { user: { id: 'u1' } } } }) }",
          "auth: { getSession: async () => ({ data: { session: " + sess + " } }), getUser: async () => ({ data: { user: " + (s.anon ? 'null' : "{ id: 'u1' }") + " } }), onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }), signOut: async () => ({}) }, channel: () => ({ on() { return this; }, subscribe() { return this; } }), removeChannel() {}");
        r.respond({ status: 200, contentType: 'application/javascript', body: js });
      } else r.continue();
    });
    p.on('pageerror', e => console.log('  ERR', s.name, e.message.slice(0, 140)));
    await p.goto('http://localhost:8123/logo.png');
    if (s.seed) await p.evaluate(fs.readFileSync(SEED[s.seed], 'utf8')); else await p.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
    if (s.org) await p.evaluate(aud => { localStorage.setItem('school_code', 'NOUR2026'); localStorage.setItem('mock_aud', aud);
      localStorage.setItem('etz_org', JSON.stringify({ type: 'school', name: 'مدرسة النور الدولية', audience: aud, terms: {}, features: {} })); }, s.aud);
    await p.goto('http://localhost:8123/' + s.url, { waitUntil: 'networkidle2', timeout: 30000 }).catch(e => console.log('nav', e.message));
    await new Promise(r => setTimeout(r, s.wait ?? 3500));
    if (s.act) { await p.evaluate(s.act).catch(e => console.log('  act err', e.message)); await new Promise(r => setTimeout(r, s.wait2 ?? 1500)); }
    if (s.full) await p.evaluate(() => { for (const e of document.querySelectorAll('body *')) { const cs = getComputedStyle(e); if (cs.position === 'fixed' || cs.position === 'sticky') { const r = e.getBoundingClientRect(); if (r.top > innerHeight * 0.55 && r.height < innerHeight * 0.4) e.style.visibility = 'hidden'; } } });
    await p.screenshot({ path: `../screens/${s.name}.png`, fullPage: !!s.full });
    const info = await p.evaluate((targets, full) => {
      const res = {}; const SX = full ? scrollX : 0, SY = full ? scrollY : 0;
      const all = [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none'; });
      for (const [key, q] of Object.entries(targets || {})) {
        let [qq, up] = q.split('@'); let el = null;
        if (qq.startsWith('$')) el = document.querySelector(qq.slice(1));
        else { const c = all.filter(e => (e.innerText || '').includes(qq)); c.sort((a, b) => a.innerText.length - b.innerText.length); el = c[0]; }
        if (el && up) el = el.closest(up) || el;
        if (el) { const r = el.getBoundingClientRect(); res[key] = { x: r.left + SX, y: r.top + SY, w: r.width, h: r.height }; } else res[key] = null;
      }
      return { H: full ? document.documentElement.scrollHeight : innerHeight, rects: res };
    }, s.targets || {}, !!s.full);
    rects[s.name] = { url: s.url, full: !!s.full, ...info };
    console.log(s.name, 'H=' + info.H, Object.entries(info.rects).map(([k, v]) => k + (v ? '✓' : '✗')).join(' '));
    await ctx.close();
  }
  fs.writeFileSync('../screens/rects.json', JSON.stringify(rects, null, 1));
  fs.writeFileSync('../screens/rects.js', 'window.RECTS=' + JSON.stringify(rects) + ';');
  await b.close();
})();
