// محتوى البوستات (1080×1350) — كاروسيل لكل حلقة + جمل + بوستات الكتيّب/الجلسات/التطبيق
const A = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
const I = (ic, bg, col) => '<span class="ico" style="background:' + bg + ';color:' + col + '"><i class="fa-solid ' + ic + '"></i></span>';
const chip = (html, cls = 'white', st = '') => '<span class="chip ' + cls + '" style="' + st + '">' + html + '</span>';
// غلاف كاروسيل
const cover = (title, sub, art) => '<div class="c" style="top:210px">' + art + '</div><div class="c" style="top:660px"><h1 style="font-size:80px">' + title + '</h1><p class="lead" style="margin-top:26px">' + sub + '</p></div>';
// صفحة خطوة
const step = (n, title, body) => '<div class="c" style="top:200px"><div class="row" style="gap:34px"><div class="num">' + A(n) + '</div><h2>' + title + '</h2></div></div><div class="c card" style="top:430px;padding:54px 56px">' + body + '</div>';
const li = (ic, txt, ok) => '<div class="row" style="padding:14px 0;border-top:3px dashed #DCE7F5;font-size:42px;font-weight:900">' + I(ic, '#EEF5FD', 'var(--blue-700)').replace('class="ico"', 'class="ico" style="width:88px;height:88px;font-size:44px;border-radius:26px;"').replace('" style="background', ';background') + '<span style="flex:1">' + txt + '</span>' + (ok === true ? '<i class="fa-solid fa-circle-check" style="color:var(--green);font-size:54px"></i>' : ok === false ? '<i class="fa-solid fa-circle-xmark" style="color:var(--red);font-size:54px"></i>' : '') + '</div>';
const quote = t => '<div style="font-size:44px;font-weight:900;line-height:1.5;background:#FFFDF3;border:4px dashed #E9D98A;border-radius:30px;padding:30px 36px;text-align:center">«' + t + '»</div>';
// صفحة النهاية
const close = (line1, line2, extra) => '<div class="c" style="top:300px;text-align:center"><div class="q">”</div><h1 style="font-size:84px">' + line1 + '</h1><h1 style="font-size:96px;margin-top:10px" class="y">' + line2 + '</h1>' + (extra || '') + '</div>';

