import type { Chapter } from '../manual-types';

export const hansenTimestampChapters02: Chapter[] = [
  {
    index: 0,
    slug: 'hansen-04-23-people-ppl',
    navTitle: '04:23 · PEOPLE / PPL',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 04:23',
    title: 'PEOPLE / PPL — a dedicated production module, not “magic inside the master”',
    lede:
      'At this timestamp Hansen moves into people. In this manual, the section acts as a bridge to two dedicated PEOPLE workflows: Generate & Place New People and Replace Existing People. The priority here is to understand the shared module contract; implementation details are covered in the specialized chapters.',
    status: 'confirmed',
    statusNote:
      'Video review and source topology confirm separate PPL generation, segmentation, preparation, composite, and return stages. The detailed PEOPLE workflows are documented in dedicated chapters.',
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
        title: 'At 04:23 PEOPLE appears as an independent branch',
        paragraphs: [
          'The PPL branch does not begin by regenerating the entire architectural frame. Person generation and mask preparation exist as separate local stages; the result is then returned to the master scene.',
          'The source route confirms a dedicated PPL prompt 408, person decode 829, Florence2/SAM2 mask chain, preparation, first composite 429, and return through selector 459.',
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
        title: 'The same tools, but two different tasks',
        table: {
          columns: ['Workflow', 'Placement truth', 'What AI does'],
          rows: [
            ['01 · Generate & Place', 'Target region / placement input', 'Creates a new person and places them into the scene'],
            ['02 · Replace Existing', 'Existing 3D/rendered person', 'Changes quality/appearance while preserving the spatial slot'],
          ],
        },
        paragraphs: [
          'A common beginner mistake is to collapse these scenarios into one. In Workflow 01, placement still needs to be created. In Workflow 02, placement already exists and must be preserved.',
        ],
      },
      {
        id: 'core-lesson',
        eyebrow: 'BEGINNER FOUNDATION',
        title: 'The central idea: a local AI module is safer than full-frame regeneration',
        paragraphs: [
          'When the task is local, a production workflow should give AI the smallest useful area of freedom. People are a good example: the architecture remains approved while generation is concentrated on the character and their integration.',
        ],
      },
      {
        id: 'practice',
        eyebrow: 'PRACTICE',
        title: 'Exercise: find PEOPLE boundaries without reading the internal nodes',
        bullets: [
          'Find where PEOPLE receives its person source / prompt.',
          'Find the first image checkpoint of the person as an independent asset.',
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
          'PPL Workflow 01 · Generate & Place — new person, placement defined by target region.',
          'PPL Workflow 02 · Replace Existing — improve a person already positioned in the scene.',
          'Position, Scale & Coordinates — coordinate spaces and positioning.',
          'Selector Logic — how mode 543 drives multiple PPL switches.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'hansen-05-42-workflow-tips',
    navTitle: '05:42 · Workflow Tips',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 05:42',
    title: 'Workflow tips — where to look for truth in a large graph',
    lede:
      'After PEOPLE, the showcase returns to the control/config area. For beginners, this becomes a set of transferable production rules: authoritative controls, linked inputs, selectors, bypass, and checkpoints matter more than incidental widget values inside downstream nodes.',
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
        title: 'The control/config area centralizes decisions',
        paragraphs: [
          'The source graph contains dedicated controls for generation mode, people mode, ControlNet source, working resolution, global seed, shared steps, detail strength, IPAdapter weight, and other production decisions.',
          'These values fan out downstream and drive several branches. It is therefore easier to read the workflow from the control source toward consumers rather than search for repeated settings across the entire canvas.',
        ],
      },
      {
        id: 'authority',
        eyebrow: 'RULE 01',
        title: 'A linked input overrides the local widget',
        paragraphs: [
          'If a widget displays one value but its socket receives a link from a shared control, runtime uses the linked value. The classic example is the PPL selector family: a stored widget may display 2, while linked node 543 with value 1 is the authoritative source.',
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
          'A branch can be physically connected to a selector and still remain unselected. A selected branch may not be required by the current output. And a required branch may return a cached result without full recalculation.',
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
          'If the error is already visible after base decode, changing PEOPLE or upscale is pointless. Production debugging starts at the first incorrect checkpoint, not the last visible symptom.',
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
          'For each one, find at least one downstream consumer and verify whether the input is linked.',
        ],
      },
      {
        id: 'pass',
        eyebrow: 'PASS CRITERIA',
        title: 'When the 05:42 block is understood',
        paragraphs: [
          'When values conflict, you first find the authoritative control and actual route rather than trusting the nearest visible widget.',
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
      'Hansen presents the ControlNet/preprocessor area separately from the sampler. For beginners, this matters: ControlNet is not a checkbox on the model, but an independent chain that creates a control image, selects its source, loads the corresponding ControlNet, and adds structural conditioning to generation.',
    status: 'confirmed',
    statusNote:
      'The source graph confirms Depth and Canny paths, external-vs-preprocessor switch 456, stack order Depth → Canny, and final Apply ControlNet Stack before KSampler.',
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
        title: 'A control image can be imported or generated inside the workflow',
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
          'Node 456 selects the shared source mode: external maps or generated preprocessors. This lets the downstream ControlNet chain remain unchanged when the source changes.',
        ],
      },
      {
        id: 'universal-pattern',
        eyebrow: 'ARCHVIZ FOUNDATION / EXTENSION',
        title: 'The transferable ControlNet architecture',
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
          columns: ['Control', 'Primary signal', 'Archviz use'],
          rows: [
            ['Depth', 'Volume and relative depth', 'Large-scale geometry, perspective, massing'],
            ['Canny / edges', 'Contours and sharp boundaries', 'Thin facade lines, openings, rhythm, edges'],
          ],
        },
        paragraphs: [
          'Depth is therefore often the first structural guardrail, while Canny is added when thin contours need stronger preservation. This is a principle, not a dependency on one specific model.',
        ],
      },
      {
        id: 'debug',
        eyebrow: 'TROUBLESHOOTING',
        title: 'Debug ControlNet before the sampler',
        bullets: [
          'Verify the source image.',
          'Open the preprocess-map preview.',
          'Verify source selector 456.',
          'Verify that the ControlNet model matches the map type.',
          'Verify strength / start / end.',
          'Verify stack order and Apply ControlNet Stack 418.',
          'Only then evaluate the sampler result.',
        ],
      },
      {
        id: 'practice',
        eyebrow: 'PRACTICE',
        title: 'Exercise: explain the Depth branch without naming models',
        paragraphs: [
          'Find the Depth path and describe it as a system: “source → depth map → selector → structural control → conditioning → sampler.” If you can do this without naming the checkpoint, you understand the underlying pattern.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'hansen-07-38-masks-detail-conservation',
    navTitle: '07:38 · Masks & Detail Conservation',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 07:38',
    title: 'Masks & Detail Conservation — limiting generative freedom locally',
    lede:
      'This part of the showcase exposes mask/preprocess/detail branches. The manual connects two foundational skills here: a mask defines WHERE, while detail conservation defines WHAT source information should be restored or preserved after a generative pass.',
    status: 'confirmed',
    statusNote:
      'Source topology confirms the RGB mask system, PEOPLE Florence2/SAM2 masks, architectural Florence2/SAM2 detail mask, and detail-transfer nodes 565/573 controlled by shared strength 720.',
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
            ['PEOPLE semantic mask', '550 → 114 → 115 → 144 → 146', 'People isolation for PPL processing'],
            ['Architectural detail mask', '580 → 584 → 585', 'Building/facade region for conservation/composite'],
          ],
        },
      },
      {
        id: 'mask-definition',
        eyebrow: 'BEGINNER FOUNDATION',
        title: 'A mask is not a decorative image — it is a spatial instruction',
        codeExamples: [
          {
            title: 'Mask question',
            label: 'CORE CONCEPT',
            code: 'MASK = WHERE SHOULD THIS OPERATION APPLY?',
          },
        ],
        paragraphs: [
          'Whenever you encounter MASK in the graph, first determine what white/foreground means and which operation the mask limits: crop, composite, inpaint, detail transfer, or another local process.',
        ],
      },
      {
        id: 'semantic-route',
        eyebrow: 'SEMANTIC MASK',
        title: 'Detection and segmentation are separate stages',
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
        title: 'Detail conservation is controlled return of source information',
        paragraphs: [
          'Node 565 transfers selected source detail into the SDXL result, while 573 performs a similar controlled transfer before main FLUX encode. Both receive shared strength from node 720.',
          'The goal is not to “sharpen everything.” The workflow uses a mask to restore important architectural detail only where it is needed.',
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
        title: 'Mask and image must share coordinate space',
        paragraphs: [
          'If detection runs on a resized image while the local operation receives a different canvas, the mask can shift or scale incorrectly. Source image, resize policy, bbox coordinates, and mask dimensions therefore form one contract.',
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
          'Verify local composite/detail result before the main sampler.',
        ],
      },
      {
        id: 'practice',
        eyebrow: 'PRACTICE',
        title: 'Exercise: for every mask, state “WHERE + WHAT OPERATION”',
        paragraphs: [
          'Choose three masks in Hansen and state two things for each: which spatial region it describes and which downstream operation it constrains. “This is the building mask” is not yet a complete answer.',
        ],
      },
      {
        id: 'pass',
        eyebrow: 'PASS CRITERIA',
        title: 'When the 07:38 lesson is understood',
        paragraphs: [
          'You can distinguish a prepared ID mask, a semantic segmentation mask, and a detail-conservation mask; you understand that a mask does not “improve” anything by itself — it only constrains the next operation spatially.',
        ],
      },
    ],
  },
];
