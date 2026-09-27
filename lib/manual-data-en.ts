import type {
  Chapter,
  ChapterSection,
  ManualCategory,
} from './manual-types';
import { additionalChapters } from './manual-en';
import { existingPeopleChaptersEn } from './manual-existing-en-people';
import { existingFinalChaptersEn } from './manual-existing-en-final';

export type {
  Chapter,
  ChapterSection,
  CodeExample,
  DataTable,
  EvidenceStatus,
  Fact,
  ManualCategory,
} from './manual-types';

// Historical resource path. Kept unchanged so existing downloads and source references remain valid.
export const sourceRoot =
  '/resources/EPSPOZICIYA_HANSEN_TECHNICAL_MANUAL_SOURCE';

const existingChapters = ([
  ...existingPeopleChaptersEn,
  ...existingFinalChaptersEn,
]).sort((a, b) => a.index - b.index);

const existingChapterMap = Object.fromEntries(
  existingChapters.map((chapter) => [chapter.slug, chapter]),
) as Record<string, (typeof existingChapters)[number]>;

const additionalChapterMap = Object.fromEntries(
  additionalChapters.map((chapter) => [chapter.slug, chapter]),
) as Record<string, Chapter>;

function existingChapter(
  slug: string,
  category: ManualCategory,
  overrides: Partial<Chapter> = {},
): Chapter {
  const chapter = existingChapterMap[slug];
  if (!chapter) throw new Error(`Missing English existing chapter: ${slug}`);
  return { ...chapter, category, ...overrides } as Chapter;
}

function additionalChapter(slug: string): Chapter {
  const chapter = additionalChapterMap[slug];
  if (!chapter) throw new Error(`Missing English additional chapter: ${slug}`);
  return chapter;
}

const peopleOverview = existingChapter('overview', 'people-ppl', {
  slug: 'people-ppl-overview',
  navTitle: 'PPL Overview',
  eyebrow: 'PEOPLE / PPL · MODULE',
  relatedChapters: ['node-408-prompt', 'positioning', 'selector-logic', 'main-flux'],
});

const selectorTruthSection: ChapterSection = {
  id: 'selector-truth-table',
  eyebrow: '04 · TRUTH TABLE',
  title: '543 × 693 × 715: which source is actually selected',
  table: {
    columns: ['543', '693', '715 effective', '552 source', '459 return'],
    rows: [
      ['1 · FLUX', '1 · resized', '1', 'PPL FLUX decode 829', 'First composite 672'],
      ['1 · FLUX', '2 · original', '1', 'PPL FLUX decode 829', 'First composite 672'],
      ['2 · INPUT', '1 · resized', '2', '715 selected input, then component inpaint', 'Resized return 685'],
      ['2 · INPUT', '2 · original', '2', '715 selected input, then component inpaint', 'Original-canvas return 685'],
    ],
  },
  facts: [
    {
      status: 'confirmed',
      title: 'Linked override',
      text: 'Stored widget 2 inside node 715 does not select mode 2 while Input is linked to node 543=1.',
    },
    {
      status: 'not-confirmed',
      title: '3D source semantics',
      text: 'Topology does not expose a dedicated LoadImage that proves the origin of the source labelled 3D rendered.',
    },
  ],
};

const fullDiagnosticsSection: ChapterSection = {
  id: 'whole-graph-probes',
  eyebrow: '04 · WHOLE GRAPH',
  title: 'Diagnostic ladder from input to optional HQ',
  table: {
    columns: ['Stage', 'Probe', 'Stop condition'],
    rows: [
      ['Preprocessors', '39 depth / 167 edge', 'Map is wrong — do not begin SDXL diagnosis'],
      ['Main SDXL', '71: input 79 vs result 779', 'SDXL result is wrong — do not diagnose PEOPLE yet'],
      ['Masks', '113 / 233 / 340–353 / 581', 'Verify polarity, bounds and canvas size'],
      ['PEOPLE', '409 / 507 / 508 / 480 / 518', 'Find the last correct PPL stage'],
      ['Main FLUX', '72: 779 vs 53; active save 730', 'Verify survival after denoise 0.18'],
      ['Upscale / overlay', '141 / 675 / 15 / 531 / 293', 'Remove bypass first, then verify'],
    ],
  },
};

