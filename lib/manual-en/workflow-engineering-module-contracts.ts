import type { Chapter } from '../manual-types';

export const workflowEngineeringModuleContractsChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-module-contracts',
    navTitle: 'Modules & I/O Contracts',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'Modules & Input/Output Contracts — designing branches as replaceable building blocks',
    lede:
      'A professional workflow is easier to build and maintain when every major branch has one responsibility, explicit inputs, a defined output, and an independent checkpoint. The Master Workflow then becomes a system of modules rather than a monolith.',
    status: 'confirmed',
    statusNote:
      'This modular approach matches the documented Hansen architecture: SDXL, masks, PEOPLE/PPL, main FLUX, and output form distinct functional branches with merge and return points.',
    visual: 'graph-reading',
    category: 'workflow-engineering',
    stage: 'module-contracts',
    relatedChapters: [
      'workflow-engineering-data-control-plane',
      'workflow-engineering-base-config',
      'people-ppl-overview',
      'main-flux',
      'workflow-engineering-coordinates-batch',
    ],
    sections: [
      {
        id: 'what-is-module',
        eyebrow: '01 · MODULE',
        title: 'A module is a complete responsibility, not merely a colored frame',
        paragraphs: [
          'A group becomes an engineering module only when its task can be stated in one sentence, its required inputs can be listed, and one or more expected outputs can be named.',
          'A good module can be temporarily separated from the Master Workflow, supplied with test inputs, executed, and judged independently.',
        ],
        codeExamples: [
          {
            title: 'Minimum module formula',
            label: 'MODULE CONTRACT',
            code:
              'KNOWN INPUTS\n' +
              '→ ONE RESPONSIBILITY\n' +
              '→ CHECKPOINT\n' +
              '→ KNOWN OUTPUTS',
          },
        ],
      },
      {
        id: 'input-contract',
        eyebrow: '02 · INPUT CONTRACT',
        title: 'The input contract defines what a module is allowed to expect',
        paragraphs: [
          'A branch should not rely on hidden assumptions. If a module requires a 1536 px IMAGE, a MASK on the same canvas, a MODEL from a specific family, and a FLOAT denoise value, those requirements should be explicit before the module is connected.',
          'An input contract covers more than socket type. It also defines data shape: dimensions, batch, coordinate space, polarity, model family, and whether a parameter is required or optional.',
        ],
        table: {
          columns: ['Contract field', 'Example'],
          rows: [
            ['Type', 'IMAGE / MASK / LATENT / MODEL'],
            ['Dimensions', '1536 × 1024'],
            ['Batch', '1 image / N masks'],
            ['Coordinate space', 'Same as BASE IMAGE'],
            ['Model family', 'SDXL / FLUX-compatible'],
            ['Required / optional', 'BASE IMAGE required; reference optional'],
          ],
        },
      },
      {
        id: 'output-contract',
        eyebrow: '03 · OUTPUT CONTRACT',
        title: 'The output contract defines what downstream can safely consume',
        paragraphs: [
          'An output should be usable by the next module without guesswork. If the PEOPLE branch returns a composited IMAGE on the same canvas, downstream FLUX can treat it as a predictable source. If the branch returns a crop at a different size, that is a different contract.',
        ],
        codeExamples: [
          {
            title: 'PEOPLE contract example',
            label: 'PPL MODULE',
            code:
              'INPUT:\n' +
              'BASE IMAGE + PPL prompt + placement data\n\n' +
              'PROCESS:\n' +
              'Generate → Segment → Prepare → Composite\n\n' +
              'OUTPUT:\n' +
              'COMPOSITED IMAGE · same scene canvas',
          },
        ],
      },
      {
        id: 'return-contract',
        eyebrow: '04 · RETURN CONTRACT',
        title: 'The return point is the official exit from a branch back into the Master Workflow',
        paragraphs: [
          'A complex branch should expose one clearly readable return point. This is where the local task is complete and the result becomes part of the main data plane again.',
          'Marking the return point explicitly makes standalone JSON extraction, debugging, and implementation replacement easier without forcing downstream reconstruction.',
        ],
        codeExamples: [
          {
            title: 'Modular route',
            label: 'RETURN CONTRACT',
            code:
              'MASTER SOURCE\n' +
              '→ MODULE INPUT\n' +
              '→ LOCAL PROCESSING\n' +
              '→ MODULE OUTPUT / RETURN\n' +
              '→ MASTER DOWNSTREAM',
          },
        ],
      },
      {
        id: 'single-responsibility',
        eyebrow: '05 · RESPONSIBILITY',
        title: 'One module, one primary responsibility',
        table: {
          columns: ['Module', 'Responsibility'],
          rows: [
            ['CONTROLNET', 'Create / apply geometry guidance'],
            ['SDXL', 'Produce a base generation / img2img result'],
            ['MASKS', 'Define protected / editable regions'],
            ['PPL', 'Generate or replace people and return the composite'],
            ['MAIN FLUX', 'Perform controlled final refinement'],
            ['UPSCALE', 'Increase output resolution while preserving consistency'],
            ['OUTPUT', 'Save / display the delivery result'],
          ],
        },
      },
      {
        id: 'hidden-dependencies',
        eyebrow: '06 · HIDDEN DEPENDENCIES',
        title: 'A hidden dependency makes a “standalone” module falsely independent',
        paragraphs: [
          'A branch may look isolated yet still depend on a seed, size, prompt fragment, or model object from a distant part of the Master Workflow. Before extraction, every external link of this kind must be identified.',
          'A standalone JSON is truly independent only when each required external dependency has been replaced by a local input/control/loader or explicitly documented in the contract.',
        ],
        facts: [
          {
            status: 'inferred',
            title: 'Extraction rule',
            text: 'Before exporting a branch, list every incoming link that crosses the selected group boundary. Each one must become a local dependency or an explicit input.',
          },
        ],
      },
      {
        id: 'module-checkpoint',
        eyebrow: '07 · MODULE CHECKPOINT',
        title: 'Every module needs its own verifiable result',
        paragraphs: [
          'If the only preview sits at the very end of the Master Workflow, it is difficult to identify which module failed. A module output should therefore expose a Preview / MaskPreview / comparer or another diagnostic probe locally.',
        ],
        codeExamples: [
          {
            title: 'Checkpoint pattern',
            label: 'OBSERVABILITY',
            code:
              'MODULE INPUT\n' +
              '→ PROCESS\n' +
              '→ LOCAL CHECKPOINT\n' +
              '→ RETURN',
          },
        ],
      },
      {
        id: 'lego-master',
        eyebrow: '08 · MASTER BUILD',
        title: 'The Master Workflow should assemble like LEGO from known modules',
        codeExamples: [
          {
            title: 'High-level architecture',
            label: 'ARCHVIZ MASTER',
            code:
              'INPUT\n' +
              '→ CONTROLNET MODULE\n' +
              '→ SDXL MODULE\n' +
              '→ DETAIL / MASK MODULES\n' +
              '→ PEOPLE MODULE\n' +
              '→ FLUX MODULE\n' +
              '→ UPSCALE MODULE\n' +
              '→ OUTPUT',
          },
        ],
      },
      {
        id: 'practice',
        eyebrow: '09 · PRACTICE',
        title: 'Practice: write a contract for one familiar branch',
        bullets: [
          'Choose one branch from the current workflow.',
          'State its responsibility in one sentence.',
          'List every external incoming link.',
          'For each input, record type, size/batch, and required/optional status.',
          'Name one official output/return point.',
          'Add a checkpoint immediately before return.',
          'Verify that the upstream can be replaced with test inputs and the branch can run independently.',
        ],
      },
    ],
  },
];
