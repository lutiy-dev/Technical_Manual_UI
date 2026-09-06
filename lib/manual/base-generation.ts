import type { Chapter } from '../manual-types';

export const baseGenerationChapters: Chapter[] = [
  {
    index: 0,
    slug: 'global-prompts',
    navTitle: 'Global Prompts',
    eyebrow: 'TEXT ARCHITECTURE',
    title: 'Как global strings питают SDXL, FLUX и PEOPLE/PPL',
    lede:
      'Основной prompt не хранится в одном поле. OBJECT, ENVIRONMENT, LIGHT/STYLE и ADDITIONAL собираются nodes 895–897 и повторно используются несколькими стадиями.',
    status: 'confirmed',
    statusNote: 'String links и conditioning consumers подтверждены topology',
    visual: 'prompts-global',
    category: 'base-generation',
    stage: 'conditioning',
    relatedNodes: [5, 6, 52, 138, 157, 158, 408, 453, 591, 797, 799, 800, 801, 802, 803, 811, 813, 814, 820, 823, 824, 831, 895, 896, 897],
    relatedChapters: ['node-408-prompt', 'sdxl', 'main-flux', 'detail-conservation'],
    sections: [
      {
        id: 'positive-assembly',
        eyebrow: '01 · POSITIVE',
        title: 'Четыре смысловых блока превращаются в одну global строку',
        table: {
          columns: ['Node', 'Block', 'Assembly / consumers'],
          rows: [
            ['797', 'OBJECT', '797 + 799 → 895'],
            ['799', 'ENVIRONMENT', '895; также PPL assembly 824'],
            ['800', 'LIGHT / STYLE', '800 + 801 → 896; также PPL assembly 820'],
            ['801', 'ADDITIONAL', '896'],
            ['895 + 896', 'Partial strings', '→ 897 с comma separator'],
            ['897', 'GLOBAL positive string', 'SDXL encoder 5, display 804, FLUX encoder 811'],
          ],
        },
        facts: [
          { status: 'confirmed', title: 'Shared dependency', text: 'Изменение 799 или 800 влияет не на одну стадию: эти nodes участвуют и в global, и в PPL prompt.' },
          { status: 'inferred', title: 'Editing rule', text: 'OBJECT отвечает за сцену; ENVIRONMENT — за контекст; LIGHT/STYLE — за визуальный режим; ADDITIONAL — за локальные ограничения.' },
        ],
      },
      {
        id: 'negative-assembly',
        eyebrow: '02 · SDXL NEGATIVE',
        title: 'Detail-mask text входит в SDXL negative conditioning',
        paragraphs: [
          'Node 591 описывает архитектурные элементы для создания detail mask. Одновременно он соединяется с IMAGE-SPECIFIC negative 802 через 813. Затем GLOBAL negative 803 добавляется в 814, который питает encoder 6.',
        ],
        table: {
          columns: ['Route', 'Result'],
          rows: [
            ['591 + 802 → 813', 'Detail terms + image-specific exclusions'],
            ['803 + 813 → 814', 'Final SDXL negative string'],
            ['814 → 6 → 418', 'Negative conditioning после ControlNet stack'],
          ],
        },
      },
      {
        id: 'florence-route',
        eyebrow: '03 · ALTERNATIVE FLUX PROMPT',
        title: 'Node 453 выбирает GLOBAL encoder или Florence2 caption',
        paragraphs: [
          'Image Filter 779 отправляет изображение в Florence2Run 157. Caption отображается через 158 и поступает в encoder 52. Selector 453 выбирает 811 либо 52; текущий value 1 выбирает GLOBAL 811.',
        ],
        facts: [
          { status: 'confirmed', title: 'Current selection', text: '453 = 1, поэтому main FLUX получает conditioning 811.' },
          { status: 'not-confirmed', title: 'Caption quality', text: 'Сохранённый текст 158 не доказывает качество caption для следующего запуска.' },
        ],
      },
      {
        id: 'ppl-context',
        eyebrow: '04 · PEOPLE CONTEXT',
        title: 'Node 408 — специализированный бриф внутри общей системы',
        paragraphs: [
          'PPL assembly использует prefix 825, PEOPLE text 408 и ENVIRONMENT 799 через 823/824. Node 820 добавляет LIGHT/STYLE 800 и framing instruction 822. Encoder 831 и FluxGuidance 830 готовят отдельное PPL conditioning.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'sdxl',
    navTitle: 'Main SDXL Stage',
    eyebrow: 'BASE GENERATION',
    title: 'Основной SDXL-проход создаёт сцену до PEOPLE/PPL',
    lede:
      'SDXL stage объединяет RealVisXL, optional IPAdapter, positive/negative conditioning, два ControlNet и mode-dependent latent/denoise logic.',
    status: 'confirmed',
    statusNote: 'Loader filenames, selectors, sampler controls и links присутствуют в derived specification',
    visual: 'sdxl',
    category: 'base-generation',
    stage: 'sdxl',
    relatedNodes: [1, 2, 3, 5, 6, 7, 14, 86, 87, 168, 230, 231, 417, 418, 419, 535, 536, 541, 600, 602, 607, 608, 609],
    relatedChapters: ['global-prompts', 'controlnet', 'ipadapter-lora', 'detail-conservation'],
    sections: [
      {
        id: 'model-conditioning',
        eyebrow: '01 · MODEL + CONDITIONING',
        title: 'RealVisXL получает LoRA/IPAdapter selection до encoder 5',
        table: {
          columns: ['Node', 'Role', 'Current value / route'],
          rows: [
            ['2', 'CheckpointLoaderSimple', 'RealVisXL_V4.0.safetensors'],
            ['86', 'CLIPSetLastLayer', '-1'],
            ['87', 'LoRA stack', 'Все четыре slots = None'],
            ['7 / 168', 'IPAdapterAdvanced / model switch', '168=1 выбирает plain SDXL'],
            ['5', 'Positive encoder', 'String 897 + model CLIP path'],
            ['6', 'Negative encoder', 'String 814'],
            ['417→419→418', 'Depth + Canny stack', 'Применяется к 5/6'],
          ],
        },
      },
      {
        id: 'latent-modes',
        eyebrow: '02 · GENERATION MODES',
        title: 'Node 541 синхронно меняет latent source, base image и denoise',
        table: {
          columns: ['Mode', 'Latent', 'Denoise', 'Use'],
          rows: [
            ['541 = 1 · current', 'EmptyLatent 3; W/H from 783; batch 4', '607 = 1.0 через 600', 'TXT+CNET2IMG'],
            ['541 = 2', 'Selected image 592 → VAEEncode 536', '608 = 0.3 через 600', 'IMG+CNET2IMG'],
          ],
        },
        paragraphs: [
          'Compare 602 проверяет 609 против 541. If node 600 выбирает 1.0 или пользовательский img2img denoise 0.3. Stored widgets внутри 535/592 подчиняются linked control.',
        ],
      },
      {
        id: 'sampling',
        eyebrow: '03 · SAMPLING',
        title: 'KSampler 1 получает параметры не из собственных видимых widgets',
        table: {
          columns: ['Source', 'Value', 'Destination'],
          rows: [
            ['230', '28 steps · CFG 3.4 · dpmpp_3m_sde_gpu · karras', 'KSampler 1'],
            ['231', 'Global seed + randomize policy', 'KSampler 1 and FLUX noise 61'],
            ['418', 'Positive + negative after ControlNet', 'KSampler 1'],
            ['535', 'Mode-selected latent', 'KSampler 1'],
            ['600', '1.0 or 0.3', 'denoise of KSampler 1'],
            ['1 → 14', 'Sampled latent → checkpoint VAE decode', 'Detail stage 565'],
          ],
        },
      },
      {
        id: 'verification',
        eyebrow: '04 · CHECKPOINT',
        title: 'Первый общий визуальный checkpoint находится после 565/779',
        facts: [
          { status: 'confirmed', title: 'Topology', text: 'Decode 14 feeds detail transfer 565; its output reaches Image Filter 779 and comparer 71.' },
          { status: 'not-confirmed', title: 'Generated pixels', text: 'JSON не хранит фактический batch output, memory usage или runtime errors.' },
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'controlnet',
    navTitle: 'ControlNet & Preprocessors',
    eyebrow: 'DEPTH · CANNY',
    title: 'Источник карт выбирается один раз, stack применяется последовательно',
    lede:
      'Control 456 одновременно управляет Depth switch 542 и Canny switch 732. Реальная topology Canny отличается от формулировки старого Markdown и поэтому сопровождается errata.',
    status: 'confirmed',
    statusNote: 'Routes ниже проверены по node input links HANSEN_WORKFLOW_SPEC.json',
    visual: 'controlnet',
    category: 'base-generation',
    stage: 'controlnet',
    relatedNodes: [21, 23, 25, 38, 39, 79, 165, 167, 417, 418, 419, 456, 542, 722, 723, 732, 784, 785],
    relatedChapters: ['inputs', 'control-panel', 'sdxl', 'resources'],
    sections: [
      {
        id: 'depth',
        eyebrow: '01 · DEPTH',
        title: 'Node 542 выбирает external depth или DepthAnythingV2',
        table: {
          columns: ['Mode', 'Route', 'Preview / model'],
          rows: [
            ['456 = 1 · current', '25 V_1_d.jpg → resize 784 → image1 of 542', 'ControlNet model 21'],
            ['456 = 2', '79 BASE → DepthAnythingV2 38 → image2 of 542', 'Preview 39 · model 21'],
            ['After selection', '542 → stack 417', 'strength 723 = 0.36 · start 0 · end 1'],
          ],
        },
      },
      {
        id: 'canny',
        eyebrow: '02 · CANNY',
        title: 'Canny input 1 приходит от BASE IMAGE, а не от node 25',
        table: {
          columns: ['Mode', 'Route', 'Preview / model'],
          rows: [
            ['456 = 1 · current', '79 BASE → resize 785 → image1 of 732', 'ControlNet model 23'],
            ['456 = 2', '79 BASE → Edge Filter 165 → image2 of 732', 'Preview 167 · model 23'],
            ['After selection', '732 → stack 419', 'strength 722 = 0.31 · start 0 · end 1'],
          ],
        },
        facts: [
          { status: 'confirmed', title: 'Derived topology', text: 'Input links of 732 are 785 and 165; node 25 does not connect to 732.' },
          { status: 'not-confirmed', title: 'Old wording', text: '06_CONTROLNET.md называл node 25 внешним Canny source. До raw JSON это утверждение считается ошибочным/неподтверждённым.' },
        ],
      },
      {
        id: 'stack-order',
        eyebrow: '03 · APPLY ORDER',
        title: 'Depth 417 передаёт stack в Canny 419, затем 418 применяет его к обоим conditioning',
        paragraphs: [
          'Порядок stack подтверждён links: 417 → 419 → 418. Apply ControlNet Stack 418 получает positive 5, negative 6 и готовый stack 419, затем дважды питает KSampler 1.',
        ],
      },
      {
        id: 'preflight',
        eyebrow: '04 · QA',
        title: 'Карту нужно проверять до SDXL sampling',
        bullets: [
          'Для generated depth сначала открыть preview 39.',
          'Для generated edge сначала открыть preview 167.',
          'Проверить effective value control 456 на обоих switches.',
          'Проверить, что resize 784/785 не искажает aspect ratio относительно BASE.',
          'Только после этого анализировать sampler 1.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'ipadapter-lora',
    navTitle: 'IPAdapter & LoRA',
    eyebrow: 'OPTIONAL STYLE PATH',
    title: 'References, CLIP Vision, adapter weight и model selection',
    lede:
      'IPAdapter и LoRA полностью присутствуют в topology, но текущий saved profile выбирает plain SDXL, нулевой adapter weight и пустые LoRA slots.',
    status: 'confirmed',
    statusNote: 'Ветка доказана links; её отсутствие в текущем sampling доказано values 168=1 и 721=0',
    visual: 'ipadapter',
    category: 'base-generation',
    stage: 'sdxl-optional',
    relatedNodes: [7, 9, 12, 13, 41, 42, 86, 87, 168, 630, 721, 793],
    relatedChapters: ['inputs', 'models-dependencies', 'sdxl'],
    sections: [
      {
        id: 'reference-route',
        eyebrow: '01 · IMAGE REFERENCES',
        title: 'Node 630 выбирает первую reference или batch из двух',
        table: {
          columns: ['Mode', 'Source', 'Next'],
          rows: [
            ['630 = 1 · current', 'Node 42', 'Prep 9'],
            ['630 = 2', '42 + 41 → BatchImages 793', 'Prep 9'],
            ['Prep 9', 'LANCZOS · center · padding 0', 'IPAdapterAdvanced 7'],
          ],
        },
      },
      {
        id: 'adapter',
        eyebrow: '02 · MODEL PATCH',
        title: 'Node 7 создаёт optional SDXL model variant',
        table: {
          columns: ['Input / setting', 'Stored value'],
          rows: [
            ['CLIP Vision 12', 'CLIP-ViT-H-14-laion2B-s32B-b79K.safetensors'],
            ['IPAdapter model 13', 'ip-adapter-plus_sdxl_vit-h.safetensors'],
            ['Weight 721', '0'],
            ['Mode', 'style transfer'],
            ['Embeds', 'concat'],
            ['Range', 'start 0 · end 1'],
            ['Channels', 'V only'],
          ],
        },
      },
      {
        id: 'current-effect',
        eyebrow: '03 · CURRENT EFFECT',
        title: 'Ветка selected away и одновременно имеет weight 0',
        facts: [
          { status: 'confirmed', title: 'Model selector', text: '168=1 выбирает checkpoint model 2, а не output IPAdapterAdvanced 7.' },
          { status: 'confirmed', title: 'LoRA stack', text: 'Node 87 хранит None во всех четырёх slots.' },
          { status: 'not-confirmed', title: 'Visual style transfer', text: 'Reference image и adapter не могут считаться влияющими на текущий render.' },
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'segmentation-masks',
    navTitle: 'General Segmentation & Masks',
    eyebrow: 'MASK SYSTEMS',
    title: 'PEOPLE, architectural detail, automatic SAM2 и RGB atlas',
    lede:
      'Полный граф содержит несколько независимых mask systems. Их нельзя объединять в одну абстрактную “маску”: у каждой свой source, coordinate space и downstream consumer.',
    status: 'confirmed',
    statusNote: 'Четыре mask systems разделены по topology и formal groups',
    visual: 'masks-global',
    category: 'base-generation',
    stage: 'segmentation',
    relatedNodes: [107, 112, 114, 115, 144, 146, 232, 233, 234, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 550, 580, 583, 584, 585, 591],
    relatedChapters: ['segmentation-mask', 'detail-conservation', 'positioning'],
    sections: [
      {
        id: 'mask-families',
        eyebrow: '01 · FOUR SYSTEMS',
        title: 'Источник и назначение каждой mask family',
        table: {
          columns: ['Family', 'Route', 'Purpose', 'Main consumers'],
          rows: [
            ['PEOPLE', '550 → 114 → 115 → 144 → 146', 'Выделить person/human/face/hands/feet/accessories', '420, 500'],
            ['Architectural detail', '591 → 580 → 584 → 585', 'Выделить building/facade/detail', '583, 775'],
            ['Automatic SAM2', '234 + 779 → 232 → 233', 'Automask diagnostic', 'Preview 233'],
            ['RGB/CMY/B/W atlas', '338 → 337 → 339/346/347/348/349/350/352/354', 'Разложить color-coded mask image', 'Previews 340–353'],
          ],
        },
      },
      {
        id: 'people-mask',
        eyebrow: '02 · PEOPLE',
        title: 'Florence2 coordinates управляют SAM2 single-image model',
        paragraphs: [
          'Florence2Run 550 получает resized source 780 и модель 112. Coordinates 114 поступают в SAM2 115 вместе с single-image model 107. GrowMask 144 расширяет область на 5 px, MaskBlur+ 146 создаёт мягкий край 10/auto.',
          'Подтверждено runtime-тестом: detection и SAM2 обязаны получать один и тот же image/canvas. Для нескольких Florence2 BBOX локальная версия Sam2Segmentation требует individual_objects = ON; при OFF в тесте сохранялся только один силуэт.',
        ],
        facts: [
          { status: 'confirmed', title: 'Multi-person runtime', text: 'На source 1280 × 720 индексы 0–5 и individual_objects ON дали объединённую маску шести людей.' },
          { status: 'not-confirmed', title: 'Production composite', text: 'Runtime-тест подтверждает mask chain отдельно; downstream positioning и composite проверяются следующими probes.' },
        ],
      },
      {
        id: 'detail-mask',
        eyebrow: '03 · ARCHITECTURE',
        title: 'Detail mask формируется на selected base image 592',
        paragraphs: [
          'Prompt 591 и source 592 поступают в Florence2Run 580. Coordinates 584 и SAM2 585 создают mask, которая используется MaskToImage 583 и ImageCompositeMasked 775.',
        ],
      },
      {
        id: 'polarity',
        eyebrow: '04 · POLARITY',
        title: 'MASK↔IMAGE conversions требуют визуальной проверки',
        facts: [
          { status: 'confirmed', title: 'No explicit InvertMask', text: 'В significant topology нет отдельного активного InvertMask между PEOPLE detection и composite.' },
          { status: 'not-confirmed', title: 'Hidden inversion', text: 'Third-party nodes могут интерпретировать intensity/polarity внутри своей реализации; это требует preview или runtime test.' },
          { status: 'inferred', title: 'QA rule', text: 'Проверять белую foreground область, чёрный background, holes, islands и совпадение размера с image.' },
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'detail-conservation',
    navTitle: 'Detail Conservation',
    eyebrow: 'STAGE 1 · STAGE 2 · BRIDGE',
    title: 'Как архитектурные детали переживают SDXL, PEOPLE и main FLUX',
    lede:
      'Одна architectural mask управляет двумя активными easy imageDetailTransfer и сохранённым post-FLUX transfer. Node 779 после Stage 1 раздаёт image сразу в семь downstream branches.',
    status: 'confirmed',
    statusNote: 'Targets, sources, masks и downstream links подтверждены topology',
    visual: 'detail',
    category: 'base-generation',
    stage: 'detail',
    relatedNodes: [14, 53, 67, 157, 232, 429, 451, 565, 573, 580, 583, 584, 585, 592, 720, 747, 749, 751, 754, 775, 779, 834],
    relatedChapters: ['segmentation-masks', 'people-ppl-overview', 'main-flux', 'output'],
    sections: [
      {
        id: 'detail-mask-build',
        eyebrow: '01 · MASK BUILD',
        title: 'SAM2 building mask преобразуется в transfer mask 754',
        paragraphs: [
          'Architectural SAM2 output 585 поступает в MaskToImage 583 и ImageCompositeMasked 775. PEOPLE alpha/image from 430 проходит ColorCorrect 751, Cut 747 и Paste 749 на architectural mask representation 583; Image To Mask 754 формирует общую transfer mask.',
        ],
        table: {
          columns: ['Route', 'Role'],
          rows: [
            ['430 → 751 → 747', 'Создание контрастной PEOPLE-derived cutout for mask placement'],
            ['583 + 747 + 451 → 749', 'Paste on architectural mask/image context'],
            ['749 → 754', 'Intensity mask for transfers'],
            ['585 + 776 + 592 → 775', 'Detail composite source'],
          ],
        },
      },
      {
        id: 'stage-one-two',
        eyebrow: '02 · ACTIVE TRANSFERS',
        title: '565 работает до PPL, 573 — после выбора PPL',
        table: {
          columns: ['Node', 'Target', 'Source', 'Mask', 'Output'],
          rows: [
            ['565', 'SDXL decode 14', 'Selected base 592', '754', 'Image Filter 779'],
            ['573', 'Selected PPL/main image 459', 'Detail composite 775', '754', 'VAEEncode 67'],
            ['834 · mode 4', 'Main FLUX decode 53', 'Detail composite 775', '754', 'UltimateSDUpscale 833'],
          ],
        },
        facts: [
          { status: 'confirmed', title: 'Effective strength', text: 'Nodes 565/573 receive linked value 720 = 0.09; stored internal blend widgets are not authoritative.' },
          { status: 'not-confirmed', title: 'Visual preservation', text: 'Topology proves application, not the amount of preserved facade detail.' },
        ],
      },
      {
        id: 'image-filter',
        eyebrow: '03 · CENTRAL FAN-OUT',
        title: 'Node 779 связывает SDXL result с caption, masks, PEOPLE и QA',
        table: {
          columns: ['Consumer', 'Purpose'],
          rows: [
            ['232', 'Automatic SAM2 preview'],
            ['477', 'Environment reference for ColorMatch'],
            ['157', 'Florence2 caption for alternative FLUX prompt'],
            ['429', 'Base scene for first PPL Paste By Mask'],
            ['71', 'INPUT / SDXL comparer'],
            ['72', 'SDXL / FLUX comparer'],
            ['509', 'Base scene for alternative inpaint return'],
          ],
        },
        facts: [
          { status: 'confirmed', title: 'Stored settings', text: 'Timeout 60, send none, external receiver UUID serialized.' },
          { status: 'not-confirmed', title: 'Receiver semantics', text: 'Назначение внешнего UUID не выводится из workflow JSON.' },
        ],
      },
    ],
  },
];
