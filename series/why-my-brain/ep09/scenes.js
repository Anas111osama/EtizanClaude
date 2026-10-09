// الحلقة ٩ — «ليه قرار بسيط… بياخد مني يوم كامل؟»
// كل حركة مربوطة بكلمتها: T(فقرة، رقم الكلمة) — الفقرات ١..٢٣ زي script.txt. L(عريض، طولي) لكل مكان.
// التشبيه الثابت: كل قرار ميزان — عند ناس كتير بيميل لوحده بسرعة؛ في ADHD الاختيارات بتبان بنفس الوزن، فالميزان يفضل يتهز.
window.EPISODE = { n: 9, gaps: { 4: 3.0, 6: 0.5, 8: 0.3, 9: 0.4, 10: 0.4, 11: 0.3, 13: 1.1, 15: 0.3, 17: 0.3, 19: 0.6, 20: 0.3, 23: 7.5 }, build(A) {
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
  // ── الميزان: عارضة على محور وكفّتين متعلّقين. st.a = زاوية الميل (موجبة = الكفّة اليمين بتنزل) ──
  function balance(sc, C) {   // C = {x, y: المحور, bl: نص العارضة, hl: طول الحبال, post: طول العمود}
    const s = document.createElementNS(NS, 'svg'); s.setAttribute('width', L(1920, 1080)); s.setAttribute('height', L(1080, 1920)); s.style.cssText = 'position:absolute;left:0;top:0;overflow:visible'; sc.appendChild(s);
    const mk = (tag, at, p = s) => { const e = document.createElementNS(NS, tag); for (const k in at) e.setAttribute(k, at[k]); p.appendChild(e); return e; };
    const root = mk('g', {});
    mk('line', { x1: C.x, y1: C.y, x2: C.x, y2: C.y + C.post, stroke: 'rgba(255,255,255,.85)', 'stroke-width': 12, 'stroke-linecap': 'round' }, root);
    mk('rect', { x: C.x - 110, y: C.y + C.post - 6, width: 220, height: 26, rx: 13, fill: 'rgba(255,255,255,.85)' }, root);
    const beam = mk('line', { stroke: '#fff', 'stroke-width': 14, 'stroke-linecap': 'round' }, root);
    mk('circle', { cx: C.x, cy: C.y, r: 18, fill: '#F5E6A3' }, root);
    const PW = C.pw || 120;
    const pans = [0, 1].map(() => { const g = mk('g', {}, root);
      mk('line', { x1: 0, y1: -C.hl, x2: -PW + 10, y2: 0, stroke: 'rgba(255,255,255,.7)', 'stroke-width': 4 }, g);
      mk('line', { x1: 0, y1: -C.hl, x2: PW - 10, y2: 0, stroke: 'rgba(255,255,255,.7)', 'stroke-width': 4 }, g);
      const items = mk('g', {}, g);
      mk('path', { d: 'M' + (-PW) + ' 0 Q 0 ' + (PW * 0.6) + ' ' + PW + ' 0 Z', fill: 'rgba(255,255,255,.92)' }, g);
      g.items = items; g.n = 0; return g; });
    const st = { a: 0 };
    const end = (side, a) => { const r = a * Math.PI / 180, k = side ? 1 : -1; return [C.x + k * C.bl * Math.cos(r), C.y + k * C.bl * Math.sin(r)]; };
    const render = () => { const [lx, ly] = end(0, st.a), [rx, ry] = end(1, st.a);
      beam.setAttribute('x1', lx); beam.setAttribute('y1', ly); beam.setAttribute('x2', rx); beam.setAttribute('y2', ry);
      pans[0].setAttribute('transform', 'translate(' + lx + ',' + (ly + C.hl) + ')'); pans[1].setAttribute('transform', 'translate(' + rx + ',' + (ry + C.hl) + ')'); };
    render(); dyn(render);
    gsap.set(root, { opacity: 0 });
    const COLS = ['#F5C542', '#7BC8F6', '#F2A33A', '#9AE6B4', '#F6A5C0', '#B794F4'];
    return {
      root, st, C,
      pan: (side, a = st.a) => { const [x, y] = end(side, a); return [x, y + C.hl]; },
      // اختيار بيقع على الكفّة (side 0 = شمال، 1 = يمين)
      drop(side, t, label, col) { const p = pans[side], k = p.n++, row = Math.floor(k / 4), x = -PW + 34 + (k % 4) * ((2 * PW - 68) / 3) + (row % 2) * 18, y = -22 - row * 36;
        const g = mk('g', {}, p.items); gsap.set(g, { opacity: 0 }); const c = mk('circle', { cx: x, cy: y, r: 22, fill: col || COLS[k % COLS.length], stroke: 'rgba(10,30,70,.25)', 'stroke-width': 3 }, g);
        if (label) { const tx = mk('text', { x, y: y + 9, 'text-anchor': 'middle', 'font-size': 26, 'font-weight': 900, fill: '#0B2A5B', 'font-family': 'inherit' }, g); tx.textContent = label; }
        tl.fromTo(g, { opacity: 0, y: -90 }, { opacity: 1, y: 0, duration: 0.4, ease: 'bounce.out', immediateRender: false }, t); return g; },
      tilt(a, t, d = 0.6, ease = 'power2.inOut') { tl.to(st, { a, duration: d, ease }, t); },
      wobble(t, amp, n, d = 0.42) { tl.fromTo(st, { a: -amp }, { a: amp, duration: d, ease: 'sine.inOut', yoyo: true, repeat: n, immediateRender: false }, t); },
    };
  }

  // ════════ ١–٤ · الواقع ════════
  const T4 = T(4, 2) - 0.2;
  { const sc = scene(0, T4 + 0.6, 'real');
    // ١: سمّاعة… عشرين تابة لحد اتنين بالليل — وقفلت من غير ما تشتري
    foot(sc, 'S01', 0, P(2).t0 - 0.1, { from: 0.5, speed: 0.9, focus: L([0.5, 0.5], [0.55, 0.5]), zoom: [1.0, 1.08], fadeIn: 0.6, fadeOut: 0.1, shade: true }); fx('typing', 0.3, 0.4);
    const hp = cchip(sc, '<i class="fa-solid fa-headphones"></i>سمّاعة', 'white', L(1460, 540), L(250, 290), T(1, 2) - 0.1, L(44, 44), -2);
    const tb = cchip(sc, '<i class="fa-solid fa-window-restore"></i><span class="n">١</span> تابة', 'white', L(1460, 540), L(370, 410), T(1, 4) - 0.1, L(44, 44), 2);
    const tn = tb.querySelector('.n'), AN = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
    dyn(t => { tn.textContent = AN(Math.max(1, Math.min(20, Math.round(1 + 19 * lerp(t, T(1, 4), T(1, 6)))))); }); fx('key', T(1, 4), 0.5);
    const ck = cchip(sc, '<i class="fa-solid fa-moon"></i>٢:٠٠ بالليل', 'glass', L(1460, 540), L(490, 530), T(1, 9) - 0.1, L(42, 42), -2); ck.style.background = 'rgba(6,16,36,.55)'; fx('ticktock', T(1, 9), 0.3);
    capWords(sc, 1, 0, 10, { ...CAP, hl: [4, 9], end: T(1, 11) - 0.1 });
    tl.to([hp, tb, ck], { opacity: 0.35, duration: 0.3 }, T(1, 11));
    const cart = cchip(sc, '<i class="fa-solid fa-cart-shopping"></i>السلة فاضية', 'sticky', L(1180, 540), L(380, 640), T(1, 13) - 0.1, L(46, 46), 3, 'slap');
    capWords(sc, 1, 11, 16, { ...CAP, hl: [16], end: P(2).t0 - 0.1 });
    tl.to([hp, tb, ck, cart], { opacity: 0, duration: 0.25 }, P(2).t0 - 0.25);
    // ٢: الغدا — نص ساعة مطعم ورا مطعم… ونفس الطلب بتاع كل مرة
    foot(sc, 'S02', P(2).t0 - 0.12, P(3).t0 - 0.1, { from: 0, speed: 1, focus: L([0.55, 0.4], [0.6, 0.4]), zoom: [1.05, 1.1], fadeIn: 0.1, fadeOut: 0.1, shade: true }); fx('whoosh', P(2).t0 - 0.15, 0.5);
    const hh = cchip(sc, '<i class="fa-solid fa-clock"></i>نص ساعة', 'white', L(520, 540), L(250, 290), T(2, 2) - 0.1, L(42, 42), -2);
    const FD = [['fa-pizza-slice', 'بيتزا'], ['fa-burger', 'برجر'], ['fa-bowl-food', 'كشري'], ['fa-drumstick-bite', 'فراخ'], ['fa-fish', 'سمك']];
    const t7 = T(2, 7) - 0.1, t9 = T(2, 10) - 0.1, dt = (t9 - t7) / FD.length;
    const fds = FD.map(([ic, tx], j) => { const c = chip(sc, '<i class="fa-solid ' + ic + '"></i>' + tx, 'white', L(520, 540), L(370, 410), L(46, 46));
      tl.fromTo(c, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.15 }, t7 + j * dt); if (j < FD.length - 1) tl.to(c, { opacity: 0, x: -60, duration: 0.15 }, t7 + (j + 1) * dt - 0.05); fx('swish', t7 + j * dt, 0.25); return c; });
    capWords(sc, 2, 0, 9, { ...CAP, hl: [2, 3, 7, 9], end: T(2, 10) - 0.1 });
    tl.to([hh, fds[fds.length - 1]], { opacity: 0.3, duration: 0.3 }, T(2, 10));
    const same = cchip(sc, '<i class="fa-solid fa-rotate"></i>نفس الطلب بتاع كل مرة', 'sticky', L(560, 540), L(500, 530), T(2, 12) - 0.1, L(46, 44), 2, 'slap');
    capWords(sc, 2, 10, 17, { ...CAP, hl: [13, 14], end: P(3).t0 - 0.1 });
    tl.to([hh, ...fds, same], { opacity: 0, duration: 0.25 }, P(3).t0 - 0.2);
    // ٣: خمس مهام… بأنهي واحدة؟ — تفضل تختار لحد ما اليوم يخلص (وبيتجمّد عند «طب ليه؟»)
    foot(sc, 'S03', P(3).t0 - 0.15, T(3, 9) - 0.1, { from: 1, focus: L([0.5, 0.45], [0.42, 0.45]), zoom: [1.05, 1.1], fadeIn: 0.3, fadeOut: 0.1, shade: true }); fx('whoosh', P(3).t0 - 0.2, 0.5);
    const TK = ['إيميل الشغل', 'التقرير', 'مكالمة البنك', 'ترتيب الملفات', 'المذاكرة'];
    const TP = L([[1500, 200], [1500, 290], [1500, 380], [1500, 470], [1500, 560]], [[540, 250], [540, 330], [540, 410], [540, 490], [540, 570]]);
    const tks = TK.map((x, j) => cchip(sc, '<i class="fa-regular fa-square"></i>' + x, 'white', TP[j][0], TP[j][1], T(3, 1) - 0.1 + j * 0.12, L(36, 36), j % 2 ? 1.5 : -1.5, j ? null : 'pop'));
    const qm = icon(sc, 'fa-question', L(1250, 880), L(380, 410), L(90, 90), '#F5E6A3', T(3, 7) - 0.1, 'pop');
    tl.to(tks, { x: () => gsap.utils.random(-14, 14), duration: 0.12, repeat: 5, yoyo: true }, T(3, 7));
    capWords(sc, 3, 0, 8, { ...CAP, hl: [1, 2, 7], end: T(3, 9) - 0.1 });
    tl.to([...tks, qm], { opacity: 0, duration: 0.25 }, T(3, 9) - 0.2);
    const fz = T(4, 0);
    const r = foot(sc, 'S04', T(3, 9) - 0.12, T4 + 0.25, { from: 2, speed: 1, freeze: fz, focus: L([0.5, 0.45], [0.5, 0.45]), zoom: [1.0, 1.05], fadeIn: 0.1, shade: true }); fx('swish', T(3, 9) - 0.15, 0.5);
    const ev = cchip(sc, '<i class="fa-solid fa-cloud-sun"></i>اليوم خلص', 'glass', L(1460, 540), L(250, 300), T(3, 13) - 0.1, L(42, 42), -2); ev.style.background = 'rgba(6,16,36,.55)'; fx('ticktock', T(3, 13), 0.3); out(ev, fz - 0.2, 0.2);
    capWords(sc, 3, 9, 14, { ...CAP, hl: [10, 13, 14], end: fz - 0.1 });
    flash(fz, 0.35); fx('lowhit', fz, 0.8); fx('reverse', fz - 0.7, 0.5);
    tl.to(r.querySelector('.src > img'), { filter: 'grayscale(1) brightness(.8)', duration: 0.4 }, fz);
    tl.to(r.tint, { opacity: 0.82, duration: 0.7 }, fz + 0.15);
    trace(r, ['M1030 330 C1030 190, 1250 190, 1250 330 C1250 470, 1030 470, 1030 330 Z', 'M1140 180 L1140 120 M1250 215 L1300 165 M1030 215 L980 165'], fz + 0.25, 0.8);
    fx('swish', fz + 0.3, 0.5);
    capWords(sc, 4, 0, 1, { ...CAP, y: L(470, 1420), size: L(110, 110), hl: [1], end: T4 + 0.05 });
  }
  // ════════ كارت العنوان ════════
  { const sc = scene(T4, P(5).t0 - 0.35, 'blue');
    const q = el('div', 'qmark', '؟', sc, { fontSize: px(L(1000, 760)), opacity: 0 }); Object.assign(q.style, H ? { left: '80px', top: '30px' } : { left: '160px', top: '1060px' });
    tl.fromTo(q, { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, T4 + 0.1);
    const sp = el('div', 'pill glass', '<span class="dot"></span>ليه دماغي بتعمل كده؟', sc, { fontSize: px(L(34, 38)), opacity: 0 });
    if (H) Object.assign(sp.style, { right: '160px', top: '230px' }); else center(sp, 540, 520); rise(sp, T4 + 0.05, -20);
    const ep = el('div', 'pill ink', 'الحلقة ٩', sc, { fontSize: px(L(28, 32)), padding: '6px 24px', opacity: 0 });
    if (H) Object.assign(ep.style, { right: '160px', top: '320px' }); else center(ep, 540, 610); rise(ep, T4 + 0.25, -20);
    const t1 = words(sc, 'ليه قرار بسيط…', { y: L(430, 760), size: L(112, 96), at: [2, 3, 4].map(k => T(4, k)) });
    const t2 = words(sc, 'بياخد مني *يوم* *كامل؟*', { y: L(580, 920), size: L(118, 104), at: [5, 6, 7, 8].map(k => T(4, k)) });
    if (H) [t1, t2].forEach(x => Object.assign(x.style, { left: 'auto', right: '160px', textAlign: 'right', padding: 0 }));
    fx('impact', T(4, 8) + 0.4, 0.9); flash(T(4, 8) + 0.4, 0.15);
    tl.to([t1, t2, sp, ep], { opacity: 0, y: -40, duration: 0.35 }, P(5).t0 - 0.6); fx('whoosh_big', P(5).t0 - 0.6, 0.8);
  }
  // ════════ ٥–٦ · اللي بيتقال لك (فاتح) ════════
  { const sc = scene(P(5).t0 - 0.35, P(7).t0 - 0.35, 'light');
    chapter('اللي بيتقال لك', P(5).t0 - 0.2, P(7).t0 - 0.4, 'ink', 'var(--sky-400)');
    capWords(sc, 5, 0, 1, { y: L(170, 220), size: L(54, 58), color: 'var(--ink-2)', shadow: false, end: P(6).t0 - 0.1 });
    const PA = L([[1400, 340, -3], [880, 390, 2], [1160, 530, -2]], [[540, 420, -3], [540, 570, 2], [540, 720, -2]]);
    const cs = [['«إنت متردد»', 2], ['«مش عارف إنت عايز إيه»', 4], ['«اختار أي حاجة وخلاص»', 9]].map(([q, k], j) => cchip(sc, q, 'ghost', PA[j][0], PA[j][1], T(5, k) - 0.08, L(48, 44), PA[j][2], 'slap'));
    // ٦: لو كان سهل… كنت عملتها من بدري — اللي جوّه مختلف
    tl.to(cs, { opacity: 0.3, scale: 0.9, duration: 0.4 }, P(6).t0);
    const ez = cchip(sc, '<i class="fa-solid fa-hand-pointer"></i>«أي حاجة وخلاص»', 'ghost', L(1300, 540), L(740, 960), T(6, 3) - 0.1, L(46, 44), -2); strike(ez, T(6, 8));
    capWords(sc, 6, 0, 10, { y: L(860, 1100), size: L(50, 52), color: 'var(--ink-2)', shadow: false, end: T(6, 11) - 0.1 });
    cchip(sc, '<i class="fa-solid fa-brain"></i>اللي بيحصل جوّه مختلف', 'sticky', L(640, 540), L(740, 1260), T(6, 11) - 0.08, L(54, 52), 2, 'slap');
  }
  // ════════ ٧–١٣ · اللي بيحصل جوّه ════════
  chapter('اللي بيحصل جوّه', P(7).t0 - 0.2, P(13).t1 + 0.2);
  const TOP = { y: L(150, 200), size: L(58, 58) };
  // ٧–١٠: الميزان
  { const sc = scene(P(7).t0 - 0.35, P(11).t0 - 0.4, 'blue');
    const B = balance(sc, L({ x: 960, y: 440, bl: 380, hl: 150, post: 420, pw: 120 }, { x: 540, y: 780, bl: 330, hl: 170, post: 520, pw: 120 }));
    capWords(sc, 7, 0, 2, { ...TOP, end: T(7, 3) - 0.1 });
    tl.fromTo(B.root, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, T(7, 7) - 0.3); fx('whoosh', T(7, 7) - 0.3, 0.6);
    B.drop(0, T(7, 9) - 0.1, 'أ', '#F5C542'); B.drop(1, T(7, 9) + 0.15, 'ب', '#7BC8F6'); fx('pop', T(7, 9), 0.5);
    B.tilt(-12, T(7, 12) - 0.1, 0.8); fx('swish', T(7, 12), 0.4);
    capWords(sc, 7, 3, 15, { ...TOP, hl: [7, 12], end: P(8).t0 - 0.1 });
    // ٨: عند ناس كتير… بيميل لوحده بسرعة — «ده أهم»
    B.tilt(0, P(8).t0 - 0.2, 0.4);
    B.tilt(-14, T(8, 4) - 0.05, 0.3, 'back.out(2)'); fx('slap', T(8, 6), 0.5);
    const [px0, py0] = B.pan(0, -14);
    const imp = cchip(sc, '<i class="fa-solid fa-star"></i>«ده أهم»', 'sticky', px0, py0 + L(100, 110), T(8, 10) - 0.1, L(40, 40), -3, 'slap');
    capWords(sc, 8, 0, 12, { ...TOP, hl: [4, 6, 10, 11], end: P(9).t0 - 0.1 });
    // ٩: في دماغ ADHD — نفس الوزن، مفيش «ده أهم»… فالميزان يفضل يتهز
    out(imp, P(9).t0 - 0.1); B.tilt(0, P(9).t0, 0.5);
    [0, 1, 2].forEach(j => { B.drop(0, T(9, 7) + j * 0.18); B.drop(1, T(9, 7) + 0.09 + j * 0.18); }); fx('pop', T(9, 7), 0.5);
    const same = label(sc, '<i class="fa-solid fa-equals"></i>نفس الوزن', B.C.x, B.C.y + L(250, 300), T(9, 11) - 0.1, 'glass', L(34, 36));
    const ni = cchip(sc, '«ده أهم»', 'ghost', L(1560, 540), L(780, 1420), T(9, 16) - 0.1, L(40, 40), -2); ni.style.color = '#fff'; ni.style.borderColor = 'rgba(255,255,255,.5)'; strike(ni, T(9, 17) + 0.1);
    B.wobble(T(9, 18), 7, 12); fx('ticktock', T(9, 19), 0.4);
    capWords(sc, 9, 0, 22, { ...TOP, hl: [8, 11, 12, 20, 22], end: P(10).t0 - 0.1 });
    // ١٠: كل اختيار زيادة بيتقّله — والترابيزة الصغيرة بتتزحم
    tl.to([same, ni], { opacity: 0, duration: 0.25 }, P(10).t0 - 0.1);
    [0, 1, 2, 3].forEach(j => { B.drop(0, T(10, 1) + j * 0.2); B.drop(1, T(10, 1) + 0.1 + j * 0.2); }); fx('counter', T(10, 1), 0.4);
    B.wobble(T(10, 5), 4, 14, 0.36);
    tl.to(B.root, { y: L(26, 30), duration: 0.6, ease: 'power2.in' }, T(10, 5));
    const tw = L(460, 620), tbl = el('div', null, '<div style="display:flex;align-items:center;gap:12px;font-weight:900;font-size:' + px(L(30, 32)) + ';color:var(--ink);margin-bottom:14px"><i class="fa-solid fa-table" style="color:var(--blue-700)"></i>الترابيزة الصغيرة</div><div class="it" style="display:flex;flex-wrap:wrap;gap:8px"></div>', sc,
      { position: 'absolute', width: px(tw), padding: '20px 24px', borderRadius: '26px', background: 'rgba(255,255,255,.95)', boxShadow: 'var(--shadow-card)', opacity: 0 });
    center(tbl, L(1600, 540), L(800, 1470)); rise(tbl, T(10, 7) - 0.1, 30, 0.35, 'pop', 0.5);
    const it = tbl.querySelector('.it'), IC = ['fa-headphones', 'fa-pizza-slice', 'fa-envelope', 'fa-file-lines', 'fa-phone', 'fa-folder', 'fa-book', 'fa-cart-shopping', 'fa-burger', 'fa-star', 'fa-tag', 'fa-clock'];
    IC.forEach((ic, j) => { const b = el('div', null, '<i class="fa-solid ' + ic + '"></i>', it, { width: px(L(52, 56)), height: px(L(52, 56)), borderRadius: '14px', display: 'grid', placeItems: 'center', fontSize: px(L(24, 26)), background: '#EEF3FA', color: 'var(--ink-2)', opacity: 0 });
      tl.fromTo(b, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.2 }, T(10, 9) + j * 0.08); });
    tl.to(tbl, { x: 6, duration: 0.06, repeat: 7, yoyo: true }, T(10, 12)); fx('lowhit', T(10, 12), 0.6);
    capWords(sc, 10, 0, 12, { ...TOP, hl: [3, 5, 12], end: P(11).t0 - 0.5 });
  }
  // ١١: الخوف من الغلط… تقارن وتقارن (واقع)
  { const sc = scene(P(11).t0 - 0.4, P(12).t0 - 0.3, 'real');
    foot(sc, 'S05', P(11).t0 - 0.4, P(12).t0 - 0.3, { from: 0.5, speed: 0.9, focus: L([0.4, 0.4], [0.32, 0.4]), zoom: [1.05, 1.12], fadeIn: 0.3, shade: true }); fx('whoosh_big', P(11).t0 - 0.3, 0.6);
    const wr = cchip(sc, '<i class="fa-solid fa-triangle-exclamation" style="color:#F2A33A"></i>«لو اخترت الغلط؟»', 'white', L(1440, 540), L(260, 300), T(11, 3) - 0.1, L(44, 44), -2);
    const cmp = el('div', null, '<span class="a" style="padding:14px 26px;border-radius:999px;background:#F5C542;color:#0B2A5B">أ</span><i class="fa-solid fa-right-left" style="color:#fff"></i><span class="b" style="padding:14px 26px;border-radius:999px;background:#7BC8F6;color:#0B2A5B">ب</span>', sc,
      { position: 'absolute', display: 'flex', alignItems: 'center', gap: '22px', fontWeight: 1000, fontSize: px(L(46, 48)), opacity: 0 });
    center(cmp, L(1440, 540), L(400, 440)); rise(cmp, T(11, 8) - 0.1, 20, 0.3, 'pop', 0.5);
    tl.to(cmp.querySelector('i'), { rotation: 180, duration: 0.35, repeat: 4, ease: 'power1.inOut' }, T(11, 8)); fx('swish', T(11, 9), 0.4);
    capWords(sc, 11, 0, 12, { ...CAP, hl: [1, 4, 8, 9, 12] });
  }
  // ١٢–١٣: مش متردد… الميزان مافيهوش حاجة تميّله — ميّله بإيدك
  { const sc = scene(P(12).t0 - 0.3, P(14).t0 - 1.1);
    const w = words(sc, 'المشكلة مش إنك ~متردد~', { y: L(170, 300), size: L(76, 60), at: [0, 1, 2, 3].map(k => T(12, k)) });
    strike(w.querySelectorAll('.w')[3], T(12, 4) - 0.1, 8);
    const r1 = el('div', null, '<i class="fa-solid fa-scale-balanced" style="color:var(--sky-100)"></i><span>الميزان</span><span style="opacity:.75">مافيهوش حاجة تميّله</span>', sc,
      { position: 'absolute', display: 'flex', alignItems: 'center', gap: '22px', fontWeight: 1000, fontSize: px(L(60, 50)), color: '#fff', opacity: 0, whiteSpace: 'nowrap' });
    center(r1, CX, L(420, 560)); rise(r1, T(12, 6) - 0.1, 20, 0.4, 'whoosh', 0.6);
    words(sc, 'ميّله *بإيدك*', { y: L(530, 700), size: L(72, 64), color: 'var(--sky-100)', at: [12, 13].map(k => T(12, k)) });
    const hd = icon(sc, 'fa-hand-point-down', L(1330, 820), L(580, 760), L(76, 66), '#F5E6A3', T(12, 13) + 0.1, 'pop');
    tl.to(hd, { y: 18, duration: 0.25, yoyo: true, repeat: 3 }, T(12, 13) + 0.4);
    // ١٣
    tl.to([w, r1], { opacity: 0.25, duration: 0.3 }, P(13).t0 - 0.15);
    words(sc, 'والخبر الحلو؟', { y: L(700, 900), size: L(56, 60), color: 'var(--sky-100)', at: [0, 1].map(k => T(13, k)) });
    cchip(sc, '<i class="fa-solid fa-scale-unbalanced"></i>يميل أسرع', 'sticky', CX, L(860, 1100), T(13, 8) - 0.1, L(56, 56), 2, 'slap');
  }

  // ════════ ١٤–١٩ · تعمل إيه؟ ════════
  { const t = P(14).t0 - 1.1, sc = scene(t, P(14).t0 - 0.05, 'light');
    words(sc, 'طب ~تعمل~ إيه؟', { y: L(400, 820), size: L(140, 130), color: 'var(--ink)', t: t + 0.05 }); fx('whoosh_big', t, 0.8); fx('slap', t + 0.3, 0.6);
  }
  chapter('تعمل إيه؟', P(14).t0 - 0.2, P(19).t1 + 0.3, 'ink', 'var(--sticky)');
  const SB = L({ x: 860, y: 200, w: 940 }, { x: 60, y: 230, w: 960 });
  const CB = L(SQ(470, 560, 600), SQ(540, 820, 560));
  const RX = L(1330, 540);
  const capR = (n, a, b, y, o = {}) => capWords(sc0, n, a, b, { y, size: L(46, 48), color: 'var(--ink)', shadow: false, x: L(880, null), width: L(900, null), hlCls: 'hl', ...o });
  let sc0;
  // ١٤–١٥: قلّل الاختيارات — تلاتة بس
  { const sc = sc0 = scene(P(14).t0 - 0.1, P(16).t0 - 0.3);
    step(sc, 1, 'قلّل <span class="hl">الاختيارات</span>', P(14).t0 - 0.05, SB, L(66, 64));
    card(sc, 'S06', T(14, 2) - 0.2, P(16).t0 - 0.3, CB, { focus: [0.5, 0.5], zoom: [1.1, 1.2], from: 0.5, speed: 0.8 });
    const g = el('div', null, null, sc, { position: 'absolute', display: 'grid', gridTemplateColumns: 'repeat(10,1fr)', gap: px(L(12, 14)), direction: 'rtl' }); center(g, RX, L(520, 1220));
    const dots = [...Array(20)].map((_, j) => el('div', null, '<i class="fa-solid fa-circle"></i>', g, { width: px(L(56, 62)), height: px(L(56, 62)), borderRadius: '16px', display: 'grid', placeItems: 'center', fontSize: px(L(18, 20)), background: '#fff', color: '#B9C7DB', boxShadow: 'var(--shadow-card)', opacity: 0 }));
    dots.forEach((d, j) => tl.fromTo(d, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.2 }, T(14, 2) + j * 0.03)); fx('counter', T(14, 2), 0.4);
    [0, 1, 2].forEach(j => tl.to(dots[j], { background: 'var(--sticky)', color: 'var(--ink)', scale: 1.12, duration: 0.25 }, T(14, 5) - 0.1 + j * 0.12)); fx('pop', T(14, 5), 0.5);
    tl.to(dots.slice(3), { opacity: 0.12, scale: 0.7, duration: 0.4, stagger: 0.015 }, T(14, 7) - 0.05); fx('swish', T(14, 7), 0.5);
    capR(14, 7, 14, L(700, 1400), { hl: [7, 8, 14], end: P(15).t0 - 0.1 });
    // ١٥: ميزان عليه تلاتة… أسهل من ميزان عليه عشرين
    const m3 = cchip(sc, '<i class="fa-solid fa-scale-balanced"></i>٣ حاجات', 'sticky', L(1150, 360), L(720, 1400), T(15, 2) - 0.1, L(48, 46), -2, 'slap');
    const m20 = cchip(sc, '<i class="fa-solid fa-scale-balanced"></i>٢٠ حاجة', 'ghost', L(1550, 740), L(720, 1400), T(15, 9) - 0.1, L(44, 42), 2); strike(m20, T(15, 9) + 0.25);
    capR(15, 0, 9, L(840, 1540), { hl: [2, 4, 5] });
  }
  // ١٦–١٧: حط وقت للقرار
  { const sc = sc0 = scene(P(16).t0 - 0.3, P(18).t0 - 0.3);
    step(sc, 2, 'حط <span class="hl">وقت</span> للقرار', P(16).t0 - 0.2, SB, L(66, 64));
    card(sc, 'S07', T(16, 2) - 0.2, P(17).t0 - 0.2, CB, { focus: [0.5, 0.5], zoom: [1.15, 1.2], from: 0, speed: 0.9, fadeOut: 0.15 });
    card(sc, 'S08', P(17).t0 - 0.15, P(18).t0 - 0.3, CB, { focus: [0.5, 0.5], zoom: [1.1, 1.16], from: 0.5, speed: 0.8 });
    const say = el('div', null, '<i class="fa-solid fa-comment" style="margin-left:14px;color:var(--blue-700)"></i>«هختار قبل ما التايمر يخلص»', sc, { position: 'absolute', padding: '22px 34px', borderRadius: '34px 34px 34px 8px', background: '#DCF3FF', color: 'var(--ink)', fontWeight: 900, fontSize: px(L(42, 42)), boxShadow: 'var(--shadow-card)', opacity: 0, whiteSpace: 'nowrap' });
    center(say, RX, L(500, 1200)); rise(say, T(16, 6) - 0.1, 30, 0.4, 'pop', 0.7);
    const tm = el('div', null, '<i class="fa-solid fa-stopwatch" style="color:var(--blue-700);margin-left:16px"></i><span class="n">١٠:٠٠</span>', sc, { position: 'absolute', padding: '18px 40px', borderRadius: '30px', background: '#fff', color: 'var(--ink)', fontWeight: 1000, fontSize: px(L(64, 66)), boxShadow: 'var(--shadow-card)', opacity: 0, direction: 'ltr' });
    center(tm, RX, L(660, 1360)); rise(tm, T(16, 11) - 0.1, 20, 0.3, 'beep', 0.4);
    const AN = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]), tn = tm.querySelector('.n');
    dyn(t => { const s = Math.max(0, Math.round(600 * (1 - lerp(t, T(16, 11), P(17).t0 - 0.2)))); tn.textContent = AN(Math.floor(s / 60)) + ':' + AN(String(s % 60).padStart(2, '0')); });
    const pk = cchip(sc, '<i class="fa-solid fa-check"></i>اختار اللي في إيدك', 'sticky', RX, L(800, 1500), T(16, 16) - 0.1, L(46, 46), -2, 'slap');
    // ١٧: مافيهاش اختيار غلط… فيها اختيار كويس كفاية
    tl.to([say, tm, pk], { opacity: 0, duration: 0.3 }, P(17).t0 - 0.1);
    const wrong = cchip(sc, '<i class="fa-solid fa-xmark"></i>اختيار غلط', 'ghost', L(1560, 780), L(760, 1540), T(17, 4) - 0.08, L(42, 40), -2); strike(wrong, T(17, 6) - 0.1);
    cchip(sc, '<i class="fa-solid fa-thumbs-up"></i>كويس كفاية', 'sticky', L(1110, 300), L(760, 1540), T(17, 9) - 0.1, L(48, 44), 2, 'slap');
    capR(17, 0, 10, L(870, 1680), { hl: [5, 9, 10] });
  }
  // ١٨–١٩: اسأل سؤال واحد
  { const sc = sc0 = scene(P(18).t0 - 0.3, P(20).t0 - 0.5);
    step(sc, 3, 'اسأل <span class="hl">سؤال واحد</span>', P(18).t0 - 0.2, SB, L(66, 64));
    card(sc, 'S09', T(18, 2) - 0.2, P(19).t0 - 0.2, CB, { focus: [0.55, 0.4], zoom: [1.25, 1.3], from: 6, speed: 0.8, fadeOut: 0.15 });
    card(sc, 'S10', P(19).t0 - 0.15, P(20).t0 - 0.5, CB, { focus: [0.5, 0.5], zoom: [1.1, 1.16], from: 3.6, speed: 0.9 }); fx('key', P(19).t0 + 0.9, 0.5);
    const all = cchip(sc, '<i class="fa-solid fa-table-cells"></i>تقارن كل حاجة في كل حاجة', 'ghost', RX, L(480, 1190), T(18, 7) - 0.1, L(40, 40), -2); strike(all, T(18, 12) + 0.05);
    const qq = el('div', null, '<i class="fa-solid fa-circle-question" style="margin-left:14px;color:var(--blue-700)"></i>«إيه أهم حاجة عندي في القرار ده؟»', sc, { position: 'absolute', padding: '22px 32px', borderRadius: '34px 34px 34px 8px', background: '#DCF3FF', color: 'var(--ink)', fontWeight: 900, fontSize: px(L(40, 40)), boxShadow: 'var(--shadow-card)', opacity: 0, whiteSpace: 'nowrap' });
    center(qq, RX, L(620, 1320)); rise(qq, T(18, 14) - 0.1, 30, 0.4, 'pop', 0.7);
    const OP = L([[1600, 760], [1330, 760], [1060, 760]], [[820, 1460], [540, 1460], [260, 1460]]);
    const op = [['fa-tag', 'السعر', 21], ['fa-clock', 'الوقت', 22], ['fa-couch', 'الراحة', 23]].map(([ic, tx, k], j) => cchip(sc, '<i class="fa-solid ' + ic + '"></i>' + tx, 'white', OP[j][0], OP[j][1], T(18, k) - 0.08, L(40, 40), j % 2 ? 2 : -2));
    // ١٩: الإجابة بتميّل الميزان — سؤال واحد بيعمل اللي عشرين مقارنة ما عملوهوش
    tl.to([all, qq], { opacity: 0.3, duration: 0.3 }, P(19).t0 - 0.1);
    tl.to(op, { opacity: 0, duration: 0.25 }, P(19).t0 - 0.1);
    const sb = icon(sc, 'fa-scale-unbalanced', RX, L(730, 1500), L(110, 120), 'var(--blue-700)', T(19, 4) - 0.1, 'impact');
    capR(19, 0, 14, L(840, 1640), { hl: [4, 5, 6, 7, 11, 12] });
  }
  // ════════ ٢٠ · الواقع ════════
  { const sc = scene(P(20).t0 - 0.5, P(21).t0 - 0.3, 'real');
    foot(sc, 'S11', P(20).t0 - 0.5, P(21).t0 - 0.3, { from: 1, speed: 1, focus: L([0.6, 0.35], [0.66, 0.2]), zoom: L([1.12, 1.04], [1.0, 1.0]), fadeIn: 0.5, shade: true }); fx('whoosh', P(20).t0 - 0.55, 0.6);
    capWords(sc, 20, 0, 7, { ...CAP, hl: [5, 6], end: T(20, 8) - 0.1 });
    const q1 = chip(sc, '«أنا متردد»', 'glass', L(560, 540), L(260, 290), L(54, 52)); q1.style.background = 'rgba(6,16,36,.55)'; pop(q1, T(20, 10) - 0.1, -2, 'pop', 0.6); strike(q1, T(20, 11) + 0.1);
    tl.to(q1, { opacity: 0.3, duration: 0.3 }, T(20, 12));
    sticky(sc, '«الميزان محتاج<br>حاجة تميّله»', L(560, 540), L(450, 1150), L(440, 480), L(54, 56), T(20, 13) - 0.1, -3); fx('paper', T(20, 13) - 0.1, 0.8);
    capWords(sc, 20, 8, 16, { ...CAP, hl: [13, 14, 16] });
  }
  // ════════ ٢١–٢٣ ════════
  { const sc = scene(P(21).t0 - 0.3, P(22).t0 - 0.2, 'blue');
    words(sc, 'إنت مش متردد…', { y: L(320, 600), size: L(104, 90), at: [0, 1, 2].map(k => T(21, k)) });
    words(sc, 'الاختيارات بس *كتير.*', { y: L(500, 800), size: L(104, 90), at: [3, 4, 5].map(k => T(21, k)) });
    const b = icon(sc, 'fa-scale-balanced', CX, L(820, 1200), L(120, 140), 'var(--sticky)', T(21, 5) + 0.1, 'impact'); b.style.filter = 'drop-shadow(0 0 30px rgba(245,230,163,.8))';
  }
  { const sc = scene(P(22).t0 - 0.2, P(23).t0 - 0.2);
    capWords(sc, 22, 0, 5, { y: L(170, 200), size: L(56, 60), color: 'var(--sky-100)', x: L(960, null), width: L(860, null), end: T(22, 6) - 0.1 });
    const ph = el('div', 'phone', '<div><img src="../ep09/assets/qarar.png"></div>', sc, { width: px(L(300, 340)), height: px(L(650, 736)) });
    center(ph, L(560, 540), L(560, 900)); tl.fromTo(ph, { opacity: 0, y: 160, rotation: 0 }, { opacity: 1, y: 0, rotation: -4, duration: 0.6, ease: 'power3.out' }, T(22, 6) - 0.3); fx('whoosh', T(22, 6) - 0.3, 0.6);
    const zm = el('div', null, '<img src="../ep09/assets/qarar_sheet.png" style="width:100%;display:block">', sc, { position: 'absolute', width: px(L(660, 900)), borderRadius: '34px', overflow: 'hidden', background: '#fff', boxShadow: '0 40px 90px rgba(2,20,60,.45)', opacity: 0 });
    center(zm, L(1320, 540), L(600, 1400)); pop(zm, T(22, 7) - 0.15, 0, 'pop', 0.7); fx('paper', T(22, 7), 0.6);
    const lg = el('div', null, '<img src="../../../etizan-explainer-video/pipeline/assets/logo-full.png" style="height:' + px(L(90, 100)) + ';display:block">', sc, { position: 'absolute', padding: '18px 44px', background: '#fff', borderRadius: '50px', boxShadow: 'var(--shadow-card)', opacity: 0 });
    center(lg, L(1320, 540), L(220, 330)); pop(lg, T(22, 9) - 0.2, 0, 'pop', 0.7);
    cchip(sc, '<i class="fa-solid fa-scale-balanced"></i>الإيجابيات والسلبيات… وقرّر', 'sticky', L(1320, 540), L(960, 1790), T(22, 9) + 0.3, L(40, 42), 2);
  }
  { const sc = scene(P(23).t0 - 0.2, null);
    const sp = el('div', 'pill glass', '<span class="dot"></span>ليه دماغي بتعمل كده؟', sc, { fontSize: px(L(32, 36)), opacity: 0 }); center(sp, L(1420, 540), L(200, 360)); rise(sp, P(23).t0, -20);
    const nx = el('div', 'pill ink', 'آخر حلقة في الموسم', sc, { fontSize: px(L(30, 34)), opacity: 0 }); center(nx, L(1420, 540), L(290, 460)); rise(nx, T(23, 3) - 0.1, -20);
    const q = words(sc, 'ليه مهما عملت… | بحس إني *مقصّر؟*', { y: L(380, 600), size: L(80, 84), at: [7, 8, 9, 10, 11, 12].map(k => T(23, k)) });
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
