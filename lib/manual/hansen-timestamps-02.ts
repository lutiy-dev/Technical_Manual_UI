import type { Chapter } from '../manual-types';

export const hansenTimestampChapters02: Chapter[] = [
  {
    index: 0,
    slug: 'hansen-04-23-people-ppl',
    navTitle: '04:23 · PEOPLE / PPL',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 04:23',
    title: 'PEOPLE / PPL — отдельный production module, а не «магия внутри master»',
    lede:
      'На этом таймкоде Hansen переходит к людям. В учебнике этот блок служит мостом к двум отдельным PEOPLE workflows: Generate & Place New People и Replace Existing People. Здесь важно увидеть общий module contract, а детали изучать уже в специализированных главах.',
    status: 'confirmed',
    statusNote:
      'Video review и source topology подтверждают отдельные PPL generation, segmentation, preparation, composite и return stages. Подробные PEOPLE workflows уже документированы отдельными главами.',
    visual: 'composite',
    category: 'hansen-timestamps',
    stage: 'hansen-04-23',
    relatedNodes: [408, 829, 550, 114, 115, 144, 146, 420, 422, 477, 449, 429, 543, 459, 573, 67, 57, 53],
    relatedChapters: [
      'ppl-workflow-01-generate-place',
      'ppl-workflow-02-replace-existing',
      'positioning',
      'selector-logic',
      'composite',
    ],
    sections: [
      {
        id: 'hansen-original',
        eyebrow: 'HANSEN ORIGINAL',
        title: 'На 04:23 PEOPLE появляется как самостоятельная ветка',
        paragraphs: [
          'PPL branch не начинается с архитектурной генерации целого кадра. Person generation и mask preparation существуют как отдельные локальные stages, после чего результат возвращается в master scene.',
          'Source route подтверждает отдельный PPL prompt 408, person decode 829, Florence2/SAM2 mask chain, preparation, first composite 429 и return через selector 459.',
        ],
      },
      {
        id: 'module-contract',
        eyebrow: 'ARCHVIZ FOUNDATION / EXTENSION',
        title: 'PEOPLE читаем как один module contract',
        codeExamples: [
          {
            title: 'PEOPLE module sentence',
            label: 'MODULE CONTRACT',
            code:
              'PERSON SOURCE / PROMPT\n' +
              '→ GENERATE OR SELECT PERSON\n' +
              '→ DETECT / SEGMENT\n' +
              '→ PREPARE CUTOUT\n' +
              '→ POSITION / COMPOSITE\n' +
              '→ CHECKPOINT\n' +
              '→ RETURN TO MASTER',
          },
        ],
      },
      {
        id: 'two-workflows',
        eyebrow: 'TWO SPATIAL CONTRACTS',
        title: 'Одинаковые инструменты, но две разные задачи',
        table: {
          columns: ['Workflow', 'Placement truth', 'Что делает AI'],
          rows: [
            ['01 · Generate & Place', 'Target region / placement input', 'Создаёт нового человека и вставляет его в сцену'],
            ['02 · Replace Existing', 'Existing 3D/rendered person', 'Меняет качество/appearance, сохраняя spatial slot'],
          ],
        },
        paragraphs: [
          'Главная ошибка начинающего — смешивать эти два сценария. В первом placement нужно создать. Во втором placement уже существует и его надо сохранить.',
        ],
      },
      {
        id: 'core-lesson',
        eyebrow: 'BEGINNER FOUNDATION',
        title: 'Самая важная идея: локальный AI-module безопаснее full-frame regeneration',
        paragraphs: [
          'Когда задача локальная, production workflow старается дать AI минимальную область свободы. Люди — хороший пример: architecture остаётся утверждённой, а генерация концентрируется на персонаже и его интеграции.',
        ],
      },
      {
        id: 'practice',
        eyebrow: 'PRACTICE',
        title: 'Упражнение: найти границы PEOPLE без чтения внутренних нод',
        bullets: [
          'Найти, откуда PEOPLE получает person source / prompt.',
          'Найти первый image checkpoint отдельного человека.',
          'Найти segmentation stage.',
          'Найти первый composite с architectural scene.',
          'Найти selector/return, после которого PEOPLE снова становится частью master route.',
        ],
      },
      {
        id: 'deep-links',
        eyebrow: 'DEEP DIVE',
        title: 'Куда идти после этой страницы',
        bullets: [
          'PPL Workflow 01 · Generate & Place — новый человек, placement по target region.',
          'PPL Workflow 02 · Replace Existing — улучшение уже размещённого человека.',
          'Position, Scale & Coordinates — coordinate spaces и positioning.',
          'Selector Logic — как mode 543 управляет несколькими PPL switches.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'hansen-05-42-workflow-tips',
    navTitle: '05:42 · Workflow Tips',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 05:42',
    title: 'Workflow tips — где искать правду в большом graph',
    lede:
      'После PEOPLE showcase возвращается к control/config area. Для новичка этот блок превращаем в набор универсальных правил чтения production workflow: authoritative controls, linked inputs, selectors, bypass и checkpoints важнее случайных widget values внутри downstream nodes.',
    status: 'confirmed',
    statusNote:
      'Video frame around 05:42 возвращается к control/config sections. Конкретные правила ниже разделены на source-confirmed topology и ARCHVIZ FOUNDATION interpretation.',
    visual: 'controls',
    category: 'hansen-timestamps',
    stage: 'hansen-05-42',
    relatedNodes: [168, 230, 231, 453, 456, 479, 541, 543, 600, 630, 693, 702, 717, 720, 721, 722, 723, 771],
    relatedChapters: [
      'control-panel',
      'workflow-engineering-data-control-plane',
      'workflow-engineering-switches-routing',
      'workflow-engineering-base-config',
      'workflow-engineering-debugging',
    ],
    sections: [
      {
        id: 'hansen-original',
        eyebrow: 'HANSEN ORIGINAL',
        title: 'Control/config area собирает решения в одном месте',
        paragraphs: [
          'Source graph содержит отдельные controls для generation mode, people mode, ControlNet source, working resolution, global seed, shared steps, detail strength, IPAdapter weight и других production decisions.',
          'Эти values расходятся downstream и управляют несколькими branches. Поэтому читать workflow удобнее от control source к consumers, а не искать одинаковые settings по всему canvas.',
        ],
      },
      {
        id: 'authority',
        eyebrow: 'RULE 01',
        title: 'Linked input сильнее локального widget',
        paragraphs: [
          'Если widget показывает одно значение, но его socket получает link от shared control, runtime использует linked value. Классический пример — PPL selectors: сохранённый widget может показывать 2, но linked node 543 со значением 1 является authoritative source.',
        ],
        codeExamples: [
          {
            title: 'Truth hierarchy',
            label: 'CONTROL PLANE',
            code: 'LINKED INPUT > LOCAL WIDGET VALUE',
          },
        ],
      },
      {
        id: 'connected-selected',
        eyebrow: 'RULE 02',
        title: 'CONNECTED ≠ SELECTED ≠ EXECUTED',
        paragraphs: [
          'Branch может быть физически подключён к selector, но не выбран. Выбранный branch может не потребоваться текущему output. А required branch может отдать cached result без полного пересчёта.',
        ],
        codeExamples: [
          {
            title: 'Three questions',
            label: 'DEBUG',
            code: 'SELECTED? → REQUIRED? → CACHED?',
          },
        ],
      },
      {
        id: 'bypass-selector',
        eyebrow: 'RULE 03',
        title: 'BYPASS и SELECTOR решают разные задачи',
        table: {
          columns: ['Mechanism', 'Question'],
          rows: [
            ['BYPASS', 'Должен ли module участвовать в processing?'],
            ['SELECTOR / SWITCH', 'Какой из доступных data routes идёт дальше?'],
            ['SHARED CONTROL', 'Какое authoritative value управляет несколькими consumers?'],
          ],
        },
      },
      {
        id: 'checkpoint-rule',
        eyebrow: 'RULE 04',
        title: 'Не чинить downstream, пока upstream checkpoint не доказан',
        paragraphs: [
          'Если ошибка уже присутствует после base decode, бессмысленно менять PEOPLE или upscale. Production debugging идёт от первого неправильного checkpoint, а не от последней видимой проблемы.',
        ],
      },
      {
        id: 'practice',
        eyebrow: 'PRACTICE',
        title: 'Упражнение: найти пять authoritative controls',
        bullets: [
          'Generation mode 541.',
          'GLOBAL Seed 231.',
          'ControlNet source 456.',
          'PEOPLE mode 543.',
          'Working resolution 702.',
          'Для каждого найти минимум один downstream consumer и проверить, linked ли input.',
        ],
      },
      {
        id: 'pass',
        eyebrow: 'PASS CRITERIA',
        title: 'Когда блок 05:42 усвоен',
        paragraphs: [
          'При конфликте значений ты сначала ищешь authoritative control и actual route, а не веришь ближайшему widget на глаз.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'hansen-06-32-controlnet-preprocessors',
    navTitle: '06:32 · ControlNet / Preprocessors',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 06:32',
    title: 'ControlNet & Preprocessors — structural guidance как отдельный data pipeline',
    lede:
      'Hansen показывает ControlNet/preprocessor area отдельно от sampler. Для начинающего это важный принцип: ControlNet — не «галочка у модели», а самостоятельная цепочка, которая создаёт control image, выбирает источник, загружает соответствующий ControlNet и добавляет structural conditioning в generation.',
    status: 'confirmed',
    statusNote:
      'Source graph подтверждает Depth и Canny paths, external-vs-preprocessor switch 456, stack order Depth → Canny и final Apply ControlNet Stack before KSampler.',
    visual: 'controlnet',
    category: 'hansen-timestamps',
    stage: 'hansen-06-32',
    relatedNodes: [21, 23, 25, 38, 165, 417, 418, 419, 456, 542, 732, 722, 723],
    relatedChapters: [
      'controlnet',
      'inputs',
      'workflow-engineering-data-control-plane',
      'workflow-engineering-module-contracts',
    ],
    sections: [
      {
        id: 'hansen-original',
        eyebrow: 'HANSEN ORIGINAL',
        title: 'Два structural channels: Depth и Canny',
        table: {
          columns: ['Channel', 'Generated source', 'Model', 'Strength'],
          rows: [
            ['Depth', 'DepthAnythingV2Preprocessor 38', 'SDXL Depth ControlNet 21', 'shared control 723 = 0.36'],
            ['Canny / edges', 'Image Edge Detection Filter 165', 'SDXL Canny ControlNet 23', 'shared control 722 = 0.31'],
          ],
        },
        facts: [
          {
            status: 'confirmed',
            title: 'Stack order',
            text: 'Depth stack 417 feeds Canny stack 419; 419 feeds Apply ControlNet Stack 418.',
          },
        ],
      },
      {
        id: 'source-selector',
        eyebrow: 'SOURCE CONTRACT',
        title: 'Control image можно взять извне или создать внутри workflow',
        codeExamples: [
          {
            title: 'Source routing',
            label: 'CONFIRMED',
            code:
              'BASE IMAGE 79 → PREPROCESSOR\n' +
              '                    ↘\n' +
              'EXTERNAL MAP 25 → SOURCE SWITCH 456 / 542 / 732\n' +
              '                    → CONTROLNET STACK',
          },
        ],
        paragraphs: [
          'Node 456 выбирает общий режим source: external maps или generated preprocessors. Это позволяет не перестраивать downstream ControlNet chain при смене источника.',
        ],
      },
      {
        id: 'universal-pattern',
        eyebrow: 'ARCHVIZ FOUNDATION / EXTENSION',
        title: 'Универсальная архитектура ControlNet',
        codeExamples: [
          {
            title: 'ControlNet sentence',
            label: 'MODEL-AGNOSTIC',
            code:
              'SOURCE IMAGE\n' +
              '→ PREPROCESS / EXTERNAL MAP\n' +
              '→ SOURCE SELECTOR\n' +
              '→ CONTROLNET MODEL\n' +
              '→ STRENGTH / START / END\n' +
              '→ APPLY TO CONDITIONING\n' +
              '→ SAMPLER',
          },
        ],
      },
      {
        id: 'depth-vs-canny',
        eyebrow: 'BEGINNER FOUNDATION',
        title: 'Depth и Canny удерживают разные виды информации',
        table: {
          columns: ['Control', 'Главный сигнал', 'Archviz use'],
          rows: [
            ['Depth', 'Объём и относительная глубина', 'Крупная геометрия, перспектива, massing'],
            ['Canny / edges', 'Контуры и резкие границы', 'Тонкие линии фасада, проёмы, ритм, edges'],
          ],
        },
        paragraphs: [
          'Поэтому Depth обычно является первым structural guardrail, а Canny добавляется, когда нужно сильнее удержать тонкие контуры. Это принцип, а не привязка к конкретной модели.',
        ],
      },
      {
        id: 'debug',
        eyebrow: 'TROUBLESHOOTING',
        title: 'ControlNet debug идёт до sampler',
        bullets: [
          'Проверить source image.',
          'Открыть preview preprocess map.',
          'Проверить source selector 456.',
          'Проверить правильный ControlNet model для типа карты.',
          'Проверить strength / start / end.',
          'Проверить stack order и Apply ControlNet Stack 418.',
          'Только потом оценивать sampler result.',
        ],
      },
      {
        id: 'practice',
        eyebrow: 'PRACTICE',
        title: 'Упражнение: объяснить Depth branch без названий моделей',
        paragraphs: [
          'Найди Depth path и проговори его как систему: «source → depth map → selector → structural control → conditioning → sampler». Если можешь сделать это без названия конкретного checkpoint, принцип усвоен.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'hansen-07-38-masks-detail-conservation',
    navTitle: '07:38 · Masks & Detail Conservation',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 07:38',
    title: 'Masks & Detail Conservation — как ограничить свободу генерации локально',
    lede:
      'На этом участке showcase видны mask/preprocess/detail branches. Здесь учебник связывает два фундаментальных навыка: маска определяет WHERE, а detail conservation определяет WHAT из исходной сцены нужно вернуть или сохранить после генеративного pass.',
    status: 'confirmed',
    statusNote:
      'Source topology подтверждает RGB mask system, PEOPLE Florence2/SAM2 masks, architectural Florence2/SAM2 detail mask и detail-transfer nodes 565/573 controlled by shared strength 720.',
    visual: 'masks-global',
    category: 'hansen-timestamps',
    stage: 'hansen-07-38',
    relatedNodes: [337, 338, 550, 114, 115, 144, 146, 580, 584, 585, 754, 565, 573, 720, 775],
    relatedChapters: [
      'segmentation-masks',
      'detail-conservation',
      'ppl-workflow-01-generate-place',
      'workflow-engineering-coordinates-batch',
    ],
    sections: [
      {
        id: 'three-mask-systems',
        eyebrow: 'HANSEN ORIGINAL',
        title: 'В master graph маски появляются не одним способом',
        table: {
          columns: ['Mask system', 'Source', 'Purpose'],
          rows: [
            ['RGB/ID masks', '338 → 337', 'Предварительно подготовленные зоны по цветам'],
            ['PEOPLE semantic mask', '550 → 114 → 115 → 144 → 146', 'Выделение людей для PPL processing'],
            ['Architectural detail mask', '580 → 584 → 585', 'Building/facade region for conservation/composite'],
          ],
        },
      },
      {
        id: 'mask-definition',
        eyebrow: 'BEGINNER FOUNDATION',
        title: 'Маска — это не картинка «для красоты», а spatial instruction',
        codeExamples: [
          {
            title: 'Mask question',
            label: 'CORE CONCEPT',
            code: 'MASK = WHERE SHOULD THIS OPERATION APPLY?',
          },
        ],
        paragraphs: [
          'Когда в графе встречается MASK, сначала нужно определить, что означает white/foreground и какую операцию этот mask ограничивает: crop, composite, inpaint, detail transfer или другое local processing.',
        ],
      },
      {
        id: 'semantic-route',
        eyebrow: 'SEMANTIC MASK',
        title: 'Detection и segmentation — разные этапы',
        codeExamples: [
          {
            title: 'Florence2 + SAM2 pattern',
            label: 'UNIVERSAL PATTERN',
            code:
              'IMAGE\n' +
              '→ DETECTION / GROUNDING: WHERE IS THE OBJECT?\n' +
              '→ COORDINATES / BBOX\n' +
              '→ SEGMENTATION: WHICH PIXELS BELONG TO IT?\n' +
              '→ MASK\n' +
              '→ GROW / BLUR\n' +
              '→ LOCAL OPERATION',
          },
        ],
      },
      {
        id: 'detail-conservation',
        eyebrow: 'DETAIL CONSERVATION',
        title: 'Сохранение деталей — это controlled return of source information',
        paragraphs: [
          'Node 565 переносит selected source detail в SDXL result, а 573 делает аналогичную controlled transfer перед main FLUX encode. Оба получают shared strength from node 720.',
          'Смысл не в том, чтобы «добавить резкости вообще». Workflow использует mask, чтобы вернуть важные архитектурные details только там, где это нужно.',
        ],
        codeExamples: [
          {
            title: 'Conceptual route',
            label: 'DETAIL CONSERVATION',
            code:
              'GENERATED IMAGE\n' +
              '+ SOURCE DETAIL\n' +
              '+ ARCHITECTURAL MASK\n' +
              '+ BLEND STRENGTH\n' +
              '→ CONTROLLED DETAIL RETURN',
          },
        ],
      },
      {
        id: 'coordinate-warning',
        eyebrow: 'DATA CONTRACT',
        title: 'Mask должна совпадать с image по coordinate space',
        paragraphs: [
          'Если detection выполнялась на resized image, а local operation получает другой canvas, mask может оказаться смещённой или иметь неверный scale. Поэтому source image, resize policy, bbox coordinates и mask dimensions читаются как единый contract.',
        ],
      },
      {
        id: 'debug',
        eyebrow: 'TROUBLESHOOTING',
        title: 'Mask pipeline проверяем отдельно от generation',
        bullets: [
          'Preview source image.',
          'Preview detection / bbox when available.',
          'Preview raw segmentation mask.',
          'Preview mask after grow/blur.',
          'Проверить polarity: что является foreground?',
          'Проверить dimensions / coordinate space.',
          'Проверить local composite/detail result до main sampler.',
        ],
      },
      {
        id: 'practice',
        eyebrow: 'PRACTICE',
        title: 'Упражнение: для каждой mask сказать «WHERE + WHAT OPERATION»',
        paragraphs: [
          'Выбери три masks в Hansen и для каждой сформулируй две вещи: какую spatial region она описывает и какую downstream operation ограничивает. Если ответ звучит только как «это маска здания», он ещё неполный.',
        ],
      },
      {
        id: 'pass',
        eyebrow: 'PASS CRITERIA',
        title: 'Когда урок 07:38 усвоен',
        paragraphs: [
          'Ты различаешь prepared ID mask, semantic segmentation mask и mask для detail conservation; понимаешь, что mask сама ничего не «улучшает» — она только ограничивает следующую операцию по пространству.',
        ],
      },
    ],
  },
];
