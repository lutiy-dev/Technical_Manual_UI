export type EvidenceStatus = 'confirmed' | 'inferred' | 'not-confirmed';

export type Fact = {
  status: EvidenceStatus;
  title: string;
  text: string;
};

export type CodeExample = {
  title: string;
  label: string;
  code: string;
  note?: string;
};

export type DataTable = {
  columns: string[];
  rows: string[][];
};

export type ChapterSection = {
  id: string;
  eyebrow?: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  facts?: Fact[];
  codeExamples?: CodeExample[];
  table?: DataTable;
};

export type Chapter = {
  index: number;
  slug: string;
  navTitle: string;
  eyebrow: string;
  title: string;
  lede: string;
  status: EvidenceStatus;
  statusNote: string;
  visual:
    | 'overview'
    | 'prompt'
    | 'generation'
    | 'mask'
    | 'preparation'
    | 'selectors'
    | 'composite'
    | 'diagnostics'
    | 'checklist'
    | 'output'
    | 'examples'
    | 'resources';
  sections: ChapterSection[];
};

export const sourceRoot =
  '/resources/EPSPOZICIYA_HANSEN_TECHNICAL_MANUAL_SOURCE';

export const manualChapters = ([
  {
    index: 1,
    slug: 'overview',
    navTitle: 'Overview',
    eyebrow: 'PEOPLE / PPL',
    title: 'Как человек проходит через граф Hansen',
    lede:
      'Ветка PEOPLE / PPL — отдельный mini-pipeline: она генерирует человека, строит маску, подготавливает вставку, композитит её со сценой и возвращает результат в основное изображение.',
    status: 'confirmed',
    statusNote: 'Топология проверена по актуальному workflow JSON',
    visual: 'overview',
    sections: [
      {
        id: 'what-it-does',
        eyebrow: '01 · ROLE',
        title: 'Это controlled compositing, а не отдельная картинка',
        paragraphs: [
          'Ветка работает поверх базовой архитектурной сцены. Человек создаётся отдельно, вырезается, приводится к свету и цвету окружения, затем вставляется в сцену. Результат после селекторов возвращается в main pipeline перед финальным FLUX-проходом.',
          'Графовая топология доказывает, что PEOPLE-ветка связана с финальным выходом. Она не заканчивается на промежуточном preview.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Source of truth',
            text: 'Epspoziciya_archviz_ph_sdxlflux_v001.json; 252 nodes, 341 links, 28 controls.',
          },
          {
            status: 'confirmed',
            title: 'Ключевые controls',
            text: '408 = PROMPT PPL FLUX; 543 = общий PPL Selector; 715 = Return / Downstream source selector, вложенный перед 552.',
          },
          {
            status: 'not-confirmed',
            title: 'Видимость в конкретном render',
            text: 'Наличие связного маршрута не доказывает качество маски или видимость людей без runtime-результата.',
          },
        ],
      },
      {
        id: 'route',
        eyebrow: '02 · ROUTE',
        title: 'Точный возврат в основную цепочку',
        paragraphs: [
          'После PEOPLE composite узел 459 отдаёт выбранный результат в 573 (detail transfer), затем в 67 (VAE Encode), 57 (FLUX sampler) и 53 (VAE Decode). В сохранённой конфигурации активное доказуемое завершение — LQ save 730; HQ / upscale / overlay nodes 832–851 сохранены в bypass mode 4.',
        ],
        table: {
          columns: ['Этап', 'Ключевые nodes', 'Что наблюдать'],
          rows: [
            ['Prompt + generation', '408 → 823/824/820 → 831 → 830 → 828 → 829', 'Отдельно созданные люди'],
            ['Mask', '550 → 114 → 115 → 144 → 146', 'Белый силуэт без дыр и мусора'],
            ['Preparation', '420 → 422 → 477 → 449', 'Чистый cutout с подходящим цветом'],
            ['Composite', '429 / 499–510', 'Люди находятся в нужном месте и масштабе'],
            ['Return', '543 → 459 → 573 → 67 → 57 → 53', 'Версия с людьми уходит дальше'],
            ['Current final', '53 → 730', 'Люди видны в активном LQ save'],
            ['Optional HQ chain', '53 → 833 → 848/849 → 15/293', 'Сейчас сохранена в BYPASS; проверять после включения'],
          ],
        },
      },
      {
        id: 'read-status',
        eyebrow: '03 · EVIDENCE',
        title: 'Как читать статусы в учебнике',
        facts: [
          {
            status: 'confirmed',
            title: 'CONFIRMED',
            text: 'Факт прямо доказан узлом, widget value, link topology или сохранённой спецификацией.',
          },
          {
            status: 'inferred',
            title: 'INFERRED',
            text: 'Практическое назначение следует из названия и связей, но не подтверждено отдельным runtime-тестом.',
          },
          {
            status: 'not-confirmed',
            title: 'NOT CONFIRMED',
            text: 'Workflow JSON не содержит достаточного доказательства; нужен запуск, preview или лог.',
          },
        ],
      },
    ],
  },
  {
    index: 2,
    slug: 'node-408-prompt',
    navTitle: 'Node 408 Prompt',
    eyebrow: 'NODE 408',
    title: 'PROMPT PPL FLUX — бриф на человека',
    lede:
      'Node 408 описывает людей для отдельной FLUX-генерации: тип персонажа, одежду, действие, масштаб, ракурс и связь со сценой.',
    status: 'confirmed',
    statusNote: 'Title, text и downstream links присутствуют в JSON',
    visual: 'prompt',
    sections: [
      {
        id: 'current-prompt',
        eyebrow: '01 · CURRENT VALUE',
        title: 'Текущий PPL prompt',
        paragraphs: [
          'Сейчас 408 задаёт несколько жителей старого ближневосточного города в бежевых одеждах, естественно идущих или стоящих на каменной площади. Текст уже согласован со сценой по материалам, масштабу и тёплому вечернему свету.',
        ],
        codeExamples: [
          {
            title: 'Показать точный текст node 408',
            label: 'CONFIRMED · workflow value',
            code:
              'a few Middle Eastern townspeople wearing long beige robes and simple head coverings, naturally walking and standing in an old stone city square, realistic proportions, small and medium scale figures, candid documentary look, visually integrated into the scene, warm evening light',
          },
        ],
      },
      {
        id: 'assembly',
        eyebrow: '02 · ASSEMBLY',
        title: 'Как текст собирается перед encoder',
        paragraphs: [
          '408 не отправляется в CLIP отдельно. Он входит в конкатенацию вместе с префиксом 825, ENVIRONMENT 799 и LIGHT / STYLE 800. Результат кодируется node 831 и получает FLUX Guidance 2.1 в node 830.',
        ],
        table: {
          columns: ['Node', 'Роль', 'Куда идёт'],
          rows: [
            ['825', 'Префикс “fullbody portrait photo of”', '823'],
            ['408', 'Основное описание людей', '823'],
            ['799', 'Общее окружение', '824'],
            ['800 + 822', 'Свет / стиль + дополнительная инструкция', '820'],
            ['831', 'CLIPTextEncode для PPL', '830'],
            ['830', 'FluxGuidance = 2.1', '826 → sampler 828'],
          ],
        },
      },
      {
        id: 'prompt-design',
        eyebrow: '03 · PRACTICE',
        title: 'Что держать в prompt, чтобы люди не ломали archviz',
        bullets: [
          'Количество и дистанция: one / a few, small or medium scale figures.',
          'Поза и действие: walking, standing, candid; избегать крупного портрета без необходимости.',
          'Камера: full body, view direction, distance to camera, readable silhouette.',
          'Одежда: конкретная эпоха и спокойная палитра, согласованная со сценой.',
          'Интеграция: same light, scene context, realistic proportions.',
        ],
        facts: [
          {
            status: 'inferred',
            title: 'Prompt-правило',
            text: 'Чем явнее указаны масштаб, полный рост и связь со светом сцены, тем меньше риск “студийного” персонажа.',
          },
          {
            status: 'not-confirmed',
            title: 'Dedicated PPL negative',
            text: 'В экспортированной цепочке PPL отдельный полноценно подключённый negative prompt не доказан.',
          },
        ],
        codeExamples: [
          {
            title: 'Пример для нейтральной archviz-сцены',
            label: 'INFERRED · practical template',
            code:
              'a few museum visitors, full body, naturally walking and standing, neutral earth-tone clothing, small and medium scale figures, candid documentary look, correct perspective, clean readable silhouettes, naturally integrated into the architecture, same ambient light as the scene',
            note: 'Это рабочий шаблон, а не сохранённое значение workflow.',
          },
        ],
      },
    ],
  },
  {
    index: 3,
    slug: 'generation',
    navTitle: 'Generation',
    eyebrow: 'PPL GENERATION',
    title: 'От текста до отдельного FLUX-кадра',
    lede:
      'Ветка использует тот же FLUX model stack, но отдельное conditioning и собственный sampling path для изображения людей.',
    status: 'confirmed',
    statusNote: 'Model loaders, encoder, guidance, scheduler, sampler и decode связаны в JSON',
    visual: 'generation',
    sections: [
      {
        id: 'stack',
        eyebrow: '01 · MODEL STACK',
        title: 'Модели и encoder',
        table: {
          columns: ['Node', 'Компонент', 'Текущее значение'],
          rows: [
            ['467', 'UNet Loader GGUF', 'flux1-dev-Q8_0.gguf'],
            ['466', 'Dual CLIP Loader GGUF', 't5-v1_1-xxl-encoder-Q8_0.gguf + clip_l.safetensors'],
            ['54', 'FLUX VAE', 'ae.safetensors'],
            ['831', 'PPL CLIPTextEncode', 'Текст из 820'],
            ['830', 'FluxGuidance', '2.1'],
          ],
        },
      },
      {
        id: 'sampling',
        eyebrow: '02 · SAMPLING',
        title: 'От conditioning до VAEDecode 829',
        paragraphs: [
          'Encoder 831 передаёт conditioning через Guidance 830 в guider 826. SamplerCustomAdvanced 828 получает общий sampler euler, шум / seed, scheduler 819 и latent source 827. Decode 829 создаёт изображение людей.',
          'Node 771 = 24 steps связан с PPL scheduler. В сериализованном widget BasicScheduler 819 видны beta, 4 и denoise 1; linked steps переопределяют локальное значение шага.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Generation output',
            text: 'Node 829 — VAEDecode; его можно увидеть в PreviewImage 409, а output подключён к image1 selector 552.',
          },
          {
            status: 'confirmed',
            title: 'Shared seed',
            text: 'RandomNoise 61 связан с GLOBAL Seed 231 и используется также sampler 828.',
          },
          {
            status: 'not-confirmed',
            title: 'Фактическое качество',
            text: 'JSON доказывает параметры и связи, но не позу, анатомию и качество конкретного render.',
          },
        ],
      },
      {
        id: 'generation-check',
        eyebrow: '03 · CHECKPOINT',
        title: 'Первый диагностический разрыв',
        bullets: [
          'Открой PreviewImage 409 после node 829.',
          'Если людей нет уже здесь — проверяй 408, конкатенацию 823/824/820, loader stack, seed и sampler.',
          'Если здесь люди есть, генерация завершена; дальше не меняй prompt вслепую — переходи к mask chain.',
        ],
      },
    ],
  },
  {
    index: 4,
    slug: 'segmentation-mask',
    navTitle: 'Segmentation / Mask',
    eyebrow: 'MASK CHAIN',
    title: 'Florence2 → SAM2 → grow → blur',
    lede:
      'Сегментация находит людей и связанные классы, превращает bbox / points в SAM2-маску, расширяет край и смягчает его перед crop и composite.',
    status: 'confirmed',
    statusNote: 'Nodes 550, 114, 115, 144 и 146 образуют непрерывную цепочку',
    visual: 'mask',
    sections: [
      {
        id: 'detection',
        eyebrow: '01 · DETECTION',
        title: 'Florence2 ищет не только “person”',
        paragraphs: [
          'Node 550 работает в режиме caption_to_phrase_grounding на размере 1024. В сохранённом списке есть people, human, face, hand, feet, shoe, leg, bag, backpack, pet, dog, cat, gun, animal.',
          'Широкий список помогает захватить детали фигуры и предметы, но может добавить в маску лишний объект рядом с человеком.',
        ],
        codeExamples: [
          {
            title: 'Показать классы node 550',
            label: 'CONFIRMED · serialized widget',
            code:
              'people, human, face, hand, feet, shoe, leg, bag, backpack, pet, dog, cat, gun, animal',
          },
        ],
      },
      {
        id: 'mask-pipeline',
        eyebrow: '02 · MASK',
        title: 'Последовательность обработки края',
        table: {
          columns: ['Node', 'Операция', 'Текущее значение / выход'],
          rows: [
            ['550', 'Florence2Run', 'Detection result + data'],
            ['114', 'Florence2toCoordinates', 'Coordinates для SAM2'],
            ['115', 'Sam2Segmentation', 'Mask output'],
            ['144', 'GrowMask', '5 px, tapered = true'],
            ['146', 'MaskBlur+', '10, auto'],
            ['420', 'easy imageCropFromMask', 'Crop области человека'],
            ['500 → 499', 'MaskToImage → Separate Mask Components', 'Отдельные компоненты для inpaint'],
          ],
        },
      },
      {
        id: 'mask-quality',
        eyebrow: '03 · VISUAL QA',
        title: 'Что считается рабочей маской',
        bullets: [
          'Белый силуэт закрывает всю фигуру, включая ноги и мелкие предметы, которые должны остаться.',
          'Нет больших дыр внутри тела и случайных островков вдали от фигуры.',
          'Край не обрезает руки, ступни и головной убор.',
          'Grow 5 и blur 10 не создают заметный ореол на контрастном фоне.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Нет активного InvertMask',
            text: 'Отдельный explicit InvertMask node в этой ветке не найден.',
          },
          {
            status: 'not-confirmed',
            title: 'Скрытая инверсия',
            text: 'Внутреннее поведение third-party nodes нельзя установить только по workflow JSON.',
          },
        ],
      },
    ],
  },
  {
    index: 5,
    slug: 'preparation-color-match',
    navTitle: 'Preparation / Color Match',
    eyebrow: 'PREPARATION',
    title: 'Очистка фона и приведение к окружению',
    lede:
      'После crop фигура очищается Inspyrenet, получает маску, подгоняется по цвету к сцене и вырезается в готовый cutout.',
    status: 'confirmed',
    statusNote: 'Цепочка 420 → 422 / 475 → 477 → 449 видна в topology',
    visual: 'preparation',
    sections: [
      {
        id: 'cleanup',
        eyebrow: '01 · BACKGROUND REMOVAL',
        title: 'Node 422 создаёт person + alpha',
        paragraphs: [
          'easy imageRemBg 422 получает crop 781 от 420 и использует модель Inspyrenet. Сохранённый префикс — ph_ppl. Его image output идёт в 475, а mask — через MaskToImage 430 к Cut By Mask 449 и diagnostic consumers.',
        ],
        table: {
          columns: ['Node', 'Вход', 'Выход / назначение'],
          rows: [
            ['420', 'Main image + mask 146', 'Crop 781'],
            ['422', 'Crop 781', 'Очищенный person + mask'],
            ['430', 'Mask от 422', 'Mask image для 449 / previews'],
            ['475', 'Person от 422', 'Подготовка image для ColorMatch'],
          ],
        },
      },
      {
        id: 'color-match',
        eyebrow: '02 · COLOR MATCH',
        title: 'Node 477 согласует фигуру со сценой',
        paragraphs: [
          'ColorMatch 477 использует метод hm-mvgd-hm. В widget сохранено 0.6, но вход strength связан с control 717, где текущее значение 0.44. Reference environment поступает из node 779.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Effective strength',
            text: 'Linked control 717 = 0.44 управляет strength node 477; локальный widget 0.6 не следует читать как runtime value.',
          },
          {
            status: 'inferred',
            title: 'Практическая цель',
            text: 'Снизить ощущение “наклейки”: приблизить температуру, яркость и общий цвет фигуры к окружению.',
          },
        ],
      },
      {
        id: 'preparation-symptoms',
        eyebrow: '03 · SYMPTOMS',
        title: 'По изображению можно быстро понять, что сломано',
        table: {
          columns: ['Симптом', 'Вероятная зона', 'Проверить'],
          rows: [
            ['Светлый / тёмный ореол', 'Mask edge', '144 GrowMask, 146 MaskBlur, output 430'],
            ['Фигура “чужая” по тону', 'ColorMatch', 'Reference 779 и effective strength 717'],
            ['Часть старого фона осталась', 'RemBg', 'Crop 781 и outputs 422'],
            ['Фигура размыта до paste', 'Resize / crop', '420, 475, 449'],
          ],
        },
      },
    ],
  },
  {
    index: 6,
    slug: 'selector-logic',
    navTitle: 'Selector Logic',
    eyebrow: 'NODES 543 / 715',
    title: 'Widget value ≠ effective runtime value',
    lede:
      'Общий PPL selector 543 раздаёт один управляющий INT сразу нескольким image switches. Поэтому число внутри дочернего selector может быть лишь сохранённым widget, а не активным значением.',
    status: 'confirmed',
    statusNote: 'Control links и значения проверены по workflow topology',
    visual: 'selectors',
    sections: [
      {
        id: 'master-selector',
        eyebrow: '01 · NODE 543',
        title: 'Один control управляет четырьмя selectors',
        paragraphs: [
          'Node 543 называется SWITCH PPL: 1=FLUX / 2=INPUT и сейчас равен 1. Его output подключён к control input узлов 459, 522, 552 и 715.',
        ],
        table: {
          columns: ['Selector', 'Сохранённый widget', 'Linked control', 'Эффективно сейчас'],
          rows: [
            ['459 · PPL Switch', '1', '543 = 1', 'FLUX composite'],
            ['522 · People Input Switch', '1', '543 = 1', 'FLUX mask/inpaint source'],
            ['552 · People Input Switch', '1', '543 = 1', 'FLUX-generated input'],
            ['715 · Return / Downstream source selector', '2', '543 = 1', 'Выдаёт BASE #79, но 552 этот вход сейчас игнорирует'],
          ],
        },
      },
      {
        id: 'node-715',
        eyebrow: '02 · NODE 715',
        title: 'Почему “2” внутри 715 не означает режим 2',
        paragraphs: [
          '715 — CR Image Input Switch с title “People Input Switch 1=FLUX / 2=3D rendered”. Его image1 приходит от BASE IMAGE 79, image2 — от SDXL VAEDecode 14, а output подключён к image2 node 552. В widget сохранено 2, но control Input связан с node 543.',
          'При текущем 543 = 1 node 715 выдаёт #79, однако node 552 одновременно выбирает собственный image1 = PPL FLUX #829. Поэтому output 715 в текущий production path не проходит. В учебнике 715 сохранён как Return / Downstream Selector — функциональная метка вложенного downstream source selection, а не самостоятельный final composite.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Current effective control',
            text: '543 = 1 заставляет 715 выбрать BASE #79, но downstream 552 выбирает #829 и игнорирует output 715.',
          },
          {
            status: 'confirmed',
            title: 'Downstream',
            text: 'Output node 715 подключён к input node 552.',
          },
          {
            status: 'inferred',
            title: 'Nested-switch nuance',
            text: 'Ветка #79 → 715 → 552 недостижима при штатных 1/2: при 1 её игнорирует 552, при 2 сам 715 уже выбирает #14.',
          },
        ],
      },
      {
        id: 'mode-change',
        eyebrow: '03 · SAFE SWITCHING',
        title: 'Менять режим нужно на 543',
        bullets: [
          '1 — использовать FLUX-generated people branch.',
          '2 — использовать INPUT / 3D-rendered people branch.',
          'Не выравнивай вручную widgets 459/522/552/715, пока их control input связан с 543.',
          'После смены режима проверяй не только generation preview, но и output node 459.',
        ],
      },
    ],
  },
  {
    index: 7,
    slug: 'composite',
    navTitle: 'Composite',
    eyebrow: 'MERGE + RETURN',
    title: 'Два уровня композита и возврат в FLUX',
    lede:
      'Сначала подготовленный человек вставляется по маске в сцену. Затем отдельная inpaint/detail-ветка может обработать компоненты маски, после чего selector 459 выбирает PPL-result для main pipeline.',
    status: 'confirmed',
    statusNote: 'Cut, paste, inpaint и return links присутствуют в graph data',
    visual: 'composite',
    sections: [
      {
        id: 'first-composite',
        eyebrow: '01 · FIRST COMPOSITE',
        title: 'Cut 449 → Paste 429',
        paragraphs: [
          'ColorMatch 477 и mask 430 сходятся в Cut By Mask 449. Paste By Mask 429 вставляет cutout в reference / main image 779 с placement mask 451 и режимом keep_ratio_fit. Его output — node 672.',
        ],
        table: {
          columns: ['Node', 'Операция', 'Ключевой input / output'],
          rows: [
            ['449', 'Cut By Mask', '477 + 430 → cutout'],
            ['429', 'Paste By Mask', '451 + 449 + 779 → 672'],
            ['480', 'Image Comparer MASK / PPL', '451 vs выбранный PPL output 459'],
          ],
        },
      },
      {
        id: 'second-composite',
        eyebrow: '02 · INPAINT / DETAIL',
        title: 'Компоненты маски обрабатываются отдельно',
        paragraphs: [
          'Mask components 499/502 формируют регионы для cut 503/504. Inpaint conditioning 494, sampler 495 и decode 496 создают обработанный фрагмент. Combine Masks 510 и Paste By Mask 509 возвращают его в сцену.',
        ],
        table: {
          columns: ['Подцепь', 'Nodes', 'Результат'],
          rows: [
            ['Region split', '499 → 502', 'Отдельные mask regions'],
            ['Cut', '503 / 504', 'Person crop + local scene region'],
            ['Inpaint', '494 → 495 → 496', 'Обработанный latent / image'],
            ['Return paste', '510 → 509', 'Фрагмент возвращён в main image'],
          ],
        },
      },
      {
        id: 'main-return',
        eyebrow: '03 · MAIN RETURN',
        title: 'Где PPL снова становится частью общей сцены',
        paragraphs: [
          'Selector 459 выбирает PPL composite и отдаёт его в easy imageDetailTransfer 573. Blend приходит от control 720 = 0.09; локальный widget 573 хранит 1. Затем VAEEncode 67 запускает общий FLUX stage 57 → 53.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Route reaches final',
            text: '459 → 573 → 67 → 57 → 53 → active LQ save 730. Опциональная HQ-chain существует, но сохранена в bypass.',
          },
          {
            status: 'confirmed',
            title: 'Direct LQ evidence point',
            text: 'Decode 53 сохраняется node 730 до поздних overlay/output шагов.',
          },
          {
            status: 'not-confirmed',
            title: 'Visual survival',
            text: 'После включения HQ / overlay chain поздняя обработка может изменить людей; в текущем сохранённом состоянии эта цепочка bypassed.',
          },
        ],
      },
    ],
  },
  {
    index: 9,
    slug: 'diagnostics',
    navTitle: 'Diagnostics',
    eyebrow: 'FAILURE TRACE',
    title: 'Найти место, где люди пропадают',
    lede:
      'Диагностика идёт слева направо: не менять поздний composite, пока не доказано, что generation и mask уже работают.',
    status: 'inferred',
    statusNote: 'Порядок проверки выведен из подтверждённых preview / comparer nodes',
    visual: 'diagnostics',
    sections: [
      {
        id: 'probe-points',
        eyebrow: '01 · PROBES',
        title: 'Контрольные точки, которые уже есть в workflow',
        table: {
          columns: ['Что проверить', 'Node', 'Интерпретация'],
          rows: [
            ['Generated people', '409 ← 829', 'Если пусто — проблема до mask chain'],
            ['Florence result', '113 ← 550', 'Detection должен находить нужные объекты'],
            ['Cut / selected crop', '507 ← 503; 508 ← 522', 'Проверка source switch и crop'],
            ['Mask vs PPL', '480 ← 451 / 459', 'Сравнение placement mask и selected composite'],
            ['Inpaint vs source', '518 ← 509 / 552', 'Сравнение обработанного и выбранного входа'],
            ['Current final save', '730 ← 53', 'Активная точка результата сохранённой конфигурации'],
            ['Optional FLUX vs Upscale', '141 ← 53 / 833', 'Сейчас HQ / upscale chain сохранена в bypass'],
            ['Optional final preview', '15 ← 849', 'Проверять только после включения overlay chain'],
          ],
        },
      },
      {
        id: 'symptom-matrix',
        eyebrow: '02 · SYMPTOM MATRIX',
        title: 'Симптом → вероятная зона',
        table: {
          columns: ['Последний рабочий этап', 'Что сломано вероятнее', 'Следующий тест'],
          rows: [
            ['Нет людей в 409', 'Prompt / model / sampler', 'Проверить 408 → 831 → 828 → 829'],
            ['409 работает, mask плохая', '550 / 114 / 115 / 144 / 146', 'Упростить classes и проверить край'],
            ['Mask хорошая, cutout грязный', '420 / 422 / 430', 'Смотреть crop и RemBg outputs'],
            ['Composite есть, 459 не тот', '543 / linked selector inputs', 'Проверить effective value = 1'],
            ['730 содержит людей, после включения HQ-chain final 15 — нет', 'Upscale / overlay / поздний overwrite', 'Сравнить 141, 730 и 15'],
          ],
        },
      },
      {
        id: 'current-hypothesis',
        eyebrow: '03 · CURRENT CASE',
        title: 'Что известно о текущем кейсе',
        facts: [
          {
            status: 'confirmed',
            title: 'Topology',
            text: 'Ветка PPL доходит до final output; обрыва links после node 459 нет.',
          },
          {
            status: 'inferred',
            title: 'Вероятная зона',
            text: 'Если generation и mask визуально присутствуют, ищем positioning, composite, selector output или поздний overwrite.',
          },
          {
            status: 'not-confirmed',
            title: 'Точный failure node',
            text: 'Без актуального набора runtime previews нельзя честно назвать один виновный node.',
          },
        ],
      },
    ],
  },
  {
    index: 10,
    slug: 'checklist',
    navTitle: 'Checklist',
    eyebrow: 'PRE-FLIGHT',
    title: 'Проверка PEOPLE перед финальным render',
    lede:
      'Отмечай пункты по мере проверки. Прогресс сохраняется только в этом браузере и не меняет workflow.',
    status: 'inferred',
    statusNote: 'Практический порядок собран из подтверждённых контрольных точек',
    visual: 'checklist',
    sections: [
      {
        id: 'how-to-use',
        eyebrow: '01 · RULE',
        title: 'Один этап — одно доказательство',
        paragraphs: [
          'Не отмечай пункт “на глаз” по финальному кадру. Для каждого шага открой указанный preview / comparer и убедись, что именно его output соответствует ожидаемому результату.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Workflow remains read-only',
            text: 'Чек-лист работает внутри сайта и ничего не записывает в ComfyUI JSON.',
          },
          {
            status: 'inferred',
            title: 'Best practice',
            text: 'Сохраняй один seed на время диагностики, чтобы не путать routing-проблему с вариативностью generation.',
          },
        ],
      },
      {
        id: 'completion',
        eyebrow: '02 · DONE CRITERIA',
        title: 'Когда ветка действительно готова',
        bullets: [
          'Люди читаются в Preview 409.',
          'Mask закрывает фигуру и имеет чистый край.',
          'Cutout согласован со сценой по тону.',
          'Node 543 выбирает ожидаемый mode.',
          'Node 459 отдаёт composite с людьми.',
          'В текущей конфигурации Save 730 содержит людей; после включения HQ-chain дополнительно проверен final 15.',
        ],
      },
    ],
  },
  {
    index: 8,
    slug: 'output',
    navTitle: 'Output',
    eyebrow: 'SAVE / PREVIEW / COMPARE',
    title: 'Где искать текущий результат PEOPLE / PPL',
    lede:
      'Активный доказуемый output сохранённой конфигурации — FLUX decode 53, который записывает node 730. HQ / upscale и финальный overlay существуют, но сохранены в BYPASS.',
    status: 'confirmed',
    statusNote: 'Save nodes, prefixes, formats и bypass modes проверены по graph data',
    visual: 'output',
    sections: [
      {
        id: 'active-output',
        eyebrow: '01 · CURRENT WRITE PATH',
        title: 'Текущий активный файл: node 53 → node 730',
        paragraphs: [
          'После возврата PEOPLE composite в main pipeline цепочка заканчивается VAEDecode 53. Его image напрямую поступает в Image Save LQ 730; именно здесь нужно сначала проверять, сохранились ли люди в итоговом кадре.',
        ],
        table: {
          columns: ['Node', 'Роль', 'Подтверждённое значение'],
          rows: [
            ['53', 'VAEDecode после main FLUX stage', 'Активный upstream для save 730'],
            ['730', 'Image Save LQ', 'JPG · 72 dpi · quality 100'],
            ['Folder', 'Сериализованный subfolder', 'ph\\[time(%Y-%m-%d)]'],
            ['Prefix', 'Имя результата', 'ph01_archviz_sdxl2flux_LQ1'],
          ],
        },
        facts: [
          {
            status: 'confirmed',
            title: 'Primary inspection point',
            text: 'В сохранённом workflow node 730 — активная write-точка прямого результата node 53.',
          },
          {
            status: 'not-confirmed',
            title: 'Конкретный созданный файл',
            text: 'Workflow JSON не доказывает, что текущий запуск завершился и файл реально записан на диск.',
          },
        ],
      },
      {
        id: 'output-path',
        eyebrow: '02 · PATH',
        title: 'Как читать путь без подмены фактов',
        paragraphs: [
          'JSON хранит только относительную папку и prefix. Абсолютный корень зависит от той ComfyUI instance, которая реально запущена. Поэтому ниже разделены сериализованная часть и ожидаемое разрешение через стандартный output-каталог.',
        ],
        codeExamples: [
          {
            title: 'Путь, записанный в node 730',
            label: 'CONFIRMED · serialized values',
            code:
              'folder: ph\\[time(%Y-%m-%d)]\nprefix: ph01_archviz_sdxl2flux_LQ1\nformat: jpg',
          },
          {
            title: 'Ожидаемый полный шаблон',
            label: 'INFERRED · resolve against active ComfyUI root',
            code:
              '<ACTIVE_COMFYUI_ROOT>\\output\\ph\\<YYYY-MM-DD>\\ph01_archviz_sdxl2flux_LQ1_....jpg',
            note: 'Абсолютный корень намеренно не подставлен: его нужно сверить с активной ComfyUI instance.',
          },
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Stable serialized segment',
            text: 'ph\\[time(%Y-%m-%d)] + ph01_archviz_sdxl2flux_LQ1 присутствуют в node 730.',
          },
          {
            status: 'not-confirmed',
            title: 'Absolute filesystem root',
            text: 'В техническом архиве нет подтверждённого пути активного ComfyUI output root.',
          },
        ],
      },
      {
        id: 'optional-hq',
        eyebrow: '03 · OPTIONAL HQ',
        title: 'HQ и overlay — отдельный, сейчас отключённый маршрут',
        paragraphs: [
          'UltimateSDUpscale 833 и связанные sizing / overlay nodes 832–851 сохранены в mode 4 (BYPASS). Их save-точки документированы, но не являются текущим активным финалом.',
        ],
        table: {
          columns: ['Маршрут', 'Output', 'Статус сохранённого графа'],
          rows: [
            ['53 → 834 → 833 → 531', 'ph01_archviz_sdxl2flux_HQ · PNG · 300 dpi', 'BYPASS upstream'],
            ['53 → 833 → 848 → 849 → 293', 'ph01_archviz_sdxl2flux_LQ2 · JPG · 72 dpi', 'BYPASS overlay chain'],
            ['849 → 15', 'Preview FINAL IMAGE', 'Доступен после включения overlay chain'],
            ['53 / 833 → 141', 'Image Comparer FLUX / UPSCALE', 'Сравнивать после включения HQ'],
          ],
        },
        facts: [
          {
            status: 'confirmed',
            title: 'Saved mode',
            text: 'Nodes 833, 834 и overlay nodes 832–851 имеют mode 4 / BYPASS.',
          },
          {
            status: 'not-confirmed',
            title: 'Runtime HQ result',
            text: 'Наличие корректного HQ / overlay файла требует отдельного запуска с включённой цепочкой.',
          },
        ],
      },
      {
        id: 'output-comparers',
        eyebrow: '04 · VISUAL CONTROL',
        title: 'Какие preview и comparer читать перед сохранением',
        table: {
          columns: ['Node', 'Сравнивает / показывает', 'Когда нужен'],
          rows: [
            ['409', 'Raw PPL decode 829', 'Доказать, что люди сгенерированы'],
            ['480', 'MASK / PPL: 451 vs 459', 'Проверить placement и selected composite'],
            ['518', 'Inpaint composite 509 vs source 552', 'Проверить INPUT / 3D path'],
            ['72', 'SDXL / FLUX: 779 vs 53', 'Увидеть изменение main FLUX stage'],
            ['141', 'FLUX / UPSCALE: 53 vs 833', 'Только после включения HQ chain'],
            ['15', 'Preview FINAL IMAGE от 849', 'Только после включения overlay chain'],
          ],
        },
      },
      {
        id: 'output-proof',
        eyebrow: '05 · DONE CRITERIA',
        title: 'Когда output можно считать проверенным',
        bullets: [
          'Люди видны в 409 и соответствуют prompt 408.',
          'Comparer 480 показывает корректную маску и выбранный composite.',
          'Люди остаются после main FLUX decode 53.',
          'Файл с prefix LQ1 найден в папке текущей даты.',
          'Если HQ-chain включена вручную: отдельно проверены 141, 531, 293 и Preview 15.',
        ],
      },
    ],
  },
  {
    index: 11,
    slug: 'examples',
    navTitle: 'Examples',
    eyebrow: 'VISUAL EXAMPLES',
    title: 'React-атлас и практические сценарии',
    lede:
      'Три исходные инфографики разобраны на самостоятельные адаптивные React-блоки: общая логика, роли этапов, визуальные проверки и порядок диагностики.',
    status: 'inferred',
    statusNote: 'React-схемы объясняют подтверждённую topology, а примеры не заменяют runtime preview',
    visual: 'examples',
    sections: [
      {
        id: 'scenario-old-city',
        eyebrow: '01 · SCENARIO',
        title: 'Старый каменный город',
        paragraphs: [
          'Текущий prompt 408 согласован с этой сценой: несколько жителей, длинные бежевые одежды, небольшие и средние фигуры, тёплый вечерний свет.',
        ],
        codeExamples: [
          {
            title: 'Текущий prompt',
            label: 'CONFIRMED · node 408',
            code:
              'a few Middle Eastern townspeople wearing long beige robes and simple head coverings, naturally walking and standing in an old stone city square, realistic proportions, small and medium scale figures, candid documentary look, visually integrated into the scene, warm evening light',
          },
          {
            title: 'Вариант: музей / современная галерея',
            label: 'INFERRED · example',
            code:
              'a few museum visitors in understated neutral clothing, full body, small and medium scale, naturally walking and pausing near exhibits, candid documentary look, correct perspective, clean silhouettes, soft indoor ambient light',
          },
        ],
      },
      {
        id: 'how-to-read-images',
        eyebrow: '02 · IMAGE GUIDE',
        title: 'Что в React-реконструкции упрощено',
        facts: [
          {
            status: 'confirmed',
            title: '408 / 543 / 715',
            text: 'Назначения ключевых узлов сохранены без изменения.',
          },
          {
            status: 'inferred',
            title: 'Иконки и example images',
            text: 'Это наглядная модель процесса, а не screenshot реального execution каждого node.',
          },
          {
            status: 'not-confirmed',
            title: 'Конкретные люди на картинках',
            text: 'Примеры не доказывают результат текущего seed и текущей машины.',
          },
        ],
      },
    ],
  },
  {
    index: 12,
    slug: 'resources',
    navTitle: 'Resources',
    eyebrow: 'SOURCE FILES',
    title: 'Репозитории, схемы и исходные документы',
    lede:
      'Все ссылки ведут на upstream-проекты или на файлы, извлечённые из актуального технического архива.',
    status: 'confirmed',
    statusNote: 'Внешние URL проверены по официальным источникам 3 сентября 2026',
    visual: 'resources',
    sections: [
      {
        id: 'upstream',
        eyebrow: '01 · UPSTREAM',
        title: 'Проекты и документация',
        paragraphs: [
          'ComfyUI — базовая платформа. rgthree-comfy и ComfyUI-Logic релевантны только там, где используются их конкретные nodes. Graphviz нужен для подготовки схем и не исполняет PEOPLE branch.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'ComfyUI canonical repo',
            text: 'Старый адрес comfyanonymous/ComfyUI перенаправляется на Comfy-Org/ComfyUI.',
          },
          {
            status: 'confirmed',
            title: 'ComfyUI-Logic archive',
            text: 'Репозиторий theUpsider/ComfyUI-Logic архивирован 13 июня 2025 и помечен как unmaintained.',
          },
        ],
      },
      {
        id: 'downloads',
        eyebrow: '02 · DOWNLOADS',
        title: 'Техническая база workflow',
        paragraphs: [
          'ZIP содержит 22 файла: 14 глав Markdown, две CSV-таблицы, JSON-спецификацию, DOT и четыре SVG-карты. Workflow не модифицировался при подготовке документации.',
        ],
      },
      {
        id: 'provenance',
        eyebrow: '03 · PROVENANCE',
        title: 'Что считается актуальным',
        facts: [
          {
            status: 'confirmed',
            title: 'Only current source',
            text: 'Epspoziciya_archviz_ph_sdxlflux_v001.json.',
          },
          {
            status: 'confirmed',
            title: 'Historical reference only',
            text: 'BEST / RU2EN / FINAL_CLEAN и другие предыдущие Hansen-копии.',
          },
          {
            status: 'not-confirmed',
            title: 'Future drift',
            text: 'После изменения workflow учебник нужно пересобрать: сохранённые node IDs и links могут устареть.',
          },
        ],
      },
    ],
  },
] satisfies Chapter[]).sort((a, b) => a.index - b.index);

