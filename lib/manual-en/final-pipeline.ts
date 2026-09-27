import type { Chapter } from '../manual-types';

export const finalPipelineChapters: Chapter[] = [
  {
    index: 0,
    slug: 'main-flux',
    navTitle: 'Main FLUX Refinement',
    eyebrow: 'FINAL PIPELINE · ACTIVE',
    title: 'Main FLUX img2img after PEOPLE/PPL and detail transfer',
    lede:
      'Main FLUX is a separate stage, not the PPL generator. It encodes the selected scene from 459/573 into latent space, applies GLOBAL or Florence2 conditioning, and saves decode 53 through node 730.',
    status: 'confirmed',
    statusNote: 'Model, conditioning, sampler, scheduler and image route are confirmed by topology',
    visual: 'flux-main',
    category: 'final-pipeline',
    stage: 'flux',
    relatedNodes: [52, 53, 54, 57, 58, 59, 60, 61, 62, 64, 67, 138, 231, 453, 459, 466, 467, 573, 730, 771, 811],
    relatedChapters: ['global-prompts', 'detail-conservation', 'people-ppl-overview', 'output'],
    sections: [
      {
        id: 'loaders',
        eyebrow: '01 · MODEL STACK',
        title: 'Main FLUX and PPL share loaders but use different conditioning/sampling paths',
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
        title: 'Selector 453 chooses GLOBAL 811 or Florence2 52',
        paragraphs: [
          'Current control 453=1 selects GLOBAL conditioning 811. FluxGuidance 62 adds guidance 2.4 and sends conditioning to BasicGuider 60.',
          'Node 138 stores an empty encoded negative and participates in inpaint/upscale conditioning, but it is not connected to BasicGuider 60 of main sampler 57.',
        ],
        facts: [
          { status: 'confirmed', title: 'Current prompt route', text: '897 → 811 → input1 of 453 → 62 → 60.' },
          { status: 'confirmed', title: 'No main negative', text: 'BasicGuider 60 receives model 64 and conditioning 62; node 138 is not one of its inputs.' },
        ],
      },
      {
        id: 'sampling',
        eyebrow: '03 · IMG2IMG',
        title: 'Scene + PEOPLE becomes latent with denoise 0.18',
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
        title: 'Topological return is confirmed; visual survival of people is not',
        facts: [
          { status: 'confirmed', title: 'Route reaches output', text: '459 → 573 → 67 → 57 → 53 → 730.' },
          { status: 'not-confirmed', title: 'People remain visible', text: 'Denoise 0.18 can alter local details; a same-run comparison of 459 vs 53/730 is required.' },
          { status: 'inferred', title: 'QA pair', text: 'Use comparer 480 for PPL selection first, then comparer 72 and save 730 to verify survival through main FLUX.' },
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'upscale-overlay',
    navTitle: 'Upscale, Tiling & Logo',
    eyebrow: 'FINAL PIPELINE · MODE 4',
    title: 'Saved HQ branch, tile logic and two overlays',
    lede:
      'Process UPSCALE and Process ADD LOGO are fully present in the graph, but all 25 processing nodes in these groups are saved in mode 4. The documentation describes configuration, not an executed result.',
    status: 'confirmed',
    statusNote: 'Nodes, settings and bypass modes are confirmed by the derived specification',
    visual: 'upscale',
    category: 'final-pipeline',
    stage: 'post-process',
    relatedNodes: [15, 53, 153, 154, 293, 301, 309, 531, 771, 832, 833, 834, 835, 840, 841, 842, 843, 844, 845, 846, 848, 849, 850, 851, 883, 884, 887, 888, 889, 890, 891, 892, 893, 894],
    relatedChapters: ['detail-conservation', 'main-flux', 'output'],
    sections: [
      {
        id: 'upscale-core',
        eyebrow: '01 · ULTIMATE SD UPSCALE',
        title: 'Node 833 receives image, model, conditioning, VAE and computed tile dimensions',
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
          { status: 'not-confirmed', title: 'Runtime size', text: 'Actual HQ output resolution is not confirmed by a runtime test.' },
        ],
      },
      {
        id: 'tile-logic',
        eyebrow: '02 · DIMENSION LOGIC',
        title: 'Nodes 883–894 choose a tile base from orientation and dimensions',
        paragraphs: [
          'GetImageSize 888 reads decode 53. Compare nodes 887/891 and If nodes 889/890/892/893 select constants 883/884/894. MathExpression nodes 832/835 calculate tile height/width for 833 using factor 154.',
        ],
        facts: [
          { status: 'confirmed', title: 'Stored constants', text: '883=1152, 884=896, 894=1024; all sizing logic is mode 4.' },
          { status: 'inferred', title: 'Purpose', text: 'The logic adapts tile dimensions for portrait, landscape or square input.' },
        ],
      },
      {
        id: 'overlays',
        eyebrow: '03 · ADD LOGO',
        title: 'Two assets are composited sequentially after upscale',
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
        title: 'Current LQ and optional HQ/LQ2 should not be conflated',
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
    title: 'Search all 252 nodes in the full workflow',
    lede:
      'The interactive index loads the derived specification and lets you filter nodes by ID, title, type, group, provider and execution mode.',
    status: 'confirmed',
    statusNote: 'The index source is bundled HANSEN_WORKFLOW_SPEC.json',
    visual: 'node-index',
    category: 'evidence-reference',
    stage: 'reference',
    relatedChapters: ['graph-reading', 'control-panel', 'resources'],
    sections: [
      {
        id: 'how-to-use',
        eyebrow: '01 · SEARCH',
        title: 'Search a node by number, title, type, group or package',
        paragraphs: [
          'Search runs locally in the browser against static JSON. Filters do not modify the workflow or send data to an external service.',
        ],
      },
      {
        id: 'index-limit',
        eyebrow: '02 · SOURCE LIMIT',
        title: 'The index represents a derived snapshot, not a live ComfyUI graph',
        facts: [
          { status: 'confirmed', title: 'Snapshot counts', text: '252 nodes, 341 links, 16 formal groups, 28 controls.' },
          { status: 'not-confirmed', title: 'Raw parity', text: 'The original workflow JSON is not included in the bundle, so the snapshot cannot be independently recalculated in this checkout.' },
        ],
      },
    ],
  },
];
