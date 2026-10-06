// الحلقة ٤ — «ليه بنسى حاجة… كنت بفكر فيها من ثانيتين؟»
// كل حركة مربوطة بكلمتها: T(فقرة، رقم الكلمة) — الفقرات ١..٢٣ زي script.txt. L(عريض، طولي) لكل مكان.
// التشبيه الثابت: مخزن كبير (الذاكرة الطويلة) + ترابيزة صغيرة (الذاكرة العاملة) بتشيل ٣ حاجات بس.
window.EPISODE = { n: 4, gaps: { 4: 3.0, 6: 0.5, 10: 0.4, 11: 0.3, 13: 1.1, 15: 0.3, 17: 0.3, 19: 0.6, 20: 0.3, 23: 7.5 }, build(A) {
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
  // ── الترابيزة الصغيرة (الذاكرة العاملة) ──
  function table(sc, cx, cy, W) {
    const t = el('div', null, '<div style="position:absolute;left:0;top:0;width:100%;height:30px;border-radius:15px;background:#EBD9B4;box-shadow:0 18px 40px rgba(2,20,60,.35)"></div>'
      + '<div style="position:absolute;left:8%;top:30px;width:24px;height:150px;border-radius:0 0 10px 10px;background:#CDB68C"></div><div style="position:absolute;right:8%;top:30px;width:24px;height:150px;border-radius:0 0 10px 10px;background:#CDB68C"></div>', sc,
      { position: 'absolute', width: px(W), height: '180px', opacity: 0 });
    center(t, cx, cy);
    t.pos = j => ({ x: cx + (1 - j) * W / 3, y: cy - 90 - 82 });   // ٠ = يمين (أول خانة)، ١ = نص، ٢ = شمال
    return t;
  }
  const TW = L(190, 220), TH = L(150, 160);
  const tile = (sc, ic, tx, x, y, cls = 'card', color = 'var(--blue-700)') => { const d = el('div', cls, '<i class="fa-solid ' + ic + '" style="font-size:' + px(L(58, 62)) + ';color:' + color + '"></i><div style="font-size:' + px(L(28, 30)) + ';font-weight:900;margin-top:10px;color:var(--ink)">' + tx + '</div>', sc,
    { position: 'absolute', width: px(TW), height: px(TH), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0, zIndex: 3 }); center(d, x, y); return d; };
  const drop = (d, t, from = -260) => { tl.fromTo(d, { opacity: 0, y: from, rotation: -8 }, { opacity: 1, y: 0, rotation: 0, duration: 0.45, ease: 'bounce.out' }, t); fx('pop', t + 0.3, 0.6); return d; };
  const fall = (d, t, dir = 1) => { tl.to(d, { x: dir * L(260, 200), y: L(420, 520), rotation: dir * 75, opacity: 0, duration: 0.8, ease: 'power2.in' }, t); fx('swish', t, 0.7); fx('lowhit', t + 0.55, 0.6); };
  // ── المخزن الكبير (الذاكرة الطويلة) ──
  const STORE = ['fa-house', 'fa-book', 'fa-graduation-cap', 'fa-car', 'fa-futbol', 'fa-camera', 'fa-plane', 'fa-gift', 'fa-glass-water', 'fa-face-smile', 'fa-bicycle', 'fa-utensils'];
  function store(sc, cx, cy, w, h) {
    const s = el('div', 'glasscard', '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:' + px(L(18, 16)) + ';height:100%">' + STORE.map((ic, j) => '<div class="cell c' + j + '" style="border-radius:18px;background:rgba(255,255,255,.14);display:flex;align-items:center;justify-content:center;font-size:' + px(L(44, 46)) + ';color:#D9F0FD"><i class="fa-solid ' + ic + '"></i></div>').join('') + '</div>', sc,
      { width: px(w), height: px(h), padding: px(L(26, 24)), opacity: 0 });
    center(s, cx, cy); return s;
  }

  // ════════ ١–٤ · الواقع ════════
  const T4 = T(4, 2) - 0.2;
  { const sc = scene(0, T4 + 0.6, 'real');
    // ١: دخلت المطبخ… ووقفت في نصه — كنت جاي أجيب إيه؟
    foot(sc, 'H01', 0, P(2).t0 - 0.1, { from: 1.4, speed: 0.7, focus: L([0.55, 0.4], [0.58, 0.4]), zoom: [1.0, 1.08], fadeIn: 0.6, shade: true }); fx('ticktock', 0.2, 0.35);
    capWords(sc, 1, 0, 4, { ...CAP, end: T(1, 5) - 0.1 });
    capWords(sc, 1, 5, 7, { ...CAP, hl: [7], end: T(1, 8) - 0.1 });
    const q = sticky(sc, 'كنت جاي<br>أجيب إيه؟', L(1560, 790), L(300, 330), L(380, 340), L(56, 52), T(1, 8) - 0.05, 4); fx('paper', T(1, 8) - 0.05, 0.8);
    capWords(sc, 1, 8, 11, { ...CAP, hl: [10, 11], end: P(2).t0 - 0.1 });
    out(q, P(2).t0 - 0.2, 0.15);
    // ٢: ترجع مكانك… تفتكر — الجملة تقف في نصها — الفكرة اللي راحت
    foot(sc, 'H09', P(2).t0 - 0.12, T(2, 6) - 0.1, { from: 0, focus: L([0.5, 0.4], [0.5, 0.42]), zoom: [1.0, 1.06], fadeIn: 0.08, fadeOut: 0.08, shade: true }); fx('swish', P(2).t0 - 0.15, 0.7);
    capWords(sc, 2, 0, 5, { ...CAP, hl: [5], end: T(2, 6) - 0.1 });
    const ah = cchip(sc, '<i class="fa-solid fa-lightbulb"></i>آه! كوباية', 'sticky', L(1450, 540), L(330, 330), T(2, 5) - 0.05, L(50, 48), -3, 'slap'); out(ah, T(2, 6) - 0.2, 0.1);
    foot(sc, 'H02', T(2, 6) - 0.12, T(2, 16) - 0.1, { from: 1.5, focus: L([0.5, 0.4], [0.52, 0.42]), zoom: L([1.0, 1.05], [1.2, 1.25]), fadeIn: 0.08, fadeOut: 0.08, shade: true }); fx('swish', T(2, 6) - 0.15, 0.7);
    capWords(sc, 2, 6, 12, { ...CAP, end: T(2, 13) - 0.1 });
    const wt = cchip(sc, '«كنت بقول إيه؟»', 'white', L(1420, 540), L(330, 330), T(2, 13) - 0.05, L(56, 52), 3, 'slap'); out(wt, T(2, 16) - 0.2, 0.1);
    capWords(sc, 2, 13, 15, { ...CAP, hl: [13, 14, 15], end: T(2, 16) - 0.1 });
    const b0 = T(2, 16) - 0.12;
    foot(sc, 'H03', b0, P(3).t0 - 0.1, { from: Math.max(2.5, 12.6 - (T(2, 21) - b0)), focus: [0.5, 0.42], zoom: L([1.0, 1.05], [1.15, 1.2]), fadeIn: 0.1, fadeOut: 0.1, shade: true }); fx('switch', b0 + 0.1, 0.8);
    capWords(sc, 2, 16, 20, { ...CAP, hl: [17, 18], end: T(2, 21) - 0.1 });
    capWords(sc, 2, 21, 25, { ...CAP, hl: [21], end: P(3).t0 - 0.1 }); fx('reverse', T(2, 21) - 0.3, 0.5);
    // ٣: كانت في دماغك من ثانيتين بس… مش من سنة — وبيتجمّد عند «طب ليه؟»
    const fz = T(4, 0);
    const r = foot(sc, 'H04', P(3).t0 - 0.15, T4 + 0.25, { from: 5, freeze: fz, focus: L([0.45, 0.4], [0.3, 0.4]), zoom: [1.0, 1.04], fadeIn: 0.3, shade: true }); fx('whoosh', P(3).t0 - 0.2, 0.5);
    capWords(sc, 3, 0, 7, { ...CAP, hl: [5, 6, 7], end: T(3, 8) - 0.1 });
    const two = cchip(sc, '<i class="fa-solid fa-stopwatch"></i>من ٢ ثانية', 'sticky', L(1450, 790), L(300, 330), T(3, 6) - 0.05, L(50, 46), -2, 'slap');
    const yr = cchip(sc, '<i class="fa-regular fa-calendar"></i>مش من سنة', 'white', L(1450, 790), L(420, 440), T(3, 9) - 0.05, L(44, 40), 2); strike(yr, T(3, 10));
    capWords(sc, 3, 8, 10, { ...CAP, hl: [10], end: fz - 0.1 });
    out(two, fz - 0.15, 0.2); out(yr, fz - 0.15, 0.2);
    flash(fz, 0.35); fx('lowhit', fz, 0.8); fx('reverse', fz - 0.7, 0.5);
    tl.to(r.querySelector('.src > img'), { filter: 'grayscale(1) brightness(.8)', duration: 0.4 }, fz);
    tl.to(r.tint, { opacity: 0.82, duration: 0.7 }, fz + 0.15);
    trace(r, window.TRACE4 || ['M1180 140 C1180 -20, 1420 -20, 1440 160 C1460 330, 1390 460, 1300 470 C1220 480, 1170 380, 1180 140 Z',
      'M1360 70 C1500 -40, 1700 40, 1660 170 M1690 110 L1760 70 M1700 190 L1790 200'], fz + 0.25, 0.8);
    fx('swish', fz + 0.3, 0.5);
    capWords(sc, 4, 0, 1, { ...CAP, y: L(470, 1420), size: L(110, 110), hl: [1], end: T4 + 0.05 });
  }
  // ════════ كارت العنوان ════════
  { const sc = scene(T4, P(5).t0 - 0.35, 'blue');
    const q = el('div', 'qmark', '؟', sc, { fontSize: px(L(1000, 760)), opacity: 0 }); Object.assign(q.style, H ? { left: '80px', top: '30px' } : { left: '160px', top: '1060px' });
    tl.fromTo(q, { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, T4 + 0.1);
    const sp = el('div', 'pill glass', '<span class="dot"></span>ليه دماغي بتعمل كده؟', sc, { fontSize: px(L(34, 38)), opacity: 0 });
    if (H) Object.assign(sp.style, { right: '160px', top: '230px' }); else center(sp, 540, 520); rise(sp, T4 + 0.05, -20);
    const ep = el('div', 'pill ink', 'الحلقة ٤', sc, { fontSize: px(L(28, 32)), padding: '6px 24px', opacity: 0 });
    if (H) Object.assign(ep.style, { right: '160px', top: '320px' }); else center(ep, 540, 610); rise(ep, T4 + 0.25, -20);
    const t1 = words(sc, 'ليه بنسى حاجة…', { y: L(430, 760), size: L(112, 96), at: [2, 3, 4].map(k => T(4, k)) });
    const t2 = words(sc, 'كنت *بفكر* فيها | من *ثانيتين؟*', { y: L(580, 920), size: L(104, 100), at: [5, 6, 7, 8, 9].map(k => T(4, k)) });
    if (H) [t1, t2].forEach(x => Object.assign(x.style, { left: 'auto', right: '160px', textAlign: 'right', padding: 0 }));
    fx('impact', T(4, 9) + 0.4, 0.9); flash(T(4, 9) + 0.4, 0.15);
    tl.to([t1, t2, sp, ep], { opacity: 0, y: -40, duration: 0.35 }, P(5).t0 - 0.6); fx('whoosh_big', P(5).t0 - 0.6, 0.8);
  }
  // ════════ ٥–٦ · اللي بيتقال لك (فاتح) ════════
  { const sc = scene(P(5).t0 - 0.35, P(7).t0 - 0.35, 'light');
    chapter('اللي بيتقال لك', P(5).t0 - 0.2, P(7).t0 - 0.4, 'ink', 'var(--sky-400)');
    capWords(sc, 5, 0, 1, { y: L(170, 220), size: L(54, 58), color: 'var(--ink-2)', shadow: false, end: P(6).t0 - 0.1 });
    const PA = L([[1400, 330, -3], [880, 360, 2], [1160, 480, -2]], [[540, 420, -3], [540, 560, 2], [540, 700, -2]]);
    const cs = [['«إنت مش مركّز»', 2], ['«إنت مش مهتم»', 5], ['«دماغك فين؟»', 8]].map(([q, k], j) => cchip(sc, q, 'ghost', PA[j][0], PA[j][1], T(5, k) - 0.08, L(52, 50), PA[j][2], 'slap'));
    // ٦: «ذاكرتي بايظة»… بس ذاكرتك غالبًا كويسة
    tl.to(cs, { opacity: 0.3, scale: 0.9, duration: 0.4 }, P(6).t0);
    const me = cchip(sc, '<i class="fa-solid fa-user"></i>«ذاكرتي بايظة»', 'white', CX, L(630, 900), T(6, 4) - 0.1, L(58, 56), -2, 'slap');
    strike(me, T(6, 7) - 0.05);
    const ok = cchip(sc, '<i class="fa-solid fa-check"></i>ذاكرتك غالبًا كويسة', 'white', CX, L(750, 1040), T(6, 9) - 0.15, L(50, 48), 2); ok.style.color = 'var(--green)';
    words(sc, 'المشكلة في ~حتة~ ~تانية~ خالص', { y: L(870, 1300), size: L(80, 64), color: 'var(--ink)', at: [10, 11, 12, 13, 14].map(k => T(6, k)) });
  }
  // ════════ ٧–١٣ · اللي بيحصل جوّه ════════
  chapter('اللي بيحصل جوّه', P(7).t0 - 0.2, P(13).t1 + 0.2);
  const ST = L({ x: 1450, y: 560, w: 560, h: 440 }, { x: 540, y: 720, w: 820, h: 600 });
  const TB = L({ x: 680, y: 760, w: 660 }, { x: 540, y: 1500, w: 800 });
  // ٧–١١: المخزن والترابيزة
  { const sc = scene(P(7).t0 - 0.35, P(12).t0 - 0.4, 'blue');
    capWords(sc, 7, 0, 7, { y: L(150, 180), size: L(60, 62), hl: [7], end: T(7, 8) - 0.1 });
    const st = store(sc, ST.x, ST.y, ST.w, ST.h); rise(st, T(7, 8) - 0.15, 50, 0.5, 'whoosh', 0.7);
    tl.fromTo(st.querySelectorAll('.cell'), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05, ease: 'back.out(2)' }, T(7, 10));
    const sl = label(sc, '<i class="fa-solid fa-warehouse" style="color:var(--blue-700)"></i>مخزن كبير', ST.x, ST.y + ST.h / 2 + L(50, 60), T(7, 8), 'ink', L(36, 38));
    capWords(sc, 7, 8, 14, { y: L(150, 180), size: L(56, 58), color: 'var(--sky-100)', end: T(7, 15) - 0.1 });
    const tb = table(sc, TB.x, TB.y, TB.w); rise(tb, T(7, 15) - 0.15, 50, 0.5, 'whoosh', 0.7);
    const tlb = label(sc, '<i class="fa-solid fa-table-cells-large" style="color:var(--blue-700)"></i>ترابيزة صغيرة', TB.x, TB.y + L(150, 150), T(7, 16), 'ink', L(36, 38));
    capWords(sc, 7, 15, 22, { y: L(150, 180), size: L(56, 58), hl: [15, 16], end: P(8).t0 - 0.1 });
    // ٨: الذاكرة العاملة — شايلة «رايح أجيب كوباية»
    out(tlb, T(8, 3) - 0.2, 0.15);
    const wm = cchip(sc, '«الذاكرة العاملة»', 'sticky', TB.x, TB.y + L(150, 150), T(8, 3) - 0.1, L(44, 46), -2, 'slap');
    capWords(sc, 8, 0, 4, { y: L(150, 180), size: L(60, 62), hl: [3, 4], end: T(8, 5) - 0.1 });
    capWords(sc, 8, 5, 15, { y: L(150, 180), size: L(56, 58), color: 'var(--sky-100)', hl: [12], end: P(9).t0 - 0.1 });
    const cup = drop(tile(sc, 'fa-glass-water', 'كوباية', tb.pos(0).x, tb.pos(0).y), T(8, 12) - 0.2);
    // ٩: صغيرة عند كل الناس — وفي ADHD أصغر… وأي هزة بتوقّع
    tl.to([st, sl], { opacity: 0.3, duration: 0.4 }, P(9).t0);
    capWords(sc, 9, 0, 11, { y: L(150, 180), size: L(56, 58), hl: [7, 8], end: T(9, 12) - 0.1 });
    const slots = [1, 2].map(j => { const s = tb.pos(j), d = el('div', null, null, sc, { position: 'absolute', width: px(TW), height: px(TH), borderRadius: '24px', border: '4px dashed rgba(255,255,255,.4)', opacity: 0 }); center(d, s.x, s.y); return pop(d, T(9, 6) + j * 0.12, 0, j === 1 ? 'pop' : null, 0.5); });
    capWords(sc, 9, 12, 21, { y: L(150, 180), size: L(56, 58), hl: [21], end: T(9, 22) - 0.1 });
    tl.to(tb, { scaleX: 0.92, duration: 0.4, ease: 'power2.inOut' }, T(9, 20)); fx('reverse', T(9, 20) - 0.2, 0.4);
    capWords(sc, 9, 22, 26, { y: L(150, 180), size: L(60, 62), hl: [23, 24], end: P(10).t0 - 0.1 });
    tl.to([tb, cup], { x: 16, duration: 0.05, yoyo: true, repeat: 9, ease: 'none' }, T(9, 23)); fx('lowhit', T(9, 23), 0.6);
    // ١٠: الموبايل نوّر… الغسيل… حد نادى — و«الكوباية» وقعت
    tl.to(slots, { opacity: 0, duration: 0.2 }, T(10, 6) - 0.2);
    capWords(sc, 10, 0, 3, { y: L(150, 180), size: L(60, 62), hl: [3], end: T(10, 4) - 0.1 });
    tl.to(cup, { scale: 1.1, boxShadow: '0 0 40px rgba(245,230,163,.9)', duration: 0.3, yoyo: true, repeat: 1 }, T(10, 3) - 0.1);
    const ph = drop(tile(sc, 'fa-mobile-screen', 'الموبايل نوّر', tb.pos(1).x, tb.pos(1).y), T(10, 6) - 0.1); fx('msg', T(10, 7) - 0.1, 0.7);
    const ln = drop(tile(sc, 'fa-shirt', 'الغسيل', tb.pos(2).x, tb.pos(2).y), T(10, 10) - 0.1);
    const ca = tile(sc, 'fa-bullhorn', 'حد بينادي', tb.pos(0).x, tb.pos(0).y - L(260, 270)); tl.fromTo(ca, { opacity: 0, y: -120 }, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.8)' }, T(10, 14) - 0.1); fx('pop', T(10, 14), 0.6);
    tl.to(ca, { y: -14, duration: 0.18, yoyo: true, repeat: 5, ease: 'sine.inOut' }, T(10, 15));
    const plus = cchip(sc, '+٣ حاجات', 'white', L(TB.x - TB.w / 2 - 40, 200), L(TB.y - 300, 1080), T(10, 17) - 0.1, L(44, 44), -3); plus.style.color = 'var(--red)';
    capWords(sc, 10, 17, 23, { y: L(150, 180), size: L(60, 62), hl: [22, 23] });
    tl.to(ca, { y: L(260, 270), duration: 0.35, ease: 'power3.in' }, T(10, 22) - 0.1);
    fall(cup, T(10, 22) + 0.2, 1);
    // ١١: ما اتمسحتش من المخزن… والمكان بيرجّعهالك
    tl.to([st, sl], { opacity: 1, duration: 0.4 }, P(11).t0 - 0.2); out(plus, P(11).t0 - 0.2, 0.2);
    const cell = st.querySelector('.c8');
    tl.to(cell, { background: '#F5E6A3', color: 'var(--ink)', scale: 1.15, duration: 0.35, ease: 'back.out(2)' }, T(11, 2) - 0.1); fx('pop', T(11, 2), 0.7);
    capWords(sc, 11, 0, 4, { y: L(150, 180), size: L(60, 62), hl: [1, 2], end: T(11, 5) - 0.1 });
    capWords(sc, 11, 5, 10, { y: L(150, 180), size: L(60, 62), hl: [7], end: T(11, 11) - 0.1 });
    capWords(sc, 11, 11, 19, { y: L(150, 180), size: L(56, 58), hl: [17, 18, 19] });
    tl.to([ph, ln, ca], { opacity: 0.2, duration: 0.4 }, T(11, 15));
    const back = tile(sc, 'fa-glass-water', 'كوباية', tb.pos(1).x, tb.pos(1).y - L(0, 0)); back.style.boxShadow = '0 0 40px rgba(245,230,163,.9)';
    tl.fromTo(back, { opacity: 0, x: ST.x - tb.pos(1).x, y: ST.y - tb.pos(1).y, scale: 0.4 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.7, ease: 'power3.inOut' }, T(11, 17) - 0.1); fx('whoosh', T(11, 17) - 0.1, 0.7); fx('pop', T(11, 17) + 0.55, 0.6);
  }
  // ١٢: مش مش مهتم، ولا ذاكرتك بايظة — حاجات كتير على ترابيزة صغيرة (واقع)
  { const sc = scene(P(12).t0 - 0.4, P(13).t0 - 0.3, 'real');
    foot(sc, 'H04', P(12).t0 - 0.4, P(13).t0 - 0.3, { from: 1, speed: 0.9, focus: L([0.4, 0.4], [0.28, 0.4]), zoom: [1.06, 1.0], fadeIn: 0.4, shade: true }); fx('whoosh', P(12).t0 - 0.45, 0.6);
    const a = chip(sc, '«مش مهتم»', 'glass', L(1460, 540), L(300, 300), L(52, 50)); a.style.background = 'rgba(6,16,36,.55)'; pop(a, T(12, 3) - 0.1, -2, 'pop', 0.6); strike(a, T(12, 5) - 0.1);
    const b = chip(sc, '«ذاكرتك بايظة»', 'glass', L(1460, 540), L(420, 420), L(52, 50)); b.style.background = 'rgba(6,16,36,.55)'; pop(b, T(12, 7) - 0.1, 2, 'pop', 0.6); strike(b, T(12, 9) - 0.1);
    capWords(sc, 12, 0, 8, { ...CAP, end: T(12, 9) - 0.1 });
    tl.to([a, b], { opacity: 0, duration: 0.3 }, T(12, 9) + 0.3);
    capWords(sc, 12, 9, 16, { ...CAP, hl: [11, 12, 13, 15, 16] });
  }
  // ١٣: مش محتاج ترابيزة أكبر… محتاج تبطّل تشيل كل حاجة جوّه دماغك
  { const sc = scene(P(13).t0 - 0.3, P(14).t0 - 1.1, 'blue');
    words(sc, 'والخبر الحلو؟', { y: L(170, 300), size: L(70, 72), color: 'var(--sky-100)', at: [0, 1].map(k => T(13, k)) });
    const w = words(sc, 'مش محتاج ترابيزة ~أكبر~…', { y: L(320, 480), size: L(84, 66), at: [3, 4, 5, 6].map(k => T(13, k)) });
    strike(w.querySelectorAll('.w')[3], T(13, 7) - 0.1, 10);
    words(sc, 'محتاج *تبطّل* *تشيل* كل حاجة | جوّه دماغك', { y: L(520, 680), size: L(84, 66), at: [7, 8, 9, 10, 11, 12, 13].map(k => T(13, k)) });
    const br = icon(sc, 'fa-brain', L(1160, 780), L(860, 1240), L(130, 150), '#fff', T(13, 9) - 0.1);
    const ar = icon(sc, 'fa-arrow-left', CX, L(860, 1240), L(80, 90), 'var(--sticky)', T(13, 12), 'swish');
    const pa = icon(sc, 'fa-file-lines', L(760, 300), L(860, 1240), L(130, 150), 'var(--sticky)', T(13, 13), 'pop');
  }

  // ════════ ١٤–١٩ · تعمل إيه؟ ════════
  { const t = P(14).t0 - 1.1, sc = scene(t, P(14).t0 - 0.05, 'light');
    words(sc, 'طب ~تعمل~ إيه؟', { y: L(400, 820), size: L(140, 130), color: 'var(--ink)', t: t + 0.05 }); fx('whoosh_big', t, 0.8); fx('slap', t + 0.3, 0.6);
  }
  chapter('تعمل إيه؟', P(14).t0 - 0.2, P(19).t1 + 0.3, 'ink', 'var(--sticky)');
  const SB = L({ x: 860, y: 200, w: 940 }, { x: 60, y: 230, w: 960 });
  const CB = L(SQ(470, 560, 600), SQ(540, 820, 600));
  const RX = L(1330, 540);
  // ١٤–١٥: طلّعها برّه على طول
  { const sc = scene(P(14).t0 - 0.1, P(16).t0 - 0.3);
    step(sc, 1, 'طلّعها <span class="hl">برّه</span> على طول', P(14).t0 - 0.05, SB, L(66, 64));
    card(sc, 'H06', T(14, 6) - 0.2, P(16).t0 - 0.3, CB, { focus: [0.5, 0.5], zoom: [1.35, 1.4], from: 0.5 });
    const PO = L([[1640, 470], [1330, 470], [1020, 470]], [[840, 1250], [540, 1250], [240, 1250]]);
    const ws = [['fa-note-sticky', 'ورقة', 13], ['fa-book', 'نوتة', 14], ['fa-paper-plane', 'رسالة لنفسك', 15]].map(([ic, tx, k], j) => cchip(sc, '<i class="fa-solid ' + ic + '"></i>' + tx, 'white', PO[j][0], PO[j][1], T(14, k) - 0.08, L(42, 34), j % 2 ? 2 : -2));
    fx('pen', T(14, 9) - 0.1, 0.8);
    const later = cchip(sc, '«هكتبها بعدين»', 'ghost', RX, L(640, 1400), T(14, 18) - 0.1, L(48, 48), -2);
    strike(later, T(14, 19) + 0.25);
    // ١٥: «بعدين» محتاجة نفس الترابيزة… لكن الورقة مش بتنسى
    tl.to([...ws, later], { opacity: 0, y: -20, duration: 0.3 }, P(15).t0 - 0.2);
    capWords(sc, 15, 0, 8, { y: L(470, 1220), size: L(48, 50), color: 'var(--ink)', shadow: false, x: L(880, null), width: L(900, null), hl: [5], hlCls: 'hl', end: T(15, 9) - 0.1 });
    const pp = sticky(sc, '<i class="fa-solid fa-check" style="color:var(--green)"></i> الورقة<br>مش بتنسى', RX, L(720, 1500), L(440, 500), L(56, 58), T(15, 10) - 0.1, -3); fx('paper', T(15, 10) - 0.1, 0.8);
  }
  // ١٦–١٧: فضّي الترابيزة — حاجة واحدة — وقولها بصوت عالي
  { const sc = scene(P(16).t0 - 0.3, P(18).t0 - 0.3);
    step(sc, 2, 'فضّي <span class="hl">الترابيزة</span>', P(16).t0 - 0.2, SB, L(66, 64));
    card(sc, 'H07', T(16, 2) - 0.2, P(18).t0 - 0.3, CB, { focus: [0.5, 0.45], zoom: [1.15, 1.2], from: 1 });
    capWords(sc, 16, 4, 7, { y: L(420, 1200), size: L(46, 48), color: 'var(--ink-2)', shadow: false, x: L(880, null), width: L(900, null), end: T(16, 8) - 0.1 });
    const a = cchip(sc, '<i class="fa-regular fa-window-maximize"></i>تاب واحد', 'white', L(1520, 700), L(520, 1240), T(16, 12) - 0.08, L(44, 42), -2);
    const b = cchip(sc, '<i class="fa-solid fa-list-check"></i>مهمة واحدة', 'white', L(1140, 380), L(520, 1240), T(16, 14) - 0.08, L(44, 42), 2);
    const say = el('div', null, '<i class="fa-solid fa-volume-high" style="margin-left:16px;color:var(--blue-700)"></i>«رايح أجيب كوباية»', sc, { position: 'absolute', padding: '24px 36px', borderRadius: '34px 34px 34px 8px', background: '#DCF3FF', color: 'var(--ink)', fontWeight: 900, fontSize: px(L(46, 48)), boxShadow: 'var(--shadow-card)', opacity: 0, whiteSpace: 'nowrap' });
    center(say, RX, L(700, 1420)); rise(say, T(16, 18) - 0.1, 30, 0.4, 'pop', 0.7);
    // ١٧: أيوه بصوت عالي… سمعتها مرتين
    tl.to([a, b], { opacity: 0.35, duration: 0.3 }, P(17).t0 - 0.1);
    capWords(sc, 17, 0, 4, { y: L(870, 1580), size: L(50, 52), color: 'var(--ink)', shadow: false, x: L(880, null), width: L(900, null), end: T(17, 5) - 0.1 });
    const two = cchip(sc, '<i class="fa-solid fa-ear-listen"></i><i class="fa-solid fa-ear-listen"></i>سمعتها مرتين', 'sticky', RX, L(880, 1600), T(17, 8) - 0.1, L(46, 46), -2, 'slap');
    const hold = cchip(sc, '<i class="fa-solid fa-thumbtack"></i>بتمسك أكتر', 'white', RX, L(990, 1730), T(17, 10) - 0.1, L(40, 40), 2); hold.style.color = 'var(--green)';
  }
  // ١٨–١٩: سيب علامة — سطر واحد + قدام الباب — بدل ما تفتكر… بتشوف
  { const sc = scene(P(18).t0 - 0.3, P(20).t0 - 0.5);
    step(sc, 3, 'سيب <span class="hl">علامة</span>', P(18).t0 - 0.2, SB, L(66, 64));
    card(sc, 'H08', T(18, 2) - 0.2, P(20).t0 - 0.5, CB, { focus: [0.45, 0.45], zoom: [1.05, 1.1], from: 1 });
    const nt = sticky(sc, '«كنت واقف فين؟<br>والخطوة الجاية: …»', RX, L(560, 1290), L(560, 640), L(44, 46), T(18, 9) - 0.1, -2); fx('pen', T(18, 9) - 0.1, 0.9);
    out(nt, T(18, 18) - 0.2, 0.3);
    const door = el('div', null, '<i class="fa-solid fa-door-closed" style="font-size:' + px(L(190, 200)) + ';color:var(--blue-700)"></i><i class="fa-solid fa-key" style="position:absolute;right:-50px;bottom:6px;font-size:' + px(L(70, 74)) + ';color:#D8A920"></i>', sc, { position: 'absolute', opacity: 0 });
    center(door, RX, L(640, 1340)); rise(door, T(18, 24) - 0.1, 40, 0.4, 'pop', 0.7);
    capWords(sc, 18, 18, 26, { y: L(860, 1560), size: L(46, 48), color: 'var(--ink)', shadow: false, x: L(880, null), width: L(900, null), hl: [24, 25, 26], hlCls: 'hl', end: P(19).t0 - 0.1 });
    // ١٩: بدل ما تحاول تفتكر… إنت بتشوف
    tl.to(door, { opacity: 0.35, duration: 0.3 }, P(19).t0 - 0.1);
    const w = words(sc, 'بدل ما ~تفتكر~… *بتشوف*', { y: L(840, 1540), size: L(64, 64), color: 'var(--ink)', at: [1, 2, 4, 6].map(k => T(19, k)), x: L(880, null), width: L(900, null) });
    strike(w.querySelectorAll('.w')[2], T(19, 5) - 0.1, 10);
    icon(sc, 'fa-eye', L(1700, 960), L(980, 1720), L(70, 76), 'var(--blue-700)', T(19, 6) + 0.1);
  }
  // ════════ ٢٠ · الواقع ════════
  { const sc = scene(P(20).t0 - 0.5, P(21).t0 - 0.3, 'real');
    foot(sc, 'H01', P(20).t0 - 0.5, P(21).t0 - 0.3, { from: 1.6, speed: 0.5, focus: L([0.55, 0.4], [0.58, 0.4]), zoom: [1.08, 1.0], fadeIn: 0.5, shade: true }); fx('whoosh', P(20).t0 - 0.55, 0.6);
    capWords(sc, 20, 0, 10, { ...CAP, hl: [7, 8, 9, 10], end: T(20, 11) - 0.1 });
    const q1 = chip(sc, '«أنا مش مركّز»', 'glass', CX, L(760, 1430), L(64, 66)); q1.style.background = 'rgba(6,16,36,.55)';
    pop(q1, T(20, 13) - 0.1, -2, 'pop', 0.6); strike(q1, T(20, 15) + 0.1); tl.to(q1, { opacity: 0, y: -40, duration: 0.3 }, T(20, 16) - 0.1);
    const ok = sticky(sc, '«الترابيزة اتملت»', L(1560, 540), L(300, 330), L(520, 600), L(56, 56), T(20, 17) - 0.1, -3); fx('paper', T(20, 17) - 0.1, 0.8);
    capWords(sc, 20, 16, 20, { ...CAP, hl: [17, 18, 19, 20] });
  }
  // ════════ ٢١–٢٣ ════════
  { const sc = scene(P(21).t0 - 0.3, P(22).t0 - 0.2, 'blue');
    words(sc, 'إنت مش ناسي…', { y: L(320, 680), size: L(110, 96), at: [0, 1, 2].map(k => T(21, k)) });
    words(sc, 'إنت بس شايل *كتير* | جوّه دماغك.', { y: L(500, 860), size: L(100, 84), at: [3, 4, 5, 6, 7, 8].map(k => T(21, k)) });
    const b = icon(sc, 'fa-brain', CX, L(860, 1300), L(120, 140), 'var(--sticky)', T(21, 8) + 0.1, 'impact'); b.style.filter = 'drop-shadow(0 0 30px rgba(245,230,163,.8))';
  }
  { const sc = scene(P(22).t0 - 0.2, P(23).t0 - 0.2);
    capWords(sc, 22, 0, 8, { y: L(170, 200), size: L(58, 62), color: 'var(--sky-100)', x: L(960, null), width: L(860, null), end: T(22, 9) - 0.1 });
    const ph = el('div', 'phone', '<div><img src="../ep04/assets/braindump.png"></div>', sc, { width: px(L(300, 340)), height: px(L(650, 736)) });
    center(ph, L(560, 540), L(560, 900)); tl.fromTo(ph, { opacity: 0, y: 160, rotation: 0 }, { opacity: 1, y: 0, rotation: -4, duration: 0.6, ease: 'power3.out' }, T(22, 9) - 0.3); fx('whoosh', T(22, 9) - 0.3, 0.6);
    // تكبير لورقة «تفريغ الأفكار» من الشاشة نفسها
    const zm = el('div', null, '<img src="../ep04/assets/braindump_sheet.png" style="width:100%;display:block">', sc, { position: 'absolute', width: px(L(660, 900)), borderRadius: '34px', overflow: 'hidden', background: '#fff', boxShadow: '0 40px 90px rgba(2,20,60,.45)', opacity: 0 });
    center(zm, L(1320, 540), L(600, 1400)); pop(zm, T(22, 10) - 0.15, 0, 'pop', 0.7); fx('paper', T(22, 10), 0.6);
    const lg = el('div', null, '<img src="../../../etizan-explainer-video/pipeline/assets/logo-full.png" style="height:' + px(L(90, 100)) + ';display:block">', sc, { position: 'absolute', padding: '18px 44px', background: '#fff', borderRadius: '50px', boxShadow: 'var(--shadow-card)', opacity: 0 });
    center(lg, L(1320, 540), L(220, 330)); pop(lg, T(22, 13) - 0.2, 0, 'pop', 0.7);
    cchip(sc, '<i class="fa-solid fa-lock"></i>محدش بيشوفه غيرك', 'sticky', L(1320, 540), L(930, 1790), T(22, 14) - 0.1, L(42, 44), 2);
  }
  { const sc = scene(P(23).t0 - 0.2, null);
    const sp = el('div', 'pill glass', '<span class="dot"></span>ليه دماغي بتعمل كده؟', sc, { fontSize: px(L(32, 36)), opacity: 0 }); center(sp, L(1420, 540), L(200, 360)); rise(sp, P(23).t0, -20);
    const nx = el('div', 'pill ink', 'الحلقة الجاية', sc, { fontSize: px(L(30, 34)), opacity: 0 }); center(nx, L(1420, 540), L(290, 460)); rise(nx, T(23, 1) - 0.1, -20);
    const q = words(sc, 'ليه ترتيب يومي… | بياخد مني *طاقة* أكتر | من *الشغل* نفسه؟', { y: L(330, 580), size: L(76, 80), at: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(k => T(23, k)) });
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
