// الحلقة ١ — «ليه عارف إني لازم أعملها… ومش قادر أبدأ؟»
// كل حركة مربوطة بكلمتها: T(فقرة، رقم الكلمة) — الفقرات ١..٢٥ زي script.txt. L(عريض، طولي) لكل مكان.
// العوالم: 📷 real (stock) · 🔵 blue (نفهم) · 🟡 light (نعمل)
window.EPISODE = { n: 1, gaps: { 4: 3.0, 7: 0.6, 14: 0.6, 15: 1.1, 21: 0.6, 23: 0.3, 25: 7.5 }, build(A) {
  const { O, L, px, $, tl, fx, dyn, lerp, el, world, scene, pop, rise, out, center, capWords, words, strike, foot, laptop, trace, chip, sticky, chapter, T, P, DUR, AR } = A;
  const H = O === 'h', CX = L(960, 540);
  const CAP = L({ y: 860, size: 66 }, { y: 1440, size: 76 });          // كابشن عالم الواقع
  const NS = 'http://www.w3.org/2000/svg';
  const svgLayer = sc => { const s = document.createElementNS(NS, 'svg'); s.setAttribute('width', L(1920, 1080)); s.setAttribute('height', L(1080, 1920)); s.style.cssText = 'position:absolute;left:0;top:0;overflow:visible'; sc.appendChild(s); return s; };
  const path = (svg, d, color = '#D9F0FD', w = 6, dash) => { const p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); p.setAttribute('fill', 'none'); p.setAttribute('stroke', color); p.setAttribute('stroke-width', w); p.setAttribute('stroke-linecap', 'round'); if (dash) p.setAttribute('stroke-dasharray', dash); svg.appendChild(p); return p; };
  const draw = (p, t, d = 0.6) => { const len = p.getTotalLength(); p.style.strokeDasharray = len; tl.fromTo(p, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: d, ease: 'power2.inOut' }, t); return p; };
  const cchip = (sc, html, cls, x, y, t, size, rot = 0, s = 'pop') => pop(chip(sc, html, cls, x, y, size), t, rot, s);
  const flash = (t, a = 0.25) => tl.fromTo('#flash', { opacity: a }, { opacity: 0, duration: 0.3, immediateRender: false }, t);
  // جبل (SVG) — للمجهود المتوقَّع
  const mountain = (sc, x, y, w) => { const m = el('div', null, '<svg viewBox="0 0 700 420" width="100%" height="100%"><defs><linearGradient id="mg' + x + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#9fd2fb"/></linearGradient></defs>'
    + '<path d="M20 410 L270 70 Q290 45 310 70 L420 210 L470 150 Q490 128 510 150 L690 410 Z" fill="url(#mg' + x + ')"/><path d="M270 70 Q290 45 310 70 L350 122 L322 108 L298 132 L272 104 L240 112 Z" fill="#18B1FE" opacity=".55"/></svg>', sc,
    { position: 'absolute', width: px(w), height: px(w * 0.6), opacity: 0, filter: 'drop-shadow(0 30px 40px rgba(2,30,80,.35))' }); return center(m, x, y); };
  // عدّاد (نص دايرة) — set(t, قيمة ٠..١)
  function gauge(sc, x, y, label, icon, size = 280) {
    const g = el('div', null, '<svg viewBox="0 0 300 170" width="' + size + '" height="' + size * 0.57 + '"><path d="M40 150 A110 110 0 0 1 260 150" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="22" stroke-linecap="round"/>'
      + '<path class="arc" d="M40 150 A110 110 0 0 1 260 150" fill="none" stroke="#18B1FE" stroke-width="22" stroke-linecap="round"/><g class="nd"><line x1="150" y1="150" x2="150" y2="58" stroke="#fff" stroke-width="9" stroke-linecap="round"/></g><circle cx="150" cy="150" r="15" fill="#fff"/></svg>'
      + '<div style="font-size:' + px(size * 0.13) + ';font-weight:900;margin-top:4px"><i class="fa-solid ' + icon + '" style="color:var(--sky-100);margin-left:10px"></i>' + label + '</div>', sc, { position: 'absolute', width: px(size), textAlign: 'center', opacity: 0, color: '#fff' });
    center(g, x, y); const arc = g.querySelector('.arc'), nd = g.querySelector('.nd'), len = 346;
    arc.style.strokeDasharray = len; gsap.set(arc, { strokeDashoffset: len * 0.9 }); gsap.set(nd, { rotation: -72, svgOrigin: '150 150' });
    g.set = (t, v, d = 0.6) => { tl.to(arc, { strokeDashoffset: len * (1 - v), duration: d, ease: 'power2.inOut' }, t); tl.to(nd, { rotation: -90 + 180 * v, svgOrigin: '150 150', duration: d, ease: 'back.out(1.4)' }, t); };
    return g;
  }
  // زرار «ابدأ»
  function switcher(sc, x, y) {
    const s = el('div', null, '<div class="k" style="width:120px;height:64px;border-radius:32px;background:rgba(255,255,255,.2);position:relative"><div class="kn" style="position:absolute;right:8px;top:8px;width:48px;height:48px;border-radius:50%;background:#9fb3d1"></div></div><span>ابدأ</span>', sc,
      { position: 'absolute', display: 'flex', alignItems: 'center', gap: '24px', padding: '20px 34px 20px 24px', borderRadius: '999px', background: 'rgba(4,22,60,.45)', border: '2px solid rgba(255,255,255,.25)', fontWeight: 900, fontSize: '42px', color: 'rgba(255,255,255,.65)', opacity: 0 });
    center(s, x, y); const k = s.querySelector('.k'), kn = s.querySelector('.kn');
    s.on = t => { tl.to(kn, { x: -56, background: '#fff', duration: 0.25 }, t); tl.to(k, { background: '#18B1FE', boxShadow: '0 0 30px #18B1FE', duration: 0.25 }, t); tl.to(s, { color: '#fff', duration: 0.25 }, t); fx('pop', t, 0.9); };
    s.off = t => { tl.to(kn, { x: 0, background: '#9fb3d1', duration: 0.25 }, t); tl.to(k, { background: 'rgba(255,255,255,.2)', boxShadow: '0 0 0px #18B1FE', duration: 0.25 }, t); tl.to(s, { color: 'rgba(255,255,255,.65)', duration: 0.25 }, t); };
    return s;
  }
  // كارت خطوة مرقّم
  const step = (sc, n, title, t, box, size) => { const s = el('div', 'step', '<div class="n">' + AR(n) + '</div><div class="ttl" style="font-size:' + px(size) + ';font-weight:1000;line-height:1.22">' + title + '</div>', sc, { left: px(box.x), top: px(box.y), width: px(box.w) });
    tl.fromTo(s, { opacity: 0, y: 80, rotation: 2 }, { opacity: 1, y: 0, rotation: 0, duration: 0.55, ease: 'power3.out' }, t); fx('whoosh', t, 0.8); return s; };
  const row = (parent, html, size, mt = 28) => el('div', null, html, parent, { display: 'flex', alignItems: 'center', gap: '20px', fontSize: px(size), fontWeight: 900, marginTop: px(mt), opacity: 0 });
  const label = (sc, html, x, y, t, cls = 'ink', size = 34) => { const c = el('div', 'pill ' + cls, html, sc, { fontSize: px(size), opacity: 0 }); center(c, x, y); return rise(c, t, 20, 0.35); };

  // ════════ ١–٤ · الواقع: الموقف ════════
  const T4 = T(4, 2) - 0.2;                                                       // «ليه» التانية: بداية كارت العنوان
  { const sc = scene(0, T4 + 0.6, 'real');
    // R01: اللابتوب والملف مفتوح (ورا كل اللقطات اللي في الفقرة ٢)
    const lap = laptop(sc, 0, P(2).next - 0.1, { zoom: [1.0, 1.16], focus: [0.5, 0.42], fadeIn: 0.6, shade: true, box: L(undefined, { x: 0, y: 330, w: 1080, h: 608 }) });
    const t12 = T(2, 12) - 0.1, t14 = T(2, 14) + 0.25;
    lap.tabs(t => t < t12 ? 1 : Math.min(17, 1 + Math.floor(16 * lerp(t, t12, t14) ** 1.3 + 0.0001)));
    sticky(sc, 'المطلوب:<br>حاجة واحدة', L(300, 230), L(560, 320), L(290, 300), L(40, 42), T(1, 1) - 0.05, -5);
    const clk = label(sc, '<i class="fa-regular fa-clock" style="color:var(--blue-700)"></i>مفتوح من الصبح', L(1560, 760), L(560, 1010), T(1, 9) - 0.1, 'ink', L(34, 36)); fx('pop', T(1, 9), 0.6);
    out(clk, T(2, 5) - 0.2);
    capWords(sc, 1, 0, 6, { ...CAP, hl: [1, 2], end: T(1, 7) - 0.1 });
    // ٢: بيعمل كل حاجة إلا الحاجة دي
    const r2 = foot(sc, 'R02', T(2, 5) - 0.12, T(2, 7) - 0.12, { from: 3, focus: [0.5, 0.45], zoom: [1.05, 1.12], fadeIn: 0.08, fadeOut: 0.08, shade: true }); fx('swish', T(2, 5) - 0.15, 0.8);
    label(sc, '<i class="fa-solid fa-box-archive" style="color:var(--blue-700)"></i>رتّبت الدُّرج', CX, L(140, 160), T(2, 5), 'ink', L(38, 40)).style.zIndex = 3;
    const r3 = foot(sc, 'R03', T(2, 7) - 0.12, T(2, 12) - 0.12, { from: 5, focus: [0.42, 0.5], zoom: [1.1, 1.18], fadeIn: 0.08, fadeOut: 0.08, shade: true }); fx('swish', T(2, 7) - 0.15, 0.8);
    label(sc, '<i class="fa-solid fa-comment-dots" style="color:var(--blue-700)"></i>رسايل من أسبوع', CX, L(140, 160), T(2, 9), 'ink', L(38, 40)).style.zIndex = 3;
    sc.querySelectorAll('.pill').forEach(p => { if (/الدُّرج/.test(p.textContent)) out(p, T(2, 7) - 0.15, 0.1); if (/أسبوع/.test(p.textContent)) out(p, T(2, 12) - 0.15, 0.1); });
    fx('glitch', T(2, 12) - 0.12, 0.7);
    const tabsTag = label(sc, '<span style="direction:ltr;color:var(--blue-700)">17</span> تاب مفتوحة', L(960, 540), L(120, 250), T(2, 13), 'ink', L(40, 42)); fx('pop', T(2, 13), 0.8);
    out(tabsTag, P(2).next - 0.2);
    capWords(sc, 2, 15, 18, { ...CAP, hl: [17, 18] });
    // ٣: مش مستهتر… بس مش قادر تبدأ
    foot(sc, 'R04a', P(3).t0 - 0.15, T(3, 14) - 0.1, { from: 4, focus: [0.42, 0.55], zoom: [1.0, 1.1], fadeIn: 0.3, shade: true }); fx('whoosh', P(3).t0 - 0.2, 0.5);
    capWords(sc, 3, 0, 3, { ...CAP, hl: [2, 3], end: T(3, 4) - 0.05 });
    capWords(sc, 3, 4, 7, { ...CAP, hl: [7], end: T(3, 8) - 0.05 });
    capWords(sc, 3, 8, 13, { ...CAP, end: T(3, 14) - 0.1 });
    // R04b: الراجل قدام اللابتوب… وبيتجمّد عند «طب ليه؟»
    const fz = T(4, 0);
    const r4 = foot(sc, 'R04b', T(3, 14) - 0.1, T4 + 0.25, { from: 6.0, freeze: fz, focus: [0.49, 0.45], zoom: [1.0, 1.08], fadeIn: 0.25, shade: true });
    capWords(sc, 3, 14, 18, { ...CAP, hl: [16, 17, 18], end: fz - 0.1 });
    flash(fz, 0.35); fx('lowhit', fz, 0.8); fx('reverse', fz - 0.7, 0.5);
    tl.to(r4.querySelector('.src > img'), { filter: 'grayscale(1) brightness(.8)', duration: 0.4 }, fz);
    tl.to(r4.tint, { opacity: 0.82, duration: 0.7 }, fz + 0.15);
    trace(r4, ['M780 255 C780 120, 1100 120, 1100 255 C1100 400, 990 470, 940 470 C890 470, 780 400, 780 255 Z',
      'M610 830 C630 640, 760 560, 900 552 M1000 552 C1140 560, 1300 640, 1340 830',
      'M670 1090 L670 820 Q670 806 684 806 L1456 806 Q1470 806 1470 820 L1470 1090',
      'M900 560 C880 470, 900 400, 965 375'], fz + 0.25, 0.8);
    fx('swish', fz + 0.3, 0.5);
    capWords(sc, 4, 0, 1, { ...CAP, y: L(470, 1440), size: L(110, 110), hl: [1], end: T4 + 0.05 });
  }

  // ════════ كارت العنوان (فاصل ٣ ثواني بعد الفقرة ٤) ════════
  { const sc = scene(T4, P(5).t0 - 0.35, 'blue');
    const q = el('div', 'qmark', '؟', sc, { fontSize: px(L(1000, 900)), opacity: 0 }); Object.assign(q.style, H ? { left: '80px', top: '30px' } : { left: '160px', top: '1060px', fontSize: '760px' });
    tl.fromTo(q, { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, T4 + 0.1);
    const sp = el('div', 'pill glass', '<span class="dot"></span>ليه دماغي بتعمل كده؟', sc, { fontSize: px(L(34, 38)), opacity: 0 });
    if (H) Object.assign(sp.style, { right: '160px', top: '230px' }); else center(sp, 540, 520);
    rise(sp, T4 + 0.05, -20);
    const ep = el('div', 'pill ink', 'الحلقة ١', sc, { fontSize: px(L(28, 32)), padding: '6px 24px', opacity: 0 });
    if (H) Object.assign(ep.style, { right: '160px', top: '320px' }); else center(ep, 540, 610);
    rise(ep, T4 + 0.25, -20);
    const ttl = words(sc, 'ليه عارف إني لازم أعملها…', { y: L(430, 760), size: L(108, 96), at: [2, 3, 4, 5, 6].map(k => T(4, k)) });
    const t2 = words(sc, '*ومش* *قادر* *أبدأ؟*', { y: L(580, 1010), size: L(118, 112), at: [7, 8, 9].map(k => T(4, k)) });
    if (H) [ttl, t2].forEach(x => Object.assign(x.style, { left: 'auto', right: '160px', textAlign: 'right', padding: 0 }));
    fx('impact', T(4, 9) + 0.35, 0.9); flash(T(4, 9) + 0.35, 0.15);
    tl.to([ttl, t2, sp, ep], { opacity: 0, y: -40, duration: 0.35 }, P(5).t0 - 0.6);
    fx('whoosh_big', P(5).t0 - 0.6, 0.8);
  }

  // ════════ ٥–٦ · اللي بيتقال لك (فاتح) ════════
  { const sc = scene(P(5).t0 - 0.35, P(7).t0 - 0.35, 'light');
    chapter('اللي بيتقال لك', P(5).t0 - 0.2, P(7).t0 - 0.4, 'ink', 'var(--sky-400)');
    capWords(sc, 5, 0, 4, { y: L(170, 220), size: L(52, 56), color: 'var(--ink-2)', shadow: false, end: T(6, 0) - 0.2 });
    const POS = L([[1420, 380, -3], [760, 330, 2], [1080, 560, -2]], [[540, 520, -3], [540, 760, 2], [540, 1000, -2]]);
    const Q = [['«إنت كسلان»', 8], ['«لو مهتم كنت عملتها»', 10], ['«محتاج شوية إرادة بس»', 14]];
    const cs = Q.map(([q, k], j) => cchip(sc, q, 'ghost', POS[j][0], POS[j][1], T(5, k) - 0.08, L(54, 54), POS[j][2], 'slap'));
    // ٦: بقيت بتقولها لنفسك ← ده مش اللي بيحصل
    const head = el('div', null, '<i class="fa-solid fa-head-side-virus"></i>', sc, { position: 'absolute', fontSize: px(L(210, 230)), color: 'var(--blue-700)', opacity: 0 }); center(head, CX, L(470, 760));
    pop(head, L(T(6, 5) - 0.1, T(6, 6) + 0.4), 0, 'pop', 0.6);
    const G2 = L([[1310, 330], [610, 330], [960, 650]], [[540, 440], [540, 570], [540, 1060]]);
    cs.forEach((c, j) => tl.to(c, { left: px(G2[j][0]), top: px(G2[j][1]), scale: 0.78, duration: 0.6, ease: 'power3.inOut' }, T(6, 6) + j * 0.05));
    cs.forEach((c, j) => strike(c, T(6, 10) + j * 0.14));
    tl.to(head, { opacity: 0.25, duration: 0.3 }, T(6, 10));
    words(sc, 'ده ~مش~ اللي بيحصل.', { y: L(820, 1230), size: L(96, 92), color: 'var(--ink)', at: [10, 11, 12, 13].map(k => T(6, k)) });
    fx('lowhit', T(6, 11), 0.6);
  }

  // ════════ ٧ · مش كل تأجيل = ADHD (أزرق) ════════
  { const sc = scene(P(7).t0 - 0.35, P(8).t0 - 0.3, 'blue');
    const a = el('div', 'glasscard', null, sc, { width: px(L(1500, 940)), height: px(L(250, 380)) }); center(a, CX, L(300, 560)); rise(a, T(7, 0) - 0.2, 30);
    const ca = el('div', null, '<span class="chip white" style="position:static;opacity:1;font-size:' + px(L(46, 46)) + '"><i class="fa-solid fa-hourglass-half"></i>تأجيل</span><i class="fa-solid fa-not-equal" style="font-size:' + px(L(60, 60)) + ';margin:0 28px"></i><span class="chip glass" style="position:static;opacity:1;font-size:' + px(L(46, 46)) + '">إيه دي إتش دي</span>', sc, { position: 'absolute', display: 'flex', alignItems: 'center', opacity: 0, flexDirection: H ? 'row' : 'column', gap: H ? '0' : '18px' });
    center(ca, CX, L(300, 560)); pop(ca, T(7, 5) - 0.1, 0, 'pop', 0.7, 0.8);
    const cardRow = [['fa-repeat', 'بقى أسلوب حياة', 18], ['fa-heart', 'حتى في الحاجات اللي إنت عايزها', 21]];
    const RP = L([[1340, 580], [600, 580]], [[540, 940], [540, 1110]]);
    cardRow.forEach(([ic, tx, k], j) => cchip(sc, '<i class="fa-solid ' + ic + '"></i>' + tx, 'white', RP[j][0], RP[j][1], T(7, k) - 0.1, L(44, 42), j ? 2 : -2));
    tl.to(sc.querySelectorAll('.chip.white'), { opacity: 0.5, duration: 0.3 }, T(7, 29) - 0.2);
    words(sc, 'في حاجة تانية شغّالة *جوّه*', { y: L(780, 1300), size: L(92, 84), at: [30, 31, 32, 34, 35].map(k => T(7, k)) });
  }

  // ════════ ٨–١٤ · اللي بيحصل جوّه ════════
  chapter('اللي بيحصل جوّه', P(8).t0 - 0.2, P(14).t1 + 0.2);
  // ٨: «تقرير» ← جبل
  { const sc = scene(P(8).t0 - 0.3, P(9).t0 - 0.15);
    tl.fromTo('#bgBlue .dots', { scale: 1.6 }, { scale: 1, duration: 1.1, ease: 'power3.out', immediateRender: false }, P(8).t0 - 0.3); fx('whoosh_big', P(8).t0 - 0.35, 0.9);
    capWords(sc, 8, 0, 2, { y: L(470, 860), size: L(110, 110), hl: [2], end: T(8, 3) - 0.1 });
    const rep = cchip(sc, '<i class="fa-solid fa-file-lines"></i>«تقرير»', 'white', CX, L(500, 860), T(8, 9) - 0.1, L(64, 64));
    tl.to(rep, { scale: 0.4, opacity: 0, y: 60, duration: 0.35, ease: 'power2.in' }, T(8, 11) - 0.25);
    const mt = mountain(sc, CX, L(470, 860), L(760, 860));
    tl.fromTo(mt, { opacity: 0, scale: 0.3, y: 100 }, { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'back.out(1.5)' }, T(8, 11) - 0.1); fx('rise', T(8, 11) - 0.6, 0.6); fx('lowhit', T(8, 11) + 0.1, 0.6);
    capWords(sc, 8, 12, 17, { y: L(820, 1250), size: L(66, 70), hl: [16, 17] });
  }
  // ٩: سلسلة المقاومة
  { const sc = scene(P(9).t0 - 0.15, P(10).t0 - 0.3);
    const svg = svgLayer(sc);
    const N = [['fa-mountain', 'مجهود متوقَّع', 'w', 0], ['fa-hand', 'مقاومة', 'g', 3], ['fa-hourglass-half', 'تأجيل', 'g', 8], ['fa-mobile-screen-button', 'مشتّت جديد', 's', 13]];
    const NP = L([[1600, 420], [1170, 420], [740, 420], [310, 420]], [[540, 380], [540, 680], [540, 980], [540, 1280]]);
    const nodes = N.map(([ic, tx, c, k], j) => { const n = el('div', 'node ' + c, '<i class="fa-solid ' + ic + '"></i>' + tx, sc, { width: px(L(330, 520)), height: px(L(170, 190)), fontSize: px(L(42, 46)) });
      center(n, NP[j][0], NP[j][1]); pop(n, T(9, k) - 0.1, 0, j ? 'pop' : 'whoosh', 0.7); return n; });
    for (let j = 0; j < 3; j++) { const ar = el('i', 'fa-solid ' + (H ? 'fa-arrow-left-long' : 'fa-arrow-down-long'), null, sc, { position: 'absolute', fontSize: px(52), color: 'var(--sky-100)', opacity: 0 });
      center(ar, H ? (NP[j][0] + NP[j + 1][0]) / 2 : 540, H ? 420 : (NP[j][1] + NP[j + 1][1]) / 2); rise(ar, T(9, N[j + 1][3]) - 0.3, 0, 0.3); }
    const loop = path(svg, L('M310 520 C 420 860, 1500 860, 1600 520', 'M800 1280 C 1060 1180, 1060 480, 800 380'), '#D9F0FD', 6, '4 18');
    tl.fromTo(loop, { opacity: 0 }, { opacity: 0.9, duration: 0.5 }, T(9, 15) - 0.1);
    const back = cchip(sc, '<i class="fa-solid fa-rotate-right"></i>ترجع للمهمة', 'glass', L(960, 540), L(780, 1500), T(9, 17) - 0.1, L(40, 40));
    tl.to(nodes[0], { scale: 1.35, duration: 0.5, ease: 'back.out(2)' }, T(9, 21) - 0.1); fx('lowhit', T(9, 21), 0.7);
    tl.to(back.querySelector('i'), { rotation: 720, duration: 1.2, ease: 'power2.inOut' }, T(9, 23) - 0.1);
    tl.to(loop, { strokeDashoffset: -88, duration: 1.4, ease: 'none' }, T(9, 23) - 0.1);
  }
  // ١٠: ليه ناس تانية بتعدّي الجبل عادي؟
  { const sc = scene(P(10).t0 - 0.3, P(11).t0 - 0.3);
    const mt = mountain(sc, CX, L(560, 880), L(640, 760)); rise(mt, P(10).t0 - 0.2, 60, 0.5);
    capWords(sc, 10, 0, 7, { y: L(150, 300), size: L(70, 72), hl: [4] });
    const hk = el('i', 'fa-solid fa-person-hiking', null, sc, { position: 'absolute', fontSize: px(L(90, 100)), color: '#fff', opacity: 0 });
    const mx = L(960, 540), my = L(560, 880), mw = L(640, 760);
    tl.fromTo(hk, { opacity: 1, left: px(mx - mw * 0.42), top: px(my + mw * 0.12) }, { left: px(mx - mw * 0.08), top: px(my - mw * 0.3), duration: 0.9, ease: 'none', immediateRender: false }, T(10, 4) - 0.1);
    tl.to(hk, { left: px(mx + mw * 0.3), top: px(my + mw * 0.1), duration: 0.9, ease: 'none' }, T(10, 4) + 0.8);
    gsap.set(hk, { opacity: 0 });
    const note = label(sc, '<i class="fa-solid fa-circle-info" style="color:var(--blue-700)"></i>طريقة مبسّطة… مش تشخيص', CX, L(920, 1380), T(10, 8) - 0.1, 'ink', L(36, 38)); fx('pop', T(10, 8), 0.5);
  }
  // ١١–١٣: لوحة التحكم
  { const sc = scene(P(11).t0 - 0.3, P(14).t0 - 0.3), svg = svgLayer(sc);
    const pb = L({ x: 590, y: 540, w: 1000, h: 760 }, { x: 540, y: 720, w: 960, h: 820 });
    const panel = el('div', 'glasscard', null, sc, { width: px(pb.w), height: px(pb.h) }); center(panel, pb.x, pb.y); rise(panel, P(11).t0 - 0.1, 40, 0.5, 'whoosh', 0.6);
    capWords(sc, 11, 0, 4, { y: L(60, 170), size: L(54, 56), x: L(1150, null), width: L(700, null), end: T(11, 9) - 0.1 });
    const sw = switcher(sc, L(590, 540), L(830, 1020)); pop(sw, T(11, 6) - 0.1, 0, 'pop', 0.7);
    const GP = L([[360, 320], [820, 320], [360, 590], [820, 590]], [[300, 480], [780, 480], [300, 760], [780, 760]]);
    const GG = [['ممتعة', 'fa-heart'], ['جديدة', 'fa-star'], ['فيها تحدّي', 'fa-bolt'], ['الوقت زانقك', 'fa-stopwatch']].map(([lb, ic], j) => gauge(sc, GP[j][0], GP[j][1], lb, ic, L(280, 300)));
    // عند ناس كتير: الزرار متوصّل بـ «مهم»
    const lb1 = label(sc, '<i class="fa-solid fa-users" style="color:var(--blue-700)"></i>عند ناس كتير', L(1500, 300), L(230, 1300), T(11, 9) - 0.1, 'ink', L(34, 34));
    const imp = cchip(sc, '«مهم»', 'white', L(1500, 300), L(360, 1420), T(11, 16) - 0.1, L(64, 60));
    const w1 = draw(path(svg, L('M760 830 C 1000 830, 1150 360, 1370 360', 'M480 1080 C 380 1180, 300 1240, 300 1360'), '#fff', 6), T(11, 14) - 0.1, 0.5);
    sw.on(T(11, 20)); fx('rise', T(11, 19), 0.4);
    sw.off(P(12).t0 - 0.2); tl.to([w1, imp, lb1], { opacity: 0.25, duration: 0.3 }, P(12).t0 - 0.2);
    // في دماغ ADHD: متوصّل بـ «يشدّني» + ٤ عدّادات
    const lb2 = label(sc, '<i class="fa-solid fa-brain" style="color:var(--blue-700)"></i>دماغ إيه دي إتش دي', L(1500, 780), L(590, 1300), T(12, 2) - 0.1, 'ink', L(34, 34));
    const pull = cchip(sc, '«يشدّني»', 'sticky', L(1500, 780), L(720, 1420), T(12, 13) - 0.1, L(64, 60), -2, 'slap');
    draw(path(svg, L('M760 830 C 1000 830, 1150 720, 1370 720', 'M600 1080 C 700 1180, 780 1240, 780 1360'), '#F5E6A3', 6), T(12, 10) - 0.1, 0.5);
    [17, 19, 22, 25].forEach((k, j) => { tl.fromTo(GG[j], { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.8)' }, T(12, k) - 0.15); fx('pop', T(12, k) - 0.1, 0.6); GG[j].set(T(12, k) + 0.15, 0.85, 0.5); });
    // ١٣: مهمة بس مملة، ومعروفة، وبعيدة ← العدّادات بتنزل، والزرار ما بيولّعش
    [[5, 0], [6, 1], [9, 3], [10, 2]].forEach(([k, j]) => { GG[j].set(T(13, k) - 0.05, 0.08, 0.5); fx('swish', T(13, k), 0.5); });
    tl.to(sw, { x: 14, duration: 0.05, yoyo: true, repeat: 7 }, T(13, 15)); fx('lowhit', T(13, 15), 0.7);
    const nx = el('i', 'fa-solid fa-xmark', null, sc, { position: 'absolute', fontSize: px(70), color: 'var(--strike)', opacity: 0 }); center(nx, L(830, 780), L(830, 1020)); pop(nx, T(13, 16), 0, null);
    capWords(sc, 13, 17, 19, { y: L(930, 1600), size: L(64, 72), x: L(1150, null), width: L(700, null), hl: [19] });
  }
  // ١٤: مش عيب… فرق — والشرارة في إيدك
  { const sc = scene(P(14).t0 - 0.3, P(15).t0 - 0.45);
    const c1 = words(sc, 'مش عيب في شخصيتك', { y: L(200, 420), size: L(84, 84), at: [1, 2, 3, 4].map(k => T(14, k)) });
    strike(c1.querySelectorAll('.w')[1], T(14, 5) - 0.1, 12);
    words(sc, 'ده فرق في طريقة ما دماغك بيحرّك نفسه', { y: L(360, 640), size: L(60, 62), color: 'var(--sky-100)', at: [5, 6, 7, 8, 9, 10, 11, 12].map(k => T(14, k)) });
    const sp = el('i', 'fa-solid fa-bolt', null, sc, { position: 'absolute', fontSize: px(L(150, 170)), color: 'var(--sticky)', opacity: 0, filter: 'drop-shadow(0 0 30px rgba(245,230,163,.8))' }); center(sp, CX, L(600, 1000));
    pop(sp, T(14, 13) - 0.1, -8, 'rise', 0.6); tl.to(sp, { scale: 1.12, duration: 0.5, yoyo: true, repeat: 5, ease: 'sine.inOut' }, T(14, 14));
    words(sc, 'تقدر تعمل *الشرارة* دي بإيدك', { y: L(780, 1200), size: L(84, 84), at: [16, 17, 18, 19, 20].map(k => T(14, k)) });
  }

  // ════════ ١٥ · رجوع للواقع ════════
  { const sc = scene(P(15).t0 - 0.45, P(16).t0 - 0.9, 'real');
    const r = foot(sc, 'R04b', P(15).t0 - 0.45, P(16).t0 - 0.9, { from: 0.5, speed: 0.85, focus: [0.5, 0.62], zoom: [1.18, 1.28], fadeIn: 0.4, shade: true });
    tl.fromTo(r.tint, { opacity: 0.85 }, { opacity: 0, duration: 0.9, immediateRender: false }, P(15).t0 - 0.3); fx('reverse', P(15).t0 - 0.9, 0.5); fx('whoosh', P(15).t0 - 0.3, 0.6);
    capWords(sc, 15, 7, 13, { ...CAP, hl: [11, 12], end: T(15, 14) - 0.1 });
    capWords(sc, 15, 14, 20, { ...CAP, hl: [16] });
  }

  // ════════ ١٦–٢١ · تعمل إيه؟ (فاتح + أصفر) ════════
  { const t = P(16).t0 - 1.0, sc = scene(t, P(16).t0 - 0.05, 'light');
    words(sc, 'طب ~تعمل~ إيه؟', { y: L(400, 820), size: L(140, 130), color: 'var(--ink)', t: t + 0.05 });
    fx('whoosh_big', t, 0.8); fx('slap', t + 0.3, 0.6);
  }
  chapter('تعمل إيه؟', P(16).t0 - 0.2, P(21).t1 + 0.3, 'ink', 'var(--sticky)');
  const big = L({ x: 760, y: 200, w: 1040 }, { x: 60, y: 260, w: 960 });
  // ١٦–١٧: صغّر أول خطوة
  { const sc = scene(P(16).t0 - 0.1, P(18).t0 - 0.3);
    const s = step(sc, 1, 'صغّر أول خطوة…<br>لحد ما تبقى <span class="hl" style="white-space:nowrap">سهلة بشكل يضحّك</span>', P(16).t0 - 0.05, big, L(64, 62));
    const r1 = row(s, '<span style="color:var(--ink-2);position:relative">«هكتب التقرير»</span>', L(46, 46), 40), r2 = row(s, '<i class="fa-solid fa-arrow-left-long" style="color:var(--sky-400)"></i>«هفتح الملف، وأكتب العنوان بس»', L(46, 44), 22);
    rise(r1, T(16, 12) - 0.1, 20, 0.3, 'pop', 0.5); strike(r1.querySelector('span'), T(16, 14) - 0.05);
    rise(r2, T(16, 15) - 0.1, 20, 0.3, 'pop', 0.7);
    const mt = mountain(sc, L(400, 540), L(560, 1250), L(560, 640)); tl.fromTo(mt, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.5 }, P(16).t0 + 0.2);
    // ١٧: الجبل يصغر، ولقطة إيد بتبدأ تكتب
    tl.to(s, { opacity: 0, x: L(400, 0), y: L(0, -80), duration: 0.4, ease: 'power2.in' }, P(17).t0 - 0.3);
    tl.to(mt, { scale: 0.35, y: L(160, 120), duration: 0.8, ease: 'power3.inOut' }, T(17, 3) - 0.1); fx('swish', T(17, 3), 0.7);
    const fb = L({ x: 760, y: 200, w: 1040, h: 585 }, { x: 60, y: 260, w: 960, h: 540 });
    foot(sc, 'R05', P(17).t0 - 0.1, P(18).t0 - 0.3, { box: fb, radius: 36, focus: [0.5, 0.5], zoom: [1.0, 1.08], fadeIn: 0.35 }); fx('whoosh', P(17).t0 - 0.15, 0.6);
    capWords(sc, 17, 7, 15, { y: L(830, 1500), size: L(54, 60), color: 'var(--ink)', shadow: false, x: L(760, null), width: L(1040, null), hl: [11, 12], hlCls: 'hl' });
  }
  // ١٨: اعمل الشرارة بإيدك — تايمر ١٠ دقايق
  { const sc = scene(P(18).t0 - 0.3, P(19).t0 - 0.3);
    const s = step(sc, 2, 'اعمل <span class="hl">الشرارة</span> بإيدك', P(18).t0 - 0.2, L({ x: 760, y: 200, w: 1040 }, big), L(70, 66));
    const g = row(s, '<span style="color:var(--ink-2)">لو الوقت مش زانقك…</span> <b style="color:var(--blue-700)">ازنقه إنت</b>', L(44, 42), 30); rise(g, T(18, 5) - 0.1, 20, 0.3);
    const R = L(420, 440), rc = L([440, 560], [540, 1010]);
    const ring = el('div', null, '<svg viewBox="0 0 200 200" width="100%" height="100%" style="transform:rotate(-90deg)"><circle cx="100" cy="100" r="86" fill="#fff" stroke="#E3EEFB" stroke-width="16"/><circle class="arc" cx="100" cy="100" r="86" fill="none" stroke="#18B1FE" stroke-width="16" stroke-linecap="round" stroke-dasharray="540.4" stroke-dashoffset="0"/></svg><div class="lab" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;direction:ltr;font-weight:1000;color:var(--ink);font-variant-numeric:tabular-nums"></div>', sc,
      { position: 'absolute', width: px(R), height: px(R), opacity: 0, filter: 'drop-shadow(0 18px 30px rgba(4,30,80,.3))' });
    center(ring, rc[0], rc[1]); pop(ring, T(18, 11) - 0.1, 0, 'pop', 0.8);
    const lab = ring.querySelector('.lab'), arc = ring.querySelector('.arc'); lab.style.fontSize = px(R * 0.24);
    const ts = T(18, 13);
    dyn(t => { const e = Math.max(0, t - ts), r = Math.max(0, 600 - e); lab.textContent = String(Math.floor(r / 60)).padStart(2, '0') + ':' + String(Math.floor(r % 60)).padStart(2, '0'); arc.setAttribute('stroke-dashoffset', 540.4 * (e / 600)); });
    const q = sticky(sc, '«هشتغل لحد ما يرن…<br>وبعدين أنا حر»', L(1280, 540), L(820, 1530), L(760, 820), L(44, 44), T(18, 17) - 0.1, -2);
  }
  // ١٩: زوّد حاجة جديدة
  { const sc = scene(P(19).t0 - 0.3, P(20).t0 - 0.3);
    capWords(sc, 19, 0, 6, { y: L(170, 230), size: L(64, 66), color: 'var(--ink)', shadow: false, hl: [5, 6], hlCls: 'hl' });
    const C = [['R06', 'غيّر مكانك', 'fa-location-dot', 7], ['R07', 'اشتغل وصاحبك معاك', 'fa-video', 9], ['R08', 'قبل ما الشاي يبرد', 'fa-mug-hot', 17]];
    const BX = L([{ x: 1290, y: 380, w: 520, h: 293 }, { x: 700, y: 380, w: 520, h: 293 }, { x: 110, y: 380, w: 520, h: 293 }],
                 [{ x: 90, y: 420, w: 900, h: 330 }, { x: 90, y: 860, w: 900, h: 330 }, { x: 90, y: 1300, w: 900, h: 330 }]);
    C.forEach(([id, tx, ic, k], j) => { const b = BX[j], t = T(19, k) - 0.15;
      const f = foot(sc, id, t, P(20).t0 - 0.3, { box: b, radius: 30, focus: id === 'R07' ? [0.5, 0.35] : [0.5, 0.5], zoom: [1.05, 1.12], fadeIn: 0.3, fadeOut: false });
      tl.fromTo(f, { y: 60 }, { y: 0, duration: 0.45, ease: 'power3.out', immediateRender: false }, t); fx('whoosh', t, 0.6);
      const c = chip(sc, '<i class="fa-solid ' + ic + '"></i>' + tx, 'sticky', b.x + b.w / 2, b.y + b.h + L(10, -20), L(36, 38)); c.style.zIndex = 4; pop(c, t + 0.25, j % 2 ? 2 : -2, 'pop', 0.6); });
  }
  // ٢٠: جلسة التركيز جوّه اتزان
  { const sc = scene(P(20).t0 - 0.3, P(21).t0 - 0.3);
    const ph = el('div', 'phone', '<div><img src="../../../etizan-posts/template/assets/screens/adult_pomodoro.png"></div>', sc); center(ph, L(620, 540), L(560, 700));
    tl.fromTo(ph, { opacity: 0, y: 200, rotation: 0 }, { opacity: 1, y: 0, rotation: -4, duration: 0.6, ease: 'power3.out' }, T(20, 3) - 0.3); fx('whoosh', T(20, 3) - 0.3, 0.7);
    const pl = el('div', 'pill', '<i class="fa-solid fa-mobile-screen"></i>جوّه اتزان: جلسة التركيز', sc, { background: 'var(--blue-700)', color: '#fff', fontSize: px(L(32, 34)), boxShadow: 'var(--shadow-card)', opacity: 0 });
    center(pl, L(620, 540), L(1000, 1150)); pop(pl, T(20, 6) - 0.1, 0, 'pop', 0.6);
    [['fa-stopwatch', 'وقت قصير', 9], ['fa-eye', 'قدام عينك', 11], ['fa-1', 'حاجة واحدة بس', 13]].forEach(([ic, tx, k], j) =>
      cchip(sc, '<i class="fa-solid ' + ic + '"></i>' + tx, 'white', L(1350, 540), L(380 + j * 170, 1330 + j * 150), T(20, k) - 0.1, L(46, 46), j % 2 ? 2 : -2));
  }
  // ٢١: شيل المشتت قبل ما تبدأ
  { const sc = scene(P(21).t0 - 0.3, P(22).t0 - 0.45);
    const s = step(sc, 3, 'شيل المشتت <span class="hl">قبل</span> ما تبدأ', P(21).t0 - 0.2, L({ x: 900, y: 200, w: 900 }, big), L(58, 64));
    const fb = L({ x: 110, y: 200, w: 700, h: 394 }, { x: 60, y: 620, w: 960, h: 540 });
    foot(sc, 'R09', T(21, 11) - 0.2, P(22).t0 - 0.45, { box: fb, radius: 30, zoom: [1.0, 1.1], fadeIn: 0.3, fadeOut: false });
    const lb = chip(sc, '<i class="fa-solid fa-mobile-screen"></i>في أوضة تانية', 'sticky', fb.x + fb.w / 2, fb.y + fb.h + L(10, -10), L(36, 38)); lb.style.zIndex = 4; pop(lb, T(21, 12), -2, 'slap', 0.6);
    // تابات بتتقفل
    const strip = el('div', 'browser', '<div class="tabs"></div>', sc, { left: px(L(110, 60)), top: px(L(690, 1220)), width: px(L(700, 960)), height: px(64), borderRadius: '14px', opacity: 0, boxShadow: 'var(--shadow-card)' });
    const tabs = strip.querySelector('.tabs'); const tt = [];
    for (let i = 0; i < 17; i++) tt.push(el('div', 'tab' + (i === 0 ? ' on' : ''), '<b style="background:hsl(' + (i * 47 % 360) + ',55%,50%)"></b>', tabs));
    rise(strip, T(21, 15) - 0.2, 20, 0.3);
    const t0 = T(21, 15), t1 = T(21, 19) + 0.2;
    dyn(t => { const n = t < t0 ? 17 : Math.max(3, Math.round(17 - 14 * lerp(t, t0, t1))); tt.forEach((x, i) => x.style.display = i < n ? 'flex' : 'none'); });
    [0.3, 0.6, 0.9].forEach(f => fx('pop', t0 + (t1 - t0) * f, 0.4));
    const door = el('i', 'fa-solid fa-door-open', null, sc, { position: 'absolute', fontSize: px(L(150, 150)), color: 'var(--blue-700)', opacity: 0 }); center(door, L(1350, 540), L(700, 1560));
    pop(door, T(21, 22) - 0.1, 0, 'pop', 0.5);
    tl.set(door, { attr: { class: 'fa-solid fa-door-closed' } }, T(21, 26) - 0.05); fx('slap', T(21, 26), 1);
    capWords(sc, 21, 24, 27, { y: L(850, 1680), size: L(54, 56), color: 'var(--ink)', shadow: false, x: L(900, null), width: L(900, null), hl: [26, 27], hlCls: 'hl' });
  }

  // ════════ ٢٢ · الواقع: السؤال الصح ════════
  { const sc = scene(P(22).t0 - 0.45, P(23).t0 - 0.3, 'real');
    foot(sc, 'R10', P(22).t0 - 0.45, P(23).t0 - 0.3, { from: 0.5, speed: 0.9, focus: [0.42, 0.5], zoom: [1.0, 1.1], fadeIn: 0.5, shade: true }); fx('whoosh', P(22).t0 - 0.5, 0.6);
    const q1 = chip(sc, '«أنا ليه كده؟»', 'glass', CX, L(760, 1450), L(64, 68)); q1.style.background = 'rgba(6,16,36,.55)';
    pop(q1, T(22, 14) - 0.1, -2, 'pop', 0.6); strike(q1, T(22, 17) - 0.1); tl.to(q1, { opacity: 0, y: -40, duration: 0.3 }, T(22, 17) + 0.35);
    const q2 = words(sc, '«إيه *أصغر* *خطوة* أقدر أعملها دلوقتي؟»', { y: L(800, 1440), size: L(76, 76), at: [18, 19, 20, 21, 22, 23].map(k => T(22, k)) });
    q2.style.textShadow = '0 6px 28px rgba(0,0,0,.5)';
  }
  // ════════ ٢٣–٢٥ · الخلاصة + اتزان + الحلقة الجاية ════════
  { const sc = scene(P(23).t0 - 0.3, P(24).t0 - 0.2, 'blue');
    words(sc, 'إنت مش كسلان…', { y: L(330, 700), size: L(110, 104), at: [0, 1, 2].map(k => T(23, k)) });
    words(sc, 'دماغك بس محتاج *شرارة.*', { y: L(500, 900), size: L(110, 92), at: [3, 4, 5, 6].map(k => T(23, k)) });
    const sp = el('i', 'fa-solid fa-bolt', null, sc, { position: 'absolute', fontSize: px(L(120, 140)), color: 'var(--sticky)', opacity: 0, filter: 'drop-shadow(0 0 30px rgba(245,230,163,.8))' }); center(sp, CX, L(800, 1250));
    pop(sp, T(23, 6) + 0.1, -8, 'impact', 0.5);
  }
  { const sc = scene(P(24).t0 - 0.2, P(25).t0 - 0.2);
    const lg = el('div', null, '<img src="../../../etizan-explainer-video/pipeline/assets/logo-full.png" style="height:' + px(L(130, 140)) + ';display:block">', sc, { position: 'absolute', padding: '26px 56px', background: '#fff', borderRadius: '60px', boxShadow: 'var(--shadow-card)', opacity: 0 });
    center(lg, CX, L(560, 940)); pop(lg, T(24, 8) - 0.2, 0, 'whoosh', 0.8);
    capWords(sc, 24, 0, 5, { y: L(260, 560), size: L(64, 66), color: 'var(--sky-100)' });
  }
  { const sc = scene(P(25).t0 - 0.2, null);
    const sp = el('div', 'pill glass', '<span class="dot"></span>ليه دماغي بتعمل كده؟', sc, { fontSize: px(L(32, 36)), opacity: 0 }); center(sp, L(1420, 540), L(200, 360)); rise(sp, P(25).t0, -20);
    const nx = el('div', 'pill ink', 'الحلقة الجاية', sc, { fontSize: px(L(30, 34)), opacity: 0 }); center(nx, L(1420, 540), L(290, 460)); rise(nx, T(25, 1) - 0.1, -20);
    const q = words(sc, 'ليه خمس دقايق | على الموبايل… | *بتتحوّل* *لساعة؟*', { y: L(380, 600), size: L(76, 84), at: [3, 4, 5, 6, 7, 8, 9].map(k => T(25, k)) });
    if (H) Object.assign(q.style, { left: 'auto', right: '100px', width: '860px', padding: 0, textAlign: 'center' });
    const lg = el('div', null, '<img src="../../../etizan-explainer-video/pipeline/assets/logo-full.png" style="height:' + px(L(80, 96)) + ';display:block">', sc, { position: 'absolute', padding: '18px 40px', background: '#fff', borderRadius: '44px', boxShadow: 'var(--shadow-card)', opacity: 0 });
    center(lg, L(1420, 540), L(820, 1560)); rise(lg, P(25).t1 + 0.3, 20);
    if (H) { // مكان عناصر نهاية يوتيوب (فاضي في الفيديو؛ يوتيوب بيحط عليه)
      const es = el('div', null, null, sc, { position: 'absolute', left: '110px', top: '170px', width: '760px', height: '428px', borderRadius: '28px', border: '4px dashed rgba(255,255,255,.28)', opacity: 0 });
      const sb = el('div', null, null, sc, { position: 'absolute', left: '370px', top: '650px', width: '240px', height: '240px', borderRadius: '50%', border: '4px dashed rgba(255,255,255,.28)', opacity: 0 });
      rise(es, P(25).t1 + 0.4, 20); rise(sb, P(25).t1 + 0.6, 20);
    } else {
      const fol = el('div', 'pill', '<i class="fa-solid fa-bell"></i>تابع السلسلة', sc, { background: 'var(--sticky)', color: 'var(--ink)', fontSize: '40px', opacity: 0, boxShadow: 'var(--shadow-card)' }); center(fol, 540, 1350); pop(fol, P(25).t1 + 0.5, -2, 'pop', 0.6);
    }
    tl.to('#stage', { opacity: 0, duration: 0.6 }, DUR - 0.6);
  }
} };
