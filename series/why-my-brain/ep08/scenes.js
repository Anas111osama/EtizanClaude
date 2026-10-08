// الحلقة ٨ — «ليه ببدأ بحماس… وأسيب الحاجة لما توصل للنص؟»
// كل حركة مربوطة بكلمتها: T(فقرة، رقم الكلمة) — الفقرات ١..٢٣ زي script.txt. L(عريض، طولي) لكل مكان.
// التشبيه الثابت: أي حاجة طريق — أوله منوّر (الجديد) وآخره منوّر (خط النهاية)، والنص بيضلم لأن مفيش حاجة تولّع الشرارة.
window.EPISODE = { n: 8, gaps: { 4: 3.0, 6: 0.5, 8: 0.3, 9: 0.4, 10: 0.4, 11: 0.3, 13: 1.1, 15: 0.3, 17: 0.3, 19: 0.6, 20: 0.3, 23: 7.5 }, build(A) {
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
  // ── الطريق: أوله منوّر (الجديد) وآخره منوّر (خط النهاية)… والنص بيضلم. u=0 البداية (يمين) · u=1 النهاية (شمال) ──
  function road(sc, B) {
    const s = document.createElementNS(NS, 'svg'); s.setAttribute('width', L(1920, 1080)); s.setAttribute('height', L(1080, 1920)); s.style.cssText = 'position:absolute;left:0;top:0;overflow:visible'; sc.appendChild(s);
    const id = 'rd' + Math.round(Math.random() * 1e6), X = u => B.x + B.w * (1 - u), cy = B.y + B.h / 2, RH = L(92, 84);
    s.innerHTML = '<defs><radialGradient id="' + id + 'g"><stop offset="0" stop-color="#FFF1BF" stop-opacity=".95"/><stop offset=".4" stop-color="#F5C542" stop-opacity=".4"/><stop offset="1" stop-color="#F5C542" stop-opacity="0"/></radialGradient>'
      + '<radialGradient id="' + id + 'd"><stop offset="0" stop-color="#020b1f" stop-opacity=".92"/><stop offset=".55" stop-color="#020b1f" stop-opacity=".75"/><stop offset="1" stop-color="#020b1f" stop-opacity="0"/></radialGradient></defs>';
    const mk = (tag, at) => { const e = document.createElementNS(NS, tag); for (const k in at) e.setAttribute(k, at[k]); s.appendChild(e); return e; };
    const R = B.h * 0.85;
    const gs = mk('circle', { cx: X(0.04), cy, r: R, fill: 'url(#' + id + 'g)' }), ge = mk('circle', { cx: X(0.96), cy, r: R, fill: 'url(#' + id + 'g)' });
    const band = mk('rect', { x: B.x, y: cy - RH / 2, width: B.w, height: RH, rx: RH / 2, fill: 'rgba(255,255,255,.16)' });
    const dash = mk('line', { x1: X(0) - RH / 2, y1: cy, x2: X(1) + RH / 2, y2: cy, stroke: 'rgba(255,255,255,.6)', 'stroke-width': 6, 'stroke-dasharray': '26 24', 'stroke-linecap': 'round' });
    const dark = mk('ellipse', { cx: X(0.5), cy, rx: B.w * 0.36, ry: B.h * 0.62, fill: 'url(#' + id + 'd)' });
    gsap.set([gs, ge, band, dash, dark], { opacity: 0 });
    return { s, X, cy, RH, gs, ge, band, dash, dark };
  }
  // شريط خانات (دروس الكورس / صفحات الكشكول) — n خانة، بتتملا واحدة واحدة
  const cells = (parent, n, w, h, gap, empty) => { const r = el('div', null, null, parent, { display: 'flex', gap: px(gap), direction: 'rtl' });
    return [...Array(n)].map(() => el('div', null, null, r, { width: px(w), height: px(h), borderRadius: px(Math.min(8, h / 3)), background: empty, boxShadow: 'inset 0 0 0 2px rgba(10,30,70,.12)' })); };
  const fill = (cs, bg, t, dt = 0.07) => cs.forEach((c, i) => tl.to(c, { background: bg, duration: 0.12 }, t + i * dt));
  // طريق صغير فاتح (للحلول): خط وعليه أيقونات بتظهر
  const lane = (sc, x, y, w) => { const r = el('div', null, null, sc, { position: 'absolute', width: px(w), height: px(18), borderRadius: '9px', background: '#D9E3F0', opacity: 0 }); center(r, x, y); return r; };

  // ════════ ١–٤ · الواقع ════════
  const T4 = T(4, 2) - 0.2;
  { const sc = scene(0, T4 + 0.6, 'real');
    // ١: كورس… وقفت عند الدرس السابع من عشرين — وكشكول، عشر صفحات والباقي فاضي
    foot(sc, 'Q01', 0, P(2).t0 - 0.1, { from: 0, speed: 0.95, focus: L([0.4, 0.4], [0.32, 0.4]), zoom: [1.0, 1.06], fadeIn: 0.6, fadeOut: 0.1, shade: true }); fx('typing', 0.3, 0.35);
    const KW = L(640, 720), cx = L(1420, 540), cy0 = L(250, 330);
    const kc = el('div', null, '<div style="display:flex;align-items:center;gap:14px;font-weight:900;font-size:' + px(L(34, 36)) + ';color:var(--ink);margin-bottom:18px"><i class="fa-solid fa-laptop" style="color:var(--blue-700)"></i>الكورس<span class="n" style="margin-right:auto;font-size:' + px(L(28, 30)) + ';color:var(--ink-2)"></span></div>', sc,
      { position: 'absolute', width: px(KW), padding: '26px 30px', borderRadius: '30px', background: 'rgba(255,255,255,.94)', boxShadow: 'var(--shadow-card)', opacity: 0 });
    center(kc, cx, cy0); rise(kc, T(1, 0) - 0.1, 30, 0.4, 'pop', 0.6);
    const ls = cells(kc, 20, (KW - 60 - 19 * 6) / 20, L(30, 34), 6, '#EEF2F8');
    fill(ls.slice(0, 7), 'var(--blue-700)', T(1, 1), 0.12);
    const kn = kc.querySelector('.n'); dyn(t => { kn.textContent = t < T(1, 6) - 0.1 ? '' : 'الدرس ٧ من ٢٠'; });
    tl.to(ls.slice(7), { background: '#E6EBF3', duration: 0.2 }, T(1, 6));
    tl.fromTo(ls[6], { scale: 1 }, { scale: 1.35, duration: 0.2, yoyo: true, repeat: 1 }, T(1, 7)); fx('beep', T(1, 7), 0.4);
    capWords(sc, 1, 0, 9, { ...CAP, hl: [3, 7], end: T(1, 10) - 0.1 });
    tl.to(kc, { opacity: 0, y: -20, duration: 0.3 }, T(1, 10) - 0.25);
    const nb = el('div', null, '<div style="display:flex;align-items:center;gap:14px;font-weight:900;font-size:' + px(L(34, 36)) + ';color:var(--ink);margin-bottom:18px"><i class="fa-solid fa-book" style="color:#E07A2E"></i>الكشكول</div>', sc,
      { position: 'absolute', width: px(KW), padding: '26px 30px', borderRadius: '30px', background: 'rgba(255,255,255,.94)', boxShadow: 'var(--shadow-card)', opacity: 0 });
    center(nb, cx, cy0); rise(nb, T(1, 10) - 0.1, 30, 0.4, 'page', 0.7);
    const pg = cells(nb, 20, (KW - 60 - 19 * 6) / 20, L(52, 58), 6, '#fff');
    fill(pg.slice(0, 10), 'repeating-linear-gradient(180deg,#fff 0 7px,#8FA8CF 7px 9px)', T(1, 13) - 0.2, 0.06); fx('pen', T(1, 13), 0.6);
    tl.to(pg.slice(10), { boxShadow: 'inset 0 0 0 3px rgba(242,84,91,.55)', duration: 0.25 }, T(1, 17) - 0.1);
    capWords(sc, 1, 10, 17, { ...CAP, hl: [15, 17], end: P(2).t0 - 0.1 });
    tl.to(nb, { opacity: 0, duration: 0.25 }, P(2).t0 - 0.25);
    // ٢: مشروع… أول أسبوع سهران عليه كل يوم — وبعدين بطّلت تفتحه
    foot(sc, 'Q02', P(2).t0 - 0.12, T(2, 12) - 0.1, { from: 1, focus: L([0.45, 0.4], [0.42, 0.4]), zoom: [1.05, 1.12], fadeIn: 0.1, fadeOut: 0.1, shade: true }); fx('whoosh', P(2).t0 - 0.15, 0.5);
    const w1 = cchip(sc, '<i class="fa-solid fa-fire"></i>أول أسبوع', 'sticky', L(1450, 540), L(250, 300), T(2, 5) - 0.08, L(46, 44), -2, 'slap');
    const dd = el('div', null, null, sc, { position: 'absolute', display: 'flex', gap: px(L(16, 14)), direction: 'rtl', opacity: 0 }); center(dd, L(1450, 540), L(370, 410));
    const dots = [...Array(7)].map(() => el('div', null, '<i class="fa-solid fa-fire"></i>', dd, { width: px(L(58, 60)), height: px(L(58, 60)), borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: px(L(26, 28)), background: 'rgba(255,255,255,.25)', color: 'rgba(255,255,255,.5)' }));
    tl.to(dd, { opacity: 1, duration: 0.2 }, T(2, 8) - 0.1);
    dots.forEach((d, i) => tl.to(d, { background: '#F5C542', color: '#B4501A', duration: 0.12 }, T(2, 8) + i * 0.13)); fx('counter', T(2, 8), 0.4);
    capWords(sc, 2, 0, 11, { ...CAP, hl: [3, 8], end: T(2, 12) - 0.1 });
    foot(sc, 'Q03', T(2, 12) - 0.12, P(3).t0 - 0.1, { from: 11.4, focus: L([0.42, 0.45], [0.42, 0.45]), zoom: [1.06, 1.1], fadeIn: 0.1, fadeOut: 0.1, shade: true }); fx('swish', T(2, 12) - 0.15, 0.5);
    tl.to(dots, { background: 'rgba(255,255,255,.18)', color: 'rgba(255,255,255,.35)', duration: 0.5, stagger: -0.06 }, T(2, 13));
    tl.to(w1, { opacity: 0.4, duration: 0.3 }, T(2, 13));
    const lo = cchip(sc, '<i class="fa-solid fa-folder"></i>آخر مرة اتفتح: من ٣ أسابيع', 'white', L(1450, 540), L(480, 520), T(2, 18) - 0.08, L(36, 36), 2); lo.style.color = 'var(--ink-2)';
    capWords(sc, 2, 12, 19, { ...CAP, hl: [18, 19], end: P(3).t0 - 0.1 });
    tl.to([w1, dd, lo], { opacity: 0, duration: 0.25 }, P(3).t0 - 0.2);
    // ٣: مش زهقان… الفكرة لسه عاجباك — بس كل ما تيجي تكمّل، أي حاجة تانية (وبيتجمّد عند «طب ليه؟»)
    foot(sc, 'Q04', P(3).t0 - 0.15, T(3, 7) - 0.1, { from: 3, focus: L([0.5, 0.35], [0.5, 0.35]), zoom: [1.05, 1.1], fadeIn: 0.3, fadeOut: 0.1, shade: true }); fx('whoosh', P(3).t0 - 0.2, 0.5); fx('ticktock', P(3).t0, 0.3);
    const lk = cchip(sc, '<i class="fa-solid fa-heart" style="color:var(--red)"></i>الفكرة لسه عاجباك', 'white', L(1460, 540), L(260, 300), T(3, 4) - 0.08, L(42, 42), -2); out(lk, T(3, 7) - 0.2, 0.2);
    capWords(sc, 3, 0, 6, { ...CAP, hl: [2, 6], end: T(3, 7) - 0.1 });
    const fz = T(4, 0);
    const r = foot(sc, 'Q05', T(3, 7) - 0.12, T4 + 0.25, { from: 6, freeze: fz, focus: L([0.45, 0.4], [0.5, 0.4]), zoom: [1.0, 1.05], fadeIn: 0.1, shade: true }); fx('swish', T(3, 7) - 0.15, 0.5);
    capWords(sc, 3, 7, 17, { ...CAP, hl: [14, 15, 16, 17], end: fz - 0.1 });
    flash(fz, 0.35); fx('lowhit', fz, 0.8); fx('reverse', fz - 0.7, 0.5);
    tl.to(r.querySelector('.src > img'), { filter: 'grayscale(1) brightness(.8)', duration: 0.4 }, fz);
    tl.to(r.tint, { opacity: 0.82, duration: 0.7 }, fz + 0.15);
    trace(r, ['M1010 770 C1010 640, 1350 630, 1350 770 C1350 910, 1010 915, 1010 770 Z', 'M890 520 L1080 670', 'M1180 600 L1200 540 M1270 625 L1310 575 M1110 610 L1090 555'], fz + 0.25, 0.8);
    fx('swish', fz + 0.3, 0.5);
    capWords(sc, 4, 0, 1, { ...CAP, y: L(470, 1420), size: L(110, 110), hl: [1], end: T4 + 0.05 });
  }
  // ════════ كارت العنوان ════════
  { const sc = scene(T4, P(5).t0 - 0.35, 'blue');
    const q = el('div', 'qmark', '؟', sc, { fontSize: px(L(1000, 760)), opacity: 0 }); Object.assign(q.style, H ? { left: '80px', top: '30px' } : { left: '160px', top: '1060px' });
    tl.fromTo(q, { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, T4 + 0.1);
    const sp = el('div', 'pill glass', '<span class="dot"></span>ليه دماغي بتعمل كده؟', sc, { fontSize: px(L(34, 38)), opacity: 0 });
    if (H) Object.assign(sp.style, { right: '160px', top: '230px' }); else center(sp, 540, 520); rise(sp, T4 + 0.05, -20);
    const ep = el('div', 'pill ink', 'الحلقة ٨', sc, { fontSize: px(L(28, 32)), padding: '6px 24px', opacity: 0 });
    if (H) Object.assign(ep.style, { right: '160px', top: '320px' }); else center(ep, 540, 610); rise(ep, T4 + 0.25, -20);
    const t1 = words(sc, 'ليه ببدأ بحماس…', { y: L(430, 760), size: L(112, 96), at: [2, 3, 4].map(k => T(4, k)) });
    const t2 = words(sc, L('وأسيب الحاجة لما توصل *للنص؟*', 'وأسيب الحاجة | لما توصل *للنص؟*'), { y: L(580, 920), size: L(104, 96), at: [5, 6, 7, 8, 9].map(k => T(4, k)) });
    if (H) [t1, t2].forEach(x => Object.assign(x.style, { left: 'auto', right: '160px', textAlign: 'right', padding: 0 }));
    fx('impact', T(4, 9) + 0.4, 0.9); flash(T(4, 9) + 0.4, 0.15);
    tl.to([t1, t2, sp, ep], { opacity: 0, y: -40, duration: 0.35 }, P(5).t0 - 0.6); fx('whoosh_big', P(5).t0 - 0.6, 0.8);
  }
  // ════════ ٥–٦ · اللي بيتقال لك (فاتح) ════════
  { const sc = scene(P(5).t0 - 0.35, P(7).t0 - 0.35, 'light');
    chapter('اللي بيتقال لك', P(5).t0 - 0.2, P(7).t0 - 0.4, 'ink', 'var(--sky-400)');
    capWords(sc, 5, 0, 1, { y: L(170, 220), size: L(54, 58), color: 'var(--ink-2)', shadow: false, end: P(6).t0 - 0.1 });
    const PA = L([[1400, 340, -3], [880, 390, 2], [1160, 530, -2]], [[540, 420, -3], [540, 570, 2], [540, 720, -2]]);
    const cs = [['«نَفَسك قصير»', 2], ['«بتبدأ ومش بتكمّل»', 4], ['«مفيش حاجة بتخلّصها للآخر»', 7]].map(([q, k], j) => cchip(sc, q, 'ghost', PA[j][0], PA[j][1], T(5, k) - 0.08, L(48, 44), PA[j][2], 'slap'));
    // ٦: ومع الوقت تصدّقه… بس اللي في النص مالوش علاقة بطول نَفَسك
    tl.to(cs, { opacity: 0.3, scale: 0.9, duration: 0.4 }, P(6).t0);
    capWords(sc, 6, 0, 6, { y: L(700, 900), size: L(50, 52), color: 'var(--ink-2)', shadow: false, end: T(6, 7) - 0.1 });
    const lung = cchip(sc, '<i class="fa-solid fa-lungs"></i>طول نَفَسك', 'ghost', L(1300, 540), L(760, 1000), T(6, 13) - 0.1, L(46, 44), -2); strike(lung, T(6, 15) + 0.1);
    const mid = cchip(sc, '<i class="fa-solid fa-road"></i>اللي بيحصل في النص', 'sticky', L(640, 540), L(760, 1170), T(6, 9) - 0.08, L(54, 52), 2, 'slap');
    capWords(sc, 6, 7, 15, { y: L(920, 1340), size: L(50, 52), color: 'var(--ink-2)', shadow: false, hl: [11, 14, 15], hlCls: 'hl' });
  }
  // ════════ ٧–١٣ · اللي بيحصل جوّه ════════
  chapter('اللي بيحصل جوّه', P(7).t0 - 0.2, P(13).t1 + 0.2);
  const TOP = { y: L(150, 200), size: L(58, 58) };
  // ٧–٨: الشرارة… وبتولّع من إيه
  { const sc = scene(P(7).t0 - 0.35, P(9).t0 - 0.4, 'blue');
    capWords(sc, 7, 0, 2, { ...TOP, end: T(7, 3) - 0.1 });
    const MB = L(SQ(960, 600, 440), SQ(540, 900, 520));
    card(sc, 'Q14', T(7, 4) - 0.45, P(9).t0 - 0.4, MB, { from: 2.4, speed: 0.9, focus: [0.5, 0.5], zoom: [1.15, 1.22], freeze: T(7, 4) + 8.5 }); fx('switch', T(7, 4) + 0.1, 0.5);
    const e1 = cchip(sc, '<i class="fa-solid fa-play"></i>الحلقة ١', 'white', L(960, 540), L(330, 590), T(7, 9) - 0.1, L(34, 36), -3);
    capWords(sc, 7, 3, 10, { ...TOP, hl: [4], end: T(7, 11) - 0.1 });
    capWords(sc, 7, 11, 16, { ...TOP, hl: [14, 16], end: P(8).t0 - 0.1 });
    // ٨: جديد · تحدّي · بتحبها · وقت بيزنقك — ودماغ ADHD محتاجها أكتر
    tl.to(e1, { opacity: 0, duration: 0.25 }, P(8).t0 - 0.1);
    capWords(sc, 8, 0, 5, { ...TOP, end: T(8, 6) - 0.1 });
    const SP = L([[1460, 470, -3], [1480, 720, 2], [460, 470, 3], [440, 720, -2]], [[290, 560, -3], [790, 560, 3], [290, 1250, 2], [790, 1250, -2]]);
    [['fa-wand-magic-sparkles', 'حاجة جديدة', 6], ['fa-mountain', 'تحدّي', 9], ['fa-heart', 'حاجة بتحبها', 11], ['fa-stopwatch', 'وقت بيزنقك', 14]].forEach(([ic, tx, k], j) => cchip(sc, '<i class="fa-solid ' + ic + '"></i>' + tx, 'white', SP[j][0], SP[j][1], T(8, k) - 0.08, L(40, 38), SP[j][2]));
    capWords(sc, 8, 6, 15, { ...TOP, hl: [7, 9, 12, 15], end: T(8, 16) - 0.1 });
    cchip(sc, '<i class="fa-solid fa-brain"></i>محتاجها أكتر', 'sticky', CX, L(930, 1430), T(8, 21) - 0.1, L(50, 52), -2, 'slap');
    capWords(sc, 8, 16, 24, { ...TOP, hl: [21, 22] });
  }
  // ٩–١٠: الطريق — أوله منوّر وآخره منوّر… والنص بيضلم
  { const sc = scene(P(9).t0 - 0.4, P(11).t0 - 0.4, 'blue');
    const RB = L({ x: 220, y: 430, w: 1480, h: 360 }, { x: 80, y: 760, w: 920, h: 420 });
    const rd = road(sc, RB);
    tl.to([rd.band, rd.dash], { opacity: 1, duration: 0.5 }, T(9, 4) - 0.2); tl.fromTo(rd.dash, { strokeDashoffset: 0 }, { strokeDashoffset: -300, duration: 6, ease: 'none' }, T(9, 4)); fx('whoosh', T(9, 4) - 0.2, 0.6);
    capWords(sc, 9, 0, 5, { ...TOP, hl: [5], end: T(9, 6) - 0.1 });
    const lbS = label(sc, 'البداية', rd.X(0.04), rd.cy + L(110, 110), T(9, 7) - 0.1, 'glass', L(30, 32));
    tl.to(rd.gs, { opacity: 1, duration: 0.6 }, T(9, 7)); fx('rise', T(9, 7), 0.4);
    const nw = cchip(sc, '<i class="fa-solid fa-wand-magic-sparkles"></i>جديد', 'white', rd.X(0.06), rd.cy - L(120, 120), T(9, 10) - 0.1, L(38, 38), -3);
    capWords(sc, 9, 6, 12, { ...TOP, hl: [10, 12], end: T(9, 13) - 0.1 });
    const lbE = label(sc, 'النهاية', rd.X(0.96), rd.cy + L(110, 110), T(9, 14) - 0.1, 'glass', L(30, 32));
    tl.to(rd.ge, { opacity: 1, duration: 0.6 }, T(9, 14)); fx('rise', T(9, 14), 0.4);
    const fl = icon(sc, 'fa-flag-checkered', rd.X(0.96), rd.cy - L(120, 120), L(70, 70), '#fff', T(9, 15) - 0.1, 'pop');
    capWords(sc, 9, 13, 20, { ...TOP, hl: [16, 20], end: P(10).t0 - 0.1 });
    // ١٠: بس في النص؟ — الجديد خلص، والنهاية بعيدة… ومفيش شرارة، فالطريق بيضلم
    const pin = cchip(sc, '<i class="fa-solid fa-location-dot" style="color:var(--red)"></i>إنت هنا', 'white', rd.X(0.5), rd.cy - L(125, 125), T(10, 2) - 0.1, L(40, 40), 0, 'pop'); fx('beep', T(10, 2), 0.35);
    capWords(sc, 10, 0, 9, { ...TOP, hl: [2], end: T(10, 10) - 0.1 });
    tl.to([rd.gs, nw], { opacity: 0.25, duration: 0.6 }, T(10, 4) - 0.1); fx('reverse', T(10, 4), 0.4);
    tl.to([rd.ge, fl], { opacity: 0.3, scale: 0.8, duration: 0.6 }, T(10, 7) - 0.1);
    const sk = icon(sc, 'fa-fire', rd.X(0.5), rd.cy + L(130, 140), L(80, 84), '#F5C542', T(10, 12) - 0.2, 'pop');
    tl.to(sk, { scale: 0.2, opacity: 0, color: '#7a8aa3', duration: 0.7, ease: 'power2.in' }, T(10, 13) + 0.1); fx('reverse', T(10, 13) + 0.1, 0.5);
    tl.to(rd.dark, { opacity: 1, duration: 0.9 }, T(10, 14) - 0.1); tl.to(pin, { opacity: 0.55, duration: 0.6 }, T(10, 14)); fx('lowhit', T(10, 14), 0.7);
    capWords(sc, 10, 10, 15, { ...TOP, hl: [13, 15] });
  }
  // ١١: التعب بيبان والنتيجة لسه… بتجري ومكانك (واقع)
  { const sc = scene(P(11).t0 - 0.4, P(12).t0 - 0.3, 'real');
    foot(sc, 'Q03', P(11).t0 - 0.4, T(11, 9) - 0.1, { from: 2.4, speed: 0.8, focus: L([0.42, 0.4], [0.42, 0.4]), zoom: [1.12, 1.18], fadeIn: 0.3, fadeOut: 0.1, shade: true }); fx('whoosh_big', P(11).t0 - 0.3, 0.6);
    foot(sc, 'Q06', T(11, 9) - 0.12, P(12).t0 - 0.3, { from: 0, speed: 0.5, focus: L([0.5, 0.6], [0.5, 0.6]), zoom: [1.05, 1.1], fadeIn: 0.1, shade: true }); fx('swish', T(11, 9) - 0.15, 0.5);
    const BW = L(640, 720);
    const pb = el('div', null, '<div style="display:flex;align-items:center;gap:14px;font-weight:900;font-size:' + px(L(32, 34)) + ';color:var(--ink);margin-bottom:16px"><i class="fa-solid fa-flag-checkered" style="color:var(--blue-700)"></i>النتيجة<span style="margin-right:auto;color:var(--ink-2);font-size:' + px(L(26, 28)) + '">لسه ما بانتش</span></div><div style="height:26px;border-radius:13px;background:#E3EAF4;overflow:hidden;direction:rtl"><div class="lv" style="height:100%;width:0%;border-radius:13px;background:var(--blue-700)"></div></div>', sc,
      { position: 'absolute', width: px(BW), padding: '24px 30px', borderRadius: '28px', background: 'rgba(255,255,255,.94)', boxShadow: 'var(--shadow-card)', opacity: 0 });
    center(pb, L(1420, 540), L(250, 330)); rise(pb, T(11, 5) - 0.1, 30, 0.35, 'pop', 0.5);
    const lv = pb.querySelector('.lv'); tl.to(lv, { width: '38%', duration: 0.6, ease: 'power2.out' }, T(11, 5));
    capWords(sc, 11, 0, 8, { ...CAP, hl: [3, 5, 8], end: T(11, 9) - 0.1 });
    tl.to(lv, { width: '40%', duration: 0.35, yoyo: true, repeat: 5, ease: 'sine.inOut' }, T(11, 11)); fx('tick', T(11, 13), 0.4);
    capWords(sc, 11, 9, 14, { ...CAP, hl: [11, 14] });
  }
  // ١٢–١٣: مش نَفَس قصير… النص مافيهوش نور — حط فيه نور بإيدك؛ مش تستنى الحماس… تولّعه
  { const sc = scene(P(12).t0 - 0.3, P(14).t0 - 1.1);
    const w = words(sc, 'المشكلة مش إن ~نَفَسك~ ~قصير~', { y: L(170, 300), size: L(76, 60), at: [0, 1, 2, 3, 4].map(k => T(12, k)) });
    const ws = w.querySelectorAll('.w'); strike(ws[3], T(12, 5) - 0.15, 8); strike(ws[4], T(12, 5) - 0.08, 8);
    const r1 = el('div', null, '<i class="fa-solid fa-road" style="color:var(--sky-100)"></i><span>النص</span><span style="opacity:.75">مافيهوش نور</span><i class="fa-solid fa-moon" style="color:#9FB3D9"></i>', sc,
      { position: 'absolute', display: 'flex', alignItems: 'center', gap: '22px', fontWeight: 1000, fontSize: px(L(64, 54)), color: '#fff', opacity: 0, whiteSpace: 'nowrap' });
    center(r1, CX, L(420, 560)); rise(r1, T(12, 7) - 0.1, 20, 0.4, 'whoosh', 0.6);
    words(sc, 'حط فيه نور *بإيدك*', { y: L(530, 700), size: L(72, 64), color: 'var(--sky-100)', at: [12, 13, 14, 15].map(k => T(12, k)) });
    const bu = icon(sc, 'fa-lightbulb', L(1500, 880), L(580, 760), L(80, 70), '#F5E6A3', T(12, 15) + 0.1, 'switch'); bu.style.filter = 'drop-shadow(0 0 26px rgba(245,230,163,.9))';
    // ١٣
    tl.to([w, r1], { opacity: 0.25, duration: 0.3 }, P(13).t0 - 0.15);
    words(sc, 'والخبر الحلو؟', { y: L(700, 900), size: L(56, 60), color: 'var(--sky-100)', at: [0, 1].map(k => T(13, k)) });
    const st = cchip(sc, '<i class="fa-solid fa-hourglass-half"></i>تستنى الحماس', 'ghost', L(1260, 540), L(860, 1060), T(13, 5) - 0.1, L(48, 46), -2); st.style.color = '#fff'; st.style.borderColor = 'rgba(255,255,255,.5)'; strike(st, T(13, 8));
    cchip(sc, '<i class="fa-solid fa-fire"></i>تقدر تولّعه', 'sticky', L(640, 540), L(860, 1200), T(13, 9) - 0.1, L(56, 56), 2, 'slap');
  }

  // ════════ ١٤–١٩ · تعمل إيه؟ ════════
  { const t = P(14).t0 - 1.1, sc = scene(t, P(14).t0 - 0.05, 'light');
    words(sc, 'طب ~تعمل~ إيه؟', { y: L(400, 820), size: L(140, 130), color: 'var(--ink)', t: t + 0.05 }); fx('whoosh_big', t, 0.8); fx('slap', t + 0.3, 0.6);
  }
  chapter('تعمل إيه؟', P(14).t0 - 0.2, P(19).t1 + 0.3, 'ink', 'var(--sticky)');
  const SB = L({ x: 860, y: 200, w: 940 }, { x: 60, y: 230, w: 960 });
  const CB = L(SQ(470, 560, 600), SQ(540, 820, 560));
  const RX = L(1330, 540), LW = L(760, 860);
  const flag = (sc, x, y, t, c = 'var(--blue-700)') => { const f = el('i', 'fa-solid fa-flag', null, sc, { position: 'absolute', fontSize: px(L(40, 42)), color: c, opacity: 0 }); center(f, x, y); return pop(f, t, 0, 'pop', 0.4); };
  // ١٤–١٥: نهايات صغيرة — لمبات على طول الطريق
  { const sc = scene(P(14).t0 - 0.1, P(16).t0 - 0.3);
    step(sc, 1, 'اعمل <span class="hl">نهايات صغيرة</span>', P(14).t0 - 0.05, SB, L(64, 62));
    card(sc, 'Q07', T(14, 2) - 0.2, P(15).t0 - 0.2, CB, { focus: [0.42, 0.4], zoom: [1.12, 1.18], from: 0.5, fadeOut: 0.15 });
    card(sc, 'Q08', P(15).t0 - 0.15, P(16).t0 - 0.3, CB, { focus: [0.62, 0.5], zoom: [1.2, 1.26], from: 4.2 }); fx('switch', P(15).t0 + 1.9, 0.6);
    const big = cchip(sc, '«هخلّص الكورس»', 'ghost', RX, L(500, 1200), T(14, 6) - 0.1, L(44, 44), -2); strike(big, T(14, 7) + 0.15);
    const sm = cchip(sc, '<i class="fa-solid fa-check"></i>«هخلّص الدرس ده النهارده»', 'sticky', RX, L(620, 1320), T(14, 9) - 0.1, L(44, 44), 2, 'slap');
    // كل نهاية صغيرة… شرارة صغيرة — وبعدين لمبات على طول الطريق
    const ly = L(820, 1560), ln = lane(sc, RX, ly, LW); tl.to(ln, { opacity: 1, duration: 0.3 }, T(14, 13) - 0.2);
    tl.to([big, sm], { opacity: 0.3, duration: 0.3 }, T(14, 13) - 0.1);
    const XS = [0.1, 0.36, 0.62, 0.88].map(u => RX + LW / 2 - u * LW);
    const fs = XS.map((x, j) => flag(sc, x, ly - L(44, 46), T(14, 14) - 0.1 + j * 0.18));
    const sp = XS.map((x, j) => { const f = el('i', 'fa-solid fa-fire', null, sc, { position: 'absolute', fontSize: px(L(30, 32)), color: '#F2A33A', opacity: 0 }); center(f, x, ly + L(44, 46)); return pop(f, T(14, 16) + j * 0.15, 0, j ? null : 'pop', 0.5); });
    capWords(sc, 14, 13, 18, { y: L(900, 1640), size: L(46, 48), color: 'var(--ink)', shadow: false, x: L(880, null), width: L(900, null), hl: [14, 17], hlCls: 'hl', end: P(15).t0 - 0.1 });
    // ١٥: لمبات على طول الطريق… بدل ما تستنى نور الآخر
    tl.to([...fs, ...sp], { opacity: 0, duration: 0.25 }, P(15).t0 - 0.1);
    XS.forEach((x, j) => { const b = el('i', 'fa-solid fa-lightbulb', null, sc, { position: 'absolute', fontSize: px(L(44, 46)), color: '#F5C542', opacity: 0, filter: 'drop-shadow(0 0 14px rgba(245,197,66,.9))' }); center(b, x, ly - L(48, 50)); pop(b, T(15, 3) - 0.1 + j * 0.22, 0, 'pop', 0.4); });
    capWords(sc, 15, 0, 11, { y: L(900, 1640), size: L(46, 48), color: 'var(--ink)', shadow: false, x: L(880, null), width: L(900, null), hl: [3, 6], hlCls: 'hl' });
  }
  // ١٦–١٧: جدّد حاجة بسيطة
  { const sc = scene(P(16).t0 - 0.3, P(18).t0 - 0.3);
    step(sc, 2, 'جدّد <span class="hl">حاجة بسيطة</span>', P(16).t0 - 0.2, SB, L(64, 62));
    card(sc, 'Q09', T(16, 2) - 0.2, P(17).t0 - 0.2, CB, { focus: [0.4, 0.45], zoom: [1.1, 1.16], from: 0, speed: 0.7, fadeOut: 0.15 });
    card(sc, 'Q10', P(17).t0 - 0.15, P(18).t0 - 0.3, CB, { focus: [0.5, 0.5], zoom: [1.05, 1.1], from: 3.2, speed: 1.4 });
    const PO = L([[1330, 470], [1330, 590], [1330, 710]], [[540, 1180], [540, 1300], [540, 1420]]);
    const cs = [['fa-location-dot', 'غيّر المكان', 5], ['fa-shuffle', 'ابدأ من جزء تاني', 8], ['fa-wand-magic-sparkles', 'جرّب طريقة جديدة', 13]].map(([ic, tx, k], j) => cchip(sc, '<i class="fa-solid ' + ic + '"></i>' + tx, 'white', PO[j][0], PO[j][1], T(16, k) - 0.08, L(40, 38), j % 2 ? 2 : -2));
    const fr = cchip(sc, '<i class="fa-solid fa-fire"></i>الشرارة ترجع', 'sticky', RX, L(850, 1560), T(16, 21) - 0.1, L(48, 48), -2, 'slap');
    capWords(sc, 16, 16, 20, { y: L(950, 1680), size: L(44, 46), color: 'var(--ink-2)', shadow: false, x: L(880, null), width: L(900, null), hl: [20], hlCls: 'hl', end: T(16, 21) - 0.1 });
    // ١٧: مش المشروع كله… تفصيلة واحدة جديدة
    tl.to(cs, { opacity: 0.3, duration: 0.3 }, P(17).t0 - 0.1); out(fr, P(17).t0 - 0.1);
    const all = cchip(sc, '<i class="fa-solid fa-diagram-project"></i>المشروع كله', 'ghost', L(1570, 540), L(850, 1520), T(17, 2) - 0.08, L(42, 40), -2); strike(all, T(17, 4) - 0.1);
    cchip(sc, '<i class="fa-solid fa-star"></i>تفصيلة واحدة جديدة', 'sticky', L(1110, 540), L(850, 1620), T(17, 6) - 0.1, L(44, 40), 2, 'slap');
    capWords(sc, 17, 0, 8, { y: L(980, 1720), size: L(44, 46), color: 'var(--ink)', shadow: false, x: L(880, null), width: L(900, null), hl: [6, 7], hlCls: 'hl' });
  }
  // ١٨–١٩: شوف اللي عملته — اكتب كل خطوة
  { const sc = scene(P(18).t0 - 0.3, P(20).t0 - 0.5);
    step(sc, 3, 'شوف <span class="hl">اللي عملته</span>', P(18).t0 - 0.2, SB, L(64, 62));
    card(sc, 'Q11', T(18, 2) - 0.2, P(19).t0 - 0.2, CB, { focus: [0.45, 0.55], zoom: [1.1, 1.16], from: 1, fadeOut: 0.15 }); fx('pen', T(18, 13), 0.8);
    card(sc, 'Q12', P(19).t0 - 0.15, P(20).t0 - 0.5, CB, { focus: [0.6, 0.6], zoom: [1.15, 1.2], from: 3 });
    const left = cchip(sc, '<i class="fa-solid fa-list"></i>فاضل ١٣ خطوة', 'ghost', RX, L(480, 1190), T(18, 8) - 0.1, L(42, 42), -2);
    capWords(sc, 18, 5, 11, { y: L(560, 1270), size: L(42, 44), color: 'var(--ink-2)', shadow: false, x: L(880, null), width: L(900, null), hl: [9, 10], hlCls: 'hl', end: T(18, 12) - 0.1 });
    tl.to(left, { opacity: 0.3, duration: 0.3 }, T(18, 12) - 0.1);
    const nt = sticky(sc, '<i class="fa-solid fa-check" style="color:#1F8A5A"></i> الدرس ١<br><i class="fa-solid fa-check" style="color:#1F8A5A"></i> الدرس ٢<br><i class="fa-solid fa-check" style="color:#1F8A5A"></i> صفحتين في الكشكول', RX, L(690, 1430), L(520, 600), L(40, 42), T(18, 13) - 0.1, -2); fx('paper', T(18, 13) - 0.1, 0.6);
    // ١٩: عشر خطوات خلصت… النص مش هيبان فاضي
    tl.to([nt, left], { opacity: 0, duration: 0.3 }, P(19).t0 - 0.1);
    const g = el('div', null, null, sc, { position: 'absolute', display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: px(L(18, 20)), direction: 'rtl' }); center(g, RX, L(560, 1290));
    [...Array(10)].forEach((_, j) => { const c = el('div', null, '<i class="fa-solid fa-check"></i>', g, { width: px(L(92, 100)), height: px(L(92, 100)), borderRadius: '24px', display: 'grid', placeItems: 'center', fontSize: px(L(44, 48)), background: '#E2F7EC', color: '#1F8A5A', boxShadow: 'var(--shadow-card)', opacity: 0 });
      tl.fromTo(c, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, T(19, 3) - 0.2 + j * 0.09); });
    fx('counter', T(19, 3) - 0.2, 0.5);
    capWords(sc, 19, 0, 10, { y: L(820, 1600), size: L(46, 48), color: 'var(--ink)', shadow: false, x: L(880, null), width: L(900, null), hl: [3, 4, 9], hlCls: 'hl' });
  }
  // ════════ ٢٠ · الواقع ════════
  { const sc = scene(P(20).t0 - 0.5, P(21).t0 - 0.3, 'real');
    foot(sc, 'Q13', P(20).t0 - 0.5, P(21).t0 - 0.3, { from: 1, speed: 0.9, focus: L([0.5, 0.45], [0.5, 0.45]), zoom: [1.08, 1.0], fadeIn: 0.5, shade: true }); fx('whoosh', P(20).t0 - 0.55, 0.6);
    capWords(sc, 20, 0, 8, { ...CAP, hl: [7], end: T(20, 9) - 0.1 });
    const q1 = chip(sc, '«أنا مش بكمّل حاجة»', 'glass', L(1460, 540), L(260, 290), L(52, 50)); q1.style.background = 'rgba(6,16,36,.55)'; pop(q1, T(20, 11) - 0.1, -2, 'pop', 0.6); strike(q1, T(20, 14) + 0.1);
    tl.to(q1, { opacity: 0.3, duration: 0.3 }, T(20, 15));
    sticky(sc, '«أنا في النص…<br>والنص محتاج نور»', L(1460, 540), L(450, 490), L(440, 480), L(54, 56), T(20, 16) - 0.1, -3); fx('paper', T(20, 16) - 0.1, 0.8);
    capWords(sc, 20, 9, 21, { ...CAP, hl: [18, 20, 21] });
  }
  // ════════ ٢١–٢٣ ════════
  { const sc = scene(P(21).t0 - 0.3, P(22).t0 - 0.2, 'blue');
    words(sc, L('إنت مش بتسيب الحاجات…', 'إنت مش بتسيب | الحاجات…'), { y: L(320, 560), size: L(104, 86), at: [0, 1, 2, 3].map(k => T(21, k)) });
    words(sc, 'النص بس *محتاج* *نور.*', { y: L(500, 900), size: L(104, 86), at: [4, 5, 6, 7].map(k => T(21, k)) });
    const b = icon(sc, 'fa-lightbulb', CX, L(820, 1260), L(120, 140), 'var(--sticky)', T(21, 7) + 0.1, 'impact'); b.style.filter = 'drop-shadow(0 0 30px rgba(245,230,163,.8))';
  }
  { const sc = scene(P(22).t0 - 0.2, P(23).t0 - 0.2);
    capWords(sc, 22, 0, 9, { y: L(170, 200), size: L(56, 60), color: 'var(--sky-100)', x: L(960, null), width: L(860, null), end: T(22, 10) - 0.1 });
    const ph = el('div', 'phone', '<div><img src="../ep08/assets/injazatak.png"></div>', sc, { width: px(L(300, 340)), height: px(L(650, 736)) });
    center(ph, L(560, 540), L(560, 900)); tl.fromTo(ph, { opacity: 0, y: 160, rotation: 0 }, { opacity: 1, y: 0, rotation: -4, duration: 0.6, ease: 'power3.out' }, T(22, 10) - 0.3); fx('whoosh', T(22, 10) - 0.3, 0.6);
    const zm = el('div', null, '<img src="../ep08/assets/injazatak_sheet.png" style="width:100%;display:block">', sc, { position: 'absolute', width: px(L(660, 900)), borderRadius: '34px', overflow: 'hidden', background: '#fff', boxShadow: '0 40px 90px rgba(2,20,60,.45)', opacity: 0 });
    center(zm, L(1320, 540), L(600, 1400)); pop(zm, T(22, 11) - 0.15, 0, 'pop', 0.7); fx('counter', T(22, 11), 0.5);
    const lg = el('div', null, '<img src="../../../etizan-explainer-video/pipeline/assets/logo-full.png" style="height:' + px(L(90, 100)) + ';display:block">', sc, { position: 'absolute', padding: '18px 44px', background: '#fff', borderRadius: '50px', boxShadow: 'var(--shadow-card)', opacity: 0 });
    center(lg, L(1320, 540), L(220, 330)); pop(lg, T(22, 12) - 0.2, 0, 'pop', 0.7);
    cchip(sc, '<i class="fa-solid fa-trophy"></i>كل اللي عملته في مكان واحد', 'sticky', L(1320, 540), L(950, 1790), T(22, 12) + 0.3, L(40, 42), 2);
  }
  { const sc = scene(P(23).t0 - 0.2, null);
    const sp = el('div', 'pill glass', '<span class="dot"></span>ليه دماغي بتعمل كده؟', sc, { fontSize: px(L(32, 36)), opacity: 0 }); center(sp, L(1420, 540), L(200, 360)); rise(sp, P(23).t0, -20);
    const nx = el('div', 'pill ink', 'الحلقة الجاية', sc, { fontSize: px(L(30, 34)), opacity: 0 }); center(nx, L(1420, 540), L(290, 460)); rise(nx, T(23, 1) - 0.1, -20);
    const q = words(sc, 'ليه قرار بسيط… | بياخد مني *يوم* *كامل؟*', { y: L(380, 600), size: L(80, 84), at: [3, 4, 5, 6, 7, 8, 9].map(k => T(23, k)) });
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
