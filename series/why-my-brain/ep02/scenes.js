// الحلقة ٢ — «ليه خمس دقايق على الموبايل… بتتحوّل لساعة؟»
// كل حركة مربوطة بكلمتها: T(فقرة، رقم الكلمة) — الفقرات ١..٢٧ زي script.txt. L(عريض، طولي) لكل مكان.
// الواقع في الطولي: برواز 4:5 في نص الشاشة لفوق (BOX_REAL)، والكروت مربّعة تقريبًا.
window.EPISODE = { n: 2, gaps: { 4: 3.0, 6: 0.5, 10: 0.3, 16: 0.4, 17: 1.1, 23: 0.6, 25: 0.3, 27: 7.5 }, build(A) {
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

  // ════════ ١–٤ · الواقع ════════
  const T4 = T(4, 2) - 0.2;
  { const sc = scene(0, T4 + 0.6, 'real');
    foot(sc, 'E01', 0, T(2, 1) - 0.1, { from: 2, focus: L([0.5, 0.35], [0.47, 0.4]), zoom: [1.0, 1.1], fadeIn: 0.6, shade: true });
    capWords(sc, 1, 0, 5, { ...CAP, hl: [3], end: T(1, 6) - 0.05 });
    const five = sticky(sc, '٥ دقايق بس', L(330, 300), L(330, 300), L(330, 340), L(54, 52), T(1, 6) - 0.05, -5);
    capWords(sc, 1, 9, 10, { ...CAP, end: P(1).next - 0.1 });
    // ٢: فيديو… وبعده فيديو… وحد بعتلك… ← ساعة عدّت
    foot(sc, 'E15', T(2, 1) - 0.12, T(2, 3) - 0.12, { from: 2, focus: [0.33, 0.45], zoom: [1.25, 1.35], fadeIn: 0.08, fadeOut: 0.08, shade: true }); fx('swish', T(2, 1) - 0.15, 0.8);
    foot(sc, 'E17', T(2, 3) - 0.12, T(2, 8) - 0.12, { from: 1, focus: [0.55, 0.35], zoom: [1.1, 1.18], fadeIn: 0.08, fadeOut: 0.08, shade: true }); fx('swish', T(2, 3) - 0.15, 0.8);
    out(five, T(2, 1) - 0.2, 0.15);
    capWords(sc, 2, 0, 2, { ...CAP, end: T(2, 3) - 0.1 });
    capWords(sc, 2, 3, 7, { ...CAP, end: T(2, 8) - 0.1 });
    foot(sc, 'E03', T(2, 8) - 0.12, P(3).t0 - 0.1, { from: 0, speed: 1.4, focus: [0.5, 0.45], zoom: [1.0, 1.15], fadeIn: 0.1, fadeOut: 0.15, shade: true }); fx('glitch', T(2, 8) - 0.12, 0.7);
    const clk = el('div', null, '', sc, { position: 'absolute', fontWeight: 1000, fontSize: px(L(150, 150)), color: '#fff', direction: 'ltr', textShadow: '0 10px 40px rgba(0,0,0,.6)', opacity: 0, fontVariantNumeric: 'tabular-nums' });
    center(clk, CX, L(470, 760)); const tc0 = T(2, 9), tc1 = T(2, 12) + 0.2;
    dyn(t => { const m = Math.round(5 + 55 * Math.pow(lerp(t, tc0, tc1), 1.6)); clk.textContent = (m >= 60 ? '1:00' : '0:' + String(m).padStart(2, '0')) + ':00'; });
    tl.fromTo(clk, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.3 }, tc0 - 0.1); tl.to(clk, { scale: 1.15, color: '#F5E6A3', duration: 0.2 }, tc1); fx('lowhit', tc1, 0.8); out(clk, P(3).t0 - 0.3);
    capWords(sc, 2, 10, 12, { ...CAP, hl: [11, 12] });
    // ٣: مش فاكر شفت إيه… وبيتجمّد عند «طب ليه؟»
    const fz = T(4, 0);
    const r = foot(sc, 'E02', P(3).t0 - 0.15, T4 + 0.25, { from: 0.3, freeze: fz, focus: L([0.5, 0.4], [0.5, 0.4]), zoom: [1.0, 1.08], fadeIn: 0.3, shade: true }); fx('whoosh', P(3).t0 - 0.2, 0.5);
    capWords(sc, 3, 0, 6, { ...CAP, hl: [3, 4, 5], end: T(3, 7) - 0.05 });
    capWords(sc, 3, 7, 12, { ...CAP, hl: [10, 11, 12], end: fz - 0.1 });
    flash(fz, 0.35); fx('lowhit', fz, 0.8); fx('reverse', fz - 0.7, 0.5);
    tl.to(r.querySelector('.src > img'), { filter: 'grayscale(1) brightness(.8)', duration: 0.4 }, fz);
    tl.to(r.tint, { opacity: 0.82, duration: 0.7 }, fz + 0.15);
    trace(r, ['M720 300 C720 70, 1250 70, 1250 300 C1250 560, 1100 700, 985 700 C870 700, 720 560, 720 300 Z',
      'M450 600 L700 545 L790 1000 L540 1060 Z', 'M1200 720 C1320 760, 1440 880, 1520 1080'], fz + 0.25, 0.8);
    fx('swish', fz + 0.3, 0.5);
    capWords(sc, 4, 0, 1, { ...CAP, y: L(470, 1420), size: L(110, 110), hl: [1], end: T4 + 0.05 });
  }
  // ════════ كارت العنوان ════════
  { const sc = scene(T4, P(5).t0 - 0.35, 'blue');
    const q = el('div', 'qmark', '؟', sc, { fontSize: px(L(1000, 760)), opacity: 0 }); Object.assign(q.style, H ? { left: '80px', top: '30px' } : { left: '160px', top: '1060px' });
    tl.fromTo(q, { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, T4 + 0.1);
    const sp = el('div', 'pill glass', '<span class="dot"></span>ليه دماغي بتعمل كده؟', sc, { fontSize: px(L(34, 38)), opacity: 0 });
    if (H) Object.assign(sp.style, { right: '160px', top: '230px' }); else center(sp, 540, 520); rise(sp, T4 + 0.05, -20);
    const ep = el('div', 'pill ink', 'الحلقة ٢', sc, { fontSize: px(L(28, 32)), padding: '6px 24px', opacity: 0 });
    if (H) Object.assign(ep.style, { right: '160px', top: '320px' }); else center(ep, 540, 610); rise(ep, T4 + 0.25, -20);
    const t1 = words(sc, 'ليه خمس دقايق على الموبايل…', { y: L(430, 760), size: L(108, 92), at: [2, 3, 4, 5, 6].map(k => T(4, k)) });
    const t2 = words(sc, '*بتتحوّل* *لساعة؟*', { y: L(580, 1000), size: L(122, 112), at: [7, 8].map(k => T(4, k)) });
    if (H) [t1, t2].forEach(x => Object.assign(x.style, { left: 'auto', right: '160px', textAlign: 'right', padding: 0 }));
    fx('impact', T(4, 8) + 0.4, 0.9); flash(T(4, 8) + 0.4, 0.15);
    tl.to([t1, t2, sp, ep], { opacity: 0, y: -40, duration: 0.35 }, P(5).t0 - 0.6); fx('whoosh_big', P(5).t0 - 0.6, 0.8);
  }
  // ════════ ٥–٦ · الرد الجاهز (فاتح) ════════
  { const sc = scene(P(5).t0 - 0.35, P(7).t0 - 0.35, 'light');
    chapter('اللي بيتقال لك', P(5).t0 - 0.2, P(7).t0 - 0.4, 'ink', 'var(--sky-400)');
    capWords(sc, 5, 0, 2, { y: L(170, 220), size: L(54, 58), color: 'var(--ink-2)', shadow: false, end: T(6, 7) - 0.2 });
    const POS = L([[1420, 380, -3], [760, 330, 2], [1060, 560, -2]], [[540, 480, -3], [540, 700, 2], [540, 920, -2]]);
    const cs = [['«إنت مدمن موبايل»', 3], ['«معندكش تحكم في نفسك»', 6], ['«بتضيّع وقتك على الفاضي»', 10]].map(([q, k], j) => cchip(sc, q, 'ghost', POS[j][0], POS[j][1], T(5, k) - 0.08, L(52, 50), POS[j][2], 'slap'));
    // في جزء صغير صح… بس مش التفسير الكامل
    const part = label(sc, '<i class="fa-solid fa-check" style="color:var(--green)"></i>جزء صغير', L(1420, 830), L(290, 410), T(6, 2) - 0.1, 'ink', L(32, 32)); fx('pop', T(6, 2), 0.5);
    tl.to(cs, { opacity: 0.4, scale: 0.88, duration: 0.4 }, T(6, 7));
    words(sc, 'مش ~التفسير~ ~الكامل~', { y: L(700, 1120), size: L(92, 88), color: 'var(--ink)', at: [9, 10, 11].map(k => T(6, k)) });
    [[1, 13], [2, 15]].forEach(([n, k], j) => { const c = el('div', null, AR(n), sc, { position: 'absolute', width: px(130), height: px(130), borderRadius: '50%', background: 'var(--blue-700)', color: '#fff', fontWeight: 1000, fontSize: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-card)', opacity: 0 });
      center(c, CX + (j ? -110 : 110), L(910, 1380)); pop(c, T(6, 13) - 0.1 + j * 0.25, 0, 'pop', 0.8); });
  }
  // ════════ ٧–١٧ · اللي بيحصل جوّه ════════
  chapter('اللي بيحصل جوّه', P(7).t0 - 0.2, P(17).t1 + 0.2);
  // ٧–٨: دلوقتي / مش دلوقتي
  { const sc = scene(P(7).t0 - 0.35, P(9).t0 - 0.3, 'blue');
    const one = el('div', null, AR(1), sc, { position: 'absolute', width: '120px', height: '120px', borderRadius: '50%', background: '#fff', color: 'var(--blue-700)', fontWeight: 1000, fontSize: '68px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, boxShadow: 'var(--shadow-card)' });
    center(one, L(1700, 540), L(200, 240)); pop(one, T(7, 0) - 0.1, 0, 'pop', 0.7);
    capWords(sc, 7, 0, 5, { y: L(150, 320), size: L(64, 68), hl: [2, 3], end: T(7, 6) - 0.1, x: L(260, null), width: L(1340, null) });
    capWords(sc, 7, 6, 16, { y: L(150, 320), size: L(56, 58), color: 'var(--sky-100)', end: T(8, 10) - 0.2, x: L(260, null), width: L(1340, null) });
    const now = el('div', 'card', '<div style="font-size:' + px(L(78, 80)) + ';font-weight:1000;color:var(--blue-700)">دلوقتي</div><div style="font-size:30px;font-weight:800;color:var(--ink-2)">منوّر… وباين</div>', sc,
      { width: px(L(620, 860)), height: px(L(300, 280)), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', boxShadow: '0 0 60px rgba(24,177,254,.8), var(--shadow-card)' });
    center(now, L(1300, 540), L(560, 640)); pop(now, T(7, 17) - 0.1, -1, 'pop', 0.8);
    const later = el('div', 'glasscard', '<div style="font-size:' + px(L(78, 80)) + ';font-weight:1000">مش دلوقتي</div><div style="font-size:30px;font-weight:800;color:var(--sky-100)">ضباب</div>', sc,
      { width: px(L(620, 860)), height: px(L(300, 280)), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#fff', filter: 'blur(1.5px)' });
    center(later, L(620, 540), L(560, 1000)); pop(later, T(7, 18) - 0.1, 1, 'pop', 0.8);
    // الحاجات بتترمي في «مش دلوقتي»
    [['<i class="fa-regular fa-clock"></i>الساعة اللي جاية', 0, 3], ['<i class="fa-regular fa-calendar"></i>الميعاد بالليل', 5, 8]].forEach(([tx, k0, k1], j) => {
      const c = chip(sc, tx, 'white', L(1300, 540), L(560 - 210 + j * 0, 640 - 230), L(40, 40)); c.style.zIndex = 3;
      pop(c, T(8, k0) - 0.1, j ? 2 : -2, 'pop', 0.7);
      tl.to(c, { left: px(L(620, 540)), top: px(L(560, 1000)), scale: 0.6, opacity: 0, filter: 'blur(6px)', duration: 0.7, ease: 'power2.in' }, T(8, k1) - 0.1); fx('swish', T(8, k1), 0.6); });
    capWords(sc, 8, 10, 20, { y: L(820, 1310), size: L(56, 62), hl: [12, 13] });
    icon(sc, 'fa-volume-xmark', CX, L(980, 1560), L(70, 80), 'var(--sky-100)', T(8, 19) - 0.1);
  }
  // ٩: عمى الوقت — ساعة رملية
  { const sc = scene(P(9).t0 - 0.3, P(10).t0 - 0.25);
    card(sc, 'E14', P(9).t0 - 0.2, P(10).t0 - 0.25, L(SQ(1420, 520, 600), SQ(540, 620, 760)), { focus: [0.5, 0.5] });
    const eye = icon(sc, 'fa-eye-slash', L(560, 540), L(330, 1130), L(110, 110), 'var(--sky-100)', T(9, 4) - 0.1);
    words(sc, '«عمى الوقت»', { y: L(420, 1200), size: L(104, 100), at: [4, 5].map(k => T(9, k)), x: L(160, null), width: L(800, null) });
    words(sc, 'لحد ما *تشوفه* قدامك', { y: L(640, 1380), size: L(64, 66), color: 'var(--sky-100)', at: [12, 13, 14, 15].map(k => T(9, k)), x: L(160, null), width: L(800, null) });
    tl.set(eye, { attr: { class: 'fa-solid fa-eye' } }, T(9, 14) - 0.05); tl.to(eye, { color: '#F5E6A3', scale: 1.15, duration: 0.25 }, T(9, 14) - 0.05); fx('pop', T(9, 14), 0.7);
  }
  // ١٠: الميعاد فضل «مش دلوقتي»… لحد ما بقى «فات»
  { const sc = scene(P(10).t0 - 0.25, P(11).t0 - 0.3);
    card(sc, 'E04', P(10).t0 - 0.15, P(11).t0 - 0.3, L(SQ(500, 520, 600), SQ(540, 600, 720)), { focus: [0.55, 0.5], from: 2 });
    capWords(sc, 10, 2, 8, { y: L(170, 1030), size: L(56, 58), x: L(900, null), width: L(900, null), end: T(10, 9) - 0.1 });
    capWords(sc, 10, 9, 12, { y: L(170, 1030), size: L(56, 58), x: L(900, null), width: L(900, null), hl: [11, 12], end: T(10, 13) - 0.1 });
    const nd = cchip(sc, 'مش دلوقتي', 'glass', L(1350, 540), L(470, 1250), T(10, 16) - 0.1, L(60, 60), -2);
    const gone = cchip(sc, '<i class="fa-solid fa-triangle-exclamation"></i>فات!', 'white', L(1350, 540), L(680, 1460), T(10, 21) - 0.1, L(76, 76), 3, 'slap');
    gone.style.color = 'var(--red)'; strike(nd, T(10, 21) - 0.15); fx('lowhit', T(10, 21), 0.8);
  }
  // ١١: الحاجة التانية… في إيدك
  { const sc = scene(P(11).t0 - 0.3, P(12).t0 - 0.3);
    const two = el('div', null, AR(2), sc, { position: 'absolute', width: '170px', height: '170px', borderRadius: '50%', background: '#fff', color: 'var(--blue-700)', fontWeight: 1000, fontSize: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, boxShadow: 'var(--shadow-card)' });
    center(two, CX, L(330, 600)); pop(two, T(11, 4) - 0.1, 0, 'pop', 0.8);
    words(sc, 'الحاجة التانية… *في* *إيدك*', { y: L(520, 820), size: L(96, 92), at: [4, 5, 6, 7].map(k => T(11, k)) });
    const ph = el('i', 'fa-solid fa-mobile-screen-button', null, sc, { position: 'absolute', fontSize: px(L(170, 200)), color: '#fff', opacity: 0 }); center(ph, CX, L(830, 1300));
    tl.fromTo(ph, { opacity: 0, y: 120 }, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.6)' }, T(11, 7) - 0.15); fx('whoosh', T(11, 7) - 0.15, 0.6);
  }
  // ١٢: الحاجات زمان كان ليها آخر
  { const sc = scene(P(12).t0 - 0.3, P(13).t0 - 0.3);
    capWords(sc, 12, 0, 4, { y: L(150, 220), size: L(64, 68), hl: [3, 4], end: T(12, 13) - 0.2 });
    const B = L([SQ(1450, 560, 440), SQ(960, 560, 440), SQ(470, 560, 440)], [SQ(300, 600, 420), SQ(780, 600, 420), SQ(540, 1110, 420)]);
    // الحلقة بتخلص: شاشة عليها «النهاية»
    const tv = el('div', null, '<i class="fa-solid fa-tv" style="font-size:150px;color:var(--blue-700)"></i><div style="font-size:44px;font-weight:1000;color:var(--ink)">النهاية</div>', sc,
      { position: 'absolute', left: px(B[0].x), top: px(B[0].y), width: px(B[0].w), height: px(B[0].h), borderRadius: '36px', background: '#fff', boxShadow: 'var(--shadow-float)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', opacity: 0 });
    rise(tv, T(12, 5) - 0.15, 60, 0.45, 'whoosh', 0.6);
    card(sc, 'E05', T(12, 7) - 0.15, P(13).t0 - 0.3, B[1], { focus: [0.5, 0.5] });
    card(sc, 'E06', T(12, 10) - 0.15, P(13).t0 - 0.3, B[2], { focus: [0.45, 0.5] });
    const lb = ['الحلقة بتخلص', 'الكتاب ليه فصول', 'الجرنال آخره صفحة'];
    B.forEach((b, j) => { const c = chip(sc, '<i class="fa-solid fa-flag-checkered"></i>' + lb[j], 'sticky', b.x + b.w / 2, b.y + b.h + L(4, -10), L(32, 32)); c.style.zIndex = 4; pop(c, T(12, [6, 9, 12][j]), j % 2 ? 2 : -2, 'pop', 0.6); });
    const k = sticky(sc, '«خلاص، كفاية كده»', CX, L(940, 1600), L(620, 720), L(54, 56), T(12, 17) - 0.1, -2); k.style.zIndex = 6;
  }
  // ١٣: الموبايل من غير آخر — feed مالوش نهاية
  { const sc = scene(P(13).t0 - 0.3, P(14).t0 - 0.3);
    const ph = el('div', 'phone', '<div style="position:relative;background:#f1f4f9"><div class="feed" style="position:absolute;left:0;right:0;top:0"></div></div>', sc, { width: px(L(380, 460)), height: px(L(780, 940)) });
    center(ph, L(620, 540), L(540, 700));
    const feed = ph.querySelector('.feed'), C = ['#1E88D4', '#F5A623', '#1FA971', '#7C3AED', '#E5484D', '#18B1FE'];
    for (let i = 0; i < 40; i++) el('div', null, '<div style="height:150px;border-radius:18px;background:' + C[i % 6] + ';opacity:.85"></div><div style="height:16px;width:70%;margin:12px 6px;border-radius:8px;background:#cfd8e6"></div>', feed, { padding: '14px 16px 4px' });
    const f0 = P(13).t0 - 0.3;
    dyn(t => { feed.style.transform = 'translateY(' + (-((Math.max(0, t - f0) * 260) % 4200)) + 'px)'; });
    rise(ph, P(13).t0 - 0.2, 120, 0.5, 'whoosh', 0.7);
    capWords(sc, 13, 0, 5, { y: L(200, 1500), size: L(66, 64), x: L(1000, null), width: L(820, null), hl: [3, 4, 5], end: T(13, 6) - 0.1 });
    const nx = el('div', 'pill', '<i class="fa-solid fa-forward"></i>اللي بعده بيشتغل لوحده', sc, { background: 'var(--ink)', color: '#fff', fontSize: px(L(36, 36)), opacity: 0, boxShadow: 'var(--shadow-card)' });
    center(nx, L(1410, 540), L(470, 1500)); rise(nx, T(13, 8) - 0.1, 20, 0.35, 'pop', 0.6); out(nx, T(13, 12) - 0.15);
    const inf = el('i', 'fa-solid fa-infinity', null, sc, { position: 'absolute', fontSize: px(L(150, 150)), color: 'var(--sticky)', opacity: 0 }); center(inf, L(1410, 540), L(470, 1440));
    pop(inf, T(13, 12) - 0.1, 0, 'pop', 0.7);
    words(sc, 'عمرها ما *بتخلص*', { y: L(640, 1620), size: L(80, 76), at: [13, 14, 15].map(k => T(13, k)), x: L(1000, null), width: L(820, null) });
  }
  // ١٤–١٥: «يشدّني» + «يمكن» مع كل سحبة
  { const sc = scene(P(14).t0 - 0.3, P(16).t0 - 0.3);
    card(sc, 'E01', P(14).t0 - 0.2, P(16).t0 - 0.3, L(SQ(960, 560, 600), SQ(540, 660, 740)), { focus: [0.45, 0.2], zoom: [1.7, 1.8], from: 0 });
    const pull = cchip(sc, '«يشدّني»', 'sticky', L(1560, 540), L(240, 200), T(14, 1) - 0.1, L(66, 64), -3, 'slap');
    const tag = label(sc, 'من الحلقة ١', L(1560, 860), L(330, 200), T(14, 2), 'glass', L(28, 28)); tag.style.border = '2px solid rgba(255,255,255,.4)';
    const BP = L([[1530, 520], [390, 420], [400, 760]], [[300, 1160], [780, 1160], [540, 1310]]);
    [['يمكن الجاي حلو؟', 11], ['يمكن يضحّك؟', 14], ['يمكن جديد؟', 16]].forEach(([tx, k], j) => cchip(sc, tx, 'white', BP[j][0], BP[j][1], T(14, k) - 0.1, L(46, 40), [-3, 2, -2][j]));
    // ١٥: «يمكن» مع كل سحبة… ومفيش «وقّف هنا»
    tl.to(sc.querySelectorAll('.chip.white'), { opacity: 0.35, duration: 0.3 }, P(15).t0);
    capWords(sc, 15, 5, 11, { y: L(890, 1480), size: L(58, 62), hl: [8] , end: T(15, 12) - 0.1 });
    const stop = el('div', null, '<i class="fa-solid fa-hand"></i><span>وقّف هنا</span>', sc, { position: 'absolute', display: 'flex', alignItems: 'center', gap: '18px', padding: '18px 40px', borderRadius: '999px', border: '4px dashed rgba(255,255,255,.55)', color: 'rgba(255,255,255,.75)', fontWeight: 900, fontSize: px(L(52, 52)), opacity: 0 });
    center(stop, CX, L(900, 1500)); pop(stop, T(15, 17) - 0.1, 0, 'pop', 0.6);
    const none = chip(sc, 'مش موجودة', 'white', L(1320, 540), L(990, 1620), L(36, 36)); none.style.color = 'var(--red)'; pop(none, T(15, 18) + 0.2, 4, 'slap', 0.7);
  }
  // ١٦: المعادلة
  { const sc = scene(P(16).t0 - 0.3, P(17).t0 - 0.3);
    const w1 = words(sc, 'المشكلة مش إنك ضعيف', { y: L(180, 300), size: L(78, 74), at: [0, 1, 2, 3].map(k => T(16, k)) });
    strike(w1.querySelectorAll('.w')[3], T(16, 4) - 0.1, 10);
    const E = L([[1620, 520], [1330, 520], [1040, 520], [790, 520], [580, 520]], [[540, 620], [540, 790], [540, 960], [540, 1130], [540, 1310]]);
    const a = cchip(sc, '<i class="fa-solid fa-brain"></i>مش حاسس بالوقت', 'white', E[0][0], E[0][1], T(16, 4) - 0.1, L(40, 44));
    const p = el('i', 'fa-solid fa-plus', null, sc, { position: 'absolute', fontSize: '54px', color: 'var(--sky-100)', opacity: 0 }); center(p, E[1][0], E[1][1]); pop(p, T(16, 8) - 0.2, 0, null);
    const b = cchip(sc, '<i class="fa-solid fa-infinity"></i>معمولة ما تخلصش', 'white', E[2][0], E[2][1], T(16, 8) - 0.1, L(40, 44));
    const eq = el('i', 'fa-solid fa-equals', null, sc, { position: 'absolute', fontSize: '54px', color: 'var(--sky-100)', opacity: 0 }); center(eq, E[3][0], E[3][1]); pop(eq, T(16, 13) - 0.1, 0, null);
    const r = cchip(sc, '<i class="fa-regular fa-clock"></i>ساعة', 'sticky', E[4][0], E[4][1], T(16, 13), L(56, 58), -2, 'slap');
    capWords(sc, 16, 14, 19, { y: L(820, 1500), size: L(58, 62), color: 'var(--sky-100)' });
  }
  // ١٧: الخبر الحلو — إنت تحط الآخر
  { const sc = scene(P(17).t0 - 0.3, P(18).t0 - 1.2);
    const sp = icon(sc, 'fa-bolt', CX, L(300, 560), L(130, 150), 'var(--sticky)', T(17, 0) - 0.1, 'rise'); sp.style.filter = 'drop-shadow(0 0 30px rgba(245,230,163,.8))';
    words(sc, 'تقدر تحط *بإيدك* *الآخر*', { y: L(470, 760), size: L(100, 92), at: [3, 4, 5, 6].map(k => T(17, k)) });
    icon(sc, 'fa-flag-checkered', CX, L(780, 1180), L(120, 140), '#fff', T(17, 6) + 0.1, 'slap');
  }

  // ════════ ١٨–٢٣ · تعمل إيه؟ ════════
  { const t = P(18).t0 - 1.1, sc = scene(t, P(18).t0 - 0.05, 'light');
    words(sc, 'طب ~تعمل~ إيه؟', { y: L(400, 820), size: L(140, 130), color: 'var(--ink)', t: t + 0.05 }); fx('whoosh_big', t, 0.8); fx('slap', t + 0.3, 0.6);
  }
  chapter('تعمل إيه؟', P(18).t0 - 0.2, P(23).t1 + 0.3, 'ink', 'var(--sticky)');
  const SB = L({ x: 860, y: 200, w: 940 }, { x: 60, y: 230, w: 960 });
  // ١٨–١٩: خلّي الوقت يتشاف
  { const sc = scene(P(18).t0 - 0.1, P(20).t0 - 0.3);
    const s = step(sc, 1, 'خلّي الوقت <span class="hl">يتشاف</span>', P(18).t0 - 0.05, SB, L(68, 66));
    const r1 = row(s, '<i class="fa-regular fa-clock" style="color:var(--sky-400)"></i>ساعة قدامك على المكتب', L(42, 42), 34), r2 = row(s, '<i class="fa-solid fa-stopwatch" style="color:var(--sky-400)"></i>تايمر برّه الموبايل', L(42, 42), 18);
    rise(r1, T(18, 5) - 0.1, 20, 0.3, 'pop', 0.5); rise(r2, T(18, 9) - 0.1, 20, 0.3, 'pop', 0.5);
    card(sc, 'E09', T(18, 5) - 0.2, P(20).t0 - 0.3, L(SQ(470, 540, 520), SQ(540, 975, 520)), { focus: [0.5, 0.5], zoom: [1.2, 1.26] });
    capWords(sc, 18, 13, 20, { y: L(740, 1360), size: L(46, 50), color: 'var(--ink)', shadow: false, x: L(880, null), width: L(900, null), hl: [14, 15], hlCls: 'hl', end: P(19).t0 - 0.1 });
    const w = words(sc, 'مش بيتحسّ… بس ~بيتشاف~', { y: L(760, 1450), size: L(66, 70), color: 'var(--ink)', at: [3, 4, 5, 6].map(k => T(19, k)), x: L(880, null), width: L(900, null) });
    strike(w.querySelectorAll('.w')[1], T(19, 5) - 0.1, 10);
  }
  // ٢٠: حط النهاية قبل البداية
  { const sc = scene(P(20).t0 - 0.3, P(21).t0 - 0.3);
    const s = step(sc, 2, 'حط <span class="hl">النهاية</span> قبل البداية', P(20).t0 - 0.2, SB, L(64, 64));
    sticky(sc, '«فيديوهين وأقفل»', L(1330, 540), L(640, 760), L(640, 760), L(56, 58), T(20, 11) - 0.1, -3);
    card(sc, 'E12', T(20, 14) - 0.2, P(21).t0 - 0.3, L(SQ(470, 560, 600), SQ(540, 1260, 560)), { focus: [0.5, 0.5] });
    const lb = chip(sc, '<i class="fa-solid fa-mug-hot"></i>«لحد ما الشاي يخلص»', 'sticky', L(470, 540), L(870, 1560), L(36, 38)); lb.style.zIndex = 4; pop(lb, T(20, 15), 2, 'pop', 0.6);
  }
  // ٢١–٢٢: خلّي حاجة تانية توقفك
  { const sc = scene(P(21).t0 - 0.3, P(23).t0 - 0.3);
    capWords(sc, 21, 0, 7, { y: L(170, 230), size: L(60, 62), color: 'var(--ink)', shadow: false, hl: [4, 5, 6, 7], hlCls: 'hl', end: P(22).t0 - 0.1 });
    const CP = L([[1440, 380], [960, 380], [480, 380]], [[540, 480], [540, 630], [540, 780]]);
    const opts = [['fa-hourglass-end', 'حد أقصى للتطبيق', 8], ['fa-mobile-screen', 'تقلب الموبايل على وشه', 12], ['fa-door-closed', 'أوضة تانية', 17]];
    opts.forEach(([ic, tx, k], j) => cchip(sc, '<i class="fa-solid ' + ic + '"></i>' + tx, 'white', CP[j][0], CP[j][1], T(21, k) - 0.1, L(40, 42), j % 2 ? 2 : -2));
    card(sc, 'E11', T(21, 12) - 0.2, P(23).t0 - 0.3, L(SQ(960, 720, 420), SQ(540, 1170, 520)), { focus: [0.5, 0.5] });
    // ٢٢: مش مطلوب تمسح التطبيقات… المطلوب: نهاية قبل ما تبدأ
    tl.to(sc.querySelectorAll('.chip.white'), { opacity: 0.35, duration: 0.3 }, P(22).t0);
    const del = cchip(sc, '<i class="fa-solid fa-trash"></i>تمسح التطبيقات', 'ghost', L(1440, 540), L(720, 1560), T(22, 2) - 0.1, L(44, 44), -2);
    strike(del, T(22, 4) - 0.05);
    const ok = cchip(sc, '<i class="fa-solid fa-flag-checkered"></i>نهاية… قبل ما تبدأ', 'sticky', L(480, 540), L(720, 1720), T(22, 13) - 0.1, L(46, 46), 2, 'slap');
  }
  // ٢٣: اسأل قبل ما تفتح
  { const sc = scene(P(23).t0 - 0.3, P(24).t0 - 0.45);
    const s = step(sc, 3, 'اسأل قبل ما <span class="hl">تفتح</span>', P(23).t0 - 0.2, SB, L(66, 64));
    card(sc, 'E10', T(23, 2) - 0.2, P(24).t0 - 0.45, L(SQ(470, 560, 600), SQ(540, 1000, 640)), { focus: [0.42, 0.45] });
    const q = sticky(sc, '«أنا فاتحه ليه؟»', L(1330, 540), L(600, 1440), L(620, 700), L(56, 58), T(23, 6) - 0.1, -2);
    const dk = cchip(sc, '«مش عارف»', 'ghost', L(1330, 540), L(800, 1600), T(23, 11) - 0.1, L(46, 46), 2);
    const back = cchip(sc, '<i class="fa-solid fa-arrow-rotate-left"></i>الحلقة ١: «مش قادر أبدأ»', 'ink', L(1330, 540), L(930, 1760), T(23, 19) - 0.1, L(34, 36), 0);
  }
  // ════════ ٢٤ · الواقع ════════
  { const sc = scene(P(24).t0 - 0.45, P(25).t0 - 0.3, 'real');
    foot(sc, 'E13', P(24).t0 - 0.45, P(25).t0 - 0.3, { from: 1, speed: 0.9, focus: L([0.5, 0.45], [0.55, 0.5]), zoom: [1.0, 1.06], fadeIn: 0.5, shade: true }); fx('whoosh', P(24).t0 - 0.5, 0.6);
    const q1 = chip(sc, '«أنا ضعيف»', 'glass', CX, L(760, 1430), L(64, 68)); q1.style.background = 'rgba(6,16,36,.55)';
    pop(q1, T(24, 8) - 0.1, -2, 'pop', 0.6); strike(q1, T(24, 10) - 0.1); tl.to(q1, { opacity: 0, y: -40, duration: 0.3 }, T(24, 10) + 0.35);
    const q2 = words(sc, '«الموبايل مالوش آخر… | فأنا اللي *هحط* *الآخر»*', { y: L(760, 1400), size: L(70, 70), at: [11, 12, 13, 14, 15, 16, 17].map(k => T(24, k)) });
    q2.style.textShadow = '0 6px 28px rgba(0,0,0,.5)';
  }
  // ════════ ٢٥–٢٧ ════════
  { const sc = scene(P(25).t0 - 0.3, P(26).t0 - 0.2, 'blue');
    words(sc, 'إنت مش ضعيف…', { y: L(320, 700), size: L(110, 104), at: [0, 1, 2].map(k => T(25, k)) });
    words(sc, 'إنت بس محتاج *تشوف* *وقتك.*', { y: L(500, 900), size: L(104, 92), at: [3, 4, 5, 6, 7].map(k => T(25, k)) });
    icon(sc, 'fa-eye', CX, L(800, 1250), L(120, 140), 'var(--sticky)', T(25, 6) + 0.1, 'impact');
  }
  { const sc = scene(P(26).t0 - 0.2, P(27).t0 - 0.2);
    const ph = el('div', 'phone', '<div><img src="../../../etizan-posts/template/assets/screens/adult_pomodoro.png"></div>', sc, { width: px(L(300, 340)), height: px(L(624, 706)) });
    center(ph, L(560, 540), L(560, 1180)); tl.fromTo(ph, { opacity: 0, y: 160, rotation: 0 }, { opacity: 1, y: 0, rotation: -4, duration: 0.6, ease: 'power3.out' }, T(26, 8) - 0.3); fx('whoosh', T(26, 8) - 0.3, 0.6);
    const lg = el('div', null, '<img src="../../../etizan-explainer-video/pipeline/assets/logo-full.png" style="height:' + px(L(110, 120)) + ';display:block">', sc, { position: 'absolute', padding: '22px 50px', background: '#fff', borderRadius: '56px', boxShadow: 'var(--shadow-card)', opacity: 0 });
    center(lg, L(1300, 540), L(620, 560)); pop(lg, T(26, 12) - 0.2, 0, 'pop', 0.7);
    capWords(sc, 26, 0, 7, { y: L(330, 260), size: L(58, 62), color: 'var(--sky-100)', x: L(960, null), width: L(860, null) });
  }
  { const sc = scene(P(27).t0 - 0.2, null);
    const sp = el('div', 'pill glass', '<span class="dot"></span>ليه دماغي بتعمل كده؟', sc, { fontSize: px(L(32, 36)), opacity: 0 }); center(sp, L(1420, 540), L(200, 360)); rise(sp, P(27).t0, -20);
    const nx = el('div', 'pill ink', 'الحلقة الجاية', sc, { fontSize: px(L(30, 34)), opacity: 0 }); center(nx, L(1420, 540), L(290, 460)); rise(nx, T(27, 1) - 0.1, -20);
    const q = words(sc, 'ليه بشتغل أحسن… | لما *الوقت* *يزنقني؟*', { y: L(380, 600), size: L(80, 84), at: [3, 4, 5, 6, 7, 8].map(k => T(27, k)) });
    if (H) Object.assign(q.style, { left: 'auto', right: '100px', width: '860px', padding: 0, textAlign: 'center' });
    const lg = el('div', null, '<img src="../../../etizan-explainer-video/pipeline/assets/logo-full.png" style="height:' + px(L(80, 96)) + ';display:block">', sc, { position: 'absolute', padding: '18px 40px', background: '#fff', borderRadius: '44px', boxShadow: 'var(--shadow-card)', opacity: 0 });
    center(lg, L(1420, 540), L(820, 1560)); rise(lg, P(27).t1 + 0.3, 20);
    if (H) {
      const es = el('div', null, null, sc, { position: 'absolute', left: '110px', top: '170px', width: '760px', height: '428px', borderRadius: '28px', border: '4px dashed rgba(255,255,255,.28)', opacity: 0 });
      const sb = el('div', null, null, sc, { position: 'absolute', left: '370px', top: '650px', width: '240px', height: '240px', borderRadius: '50%', border: '4px dashed rgba(255,255,255,.28)', opacity: 0 });
      rise(es, P(27).t1 + 0.4, 20); rise(sb, P(27).t1 + 0.6, 20);
    } else {
      const fol = el('div', 'pill', '<i class="fa-solid fa-bell"></i>تابع السلسلة', sc, { background: 'var(--sticky)', color: 'var(--ink)', fontSize: '40px', opacity: 0, boxShadow: 'var(--shadow-card)' }); center(fol, 540, 1350); pop(fol, P(27).t1 + 0.5, -2, 'pop', 0.6);
    }
    tl.to('#stage', { opacity: 0, duration: 0.6 }, DUR - 0.6);
  }
} };
