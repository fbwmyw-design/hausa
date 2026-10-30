(() => {
  'use strict';
  const D = window.HAUSA_DATA;
  const AUDIO = window.HAUSA_AUDIO || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const html = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const n = value => new Intl.NumberFormat('ar').format(value);
  const pct = value => `${n(value)}٪`;
  const fraction = (current, total) => `<bdi dir="ltr">${n(current)} / ${n(total)}</bdi>`;
  const icons = {
    grid:'<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>',
    route:'<path d="M6 18.5h8a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h9"/><circle cx="5" cy="18.5" r="1.7"/><circle cx="19" cy="4.5" r="1.7"/>',
    book:'<path d="M12 6.5C9.5 4.7 6.5 4.2 3.5 4.7v14c3-.5 6-.1 8.5 1.8 2.5-1.9 5.5-2.3 8.5-1.8v-14c-3-.5-6-.1-8.5 1.8Z"/><path d="M12 6.5v14"/>',
    layers:'<path d="m12 3.5 8.5 4.6L12 12.7 3.5 8.1 12 3.5Z"/><path d="m3.5 12 8.5 4.6 8.5-4.6M3.5 16l8.5 4.5 8.5-4.5"/>',
    headphones:'<path d="M4 13a8 8 0 0 1 16 0v4a2.5 2.5 0 0 1-2.5 2.5H16v-7h1.5A2.5 2.5 0 0 1 20 15M4 15a2.5 2.5 0 0 1 2.5-2.5H8v7H6.5A2.5 2.5 0 0 1 4 17v-4"/>',
    pencil:'<path d="m4 20 4-.7L19 8.3a2.3 2.3 0 0 0-3.3-3.3L4.7 16 4 20ZM14 6.7l3.3 3.3"/>',
    bookmark:'<path d="M6.5 4.5h11a1 1 0 0 1 1 1v15l-6.5-4-6.5 4v-15a1 1 0 0 1 1-1Z"/>',
    sparkles:'<path d="m12 3 1.6 4.7L18.5 9l-4.9 1.5L12 15.2l-1.5-4.7L5.5 9l5-1.3L12 3ZM19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14ZM5 14l.6 1.7 1.7.6-1.7.6L5 18.5l-.6-1.6-1.7-.6 1.7-.6L5 14Z"/>',
    message:'<path d="M20.5 11.5a7.7 7.7 0 0 1-8.1 7.5c-1 0-2-.2-2.9-.5l-4.3 1 .9-3.6a7.1 7.1 0 0 1-1.7-4.4A7.7 7.7 0 0 1 12.5 4a7.7 7.7 0 0 1 8 7.5Z"/><path d="M8.8 11.5h.1m3.5 0h.1m3.5 0h.1" stroke-width="2.6"/>',
    search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 4.5 4.5"/>',
    menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
    arrowLeft:'<path d="M19 12H5m6-6-6 6 6 6"/>',
    arrowRight:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
    arrowUpLeft:'<path d="M17 17 7 7m0 8V7h8"/>',
    check:'<path d="m5 12 4.2 4.2L19 6.5"/>',
    circleCheck:'<circle cx="12" cy="12" r="9"/><path d="m8.2 12 2.5 2.5 5.1-5.2"/>',
    circleX:'<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6m0-6-6 6"/>',
    clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>',
    volume:'<path d="M4 10v4h3l4 3V7l-4 3H4ZM14 9c1.7 1.4 1.7 4.6 0 6M16.7 6.5c3.4 2.8 3.4 8.2 0 11"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    globe:'<circle cx="12" cy="12" r="9"/><path d="M3.5 12h17M12 3c2.4 2.5 3.5 5.4 3.5 9s-1.1 6.5-3.5 9c-2.4-2.5-3.5-5.4-3.5-9S9.6 5.5 12 3Z"/>',
    leaf:'<path d="M20 4C9 4 4 8 4 14a6 6 0 0 0 6 6c6 0 10-5 10-16Z"/><path d="M4 20c3-4 6-6 11-8"/>',
    award:'<circle cx="12" cy="9" r="5.5"/><path d="m8.5 13.5-1 7 4.5-2.3 4.5 2.3-1-7"/>',
    rotate:'<path d="M19.5 10a7.5 7.5 0 1 0 .2 4M20 4v6h-6"/>',
    play:'<path d="m9 6 9 6-9 6V6Z"/>',
    cards:'<rect x="5" y="4" width="13" height="16" rx="2"/><path d="M8 8h7M8 12h7M8 16h4"/>',
    lock:'<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3M12 14v2"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon:'<path d="M20.5 14a8.5 8.5 0 1 1-10.5-10.5 6.5 6.5 0 0 0 10.5 10.5Z"/>',
    x:'<path d="m6 6 12 12M18 6 6 18"/>'
  };
  const I = name => `<svg class="svg-icon" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.sparkles}</svg>`;
  document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = I(el.dataset.icon); });

  const THEME_STORE = 'hawsa-theme';
  const applyTheme = (theme) => {
    const dark=theme!=='light';
    document.documentElement.dataset.theme=dark?'dark':'light';
    const toggle=$('#theme-toggle'), label=dark?'تفعيل الوضع الفاتح':'تفعيل الوضع المظلم';
    toggle.setAttribute('aria-label',label);toggle.title=label;
    toggle.querySelector('.theme-label').textContent=dark?'الوضع الفاتح':'الوضع المظلم';
    toggle.querySelector('.theme-short').textContent=dark?'فاتح':'مظلم';
    toggle.querySelector('.theme-icon').innerHTML=I(dark?'sun':'moon');
    document.querySelector('meta[name="theme-color"]').content=dark?'#111b16':'#efeee6';
  };
  applyTheme(document.documentElement.dataset.theme);
  $('#theme-toggle').addEventListener('click',()=>{
    const next=document.documentElement.dataset.theme==='dark'?'light':'dark';
    applyTheme(next);
    try{localStorage.setItem(THEME_STORE,next)}catch(_){}
  });
  const STORE = 'hawsa-learning-v1';
  const emptyState = () => ({completed:[], saved:[], quizBest:null, quizAttempts:0, lastLesson:null, lessonResults:{}, dictation:{attempts:0,last:null,best:null}, sentences:{attempts:0,last:null,best:null}, mistakes:[]});
  const cleanScore = value => {
    if (!value || typeof value!=='object' || !Number.isFinite(value.score) || !Number.isFinite(value.total)) return null;
    const score=Math.floor(value.score), total=Math.floor(value.total);
    return total>=1 && total<=1000 && score>=0 && score<=total ? {score,total} : null;
  };
  const cleanStats = value => {
    const last=cleanScore(value?.last), best=cleanScore(value?.best);
    return {attempts:Number.isFinite(value?.attempts)?Math.max(0,Math.min(1000000,Math.floor(value.attempts))):0,last,best};
  };
  function hydrateState(raw) {
    if (!raw || typeof raw!=='object' || Array.isArray(raw)) throw new Error('Invalid progress');
    const base=emptyState();
    base.completed=Array.isArray(raw.completed)?[...new Set(raw.completed.filter(id=>D.lessons.some(l=>l.id===id)))]:[];
    base.saved=Array.isArray(raw.saved)?[...new Set(raw.saved.filter(id=>D.words.some(w=>w.id===id)))]:[];
    base.quizBest=Number.isFinite(raw.quizBest)?Math.max(0,Math.min(8,Math.floor(raw.quizBest))):null;
    base.quizAttempts=Number.isFinite(raw.quizAttempts)?Math.max(0,Math.min(1000000,Math.floor(raw.quizAttempts))):0;
    base.lastLesson=D.lessons.some(l=>l.id===raw.lastLesson)?raw.lastLesson:null;
    if (raw.lessonResults && typeof raw.lessonResults==='object' && !Array.isArray(raw.lessonResults)) {
      for (const [id,result] of Object.entries(raw.lessonResults)) if(D.lessons.some(l=>l.id===id)) base.lessonResults[id]=cleanStats(result);
    }
    base.dictation=cleanStats(raw.dictation);base.sentences=cleanStats(raw.sentences);
    if(Array.isArray(raw.mistakes)) base.mistakes=raw.mistakes.filter(m=>m && typeof m==='object' && typeof m.id==='string' && typeof m.prompt==='string' && typeof m.answer==='string' && typeof m.path==='string' && (m.path==='dictation'||m.path==='sentences'||(m.path.startsWith('lesson/')&&D.lessons.some(l=>m.path===`lesson/${l.id}`)))).slice(0,100).map(m=>({id:m.id.slice(0,150),source:String(m.source||'تدريب').slice(0,80),prompt:m.prompt.slice(0,300),answer:m.answer.slice(0,300),explain:String(m.explain||'').slice(0,500),given:String(m.given||'').slice(0,160),path:m.path,at:String(m.at||'').slice(0,50)}));
    return base;
  }
  let state;
  try { state=hydrateState(JSON.parse(localStorage.getItem(STORE)||'{}')); } catch (_) { state=emptyState(); }
  const ui = { query:'', category:'all', visible:18, quiz:null, flashIndex:0, flashShown:false };
  let storageWarned=false;
  const save = () => { try { localStorage.setItem(STORE, JSON.stringify(state)); } catch (_) { if(!storageWarned){storageWarned=true;notify('تعذّر الحفظ في المتصفح؛ قد لا يبقى تقدّمك بعد الإغلاق.');} } };
  const findLesson = id => D.lessons.find(l => l.id === id);
  const findUnit = id => D.units.find(u => u.id === id);
  const isDone = id => state.completed.includes(id);
  const isSaved = id => state.saved.includes(id);
  const progress = () => Math.round(state.completed.length / D.lessons.length * 100);
  const categoryName = id => D.categories.find(c => c.id === id)?.name || '';
  const firstUnfinished = () => D.lessons.find(l => !isDone(l.id)) || D.lessons[D.lessons.length - 1];
  const route = () => {
    const raw = location.hash.replace(/^#\/?/, '');
    const parts = raw.split('/').filter(Boolean);
    return { page: parts[0] || 'home', id: parts[1] || null };
  };
  const pageNames = {home:'الرئيسية',path:'مسار التعلّم',lesson:'الدرس',dialects:'اللهجات المحلية',grammar:'القواعد',words:'المفردات',audio:'النطق والاستماع',practice:'التدريبات',dictation:'الإملاء',sentences:'تكوين الجمل',review:'تقدّمي وأخطائي',saved:'المحفوظات',sources:'عن المحتوى والمصادر'};
  let lastRenderedPage = '';
  let activeAudio = null;
  let toastTimer;
  const notify = text => {
    const toast = $('#toast'); toast.textContent = text; toast.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
  };
  const go = path => {
    closeMenu();
    const hash = '#/' + path;
    if (location.hash === hash) { render(false); window.scrollTo({top:0,behavior:'smooth'}); }
    else location.hash = hash;
  };
  const updateChrome = r => {
    const active = r.page === 'lesson' ? 'path' : r.page;
    document.querySelectorAll('[data-nav]').forEach(el => {
      const on = el.dataset.nav === active;
      el.classList.toggle('active', on);
      if (on) el.setAttribute('aria-current','page'); else el.removeAttribute('aria-current');
    });
    $('#page-name').textContent = r.page === 'lesson' ? (findLesson(r.id)?.title || 'الدرس') : (pageNames[r.page] || 'الرئيسية');
    $('#side-percent').textContent = pct(progress());
    $('#side-progress-fill').style.width = `${progress()}%`;
    const count = $('#saved-count'); count.textContent = n(state.saved.length); count.hidden = state.saved.length === 0;
    document.title = `${pageNames[r.page] || 'هَوْسا'} | هَوْسا لتعلّم لغة الهوسا`;
  };
  const pageHeader = (eyebrow, title, desc, actions='') => `<div class="page-header"><div><span class="eyebrow">${html(eyebrow)}</span><h1>${html(title)}</h1><p>${html(desc)}</p></div>${actions ? `<div class="page-header-actions">${actions}</div>` : ''}</div>`;
  const button = (label, path, variant='btn-primary', icon='arrowLeft', extra='') => `<button type="button" class="btn ${variant} ${extra}" data-go="${html(path)}">${html(label)} ${icon ? I(icon) : ''}</button>`;
  const audioBtn = (text, label='') => `<button type="button" class="audio-button" data-say="${html(text)}" aria-label="${html(label || `تشغيل النطق الآلي: ${text}`)}" title="نطق آلي تقريبي">${I('volume')}</button>`;
  const saveBtn = word => `<button type="button" class="icon-button ${isSaved(word.id)?'saved':''}" data-save="${html(word.id)}" aria-label="${isSaved(word.id)?'إزالة من المحفوظات':'حفظ الكلمة'}: ${html(word.h)}" aria-pressed="${isSaved(word.id)}" title="${isSaved(word.id)?'إزالة من المحفوظات':'حفظ الكلمة'}">${I('bookmark')}</button>`;

  function activityShortcuts() {
    const list=[
      ['headphones','yellow','الإملاء','استمع واكتب ثم راجع التهجئة','dictation'],
      ['message','lavender','تكوين الجمل','رتّب الكلمات لتبني عبارتك','sentences'],
      ['award','mint','تقدّمي وأخطائي','راجع النتائج وما يحتاج للتدريب','review']
    ];
    return `<div class="activity-shortcuts">${list.map(x=>`<button type="button" class="surface activity-shortcut" data-go="${x[4]}"><span class="icon-tile tile-${x[1]}">${I(x[0])}</span><span class="shortcut-copy"><strong>${x[2]}</strong><small>${x[3]}</small></span>${I('arrowLeft')}</button>`).join('')}</div>`;
  }

  function renderHome() {
    const next = firstUnfinished();
    const nextUnit = findUnit(next.unit);
    const completeAll = state.completed.length === D.lessons.length;
    const start = D.words.find(w => w.id === 'sannu');
    const features = [
      ['route','mint','مسار التعلّم',`${n(D.lessons.length)} درسًا لخطوة واثقة`,'path'],
      ['book','lavender','القواعد','افهم القاعدة بأمثلة بسيطة','grammar'],
      ['layers','peach','المفردات',`${n(D.words.length)} كلمة وعبارة مفيدة`,'words'],
      ['headphones','yellow','النطق والاستماع','استمع وكرّر على مهل','audio']
    ];
    return `<div class="page overview-page">
      <div class="intro-row"><div class="intro-copy"><h1>أهلًا بك في هَوْسا <span class="mini-greeting" lang="ha" dir="ltr">Sannu!</span></h1><p>رحلة جديدة تبدأ بكلمة، ونحن هنا لنمشيها معك.</p></div><span class="level-pill">${I('sparkles')} مسارك التأسيسي</span></div>
      <section class="hero" aria-label="ابدأ تعلّم الهوسا">
        <img class="hero-art" src="assets/hero-illustration.webp" alt="" fetchpriority="high">
        <div class="hero-copy"><div class="hero-kicker">تعلّم لغةً، واكتشف عالمًا</div><h2>الهوسا أقرب إليك،<br><span>كلمةً بعد كلمة.</span></h2><p>دروس بالعربية، مفردات من الحياة اليومية، واستماع وتمارين تساعدك على البدء بثقة.</p><div class="hero-actions">${button(completeAll?'راجع المسار':'ابدأ رحلتك',completeAll?'path':`lesson/${next.id}`,'hero-btn','arrowLeft')}<button class="hero-plain" type="button" data-go="path">استكشف المنهج ${I('arrowLeft')}</button></div><div class="hero-foot"><span>${I('book')} ${n(D.lessons.length)} درسًا تأسيسيًا</span><i></i><span>${I('clock')} تعلّم بالسرعة التي تناسبك</span></div></div>
      </section>
      <section class="region-strip" aria-label="التركيز اللهجي">
        <div class="region-strip-icon">${I('globe')}</div><div class="region-strip-copy"><span class="eyebrow">أقرب إلى ما يهمّك</span><h2>كاتسينا، سوكوتو، كادونا وداورا</h2><p>أمثلة للفروق المحلية إلى جانب الأساس المعياري، دون افتراض لهجة واحدة للجميع.</p></div><button type="button" class="btn btn-soft" data-go="dialects">اكتشف الفروق ${I('arrowLeft')}</button>
      </section>
      <section class="section"><div class="section-heading"><div><span class="eyebrow">كل شيء يبدأ من هنا</span><h2>تعلّم بطريقتك</h2><p>كل ما تحتاجه لتخطو خطوتك الأولى.</p></div><button class="text-link" type="button" data-go="path">استعرض المسار ${I('arrowLeft')}</button></div><div class="feature-grid">${features.map((f,i)=>`<button type="button" class="feature-card" data-go="${f[4]}"><div class="card-head"><span class="icon-tile tile-${f[1]}">${I(f[0])}</span><span class="feature-number">0${i+1}</span></div><h3>${f[2]}</h3><p>${f[3]}</p><span class="feature-arrow">${I('arrowLeft')}</span></button>`).join('')}</div></section>
      <section class="section"><div class="section-heading"><div><span class="eyebrow">تعلّم بالتطبيق</span><h2>تدرّب على ما تعلّمته</h2><p>إملاء وتركيب جمل ومراجعة شخصية لأخطائك.</p></div><button class="text-link" type="button" data-go="practice">جميع التدريبات ${I('arrowLeft')}</button></div>${activityShortcuts()}</section>
      <section class="section"><div class="section-heading"><div><span class="eyebrow">رحلتك الخاصة</span><h2>ابدأ من حيث أنت</h2></div><span class="small muted">تقدّمك محفوظ على هذا الجهاز</span></div><div class="overview-bottom"><div class="surface next-card"><div class="card-head"><div><span class="eyebrow">الخطوة التالية</span><h3 class="card-title">${completeAll?'أحسنت، أكملت المسار!':'درس صغير، تقدّم كبير.'}</h3><span class="small muted">${completeAll?'يمكنك إعادة المراجعة في أي وقت.':'استمر بخطوة واحدة في كل مرة.'}</span></div><span class="icon-tile tile-mint">${I('leaf')}</span></div><div class="next-lesson"><span class="lesson-index">${nextUnit.no}</span><div class="next-lesson-text"><strong>${html(next.title)}</strong><span>${html(nextUnit.title)} · ${n(next.minutes)} دقائق تقريبًا</span></div>${button(completeAll?'راجع':'ابدأ الدرس',`lesson/${next.id}`,'btn-soft','arrowLeft','btn-small')}</div><div class="progress-caption"><span>تقدّمك في المسار</span><b>${fraction(state.completed.length,D.lessons.length)} دروس</b></div><div class="progress-track"><span style="width:${progress()}%"></span></div></div>
      <div class="surface starter-card"><div class="card-head"><span class="word-kicker">${I('sparkles')} كلمتك الأولى</span>${saveBtn(start)}</div><div class="starter-word" lang="ha">${html(start.h)}</div><p class="starter-meaning">${html(start.a)} <span class="word-hint">· ${html(start.p)}</span></p><div class="starter-footer"><span class="word-hint">استمع وقلها بصوتك</span><div class="inline-actions"><span class="word-hint">صوت آلي تقريبي</span>${audioBtn(start.h)}</div></div></div></div></section>
    </div>`;
  }
  function renderPath(id) {
    return `<div class="page">${pageHeader('خطتك خطوة بخطوة','مسار تعلّم الهوسا','من الحروف الأولى إلى محادثة بسيطة، في وحدات متدرجة يمكنك دراستها بالترتيب الذي يناسبك.')}
      <div class="page-intro-banner"><span class="icon-tile tile-mint">${I('route')}</span><div><strong>رحلتك للتأسيس</strong><p>${n(D.lessons.length)} درسًا موزّعًا على ${n(D.units.length)} وحدات. اختر درسًا وابدأ الآن.</p></div><div class="progress-info"><div class="progress-caption"><span>الدروس المكتملة</span><b>${fraction(state.completed.length,D.lessons.length)}</b></div><div class="progress-track"><span style="width:${progress()}%"></span></div></div></div>
      <div class="path-units">${D.units.map(u=>{
        const count = u.lessons.filter(isDone).length;
        return `<section class="surface unit-card ${id===u.id?'highlight':''}" id="unit-${html(u.id)}"><div class="unit-top"><div class="unit-heading"><span class="icon-tile tile-${u.color}">${I(u.icon)}</span><div><span class="unit-label" dir="ltr">UNIT ${u.no}</span><h2>${html(u.title)}</h2><p>${html(u.sub)}</p></div></div><span class="count-pill">${fraction(count,u.lessons.length)} مكتمل</span></div><div class="unit-lessons">${u.lessons.map((lid,index)=>{const l=findLesson(lid);return `<button type="button" class="lesson-row ${isDone(lid)?'complete':''}" data-go="lesson/${lid}"><span class="lesson-index">${isDone(lid)?I('check'):`0${index+1}`}</span><span class="row-text"><strong>${html(l.title)}</strong><small>${n(l.minutes)} دقائق · ${isDone(lid)?'مكتمل':'درس تأسيسي'}</small></span>${I('arrowLeft')}</button>`}).join('')}</div></section>`;
      }).join('')}</div></div>`;
  }
  function example(e) { return `<div class="example"><div class="example-copy"><div class="example-word" lang="ha">${html(e.h)}</div><div class="example-meaning">${html(e.a)}</div>${e.p?`<div class="example-pron">${html(e.p)}</div>`:''}</div>${e.noAudio?'<span class="audio-unavailable">بلا صوت لهجي موثّق</span>':audioBtn(e.h)}</div>`; }
  function renderTable(table) {
    if (!table) return '';
    return `<div class="table-wrap"><table><thead><tr>${table.headers.map(h=>`<th scope="col">${html(h)}</th>`).join('')}</tr></thead><tbody>${table.rows.map(row=>`<tr>${row.map(cell=>`<td dir="auto">${html(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  function renderLessonSection(s) {
    return `<section class="surface"><h2>${html(s.title)}</h2>${s.text?`<p>${html(s.text)}</p>`:''}${s.list?`<ul>${s.list.map(x=>`<li>${html(x)}</li>`).join('')}</ul>`:''}${renderTable(s.table)}${s.examples?`<div class="examples">${s.examples.map(example).join('')}</div>`:''}${s.note?`<div class="note-box">${I('info')}<p>${html(s.note)}</p></div>`:''}</section>`;
  }
  function renderLesson(id) {
    const l = findLesson(id);
    if (!l) return renderNotFound();
    const u = findUnit(l.unit);
    const unitIndex = u.lessons.indexOf(l.id) + 1;
    const index = D.lessons.findIndex(x=>x.id===id);
    const next = D.lessons[index+1];
    return `<div class="page"><button class="breadcrumb-back" type="button" data-go="path/${u.id}">${I('arrowRight')} العودة إلى مسار التعلّم</button>${pageHeader(`الوحدة ${n(Number(u.no))} · الدرس ${n(unitIndex)}`,l.title,l.subtitle,`<span class="count-pill">${I('clock')} ${n(l.minutes)} دقائق تقريبًا</span>`)}
      <div class="lesson-layout"><div class="lesson-main">${l.sections.map(renderLessonSection).join('')}${activities.renderExam(l)}<div class="lesson-end"><button type="button" class="btn ${isDone(l.id)?'btn-secondary':'btn-primary'}" data-complete="${html(l.id)}">${I(isDone(l.id)?'circleCheck':'check')} ${isDone(l.id)?'تم إكمال الدرس · تراجع':'أكملت هذا الدرس'}</button>${next?button('الدرس التالي',`lesson/${next.id}`,'btn-soft','arrowLeft'):button('اختبر ما تعلّمته','practice','btn-soft','arrowLeft')}</div><p class="small muted" style="margin:10px 2px 0">حدّد الإكمال عندما تنتهي؛ يمكنك التراجع عنه بالضغط مرة أخرى.</p></div><aside class="lesson-side"><div class="surface"><h3>في هذا الدرس ستتعلّم</h3><ul class="objectives">${l.objectives.map(x=>`<li>${I('circleCheck')}<span>${html(x)}</span></li>`).join('')}</ul><div class="lesson-meta-list"><span>${I('clock')} ${n(l.minutes)} دقائق</span><span>${I('book')} ${html(u.title)}</span></div><button type="button" class="text-link exam-jump" data-scroll-exam>انتقل لاختبار الدرس ${I('arrowLeft')}</button></div><div class="surface"><h3>استمع وقارن</h3><p class="small muted">الأصوات القصيرة آلية ولا تمثّل لهجة محلية موثّقة؛ التسجيلات البشرية من النيجر للمقارنة فقط.</p><button type="button" class="text-link" data-go="audio">إلى مكتبة الاستماع ${I('arrowLeft')}</button></div></aside></div></div>`;
  }
  function renderDialects() {
    const regions=[
      ['كاتسينا','Katsinanci','تنوع انتقالي، يربطه بعض الباحثين بالمجموعة الغربية.'],
      ['سوكوتو','Sakkwatanci','تنوع غربي، وتذكر الدراسة أمثلة خاصة به.'],
      ['داورا (دورا)','Dauranci','تنوع مستقل عن التعميمات على كاتسينا أو سوكوتو.'],
      ['زاريا في كادونا','Zazzaganci','يرتبط بزاريا، ولا يمثّل ولاية كادونا كلها.']
    ];
    return `<div class="page dialect-page">${pageHeader('مسارك حسب اهتمامك','افهم الفروق المحلية','نركّز على أمثلة تهمّ أهل كاتسينا وسوكوتو وكادونا وداورا، مع إبقاء الصيغ المعيارية المفيدة.')}
      <section class="dialect-hero"><div class="dialect-hero-copy"><span class="eyebrow">الهوسا ليست طريقة واحدة</span><h2>اسمع الاختلاف،<br><span>وافهم المعنى.</span></h2><p>قد تسمع لصيغة واحدة أكثر من شكل صحيح. تعلّم البدائل في سياقها، ثم اسأل المتحدث المحلي عمّا يستعمله هو.</p><div class="inline-actions">${button('ابدأ درس الفروق','lesson/regional-variation','hero-btn','arrowLeft')}${button('شرح الملكية','lesson/possessive','btn-secondary','book')}</div></div><div class="dialect-example"><span>مقارنة سريعة</span><strong lang="ha" dir="ltr">gidanshi <i>/</i> gidansa</strong><p>كلتاهما: <b>بيته</b></p><small>أما <bdi lang="ha">gidanta</bdi> فهي «بيتها».</small></div></section>
      <section class="section"><div class="section-heading"><div><span class="eyebrow">أربع مناطق، تنوّع أوسع</span><h2>أسماء قد تصادفها في المراجع</h2><p>هذه أسماء تنوعات، وليست حدودًا ثابتة أو تعميمًا على كل أهل المنطقة.</p></div></div><div class="region-grid">${regions.map((r,i)=>`<article class="surface region-card"><span class="region-number">0${i+1}</span><h3>${r[0]}</h3><strong lang="ha" dir="ltr">${r[1]}</strong><p>${r[2]}</p></article>`).join('')}</div></section>
      <section class="section region-details"><article class="surface region-detail"><span class="eyebrow">الملكية دون حيرة</span><h2>من هو المالك، وما الشيء المملوك؟</h2><p>في هذا الدرس نعرض <bdi lang="ha">gidanshi</bdi> بوصفها صيغة لهجية موثقة، و<bdi lang="ha">gidansa</bdi> صيغة معيارية شائعة؛ لا نعد أيًّا منهما خطأ. تغيّر الرابط في المثال التالي مرتبط بجنس الاسم المملوك.</p>${renderTable({headers:['البيت · مذكر','السيارة · مؤنث','المعنى'],rows:[['gidanshi / gidansa','motarshi / motarsa','بيته / سيارته'],['gidanta','motarta','بيتها / سيارتها']]})}<p class="region-caption">في سؤال كتابة «بيته» نقبل البديلين؛ أما الإملاء فيطلب كتابة الصوت الذي سمعته تحديدًا.</p>${button('درس الملكية والاختبار','lesson/possessive','btn-soft','arrowLeft')}</article><aside class="surface region-detail region-caution"><span class="icon-tile tile-yellow">${I('info')}</span><h2>مهم للاستماع</h2><p>الأصوات القصيرة آلية وتقريبية، وليست تسجيلات بشرية للهجات هذه المناطق. تسجيلات Peace Corps في المكتبة من النيجر؛ لا ننسبها إلى المدن الأربع.</p><p>لا تتوفر لدينا بعد تسجيلات محلية تعليمية موثّقة لكل صيغة، ولم يراجع المادة متحدث محلي.</p><button type="button" class="text-link" data-go="audio">مكتبة الاستماع وحدودها ${I('arrowLeft')}</button></aside></section>
      <section class="section"><div class="section-heading"><div><span class="eyebrow">للتوسّع الاختياري</span><h2>مصادر ومقاطع خارجية</h2><p>تفتح الروابط خارج الموقع، وتحتاج إلى الإنترنت.</p></div></div><div class="external-grid"><a class="surface external-card" href="https://www.ijsrp.org/research-paper-0918/ijsrp-p8128.pdf" target="_blank" rel="noopener noreferrer"><b>دراسة عن لهجات الهوسا</b><span>بحث عن التنوعات الإقليمية وأمثلة مقارنة</span><em>قراءة الدراسة ↗</em></a><a class="surface external-card" href="https://globalrecordings.net/en/language/2004" target="_blank" rel="noopener noreferrer"><b>تسجيلات مصنفة: سوكوتو</b><span>محتوى مسيحي دعوي؛ الاستماع اختياري، وليس درسًا في المنهج.</span><em>فتح الموقع الخارجي ↗</em></a><a class="surface external-card" href="https://alma.matrix.msu.edu/the-language-of-african-music-hausa/" target="_blank" rel="noopener noreferrer"><b>أداء غنائي مصنف Katsinanci</b><span>أداء مسجل في نيامي بالنيجر، وليس نموذجًا لكل المتحدثين أو درس نطق.</span><em>فتح الموقع الخارجي ↗</em></a></div></section>
      <div class="region-next">${button('تعلّم الفروق مع اختبار','lesson/regional-variation','btn-primary','arrowLeft')}<button type="button" class="text-link" data-go="sources">المزيد من المراجع ${I('arrowLeft')}</button></div>
    </div>`;
  }
  function renderGrammar() {
    const lessons = ['pronouns','continuous','aspects','negation','gender','questions','identity','possessive','build-basic','verbal-nouns','adjectives','place-direction','negative-more','focus-questions','demonstratives','plurals-more'].map(findLesson);
    const iconsFor = ['message','route','clock','layers','book','sparkles'];
    const tiles = ['mint','lavender','yellow','peach','mint','lavender'];
    return `<div class="page">${pageHeader('القواعد دون تعقيد','ابنِ الجملة، خطوة بخطوة','شروحات تأسيسية بالعربية، مع أمثلة واضحة تساعدك على فهم طريقة عمل الهوسا.')}
      <div class="page-intro-banner"><span class="icon-tile tile-mint">${I('sparkles')}</span><div><strong>افهم الفكرة قبل حفظ القاعدة</strong><p>ابدأ بالضمائر، ثم تعرّف على الأفعال والنفي والصفات والإشارة والملكية. لكل درس اختبار متنوع في نهايته.</p></div></div>
      <div class="grammar-grid">${lessons.map((l,i)=>`<article class="surface grammar-card"><span class="icon-tile tile-${tiles[i%tiles.length]}">${I(iconsFor[i%iconsFor.length])}</span><h2>${html(l.title)}</h2><p>${html(l.subtitle)}</p><span class="count-pill">${I('clock')} ${n(l.minutes)} دقائق</span><button type="button" class="text-link" data-go="lesson/${l.id}">افتح الشرح ${I('arrowLeft')}</button></article>`).join('')}</div>
      <div class="surface grammar-compare"><h2>لمحة سريعة: الضمائر والاستمرار</h2><p>الضمير المستقل ليس هو نفسه صيغة الاستمرار التي تسبق الفعل.</p>${renderTable({headers:['الشخص','ضمير مستقل','صيغة الاستمرار'],rows:[['أنا','ni','ina'],['أنتَ / أنتِ','kai / ke','kana / kina'],['هو / هي','shi / ita','yana / tana'],['نحن','mu','muna'],['أنتم','ku','kuna'],['هم','su','suna']]})}<div class="note-box">${I('info')}<p>الهوسا تستخدم صيغًا مختلفة بحسب الجانب والسياق. هذه نقطة بداية وليست جدولًا لجميع التراكيب.</p></div></div></div>`;
  }
  function wordCard(w) {
    return `<article class="surface word-card"><div class="word-topline"><span class="tag">${html(categoryName(w.c))}</span>${saveBtn(w)}</div><h3 lang="ha">${html(w.h)}</h3><p class="meaning">${html(w.a)}</p><div class="word-card-bottom">${w.noAudio?'<span class="audio-unavailable">بلا صوت لهجي موثّق</span>':`<p class="word-hint">نطق تقريبي: ${html(w.p)}</p>${audioBtn(w.h)}`}</div></article>`;
  }
  const normalize = text => String(text || '').toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f\u064B-\u065F\u0670]/g,'').replace(/[أإآ]/g,'ا').replace(/ى/g,'ي').replace(/[ƙ]/g,'k').replace(/[ɗ]/g,'d').replace(/[ɓ]/g,'b').replace(/[ʼ’']/g,'').trim();
  function filteredWords() {
    const q = normalize(ui.query);
    return D.words.filter(w => (ui.category==='all'||w.c===ui.category) && (!q || normalize(`${w.h} ${w.a} ${w.p}`).includes(q)));
  }
  function wordResults() {
    const list=filteredWords();
    if (!list.length) return `<div class="surface empty-state"><span class="icon-tile tile-mint">${I('search')}</span><h2>لم نجد نتيجة مطابقة</h2><p>جرّب كلمة أخرى، أو اختر تصنيفًا مختلفًا.</p><button class="btn btn-secondary btn-small" type="button" data-clear-search>مسح البحث والفلاتر</button></div>`;
    return `<div class="vocab-grid">${list.slice(0,ui.visible).map(wordCard).join('')}</div>${list.length>ui.visible?`<div class="load-more"><button class="btn btn-secondary" type="button" data-load-more>عرض المزيد <span class="muted">(${n(list.length-ui.visible)} متبقية)</span></button></div>`:''}`;
  }
  function renderWords() {
    return `<div class="page">${pageHeader('مكتبتك الصغيرة','مفردات من الحياة','ابحث بالعربية أو الهوسا، واستمع إلى نطق آلي تقريبي، واحفظ الكلمات التي تريد مراجعتها.',button('المحفوظات','saved','btn-secondary','bookmark','btn-small'))}
      <div class="surface vocab-toolbar"><label class="vocab-search">${I('search')}<input id="word-search" type="search" placeholder="ابحث عن كلمة، مثل: ماء أو ruwa" value="${html(ui.query)}" aria-label="البحث في المفردات"></label><div class="filter-list" aria-label="تصنيفات المفردات">${D.categories.map(c=>`<button type="button" class="filter-chip ${ui.category===c.id?'active':''}" data-category="${c.id}" aria-pressed="${ui.category===c.id}">${html(c.name)}</button>`).join('')}</div></div>
      <div class="results-top"><span id="word-count">${n(filteredWords().length)} كلمة وعبارة</span><span>النطق بالعربية تقريب للمساعدة فقط</span></div><div id="word-results">${wordResults()}</div></div>`;
  }
  function refreshWordResults() {
    const el = $('#word-results'); if (!el) return;
    el.innerHTML = wordResults();
    $('#word-count').textContent = `${n(filteredWords().length)} كلمة وعبارة`;
  }
  function renderSaved() {
    const words = D.words.filter(w=>isSaved(w.id));
    return `<div class="page">${pageHeader('للمراجعة في أي وقت','كلماتك المحفوظة','اجمع الكلمات التي تهمك هنا، وارجع إليها كلما أردت.',button('تصفّح المفردات','words','btn-secondary','layers','btn-small'))}
      ${words.length?`<div class="results-top"><span>${n(words.length)} كلمات محفوظة على هذا الجهاز</span><span>اضغط علامة الحفظ لإزالتها</span></div><div class="vocab-grid">${words.map(wordCard).join('')}</div>`:`<div class="surface empty-state"><span class="icon-tile tile-yellow">${I('bookmark')}</span><h2>قائمتك تنتظر كلماتك الأولى</h2><p>اضغط علامة الحفظ على أي كلمة لتجدها هنا لاحقًا.</p>${button('اكتشف المفردات','words','btn-primary','arrowLeft')}</div>`}</div>`;
  }
  function renderAudio() {
    const tracks = [
      ['01','الأصوات والنطق','مقدمة صوتية للحروف والأصوات.','3:13','pronunciation-1.mp3'],
      ['02','مفردات التحيات','تدرّب على مفردات التحية والاستجابة.','3:02','greetings-vocabulary.mp3'],
      ['03','التحيات اليومية','عبارات وأسئلة شائعة مع أمثلة مسموعة.','5:01','greetings-dialogue.mp3'],
      ['06','حوار التحية','استمع إلى حوار يضع العبارات في سياق.','2:28','greetings-conversation.mp3'],
      ['08','أيام الأسبوع','استمع إلى أيام الأسبوع وبعض عبارات الوقت.','2:45','days-week.mp3'],
      ['10','الأعداد الأساسية','تدرّب على نطق الأعداد من واحد إلى عشرين.','2:38','numbers.mp3'],
      ['17','حوار في السوق','استمع إلى حوار عن المساومة في السوق.','1:45','market-dialogue.mp3']
    ];
    return `<div class="page">${pageHeader('تعلّم بأذنك أيضًا','النطق والاستماع','النغمة والمدّ جزء من اللغة؛ استمع جيدًا، ثم قل العبارة بصوت مرتفع.')}
      <div class="sound-banner"><span class="icon-tile">${I('headphones')}</span><div><h2>اسمع، ثم جرّب بنفسك</h2><p>التسجيلات بشرية من منهج Peace Corps في النيجر، وتشمل شرحًا بالإنجليزية؛ لا تُنسب إلى المناطق الأربع.</p></div><span class="tag">${n(tracks.length)} تسجيلات بشرية</span></div>
      <div class="section-heading" style="margin-top:26px"><div><span class="eyebrow">أصوات تستحق الانتباه</span><h2>حروف ليست كغيرها</h2></div><button class="text-link" type="button" data-go="lesson/alphabet">درس الحروف ${I('arrowLeft')}</button></div><div class="sound-grid"><div class="surface sound-letter"><span class="sound-character" lang="ha">ɓ</span><div><h3>الباء الداخلية</h3><p>صوت شفوي داخلي يختلف عن b.</p></div></div><div class="surface sound-letter"><span class="sound-character" lang="ha">ɗ</span><div><h3>الدال الداخلية</h3><p>صوت داخلي يختلف عن d.</p></div></div><div class="surface sound-letter"><span class="sound-character" lang="ha">ƙ</span><div><h3>الكاف القذفية</h3><p>صوت قذفي يختلف عن k.</p></div></div></div>
      <section class="section"><div class="section-heading"><div><span class="eyebrow">مكتبة الاستماع</span><h2>تسجيلات للاستماع والتقليد</h2><p>استمع ثم أوقف التسجيل لتكرّر. قد تختلف بعض الألفاظ إقليميًا.</p></div></div><div class="audio-grid">${tracks.map(t=>`<article class="surface audio-track"><div class="card-head"><div><span class="eyebrow">التسجيل ${t[0]}</span><h3>${t[1]}</h3><p>${t[2]}</p></div><span class="track-duration">${t[3]}</span></div><audio controls preload="none" src="assets/audio/${t[4]}" aria-label="تشغيل ${t[1]}">متصفحك لا يدعم تشغيل الصوت.</audio></article>`).join('')}</div><p class="source-note">المصدر: <a href="https://files.peacecorps.gov/multimedia/audio/languagelessons/niger/NE_Hausa_Language_Lessons.pdf" target="_blank" rel="noopener noreferrer">An Introduction to the Hausa Language — Peace Corps / Niger</a>. الأصوات القصيرة مولّدة آليًا وقد لا تضبط النغمة أو طول الحركة؛ ولا تثبت أنها بأي لهجة محلية. تسجيلات النيجر لا تمثل لهجات المناطق الأربع تلقائيًا.</p></section></div>`;
  }
  const deckIds=['sannu','na-gode','ruwa','daya','gobe','gida','shayi','lafiya','don-allah','kasuwa'];
  const deck = deckIds.map(id=>D.words.find(w=>w.id===id)).filter(Boolean);
  function renderQuiz() {
    const q=ui.quiz;
    if (!q) return `<div class="surface practice-card"><span class="icon-tile tile-yellow quiz-intro-icon">${I('award')}</span><span class="eyebrow">تحدٍّ سريع</span><h2>اختبر ما تعلّمته</h2><p>ثمانية أسئلة قصيرة من دروس المسار. ستعرف الإجابة وتفسيرها بعد كل سؤال.</p><div class="quiz-meta"><span class="tag">${I('cards')} ${n(8)} أسئلة</span><span class="tag sand">${I('clock')} بضع دقائق</span></div>${state.quizBest!==null?`<p class="small muted" style="margin-bottom:14px">أفضل نتيجة لك: ${n(state.quizBest)} من ${n(8)}</p>`:''}<button type="button" class="btn btn-primary" data-quiz-start>ابدأ التحدّي ${I('arrowLeft')}</button></div>`;
    if (q.done) return `<div class="surface practice-card"><span class="icon-tile tile-mint quiz-intro-icon">${I('award')}</span><span class="eyebrow">انتهى التحدّي</span><h2>${q.score===8?'أحسنت، إجابات رائعة!':'عمل جميل، واصل التعلّم!'}</h2><div class="result-score">${n(q.score)} / ${n(8)}</div><p class="result-sub">هذه نتيجتك في المحاولة الحالية. راجع الدروس وجرّب مرة أخرى متى شئت.</p><div class="quiz-meta"><span class="tag">أفضل نتيجة: ${fraction(state.quizBest??q.score,8)}</span></div><div class="inline-actions"><button type="button" class="btn btn-primary" data-quiz-start>حاول مرة أخرى ${I('rotate')}</button>${button('إلى الدروس','path','btn-secondary','arrowLeft')}</div></div>`;
    const item=q.questions[q.index];
    const answered=q.chosen!==null;
    return `<div class="surface practice-card"><div class="quiz-progress-label"><span>السؤال ${n(q.index+1)} من ${n(q.questions.length)}</span><span>${n(q.score)} إجابات صحيحة</span></div><div class="progress-track"><span style="width:${Math.round((q.index+(answered?1:0))/q.questions.length*100)}%"></span></div><p class="quiz-question">${html(item.q)}</p><div class="quiz-options">${item.options.map((o,i)=>`<button type="button" class="quiz-option ${answered?(o.correct?'correct':(q.chosen===i?'wrong':'')):''}" data-quiz-answer="${i}" ${answered?'disabled':''}>${html(o.text)}</button>`).join('')}</div>${answered?`<div class="feedback ${item.options[q.chosen].correct?'':'wrong'}">${I(item.options[q.chosen].correct?'circleCheck':'circleX')}<span>${item.options[q.chosen].correct?'إجابة صحيحة! ': 'الإجابة الصحيحة موضّحة بالأخضر. '}${html(item.explain)}</span></div><button type="button" class="btn btn-primary quiz-next" data-quiz-next>${q.index===q.questions.length-1?'عرض النتيجة':'السؤال التالي'} ${I('arrowLeft')}</button>`:''}</div>`;
  }
  function renderFlash() {
    const w=deck[ui.flashIndex];
    return `<div class="surface practice-card"><span class="eyebrow">مراجعة ممتعة</span><h2>بطاقات التذكّر</h2><p>انظر إلى الكلمة، حاول تذكّر معناها، ثم اكشف الإجابة.</p><div class="flash-card"><span class="flash-hint">${ui.flashShown?'المعنى بالعربية':'ما معنى هذه الكلمة؟'}</span><div class="flash-main ${ui.flashShown?'arabic':''}" ${ui.flashShown?'':'lang="ha"'}>${html(ui.flashShown?w.a:w.h)}</div><span class="flash-hint">${ui.flashShown?html(w.h):'فكّر قليلًا قبل إظهار الإجابة'}</span></div><div class="flash-controls"><div class="flash-actions"><button class="btn btn-soft btn-small" type="button" data-flip>${ui.flashShown?'إخفاء المعنى':'اكشف المعنى'}</button>${audioBtn(w.h)}</div><span class="flash-progress">${fraction(ui.flashIndex+1,deck.length)}</span><div class="flash-actions"><button type="button" class="icon-button" data-flash="prev" aria-label="البطاقة السابقة">${I('arrowRight')}</button><button type="button" class="icon-button" data-flash="next" aria-label="البطاقة التالية">${I('arrowLeft')}</button></div></div></div>`;
  }
  function renderPractice() {
    return `<div class="page">${pageHeader('القليل من التمرين يصنع الفرق','تدرّب بثقة','راجع الكلمات واختبر فهمك. يمكنك المحاولة أكثر من مرة، على مهل.')}
      <div class="practice-shortcuts">${activityShortcuts()}</div><div class="practice-layout">${renderQuiz()}${renderFlash()}</div><div class="page-intro-banner" style="margin-top:16px"><span class="icon-tile tile-mint">${I('leaf')}</span><div><strong>لا بأس أن تخطئ</strong><p>استخدم تفسير الإجابة للعودة إلى الدرس ومراجعة الفكرة، لا للحفظ وحده.</p></div></div></div>`;
  }
  function renderSources() {
    const sources=[
      ['منهج الهوسا الصوتي','دروس ونصوص وتسجيلات من Peace Corps في النيجر. التسجيلات تتضمن شرحًا بالإنجليزية.','https://files.peacecorps.gov/multimedia/audio/languagelessons/niger/NE_Hausa_Language_Lessons.pdf'],
      ['دراسة اللهجات الإقليمية','بحث جامعي في تصنيفات اللهجات وأمثلة للواحق وبعض الأصوات، مع اختلاف تصنيفات الباحثين.','https://www.ijsrp.org/research-paper-0918/ijsrp-p8128.pdf'],
      ['جدول الملكية واللواحق','جدول الأسماء والضمائر الملكية، ويذكر صيغ sa وshi البديلة.','http://www.jblmflc.com/Hausa/Hausa%20PDF/Hausa%20Lesson%201.pdf'],
      ['توثيق gidanshi','بحث يورد gidanshi مقابل gidansa في وصف الهوسا بمدينة إيلورين في جنوب نيجيريا؛ لا يحصر الصيغة في مدينة واحدة.','https://researchgate.net/publication/279296302_Linguistic_Strategies_of_Adaptation_Hausa_in_Southern_Nigeria'],
      ['الكتابة والنغمة','شرح نظام الكتابة وطول الحركة والنغمة من برنامج اللغات الإفريقية في جامعة UCLA.','https://aflang.humanities.ucla.edu/language-materials/chadic-languages/hausa/hausa-online-grammar/pronunciation-writing/hausa-writing/'],
      ['قواعد الفعل والجانب','مرجع UCLA لصيغ الفعل والجانب في الهوسا، بما فيها الاستمرار والاكتمال والمستقبل.','https://aflang.humanities.ucla.edu/language-materials/chadic-languages/hausa/hausa-online-grammar/verb-tense/'],
      ['جمل التعريف والأسماء','شرح جامعة UCLA لجمل التعريف واستخدام ne وce مع الأسماء.','https://aflang.humanities.ucla.edu/language-materials/chadic-languages/hausa/hausa-online-grammar/hausa-sentences-expressing-2/'],
      ['الصفات ومطابقتها','شرح UCLA لصفات الهوسا وروابطها وتغيّر صيغها مع الاسم.','https://aflang.humanities.ucla.edu/language-materials/chadic-languages/hausa/hausa-online-grammar/noun-modifiers/'],
      ['الجنس والجمع','مرجع UCLA لأنماط الأسماء وجموعها المتنوعة.','https://aflang.humanities.ucla.edu/language-materials/chadic-languages/hausa/hausa-online-grammar/nouns-gender-plurals/'],
      ['الألوان','قائمة الألوان الأساسية بالهوسا من جامعة بوسطن.','https://www.bu.edu/200word/hausa/colors/'],
      ['الأسرة والأشخاص','مفردات الأشخاص والقرابة من جامعة بوسطن.','https://www.bu.edu/200word/hausa/people/'],
      ['أيام الأسبوع','أيام الأسبوع في الهوسا من مجموعة المفردات التعليمية في جامعة بوسطن.','https://www.bu.edu/200word/hausa/days/'],
      ['التحيات والأرقام','عبارات شائعة وأعداد الهوسا مع أمثلة إضافية من Omniglot.','https://www.omniglot.com/language/phrases/hausa.php']
    ];
    return `<div class="page">${pageHeader('تعلّم بمعرفة المصدر','عن المحتوى والمصادر','هذا المسار التأسيسي نقطة بداية، وأفضل تعلّم يأتي من الجمع بين الشرح والاستماع والممارسة.')}
      <div class="source-list">${sources.map(s=>`<article class="surface source-card"><h2>${html(s[0])}</h2><p>${html(s[1])}</p><a href="${html(s[2])}" target="_blank" rel="noopener noreferrer">فتح المصدر ${I('arrowUpLeft')}</a></article>`).join('')}</div>
      <div class="surface limitations"><h2>ما الذي ينبغي معرفته؟</h2><ul><li>المحتوى تأسيسي ويوجّه الانتباه إلى تنوّع كاتسينا وسوكوتو وكادونا وداورا، لكنه لا يصف كل متحدث أو كل لهجة، ولم يراجعه متحدث محلي.</li><li>الأصوات القصيرة المُلحقة بالكلمات مولّدة آليًا بواسطة Google Translate؛ وهي تقريبية ولا تثبت أي لكنة محلية، وقد تخطئ في النغمة والمد. التسجيلات الطويلة بشرية ومن منهج Peace Corps / Niger وليست تسجيلات موثّقة للمناطق الأربع.</li><li>الكتابة العربية للنطق تقريبية ولا تعوّض الاستماع إلى متحدثين أصليين.</li><li>يُحفَظ إنجازك ومفرداتك داخل هذا المتصفح وعلى هذا الجهاز فقط، وليس في حساب سحابي. قد تُفقد إذا مُسحت بيانات المتصفح.</li></ul><button type="button" class="btn btn-secondary btn-small" data-reset>إعادة ضبط تقدّمي ${I('rotate')}</button></div></div>`;
  }
  function renderNotFound() { return `<div class="page"><div class="surface empty-state"><span class="icon-tile tile-mint">${I('search')}</span><h2>هذه الصفحة غير موجودة</h2><p>لنعد إلى بداية الرحلة.</p>${button('الرئيسية','home','btn-primary','arrowLeft')}</div></div>`; }
  function render(preserveScroll=false) {
    const r = route();
    const y = window.scrollY;
    const routeKey = `${r.page}/${r.id || ''}`;
    if (routeKey !== lastRenderedPage && activeAudio) { activeAudio.pause(); activeAudio = null; }
    lastRenderedPage = routeKey;
    let content;
    switch(r.page) {
      case 'home': content=renderHome(); break;
      case 'path': content=renderPath(r.id); break;
      case 'lesson': content=renderLesson(r.id); break;
      case 'dialects': content=renderDialects(); break;
      case 'grammar': content=renderGrammar(); break;
      case 'words': content=renderWords(); break;
      case 'audio': content=renderAudio(); break;
      case 'practice': content=renderPractice(); break;
      case 'dictation': content=activities.renderDictation(); break;
      case 'sentences': content=activities.renderSentences(); break;
      case 'review': content=activities.renderReview(); break;
      case 'saved': content=renderSaved(); break;
      case 'sources': content=renderSources(); break;
      default: content=renderNotFound();
    }
    $('#app').innerHTML = content; updateChrome(r);
    if (preserveScroll) requestAnimationFrame(()=>window.scrollTo(0,y));
    else {
      window.scrollTo(0,0);
      if (r.page==='path' && r.id) requestAnimationFrame(()=>document.getElementById(`unit-${r.id}`)?.scrollIntoView({block:'start',behavior:'smooth'}));
    }
  }
  function closeMenu() { $('#sidebar').classList.remove('open'); $('#mobile-backdrop').classList.remove('visible'); $('#menu-toggle').setAttribute('aria-expanded','false'); }
  $('#menu-toggle').addEventListener('click',()=>{const open=$('#sidebar').classList.toggle('open');$('#mobile-backdrop').classList.toggle('visible',open);$('#menu-toggle').setAttribute('aria-expanded',String(open));});
  $('#mobile-backdrop').addEventListener('click',closeMenu);
  $('#sidebar').addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu(); if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#global-search').focus();}});
  $('#global-search-form').addEventListener('submit',e=>{e.preventDefault();ui.query=$('#global-search').value.trim();ui.category='all';ui.visible=18;go('words');});
  document.addEventListener('input',e=>{
    if (e.target.id==='word-search') {ui.query=e.target.value;ui.visible=18;refreshWordResults();}
  });
  async function playText(text, btn, rate=1) {
    if (activeAudio) {activeAudio.pause();activeAudio.currentTime=0;document.querySelectorAll('.is-playing').forEach(x=>x.classList.remove('is-playing'));}
    const src=AUDIO[text];
    if (!src) {notify('الصوت القصير غير متاح؛ جرّب تسجيلات مكتبة الاستماع.'); return;}
    try {
      const a=new Audio(src); a.playbackRate=rate; activeAudio=a; btn.classList.add('is-playing');
      a.addEventListener('ended',()=>btn.classList.remove('is-playing'),{once:true});
      a.addEventListener('error',()=>{btn.classList.remove('is-playing');notify('تعذّر تشغيل الصوت. جرّب تسجيلات الاستماع.');},{once:true});
      await a.play();
    } catch (_) {btn.classList.remove('is-playing');notify('تعذّر تشغيل الصوت على هذا المتصفح.');}
  }
  function shuffled(arr) { const out=[...arr]; for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];} return out; }
  const activities = window.createHausaActivities({D,AUDIO,html,n,I,pageHeader,button,save,getState:()=>state,notify,render,playText,shuffle:shuffled,go});
  document.addEventListener('click',e=>{
    const b=e.target.closest('button'); if (!b) return;
    if (b.matches('[data-dict-next],[data-dict-reset],[data-dict-start],[data-sentence-next],[data-sentence-reset],[data-sentence-start]') && activeAudio) {
      activeAudio.pause();activeAudio=null;document.querySelectorAll('.is-playing').forEach(x=>x.classList.remove('is-playing'));
    }
    if (activities.handleClick(b)) return;
    if (b.dataset.go!==undefined) {go(b.dataset.go);return;}
    if (b.hasAttribute('data-backup-export')) {
      const payload={format:'hawsa-progress',version:1,exportedAt:new Date().toISOString(),state};
      const url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));
      const a=document.createElement('a');a.href=url;a.download='hawsa-progress.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);notify('تم تجهيز نسخة التقدّم للتنزيل.');return;
    }
    if (b.hasAttribute('data-backup-import')) {$('#backup-file')?.click();return;}
    if (b.dataset.say!==undefined) {playText(b.dataset.say,b);return;}
    if (b.dataset.save!==undefined) {
      const id=b.dataset.save; state.saved=isSaved(id)?state.saved.filter(x=>x!==id):[...state.saved,id]; save();
      notify(isSaved(id)?'أُضيفت الكلمة إلى المحفوظات.':'أُزيلت الكلمة من المحفوظات.'); render(true); return;
    }
    if (b.dataset.category!==undefined) {ui.category=b.dataset.category;ui.visible=18;render(true);return;}
    if (b.hasAttribute('data-load-more')) {ui.visible+=18;refreshWordResults();return;}
    if (b.hasAttribute('data-clear-search')) {ui.query='';ui.category='all';ui.visible=18;render(true);return;}
    if (b.dataset.complete!==undefined) {
      const id=b.dataset.complete; const done=isDone(id); state.completed=done?state.completed.filter(x=>x!==id):[...state.completed,id];state.lastLesson=id;save();
      notify(done?'تم التراجع عن إكمال الدرس.':'أحسنت! سُجّل الدرس ضمن تقدّمك.');render(true);return;
    }
    if (b.hasAttribute('data-quiz-start')) {
      ui.quiz={questions:shuffled(D.lessons).slice(0,8).map(l=>({q:l.quiz.q,explain:l.quiz.explain,options:shuffled(l.quiz.options.map((text,i)=>({text,correct:i===l.quiz.answer})))})),index:0,chosen:null,score:0,done:false};render(true);return;
    }
    if (b.dataset.quizAnswer!==undefined && ui.quiz && ui.quiz.chosen===null) {
      const chosen=Number(b.dataset.quizAnswer);ui.quiz.chosen=chosen;if(ui.quiz.questions[ui.quiz.index].options[chosen]?.correct)ui.quiz.score++;render(true);return;
    }
    if (b.hasAttribute('data-quiz-next') && ui.quiz && ui.quiz.chosen!==null) {
      if(ui.quiz.index===ui.quiz.questions.length-1){ui.quiz.done=true;state.quizBest=Math.max(state.quizBest??0,ui.quiz.score);state.quizAttempts++;save();}
      else{ui.quiz.index++;ui.quiz.chosen=null;}render(true);return;
    }
    if (b.hasAttribute('data-flip')) {ui.flashShown=!ui.flashShown;render(true);return;}
    if (b.dataset.flash!==undefined) {ui.flashIndex=(ui.flashIndex+(b.dataset.flash==='next'?1:-1)+deck.length)%deck.length;ui.flashShown=false;render(true);return;}
    if (b.hasAttribute('data-reset')) {
      if(window.confirm('هل تريد حذف التقدّم والمحفوظات ونتائج الاختبارات من هذا المتصفح؟ لا يمكن التراجع عن ذلك.')){state=emptyState();activities.reset();ui.quiz=null;save();render(true);notify('تمت إعادة ضبط التقدّم على هذا الجهاز.');}return;
    }
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Enter' && e.target.id==='dictation-input'){e.preventDefault();document.querySelector('[data-dict-submit]')?.click();}
    if(e.key==='Enter' && e.target.id==='exam-write'){e.preventDefault();document.querySelector('[data-exam-submit]')?.click();}
  });
  document.addEventListener('change',async e=>{
    if(e.target.id!=='backup-file') return;
    const input=e.target, file=input.files?.[0];if(!file)return;
    try {
      if(file.size>1024*1024) throw new Error('too large');
      const payload=JSON.parse(await file.text());
      if(payload.format!=='hawsa-progress'||payload.version!==1||!payload.state||typeof payload.state!=='object'||Array.isArray(payload.state)) throw new Error('bad format');
      const imported=hydrateState(payload.state);
      if(window.confirm('سيستبدل الاستيراد تقدّمك ومفرداتك المحفوظة على هذا المتصفح. هل تريد المتابعة؟')){state=imported;activities.reset();ui.quiz=null;save();render(true);notify('تم استيراد نسخة التقدّم.');}
    } catch (_) {notify('تعذّر قراءة الملف؛ اختر نسخة تقدّم صالحة من هَوْسا.');}
    finally {input.value='';}
  });
  window.addEventListener('hashchange',()=>render(false));
  render(false);
})();
