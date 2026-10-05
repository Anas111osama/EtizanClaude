# python build/transcribe.py — تفريغ الصوت كله بتوقيت كل كلمة (whisper small, CPU)
import json, time, os
from faster_whisper import WhisperModel
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
t = time.time()
m = WhisperModel('small', device='cpu', compute_type='int8', cpu_threads=4, local_files_only=True)
segs, _ = m.transcribe(os.path.join(R, 'voice/VOICE_OVER.wav'), language='ar', word_timestamps=True, beam_size=5, vad_filter=False)
out = []
for s in segs:
    out.append({'start': s.start, 'end': s.end, 'text': s.text, 'words': [{'w': w.word, 's': w.start, 'e': w.end} for w in s.words]})
    print(round(s.end, 1), s.text, flush=True)
json.dump(out, open(os.path.join(R, 'build/transcript.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('done', round(time.time() - t), 's', flush=True)
