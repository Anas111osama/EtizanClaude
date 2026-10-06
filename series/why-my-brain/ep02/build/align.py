# python build/align.py — يطابق فقرات script.txt مع التفريغ:
# وقت كل فقرة وكل كلمة → build/times.js، وتقرير بنسبة التطابق، والكلام الزيادة (tags اتقرت مثلًا) أو الناقص.
import json, re, os, difflib, subprocess
import numpy as np
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
B = os.path.join(R, 'build')
lines = [re.sub(r'^\s*\[[^\]]*\]\s*', '', l).strip() for l in open(os.path.join(R, 'script.txt'), encoding='utf-8') if l.strip()]
tr = json.load(open(os.path.join(B, 'transcript.json'), encoding='utf-8'))
def norm(s):
    s = re.sub(r'[ً-ْـ]', '', s)
    s = re.sub('[أإآا]', 'ا', s).replace('ى', 'ي').replace('ة', 'ه').replace('ؤ', 'و').replace('ئ', 'ي')
    return re.sub(r'[^ء-ي0-9a-z]', '', s.lower())
words = [w for seg in tr for w in seg['words']]
wc, wi = [], []                                    # حروف التفريغ ← رقم الكلمة
for k, w in enumerate(words):
    for ch in norm(w['w']): wc.append(ch); wi.append(k)
sc, sl, sw = [], [], []                            # حروف النص ← (فقرة، كلمة)
for i, l in enumerate(lines):
    for j, w in enumerate(l.split()):
        for ch in norm(w): sc.append(ch); sl.append(i); sw.append(j)
m = {}
for a, b, n in difflib.SequenceMatcher(None, sc, wc, autojunk=False).get_matching_blocks():
    for k in range(n): m[a + k] = b + k
used = set(wi[m[k]] for k in m)
res = []
for i, l in enumerate(lines):
    ks = [k for k in range(len(sc)) if sl[k] == i]
    hit = [k for k in ks if k in m]
    ws = l.split(); wt = [None] * len(ws)
    for k in hit:
        if wt[sw[k]] is None: wt[sw[k]] = round(words[wi[m[k]]]['s'], 2)
    s = words[wi[m[hit[0]]]]['s'] if hit else None; e = words[wi[m[hit[-1]]]]['e'] if hit else None
    for j in range(len(wt)):                       # كلمة ماتطابقتش ← بين جيرانها
        if wt[j] is None:
            prv = next((wt[x] for x in range(j - 1, -1, -1) if wt[x] is not None), s)
            nxt = next((wt[x] for x in range(j + 1, len(wt)) if wt[x] is not None), e)
            wt[j] = round((prv + nxt) / 2, 2) if prv is not None and nxt is not None else prv
    res.append({'start': round(s, 2), 'end': round(e, 2), 'cov': round(len(hit) / max(1, len(ks)), 2), 'w': wt, 't': l})
for i in range(len(res) - 1):                  # نهاية الفقرة ما تعدّيش بداية اللي بعدها
    res[i]['end'] = min(res[i]['end'], round(res[i + 1]['start'] - 0.05, 2))
# كلام في التفريغ مالوش مقابل في النص (ممكن tag اتقرا، أو كلمة زيادة)
extra, run = [], []
for k, w in enumerate(words):
    if k not in used and norm(w['w']): run.append(w)
    elif run: extra.append(run); run = []
if run: extra.append(run)
dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', os.path.join(R, 'voice/VOICE_OVER.wav')]))
open(os.path.join(B, 'times.js'), 'w', encoding='utf-8').write('window.TIMES=' + json.dumps({'duration': round(dur, 2), 'lines': res}, ensure_ascii=False) + ';')
print(f'duration {dur:.2f}s, {len(lines)} paragraphs')
for i, r in enumerate(res):
    flag = '  <-- راجع' if r['cov'] < 0.8 else ''
    print(f"p{i + 1:02d} {r['start']:7.2f}-{r['end']:7.2f} cov {r['cov']:.2f}  {r['t'][:50]}{flag}")
print('--- كلام زيادة في الصوت (مش في النص):')
for run in extra:
    print(f"  {run[0]['s']:7.2f}-{run[-1]['e']:7.2f}  {' '.join(w['w'].strip() for w in run)}")
