// الحلقة ١٠ (آخر الموسم) — «ليه مهما عملت… بحس إني مقصّر؟»
// كل حركة مربوطة بكلمتها: T(فقرة، رقم الكلمة) — الفقرات ١..٢٣ زي script.txt. L(عريض، طولي) لكل مكان.
// التشبيه الثابت: مسطرة جوّاك اتعملت من سنين — خط «المطلوب» بيتزق لفوق، واللي خلص ما بيتحسبش، واللي فاضل بيتحسب مرتين.
window.EPISODE = { n: 10, gaps: { 4: 3.0, 6: 0.5, 8: 0.3, 9: 0.4, 10: 0.4, 11: 0.3, 13: 1.1, 15: 0.3, 17: 0.3, 19: 0.6, 20: 0.3, 21: 0.3, 23: 7.5 }, build(A) {
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
  const NS = 'http://www.w3.org/2000/svg';
  // ── المسطرة: مسطرة طولية + عمود «اللي عملته» + خط أحمر «المطلوب» بيتزق لفوق ──
  function ruler(sc, B) {   // B = {x: المسطرة، y0: الصفر، y1: آخرها، cx/cw: العمود}
    const s = document.createElementNS(NS, 'svg'); s.setAttribute('width', L(1920, 1080)); s.setAttribute('height', L(1080, 1920)); s.style.cssText = 'position:absolute;left:0;top:0;overflow:visible'; sc.appendChild(s);
    const mk = (tag, at, p = s) => { const e = document.createElementNS(NS, tag); for (const k in at) e.setAttribute(k, at[k]); p.appendChild(e); return e; };
    const Y = v => B.y0 - v * (B.y0 - B.y1);
    const g = mk('g', {});
    mk('rect', { x: B.x - 44, y: B.y1 - 34, width: 88, height: B.y0 - B.y1 + 68, rx: 12, fill: '#F5C542' }, g);
    for (let i = 0; i <= 20; i++) mk('line', { x1: B.x + 44, y1: Y(i / 20), x2: B.x + 44 - (i % 5 ? 22 : 44), y2: Y(i / 20), stroke: '#8A6410', 'stroke-width': i % 5 ? 3 : 5 }, g);
    const col = mk('rect', { x: B.cx, width: B.cw, rx: 14, fill: '#9AE6B4' });
    const gap = mk('rect', { x: B.cx, width: B.cw, fill: 'rgba(242,84,91,.28)', stroke: '#F2545B', 'stroke-width': 3, 'stroke-dasharray': '10 8' });
    const gap2 = mk('rect', { x: B.cx + B.cw + 18, width: B.cw * 0.6, fill: 'rgba(242,84,91,.28)', stroke: '#F2545B', 'stroke-width': 3, 'stroke-dasharray': '10 8' });
    const req = mk('line', { x1: B.x - 70, x2: B.cx + B.cw + 120, stroke: '#F2545B', 'stroke-width': 7, 'stroke-dasharray': '18 12', 'stroke-linecap': 'round' });
    const any = mk('line', { x1: B.x - 70, x2: B.cx + B.cw + 120, stroke: 'rgba(255,255,255,.55)', 'stroke-width': 4, 'stroke-dasharray': '8 10' });
    const st = { h: 0, r: 0.62, g2: 0 };
    const lab = el('div', 'pill', '<i class="fa-solid fa-flag"></i>المطلوب', sc, { background: '#F2545B', color: '#fff', fontSize: px(L(28, 30)), opacity: 0 });
    const render = () => { col.setAttribute('y', Y(st.h)); col.setAttribute('height', Math.max(0, B.y0 - Y(st.h)));
      gap.setAttribute('y', Y(st.r)); gap.setAttribute('height', Math.max(0, Y(st.h) - Y(st.r)));
      const gh = (Y(st.h) - Y(st.r)) * st.g2; gap2.setAttribute('y', Y(st.h) - gh); gap2.setAttribute('height', Math.max(0, gh));
      req.setAttribute('y1', Y(st.r)); req.setAttribute('y2', Y(st.r));
      center(lab, B.cx + B.cw + 120 + L(80, 70), Y(st.r)); };
    any.setAttribute('y1', Y(0.84)); any.setAttribute('y2', Y(0.84));
    render(); dyn(render);
    gsap.set([g, col, gap, gap2, req, any], { opacity: 0 });
    return { s, g, col, gap, gap2, req, any, lab, st, Y, B };
  }

  // ════════ ١–٤ · الواقع ════════
  const T4 = T(4, 2) - 0.2;
  { const sc = scene(0, T4 + 0.6, 'real');
    // ١: خلّصت حاجات كتير… وبالليل: «بس ما ذاكرتش»
    foot(sc, 'U01', 0, T(1, 7) - 0.1, { from: 2, focus: L([0.45, 0.4], [0.4, 0.4]), zoom: [1.0, 1.06], fadeIn: 0.6, fadeOut: 0.1, shade: true });
    const CK = L([[1480, 220], [1480, 310], [1480, 400]], [[540, 260], [540, 340], [540, 420]]);
    const ck = [['ردّيت على الإيميلات', 4], ['روّحت المشوار', 7], ['طبخت', 9]].map(([tx, k], j) => cchip(sc, '<i class="fa-solid fa-check" style="color:#1F8A5A"></i>' + tx, 'white', CK[j][0], CK[j][1], T(1, k) - 0.08, L(40, 40), j % 2 ? 2 : -2));
    foot(sc, 'U02', T(1, 7) - 0.12, T(1, 10) - 0.1, { from: 1, focus: [0.5, 0.5], zoom: [1.05, 1.1], fadeIn: 0.1, fadeOut: 0.1, shade: true }); fx('swish', T(1, 7) - 0.15, 0.4);
    capWords(sc, 1, 0, 9, { ...CAP, hl: [2, 3], end: T(1, 10) - 0.1 });
    tl.to(ck, { opacity: 0, duration: 0.3 }, T(1, 10) - 0.2);
    foot(sc, 'U03', T(1, 10) - 0.12, P(2).t0 - 0.1, { from: 1, focus: L([0.35, 0.4], [0.3, 0.4]), zoom: [1.05, 1.1], fadeIn: 0.1, fadeOut: 0.1, shade: true }); fx('ticktock', T(1, 10), 0.3);
    const nb = chip(sc, '«بس ما ذاكرتش»', 'glass', L(1400, 540), L(300, 320), L(56, 54)); nb.style.background = 'rgba(6,16,36,.6)'; pop(nb, T(1, 19) - 0.1, -2, 'lowhit', 0.6);
    capWords(sc, 1, 10, 21, { ...CAP, hl: [20, 21], end: P(2).t0 - 0.1 });
    tl.to(nb, { opacity: 0, duration: 0.25 }, P(2).t0 - 0.2);
    // ٢: «برافو عليك»… «ما عملتش حاجة يعني»
    foot(sc, 'U04', P(2).t0 - 0.12, P(3).t0 - 0.1, { from: 0.4, speed: 0.78, focus: [0.5, 0.45], zoom: [1.05, 1.12], fadeIn: 0.1, fadeOut: 0.1, shade: true }); fx('whoosh', P(2).t0 - 0.15, 0.5);
    const br = el('div', null, '«برافو عليك» <i class="fa-solid fa-thumbs-up" style="color:#F5C542"></i>', sc, { position: 'absolute', padding: '22px 34px', borderRadius: '34px 34px 8px 34px', background: '#fff', color: 'var(--ink)', fontWeight: 900, fontSize: px(L(48, 46)), boxShadow: 'var(--shadow-card)', opacity: 0, whiteSpace: 'nowrap' });
    center(br, L(600, 540), L(260, 290)); rise(br, T(2, 2) - 0.1, 30, 0.35, 'pop', 0.7);
    const rp = chip(sc, '<i class="fa-solid fa-comment-slash"></i>«ما عملتش حاجة يعني»', 'glass', L(1360, 540), L(420, 430), L(44, 42)); rp.style.background = 'rgba(6,16,36,.6)'; pop(rp, T(2, 7) - 0.1, 2, 'pop', 0.5);
    capWords(sc, 2, 0, 10, { ...CAP, hl: [7, 8, 9], end: T(2, 11) - 0.1 });
    capWords(sc, 2, 11, 18, { ...CAP, hl: [16, 17, 18], end: P(3).t0 - 0.1 });
    tl.to([br, rp], { opacity: 0, duration: 0.25 }, P(3).t0 - 0.2);
    // ٣: صوت جوّاك… «كان ممكن أحسن» «لسه مش كفاية» (وبيتجمّد عند «طب ليه؟»)
    const fz = T(4, 0);
    const r = foot(sc, 'U05', P(3).t0 - 0.15, T4 + 0.25, { from: 4, speed: 0.8, freeze: fz, focus: L([0.5, 0.35], [0.5, 0.35]), zoom: [1.0, 1.06], fadeIn: 0.3, shade: true }); fx('whoosh', P(3).t0 - 0.2, 0.5);
    const v1 = chip(sc, '«كان ممكن أحسن»', 'ghost', L(1460, 540), L(300, 300), L(46, 44)); Object.assign(v1.style, { color: '#fff', borderColor: 'rgba(255,255,255,.5)' }); pop(v1, T(3, 6) - 0.1, -2, 'swish', 0.4);
    const v2 = chip(sc, '«لسه مش كفاية»', 'ghost', L(460, 540), L(420, 420), L(46, 44)); Object.assign(v2.style, { color: '#fff', borderColor: 'rgba(255,255,255,.5)' }); pop(v2, T(3, 9) - 0.1, 2, 'swish', 0.4);
    capWords(sc, 3, 0, 11, { ...CAP, hl: [3, 4, 9, 10, 11], end: fz - 0.1 });
    tl.to([v1, v2], { opacity: 0, duration: 0.2 }, fz - 0.2);
    flash(fz, 0.35); fx('lowhit', fz, 0.8); fx('reverse', fz - 0.7, 0.5);
    tl.to(r.querySelector('.src > img'), { filter: 'grayscale(1) brightness(.8)', duration: 0.4 }, fz);
    tl.to(r.tint, { opacity: 0.82, duration: 0.7 }, fz + 0.15);
    trace(r, ['M605 440 C605 20, 1285 20, 1285 440 C1285 860, 605 860, 605 440 Z', 'M1340 330 C1385 380, 1385 500, 1340 550 M1410 280 C1480 360, 1480 520, 1410 600'], fz + 0.25, 0.8);
    fx('swish', fz + 0.3, 0.5);
    capWords(sc, 4, 0, 1, { ...CAP, y: L(470, 1420), size: L(110, 110), hl: [1], end: T4 + 0.05 });
  }
  // ════════ كارت العنوان ════════
  { const sc = scene(T4, P(5).t0 - 0.35, 'blue');
    const q = el('div', 'qmark', '؟', sc, { fontSize: px(L(1000, 760)), opacity: 0 }); Object.assign(q.style, H ? { left: '80px', top: '30px' } : { left: '160px', top: '1060px' });
    tl.fromTo(q, { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, T4 + 0.1);
    const sp = el('div', 'pill glass', '<span class="dot"></span>ليه دماغي بتعمل كده؟', sc, { fontSize: px(L(34, 38)), opacity: 0 });
    if (H) Object.assign(sp.style, { right: '160px', top: '230px' }); else center(sp, 540, 520); rise(sp, T4 + 0.05, -20);
    const ep = el('div', 'pill ink', 'الحلقة ١٠ · آخر الموسم', sc, { fontSize: px(L(28, 32)), padding: '6px 24px', opacity: 0 });
    if (H) Object.assign(ep.style, { right: '160px', top: '320px' }); else center(ep, 540, 610); rise(ep, T4 + 0.25, -20);
    const t1 = words(sc, 'ليه مهما عملت…', { y: L(430, 760), size: L(112, 96), at: [2, 3, 4].map(k => T(4, k)) });
    const t2 = words(sc, 'بحس إني *مقصّر؟*', { y: L(580, 920), size: L(118, 104), at: [5, 6, 7].map(k => T(4, k)) });
    if (H) [t1, t2].forEach(x => Object.assign(x.style, { left: 'auto', right: '160px', textAlign: 'right', padding: 0 }));
    fx('impact', T(4, 7) + 0.4, 0.9); flash(T(4, 7) + 0.4, 0.15);
    tl.to([t1, t2, sp, ep], { opacity: 0, y: -40, duration: 0.35 }, P(5).t0 - 0.6); fx('whoosh_big', P(5).t0 - 0.6, 0.8);
  }
  // ════════ ٥–٦ · اللي بيتقال لك (فاتح) ════════
  { const sc = scene(P(5).t0 - 0.35, P(7).t0 - 0.35, 'light');
    chapter('اللي بيتقال لك', P(5).t0 - 0.2, P(7).t0 - 0.4, 'ink', 'var(--sky-400)');
    capWords(sc, 5, 0, 1, { y: L(170, 220), size: L(54, 58), color: 'var(--ink-2)', shadow: false, end: P(6).t0 - 0.1 });
    const PA = L([[1400, 340, -3], [880, 390, 2], [1160, 530, -2]], [[540, 420, -3], [540, 570, 2], [540, 720, -2]]);
    const cs = [['«إنت بتقسى على نفسك»', 2], ['«بطّل تفكر كده»', 6], ['«إنت كويس والله»', 9]].map(([q, k], j) => cchip(sc, q, 'ghost', PA[j][0], PA[j][1], T(5, k) - 0.08, L(48, 44), PA[j][2], 'slap'));
    // ٦: كلام حلو… بس مش بيدخل — الصوت اللي جوّه أقدم
    tl.to(cs, { opacity: 0.3, scale: 0.9, duration: 0.4 }, P(6).t0);
    tl.to(cs, { y: -30, opacity: 0.15, duration: 0.3, stagger: 0.08 }, T(6, 3)); fx('reverse', T(6, 3), 0.4);
    capWords(sc, 6, 0, 4, { y: L(720, 920), size: L(52, 54), color: 'var(--ink-2)', shadow: false, hl: [3, 4], hlCls: 'hl', end: T(6, 5) - 0.1 });
    cchip(sc, '<i class="fa-solid fa-clock-rotate-left"></i>الصوت اللي جوّه أقدم', 'sticky', CX, L(760, 1100), T(6, 9) - 0.1, L(56, 54), 2, 'slap');
    capWords(sc, 6, 5, 13, { y: L(880, 1260), size: L(50, 52), color: 'var(--ink-2)', shadow: false, hl: [9, 10], hlCls: 'hl' });
  }
  // ════════ ٧–١٣ · اللي بيحصل جوّه ════════
  chapter('اللي بيحصل جوّه', P(7).t0 - 0.2, P(13).t1 + 0.2);
  const TOP = { y: L(150, 200), size: L(58, 58) };
  // ٧–١٠: المسطرة
  { const sc = scene(P(7).t0 - 0.35, P(11).t0 - 0.4, 'blue');
    const RB = L({ x: 640, y0: 960, y1: 400, cx: 760, cw: 150 }, { x: 250, y0: 1660, y1: 930, cx: 370, cw: 150 });
    const R = ruler(sc, RB);
    capWords(sc, 7, 0, 2, { ...TOP, end: T(7, 3) - 0.1 });
    card(sc, 'U06', T(7, 3) - 0.2, P(8).t0 - 0.2, L(SQ(1580, 600, 380), SQ(540, 600, 400)), { from: 6, speed: 0.8, focus: [0.5, 0.5], zoom: [1.1, 1.16], fadeOut: 0.2 });
    tl.fromTo(R.g, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, T(7, 6) - 0.2); fx('whoosh', T(7, 6) - 0.2, 0.6);
    tl.to(R.col, { opacity: 1, duration: 0.2 }, T(7, 7) - 0.1); tl.to(R.st, { h: 0.55, duration: 0.9, ease: 'power2.out' }, T(7, 7)); fx('rise', T(7, 7), 0.4);
    const you = label(sc, 'إنت', RB.cx + RB.cw / 2, RB.y0 + L(50, 56), T(7, 7), 'glass', L(30, 32));
    tl.to([R.req, R.lab], { opacity: 1, duration: 0.3 }, T(7, 10));
    capWords(sc, 7, 3, 11, { ...TOP, hl: [6, 7], end: P(8).t0 - 0.1 });
    // ٨: اتعملت من سنين — «إنت كسلان»، «إنت مش بتركّز»، «ليه مش زي أخوك؟»
    const QX = L(1450, 780), QY = L([380, 500, 620], [1060, 1190, 1320]);
    const qs = [['«إنت كسلان»', 10], ['«إنت مش بتركّز»', 12], ['«ليه مش زي أخوك؟»', 15]].map(([q, k], j) => { const c = cchip(sc, q, 'white', QX, QY[j], T(8, k) - 0.08, L(42, 36), j % 2 ? 2 : -2, 'slap'); c.style.color = 'var(--red)'; return c; });
    const yrs = label(sc, '<i class="fa-solid fa-clock-rotate-left"></i>من سنين', QX, L(270, 960), T(8, 6) - 0.1, 'glass', L(30, 32));
    capWords(sc, 8, 0, 18, { ...TOP, hl: [5, 7, 11, 14, 18], end: P(9).t0 - 0.1 });
    // ٩: كل جملة زقّت الخط لفوق… لحد ما بقى أعلى من اللي أي حد يقدر يعمله
    qs.forEach((c, j) => tl.to(c, { x: L(-260, -120), y: '-=40', opacity: 0, scale: 0.6, duration: 0.45, ease: 'power2.in' }, T(9, 4) + j * 0.45));
    [0.74, 0.86, 0.97].forEach((v, j) => { tl.to(R.st, { r: v, duration: 0.35, ease: 'back.out(2)' }, T(9, 4) + j * 0.45 + 0.3); fx('slap', T(9, 4) + j * 0.45 + 0.3, 0.4); });
    tl.to(yrs, { opacity: 0, duration: 0.3 }, T(9, 6));
    tl.to(R.any, { opacity: 1, duration: 0.4 }, T(9, 15) - 0.1);
    const anyL = label(sc, 'اللي أي حد يقدر يعمله', RB.cx + RB.cw + L(280, 220), R.Y(0.84), T(9, 15) - 0.1, 'glass', L(26, 26));
    tl.to(R.st, { r: 1.04, duration: 0.6, ease: 'power2.out' }, T(9, 13) - 0.1); fx('rise', T(9, 13), 0.5);
    capWords(sc, 9, 0, 19, { ...TOP, hl: [4, 5, 7, 13], end: P(10).t0 - 0.1 });
    // ١٠: بتعدّ اللي ما اتعملش بس — اللي خلص ما بيتحسبش، واللي فاضل بيتحسب مرتين
    tl.to(R.any, { opacity: 0.3, duration: 0.3 }, P(10).t0); tl.to(anyL, { opacity: 0, duration: 0.3 }, P(10).t0);
    tl.to(R.gap, { opacity: 1, duration: 0.4 }, T(10, 3) - 0.1); fx('marker', T(10, 3), 0.5);
    const gl = label(sc, 'اللي ما اتعملش', RB.x - L(170, 0), R.Y(L(0.8, 0.7)), T(10, 4) - 0.1, 'ink', L(26, 28));
    tl.to(R.col, { attr: { fill: '#8FA3BF' }, opacity: 0.35, duration: 0.5 }, T(10, 9) - 0.1); fx('reverse', T(10, 9), 0.5);
    const zero = cchip(sc, '<i class="fa-solid fa-xmark"></i>ما بيتحسبش', 'ghost', RB.cx + RB.cw / 2, R.Y(0.28), T(10, 9) - 0.05, L(30, 30), -3); Object.assign(zero.style, { color: '#fff', borderColor: 'rgba(255,255,255,.5)' });
    tl.to(R.gap2, { opacity: 1, duration: 0.2 }, T(10, 13) - 0.2); tl.to(R.st, { g2: 1, duration: 0.6, ease: 'power2.out' }, T(10, 13) - 0.1); fx('lowhit', T(10, 13), 0.6);
    const x2 = cchip(sc, '×٢', 'sticky', RB.cx + RB.cw * 1.6 + 60, R.Y(0.68), T(10, 14) - 0.1, L(40, 40), 3, 'slap');
    capWords(sc, 10, 0, 14, { ...TOP, hl: [5, 10, 14], end: P(11).t0 - 0.5 });
  }
  // ١١: مسطرة معمولة لدماغ تاني — مش محتاج شرارة، ولا ترابيزته صغيرة، ولا ميزانه بيتهز
  { const sc = scene(P(11).t0 - 0.4, P(12).t0 - 0.3, 'blue');
    capWords(sc, 11, 0, 7, { ...TOP, hl: [4, 6, 7], end: T(11, 8) - 0.1 });
    const rl = el('div', null, '<i class="fa-solid fa-ruler-vertical" style="color:#F5C542"></i><span>مسطرة</span><i class="fa-solid fa-arrow-left" style="opacity:.6"></i><span style="opacity:.8">دماغ تاني</span>', sc,
      { position: 'absolute', display: 'flex', alignItems: 'center', gap: '22px', fontWeight: 1000, fontSize: px(L(60, 50)), color: '#fff', opacity: 0, whiteSpace: 'nowrap' });
    center(rl, CX, L(380, 520)); rise(rl, T(11, 4) - 0.1, 20, 0.4, 'whoosh', 0.6);
    const CB3 = L([[1440, 680], [960, 680], [480, 680]], [[540, 760], [540, 1070], [540, 1380]]);
    [['fa-fire', 'مش محتاج شرارة', 'الحلقة ١', 11], ['fa-table', 'ترابيزته مش صغيرة', 'الحلقة ٤', 15], ['fa-scale-balanced', 'ميزانه ما بيتهزش', 'الحلقة ٩', 18]].forEach(([ic, tx, ep, k], j) => {
      const c = el('div', null, '<div style="font-size:' + px(L(54, 56)) + ';color:#F5C542;margin-bottom:10px"><i class="fa-solid ' + ic + '"></i></div><div>' + tx + '</div><div style="font-size:' + px(L(24, 26)) + ';opacity:.7;margin-top:6px">' + ep + '</div>', sc,
        { position: 'absolute', width: px(L(380, 560)), padding: '26px 20px', borderRadius: '28px', background: 'rgba(255,255,255,.12)', border: '2px solid rgba(255,255,255,.25)', color: '#fff', fontWeight: 900, fontSize: px(L(36, 38)), textAlign: 'center', opacity: 0 });
      center(c, CB3[j][0], CB3[j][1]); pop(c, T(11, k) - 0.15, j % 2 ? 2 : -2, 'pop', 0.5); });
    capWords(sc, 11, 8, 19, { ...TOP, y: L(920, 1560), hl: [11, 15, 18] });
  }
  // ١٢–١٣: مش مقصّر… المسطرة نفسها معووجة — غيّر المسطرة مش نفسك؛ اتعلّمت… تتعلّم من جديد
  { const sc = scene(P(12).t0 - 0.3, P(14).t0 - 1.1);
    const w = words(sc, 'المشكلة مش إنك ~مقصّر~', { y: L(170, 300), size: L(76, 60), at: [0, 1, 2, 3].map(k => T(12, k)) });
    strike(w.querySelectorAll('.w')[3], T(12, 4) - 0.1, 8);
    const r1 = el('div', null, '<i class="fa-solid fa-ruler" style="color:#F5C542;transform:rotate(-14deg) skewX(-18deg)"></i><span>المسطرة نفسها</span><span style="color:#F5E6A3">معووجة</span>', sc,
      { position: 'absolute', display: 'flex', alignItems: 'center', gap: '22px', fontWeight: 1000, fontSize: px(L(62, 52)), color: '#fff', opacity: 0, whiteSpace: 'nowrap' });
    center(r1, CX, L(420, 560)); rise(r1, T(12, 6) - 0.1, 20, 0.4, 'whoosh', 0.6);
    const w2 = words(sc, 'غيّر *المسطرة…* مش ~نفسك~', { y: L(530, 700), size: L(72, 64), color: 'var(--sky-100)', at: [11, 12, 13, 15].map(k => T(12, k)) });
    strike(w2.querySelectorAll('.w')[3], T(12, 15) + 0.2, 8);
    // ١٣
    tl.to([w, r1, w2], { opacity: 0.25, duration: 0.3 }, P(13).t0 - 0.15);
    words(sc, 'والخبر الحلو؟', { y: L(700, 900), size: L(56, 60), color: 'var(--sky-100)', at: [0, 1].map(k => T(13, k)) });
    const a1 = cchip(sc, '<i class="fa-solid fa-graduation-cap"></i>اتعلّمت', 'ghost', L(1260, 540), L(860, 1060), T(13, 5) - 0.1, L(48, 46), -2); Object.assign(a1.style, { color: '#fff', borderColor: 'rgba(255,255,255,.5)' });
    cchip(sc, '<i class="fa-solid fa-rotate"></i>تتعلّم من جديد', 'sticky', L(640, 540), L(860, 1200), T(13, 8) - 0.1, L(56, 56), 2, 'slap');
  }

  // ════════ ١٤–١٩ · تعمل إيه؟ ════════
  { const t = P(14).t0 - 1.1, sc = scene(t, P(14).t0 - 0.05, 'light');
    words(sc, 'طب ~تعمل~ إيه؟', { y: L(400, 820), size: L(140, 130), color: 'var(--ink)', t: t + 0.05 }); fx('whoosh_big', t, 0.8); fx('slap', t + 0.3, 0.6);
  }
  chapter('تعمل إيه؟', P(14).t0 - 0.2, P(19).t1 + 0.3, 'ink', 'var(--sticky)');
  const SB = L({ x: 860, y: 200, w: 940 }, { x: 60, y: 230, w: 960 });
  const CB = L(SQ(470, 560, 600), SQ(540, 820, 560));
  const RX = L(1330, 540);
  let sc0;
  const capR = (n, a, b, y, o = {}) => capWords(sc0, n, a, b, { y, size: L(46, 48), color: 'var(--ink)', shadow: false, x: L(880, null), width: L(900, null), hlCls: 'hl', ...o });
  const card3 = (sc, rows, x, y, w) => { const c = el('div', null, null, sc, { position: 'absolute', width: px(w), padding: '22px 30px', borderRadius: '28px', background: '#fff', boxShadow: 'var(--shadow-card)', opacity: 0 }); center(c, x, y);
    const rs = rows.map(tx => el('div', null, '<i class="fa-solid fa-check" style="color:#1F8A5A;margin-left:14px"></i>' + tx, c, { fontWeight: 900, fontSize: px(L(40, 42)), color: 'var(--ink)', padding: '8px 0', opacity: 0 })); return [c, rs]; };
  // ١٤–١٥: عدّ اللي عملته — اكتب تلات حاجات
  { const sc = sc0 = scene(P(14).t0 - 0.1, P(16).t0 - 0.3);
    step(sc, 1, 'عدّ <span class="hl">اللي عملته</span>', P(14).t0 - 0.05, SB, L(66, 64));
    card(sc, 'U08', T(14, 2) - 0.2, P(15).t0 - 0.2, CB, { focus: [0.5, 0.55], zoom: [1.1, 1.16], from: 1, fadeOut: 0.15 }); fx('pen', T(14, 8), 0.7);
    const n3 = cchip(sc, '<i class="fa-solid fa-moon"></i>قبل ما تنام: ٣ حاجات', 'white', RX, L(470, 1180), T(14, 5) - 0.1, L(40, 40), -2);
    const [c3, rs] = card3(sc, ['ردّيت على الإيميل', 'شربت مية', 'قمت من السرير'], RX, L(660, 1380), L(620, 720));
    tl.to(c3, { opacity: 1, duration: 0.3 }, T(14, 16) - 0.3);
    [16, 19, 21].forEach((k, j) => { tl.fromTo(rs[j], { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.3 }, T(14, k) - 0.1); fx('pen', T(14, k), 0.5); });
    capR(14, 8, 15, L(870, 1580), { hl: [9, 15], end: T(14, 16) - 0.1 });
    // ١٥: الدماغ اتعوّد يدوّر على اللي ناقص… بتعلّمه يشوف اللي موجود
    card(sc, 'U09', P(15).t0 - 0.15, P(16).t0 - 0.3, CB, { focus: [0.5, 0.5], zoom: [1.05, 1.1], from: 2 });
    tl.to([n3, c3], { opacity: 0, duration: 0.3 }, P(15).t0 - 0.1);
    const ms = cchip(sc, '<i class="fa-solid fa-magnifying-glass-minus"></i>اللي ناقص', 'ghost', L(1560, 760), L(760, 1460), T(15, 5) - 0.1, L(42, 40), -2); strike(ms, T(15, 7));
    cchip(sc, '<i class="fa-solid fa-eye"></i>اللي موجود', 'sticky', L(1110, 320), L(760, 1460), T(15, 11) - 0.1, L(48, 44), 2, 'slap');
    capR(15, 0, 11, L(870, 1600), { hl: [5, 9, 11] });
  }
  // ١٦–١٧: قيس نفسك بنفسك
  { const sc = sc0 = scene(P(16).t0 - 0.3, P(18).t0 - 0.3);
    step(sc, 2, 'قيس نفسك <span class="hl">بنفسك</span>', P(16).t0 - 0.2, SB, L(66, 64));
    card(sc, 'U10', T(16, 2) - 0.2, P(17).t0 - 0.2, CB, { focus: [0.45, 0.5], zoom: [1.05, 1.1], from: 0.5, speed: 0.8, fadeOut: 0.15 });
    card(sc, 'U11', P(17).t0 - 0.15, P(18).t0 - 0.3, CB, { focus: [0.5, 0.5], zoom: [1.05, 1.1], from: 1 }); fx('beep', P(17).t0 + 0.3, 0.3);
    const f1 = cchip(sc, '<i class="fa-solid fa-user"></i>فلان', 'ghost', L(1560, 760), L(470, 1180), T(16, 6) - 0.1, L(40, 40), -2); strike(f1, T(16, 6) + 0.25);
    const f2 = cchip(sc, '<i class="fa-solid fa-user-tie"></i>اللي كان المفروض تبقاه', 'ghost', L(1170, 360), L(470, 1180), T(16, 8) - 0.1, L(40, 36), 2); strike(f2, T(16, 12) + 0.05);
    const cmp = el('div', null, '<span class="a" style="padding:16px 28px;border-radius:999px;background:#EEF3FA;color:var(--ink-2)"><i class="fa-solid fa-clock-rotate-left"></i> إنت امبارح</span><i class="fa-solid fa-arrow-left" style="color:var(--blue-700)"></i><span class="b" style="padding:16px 28px;border-radius:999px;background:var(--sticky);color:var(--ink)"><i class="fa-solid fa-sun"></i> إنت النهارده</span>', sc,
      { position: 'absolute', display: 'flex', alignItems: 'center', gap: '22px', fontWeight: 900, fontSize: px(L(42, 40)), opacity: 0, whiteSpace: 'nowrap', direction: 'ltr' });
    center(cmp, RX, L(640, 1340)); rise(cmp, T(16, 13) - 0.1, 30, 0.4, 'pop', 0.7);
    // ١٧: امبارح صفر… النهارده عشر دقايق — ده تقدّم
    tl.to([f1, f2, cmp], { opacity: 0, duration: 0.3 }, P(17).t0 - 0.1);
    const bw = L(700, 820), bars = el('div', null, '<div style="display:flex;align-items:center;gap:16px;margin-bottom:18px"><span style="width:' + px(L(170, 190)) + '">امبارح</span><div style="flex:1;height:30px;border-radius:15px;background:#E3EAF4;direction:rtl"><div class="a" style="height:100%;width:2%;border-radius:15px;background:#B9C7DB"></div></div><span>٠</span></div><div style="display:flex;align-items:center;gap:16px"><span style="width:' + px(L(170, 190)) + '">النهارده</span><div style="flex:1;height:30px;border-radius:15px;background:#E3EAF4;direction:rtl"><div class="b" style="height:100%;width:0%;border-radius:15px;background:#1F8A5A"></div></div><span>١٠ د</span></div>', sc,
      { position: 'absolute', width: px(bw), fontWeight: 900, fontSize: px(L(36, 38)), color: 'var(--ink)', opacity: 0 });
    center(bars, RX, L(520, 1220)); rise(bars, T(17, 0) - 0.1, 20, 0.3, null);
    tl.to(bars.querySelector('.b'), { width: '42%', duration: 0.8, ease: 'power2.out' }, T(17, 6)); fx('rise', T(17, 6), 0.4);
    cchip(sc, '<i class="fa-solid fa-arrow-trend-up"></i>ده تقدّم', 'sticky', RX, L(700, 1400), T(17, 9) - 0.1, L(52, 50), -2, 'slap');
    capR(17, 11, 16, L(850, 1560), { hl: [16] });
  }
  // ١٨–١٩: ده صوت مين؟
  { const sc = sc0 = scene(P(18).t0 - 0.3, P(20).t0 - 0.5);
    step(sc, 3, 'اسأل: <span class="hl">ده صوت مين؟</span>', P(18).t0 - 0.2, SB, L(64, 62));
    card(sc, 'U07', T(18, 2) - 0.2, P(19).t0 - 0.2, CB, { focus: [0.55, 0.5], zoom: [1.05, 1.12], from: 2, speed: 0.6, fadeOut: 0.15 });
    card(sc, 'U12', P(19).t0 - 0.15, P(20).t0 - 0.5, CB, { focus: [0.5, 0.35], zoom: [1.15, 1.2], from: 3 });
    const who = el('div', null, '<i class="fa-solid fa-circle-question" style="margin-left:14px;color:var(--blue-700)"></i>«ده صوت مين؟»', sc, { position: 'absolute', padding: '22px 34px', borderRadius: '34px 34px 34px 8px', background: '#DCF3FF', color: 'var(--ink)', fontWeight: 900, fontSize: px(L(46, 46)), boxShadow: 'var(--shadow-card)', opacity: 0, whiteSpace: 'nowrap' });
    center(who, RX, L(480, 1190)); rise(who, T(18, 7) - 0.1, 30, 0.4, 'pop', 0.7);
    const OP = L([[1560, 620], [1110, 620]], [[760, 1330], [320, 1330]]);
    const op = [['fa-chalkboard-user', 'مدرّس', 15], ['fa-clock-rotate-left', 'حد قالها زمان', 17]].map(([ic, tx, k], j) => cchip(sc, '<i class="fa-solid ' + ic + '"></i>' + tx, 'white', OP[j][0], OP[j][1], T(18, k) - 0.08, L(40, 40), j ? 2 : -2));
    const nm = cchip(sc, '<i class="fa-solid fa-user-slash"></i>مش صوتك إنت', 'sticky', RX, L(770, 1480), T(18, 20) - 0.1, L(50, 50), -2, 'slap');
    // ١٩: ترد عليه — «أنا بعمل اللي أقدر عليه، بدماغ بيشتغل بطريقة مختلفة»
    tl.to([who, ...op, nm], { opacity: 0, duration: 0.3 }, P(19).t0 - 0.1);
    const rp = el('div', null, '<i class="fa-solid fa-comment" style="margin-left:14px;color:#1F8A5A"></i>«أنا بعمل اللي أقدر عليه…<br>بدماغ بيشتغل بطريقة مختلفة»', sc, { position: 'absolute', padding: '26px 36px', borderRadius: '34px 34px 34px 8px', background: '#E2F7EC', color: 'var(--ink)', fontWeight: 900, fontSize: px(L(42, 40)), lineHeight: 1.5, boxShadow: 'var(--shadow-card)', opacity: 0, textAlign: 'center', whiteSpace: 'nowrap' });
    center(rp, RX, L(560, 1260)); rise(rp, T(19, 8) - 0.1, 30, 0.4, 'pop', 0.7);
    capR(19, 0, 7, L(800, 1500), { hl: [3, 4, 6] });
  }
  // ════════ ٢٠ · الواقع ════════
  { const sc = scene(P(20).t0 - 0.5, P(21).t0 - 0.3, 'real');
    foot(sc, 'U13', P(20).t0 - 0.5, P(21).t0 - 0.3, { from: 5, speed: 0.8, focus: L([0.4, 0.5], [0.3, 0.5]), zoom: [1.08, 1.0], fadeIn: 0.5, shade: true }); fx('whoosh', P(20).t0 - 0.55, 0.6);
    capWords(sc, 20, 0, 7, { ...CAP, hl: [7], end: T(20, 8) - 0.1 });
    const q1 = chip(sc, '«أنا مش كفاية»', 'glass', L(1460, 540), L(260, 290), L(54, 52)); q1.style.background = 'rgba(6,16,36,.55)'; pop(q1, T(20, 10) - 0.1, -2, 'pop', 0.6); strike(q1, T(20, 12) + 0.1);
    tl.to(q1, { opacity: 0.3, duration: 0.3 }, T(20, 13));
    sticky(sc, '«المسطرة دي<br>محتاجة تتغيّر»', L(1460, 540), L(450, 490), L(440, 480), L(54, 56), T(20, 14) - 0.1, -3); fx('paper', T(20, 14) - 0.1, 0.8);
    capWords(sc, 20, 8, 17, { ...CAP, hl: [14, 16, 17] });
  }
  // ════════ ٢١ ════════
  { const sc = scene(P(21).t0 - 0.3, P(22).t0 - 0.2, 'blue');
    words(sc, 'إنت مش مقصّر…', { y: L(320, 600), size: L(104, 90), at: [0, 1, 2].map(k => T(21, k)) });
    words(sc, L('إنت بس بتقيس نفسك بمسطرة *غلط.*', 'إنت بس بتقيس نفسك | بمسطرة *غلط.*'), { y: L(500, 800), size: L(84, 76), at: [3, 4, 5, 6, 7, 8].map(k => T(21, k)) });
    const b = icon(sc, 'fa-ruler', CX, L(820, 1260), L(120, 140), 'var(--sticky)', T(21, 8) + 0.1, 'impact'); b.style.filter = 'drop-shadow(0 0 30px rgba(245,230,163,.8))';
  }
  // ════════ ٢٢ · آخر الموسم: عشر أسئلة… دماغك مش بايظ ════════
  { const sc = scene(P(22).t0 - 0.2, P(23).t0 - 0.2, 'blue');
    capWords(sc, 22, 0, 7, { ...TOP, hl: [2, 5, 6, 7], end: T(22, 8) - 0.1 });
    const QS = [['fa-fire', 'مش قادر أبدأ'], ['fa-mobile-screen', 'الموبايل'], ['fa-hourglass-half', 'الزنقة'], ['fa-table', 'بنسى'], ['fa-calendar-days', 'ترتيب اليوم'],
      ['fa-lightbulb', 'التركيز'], ['fa-water', 'كلمة صغيرة'], ['fa-road', 'النص'], ['fa-scale-balanced', 'القرار'], ['fa-ruler', 'مقصّر']];
    const grid = el('div', null, null, sc, { position: 'absolute', display: 'grid', gridTemplateColumns: L('repeat(5,1fr)', 'repeat(2,1fr)'), gap: px(L(22, 18)), direction: 'rtl' }); center(grid, CX, L(560, 940));
    const AN = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
    const qc = QS.map(([ic, tx], j) => { const c = el('div', null, '<div style="display:flex;align-items:center;gap:12px;font-size:' + px(L(24, 26)) + ';opacity:.7;margin-bottom:8px"><span>' + AN(j + 1) + '</span></div><i class="fa-solid ' + ic + '" style="font-size:' + px(L(46, 48)) + ';color:#F5C542"></i><div style="margin-top:10px">' + tx + '</div>', grid,
      { width: px(L(270, 400)), padding: px(L(20, 18)), borderRadius: '24px', background: 'rgba(255,255,255,.12)', border: '2px solid rgba(255,255,255,.22)', color: '#fff', fontWeight: 900, fontSize: px(L(30, 32)), textAlign: 'center', opacity: 0 });
      tl.fromTo(c, { opacity: 0, y: 30, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'back.out(2)' }, T(22, 6) - 0.1 + j * 0.13); return c; });
    fx('counter', T(22, 6), 0.5);
    tl.to(qc, { opacity: L(0.15, 0.06), duration: 0.5 }, T(22, 12) - 0.3);
    const w1 = words(sc, 'دماغك مش بايظ…', { y: L(420, 760), size: L(100, 88), at: [12, 13, 14].map(k => T(22, k)) });
    words(sc, 'هو بس بيشتغل | *بطريقة* *مختلفة.*', { y: L(560, 900), size: L(84, 80), color: 'var(--sky-100)', at: [15, 16, 17, 18, 19].map(k => T(22, k)) });
    fx('impact', T(22, 19) + 0.3, 0.7);
  }
  // ════════ ٢٣ · ابعتها لحد محتاجها — نشوفك في الموسم الجاي ════════
  { const sc = scene(P(23).t0 - 0.2, null);
    const sp = el('div', 'pill glass', '<span class="dot"></span>ليه دماغي بتعمل كده؟', sc, { fontSize: px(L(32, 36)), opacity: 0 }); center(sp, L(1420, 540), L(200, 360)); rise(sp, P(23).t0, -20);
    const sh = cchip(sc, '<i class="fa-solid fa-share-nodes"></i>ابعتها لحد محتاج يسمعها', 'sticky', L(1420, 540), L(320, 480), T(23, 5) - 0.1, L(40, 44), -2, 'slap');
    const q = words(sc, 'نشوفك في | *الموسم* *الجاي*', { y: L(420, 620), size: L(88, 90), at: [9, 10, 11, 12].map(k => T(23, k)) });
    if (H) Object.assign(q.style, { left: 'auto', right: '100px', width: '860px', padding: 0, textAlign: 'center' });
    const lg = el('div', null, '<img src="../../../etizan-explainer-video/pipeline/assets/logo-full.png" style="height:' + px(L(80, 96)) + ';display:block">', sc, { position: 'absolute', padding: '18px 40px', background: '#fff', borderRadius: '44px', boxShadow: 'var(--shadow-card)', opacity: 0 });
    center(lg, L(1420, 540), L(820, 1560)); rise(lg, P(23).t1 + 0.3, 20);
    if (H) {
      const es = el('div', null, null, sc, { position: 'absolute', left: '110px', top: '170px', width: '760px', height: '428px', borderRadius: '28px', border: '4px dashed rgba(255,255,255,.28)', opacity: 0 });
      const sb = el('div', null, null, sc, { position: 'absolute', left: '370px', top: '650px', width: '240px', height: '240px', borderRadius: '50%', border: '4px dashed rgba(255,255,255,.28)', opacity: 0 });
      rise(es, P(23).t1 + 0.4, 20); rise(sb, P(23).t1 + 0.6, 20);
    } else {
      const fol = el('div', 'pill', '<i class="fa-solid fa-bell"></i>تابع السلسلة', sc, { background: 'var(--sticky)', color: 'var(--ink)', fontSize: '40px', opacity: 0, boxShadow: 'var(--shadow-card)' }); center(fol, 540, 1350); pop(fol, P(23).t1 + 0.5, -2, 'pop', 0.6);
    }
    tl.to('#stage', { opacity: 0, duration: 0.6 }, DUR - 0.6);
  }
} };