const workflowChecklistSection: ChapterSection = {
  id: 'whole-workflow-checklist',
  eyebrow: '03 · FULL WORKFLOW',
  title: 'Checks before and after PEOPLE/PPL',
  bullets: [
    'Input 79 and selected optional files are available in the active ComfyUI instance.',
    'Controls 541 / 456 / 168 / 453 / 543 / 693 have the expected effective values.',
    'Depth/Canny previews are verified before KSampler 1.',
    'SDXL result is correct in comparer 71.',
    'Architectural and PEOPLE masks have correct polarity and dimensions.',
    'Selected PPL result is visible at 459 / comparer 480.',
    'PEOPLE survives main FLUX decode 53 / save 730.',
    'HQ/overlay checkpoints are verified only after the mode-4 branch is deliberately enabled.',
  ],
};

const goldenRunSection: ChapterSection = {
  id: 'golden-run',
  eyebrow: '03 · GOLDEN RUN',
  title: 'A reference run has not yet been captured',
  paragraphs: [
    'Topology, controls, models and checkpoints are documented, but the manual does not yet contain one reproducible run with fixed inputs, seed, effective selector values, runtime previews and verified output files.',
  ],
  facts: [
    {
      status: 'not-confirmed',
      title: 'Golden Run artifact',
      text: 'There is no confirmed package of input + workflow JSON + seed + checkpoint screenshots + LQ/HQ output that can be reproduced on a clean instance.',
    },
    {
      status: 'inferred',
      title: 'Minimum capture package',
      text: 'Record workflow hash, input 79, optional inputs, model manifest, controls 541/456/168/453/543/693, seed, previews 39/167/71/409/480/72 and the actual file produced by 730.',
    },
  ],
  bullets: [
    'Preserve the unchanged raw workflow and its SHA-256.',
    'Record the exact ComfyUI root and custom-node package versions.',
    'Capture seed and effective linked values, not only visible widgets.',
    'Save intermediate probes and final LQ1; HQ/overlay should be a separate run after bypass is removed.',
  ],
};

