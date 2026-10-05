// Supabase وهمي لشاشات الحجز (ask.html / booking.html) — أسماء تجريبية، مابيكلمش أي سيرفر
const C = [
  { id: 'c1', name: 'أ. منى عبد الرحمن', specialty: 'أخصائية تعديل سلوك الأطفال', location: 'أونلاين', experience: '١٢ سنة مع الأطفال', availability: 'السبت – الخميس',
    is_verified: true, is_listed: true, is_bookable: true, has_account: true, display_order: 1, avatar_initial: 'م', avatar_color_from: '#0876B2', avatar_color_to: '#3269DB',
    session_price_amount: 350, currency: 'EGP', slot_minutes: 60, timezone: 'Africa/Cairo',
    weekly_schedule: { sat: [17, 18, 19, 20], sun: [16, 17, 19], mon: [17, 18, 20], tue: [16, 18, 19], wed: [17, 19, 20], thu: [16, 17, 18] } },
  { id: 'c2', name: 'أ. كريم حسن', specialty: 'أخصائي نفسي تربوي', location: 'أونلاين', experience: '٩ سنين', availability: 'الأحد – الخميس',
    is_verified: true, is_listed: true, is_bookable: true, has_account: true, display_order: 2, avatar_initial: 'ك', avatar_color_from: '#7C3AED', avatar_color_to: '#4F46E5',
    session_price_amount: 300, currency: 'EGP', slot_minutes: 60 },
  { id: 'c3', name: 'أ. ياسمين فؤاد', specialty: 'أخصائية صعوبات تعلم', location: 'أونلاين', experience: '٨ سنين', availability: 'السبت – الأربعاء',
    is_verified: true, is_listed: true, is_bookable: true, has_account: true, display_order: 3, avatar_initial: 'ي', avatar_color_from: '#0EA5A4', avatar_color_to: '#0284C7',
    session_price_amount: 300, currency: 'EGP', slot_minutes: 45 }
];
const start = (() => { const d = new Date(); d.setDate(d.getDate() + 2); d.setHours(19, 0, 0, 0); return d.toISOString(); })();
const APPT = { id: 'a1', booking_ref: 'ETZ-7K4Q', status: 'مؤكد', meeting_url: 'https://meet.example/etizan', starts_at: start, price_locked: 350, currency: 'EGP',
  adhd_consultants: { name: 'أ. منى عبد الرحمن' } };
function builder(table) {
  const st = { table };
  const rows = () => table === 'adhd_consultants' ? C : table === 'appointments' ? [APPT] : [];
  const b = {
    select() { return b; }, order() { return b; }, limit() { return b; }, in() { return b; }, gte() { return b; }, neq() { return b; },
    eq(k, v) { st.eq = [k, v]; return b; },
    maybeSingle() { st.single = true; return b; }, single() { st.single = true; return b; },
    insert() { return b; }, update() { return b; },
    then(res, rej) {
      let r = rows(); if (st.eq && table === 'adhd_consultants') r = r.filter(x => x[st.eq[0]] === st.eq[1]);
      return Promise.resolve({ data: st.single ? (r[0] || null) : r, error: null }).then(res, rej);
    }
  };
  return b;
}
export const supabase = {
  from: builder,
  rpc: async () => ({ data: [], error: null }),
  auth: { getSession: async () => ({ data: { session: { user: { id: 'u1' } } } }), getUser: async () => ({ data: { user: { id: 'u1' } } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }), signOut: async () => ({}) },
  channel: () => ({ on() { return this; }, subscribe() { return this; } }), removeChannel() {}
};
export async function getCurrentUser() { return { id: 'u1' }; }
export async function requireAuth() { return { id: 'u1' }; }
