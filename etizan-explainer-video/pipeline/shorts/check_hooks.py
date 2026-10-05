import glob, sys
from faster_whisper import WhisperModel
sys.stdout.reconfigure(encoding='utf-8')
m = WhisperModel("small", device="cpu", compute_type="int8", local_files_only=True)
for f in sorted(glob.glob('source/hooks/hook*.wav')):
    segs, _ = m.transcribe(f, language='ar', beam_size=5, condition_on_previous_text=False)
    print(f[-10:-4], '|', ' '.join(s.text.strip() for s in segs), flush=True)
