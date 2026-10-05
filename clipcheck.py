import glob
from faster_whisper import WhisperModel
m = WhisperModel("small", device="cpu", compute_type="int8", local_files_only=True)
for f in sorted(glob.glob('tmp/clips/c_*.wav'), key=lambda x: float(x.split('_')[-1][:-4])):
    out = []
    for lang in ('en', 'ar'):
        segs, _ = m.transcribe(f, language=lang, beam_size=5, vad_filter=False, condition_on_previous_text=False)
        out.append(lang + ':' + ' '.join(s.text.strip() for s in segs))
    print(f.split('_')[-1][:-4], ' | '.join(out), flush=True)
