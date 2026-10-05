// تصوير لوحة المؤسسة من نسخة العرض (بيانات وهمية) — node ashoot.js [names...]
const puppeteer = require('puppeteer-core'); const fs = require('fs');
const BASE = 'http://localhost:8123/.design/admin-test.html';
const shots = require('./ashots.js'); const only = process.argv.slice(2);
const ORG = { school: 'مدرسة النور الدولية', speech: 'مركز النور للتخاطب', behavior: 'مركز النور لتعديل السلوك' };
(async () => {
  const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--lang=ar'] });
  const rects = fs.existsSync('../screens/rects.json') ? JSON.parse(fs.readFileSync('../screens/rects.json', 'utf8')) : {};
  for (const s of shots) {
    if (only.length && !only.includes(s.name)) continue;
    const ctx = await b.createBrowserContext(); const p = await ctx.newPage();
    await p.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await p.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
    await p.setRequestInterception(true);
    const type = s.type || 'school';
    p.on('request', r => {
      if (r.url().endsWith('/.design/mock-admin.js')) {
        let js = fs.readFileSync('../../app/V2.2 - TESTING/www/.design/mock-admin.js', 'utf8');
        js = js.split("'مركز النور للتخاطب'").join(JSON.stringify(ORG[type]));
        js = js.split("type: 'speech', seat_limit").join(`type: '${type}', seat_limit`);
        r.respond({ status: 200, contentType: 'application/javascript', body: js });
      } else r.continue();
    });
    p.on('pageerror', e => console.log('  ERR', s.name, e.message.slice(0, 120)));
    await p.goto('http://localhost:8123/logo.png');
    await p.evaluate((role, type, cl) => { localStorage.clear(); if (role) localStorage.setItem('mock_role', role); localStorage.setItem('mock_type', type); if (cl) localStorage.setItem('mock_caseload', '1'); localStorage.setItem('etz_admin_guide_seen', '1'); }, s.role === undefined ? 'admin' : s.role, type, !!s.caseload);
    await p.goto(BASE + (s.hash || ''), { waitUntil: 'networkidle2', timeout: 30000 }).catch(e => console.log('nav', e.message));
    await new Promise(r => setTimeout(r, s.wait ?? 2200));
    if (s.act) { await p.evaluate(s.act).catch(e => console.log('  act err', e.message)); await new Promise(r => setTimeout(r, s.wait2 ?? 1200)); }
    await p.screenshot({ path: `../screens/${s.name}.png` });
    const info = await p.evaluate((targets) => {
      const res = {}; const all = [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none'; });
      for (const [key, q] of Object.entries(targets || {})) {
        let [qq, up] = q.split('@'); let el = null;
        if (qq.startsWith('&')) { const [sel, n] = qq.slice(1).split(':'); const els = [...document.querySelectorAll(sel)].filter(e => e.getBoundingClientRect().width > 0).slice(0, +n || 99);
          if (els.length) { const rs = els.map(e => e.getBoundingClientRect()); const x0 = Math.min(...rs.map(r => r.left)), y0 = Math.min(...rs.map(r => r.top)), x1 = Math.max(...rs.map(r => r.right)), y1 = Math.max(...rs.map(r => r.bottom)); res[key] = { x: x0, y: y0, w: x1 - x0, h: y1 - y0 }; } else res[key] = null; continue; }
        if (qq.startsWith('col:')) { const [, head, n] = qq.split(':'); const th = [...document.querySelectorAll('th')].find(x => x.innerText.trim().includes(head));
          if (th) { const idx = [...th.parentElement.children].indexOf(th); const cells = [th, ...[...document.querySelectorAll('tbody tr')].slice(0, +n || 5).map(tr => tr.children[idx])].filter(Boolean);
            const rs = cells.map(e => e.getBoundingClientRect()); const x0 = Math.min(...rs.map(r => r.left)), y0 = Math.min(...rs.map(r => r.top)), x1 = Math.max(...rs.map(r => r.right)), y1 = Math.max(...rs.map(r => r.bottom)); res[key] = { x: x0, y: y0, w: x1 - x0, h: y1 - y0 }; } else res[key] = null; continue; }
        if (qq.startsWith('%')) { const [sel, n] = qq.slice(1).split('|'); el = [...document.querySelectorAll(sel)].filter(e => e.getBoundingClientRect().width > 0)[+n || 0] || null; }
        else if (qq.startsWith('$')) el = document.querySelector(qq.slice(1));
        else { const c = all.filter(e => (e.innerText || '').includes(qq)); c.sort((a, b) => a.innerText.length - b.innerText.length); el = c[0]; }
        if (el && up) el = el.closest(up) || el;
        if (el) { const r = el.getBoundingClientRect(); res[key] = { x: r.left, y: r.top, w: r.width, h: r.height }; } else res[key] = null;
      }
      return { W: innerWidth, H: innerHeight, rects: res };
    }, s.targets || {});
    rects[s.name] = info;
    console.log(s.name, Object.entries(info.rects).map(([k, v]) => k + (v ? '✓' : '✗')).join(' '));
    await ctx.close();
  }
  fs.writeFileSync('../screens/rects.json', JSON.stringify(rects, null, 1));
  fs.writeFileSync('../screens/rects.js', 'window.RECTS=' + JSON.stringify(rects) + ';');
  await b.close();
})();
