(function(){
const pad=n=>String(n).padStart(2,'0');
const dk=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const now=new Date(); const t=dk(now);
const ago=n=>{const d=new Date(now); d.setDate(d.getDate()-n); return d;};
const S=(k,v)=>localStorage.setItem(k,typeof v==='string'?v:JSON.stringify(v));
localStorage.clear(); sessionStorage.clear();
sessionStorage.setItem('guest_mode','true');
sessionStorage.setItem('etz_parent_pass', String(Date.now()));
S('etz_birthdate','2018-04-12');
S('user_first_name','يوسف');
S('userXP','86'); S('userCoins','86'); S('userStreak','6'); S('etz_best_streak','6');
S('etz_parent_role','mom');
S('dailyWaterIntake',{date:t,count:3});
const pom=[]; for(let i=6;i>=0;i--){ const n=i===0?2:(i%3===0?1:2); for(let j=0;j<n;j++){const d=ago(i); d.setHours(17,10*j); pom.push({timestamp:d.toISOString(),mode:'custom',duration:10});}}
S('pomodorosCompleted',pom);
const it=(p,label,slot,done)=>({id:'k'+p+Math.random().toString(36).slice(2,7),preset:p,label,icon:p,slot,done});
const today=[it('wake','صحيت','morning',true),it('teeth','أغسل سناني','morning',true),it('breakfast','فطار','morning',true),it('school','المدرسة','morning',true),
 it('lunch','غدا','noon',true),it('homework','الواجب','evening',false),it('focus','وقت تركيز','evening',false),it('play','لعب','evening',false),
 it('story','قصة قبل النوم','night',false),it('sleep','نوم','night',false)];
const sched={}; for(let i=6;i>=1;i--){ sched[dk(ago(i))]=today.map((x,j)=>Object.assign({},x,{done:j<(6+i%4)})); } sched[t]=today; S('etz_kids_schedule',sched);
S('etz_kid_rewards',{items:[{id:'r1',title:'ساعة كرتون',stars:30,icon:'fa-tv'},{id:'r2',title:'آيس كريم',stars:20,icon:'fa-ice-cream'},{id:'r3',title:'خروجة للجنينة',stars:50,icon:'fa-tree'},{id:'r4',title:'لعبة مع ماما',stars:15,icon:'fa-dice'}],requests:[{id:'q1',rewardId:'r4',title:'لعبة مع ماما',stars:15,icon:'fa-dice',at:Date.now()-86400000*2,status:'approved',decidedAt:Date.now()-86400000*2,seen:true}],spent:15});
const seen={}; ['school','dentist','vaccine','haircut','guest','share','screen'].forEach((id,i)=>seen[id]=dk(ago(i)) ); S('etz_stories_seen',seen);
const days={}; for(let i=6;i>=1;i--){ days[dk(ago(i))]={g1:i>3?1:2,g2:i%2?2:1,g3:i>4?0:(i>2?1:2)}; }
S('etz_behavior_card',{goals:[{id:'g1',title:'خلّص الواجب من غير خناق'},{id:'g2',title:'سمع الكلام من أول مرة'},{id:'g3',title:'نام في ميعاده'}],days});
S('etz_calm_total','4');
S('etz_calm_log',{[t]:1});
S('etz_kid_play_cap','30'); S('etz_kid_move_breaks','1');
S('etz_kid_play',{date:t,sec:600,since:0,extra:0});
S('etz_focus_minutes','10');
S('water_last_add_ms','0');
})();
['onboardingTourDone','tour_checklist_done','tour_games_home_done','tour_parent_home_done','tour_pomodoro_done','tour_schedule_done','tour_study_home_done'].forEach(k=>localStorage.setItem(k,'true'));
