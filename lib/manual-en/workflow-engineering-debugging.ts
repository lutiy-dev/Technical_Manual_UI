import type { Chapter } from '../manual-types';

export const workflowEngineeringDebuggingChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-debugging',
    navTitle: 'Checkpoints & Debugging',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'Checkpoints & Debugging — finding the last provably correct stage',
    lede:
      'A large workflow cannot be diagnosed from the final image alone. Reliable debugging is a ladder of checkpoints: after each meaningful module there should be an observable result that tells you exactly where the pipeline stopped being correct.',
    status: 'confirmed',
    statusNote:
      'This method matches the documented Hansen probes: preprocessors, SDXL, masks, PEOPLE, main FLUX and output all expose intermediate preview/comparer points.',
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
        title: 'If a module cannot be observed independently, it is difficult to debug',
        paragraphs: [
          'PreviewImage, MaskPreview, comparer, text/json preview and save probes are not decorative. They create observability: the ability to inspect data before it becomes mixed with the next system.',
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
        title: 'The key debugging question: where is the last correct result?',
        paragraphs: [
          'Do not begin with “why is the final image wrong?” Start at the end and move upstream until you reach the last checkpoint that looks correct and behaves correctly in the graph.',
          'The next stage becomes the first suspect. This reduces the search space from hundreds of nodes to one branch.',
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
        title: 'Different data types need different probes',
        table: {
          columns: ['Data', 'Checkpoint', 'What to verify'],
          rows: [
            ['IMAGE', 'PreviewImage / comparer', 'pixels, composition, color, geometry'],
            ['MASK', 'MaskPreview', 'silhouette, polarity, holes, bounds'],
            ['BBOX / JSON', 'text/json preview', 'coordinates, count, labels'],
            ['STRING', 'text preview', 'assembled prompt / control text'],
            ['LATENT', 'usually a decode-only debug path', 'visual result after VAE Decode'],
            ['OUTPUT FILE', 'SaveImage + actual file check', 'whether the delivery path really worked'],
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
        title: 'Enable the smallest set of modules that reproduces the problem',
        paragraphs: [
          'BASE CONFIG should allow everything unrelated to the failure to be disabled. If you are testing a SAM2 mask, there is no reason to run main FLUX and upscale at the same time.',
          'A minimal runtime speeds up iteration and reduces the chance that a side branch hides the real source of the failure.',
        ],
      },
      {
        id: 'error-classification',
        eyebrow: '06 · ERROR CLASSIFICATION',
        title: 'Classify the failure before changing parameters',
        table: {
          columns: ['Class', 'Examples', 'First action'],
          rows: [
            ['Dependency', 'missing node / model / loader', 'Check manifest and paths'],
            ['Type contract', 'IMAGE vs LATENT / missing CONDITIONING', 'Check socket types'],
            ['Spatial contract', 'mask shift / bbox mismatch', 'Check W×H and coordinate space'],
            ['Batch contract', 'index out of bounds / cardinality mismatch', 'Check batch counts'],
            ['Routing', 'wrong source / branch has no effect', 'Check selector + bypass'],
            ['Generation quality', 'anatomy / material / prompt mismatch', 'Tune AI parameters only after the technical preflight passes'],
          ],
        },
      },
      {
        id: 'dont-tune-blind',
        eyebrow: '07 · ANTI-PATTERN',
        title: 'Do not treat topology problems with generation parameters',
        paragraphs: [
          'If a mask is shifted because of a resize mismatch, changing denoise will not help. If a selector chose the wrong source, the prompt cannot repair the route. If CLIP input is missing, CFG is irrelevant.',
          'Production debugging starts with architecture and data contracts, then moves to generation tuning.',
        ],
      },
      {
        id: 'debug-record',
        eyebrow: '08 · DEBUG RECORD',
        title: 'Record the test state so debugging can be repeated',
        bullets: [
          'Which input was used.',
          'Which modules are enabled in BASE CONFIG.',
          'Effective selector values.',
          'Seed and sampling parameters.',
          'Dimensions and batch at the failing stage.',
          'Last correct checkpoint.',
          'Exact error message / node ID.',
        ],
      },
      {
        id: 'practice',
        eyebrow: '09 · PRACTICE',
        title: 'Practice: break a branch deliberately and localize the fault',
        paragraphs: [
          'Take a small standalone workflow with three checkpoints. Deliberately break one contract — for example the selector source or mask size. Do not fix it immediately. Walk the debug ladder and record the first checkpoint where the result diverges.',
        ],
        facts: [
          {
            status: 'inferred',
            title: 'Readiness criterion',
            text: 'A learner has internalized debugging when they can name the last correct stage and the class of failure before changing the prompt or sampler.',
          },
        ],
      },
    ],
  },
];
