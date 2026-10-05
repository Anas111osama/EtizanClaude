// Supabase وهمي لاختبار طبقة المؤسسة على الهوم — مابيكلمش أي سيرفر
window.__calls = [];
const aud = () => localStorage.getItem('mock_aud') || 'adult';
const home = () => ({
  member: true, school_code: 'NOUR2026', status: 'active', audience: aud(),
  org: { name: 'مركز النور للتخاطب', type: 'speech', logo_url: null, color: '#0876B2', terms: {},
         features: {}, active: true },
  contact: { name: 'أ. سارة', whatsapp: '201000000000' },
  tasks: [
    { id: 't1', title: 'كرر صوت (ر) ١٠ مرات', kind: 'practice', reps_target: 10, reps_done: 3, status: 'pending', due_date: null, author: 'سارة' },
    { id: 't2', title: 'رتّب شنطتك قبل النوم', kind: 'task', status: 'pending', due_date: '2026-09-14', author: 'سارة', note: 'مع ماما' },
    { id: 't3', title: 'اقرا صفحة من القصة', kind: 'task', status: 'done', done_at: new Date().toISOString(), author: 'سارة' }
  ],
  behavior_goals: [{ id: 'b1', title: 'سمع الكلام من أول مرة' }, { id: 'b2', title: 'نام في ميعاده' }],
  message: localStorage.getItem('mock_msg') === '0' ? null
      : { text: 'برافو على تمرين النهارده! 🌟', tone: 'proud', at: '2026-09-17T09:00:00Z', from: 'سارة محمود' },
  open_help: false
});
function builder(table) {
  const st = { table };
  const b = {
    select() { return b; }, eq(k, v) { st.eq = [k, v]; return b; },
    update(p) { st.op = 'update'; st.payload = p; return b; }, insert(p) { st.op = 'insert'; st.payload = p; return b; },
    upsert(p, o) { st.op = 'upsert'; st.payload = p; st.o = o; return b; },
    then(res, rej) { window.__calls.push(st); return Promise.resolve({ data: [{ id: 'x' }], error: null }).then(res, rej); }
  };
  return b;
}
export const supabase = {
  from: builder,
  rpc: async fn => {
    if (fn === 'org_member_home') return { data: home(), error: null };
    return { data: null, error: { code: 'PGRST202' } };
  },
  auth: { getSession: async () => ({ data: { session: { user: { id: 'u1' } } } }) }
};
