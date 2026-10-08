// الحلقة ٧ — «ليه كلمة صغيرة… بتقلب يومي كله؟»
// كل حركة مربوطة بكلمتها: T(فقرة، رقم الكلمة) — الفقرات ١..٢٣ زي script.txt. L(عريض، طولي) لكل مكان.
// التشبيه الثابت: الإحساس موجة بتعلى وتهدى — في ADHD بتطلع أسرع وأعلى، والفرامل بتتأخر.
window.EPISODE = { n: 7, gaps: { 4: 3.0, 6: 0.5, 9: 0.4, 10: 0.3, 11: 0.3, 13: 1.1, 15: 0.3, 17: 0.3, 19: 0.6, 20: 0.3, 23: 7.5 }, build(A) {
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
  // ── رسم الموجة: إحساس بيعلى وبعدين يهدى — والفرامل ──
  const NS = 'http://www.w3.org/2000/svg';
  function chart(sc, B) {   // B = {x,y,w,h} مكان الرسم
    const s = document.createElementNS(NS, 'svg'); s.setAttribute('width', L(1920, 1080)); s.setAttribute('height', L(1080, 1920)); s.style.cssText = 'position:absolute;left:0;top:0;overflow:visible'; sc.appendChild(s);
    const X = u => B.x + u * B.w, Y = v => B.y + B.h - v * B.h;
    const curve = (peak, amp, rise, fall) => { let d = ''; for (let i = 0; i <= 120; i++) { const u = i / 120, k = u < peak ? Math.exp(-Math.pow((u - peak) / rise, 2)) : Math.exp(-Math.pow((u - peak) / fall, 2)); d += (i ? ' L' : 'M') + X(u).toFixed(1) + ' ' + Y(amp * k).toFixed(1); } return d; };
    const path = (d, color, w, dash) => { const p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); p.setAttribute('fill', 'none'); p.setAttribute('stroke', color); p.setAttribute('stroke-width', w); p.setAttribute('stroke-linecap', 'round'); p.setAttribute('stroke-linejoin', 'round'); if (dash) p.setAttribute('stroke-dasharray', dash); s.appendChild(p); return p; };
    const base = path('M' + X(0) + ' ' + Y(0) + ' L' + X(1) + ' ' + Y(0), 'rgba(255,255,255,.45)', 5);
    s.draw = (p, t, d = 0.9) => { const len = p.getTotalLength(); p.style.strokeDasharray = len; tl.fromTo(p, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: d, ease: 'power2.inOut' }, t); return p; };
    s.wave = (peak, amp, rise, fall, color, w = 9, dash) => { const p = path(curve(peak, amp, rise, fall), color, w, dash); p.style.strokeDasharray = 99999; p.style.strokeDashoffset = 99999; return p; };
    s.brake = (u, color, t) => { const l = path('M' + X(u) + ' ' + Y(-0.04) + ' L' + X(u) + ' ' + Y(1.02), color, 6, '14 12'); gsap.set(l, { opacity: 0 }); tl.to(l, { opacity: 1, duration: 0.3 }, t); return l; };
    s.X = X; s.Y = Y; gsap.set(base, { opacity: 0 }); s.base = base; return s;
  }

  // ════════ ١–٤ · الواقع ════════
  const T4 = T(4, 2) - 0.2;
  { const sc = scene(0, T4 + 0.6, 'real');
    // ١: الصبح كان كويس… لحد «إنت نسيت تبعت الملف؟»
    foot(sc, 'M01', 0, P(2).t0 - 0.1, { from: 5, focus: L([0.5, 0.35], [0.5, 0.35]), zoom: [1.0, 1.06], fadeIn: 0.6, fadeOut: 0.1, shade: true });
    const ok = cchip(sc, '<i class="fa-solid fa-sun"></i>يوم كويس', 'white', L(1500, 540), L(260, 300), T(1, 0) - 0.05, L(46, 44), -2); ok.style.color = 'var(--green)';
    capWords(sc, 1, 0, 6, { ...CAP, end: T(1, 7) - 0.1 });
    out(ok, T(1, 7) - 0.2, 0.15);
    const msg = el('div', null, '«إنت نسيت تبعت الملف؟»', sc, { position: 'absolute', padding: '22px 34px', borderRadius: '34px 34px 34px 8px', background: '#fff', color: 'var(--ink)', fontWeight: 900, fontSize: px(L(46, 44)), boxShadow: 'var(--shadow-card)', opacity: 0, whiteSpace: 'nowrap' });
    center(msg, L(1400, 540), L(300, 330)); rise(msg, T(1, 7) - 0.1, 30, 0.35, 'msg', 0.8);
    capWords(sc, 1, 7, 14, { ...CAP, hl: [11, 12, 14], end: P(2).t0 - 0.1 });
    // ٢: اليوم اتقلب… بتعيد الجملة في دماغك
    foot(sc, 'M12', P(2).t0 - 0.12, P(3).t0 - 0.1, { from: 1, speed: 0.9, focus: L([0.3, 0.35], [0.22, 0.35]), zoom: [1.05, 1.12], fadeIn: 0.1, fadeOut: 0.1, shade: true }); fx('lowhit', P(2).t0, 0.6);
    tl.to(msg, { scale: 0.85, opacity: 0.9, duration: 0.3 }, P(2).t0);
    capWords(sc, 2, 0, 3, { ...CAP, hl: [3], end: T(2, 4) - 0.1 });
    const echoes = [0, 1, 2].map(j => { const e = el('div', null, '«إنت نسيت تبعت الملف؟»', sc, { position: 'absolute', padding: '16px 28px', borderRadius: '28px', background: 'rgba(255,255,255,.75)', color: 'var(--ink)', fontWeight: 900, fontSize: px(L(34, 30)), opacity: 0, whiteSpace: 'nowrap' });
      center(e, L(1400 - j * 60, 540 + (j - 1) * 40), L(420 + j * 90, 980 + j * 80)); tl.fromTo(e, { opacity: 0, scale: 0.8, rotation: (j - 1) * 4 }, { opacity: 0.85 - j * 0.2, scale: 1, rotation: (j - 1) * 4, duration: 0.3 }, T(2, 5) + j * 0.25); fx('swish', T(2, 5) + j * 0.25, 0.4); return e; });
    capWords(sc, 2, 4, 12, { ...CAP, hl: [5, 6, 9], end: T(2, 13) - 0.1 });
    capWords(sc, 2, 13, 16, { ...CAP, hl: [13], end: P(3).t0 - 0.1 });
    tl.to([msg, ...echoes], { opacity: 0, duration: 0.25 }, P(3).t0 - 0.2);
    // ٣: بالليل… كانت كلمة صغيرة — وبيتجمّد عند «طب ليه؟»
    foot(sc, 'M04', P(3).t0 - 0.15, T(3, 8) - 0.1, { from: 1, focus: L([0.4, 0.45], [0.3, 0.45]), zoom: [1.05, 1.1], fadeIn: 0.3, fadeOut: 0.1, shade: true }); fx('whoosh', P(3).t0 - 0.2, 0.5); fx('ticktock', P(3).t0, 0.3);
    capWords(sc, 3, 0, 7, { ...CAP, hl: [6, 7], end: T(3, 8) - 0.1 });
    const fz = T(4, 0);
    const r = foot(sc, 'M03', T(3, 8) - 0.12, T4 + 0.25, { from: 3, freeze: fz, focus: L([0.55, 0.35], [0.7, 0.35]), zoom: [1.0, 1.05], fadeIn: 0.1, shade: true }); fx('swish', T(3, 8) - 0.15, 0.5);
    capWords(sc, 3, 8, 12, { ...CAP, hl: [8, 9, 10, 11, 12], end: fz - 0.1 });
    flash(fz, 0.35); fx('lowhit', fz, 0.8); fx('reverse', fz - 0.7, 0.5);
    tl.to(r.querySelector('.src > img'), { filter: 'grayscale(1) brightness(.8)', duration: 0.4 }, fz);
    tl.to(r.tint, { opacity: 0.82, duration: 0.7 }, fz + 0.15);
    trace(r, ['M1100 450 C1080 200, 1300 110, 1500 130 C1700 150, 1780 300, 1740 520 C1700 760, 1560 940, 1400 940 C1240 940, 1120 700, 1100 450 Z', 'M1500 90 L1540 20 M1620 110 L1700 40 M1380 100 L1350 30'], fz + 0.25, 0.8);
    fx('swish', fz + 0.3, 0.5);
    capWords(sc, 4, 0, 1, { ...CAP, y: L(470, 1420), size: L(110, 110), hl: [1], end: T4 + 0.05 });
  }
  // ════════ كارت العنوان ════════
  { const sc = scene(T4, P(5).t0 - 0.35, 'blue');
    const q = el('div', 'qmark', '؟', sc, { fontSize: px(L(1000, 760)), opacity: 0 }); Object.assign(q.style, H ? { left: '80px', top: '30px' } : { left: '160px', top: '1060px' });
    tl.fromTo(q, { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, T4 + 0.1);
    const sp = el('div', 'pill glass', '<span class="dot"></span>ليه دماغي بتعمل كده؟', sc, { fontSize: px(L(34, 38)), opacity: 0 });
    if (H) Object.assign(sp.style, { right: '160px', top: '230px' }); else center(sp, 540, 520); rise(sp, T4 + 0.05, -20);
    const ep = el('div', 'pill ink', 'الحلقة ٧', sc, { fontSize: px(L(28, 32)), padding: '6px 24px', opacity: 0 });
    if (H) Object.assign(ep.style, { right: '160px', top: '320px' }); else center(ep, 540, 610); rise(ep, T4 + 0.25, -20);
    const t1 = words(sc, 'ليه كلمة صغيرة…', { y: L(430, 760), size: L(112, 96), at: [2, 3, 4].map(k => T(4, k)) });
    const t2 = words(sc, '*بتقلب* يومي كله؟', { y: L(580, 920), size: L(118, 104), at: [5, 6, 7].map(k => T(4, k)) });
    if (H) [t1, t2].forEach(x => Object.assign(x.style, { left: 'auto', right: '160px', textAlign: 'right', padding: 0 }));
    fx('impact', T(4, 7) + 0.4, 0.9); flash(T(4, 7) + 0.4, 0.15);
    tl.to([t1, t2, sp, ep], { opacity: 0, y: -40, duration: 0.35 }, P(5).t0 - 0.6); fx('whoosh_big', P(5).t0 - 0.6, 0.8);
  }
  // ════════ ٥–٦ · اللي بيتقال لك (فاتح) ════════
  { const sc = scene(P(5).t0 - 0.35, P(7).t0 - 0.35, 'light');
    chapter('اللي بيتقال لك', P(5).t0 - 0.2, P(7).t0 - 0.4, 'ink', 'var(--sky-400)');
    capWords(sc, 5, 0, 1, { y: L(170, 220), size: L(54, 58), color: 'var(--ink-2)', shadow: false, end: P(6).t0 - 0.1 });
    const PA = L([[1400, 330, -3], [900, 370, 2], [1180, 500, -2]], [[540, 420, -3], [540, 560, 2], [540, 700, -2]]);
    const cs = [['«إنت حساس زيادة»', 2], ['«كبّر دماغك»', 5], ['«ما تاخدش كل حاجة على صدرك»', 7]].map(([q, k], j) => cchip(sc, q, 'ghost', PA[j][0], PA[j][1], T(5, k) - 0.08, L(48, 44), PA[j][2], 'slap'));
    // ٦: وكأنه قرار… بس اللي جوّه أسرع من أي قرار
    tl.to(cs, { opacity: 0.3, scale: 0.9, duration: 0.4 }, P(6).t0);
    const sw = el('div', null, '<span style="padding:14px 30px;border-radius:999px;background:#fff;box-shadow:var(--shadow-card)">تزعل</span><span style="padding:14px 30px;border-radius:999px;background:#fff;box-shadow:var(--shadow-card)">ما تزعلش</span>', sc, { position: 'absolute', display: 'flex', gap: '26px', fontWeight: 900, fontSize: px(L(44, 44)), color: 'var(--ink)', opacity: 0 });
    center(sw, CX, L(680, 920)); rise(sw, T(6, 2) - 0.1, 20, 0.35, 'pop', 0.6);
    const fast = cchip(sc, '<i class="fa-solid fa-bolt"></i>أسرع من أي قرار', 'sticky', CX, L(820, 1080), T(6, 11) - 0.08, L(56, 54), -2, 'slap');
    tl.to(sw, { opacity: 0.35, x: L(-30, 0), duration: 0.3 }, T(6, 11));
    capWords(sc, 6, 7, 10, { y: L(940, 1240), size: L(50, 52), color: 'var(--ink-2)', shadow: false });
  }
  // ════════ ٧–١٣ · اللي بيحصل جوّه ════════
  chapter('اللي بيحصل جوّه', P(7).t0 - 0.2, P(13).t1 + 0.2);
  const CH = L({ x: 260, y: 330, w: 1400, h: 470 }, { x: 80, y: 560, w: 920, h: 620 });
  // ٧–٩: الموجة والفرامل
  { const sc = scene(P(7).t0 - 0.35, P(10).t0 - 0.4, 'blue');
    const c = chart(sc, CH); tl.to(c.base, { opacity: 1, duration: 0.4 }, P(7).t0 - 0.1);
    const ax = label(sc, '<i class="fa-solid fa-arrow-right" style="color:var(--blue-700)"></i>الوقت', L(1560, 860), CH.y + CH.h + L(50, 60), P(7).t0, 'ink', L(28, 30));
    capWords(sc, 7, 0, 7, { y: L(150, 200), size: L(60, 62), hl: [7], end: T(7, 8) - 0.1 });
    const w0 = c.wave(0.32, 0.45, 0.1, 0.18, '#D9F0FD', 8); c.draw(w0, T(7, 7) - 0.1, 1.4); fx('rise', T(7, 8), 0.5);
    capWords(sc, 7, 8, 14, { y: L(150, 200), size: L(60, 62), hl: [8, 10], end: P(8).t0 - 0.1 });
    // ٨: أسرع وأعلى… والفرامل بتتأخر
    tl.to(w0, { opacity: 0.4, duration: 0.3 }, P(8).t0);
    capWords(sc, 8, 0, 9, { y: L(150, 200), size: L(56, 58), end: T(8, 10) - 0.1 });
    const w1 = c.wave(0.22, 0.95, 0.05, 0.3, '#F5E6A3', 11); c.draw(w1, T(8, 11) - 0.1, 1.0); fx('whoosh_big', T(8, 11), 0.7);
    capWords(sc, 8, 10, 18, { y: L(150, 200), size: L(56, 58), hl: [12, 13, 17], end: P(9).t0 - 0.1 });
    const bk1 = c.brake(0.28, 'rgba(255,255,255,.55)', T(8, 14) - 0.1);
    const bk2 = c.brake(0.52, '#F2545B', T(8, 17) - 0.1);
    const bl = el('div', 'pill', '<i class="fa-solid fa-hand"></i>الفرامل', sc, { background: '#F2545B', color: '#fff', fontSize: px(L(32, 32)), opacity: 0 }); center(bl, c.X(0.52), CH.y - L(20, 30)); pop(bl, T(8, 17) - 0.1, 0, 'pop', 0.6);
    tl.fromTo(bk2, { x: -L(240, 160) }, { x: 0, duration: 0.9, ease: 'power2.out', immediateRender: false }, T(8, 17) - 0.1);
    // ٩: موجة صغيرة عند حد تاني… موجة بطول البيت عندك
    const l0 = chip(sc, 'عند حد تاني', 'white', c.X(0.36), c.Y(0.5) - L(40, 40), L(30, 30)); pop(l0, T(9, 4) - 0.1, -2, 'pop', 0.5); tl.to(w0, { opacity: 1, duration: 0.3 }, T(9, 4));
    const l1 = chip(sc, 'عندك', 'sticky', c.X(0.1), c.Y(0.92), L(36, 36)); pop(l1, T(9, 9) - 0.1, 2, 'slap', 0.6); tl.to(w1, { strokeWidth: 15, duration: 0.3, yoyo: true, repeat: 1 }, T(9, 13));
    capWords(sc, 9, 0, 14, { y: L(150, 200), size: L(56, 58), hl: [7, 8, 12, 13, 14], end: T(9, 15) - 0.1 });
    const weak = cchip(sc, '«ضعيف»', 'ghost', L(1500, 820), L(980, 1430), T(9, 17) - 0.1, L(40, 40), -2); weak.style.color = '#fff'; weak.style.borderColor = 'rgba(255,255,255,.5)'; strike(weak, T(9, 18) - 0.05);
    tl.to(bl, { scale: 1.2, duration: 0.25, yoyo: true, repeat: 3 }, T(9, 19)); fx('pop', T(9, 19), 0.5);
    capWords(sc, 9, 15, 22, { y: L(150, 200), size: L(56, 58), hl: [19, 20, 21, 22] });
  }
  // ١٠: الموجة العالية بتغطي على كل حاجة (واقع)
  { const sc = scene(P(10).t0 - 0.4, P(11).t0 - 0.3, 'real');
    foot(sc, 'M11', P(10).t0 - 0.4, P(11).t0 - 0.3, { from: 0, speed: 0.9, focus: [0.5, 0.6], zoom: [1.05, 1.12], fadeIn: 0.3, shade: true }); fx('whoosh_big', P(10).t0 - 0.3, 0.7);
    capWords(sc, 10, 0, 7, { ...CAP, hl: [3, 4], end: T(10, 8) - 0.1 });
    const IT = L([[1500, 260], [1080, 300], [640, 260]], [[790, 300], [300, 300], [540, 420]]);
    const cs = [['fa-briefcase', 'الشغل', 8], ['fa-face-smile', 'المزاج', 9], ['fa-mug-hot', 'الحاجات الحلوة', 12]].map(([ic, tx, k], j) => cchip(sc, '<i class="fa-solid ' + ic + '"></i>' + tx, 'white', IT[j][0], IT[j][1], T(10, k) - 0.08, L(44, 40), j % 2 ? 2 : -2));
    cs.forEach((c, j) => tl.to(c, { y: L(260, 300), opacity: 0.15, filter: 'blur(6px)', duration: 0.8, ease: 'power2.in' }, T(10, 14) + j * 0.08)); fx('swish', T(10, 14), 0.6);
    capWords(sc, 10, 8, 15, { ...CAP, hl: [11, 12] });
  }
  // ١١: انتقاد كتير وهما صغيرين… حساس لأي «إنت غلطت»
  { const sc = scene(P(11).t0 - 0.3, P(12).t0 - 0.3, 'blue');
    capWords(sc, 11, 0, 12, { y: L(150, 200), size: L(56, 58), hl: [8, 9, 10, 11, 12], end: T(11, 13) - 0.1 });
    const Q = ['«تاني؟!»', '«ركّز بقى»', '«إنت دايمًا ناسي»', '«إنت مش بتسمع»', '«ليه كده؟»'];
    const QP = L([[1450, 400], [700, 380], [1150, 560], [520, 600], [1600, 640]], [[760, 520], [320, 640], [700, 800], [330, 960], [740, 1100]]);
    const qs = Q.map((q, j) => { const d = el('div', null, q, sc, { position: 'absolute', padding: '14px 26px', borderRadius: '26px 26px 26px 6px', background: 'rgba(255,255,255,.88)', color: 'var(--ink)', fontWeight: 900, fontSize: px(L(36, 36)), opacity: 0, whiteSpace: 'nowrap' });
      center(d, QP[j][0], QP[j][1]); pop(d, T(11, 8) + j * 0.22, (j % 2 ? 3 : -3), j ? 'pop' : 'slap', 0.4); return d; });
    tl.to(qs, { opacity: 0.25, scale: 0.85, duration: 0.4 }, T(11, 13));
    const rd = icon(sc, 'fa-tower-broadcast', CX, L(760, 1260), L(130, 140), '#fff', T(11, 14) - 0.1, 'pop');
    tl.to(rd, { scale: 1.15, duration: 0.3, yoyo: true, repeat: 5, ease: 'sine.inOut' }, T(11, 16));
    const ww = cchip(sc, '«إنت غلطت»', 'white', CX, L(940, 1460), T(11, 21) - 0.08, L(60, 60), -2, 'slap'); ww.style.color = 'var(--red)'; ww.style.boxShadow = '0 0 50px rgba(242,84,91,.8)'; fx('lowhit', T(11, 21), 0.7);
    capWords(sc, 11, 13, 22, { y: L(150, 200), size: L(56, 58), hl: [16, 17], end: P(12).t0 - 0.1 });
  }
  // ١٢–١٣: مش «حساس زيادة»… الموجة بتسبق الفرامل — اعرف تعدّيها
  { const sc = scene(P(12).t0 - 0.3, P(14).t0 - 1.1);
    const w = words(sc, 'المشكلة مش إنك ~حساس~ ~زيادة~', { y: L(170, 300), size: L(76, 60), at: [0, 1, 2, 3, 4].map(k => T(12, k)) });
    const ws = w.querySelectorAll('.w'); strike(ws[3], T(12, 5) - 0.15, 8); strike(ws[4], T(12, 5) - 0.08, 8);
    const r1 = el('div', null, '<i class="fa-solid fa-water" style="color:#F5E6A3"></i><span>الموجة</span><i class="fa-solid fa-angles-left" style="color:var(--sky-100)"></i><span style="opacity:.75">الفرامل</span><i class="fa-solid fa-hand" style="color:#F2545B"></i>', sc,
      { position: 'absolute', display: 'flex', alignItems: 'center', gap: '22px', fontWeight: 1000, fontSize: px(L(64, 54)), color: '#fff', opacity: 0, whiteSpace: 'nowrap' });
    center(r1, CX, L(420, 560)); rise(r1, T(12, 7) - 0.1, 20, 0.4, 'whoosh', 0.6);
    words(sc, 'إدّي الفرامل *فرصة* *توصل*', { y: L(530, 700), size: L(72, 64), color: 'var(--sky-100)', at: [12, 13, 14, 15].map(k => T(12, k)) });
    // ١٣: مش تمنع الموجة… تعرف تعدّيها
    tl.to([w, r1], { opacity: 0.25, duration: 0.3 }, P(13).t0 - 0.15);
    words(sc, 'والخبر الحلو؟', { y: L(700, 900), size: L(56, 60), color: 'var(--sky-100)', at: [0, 1].map(k => T(13, k)) });
    const st = cchip(sc, '<i class="fa-solid fa-ban"></i>تمنع الموجة', 'ghost', L(1260, 540), L(860, 1060), T(13, 5) - 0.1, L(48, 46), -2); st.style.color = '#fff'; st.style.borderColor = 'rgba(255,255,255,.5)'; strike(st, T(13, 6) + 0.2);
    cchip(sc, '<i class="fa-solid fa-person-swimming"></i>تعرف تعدّيها', 'sticky', L(640, 540), L(860, 1200), T(13, 8) - 0.1, L(56, 56), 2, 'slap');
  }

  // ════════ ١٤–١٩ · تعمل إيه؟ ════════
  { const t = P(14).t0 - 1.1, sc = scene(t, P(14).t0 - 0.05, 'light');
    words(sc, 'طب ~تعمل~ إيه؟', { y: L(400, 820), size: L(140, 130), color: 'var(--ink)', t: t + 0.05 }); fx('whoosh_big', t, 0.8); fx('slap', t + 0.3, 0.6);
  }
  chapter('تعمل إيه؟', P(14).t0 - 0.2, P(19).t1 + 0.3, 'ink', 'var(--sticky)');
  const SB = L({ x: 860, y: 200, w: 940 }, { x: 60, y: 230, w: 960 });
  const CB = L(SQ(470, 560, 600), SQ(540, 820, 560));
  const RX = L(1330, 540);
  // ١٤–١٥: سمّيها
  { const sc = scene(P(14).t0 - 0.1, P(16).t0 - 0.3);
    step(sc, 1, '<span class="hl">سمّيها</span>', P(14).t0 - 0.05, SB, L(66, 64));
    card(sc, 'M12', T(14, 2) - 0.2, P(15).t0 - 0.2, CB, { focus: [0.28, 0.4], zoom: [1.25, 1.3], from: 9, fadeOut: 0.15 });
    card(sc, 'M08', P(15).t0 - 0.15, P(16).t0 - 0.3, CB, { focus: [0.5, 0.5], zoom: [1.1, 1.14], from: 0.4, freeze: P(15).t0 + 4.6 }); fx('switch', P(15).t0 + 0.35, 0.8);
    const say = el('div', null, '<i class="fa-solid fa-comment" style="margin-left:14px;color:var(--blue-700)"></i>«أنا متضايق دلوقتي»', sc, { position: 'absolute', padding: '24px 36px', borderRadius: '34px 34px 34px 8px', background: '#DCF3FF', color: 'var(--ink)', fontWeight: 900, fontSize: px(L(48, 48)), boxShadow: 'var(--shadow-card)', opacity: 0, whiteSpace: 'nowrap' });
    center(say, RX, L(520, 1220)); rise(say, T(14, 5) - 0.1, 30, 0.4, 'pop', 0.7);
    // مقياس الموجة بينزل لما تسمّيه
    const mt = el('div', null, '<div style="display:flex;align-items:center;gap:18px;font-weight:900;font-size:' + px(L(32, 34)) + ';color:var(--ink-2)"><i class="fa-solid fa-water" style="color:var(--blue-700)"></i>الموجة<div style="flex:1;height:26px;border-radius:13px;background:#E3EAF4;overflow:hidden"><div class="lv" style="height:100%;width:90%;border-radius:13px;background:linear-gradient(90deg,#F5C542,#F2545B)"></div></div></div>', sc,
      { position: 'absolute', width: px(L(760, 860)), opacity: 0 }); center(mt, RX, L(700, 1400)); rise(mt, T(14, 10) - 0.2, 20, 0.3, null);
    tl.to(mt.querySelector('.lv'), { width: '45%', duration: 0.9, ease: 'power2.inOut' }, T(14, 13)); fx('reverse', T(14, 13), 0.5);
    capWords(sc, 14, 10, 15, { y: L(800, 1500), size: L(46, 48), color: 'var(--ink)', shadow: false, x: L(880, null), width: L(900, null), hl: [13, 14], hlCls: 'hl', end: P(15).t0 - 0.1 });
    // ١٥: زي ما تولّع النور في أوضة ضلمة
    tl.to([say, mt], { opacity: 0.35, duration: 0.3 }, P(15).t0 - 0.1);
    capWords(sc, 15, 0, 12, { y: L(820, 1520), size: L(48, 50), color: 'var(--ink)', shadow: false, x: L(880, null), width: L(900, null), hl: [3, 11, 12], hlCls: 'hl' });
  }
  // ١٦–١٧: اعمل مسافة قبل ما ترد
  { const sc = scene(P(16).t0 - 0.3, P(18).t0 - 0.3);
    step(sc, 2, 'اعمل <span class="hl">مسافة</span> قبل ما ترد', P(16).t0 - 0.2, SB, L(62, 60));
    card(sc, 'M07', T(16, 2) - 0.2, P(18).t0 - 0.3, CB, { focus: [0.5, 0.4], zoom: [1.1, 1.16], from: 0, speed: 0.55, freeze: T(16, 2) + 7.5 });
    const PO = L([[1640, 470], [1330, 470], [1020, 470]], [[840, 1180], [540, 1180], [240, 1180]]);
    const cs = [['fa-wind', 'خد نفس', 7], ['fa-person-walking', 'خطوتين', 10], ['fa-clock', '«هرد كمان شوية»', 14]].map(([ic, tx, k], j) => cchip(sc, '<i class="fa-solid ' + ic + '"></i>' + tx, 'white', PO[j][0], PO[j][1], T(16, k) - 0.08, L(38, 34), j % 2 ? 2 : -2));
    fx('rise', T(16, 7), 0.3);
    // موجة… مسافة… رد أهدى
    const RW = el('div', null, '<span class="a" style="padding:14px 26px;border-radius:999px;background:#FFF0D4;color:#B7791F"><i class="fa-solid fa-water"></i> موجة</span><span class="g" style="flex:1;border-top:5px dashed #C9D6E8;margin:0 14px;position:relative"><span style="position:absolute;top:-46px;left:50%;transform:translateX(-50%);font-size:' + px(L(26, 26)) + ';color:var(--ink-2)">مسافة</span></span><span class="b" style="padding:14px 26px;border-radius:999px;background:#E2F7EC;color:#1F8A5A"><i class="fa-solid fa-comment"></i> رد أهدى</span>', sc,
      { position: 'absolute', display: 'flex', alignItems: 'center', width: px(L(820, 900)), fontWeight: 900, fontSize: px(L(36, 36)), opacity: 0 });
    center(RW, RX, L(680, 1380)); const ra = RW.querySelector('.a'), rg = RW.querySelector('.g'), rb = RW.querySelector('.b'); gsap.set([ra, rg, rb], { opacity: 0 }); gsap.set(RW, { opacity: 1 });
    tl.to(ra, { opacity: 1, duration: 0.3 }, T(16, 18) - 0.1); tl.to(rg, { opacity: 1, duration: 0.5 }, T(16, 19)); tl.to(rb, { opacity: 1, duration: 0.3 }, T(16, 23) - 0.1); fx('pop', T(16, 23), 0.5);
    // ١٧: مش مطلوب تبقى بارد
    tl.to(cs, { opacity: 0.3, duration: 0.3 }, P(17).t0 - 0.1);
    const cold = cchip(sc, '<i class="fa-solid fa-snowflake"></i>بارد', 'ghost', L(1500, 760), L(860, 1560), T(17, 2) - 0.08, L(42, 40), -2); strike(cold, T(17, 3) + 0.1);
    capWords(sc, 17, 4, 12, { y: L(920, 1680), size: L(46, 48), color: 'var(--ink)', shadow: false, x: L(880, null), width: L(900, null), hl: [7, 12], hlCls: 'hl' });
  }
  // ١٨–١٩: طلّعها برّه دماغك — اكتب
  { const sc = scene(P(18).t0 - 0.3, P(20).t0 - 0.5);
    step(sc, 3, 'طلّعها <span class="hl">برّه</span> دماغك', P(18).t0 - 0.2, SB, L(64, 62));
    card(sc, 'M09', T(18, 2) - 0.2, P(19).t0 - 0.2, CB, { focus: [0.45, 0.5], zoom: [1.05, 1.1], from: 1, fadeOut: 0.15 }); fx('pen', T(18, 5), 0.8);
    card(sc, 'M06', P(19).t0 - 0.15, P(20).t0 - 0.5, CB, { focus: [0.5, 0.5], zoom: [1.05, 1.1], from: 2 });
    const nt = sticky(sc, 'اللي حصل: …<br>اللي حسّيته: …', RX, L(560, 1270), L(520, 600), L(44, 46), T(18, 5) - 0.1, -2); fx('paper', T(18, 5) - 0.1, 0.6);
    const loop = cchip(sc, '<i class="fa-solid fa-rotate"></i>تعيد الجملة طول اليوم', 'ghost', RX, L(780, 1480), T(18, 16) - 0.1, L(38, 38), 2); strike(loop, T(18, 18));
    capWords(sc, 18, 10, 13, { y: L(880, 1600), size: L(44, 46), color: 'var(--ink-2)', shadow: false, x: L(880, null), width: L(900, null), end: T(18, 14) - 0.1 });
    // ١٩: بعد ساعة… الموجة صغرت
    tl.to([nt, loop], { opacity: 0.3, duration: 0.3 }, P(19).t0 - 0.1);
    const big = icon(sc, 'fa-water', RX, L(780, 1500), L(150, 150), '#F2A33A', P(19).t0, 'pop');
    tl.to(big, { scale: 0.45, color: '#7BC8F6', duration: 0.9, ease: 'power2.inOut' }, T(19, 9) - 0.1); fx('reverse', T(19, 9), 0.5);
    capWords(sc, 19, 0, 10, { y: L(940, 1680), size: L(46, 48), color: 'var(--ink)', shadow: false, x: L(880, null), width: L(900, null), hl: [4, 5, 9], hlCls: 'hl' });
  }
  // ════════ ٢٠ · الواقع ════════
  { const sc = scene(P(20).t0 - 0.5, P(21).t0 - 0.3, 'real');
    foot(sc, 'M10', P(20).t0 - 0.5, P(21).t0 - 0.3, { from: 0, speed: 0.8, focus: L([0.4, 0.4], [0.32, 0.4]), zoom: [1.08, 1.0], fadeIn: 0.5, shade: true }); fx('whoosh', P(20).t0 - 0.55, 0.6);
    capWords(sc, 20, 0, 6, { ...CAP, end: T(20, 7) - 0.1 });
    const q1 = chip(sc, '«أنا حساس زيادة»', 'glass', L(1460, 540), L(260, 280), L(52, 50)); q1.style.background = 'rgba(6,16,36,.55)'; pop(q1, T(20, 9) - 0.1, -2, 'pop', 0.6); strike(q1, T(20, 11) + 0.1);
    tl.to(q1, { opacity: 0.3, duration: 0.3 }, T(20, 12));
    sticky(sc, '«دي موجة…<br>وهتعدّي»', L(1460, 540), L(440, 480), L(420, 460), L(58, 58), T(20, 13) - 0.1, -3); fx('paper', T(20, 13) - 0.1, 0.8);
    capWords(sc, 20, 7, 15, { ...CAP, hl: [13, 14, 15] });
  }
  // ════════ ٢١–٢٣ ════════
  { const sc = scene(P(21).t0 - 0.3, P(22).t0 - 0.2, 'blue');
    words(sc, 'إنت مش حساس زيادة…', { y: L(320, 680), size: L(104, 86), at: [0, 1, 2, 3].map(k => T(21, k)) });
    words(sc, 'مشاعرك بس *بتوصل* *أسرع.*', { y: L(500, 860), size: L(104, 86), at: [4, 5, 6, 7].map(k => T(21, k)) });
    const b = icon(sc, 'fa-water', CX, L(820, 1260), L(120, 140), 'var(--sticky)', T(21, 7) + 0.1, 'impact'); b.style.filter = 'drop-shadow(0 0 30px rgba(245,230,163,.8))';
  }
  { const sc = scene(P(22).t0 - 0.2, P(23).t0 - 0.2);
    capWords(sc, 22, 0, 11, { y: L(170, 200), size: L(56, 60), color: 'var(--sky-100)', x: L(960, null), width: L(860, null), end: T(22, 12) - 0.1 });
    const ph = el('div', 'phone', '<div><img src="../ep07/assets/braindump.png"></div>', sc, { width: px(L(300, 340)), height: px(L(650, 736)) });
    center(ph, L(560, 540), L(560, 900)); tl.fromTo(ph, { opacity: 0, y: 160, rotation: 0 }, { opacity: 1, y: 0, rotation: -4, duration: 0.6, ease: 'power3.out' }, T(22, 12) - 0.3); fx('whoosh', T(22, 12) - 0.3, 0.6);
    const zm = el('div', null, '<img src="../ep07/assets/braindump_sheet.png" style="width:100%;display:block">', sc, { position: 'absolute', width: px(L(660, 900)), borderRadius: '34px', overflow: 'hidden', background: '#fff', boxShadow: '0 40px 90px rgba(2,20,60,.45)', opacity: 0 });
    center(zm, L(1320, 540), L(600, 1400)); pop(zm, T(22, 13) - 0.15, 0, 'pop', 0.7); fx('paper', T(22, 13), 0.6);
    const lg = el('div', null, '<img src="../../../etizan-explainer-video/pipeline/assets/logo-full.png" style="height:' + px(L(90, 100)) + ';display:block">', sc, { position: 'absolute', padding: '18px 44px', background: '#fff', borderRadius: '50px', boxShadow: 'var(--shadow-card)', opacity: 0 });
    center(lg, L(1320, 540), L(220, 330)); pop(lg, T(22, 16) - 0.2, 0, 'pop', 0.7);
    cchip(sc, '<i class="fa-solid fa-lock"></i>محدش بيشوفه غيرك', 'sticky', L(1320, 540), L(930, 1790), T(22, 16) + 0.3, L(42, 44), 2);
  }
  { const sc = scene(P(23).t0 - 0.2, null);
    const sp = el('div', 'pill glass', '<span class="dot"></span>ليه دماغي بتعمل كده؟', sc, { fontSize: px(L(32, 36)), opacity: 0 }); center(sp, L(1420, 540), L(200, 360)); rise(sp, P(23).t0, -20);
    const nx = el('div', 'pill ink', 'الحلقة الجاية', sc, { fontSize: px(L(30, 34)), opacity: 0 }); center(nx, L(1420, 540), L(290, 460)); rise(nx, T(23, 1) - 0.1, -20);
    const q = words(sc, 'ليه بسيب الحاجة… | لما توصل *للنص؟*', { y: L(380, 600), size: L(80, 84), at: [3, 4, 5, 6, 7, 8].map(k => T(23, k)) });
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