export const chapterBySlug = Object.fromEntries(
  manualChapters.map((chapter) => [chapter.slug, chapter]),
) as Record<string, Chapter>;

export const diagnosticChecklist = [
  { id: 'branch', label: 'PEOPLE / PPL branch активна и не bypassed', evidence: 'group / node modes' },
  { id: 'prompt', label: 'Node 408 содержит актуальный prompt', evidence: '408 → 823' },
  { id: 'generated', label: 'Люди видны после VAEDecode', evidence: 'Preview 409 ← 829' },
  { id: 'detected', label: 'Florence2 находит нужные фигуры', evidence: 'Preview 113 ← 550' },
  { id: 'mask', label: 'SAM2 mask чистая и закрывает фигуру', evidence: '115 → 144 → 146' },
  { id: 'cutout', label: 'RemBg / ColorMatch дают чистый cutout', evidence: '422 → 477 → 449' },
  { id: 'mode', label: 'Node 543 выбирает нужный source mode', evidence: '543 = 1 или 2' },
  { id: 'selector', label: 'Учтена nested-switch логика 715 → 552', evidence: 'links 1224 / 1228 / 983' },
  { id: 'composite', label: 'PPL composite виден после selector', evidence: 'Comparer 480 ← 459' },
  { id: 'flux', label: 'Люди остаются после main FLUX decode', evidence: '53 / Save 730' },
  { id: 'final', label: 'Люди видны в активном текущем output', evidence: 'Save 730 ← 53' },
];

