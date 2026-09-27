import type { Chapter } from '../manual-types';

export const workflowEngineeringBaseConfigChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-base-config',
    navTitle: 'BASE CONFIG / Control Plane',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'BASE CONFIG — the central control panel of a professional graph',
    lede:
      'A large ComfyUI workflow becomes manageable only when its major processing systems can be enabled, bypassed and tested from one place. BASE CONFIG is the graph’s control plane: it defines which modules participate in the current runtime profile.',
    status: 'confirmed',
    statusNote:
      'The BASE CONFIG structure and the controlled group list are confirmed from the Hansen workflow / video; debug presets and naming recommendations are presented as engineering practice.',
    visual: 'controls',
    category: 'workflow-engineering',
    stage: 'base-config',
    relatedChapters: [
      'workflow-engineering-overview',
      'workflow-engineering-node-literacy',
      'workflow-engineering-graph-literacy',
      'control-panel',
      'models-dependencies',
      'workflow-engineering-data-control-plane',
    ],
    sections: [
      {
        id: 'control-plane-role',
        eyebrow: '01 · ROLE',
        title: 'BASE CONFIG answers the question: “what runs at all?”',
        paragraphs: [
          'In a large production graph, changing CFG, denoise or steps is not enough. First you must decide which major systems participate in the current run: loaders, inputs, preprocessors, masks, PEOPLE, SDXL, FLUX, upscale and output.',
          'BASE CONFIG centralizes that decision. It does not replace per-node parameters; it sits one architectural level above them and controls the state of the workflow.',
        ],
        codeExamples: [
          {
            title: 'Two levels of control',
            label: 'WORKFLOW ENGINEERING',
            code:
              'BASE CONFIG = WHAT RUNS\n' +
              'Controls / Widgets = HOW IT RUNS',
            note: 'Do not mix enable/bypass logic with strength, denoise, steps, seed and similar parameters.',
          },
        ],
      },
      {
        id: 'hansen-groups',
        eyebrow: '02 · HANSEN BASE CONFIG',
        title: 'Which Hansen processing groups are controlled centrally',
        table: {
          columns: ['Group toggle', 'Purpose'],
          rows: [
            ['MODEL LOADERS', 'Load checkpoints, UNet, CLIP, VAE and other models'],
            ['INPUTS', 'Base image, references, maps and other input data'],
            ['CONTROL', 'Shared controls / selectors / global parameters'],
            ['SAMPLER CONFIGURATION', 'Seed, steps, sampler, scheduler and related settings'],
            ['ControlNet Preprocessors + Extras', 'Depth, edge and supporting preprocessing'],
            ['MASKS', 'Architectural and local masks'],
            ['PPL FLUX Generate', 'Separate people generation'],
            ['PPL SEGMENTATION', 'People detection / segmentation'],
            ['PPL FLUX Composite', 'People preparation and compositing'],
            ['PPL 3D INPAINT Detail', 'Alternative branch for people already placed in the scene'],
            ['Process SEGMENTATION', 'General segmentation processing'],
            ['Process SDXL', 'Main SDXL stage'],
            ['Process FLUX', 'Main FLUX refinement'],
            ['Process UPSCALE', 'Upscale / HQ processing'],
            ['Process ADD LOGO', 'Overlay / logo post-process'],
            ['OUTPUT', 'Preview / save / delivery stage'],
          ],
        },
      },
      {
        id: 'bypass-vs-selector',
        eyebrow: '03 · EXECUTION STATES',
        title: 'Bypassed, selected away and disabled are not the same state',
        paragraphs: [
          'In a large graph, distinguish physical connectivity, result selection and actual processing. Otherwise a connected branch can easily be mistaken for a branch that contributes to the current output.',
        ],
        table: {
          columns: ['State', 'What happens', 'How to interpret it'],
          rows: [
            ['ACTIVE', 'The group executes and its output is required downstream', 'Participates in runtime'],
            ['BYPASSED', 'Processing remains in the graph but is skipped', 'Architecture exists; computation is off'],
            ['SELECTED AWAY', 'The branch may be active, but a selector chooses another source', 'Does not affect the current result'],
            ['DIAGNOSTIC ONLY', 'The result goes to a preview/comparer rather than production output', 'Used for observation'],
          ],
        },
      },
      {
        id: 'fast-groups-bypasser',
        eyebrow: '04 · FAST GROUPS BYPASSER',
        title: 'Centralized bypass turns groups into controllable modules',
        paragraphs: [
          'The purpose of Fast Groups Bypasser is to avoid running around the canvas disabling dozens of nodes manually. Named groups are controlled from a single panel, which makes group names part of the workflow’s architectural API.',
          'This leads to an important rule: group names must be stable and unambiguous. When the control plane addresses groups by name, ad-hoc renaming reduces readability and can break control behavior.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Hansen pattern',
            text: 'In the video, BASE CONFIG is used as a single enable/bypass panel for major workflow groups.',
          },
          {
            status: 'inferred',
            title: 'Engineering rule',
            text: 'Treat a group name as part of the module interface: concise, stable, and descriptive of function rather than editing history.',
          },
        ],
      },
      {
        id: 'naming-standard',
        eyebrow: '05 · NAMING',
        title: 'Group names should describe responsibility, not author or version history',
        table: {
          columns: ['Weak', 'Better'],
          rows: [
            ['group 1', 'INPUTS'],
            ['test2', 'CONTROLNET · DEPTH'],
            ['new final', 'PROCESS · FLUX'],
            ['people stuff', 'PPL · SEGMENTATION'],
            ['final final', 'OUTPUT'],
          ],
        },
        codeExamples: [
          {
            title: 'Recommended pattern',
            label: 'NAMING CONVENTION',
            code:
              'DOMAIN · STAGE · PURPOSE\n\n' +
              'PPL · 01 GENERATE\n' +
              'PPL · 02 SEGMENT\n' +
              'PPL · 03 PREPARE\n' +
              'PPL · 04 COMPOSITE',
          },
        ],
      },
      {
        id: 'dependency-order',
        eyebrow: '06 · DEPENDENCIES',
        title: 'Groups should be enabled by dependency chain, not at random',
        paragraphs: [
          'Modules have dependencies. PROCESS FLUX is meaningless to test when its input has not been produced by the previous stage. PPL Composite cannot work without a prepared person and placement data. BASE CONFIG should therefore be read as a dependency map, not a list of independent switches.',
        ],
        codeExamples: [
          {
            title: 'Typical order',
            label: 'CONTROL PLANE',
            code:
              'MODEL LOADERS\n' +
              '→ INPUTS\n' +
              '→ CONTROL / SAMPLER CONFIG\n' +
              '→ PREPROCESSORS / MASKS\n' +
              '→ GENERATION MODULES\n' +
              '→ LOCAL MODULES\n' +
              '→ FINAL PROCESS\n' +
              '→ OUTPUT',
          },
        ],
      },
      {
        id: 'debug-presets',
        eyebrow: '07 · DEBUG PROFILES',
        title: 'A professional BASE CONFIG should support minimal test profiles',
        paragraphs: [
          'Debugging does not require the entire Master Workflow to run. The fewer systems that are active, the easier it is to isolate the source of an error — and the lower the VRAM and time cost.',
        ],
        table: {
          columns: ['Preset', 'Keep active', 'Purpose'],
          rows: [
            ['TEST INPUT ONLY', 'Loaders + Inputs + Preview', 'Verify files, dimensions and canvas'],
            ['TEST PREPROCESS', 'Inputs + required preprocessor + Preview', 'Verify depth / edge / map before generation'],
            ['TEST MASKS ONLY', 'Inputs + segmentation/masks + Preview', 'Verify polarity, bounds and coordinate space'],
            ['TEST PPL ONLY', 'PPL Generate + Segment + Composite + local previews', 'Isolate the PEOPLE module'],
            ['TEST SDXL ONLY', 'Loaders + Inputs + SDXL + checkpoint preview', 'Verify base generation'],
            ['TEST FLUX ONLY', 'Prepared input + FLUX + preview', 'Verify final refinement'],
            ['FINAL FULL RUN', 'All approved production modules', 'Final integration run'],
          ],
        },
        facts: [
          {
            status: 'inferred',
            title: 'Debug principle',
            text: 'Enable the smallest route that can reproduce the problem; restore downstream modules only after the issue is resolved.',
          },
        ],
      },
      {
        id: 'resource-control',
        eyebrow: '08 · RESOURCES',
        title: 'BASE CONFIG also controls the cost of a run',
        paragraphs: [
          'Disabling a heavy branch is not only about visual cleanliness. It avoids loading unnecessary models, keeping unused preprocessors in memory, and executing downstream work that is not part of the current test.',
          'This is especially important on GPUs with limited VRAM: architectural control of the graph becomes part of performance engineering.',
        ],
      },
      {
        id: 'practice',
        eyebrow: '09 · PRACTICE',
        title: 'Practice: design BASE CONFIG before adding generative nodes',
        paragraphs: [
          'Create an empty training canvas and draw only these groups first: MODEL LOADERS, INPUTS, CONTROL, PREPROCESS, MASKS, PROCESS A, PROCESS B, OUTPUT. Then write down which groups must be active for three modes: Input Test, Module Test and Full Run.',
          'No AI model is required for this exercise. The goal is to learn to design the control plane before the graph becomes large.',
        ],
        codeExamples: [
          {
            title: 'Future standalone lab',
            label: 'PLANNED JSON',
            code: 'HANSEN_00_BASE_CONFIG_PRO_GRAPH_v01.json',
            note: 'The standalone training JSON will contain groups, bypass/control logic, demo branches, debug profiles and notes only — no generative models.',
          },
        ],
      },
    ],
  },
];
