// الحلقة ٢ — خناقة قفل التابلت (آخرها: دليل اتزان)
window.EPISODE = { n: 2, next: 'خناقة الصبح… وعمى الوقت', endCard: 3.2, build(A) {
  const { tl, fx, el, px, $, W, LN, scene, pop, out, tile, chip, center, sticky, strike, bigText, ring, dyn, lerp, AR } = A;
  const ico = (sc, icon, x, y, size, bg, color) => el('div', 'icon-c', '<i class="' + icon + '"></i>', sc, { left: px(x), top: px(y), width: px(size), height: px(size), background: bg, color, fontSize: px(size * 0.5), boxShadow: 'var(--shadow-card)' });
  const cchip = (sc, html, cls, y, t, rot = 0, s = 'pop', size) => { const c = center(chip(sc, html, cls, 0, y), y); if (size) c.style.fontSize = px(size); return pop(c, t, rot, s); };
  // تابلت عليه لعبة
  function tablet(sc, x, y, w) {
    const h = w * 0.68, t = el('div', null, '<div class="tscr"><i class="fa-solid fa-gamepad"></i><div class="lv"><span>LEVEL 7</span><b><i></i></b></div><div class="st"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i></div></div>', sc,
      { position: 'absolute', left: px(x), top: px(y), width: px(w), height: px(h), borderRadius: px(w * 0.07), background: '#0b1730', padding: px(w * 0.04), boxShadow: '0 40px 80px rgba(3,20,60,.5)', opacity: 0 });
    const s = t.querySelector('.tscr');
    Object.assign(s.style, { position: 'relative', width: '100%', height: '100%', borderRadius: px(w * 0.04), overflow: 'hidden', background: 'linear-gradient(160deg,#7C3AED,#18B1FE)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: px(w * 0.22) });
    const lv = s.querySelector('.lv'); Object.assign(lv.style, { position: 'absolute', top: px(w * 0.04), left: px(w * 0.05), right: px(w * 0.05), display: 'flex', alignItems: 'center', gap: '14px', fontSize: px(w * 0.045), fontWeight: 900, direction: 'ltr' });
    const bar = lv.querySelector('b'); Object.assign(bar.style, { flex: 1, height: px(w * 0.035), borderRadius: '99px', background: 'rgba(255,255,255,.3)', overflow: 'hidden', display: 'block' });
    Object.assign(bar.querySelector('i').style, { display: 'block', height: '100%', width: '62%', background: 'var(--sticky)', borderRadius: '99px' });
    Object.assign(s.querySelector('.st').style, { position: 'absolute', bottom: px(w * 0.05), display: 'flex', gap: '12px', fontSize: px(w * 0.06), color: 'var(--sticky)' });
    t.screen = s; t.bar = bar.querySelector('i'); return t;
  }

  // ═══ ١ · «يلا، اقفل التابلت» ═══
  { const sc = scene(0, LN[2].t0 - 0.25);
    const tb = tablet(sc, 190, 380, 700);
    tl.fromTo(tb, { opacity: 0, scale: 0.4, rotation: -12 }, { opacity: 1, scale: 1, rotation: -3, duration: 0.6, ease: 'back.out(1.6)' }, 0.1); fx('whoosh', 0.08, 0.9);
    tl.to(tb.screen.querySelector('.fa-gamepad'), { rotation: 8, duration: 0.25, yoyo: true, repeat: 7, ease: 'sine.inOut' }, 0.6);
    const home = chip(sc, '<i class="fa-solid fa-house"></i>كل يوم', 'ghost', 0, 300); center(home, 300); pop(home, W(0, 3) - 0.1, 0, null);
    const bomb = el('div', 'bubble', '«يلا، اقفل التابلت»', sc, { left: '50%', top: '920px', fontSize: '74px' }); gsap.set(bomb, { xPercent: -50 });
    tl.fromTo(bomb, { opacity: 0, y: -900, rotation: -10 }, { opacity: 1, y: 0, rotation: 2, duration: 0.45, ease: 'power4.in' }, W(0, 6) - 0.45); fx('impact', W(0, 6) - 0.02, 1);
    tl.fromTo('#scenes', { x: 0 }, { x: 16, duration: 0.05, yoyo: true, repeat: 5, immediateRender: false }, W(0, 6));
    tl.fromTo('#flash', { opacity: 0.3 }, { opacity: 0, duration: 0.3, immediateRender: false }, W(0, 6));
    // صريخ… عياط… التابلت يطير
    tl.to(home, { opacity: 0, duration: 0.2 }, LN[1].t0 - 0.2);
    tl.to(bomb, { opacity: 0, y: 200, duration: 0.3 }, LN[1].t0 - 0.1);
    const s1 = chip(sc, '<i class="fa-solid fa-volume-high"></i>صريخ', 'sticky', 100, 300), s2 = chip(sc, '<i class="fa-solid fa-face-sad-tear"></i>عياط', 'sticky', 620, 330);
    [s1, s2].forEach(c => c.style.fontSize = '60px');
    pop(s1, W(1, 1) - 0.1, -8, 'slap', 0.9); pop(s2, W(1, 2) - 0.1, 7, 'slap', 0.9);
    tl.to(s1, { x: 10, duration: 0.05, yoyo: true, repeat: 9 }, W(1, 1) + 0.3);
    tl.to(tb, { rotation: 6, duration: 0.06, yoyo: true, repeat: 9 }, W(1, 3));
    tl.to(tb, { y: -1400, x: 300, rotation: 140, scale: 0.6, duration: 0.7, ease: 'power3.in' }, W(1, 6) - 0.15); fx('whoosh', W(1, 6) - 0.1, 1);
    const fly = el('div', null, 'يطير!', sc, { position: 'absolute', left: '50%', top: '760px', fontWeight: 1000, fontSize: '150px', color: '#fff', opacity: 0 }); gsap.set(fly, { xPercent: -50 });
    pop(fly, W(1, 6) + 0.15, -4, null);
  }

  // ═══ ٢ · «ده أنا قايله من بدري!» ═══
  { const sc = scene(LN[2].t0 - 0.25, LN[3].t0 - 0.25);
    const me = ico(sc, 'fa-solid fa-user', 445, 820, 190, '#fff', 'var(--blue-700)'); pop(me, LN[2].t0 - 0.1, 0, 'pop', 0.6);
    const q = ico(sc, 'fa-solid fa-question', 610, 760, 90, 'var(--sky-400)', '#fff'); pop(q, W(2, 1), 12, 'pop', 0.5);
    const b = el('div', 'bubble', '«ده أنا قايلّه من بدري!»', sc, { left: '50%', top: '470px', fontSize: '68px' }); gsap.set(b, { xPercent: -50 });
    pop(b, W(2, 2) - 0.1, -2, 'pop', 0.8);
    const clk = chip(sc, '<i class="fa-solid fa-clock"></i>من بدري', 'sticky', 0, 330); center(clk, 330); pop(clk, W(2, 5) - 0.05, 4, 'slap', 0.6);
  }

  // ═══ ٣ · المشكلة في لحظة القفل ═══
  { const sc = scene(LN[3].t0 - 0.25, LN[4].t0 - 0.25);
    const tb = tablet(sc, 290, 360, 500);
    tl.fromTo(tb, { opacity: 0, y: 200 }, { opacity: 1, y: 0, rotation: -2, duration: 0.45, ease: 'power3.out' }, W(3, 0) - 0.1); fx('whoosh', W(3, 0) - 0.1, 0.6);
    const no = el('div', 'chip white', '<i class="fa-solid fa-xmark" style="color:#E5484D"></i>مش هو', sc, { left: '0', top: '640px', fontSize: '50px', zIndex: 3 }); center(no, 640);
    pop(no, W(3, 3) - 0.05, -4, 'marker', 0.8);
    const sw = W(3, 4) - 0.15;
    tl.to([tb, no], { x: -260, scale: 0.55, opacity: 0.4, duration: 0.5, ease: 'power3.inOut' }, sw); fx('swish', sw, 0.7);
    const pw = ico(sc, 'fa-solid fa-power-off', 600, 420, 300, '#fff', '#E5484D');
    tl.fromTo(pw, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' }, W(3, 6) - 0.15); fx('pop', W(3, 6) - 0.1, 0.8);
    tl.to(pw, { boxShadow: '0 0 0 26px rgba(245,230,163,.45), 0 0 90px rgba(245,230,163,.8)', duration: 0.35, yoyo: true, repeat: 1 }, W(3, 7));
    const st = sticky(sc, 'لحظة القفل', 480, 790, 480, 64, W(3, 7) - 0.05, 4); fx('impact', W(3, 7) + 0.1, 0.6);
  }

  // ═══ ٤ · مندمج… وجردل مية ═══
  { const sc = scene(LN[4].t0 - 0.25, LN[5].t0 - 0.25);
    const kid = ico(sc, 'fa-solid fa-child', 160, 900, 230, '#fff', 'var(--blue-700)'); pop(kid, W(4, 0) - 0.1, 0, 'pop', 0.7);
    [[380, 860, 40], [440, 790, 58]].forEach(([x, y, s], j) => { const d = el('div', null, null, sc, { position: 'absolute', left: px(x), top: px(y), width: px(s), height: px(s), borderRadius: '50%', background: '#fff', opacity: 0 }); pop(d, W(4, 2) + j * 0.12, 0, null); });
    const cloud = el('div', null, '<i class="fa-solid fa-gamepad"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-rocket"></i><i class="fa-solid fa-star"></i>', sc, { position: 'absolute', left: '330px', top: '330px', width: '640px', height: '420px', borderRadius: '210px', background: '#fff', boxShadow: 'var(--shadow-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '34px', color: 'var(--blue-700)', fontSize: '96px', opacity: 0 });
    cloud.querySelectorAll('.fa-star').forEach(s => { s.style.color = '#F5B700'; s.style.fontSize = '60px'; });
    tl.fromTo(cloud, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.6)' }, W(4, 2) + 0.15); fx('rise', W(4, 2), 0.5);
    tl.to(cloud, { y: -14, duration: 0.5, yoyo: true, repeat: 5, ease: 'sine.inOut' }, W(4, 2) + 0.7);
    const room = chip(sc, '<i class="fa-solid fa-house"></i>الأوضة', 'ghost', 640, 900); pop(room, W(4, 6) - 0.1, 3, null);
    tl.to(room, { opacity: 0.25, duration: 0.3 }, W(4, 7));
    // الجردل
    const bk = el('div', null, '<i class="fa-solid fa-bucket"></i>', sc, { position: 'absolute', left: '560px', top: '160px', fontSize: '170px', color: 'var(--sky-400)', opacity: 0, transformOrigin: '50% 80%', zIndex: 4, filter: 'drop-shadow(0 12px 18px rgba(0,0,0,.3))' });
    tl.fromTo(bk, { opacity: 0, y: -300 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, W(4, 9) - 0.3);
    tl.to(bk, { rotation: -130, duration: 0.3, ease: 'power2.in' }, W(4, 12) - 0.25); fx('whoosh', W(4, 12) - 0.25, 0.8);
    for (let j = 0; j < 14; j++) {
      const d = el('i', 'fa-solid fa-droplet', null, sc, { position: 'absolute', left: px(380 + (j * 47) % 520), top: '300px', fontSize: px(44 + (j % 3) * 14), color: '#9ADCFF', opacity: 0, zIndex: 5 });
      tl.fromTo(d, { opacity: 1, y: 0 }, { y: 520 + (j % 4) * 60, opacity: 0, duration: 0.7, ease: 'power2.in', immediateRender: false }, W(4, 12) + j * 0.03);
    }
    tl.to(cloud, { scale: 1.25, opacity: 0, duration: 0.3, ease: 'power2.out' }, W(4, 14)); fx('slap', W(4, 14), 1); fx('impact', W(4, 15), 0.7);
    tl.fromTo('#flash', { opacity: 0.25 }, { opacity: 0, duration: 0.25, immediateRender: false }, W(4, 14));
    tl.to(kid, { rotation: -12, x: -20, duration: 0.08, yoyo: true, repeat: 5 }, W(4, 14));
    const wow = el('div', 'bubble', 'إيه ده؟!', sc, { left: '120px', top: '700px', fontSize: '60px' }); pop(wow, W(4, 15) + 0.2, -5, 'pop', 0.6);
  }

  // ═══ ٥ · مش تقفل أسرع… تجهّزه للقفلة ═══
  { const sc = scene(LN[5].t0 - 0.25, LN[6].t0 - 0.25);
    const fast = cchip(sc, '<i class="fa-solid fa-forward-fast"></i>تقفل أسرع', 'white', 470, W(5, 3) - 0.15, -2, 'pop', 66);
    const sl = el('div', 'strike', null, fast, { left: '-20px', right: '-20px', top: '50%', marginTop: '-9px' });
    tl.fromTo(sl, { scaleX: 0, rotation: -5 }, { scaleX: 1, rotation: -5, duration: 0.25 }, W(5, 4) + 0.15); fx('marker', W(5, 4) + 0.15, 1);
    tl.to(fast, { opacity: 0.4, y: -60, scale: 0.8, duration: 0.4 }, W(5, 5) - 0.1);
    const st = sticky(sc, '<i class="fa-solid fa-route" style="margin-left:18px;color:var(--blue-700)"></i>تجهّزه للقفلة', 170, 690, 740, 78, W(5, 7) - 0.1, -3);
    const road = el('div', null, '<i></i>', sc, { position: 'absolute', left: '200px', right: '200px', top: '960px', height: '22px', borderRadius: '11px', background: 'rgba(255,255,255,.25)', overflow: 'hidden', opacity: 0 });
    Object.assign(road.firstChild.style, { display: 'block', height: '100%', background: 'var(--sticky)', borderRadius: '11px', transformOrigin: '100% 50%' });
    tl.to(road, { opacity: 1, duration: 0.2 }, W(5, 8) - 0.1); tl.fromTo(road.firstChild, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }, W(5, 8)); fx('rise', W(5, 8) - 0.2, 0.5);
  }

  // ═══ ٦-٨ · الخطوات ═══
  const dots = el('div', null, '<i></i><i></i><i></i>', $('scenes'), { position: 'absolute', left: '50%', top: '1220px', display: 'flex', gap: '22px', opacity: 0 }); gsap.set(dots, { xPercent: -50 });
  dots.querySelectorAll('i').forEach(d => Object.assign(d.style, { width: '26px', height: '26px', borderRadius: '13px', background: 'rgba(255,255,255,.3)', display: 'block' }));
  tl.to(dots, { opacity: 1, duration: 0.3 }, LN[6].t0); tl.to(dots, { opacity: 0, duration: 0.3 }, LN[9].t0 - 0.25);
  const di = dots.querySelectorAll('i');
  [6, 7, 8].forEach((li, j) => { tl.to(di[j], { width: 70, background: '#F5E6A3', duration: 0.3 }, LN[li].t0); if (j) tl.to(di[j - 1], { width: 26, background: '#fff', duration: 0.3 }, LN[li].t0); });
  const step = (sc, n, title, t, h) => { const s = el('div', 'step', '<div class="n">' + AR(n) + '</div><h2>' + title + '</h2>', sc, { top: '330px', height: px(h) });
    tl.fromTo(s, { opacity: 0, x: -900, rotation: -8 }, { opacity: 1, x: 0, rotation: n === 2 ? 1.5 : -1.5, duration: 0.55, ease: 'power3.out' }, t); fx('whoosh', t, 0.9); return s; };
  const leave = (sc, t) => tl.to(sc.querySelector('.step'), { x: 900, rotation: 8, duration: 0.45, ease: 'power3.in' }, t);
  const row = (s, html, y) => el('div', null, html, s, { position: 'absolute', right: '56px', left: '56px', top: px(y), display: 'flex', alignItems: 'center', gap: '22px', fontSize: '46px', fontWeight: 900, opacity: 0 });

  { // ١ · اتفقوا قبل ما يفتح
    const sc = scene(LN[6].t0 - 0.25, LN[7].t0 + 0.2); const s = step(sc, 1, 'اتفقوا قبل ما يفتح', LN[6].t0 - 0.2, 680); leave(sc, LN[7].t0 - 0.35);
    const r1 = row(s, '<span style="width:64px;height:64px;border-radius:50%;background:#E4F7EE;color:#1FA971;display:flex;align-items:center;justify-content:center;font-size:34px"><i class="fa-solid fa-check"></i></span>قبل ما يفتح', 200);
    const r2 = row(s, '<span style="width:64px;height:64px;border-radius:50%;background:#FDECEC;color:#E5484D;display:flex;align-items:center;justify-content:center;font-size:34px"><i class="fa-solid fa-xmark"></i></span><span style="color:var(--ink-2)">مش في نص اللعبة</span>', 300);
    tl.fromTo(r1, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.3 }, W(6, 2) - 0.1); fx('pop', W(6, 2), 0.6);
    tl.fromTo(r2, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.3 }, W(6, 5) - 0.1); fx('pop', W(6, 5), 0.6);
    const deal = el('div', null, '<i class="fa-solid fa-stopwatch" style="color:var(--sky-400);margin-left:16px"></i>«هتلعب لحد ما التايمر يرن»', s, { position: 'absolute', left: '40px', right: '40px', top: '430px', padding: '26px 30px', borderRadius: '28px', background: '#FFFDF3', border: '4px dashed #E9D98A', fontSize: '42px', fontWeight: 900, textAlign: 'center', opacity: 0 });
    tl.fromTo(deal, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.35 }, W(6, 10) - 0.1); fx('swish', W(6, 10) - 0.1, 0.6);
    const ok = chip(s, '<i class="fa-solid fa-handshake"></i>اتفقنا', 'sticky', 0, 590); ok.style.left = '50%'; gsap.set(ok, { xPercent: -50 }); ok.style.fontSize = '44px';
    pop(ok, W(6, 15) - 0.05, -3, 'slap', 0.9);
  }
  { // ٢ · نبّهه بدري
    const sc = scene(LN[7].t0 - 0.35, LN[8].t0 + 0.2); const s = step(sc, 2, 'نبّهه بدري', LN[7].t0 - 0.3, 680); leave(sc, LN[8].t0 - 0.35);
    const bell = el('div', null, '<i class="fa-solid fa-bell"></i>', s, { position: 'absolute', left: '60px', top: '50px', fontSize: '90px', color: 'var(--sky-400)', transformOrigin: '50% 10%' });
    tl.to(bell, { rotation: 18, duration: 0.08, yoyo: true, repeat: 7 }, W(7, 3));
    tl.to(bell, { rotation: -18, duration: 0.08, yoyo: true, repeat: 5 }, W(7, 6));
    const n1 = row(s, '<span style="padding:12px 28px;border-radius:24px;background:#EEF5FD;display:flex;gap:16px;align-items:center"><i class="fa-solid fa-bell" style="color:var(--sky-400)"></i>فاضل ١٠ دقايق</span>', 200);
    const n2 = row(s, '<span style="padding:12px 28px;border-radius:24px;background:#FFF4E0;display:flex;gap:16px;align-items:center"><i class="fa-solid fa-bell" style="color:#F5A623"></i>فاضل ٥</span>', 310);
    tl.fromTo(n1, { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.35, ease: 'back.out(2)' }, W(7, 3) - 0.1); fx('pop', W(7, 3), 0.8);
    tl.fromTo(n2, { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.35, ease: 'back.out(2)' }, W(7, 6) - 0.1); fx('pop', W(7, 6), 0.8);
    const lv = el('div', null, '<div style="display:flex;justify-content:space-between;font-size:38px;font-weight:900;margin-bottom:14px;direction:ltr"><span>LEVEL 7</span><span class="pc">60%</span></div><div style="height:30px;border-radius:15px;background:#E3EEFB;overflow:hidden"><i style="display:block;height:100%;width:100%;background:linear-gradient(90deg,#18B1FE,#1FA971);border-radius:15px;transform-origin:0 50%"></i></div>', s, { position: 'absolute', left: '60px', right: '60px', top: '440px', opacity: 0 });
    const fill = lv.querySelector('i'), pc = lv.querySelector('.pc');
    tl.to(lv, { opacity: 1, duration: 0.3 }, W(7, 8) - 0.1);
    tl.fromTo(fill, { scaleX: 0.6 }, { scaleX: 1, duration: 0.9, ease: 'power1.inOut' }, W(7, 9));
    dyn(t => { const p = 60 + 40 * lerp(t, W(7, 9), W(7, 9) + 0.9); pc.textContent = p >= 100 ? 'DONE ✓' : Math.round(p) + '%'; });
    const done = chip(s, '<i class="fa-solid fa-flag-checkered"></i>خلّص الليفل… واقفل', 'sticky', 0, 580); done.style.left = '50%'; gsap.set(done, { xPercent: -50 }); done.style.fontSize = '42px';
    pop(done, W(7, 12) + 0.1, -2, 'slap', 0.8);
  }
  { // ٣ · يقفل بإيده
    const sc = scene(LN[8].t0 - 0.35, LN[9].t0 - 0.2); const s = step(sc, 3, 'خلّيه هو اللي يقفل', LN[8].t0 - 0.3, 680);
    const pw = el('div', 'icon-c', '<i class="fa-solid fa-power-off"></i>', s, { left: '330px', top: '200px', width: '200px', height: '200px', background: '#EEF5FD', color: 'var(--blue-700)', fontSize: '96px', boxShadow: 'none', opacity: 1 });
    const hand = el('i', 'fa-solid fa-hand-pointer', null, s, { position: 'absolute', left: '430px', top: '330px', fontSize: '110px', color: 'var(--ink)', opacity: 0 });
    tl.fromTo(hand, { opacity: 0, x: 160, y: 140 }, { opacity: 1, x: 0, y: 0, duration: 0.45, ease: 'power3.out' }, W(8, 3) - 0.3);
    tl.to(hand, { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1 }, W(8, 4) + 0.05); fx('pop', W(8, 4) + 0.1, 0.9);
    tl.to(pw, { background: '#1FA971', color: '#fff', duration: 0.2 }, W(8, 4) + 0.1);
    const own = chip(s, 'بإيده هو', 'ink', 0, 480); own.style.left = '50%'; gsap.set(own, { xPercent: -50 }); own.style.fontSize = '40px';
    pop(own, W(8, 5) - 0.05, 0, null);
    const tg = W(8, 6) - 0.15;
    tl.to([pw, hand, own], { opacity: 0, y: -40, duration: 0.3 }, tg);
    const juice = el('div', null, '<i class="fa-solid fa-glass-water"></i>', s, { position: 'absolute', left: '50%', top: '190px', width: '260px', marginLeft: '-130px', textAlign: 'center', fontSize: '210px', color: '#F5A623', opacity: 0 });
    tl.fromTo(juice, { opacity: 0, scale: 0.3, y: 80 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(2)' }, W(8, 8) - 0.1); fx('pop', W(8, 8), 0.9);
    const nice = chip(s, '<i class="fa-solid fa-heart"></i>حاجة حلوة مستنياه', 'sticky', 0, 520); nice.style.left = '50%'; gsap.set(nice, { xPercent: -50 }); nice.style.fontSize = '42px';
    pop(nice, W(8, 10) - 0.1, -2, 'slap', 0.7);
    tl.to(juice, { y: -12, duration: 0.4, yoyo: true, repeat: 3, ease: 'sine.inOut' }, W(8, 13));
  }

  // ═══ ٩ · الخلاصة ═══
  { const sc = scene(LN[9].t0 - 0.2, LN[10].t0 - 0.2);
    const card = (y, ic, icBg, a, b, t1, t2) => {
      const c = el('div', 'card', '<div style="display:flex;align-items:center;gap:26px"><span style="width:120px;height:120px;border-radius:34px;display:flex;align-items:center;justify-content:center;font-size:62px;flex-shrink:0;' + icBg + '"><i class="fa-solid ' + ic + '"></i></span><div><div style="font-size:42px;font-weight:800;color:var(--ink-2)">' + a + '</div><div class="r" style="font-size:72px;font-weight:1000;line-height:1.15">' + b + '</div></div></div>', sc, { left: '110px', right: '110px', top: px(y), padding: '36px 44px' });
      tl.fromTo(c, { opacity: 0, x: -500 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, t1); fx('whoosh', t1, 0.7);
      const r = c.querySelector('.r'); tl.fromTo(r, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2.2)' }, t2); return c;
    };
    const c1 = card(420, 'fa-bolt', 'background:#FDECEC;color:#E5484D', 'القفلة المفاجئة', '<span style="color:#E5484D">خناقة</span>', W(9, 0) - 0.2, W(9, 3) - 0.1);
    fx('slap', W(9, 3), 0.8);
    tl.to(c1, { opacity: 0.55, scale: 0.94, duration: 0.3 }, W(9, 4) - 0.1);
    const c2 = card(760, 'fa-circle-check', 'background:#E4F7EE;color:#1FA971', 'القفلة اللي مستنيها', '<span style="color:#1FA971">بتعدّي</span>', W(9, 4) - 0.2, W(9, 7) - 0.1);
    fx('impact', W(9, 7), 0.6);
    tl.to(c2, { boxShadow: '0 0 0 10px rgba(31,169,113,.5), 0 18px 40px rgba(4,30,80,.35)', duration: 0.3 }, W(9, 7) + 0.1);
  }

  // ═══ ١٠ · دليل اتزان ═══
  { const sc = scene(LN[10].t0 - 0.2, LN[10].next + 0.05); sc.style.perspective = '1800px';
    const bk = el('div', null, '<img src="assets/booklet.png" style="width:100%;display:block;border-radius:6px 14px 14px 6px">', sc, { position: 'absolute', left: '320px', top: '300px', width: '440px', boxShadow: '0 50px 90px rgba(3,20,60,.55)', borderRadius: '6px 14px 14px 6px', opacity: 0 });
    tl.fromTo(bk, { opacity: 0, rotationY: -70, scale: 0.6, y: 120 }, { opacity: 1, rotationY: -16, rotationX: 4, scale: 1, y: 0, duration: 0.9, ease: 'power3.out' }, W(10, 1) - 0.1); fx('whoosh', W(10, 1) - 0.1, 0.8);
    tl.to(bk, { rotationY: -8, y: -12, duration: 2.5, ease: 'sine.inOut' }, W(10, 1) + 0.8);
    const C = [['fa-brain', 'فهم العقل', W(10, 4)], ['fa-hourglass-start', 'ليه البداية صعبة', W(10, 5) + 0.05], ['fa-lightbulb', 'حلول عملية', W(10, 6)], ['fa-house', 'البيت والمدرسة', W(10, 7)]];
    const P = [[40, 400], [630, 470], [40, 760], [650, 820]];
    C.forEach(([ic, t, at], j) => { const c = chip(sc, '<i class="fa-solid ' + ic + '"></i>' + t, 'white', P[j][0], P[j][1]); c.style.fontSize = '38px'; pop(c, at - 0.1, [-4, 3, 4, -3][j], 'pop', 0.5); });
    const sb = cchip(sc, '<i class="fa-solid fa-list-ol"></i>خطوة بخطوة', 'sticky', 1000, W(10, 10) - 0.1, -2, 'slap', 46);
    const nm = cchip(sc, 'دليل اتزان', 'ink', 1130, W(10, 14) - 0.1, 0, 'pop', 50);
  }
} };
