// الحلقة ٦ — «ليه بركّز ساعات في حاجة بحبها… ومش دقيقة في حاجة مهمة؟»
// كل حركة مربوطة بكلمتها: T(فقرة، رقم الكلمة) — الفقرات ١..٢٣ زي script.txt. L(عريض، طولي) لكل مكان.
// التشبيه الثابت: التركيز مش خزان… كشّاف نور قوي، بيروح للي «يشدّه» مش للي «مهم».
window.EPISODE = { n: 6, gaps: { 4: 3.0, 6: 0.5, 9: 0.3, 10: 0.4, 12: 0.3, 13: 1.1, 15: 0.3, 17: 0.3, 19: 0.6, 20: 0.3, 23: 7.5 }, build(A) {
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
  // ── كشّاف النور (التركيز): شعاع بيروح للي «يشدّه» — go(t, x, y, r, d) ──
  const NS = 'http://www.w3.org/2000/svg';
  function torch(sc, ox, oy) {
    const s = document.createElementNS(NS, 'svg'); s.setAttribute('width', L(1920, 1080)); s.setAttribute('height', L(1080, 1920)); s.style.cssText = 'position:absolute;left:0;top:0;overflow:visible;opacity:0'; sc.appendChild(s);
    const id = 'g' + Math.round(ox) + Math.round(oy);
    s.innerHTML = '<defs><linearGradient id="c' + id + '" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FFF6C8" stop-opacity=".75"/><stop offset="1" stop-color="#FFF6C8" stop-opacity=".18"/></linearGradient>'
      + '<radialGradient id="r' + id + '"><stop offset="0" stop-color="#FFF8D6" stop-opacity=".75"/><stop offset=".7" stop-color="#FFF1B0" stop-opacity=".35"/><stop offset="1" stop-color="#FFF1B0" stop-opacity="0"/></radialGradient></defs>'
      + '<polygon class="cone" fill="url(#c' + id + ')"/><circle class="spot" fill="url(#r' + id + ')"/>'
      + '<g class="body"><rect x="-170" y="-26" width="128" height="52" rx="16" fill="#E9EEF7"/><rect x="-140" y="-32" width="26" height="64" rx="8" fill="#18B1FE"/><path d="M-46 -28 L0 -44 L0 44 L-46 28 Z" fill="#CBD5E6"/><rect x="-4" y="-44" width="8" height="88" rx="4" fill="#FFF6C8"/></g>';
    const cone = s.querySelector('.cone'), spot = s.querySelector('.spot'), body = s.querySelector('.body'), grad = s.querySelector('linearGradient'), K = [];
    s.go = (t, x, y, r = L(120, 110), d = 0.6) => { K.push([t, x, y, r, d]); return s; };
    dyn(t => { if (!K.length) return; let x = K[0][1], y = K[0][2], r = K[0][3];
      for (const [t0, x1, y1, r1, d] of K) { if (t < t0) break; const p = Math.min(1, (t - t0) / d), e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; x += (x1 - x) * e; y += (y1 - y) * e; r += (r1 - r) * e; }
      const a = Math.atan2(y - oy, x - ox), nx = -Math.sin(a), ny = Math.cos(a), w0 = 30;
      cone.setAttribute('points', [[ox + nx * w0, oy + ny * w0], [x + nx * r, y + ny * r], [x - nx * r, y - ny * r], [ox - nx * w0, oy - ny * w0]].map(p => p.map(v => v.toFixed(1)).join(',')).join(' '));
      grad.setAttribute('x1', ox); grad.setAttribute('y1', oy); grad.setAttribute('x2', x); grad.setAttribute('y2', y);
      spot.setAttribute('cx', x); spot.setAttribute('cy', y); spot.setAttribute('r', r * 1.25);
      body.setAttribute('transform', 'translate(' + ox + ',' + oy + ') rotate(' + (a * 180 / Math.PI).toFixed(2) + ')'); });
    return s;
  }
  const tile = (sc, ic, tx, x, y, color = 'var(--blue-700)') => { const d = el('div', 'card', '<i class="fa-solid ' + ic + '" style="font-size:' + px(L(60, 60)) + ';color:' + color + '"></i><div style="font-size:' + px(L(28, 28)) + ';font-weight:900;margin-top:10px;color:var(--ink)">' + tx + '</div>', sc,
    { position: 'absolute', width: px(L(200, 210)), height: px(L(160, 165)), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0, zIndex: 3 }); center(d, x, y); return d; };

  // ════════ ١–٤ · الواقع ════════
  const T4 = T(4, 2) - 0.2;
  { const sc = scene(0, T4 + 0.6, 'real');
    // ١: لعبة جديدة… الساعة اتنين بالليل، وناسي تتعشى
    foot(sc, 'L01', 0, T(1, 5) - 0.1, { from: 1, focus: L([0.5, 0.4], [0.52, 0.4]), zoom: [1.0, 1.08], fadeIn: 0.6, fadeOut: 0.1, shade: true });
    capWords(sc, 1, 0, 4, { ...CAP, hl: [0, 1], end: T(1, 5) - 0.1 });
    foot(sc, 'L02', T(1, 5) - 0.12, P(2).t0 - 0.1, { from: 5, focus: L([0.6, 0.4], [0.72, 0.4]), zoom: [1.05, 1.12], fadeIn: 0.1, fadeOut: 0.1, shade: true }); fx('swish', T(1, 5) - 0.15, 0.7);
    const tm = cchip(sc, '<i class="fa-solid fa-moon"></i>٢:٠٠ بالليل', 'white', L(1500, 540), L(260, 300), T(1, 8) - 0.05, L(50, 46), -2, 'slap'); fx('ticktock', T(1, 8), 0.4);
    const ft = cchip(sc, '<i class="fa-solid fa-utensils"></i>ناسي تتعشى', 'sticky', L(1500, 540), L(380, 420), T(1, 12) - 0.05, L(44, 42), 3);
    capWords(sc, 1, 5, 13, { ...CAP, hl: [9, 10, 12, 13], end: P(2).t0 - 0.1 });
    out(tm, P(2).t0 - 0.2, 0.15); out(ft, P(2).t0 - 0.2, 0.15);
    // ٢: ملف مهم… كل دقيقة كأنها ساعة — نفس السطر تلات مرات
    foot(sc, 'L11', P(2).t0 - 0.12, P(3).t0 - 0.1, { from: 0.5, speed: 0.8, focus: L([0.32, 0.35], [0.3, 0.35]), zoom: [1.1, 1.18], fadeIn: 0.1, fadeOut: 0.1, shade: true }); fx('swish', P(2).t0 - 0.15, 0.7);
    capWords(sc, 2, 0, 5, { ...CAP, hl: [4, 5], end: T(2, 6) - 0.1 });
    const mn = cchip(sc, '<i class="fa-solid fa-hourglass-half"></i>دقيقة = ساعة', 'white', L(1500, 540), L(260, 300), T(2, 8) - 0.05, L(46, 44), -2);
    capWords(sc, 2, 6, 9, { ...CAP, hl: [7, 9], end: T(2, 10) - 0.1 });
    const x3 = cchip(sc, '<i class="fa-solid fa-rotate-right"></i>× ٣', 'sticky', L(1500, 540), L(380, 420), T(2, 13) - 0.05, L(52, 48), 3, 'slap');
    capWords(sc, 2, 10, 14, { ...CAP, hl: [13, 14], end: T(2, 15) - 0.1 });
    capWords(sc, 2, 15, 20, { ...CAP, hl: [19, 20], end: P(3).t0 - 0.1 });
    out(mn, P(3).t0 - 0.2, 0.15); out(x3, P(3).t0 - 0.2, 0.15);
    // ٣: نفس الدماغ… مرة مركّز، ومرة مش قادر — وبيتجمّد عند «طب ليه؟»
    const fz = T(4, 0);
    const r = foot(sc, 'L04', P(3).t0 - 0.15, T4 + 0.25, { from: 2, freeze: fz, focus: L([0.5, 0.35], [0.5, 0.35]), zoom: [1.1, 1.16], fadeIn: 0.3, shade: true }); fx('whoosh', P(3).t0 - 0.2, 0.5);
    capWords(sc, 3, 0, 3, { ...CAP, end: T(3, 4) - 0.1 });
    const a1 = cchip(sc, '<i class="fa-solid fa-gamepad"></i>مركّز ساعات', 'white', L(1500, 540), L(260, 300), T(3, 5) - 0.05, L(44, 42), -2); a1.style.color = 'var(--green)';
    const a2 = cchip(sc, '<i class="fa-solid fa-file-lines"></i>مش قادر دقيقة', 'white', L(1500, 540), L(370, 410), T(3, 12) - 0.05, L(44, 42), 2); a2.style.color = 'var(--red)';
    capWords(sc, 3, 4, 9, { ...CAP, hl: [5], end: T(3, 10) - 0.1 });
    capWords(sc, 3, 10, 14, { ...CAP, hl: [13, 14], end: fz - 0.1 });
    out(a1, fz - 0.15, 0.2); out(a2, fz - 0.15, 0.2);
    flash(fz, 0.35); fx('lowhit', fz, 0.8); fx('reverse', fz - 0.7, 0.5);
    tl.to(r.querySelector('.src > img'), { filter: 'grayscale(1) brightness(.8)', duration: 0.4 }, fz);
    tl.to(r.tint, { opacity: 0.82, duration: 0.7 }, fz + 0.15);
    trace(r, ['M840 270 C840 80, 1120 80, 1120 270 C1120 420, 1040 470, 980 470 C920 470, 840 420, 840 270 Z', 'M580 965 L1360 965 L1370 1035 L570 1035 Z', 'M300 800 L470 800 L465 950 L305 950 Z'], fz + 0.25, 0.8);
    fx('swish', fz + 0.3, 0.5);
    capWords(sc, 4, 0, 1, { ...CAP, y: L(470, 1420), size: L(110, 110), hl: [1], end: T4 + 0.05 });
  }
  // ════════ كارت العنوان ════════
  { const sc = scene(T4, P(5).t0 - 0.35, 'blue');
    const q = el('div', 'qmark', '؟', sc, { fontSize: px(L(1000, 760)), opacity: 0 }); Object.assign(q.style, H ? { left: '80px', top: '30px' } : { left: '160px', top: '1060px' });
    tl.fromTo(q, { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, T4 + 0.1);
    const sp = el('div', 'pill glass', '<span class="dot"></span>ليه دماغي بتعمل كده؟', sc, { fontSize: px(L(34, 38)), opacity: 0 });
    if (H) Object.assign(sp.style, { right: '160px', top: '230px' }); else center(sp, 540, 520); rise(sp, T4 + 0.05, -20);
    const ep = el('div', 'pill ink', 'الحلقة ٦', sc, { fontSize: px(L(28, 32)), padding: '6px 24px', opacity: 0 });
    if (H) Object.assign(ep.style, { right: '160px', top: '320px' }); else center(ep, 540, 610); rise(ep, T4 + 0.25, -20);
    const t1 = words(sc, 'ليه بركّز ساعات | في حاجة *بحبها…*', { y: L(420, 740), size: L(96, 86), at: [2, 3, 4, 5, 6, 7].map(k => T(4, k)) });
    const t2 = words(sc, 'ومش دقيقة | في حاجة *مهمة؟*', { y: L(640, 1060), size: L(96, 86), at: [8, 9, 10, 11, 12].map(k => T(4, k)) });
    if (H) [t1, t2].forEach(x => Object.assign(x.style, { left: 'auto', right: '160px', textAlign: 'right', padding: 0 }));
    fx('impact', T(4, 12) + 0.4, 0.9); flash(T(4, 12) + 0.4, 0.15);
    tl.to([t1, t2, sp, ep], { opacity: 0, y: -40, duration: 0.35 }, P(5).t0 - 0.6); fx('whoosh_big', P(5).t0 - 0.6, 0.8);
  }
  // ════════ ٥–٦ · اللي بيتقال لك (فاتح) ════════
  { const sc = scene(P(5).t0 - 0.35, P(7).t0 - 0.35, 'light');
    chapter('اللي بيتقال لك', P(5).t0 - 0.2, P(7).t0 - 0.4, 'ink', 'var(--sky-400)');
    capWords(sc, 5, 0, 4, { y: L(170, 220), size: L(54, 58), color: 'var(--ink-2)', shadow: false, end: P(6).t0 - 0.1 });
    const cs = [['«ما إنت بتعرف تركّز أهو… يبقى بتستعبط»', 5, L(1260, 540), L(380, 440), -2], ['«يبقى المسألة مزاج»', 12, L(760, 540), L(520, 600), 2]].map(([q, k, x, y, rot]) => cchip(sc, q, 'ghost', x, y, T(5, k) - 0.08, L(46, 40), rot, 'slap'));
    // ٦: من برّه… ومن جوّه الحكاية مختلفة
    tl.to(cs, { opacity: 0.3, scale: 0.9, duration: 0.4 }, P(6).t0);
    const o1 = cchip(sc, '<i class="fa-solid fa-eye"></i>من برّه', 'white', L(1260, 760), L(700, 880), T(6, 0) - 0.05, L(48, 46), -2);
    const o2 = cchip(sc, '<i class="fa-solid fa-brain"></i>من جوّه', 'sticky', L(660, 320), L(700, 880), T(6, 7) - 0.05, L(48, 46), 2, 'slap');
    words(sc, 'الحكاية ~مختلفة~ خالص', { y: L(830, 1060), size: L(84, 80), color: 'var(--ink)', at: [9, 10, 11].map(k => T(6, k)) });
  }
  // ════════ ٧–١٣ · اللي بيحصل جوّه ════════
  chapter('اللي بيحصل جوّه', P(7).t0 - 0.2, P(13).t1 + 0.2);
  const IT = L({ file: [980, 430], game: [1560, 380], phone: [1320, 700], idea: [1720, 760], sound: [1000, 790] },
               { file: [330, 830], game: [780, 690], phone: [790, 1110], idea: [330, 1250], sound: [800, 1470] });
  const OR = L([260, 900], [170, 1700]);
  // ٧–١٢: مش خزان… كشّاف — بيروح للي يشدّه
  { const sc = scene(P(7).t0 - 0.35, P(13).t0 - 0.3, 'blue');
    capWords(sc, 7, 0, 9, { y: L(150, 200), size: L(58, 60), hl: [9], end: T(7, 10) - 0.1 });
    // الخزان (الفكرة الشائعة)
    const tank = el('div', null, '<div class="lv" style="position:absolute;left:0;right:0;bottom:0;height:20%;background:#18B1FE;border-radius:0 0 36px 36px"></div><i class="fa-solid fa-droplet" style="position:absolute;top:24px;left:50%;transform:translateX(-50%);font-size:44px;color:#fff"></i>', sc,
      { position: 'absolute', width: px(L(240, 260)), height: px(L(320, 340)), borderRadius: '40px', border: '8px solid #fff', overflow: 'hidden', opacity: 0 });
    center(tank, CX, L(600, 900)); rise(tank, T(7, 8) - 0.15, 40, 0.4, 'pop', 0.6);
    const lv = tank.querySelector('.lv');
    tl.to(lv, { height: '85%', duration: 0.4 }, T(7, 12) - 0.1); fx('rise', T(7, 12) - 0.1, 0.4);
    tl.to(lv, { height: '15%', duration: 0.4 }, T(7, 15) - 0.1); fx('reverse', T(7, 15) - 0.1, 0.4);
    const k1 = cchip(sc, 'كتير', 'white', L(CX + 260, 820), L(520, 820), T(7, 12) - 0.05, L(40, 40), 2), k2 = cchip(sc, 'قليل', 'white', L(CX - 260, 260), L(700, 1000), T(7, 15) - 0.05, L(40, 40), -2);
    capWords(sc, 7, 10, 15, { y: L(150, 200), size: L(58, 60), end: T(7, 16) - 0.1 });
    strike(tank, T(7, 17)); tl.to([tank, k1, k2], { opacity: 0, scale: 0.8, duration: 0.35 }, T(7, 22));
    capWords(sc, 7, 16, 26, { y: L(150, 200), size: L(58, 60), hl: [25, 26], end: P(8).t0 - 0.1 });
    // الكشّاف
    const tr = torch(sc, OR[0], OR[1]); tl.to(tr, { opacity: 1, duration: 0.4 }, T(7, 25) - 0.2); fx('switch', T(7, 25) - 0.1, 0.9);
    tr.go(0, L(900, 540), L(560, 1000), L(110, 100), 0.01);
    tr.go(T(8, 2), L(980, 560), L(520, 980), L(170, 150), 0.5);
    // الحاجات اللي حواليه
    const tiles = {
      file: tile(sc, 'fa-file-lines', 'الملف المهم', ...IT.file, 'var(--ink-2)'), game: tile(sc, 'fa-gamepad', 'لعبة', ...IT.game), phone: tile(sc, 'fa-mobile-screen', 'موبايل', ...IT.phone),
      idea: tile(sc, 'fa-lightbulb', 'فكرة', ...IT.idea, '#D8A920'), sound: tile(sc, 'fa-volume-high', 'صوت', ...IT.sound) };
    Object.values(tiles).forEach((d, j) => rise(d, P(8).t0 + j * 0.1, 30, 0.35, j ? null : 'pop', 0.5));
    capWords(sc, 8, 0, 5, { y: L(150, 200), size: L(60, 62), hl: [2, 3, 4], end: T(8, 6) - 0.1 });
    // مش «مهم» ولا «لازم»… «يشدّني»
    const m1 = cchip(sc, '«مهم»', 'ghost', L(OR[0] + 80, 330), L(OR[1] - 230, 1500), T(8, 10) - 0.05, L(40, 40), -2), m2 = cchip(sc, '«لازم»', 'ghost', L(OR[0] + 80, 530), L(OR[1] - 140, 1500), T(8, 12) - 0.05, L(40, 40), 2);
    [m1, m2].forEach(c => { c.style.color = '#fff'; c.style.borderColor = 'rgba(255,255,255,.5)'; }); strike(m1, T(8, 12) + 0.2); strike(m2, T(8, 13));
    tl.to([m1, m2], { opacity: 0, duration: 0.3 }, T(8, 15) - 0.1);
    const pull = cchip(sc, '«يشدّني»', 'sticky', L(OR[0] + 40, 420), L(OR[1] + 110, 1820), T(8, 16) - 0.08, L(52, 52), -3, 'slap'); pull.style.zIndex = 5;
    capWords(sc, 8, 6, 16, { y: L(150, 200), size: L(58, 60), hl: [16], end: P(9).t0 - 0.1 });
    // ٩: ممتع / جديد / تحدّي / الوقت زانق — والكشّاف بيروح لوحده
    const TG = [['game', 'ممتع', 5], ['idea', 'جديد', 7], ['sound', 'تحدّي', 10], ['phone', 'الوقت زانق', 12]];
    const tags = TG.map(([k, tx, w]) => { const [x, y] = IT[k]; const c = chip(sc, tx, 'sticky', x, y - L(110, 110), L(28, 28)); c.style.zIndex = 4; return pop(c, T(9, w) - 0.1, -3, 'pop', 0.5); });
    capWords(sc, 9, 0, 13, { y: L(150, 200), size: L(56, 58), hl: [5, 7, 10, 12, 13], end: T(9, 14) - 0.1 });
    tl.to(tags.slice(1), { opacity: 0, duration: 0.3 }, T(9, 19) - 0.2);
    tr.go(T(9, 19), ...IT.game, L(150, 140), 0.7); fx('whoosh', T(9, 19), 0.6);
    capWords(sc, 9, 14, 21, { y: L(150, 200), size: L(58, 60), hl: [20, 21], end: P(10).t0 - 0.1 });
    // ١٠: بيقفل عليها — الوقت يختفي، والأكل يتنسي، والدنيا تبعد — «التركيز المفرط»
    const lk = icon(sc, 'fa-lock', IT.game[0] + L(120, 110), IT.game[1] - L(90, 90), L(48, 48), '#FFF6C8', T(10, 5) - 0.1, 'switch');
    tr.go(T(10, 5), ...IT.game, L(105, 100), 0.4); tl.to(tiles.game, { scale: 1.12, boxShadow: '0 0 60px rgba(255,241,176,.95)', duration: 0.4 }, T(10, 5));
    const off = [['fa-clock', 8], ['fa-utensils', 10], ['fa-earth-africa', 12]].map(([ic, k], j) => { const i = icon(sc, ic, L(560 + j * 180, 300 + j * 240), L(1000, 1650), L(56, 56), 'var(--sky-100)', T(10, k) - 0.2, null); tl.to(i, { opacity: 0, scale: 0.5, filter: 'blur(6px)', duration: 0.5 }, T(10, k + 1)); return i; });
    tl.to([tiles.file, tiles.phone, tiles.idea, tiles.sound, tags[0]], { opacity: 0.25, duration: 0.5 }, T(10, 12));
    capWords(sc, 10, 0, 6, { y: L(150, 200), size: L(58, 60), hl: [5, 6], end: T(10, 7) - 0.1 });
    capWords(sc, 10, 7, 14, { y: L(150, 200), size: L(58, 60), hl: [9, 11, 14], end: T(10, 15) - 0.1 });
    const hf = cchip(sc, '«التركيز المفرط»', 'sticky', L(1320, 540), L(900, 760), T(10, 17) - 0.1, L(58, 56), -2, 'slap'); hf.style.zIndex = 6;
    capWords(sc, 10, 15, 18, { y: L(150, 200), size: L(58, 60), hl: [17, 18], end: P(11).t0 - 0.1 });
    // ١١: الملف الممل؟ بيعدّي عليه… ويروح لصوت، لموبايل، لفكرة
    tl.to([hf, lk], { opacity: 0, duration: 0.3 }, P(11).t0 - 0.2); tl.to(tiles.game, { scale: 1, boxShadow: 'var(--shadow-card)', opacity: 0.25, duration: 0.3 }, P(11).t0 - 0.2);
    tl.to([tiles.file, tiles.phone, tiles.idea, tiles.sound], { opacity: 1, duration: 0.3 }, P(11).t0 - 0.2);
    capWords(sc, 11, 0, 6, { y: L(150, 200), size: L(58, 60), hl: [3], end: T(11, 7) - 0.1 });
    tr.go(T(11, 4), ...IT.file, L(120, 110), 0.5); tr.go(T(11, 5) + 0.25, IT.file[0] + L(140, 100), IT.file[1] + L(60, -60), L(120, 110), 0.35);
    tr.go(T(11, 14) - 0.1, ...IT.sound, L(120, 110), 0.3); tr.go(T(11, 16) - 0.1, ...IT.phone, L(120, 110), 0.3); tr.go(T(11, 18) - 0.1, ...IT.idea, L(120, 110), 0.3);
    [14, 16, 18].forEach(k => fx('swish', T(11, k) - 0.1, 0.5));
    capWords(sc, 11, 7, 18, { y: L(150, 200), size: L(56, 58), hl: [14, 16, 18], end: P(12).t0 - 0.1 });
    // ١٢: مش قليل ولا بتستعبط — مش بياخد أوامر… بيمشي ورا اللي يشدّه
    capWords(sc, 12, 0, 7, { y: L(150, 200), size: L(58, 60), end: T(12, 8) - 0.1 });
    capWords(sc, 12, 8, 17, { y: L(150, 200), size: L(60, 62), hl: [11, 12, 13, 16, 17] });
    tr.go(T(12, 14), ...IT.game, L(130, 120), 0.6); tl.to(tiles.game, { opacity: 1, duration: 0.3 }, T(12, 14));
  }
  // ١٣: مش محتاج تجبر الكشّاف… حط «يشدّني» جوّه المهم
  { const sc = scene(P(13).t0 - 0.3, P(14).t0 - 1.1);
    words(sc, 'والخبر الحلو؟', { y: L(160, 280), size: L(66, 68), color: 'var(--sky-100)', at: [0, 1].map(k => T(13, k)) });
    const w = words(sc, 'مش محتاج ~تجبر~ الكشّاف…', { y: L(290, 420), size: L(78, 66), at: [3, 4, 5, 6].map(k => T(13, k)) });
    strike(w.querySelectorAll('.w')[2], T(13, 7) - 0.1, 8);
    const tr = torch(sc, L(560, 200), L(840, 1500)); tl.to(tr, { opacity: 1, duration: 0.3 }, T(13, 7) - 0.2);
    tr.go(0, L(1000, 600), L(800, 1100), L(90, 90), 0.01);
    const f = tile(sc, 'fa-file-lines', 'الحاجة المهمة', L(1300, 700), L(760, 1140), 'var(--ink-2)'); rise(f, T(13, 7) - 0.2, 30, 0.35, 'pop', 0.5);
    const st = cchip(sc, '«يشدّني»', 'sticky', L(1300, 700), L(660, 1040), T(13, 9) - 0.05, L(40, 40), -4, 'slap'); st.style.zIndex = 5;
    tr.go(T(13, 10), L(1300, 700), L(760, 1140), L(140, 130), 0.6); fx('whoosh', T(13, 10), 0.6);
    tl.to(f, { boxShadow: '0 0 60px rgba(255,241,176,.95)', duration: 0.4 }, T(13, 10) + 0.4);
    words(sc, 'محتاج تحط *«يشدّني»* جوّه المهم', { y: L(420, 560), size: L(66, 58), color: 'var(--sky-100)', at: [7, 8, 9, 10, 11].map(k => T(13, k)) });
  }

  // ════════ ١٤–١٩ · تعمل إيه؟ ════════
  { const t = P(14).t0 - 1.1, sc = scene(t, P(14).t0 - 0.05, 'light');
    words(sc, 'طب ~تعمل~ إيه؟', { y: L(400, 820), size: L(140, 130), color: 'var(--ink)', t: t + 0.05 }); fx('whoosh_big', t, 0.8); fx('slap', t + 0.3, 0.6);
  }
  chapter('تعمل إيه؟', P(14).t0 - 0.2, P(19).t1 + 0.3, 'ink', 'var(--sticky)');
  const SB = L({ x: 860, y: 200, w: 940 }, { x: 60, y: 230, w: 960 });
  const CB = L(SQ(470, 560, 600), SQ(540, 820, 560));
  const RX = L(1330, 540);
  // ١٤–١٥: لبّس المهمة لبس حاجة بتحبها
  { const sc = scene(P(14).t0 - 0.1, P(16).t0 - 0.3);
    step(sc, 1, 'لبّس المهمة لبس <span class="hl">حاجة بتحبها</span>', P(14).t0 - 0.05, SB, L(50, 52));
    card(sc, 'L06', T(14, 7) - 0.2, P(16).t0 - 0.3, CB, { focus: [0.5, 0.5], zoom: [1.1, 1.16], from: 1 });
    const PO = L([[RX, 470], [RX, 590], [RX, 710]], [[540, 1180], [540, 1300], [540, 1420]]);
    const cs = [['fa-couch', 'مكان بتحبه', 9], ['fa-mug-hot', 'مشروبك المفضّل', 13], ['fa-flag-checkered', 'تحدّي صغير مع نفسك', 17]].map(([ic, tx, k], j) => cchip(sc, '<i class="fa-solid ' + ic + '"></i>' + tx, 'white', PO[j][0], PO[j][1], T(14, k) - 0.08, L(44, 44), j % 2 ? 2 : -2));
    // ١٥: مش ممتعة زي اللعبة… بس أقل مملة
    tl.to(cs, { opacity: 0.3, duration: 0.3 }, P(15).t0 - 0.1);
    const ml = el('div', null, '<div style="display:flex;justify-content:space-between;font-weight:900;font-size:' + px(L(30, 30)) + ';color:var(--ink-2);margin-bottom:10px"><span>ممتعة</span><span>مملة</span></div><div style="position:relative;height:30px;border-radius:15px;background:linear-gradient(90deg,#3DDC84,#F5C542,#F2545B)"><div class="pin" style="position:absolute;top:-12px;left:92%;width:22px;height:54px;border-radius:11px;background:var(--ink);box-shadow:0 6px 16px rgba(0,0,0,.25)"></div></div>', sc,
      { position: 'absolute', width: px(L(760, 880)), opacity: 0 }); center(ml, RX, L(860, 1580)); rise(ml, P(15).t0, 20, 0.35, 'pop', 0.5);
    tl.to(ml.querySelector('.pin'), { left: '55%', duration: 0.8, ease: 'power2.inOut' }, T(15, 9) - 0.1); fx('swish', T(15, 9), 0.6);
    capWords(sc, 15, 0, 4, { y: L(960, 1680), size: L(44, 46), color: 'var(--ink)', shadow: false, x: L(880, null), width: L(900, null), end: T(15, 5) - 0.1 });
    capWords(sc, 15, 5, 15, { y: L(960, 1680), size: L(44, 46), color: 'var(--ink)', shadow: false, x: L(880, null), width: L(900, null), hl: [9, 10], hlCls: 'hl' });
  }
  // ١٦–١٧: ادخل من الباب اللي يشدّك
  { const sc = scene(P(16).t0 - 0.3, P(18).t0 - 0.3);
    step(sc, 2, 'ادخل من <span class="hl">الباب</span> اللي يشدّك', P(16).t0 - 0.2, SB, L(62, 60));
    card(sc, 'L07', T(16, 2) - 0.2, P(18).t0 - 0.3, CB, { focus: [0.5, 0.4], zoom: [1.05, 1.1], from: 3 });
    const doc = el('div', 'card', null, sc, { width: px(L(720, 820)), padding: '16px 30px 26px', opacity: 0 }); center(doc, RX, L(620, 1340)); rise(doc, T(16, 7) - 0.2, 30, 0.35, 'whoosh', 0.5);
    const RW = ['المقدمة', 'الجزء اللي فيه سؤال', 'التفاصيل', 'الخاتمة'].map((tx, j) => el('div', null, '<span class="ck" style="width:40px;height:40px;border-radius:10px;border:4px solid #C9D6E8;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-size:22px"><i class="fa-solid fa-check"></i></span><span>' + tx + '</span>', doc,
      { display: 'flex', alignItems: 'center', gap: '18px', fontWeight: 900, fontSize: px(L(36, 38)), color: 'var(--ink)', marginTop: '14px', padding: '6px 10px', borderRadius: '14px' }));
    const first = cchip(sc, '«من أول الملف»', 'ghost', L(RX, 540), L(400, 1060), T(16, 10) - 0.1, L(40, 40), -2); strike(first, T(16, 12) - 0.05);
    tl.to(first, { opacity: 0, duration: 0.3 }, T(16, 13) - 0.1);
    tl.to(RW[1], { background: '#FFF4DC', scale: 1.05, transformOrigin: '100% 50%', duration: 0.3 }, T(16, 14) - 0.1); fx('pop', T(16, 14), 0.6);
    const q = icon(sc, 'fa-circle-question', L(RX - 400, 120), L(620 - 40, 1300), L(56, 56), '#D8A920', T(16, 17) - 0.1, 'slap');
    capWords(sc, 16, 13, 22, { y: L(900, 1680), size: L(44, 46), color: 'var(--ink)', shadow: false, x: L(880, null), width: L(900, null), hl: [17, 18, 21], hlCls: 'hl', end: P(17).t0 - 0.1 });
    // ١٧: ولما الكشّاف يمسك… الباقي بيمشي وراه
    [1, 2, 3, 0].forEach((j, n) => { const c = RW[j].querySelector('.ck'); tl.to(c, { background: '#1FA971', borderColor: '#1FA971', duration: 0.25 }, T(17, 3) + n * 0.25); fx('pop', T(17, 3) + n * 0.25, 0.4); });
    capWords(sc, 17, 0, 5, { y: L(900, 1680), size: L(54, 56), color: 'var(--ink)', shadow: false, x: L(880, null), width: L(900, null), hl: [3, 4, 5], hlCls: 'hl' });
  }
  // ١٨–١٩: التركيز المفرط — احميه، أو حط له فرامل
  { const sc = scene(P(18).t0 - 0.3, P(20).t0 - 0.5);
    step(sc, 3, 'التركيز المفرط؟ <span class="hl">اتعامل معاه صح</span>', P(18).t0 - 0.2, SB, L(48, 46));
    card(sc, 'L08', T(18, 14) - 0.2, T(18, 24) - 0.1, CB, { focus: [0.45, 0.5], zoom: [1.05, 1.1], from: 1, fadeOut: 0.15 });
    card(sc, 'L09', T(18, 24) - 0.15, P(20).t0 - 0.5, CB, { focus: [0.5, 0.55], zoom: [1.6, 1.66], from: 2 });
    const r1 = el('div', 'card', '<div style="font-size:' + px(L(36, 38)) + ';font-weight:1000;color:var(--ink)"><i class="fa-solid fa-shield-halved" style="color:#1FA971;margin-left:12px"></i>على الحاجة المهمة؟ احميه</div><div style="font-size:' + px(L(30, 32)) + ';font-weight:800;color:var(--ink-2);margin-top:8px">اقفل الإشعارات… وسيبه يشتغل</div>', sc, { width: px(L(820, 900)), padding: '22px 30px', opacity: 0 });
    center(r1, RX, L(520, 1210)); rise(r1, T(18, 12) - 0.2, 20, 0.35, 'pop', 0.6);
    const r2 = el('div', 'card', '<div style="font-size:' + px(L(36, 38)) + ';font-weight:1000;color:var(--ink)"><i class="fa-solid fa-hand" style="color:#F2545B;margin-left:12px"></i>على حاجة تانية؟ فرامل من برّه</div><div style="font-size:' + px(L(30, 32)) + ';font-weight:800;color:var(--ink-2);margin-top:8px">منبّه… أو حد يفكّرك</div>', sc, { width: px(L(820, 900)), padding: '22px 30px', opacity: 0 });
    center(r2, RX, L(720, 1430)); rise(r2, T(18, 22) - 0.2, 20, 0.35, 'pop', 0.6); tl.to(r1, { opacity: 0.45, duration: 0.3 }, T(18, 22) - 0.2);
    fx('beep', T(18, 29), 0.6);
    // ١٩: الكشّاف لما يقفل… مش هيسمع صوتك
    tl.to([r1, r2], { opacity: 0.3, duration: 0.3 }, P(19).t0 - 0.1);
    words(sc, 'لما يقفل على حاجة… *مش* *هيسمع* *صوتك*', { y: L(860, 1600), size: L(50, 44), color: 'var(--ink)', at: [2, 3, 4, 5, 6, 7, 8].map(k => T(19, k)), x: L(880, null), width: L(900, null) });
    icon(sc, 'fa-ear-deaf', L(1760, 980), L(1000, 1740), L(56, 60), 'var(--blue-700)', T(19, 7), 'pop');
  }
  // ════════ ٢٠ · الواقع ════════
  { const sc = scene(P(20).t0 - 0.5, P(21).t0 - 0.3, 'real');
    foot(sc, 'L02', P(20).t0 - 0.5, P(21).t0 - 0.3, { from: 0.5, speed: 0.7, focus: L([0.6, 0.4], [0.72, 0.4]), zoom: [1.12, 1.04], fadeIn: 0.5, shade: true }); fx('whoosh', P(20).t0 - 0.55, 0.6);
    capWords(sc, 20, 0, 4, { ...CAP, end: T(20, 5) - 0.1 });
    const q1 = chip(sc, '«ما إنت بتعرف تركّز لما تحب»', 'glass', L(1300, 540), L(240, 260), L(46, 42)); q1.style.background = 'rgba(6,16,36,.55)'; pop(q1, T(20, 5) - 0.1, -2, 'pop', 0.6);
    capWords(sc, 20, 5, 10, { ...CAP, end: T(20, 11) - 0.1 });
    tl.to(q1, { opacity: 0.4, duration: 0.3 }, T(20, 11));
    const ans = sticky(sc, '«أيوه… وده بالظبط<br>اللي بتعلّم أستخدمه»', L(1300, 540), L(520, 540), L(600, 640), L(46, 46), T(20, 12) - 0.1, -3); fx('paper', T(20, 12) - 0.1, 0.8);
    capWords(sc, 20, 11, 17, { ...CAP, hl: [16, 17] });
  }
  // ════════ ٢١–٢٣ ════════
  { const sc = scene(P(21).t0 - 0.3, P(22).t0 - 0.2, 'blue');
    words(sc, 'إنت مش مشتّت…', { y: L(320, 680), size: L(110, 96), at: [0, 1, 2].map(k => T(21, k)) });
    words(sc, 'تركيزك بس بيمشي ورا | اللي *يشدّه.*', { y: L(500, 860), size: L(96, 82), at: [3, 4, 5, 6, 7, 8].map(k => T(21, k)) });
    const tr = torch(sc, L(700, 340), L(900, 1420)); tl.to(tr, { opacity: 1, duration: 0.4 }, T(21, 8)); fx('switch', T(21, 8), 0.8);
    tr.go(0, L(1250, 760), L(800, 1250), L(110, 100), 0.01);
  }
  { const sc = scene(P(22).t0 - 0.2, P(23).t0 - 0.2);
    const ph = el('div', 'phone', '<div><img src="../../../etizan-posts/template/assets/screens/adult_pomodoro.png"></div>', sc, { width: px(L(300, 340)), height: px(L(650, 736)) });
    center(ph, L(560, 540), L(560, 1100)); tl.fromTo(ph, { opacity: 0, y: 160, rotation: 0 }, { opacity: 1, y: 0, rotation: -4, duration: 0.6, ease: 'power3.out' }, T(22, 6) - 0.3); fx('whoosh', T(22, 6) - 0.3, 0.6);
    const lg = el('div', null, '<img src="../../../etizan-explainer-video/pipeline/assets/logo-full.png" style="height:' + px(L(110, 110)) + ';display:block">', sc, { position: 'absolute', padding: '22px 50px', background: '#fff', borderRadius: '56px', boxShadow: 'var(--shadow-card)', opacity: 0 });
    center(lg, L(1300, 540), L(470, 520)); pop(lg, T(22, 10) - 0.2, 0, 'pop', 0.7);
    capWords(sc, 22, 0, 5, { y: L(200, 260), size: L(58, 62), color: 'var(--sky-100)', x: L(960, null), width: L(860, null), end: T(22, 6) - 0.1 });
    cchip(sc, '<i class="fa-solid fa-stopwatch"></i>عدّاد قدام عينك', 'white', L(1300, 330), L(700, 1580), T(22, 11) - 0.1, L(40, 36), -2);
    cchip(sc, '<i class="fa-solid fa-bullseye"></i>حاجة واحدة بس', 'sticky', L(1300, 760), L(820, 1580), T(22, 14) - 0.1, L(40, 36), 2);
  }
  { const sc = scene(P(23).t0 - 0.2, null);
    const sp = el('div', 'pill glass', '<span class="dot"></span>ليه دماغي بتعمل كده؟', sc, { fontSize: px(L(32, 36)), opacity: 0 }); center(sp, L(1420, 540), L(200, 360)); rise(sp, P(23).t0, -20);
    const nx = el('div', 'pill ink', 'الحلقة الجاية', sc, { fontSize: px(L(30, 34)), opacity: 0 }); center(nx, L(1420, 540), L(290, 460)); rise(nx, T(23, 1) - 0.1, -20);
    const q = words(sc, 'ليه كلمة صغيرة… | *بتقلب* يومي كله؟', { y: L(380, 600), size: L(80, 84), at: [3, 4, 5, 6, 7, 8].map(k => T(23, k)) });
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