export const manualChapters: Chapter[] = [
  additionalChapter('workflow-engineering-overview'),
  additionalChapter('workflow-engineering-node-literacy'),
  additionalChapter('workflow-engineering-graph-literacy'),
  additionalChapter('workflow-engineering-groups-naming'),
  additionalChapter('workflow-engineering-base-config'),
  additionalChapter('workflow-engineering-data-control-plane'),
  additionalChapter('workflow-engineering-switches-routing'),
  additionalChapter('workflow-engineering-execution-cache'),
  additionalChapter('workflow-engineering-routing-lab'),
  additionalChapter('workflow-engineering-base-config-lab'),
  additionalChapter('workflow-engineering-module-contract-lab'),
  additionalChapter('workflow-engineering-module-contracts'),
  additionalChapter('workflow-engineering-coordinates-batch'),
  additionalChapter('workflow-engineering-debugging'),
  additionalChapter('workflow-engineering-reproducibility'),
  additionalChapter('overview'),
  additionalChapter('graph-reading'),
  additionalChapter('inputs'),
  additionalChapter('control-panel'),
  additionalChapter('models-dependencies'),
  additionalChapter('lab-04-master-graph-reading'),
  additionalChapter('global-prompts'),
  additionalChapter('sdxl'),
  additionalChapter('controlnet'),
  additionalChapter('ipadapter-lora'),
  additionalChapter('segmentation-masks'),
  additionalChapter('detail-conservation'),
  additionalChapter('lab-05-generative-systems-bench'),
  additionalChapter('hansen-00-39-production-method'),
  additionalChapter('hansen-01-08-input-data-txt2img'),
  additionalChapter('hansen-02-40-process1-txt2img'),
  additionalChapter('hansen-04-23-people-ppl'),
  additionalChapter('hansen-05-42-workflow-tips'),
  additionalChapter('hansen-06-32-controlnet-preprocessors'),
  additionalChapter('hansen-07-38-masks-detail-conservation'),
  additionalChapter('hansen-08-35-mode1-example'),
  additionalChapter('hansen-09-16-generation-mode1'),
  additionalChapter('hansen-11-35-mode2-img2img'),
  additionalChapter('hansen-12-53-generation-mode2'),
  additionalChapter('hansen-13-20-mode2-enhancement'),
  additionalChapter('hansen-13-55-output-parameters'),
  additionalChapter('hansen-14-43-conclusion'),
  peopleOverview,
  existingChapter('node-408-prompt', 'people-ppl'),
  existingChapter('generation', 'people-ppl', { navTitle: 'PPL Generation' }),
  existingChapter('segmentation-mask', 'people-ppl', { navTitle: 'PPL Segmentation / Mask' }),
  existingChapter('preparation-color-match', 'people-ppl'),
  additionalChapter('positioning'),
  additionalChapter('ppl-workflow-01-generate-place'),
  additionalChapter('ppl-workflow-02-replace-existing'),
  existingChapter('selector-logic', 'people-ppl', {
    sections: [...existingChapterMap['selector-logic'].sections, selectorTruthSection],
  }),
  additionalChapter('ppl-mode-2-inpaint'),
  existingChapter('composite', 'people-ppl'),
  additionalChapter('lab-06-people-ppl-production-run'),
  additionalChapter('main-flux'),
  additionalChapter('upscale-overlay'),
  existingChapter('output', 'final-pipeline', { navTitle: 'Output & Comparers' }),
  existingChapter('diagnostics', 'final-pipeline', {
    navTitle: 'Full Workflow Diagnostics',
    sections: [...existingChapterMap.diagnostics.sections, fullDiagnosticsSection],
  }),
  existingChapter('checklist', 'final-pipeline', {
    navTitle: 'Full Workflow Checklist',
    sections: [...existingChapterMap.checklist.sections, workflowChecklistSection],
  }),
  additionalChapter('lab-07-final-pipeline-delivery'),
  existingChapter('examples', 'evidence-reference', {
    navTitle: 'React Atlas & Practical Scenarios',
    sections: [...existingChapterMap.examples.sections, goldenRunSection],
  }),
  additionalChapter('capstone-master-graph-certification'),
  additionalChapter('node-index'),
  existingChapter('resources', 'evidence-reference', { navTitle: 'Resources, Provenance & Errata' }),
].map((chapter, index) => ({ ...chapter, index: index + 1 }));

export const chapterBySlug = Object.fromEntries(
  manualChapters.map((chapter) => [chapter.slug, chapter]),
) as Record<string, Chapter>;

export const diagnosticChecklist = [
  { id: 'branch', label: 'PEOPLE / PPL branch is active and not bypassed', evidence: 'group / node modes' },
  { id: 'prompt', label: 'Node 408 contains the current prompt', evidence: '408 → 823' },
  { id: 'generated', label: 'People are visible after VAEDecode', evidence: 'Preview 409 ← 829' },
  { id: 'detected', label: 'Florence2 finds the intended figures', evidence: 'Preview 113 ← 550' },
  { id: 'mask', label: 'SAM2 mask is clean and covers the figure', evidence: '115 → 144 → 146' },
  { id: 'cutout', label: 'RemBg / ColorMatch produce a clean cutout', evidence: '422 → 477 → 449' },
  { id: 'mode', label: 'Node 543 selects the intended source mode', evidence: '543 = 1 or 2' },
  { id: 'selector', label: 'Nested-switch logic 715 → 552 is accounted for', evidence: 'links 1224 / 1228 / 983' },
  { id: 'composite', label: 'PPL composite is visible after the selector', evidence: 'Comparer 480 ← 459' },
  { id: 'flux', label: 'People remain after main FLUX decode', evidence: '53 / Save 730' },
  { id: 'final', label: 'People are visible in the active current output', evidence: 'Save 730 ← 53' },
];

