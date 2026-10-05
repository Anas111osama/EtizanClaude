// شاشات فيديو الأعضاء. anon = من غير تسجيل دخول · seed = بيانات تجريبية (adult عمر / kid يوسف) · org = عضو مدرسة النور
const wait = ms => `await new Promise(r=>setTimeout(r,${ms}));`;
const typeCode = code => `(async()=>{const i=document.getElementById('code'); i.focus(); i.value='${code}'; i.dispatchEvent(new Event('input',{bubbles:true})); ${wait(300)}})()`;
const submitCode = code => `(async()=>{const i=document.getElementById('code'); i.value='${code}'; i.dispatchEvent(new Event('input',{bubbles:true}));
  const f=i.closest('form'); if(f) f.requestSubmit(); else { const b=[...document.querySelectorAll('#step-code button')].find(x=>x.innerText.includes('متابعة')); b&&b.click(); }
  ${wait(1800)} const t=document.getElementById('tab-up'); t&&t.click(); ${wait(600)}})()`;
const offlineModal = `(async()=>{ await new Promise(r=>{const s=document.createElement('script'); s.src='assets/js/offline-modal.js'; s.onload=r; document.head.appendChild(s);});
  window.showOfflineModal({ title:'محتاجين النت', desc:'شغلك ومهامك مش بتوصل للأخصائي والنت مقفول، والمهام الجديدة مش بتوصلك. افتح النت شوية والتطبيق هيزامن لوحده.', actionLabel:'فتحته', onAction(){} }); ${wait(900)} })()`;
module.exports = [
  { name: 'login', url: 'login.html', anon: true, targets: { btn: '$#btn-school' } },
  { name: 'code', url: 'school-login.html', anon: true, act: typeCode('NOUR-K7QXM'), targets: { input: '$#code', card: '$#step-code' } },
  { name: 'join_kid', url: 'school-login.html', anon: true, aud: 'kid', act: submitCode('NOUR-K7QXM'), targets: { org: '$#step-auth', aud: '$#aud', kidnote: '$#kid-note' } },
  { name: 'join_adult', url: 'school-login.html', anon: true, aud: 'adult', act: submitCode('NOUR-A8PLM'), targets: { org: '$#step-auth', aud: '$#aud' } },
  { name: 'adult_home', url: 'Home.html', seed: 'adult', org: true, aud: 'adult', full: true,
    targets: { org: 'مدرسة النور الدولية@section, .org-card, div', help: 'محتاج مساعدة@button', task: 'كرر صوت (ر) ١٠ مرات@li, article, div',
               msg: 'رسالة من أ. سارة@div', beh: 'كارت السلوك النهارده@section, div', today: 'جلسات تركيز@section' } },
  { name: 'kid_home', url: 'home-kids.html', seed: 'kid', org: true, aud: 'kid', full: true,
    targets: { bird: '$.bird-zone', tasks: 'مهام من سارة@section, div', doneBtn: 'عملتها!@button' } },
  { name: 'kid_parent', url: 'parent-home.html', seed: 'kid', org: true, aud: 'kid', full: true, targets: { behavior: '$#behaviorCard' } },
  { name: 'offline', url: 'Home.html', seed: 'adult', org: true, aud: 'adult', act: offlineModal, targets: { modal: 'محتاجين النت@[role=dialog], .modal, div' } },
];
