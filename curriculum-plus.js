// Extended course content. Hausa examples follow common Boko spelling; regional alternatives exist.
(() => {
  'use strict';
  const d = window.HAUSA_DATA;
  d.units.push(
    {id:'build',no:'06',title:'من الكلمة إلى الجملة',sub:'اربط المفردات بالفعل والصفة والمكان',icon:'message',color:'peach',lessons:['build-basic','verbal-nouns','adjectives','place-direction']},
    {id:'deeper',no:'07',title:'قواعد أعمق',sub:'النفي والأسئلة والإشارة وصيغ الجمع',icon:'book',color:'lavender',lessons:['negative-more','focus-questions','demonstratives','plurals-more']},
    {id:'situations',no:'08',title:'الهوسا في مواقف الحياة',sub:'الألوان والأسرة والسوق وطلب المساعدة',icon:'globe',color:'yellow',lessons:['colors-words','family-words','market-dialogue','travel-health']}
  );
  d.lessons.push(
  {
    id:'build-basic',unit:'build',title:'ابنِ جملتك الأولى',subtitle:'من ضمير وفعل إلى جملة مفهومة.',minutes:10,
    objectives:['تتعرف على ترتيب أجزاء جملة بسيطة','تغير الضمير حسب الشخص','تضيف مفعولًا أو مكانًا في أمثلة محفوظة'],
    sections:[
      {title:'الفكرة: من يفعل ماذا؟',text:'في الجملة البسيطة يبدأ المثال هنا بصيغة الشخص والجانب، ثم يأتي الفعل أو الاسم الفعلي وما يكمل المعنى. لا تترجم كل كلمة منفردة؛ تعلّم العبارة كاملة.',examples:[{h:'Ina tafiya',a:'أنا ذاهب / أمشي',p:'إينا تافِيَا'},{h:'Tana tafiya',a:'هي ذاهبة / تمشي',p:'تانا تافِيَا'}]},
      {title:'أضف ما تحتاجه',text:'يمكن أن تتبع الصيغة كلمات أخرى. في المثال الأول da جزء من تركيب الحيازة، وفي الثاني son مرتبط بما أريده.',examples:[{h:'Ina da littafi',a:'لديّ كتاب',p:'إينا دا لِتّافي'},{h:'Ina son ruwa',a:'أريد ماءً',p:'إينا سون رُوَ'},{h:'Muna son ruwa',a:'نريد ماءً',p:'مونا سون رُوَ'}]},
      {title:'خريطة عملية',list:['حدّد الشخص: أنا أم نحن أم هي؟','اختر الصيغة المناسبة للمعنى والسياق.','أضف بقية العبارة، ثم اقرأها واستمع إليها.'],note:'لا يكفي تبديل الضمير في كل الجمل تلقائيًا؛ بعض الأفعال تتغير صيغتها بحسب التركيب.'}
    ],quiz:{q:'أي جملة تعني «نريد ماءً»؟',options:['Muna son ruwa','Ina da littafi','Ta tafi','Sai gobe'],answer:0,explain:'Muna son ruwa تعني «نريد ماءً».'}
  },
  {
    id:'verbal-nouns',unit:'build',title:'الفعل في جملة الاستمرار',subtitle:'لاحظ كيف تتغير الصيغة في أمثلة الأكل والشرب.',minutes:11,
    objectives:['تقارن بين المكتمل والمستمر','تلاحظ cin وshan قبل مفعول اسمي','تتجنب تعميم شكل واحد على كل الأفعال'],
    sections:[
      {title:'شكل الفعل مهم',text:'في الاستمرار تستخدم الهوسا اسمًا فعليًا. تختلف صيغته من فعل إلى آخر، وقد يتغير شكله عند وجود مفعول. احفظ هذه الأمثلة كنماذج، لا كقاعدة عامة لكل فعل.',examples:[{h:'Ina cin abinci',a:'أنا آكل طعامًا',p:'إينا تشِن أبينتشي'},{h:'Suna shan shayi',a:'هم يشربون الشاي',p:'سونا شان شايِي'}]},
      {title:'قارِن بالمكتمل',text:'في الأمثلة التالية تعرض صيغة na الحدث على أنه مكتمل؛ وصيغة ina مع cin أو shan تعرضه مستمرًا في هذا السياق.',examples:[{h:'Na ci abinci',a:'أكلتُ طعامًا',p:'نا تشي أبينتشي'},{h:'Ina cin abinci',a:'أنا آكل طعامًا',p:'إينا تشِن أبينتشي'},{h:'Na sha shayi',a:'شربتُ شايًا',p:'نا شا شايِي'},{h:'Ina shan shayi',a:'أنا أشرب شايًا',p:'إينا شان شايِي'}]},
      {title:'كيف تتدرّب؟',text:'اختر جملتين مما سبق. قل الأولى لشخص آخر، ثم بدّل الفكرة من فعل جارٍ إلى مكتمل. انتبه إلى كل من الصيغة قبل الفعل وشكل الفعل.',note:'بعض الأسماء الفعلية لها أنماط أخرى؛ راجع مرجع UCLA للأفعال قبل تعميم أي تغيير.'}
    ],quiz:{q:'أي جملة تعني «أنا آكل طعامًا» في هذا المثال؟',options:['Ina cin abinci','Na ci abinci','Zan tafi','Ina da littafi'],answer:0,explain:'Ina cin abinci مثال على الاستمرار مع مفعول اسمي.'}
  },
  {
    id:'adjectives',unit:'build',title:'الصفات ومطابقتها',subtitle:'صف كتابًا أو فتاة مع الانتباه إلى الجنس.',minutes:10,
    objectives:['تلاحظ موضع الصفة قبل الاسم','تتعرف على رابط -n أو -r في الأمثلة','تميّز بين وصف الاسم وجملة التعريف'],
    sections:[
      {title:'الصفة قبل الاسم',text:'في تركيب شائع تسبق الصفة الاسم، وتطابقه في الجنس أو العدد. يظهر رابط -n للمذكر والجمع و-r للمؤنث في أمثلة كثيرة. قد تتغير صيغة الصفة نفسها.',examples:[{h:'sabon littafi',a:'كتاب جديد',p:'سابون لِتّافي'},{h:'sabuwar takarda',a:'ورقة جديدة في تركيب الصفة قبل الاسم',p:'سابُوار تاكاردا'}],note:'في المثال الثاني sabuwa هي صيغة الصفة المؤنثة، و-r رابط يصلها بالاسم.'},
      {title:'أمثلة أخرى',examples:[{h:'dogon yaro',a:'ولد طويل',p:'دوگون يارو'},{h:'doguwar yarinya',a:'بنت طويلة',p:'دوگُوار يارينيا'}]},
      {title:'الوصف بعد الاسم',text:'يمكن أن تأتي الصفة بعد الاسم في تركيب آخر دون رابط، مع بقاء المطابقة. قد يختلف التركيز الدلالي؛ لذلك من المفيد حفظ مثال كامل لكل نمط.',examples:[{h:'littafi sabo',a:'كتاب جديد',p:'لِتّافي سابو'},{h:'yarinya doguwa',a:'بنت طويلة',p:'يارينيا دوگُوا'}]}
    ],quiz:{q:'أي تركيب يعني «كتاب جديد» مع الصفة قبل الاسم؟',options:['sabon littafi','sabuwar takarda','dogon yaro','Ina tafiya'],answer:0,explain:'sabon littafi مثال على صفة قبل اسم مذكر مع رابط.'}
  },
  {
    id:'place-direction',unit:'build',title:'المكان والاتجاه',subtitle:'استخدم مفردات المكان داخل جمل قصيرة.',minutes:9,
    objectives:['تتعرف على a في أمثلة المكان','تستخدم daga للدلالة على «من»','تقرأ جملة ذهاب في سياق'],
    sections:[
      {title:'أين؟',text:'قد تُستخدم a للدلالة على مكان في بعض الجمل. هناك أيضًا تراكيب مكانية لا تحتاج حرف جر ظاهرًا، مثل Ina gida.',examples:[{h:'Ina gida',a:'أنا في البيت',p:'إينا گيدا'},{h:'Ina aiki a asibiti',a:'أعمل في مستشفى',p:'إينا آيكي آ أسِبيتي'}]},
      {title:'من وإلى',text:'تُستخدم daga في المثال التالي بمعنى «من»، وتظهر zuwa في مثال الذهاب إلى مكان.',examples:[{h:'Na fito daga Katsina',a:'أتيتُ من كاتسينا',p:'نا فيتو داگا كاتسينا'},{h:'Ta tafi zuwa asibiti',a:'ذهبت إلى المستشفى',p:'تا تافي زُوا أسِبيتي'}]},
      {title:'مفردات للمكان',examples:[{h:'gida',a:'بيت',p:'گيدا'},{h:'asibiti',a:'مستشفى',p:'أسِبيتي'},{h:'hanya',a:'طريق',p:'هانيا'}],note:'تختلف صياغة السؤال عن المكان عن جملة الخبر؛ راجع درس الأسئلة لترى kake وkike.'}
    ],quiz:{q:'ماذا تعني daga في «Na fito daga Katsina»؟',options:['من','إلى الغد','شكرًا','كتاب'],answer:0,explain:'daga تعني «من» في هذا المثال.'}
  },
  {
    id:'negative-more',unit:'deeper',title:'النفي: لا تخلط بين الأنماط',subtitle:'قارِن نفي الاستمرار والمكتمل والمستقبل.',minutes:11,
    objectives:['تقرأ ثلاثة أنماط للنفي','تلاحظ تغيّر صيغة الضمير','تفرّق بين «لا أفعل» و«لم أفعل» و«لن أفعل»'],
    sections:[
      {title:'نفي الاستمرار',text:'في مثال الاستمرار يأتي ba وصيغة ضمير خاصة قبل الاسم الفعلي. غالبًا لا تأتي ba ثانية في نهاية هذا النمط.',examples:[{h:'Ba na tafiya',a:'أنا لا أذهب / لست ذاهبًا',p:'با نا تافِيَا'},{h:'Ba ya tafiya',a:'هو لا يذهب / ليس ذاهبًا',p:'با يا تافِيَا'}]},
      {title:'نفي المكتمل والمستقبل',text:'يستخدم هذان المثالان أداة نفي في البداية وأخرى في النهاية، مع اختلاف الصيغة قبل الفعل.',examples:[{h:'Ban tafi ba',a:'لم أذهب',p:'بان تافي با'},{h:'Ba zan tafi ba',a:'لن أذهب',p:'با زان تافي با'}]},
      {title:'قاعدة عمل لا قاعدة شاملة',text:'اسأل نفسك أولًا عن نوع التركيب، ثم اختر النفي الموافق له. لا تضف ba أخيرة آليًا إلى كل جملة استمرار، ولا تخلط نفي الحيازة Ba ni da بنفي الحدث المكتمل.',examples:[{h:'Ba ni da ruwa',a:'ليس لديّ ماء',p:'با ني دا رُوَ'}]}
    ],quiz:{q:'أي جملة تعني «لن أذهب»؟',options:['Ba zan tafi ba','Ban tafi ba','Ba ni da ruwa','Na tafi'],answer:0,explain:'Ba zan tafi ba تنفي المستقبل في هذا المثال.'}
  },
  {
    id:'focus-questions',unit:'deeper',title:'صيغة السؤال والتركيز',subtitle:'لماذا نرى kake وkike في بعض الأسئلة؟',minutes:10,
    objectives:['تستخدم صيغة سؤال المكان للرجل والمرأة','تتعرف على yake وtake في السؤال','تلاحظ أن بعض الضمائر تتغير في سياق السؤال'],
    sections:[
      {title:'أين أنت؟',text:'عند السؤال عن المكان في هذه الأمثلة تظهر صيغ تنتهي بـ ke. تقارنها بصيغ الخبر kana وkina في التحية.',examples:[{h:'Ina kake?',a:'أين أنتَ؟',p:'إينا كاكي؟'},{h:'Ina kike?',a:'أين أنتِ؟',p:'إينا كِكي؟'},{h:'Kana lafiya?',a:'هل أنتَ بخير؟',p:'كانا لافِيا؟'}]},
      {title:'هو وهي',examples:[{h:'Ina yake?',a:'أين هو؟',p:'إينا ياكي؟'},{h:'Ina take?',a:'أين هي؟',p:'إينا تاكي؟'},{h:'Ina asibiti yake?',a:'أين المستشفى؟',p:'إينا أسِبيتي ياكي؟'}]},
      {title:'لا تعتمد على الكتابة وحدها',text:'تكتب ina في تراكيب مختلفة، وقد تدل على «أين» أو تظهر في صيغة المتكلم. النغمة والسياق يساعدان على التمييز.',note:'هذا مدخل مبسط للصيغ النسبية والتركيز، وليس شرحًا كاملًا لكل أنواع السؤال.'}
    ],quiz:{q:'ما الصيغة التي تسأل عن مكان الغائبة «هي»؟',options:['Ina take?','Ina yake?','Ina kake?','Ina gida'],answer:0,explain:'Ina take? تعني «أين هي؟».'}
  },
  {
    id:'demonstratives',unit:'deeper',title:'أسماء الإشارة',subtitle:'هذا وهذه وهؤلاء في عبارات قصيرة.',minutes:9,
    objectives:['تستخدم wannan للمفرد القريب','تتعرف على waɗannan للجمع','تربط ne وce بجنس الاسم في التعريف'],
    sections:[
      {title:'القريب: هذا وهذه',text:'تأتي wannan قبل الاسم للمفرد القريب، سواء أكان الاسم مذكرًا أم مؤنثًا في هذين المثالين.',examples:[{h:'wannan littafi',a:'هذا الكتاب',p:'وانّان لِتّافي'},{h:'wannan mota',a:'هذه السيارة',p:'وانّان موتا'}]},
      {title:'الجمع القريب',text:'استخدم waɗannan قبل جمع الاسم في هذا المثال. حرف ɗ جزء من الكتابة الصحيحة.',examples:[{h:'waɗannan littattafai',a:'هذه الكتب',p:'واɗانّان لِتَتَّفاي'}]},
      {title:'في جملة تعريف',text:'عند تعريف الشيء بجملة بسيطة نختار ne أو ce وفق الاسم.',examples:[{h:'Wannan littafi ne',a:'هذا كتاب',p:'وانّان لِتّافي نِه'},{h:'Wannan mota ce',a:'هذه سيارة',p:'وانّان موتا تْشِه'}]}
    ],quiz:{q:'أي كلمة تشير إلى جمع قريب في مثال الدرس؟',options:['waɗannan','wannan','gobe','ruwa'],answer:0,explain:'waɗannan تعني «هؤلاء / هذه» للجمع القريب في المثال.'}
  },
  {
    id:'plurals-more',unit:'deeper',title:'المفرد والجمع في الاستعمال',subtitle:'تعلّم الاسم وجمعه معًا بدل حفظ نهاية واحدة.',minutes:10,
    objectives:['تحفظ أمثلة موثوقة للمفرد والجمع','تتعرف على الجمع غير المنتظم','تستخدم الجمع في جملة تعريف بسيطة'],
    sections:[
      {title:'أزواج للمراجعة',table:{headers:['المفرد','الجمع','المعنى'],rows:[['mutum','mutane','شخص / أشخاص'],['yaro','yara','ولد / أطفال'],['mace','mata','امرأة / نساء'],['littafi','littattafai','كتاب / كتب'],['mota','motoci','سيارة / سيارات']]},examples:[{h:'mutum',a:'شخص',p:'موتوم'},{h:'mutane',a:'أشخاص',p:'موتاني'},{h:'littafi',a:'كتاب',p:'لِتّافي'},{h:'littattafai',a:'كتب',p:'لِتَتَّفاي'}]},
      {title:'في الجملة',examples:[{h:'Littattafai ne',a:'إنها كتب',p:'لِتَتَّفاي نِه'},{h:'waɗannan littattafai',a:'هذه الكتب',p:'واɗانّان لِتَتَّفاي'}]},
      {title:'طريقة مذاكرة فعالة',text:'أنشئ بطاقة لكل اسم تضم المفرد والجمع ومعناهما ومثالًا. تختلف أنماط الجمع، ويمكن أن تختلف بعض الصيغ باختلاف الاستخدام.'}
    ],quiz:{q:'ما جمع littafi «كتاب»؟',options:['littattafai','mutane','mota','yaro'],answer:0,explain:'littattafai هي «كتب».'}
  },
  {
    id:'colors-words',unit:'situations',title:'الألوان والوصف',subtitle:'كلمات عملية مع تنبيه إلى تغيّر الصفة في الجملة.',minutes:8,
    objectives:['تتعرف على ستة ألوان','تحفظ الحروف ذات الخطاف','تعرف أن شكل اللون قد يتغير مع الاسم'],
    sections:[
      {title:'ألوان أساسية',examples:[{h:'ja',a:'أحمر',p:'جا'},{h:'fari',a:'أبيض — صيغة أساسية',p:'فاري'},{h:'baƙi',a:'أسود — صيغة أساسية',p:'باƙي'},{h:'shuɗi',a:'أزرق — صيغة أساسية',p:'شوɗي'},{h:'kore',a:'أخضر',p:'كوري'},{h:'rawaya',a:'أصفر',p:'راوايا'}]},
      {title:'اللون داخل عبارة',text:'قد تتغير الصفة وتتصل برابط لتوافق الاسم. لا تنقل الصيغة المفردة إلى كل عبارة بلا تغيير.',examples:[{h:'farin rago',a:'كبش أبيض',p:'فارِن راگو'},{h:'farar saniya',a:'بقرة بيضاء',p:'فارار سانيَا'}]},
      {title:'ابحث عن اللون',text:'اختر ثلاثة أشياء حولك، ثم سجّل لون كل واحد في قائمة مراجعتك. للعبارة الكاملة راجع درس مطابقة الصفات.'}
    ],quiz:{q:'ما معنى shuɗi في قائمة الألوان؟',options:['أزرق','أحمر','أصفر','أبيض'],answer:0,explain:'shuɗi تعني الأزرق في هذه القائمة.'}
  },
  {
    id:'family-words',unit:'situations',title:'الأسرة والأشخاص',subtitle:'تعرّف على كلمات تصف الأقارب والناس.',minutes:8,
    objectives:['تسمّي أفرادًا من الأسرة','تميّز بعض المفردات المتعلقة بالناس','تتذكر أن مصطلحات القرابة قد تكون واسعة'],
    sections:[
      {title:'أشخاص قريبون',examples:[{h:'uwa',a:'أم',p:'أُوا'},{h:'uba',a:'أب',p:'أوبا'},{h:'iyali',a:'عائلة',p:'إيالي'},{h:'miji',a:'زوج',p:'ميجي'}]},
      {title:'الناس والأطفال',examples:[{h:'mutum',a:'شخص',p:'موتوم'},{h:'mutane',a:'أشخاص',p:'موتاني'},{h:'yaro',a:'ولد',p:'يارو'},{h:'yarinya',a:'بنت',p:'يارينيا'}]},
      {title:'القرابة والسياق',text:'قد تحمل بعض كلمات الأقارب معنى أوسع من الترجمة المباشرة، بحسب العائلة والمنطقة. اسأل المتحدث عندما يكون نوع القرابة مهمًا.'}
    ],quiz:{q:'ما معنى iyali؟',options:['عائلة','سوق','أزرق','غدًا'],answer:0,explain:'iyali تعني العائلة.'}
  },
  {
    id:'market-dialogue',unit:'situations',title:'محادثة في السوق',subtitle:'ابدأ بأدب، اطلب، اسأل عن السعر واشكر.',minutes:9,
    objectives:['تقرأ تسلسل حوار قصير','تستخدم مفردات الطعام والنقود','تتدرّب على ترتيب جملة طلب'],
    sections:[
      {title:'الموقف',text:'يريد المتعلم ماءً في السوق. ابدأ بالتحية، ثم قدّم الطلب واسأل عن السعر.',examples:[{h:'Sannu',a:'مرحبًا',p:'سانّو'},{h:'Don Allah',a:'من فضلك',p:'دون اللّه'},{h:'Ina son ruwa',a:'أريد ماءً',p:'إينا سون رُوَ'},{h:'Nawa ne?',a:'كم السعر؟',p:'ناوا نِه؟'},{h:'Na gode',a:'شكرًا',p:'نا گودي'}]},
      {title:'بدّل كلمة واحدة',text:'عندما تكون العبارة مناسبة للسياق، يمكنك التدرب على تغيير الشيء المطلوب.',examples:[{h:'Ina son abinci',a:'أريد طعامًا',p:'إينا سون أبينتشي'},{h:'Ina son ruwa',a:'أريد ماءً',p:'إينا سون رُوَ'}]},
      {title:'استمع ثم رتّب',text:'بعد قراءة الحوار افتح «تكوين الجمل» ورتّب كلمات الطلب. لاحظ أن السعر والعملة وطريقة المساومة تختلف حسب المكان.'}
    ],quiz:{q:'أي عبارة تسأل عن السعر؟',options:['Nawa ne?','Na gode','Ina gida','Sai gobe'],answer:0,explain:'Nawa ne? تستخدم للسؤال عن السعر في سياق مفهوم.'}
  },
  {
    id:'travel-health',unit:'situations',title:'الطريق وطلب المساعدة',subtitle:'اسأل عن مكان وعبّر عن حاجتك للمساعدة.',minutes:9,
    objectives:['تتعرف على كلمات الاتجاه والمساعدة','تسأل عن مكان المستشفى','تعبّر عن عدم الشعور بالعافية'],
    sections:[
      {title:'كلمات مفيدة',examples:[{h:'asibiti',a:'مستشفى',p:'أسِبيتي'},{h:'likita',a:'طبيب',p:'ليكيتا'},{h:'Taimako',a:'مساعدة',p:'تايماكو'},{h:'hanya',a:'طريق',p:'هانيا'}]},
      {title:'اسأل ووضّح',examples:[{h:'Ina asibiti yake?',a:'أين المستشفى؟',p:'إينا أسِبيتي ياكي؟'},{h:'Ba ni da lafiya',a:'لست بخير / أنا مريض',p:'با ني دا لافِيا'},{h:'Ban gane ba',a:'لم أفهم',p:'بان گاني با'}]},
      {title:'للمواقف المهمة',text:'هذه عبارات لغوية عامة فقط؛ في الطوارئ أو الرعاية الصحية اطلب مساعدة بشرية فورية أو مترجمًا مؤهلًا. لا تعتمد على التطبيق وحده لفهم حالة طبية.'}
    ],quiz:{q:'ما معنى asibiti؟',options:['مستشفى','مدرسة','طريق','سوق'],answer:0,explain:'asibiti تعني مستشفى.'}
  }
  );
  d.categories.push({id:'colors',name:'الألوان'},{id:'actions',name:'أفعال وجمل'},{id:'health',name:'المساعدة'});
  d.words.push(
    {id:'ja',h:'ja',a:'أحمر',p:'جا',c:'colors'}, {id:'fari',h:'fari',a:'أبيض',p:'فاري',c:'colors'},
    {id:'baki-black',h:'baƙi',a:'أسود — صيغة أساسية',p:'باƙي',c:'colors'}, {id:'shudi',h:'shuɗi',a:'أزرق',p:'شوɗي',c:'colors'},
    {id:'kore',h:'kore',a:'أخضر',p:'كوري',c:'colors'}, {id:'rawaya',h:'rawaya',a:'أصفر',p:'راوايا',c:'colors'},
    {id:'sabo',h:'sabo',a:'جديد — مذكر',p:'سابو',c:'colors'}, {id:'sabuwa',h:'sabuwa',a:'جديدة — مؤنث',p:'سابُوا',c:'colors'},
    {id:'dogo',h:'dogo',a:'طويل — مذكر',p:'دوگو',c:'colors'}, {id:'doguwa',h:'doguwa',a:'طويلة — مؤنث',p:'دوگُوا',c:'colors'},
    {id:'mace',h:'mace',a:'امرأة',p:'ماتشي',c:'people'}, {id:'mata',h:'mata',a:'نساء / زوجة بحسب السياق',p:'ماتا',c:'people'},
    {id:'mutane',h:'mutane',a:'أشخاص',p:'موتاني',c:'people'}, {id:'namiji',h:'namiji',a:'رجل',p:'ناميجي',c:'people'},
    {id:'miji',h:'miji',a:'زوج',p:'ميجي',c:'people'}, {id:'da-son',h:'ɗa',a:'ابن',p:'ɗا',c:'people'},
    {id:'kaka',h:'kaka',a:'جد / جدة بحسب السياق',p:'كاكا',c:'people'}, {id:'kawu',h:'kawu',a:'عم / خال',p:'كاوُ',c:'people'},
    {id:'jariri',h:'jariri',a:'رضيع',p:'جاريري',c:'people'}, {id:'likita',h:'likita',a:'طبيب',p:'ليكيتا',c:'people'},
    {id:'asibiti',h:'asibiti',a:'مستشفى',p:'أسِبيتي',c:'health'}, {id:'hagu',h:'hagu',a:'يسار',p:'هاگو',c:'health'},
    {id:'dama',h:'dama',a:'يمين',p:'داما',c:'health'}, {id:'ciwo',h:'ciwo',a:'ألم / مرض بحسب السياق',p:'تشِوُ',c:'health'},
    {id:'magani',h:'magani',a:'دواء',p:'ماگاني',c:'health'}, {id:'lafiya-word',h:'lafiya',a:'عافية / صحة',p:'لافِيا',c:'health'},
    {id:'nan',h:'nan',a:'هنا',p:'نان',c:'places'}, {id:'can',h:'can',a:'هناك',p:'تشان',c:'places'},
    {id:'daga',h:'daga',a:'من',p:'داگا',c:'places'}, {id:'zuwa',h:'zuwa',a:'إلى / القدوم بحسب السياق',p:'زُوا',c:'places'},
    {id:'takarda',h:'takarda',a:'ورقة',p:'تاكاردا',c:'places'}, {id:'motoci',h:'motoci',a:'سيارات',p:'موتوتشي',c:'places'},
    {id:'littattafai',h:'littattafai',a:'كتب',p:'لِتَتَّفاي',c:'places'}, {id:'tebur',h:'tebur',a:'طاولة',p:'تيبور',c:'places'},
    {id:'kujera',h:'kujera',a:'كرسي',p:'كوجيرا',c:'places'}, {id:'wannan',h:'wannan',a:'هذا / هذه للمفرد القريب',p:'وانّان',c:'useful'},
    {id:'wadannan',h:'waɗannan',a:'هؤلاء / هذه للجمع القريب',p:'واɗانّان',c:'useful'},
    {id:'cin-abinci',h:'Ina cin abinci',a:'أنا آكل طعامًا',p:'إينا تشِن أبينتشي',c:'actions'},
    {id:'shan-shayi',h:'Ina shan shayi',a:'أنا أشرب شايًا',p:'إينا شان شايِي',c:'actions'},
    {id:'na-ci',h:'Na ci abinci',a:'أكلت طعامًا',p:'نا تشي أبينتشي',c:'actions'},
    {id:'na-sha',h:'Na sha shayi',a:'شربت شايًا',p:'نا شا شايِي',c:'actions'},
    {id:'ina-tafiya',h:'Ina tafiya',a:'أنا ذاهب / أمشي',p:'إينا تافِيَا',c:'actions'},
    {id:'tana-tafiya',h:'Tana tafiya',a:'هي ذاهبة / تمشي',p:'تانا تافِيَا',c:'actions'},
    {id:'muna-son',h:'Muna son ruwa',a:'نريد ماءً',p:'مونا سون رُوَ',c:'actions'},
    {id:'ina-gida',h:'Ina gida',a:'أنا في البيت',p:'إينا گيدا',c:'actions'},
    {id:'ba-natafiya',h:'Ba na tafiya',a:'أنا لا أذهب',p:'با نا تافِيَا',c:'actions'},
    {id:'ba-zan',h:'Ba zan tafi ba',a:'لن أذهب',p:'با زان تافي با',c:'actions'},
    {id:'ina-yake',h:'Ina yake?',a:'أين هو؟',p:'إينا ياكي؟',c:'useful'},
    {id:'ina-take',h:'Ina take?',a:'أين هي؟',p:'إينا تاكي؟',c:'useful'},
    {id:'ina-asibiti',h:'Ina asibiti yake?',a:'أين المستشفى؟',p:'إينا أسِبيتي ياكي؟',c:'health'},
    {id:'banilafiya',h:'Ba ni da lafiya',a:'لست بخير / أنا مريض',p:'با ني دا لافِيا',c:'health'},
    {id:'miya',h:'miya',a:'صلصة / حساء',p:'مِيَا',c:'food'}, {id:'tuwo',h:'tuwo',a:'طعام من الحبوب',p:'توو',c:'food'},
    {id:'gero',h:'gero',a:'دخن',p:'گيرو',c:'food'}, {id:'koko',h:'koko',a:'عصيدة من الحبوب',p:'كوكو',c:'food'},
    {id:'burodi',h:'burodi',a:'خبز',p:'بُرودي',c:'food'}, {id:'tumatir',h:'tumatir',a:'طماطم',p:'توماتير',c:'food'},
    {id:'aiki',h:'aiki',a:'عمل',p:'آيكي',c:'actions'}, {id:'karatu',h:'karatu',a:'قراءة / دراسة',p:'كاراتو',c:'actions'},
    {id:'yanzu',h:'yanzu',a:'الآن',p:'يانزو',c:'time'}, {id:'dare',h:'dare',a:'الليل',p:'داري',c:'time'},
    {id:'mako',h:'mako',a:'أسبوع',p:'ماكو',c:'time'}, {id:'lokaci',h:'lokaci',a:'وقت',p:'لوكاتشي',c:'time'},
    {id:'saniya',h:'saniya',a:'بقرة',p:'سانيَا',c:'people'}, {id:'rago',h:'rago',a:'كبش',p:'راگو',c:'people'}
  );
})();
