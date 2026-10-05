// الرئيسية الحقيقية لعضو مؤسسة (أطفال/كبار) ببيانات وهمية من mock-member.js
const puppeteer = require('puppeteer-core'); const fs = require('fs');
const WWW = '../../app/V2.2 - TESTING/www/';
const SHOTS = [
  { name: 'org_kid_home', url: 'home-kids.html', aud: 'kid', seed: '../../App Video/build/seed.js', full: true },
  { name: 'org_adult_home', url: 'Home.html', aud: 'adult', seed: '../../Adult_App/build/seed.js', full: true },
];
(async () => {
  const b = await puppeteer.launch({ executablePath: process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new' });
  for (const s of SHOTS) {
    const ctx = await b.createBrowserContext(); const p = await ctx.newPage();
    await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
    await p.evaluateOnNewDocument(() => { const R = Date; const t = new R(); t.setHours(10, 40, 0, 0); const off = t.getTime() - R.now();
      class D extends R { constructor(...a) { if (a.length === 0) super(R.now() + off); else super(...a); } static now() { return R.now() + off; } } window.Date = D; });
    await p.setRequestInterception(true);
    p.on('request', r => {
      if (r.url().endsWith('/supabase-client.js')) {
        let js = fs.readFileSync(WWW + '.design/mock-member.js', 'utf8');
        js = js.split("'مركز النور للتخاطب', type: 'speech'").join("'مدرسة النور الدولية', type: 'school'");
        js = js.replace("auth: { getSession: async () => ({ data: { session: { user: { id: 'u1' } } } }) }",
          "auth: { getSession: async () => ({ data: { session: { user: { id: 'u1' } } } }), getUser: async () => ({ data: { user: { id: 'u1' } } }), onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }), signOut: async () => ({}) }, channel: () => ({ on() { return this; }, subscribe() { return this; } }), removeChannel() {}");
        r.respond({ status: 200, contentType: 'application/javascript', body: js });
      } else r.continue();
    });
    p.on('pageerror', e => console.log('  ERR', s.name, e.message.slice(0, 140)));
    await p.goto('http://localhost:8123/logo.png');
    await p.evaluate(fs.readFileSync(s.seed, 'utf8'));
    await p.evaluate(aud => { localStorage.setItem('school_code', 'NOUR2026'); localStorage.setItem('mock_aud', aud);
      localStorage.setItem('etz_org', JSON.stringify({ type: 'school', name: 'مدرسة النور الدولية', audience: aud, terms: {}, features: {} })); }, s.aud);
    await p.goto('http://localhost:8123/' + s.url, { waitUntil: 'networkidle2', timeout: 30000 }).catch(e => console.log('nav', e.message));
    await new Promise(r => setTimeout(r, 3500));
    if (s.full) await p.evaluate(() => { for (const e of document.querySelectorAll('body *')) { const cs = getComputedStyle(e); if (cs.position === 'fixed' || cs.position === 'sticky') { const r = e.getBoundingClientRect(); if (r.top > innerHeight * 0.55 && r.height < innerHeight * 0.4) e.style.visibility = 'hidden'; } } });
    await p.screenshot({ path: `../screens/${s.name}.png`, fullPage: !!s.full });
    const info = await p.evaluate(() => { const q = s => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height }; };
      return { H: document.documentElement.scrollHeight, org: q('.org-card, [class*=org-card], #orgCard'), tasks: q('.org-tasks, [class*=org-task], #orgTasks'), bird: q('.bird-zone, .bubble') }; });
    console.log(s.name, JSON.stringify(info));
    await ctx.close();
  }
  await b.close();
})();
