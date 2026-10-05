// Supabase وهمي لاختبار شكل لوحة المؤسسة في المعاينة — مابيكلمش أي سيرفر.
// الفولدر .design مابيدخلش الـ APK.
const pad = n => String(n).padStart(2, '0');
const dk = (off = 0) => { const d = new Date(); d.setDate(d.getDate() + off); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const uid = () => 'm' + Math.random().toString(36).slice(2, 10);
const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));

const NAMES = [['عمر', 'خالد', 'kid', 'الفراشات', 7], ['ليلى', 'أحمد', 'kid', 'الفراشات', 9], ['يوسف', 'سامي', 'adult', 'الكبار', 14],
    ['مريم', 'علي', 'kid', 'النجوم', 6], ['آدم', 'حسن', 'kid', 'النجوم', 8], ['سلمى', 'محمود', 'adult', 'الكبار', 16],
    ['كريم', 'فتحي', 'kid', 'الفراشات', 5], ['نور', 'إبراهيم', 'kid', null, 10]];
//  توزيع الحالات: localStorage mock_caseload = '1'
const caseload = () => localStorage.getItem('mock_caseload') === '1';
const STAFF = [
    { id: 'staff1', first_name: 'سارة', last_name: 'محمود', email: 'sara@center.com' },
    { id: 'staff2', first_name: 'محمد', last_name: 'علي', email: 'mohamed@center.com' },
    { id: 'staff3', first_name: 'هبة', last_name: 'سمير', email: 'heba@center.com' }
];
const ASSIGN = { mem0: 'staff1', mem1: 'staff1', mem3: 'staff1', mem2: 'staff2', mem5: 'staff2', mem4: 'staff3' };
const db = { profiles: [], daily_snapshots: [], assigned_tasks: [], student_notes: [], member_goals: [], goal_ratings: [], org_sessions: [], behavior_logs: [], member_behavior_goals: [], help_requests: [], access_log: [] };
NAMES.forEach(([f, l, aud, g, age], i) => {
    const id = 'mem' + i;
    db.profiles.push({ id, first_name: f, last_name: l, email: f.length + 'user' + i + '@mail.com', group_name: g, org_audience: aud, status: 'active',
        created_at: new Date(Date.now() - 40 * 864e5).toISOString(), birthdate: `${new Date().getFullYear() - age}-03-10`,
        assigned_staff: ASSIGN[id] || null, assigned_at: ASSIGN[id] ? new Date(Date.now() - 10 * 864e5).toISOString() : null });
    const absentFrom = i === 1 ? 4 : i === 7 ? 99 : 0;
    for (let d = 29; d >= absentFrom; d--) {
        if (Math.random() < .25) continue;
        db.daily_snapshots.push({ student_id: id, snap_date: dk(-d), focus_minutes: rnd(0, 45), focus_sessions: rnd(0, 3), tasks_total: rnd(0, 5), tasks_done: rnd(0, 4),
            games_played: rnd(0, 4), attention_score: Math.random() < .5 ? rnd(55, 95) : null, calm_sessions: rnd(0, 2), practice_done: rnd(0, 6),
            behavior_score: aud === 'kid' && Math.random() < .6 ? rnd(30, 100) : null, behavior_ratings: aud === 'kid' ? { b1: rnd(0, 2), b2: rnd(0, 2) } : null, xp: 300 + i * 40, streak: rnd(0, 12) });
    }
    db.daily_snapshots.forEach(s => { if (s.tasks_done > s.tasks_total) s.tasks_done = s.tasks_total; });
});
db.profiles.push({ id: 'pend1', first_name: 'حمزة', last_name: 'رامي', email: 'hamza@mail.com', group_name: null, org_audience: 'kid', status: 'pending', created_at: new Date(Date.now() - 3600e3).toISOString(), birthdate: `${new Date().getFullYear() - 7}-01-01` });
db.profiles.push({ id: 'pend2', first_name: 'رنا', last_name: 'سعيد', email: 'rana@mail.com', group_name: null, org_audience: 'adult', status: 'pending', created_at: new Date(Date.now() - 7200e3).toISOString(), birthdate: `${new Date().getFullYear() - 30}-01-01` });
db.help_requests.push({ id: 'h1', student_id: 'mem2', message: 'مش عارف أعمل تمرين الصوت', status: 'open', created_at: new Date(Date.now() - 12 * 60e3).toISOString() });
db.assigned_tasks.push({ id: 't1', student_id: 'mem0', title: 'كرر صوت (ر) ١٠ مرات', kind: 'practice', reps_target: 10, reps_done: 4, status: 'pending', due_date: dk(0), created_at: new Date().toISOString(), note: 'قبل النوم' });
db.assigned_tasks.push({ id: 't2', student_id: 'mem0', title: 'رتّب شنطة المدرسة', kind: 'task', reps_target: null, reps_done: 0, status: 'pending', due_date: dk(-2), created_at: new Date().toISOString() });
db.assigned_tasks.push({ id: 't3', student_id: 'mem3', title: 'اقرا قصة', kind: 'task', status: 'pending', due_date: dk(-1), created_at: new Date().toISOString() });
db.member_goals.push({ id: 'g1', student_id: 'mem0', domain: 'speech', title: 'نطق صوت (ر) صح في أول الكلمة', baseline: 30, target: 90, criteria: '٨ من ١٠ في ٣ جلسات', status: 'active', created_at: new Date(Date.now() - 30 * 864e5).toISOString() });
db.member_goals.push({ id: 'g2', student_id: 'mem0', domain: 'language', title: 'يطلب حاجته بجملة من ٣ كلمات', baseline: 10, target: 80, status: 'active', created_at: new Date(Date.now() - 20 * 864e5).toISOString() });
db.member_goals.push({ id: 'g3', student_id: 'mem0', domain: 'attention', title: 'يكمّل نشاط ١٠ دقايق', baseline: 20, target: 75, status: 'achieved', achieved_at: new Date().toISOString(), created_at: new Date(Date.now() - 60 * 864e5).toISOString() });
[35, 45, 50, 62, 70, 80].forEach((v, i) => db.goal_ratings.push({ id: 100 + i, goal_id: 'g1', student_id: 'mem0', value: v, rated_on: dk(-25 + i * 5), created_at: new Date().toISOString() }));
[15, 30, 55].forEach((v, i) => db.goal_ratings.push({ id: 200 + i, goal_id: 'g2', student_id: 'mem0', value: v, rated_on: dk(-15 + i * 7), created_at: new Date().toISOString() }));
db.org_sessions.push({ id: 's1', student_id: 'mem0', session_date: dk(0), attendance: 'attended', duration_min: 45, kind: 'individual', summary: 'اشتغلنا على الراء — تحسن واضح', home_practice: '١٠ كلمات فيها راء', created_at: new Date().toISOString() });
db.org_sessions.push({ id: 's2', student_id: 'mem1', session_date: dk(0), attendance: 'absent', duration_min: null, kind: 'individual', created_at: new Date().toISOString() });
db.org_sessions.push({ id: 's3', student_id: 'mem0', session_date: dk(-3), attendance: 'attended', duration_min: 45, kind: 'individual', summary: 'ركّز أحسن بعد استراحة الحركة', created_at: new Date().toISOString() });
db.student_notes.push({ id: 'n1', student_id: 'mem0', body: 'بيتجاوب أحسن مع التعزيز بالملصقات.', kind: 'note', created_at: new Date(Date.now() - 2 * 864e5).toISOString() });
db.member_behavior_goals.push({ student_id: 'mem0', goals: [{ id: 'b1', title: 'سمع الكلام من أول مرة' }, { id: 'b2', title: 'نام في ميعاده' }] });
['طُلب منه يقفل اللعبة', 'طُلب منه يقفل اللعبة', 'تغيير النشاط'].forEach((a, i) => db.behavior_logs.push({ id: 'bl' + i, student_id: 'mem0', occurred_at: new Date(Date.now() - (i * 3 + 1) * 864e5).toISOString(), antecedent: a, behavior: 'صرخ ورمى القلم', consequence: 'اتساب يهدى', intensity: 2, setting: 'الجلسة' }));

