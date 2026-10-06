// الحلقة ٥ — «ليه ترتيب يومي… بياخد مني طاقة أكتر من الشغل نفسه؟»
// كل حركة مربوطة بكلمتها: T(فقرة، رقم الكلمة) — الفقرات ١..٢٤ زي script.txt. L(عريض، طولي) لكل مكان.
// التشبيه الثابت: أربع شغلانات (يفتكر، يقدّر، يختار، يبدأ) بتسحب من بطارية تركيز واحدة.
window.EPISODE = { n: 5, gaps: { 4: 3.0, 6: 0.5, 10: 0.3, 11: 0.4, 12: 0.3, 14: 1.1, 16: 0.3, 18: 0.3, 20: 0.6, 21: 0.3, 24: 7.5 }, build(A) {
  const { O, L, px, $, tl, fx, dyn, lerp, el, world, scene, pop, rise, out, center, capWords, words, strike, foot, trace, chip, sticky, chapter, T, P, DUR, AR, BOX_REAL } = A;
  const H = O === 'h', CX = L(960, 540);
  const CAP = L({ y: 860, size: 66 }, { y: 1420, size: 74 });
  const cchip = (sc, html, cls, x, y, t, size, rot = 0, s = 'pop') => pop(chip(sc, html, cls, x, y, size), t, rot, s);
  const flash = (t, a = 0.25) => tl.fromTo('#flash', { opacity: a }, { opacity: 0, duration: 0.3, immediateRender: false }, t);
  const label = (sc, html, x, y, t, cls = 'ink', size = 34) => { const c = el('div', 'pill ' + cls, html, sc, { fontSize: px(size), opacity: 0 }); center(c, x, y); return rise(c, t, 20, 0.35); };
  const icon = (sc, ic, x, y, size, color, t, s = 'pop') => { const i = el('i', 'fa-solid ' + ic, null, sc, { position: 'absolute', fontSize: px(size), color, opacity: 0 }); center(i, x, y); return pop(i, t, 0, s, 0.6); };
  const step = (sc, n, title, t, box, size) => { const s = el('div', 'step', '<div class="n">' + AR(n) + '</div><div style="font-size:' + px(size) + ';font-weight:1000;line-height:1.22">' + title + '</div>', sc, { left: px(box.x), top: px(box.y), width: px(box.w) });
    tl.fromTo(s, { opacity: 0, y: 80, rotation: 2 }, { opacity: 1, y: 0, rotation: 0, duration: 0.55, ease: 'power3.out' }, t); fx('whoosh', t, 0.8); return s; };
  const card = (sc, id, t0, t1, box, o = {}) => { const f = foot(sc, id, t0, t1, { box, radius: 36, zoom: [1.0, 1.06], fadeIn: 0.3, fadeOut: o.fadeOut == null ? false : o.fadeOut, ...o });
    tl.fromTo(f, { y: 70 }, { y: 0, duration: 0.5, ease: 'power3.out', immediateRender: false }, t0); fx('whoosh', t0, 0.6); return f; };
  const SQ = (x, y, s) => ({ x: x - s / 2, y: y - s / 2, w: s, h: s });
  // ── بطارية التركيز ──
  function battery(sc, cx, cy, W) {
    const b = el('div', null, '<div style="position:absolute;inset:0;border:8px solid #fff;border-radius:34px"></div><div style="position:absolute;right:-30px;top:30%;width:22px;height:40%;border-radius:0 10px 10px 0;background:#fff"></div>'
      + '<div class="fill" style="position:absolute;right:16px;top:16px;bottom:16px;width:0;border-radius:20px;background:#3DDC84"></div><div class="pct" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-weight:1000;font-size:' + px(W * 0.16) + ';color:#fff;text-shadow:0 4px 18px rgba(0,0,0,.35);direction:ltr"></div>', sc,
      { position: 'absolute', width: px(W), height: px(W * 0.4), opacity: 0 });
    center(b, cx, cy); const fill = b.querySelector('.fill'), pct = b.querySelector('.pct'), full = W - 32, K = [];
    b.to = (t, v, d = 0.8) => K.push([t, v, d]);
    dyn(t => { let v = 0; for (const [t0, v1, d] of K) { if (t < t0) break; const prev = v; v = prev + (v1 - prev) * Math.min(1, (t - t0) / d); } fill.style.width = px(full * v); fill.style.background = v > 0.6 ? '#3DDC84' : v > 0.3 ? '#F5C542' : '#F2545B'; pct.textContent = Math.round(v * 100) + '%'; });
    return b;
  }

  // ════════ ١–٤ · الواقع ════════
  const T4 = T(4, 2) - 0.2;
  { const sc = scene(0, T4 + 0.6, 'real');
    // ١: فتحت النوتة… وبعد ساعة: الجدول تحفة
    foot(sc, 'K01', 0, P(2).t0 - 0.1, { from: 0, speed: 0.75, focus: L([0.55, 0.4], [0.62, 0.4]), zoom: [1.0, 1.08], fadeIn: 0.6, shade: true }); fx('pen', 0.6, 0.6);
    capWords(sc, 1, 0, 5, { ...CAP, end: T(1, 6) - 0.1 });
    const hr = cchip(sc, '<i class="fa-regular fa-clock"></i>بعد ساعة…', 'white', L(1500, 540), L(260, 300), T(1, 6) - 0.05, L(46, 44), -2); fx('ticktock', T(1, 6), 0.5);
    capWords(sc, 1, 6, 10, { ...CAP, hl: [9, 10], end: T(1, 11) - 0.1 });
    const pl = el('div', 'card', '<div style="font-size:' + px(L(30, 30)) + ';font-weight:1000;color:var(--ink);margin-bottom:8px"><i class="fa-regular fa-calendar" style="color:var(--blue-700);margin-left:10px"></i>خطة النهارده</div>', sc, { width: px(L(430, 520)), padding: '24px 28px', opacity: 0 });
    center(pl, L(1490, 540), L(500, 700)); out(hr, T(1, 10) - 0.2, 0.15); rise(pl, T(1, 10) - 0.1, 30, 0.4, 'pop', 0.6);
    const C = ['#18B1FE', '#F5A623', '#1FA971', '#7C3AED', '#E5484D'];
    C.forEach((c, j) => { const r = el('div', null, '<span style="width:70px;font-weight:900;color:var(--ink-2);font-size:20px;direction:ltr">' + (8 + j * 2) + ':00</span><span style="flex:1;height:30px;border-radius:10px;background:' + c + ';opacity:.85"></span>', pl, { display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px', opacity: 0 });
      rise(r, T(1, 11) + j * 0.12, 14, 0.25, j ? null : 'pop', 0.5); });
    capWords(sc, 1, 11, 15, { ...CAP, hl: [11, 12], end: P(2).t0 - 0.1 });
    out(pl, P(2).t0 - 0.2, 0.2);
    // ٢: بس إنت تعبان… الطاقة راحت على الترتيب — أو اليوم يفلت
    foot(sc, 'K03', P(2).t0 - 0.12, T(2, 11) - 0.1, { from: 1.2, focus: L([0.4, 0.4], [0.4, 0.4]), zoom: [1.05, 1.12], fadeIn: 0.1, fadeOut: 0.1, shade: true }); fx('swish', P(2).t0 - 0.15, 0.7);
    capWords(sc, 2, 0, 3, { ...CAP, hl: [3], end: T(2, 4) - 0.1 });
    const lo = cchip(sc, '<i class="fa-solid fa-battery-quarter"></i>الطاقة راحت', 'white', L(1500, 540), L(260, 300), T(2, 8) - 0.05, L(46, 44), 2, 'slap'); lo.style.color = 'var(--red)';
    capWords(sc, 2, 4, 10, { ...CAP, hl: [8, 9, 10], end: T(2, 11) - 0.1 }); out(lo, T(2, 11) - 0.2, 0.1);
    foot(sc, 'K04', T(2, 11) - 0.12, P(3).t0 - 0.1, { from: 0.5, focus: L([0.5, 0.4], [0.55, 0.4]), zoom: [1.05, 1.12], fadeIn: 0.08, fadeOut: 0.1, shade: true }); fx('swish', T(2, 11) - 0.15, 0.7);
    capWords(sc, 2, 11, 18, { ...CAP, end: T(2, 19) - 0.1 });
    capWords(sc, 2, 19, 22, { ...CAP, hl: [20], end: P(3).t0 - 0.1 });
    // ٣: إزاي الترتيب بيتعبني أكتر من اليوم نفسه؟ — وبيتجمّد عند «طب ليه؟»
    const fz = T(4, 0);
    const r = foot(sc, 'K06', P(3).t0 - 0.15, T4 + 0.25, { from: 5.5, freeze: fz, focus: L([0.5, 0.4], [0.55, 0.4]), zoom: [1.0, 1.05], fadeIn: 0.3, shade: true }); fx('whoosh', P(3).t0 - 0.2, 0.5);
    capWords(sc, 3, 0, 6, { ...CAP, hl: [5, 6], end: T(3, 7) - 0.1 });
    capWords(sc, 3, 7, 9, { ...CAP, hl: [7, 8, 9], end: fz - 0.1 });
    flash(fz, 0.35); fx('lowhit', fz, 0.8); fx('reverse', fz - 0.7, 0.5);
    tl.to(r.querySelector('.src > img'), { filter: 'grayscale(1) brightness(.8)', duration: 0.4 }, fz);
    tl.to(r.tint, { opacity: 0.82, duration: 0.7 }, fz + 0.15);
    trace(r, ['M780 260 C780 90, 1010 80, 1010 250 C1010 400, 940 470, 890 470 C830 470, 780 400, 780 260 Z', 'M1470 490 L1670 480 L1660 790 L1440 810 Z', 'M1135 790 L1440 765 L1445 830 L1150 822 Z'], fz + 0.25, 0.8);
    fx('swish', fz + 0.3, 0.5);
    capWords(sc, 4, 0, 1, { ...CAP, y: L(470, 1420), size: L(110, 110), hl: [1], end: T4 + 0.05 });
  }
  // ════════ كارت العنوان ════════
  { const sc = scene(T4, P(5).t0 - 0.35, 'blue');
    const q = el('div', 'qmark', '؟', sc, { fontSize: px(L(1000, 760)), opacity: 0 }); Object.assign(q.style, H ? { left: '80px', top: '30px' } : { left: '160px', top: '1060px' });
    tl.fromTo(q, { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, T4 + 0.1);
    const sp = el('div', 'pill glass', '<span class="dot"></span>ليه دماغي بتعمل كده؟', sc, { fontSize: px(L(34, 38)), opacity: 0 });
    if (H) Object.assign(sp.style, { right: '160px', top: '230px' }); else center(sp, 540, 520); rise(sp, T4 + 0.05, -20);
    const ep = el('div', 'pill ink', 'الحلقة ٥', sc, { fontSize: px(L(28, 32)), padding: '6px 24px', opacity: 0 });
    if (H) Object.assign(ep.style, { right: '160px', top: '320px' }); else center(ep, 540, 610); rise(ep, T4 + 0.25, -20);
    const t1 = words(sc, 'ليه ترتيب يومي…', { y: L(430, 760), size: L(112, 96), at: [2, 3, 4].map(k => T(4, k)) });
    const t2 = words(sc, '*بياخد* مني طاقة | أكتر من *الشغل* نفسه؟', { y: L(580, 920), size: L(96, 88), at: [5, 6, 7, 8, 9, 10, 11].map(k => T(4, k)) });
    if (H) [t1, t2].forEach(x => Object.assign(x.style, { left: 'auto', right: '160px', textAlign: 'right', padding: 0 }));
    fx('impact', T(4, 11) + 0.4, 0.9); flash(T(4, 11) + 0.4, 0.15);
    tl.to([t1, t2, sp, ep], { opacity: 0, y: -40, duration: 0.35 }, P(5).t0 - 0.6); fx('whoosh_big', P(5).t0 - 0.6, 0.8);
  }
  // ════════ ٥–٦ · اللي بيتقال لك (فاتح) ════════
  { const sc = scene(P(5).t0 - 0.35, P(7).t0 - 0.35, 'light');
    chapter('اللي بيتقال لك', P(5).t0 - 0.2, P(7).t0 - 0.4, 'ink', 'var(--sky-400)');
    capWords(sc, 5, 0, 1, { y: L(170, 220), size: L(54, 58), color: 'var(--ink-2)', shadow: false, end: P(6).t0 - 0.1 });
    const PA = L([[1400, 330, -3], [900, 360, 2], [1200, 490, -2]], [[540, 420, -3], [540, 560, 2], [540, 700, -2]]);
    const cs = [['«اعمل ليستة وخلاص»', 2], ['«نظّم وقتك»', 5], ['«كل الناس بترتّب يومها عادي»', 7]].map(([q, k], j) => cchip(sc, q, 'ghost', PA[j][0], PA[j][1], T(5, k) - 0.08, L(48, 46), PA[j][2], 'slap'));
    // ٦: وكأنه بياخد دقيقتين… الترتيب نفسه شغل تقيل
    tl.to(cs, { opacity: 0.3, scale: 0.9, duration: 0.4 }, P(6).t0);
    const two = cchip(sc, '<i class="fa-solid fa-stopwatch"></i>دقيقتين', 'white', CX, L(650, 900), T(6, 5) - 0.1, L(56, 56), -2);
    strike(two, T(6, 7) - 0.05);
    words(sc, 'الترتيب نفسه *شغل…*', { y: L(780, 1080), size: L(84, 76), color: 'var(--ink)', at: [8, 9, 10].map(k => T(6, k)) });
    words(sc, 'وشغل ~تقيل~ كمان', { y: L(900, 1220), size: L(70, 66), color: 'var(--ink)', at: [11, 12, 13].map(k => T(6, k)) });
    fx('lowhit', T(6, 12) + 0.1, 0.6);
  }
  // ════════ ٧–١٤ · اللي بيحصل جوّه ════════
  chapter('اللي بيحصل جوّه', P(7).t0 - 0.2, P(14).t1 + 0.2);
  // ٧–١١: أربع شغلانات ورا بعض — وبطارية واحدة
  { const sc = scene(P(7).t0 - 0.35, P(12).t0 - 0.4, 'blue');
    capWords(sc, 7, 0, 6, { y: L(150, 200), size: L(60, 62), hl: [5, 6], end: T(7, 7) - 0.1 });
    capWords(sc, 7, 7, 12, { y: L(150, 200), size: L(60, 62), hl: [9, 10], end: P(8).t0 - 0.1 });
    const JOBS = [['fa-table-cells-large', 'يفتكر', 0, 'الحلقة ٤', 9], ['fa-hourglass-half', 'يقدّر الوقت', 5, 'الحلقة ٢', 14], ['fa-signs-post', 'يختار', 11, null, 0], ['fa-power-off', 'يبدأ', 15, 'الحلقة ١', 18]];
    const JP = L([[1560, 460], [1180, 460], [800, 460], [420, 460]], [[790, 520], [290, 520], [790, 900], [290, 900]]);
    const JW = L(330, 440), JH = L(300, 320);
    const cards = JOBS.map(([ic, tx, k, ep, ek], j) => {
      const c = el('div', 'card', '<div style="width:' + px(L(66, 70)) + ';height:' + px(L(66, 70)) + ';border-radius:50%;background:var(--blue-700);color:#fff;font-weight:1000;font-size:' + px(L(36, 38)) + ';display:flex;align-items:center;justify-content:center;margin:0 auto 14px">' + AR(j + 1) + '</div>'
        + '<i class="fa-solid ' + ic + '" style="font-size:' + px(L(70, 74)) + ';color:var(--blue-700)"></i><div style="font-size:' + px(L(40, 44)) + ';font-weight:1000;color:var(--ink);margin-top:12px">' + tx + '</div>', sc,
        { width: px(JW), height: px(JH), textAlign: 'center', paddingTop: '26px', opacity: 0 });
      center(c, JP[j][0], JP[j][1]); tl.fromTo(c, { opacity: 0, y: 60, rotation: j % 2 ? 2 : -2 }, { opacity: 1, y: 0, rotation: 0, duration: 0.45, ease: 'back.out(1.6)' }, T(8, k) - 0.12); fx('pop', T(8, k) - 0.1, 0.6);
      if (ep) { const tg = chip(sc, '<i class="fa-solid fa-rotate-left"></i>' + ep, 'sticky', JP[j][0], JP[j][1] + JH / 2 + L(10, 4), L(28, 30)); tg.style.zIndex = 4; pop(tg, T(9, ek) - 0.1, j % 2 ? 3 : -3, 'pop', 0.5); }
      return c; });
    capWords(sc, 8, 0, 16, { y: L(780, 1180), size: L(48, 50), color: 'var(--sky-100)', end: P(9).t0 - 0.1 });
    capWords(sc, 9, 0, 8, { y: L(780, 1180), size: L(50, 52), end: T(9, 9) - 0.1 });
    capWords(sc, 9, 9, 22, { y: L(780, 1180), size: L(48, 50), color: 'var(--sky-100)', hl: [9, 10, 16, 17, 19], end: P(10).t0 - 0.1 });
    // ١٠: بيضغط على كل النقط الصعبة… في نفس الوقت
    capWords(sc, 10, 0, 12, { y: L(780, 1180), size: L(54, 56), hl: [5, 6, 11, 12], end: P(11).t0 - 0.2 });
    tl.to(cards, { boxShadow: '0 0 0 6px #F2545B, 0 20px 50px rgba(242,84,91,.5)', duration: 0.3, stagger: 0.08 }, T(10, 4)); fx('lowhit', T(10, 11), 0.7);
    tl.to(cards, { x: 8, duration: 0.05, yoyo: true, repeat: 7, ease: 'none' }, T(10, 11));
    // ١١: بطارية التركيز — الترتيب سحب نصها
    const SY = L(0, 0);
    tl.to(cards, { scale: L(0.62, 0.55), y: L(-150, -120), opacity: 0.8, duration: 0.5, ease: 'power2.inOut' }, P(11).t0 - 0.2);
    sc.querySelectorAll('.chip.sticky').forEach(c => tl.to(c, { opacity: 0, duration: 0.2 }, P(11).t0 - 0.2));
    const bat = battery(sc, CX, L(700, 1260), L(560, 620)); rise(bat, T(11, 2) - 0.2, 40, 0.4, 'whoosh', 0.6);
    const bl = label(sc, '<i class="fa-solid fa-bolt" style="color:#D8A920"></i>بطارية التركيز', CX, L(890, 1460), T(11, 3), 'ink', L(36, 38));
    bat.to(T(11, 3), 1, 0.7); fx('rise', T(11, 3), 0.5);
    bat.to(T(11, 8), 0.5, 1.4); fx('reverse', T(11, 8), 0.6);
    tl.to(cards, { opacity: 0.35, duration: 0.4 }, T(11, 8));
    capWords(sc, 11, 0, 9, { y: L(150, 200), size: L(56, 58), hl: [5, 6, 9], end: T(11, 10) - 0.1 });
    capWords(sc, 11, 10, 15, { y: L(150, 200), size: L(60, 62), hl: [13, 14, 15] });
    const nb = cchip(sc, '<i class="fa-solid fa-hourglass-start"></i>ولسه ما بدأتش!', 'white', CX, L(1000, 1580), T(11, 12) - 0.1, L(44, 46), -2, 'slap'); nb.style.color = 'var(--red)';
  }
  // ١٢: الخطة المثالية هشّة — أول مكالمة… والخطة كلها تقع (واقع)
  { const sc = scene(P(12).t0 - 0.4, P(13).t0 - 0.3, 'real');
    foot(sc, 'K05', P(12).t0 - 0.4, T(12, 16) - 0.1, { from: 0.5, focus: L([0.6, 0.4], [0.68, 0.4]), zoom: [1.05, 1.12], fadeIn: 0.4, fadeOut: 0.1, shade: true }); fx('whoosh', P(12).t0 - 0.45, 0.6);
    foot(sc, 'K09', T(12, 16) - 0.12, P(13).t0 - 0.3, { from: 2, focus: L([0.5, 0.35], [0.5, 0.38]), zoom: [1.1, 1.18], fadeIn: 0.1, shade: true }); fx('swish', T(12, 16) - 0.15, 0.6);
    const pl = el('div', 'card', null, sc, { width: px(L(420, 600)), padding: '22px 26px 26px', opacity: 0 }); center(pl, L(1480, 540), L(400, 560));
    const C = ['#18B1FE', '#F5A623', '#1FA971', '#7C3AED', '#E5484D'];
    const rows = C.map((c, j) => el('div', null, '<span style="width:64px;font-weight:900;color:var(--ink-2);font-size:20px;direction:ltr">' + (8 + j * 2) + ':00</span><span class="bar" style="flex:1;height:30px;border-radius:10px;background:' + c + ';opacity:.85"></span>', pl, { display: 'flex', alignItems: 'center', gap: '12px', marginTop: j ? '12px' : '0' }));
    rise(pl, P(12).t0 - 0.2, 30, 0.4, 'pop', 0.6);
    tl.to(pl, { boxShadow: '0 0 0 6px rgba(255,255,255,.9), 0 30px 60px rgba(0,0,0,.35)', duration: 0.3 }, T(12, 3)); fx('pop', T(12, 4), 0.5);
    const call = cchip(sc, '<i class="fa-solid fa-phone"></i>مكالمة!', 'white', L(1480, 540), L(160, 270), T(12, 7) - 0.1, L(42, 44), -3, 'slap'); call.style.color = 'var(--red)';
    tl.to(rows[0].querySelector('.bar'), { background: '#F2545B', opacity: 1, duration: 0.2 }, T(12, 8));
    tl.to(rows[1], { x: L(-40, -40), duration: 0.3 }, T(12, 11)); fx('swish', T(12, 11), 0.5);
    rows.forEach((rw, j) => tl.to(rw, { y: L(500, 600) + j * 20, rotation: (j % 2 ? 1 : -1) * (20 + j * 8), opacity: 0, duration: 0.8, ease: 'power2.in' }, T(12, 13) + j * 0.07)); fx('lowhit', T(12, 14), 0.8);
    tl.to([pl, call], { opacity: 0, duration: 0.3 }, T(12, 15) + 0.2);
    capWords(sc, 12, 0, 6, { ...CAP, hl: [6], end: T(12, 7) - 0.1 });
    capWords(sc, 12, 7, 15, { ...CAP, hl: [13, 14, 15], end: T(12, 16) - 0.1 });
    capWords(sc, 12, 16, 21, { ...CAP, hl: [18, 19, 20] });
  }
  // ١٣–١٤: مش مش منظّم… الترتيب المعتاد غالي — محتاج ترتيب أرخص
  { const sc = scene(P(13).t0 - 0.3, P(15).t0 - 1.1, 'blue');
    const w = words(sc, 'المشكلة مش إنك ~مش~ ~منظّم~', { y: L(200, 360), size: L(78, 56), at: [0, 1, 2, 3, 4].map(k => T(13, k)) });
    const ww = w.querySelectorAll('.w'); strike(ww[3], T(13, 5) - 0.15, 8); strike(ww[4], T(13, 5) - 0.08, 8);
    words(sc, 'الترتيب بالطريقة المعتادة…', { y: L(360, 500), size: L(70, 52), color: 'var(--sky-100)', at: [7, 8, 9].map(k => T(13, k)) });
    words(sc, '*غالي* *جدًا* على دماغك', { y: L(490, 640), size: L(96, 76), at: [10, 11, 12, 13].map(k => T(13, k)) });
    const tg = icon(sc, 'fa-tag', L(1500, 820), L(560, 820), L(80, 80), 'var(--sticky)', T(13, 10), 'slap');
    // ١٤: مش محتاج تبطّل ترتّب… محتاج ترتيب أرخص
    tl.to(sc.querySelectorAll('.big'), { opacity: 0.25, duration: 0.3 }, P(14).t0 - 0.15); out(tg, P(14).t0 - 0.15, 0.2);
    words(sc, 'مش محتاج ~تبطّل~ ترتّب…', { y: L(680, 900), size: L(74, 66), at: [3, 4, 5, 6].map(k => T(14, k)) });
    const ch = cchip(sc, '<i class="fa-solid fa-tag"></i>محتاج ترتيب أرخص', 'sticky', CX, L(880, 1140), T(14, 7) - 0.05, L(64, 60), -2, 'slap');
  }

  // ════════ ١٥–٢٠ · تعمل إيه؟ ════════
  { const t = P(15).t0 - 1.1, sc = scene(t, P(15).t0 - 0.05, 'light');
    words(sc, 'طب ~تعمل~ إيه؟', { y: L(400, 820), size: L(140, 130), color: 'var(--ink)', t: t + 0.05 }); fx('whoosh_big', t, 0.8); fx('slap', t + 0.3, 0.6);
  }
  chapter('تعمل إيه؟', P(15).t0 - 0.2, P(20).t1 + 0.3, 'ink', 'var(--sticky)');
  const SB = L({ x: 860, y: 200, w: 940 }, { x: 60, y: 230, w: 960 });
  const CB = L(SQ(470, 560, 600), SQ(540, 800, 560));
  const RX = L(1330, 540);
  // ١٥–١٦: خطة صغيرة، مش كاملة — تلات حاجات، والأهم الأول
  { const sc = scene(P(15).t0 - 0.1, P(17).t0 - 0.3);
    step(sc, 1, 'خطة <span class="hl">صغيرة</span>، مش كاملة', P(15).t0 - 0.05, SB, L(64, 62));
    card(sc, 'K02', T(15, 2) - 0.2, P(17).t0 - 0.3, CB, { focus: [0.75, 0.5], zoom: [1.3, 1.36], from: 1 });
    const ls = el('div', 'card', null, sc, { width: px(L(700, 820)), padding: '20px 34px 30px', opacity: 0 }); center(ls, RX, L(560, 1340));
    rise(ls, T(15, 7) - 0.2, 30, 0.35, 'whoosh', 0.5);
    const items = ['الأهم', 'تاني حاجة', 'تالت حاجة'].map((tx, j) => { const r = el('div', null, '<span style="width:46px;height:46px;border-radius:12px;border:4px solid #C9D6E8;display:inline-block"></span><span style="font-weight:900;font-size:' + px(L(40, 42)) + ';color:var(--ink)">' + AR(j + 1) + ' — ' + tx + '</span>', ls, { display: 'flex', alignItems: 'center', gap: '20px', marginTop: '16px', opacity: 0 });
      rise(r, T(15, 7) + j * 0.15, 14, 0.25, 'pop', 0.5); return r; });
    const st = icon(sc, 'fa-star', L(RX + 400, 900), L(470, 1250), L(56, 58), '#F5B800', T(15, 11) - 0.1, 'slap');
    tl.to(items[0], { color: 'var(--blue-700)', scale: 1.06, transformOrigin: '100% 50%', duration: 0.3 }, T(15, 11));
    // ١٦: الزيادة تستنى في ورقة جنبك
    const pp = sticky(sc, 'بعدين:<br>• …<br>• …', L(RX - 160, 300), L(830, 1640), L(300, 320), L(40, 42), T(16, 3) - 0.1, 4); fx('paper', T(16, 3) - 0.1, 0.8);
    capWords(sc, 16, 0, 6, { y: L(950, 1760), size: L(44, 46), color: 'var(--ink)', shadow: false, x: L(1100, null), width: L(700, null), end: T(16, 7) - 0.1 });
    const nb = cchip(sc, '<i class="fa-solid fa-brain"></i>مش جوّه دماغك', 'ghost', L(RX + 170, 780), L(830, 1640), T(16, 7) - 0.1, L(36, 34), 2);
  }
  // ١٧–١٨: ثبّت الشكل — الصبح / الضهر / بالليل — بتملا الخانات بس
  { const sc = scene(P(17).t0 - 0.3, P(19).t0 - 0.3);
    step(sc, 2, 'ثبّت <span class="hl">الشكل</span>', P(17).t0 - 0.2, SB, L(66, 64));
    card(sc, 'K06', T(17, 2) - 0.2, P(19).t0 - 0.3, CB, { focus: [0.45, 0.45], zoom: [1.15, 1.2], from: 0.3 });
    const SL = [['fa-sun', 'الصبح', '#F5A623', 11], ['fa-cloud-sun', 'الضهر', '#18B1FE', 12], ['fa-moon', 'بالليل', '#7C3AED', 13]];
    const SX = L([[RX, 470], [RX, 640], [RX, 810]], [[540, 1170], [540, 1340], [540, 1510]]);
    const slots = SL.map(([ic, tx, c, k], j) => { const s = el('div', null, '<span style="width:150px;display:flex;align-items:center;gap:12px;font-weight:1000;color:' + c + '"><i class="fa-solid ' + ic + '"></i>' + tx + '</span><span class="sl" style="flex:1;height:70px;border-radius:18px;border:4px dashed #C9D6E8;display:flex;align-items:center;justify-content:center;font-size:' + px(L(34, 36)) + ';font-weight:900;color:var(--ink)"></span>', sc,
      { position: 'absolute', display: 'flex', alignItems: 'center', gap: '18px', width: px(L(820, 900)), fontSize: px(L(38, 40)), opacity: 0 });
      center(s, SX[j][0], SX[j][1]); rise(s, T(17, k) - 0.1, 20, 0.3, 'pop', 0.5); return s; });
    capWords(sc, 17, 14, 19, { y: L(930, 1650), size: L(46, 48), color: 'var(--ink-2)', shadow: false, x: L(880, null), width: L(900, null), end: T(17, 20) - 0.1 });
    ['أهم حاجة', 'مشاوير', 'راحة'].forEach((tx, j) => { const sl = slots[j].querySelector('.sl'); const f = el('div', null, tx, sl, { opacity: 0 });
      tl.to(sl, { background: ['#FFF4DC', '#E2F5FF', '#EFE8FF'][j], borderStyle: 'solid', borderColor: 'transparent', duration: 0.25 }, T(17, 22) + j * 0.18); tl.to(f, { opacity: 1, duration: 0.25 }, T(17, 22) + j * 0.18); fx('pop', T(17, 22) + j * 0.18, 0.4); });
    capWords(sc, 17, 20, 23, { y: L(930, 1650), size: L(50, 52), color: 'var(--ink)', shadow: false, x: L(880, null), width: L(900, null), hl: [22, 23], hlCls: 'hl', end: P(18).t0 - 0.1 });
    // ١٨: قرارات أقل… البطارية مش بتتسحب
    const dc = cchip(sc, '<i class="fa-solid fa-signs-post"></i>قرارات أقل', 'sticky', L(RX - 180, 380), L(1010, 1720), T(18, 1) - 0.1, L(42, 42), -2);
    const bt = cchip(sc, '<i class="fa-solid fa-battery-full" style="color:#1FA971"></i>البطارية مليانة', 'white', L(RX + 200, 740), L(1010, 1720), T(18, 9) - 0.1, L(42, 42), 2);
  }
  // ١٩–٢٠: سيب مسافة — ضاعف الوقت + هوا بين الحاجات
  { const sc = scene(P(19).t0 - 0.3, P(21).t0 - 0.5);
    step(sc, 3, 'سيب <span class="hl">مسافة</span>', P(19).t0 - 0.2, SB, L(66, 64));
    const half = cchip(sc, '<i class="fa-regular fa-clock"></i>نص ساعة', 'ghost', L(1330, 700), L(500, 660), T(19, 8) - 0.1, L(50, 50), -2);
    strike(half, T(19, 10) - 0.05);
    const hr = cchip(sc, '<i class="fa-solid fa-clock"></i>ساعة', 'sticky', L(860, 380), L(500, 660), T(19, 11) - 0.1, L(56, 56), 2, 'slap');
    // خط اليوم: بلوكات وبينها هوا
    const TLW = L(1500, 960), TX0 = CX - TLW / 2, TY = L(780, 1080);
    const line = el('div', null, null, sc, { position: 'absolute', left: px(TX0), top: px(TY + L(60, 60)), width: px(TLW), height: '6px', borderRadius: '3px', background: '#C9D6E8', opacity: 0 }); rise(line, T(19, 12) - 0.2, 10, 0.3);
    const BL = [[0, 0.24, '#18B1FE'], [0.36, 0.62, '#F5A623'], [0.74, 1, '#1FA971']];
    const blks = BL.map(([a, b, c], j) => { const d = el('div', null, null, sc, { position: 'absolute', right: px(L(1920, 1080) - (TX0 + TLW) + a * TLW), top: px(TY), width: px((b - a) * TLW), height: '110px', borderRadius: '22px', background: c, opacity: 0, boxShadow: 'var(--shadow-card)' });
      rise(d, T(19, 12) + j * 0.12, 20, 0.3, j ? null : 'pop', 0.5); return d; });
    const gaps = [];
    [0, 1].forEach(j => { const a = BL[j][1], b = BL[j + 1][0]; const g = el('div', null, 'هوا', sc, { position: 'absolute', right: px(L(1920, 1080) - (TX0 + TLW) + a * TLW), top: px(TY + 20), width: px((b - a) * TLW), textAlign: 'center', fontWeight: 900, fontSize: px(L(30, 28)), color: 'var(--ink-2)', opacity: 0 }); rise(g, T(19, 13) + j * 0.15, 10, 0.3); gaps.push(g); });
    // حاجة اتأخرت… واليوم ما وقعش
    tl.to(blks[0], { width: px((0.32) * TLW), duration: 0.5, ease: 'power2.out' }, T(19, 19)); fx('swish', T(19, 19), 0.5); tl.to(gaps[0], { opacity: 0, duration: 0.3 }, T(19, 19));
    const ok = cchip(sc, '<i class="fa-solid fa-check"></i>اليوم ما وقعش', 'white', CX, L(1010, 1320), T(19, 22) - 0.1, L(44, 46), -2); ok.style.color = 'var(--green)';
    capWords(sc, 19, 4, 11, { y: L(640, 700), size: L(46, 48), color: 'var(--ink)', shadow: false, end: T(19, 12) - 0.1 });
    // ٢٠: الخطة اللي فيها هوا… بتستحمل الحياة
    tl.to([half, hr], { opacity: 0, duration: 0.3 }, P(20).t0 - 0.2);
    words(sc, 'الخطة اللي فيها ~هوا…~ *بتستحمل* *الحياة*', { y: L(470, 760), size: L(70, 60), color: 'var(--ink)', at: [0, 1, 2, 3, 4, 5].map(k => T(20, k)) });
  }
  // ════════ ٢١ · الواقع ════════
  { const sc = scene(P(21).t0 - 0.5, P(22).t0 - 0.3, 'real');
    foot(sc, 'K01', P(21).t0 - 0.5, T(21, 15) - 0.1, { from: 1, speed: 0.6, focus: L([0.55, 0.4], [0.62, 0.4]), zoom: [1.08, 1.0], fadeIn: 0.5, fadeOut: 0.1, shade: true }); fx('whoosh', P(21).t0 - 0.55, 0.6);
    foot(sc, 'K08', T(21, 15) - 0.12, P(22).t0 - 0.3, { from: 8, focus: L([0.5, 0.35], [0.5, 0.35]), zoom: [1.0, 1.06], fadeIn: 0.1, shade: true }); fx('swish', T(21, 15) - 0.15, 0.6);
    capWords(sc, 21, 0, 7, { ...CAP, hl: [5, 6, 7], end: T(21, 8) - 0.1 });
    const a = chip(sc, '«شكلها حلو»', 'glass', L(1500, 540), L(300, 330), L(56, 56)); a.style.background = 'rgba(6,16,36,.55)'; pop(a, T(21, 12) - 0.1, -2, 'pop', 0.6); strike(a, T(21, 14) - 0.05);
    out(a, T(21, 15) - 0.15, 0.2);
    capWords(sc, 21, 8, 14, { ...CAP, hl: [13, 14], end: T(21, 15) - 0.1 });
    sticky(sc, '«تخلّيك تبدأ»', L(1500, 540), L(300, 330), L(460, 520), L(58, 58), T(21, 19) - 0.1, -3); fx('paper', T(21, 19) - 0.1, 0.8);
    capWords(sc, 21, 15, 20, { ...CAP, hl: [19, 20] });
  }
  // ════════ ٢٢–٢٤ ════════
  { const sc = scene(P(22).t0 - 0.3, P(23).t0 - 0.2, 'blue');
    words(sc, 'إنت مش فوضوي…', { y: L(320, 680), size: L(110, 96), at: [0, 1, 2].map(k => T(22, k)) });
    words(sc, '*الترتيب* بس محتاج يبقى | *أخف* على دماغك.', { y: L(500, 860), size: L(92, 76), at: [3, 4, 5, 6, 7, 8, 9].map(k => T(22, k)) });
    const b = icon(sc, 'fa-feather', CX, L(860, 1300), L(120, 140), 'var(--sticky)', T(22, 7) + 0.1, 'impact'); b.style.filter = 'drop-shadow(0 0 30px rgba(245,230,163,.8))';
  }
  { const sc = scene(P(23).t0 - 0.2, P(24).t0 - 0.2);
    capWords(sc, 23, 0, 6, { y: L(170, 200), size: L(58, 62), color: 'var(--sky-100)', x: L(960, null), width: L(860, null), end: T(23, 7) - 0.1 });
    const ph = el('div', 'phone', '<div><img src="../ep05/assets/' + 'jadwali.png' + '"></div>', sc, { width: px(L(320, 380)), height: px(L(692, 822)) });
    center(ph, L(560, 540), L(560, 960)); tl.fromTo(ph, { opacity: 0, y: 160, rotation: 0 }, { opacity: 1, y: 0, rotation: -4, duration: 0.6, ease: 'power3.out' }, T(23, 7) - 0.3); fx('whoosh', T(23, 7) - 0.3, 0.6);
    const lg = el('div', null, '<img src="../../../etizan-explainer-video/pipeline/assets/logo-full.png" style="height:' + px(L(100, 100)) + ';display:block">', sc, { position: 'absolute', padding: '20px 46px', background: '#fff', borderRadius: '52px', boxShadow: 'var(--shadow-card)', opacity: 0 });
    center(lg, L(1320, 540), L(470, 330)); pop(lg, T(23, 9) - 0.2, 0, 'pop', 0.7);
    cchip(sc, '<i class="fa-solid fa-sun"></i>من الصبح لبالليل', 'white', L(1320, 540), L(680, 1500), T(23, 13) - 0.1, L(44, 44), -2);
    cchip(sc, '<i class="fa-solid fa-circle-check" style="color:#1FA971"></i>بتعلّم عليها أول ما تخلّصها', 'sticky', L(1320, 540), L(820, 1640), T(23, 18) - 0.1, L(40, 40), 2);
  }
  { const sc = scene(P(24).t0 - 0.2, null);
    const sp = el('div', 'pill glass', '<span class="dot"></span>ليه دماغي بتعمل كده؟', sc, { fontSize: px(L(32, 36)), opacity: 0 }); center(sp, L(1420, 540), L(200, 360)); rise(sp, P(24).t0, -20);
    const nx = el('div', 'pill ink', 'الحلقة الجاية', sc, { fontSize: px(L(30, 34)), opacity: 0 }); center(nx, L(1420, 540), L(290, 460)); rise(nx, T(24, 1) - 0.1, -20);
    const q = words(sc, 'ليه بركّز ساعات | في حاجة *بحبها…* | ومش دقيقة في حاجة *مهمة؟*', { y: L(330, 580), size: L(62, 70), at: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(k => T(24, k)) });
    if (H) Object.assign(q.style, { left: 'auto', right: '100px', width: '860px', padding: 0, textAlign: 'center' });
    const lg = el('div', null, '<img src="../../../etizan-explainer-video/pipeline/assets/logo-full.png" style="height:' + px(L(80, 96)) + ';display:block">', sc, { position: 'absolute', padding: '18px 40px', background: '#fff', borderRadius: '44px', boxShadow: 'var(--shadow-card)', opacity: 0 });
    center(lg, L(1420, 540), L(820, 1560)); rise(lg, P(24).t1 + 0.3, 20);
    if (H) {
      const es = el('div', null, null, sc, { position: 'absolute', left: '110px', top: '170px', width: '760px', height: '428px', borderRadius: '28px', border: '4px dashed rgba(255,255,255,.28)', opacity: 0 });
      const sb = el('div', null, null, sc, { position: 'absolute', left: '370px', top: '650px', width: '240px', height: '240px', borderRadius: '50%', border: '4px dashed rgba(255,255,255,.28)', opacity: 0 });
      rise(es, P(24).t1 + 0.4, 20); rise(sb, P(24).t1 + 0.6, 20);
    } else {
      const fol = el('div', 'pill', '<i class="fa-solid fa-bell"></i>تابع السلسلة', sc, { background: 'var(--sticky)', color: 'var(--ink)', fontSize: '40px', opacity: 0, boxShadow: 'var(--shadow-card)' }); center(fol, 540, 1350); pop(fol, P(24).t1 + 0.5, -2, 'pop', 0.6);
    }
    tl.to('#stage', { opacity: 0, duration: 0.6 }, DUR - 0.6);
  }
} };