export const upstreamResources = [
  {
    title: 'ComfyUI',
    href: 'https://github.com/Comfy-Org/ComfyUI',
    meta: 'Canonical repository',
    description: 'Базовый node-based runtime и интерфейс workflow.',
    warning: false,
  },
  {
    title: 'ComfyUI Docs · Workflows',
    href: 'https://docs.comfy.org/basic-concepts/workflow',
    meta: 'Official documentation',
    description: 'Nodes, links и модель визуального программирования.',
    warning: false,
  },
  {
    title: 'rgthree-comfy',
    href: 'https://github.com/rgthree/rgthree-comfy',
    meta: 'Upstream repository',
    description: 'Image Comparer, Seed, Fast Groups Bypasser и utility nodes.',
    warning: false,
  },
  {
    title: 'ComfyUI-Logic',
    href: 'https://github.com/theUpsider/ComfyUI-Logic',
    meta: 'Archived · unmaintained',
    description: 'Compare / If logic. Использовать с предупреждением о совместимости.',
    warning: true,
  },
  {
    title: 'Graphviz',
    href: 'https://graphviz.org/',
    meta: 'Official project',
    description: 'Рендеринг DOT-карт; инструмент документации, не часть runtime.',
    warning: false,
  },
  {
    title: 'Workflow JSON spec',
    href: 'https://docs.comfy.org/specs/workflow_json',
    meta: 'Official ComfyUI spec',
    description: 'Формат графа, node IDs, links и сериализованные values.',
    warning: false,
  },
  {
    title: 'Custom node troubleshooting',
    href: 'https://docs.comfy.org/troubleshooting/custom-node-issues',
    meta: 'Official ComfyUI guide',
    description: 'Порядок изоляции проблем с third-party nodes.',
    warning: false,
  },
  {
    title: 'Graphviz DOT language',
    href: 'https://graphviz.org/doc/info/lang.html',
    meta: 'Official reference',
    description: 'Синтаксис исходной карты HANSEN_MASTER_MAP.dot.',
    warning: false,
  },
];