export const upstreamResources = [
  {
    title: 'ComfyUI',
    href: 'https://github.com/Comfy-Org/ComfyUI',
    meta: 'Canonical repository',
    description: 'Core node-based runtime and workflow interface.',
    warning: false,
  },
  {
    title: 'ComfyUI Docs · Workflows',
    href: 'https://docs.comfy.org/basic-concepts/workflow',
    meta: 'Official documentation',
    description: 'Nodes, links and the visual-programming workflow model.',
    warning: false,
  },
  {
    title: 'rgthree-comfy',
    href: 'https://github.com/rgthree/rgthree-comfy',
    meta: 'Upstream repository',
    description: 'Image Comparer, Seed, Fast Groups Bypasser and utility nodes.',
    warning: false,
  },
  {
    title: 'ComfyUI-Logic',
    href: 'https://github.com/theUpsider/ComfyUI-Logic',
    meta: 'Archived · unmaintained',
    description: 'Compare / If logic. Use with an explicit compatibility warning.',
    warning: true,
  },
  {
    title: 'Graphviz',
    href: 'https://graphviz.org/',
    meta: 'Official project',
    description: 'DOT diagram rendering for documentation; not part of the runtime.',
    warning: false,
  },
  {
    title: 'Workflow JSON spec',
    href: 'https://docs.comfy.org/specs/workflow_json',
    meta: 'Official ComfyUI spec',
    description: 'Graph format, node IDs, links and serialized values.',
    warning: false,
  },
  {
    title: 'Custom node troubleshooting',
    href: 'https://docs.comfy.org/troubleshooting/custom-node-issues',
    meta: 'Official ComfyUI guide',
    description: 'A structured method for isolating third-party-node problems.',
    warning: false,
  },
  {
    title: 'Graphviz DOT language',
    href: 'https://graphviz.org/doc/info/lang.html',
    meta: 'Official reference',
    description: 'Syntax reference for HANSEN_MASTER_MAP.dot.',
    warning: false,
  },
];