window.POSTS = [
  // ═══════ بوستات جملة واحدة ═══════
  { id: 'q1', kicker: 'اللي محدش بيقولهولك', html: close('مش هنغيّر عقله…', 'هنغيّر شكل المهمة', '<p class="lead" style="margin-top:80px;opacity:.85">ابنك مش كسلان… المهمة بس مش معمولة لعقله.</p>') },
  { id: 'q2', kicker: 'اللي محدش بيقولهولك', html: close('القفلة المفاجئة بتعمل خناقة…', 'والقفلة اللي مستنيها بتعدّي', '<p class="lead" style="margin-top:80px;opacity:.85">نبّهه بدري… وخلّيه هو اللي يقفل.</p>') },
  { id: 'q3', kicker: 'اللي محدش بيقولهولك', html: close('الصبح الهادي…', 'بيبدأ من بالليل', '<p class="lead" style="margin-top:80px;opacity:.85">الشنطة واللبس جاهزين قبل ما ينام… ونص الخناقة اتحلّت.</p>') },

  { id: 'q4', kicker: 'اللي محدش بيقولهولك', html: close('هو مش بيعاندك…', 'هو مش حاسس بالوقت', '<p class="lead" style="margin-top:80px;opacity:.85">خلّي الوقت يتشاف: تايمر قدام عينه… بدل ما يسمعه منك.</p>') },
  { id: 'q5', kicker: 'اللي محدش بيقولهولك', html: close('وقت العصبية مش وقت النصيحة…', 'النصيحة بعد ما يهدى', '<p class="lead" style="margin-top:80px;opacity:.85">دلوقتي: اقعد جنبه وهدّي صوتك… والكلام بعدين.</p>') },
  { id: 'q6', kicker: 'اللي محدش بيقولهولك', html: close('طلب واحد في المرة…', 'مش خمسة في جملة واحدة', '<div class="row" style="justify-content:center;gap:22px;margin-top:70px">' + chip('«البس الشراب»') + '<i class="fa-solid fa-arrow-left-long" style="font-size:54px"></i>' + chip('«هات الشنطة»') + '</div>') },
  // ═══════ الكتيّب / الجلسات / التطبيق ═══════
  { id: 'p_booklet', kicker: 'دليل اتزان المتكامل', html: '<div class="c" style="top:190px;text-align:center"><h2>كل اللي محتاج تفهمه عن عقل ابنك…<br><span class="y">في مكان واحد</span></h2></div>' +
    '<div style="position:absolute;left:330px;top:450px;width:420px;transform:perspective(1600px) rotateY(-14deg) rotate(-2deg);box-shadow:0 50px 90px rgba(3,20,60,.55);border-radius:6px 14px 14px 6px;overflow:hidden"><img src="assets/booklet.png" style="width:100%;display:block"></div>' +
    '<div style="position:absolute;top:500px;left:40px;display:flex;flex-direction:column;gap:26px;align-items:flex-start">' + chip('<i class="fa-solid fa-brain"></i>فهم العقل', 'white', 'font-size:34px;transform:rotate(-4deg)') + chip('<i class="fa-solid fa-lightbulb"></i>حلول عملية', 'white', 'font-size:34px;transform:rotate(3deg)') + '</div>' +
    '<div style="position:absolute;top:760px;right:30px;display:flex;flex-direction:column;gap:26px;align-items:flex-end">' + chip('<i class="fa-solid fa-hourglass-start"></i>ليه البداية صعبة', 'white', 'font-size:34px;transform:rotate(4deg)') + chip('<i class="fa-solid fa-house"></i>البيت والمدرسة', 'white', 'font-size:34px;transform:rotate(-3deg)') + '</div>' +
    '<div class="c" style="top:1090px;text-align:center">' + chip('<i class="fa-solid fa-file-pdf"></i>PDF يوصلك على موبايلك', 'sticky2', 'font-size:40px') + '</div>' },
  { id: 'p_sessions', kicker: 'جلسات اتزان', html: '<div class="c" style="top:200px;text-align:center"><h2>جلسة مع أخصائي من فريق اتزان…</h2><h1 style="font-size:84px" class="y">من بيتِك</h1></div>' +
    '<div class="c card" style="top:520px;padding:30px 50px">' + li('fa-brain', 'متخصصة في ADHD', true).replace('border-top:3px dashed #DCE7F5;', '') + li('fa-certificate', 'أخصائي «متحقَّق منه»', true) + li('fa-video', 'أونلاين في ميعادِك', true) + li('fa-lock', 'خاصة وسرّية', true) + '</div>' +
    '<div class="c" style="top:1120px;text-align:center">' + chip('<i class="fa-solid fa-calendar-check"></i>احجزي من التطبيق ← احجز جلسة', 'sticky2', 'font-size:38px') + '</div>' },
  { id: 'p_app', kicker: 'تطبيق اتزان', html: '<div class="c" style="top:190px"><h2 style="font-size:70px">أدوات بتخلّي يوم ابنك<br><span class="y">أهدى وأوضح</span></h2></div>' +
    '<div class="phone" style="left:60px;top:470px;transform:scale(.78) rotate(-5deg);transform-origin:50% 0"><div><img src="assets/screens/home.png"></div></div>' +
    '<div class="phone" style="left:430px;top:500px;transform:scale(.78) rotate(4deg);transform-origin:50% 0"><div><img src="assets/screens/table.png"></div></div>' +
    '<div style="position:absolute;top:480px;right:40px;display:flex;flex-direction:column;gap:22px;align-items:flex-end;z-index:4">' + chip('<i class="fa-solid fa-images"></i>جدول بالصور', 'sticky2', 'font-size:34px') + chip('<i class="fa-solid fa-stopwatch"></i>تايمر', 'sticky2', 'font-size:34px') + chip('<i class="fa-solid fa-gift"></i>مكافآت', 'sticky2', 'font-size:34px') + chip('<i class="fa-solid fa-gamepad"></i>ألعاب تركيز', 'sticky2', 'font-size:34px') + '</div>' +
    '<div class="c" style="top:1150px;text-align:center;z-index:4">' + chip('<i class="fa-solid fa-download"></i>نزّل اتزان النهارده', 'ink', 'font-size:42px') + '</div>' },
  { id: 'p_booklet2', kicker: 'دليل اتزان المتكامل', html: '<div class="c" style="top:200px;text-align:center"><h2>تعبت من النصايح المتبعترة؟</h2></div>' +
    '<div style="position:absolute;top:380px;left:60px;right:60px;height:360px">' +
      [['نصيحة من جروب', 30, 10, -6], ['فيديو ٣٠ ثانية', 560, 0, 5], ['بوست', 120, 130, 4], ['كومنت', 700, 140, -5], ['مقال مترجم', 330, 240, -3], ['رأي قريبة', 640, 270, 6]].map(([t, x, y, r]) => '<span class="chip ghost" style="position:absolute;left:' + x + 'px;top:' + y + 'px;transform:rotate(' + r + 'deg);font-size:38px;color:rgba(255,255,255,.8)"><span class="strike thin">' + t + '</span></span>').join('') + '</div>' +
    '<div style="position:absolute;left:380px;top:770px;width:320px;transform:perspective(1600px) rotateY(-14deg) rotate(-2deg);box-shadow:0 40px 80px rgba(3,20,60,.55);border-radius:6px 12px 12px 6px;overflow:hidden"><img src="assets/booklet.png" style="width:100%;display:block"></div>' +
    '<div style="position:absolute;top:900px;right:50px">' + chip('<i class="fa-solid fa-list-ol"></i>مترتّب خطوة بخطوة', 'sticky2', 'font-size:34px;transform:rotate(3deg)') + '</div>' +
    '<div style="position:absolute;top:1030px;left:40px">' + chip('<i class="fa-solid fa-circle-check"></i>مصدر واحد', 'white', 'font-size:34px;transform:rotate(-3deg)') + '</div>' },
  { id: 'p_sessions2', kicker: 'جلسات اتزان', html: '<div class="c" style="top:200px;text-align:center"><h2>هتطلعي من الجلسة بإيه؟</h2></div>' +
    '<div class="c card" style="top:400px;padding:30px 50px">' + li('fa-lightbulb', 'فهم أعمق لابنِك', true).replace('border-top:3px dashed #DCE7F5;', '') + li('fa-clipboard-list', 'خطة واضحة للبيت', true) + li('fa-mobile-screen', 'تكمّليها كل يوم في التطبيق', true) + '</div>' +
    '<div class="c" style="top:850px;text-align:center"><div class="sticky" style="display:inline-block;font-size:40px;transform:rotate(-2deg)">جلسة استشارية وتربوية… مش كشف ولا روشتة</div></div>' +
    '<div class="c" style="top:1120px;text-align:center">' + chip('<i class="fa-solid fa-calendar-check"></i>احجزي من التطبيق ← احجز جلسة', 'white', 'font-size:38px') + '</div>' },
  { id: 'p_adults', kicker: 'تطبيق اتزان · للكبار', html: '<div class="c" style="top:190px"><h2 style="font-size:66px">ولو إنت اللي عندك ADHD؟</h2><p class="lead" style="margin-top:12px">اتزان فيه مسار كامل للكبار من ١٠ سنين وطالع.</p></div>' +
    '<div class="phone" style="left:60px;top:500px;transform:scale(.76) rotate(-5deg);transform-origin:50% 0"><div><img src="assets/screens/adult_home.png"></div></div>' +
    '<div class="phone" style="left:430px;top:530px;transform:scale(.76) rotate(4deg);transform-origin:50% 0"><div><img src="assets/screens/adult_pomodoro.png"></div></div>' +
    '<div style="position:absolute;top:520px;right:40px;display:flex;flex-direction:column;gap:22px;align-items:flex-end;z-index:4">' + chip('<i class="fa-solid fa-stopwatch"></i>جلسات تركيز', 'sticky2', 'font-size:34px') + chip('<i class="fa-solid fa-calendar-days"></i>جدول يومك', 'sticky2', 'font-size:34px') + chip('<i class="fa-solid fa-robot"></i>مساعد ذكي', 'sticky2', 'font-size:34px') + chip('<i class="fa-solid fa-brain"></i>تمارين للمخ', 'sticky2', 'font-size:34px') + '</div>' +
    '<div class="c" style="top:1150px;text-align:center;z-index:4">' + chip('<i class="fa-solid fa-download"></i>نزّل اتزان النهارده', 'ink', 'font-size:42px') + '</div>' },
];
