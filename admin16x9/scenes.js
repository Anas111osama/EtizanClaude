// لكل جملة (بنفس ترتيب script.js): الشاشة، والجزء المعلَّم، ومين عنده الأداة دي.
// mode: intro | win (شاشة الكمبيوتر) | split (شاشتين جنب بعض) | phone (موبايل العضو جنب الشاشة) | legend | outro
// then: [[رقم الكلمة, {shot?, focus?, phone?, pfocus?}]] — chips: [[رقم الكلمة, النص, أيقونة]]
// scope: all | centers | behavior | school_behavior | manager | staff
window.SCENES = [
  /* ١ المقدمة */
  { mode: 'intro', step: 0 },
  { mode: 'intro', step: 1, cards: [[8, 'المدارس', 'fa-school'], [10, 'مراكز التخاطب', 'fa-comments'], [13, 'مراكز تعديل السلوك', 'fa-hands-holding-child']] },
  { mode: 'intro', step: 2, phoneAt: 5, winAt: 12 },
  /* ٢ لوحة واحدة بلغة مؤسستكم */
  { mode: 'win', head: ['لوحة واحدة', 'بلغة مؤسستكم'], shot: 'today' },
  { mode: 'split', left: ['m_plan', 'planTab', 'مدرسة', 'fa-school'], right: ['m_plan_center', 'planTab', 'مركز تخاطب', 'fa-comments'],
    lchips: [[3, '«الطالب»'], [4, '«الفصل»'], [5, '«خطة الدعم»']], rchips: [[10, '«الطفل»'], [11, '«المجموعة»'], [12, '«الخطة العلاجية»']] },
  { mode: 'win', shot: 'm_sessions', focus: 'tabs', scope: 'centers', then: [[15, { shot: 'm_behavior_abc', focus: 'tabs', scope: 'behavior' }]],
    chips: [[6, 'سجل الجلسات', 'fa-calendar-check'], [8, 'التمارين المنزلية', 'fa-house-circle-check'], [16, 'مواقف السلوك', 'fa-list-check']] },
  { mode: 'legend', shot: 'today', items: [[1, 'عند الكل', 'fa-circle-check'], [3, 'المدارس', 'fa-school'], [5, 'المراكز', 'fa-comments']] },
  /* ٣ الانضمام */
  { mode: 'win', head: ['الانضمام', 'كودين… للأطفال وللكبار'], scope: 'all', shot: 'today', focus: null, then: [[4, { focus: 'codes' }]] },
  { mode: 'win', shot: 'today', focus: 'codes', chips: [[4, 'كود الأطفال', 'fa-child-reaching'], [7, 'كود الكبار', 'fa-user']] },
  { mode: 'win', shot: 'today', focus: 'codes' },
  { mode: 'win', shot: 'requests', focus: 'join' },
  /* ٤ الدخول */
  { mode: 'win', head: ['الدخول', 'بالإيميل… من المتصفح'], scope: 'staff_manager', shot: 'login', focus: 'card' },
  /* ٥ النهارده */
  { mode: 'win', head: ['شاشة الأخصائي', '«النهارده»'], scope: 'all', shot: 'today', focus: null },
  { mode: 'win', shot: 'today', focus: 'kpis' },
  { mode: 'win', shot: 'today', focus: 'queue' },
  { mode: 'win', shot: 'today', focus: 'queue' },
  { mode: 'win', shot: 'today', focus: 'queue' },
  /* ٦ قايمة الأعضاء */
  { mode: 'win', head: ['قايمة الأعضاء', 'الأهم… الأول'], shot: 'members', focus: 'rows' },
  { mode: 'win', shot: 'members', focus: 'seen', then: [[8, { focus: 'week' }]] },
  { mode: 'win', shot: 'members_sel', focus: 'bulk' },
  /* ٧ ملف العضو */
  { mode: 'win', head: ['ملف العضو', 'كل حاجة في مكان واحد'], shot: 'm_overview', focus: 'hero' },
  { mode: 'win', shot: 'm_overview', focus: 'tabs', then: [[9, { focus: 'usage' }]] },
  { mode: 'win', shot: 'm_progress', focus: 'charts' },
  /* ٨ الخطة */
  { mode: 'win', head: ['الخطة الفردية', 'أهداف ليها قياس'], scope: 'all', shot: 'm_plan', focus: 'planTab' },
  { mode: 'win', shot: 'm_plan', focus: 'goals' },
  { mode: 'win', shot: 'goal_sheet', focus: 'sheet' },
  /* ٩ الجلسات */
  { mode: 'win', head: ['سجل الجلسات', 'جلسة في ٣٠ ثانية'], scope: 'centers', shot: 'session_sheet', focus: 'sheet' },
  { mode: 'phone', shot: 'session_sheet', phone: 'org_kid_home', pfocus: 'tasks' },
  /* ١٠ المهام */
  { mode: 'win', head: ['المهام', 'توصل لحد الرئيسية'], scope: 'all', shot: 'task_sheet', focus: 'sheet', then: [[7, { phone: 'org_adult_home', pfocus: 'tasks' }]] },
  { mode: 'phone', shot: 'task_sheet', phone: 'org_kid_home', pfocus: 'tasks' },
  /* ١١ السلوك */
  { mode: 'win', head: ['كارت السلوك', '٣ سلوكيات كل يوم'], scope: 'school_behavior', shot: 'm_behavior', focus: 'card' },
  { mode: 'win', shot: 'm_behavior', focus: 'card', then: [[10, { phone: 'org_adult_home', pfocus: 'behavior' }]] },
  { mode: 'win', head: ['مواقف السلوك', 'قبل… السلوك… بعد'], scope: 'behavior', shot: 'abc_sheet', focus: 'sheet' },
  { mode: 'win', shot: 'm_behavior_abc', focus: 'card' },
  /* ١٢ زانتو */
  { mode: 'win', head: ['رسالة مع زانتو', 'كلمة منكم… توصله'], scope: 'all', shot: 'zanto_sheet', focus: 'sheet' },
  { mode: 'phone', shot: 'zanto_sheet', phone: 'org_kid_home', pfocus: 'bird', then: [[8, { phone: 'org_adult_home', pfocus: 'msg' }]] },
  /* ١٣ التقرير */
  { mode: 'win', head: ['التقرير الشهري', 'صورة لولي الأمر'], scope: 'all', shot: 'm_reports', focus: 'card' },
  { mode: 'win', shot: 'm_notes', focus: 'card', chips: [[1, 'الملاحظات', 'fa-lock'], [2, 'ملخص الجلسات', 'fa-lock'], [4, 'مواقف السلوك', 'fa-lock']] },
  /* ١٤ الخصوصية */
  { mode: 'win', head: ['الخصوصية', 'أرقام… مش محتوى'], scope: 'all', shot: 'm_progress', focus: 'charts', chips: [[4, 'أرقام', 'fa-chart-simple']] },
  { mode: 'phone', shot: 'm_progress', phone: 'org_adult_home', pfocus: null, chips: [[0, 'تفريغ الأفكار', 'fa-lock'], [2, 'الملاحظات الشخصية', 'fa-lock']] },
  /* ١٥ الإدارة */
  { mode: 'win', head: ['لوحة الإدارة', 'الصورة الكاملة'], scope: 'manager', shot: 'mg_summary', focus: null },
  { mode: 'win', shot: 'mg_summary', focus: 'kpis', then: [[9, { focus: 'charts' }]] },
  { mode: 'win', shot: 'mg_requests', focus: 'join' },
  { mode: 'win', shot: 'mg_roster', focus: 'table' },
  { mode: 'win', shot: 'mg_team', focus: 'cards', then: [[7, { shot: 'mg_report', focus: 'paper' }]] },
  { mode: 'win', shot: 'mg_roster', focus: null, chips: [[6, 'مقفول في قاعدة البيانات', 'fa-database']] },
  /* ١٦ المساعدة */
  { mode: 'win', head: ['مش واضح؟', 'زرار «i» جنب كل قسم'], scope: 'all', shot: 'today', focus: 'ibtn', then: [[8, { shot: 'info', focus: 'box' }], [11, { shot: 'guide', focus: 'box' }]] },
  /* ١٧ الختام */
  { mode: 'outro', step: 0 },
  { mode: 'outro', step: 1 },
  { mode: 'outro', step: 2 },
];
