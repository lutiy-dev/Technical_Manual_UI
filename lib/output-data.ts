import type { EvidenceStatus } from '@/lib/manual-data';

export type OutputSaveProfile = {
  node: string;
  label: string;
  upstream: string;
  branchState: 'active' | 'upstream-bypassed';
  folderPattern: string;
  prefix: string;
  format: 'jpg' | 'png';
  dpi: number;
  quality: number;
  status: EvidenceStatus;
};

export type OutputExampleAsset = {
  id: string;
  stage: string;
  src: string;
  sourcePath: string;
  projectPath: string;
  alt: string;
  caption: string;
  status: EvidenceStatus;
  node?: string;
};

export const outputSaveProfiles: OutputSaveProfile[] = [
  {
    node: '730',
    label: 'LQ1 · current',
    upstream: '53',
    branchState: 'active',
    folderPattern: String.raw`ph\[time(%Y-%m-%d)]`,
    prefix: 'ph01_archviz_sdxl2flux_LQ1',
    format: 'jpg',
    dpi: 72,
    quality: 100,
    status: 'confirmed',
  },
  {
    node: '531',
    label: 'HQ',
    upstream: '833',
    branchState: 'upstream-bypassed',
    folderPattern: String.raw`ph\[time(%Y-%m-%d)]`,
    prefix: 'ph01_archviz_sdxl2flux_HQ',
    format: 'png',
    dpi: 300,
    quality: 100,
    status: 'confirmed',
  },
  {
    node: '293',
    label: 'LQ2 · overlay',
    upstream: '849',
    branchState: 'upstream-bypassed',
    folderPattern: String.raw`ph\[time(%Y-%m-%d)]`,
    prefix: 'ph01_archviz_sdxl2flux_LQ2',
    format: 'jpg',
    dpi: 72,
    quality: 100,
    status: 'confirmed',
  },
];

export const outputComparers = [
  { node: '71', label: 'INPUT / SDXL', a: '79', b: '779', availability: 'current' },
  { node: '72', label: 'SDXL / FLUX', a: '53', b: '779', availability: 'current' },
  { node: '141', label: 'FLUX / UPSCALE', a: '53', b: '833', availability: 'optional' },
  { node: '480', label: 'MASK / PPL', a: '451', b: '459', availability: 'current' },
  { node: '518', label: 'INPAINT / SOURCE', a: '509', b: '552', availability: 'current' },
  { node: '675', label: 'HQ DIAGNOSTIC', a: '25', b: '833', availability: 'optional' },
] as const;

export const outputPreviewGroups = [
  {
    label: 'General',
    nodes: ['39 ← 38', '167 ← 165', '233 ← 232', '581 ← 583'],
  },
  {
    label: 'Detection / masks',
    nodes: [
      '113 ← 550',
      '340 ← 339',
      '341 ← 346',
      '342 ← 347',
      '343 ← 350',
      '344 ← 349',
      '345 ← 348',
      '351 ← 352',
      '353 ← 354',
    ],
  },
  {
    label: 'PEOPLE',
    nodes: ['409 ← 829', '507 ← 503', '508 ← 522'],
  },
  {
    label: 'Final · optional',
    nodes: ['15 ← 849'],
  },
] as const;

export const legacyInfographics = [
  {
    src: '/assets/infographics/people-ppl-01-overview-full-analysis.png',
    title: 'Полный разбор',
    page: '1 / 3',
    sourcePath: String.raw`C:\Users\ogork\AppData\Roaming\Codex\web\Codex\Default\Cache\Cache_Data\f_000035`,
  },
  {
    src: '/assets/infographics/people-ppl-02-blocks-and-roles.png',
    title: 'Блоки и их роль',
    page: '2 / 3',
    sourcePath: String.raw`C:\Users\ogork\AppData\Roaming\Codex\web\Codex\Default\Cache\Cache_Data\f_000037`,
  },
  {
    src: '/assets/infographics/people-ppl-03-diagnostics-checklist.png',
    title: 'Диагностика и чек-лист',
    page: '3 / 3',
    sourcePath: String.raw`C:\Users\ogork\AppData\Roaming\Codex\web\Codex\Default\Cache\Cache_Data\f_000039`,
  },
] as const;

export const outputExampleAssets: OutputExampleAsset[] = [
  {
    id: 'archviz-amphitheatre-person',
    stage: 'People in context',
    src: '/assets/output/archviz-amphitheatre-person.png',
    sourcePath: String.raw`Q:\AI_ArchViz\ComfyUI_windows_portable\ComfyUI\output\ComfyUI_00052_.png`,
    projectPath: String.raw`C:\Users\ogork\.codex\.chatgpt-projects\g-p-6a4d41ae9198819196099b8c523616be\people-ppl-manual\public\assets\output\archviz-amphitheatre-person.png`,
    alt: 'Светлый биоморфный интерьер с небольшой фигурой человека в центре',
    caption: 'Реальный project output с человеком в масштабе интерьера. Не является доказанной парой до / после для текущей PEOPLE-ветки.',
    status: 'inferred',
  },
  {
    id: 'archviz-classical-tower',
    stage: 'Archviz final',
    src: '/assets/output/archviz-classical-tower.png',
    sourcePath: String.raw`Q:\AI_ArchViz\ComfyUI_windows_portable\ComfyUI\output\ComfyUI_00117_.png`,
    projectPath: String.raw`C:\Users\ogork\.codex\.chatgpt-projects\g-p-6a4d41ae9198819196099b8c523616be\people-ppl-manual\public\assets\output\archviz-classical-tower.png`,
    alt: 'Детализированный low-angle экстерьер классического высотного здания',
    caption: 'Чистый квадратный archviz output для проверки детализации, света и финального framing.',
    status: 'inferred',
  },
  {
    id: 'archviz-forest-pavilion',
    stage: 'FLUX mood',
    src: '/assets/output/archviz-forest-pavilion.png',
    sourcePath: String.raw`Q:\AI_ArchViz\ComfyUI_windows_portable\ComfyUI\output\Flux2-Klein_00041_.png`,
    projectPath: String.raw`C:\Users\ogork\.codex\.chatgpt-projects\g-p-6a4d41ae9198819196099b8c523616be\people-ppl-manual\public\assets\output\archviz-forest-pavilion.png`,
    alt: 'Тёмный лесной павильон среди густой растительности и направленного света',
    caption: 'Атмосферный FLUX-вариант как пример того, насколько downstream stage может изменить настроение сцены.',
    status: 'inferred',
  },
  {
    id: 'archviz-black-cabin-temp',
    stage: 'TEMP fallback',
    src: '/assets/output/archviz-black-cabin-temp.png',
    sourcePath: String.raw`C:\Users\ogork\AppData\Local\Temp\codex-clipboard-8181a3e4-28e4-4200-859d-1db637af2d03.png`,
    projectPath: String.raw`C:\Users\ogork\.codex\.chatgpt-projects\g-p-6a4d41ae9198819196099b8c523616be\people-ppl-manual\public\assets\output\archviz-black-cabin-temp.png`,
    alt: 'Современный чёрный деревянный дом с тёплым интерьером в лесу у ручья',
    caption: 'Ранее созданный render из TEMP. Связь с конкретным save node не доказана; в сайт включена отдельная постоянная копия.',
    status: 'not-confirmed',
  },
];
