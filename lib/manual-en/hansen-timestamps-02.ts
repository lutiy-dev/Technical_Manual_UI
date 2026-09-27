import type { Chapter } from '../manual-types';

export const hansenTimestampChapters02: Chapter[] = [
  {
    index: 0,
    slug: 'hansen-04-23-people-ppl',
    navTitle: '04:23 · PEOPLE / PPL',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 04:23',
    title: 'PEOPLE / PPL — a standalone production module, not “magic inside the master”',
    lede:
      'At this timestamp, Hansen moves to people. In this manual, the section acts as a bridge to two dedicated PEOPLE workflows: Generate & Place New People and Replace Existing People. The key here is to understand the shared module contract; implementation details are covered in the specialized chapters.',
    status: 'confirmed',
    statusNote:
      'Video review and source topology confirm separate PPL generation, segmentation, preparation, compositing and return stages. The detailed PEOPLE workflows are documented in dedicated chapters.',
    visual: 'composite',
    category: 'hansen-timestamps',
    stage: 'hansen-04-23',
    relatedNodes: [408, 829, 550, 114, 115, 144, 146, 420, 422, 477, 449, 429, 543, 459, 573, 67, 57, 53],
    relatedChapters: [
      'ppl-workflow-01-generate-place',
      'ppl-workflow-02-replace-existing',
      'positioning',
      'selector-logic',
      'composite',
    ],
    sections: [
      {
        id: 'hansen-original',
        eyebrow: 'HANSEN ORIGINAL',
        title: 'At 04:23, PEOPLE appears as an independent branch',
        paragraphs: [
          'The PPL branch does not begin by regenerating the entire architectural frame. Person generation and mask preparation exist as separate local stages, after which the result returns to the master scene.',
          'The source route confirms a dedicated PPL prompt 408, person decode 829, Florence2/SAM2 mask chain, preparation, first composite 429 and return through selector 459.',
        ],
      },
      {
        id: 'module-contract',
        eyebrow: 'ARCHVIZ FOUNDATION / EXTENSION',
        title: 'Read PEOPLE as one module contract',
        codeExamples: [
          {
            title: 'PEOPLE module sentence',
            label: 'MODULE CONTRACT',
            code:
              'PERSON SOURCE / PROMPT\n' +
              '→ GENERATE OR SELECT PERSON\n' +
              '→ DETECT / SEGMENT\n' +
              '→ PREPARE CUTOUT\n' +
              '→ POSITION / COMPOSITE\n' +
              '→ CHECKPOINT\n' +
              '→ RETURN TO MASTER',
          },
        ],
      },
      {
        id: 'two-workflows',
        eyebrow: 'TWO SPATIAL CONTRACTS',
        title: 'The tools overlap, but the tasks are different',
        table: {
          columns: ['Workflow', 'Placement truth', 'What AI does'],
          rows: [
            ['01 · Generate & Place', 'Target region / placement input', 'Creates a new person and inserts them into the scene'],
            ['02 · Replace Existing', 'Existing 3D/rendered person', 'Improves quality/appearance while preserving the spatial slot'],
          ],
        },
        paragraphs: [
          'A common beginner mistake is to merge these two scenarios mentally. In the first, placement must be created. In the second, placement already exists and must be preserved.',
        ],
      },
      {
        id: 'core-lesson',
        eyebrow: 'BEGINNER FOUNDATION',
        title: 'The key principle: a local AI module is safer than full-frame regeneration',
        paragraphs: [
          'When the task is local, a production workflow should give AI the smallest useful area of freedom. People are a good example: approved architecture remains fixed while generation focuses on the character and its integration.',
        ],
      },
      {
        id: 'practice',
        eyebrow: 'PRACTICE',
        title: 'Exercise: find the boundaries of PEOPLE without reading its internal nodes',
        bullets: [
          'Find where PEOPLE receives its person source / prompt.',
          'Find the first image checkpoint of the isolated person.',
          'Find the segmentation stage.',
          'Find the first composite with the architectural scene.',
          'Find the selector/return after which PEOPLE becomes part of the master route again.',
        ],
      },
      {
        id: 'deep-links',
        eyebrow: 'DEEP DIVE',
        title: 'Where to go after this page',
        bullets: [
          'PPL Workflow 01 · Generate & Place — new person, placement from a target region.',
          'PPL Workflow 02 · Replace Existing — improve a person already placed in the scene.',
          'Position, Scale & Coordinates — coordinate spaces and positioning.',
          'Selector Logic — how mode 543 drives several PPL switches.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'hansen-05-42-workflow-tips',
    navTitle: '05:42 · Workflow Tips',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 05:42',
    title: 'Workflow tips — where to find the source of truth in a large graph',
    lede:
      'After PEOPLE, the showcase returns to the control/config area. For beginners, this section becomes a set of transferable rules for reading production workflows: authoritative controls, linked inputs, selectors, bypass state and checkpoints matter more than incidental widget values inside downstream nodes.',
    status: 'confirmed',
    statusNote:
      'The video frame around 05:42 returns to the control/config sections. The rules below distinguish source-confirmed topology from ARCHVIZ FOUNDATION interpretation.',
    visual: 'controls',
    category: 'hansen-timestamps',
    stage: 'hansen-05-42',
    relatedNodes: [168, 230, 231, 453, 456, 479, 541, 543, 600, 630, 693, 702, 717, 720, 721, 722, 723, 771],
    relatedChapters: [
      'control-panel',
      'workflow-engineering-data-control-plane',
      'workflow-engineering-switches-routing',
      'workflow-engineering-base-config',
      'workflow-engineering-debugging',
    ],
    sections: [
      {
        id: 'hansen-original',
        eyebrow: 'HANSEN ORIGINAL',
        title: 'The control/config area centralizes production decisions',
        paragraphs: [
          'The source graph contains dedicated controls for generation mode, people mode, ControlNet source, working resolution, global seed, shared steps, detail strength, IPAdapter weight and other production decisions.',
          'These values fan out downstream and control multiple branches. Reading the workflow from a control source toward its consumers is therefore more reliable than searching the canvas for duplicated settings.',
        ],
      },
      {
        id: 'authority',
        eyebrow: 'RULE 01',
        title: 'A linked input overrides the local widget',
        paragraphs: [
          'If a widget displays one value but its socket receives a link from a shared control, runtime uses the linked value. A classic example is the PPL selector family: a stored widget may show 2 while linked node 543 with value 1 is the authoritative source.',
        ],
        codeExamples: [
          {
            title: 'Truth hierarchy',
            label: 'CONTROL PLANE',
            code: 'LINKED INPUT > LOCAL WIDGET VALUE',
          },
        ],
      },
      {
        id: 'connected-selected',
        eyebrow: 'RULE 02',
        title: 'CONNECTED ≠ SELECTED ≠ EXECUTED',
        paragraphs: [
          'A branch may be physically connected to a selector but not selected. A selected branch may not be required by the current output. And a required branch may return a cached result without full recomputation.',
        ],
        codeExamples: [
          {
            title: 'Three questions',
            label: 'DEBUG',
            code: 'SELECTED? → REQUIRED? → CACHED?',
          },
        ],
      },
      {
        id: 'bypass-selector',
        eyebrow: 'RULE 03',
        title: 'BYPASS and SELECTOR solve different problems',
        table: {
          columns: ['Mechanism', 'Question'],
          rows: [
            ['BYPASS', 'Should this module participate in processing?'],
            ['SELECTOR / SWITCH', 'Which available data route continues downstream?'],
            ['SHARED CONTROL', 'Which authoritative value drives several consumers?'],
          ],
        },
      },
      {
        id: 'checkpoint-rule',
        eyebrow: 'RULE 04',
        title: 'Do not fix downstream until the upstream checkpoint is proven',
        paragraphs: [
          'If the error is already present after the base decode, changing PEOPLE or upscale is wasted effort. Production debugging starts from the first incorrect checkpoint, not the final visible symptom.',
        ],
      },
      {
        id: 'practice',
        eyebrow: 'PRACTICE',
        title: 'Exercise: find five authoritative controls',
        bullets: [
          'Generation mode 541.',
          'GLOBAL Seed 231.',
          'ControlNet source 456.',
          'PEOPLE mode 543.',
          'Working resolution 702.',
          'For each control, find at least one downstream consumer and verify whether its input is linked.',
        ],
      },
      {
        id: 'pass',
        eyebrow: 'PASS CRITERIA',
        title: 'When the 05:42 lesson is complete',
        paragraphs: [
          'When values conflict, you look for the authoritative control and actual route first rather than trusting the nearest visible widget.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'hansen-06-32-controlnet-preprocessors',
    navTitle: '06:32 · ControlNet / Preprocessors',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 06:32',
    title: 'ControlNet & Preprocessors — structural guidance as its own data pipeline',
    lede:
      'Hansen presents the ControlNet/preprocessor area separately from the sampler. For beginners, this is an important principle: ControlNet is not simply a checkbox attached to a model, but an independent chain that creates a control image, selects its source, loads the matching ControlNet and adds structural conditioning to generation.',
    status: 'confirmed',
    statusNote:
      'The source graph confirms Depth and Canny paths, external-vs-preprocessor switch 456, stack order Depth → Canny and the final Apply ControlNet Stack before KSampler.',
    visual: 'controlnet',
    category: 'hansen-timestamps',
    stage: 'hansen-06-32',
    relatedNodes: [21, 23, 25, 38, 165, 417, 418, 419, 456, 542, 732, 722, 723],
    relatedChapters: [
      'controlnet',
      'inputs',
      'workflow-engineering-data-control-plane',
      'workflow-engineering-module-contracts',
    ],
    sections: [
      {
        id: 'hansen-original',
        eyebrow: 'HANSEN ORIGINAL',
        title: 'Two structural channels: Depth and Canny',
        table: {
          columns: ['Channel', 'Generated source', 'Model', 'Strength'],
          rows: [
            ['Depth', 'DepthAnythingV2Preprocessor 38', 'SDXL Depth ControlNet 21', 'shared control 723 = 0.36'],
            ['Canny / edges', 'Image Edge Detection Filter 165', 'SDXL Canny ControlNet 23', 'shared control 722 = 0.31'],
          ],
        },
        facts: [
          {
            status: 'confirmed',
            title: 'Stack order',
            text: 'Depth stack 417 feeds Canny stack 419; 419 feeds Apply ControlNet Stack 418.',
          },
        ],
      },
      {
        id: 'source-selector',
        eyebrow: 'SOURCE CONTRACT',
        title: 'A control image can come from an external map or be generated inside the workflow',
        codeExamples: [
          {
            title: 'Source routing',
            label: 'CONFIRMED',
            code:
              'BASE IMAGE 79 → PREPROCESSOR\n' +
              '                    ↘\n' +
              'EXTERNAL MAP 25 → SOURCE SWITCH 456 / 542 / 732\n' +
              '                    → CONTROLNET STACK',
          },
        ],
        paragraphs: [
          'Node 456 defines the shared source mode: external maps or generated preprocessors. This allows the downstream ControlNet chain to remain unchanged when the source changes.',
        ],
      },
      {
        id: 'universal-pattern',
        eyebrow: 'ARCHVIZ FOUNDATION / EXTENSION',
        title: 'The reusable ControlNet architecture',
        codeExamples: [
          {
            title: 'ControlNet sentence',
            label: 'MODEL-AGNOSTIC',
            code:
              'SOURCE IMAGE\n' +
              '→ PREPROCESS / EXTERNAL MAP\n' +
              '→ SOURCE SELECTOR\n' +
              '→ CONTROLNET MODEL\n' +
              '→ STRENGTH / START / END\n' +
              '→ APPLY TO CONDITIONING\n' +
              '→ SAMPLER',
          },
        ],
      },
      {
        id: 'depth-vs-canny',
        eyebrow: 'BEGINNER FOUNDATION',
        title: 'Depth and Canny preserve different kinds of information',
        table: {
          columns: ['Control', 'Primary signal', 'ArchViz use'],
          rows: [
            ['Depth', 'Volume and relative depth', 'Major geometry, perspective, massing'],
            ['Canny / edges', 'Contours and hard boundaries', 'Fine facade lines, openings, rhythm, edges'],
          ],
        },
        paragraphs: [
          'Depth is therefore often the first structural guardrail, while Canny can add stronger preservation of fine contours. This is a general principle, not a dependency on one specific model.',
        ],
      },
      {
        id: 'debug',
        eyebrow: 'TROUBLESHOOTING',
        title: 'Debug ControlNet before the sampler',
        bullets: [
          'Verify the source image.',
          'Inspect the preprocessor-map preview.',
          'Verify source selector 456.',
          'Verify the correct ControlNet model for the map type.',
          'Verify strength / start / end.',
          'Verify stack order and Apply ControlNet Stack 418.',
          'Only then evaluate the sampler result.',
        ],
      },
      {
        id: 'practice',
        eyebrow: 'PRACTICE',
        title: 'Exercise: explain the Depth branch without model names',
        paragraphs: [
          'Find the Depth path and describe it as a system: “source → depth map → selector → structural control → conditioning → sampler.” If you can do that without naming a particular checkpoint, you understand the principle.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'hansen-07-38-masks-detail-conservation',
    navTitle: '07:38 · Masks & Detail Conservation',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 07:38',
    title: 'Masks & Detail Conservation — constraining generative freedom locally',
    lede:
      'This part of the showcase exposes mask/preprocess/detail branches. It connects two fundamental skills: a mask defines WHERE an operation may act, while detail conservation defines WHAT source information should be restored or preserved after a generative pass.',
    status: 'confirmed',
    statusNote:
      'Source topology confirms the RGB mask system, PEOPLE Florence2/SAM2 masks, architectural Florence2/SAM2 detail mask and detail-transfer nodes 565/573 controlled by shared strength 720.',
    visual: 'masks-global',
    category: 'hansen-timestamps',
    stage: 'hansen-07-38',
    relatedNodes: [337, 338, 550, 114, 115, 144, 146, 580, 584, 585, 754, 565, 573, 720, 775],
    relatedChapters: [
      'segmentation-masks',
      'detail-conservation',
      'ppl-workflow-01-generate-place',
      'workflow-engineering-coordinates-batch',
    ],
    sections: [
      {
        id: 'three-mask-systems',
        eyebrow: 'HANSEN ORIGINAL',
        title: 'The master graph creates masks in more than one way',
        table: {
          columns: ['Mask system', 'Source', 'Purpose'],
          rows: [
            ['RGB/ID masks', '338 → 337', 'Prepared regions encoded by color'],
            ['PEOPLE semantic mask', '550 → 114 → 115 → 144 → 146', 'Segment people for PPL processing'],
            ['Architectural detail mask', '580 → 584 → 585', 'Building/facade region for conservation/composite'],
          ],
        },
      },
      {
        id: 'mask-definition',
        eyebrow: 'BEGINNER FOUNDATION',
        title: 'A mask is not a picture for display — it is a spatial instruction',
        codeExamples: [
          {
            title: 'Mask question',
            label: 'CORE CONCEPT',
            code: 'MASK = WHERE SHOULD THIS OPERATION APPLY?',
          },
        ],
        paragraphs: [
          'When you encounter a MASK, first determine what white/foreground means and which operation it constrains: crop, composite, inpaint, detail transfer or another local process.',
        ],
      },
      {
        id: 'semantic-route',
        eyebrow: 'SEMANTIC MASK',
        title: 'Detection and segmentation are different stages',
        codeExamples: [
          {
            title: 'Florence2 + SAM2 pattern',
            label: 'UNIVERSAL PATTERN',
            code:
              'IMAGE\n' +
              '→ DETECTION / GROUNDING: WHERE IS THE OBJECT?\n' +
              '→ COORDINATES / BBOX\n' +
              '→ SEGMENTATION: WHICH PIXELS BELONG TO IT?\n' +
              '→ MASK\n' +
              '→ GROW / BLUR\n' +
              '→ LOCAL OPERATION',
          },
        ],
      },
      {
        id: 'detail-conservation',
        eyebrow: 'DETAIL CONSERVATION',
        title: 'Detail conservation is a controlled return of source information',
        paragraphs: [
          'Node 565 transfers selected source detail into the SDXL result, and 573 performs a similar controlled transfer before the main FLUX encode. Both receive shared strength from node 720.',
          'The purpose is not to “sharpen everything.” The workflow uses a mask to restore important architectural detail only where it is needed.',
        ],
        codeExamples: [
          {
            title: 'Conceptual route',
            label: 'DETAIL CONSERVATION',
            code:
              'GENERATED IMAGE\n' +
              '+ SOURCE DETAIL\n' +
              '+ ARCHITECTURAL MASK\n' +
              '+ BLEND STRENGTH\n' +
              '→ CONTROLLED DETAIL RETURN',
          },
        ],
      },
      {
        id: 'coordinate-warning',
        eyebrow: 'DATA CONTRACT',
        title: 'The mask must share coordinate space with the image it controls',
        paragraphs: [
          'If detection ran on a resized image but the local operation receives another canvas, the mask can shift or scale incorrectly. Treat source image, resize policy, bbox coordinates and mask dimensions as one contract.',
        ],
      },
      {
        id: 'debug',
        eyebrow: 'TROUBLESHOOTING',
        title: 'Debug the mask pipeline separately from generation',
        bullets: [
          'Preview the source image.',
          'Preview detection / bbox when available.',
          'Preview the raw segmentation mask.',
          'Preview the mask after grow/blur.',
          'Verify polarity: what is foreground?',
          'Verify dimensions / coordinate space.',
          'Verify the local composite/detail result before the main sampler.',
        ],
      },
      {
        id: 'practice',
        eyebrow: 'PRACTICE',
        title: 'Exercise: describe every mask as “WHERE + WHAT OPERATION”',
        paragraphs: [
          'Choose three masks in the Hansen workflow and state two things for each: which spatial region it describes and which downstream operation it constrains. If the answer is only “this is the building mask,” it is incomplete.',
        ],
      },
      {
        id: 'pass',
        eyebrow: 'PASS CRITERIA',
        title: 'When the 07:38 lesson is complete',
        paragraphs: [
          'You can distinguish a prepared ID mask, a semantic segmentation mask and a detail-conservation mask; you understand that a mask does not improve anything by itself — it constrains the next operation spatially.',
        ],
      },
    ],
  },
];