//  زي etz_member_in_scope: الأخصائي في وضع التوزيع بيشوف حالاته + النشطين المش متوزعين
const inScope = p => role() !== 'admin' || !caseload() || p.assigned_staff === 'staff1' || (!p.assigned_staff && p.status === 'active');
const lastSeen = id => db.daily_snapshots.filter(s => s.student_id === id).map(s => s.snap_date).sort().pop() || null;

function overview(days) {
    const from = dk(-(days - 1));
    return db.profiles.filter(p => p.status !== 'rejected' && inScope(p)).map(p => {
        const sn = db.daily_snapshots.filter(s => s.student_id === p.id);
        const win = sn.filter(s => s.snap_date >= from);
        const sum = f => win.reduce((a, s) => a + (+s[f] || 0), 0);
        const last = sn.slice().sort((a, b) => b.snap_date.localeCompare(a.snap_date))[0];
        const series = f => Array.from({ length: days }, (_, i) => { const s = sn.find(x => x.snap_date === dk(i - days + 1)); return s ? (f(s)) : 0; });
        const beh = win.filter(s => s.behavior_score != null);
        return Object.assign({}, p, { last_seen: last ? last.snap_date : null, xp: last ? last.xp : 0, streak: last ? last.streak : 0, days_active: win.length,
            focus_minutes: sum('focus_minutes'), focus_sessions: sum('focus_sessions'), tasks_done: sum('tasks_done'), tasks_total: sum('tasks_total'),
            practice_done: sum('practice_done'), games_played: sum('games_played'), calm_sessions: sum('calm_sessions'),
            behavior_avg: beh.length ? Math.round(beh.reduce((a, s) => a + s.behavior_score, 0) / beh.length) : null, attention_avg: null,
            daily_focus: series(s => s.focus_minutes), daily_done: series(s => s.tasks_done + s.practice_done),
            open_help: db.help_requests.some(h => h.student_id === p.id && h.status === 'open'),
            pending_tasks: db.assigned_tasks.filter(t => t.student_id === p.id && t.status === 'pending').length,
            overdue_tasks: db.assigned_tasks.filter(t => t.student_id === p.id && t.status === 'pending' && t.due_date && t.due_date < dk(0)).length,
            active_goals: db.member_goals.filter(g => g.student_id === p.id && g.status === 'active').length,
            last_session: (db.org_sessions.filter(s => s.student_id === p.id && s.attendance === 'attended').map(s => s.session_date).sort().pop()) || null });
    });
}

