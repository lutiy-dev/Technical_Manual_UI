import type { Chapter } from '../manual-types';

export const hansenTimestampChapters03: Chapter[] = [
  {
    index: 0,
    slug: 'hansen-08-35-mode1-example',
    navTitle: '08:35 · Mode 1 Example',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 08:35',
    title: 'Mode 1 example — сначала читать состояние системы, потом красивую картинку',
    lede:
      'На этом таймкоде Hansen показывает большой рабочий graph и результат Mode 1. Для начинающего это ключевой переход: мы учимся не оценивать только картинку, а связывать её с конкретным состоянием controls, active route и checkpoints.',
    status: 'confirmed',
    statusNote:
      'Video review показывает полный graph в районе 08:35; source graph подтверждает сохранённый Mode 1: generation control 541=1, empty latent selection через 535 и denoise 1.0 через 600.',
    visual: 'master',
    category: 'hansen-timestamps',
    stage: 'hansen-08-35',
    relatedNodes: [1, 3, 14, 230, 231, 535, 541, 600, 607, 608, 609, 783],
    relatedChapters: ['control-panel', 'sdxl', 'workflow-engineering-switches-routing', 'workflow-engineering-reproducibility'],
    sections: [
      {
        id: 'hansen-original',
        eyebrow: 'HANSEN ORIGINAL',
        title: 'Mode 1 — TXT + ControlNet to image',
        paragraphs: [
          'В сохранённом workflow node 541 равен 1. Это выбирает txt2img-style route: node 535 берёт Empty Latent 3, а denoise logic через 602/600 выбирает fallback 1.0.',
          'Base image при этом всё равно участвует как источник структуры: resize, preprocessors, ControlNet maps, masks и downstream comparisons. Поэтому Mode 1 не означает «с нуля без исходника».',
        ],
        codeExamples: [
          {
            title: 'Mode 1 mental model',
            label: 'ACTIVE STATE',
            code:
              'BASE IMAGE / CONTROL MAPS\n' +
              '+ PROMPT / CONDITIONING\n' +
              '+ EMPTY LATENT\n' +
              '+ DENOISE 1.0\n' +
              '→ SDXL GENERATION',
          },
        ],
      },
      {
        id: 'read-state',
        eyebrow: 'ARCHVIZ FOUNDATION / EXTENSION',
        title: 'Пример результата всегда читаем вместе с state vector',
        table: {
          columns: ['Question', 'Mode 1 answer'],
          rows: [
            ['Какой generation mode?', '541 = 1'],
            ['Какой latent source?', 'Empty Latent 3 via selector 535'],
            ['Какой denoise?', '1.0 via comparison/select logic 602 → 600'],
            ['Какая structure guidance?', 'Depth + Canny stack'],
            ['Какой seed/control config?', 'Shared control plane'],
          ],
        },
        paragraphs: [
          'Без этого списка «пример» нельзя повторить. Production screenshot имеет смысл только вместе с конфигурацией, которая его породила.',
        ],
      },
      {
        id: 'checkpoint',
        eyebrow: 'CHECKPOINT',
        title: 'Сравнивать нужно INPUT → SDXL, а не INPUT → FINAL',
        bullets: [
          'Сначала сравнить base input с SDXL decode 14.',
          'Проверить крупную геометрию, перспективу, openings и silhouette.',
          'Только после этого разрешать PEOPLE, detail transfer и main FLUX.',
        ],
      },
      {
        id: 'practice',
        eyebrow: 'PRACTICE',
        title: 'Упражнение: восстановить Mode 1 только по controls',
        bullets: [
          'Найти node 541 и доказать, что mode=1.',
          'Проследить 541 → 535 и определить selected latent.',
          'Проследить 541 → 602 → 600 и определить denoise.',
          'Не запускать graph, пока route нельзя объяснить словами.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'hansen-09-16-generation-mode1',
    navTitle: '09:16 · Generation Mode 1',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 09:16',
    title: 'Generation Mode 1 — полный проход от controls к первому доказуемому image checkpoint',
    lede:
      'Здесь мы превращаем Mode 1 из понятия в маршрут. Главная задача новичка — уметь пройти цепочку от shared controls через SDXL sampler до decode, не отвлекаясь на downstream PEOPLE и FLUX.',
    status: 'confirmed',
    statusNote:
      'Source topology подтверждает SDXL route: model 2, prompt 5/6, ControlNet stack 417/419/418, latent selector 535, KSampler 1 и VAE Decode 14.',
    visual: 'sdxl',
    category: 'hansen-timestamps',
    stage: 'hansen-09-16',
    relatedNodes: [1, 2, 3, 5, 6, 14, 21, 23, 38, 165, 230, 231, 417, 418, 419, 535, 541, 600],
    relatedChapters: ['sdxl', 'controlnet', 'hansen-02-40-process1-txt2img', 'workflow-engineering-debugging'],
    sections: [
      {
        id: 'route',
        eyebrow: 'HANSEN ORIGINAL',
        title: 'Mode 1 SDXL route',
        codeExamples: [
          {
            title: 'Active generation path',
            label: 'CONFIRMED TOPOLOGY',
            code:
              'MODEL 2\n' +
              '+ POSITIVE 5 / NEGATIVE 6\n' +
              '+ DEPTH 417 → CANNY 419 → APPLY 418\n' +
              '+ EMPTY LATENT 3 → SELECTOR 535\n' +
              '+ CONFIG 230 / SEED 231 / DENOISE 600\n' +
              '→ KSAMPLER 1\n' +
              '→ VAE DECODE 14',
          },
        ],
      },
      {
        id: 'sampler-contract',
        eyebrow: 'BEGINNER FOUNDATION',
        title: 'Sampler не «рисует сам» — он место встречи пяти систем',
        table: {
          columns: ['Input family', 'Meaning'],
          rows: [
            ['MODEL', 'Какая generative network работает'],
            ['CONDITIONING', 'Что хотим получить + control guidance'],
            ['LATENT', 'С какого latent state начинается generation'],
            ['NOISE / SEED', 'Какая stochastic realization используется'],
            ['SAMPLER CONFIG', 'Сколько и как делать denoising steps'],
          ],
        },
        paragraphs: [
          'Это универсальная схема. Название конкретного sampler или модели может измениться, но эти семейства ответственности останутся.',
        ],
      },
      {
        id: 'decode',
        eyebrow: 'CHECKPOINT',
        title: 'Node 14 — первый image, который можно честно оценивать',
        paragraphs: [
          'До decode 14 большая часть процесса существует в model/conditioning/latent space. После 14 мы снова имеем IMAGE и можем сравнивать его с исходником.',
          'Если architecture сломана уже здесь, downstream enhancement не должен использоваться как попытка «починить всё потом».',
        ],
      },
      {
        id: 'qc',
        eyebrow: 'QC',
        title: 'Порядок проверки Mode 1',
        bullets: [
          'Camera / perspective.',
          'Main massing and silhouette.',
          'Facade rhythm / openings.',
          'Ground and horizon relationship.',
          'Only then material/lighting/detail quality.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'hansen-11-35-mode2-img2img',
    navTitle: '11:35 · Mode 2 IMG2IMG',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 11:35',
    title: 'Mode 2 · IMG2IMG — тот же sampler, другой initial condition',
    lede:
      'Mode 2 особенно полезен как учебный пример: большая часть production system остаётся прежней, но меняются latent source и denoise. Так становится видно, что mode switch не обязан означать новый workflow — он может просто перенастроить contract существующего module.',
    status: 'confirmed',
    statusNote:
      'Source control logic подтверждает generation mode 541, latent selector 535 и denoise selector 600. Stored img2img control 608 = 0.3; при mode 2 он становится relevant branch.',
    visual: 'sdxl',
    category: 'hansen-timestamps',
    stage: 'hansen-11-35',
    relatedNodes: [1, 14, 535, 536, 541, 592, 600, 602, 607, 608, 609, 695, 693],
    relatedChapters: ['sdxl', 'inputs', 'workflow-engineering-switches-routing', 'workflow-engineering-module-contracts'],
    sections: [
      {
        id: 'difference',
        eyebrow: 'HANSEN ORIGINAL',
        title: 'Mode 1 и Mode 2 различаются прежде всего стартовым latent и denoise',
        table: {
          columns: ['Parameter', 'Mode 1 · TXT+CNET2IMG', 'Mode 2 · IMG+CNET2IMG'],
          rows: [
            ['Latent source', 'Empty latent', 'VAE-encoded input image'],
            ['Denoise', '1.0', 'User control 608; stored 0.3'],
            ['Prompt / ControlNet / model', 'Shared system', 'Shared system'],
            ['Sampler/output contract', 'Same module role', 'Same module role'],
          ],
        },
      },
      {
        id: 'concept',
        eyebrow: 'BEGINNER FOUNDATION',
        title: 'IMG2IMG = generation с памятью об исходном изображении',
        paragraphs: [
          'В txt2img latent начинается как пустой/noise canvas. В img2img исходное IMAGE сначала кодируется VAE в LATENT, и sampler модифицирует уже существующее представление.',
          'Denoise задаёт степень свободы изменения. Чем ниже denoise, тем сильнее initial latent влияет на результат; это полезная модель мышления, а не абсолютная гарантия сохранения геометрии.',
        ],
        codeExamples: [
          {
            title: 'Mode 2 contract',
            label: 'MODEL-AGNOSTIC',
            code:
              'INPUT IMAGE\n' +
              '→ VAE ENCODE\n' +
              '→ INITIAL LATENT\n' +
              '+ CONDITIONING / CONTROL\n' +
              '+ DENOISE < 1\n' +
              '→ SAMPLER\n' +
              '→ DECODE',
          },
        ],
      },
      {
        id: 'routing',
        eyebrow: 'CONTROL PLANE',
        title: 'Один switch меняет несколько downstream decisions',
        paragraphs: [
          'Node 541 не просто подписывает режим. Он влияет на latent route и denoise logic. Это классический пример shared authoritative control: одна business decision распространяется в несколько технических branches.',
        ],
      },
      {
        id: 'practice',
        eyebrow: 'PRACTICE',
        title: 'Упражнение: объяснить Mode 2 без названий Hansen nodes',
        paragraphs: [
          'Если ты можешь объяснить Mode 2 как «input image → encode → latent → partial denoise → decode», значит принцип усвоен и переносится на другие модели.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'hansen-12-53-generation-mode2',
    navTitle: '12:53 · Generation Mode 2',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 12:53',
    title: 'Generation Mode 2 — настраиваем изменение, а не просто запускаем второй preset',
    lede:
      'Hansen возвращается к control/config area и Mode 2 generation. Для учебника здесь важен навык: отличать source preservation controls от aesthetic controls и понимать, какие параметры действительно меняют freedom of generation.',
    status: 'confirmed',
    statusNote:
      'Video review around 12:53 показывает control area и Stage 1 preview. Source graph подтверждает working resolution, generation mode, denoise, ControlNet strengths, prompt selector и shared seed/steps controls.',
    visual: 'controls',
    category: 'hansen-timestamps',
    stage: 'hansen-12-53',
    relatedNodes: [231, 453, 456, 541, 600, 608, 702, 720, 721, 722, 723, 771],
    relatedChapters: ['control-panel', 'hansen-11-35-mode2-img2img', 'controlnet', 'workflow-engineering-reproducibility'],
    sections: [
      {
        id: 'control-families',
        eyebrow: 'ARCHVIZ FOUNDATION / EXTENSION',
        title: 'Разделяем controls по ответственности',
        table: {
          columns: ['Family', 'Examples', 'Question'],
          rows: [
            ['Geometry preservation', 'Mode, denoise, Depth/Canny strength', 'Сколько свободы у AI?'],
            ['Canvas', 'Working resolution 702', 'На каком размере работает pipeline?'],
            ['Stochastic', 'Seed 231, steps 771', 'Как повторить sampling state?'],
            ['Prompt/style', 'Prompt selector 453, IPA weight 721', 'Какой visual intent задаём?'],
            ['Detail conservation', '720', 'Сколько исходной detail information вернуть?'],
          ],
        },
      },
      {
        id: 'change-one',
        eyebrow: 'EXPERIMENT DESIGN',
        title: 'Для обучения меняем один control family за раз',
        paragraphs: [
          'Если одновременно поменять denoise, seed, prompt и ControlNet strength, результат нельзя интерпретировать. A/B test должен менять один фактор при фиксированных остальных controls.',
        ],
        codeExamples: [
          {
            title: 'Good experiment',
            label: 'A/B',
            code:
              'FIX: INPUT + SEED + PROMPT + CONTROLNET + STEPS\n' +
              'CHANGE: DENOISE ONLY\n' +
              'COMPARE: GEOMETRY / MATERIAL / MICRODETAIL',
          },
        ],
      },
      {
        id: 'checkpoint',
        eyebrow: 'CHECKPOINT',
        title: 'Stage 1 preview — обязательная остановка',
        paragraphs: [
          'Mode 2 должен сначала доказать, что base generation сохранил нужную архитектуру. PEOPLE, main FLUX и upscale не являются частью этого доказательства.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'hansen-13-20-mode2-enhancement',
    navTitle: '13:20 · Mode 2 Enhancement',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 13:20',
    title: 'Mode 2 enhancement — локальные modules возвращаются в общий master pipeline',
    lede:
      'К этому моменту graph уже прошёл base generation. Теперь важно увидеть production pattern: локальные ветки не заменяют master image навсегда, а делают ограниченную работу и возвращают результат в следующий общий refinement stage.',
    status: 'confirmed',
    statusNote:
      'Source topology подтверждает PEOPLE return через 459, detail transfer 573, VAE Encode 67, main FLUX sampler 57 и decode 53. Video review around 13:20 показывает downstream/right-side pipeline и result comparisons.',
    visual: 'flux-main',
    category: 'hansen-timestamps',
    stage: 'hansen-13-20',
    relatedNodes: [53, 57, 67, 459, 565, 573, 720, 754, 775],
    relatedChapters: ['people-ppl-overview', 'detail-conservation', 'main-flux', 'workflow-engineering-module-contracts'],
    sections: [
      {
        id: 'return-pattern',
        eyebrow: 'HANSEN ORIGINAL',
        title: 'PEOPLE и detail modules сходятся перед main FLUX',
        codeExamples: [
          {
            title: 'Return to master',
            label: 'CONFIRMED ROUTE',
            code:
              'BASE / SDXL RESULT\n' +
              '→ LOCAL PEOPLE MODULE\n' +
              '→ SELECTOR 459\n' +
              '→ DETAIL TRANSFER 573\n' +
              '→ VAE ENCODE 67\n' +
              '→ MAIN FLUX 57\n' +
              '→ DECODE 53',
          },
        ],
      },
      {
        id: 'universal',
        eyebrow: 'ARCHVIZ FOUNDATION / EXTENSION',
        title: 'Локальный module должен иметь ясный RETURN contract',
        paragraphs: [
          'Хороший module делает одну ответственность и возвращает стандартный data type, который понимает следующий stage. Это позволяет заменить PEOPLE implementation, не переписывая весь downstream pipeline.',
        ],
      },
      {
        id: 'main-flux',
        eyebrow: 'REFINEMENT',
        title: 'Main FLUX здесь — refinement stage, а не новый composition generator',
        paragraphs: [
          'Scene после PEOPLE/detail transfer кодируется в latent 67 и проходит FLUX с stored denoise 0.18. Малый denoise показывает intended refinement role; визуальное сохранение конкретных объектов всё равно должно подтверждаться comparison.',
        ],
      },
      {
        id: 'qc',
        eyebrow: 'QC',
        title: 'Проверяем survival после каждого return',
        bullets: [
          'Сравнить до/после PEOPLE.',
          'Сравнить до/после detail transfer.',
          'Сравнить 459/573 с decode 53 после main FLUX.',
          'Не принимать красивый final, если локальная архитектурная ошибка появилась раньше.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'hansen-13-55-output-parameters',
    navTitle: '13:55 · Output Parameters',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 13:55',
    title: 'Output parameters — output stage является частью production contract',
    lede:
      'Финальная картинка — не конец инженерии. Нужно понимать, какой branch реально сохранён, какой только присутствует в graph, какой bypassed и что означает LQ/HQ output в текущем state.',
    status: 'confirmed',
    statusNote:
      'Source graph подтверждает active save 730 от decode 53. HQ/upscale/overlay chain присутствует, но processing nodes 832–851 и associated sizing logic сохранены в bypass mode 4.',
    visual: 'output',
    category: 'hansen-timestamps',
    stage: 'hansen-13-55',
    relatedNodes: [15, 53, 153, 154, 293, 301, 309, 531, 730, 832, 833, 834, 848, 849],
    relatedChapters: ['upscale-overlay', 'output', 'main-flux', 'workflow-engineering-execution-cache'],
    sections: [
      {
        id: 'actual-output',
        eyebrow: 'HANSEN ORIGINAL',
        title: 'В сохранённом state доказуемый active output — node 730',
        table: {
          columns: ['Output', 'Upstream', 'State'],
          rows: [
            ['730 · LQ1 JPG', 'Decode 53', 'Active route'],
            ['531 · HQ PNG', 'Upscale 833', 'Save node exists; upstream bypassed'],
            ['293 · LQ2 JPG', 'Overlay 849', 'Save node exists; upstream bypassed'],
            ['15 · Final Preview', 'Overlay 849', 'Preview exists; upstream bypassed'],
          ],
        },
      },
      {
        id: 'output-contract',
        eyebrow: 'BEGINNER FOUNDATION',
        title: 'OUTPUT = format + size + branch + filename + state',
        paragraphs: [
          'Недостаточно сказать «workflow сохраняет PNG». Нужно знать, из какого branch приходит image, прошёл ли он upscale, есть ли overlays и какой execution state у upstream nodes.',
        ],
      },
      {
        id: 'upscale',
        eyebrow: 'OPTIONAL MODULE',
        title: 'Upscale — отдельный module, а не обязательная часть generation',
        paragraphs: [
          'Graph содержит Ultimate Upscale 833 с model 4x-UltraSharp, tile logic и optional detail transfer 834. Но этот module можно bypass без изменения логики предыдущих stages.',
          'Это важный production lesson: delivery-resolution stage должен быть detachable от content-generation stage.',
        ],
      },
      {
        id: 'pass',
        eyebrow: 'PASS CRITERIA',
        title: 'Ты должен уметь ответить: что именно сейчас сохранится?',
        paragraphs: [
          'Если ответ требует смотреть только на название Save node, output contract ещё не понят. Нужно проследить его upstream route до последнего active processing checkpoint.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'hansen-14-43-conclusion',
    navTitle: '14:43 · Conclusion',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 14:43',
    title: 'Conclusion — от чужого workflow к собственному инженерному мышлению',
    lede:
      'Финальный кадр Hansen нужен нам не как точка «повтори картинку», а как доказательство того, что сложный graph можно разложить на универсальные contracts. После этой главы ученик должен видеть систему, а не 252 отдельных nodes.',
    status: 'confirmed',
    statusNote:
      'Video conclusion показывает finished architectural image. Итоговые учебные выводы ниже являются ARCHVIZ FOUNDATION synthesis, основанным на разобранной topology всего workflow.',
    visual: 'master',
    category: 'hansen-timestamps',
    stage: 'hansen-14-43',
    relatedChapters: [
      'workflow-engineering-overview',
      'graph-reading',
      'hansen-00-39-production-method',
      'ppl-workflow-01-generate-place',
      'main-flux',
      'upscale-overlay',
    ],
    sections: [
      {
        id: 'one-sentence',
        eyebrow: 'THE WHOLE GRAPH',
        title: 'Весь Hansen workflow одной строкой',
        codeExamples: [
          {
            title: 'Master mental model',
            label: 'MODEL-AGNOSTIC',
            code:
              'CONFIG\n' +
              '→ INPUT\n' +
              '→ STRUCTURAL CONTROL\n' +
              '→ BASE GENERATION\n' +
              '→ LOCAL MASKS / PEOPLE / DETAIL MODULES\n' +
              '→ GLOBAL REFINEMENT\n' +
              '→ OPTIONAL UPSCALE / OVERLAY\n' +
              '→ OUTPUT',
          },
        ],
      },
      {
        id: 'what-remains',
        eyebrow: 'FOUNDATION',
        title: 'Что останется, когда конкретные models устареют',
        bullets: [
          'Data types and contracts: IMAGE, MASK, LATENT, MODEL, CONDITIONING, VAE.',
          'Control plane vs data plane.',
          'Selectors, switches and bypass.',
          'Source → process → checkpoint → return.',
          'Coordinate and batch contracts.',
          'Local freedom instead of uncontrolled full-frame regeneration.',
          'Reproducible A/B experiments.',
          'Output as a traceable production contract.',
        ],
      },
      {
        id: 'not-model-course',
        eyebrow: 'COURSE BOUNDARY',
        title: 'Почему мы не будем делать второй учебник под каждую новую model',
        paragraphs: [
          'Новая model меняет loaders, conditioning details, sampler conventions и capability. Она не отменяет workflow engineering. Поэтому после этого курса следующий шаг — читать документацию конкретной новой model самостоятельно и вставлять её в уже знакомую архитектуру.',
          'Цель курса выполнена, когда неизвестный workflow воспринимается как набор знакомых responsibilities, даже если node names ты видишь впервые.',
        ],
      },
      {
        id: 'graduation',
        eyebrow: 'GRADUATION TEST',
        title: 'Финальный тест: открыть незнакомый graph и не паниковать',
        bullets: [
          'Найти outputs и пройти upstream.',
          'Найти major groups/modules.',
          'Найти control plane и authoritative values.',
          'Определить active / selected / bypassed branches.',
          'Определить input/output contract каждого важного module.',
          'Найти checkpoints и только затем читать внутренние nodes.',
          'Сформулировать весь graph одной архитектурной строкой.',
        ],
      },
      {
        id: 'finish',
        eyebrow: 'NEXT',
        title: 'После учебника начинается самообразование',
        paragraphs: [
          'Дальше не нужен новый фундаментальный курс. Нужна практика: брать новый module, понимать его I/O contract, проверять dependencies, строить маленький lab, а затем безопасно подключать его к master workflow.',
        ],
      },
    ],
  },
];