export const downloadResources = [
  {
    title: 'React source project',
    href: '/downloads/EPSPOZICIYA_ARCHVIZ_TECHNICAL_MANUAL_SOURCE.zip',
    meta: 'ZIP · source',
    description: 'React/TypeScript/CSS source, public assets and GitHub Pages configuration without dependencies.',
  },
  {
    title: 'Ready static build',
    href: '/downloads/EPSPOZICIYA_ARCHVIZ_TECHNICAL_MANUAL_STATIC_BUILD.zip',
    meta: 'ZIP · static HTML',
    description: 'Prebuilt static export with route directories and GitHub Pages base path.',
  },
  {
    title: 'Complete technical archive',
    href: '/resources/EPSPOZICIYA_HANSEN_TECHNICAL_MANUAL_SOURCE.zip',
    meta: 'ZIP · 24 files',
    description: 'Markdown, CSV, JSON, DOT and SVG files from the current source package.',
  },
  {
    title: 'Master architecture',
    href: `${sourceRoot}/01_MASTER_ARCHITECTURE.md`,
    meta: 'Markdown',
    description: 'Full architecture, active route, groups and key topology.',
  },
  {
    title: 'Control panel',
    href: `${sourceRoot}/02_CONTROL_PANEL.md`,
    meta: 'Markdown',
    description: 'Selectors, linked controls and current modes.',
  },
  {
    title: 'Inputs',
    href: `${sourceRoot}/03_INPUTS.md`,
    meta: 'Markdown',
    description: 'Serialized input filenames, roles and mode-dependent sources.',
  },
  {
    title: 'Prompts & routing',
    href: `${sourceRoot}/04_PROMPTS.md`,
    meta: 'Markdown',
    description: 'Current prompt values and exact assembly.',
  },
  {
    title: 'Main SDXL',
    href: `${sourceRoot}/05_SDXL.md`,
    meta: 'Markdown',
    description: 'Checkpoint, conditioning, sampler and latent modes.',
  },
  {
    title: 'ControlNet',
    href: `${sourceRoot}/06_CONTROLNET.md`,
    meta: 'Markdown · see errata',
    description: 'Depth/Canny chapter; corrected source topology is documented in 17_AUDIT_ERRATA.',
  },
  {
    title: 'IPAdapter references',
    href: `${sourceRoot}/07_IPADAPTER_REFERENCES.md`,
    meta: 'Markdown',
    description: 'Reference images, model switch and current selected-away state.',
  },
  {
    title: 'PEOPLE / PPL route',
    href: `${sourceRoot}/08_PEOPLE_PPL.md`,
    meta: 'Markdown',
    description: 'Complete generation → final route with node IDs.',
  },
  {
    title: 'Masks & segmentation',
    href: `${sourceRoot}/09_MASKS_SEGMENTATION.md`,
    meta: 'Markdown',
    description: 'Florence2, SAM2, mask transforms and consumers.',
  },
  {
    title: 'Detail conservation',
    href: `${sourceRoot}/10_DETAIL_CONSERVATION.md`,
    meta: 'Markdown',
    description: 'PPL return through imageDetailTransfer 573.',
  },
  {
    title: 'Main FLUX',
    href: `${sourceRoot}/11_FLUX.md`,
    meta: 'Markdown',
    description: 'Main img2img return 459 → 573 → 67 → 57 → 53.',
  },
  {
    title: 'Upscale & overlays',
    href: `${sourceRoot}/12_UPSCALE.md`,
    meta: 'Markdown',
    description: 'Saved mode-4 HQ, tiling and logo-overlay chain.',
  },
  {
    title: 'Output comparers',
    href: `${sourceRoot}/13_OUTPUT_COMPARERS.md`,
    meta: 'Markdown',
    description: 'Preview, comparer, save and final-output points.',
  },
  {
    title: 'Legacy compatibility',
    href: `${sourceRoot}/14_LEGACY_COMPATIBILITY.md`,
    meta: 'Markdown',
    description: 'Historical copies and compatibility boundaries.',
  },
  {
    title: 'Audit errata',
    href: `${sourceRoot}/17_AUDIT_ERRATA.md`,
    meta: 'Markdown · NEW',
    description: 'Corrections, limitations and unconfirmed data.',
  },
  {
    title: 'Workflow model manifest',
    href: `${sourceRoot}/18_WORKFLOW_MODEL_MANIFEST.md`,
    meta: 'Markdown · NEW',
    description: 'Model filenames, loader nodes and package-provider mapping.',
  },
  {
    title: 'Master graph source',
    href: `${sourceRoot}/HANSEN_MASTER_MAP.dot`,
    meta: 'Graphviz DOT',
    description: 'Editable source for the complete workflow map.',
  },
  {
    title: 'Master graph map',
    href: `${sourceRoot}/HANSEN_MASTER_MAP.svg`,
    meta: 'SVG',
    description: 'Complete Graphviz workflow map.',
  },
  {
    title: 'Master pipeline',
    href: `${sourceRoot}/MASTER_PIPELINE.svg`,
    meta: 'SVG',
    description: 'Compact active pipeline and optional continuation.',
  },
  {
    title: 'PEOPLE route map',
    href: `${sourceRoot}/PEOPLE_PPL_ROUTE.svg`,
    meta: 'SVG',
    description: 'Isolated Graphviz map of the PEOPLE branch.',
  },
  {
    title: 'Control switches map',
    href: `${sourceRoot}/CONTROL_SWITCHES.svg`,
    meta: 'SVG',
    description: 'Visual map of 28 workflow controls.',
  },
  {
    title: 'Workflow specification',
    href: `${sourceRoot}/HANSEN_WORKFLOW_SPEC.json`,
    meta: 'JSON',
    description: 'Machine-readable significant nodes, controls and routes.',
  },
  {
    title: 'All nodes reference',
    href: `${sourceRoot}/15_ALL_NODES_REFERENCE.csv`,
    meta: 'CSV',
    description: '252 nodes with upstream / downstream links.',
  },
  {
    title: 'All controls reference',
    href: `${sourceRoot}/16_ALL_CONTROLS_REFERENCE.csv`,
    meta: 'CSV',
    description: '28 user-facing controls and modes.',
  },
];
