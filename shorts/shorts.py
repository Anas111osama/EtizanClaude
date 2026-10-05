# مواصفات الـShorts الـ15. كل فيديو: شكل (A/B/C) + hook + مقاطع صوت من التسجيلين + شاشات.
# vo: (المصدر A=كبار / P=أهالي, رقم السطر, أول كلمة, آخر كلمة أو None)
# then: [(رقم الكلمة جوّه المقطع, شاشة أو None, الجزء المعلَّم)] — chips: [(رقم الكلمة, النص)]
SHORTS = {
  # ─── الكبار ───
  1: dict(fmt='C', track='A', label='فكّك المهمة', title='مخك وقف؟ نقسّمها', hook=1, ambient='a_decoder', segs=[
        dict(vo=('A', 20, 0, None), shot='a_decoder', focus='chips', then=[(6, 'a_decoder_steps', 'step')]),
        dict(vo=('A', 21, 0, None), shot='a_decoder_steps', focus='step')]),
  2: dict(fmt='B', track='A', label='جلسة تركيز', title='واحدة… واحدة', hook=2, ambient='a_home', segs=[
        dict(vo=('A', 12, 0, None), shot='a_pomodoro', focus='one', then=[(5, 'a_home', 'today')]),
        dict(vo=('A', 21, 0, None), shot='a_schedule', focus='list')]),
  3: dict(fmt='A', track='A', label='المساعد الذكي', title='رفيقك… ولا الكوتش؟', hook=3, ambient='a_ai', segs=[
        dict(vo=('A', 30, 0, None), shot='a_ai', focus='friendly', then=[(7, 'a_ai_coach', 'coach')],
             chips=[(1, 'رفيقك'), (8, 'الكوتش')]),
        dict(vo=('A', 31, 0, None), shot='a_ai_topics', focus='study', then=[(3, None, 'calm')])]),
  4: dict(fmt='C', track='A', label='تفريغ الأفكار', title='ارميها… وسيبك منها', hook=4, ambient='a_dump', segs=[
        dict(vo=('A', 14, 0, None), shot='a_dump', focus='sheet'),
        dict(vo=('A', 15, 0, None), shot='a_dump', focus='sheet')]),
  5: dict(fmt='B', track='A', label='بومودورو', title='٢٥ دقيقة تركيز', hook=5, ambient='a_pomodoro', segs=[
        dict(vo=('A', 10, 0, None), shot='a_home', focus='hero'),
        dict(vo=('A', 11, 0, None), shot='a_pomodoro', focus='timer', then=[(6, 'a_pomodoro', 'one')])]),
  6: dict(fmt='C', track='A', label='مساعد القرار', title='فكّر بهدوء… وقرّر', hook=6, ambient='a_decision', segs=[
        dict(vo=('A', 22, 0, None), shot='a_decision', focus='card'),
        dict(vo=('A', 23, 0, None), shot='a_decision', focus='progress')]),
  7: dict(fmt='A', track='A', label='جدولي', title='يومك… قدامك', hook=7, ambient='a_schedule', segs=[
        dict(vo=('A', 16, 0, None), shot='a_schedule', focus='day', then=[(3, None, 'list')]),
        dict(vo=('A', 17, 0, None), shot='a_checklist', focus='routine')]),
  8: dict(fmt='B', track='A', label='إنجازاتك', title='كل حاجة ليها نقاط', hook=8, ambient='a_achievements', segs=[
        dict(vo=('A', 33, 0, None), shot='a_achievements', focus='level', then=[(4, 'a_achievements', 'challenges')]),
        dict(vo=('A', 34, 0, None), shot='a_achievements', focus='streak')]),
  # ─── الأطفال ───
  9: dict(fmt='C', track='P', label='جدولي بالصور', title='من غير ما تعيد الكلام', hook=9, ambient='k_table', segs=[
        dict(vo=('P', 18, 0, None), shot='k_table', focus='morning'),
        dict(vo=('P', 20, 0, None), shot='k_table', focus='road')]),
  # اتعاد: الـhook «تخيّل طفلك عارف يومه… لوحده» ← يومه من أوله (الفترات) لآخره (تصبح على خير)
  10: dict(fmt='A', track='P', label='جدولي بالصور', title='يومه… من أوله لآخره', hook=10, ambient='k_table', segs=[
        dict(vo=('P', 17, 0, None), shot='k_table', focus='road', then=[(5, None, 'morning')]),
        dict(vo=('P', 55, 0, None), shot='k_home_night', focus='close')]),
  11: dict(fmt='C', track='P', label='قصص الروتين', title='يعرف الموقف قبل ما يحصل', hook=11, ambient='k_stories', segs=[
        dict(vo=('P', 23, 0, None), shot='k_story_read', focus=None),
        dict(vo=('P', 24, 0, None), shot='k_stories', focus='list')]),
  12: dict(fmt='B', track='P', label='مكافآتي', title='النجوم ليها قيمة', hook=12, ambient='k_rewards', segs=[
        dict(vo=('P', 36, 0, None), shot='k_rewards', focus='cartoon'),
        dict(vo=('P', 38, 0, None), shot='k_stickers', focus='grid')]),
  13: dict(fmt='C', track='P', label='وقت اللعب', title='اللعب ليه وقت', hook=13, ambient='k_games', segs=[
        dict(vo=('P', 28, 0, None), shot='k_games', focus='locked'),
        dict(vo=('P', 29, 0, None), shot='k_games', focus='play', then=[(7, 'k_parent', 'play')])]),
  14: dict(fmt='A', track='P', label='تقرير اليوم', title='٣ سلوكيات… كل يوم', hook=14, ambient='k_parent', segs=[
        dict(vo=('P', 45, 0, None), shot='k_parent', focus='behaviorGoals'),
        dict(vo=('P', 46, 0, None), shot='k_parent', focus='behaviorWeek')]),
  15: dict(fmt='B', track='P', label='اتزان', title='للكبار… وللصغار', hook=15, ambient='a_home', segs=[
        dict(vo=('A', 3, 0, None), shot='a_home', focus='tools'),
        dict(vo=('P', 7, 0, None), shot='k_home', focus='bird')]),
}