export const downloadResources = [
  {
    title: 'Полный технический архив',
    href: '/resources/EPSPOZICIYA_HANSEN_TECHNICAL_MANUAL_SOURCE.zip',
    meta: 'ZIP · 22 files',
    description: 'Все Markdown, CSV, JSON, DOT и SVG из source package.',
  },
  {
    title: 'PEOPLE / PPL route',
    href: `${sourceRoot}/08_PEOPLE_PPL.md`,
    meta: 'Markdown',
    description: 'Полная цепочка generation → final с node IDs.',
  },
  {
    title: 'Masks & segmentation',
    href: `${sourceRoot}/09_MASKS_SEGMENTATION.md`,
    meta: 'Markdown',
    description: 'Florence2, SAM2, mask transforms и consumers.',
  },
  {
    title: 'Prompts & routing',
    href: `${sourceRoot}/04_PROMPTS.md`,
    meta: 'Markdown',
    description: 'Текущие prompt values и exact assembly.',
  },
  {
    title: 'Control panel',
    href: `${sourceRoot}/02_CONTROL_PANEL.md`,
    meta: 'Markdown',
    description: 'Все selectors, linked controls и текущие modes.',
  },
  {
    title: 'Detail conservation',
    href: `${sourceRoot}/10_DETAIL_CONSERVATION.md`,
    meta: 'Markdown',
    description: 'Возврат PPL через imageDetailTransfer 573.',
  },
  {
    title: 'Output comparers',
    href: `${sourceRoot}/13_OUTPUT_COMPARERS.md`,
    meta: 'Markdown',
    description: 'Preview, comparer, save и final output points.',
  },
  {
    title: 'PEOPLE route map',
    href: `${sourceRoot}/PEOPLE_PPL_ROUTE.svg`,
    meta: 'SVG',
    description: 'Изолированная Graphviz-карта ветки PEOPLE.',
  },
  {
    title: 'Control switches map',
    href: `${sourceRoot}/CONTROL_SWITCHES.svg`,
    meta: 'SVG',
    description: 'Визуальная карта 28 управляющих controls.',
  },
  {
    title: 'Workflow specification',
    href: `${sourceRoot}/HANSEN_WORKFLOW_SPEC.json`,
    meta: 'JSON',
    description: 'Machine-readable significant nodes, controls и routes.',
  },
  {
    title: 'All nodes reference',
    href: `${sourceRoot}/15_ALL_NODES_REFERENCE.csv`,
    meta: 'CSV',
    description: '252 nodes с upstream / downstream ссылками.',
  },
  {
    title: 'All controls reference',
    href: `${sourceRoot}/16_ALL_CONTROLS_REFERENCE.csv`,
    meta: 'CSV',
    description: '28 user-facing controls и их режимы.',
  },
];
