# خطة التريلر — مصدر واحد للصورة والصوت
import json
C = json.load(open('clips.json', encoding='utf-8'))
END = 14.4
vo, shots, texts, sfx = [], [], [], []
def say(clip, t, show=True, y=1460, size=78):
    d = C[clip]['dur']; vo.append({'clip': clip, 't': t, 'dur': d})
    if show: texts.append({'t': t, 'end': t + d + 0.35, 'text': C[clip]['text'], 'y': y, 'size': size, 'words': True})
    return t + d
def shot(img, t0, t1, fx, fy, zoom=1.5, rot=8, mode='glass'):
    shots.append({'img': img, 't0': t0, 't1': t1, 'fx': fx, 'fy': fy, 'zoom': zoom, 'rot': rot, 'mode': mode})
def fx(name, t, gain=1.0): sfx.append({'name': name, 't': round(t, 3), 'gain': gain})

# ٠:٠٠–٠:٠٢ — الغموض
fx('impact', 0.12, 1.0)
shot('a_home', 0.12, 1.95, 300, 110, zoom=2.4, rot=4, mode='fragment')
texts.append({'t': 0.75, 'end': 1.95, 'text': 'جاهزين للي جاي؟', 'y': 1170, 'size': 104, 'words': True})
fx('lowhit', 1.3, 0.8)
# ٠:٠٢–٠:٠٥ — الكبار
fx('whoosh_big', 1.82, 0.9)
shot('a_pomodoro', 2.0, 3.35, 195, 260, zoom=1.55, rot=10)
shot('a_home', 3.35, 4.75, 195, 400, zoom=1.45, rot=-9)
say('one', 2.45)
fx('lowhit', 3.35, 0.55)
# ٠:٠٥–٠:٠٨ — الصغار
fx('whoosh_big', 4.62, 0.95)
shot('k_table', 4.8, 5.85, 195, 175, zoom=1.6, rot=-10)
shot('k_games', 5.85, 7.05, 195, 560, zoom=1.45, rot=9)
shot('k_home', 7.05, 8.15, 195, 190, zoom=1.7, rot=-7)
t = say('w_org', 4.98, y=1380); texts[-1]['end'] = 8.1
say('w_foc', 5.9, y=1500); texts[-1]['end'] = 8.1
say('w_calm', 7.2, y=1620); texts[-1]['end'] = 8.1
fx('lowhit', 5.85, 0.45); fx('lowhit', 7.05, 0.45)
# ٠:٠٨–٠:١١ — كشف سريع: كبار ← صغار ← كبار ← صغار
fx('riser', 8.15, 0.85)
R = [('a_decoder_steps', 200, 715, 'lazy'), ('k_story_read', 195, 300, 'before'), ('a_achievements', 195, 120, 'step'), ('k_home_msg', 195, 230, 'zanto2')]
t = 8.2
for i, (img, x, y, clip) in enumerate(R):
    d = max(0.62, C[clip]['dur'] + 0.08)
    shot(img, t, t + d, x, y, zoom=1.6 + 0.1 * i, rot=(12 if i % 2 else -12), mode='rapid')
    say(clip, t + 0.04, size=88); texts[-1]['end'] = t + d - 0.02
    fx('glitch', t, 0.9)
    t += d
REVEAL_END = t
# ٠:١١–٠:١٤ — اللوجو
IMPACT = REVEAL_END + 0.32          # سكتة قصيرة قبل الصدمة
fx('reverse', IMPACT - 0.9, 0.9)
fx('impact', IMPACT, 1.0)
# الجملة الأخيرة اتسجّلت مخصوص (Puck): «اتزان» ثم «حاجة جديدة جاية!»
E0 = IMPACT + 0.15
say('ending', E0, show=False)
# أوقات الكلمات جوّه المقطع بعد قص السكوت (من التفريغ)
W = [round((w - 0.25) / 1.06, 3) for w in (1.20, 1.74, 2.13)]   # بعد قص السكتة والتسريع
texts.append({'t': E0 + W[0], 'end': 99, 'text': 'حاجة جديدة جاية!', 'y': 1150, 'size': 90, 'words': True, 'wt': [E0 + w for w in W]})
PUNCH = round(E0 + W[2] + 0.04, 3)          # لحظة «جاية!»
fx('stinger', PUNCH - 0.45, 1.0)             # السحب العكسي ٠.٤٥ ث قبل الخبطة
BLACK = round(PUNCH + 0.85, 3)               # قطع للأسود
fx('boom', BLACK, 1.0)
END = round(BLACK + 0.6, 2)
plan = {'end': END, 'badge': round(PUNCH + 0.12, 2), 'punch': PUNCH, 'black': BLACK, 'revealEnd': round(REVEAL_END, 3), 'impact': round(IMPACT, 3), 'vo': vo, 'shots': shots, 'texts': texts, 'sfx': sfx}
json.dump(plan, open('plan.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
open('plan.js', 'w', encoding='utf-8').write('window.PLAN=' + json.dumps(plan, ensure_ascii=False) + ';')
print('reveal end', round(REVEAL_END, 2), 'impact', round(IMPACT, 2), 'end', END)
for v in vo: print(' vo', v['clip'], v['t'], round(v['t'] + v['dur'], 2))
