import type { Chapter } from '../manual-types';

export const hansenTimestampChapters01: Chapter[] = [
  {
    index: 0,
    slug: 'hansen-00-39-production-method',
    navTitle: '00:39 · Production Method',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 00:39',
    title: 'How to read a large workflow: production method first, nodes second',
    lede:
      'At the start of the showcase, Hansen presents the workflow as a system of stages rather than one long chain. For a beginner, this is the key shift in thinking: identify the major areas of responsibility first, understand the route between them next, and only then inspect individual nodes.',
    status: 'confirmed',
    statusNote:
      'The 00:39 video frame shows the entire canvas with major sections I–VI; source topology confirms a continuous production path from BASE IMAGE through SDXL, PEOPLE/PPL, FLUX and final output.',
    visual: 'master',
    category: 'hansen-timestamps',
    stage: 'hansen-00-39',
    relatedNodes: [79, 783, 2, 1, 14, 459, 573, 67, 57, 53, 730],
    relatedChapters: [
      'workflow-engineering-overview',
      'workflow-engineering-graph-literacy',
      'workflow-engineering-groups-naming',
      'overview',
      'graph-reading',
    ],
    sections: [
      {
        id: 'hansen-original',
        eyebrow: 'HANSEN ORIGINAL',
        title: 'What is actually visible at 00:39',
        paragraphs: [
          'Several major sections are visible on the canvas at the same time, separated visually and labeled with Roman numerals. This is not “252 random boxes”; it is a production system divided into functional zones.',
          'The final/output area sits on the right with a sequence of intermediate and final images. Controls, inputs, generation and processing stages occupy the left and center. The canvas composition alone makes it clear that data is expected to travel through several modules.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Video evidence',
            text: 'The 00:39 frame shows the complete ComfyUI canvas with major sections I–VI and the final-image area on the right.',
          },
          {
            status: 'confirmed',
            title: 'Graph evidence',
            text: 'Source topology connects BASE IMAGE 79 → resize 783 → SDXL → PPL/detail → FLUX 67/57/53 → output routes.',
          },
        ],
      },
      {
        id: 'beginner-model',
        eyebrow: 'ARCHVIZ FOUNDATION / EXTENSION',
        title: 'First rule for beginners: do not read a huge graph one node at a time',
        codeExamples: [
          {
            title: 'The right zoom level',
            label: 'MENTAL MODEL',
            code:
              'WHOLE CANVAS\n' +
              '→ SYSTEM / GROUP\n' +
              '→ MODULE\n' +
              '→ NODE CHAIN\n' +
              '→ SINGLE NODE',
            note: 'If you begin with individual nodes, purpose and relationships disappear quickly. Build the map first.',
          },
        ],
        paragraphs: [
          'In this manual, the Hansen graph is not something to memorize. It is a training environment for learning transferable ComfyUI concepts: data flow, controls, masks, branching, local processing and return contracts.',
        ],
      },
      {
        id: 'six-questions',
        eyebrow: 'READING METHOD',
        title: 'Six questions to ask about any module',
        bullets: [
          'Why does this module exist?',
          'What INPUT does it receive?',
          'What does it change: image, mask, latent, conditioning or a control value?',
          'Which shared controls govern it?',
          'Where is its CHECKPOINT?',
          'Where does it RETURN?',
        ],
        paragraphs: [
          'These questions matter more than memorizing the name of a specific model. Models can be replaced; module contracts and responsibilities remain.',
        ],
      },
      {
        id: 'master-route',
        eyebrow: 'PRODUCTION ROUTE',
        title: 'Compress the large graph into one line',
        codeExamples: [
          {
            title: 'Master route',
            label: 'CONFIRMED · SOURCE TOPOLOGY',
            code:
              'BASE IMAGE\n' +
              '→ PREPROCESS / CONTROL\n' +
              '→ BASE GENERATION\n' +
              '→ LOCAL MODULES / PEOPLE / MASKS\n' +
              '→ MAIN FLUX REFINEMENT\n' +
              '→ OPTIONAL UPSCALE / OVERLAY\n' +
              '→ OUTPUT',
          },
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Current saved state',
            text: 'Source documentation confirms active LQ save at node 730; the HQ/upscale/overlay chain exists, but some of its nodes are stored in bypass.',
          },
        ],
      },
      {
        id: 'practice',
        eyebrow: 'PRACTICE',
        title: 'Exercise: map the workflow without following wires',
        bullets: [
          'Open the Hansen workflow and zoom out until the whole canvas is visible.',
          'Do not trace links and do not run generation.',
          'Identify the major zones: controls/config, inputs, base generation, masks/people, final processing/output.',
          'For each zone, write one sentence: “this area is responsible for ...”.',
          'Only then zoom into one area and inspect its internal nodes.',
        ],
      },
      {
        id: 'pass',
        eyebrow: 'PASS CRITERIA',
        title: 'When the 00:39 lesson is complete',
        paragraphs: [
          'You no longer describe the workflow as “a wall of nodes.” You can point out several major systems and roughly explain the order in which the image moves through them.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'hansen-01-08-input-data-txt2img',
    navTitle: '01:08 · Input Data · TXT2IMG',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 01:08',
    title: 'Input data — why a production workflow does not begin with the prompt',
    lede:
      'In this part of the showcase, Hansen presents prepared input data before generation. For ArchViz, this is fundamental: the workflow receives not only text, but a set of visual sources carrying geometry, structure, masks, references and downstream controls.',
    status: 'confirmed',
    statusNote:
      'The video around 01:08 shows several prepared passes/reference images; the source graph documents seven LoadImage nodes and their specific downstream branches.',
    visual: 'inputs',
    category: 'hansen-timestamps',
    stage: 'hansen-01-08',
    relatedNodes: [25, 41, 42, 79, 301, 309, 338, 38, 337, 456, 630, 783],
    relatedChapters: [
      'inputs',
      'workflow-engineering-coordinates-batch',
      'controlnet',
      'segmentation-masks',
    ],
    sections: [
      {
        id: 'hansen-original',
        eyebrow: 'HANSEN ORIGINAL',
        title: 'What is presented as input data',
        paragraphs: [
          'The video shows several types of prepared visual information: a stylized/false-color render, a depth-like pass, an RGB-coded mask-like pass, reference/final-look images and the 3D scene context itself. This demonstrates a production-first approach: AI does not have to infer everything from a single prompt.',
          'The source graph confirms several independent LoadImage sources: BASE IMAGE, external depth, IPAdapter references, RGB-coded mask source and final overlay assets.',
        ],
      },
      {
        id: 'input-contract',
        eyebrow: 'ARCHVIZ FOUNDATION / EXTENSION',
        title: 'INPUT CONTRACT: every file should have one clear role',
        table: {
          columns: ['Input type', 'Source evidence', 'Role'],
          rows: [
            ['BASE IMAGE', 'node 79', 'Primary architectural source; feeds resize, preprocess, compare and mask paths'],
            ['External depth', 'node 25', 'Alternative geometry/depth source selected downstream'],
            ['Reference images', 'nodes 41 / 42', 'Optional IPAdapter reference inputs'],
            ['RGB-coded masks', 'node 338', 'Source for mask extraction by color'],
            ['Logo / overlays', 'nodes 301 / 309', 'Final delivery overlay stage'],
          ],
        },
        facts: [
          {
            status: 'confirmed',
            title: 'Mandatory base',
            text: 'Source notes identify node 79 as BASE IMAGE by connectivity and an embedded workflow note.',
          },
          {
            status: 'inferred',
            title: 'Optional means branch-dependent',
            text: 'Other inputs are optional only when their consuming branch is bypassed or selected away; “optional” is a routing property, not an intrinsic property of the file.',
          },
        ],
      },
      {
        id: 'data-types',
        eyebrow: 'BEGINNER FOUNDATION',
        title: 'Not every image in a workflow means the same thing',
        table: {
          columns: ['Visual input', 'Human interpretation', 'Machine role'],
          rows: [
            ['Beauty / base render', 'What the scene looks like', 'IMAGE source'],
            ['Depth', 'What is nearer / farther', 'Geometry guidance'],
            ['RGB ID / mask pass', 'Which region belongs to what', 'Region selection'],
            ['Reference image', 'Desired visual language', 'Style / appearance guidance'],
            ['Logo / overlay', 'What to add to delivery', 'Post-process asset'],
          ],
        },
        paragraphs: [
          'For a beginner, one of the most important habits is to look past the thumbnail and ask what information the image carries and which downstream node consumes it.',
        ],
      },
      {
        id: 'source-size',
        eyebrow: 'DATA CONTRACT',
        title: 'Dimensions and coordinate space are part of the input contract',
        paragraphs: [
          'Images that look identical can be incompatible when they have different dimensions, aspect ratios or coordinate spaces. Resize 783, external-map sizes and later detection canvases are therefore part of the architecture, not implementation trivia.',
        ],
        codeExamples: [
          {
            title: 'Rule',
            label: 'DATA CONTRACT',
            code: 'CONTENT + SIZE + COORDINATE SPACE + BATCH = INPUT CONTRACT',
          },
        ],
      },
      {
        id: 'practice',
        eyebrow: 'PRACTICE',
        title: 'Exercise: inventory the inputs',
        bullets: [
          'Find every LoadImage node in the INPUTS area.',
          'For each one, record its function rather than its filename: BASE / DEPTH / REFERENCE / MASK / OVERLAY.',
          'Trace only the first downstream link from each input.',
          'Mark which inputs participate in the active route and which belong to bypassed/optional branches.',
        ],
      },
      {
        id: 'pass',
        eyebrow: 'PASS CRITERIA',
        title: 'When the 01:08 lesson is complete',
        paragraphs: [
          'You understand that production ComfyUI begins with input-data design. A prompt is only one input to the system, not the entire system.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'hansen-02-40-process1-txt2img',
    navTitle: '02:40 · Process 1 · TXT2IMG',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 02:40',
    title: 'Process 1 · TXT2IMG — assembling the first controlled generation from inputs',
    lede:
      'At 02:40, Hansen returns to the large graph and presents the first main production process. The learning goal is not to memorize RealVisXL or a specific sampler, but to understand the transferable pattern: controls + conditioning + structural guidance + latent source → sampler → decoded image.',
    status: 'confirmed',
    statusNote:
      'The 02:40 video shows the corresponding generation area; source topology confirms the SDXL path model 2 → conditioning / ControlNet → latent selector 535 → sampler 1 → decode 14.',
    visual: 'generation',
    category: 'hansen-timestamps',
    stage: 'hansen-02-40',
    relatedNodes: [1, 2, 3, 5, 6, 7, 14, 21, 23, 38, 87, 168, 230, 231, 417, 418, 419, 535, 541, 600, 783],
    relatedChapters: [
      'sdxl',
      'controlnet',
      'ipadapter-lora',
      'workflow-engineering-switches-routing',
      'workflow-engineering-execution-cache',
    ],
    sections: [
      {
        id: 'hansen-original',
        eyebrow: 'HANSEN ORIGINAL',
        title: 'Process 1 — one module with several sources of control',
        paragraphs: [
          'The source graph shows the SDXL generation path: model loader 2, prompt conditioning, optional IPAdapter model route, ControlNet stack, latent selector, KSampler 1 and VAE Decode 14.',
          'Current master mode 541=1 corresponds to TXT+CNET2IMG. In this mode, latent selector 535 chooses EmptyLatentImage 3 and the denoise route selects full-generation behavior.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Current generation mode',
            text: 'Node 541 = 1; source notes identify this as TXT+CNET2IMG.',
          },
          {
            status: 'confirmed',
            title: 'Decode checkpoint',
            text: 'Sampler 1 feeds VAEDecode 14; the decoded image then continues into downstream detail/PPL logic.',
          },
        ],
      },
      {
        id: 'universal-pattern',
        eyebrow: 'ARCHVIZ FOUNDATION / EXTENSION',
        title: 'The generation pattern is universal — the specific model is secondary',
        codeExamples: [
          {
            title: 'Generation sentence',
            label: 'MODEL-AGNOSTIC',
            code:
              'MODEL\n' +
              '+ CONDITIONING\n' +
              '+ OPTIONAL STRUCTURAL GUIDANCE\n' +
              '+ LATENT / SOURCE STATE\n' +
              '+ SAMPLER CONFIG\n' +
              '→ SAMPLER\n' +
              '→ DECODED IMAGE',
            note: 'The model can be replaced later. The generation-module architecture remains recognizable.',
          },
        ],
      },
      {
        id: 'five-subsystems',
        eyebrow: 'MODULE ANATOMY',
        title: 'Read Process 1 as five subsystems, not dozens of nodes',
        table: {
          columns: ['Subsystem', 'Hansen example', 'Beginner question'],
          rows: [
            ['Model source', '2 / 168 / 87', 'Which MODEL actually reaches the sampler?'],
            ['Text conditioning', '5 / 6', 'What should the model do / avoid?'],
            ['Structural control', 'Depth/Canny ControlNet stack', 'What preserves geometry / edges?'],
            ['Runtime controls', '230 / 231 / 541 / 600', 'Which shared values define the mode?'],
            ['Execution', '535 → 1 → 14', 'Where does the latent come from, where is sampling, where does IMAGE reappear?'],
          ],
        },
      },
      {
        id: 'latent-beginner',
        eyebrow: 'BEGINNER FOUNDATION',
        title: 'Why the ordinary image temporarily disappears during generation',
        paragraphs: [
          'The sampler works with a latent representation rather than an ordinary RGB image. A sampling route may therefore begin from an Empty Latent or a VAE-encoded image, and requires VAE Decode afterward to produce IMAGE again.',
          'This is a universal ComfyUI concept: IMAGE and LATENT are different data types. A link between incompatible types is not simply an “image wire.”',
        ],
        codeExamples: [
          {
            title: 'Type transition',
            label: 'SIGNAL TYPE',
            code: 'IMAGE → VAE ENCODE → LATENT → SAMPLER → LATENT → VAE DECODE → IMAGE',
            note: 'In pure txt2img, the initial latent can be Empty Latent, so an IMAGE before the sampler is not required.',
          },
        ],
      },
      {
        id: 'controls',
        eyebrow: 'CONTROL PLANE',
        title: 'Workflow mode is not defined by one sampler widget',
        paragraphs: [
          'Hansen moves sampling configuration, seed and generation mode into shared controls. Several downstream nodes can then read one authoritative value, making A/B tests reproducible.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Shared sampler config',
            text: 'Node 230 distributes KSampler settings to node 1; node 231 provides GLOBAL Seed and also feeds FLUX noise downstream.',
          },
        ],
      },
      {
        id: 'checkpoint',
        eyebrow: 'CHECKPOINT',
        title: 'The first meaningful output is decode 14',
        paragraphs: [
          'Before decode 14, we verify inputs, controls and conditioning. After decode 14, there is an IMAGE to evaluate. This is a natural diagnostic boundary: if the problem is already visible here, PEOPLE, main FLUX and upscale are not yet responsible.',
        ],
      },
      {
        id: 'debug-order',
        eyebrow: 'TROUBLESHOOTING',
        title: 'If Process 1 produces a bad result, debug from the top down',
        bullets: [
          'INPUT: is the correct base/reference/control source selected?',
          'MODE: does node 541 actually indicate the intended generation mode?',
          'MODEL: which route is selected by node 168 and which loaders are active?',
          'CONDITIONING: positive / negative and linked text values?',
          'CONTROL: Depth/Canny sources, strength and active stack?',
          'LATENT: what does selector 535 choose?',
          'SAMPLER CONFIG: seed / steps / CFG / sampler / scheduler / denoise?',
          'DECODE 14: is the image checkpoint correct before downstream modules?',
        ],
      },
      {
        id: 'practice',
        eyebrow: 'PRACTICE',
        title: 'Exercise: read the SDXL branch without running it',
        bullets: [
          'Find KSampler node 1 and walk only upstream from it.',
          'Split incoming links into MODEL, CONDITIONING, LATENT and CONFIG.',
          'Find the authoritative source for each input.',
          'Then walk downstream: node 1 → node 14 → next module.',
          'Describe the branch in one sentence without naming specific models.',
        ],
      },
      {
        id: 'return',
        eyebrow: 'RETURN CONTRACT',
        title: 'Process 1 ends with an IMAGE that the next module can consume',
        codeExamples: [
          {
            title: 'Module contract',
            label: 'RETURN CONTRACT',
            code:
              'INPUTS + CONTROLS\n' +
              '→ BASE GENERATION\n' +
              '→ CHECKPOINT: DECODE 14\n' +
              '→ RETURN IMAGE TO DETAIL / PEOPLE / NEXT PROCESS',
          },
        ],
      },
      {
        id: 'pass',
        eyebrow: 'PASS CRITERIA',
        title: 'When the 02:40 lesson is complete',
        paragraphs: [
          'You can open an unfamiliar generation branch and, regardless of model name, identify the model source, conditioning, structural controls, latent/source state, sampler config, sampler, decode and return image.',
        ],
      },
    ],
  },
];
