// Interactive lesson exams, dictation, sentence builders, and local review.
window.createHausaActivities = function createHausaActivities(ctx) {
  'use strict';
  const { D, AUDIO, html, n, I, pageHeader, button, save, getState, notify, render, playText, shuffle, go } = ctx;
  const bank = window.HAUSA_EXAMS;
  const sentenceBank = window.HAUSA_SENTENCES;
  let exam = null, dictation = null, sentences = null;
  const normalizeAnswer = text => String(text || '').normalize('NFC').toLocaleLowerCase('en')
    .replace(/[‘’ʼʻ`´]/g,"'").replace(/\s+/g,' ').trim().replace(/[.?!؟،,;؛:]+\s*$/g,'').trim();
  const sameAnswer = (input, answer, alternatives=[]) => [answer,...alternatives].some(a => normalizeAnswer(a)===normalizeAnswer(input));
  const scorePercent = r => r && r.total ? Math.round(r.score / r.total * 100) : 0;
  const scoreText = r => r ? `<bdi dir="ltr">${n(r.score)} / ${n(r.total)}</bdi>` : '—';
  const statsLine = (stats) => stats?.last ? `<div class="activity-stats"><span>آخر نتيجة: ${scoreText(stats.last)}</span><span>الأفضل: ${scoreText(stats.best)}</span><span>المحاولات: ${n(stats.attempts)}</span></div>` : '<p class="activity-muted">لم تُنهِ محاولة بعد.</p>';
  function keepResult(key, result) {
    const state=getState();
    const old=state[key] || {attempts:0,last:null,best:null};
    state[key]={attempts:old.attempts+1,last:result,best:!old.best || scorePercent(result)>scorePercent(old.best)?result:old.best};
    save();
  }
  function keepExamResult(id, result) {
    const state=getState();
    const old=state.lessonResults[id] || {attempts:0,last:null,best:null};
    state.lessonResults[id]={attempts:old.attempts+1,last:result,best:!old.best || scorePercent(result)>scorePercent(old.best)?result:old.best};
    save();
  }
  function recordMistake(id, source, prompt, answer, explain, given, path, correct) {
    const state=getState();
    state.mistakes=state.mistakes.filter(m=>m.id!==id);
    if (!correct) state.mistakes.unshift({id,source,prompt:String(prompt).slice(0,300),answer:String(answer).slice(0,300),explain:String(explain).slice(0,500),given:String(given).slice(0,160),path,at:new Date().toISOString()});
    state.mistakes=state.mistakes.slice(0,100);
    save();
  }
  const specialKeys = `<div class="special-keys" aria-label="حروف هوسا الخاصة"><span>حروف مساعدة:</span>${['ɓ','ɗ','ƙ','ƴ','’'].map(ch=>`<button type="button" data-insert-char="${html(ch)}" aria-label="إدراج ${html(ch)}" lang="ha">${html(ch)}</button>`).join('')}</div>`;
  const answerInput = id => `<label class="activity-label" for="${id}">اكتب إجابتك بالهوسا</label><input id="${id}" class="activity-input" type="text" lang="ha" dir="ltr" maxlength="160" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="اكتب هنا…">${specialKeys}`;
  function makeTokens(answer) { return shuffle(answer.trim().split(/\s+/).map((text,id)=>({id,text}))); }
  function builder(session,kind) {
    const selected=session.selected || [];
    const used=new Set(selected);
    const picked=selected.map(id=>session.tokens.find(t=>t.id===id)).filter(Boolean);
    return `<div class="builder-label">الجملة التي رتّبتها <span>اضغط الكلمة المختارة لإزالتها</span></div>
      <div class="builder-answer" dir="ltr" aria-label="الكلمات المختارة">${picked.length?picked.map(t=>`<button type="button" class="token token-selected" data-seq-remove="${t.id}" data-seq-kind="${kind}" ${session.answered?'disabled':''} lang="ha">${html(t.text)}</button>`).join(''):'<span class="builder-placeholder" dir="rtl">اختر الكلمات بالترتيب…</span>'}</div>
      <div class="builder-label">الكلمات المتاحة</div><div class="token-bank" dir="ltr">${session.tokens.filter(t=>!used.has(t.id)).map(t=>`<button type="button" class="token" data-seq-add="${t.id}" data-seq-kind="${kind}" ${session.answered?'disabled':''} lang="ha">${html(t.text)}</button>`).join('') || '<span class="activity-muted" dir="rtl">استخدمت جميع الكلمات</span>'}</div>`;
  }
  function currentSequence(session) { return (session.selected||[]).map(id=>session.tokens.find(t=>t.id===id)?.text || '').join(' '); }
  function progressLine(index,total,score,answered) {
    return `<div class="quiz-progress-label"><span>السؤال ${n(index+1)} من ${n(total)}</span><span>${n(score)} صحيحة</span></div><div class="progress-track"><span style="width:${Math.round((index+(answered?1:0))/total*100)}%"></span></div>`;
  }
  function feedback(correct, answer, explain, given='') {
    return `<div class="feedback ${correct?'':'wrong'}" role="status">${I(correct?'circleCheck':'circleX')}<div><strong>${correct?'إجابة صحيحة!':'ليست الإجابة المطلوبة هذه المرة.'}</strong>${!correct&&given?`<span class="feedback-line">إجابتك: <bdi lang="ha">${html(given)}</bdi></span>`:''}${!correct?`<span class="feedback-line">الإجابة: <bdi lang="ha">${html(answer)}</bdi></span>`:''}<span class="feedback-line">${html(explain)}</span></div></div>`;
  }
  function examItems(lesson) {
    return [{type:'choice',q:lesson.quiz.q,options:lesson.quiz.options,answer:lesson.quiz.answer,explain:lesson.quiz.explain},...(bank[lesson.id]||[])].map((q,index)=>{
      const item={...q,index};
      if(q.type==='choice') item.choices=shuffle(q.options.map((text,i)=>({text,correct:i===q.answer})));
      return item;
    });
  }
  function resetExamQuestion() {
    const item=exam.items[exam.index];
    exam.answered=false; exam.good=false; exam.given=''; exam.choice=null;
    exam.selected=[]; exam.tokens=item.type==='order'?makeTokens(item.answer):[];
  }
  function renderExam(lesson) {
    const stats=getState().lessonResults[lesson.id];
    if (!exam || exam.lessonId!==lesson.id) {
      const count=1+(bank[lesson.id]||[]).length;
      return `<section class="surface lesson-exam" id="lesson-exam"><span class="check-label">اختبار هذا الدرس</span><h2>هل أصبحت الفكرة أوضح؟</h2><p>اختبر فهمك في ${n(count)} أسئلة متنوعة. بعد كل سؤال يظهر التفسير، ويمكنك الإعادة متى شئت.</p>${statsLine(stats)}<div class="inline-actions"><button type="button" class="btn btn-primary" data-exam-start="${html(lesson.id)}">ابدأ اختبار الدرس ${I('arrowLeft')}</button><button type="button" class="btn btn-secondary" data-go="review">تقدّمي وأخطائي</button></div></section>`;
    }
    if(exam.done) return `<section class="surface lesson-exam" id="lesson-exam"><span class="check-label">انتهى اختبار الدرس</span><h2>${exam.score===exam.items.length?'أحسنت! فهم متين.':'كل محاولة تقرّبك أكثر.'}</h2><div class="result-score">${scoreText({score:exam.score,total:exam.items.length})}</div><p>هذه نتيجة المحاولة، ويمكنك العودة إلى شرح الإجابات أو خوض الاختبار من جديد.</p>${statsLine(stats)}<div class="inline-actions"><button type="button" class="btn btn-primary" data-exam-start="${html(lesson.id)}">أعد الاختبار ${I('rotate')}</button><button type="button" class="btn btn-secondary" data-go="review">راجع أخطائي ${I('arrowLeft')}</button></div></section>`;
    const q=exam.items[exam.index];
    let controls='';
    if(q.type==='choice') controls=`<div class="quiz-options">${q.choices.map((o,i)=>`<button type="button" class="quiz-option ${exam.answered?(o.correct?'correct':(exam.choice===i?'wrong':'')):''}" data-exam-choice="${i}" ${exam.answered?'disabled':''}>${html(o.text)}</button>`).join('')}</div>`;
    if(q.type==='write') controls=`${exam.answered?'':answerInput('exam-write')} ${exam.answered?'':`<button type="button" class="btn btn-primary activity-submit" data-exam-submit>تحقّق ${I('check')}</button>`}`;
    if(q.type==='order') controls=`${builder(exam,'exam')}${exam.answered?'':`<button type="button" class="btn btn-primary activity-submit" data-exam-submit>تحقّق من الترتيب ${I('check')}</button>`}`;
    const correct=q.type==='choice'?q.options[q.answer]:q.answer;
    return `<section class="surface lesson-exam" id="lesson-exam"><span class="check-label">اختبار الدرس · ${q.type==='choice'?'اختيار':q.type==='write'?'اكتب':'رتّب'}</span>${progressLine(exam.index,exam.items.length,exam.score,exam.answered)}<h2 class="activity-question">${html(q.q)}</h2>${controls}${exam.answered?`${feedback(exam.good,correct,q.explain,exam.given)}<button type="button" class="btn btn-primary activity-next" data-exam-next>${exam.index===exam.items.length-1?'عرض النتيجة':'السؤال التالي'} ${I('arrowLeft')}</button>`:''}</section>`;
  }
  function submitExam(given, choice=null) {
    if(!exam || exam.done || exam.answered) return;
    const q=exam.items[exam.index], correct=q.type==='choice'?q.options[q.answer]:q.answer;
    const good=q.type==='choice'?!!q.choices[choice]?.correct:sameAnswer(given,correct,q.alternatives||[]);
    exam.answered=true; exam.good=good; exam.given=given; exam.choice=choice;
    if(good) exam.score++;
    recordMistake(`exam:${exam.lessonId}:${q.index}`,'اختبار درس',q.q,correct,q.explain,given,`lesson/${exam.lessonId}`,good);
    render(true);
  }
  function wordPool(mode) {
    const unique=new Set();
    return D.words.filter(w=>{
      const text=w.h.trim(), count=text.split(/\s+/).length;
      if(w.noAudio || !AUDIO[text] || unique.has(text.toLocaleLowerCase('en')))return false;
      unique.add(text.toLocaleLowerCase('en'));
      return mode==='word'?count===1:count>1 && count<=6;
    });
  }
  function startDictation(mode) {
    const items=shuffle(wordPool(mode)).slice(0,8);
    if(!items.length){notify('لا توجد مقاطع متاحة لهذا النمط.');return;}
    dictation={mode,items,index:0,score:0,answered:false,good:false,given:'',done:false};
  }
  function renderDictation() {
    const stats=getState().dictation;
    const heading=pageHeader('استمع واكتب','الإملاء بالهوسا','استمع إلى كلمة أو عبارة، ثم اكتب ما سمعت. أعد الصوت أو أبطئه قبل التصحيح.');
    const note=`<div class="activity-note">${I('info')}<p><strong>مهم قبل أن تبدأ:</strong> الصوت آلي تقريبي ولا يمثل لهجة محلية موثّقة، وقد لا يميّز النغمة أو طول الحركة أو بعض الحروف بدقة. قارن بتسجيلات بشرية، ولا تعتبره مرجعًا نهائيًا للنطق.</p></div>`;
    if(!dictation) return `<div class="page activity-page">${heading}<div class="activity-layout"><section class="surface activity-card"><span class="icon-tile tile-yellow activity-icon">${I('headphones')}</span><span class="eyebrow">تدريب أذنك ويدك</span><h2>اختر نوع الجولة</h2><p>كل جولة تضم حتى ${n(8)} مقاطع مختارة عشوائيًا. اكتب الصيغة التي تسمعها في التسجيل تحديدًا، ولا تظهر الإجابة حتى التحقق.</p><div class="mode-grid"><button type="button" class="mode-card" data-dict-start="word"><strong>كلمات منفردة</strong><span>تدريب على المفردات والحروف</span></button><button type="button" class="mode-card" data-dict-start="phrase"><strong>عبارات قصيرة</strong><span>اكتب أكثر من كلمة في سياق</span></button></div><div class="activity-rules"><strong>كيف يصحّح الموقع؟</strong><p>يتجاهل الفرق بين الأحرف الكبيرة والصغيرة والمسافات وعلامات الترقيم النهائية، ويقبل أشكال الفاصلة العليا مثل ’ و'. لكنه يميّز حروف الهوسا: <bdi dir="ltr">ƙ ≠ k · ɗ ≠ d · ɓ ≠ b</bdi>.</p></div>${statsLine(stats)}</section><aside>${note}<div class="surface aside-tip"><h3>هل تحتاج إلى لوحة هوسا؟</h3><p>ستجد أزرارًا لإدراج الأحرف الخاصة أسفل خانة الإجابة.</p><button type="button" class="text-link" data-go="audio">التسجيلات البشرية ${I('arrowLeft')}</button></div></aside></div></div>`;
    if(dictation.done) return `<div class="page activity-page">${heading}<section class="surface activity-card result-card"><span class="eyebrow">اكتملت جولة الإملاء</span><h2>أحسنت على التدريب!</h2><div class="result-score">${scoreText({score:dictation.score,total:dictation.items.length})}</div><p>حُفظت النتيجة على هذا الجهاز. يمكنك مراجعة إجاباتك غير الصحيحة أو بدء جولة جديدة.</p>${statsLine(stats)}<div class="inline-actions"><button type="button" class="btn btn-primary" data-dict-start="${dictation.mode}">جولة جديدة ${I('rotate')}</button><button type="button" class="btn btn-secondary" data-dict-reset>تغيير النوع</button>${button('مراجعة الأخطاء','review','btn-secondary','arrowLeft')}</div></section>${note}</div>`;
    const w=dictation.items[dictation.index];
    return `<div class="page activity-page">${heading}<div class="activity-layout"><section class="surface activity-card"><span class="eyebrow">${dictation.mode==='word'?'كلمات منفردة':'عبارات قصيرة'}</span>${progressLine(dictation.index,dictation.items.length,dictation.score,dictation.answered)}<h2 class="activity-question">استمع واكتب ما تسمعه</h2><div class="listen-controls"><button type="button" class="btn btn-primary listen-button" data-dict-play="1" aria-label="تشغيل المقطع الصوتي">${I('volume')} تشغيل المقطع</button><button type="button" class="btn btn-secondary listen-button" data-dict-play="slow" aria-label="تشغيل المقطع ببطء">${I('headphones')} تشغيل ببطء</button></div><p class="activity-muted">يمكنك الاستماع أكثر من مرة قبل أن تجيب.</p>${dictation.answered?'':`${answerInput('dictation-input')}<button type="button" class="btn btn-primary activity-submit" data-dict-submit>تحقّق من الكتابة ${I('check')}</button>`}${dictation.answered?`${feedback(dictation.good,w.h,`المعنى: ${w.a}. تذكّر أن الحروف الخاصة جزء من التهجئة.`,dictation.given)}<button type="button" class="btn btn-primary activity-next" data-dict-next>${dictation.index===dictation.items.length-1?'عرض النتيجة':'المقطع التالي'} ${I('arrowLeft')}</button>`:''}<button type="button" class="text-link activity-abandon" data-dict-reset>إنهاء الجولة والعودة للأنواع</button></section><aside>${note}<div class="surface aside-tip"><h3>نصيحة</h3><p>اكتب الحروف كما تسمعها، واستخدم لوحة الحروف الخاصة. تُحسب النتيجة بعد إنهاء الجولة فقط.</p></div></aside></div></div>`;
  }
  function submitDictation(value) {
    const d=dictation, w=d.items[d.index];
    d.given=value; d.good=sameAnswer(value,w.h); d.answered=true;
    if(d.good)d.score++;
    recordMistake(`dict:${w.id}`,'إملاء',`اكتب ما تسمعه: ${w.a}`,w.h,`المعنى: ${w.a}.`,value,'dictation',d.good);
    render(true);
  }
  function startSentences(group) {
    const pool=group==='all'?sentenceBank:sentenceBank.filter(s=>s.group===group);
    sentences={group,items:shuffle(pool).slice(0,8),index:0,score:0,answered:false,good:false,given:'',selected:[],tokens:[],done:false};
    resetSentence();
  }
  function resetSentence(){sentences.answered=false;sentences.good=false;sentences.given='';sentences.selected=[];sentences.tokens=makeTokens(sentences.items[sentences.index].answer);}
  function renderSentences() {
    const stats=getState().sentences;
    const heading=pageHeader('من المفردة إلى العبارة','تكوين الجمل','رتّب الكلمات لتبني جملة توافق المعنى المطلوب، ثم استمع إلى الصيغة الصحيحة.');
    if(!sentences) return `<div class="page activity-page">${heading}<div class="activity-layout"><section class="surface activity-card"><span class="icon-tile tile-lavender activity-icon">${I('message')}</span><span class="eyebrow">تعلّم بالتركيب</span><h2>اختر مجال الجمل</h2><p>اضغط الكلمات واحدة تلو الأخرى. يمكنك إزالة كلمة بالضغط عليها مرة أخرى. ترتيب السؤال المقصود هو الصيغة التي علّمناها.</p><div class="mode-grid"><button type="button" class="mode-card" data-sentence-start="basic"><strong>الجمل الأولى</strong><span>الحيازة والرغبة والتعريف بالنفس</span></button><button type="button" class="mode-card" data-sentence-start="grammar"><strong>القواعد</strong><span>الأفعال والنفي والتعريف</span></button><button type="button" class="mode-card" data-sentence-start="daily"><strong>مواقف يومية</strong><span>الأسئلة والوقت والاتجاه</span></button><button type="button" class="mode-card" data-sentence-start="all"><strong>تحدٍّ متنوع</strong><span>${n(sentenceBank.length)} جملة في البنك</span></button></div>${statsLine(stats)}</section><aside><div class="activity-note">${I('info')}<p>قد توجد صيغ صحيحة أخرى للمعنى نفسه؛ يقبل التمرين الترتيب المستهدف بهذه الكلمات فقط.</p></div><div class="surface aside-tip"><h3>ابدأ بالشرح</h3><p>للتعرّف على تركيب أول جملة، افتح درس بناء الجملة.</p><button type="button" class="text-link" data-go="lesson/build-basic">افتح الدرس ${I('arrowLeft')}</button></div></aside></div></div>`;
    if(sentences.done) return `<div class="page activity-page">${heading}<section class="surface activity-card result-card"><span class="eyebrow">اكتملت الجولة</span><h2>أصبحت أقرب إلى تكوين جملك!</h2><div class="result-score">${scoreText({score:sentences.score,total:sentences.items.length})}</div><p>احتفظنا بالنتيجة في هذا المتصفح. راجع الأسئلة التي أخطأت فيها وجرّب مجددًا.</p>${statsLine(stats)}<div class="inline-actions"><button type="button" class="btn btn-primary" data-sentence-start="${sentences.group}">جولة جديدة ${I('rotate')}</button><button type="button" class="btn btn-secondary" data-sentence-reset>تغيير المجال</button>${button('مراجعة الأخطاء','review','btn-secondary','arrowLeft')}</div></section></div>`;
    const item=sentences.items[sentences.index];
    return `<div class="page activity-page">${heading}<div class="activity-layout"><section class="surface activity-card"><span class="eyebrow">كوّن الجملة</span>${progressLine(sentences.index,sentences.items.length,sentences.score,sentences.answered)}<h2 class="activity-question">${html(item.ar)}</h2>${builder(sentences,'sentence')}${sentences.answered?`${feedback(sentences.good,item.answer,item.explain,sentences.given)}<div class="inline-actions activity-next"><button type="button" class="btn btn-secondary" data-sentence-listen>${I('volume')} استمع للجملة</button><button type="button" class="btn btn-primary" data-sentence-next>${sentences.index===sentences.items.length-1?'عرض النتيجة':'الجملة التالية'} ${I('arrowLeft')}</button></div>`:`<button type="button" class="btn btn-primary activity-submit" data-sentence-submit>تحقّق من الجملة ${I('check')}</button>`}<button type="button" class="text-link activity-abandon" data-sentence-reset>إنهاء الجولة والعودة للمجالات</button></section><aside><div class="activity-note">${I('info')}<p>رتّب الكلمات بالصيغة المستهدفة في الدروس. قد توجد تراكيب أخرى صحيحة لا يغطيها هذا التمرين.</p></div></aside></div></div>`;
  }
  function submitSentence() {
    const s=sentences, item=s.items[s.index];
    s.given=currentSequence(s); s.good=sameAnswer(s.given,item.answer);s.answered=true;
    if(s.good)s.score++;
    recordMistake(`sentence:${item.id}`,'تكوين جملة',item.ar,item.answer,item.explain,s.given,'sentences',s.good);
    render(true);
  }
  function renderReview() {
    const state=getState(), entries=Object.entries(state.lessonResults).filter(([,v])=>v.attempts>0);
    return `<div class="page activity-page">${pageHeader('محفوظ على هذا الجهاز','تقدّمي ومراجعة الأخطاء','اطّلع على نتائجك، وراجع النقاط التي تحتاج إلى مزيد من التدريب.')}
      <div class="review-stats"><div class="surface review-stat"><strong>${n(state.completed.length)}<small> / ${n(D.lessons.length)}</small></strong><span>دروس حددتها مكتملة</span></div><div class="surface review-stat"><strong>${n(entries.length)}</strong><span>دروس أنهيت اختبارها</span></div><div class="surface review-stat"><strong>${n(state.mistakes.length)}</strong><span>أسئلة تحتاج مراجعة</span></div></div>
      <section class="section"><div class="section-heading"><div><span class="eyebrow">محاولات الدروس</span><h2>نتائج اختباراتك</h2></div><button class="text-link" type="button" data-go="path">كل الدروس ${I('arrowLeft')}</button></div>${entries.length?`<div class="result-list">${entries.map(([id,v])=>{const l=D.lessons.find(x=>x.id===id);return l?`<article class="surface result-row"><div><strong>${html(l.title)}</strong><span>آخر نتيجة ${scoreText(v.last)} · الأفضل ${scoreText(v.best)} · ${n(v.attempts)} محاولات</span></div><button type="button" class="btn btn-secondary btn-small" data-go="lesson/${html(id)}">مراجعة الدرس</button></article>`:''}).join('')}</div>`:`<div class="surface review-empty"><p>لم تُنهِ اختبار درس بعد. افتح أي درس وستجد اختباره في آخر الشرح.</p></div>`}</section>
      <section class="section"><div class="section-heading"><div><span class="eyebrow">فرصة أخرى للتعلّم</span><h2>أخطائي للمراجعة</h2><p>تُزال تلقائيًا عند الإجابة عن السؤال نفسه إجابة صحيحة، أو يمكنك إزالتها يدويًا.</p></div></div>${state.mistakes.length?`<div class="mistake-list">${state.mistakes.map(m=>`<article class="surface mistake-card"><div class="card-head"><span class="tag sand">${html(m.source)}</span><button type="button" class="icon-button" data-mistake-dismiss="${html(m.id)}" aria-label="إزالة من المراجعة">${I('x')}</button></div><h3>${html(m.prompt)}</h3><p>إجابتك: <bdi lang="ha">${html(m.given)}</bdi></p><p>الإجابة المطلوبة: <bdi lang="ha">${html(m.answer)}</bdi></p><p class="mistake-explain">${html(m.explain)}</p><button type="button" class="text-link" data-go="${html(m.path)}">العودة للتدريب ${I('arrowLeft')}</button></article>`).join('')}</div>`:`<div class="surface review-empty"><p>لا توجد أخطاء محفوظة للمراجعة الآن. يمكنك البدء بأي تدريب.</p></div>`}</section>
      <section class="section"><div class="section-heading"><div><span class="eyebrow">نتائج الأنشطة</span><h2>الإملاء وتكوين الجمل</h2></div></div><div class="review-activities"><div class="surface aside-tip"><h3>الإملاء</h3>${statsLine(state.dictation)}<button type="button" class="text-link" data-go="dictation">ابدأ الإملاء ${I('arrowLeft')}</button></div><div class="surface aside-tip"><h3>تكوين الجمل</h3>${statsLine(state.sentences)}<button type="button" class="text-link" data-go="sentences">رتّب الجمل ${I('arrowLeft')}</button></div></div></section>
      <section class="surface backup-card section"><div><span class="eyebrow">نسخة احتياطية محلية</span><h2>احتفظ بتقدّمك</h2><p>صدّر بياناتك إلى ملف JSON أو استورد نسخة سابقة. الاستيراد يستبدل بيانات هذا المتصفح. احتفظ بالملف في مكان خاص.</p></div><div class="inline-actions"><button type="button" class="btn btn-secondary" data-backup-export>تصدير التقدّم</button><button type="button" class="btn btn-secondary" data-backup-import>استيراد نسخة</button><input id="backup-file" type="file" accept="application/json,.json" hidden></div></section></div>`;
  }
  function handleClick(b) {
    if(b.dataset.examStart!==undefined){const l=D.lessons.find(x=>x.id===b.dataset.examStart);if(!l)return true;exam={lessonId:l.id,items:examItems(l),index:0,score:0,done:false};resetExamQuestion();render(true);return true;}
    if(b.dataset.examChoice!==undefined && exam&&!exam.answered){const i=Number(b.dataset.examChoice);submitExam(exam.items[exam.index].choices[i].text,i);return true;}
    if(b.hasAttribute('data-exam-submit')&&exam&&!exam.answered){const q=exam.items[exam.index];const value=q.type==='order'?currentSequence(exam):document.querySelector('#exam-write')?.value.trim();if(!value){notify('اكتب أو رتّب إجابتك أولًا.');return true;}if(q.type==='order'&&exam.selected.length!==exam.tokens.length){notify('استخدم جميع الكلمات أولًا.');return true;}submitExam(value);return true;}
    if(b.hasAttribute('data-exam-next')&&exam?.answered){if(exam.index===exam.items.length-1){exam.done=true;keepExamResult(exam.lessonId,{score:exam.score,total:exam.items.length});}else{exam.index++;resetExamQuestion();}render(true);return true;}
    if(b.dataset.dictStart!==undefined){startDictation(b.dataset.dictStart);render(true);return true;}
    if(b.hasAttribute('data-dict-reset')){dictation=null;render(true);return true;}
    if(b.dataset.dictPlay!==undefined && dictation&&!dictation.done){playText(dictation.items[dictation.index].h,b,b.dataset.dictPlay==='slow'?0.75:1);return true;}
    if(b.hasAttribute('data-dict-submit')&&dictation&&!dictation.answered){const value=document.querySelector('#dictation-input')?.value.trim();if(!value){notify('اكتب ما سمعت أولًا.');return true;}submitDictation(value);return true;}
    if(b.hasAttribute('data-dict-next')&&dictation?.answered){if(dictation.index===dictation.items.length-1){dictation.done=true;keepResult('dictation',{score:dictation.score,total:dictation.items.length});}else{dictation.index++;dictation.answered=false;dictation.given='';}render(true);return true;}
    if(b.dataset.sentenceStart!==undefined){startSentences(b.dataset.sentenceStart);render(true);return true;}
    if(b.hasAttribute('data-sentence-reset')){sentences=null;render(true);return true;}
    if(b.hasAttribute('data-sentence-submit')&&sentences&&!sentences.answered){if(sentences.selected.length!==sentences.tokens.length){notify('استخدم جميع الكلمات أولًا.');return true;}submitSentence();return true;}
    if(b.hasAttribute('data-sentence-listen')&&sentences?.answered){playText(sentences.items[sentences.index].answer,b,1);return true;}
    if(b.hasAttribute('data-sentence-next')&&sentences?.answered){if(sentences.index===sentences.items.length-1){sentences.done=true;keepResult('sentences',{score:sentences.score,total:sentences.items.length});}else{sentences.index++;resetSentence();}render(true);return true;}
    if(b.dataset.seqAdd!==undefined){const s=b.dataset.seqKind==='exam'?exam:sentences;const id=Number(b.dataset.seqAdd);if(s&&!s.answered&&!s.selected.includes(id)){s.selected.push(id);render(true);}return true;}
    if(b.dataset.seqRemove!==undefined){const s=b.dataset.seqKind==='exam'?exam:sentences;const id=Number(b.dataset.seqRemove);if(s&&!s.answered){s.selected=s.selected.filter(x=>x!==id);render(true);}return true;}
    if(b.dataset.insertChar!==undefined){const input=document.querySelector('#dictation-input, #exam-write');if(input){input.focus();const a=input.selectionStart??input.value.length, z=input.selectionEnd??a;input.setRangeText(b.dataset.insertChar,a,z,'end');input.dispatchEvent(new Event('input',{bubbles:true}));}return true;}
    if(b.dataset.mistakeDismiss!==undefined){const state=getState();state.mistakes=state.mistakes.filter(m=>m.id!==b.dataset.mistakeDismiss);save();render(true);notify('أُزيل السؤال من قائمة المراجعة.');return true;}
    if(b.hasAttribute('data-scroll-exam')){document.querySelector('#lesson-exam')?.scrollIntoView({block:'start',behavior:'smooth'});return true;}
    return false;
  }
  function reset(){exam=null;dictation=null;sentences=null;}
  return {renderExam,renderDictation,renderSentences,renderReview,handleClick,reset,normalizeAnswer};
};
