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
    id: 'atlas-neutral-forest-water',
    stage: 'Neutral study · Forest',
    src: '/assets/output/archviz-black-cabin-temp.png',
    sourcePath: 'Generated neutral placeholder · 2026-09-27',
    projectPath: '/assets/output/atlas-neutral-01.jpg',
    alt: 'Contemporary pavilion in a calm forest landscape above dark water',
    caption: 'Temporary neutral architectural placeholder for the React Atlas. Replace later with a validated course image.',
    status: 'not-confirmed',
  },
  {
    id: 'atlas-neutral-interior',
    stage: 'Neutral study · Interior',
    src: '/assets/output/archviz-amphitheatre-person.png',
    sourcePath: 'Generated neutral placeholder · 2026-09-27',
    projectPath: '/assets/output/atlas-neutral-02.jpg',
    alt: 'Contemporary interior lounge with warm light and a forest view',
    caption: 'Temporary neutral architectural placeholder for the React Atlas. Replace later with a validated course image.',
    status: 'not-confirmed',
  },
  {
    id: 'atlas-neutral-urban',
    stage: 'Neutral study · Urban',
    src: '/assets/output/atlas-neutral-03.jpg',
    sourcePath: 'Generated neutral placeholder · 2026-09-27',
    projectPath: '/assets/output/atlas-neutral-03.jpg',
    alt: 'Contemporary dark facade in a restrained urban streetscape',
    caption: 'Temporary neutral architectural placeholder for the React Atlas. Replace later with a validated course image.',
    status: 'not-confirmed',
  },
  {
    id: 'atlas-neutral-landscape',
    stage: 'Neutral study · Landscape',
    src: '/assets/output/archviz-forest-pavilion.png',
    sourcePath: 'Generated neutral placeholder · 2026-09-27',
    projectPath: '/assets/output/atlas-neutral-04.jpg',
    alt: 'Contemporary pavilion integrated into a landscaped forest setting',
    caption: 'Temporary neutral architectural placeholder for the React Atlas. Replace later with a validated course image.',
    status: 'not-confirmed',
  },
]