function builder(table) {
    const st = { table, op: 'select', filters: [], order: [], limit: null };
    const rows = () => db[table] || (db[table] = []);
    const match = r => st.filters.every(([op, k, v]) => {
        const x = r[k];
        if (op === 'eq') return String(x) === String(v);
        if (op === 'in') return v.map(String).includes(String(x));
        if (op === 'gte') return x != null && x >= v;
        if (op === 'lte') return x != null && x <= v;
        if (op === 'neq') return String(x) !== String(v);
        return true;
    });
    const exec = () => {
        if (st.op === 'insert') {
            const list = (Array.isArray(st.payload) ? st.payload : [st.payload]).map(r => Object.assign({ id: uid(), created_at: new Date().toISOString() }, r));
            rows().push(...list);
            return { data: st.single ? list[0] : list, error: null };
        }
        if (st.op === 'upsert') {
            const r = st.payload; const key = (st.onConflict || 'id');
            const i = rows().findIndex(x => x[key] === r[key]);
            if (i >= 0) Object.assign(rows()[i], r); else rows().push(Object.assign({ id: uid() }, r));
            return { data: [r], error: null };
        }
        const hit = rows().filter(match);
        if (st.op === 'update') { hit.forEach(r => Object.assign(r, st.payload)); return { data: hit.map(r => ({ id: r.id })), error: null }; }
        if (st.op === 'delete') { db[table] = rows().filter(r => !match(r)); return { data: hit, error: null }; }
        let out = hit.slice();
        st.order.slice().reverse().forEach(([k, asc]) => out.sort((a, b) => String(a[k] ?? '').localeCompare(String(b[k] ?? '')) * (asc ? 1 : -1)));
        if (st.limit) out = out.slice(0, st.limit);
        return { data: st.single ? (out[0] || null) : out, error: null };
    };
    const b = {
        select() { return b; }, eq(k, v) { st.filters.push(['eq', k, v]); return b; }, neq(k, v) { st.filters.push(['neq', k, v]); return b; },
        in(k, v) { st.filters.push(['in', k, v]); return b; }, gte(k, v) { st.filters.push(['gte', k, v]); return b; }, lte(k, v) { st.filters.push(['lte', k, v]); return b; },
        not() { return b; }, order(k, o) { st.order.push([k, !o || o.ascending !== false]); return b; }, limit(n) { st.limit = n; return b; },
        insert(p) { st.op = 'insert'; st.payload = p; return b; }, update(p) { st.op = 'update'; st.payload = p; return b; },
        delete() { st.op = 'delete'; return b; }, upsert(p, o) { st.op = 'upsert'; st.payload = p; st.onConflict = o && o.onConflict; return b; },
        single() { st.single = true; return b; }, maybeSingle() { st.single = true; return b; },
        then(res, rej) { return new Promise(r => setTimeout(r, 120)).then(exec).then(res, rej); }
    };
    return b;
}

