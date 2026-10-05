import json, re, difflib, subprocess, wave, sys
import numpy as np
sys.stdout.reconfigure(encoding='utf-8')
HOOKS = [
 'عندك مهمة كبيرة... ومش عارف تبدأ منين؟',
 'فاتح عشرين حاجة... ومخلّصتش ولا واحدة؟',
 'محتاج حد يطبطب عليك... ولا حد يقولك: قوم اشتغل؟',
 'دماغك فيها ألف حاجة... وكلهم بيتكلموا في نفس الوقت؟',
 'اديني خمسة وعشرين دقيقة بس... وركّز معايا.',
 'قرار بسيط... بس واخد منك أسبوع تفكير؟',
 'يومك مش لازم يبقى ليستة طويلة... ممكن تشوفه قدامك.',
 'كل مرة بتخلّص فيها حاجة... في حد واخد باله.',
 'بتقول لطفلك نفس الكلام عشر مرات كل يوم؟',
 'تخيّل طفلك عارف يومه... لوحده.',
 'أول يوم مدرسة... دكتور السنان... وكل مرة نفس الخوف؟',
 'كل حاجة حلوة بيعملها طفلك... تستاهل نجمة.',
 'التابلت بيخلص بخناقة كل يوم؟',
 '«مش بيسمع الكلام»... ده مش سلوك، ده عنوان كبير.',
 'تطبيق واحد... للكبار، وللصغار.',
]
def norm(s):
    s = re.sub(r'[ً-ْـ]', '', s)
    s = re.sub('[أإآا]', 'ا', s).replace('ى', 'ي').replace('ة', 'ه').replace('ؤ', 'و').replace('ئ', 'ي')
    return re.sub(r'[^ء-ي0-9]', '', s)
tr = json.load(open('build/hooks_transcript.json', encoding='utf-8'))
wc, wt = [], []
for seg in tr:
    for w in seg['words']:
        for ch in norm(w['w']): wc.append(ch); wt.append((w['s'], w['e']))
sc, sl = [], []
for i, h in enumerate(HOOKS):
    for ch in norm(h): sc.append(ch); sl.append(i)
sm = difflib.SequenceMatcher(None, sc, wc, autojunk=False); m = {}
for a, b, n in sm.get_matching_blocks():
    for k in range(n): m[a + k] = b + k
rough = []
for i in range(len(HOOKS)):
    idx = [k for k in range(len(sc)) if sl[k] == i and k in m]
    tot = sum(1 for k in range(len(sc)) if sl[k] == i)
    rough.append((wt[m[idx[0]]][0], wt[m[idx[-1]]][1], round(len(idx) / tot, 2)))
# الصوت والسكتات
SR = 48000
x = np.frombuffer(subprocess.check_output(['ffmpeg','-v','error','-i','source/hooks_all.wav','-f','f32le','-ac','1','-ar',str(SR),'-']), dtype='<f4')
hop = int(0.01 * SR); n = len(x) // hop
db = 20 * np.log10(np.sqrt((x[:n * hop].reshape(n, hop) ** 2).mean(1)) + 1e-9)
quiet = db < -45
gaps = []; st = None
for i, q in enumerate(quiet):
    if q and st is None: st = i
    if not q and st is not None:
        if i - st >= 20: gaps.append((st / 100, i / 100))
        st = None
# حد بين كل جملتين = نص أقرب سكتة للحدود التقريبية
bounds = [0.0]
for i in range(len(HOOKS) - 1):
    target = (rough[i][1] + rough[i + 1][0]) / 2
    g = min(gaps, key=lambda g: abs((g[0] + g[1]) / 2 - target))
    bounds.append((g[0] + g[1]) / 2)
bounds.append(len(x) / SR)
def trim(y):
    k = len(y) // hop; d = 20 * np.log10(np.sqrt((y[:k * hop].reshape(k, hop) ** 2).mean(1)) + 1e-9)
    on = np.where(d > -42)[0]; a = max(0, on[0] - 4) * hop; b = min(len(y), (on[-1] + 6) * hop)
    y = y[a:b].copy(); f = int(0.01 * SR); y[:f] *= np.linspace(0, 1, f); y[-f:] *= np.linspace(1, 0, f); return y
info = []
for i in range(len(HOOKS)):
    y = trim(x[int(bounds[i] * SR):int(bounds[i + 1] * SR)])
    with wave.open(f'source/hooks/hook{i + 1:02d}.wav', 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(y, -1, 1) * 32767).astype('<i2').tobytes())
    info.append({'n': i + 1, 'text': HOOKS[i], 'dur': round(len(y) / SR, 2), 'cov': rough[i][2], 'cut': [round(bounds[i], 2), round(bounds[i + 1], 2)]})
    print(f"hook{i + 1:02d}", info[-1]['cut'], info[-1]['dur'], 's  match', rough[i][2], ' ', HOOKS[i])
json.dump(info, open('source/hooks/hooks.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
