import type { Chapter } from '../manual-types';

export const workflowEngineeringModuleContractsChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-module-contracts',
    navTitle: 'Modules & I/O Contracts',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'Modules & Input/Output Contracts — designing branches as replaceable building blocks',
    lede:
      'A professional workflow is easier to build and maintain when every major branch has one responsibility, explicit inputs, a predictable output and an independent checkpoint. The Master Workflow then becomes a system of modules rather than a monolith.',
    status: 'confirmed',
    statusNote:
      'The modular approach matches the documented Hansen structure: SDXL, masks, PEOPLE/PPL, main FLUX and output form separate functional branches with clear merge and return points.',
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
        title: 'A module is a complete responsibility, not just a colored frame',
        paragraphs: [
          'A group becomes an engineering module only when its purpose can be stated in one sentence, its required inputs can be listed, and one or more expected outputs can be named.',
          'A good module can be temporarily separated from the Master Workflow, fed with test inputs, and evaluated independently.',
        ],
        codeExamples: [
          {
            title: 'Minimal module formula',
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
          'A branch should not rely on hidden assumptions. If a module requires an IMAGE at 1536 px, a MASK on the same canvas, a MODEL from a specific family and a FLOAT denoise value, that contract should be explicit before integration.',
          'An input contract includes more than the socket type: dimensions, batch, coordinate space, polarity, model family, and whether the parameter is required or optional all matter.',
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
          'An output should be usable by the next module without guesswork. If the PEOPLE branch returns a composited IMAGE on the same canvas, downstream FLUX can consume it as a predictable source. If the branch returns a crop at a different size, that is a different contract.',
        ],
        codeExamples: [
          {
            title: 'Example PEOPLE contract',
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
        title: 'The return point is the branch’s official exit back into the Master Workflow',
        paragraphs: [
          'A complex branch should have one clearly readable return point. This is where the local task is complete and its result becomes part of the main data plane again.',
          'Marking the return point explicitly makes standalone extraction, debugging and implementation replacement easier without forcing downstream reconstruction.',
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
        title: 'One module — one primary responsibility',
        table: {
          columns: ['Module', 'Responsibility'],
          rows: [
            ['CONTROLNET', 'Create / apply geometry guidance'],
            ['SDXL', 'Produce base generation / img2img result'],
            ['MASKS', 'Define protected / editable regions'],
            ['PPL', 'Create or replace people and return a composite'],
            ['MAIN FLUX', 'Perform controlled final refinement'],
            ['UPSCALE', 'Increase output resolution while preserving consistency'],
            ['OUTPUT', 'Save / preview the delivery result'],
          ],
        },
      },
      {
        id: 'hidden-dependencies',
        eyebrow: '06 · HIDDEN DEPENDENCIES',
        title: 'A hidden dependency makes a “standalone” module misleading',
        paragraphs: [
          'If a branch looks isolated but relies on a seed, size, prompt fragment or model object from a distant part of the Master Workflow, it is not actually autonomous. Before extraction, identify every external link that crosses the intended module boundary.',
          'A standalone JSON is independent only when every required external dependency has been replaced by a local input/control/loader or explicitly documented in the contract.',
        ],
        facts: [
          {
            status: 'inferred',
            title: 'Extraction rule',
            text: 'Before exporting a branch, list every incoming link that crosses the selected group boundary. Each link must become either a local dependency or an explicit input.',
          },
        ],
      },
      {
        id: 'module-checkpoint',
        eyebrow: '07 · MODULE CHECKPOINT',
        title: 'Every module should expose its own provable result',
        paragraphs: [
          'If the only preview is at the very end of the Master Workflow, it is difficult to identify which module failed. A local module output should therefore have a Preview / MaskPreview / comparer or another diagnostic probe.',
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
          'State its responsibility in one line.',
          'List every external incoming link.',
          'For each input, record type, size/batch and required/optional status.',
          'Name one official output / return point.',
          'Add a checkpoint immediately before return.',
          'Verify that upstream can be replaced with test inputs and the branch can run independently.',
        ],
      },
    ],
  },
];
