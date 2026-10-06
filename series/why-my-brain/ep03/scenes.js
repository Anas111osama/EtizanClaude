// الحلقة ٣ — «ليه بشتغل أحسن… لما الوقت يزنقني؟»
// كل حركة مربوطة بكلمتها: T(فقرة، رقم الكلمة) — الفقرات ١..٢٥ زي script.txt. L(عريض، طولي) لكل مكان.
// الواقع في الطولي: برواز 4:5 في نص الشاشة لفوق (BOX_REAL)، والكروت مربّعة تقريبًا.
window.EPISODE = { n: 3, gaps: { 4: 3.0, 6: 0.5, 10: 0.4, 11: 0.3, 14: 0.3, 15: 1.1, 17: 0.3, 19: 0.3, 21: 0.6, 22: 0.3, 25: 7.5 }, build(A) {
  const { O, L, px, $, tl, fx, dyn, lerp, el, world, scene, pop, rise, out, center, capWords, words, strike, foot, trace, chip, sticky, chapter, T, P, DUR, AR, BOX_REAL } = A;
  const H = O === 'h', CX = L(960, 540);
  const CAP = L({ y: 860, size: 66 }, { y: 1420, size: 74 });
  const cchip = (sc, html, cls, x, y, t, size, rot = 0, s = 'pop') => pop(chip(sc, html, cls, x, y, size), t, rot, s);
  const flash = (t, a = 0.25) => tl.fromTo('#flash', { opacity: a }, { opacity: 0, duration: 0.3, immediateRender: false }, t);
  const label = (sc, html, x, y, t, cls = 'ink', size = 34) => { const c = el('div', 'pill ' + cls, html, sc, { fontSize: px(size), opacity: 0 }); center(c, x, y); return rise(c, t, 20, 0.35); };
  const icon = (sc, ic, x, y, size, color, t, s = 'pop') => { const i = el('i', 'fa-solid ' + ic, null, sc, { position: 'absolute', fontSize: px(size), color, opacity: 0 }); center(i, x, y); return pop(i, t, 0, s, 0.6); };
  const step = (sc, n, title, t, box, size) => { const s = el('div', 'step', '<div class="n">' + AR(n) + '</div><div style="font-size:' + px(size) + ';font-weight:1000;line-height:1.22">' + title + '</div>', sc, { left: px(box.x), top: px(box.y), width: px(box.w) });
    tl.fromTo(s, { opacity: 0, y: 80, rotation: 2 }, { opacity: 1, y: 0, rotation: 0, duration: 0.55, ease: 'power3.out' }, t); fx('whoosh', t, 0.8); return s; };
  const row = (parent, html, size, mt = 26) => el('div', null, html, parent, { display: 'flex', alignItems: 'center', gap: '18px', fontSize: px(size), fontWeight: 900, marginTop: px(mt), opacity: 0 });
  // كارت لقطة (مربّع تقريبًا) بيطلع من تحت
  const card = (sc, id, t0, t1, box, o = {}) => { const f = foot(sc, id, t0, t1, { box, radius: 36, zoom: [1.0, 1.06], fadeIn: 0.3, fadeOut: o.fadeOut == null ? false : o.fadeOut, ...o });
    tl.fromTo(f, { y: 70 }, { y: 0, duration: 0.5, ease: 'power3.out', immediateRender: false }, t0); fx('whoosh', t0, 0.6); return f; };
  const SQ = (x, y, s) => ({ x: x - s / 2, y: y - s / 2, w: s, h: s });
  const circ = (sc, n, x, y, t, size = 120) => { const c = el('div', null, AR(n), sc, { position: 'absolute', width: px(size), height: px(size), borderRadius: '50%', background: '#fff', color: 'var(--blue-700)', fontWeight: 1000, fontSize: px(size * 0.57), display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, boxShadow: 'var(--shadow-card)' });
    center(c, x, y); return pop(c, t, 0, 'pop', 0.7); };
  // عدّاد (نص دايرة) من الحلقة ١ — set(t, قيمة ٠..١)
  function gauge(sc, x, y, lbl, ic, size = 280) {
    const g = el('div', null, '<svg viewBox="0 0 300 170" width="' + size + '" height="' + size * 0.57 + '"><path d="M40 150 A110 110 0 0 1 260 150" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="22" stroke-linecap="round"/>'
      + '<path class="arc" d="M40 150 A110 110 0 0 1 260 150" fill="none" stroke="#18B1FE" stroke-width="22" stroke-linecap="round"/><g class="nd"><line x1="150" y1="150" x2="150" y2="58" stroke="#fff" stroke-width="9" stroke-linecap="round"/></g><circle cx="150" cy="150" r="15" fill="#fff"/></svg>'
      + '<div style="font-size:' + px(size * 0.13) + ';font-weight:900;margin-top:4px"><i class="fa-solid ' + ic + '" style="color:var(--sky-100);margin-left:10px"></i>' + lbl + '</div>', sc, { position: 'absolute', width: px(size), textAlign: 'center', opacity: 0, color: '#fff' });
    center(g, x, y); const arc = g.querySelector('.arc'), nd = g.querySelector('.nd'), len = 346;
    arc.style.strokeDasharray = len; gsap.set(arc, { strokeDashoffset: len * 0.9 }); gsap.set(nd, { rotation: -72, svgOrigin: '150 150' });
    g.set = (t, v, d = 0.6) => { tl.to(arc, { strokeDashoffset: len * (1 - v), duration: d, ease: 'power2.inOut' }, t); tl.to(nd, { rotation: -90 + 180 * v, svgOrigin: '150 150', duration: d, ease: 'back.out(1.4)' }, t); };
    return g;
  }
  // زرار «ابدأ» من الحلقة ١
  function switcher(sc, x, y, scale = 1) {
    const s = el('div', null, '<div class="k" style="width:120px;height:64px;border-radius:32px;background:rgba(255,255,255,.2);position:relative"><div class="kn" style="position:absolute;right:8px;top:8px;width:48px;height:48px;border-radius:50%;background:#9fb3d1"></div></div><span>ابدأ</span>', sc,
      { position: 'absolute', display: 'flex', alignItems: 'center', gap: '24px', padding: '20px 34px 20px 24px', borderRadius: '999px', background: 'rgba(4,22,60,.45)', border: '2px solid rgba(255,255,255,.25)', fontWeight: 900, fontSize: '42px', color: 'rgba(255,255,255,.65)', opacity: 0 });
    center(s, x, y); gsap.set(s, { scale }); const k = s.querySelector('.k'), kn = s.querySelector('.kn');
    s.on = t => { tl.to(kn, { x: -56, background: '#fff', duration: 0.25 }, t); tl.to(k, { background: '#18B1FE', boxShadow: '0 0 30px #18B1FE', duration: 0.25 }, t); tl.to(s, { color: '#fff', duration: 0.25 }, t); fx('pop', t, 0.9); };
    return s;
  }
  const box2 = (sc, cls, title, sub, w, h, extra) => el('div', cls, '<div style="font-size:' + px(L(72, 74)) + ';font-weight:1000;' + (cls === 'card' ? 'color:var(--blue-700)' : '') + '">' + title + '</div><div style="font-size:30px;font-weight:800;color:' + (cls === 'card' ? 'var(--ink-2)' : 'var(--sky-100)') + '">' + sub + '</div>', sc,
    { width: px(w), height: px(h), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '34px', gap: '4px', ...extra });

  // ════════ ١–٤ · الواقع ════════
  const T4 = T(4, 2) - 0.2;
  { const sc = scene(0, T4 + 0.6, 'real');
    // ١: الساعة حداشر بالليل… والتسليم تسعة الصبح
    foot(sc, 'G01', 0, P(2).t0 - 0.1, { from: 0, focus: L([0.5, 0.45], [0.58, 0.45]), zoom: L([1.0, 1.1], [1.0, 1.04]), fadeIn: 0.6, shade: true });
    capWords(sc, 1, 0, 2, { ...CAP, hl: [1, 2], end: T(1, 3) - 0.1 });
    const due = sticky(sc, 'التسليم:<br>٩ الصبح', L(330, 290), L(300, 330), L(320, 320), L(52, 50), T(1, 3) - 0.05, -5); fx('paper', T(1, 3) - 0.05, 0.9);
    fx('ticktock', 0.1, 0.9);
    capWords(sc, 1, 3, 6, { ...CAP, hl: [5, 6], end: P(2).t0 - 0.1 });
    // ٢: أسبوعين… ومفيش سطر — بعدين: بسرعة عمرك ما شفتها
    foot(sc, 'G04', P(2).t0 - 0.12, T(2, 9) - 0.1, { from: 0, focus: L([0.5, 0.4], [0.5, 0.45]), zoom: [1.0, 1.06], fadeIn: 0.1, fadeOut: 0.1, shade: true }); fx('whoosh', P(2).t0 - 0.15, 0.6);
    out(due, P(2).t0 - 0.2, 0.15);
    const days = cchip(sc, '<i class="fa-regular fa-calendar"></i>١٤ يوم', 'white', L(1500, 300), L(300, 300), T(2, 0) - 0.08, L(48, 44), -3);
    const zero = cchip(sc, '<i class="fa-solid fa-file-lines"></i>٠ سطر', 'white', L(1500, 780), L(430, 300), T(2, 8) - 0.08, L(48, 44), 3, 'slap');
    zero.style.color = 'var(--red)';
    capWords(sc, 2, 0, 4, { ...CAP, end: T(2, 5) - 0.1 });
    capWords(sc, 2, 5, 8, { ...CAP, hl: [8], end: T(2, 9) - 0.1 });
    out(days, T(2, 9) - 0.2, 0.1); out(zero, T(2, 9) - 0.2, 0.1);
    const tq = T(2, 9) - 0.12;
    foot(sc, 'G02', tq, T(2, 13) - 0.1, { from: 2.4, speed: 1.2, focus: [0.55, 0.6], zoom: [1.05, 1.15], fadeIn: 0.06, fadeOut: 0.06, shade: true }); fx('glitch', tq, 0.7); fx('typing', tq + 0.05, 0.9);
    foot(sc, 'G03', T(2, 13) - 0.12, T(2, 17) - 0.1, { from: 3, speed: 1.6, focus: [0.55, 0.55], zoom: [1.1, 1.2], fadeIn: 0.06, fadeOut: 0.06, shade: true }); fx('swish', T(2, 13) - 0.15, 0.8); fx('typing', T(2, 13) - 0.1, 0.7);
    foot(sc, 'G04', T(2, 17) - 0.12, P(3).t0 - 0.1, { from: 15, focus: L([0.5, 0.4], [0.5, 0.45]), zoom: [1.12, 1.2], fadeIn: 0.06, fadeOut: 0.12, shade: true }); fx('swish', T(2, 17) - 0.15, 0.8);
    // عدّاد كلام بيطلع بسرعة
    const cnt = el('div', null, '', sc, { position: 'absolute', fontWeight: 1000, fontSize: px(L(120, 110)), color: '#fff', textShadow: '0 10px 40px rgba(0,0,0,.6)', opacity: 0, whiteSpace: 'nowrap' });
    center(cnt, CX, L(420, 760)); const c0 = T(2, 11), c1 = T(2, 16) + 0.2;
    dyn(t => { cnt.textContent = AR(Math.round(1400 * Math.pow(lerp(t, c0, c1), 1.4))) + ' كلمة'; });
    tl.fromTo(cnt, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.25 }, c0 - 0.1); tl.to(cnt, { scale: 1.12, color: '#F5E6A3', duration: 0.2 }, c1); fx('rise', c0, 0.5); out(cnt, T(2, 17) - 0.15, 0.15);
    capWords(sc, 2, 9, 10, { ...CAP, end: T(2, 11) - 0.1 });
    capWords(sc, 2, 11, 16, { ...CAP, hl: [13], end: T(2, 17) - 0.1 });
    capWords(sc, 2, 17, 22, { ...CAP, hl: [17, 18], end: P(3).t0 - 0.1 });
    // ٣: من غير نوم… «أنا بشتغل أحسن تحت الضغط» — وبيتجمّد عند «طب ليه؟»
    const fz = T(4, 0);
    const r = foot(sc, 'G06', P(3).t0 - 0.15, T4 + 0.25, { from: 0.5, freeze: fz, focus: L([0.5, 0.42], [0.53, 0.42]), zoom: [1.0, 1.06], fadeIn: 0.3, shade: true }); fx('whoosh', P(3).t0 - 0.2, 0.5);
    capWords(sc, 3, 0, 4, { ...CAP, hl: [2, 3, 4], end: T(3, 5) - 0.1 });
    const note = sticky(sc, '«أنا بشتغل أحسن<br>تحت الضغط»', L(1520, 540), L(300, 330), L(470, 560), L(46, 48), T(3, 7) - 0.1, 4); fx('pen', T(3, 7) - 0.1, 0.9);
    out(note, fz - 0.15, 0.2);
    flash(fz, 0.35); fx('lowhit', fz, 0.8); fx('reverse', fz - 0.7, 0.5);
    tl.to(r.querySelector('.src > img'), { filter: 'grayscale(1) brightness(.8)', duration: 0.4 }, fz);
    tl.to(r.tint, { opacity: 0.82, duration: 0.7 }, fz + 0.15);
    trace(r, ['M1010 300 C1010 110, 1270 110, 1270 300 C1270 470, 1180 520, 1140 520 C1100 520, 1010 470, 1010 300 Z',
      'M620 590 L1250 590 L1265 950 L605 950 Z', 'M250 810 L370 810 L355 975 L265 975 Z'], fz + 0.25, 0.8);
    fx('swish', fz + 0.3, 0.5);
    capWords(sc, 4, 0, 1, { ...CAP, y: L(470, 1420), size: L(110, 110), hl: [1], end: T4 + 0.05 });
  }
  // ════════ كارت العنوان ════════
  { const sc = scene(T4, P(5).t0 - 0.35, 'blue');
    const q = el('div', 'qmark', '؟', sc, { fontSize: px(L(1000, 760)), opacity: 0 }); Object.assign(q.style, H ? { left: '80px', top: '30px' } : { left: '160px', top: '1060px' });
    tl.fromTo(q, { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, T4 + 0.1);
    const sp = el('div', 'pill glass', '<span class="dot"></span>ليه دماغي بتعمل كده؟', sc, { fontSize: px(L(34, 38)), opacity: 0 });
    if (H) Object.assign(sp.style, { right: '160px', top: '230px' }); else center(sp, 540, 520); rise(sp, T4 + 0.05, -20);
    const ep = el('div', 'pill ink', 'الحلقة ٣', sc, { fontSize: px(L(28, 32)), padding: '6px 24px', opacity: 0 });
    if (H) Object.assign(ep.style, { right: '160px', top: '320px' }); else center(ep, 540, 610); rise(ep, T4 + 0.25, -20);
    const t1 = words(sc, 'ليه بشتغل أحسن…', { y: L(430, 760), size: L(112, 96), at: [2, 3, 4].map(k => T(4, k)) });
    const t2 = words(sc, 'لما *الوقت* *يزنقني؟*', { y: L(580, 1000), size: L(122, 112), at: [5, 6, 7].map(k => T(4, k)) });
    if (H) [t1, t2].forEach(x => Object.assign(x.style, { left: 'auto', right: '160px', textAlign: 'right', padding: 0 }));
    fx('impact', T(4, 7) + 0.4, 0.9); flash(T(4, 7) + 0.4, 0.15);
    tl.to([t1, t2, sp, ep], { opacity: 0, y: -40, duration: 0.35 }, P(5).t0 - 0.6); fx('whoosh_big', P(5).t0 - 0.6, 0.8);
  }
  // ════════ ٥–٦ · اللي بيتقال لك (فاتح) ════════
  { const sc = scene(P(5).t0 - 0.35, P(7).t0 - 0.35, 'light');
    chapter('اللي بيتقال لك', P(5).t0 - 0.2, P(7).t0 - 0.4, 'ink', 'var(--sky-400)');
    capWords(sc, 5, 0, 4, { y: L(170, 220), size: L(54, 58), color: 'var(--ink-2)', shadow: false, end: P(6).t0 - 0.1 });
    const PA = L([[1400, 360, -3], [1330, 510, 2], [1460, 660, -2]], [[540, 420, -3], [540, 560, 2], [540, 700, -2]]);
    const blame = [['«بتحب تأجّل لآخر لحظة»', 5], ['«لو عايز، كنت عملتها من بدري»', 10], ['«ده دلع»', 17]].map(([q, k], j) => cchip(sc, q, 'ghost', PA[j][0], PA[j][1], T(5, k) - 0.08, L(46, 44), PA[j][2], 'slap'));
    // ٦: وناس تانية: «ده أسلوبك»… والاتنين مش دقيقين
    capWords(sc, 6, 0, 3, { y: L(170, 220), size: L(54, 58), color: 'var(--ink-2)', shadow: false, end: T(6, 10) - 0.1 });
    const PB = L([[560, 420, 3], [600, 580, -2]], [[540, 900, 3], [540, 1040, -2]]);
    const praise = [['<i class="fa-solid fa-star"></i>«ده أسلوبك»', 5], ['<i class="fa-solid fa-wand-magic-sparkles"></i>«كده بتبدع»', 9]].map(([q, k], j) => cchip(sc, q, 'sticky', PB[j][0], PB[j][1], T(6, k) - 0.08, L(46, 44), PB[j][2]));
    const vs = el('div', null, 'ولا', sc, { position: 'absolute', fontSize: px(L(40, 40)), fontWeight: 1000, color: 'var(--ink-2)', opacity: 0 }); center(vs, L(960, 540), L(500, 800)); pop(vs, T(6, 0), 0, null);
    [...blame, ...praise].forEach((c, j) => strike(c, T(6, 11) - 0.1 + j * 0.06));
    tl.to([...blame, ...praise, vs], { opacity: 0.25, scale: 0.9, duration: 0.4 }, T(6, 12)); fx('lowhit', T(6, 11), 0.6);
    const w = words(sc, 'الزنقة مش أسلوب…', { y: L(800, 1250), size: L(84, 84), color: 'var(--ink)', at: [13, 14, 15].map(k => T(6, k)) });
    strike(w.querySelectorAll('.w')[2], T(6, 16) - 0.1, 10);
    words(sc, 'الزنقة *شرارة*', { y: L(940, 1420), size: L(96, 100), color: 'var(--ink)', at: [16, 17].map(k => T(6, k)) });
    const sp = icon(sc, 'fa-bolt', L(1460, 540), L(950, 1710), L(110, 130), 'var(--sticky)', T(6, 17) + 0.1, 'impact'); sp.style.filter = 'drop-shadow(0 0 24px rgba(245,200,60,.9))';
  }
  // ════════ ٧–١٥ · اللي بيحصل جوّه ════════
  chapter('اللي بيحصل جوّه', P(7).t0 - 0.2, P(15).t1 + 0.2);
  // ٧–٨: زرار «ابدأ» والعدّادات الأربعة — الرابع: الوقت زانقك
  { const sc = scene(P(7).t0 - 0.35, P(9).t0 - 0.3, 'blue');
    const pb = L({ x: 640, y: 560, w: 1000, h: 760 }, { x: 540, y: 820, w: 960, h: 860 });
    const panel = el('div', 'glasscard', null, sc, { width: px(pb.w), height: px(pb.h) }); center(panel, pb.x, pb.y); rise(panel, P(7).t0 - 0.1, 40, 0.5, 'whoosh', 0.6);
    const tag = label(sc, '<i class="fa-solid fa-rotate-left" style="color:var(--blue-700)"></i>من الحلقة ١', L(1520, 540), L(250, 260), T(7, 3) - 0.1, 'ink', L(32, 34));
    capWords(sc, 7, 0, 2, { y: L(380, 160), size: L(64, 64), x: L(1180, null), width: L(680, null), hl: [2], end: T(7, 6) - 0.1 });
    const sw = switcher(sc, L(640, 540), L(860, 1130)); pop(sw, T(7, 1) - 0.1, 0, 'pop', 0.7);
    const pull = cchip(sc, '«يشدّني»', 'sticky', L(1520, 540), L(560, 1400), T(7, 10) - 0.1, L(64, 60), -2, 'slap');
    const GP = L([[400, 340], [880, 340], [400, 610], [880, 610]], [[300, 560], [780, 560], [300, 860], [780, 860]]);
    const GG = [['ممتعة', 'fa-heart'], ['جديدة', 'fa-star'], ['فيها تحدّي', 'fa-bolt'], ['الوقت زانقك', 'fa-stopwatch']].map(([lb, ic], j) => gauge(sc, GP[j][0], GP[j][1], lb, ic, L(280, 300)));
    [12, 14, 17, 20].forEach((k, j) => { tl.fromTo(GG[j], { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.8)' }, T(7, k) - 0.15); fx('pop', T(7, k) - 0.1, 0.6); GG[j].set(T(7, k) + 0.15, 0.5, 0.5); });
    // ٨: التلاتة مش دايمًا في إيدك… الرابعة بتيجي لوحدها — بس متأخر
    [0, 1, 2].forEach(j => { GG[j].set(T(8, 2) + j * 0.12, 0.1, 0.5); });
    tl.to([GG[0], GG[1], GG[2]], { opacity: 0.35, duration: 0.4 }, T(8, 5)); fx('swish', T(8, 2), 0.5);
    out(pull, T(8, 5), 0.3); out(tag, T(8, 5), 0.3);
    tl.to(GG[3], { scale: 1.15, duration: 0.35, ease: 'back.out(2)' }, T(8, 7) - 0.1); fx('pop', T(8, 7), 0.7);
    capWords(sc, 8, 6, 10, { y: L(380, 1400), size: L(60, 64), x: L(1180, null), width: L(680, null), hl: [9, 10], end: T(8, 11) - 0.1 });
    GG[3].set(T(8, 9), 0.95, 2.4);
    const late = cchip(sc, '<i class="fa-regular fa-clock"></i>بس متأخر', 'white', L(1520, 540), L(560, 1400), T(8, 12) - 0.08, L(56, 56), 3, 'slap'); late.style.color = 'var(--red)';
  }
  // ٩–١٠: «مش دلوقتي» ← «دلوقتي» — والزرار بيولّع
  { const sc = scene(P(9).t0 - 0.3, P(11).t0 - 0.3);
    const tag = label(sc, '<i class="fa-solid fa-rotate-left" style="color:var(--blue-700)"></i>من الحلقة ٢', L(1540, 540), L(150, 200), T(9, 4) - 0.1, 'ink', L(32, 34));
    capWords(sc, 9, 0, 3, { y: L(150, 320), size: L(60, 62), x: L(260, null), width: L(1100, null), hl: [1, 2, 3], end: T(9, 8) - 0.1 });
    const BW = L(620, 860), BH = L(380, 330);
    const now = box2(sc, 'card', 'دلوقتي', 'منوّر… وباين', BW, BH, { boxShadow: '0 0 60px rgba(24,177,254,.8), var(--shadow-card)' });
    center(now, L(1300, 540), L(560, 640)); pop(now, T(9, 1) - 0.1, -1, 'pop', 0.8);
    const later = box2(sc, 'glasscard', 'مش دلوقتي', 'ضباب', BW, BH, { color: '#fff' });
    center(later, L(620, 540), L(560, 1040)); pop(later, T(9, 2) - 0.1, 1, 'pop', 0.8);
    // كارت التسليم قاعد في «مش دلوقتي»، والأيام بتعدّ
    const due = el('div', 'pill', '<i class="fa-solid fa-flag-checkered"></i>التسليم: <b class="d">بعد ١٤ يوم</b>', sc, { background: 'var(--sticky)', color: 'var(--ink)', fontSize: px(L(40, 42)), opacity: 0, boxShadow: 'var(--shadow-card)', zIndex: 4, whiteSpace: 'nowrap' });
    center(due, L(620, 540), L(650, 1110)); pop(due, T(9, 8) - 0.1, -2, 'pop', 0.7);
    const dd = due.querySelector('.d');
    const d7 = T(9, 13) - 0.05, d0 = T(10, 1) - 0.05;
    dyn(t => { dd.textContent = t < d7 ? 'بعد ١٤ يوم' : t < d0 ? 'بعد ٧ أيام' : 'الليلة!'; });
    tl.fromTo(due, { scale: 1.1 }, { scale: 1, duration: 0.25, immediateRender: false }, T(9, 13) - 0.05); fx('page', T(9, 13) - 0.1, 0.9);
    capWords(sc, 9, 8, 12, { y: L(150, 320), x: L(260, null), width: L(1100, null), size: L(54, 58), end: T(9, 13) - 0.1 });
    capWords(sc, 9, 13, 17, { y: L(150, 320), x: L(260, null), width: L(1100, null), size: L(54, 58), end: P(10).t0 - 0.1 });
    // ١٠: ليلة التسليم ← بيتنقل لـ«دلوقتي»
    tl.to(due, { background: '#fff', color: 'var(--red)', duration: 0.2 }, T(10, 1) - 0.05); fx('lowhit', T(10, 1), 0.7);
    tl.to(due, { left: px(L(1300, 540)), top: px(L(650, 730)), duration: 0.6, ease: 'power3.inOut' }, T(10, 5) - 0.15); fx('whoosh', T(10, 5) - 0.15, 0.8); flash(T(10, 5) + 0.4, 0.2);
    tl.to(later, { opacity: 0.35, duration: 0.3 }, T(10, 5) + 0.3);
    tl.to(now, { scale: 1.05, duration: 0.3, yoyo: true, repeat: 1 }, T(10, 5) + 0.4);
    capWords(sc, 10, 0, 6, { y: L(150, 320), x: L(260, null), width: L(1100, null), size: L(54, 58), hl: [6], end: T(10, 7) - 0.1 });
    const sw = switcher(sc, CX, L(920, 1700), L(1, 1.1)); pop(sw, T(10, 7) - 0.1, 0, 'pop', 0.6);
    const gz = el('div', 'pill', '<i class="fa-solid fa-stopwatch"></i>الوقت زانقك', sc, { background: 'var(--blue-700)', color: '#fff', fontSize: px(L(30, 34)), opacity: 0 }); center(gz, L(CX + 330, 540), L(920, 1580)); pop(gz, T(10, 7), 0, null);
    sw.on(T(10, 10) - 0.05); fx('switch', T(10, 10) - 0.05, 1); flash(T(10, 10), 0.2); fx('impact', T(10, 10), 0.6);
    const bolt = icon(sc, 'fa-bolt', L(CX - 300, 860), L(920, 1700), L(80, 90), 'var(--sticky)', T(10, 10) + 0.05, null); bolt.style.filter = 'drop-shadow(0 0 20px rgba(245,200,60,.9))';
    out(tag, T(9, 8), 0.3);
  }
  // ١١: مش «أحسن تحت الضغط»… «لما الضغط ييجي»
  { const sc = scene(P(11).t0 - 0.3, P(12).t0 - 0.4);
    const w1 = words(sc, 'إنت مش بتشتغل ~أحسن~ ~تحت~ ~الضغط…~', { y: L(300, 600), size: L(80, 64), at: [0, 1, 2, 3, 4, 5].map(k => T(11, k)) });
    tl.to(w1, { opacity: 0.45, duration: 0.3 }, T(11, 6) - 0.1);
    const ws = w1.querySelectorAll('.w'); [3, 4, 5].forEach(j => strike(ws[j], T(11, 6) - 0.15 + (j - 3) * 0.08, 8)); fx('slap', T(11, 6) - 0.15, 0.5);
    words(sc, 'إنت بتشتغل *لما* *الضغط* *ييجي.*', { y: L(500, 860), size: L(100, 92), at: [6, 7, 8, 9, 10].map(k => T(11, k)) });
    capWords(sc, 11, 11, 14, { y: L(760, 1240), size: L(58, 62), color: 'var(--sky-100)' });
  }
  // ١٢: الشرارة دي غالية — فاتورة (واقع)
  { const sc = scene(P(12).t0 - 0.4, P(13).t0 - 0.3, 'real');
    foot(sc, 'G05', P(12).t0 - 0.4, T(12, 5) - 0.1, { from: 0.5, focus: L([0.45, 0.6], [0.4, 0.6]), zoom: [1.0, 1.06], fadeIn: 0.4, fadeOut: 0.1, shade: true }); fx('whoosh', P(12).t0 - 0.45, 0.6);
    foot(sc, 'G07', T(12, 5) - 0.12, P(13).t0 - 0.3, { from: 1, focus: L([0.45, 0.45], [0.45, 0.5]), zoom: [1.02, 1.08], fadeIn: 0.1, shade: true }); fx('swish', T(12, 5) - 0.15, 0.6);
    capWords(sc, 12, 0, 2, { ...CAP, hl: [2], end: T(12, 3) - 0.1 });
    const rc = el('div', 'card', '<div style="font-size:' + px(L(34, 36)) + ';font-weight:1000;color:var(--ink-2);letter-spacing:2px;border-bottom:3px dashed #c9d3e3;padding-bottom:12px;margin-bottom:6px"><i class="fa-solid fa-receipt" style="margin-left:12px;color:var(--blue-700)"></i>الفاتورة</div>', sc,
      { width: px(L(560, 760)), padding: '28px 36px 30px', color: 'var(--ink)', opacity: 0, transformOrigin: '50% 0%' });
    center(rc, L(1480, 540), L(420, 1610));
    rise(rc, T(12, 2) - 0.1, 40, 0.4, 'whoosh', 0.5);
    [['fa-moon', 'سهر', 3], ['fa-heart-crack', 'قلق', 4], ['fa-hourglass-end', 'شغل على قد الوقت اللي فاضل', 5]].forEach(([ic, tx, k]) => {
      const r = row(rc, '<i class="fa-solid ' + ic + '" style="color:var(--red);width:44px;text-align:center"></i>' + tx, L(38, 40), 18); rise(r, T(12, k) - 0.08, 14, 0.25, 'pop', 0.5); });
    out(rc, T(12, 11) - 0.2, 0.3);
    capWords(sc, 12, 11, 16, { ...CAP, hl: [14, 15, 16] });
  }
  // ١٣: حاجات مالهاش ليلة تسليم
  { const sc = scene(P(13).t0 - 0.3, P(14).t0 - 0.3, 'blue');
    capWords(sc, 13, 0, 6, { y: L(150, 220), size: L(60, 64), hl: [3, 4, 5], end: T(13, 16) - 0.1 });
    const B = L([SQ(1450, 520, 420), SQ(960, 520, 420), SQ(470, 520, 420)], [SQ(300, 620, 420), SQ(780, 620, 420), SQ(540, 1090, 420)]);
    const c1 = card(sc, 'G08', T(13, 7) - 0.15, P(14).t0 - 0.3, B[0], { focus: [0.5, 0.55], from: 3 });
    const c2 = card(sc, 'G09', T(13, 8) - 0.15, P(14).t0 - 0.3, B[1], { focus: [0.62, 0.4], zoom: [1.25, 1.3] });
    const tk = el('div', null, '<i class="fa-solid fa-comments" style="font-size:150px;color:var(--blue-700)"></i>', sc,
      { position: 'absolute', left: px(B[2].x), top: px(B[2].y), width: px(B[2].w), height: px(B[2].h), borderRadius: '36px', background: '#fff', boxShadow: 'var(--shadow-float)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0 });
    rise(tk, T(13, 12) - 0.15, 60, 0.45, 'whoosh', 0.6);
    const lb = ['الرياضة', 'الكورس', 'كلام محتاج يتقال'];
    const cs = B.map((b, j) => { const c = chip(sc, lb[j], 'sticky', b.x + b.w / 2, b.y + b.h + L(4, -10), L(34, 32)); c.style.zIndex = 4; return pop(c, T(13, [7, 8, 12][j]), j % 2 ? 2 : -2, 'pop', 0.6); });
    const n1 = cchip(sc, '<i class="fa-solid fa-xmark"></i>مفيش زنقة', 'white', L(1200, 540), L(900, 1440), T(13, 16) - 0.08, L(44, 44), -2); n1.style.color = 'var(--red)';
    const n2 = cchip(sc, '<i class="fa-solid fa-bolt"></i>مفيش شرارة', 'white', L(720, 540), L(900, 1560), T(13, 18) - 0.08, L(44, 44), 2); n2.style.color = 'var(--red)';
    // كله بيتزحلق لـ«مش دلوقتي»
    const fog = el('div', 'glasscard', '<div style="font-size:' + px(L(64, 66)) + ';font-weight:1000">مش دلوقتي</div>', sc, { width: px(L(620, 760)), height: px(L(170, 170)), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', filter: 'blur(1px)', opacity: 0, zIndex: 5 });
    center(fog, CX, L(880, 1700));
    tl.to([n1, n2], { opacity: 0, duration: 0.25 }, T(13, 20) - 0.3);
    pop(fog, T(13, 20) - 0.15, 0, 'pop', 0.6);
    [c1, c2, tk].forEach((c, j) => tl.to(c, { scale: 0.75, opacity: 0.3, filter: 'blur(5px)', y: L(80, 60), duration: 0.6, ease: 'power2.in' }, T(13, 21) + j * 0.1)); fx('swish', T(13, 21), 0.6);
    tl.to(cs, { opacity: 0.3, duration: 0.4 }, T(13, 21));
  }
  // ١٤: ميعاد إنت اللي عامله… دماغك بيتجاهله
  { const sc = scene(P(14).t0 - 0.3, P(15).t0 - 0.3);
    words(sc, 'طب ما أحط لنفسي *ميعاد* *بدري؟*', { y: L(200, 330), size: L(82, 78), at: [0, 1, 2, 3, 4, 5].map(k => T(14, k)) });
    const nt = sticky(sc, 'ميعادي:<br>الخميس', L(1240, 540), L(580, 800), L(380, 420), L(64, 64), T(14, 4) - 0.05, -4); fx('pen', T(14, 4) - 0.05, 0.8);
    const by = label(sc, '<i class="fa-solid fa-user" style="color:var(--blue-700)"></i>إنت اللي عامله', L(1240, 540), L(800, 1050), T(14, 12) - 0.1, 'ink', L(34, 36));
    const br = icon(sc, 'fa-brain', L(600, 540), L(600, 1350), L(200, 210), '#fff', T(14, 8) - 0.1, 'pop');
    const eye = el('div', 'pill glass', '<i class="fa-regular fa-face-rolling-eyes"></i>عارف', sc, { fontSize: px(L(36, 38)), opacity: 0 }); center(eye, L(600, 540), L(780, 1520)); rise(eye, T(14, 9) - 0.1, 20, 0.3);
    tl.to(nt, { x: L(700, 600), y: L(-260, -400), rotation: 40, opacity: 0, duration: 0.6, ease: 'power2.in' }, T(14, 15) - 0.05); fx('crumple', T(14, 15) - 0.05, 1);
    out(by, T(14, 15), 0.25);
    capWords(sc, 14, 15, 15, { y: L(880, 1680), size: L(70, 74), hl: [15] });
  }
  // ١٥: مش الزنقة الكبيرة… زنقة صغيرة بس حقيقية
  { const sc = scene(P(15).t0 - 0.3, P(16).t0 - 1.1);
    capWords(sc, 15, 0, 5, { y: L(170, 300), size: L(64, 66), end: T(15, 6) - 0.1 });
    const big = el('div', null, '<i class="fa-solid fa-moon"></i><span>ليلة التسليم</span>', sc, { position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '22px', width: px(L(1300, 900)), height: px(L(170, 170)), borderRadius: '30px', background: 'rgba(4,22,60,.55)', border: '3px solid rgba(255,255,255,.3)', color: '#fff', fontSize: px(L(56, 56)), fontWeight: 1000, opacity: 0 });
    center(big, CX, L(470, 700)); rise(big, T(15, 4) - 0.15, 40, 0.4, 'lowhit', 0.6);
    strike(big, T(15, 6) - 0.1);
    capWords(sc, 15, 6, 11, { y: L(170, 300), size: L(64, 66), end: T(15, 12) - 0.1 });
    const fake = cchip(sc, '<i class="fa-regular fa-calendar"></i>ميعاد وهمي', 'ghost', L(CX, 540), L(700, 960), T(15, 11) - 0.1, L(44, 46), -2); fake.style.color = '#fff'; fake.style.borderColor = 'rgba(255,255,255,.5)';
    strike(fake, T(15, 11) + 0.25);
    tl.to([big, fake], { opacity: 0, y: -30, duration: 0.3 }, T(15, 12) - 0.2);
    words(sc, 'الحل: *زنقة* *صغيرة…*', { y: L(250, 380), size: L(96, 92), at: [12, 14, 15].map(k => T(15, k)) });
    const n = 5, bw = L(220, 150), gap = L(30, 22), x0 = CX - (n * bw + (n - 1) * gap) / 2;
    for (let j = 0; j < n; j++) { const b = el('div', null, '<i class="fa-solid fa-bolt"></i>', sc, { position: 'absolute', left: px(x0 + j * (bw + gap)), top: px(L(500, 700)), width: px(bw), height: px(L(150, 150)), borderRadius: '26px', background: 'var(--sticky)', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: px(60), boxShadow: 'var(--shadow-card)', opacity: 0 });
      pop(b, T(15, 15) + j * 0.1, j % 2 ? 3 : -3, j ? null : 'pop', 0.6); }
    const real = cchip(sc, '<i class="fa-solid fa-check"></i>بس حقيقية', 'white', CX, L(800, 1000), T(15, 17) - 0.05, L(58, 60), -2, 'slap'); real.style.color = 'var(--green)';
  }

  // ════════ ١٦–٢١ · تعمل إيه؟ ════════
  { const t = P(16).t0 - 1.1, sc = scene(t, P(16).t0 - 0.05, 'light');
    words(sc, 'طب ~تعمل~ إيه؟', { y: L(400, 820), size: L(140, 130), color: 'var(--ink)', t: t + 0.05 }); fx('whoosh_big', t, 0.8); fx('slap', t + 0.3, 0.6);
  }
  chapter('تعمل إيه؟', P(16).t0 - 0.2, P(21).t1 + 0.3, 'ink', 'var(--sticky)');
  const SB = L({ x: 860, y: 200, w: 940 }, { x: 60, y: 230, w: 960 });
  // ١٦–١٧: قرّب الميعاد
  { const sc = scene(P(16).t0 - 0.1, P(18).t0 - 0.3);
    step(sc, 1, 'قرّب <span class="hl">الميعاد</span>', P(16).t0 - 0.05, SB, L(68, 66));
    card(sc, 'G10', T(16, 4) - 0.2, P(18).t0 - 0.3, L(SQ(470, 560, 600), SQ(540, 820, 600)), { focus: [0.6, 0.55], zoom: [1.2, 1.26], from: 4 });
    capWords(sc, 16, 4, 7, { y: L(470, 1220), size: L(46, 46), color: 'var(--ink-2)', shadow: false, x: L(880, null), width: L(900, null), end: T(16, 8) - 0.1 });
    const far = cchip(sc, '«البحث يوم ٢٠»', 'ghost', L(1330, 540), L(520, 1240), T(16, 12) - 0.1, L(50, 50), -2);
    strike(far, T(16, 15) - 0.1); tl.to(far, { opacity: 0.4, duration: 0.3 }, T(16, 15) + 0.3);
    const nr = sticky(sc, '«المقدمة النهارده<br>قبل الساعة ٨»', L(1330, 540), L(720, 1420), L(560, 640), L(50, 52), T(16, 16) - 0.1, 2); fx('pen', T(16, 16) - 0.1, 0.9);
    // ١٧: كل يوم فيه «دلوقتي» صغيرة
    tl.to([far, nr], { opacity: 0, y: -30, duration: 0.3 }, P(17).t0 - 0.2);
    const DY = ['السبت', 'الحد', 'الاتنين', 'التلات', 'الأربع'], dw = L(166, 172), dg = L(20, 20), wx0 = L(880, 540 - (5 * 172 + 4 * 20) / 2);
    const dayEls = DY.map((d, j) => { const b = el('div', 'card', '<div style="font-size:' + px(L(28, 28)) + ';font-weight:900;color:var(--ink-2)">' + d + '</div><div class="dot" style="width:44px;height:44px;border-radius:50%;background:var(--sticky);margin:16px auto 0;box-shadow:0 0 18px rgba(245,200,60,.9);opacity:0"></div>', sc,
      { position: 'absolute', left: px(wx0 + (4 - j) * (dw + dg)), top: px(L(520, 1220)), width: px(dw), padding: '22px 0 24px', textAlign: 'center', opacity: 0 });
      rise(b, P(17).t0 - 0.1 + j * 0.06, 30, 0.35, j ? null : 'whoosh', 0.5); return b; });
    dayEls.forEach((b, j) => { const d = b.querySelector('.dot'); tl.fromTo(d, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(2)' }, T(17, 4) - 0.1 + j * 0.12); });
    fx('pop', T(17, 4), 0.6);
    capWords(sc, 17, 0, 5, { y: L(800, 1500), size: L(54, 56), color: 'var(--ink)', shadow: false, x: L(880, null), width: L(900, null), hl: [4, 5], hlCls: 'hl', end: T(17, 6) - 0.1 });
    const bad = cchip(sc, '<i class="fa-solid fa-moon"></i>«دلوقتي» واحدة… آخر ليلة', 'ghost', L(1330, 540), L(800, 1500), T(17, 7) - 0.05, L(40, 42), -2);
    strike(bad, T(17, 12) - 0.05);
  }
  // ١٨–١٩: خلّي حد مستنيك
  { const sc = scene(P(18).t0 - 0.3, P(20).t0 - 0.3);
    step(sc, 2, 'خلّي حد <span class="hl">مستنيك</span>', P(18).t0 - 0.2, SB, L(66, 64));
    const BX = L(SQ(470, 560, 600), SQ(540, 820, 600));
    card(sc, 'G11', T(18, 5) - 0.2, T(18, 12) - 0.05, BX, { focus: [0.62, 0.45], zoom: [1.3, 1.36], from: 1, fadeOut: 0.15 });
    card(sc, 'G12', T(18, 12) - 0.15, P(20).t0 - 0.3, BX, { focus: [0.5, 0.45], zoom: [1.05, 1.1] });
    const msg = el('div', null, '<div style="font-size:' + px(L(44, 46)) + ';font-weight:900;line-height:1.35">«هبعتلك أول جزء<br>الساعة ٦»</div><div style="text-align:left;font-size:26px;color:#7aa9d6;margin-top:6px">6:00 <i class="fa-solid fa-check-double"></i></div>', sc,
      { position: 'absolute', padding: '26px 34px 16px', borderRadius: '34px 34px 8px 34px', background: '#DCF3FF', color: 'var(--ink)', boxShadow: 'var(--shadow-card)', opacity: 0 });
    center(msg, L(1330, 540), L(600, 1360)); rise(msg, T(18, 7) - 0.1, 30, 0.4, 'msg', 1);
    const call = cchip(sc, '<i class="fa-solid fa-video"></i>نشتغل مع بعض', 'white', L(1330, 540), L(840, 1560), T(18, 13) - 0.1, L(42, 44), 2);
    // ١٩: الميعاد اللي حد مستنيه… دماغك بيصدّقه أكتر
    tl.to([msg, call], { opacity: 0, duration: 0.25 }, P(19).t0 - 0.2);
    const a = cchip(sc, '<i class="fa-solid fa-user-clock"></i>ميعاد حد مستنيه', 'sticky', L(1330, 540), L(560, 1330), T(19, 0) - 0.05, L(52, 52), -2);
    const b = cchip(sc, '<i class="fa-solid fa-brain"></i>ميعاد في دماغك لوحدك', 'ghost', L(1330, 540), L(740, 1480), T(19, 10) - 0.1, L(40, 40), 2);
    tl.to(a, { scale: 1.12, duration: 0.3, ease: 'back.out(2)' }, T(19, 6) - 0.05); fx('pop', T(19, 6), 0.6);
    tl.to(b, { opacity: 0.45, scale: 0.9, duration: 0.3 }, T(19, 12));
    capWords(sc, 19, 5, 8, { y: L(880, 1640), size: L(56, 60), color: 'var(--ink)', shadow: false, x: L(880, null), width: L(900, null), hl: [6, 7], hlCls: 'hl' });
  }
  // ٢٠: اعمل سباق صغير — عدّاد ٢٥ دقيقة
  { const sc = scene(P(20).t0 - 0.3, P(21).t0 - 0.3);
    step(sc, 3, 'اعمل <span class="hl">سباق</span> صغير', P(20).t0 - 0.2, SB, L(66, 64));
    card(sc, 'G13', T(20, 5) - 0.2, P(21).t0 - 0.3, L(SQ(470, 560, 600), SQ(540, 820, 560)), { focus: [0.6, 0.42], zoom: [1.35, 1.4], from: 0 });
    const RS = L(300, 300), rg = el('div', null, '<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="100" cy="100" r="88" fill="#fff" stroke="#E3EAF4" stroke-width="14"/><circle class="arc" cx="100" cy="100" r="88" fill="none" stroke="#18B1FE" stroke-width="14" stroke-linecap="round" transform="rotate(-90 100 100)"/></svg><div class="tm" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-weight:1000;font-size:' + px(RS * 0.24) + ';color:var(--ink);direction:ltr;font-variant-numeric:tabular-nums">25:00</div>', sc,
      { position: 'absolute', width: px(RS), height: px(RS), opacity: 0, filter: 'drop-shadow(0 20px 40px rgba(2,40,100,.18))' });
    center(rg, L(1330, 540), L(620, 1270)); pop(rg, T(20, 8) - 0.15, 0, 'pop', 0.7);
    const arc = rg.querySelector('.arc'), tm = rg.querySelector('.tm'), C = 2 * Math.PI * 88; arc.style.strokeDasharray = C;
    const r0 = T(20, 10); fx('counter', r0, 0.8);
    dyn(t => { const s = Math.max(0, 1500 - Math.max(0, t - r0) * 9); arc.style.strokeDashoffset = C * (1 - s / 1500); tm.textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(Math.floor(s % 60)).padStart(2, '0'); });
    const goal = sticky(sc, '«هخلّص الجزء ده<br>قبل ما يخلص»', L(1330, 540), L(900, 1620), L(560, 640), L(48, 50), T(20, 13) - 0.1, -2); fx('paper', T(20, 13) - 0.1, 0.8);
  }
  // ٢١: نفس شغل الزنقة… من غير سهر ولا قلق — زنقة ← راحة ← زنقة
  { const sc = scene(P(21).t0 - 0.3, P(22).t0 - 0.5);
    card(sc, 'G14', P(21).t0 - 0.2, P(22).t0 - 0.5, L(SQ(470, 560, 600), SQ(540, 640, 560)), { focus: [0.45, 0.45], zoom: [1.1, 1.16], from: 1 }); fx('typing', P(21).t0, 0.45);
    capWords(sc, 21, 0, 4, { y: L(180, 1000), size: L(58, 58), color: 'var(--ink)', shadow: false, x: L(880, null), width: L(900, null), hl: [4], hlCls: 'hl', end: T(21, 16) - 0.2 });
    const lst = el('div', 'card', null, sc, { width: px(L(820, 900)), padding: '18px 40px 30px', color: 'var(--ink)', opacity: 0 }); center(lst, L(1330, 540), L(480, 1250));
    rise(lst, T(21, 5) - 0.2, 30, 0.35, 'whoosh', 0.5);
    [['fa-check', 'var(--green)', 'الوقت باين', 5], ['fa-check', 'var(--green)', 'النهاية قريبة', 7], ['fa-xmark', 'var(--red)', 'من غير سهر', 12], ['fa-xmark', 'var(--red)', 'ومن غير قلق', 15]].forEach(([ic, c, tx, k]) => {
      const r = row(lst, '<i class="fa-solid ' + ic + '" style="color:' + c + ';width:44px;text-align:center"></i>' + tx, L(42, 44), 14); rise(r, T(21, k) - 0.08, 14, 0.25, 'pop', 0.5); });
    const CY = L([[1640, 820], [1330, 820], [1020, 820]], [[840, 1560], [540, 1560], [240, 1560]]);
    const cyc = [['<i class="fa-solid fa-bolt"></i>زنقة', 'sticky', 16], ['<i class="fa-solid fa-mug-hot"></i>راحة', 'white', 18], ['<i class="fa-solid fa-bolt"></i>زنقة', 'sticky', 20]];
    tl.to(lst, { opacity: 0.4, duration: 0.3 }, T(21, 16) - 0.1);
    cyc.forEach(([tx, cls, k], j) => cchip(sc, tx, cls, CY[j][0], CY[j][1], T(21, k) - 0.05, L(44, 44), j % 2 ? 2 : -2));
    [0, 1].forEach(j => { const a = el('i', 'fa-solid fa-arrow-left', null, sc, { position: 'absolute', fontSize: '40px', color: 'var(--ink-2)', opacity: 0 }); center(a, (CY[j][0] + CY[j + 1][0]) / 2, CY[j][1]); pop(a, T(21, [18, 20][j]) - 0.2, 0, null); });
  }
  // ════════ ٢٢ · الواقع ════════
  { const sc = scene(P(22).t0 - 0.5, P(23).t0 - 0.3, 'real');
    const r = foot(sc, 'G01', P(22).t0 - 0.5, P(23).t0 - 0.3, { from: 4.2, focus: L([0.5, 0.45], [0.58, 0.45]), zoom: [1.08, 1.0], fadeIn: 0.5, shade: true }); fx('whoosh', P(22).t0 - 0.55, 0.6); fx('ticktock', P(22).t0 - 0.3, 0.8);
    capWords(sc, 22, 0, 7, { ...CAP, hl: [6, 7], end: T(22, 8) - 0.1 });
    capWords(sc, 22, 8, 13, { ...CAP, hl: [12, 13], end: T(22, 14) - 0.1 });
    const big = chip(sc, '<i class="fa-solid fa-moon"></i>ليلة التسليم', 'glass', L(1640, 540), L(230, 330), L(48, 48)); big.style.background = 'rgba(6,16,36,.55)';
    pop(big, T(22, 6) - 0.1, -2, 'pop', 0.6); strike(big, T(22, 12) - 0.1);
    const nw = sticky(sc, '«دلوقتي» صغيرة:<br>النهارده ٨:٠٠', L(1640, 540), L(250, 340), L(500, 560), L(52, 54), T(22, 15) - 0.1, -3); fx('paper', T(22, 15) - 0.1, 0.9);
    tl.to(big, { opacity: 0, duration: 0.25 }, T(22, 15) - 0.2);
    capWords(sc, 22, 14, 17, { ...CAP, hl: [15, 16] });
  }
  // ════════ ٢٣–٢٥ ════════
  { const sc = scene(P(23).t0 - 0.3, P(24).t0 - 0.2, 'blue');
    words(sc, 'إنت مش بتحب الضغط…', { y: L(320, 680), size: L(110, 84), at: [0, 1, 2, 3].map(k => T(23, k)) });
    words(sc, 'إنت بس محتاج *«دلوقتي».*', { y: L(500, 860), size: L(110, 80), at: [4, 5, 6, 7].map(k => T(23, k)) });
    const b = icon(sc, 'fa-bolt', CX, L(800, 1250), L(120, 140), 'var(--sticky)', T(23, 7) + 0.1, 'impact'); b.style.filter = 'drop-shadow(0 0 30px rgba(245,230,163,.8))';
  }
  { const sc = scene(P(24).t0 - 0.2, P(25).t0 - 0.2);
    const ph = el('div', 'phone', '<div><img src="../../../etizan-posts/template/assets/screens/adult_pomodoro.png"></div>', sc, { width: px(L(300, 340)), height: px(L(624, 706)) });
    center(ph, L(560, 540), L(560, 1180)); tl.fromTo(ph, { opacity: 0, y: 160, rotation: 0 }, { opacity: 1, y: 0, rotation: -4, duration: 0.6, ease: 'power3.out' }, T(24, 5) - 0.3); fx('whoosh', T(24, 5) - 0.3, 0.6);
    const lg = el('div', null, '<img src="../../../etizan-explainer-video/pipeline/assets/logo-full.png" style="height:' + px(L(110, 120)) + ';display:block">', sc, { position: 'absolute', padding: '22px 50px', background: '#fff', borderRadius: '56px', boxShadow: 'var(--shadow-card)', opacity: 0 });
    center(lg, L(1300, 540), L(560, 560)); pop(lg, T(24, 8) - 0.2, 0, 'pop', 0.7);
    capWords(sc, 24, 0, 4, { y: L(330, 260), size: L(58, 62), color: 'var(--sky-100)', x: L(960, null), width: L(860, null), end: T(24, 5) - 0.1 });
    const c1 = chip(sc, '<i class="fa-solid fa-stopwatch"></i>عدّاد قدام عينك', 'white', L(1300, 330), L(780, 1660), L(40, 36)); pop(c1, T(24, 10) - 0.1, -2, 'pop', 0.6);
    const c2 = chip(sc, '<i class="fa-solid fa-bullseye"></i>حاجة واحدة بس', 'sticky', L(1300, 760), L(900, 1660), L(40, 36)); pop(c2, T(24, 13) - 0.1, 2, 'pop', 0.6);
  }
  { const sc = scene(P(25).t0 - 0.2, null);
    const sp = el('div', 'pill glass', '<span class="dot"></span>ليه دماغي بتعمل كده؟', sc, { fontSize: px(L(32, 36)), opacity: 0 }); center(sp, L(1420, 540), L(200, 360)); rise(sp, P(25).t0, -20);
    const nx = el('div', 'pill ink', 'الحلقة الجاية', sc, { fontSize: px(L(30, 34)), opacity: 0 }); center(nx, L(1420, 540), L(290, 460)); rise(nx, T(25, 1) - 0.1, -20);
    const q = words(sc, 'ليه بنسى حاجة… | كنت *بفكر* فيها | من *ثانيتين؟*', { y: L(330, 580), size: L(76, 80), at: [3, 4, 5, 6, 7, 8, 9, 10].map(k => T(25, k)) });
    if (H) Object.assign(q.style, { left: 'auto', right: '100px', width: '860px', padding: 0, textAlign: 'center' });
    const lg = el('div', null, '<img src="../../../etizan-explainer-video/pipeline/assets/logo-full.png" style="height:' + px(L(80, 96)) + ';display:block">', sc, { position: 'absolute', padding: '18px 40px', background: '#fff', borderRadius: '44px', boxShadow: 'var(--shadow-card)', opacity: 0 });
    center(lg, L(1420, 540), L(820, 1560)); rise(lg, P(25).t1 + 0.3, 20);
    if (H) {
      const es = el('div', null, null, sc, { position: 'absolute', left: '110px', top: '170px', width: '760px', height: '428px', borderRadius: '28px', border: '4px dashed rgba(255,255,255,.28)', opacity: 0 });
      const sb = el('div', null, null, sc, { position: 'absolute', left: '370px', top: '650px', width: '240px', height: '240px', borderRadius: '50%', border: '4px dashed rgba(255,255,255,.28)', opacity: 0 });
      rise(es, P(25).t1 + 0.4, 20); rise(sb, P(25).t1 + 0.6, 20);
    } else {
      const fol = el('div', 'pill', '<i class="fa-solid fa-bell"></i>تابع السلسلة', sc, { background: 'var(--sticky)', color: 'var(--ink)', fontSize: '40px', opacity: 0, boxShadow: 'var(--shadow-card)' }); center(fol, 540, 1350); pop(fol, P(25).t1 + 0.5, -2, 'pop', 0.6);
    }
    tl.to('#stage', { opacity: 0, duration: 0.6 }, DUR - 0.6);
  }
} };
