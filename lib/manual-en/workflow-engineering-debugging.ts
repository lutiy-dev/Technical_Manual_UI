import type { Chapter } from '../manual-types';

export const workflowEngineeringDebuggingChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-debugging',
    navTitle: 'Checkpoints & Debugging',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'Checkpoints & Debugging — finding the last provably correct stage',
    lede:
      'A large workflow cannot be diagnosed from the final image alone. Reliable debugging is built as a ladder of checkpoints: after every meaningful module, there should be an observable result that lets you prove exactly where the pipeline stopped being correct.',
    status: 'confirmed',
    statusNote:
      'The method matches the documented Hansen probes: preprocessors, SDXL, masks, PEOPLE, main FLUX, and output all expose intermediate preview/comparer points.',
    visual: 'diagnostics',
    category: 'workflow-engineering',
    stage: 'debugging',
    relatedChapters: [
      'workflow-engineering-module-contracts',
      'workflow-engineering-coordinates-batch',
      'diagnostics',
      'checklist',
      'workflow-engineering-reproducibility',
    ],
    sections: [
      {
        id: 'observability',
        eyebrow: '01 · OBSERVABILITY',
        title: 'A module that cannot be observed independently is difficult to debug',
        paragraphs: [
          'PreviewImage, MaskPreview, comparer, text/JSON preview, and save probes are not decorative. They create observability: the ability to inspect data before it becomes mixed with the next system.',
          'The longer the chain without a checkpoint, the more possible causes can produce the same final failure.',
        ],
        codeExamples: [
          {
            title: 'Observable-module rule',
            label: 'DEBUG ARCHITECTURE',
            code:
              'INPUT\n' +
              '→ PROCESS\n' +
              '→ CHECKPOINT\n' +
              '→ RETURN / NEXT MODULE',
          },
        ],
      },
      {
        id: 'last-good-stage',
        eyebrow: '02 · LAST GOOD STAGE',
        title: 'The central debugging question: where is the last correct result?',
        paragraphs: [
          'Do not begin with “why is the final image wrong?” Start at the end and move upstream until you find the last checkpoint that looks correct and behaves correctly in structural terms.',
          'The next stage after it becomes the first suspect. This reduces the search space from hundreds of nodes to a single branch.',
        ],
        codeExamples: [
          {
            title: 'Diagnostic algorithm',
            label: 'BINARY-LIKE TRACE',
            code:
              'FINAL WRONG\n' +
              '→ CHECK PREVIOUS CHECKPOINT\n' +
              '→ IF GOOD: fault is downstream\n' +
              '→ IF BAD: continue upstream\n' +
              '→ FIND LAST GOOD STAGE',
          },
        ],
      },
      {
        id: 'checkpoint-types',
        eyebrow: '03 · CHECKPOINT TYPES',
        title: 'Different data types require different probes',
        table: {
          columns: ['Data', 'Checkpoint', 'What to verify'],
          rows: [
            ['IMAGE', 'PreviewImage / comparer', 'pixels, composition, color, geometry'],
            ['MASK', 'MaskPreview', 'silhouette, polarity, holes, bounds'],
            ['BBOX / JSON', 'text/JSON preview', 'coordinates, count, labels'],
            ['STRING', 'text preview', 'assembled prompt / control text'],
            ['LATENT', 'typically a decode-only debug path', 'visual result after VAE Decode'],
            ['OUTPUT FILE', 'SaveImage + actual file check', 'whether the delivery path truly completed'],
          ],
        },
      },
      {
        id: 'debug-ladder',
        eyebrow: '04 · DEBUG LADDER',
        title: 'Debug in dependency order',
        codeExamples: [
          {
            title: 'Archviz debug ladder',
            label: 'PRODUCTION ORDER',
            code:
              'INPUT\n' +
              '→ PREPROCESSORS\n' +
              '→ BASE GENERATION\n' +
              '→ MASKS / DETAIL\n' +
              '→ PEOPLE / LOCAL MODULES\n' +
              '→ MAIN FLUX\n' +
              '→ UPSCALE / OUTPUT',
            note: 'If an upstream checkpoint is wrong, downstream diagnosis is temporarily meaningless.',
          },
        ],
      },
      {
        id: 'minimal-runtime',
        eyebrow: '05 · MINIMAL REPRODUCTION',
        title: 'Enable the smallest set of modules needed to reproduce the error',
        paragraphs: [
          'BASE CONFIG should let you disable everything that is irrelevant to the failure. If the test concerns a SAM2 mask, there is no reason to run main FLUX and upscale at the same time.',
          'A minimal runtime shortens iteration time and reduces the chance that a secondary branch hides the real source of the problem.',
        ],
      },
      {
        id: 'error-classification',
        eyebrow: '06 · ERROR CLASSIFICATION',
        title: 'Classify the failure before changing parameters',
        table: {
          columns: ['Class', 'Examples', 'First action'],
          rows: [
            ['Dependency', 'missing node / model / loader', 'Check the manifest and paths'],
            ['Type contract', 'IMAGE vs LATENT / missing CONDITIONING', 'Check socket types'],
            ['Spatial contract', 'mask shift / bbox mismatch', 'Check W×H and coordinate space'],
            ['Batch contract', 'index out of bounds / cardinality mismatch', 'Check batch counts'],
            ['Routing', 'wrong source / branch has no effect', 'Check selector + bypass'],
            ['Generation quality', 'anatomy / material / prompt mismatch', 'Only after technical preflight, tune AI parameters'],
          ],
        },
      },
      {
        id: 'dont-tune-blind',
        eyebrow: '07 · ANTI-PATTERN',
        title: 'Do not treat topology failures with generation parameters',
        paragraphs: [
          'If a mask is shifted because of resize, changing denoise will not help. If a selector chose the wrong source, a prompt will not repair the route. If a CLIP input is missing, CFG is irrelevant.',
          'Production debugging starts with architecture and data contracts; generation tuning comes later.',
        ],
      },
      {
        id: 'debug-record',
        eyebrow: '08 · DEBUG RECORD',
        title: 'Preserve the test state for reproducible diagnosis',
        bullets: [
          'Which input was used.',
          'Which modules were enabled in BASE CONFIG.',
          'Effective selector values.',
          'Seed and sampling parameters.',
          'Dimensions and batch at the failing stage.',
          'The last correct checkpoint.',
          'Exact error message / node ID.',
        ],
      },
      {
        id: 'practice',
        eyebrow: '09 · PRACTICE',
        title: 'Practice: deliberately break a branch and localize the failure',
        paragraphs: [
          'Take a small standalone workflow with three checkpoints. Intentionally change one contract — for example, the selector source or mask size. Do not fix it immediately. Walk through the debug ladder and record the first checkpoint where the discrepancy appears.',
        ],
        facts: [
          {
            status: 'inferred',
            title: 'Readiness criterion',
            text: 'A learner has mastered the debugging method when they can name the last correct stage and classify the failure before changing the prompt or sampler.',
          },
        ],
      },
    ],
  },
];
