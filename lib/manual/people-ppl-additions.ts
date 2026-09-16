import type { Chapter } from '../manual-types';

export const peoplePplAdditions: Chapter[] = [
  {
    index: 0,
    slug: 'positioning',
    navTitle: 'Position, Scale & Coordinates',
    eyebrow: 'PEOPLE / PPL · SPATIAL CONTRACT',
    title: 'Где меняются размер, crop и coordinate space человека',
    lede:
      'Generation и mask могут быть корректными, но figure исчезнет или окажется не там, если source image, mask bounds и destination canvas расходятся между 829, 780, 420, 449 и 429.',
    status: 'confirmed',
    statusNote: 'Resize/crop/paste topology подтверждена; точная визуальная позиция требует runtime image',
    visual: 'positioning',
    category: 'people-ppl',
    stage: 'ppl-position',
    relatedNodes: [420, 429, 430, 449, 477, 552, 684, 685, 693, 780, 781, 782, 827, 829],
    relatedChapters: ['preparation-color-match', 'selector-logic', 'composite', 'diagnostics'],
    sections: [
      {
        id: 'spaces',
        eyebrow: '01 · COORDINATE SPACES',
        title: 'PPL latent, detection canvas и scene canvas — не один размер',
        table: {
          columns: ['Stage', 'Nodes', 'Stored / derived space', 'Risk'],
          rows: [
            ['PPL generation', '827 → 828 → 829', '1312 × 1920, batch 1', 'Figure framing differs from scene'],
            ['Detection input', '552 → 780', 'Resize to 1920 × 1920', 'Aspect ratio / padding changes'],
            ['Mask crop', '146 + 780 → 420 → 781', 'Bounds from people mask', 'Loose/tight crop or empty region'],
            ['Prepared cutout', '422 → 477 → 449', 'Cropped person + alpha', 'Image/mask mismatch'],
            ['First paste', '779 + 449 + 451 → 429', 'Selected SDXL scene canvas', 'Scale/location outside frame'],
            ['Alternative return', '509 → 684 → 782 → 685', 'Restored original/resized canvas', 'Wrong mode 693'],
            ['Runtime mask test', 'Florence2 → BBOX → SAM2', 'Same 1280 × 720 source at both stages', 'Different images reproduce displaced/false masks'],
          ],
        },
      },
      {
        id: 'first-composite',
        eyebrow: '02 · FIRST PASTE',
        title: 'Node 429 связывает base scene, prepared cutout и position source',
        paragraphs: [
          'Paste By Mask 429 получает base image от Image Filter 779, prepared person 449 и image/mask representation 451. Stored mode keep_ratio_fit влияет на масштабирование вставки.',
          'Output 429 проходит Images to RGB 672 и поступает в image1 selector 459 для PPL mode 1.',
        ],
        facts: [
          { status: 'confirmed', title: 'Topology', text: '429 → 672 → image1 of 459.' },
          { status: 'not-confirmed', title: 'Exact placement', text: 'Координаты и видимость фигуры нельзя доказать без runtime preview 480/459.' },
        ],
      },
      {
        id: 'position-checklist',
        eyebrow: '03 · QA ORDER',
        title: 'Проверка positioning до поиска ошибки downstream',
        bullets: [
          'До выбора BBOX доказать, что Florence2 и SAM2 получают один и тот же image одинакового размера.',
          'Сравнить actual dimensions image 829 и resized image 780.',
          'Проверить, что 146 содержит foreground и правильную polarity.',
          'Проверить bounds/crop 420→781: человек полностью внутри области.',
          'Проверить alpha от 422/430 и совпадение с RGB 477/449.',
          'Проверить first composite 429/672 до selector 459.',
          'Проверить mode 693, если используется alternative return 685.',
        ],
      },
      {
        id: 'quality',
        eyebrow: '04 · INTEGRATION QA',
        title: 'Технически прошедший signal ещё не означает убедительную вставку',
        facts: [
          { status: 'inferred', title: 'Perspective', text: 'Рост и масштаб фигуры должны соответствовать горизонту и архитектурным опорным размерам.' },
          { status: 'inferred', title: 'Grounding', text: 'Проверять контакт ступней с поверхностью, contact shadow и отсутствие floating.' },
          { status: 'inferred', title: 'Light / occlusion', text: 'Направление света, контраст и перекрытия должны совпадать с окружением.' },
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'ppl-workflow-02-replace-existing',
    navTitle: 'PPL Workflow 02 · Replace Existing People',
    eyebrow: 'PEOPLE / PPL · WORKFLOW 02',
    title: 'Улучшение и замена уже размещённых людей через Florence2 + SAM2 + FLUX',
    lede:
      'Этот режим не решает, где поставить человека. Положение, масштаб, перспектива и приблизительная поза уже заданы исходной 3D/SDXL сценой; AI локально выделяет существующую фигуру, перегенерирует её и возвращает в тот же spatial slot.',
    status: 'confirmed',
    statusNote:
      'Последовательность detection → segmentation → local generation → cutout/color match → paste подтверждена просмотром showcase; точные node IDs этой ветки ещё требуют отдельной сверки с source JSON.',
    visual: 'composite',
    category: 'people-ppl',
    stage: 'ppl-replace-existing',
    relatedChapters: ['positioning', 'preparation-color-match', 'composite', 'ppl-mode-2-inpaint', 'diagnostics'],
    sections: [
      {
        id: 'role',
        eyebrow: '01 · ROLE',
        title: '3D отвечает за placement, AI — за quality',
        paragraphs: [
          'В исходном кадре человек уже существует как spatial anchor: его положение, высота, масштаб, перспектива и приблизительная поза заданы до генерации. Это может быть 3D proxy, библиотечный персонаж, cutout или уже присутствующий человек в базовом изображении.',
          'AI не перестраивает композицию сцены и не выбирает новую точку для персонажа. Его задача — улучшить или заменить локальную фигуру, сохранив архитектурный контекст вокруг неё.',
        ],
        facts: [
          { status: 'confirmed', title: 'Placement contract', text: 'В showcase люди присутствуют в base image до PPL replacement pass.' },
          { status: 'inferred', title: 'Archviz principle', text: 'Для production это разделяет ответственность: 3D фиксирует spatial truth, генератор отвечает за visual realism.' },
        ],
      },
      {
        id: 'route',
        eyebrow: '02 · ROUTE',
        title: 'Полный маршрут Variant 2',
        codeExamples: [
          {
            title: 'Node flow',
            label: 'PPL WORKFLOW 02',
            code:
              'Base render with existing person\n→ Florence2 detection / grounding\n→ BBOX / coordinates\n→ SAM2 segmentation\n→ Person mask\n→ Crop by mask / region\n→ Resize local crop\n→ FLUX local regeneration\n→ Remove Background / Cut By Mask\n→ Color Match\n→ Paste By Mask\n→ Optional local detail / inpaint\n→ Final scene',
            note: 'Главная идея: regenerate locally, composite globally.',
          },
        ],
      },
      {
        id: 'detection-segmentation',
        eyebrow: '03 · DETECTION + SEGMENTATION',
        title: 'Florence2 находит человека, SAM2 строит точную маску',
        paragraphs: [
          'Florence2 выполняет semantic detection / phrase grounding и возвращает область человека в виде bbox или координат. На этом этапе модель отвечает на вопрос «где находится человек?».',
          'SAM2 получает spatial cue от Florence2 и строит pixel-level mask. На этом этапе задача уже не распознать класс, а аккуратно отделить фигуру от архитектуры и окружения.',
        ],
        table: {
          columns: ['Stage', 'Input', 'Output', 'QA'],
          rows: [
            ['Florence2', 'Base image + person/people prompt', 'BBOX / coordinates', 'BBox должен покрывать нужную фигуру, а не весь кадр'],
            ['SAM2', 'Same image + Florence spatial cue', 'Person mask', 'Контур головы, рук, ног и аксессуаров без захвата фасада'],
          ],
        },
        bullets: [
          'Florence2 и SAM2 должны получать один и тот же source image и одинаковое coordinate space.',
          'Не продолжать downstream, если bbox или mask уже неверны.',
          'Batch-size image и количество bbox должны совпадать; иначе Sam2Segmentation может упасть на индексировании.',
        ],
      },
      {
        id: 'local-generation',
        eyebrow: '04 · LOCAL FLUX REGENERATION',
        title: 'Генератор работает на crop, а не на всём архитектурном кадре',
        paragraphs: [
          'По маске или bbox вырезается локальная область вокруг человека. Crop приводится к рабочему размеру и передаётся в отдельную FLUX-ветку.',
          'Так архитектура за пределами crop не участвует в генерации: модель может улучшить лицо, одежду, материал, волосы и photographic response, не получая свободу перестроить фасад или камеру.',
        ],
        facts: [
          { status: 'confirmed', title: 'Local scope', text: 'Showcase использует отдельную PPL FLUX Generate секцию между segmentation и composite.' },
          { status: 'inferred', title: 'Production value', text: 'Локальный crop уменьшает область риска и повышает повторяемость по сравнению с full-frame img2img.' },
        ],
      },
      {
        id: 'cutout-color-match',
        eyebrow: '05 · PREPARE CUTOUT',
        title: 'Generated person превращается в compositing element',
        paragraphs: [
          'После generation результат отделяется от локального фона: workflow использует операции класса Remove Background / Cut By Mask. На выходе нужна RGB-фигура с корректной alpha/mask representation.',
          'Перед возвратом в сцену выполняется Color Match, чтобы человек не выглядел вклеенным из другого освещения или камеры.',
        ],
        table: {
          columns: ['Operation', 'Purpose', 'Typical failure'],
          rows: [
            ['Remove Background / Cut By Mask', 'Отделить generated person от crop background', 'Halo, потерянные конечности, остатки старого фона'],
            ['Color Match', 'Подогнать tone / contrast / temperature под base render', 'Кожа и одежда выглядят из другой фотографии'],
            ['Mask cleanup', 'Стабилизировать contour перед paste', 'Жёсткий край, грязный alpha, floating silhouette'],
          ],
        },
      },
      {
        id: 'composite',
        eyebrow: '06 · COMPOSITE',
        title: 'Paste By Mask возвращает фигуру в исходный spatial slot',
        paragraphs: [
          'Prepared cutout вставляется обратно в base scene по маске и positioning data. Цель — заменить visual appearance человека, не менять утверждённую композицию.',
          'После paste обязательна проверка масштаба, положения ступней, контакта с поверхностью, occlusion и совпадения света.',
        ],
        bullets: [
          'Сначала проверить paste до любых downstream selectors или upscale.',
          'Сравнить силуэт generated person с исходным proxy: смещение центра или масштаба считается ошибкой.',
          'Не использовать Color Match как замену правильному lighting prompt: он корректирует integration, но не исправляет физически неверный свет.',
        ],
      },
      {
        id: 'detail-pass',
        eyebrow: '07 · OPTIONAL DETAIL / INPAINT',
        title: 'Последний локальный pass исправляет интеграцию, а не создаёт новую сцену',
        paragraphs: [
          'После composite отдельный detail/inpaint pass может исправить руки, волосы, край одежды, контакт ступней, небольшие пересечения и локальную тень.',
          'Этот этап должен оставаться локальным: если маска расширяется на значительную часть архитектуры, workflow теряет главное преимущество controlled replacement.',
        ],
      },
      {
        id: 'use-cases',
        eyebrow: '08 · WHERE TO USE',
        title: 'Где Variant 2 особенно полезен',
        bullets: [
          'Hero people на переднем и среднем плане.',
          'Велосипедисты и персонажи с заданной позой.',
          'Люди у входной группы, витрины или фасада.',
          'Посетители выставки и общественных пространств, где placement согласован сценой.',
          'Замена библиотечного 3D-персонажа без изменения camera / architecture.',
        ],
        facts: [
          { status: 'confirmed', title: 'Not crowd placement', text: 'Variant 2 не является алгоритмом автоматического размещения новых людей в пустой сцене.' },
          { status: 'not-confirmed', title: 'Variant 1', text: 'Отдельный workflow генерации новых людей по маске будет документирован после следующего таймкода и не должен смешиваться с Variant 2.' },
        ],
      },
      {
        id: 'checklist',
        eyebrow: '09 · PRODUCTION CHECKLIST',
        title: 'Проверка Variant 2 перед финалом',
        bullets: [
          'Исходный человек находится в правильном месте и масштабе до AI-pass.',
          'Florence2 bbox покрывает только нужного персонажа.',
          'SAM2 mask чистая и не захватывает архитектуру.',
          'Crop содержит фигуру целиком и достаточный контекст для генерации.',
          'FLUX не меняет предполагаемую spatial role персонажа.',
          'Background удалён без halo и дыр в конечностях.',
          'Color Match согласует человека с общей экспозицией кадра.',
          'Paste сохраняет исходный scale / position.',
          'Ступни, contact shadow и occlusion выглядят физически правдоподобно.',
          'Финальный локальный inpaint не затрагивает архитектурную геометрию.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'ppl-mode-2-inpaint',
    navTitle: 'PPL Mode 2 / 3D Inpaint',
    eyebrow: 'PEOPLE / PPL · ALTERNATIVE',
    title: 'Полный маршрут component inpaint и возврата в selector 459',
    lede:
      'При 543=2 selectors выбирают альтернативные источники. Mask разбивается на components, regions проходят отдельный FLUX inpaint, результат вставляется обратно и масштабируется к scene canvas.',
    status: 'confirmed',
    statusNote: 'Internal topology подтверждена; происхождение “3D rendered” source не доказано отдельным LoadImage',
    visual: 'inpaint',
    category: 'people-ppl',
    stage: 'ppl-alternative',
    relatedNodes: [58, 61, 64, 138, 146, 459, 494, 495, 496, 497, 498, 499, 500, 502, 503, 504, 505, 506, 507, 508, 509, 510, 516, 518, 522, 524, 543, 552, 684, 685, 715, 771, 782],
    relatedChapters: ['selector-logic', 'positioning', 'composite', 'main-flux'],
    sections: [
      {
        id: 'mode-truth',
        eyebrow: '01 · MODE 2 ENTRY',
        title: 'Node 543 переключает четыре selectors одним linked value',
        table: {
          columns: ['Selector', 'Input selected when 543=2', 'Purpose'],
          rows: [
            ['715', 'image2 according to linked Input; stored widget 2 is no longer special', 'Return / Downstream source before 552'],
            ['552', 'image2 from 715', 'Source image for resize 780 and crop 503'],
            ['522', 'image2 mask/image from 524', 'Alternative mask preview 508'],
            ['459', 'image2 from 685', 'Alternative composite returned to main graph'],
          ],
        },
        facts: [
          { status: 'confirmed', title: 'Shared control', text: '543 connects to Input sockets of 459, 522, 552 and 715.' },
          { status: 'not-confirmed', title: '3D input contract', text: 'Significant inputs do not contain a dedicated LoadImage node explicitly named as 3D person render.' },
        ],
      },
      {
        id: 'component-preparation',
        eyebrow: '02 · COMPONENTS + REGIONS',
        title: 'Mask 146 превращается в independent regions',
        table: {
          columns: ['Node', 'Role', 'Downstream'],
          rows: [
            ['500', 'MaskToImage from blurred PEOPLE mask 146', '499'],
            ['499', 'Separate Mask Components', '502, 503, 504, 509'],
            ['502', 'Mask To Region; padding/ratio/512 target settings', '503, 504, 509'],
            ['503', 'Cut selected source 552 by component region', '506, preview 507'],
            ['504', 'Cut mask/component representation', '505, 510, selector 522'],
            ['505 / 506', 'ImageToMask / RGB channel normalization', 'Inpaint conditioning 494'],
          ],
        },
      },
      {
        id: 'inpaint-sampler',
        eyebrow: '03 · FLUX INPAINT',
        title: 'Local crop использует общий FLUX model, noise, sampler и shared steps',
        table: {
          columns: ['Node', 'Input / setting', 'Result'],
          rows: [
            ['516', 'Prompt “a photo”', 'Positive conditioning for 494'],
            ['138', 'Empty FLUX negative encoder', 'Negative input for 494'],
            ['494', 'InpaintModelConditioning true', 'Conditioning + latent for sampler'],
            ['497', 'BasicGuider with model 64 / conditioning 494', 'Guider'],
            ['498', 'beta · shared steps 771=24 · denoise 0.35', 'Sigmas'],
            ['61 / 58', 'Shared noise / Euler sampler', 'Sampler 495'],
            ['495 → 496', 'SamplerCustomAdvanced → VAE Decode 54', 'Local inpainted crop'],
          ],
        },
      },
      {
        id: 'return',
        eyebrow: '04 · RETURN',
        title: 'Inpainted crop возвращается в canvas и selector 459',
        paragraphs: [
          'Decode 496 и component representation 504 объединяются node 510. Paste By Mask 509 вставляет local result в base image 779. Images to RGB 684 и resize 782 приводят результат к canvas, selector 685 учитывает control 693, затем image2 поступает в 459.',
        ],
        table: {
          columns: ['Probe', 'What to verify'],
          rows: [
            ['507', 'Source crop sent into inpaint'],
            ['508', 'Mask/image selected by 522'],
            ['518', '509 result compared with selected source 552'],
            ['480', 'Final selector 459 compared with scene mask/image 451'],
          ],
        },
      },
    ],
  },
];