const role = () => localStorage.getItem('mock_role');
export const supabase = {
    from: builder,
    rpc: async (fn, args) => {
        await new Promise(r => setTimeout(r, 150));
        if (fn === 'org_staff_context') {
            if (!role()) return { data: { role: 'none' }, error: null };
            const act = db.profiles.filter(p => p.status === 'active');
            return { data: { role: role(), school_code: 'NOUR2026', caseload: caseload(), has_manager: true,
                me: { id: role() === 'manager' ? 'mgr1' : 'staff1', first_name: role() === 'manager' ? 'نادية' : 'سارة', last_name: role() === 'manager' ? 'فؤاد' : 'محمود', email: 'sara@center.com' },
                org: { name: 'مركز النور للتخاطب', type: localStorage.getItem('mock_type') || 'speech', terms: {}, features: {}, seat_limit: 80, expires_at: dk(10), is_active: true },
                codes: [{ code: 'NOUR-K7QXM', audience: 'kid', min_age: 4, max_age: 10 }, { code: 'NOUR2026', audience: 'adult', min_age: 11, max_age: 99 }],
                seats: { active: act.length, kids: act.filter(p => p.org_audience === 'kid').length, adults: act.filter(p => p.org_audience !== 'kid').length,
                         pending: db.profiles.filter(p => p.status === 'pending').length, unassigned: act.filter(p => !p.assigned_staff).length,
                         mine: act.filter(p => p.assigned_staff === 'staff1').length } }, error: null };
        }
        if (fn === 'org_roster') {
            if (role() !== 'manager') return { data: null, error: { message: 'غير مصرّح' } };
            return { data: { caseload: caseload(),
                staff: STAFF.map(s => ({ ...s, caseload: db.profiles.filter(p => p.assigned_staff === s.id && p.status === 'active').length,
                    sessions_30: s.id === 'staff1' ? 24 : s.id === 'staff2' ? 17 : 3, tasks_30: s.id === 'staff1' ? 31 : 12, help_resolved_30: s.id === 'staff2' ? 4 : 1 })),
                members: db.profiles.filter(p => p.status === 'active' || p.status === 'pending').map(p => ({
                    id: p.id, first_name: p.first_name, last_name: p.last_name, email: p.email, group_name: p.group_name, org_audience: p.org_audience,
                    birthdate: p.birthdate, status: p.status, created_at: p.created_at, assigned_staff: p.assigned_staff || null, assigned_at: p.assigned_at || null,
                    last_seen: lastSeen(p.id), days_active_7: db.daily_snapshots.filter(s => s.student_id === p.id && s.snap_date >= dk(-6)).length })) }, error: null };
        }
        if (fn === 'org_assign_members') {
            let n = 0;
            db.profiles.forEach(p => { if (args.p_students.includes(p.id) && p.status === 'active') { p.assigned_staff = args.p_staff; p.assigned_at = args.p_staff ? new Date().toISOString() : null; n++; } });
            return { data: n, error: null };
        }
        if (fn === 'org_decide_members') {
            if (args.p_approve && caseload() && !args.p_staff) return { data: null, error: { message: 'اختار الأخصائي المسؤول' } };
            let n = 0;
            db.profiles.forEach(p => {
                if (!args.p_students.includes(p.id) || p.status !== 'pending') return;
                n++;
                if (args.p_approve) { p.status = 'active'; if (args.p_staff) { p.assigned_staff = args.p_staff; p.assigned_at = new Date().toISOString(); } }
                else { p.status = 'rejected'; p.assigned_staff = null; }
            });
            return { data: n, error: null };
        }
        if (fn === 'org_members_overview') return { data: overview(args.p_days || 7), error: null };
        if (fn === 'org_manager_stats') {
            return { data: { org: { name: 'مركز النور للتخاطب', type: 'speech', seat_limit: 80, expires_at: dk(40) }, members: { active: 58, kids: 44, adults: 14, pending: 3 },
                engagement: { active_week: 51, active_3plus: 39, active_prev_week: 47 },
                trend: Array.from({ length: 12 }, (_, i) => ({ week_start: dk(-6 - 7 * (11 - i)), active: 30 + i * 2 + rnd(-2, 2), focus_per_member: 60 + i * 5, completion: 55 + i, practice: 100 + i * 10 })),
                groups: [{ label: 'الفراشات', members: 18, hidden: false, active_pct: 89, focus_per_member: 140 }, { label: 'النجوم', members: 16, hidden: false, active_pct: 81 }, { label: 'الكبار', members: 14, hidden: false, active_pct: 71 }, { label: null, members: 10, hidden: false, active_pct: 60 }],
                tools: { base: 51, focus: 44, games: 38, calm: 21, practice: 35, tasks: 40, behavior: 22 },
                support: { requests: 12, resolved: 11, open: 1, median_minutes: 38 }, attendance: { sessions: 230, attended: 209, absent: 15, excused: 6 },
                goals: { active: 94, achieved_30: 17, members_with_plan: 41 },
                staff: [{ name: 'أ. سارة محمود', sessions: 86, tasks: 140, notes: 64, ratings: 120, help_resolved: 7 }, { name: 'أ. محمد علي', sessions: 72, tasks: 98, notes: 41, ratings: 80, help_resolved: 4 }],
                generated_at: new Date().toISOString() }, error: null };
        }
        if (fn === 'export_student_data') return { data: { profile: {} }, error: null };
        if (fn === 'offboard_student') { db.profiles = db.profiles.filter(p => p.id !== args.target_id); return { data: null, error: null }; }
        return { data: null, error: { code: 'PGRST202', message: 'mock missing ' + fn } };
    },
    auth: {
        getSession: async () => ({ data: { session: role() ? { user: { id: 'staff1' } } : null } }),
        getUser: async () => ({ data: { user: role() ? { id: 'staff1' } : null } }),
        signInWithPassword: async ({ email }) => { localStorage.setItem('mock_role', email.startsWith('dir') ? 'manager' : 'admin'); return { data: {}, error: null }; },
        signOut: async () => { localStorage.removeItem('mock_role'); return {}; },
        //  نسيت كلمة المرور: الكود الصح في الموك 123456 · أي إيميل بيبدأ بـ dir يدخل مدير
        resetPasswordForEmail: async email => { localStorage.setItem('mock_reset_email', email); return { data: {}, error: null }; },
        verifyOtp: async ({ token }) => token === '123456'
            ? (localStorage.setItem('mock_role', (localStorage.getItem('mock_reset_email') || '').startsWith('dir') ? 'manager' : 'admin'), { data: {}, error: null })
            : { data: null, error: { message: 'Token has expired or is invalid' } },
        updateUser: async () => ({ data: {}, error: null })
    }
};
export async function getCurrentUser() { return role() ? { id: 'staff1' } : null; }
