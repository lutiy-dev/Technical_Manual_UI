import type { Chapter } from '../manual-types';

export const finalPipelineChapters: Chapter[] = [
  {
    index: 0,
    slug: 'main-flux',
    navTitle: 'Main FLUX Refinement',
    eyebrow: 'FINAL PIPELINE · ACTIVE',
    title: 'Основной FLUX img2img после PEOPLE/PPL и detail transfer',
    lede:
      'Main FLUX — отдельная стадия, не PPL generator. Она кодирует выбранную сцену 459/573 в latent, применяет GLOBAL или Florence2 conditioning и сохраняет decode 53 через node 730.',
    status: 'confirmed',
    statusNote: 'Model, conditioning, sampler, scheduler и image route подтверждены topology',
    visual: 'flux-main',
    category: 'final-pipeline',
    stage: 'flux',
    relatedNodes: [52, 53, 54, 57, 58, 59, 60, 61, 62, 64, 67, 138, 231, 453, 459, 466, 467, 573, 730, 771, 811],
    relatedChapters: ['global-prompts', 'detail-conservation', 'people-ppl-overview', 'output'],
    sections: [
      {
        id: 'loaders',
        eyebrow: '01 · MODEL STACK',
        title: 'Main FLUX и PPL используют общие loaders, но разные conditioning/sampling paths',
        table: {
          columns: ['Node', 'Stored value', 'Consumers'],
          rows: [
            ['467', 'flux1-dev-Q8_0.gguf', 'ModelSampling 64; PPL ModelSampling 826'],
            ['466', 't5-v1_1-xxl-encoder-Q8_0.gguf + clip_l.safetensors', '52, 138, 516, 811, 831'],
            ['54', 'ae.safetensors', '53, 67, 494, 496, 829, 833'],
            ['64', 'max shift 1.15 · base shift 0.5 · W/H from 783', '59, 60, inpaint, upscale'],
          ],
        },
      },
      {
        id: 'conditioning',
        eyebrow: '02 · PROMPT',
        title: 'Selector 453 выбирает GLOBAL 811 или Florence2 52',
        paragraphs: [
          'Текущий control 453=1 выбирает GLOBAL conditioning 811. FluxGuidance 62 добавляет guidance 2.4 и передаёт conditioning BasicGuider 60.',
          'Node 138 содержит пустой encoded negative и участвует в inpaint/upscale conditioning, но не подключён к BasicGuider 60 основного sampler 57.',
        ],
        facts: [
          { status: 'confirmed', title: 'Current prompt route', text: '897 → 811 → input1 of 453 → 62 → 60.' },
          { status: 'confirmed', title: 'No main negative', text: 'BasicGuider 60 получает model 64 и conditioning 62; node 138 не является его input.' },
        ],
      },
      {
        id: 'sampling',
        eyebrow: '03 · IMG2IMG',
        title: 'Scene + PEOPLE становится latent с denoise 0.18',
        table: {
          columns: ['Stage', 'Nodes', 'Current setting'],
          rows: [
            ['Image preparation', '459 → 573', 'Architectural detail blend 0.09'],
            ['Encode', '573 + VAE 54 → 67', 'Main scene latent'],
            ['Noise', '231 → 61', 'Shared global seed / randomize policy'],
            ['Sampler', '58', 'Euler'],
            ['Scheduler', '64 + 771 → 59', 'beta · 24 steps · denoise 0.18'],
            ['Guidance', '64 + 62 → 60', 'Guidance 2.4'],
            ['Sample / decode', '67 + 61 + 60 + 58 + 59 → 57 → 53', 'Active'],
          ],
        },
      },
      {
        id: 'downstream-survival',
        eyebrow: '04 · PEOPLE SURVIVAL',
        title: 'Topological return подтверждён, визуальное сохранение людей — нет',
        facts: [
          { status: 'confirmed', title: 'Route reaches output', text: '459 → 573 → 67 → 57 → 53 → 730.' },
          { status: 'not-confirmed', title: 'People remain visible', text: 'Denoise 0.18 может изменить локальные детали; нужен same-run comparison 459 vs 53/730.' },
          { status: 'inferred', title: 'QA pair', text: 'Сначала comparer 480 для PPL selection, затем comparer 72 и save 730 для main FLUX survival.' },
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'upscale-overlay',
    navTitle: 'Upscale, Tiling & Logo',
    eyebrow: 'FINAL PIPELINE · MODE 4',
    title: 'Сохранённая HQ-ветка, tile logic и два overlays',
    lede:
      'Process UPSCALE и Process ADD LOGO полностью присутствуют в graph, но все 25 processing nodes этих групп сохранены в mode 4. Документация описывает конфигурацию, а не выполненный результат.',
    status: 'confirmed',
    statusNote: 'Nodes, settings и bypass modes подтверждены derived specification',
    visual: 'upscale',
    category: 'final-pipeline',
    stage: 'post-process',
    relatedNodes: [15, 53, 153, 154, 293, 301, 309, 531, 771, 832, 833, 834, 835, 840, 841, 842, 843, 844, 845, 846, 848, 849, 850, 851, 883, 884, 887, 888, 889, 890, 891, 892, 893, 894],
    relatedChapters: ['detail-conservation', 'main-flux', 'output'],
    sections: [
      {
        id: 'upscale-core',
        eyebrow: '01 · ULTIMATE SD UPSCALE',
        title: 'Node 833 получает image, model, conditioning, VAE и вычисленные tiles',
        table: {
          columns: ['Input', 'Source / stored value'],
          rows: [
            ['Image', '53 → bypassed detail transfer 834 → 833'],
            ['Upscale model', '153 · 4x-UltraSharp.pth'],
            ['User factor', '154 = 3; linked to sizing and 833'],
            ['FLUX model / prompt / negative / VAE', '64 / 453 / 138 / 54'],
            ['Steps', '771 = 24 linked; node stores additional sampler settings'],
            ['Stored sampler', 'factor 2 · 4 steps · CFG 1 · Euler · beta · denoise 0.22'],
            ['Tiles', '1024×1024 · padding 16 · mask blur 32 · seam fix None'],
          ],
        },
        facts: [
          { status: 'confirmed', title: 'Bypass', text: '833 and 834 have mode 4.' },
          { status: 'not-confirmed', title: 'Runtime size', text: 'Фактическое разрешение HQ output не подтверждено запуском.' },
        ],
      },
      {
        id: 'tile-logic',
        eyebrow: '02 · DIMENSION LOGIC',
        title: 'Nodes 883–894 выбирают tile base по orientation и dimensions',
        paragraphs: [
          'GetImageSize 888 считывает decode 53. Compare nodes 887/891 и If nodes 889/890/892/893 выбирают constants 883/884/894. MathExpression nodes 832/835 рассчитывают tile height/width для 833 с учётом factor 154.',
        ],
        facts: [
          { status: 'confirmed', title: 'Stored constants', text: '883=1152, 884=896, 894=1024; вся sizing logic mode 4.' },
          { status: 'inferred', title: 'Purpose', text: 'Логика адаптирует tile dimensions к portrait/landscape/square input.' },
        ],
      },
      {
        id: 'overlays',
        eyebrow: '03 · ADD LOGO',
        title: 'Два assets последовательно композитятся после upscale',
        table: {
          columns: ['Stage', 'Nodes', 'State'],
          rows: [
            ['Canvas size', '833 → 851', 'mode 4'],
            ['First asset', '301 → 845; placement 843/844/846 → 848', 'mode 4'],
            ['Second asset', '309 → 840; placement 841/842/850 → 849', 'mode 4'],
            ['Overlay order', '833 → 848 → 849', 'mode 4'],
            ['Final preview/save', '849 → 15 / 293', 'upstream-bypassed'],
          ],
        },
      },
      {
        id: 'outputs',
        eyebrow: '04 · OUTPUT STATE',
        title: 'Current LQ и optional HQ/LQ2 нельзя смешивать',
        table: {
          columns: ['Output', 'Upstream', 'Interpretation'],
          rows: [
            ['730 · LQ1 JPG', '53', 'Current active save'],
            ['531 · HQ PNG', '833', 'Save node active, upstream mode 4'],
            ['293 · LQ2 JPG', '849', 'Save node active, upstream mode 4'],
            ['15 · Final Preview', '849', 'Preview active, upstream mode 4'],
          ],
        },
      },
    ],
  },
  {
    index: 0,
    slug: 'node-index',
    navTitle: 'Complete Node Index',
    eyebrow: 'EVIDENCE & REFERENCE',
    title: 'Поиск по всем 252 nodes полного workflow',
    lede:
      'Интерактивный индекс загружает derived specification и позволяет фильтровать nodes по ID, title, type, group, provider и execution mode.',
    status: 'confirmed',
    statusNote: 'Источник индекса — bundled HANSEN_WORKFLOW_SPEC.json',
    visual: 'node-index',
    category: 'evidence-reference',
    stage: 'reference',
    relatedChapters: ['graph-reading', 'control-panel', 'resources'],
    sections: [
      {
        id: 'how-to-use',
        eyebrow: '01 · SEARCH',
        title: 'Ищи node по номеру, названию, типу, группе или package',
        paragraphs: [
          'Поиск работает локально в браузере по статическому JSON. Фильтры не изменяют workflow и не отправляют данные во внешний сервис.',
        ],
      },
      {
        id: 'index-limit',
        eyebrow: '02 · SOURCE LIMIT',
        title: 'Индекс представляет derived snapshot, а не live ComfyUI graph',
        facts: [
          { status: 'confirmed', title: 'Snapshot counts', text: '252 nodes, 341 links, 16 formal groups, 28 controls.' },
          { status: 'not-confirmed', title: 'Raw parity', text: 'Оригинальный workflow JSON не включён в bundle, поэтому snapshot нельзя независимо пересчитать в этом checkout.' },
        ],
      },
    ],
  },
];
