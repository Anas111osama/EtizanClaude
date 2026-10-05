import json, sys
from faster_whisper import WhisperModel
sys.stdout.reconfigure(encoding='utf-8')
m = WhisperModel("small", device="cpu", compute_type="int8", local_files_only=True)
segs, _ = m.transcribe('source/hooks_all.wav', language='ar', beam_size=5, word_timestamps=True, condition_on_previous_text=False)
out = []
for s in segs:
    out.append({'start': s.start, 'end': s.end, 'text': s.text, 'words': [{'w': w.word, 's': w.start, 'e': w.end} for w in s.words]})
    print(round(s.start, 2), round(s.end, 2), s.text)
json.dump(out, open('build/hooks_transcript.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
