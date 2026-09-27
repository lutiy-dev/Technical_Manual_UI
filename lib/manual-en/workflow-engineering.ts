import type { Chapter } from '../manual-types';

export const workflowEngineeringChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-overview',
    navTitle: 'Workflow Engineering Overview',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'Graph architecture first, generative nodes second, practice third',
    lede:
      'ComfyUI becomes understandable when you first learn to read the language of the graph, then recognize recurring workflow patterns, and only after that begin designing large, controllable systems. This section establishes that foundation before the Hansen workflow is analyzed in depth.',
    status: 'confirmed',
    statusNote:
      'This methodology is the required structure of the course: graph architecture → generative systems → practice labs.',
    visual: 'graph-reading',
    category: 'workflow-engineering',
    stage: 'workflow-engineering-foundation',
    relatedChapters: [
      'workflow-engineering-node-literacy',
      'workflow-engineering-graph-literacy',
      'workflow-engineering-base-config',
      'graph-reading',
      'inputs',
      'control-panel',
      'models-dependencies',
      'sdxl',
      'people-ppl-overview',
    ],
    sections: [
      {
        id: 'why-this-exists',
        eyebrow: '01 · WHY',
        title: 'Why large ComfyUI graphs feel difficult to understand',
        paragraphs: [
          'Most tutorials begin with generative nodes: loaders, encoders, samplers, ControlNet, and VAE. What is often missing is the language of the graph itself — data types, routes, states, selectors, modules, and return points.',
          'As a result, a production workflow can look like hundreds of disconnected boxes and wires. To its author, however, the same graph is usually a small set of larger systems: a control plane, a data plane, generative modules, diagnostic checkpoints, and output routes.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Core learning sequence',
            text: 'Graph architecture first, generative nodes second, practice third.',
          },
          {
            status: 'inferred',
            title: 'Learning analogy',
            text: 'You cannot read a production workflow with confidence until you know its “alphabet”: data types, sockets, links, and basic graph patterns.',
          },
        ],
      },
      {
        id: 'three-levels',
        eyebrow: '02 · THREE LEVELS OF LITERACY',
        title: 'From individual elements to the language of workflows',
        table: {
          columns: ['Level', 'What you learn', 'Outcome'],
          rows: [
            [
              'LEVEL 1 · Node Literacy',
              'IMAGE, MASK, LATENT, MODEL, CLIP, CONDITIONING, VAE, STRING, INT, FLOAT, sockets, and links',
              'You understand exactly what enters and leaves each node',
            ],
            [
              'LEVEL 2 · Graph Literacy',
              'Loader → Encoder → Sampler → Decode; Image → Preprocessor → ControlNet; Detection → Segmentation → Mask',
              'You recognize standard graph patterns rather than isolated nodes',
            ],
            [
              'LEVEL 3 · Workflow Engineering',
              'BASE CONFIG, groups, control plane, modules, contracts, selectors, checkpoints, return points, reproducibility',
              'You can design and diagnose a large production graph',
            ],
          ],
        },
      },
      {
        id: 'professional-workflow',
        eyebrow: '03 · SYSTEM THINKING',
        title: 'A collection of nodes is not yet a workflow',
        paragraphs: [
          'A set of connected nodes may generate an image, but a production workflow requires architecture: a clear input, a controllable route, modules with defined responsibilities, diagnostic ports, and a predictable output.',
          'The purpose of Workflow Engineering is to turn the ComfyUI canvas from a “web of wires” into a system that can be read, tested, extended, and handed off to another person.',
        ],
        codeExamples: [
          {
            title: 'Production module pattern',
            label: 'WORKFLOW ENGINEERING',
            code:
              'BASE CONFIG\n' +
              '→ INPUT CONTRACT\n' +
              '→ MODULE ENABLE / BYPASS\n' +
              '→ PROCESS\n' +
              '→ CHECKPOINT\n' +
              '→ SELECTOR / RETURN\n' +
              '→ OUTPUT CONTRACT',
            note: 'This is an architectural pattern, not a specific generative branch.',
          },
        ],
      },
      {
        id: 'base-config',
        eyebrow: '04 · BASE CONFIG',
        title: 'BASE CONFIG is the control plane of a large graph',
        paragraphs: [
          'BASE CONFIG should be treated as the central control panel of the workflow, not as a decorative group. It determines which major branches are active, which are bypassed, and which runtime profile is assembled from the available modules.',
          'Numeric controls and selectors answer a different question: how an already active branch behaves. Enable/bypass logic and parameter controls should therefore remain conceptually separate.',
        ],
        bullets: [
          'MODEL LOADERS',
          'INPUTS',
          'CONTROL',
          'SAMPLER CONFIGURATION',
          'ControlNet PREPROCESSORS + EXTRAS',
          'MASKS',
          'PEOPLE / PPL sub-branches',
          'Process SEGMENTATION / SDXL / FLUX / UPSCALE / ADD LOGO',
          'OUTPUT',
        ],
      },
      {
        id: 'modules-contracts',
        eyebrow: '05 · MODULES & CONTRACTS',
        title: 'Every branch should have a clear input and output',
        paragraphs: [
          'A professional graph is easier to understand when each major task is treated as a module: ControlNet, SDXL, PEOPLE, FLUX, UPSCALE, and OUTPUT. A module should clearly expose the data types it receives and what it returns downstream.',
          'That Input / Output contract makes it possible to study a branch in isolation, test it independently, and later assemble a Master Workflow from compatible building blocks.',
        ],
        codeExamples: [
          {
            title: 'Module contract',
            label: 'GENERIC',
            code:
              'INPUTS\n' +
              '→ MODULE\n' +
              '→ CHECKPOINT\n' +
              '→ RESULT\n' +
              '→ RETURN TO NEXT MODULE',
          },
        ],
      },
      {
        id: 'diagnostics',
        eyebrow: '06 · CHECKPOINTS',
        title: 'A large workflow must be observable',
        paragraphs: [
          'Preview and comparer nodes should function as diagnostic ports. Inspecting only the final output is not useful if you do not know where the result stopped being correct.',
          'The basic diagnostic rule is simple: validate the current checkpoint before moving to the next one.',
        ],
        codeExamples: [
          {
            title: 'Diagnostic ladder',
            label: 'PRACTICE RULE',
            code:
              'INPUT\n' +
              '→ PREPROCESS CHECKPOINT\n' +
              '→ GENERATION CHECKPOINT\n' +
              '→ MASK / LOCAL CHECKPOINT\n' +
              '→ COMPOSITE CHECKPOINT\n' +
              '→ FINAL PROCESS CHECKPOINT\n' +
              '→ OUTPUT',
          },
        ],
      },
      {
        id: 'reproducibility',
        eyebrow: '07 · REPRODUCIBILITY',
        title: 'A professional experiment must be reproducible',
        paragraphs: [
          'Seed, model, prompt, sampler, scheduler, steps, denoise, resolution, and effective selector values together define an experiment configuration. If several parameters are changed at once, you can no longer prove which change improved or degraded the result.',
        ],
        bullets: [
          'Record the seed and effective linked values.',
          'Change one variable per test.',
          'Save checkpoints, not only the final image.',
          'Separate runtime facts from topology-based assumptions.',
        ],
      },
      {
        id: 'course-map',
        eyebrow: '08 · COURSE ARCHITECTURE',
        title: 'How the complete manual is structured',
        table: {
          columns: ['Part', 'Purpose'],
          rows: [
            ['PART I · Workflow Engineering', 'The graph alphabet, architecture, BASE CONFIG, contracts, and debugging'],
            ['PART II · Generative Systems', 'SDXL, FLUX, ControlNet, Florence2, SAM2, masks, composite, and upscale'],
            ['PART III · Hansen by Timestamps', 'A production workflow analyzed directly against the video timeline'],
            ['PART IV · Practice Labs', 'Standalone JSON exercises for independent branches, hands-on practice, and QC'],
            ['PART V · Master Build', 'Reassembling the learned modules into a large, controllable workflow'],
          ],
        },
      },
      {
        id: 'practice',
        eyebrow: '09 · FIRST PRACTICE',
        title: 'First exercise: learn to read the route before studying the model',
        bullets: [
          'Open any small ComfyUI workflow.',
          'Do not begin by looking at model names.',
          'Identify the input and output data type of every node.',
          'Find the beginning of the data plane and the final output.',
          'Divide the graph into 3–5 functional modules.',
          'Mark at least one checkpoint between modules.',
        ],
        facts: [
          {
            status: 'inferred',
            title: 'Exercise objective',
            text: 'Learn to see the structure before attention shifts to specific models and generation parameters.',
          },
        ],
      },
    ],
  },
];
