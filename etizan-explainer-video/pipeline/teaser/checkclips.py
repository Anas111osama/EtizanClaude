import glob, json
from faster_whisper import WhisperModel
m = WhisperModel("small", device="cpu", compute_type="int8", local_files_only=True)
for f in sorted(glob.glob('tmp/clip_*.wav')):
    segs, _ = m.transcribe(f, language='ar', beam_size=5, vad_filter=False, condition_on_previous_text=False, word_timestamps=True)
    ws = [(round(w.start, 2), round(w.end, 2), w.word) for s in segs for w in s.words]
    print(f.split('clip_')[1][:-4], ws, flush=True)
