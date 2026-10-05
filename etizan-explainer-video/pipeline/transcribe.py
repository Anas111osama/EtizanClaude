import json, sys, time
from faster_whisper import WhisperModel
t=time.time()
m=WhisperModel("small", device="cpu", compute_type="int8", cpu_threads=8, local_files_only=True)
segs,info=m.transcribe("source/voice/VOICE_OVER.wav", language="ar", word_timestamps=True, beam_size=5, vad_filter=False)
out=[]
for s in segs:
    out.append({"start":s.start,"end":s.end,"text":s.text,"words":[{"w":w.word,"s":w.start,"e":w.end} for w in s.words]})
    print(round(s.end,1), flush=True)
json.dump(out,open("build/transcript.json","w",encoding="utf-8"),ensure_ascii=False,indent=1)
print("done",time.time()-t, flush=True)
