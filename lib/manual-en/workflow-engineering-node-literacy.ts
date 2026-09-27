import type { Chapter } from '../manual-types';

export const workflowEngineeringNodeLiteracyChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-node-literacy',
    navTitle: 'Node Literacy',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'Node Literacy — the alphabet of ComfyUI',
    lede:
      'Before you can read a large workflow, you need to understand the basic data types and the inputs and outputs of nodes. This chapter teaches you to look past a node name and identify what kind of object it receives, what operation it performs, and what it returns downstream.',
    status: 'confirmed',
    statusNote:
      'This chapter describes the basic model for reading a ComfyUI graph and uses data types that are present in the current Hansen workflow.',
    visual: 'graph-reading',
    category: 'workflow-engineering',
    stage: 'node-literacy',
    relatedChapters: [
      'workflow-engineering-overview',
      'graph-reading',
      'inputs',
      'models-dependencies',
    ],
    sections: [
      {
        id: 'node-anatomy',
        eyebrow: '01 · NODE ANATOMY',
        title: 'Every node raises three questions: what goes in, what happens, and what comes out',
        paragraphs: [
          'Read a node as a function, not by its name. Inputs are on the left, parameters are configured inside the node, and outputs are on the right. Once you understand the type of every socket, much of the graph stops being mysterious.',
          'A professional habit: before changing a parameter, identify the input type and the output type first. This prevents pointless attempts to connect incompatible parts of the graph.',
        ],
        codeExamples: [
          {
            title: 'Basic node-reading formula',
            label: 'NODE LITERACY',
            code:
              'INPUT TYPE\n' +
              '→ NODE OPERATION\n' +
              '→ OUTPUT TYPE',
            note: 'Start with data types; only then look at the model name and widget values.',
          },
        ],
      },
      {
        id: 'core-types',
        eyebrow: '02 · CORE DATA TYPES',
        title: 'The core “letters” of ComfyUI',
        table: {
          columns: ['Type', 'What it represents', 'Typical example'],
          rows: [
            ['IMAGE', 'A pixel image or batch of images', 'LoadImage → PreviewImage'],
            ['MASK', 'A single-channel map that defines an affected region', 'SAM2 mask → composite / inpaint'],
            ['LATENT', 'A hidden image representation used by a diffusion sampler', 'VAE Encode → KSampler'],
            ['MODEL', 'A generative model object after loading / patching', 'Checkpoint / UNet loader → sampler'],
            ['CLIP', 'A text encoder / text-model interface', 'Loader → CLIP Text Encode'],
            ['CONDITIONING', 'Encoded text or control information', 'CLIP Text Encode → sampler / guider'],
            ['VAE', 'The encoder/decoder between IMAGE and LATENT', 'IMAGE → VAE Encode → LATENT'],
            ['STRING', 'Text', 'Prompt field → text encoder'],
            ['INT', 'An integer value', 'steps, width, height, seed selector'],
            ['FLOAT', 'A floating-point value', 'denoise, strength, CFG, weight'],
          ],
        },
      },
      {
        id: 'image-latent',
        eyebrow: '03 · IMAGE VS LATENT',
        title: 'IMAGE and LATENT are not the same thing',
        paragraphs: [
          'IMAGE exists in pixel space: it can be displayed in PreviewImage, saved, processed with a mask, or sent to a preprocessor. LATENT exists in the hidden space of the diffusion model and is processed by the sampler.',
          'That is why an IMAGE cannot be connected directly to an input that expects LATENT. VAE Encode is required in one direction, and VAE Decode in the other.',
        ],
        codeExamples: [
          {
            title: 'Moving between spaces',
            label: 'CORE ROUTE',
            code:
              'IMAGE\n' +
              '→ VAE Encode\n' +
              '→ LATENT\n' +
              '→ Sampler\n' +
              '→ LATENT\n' +
              '→ VAE Decode\n' +
              '→ IMAGE',
          },
        ],
        facts: [
          {
            status: 'inferred',
            title: 'Debug rule',
            text: 'If a node “will not accept the image,” first check whether it expects LATENT, MASK, or CONDITIONING rather than IMAGE.',
          },
        ],
      },
      {
        id: 'mask-literacy',
        eyebrow: '04 · MASK',
        title: 'MASK defines where an operation applies, not the image itself',
        paragraphs: [
          'A mask describes where an operation is allowed, blocked, or blended. White and black only acquire meaning in the context of the specific downstream node, so polarity should never be assumed from habit.',
          'In a production graph, always verify three things: mask dimensions, mask polarity, and whether the mask shares the same coordinate space as the image it is applied to.',
        ],
        codeExamples: [
          {
            title: 'Minimum mask contract',
            label: 'CHECK BEFORE USE',
            code:
              'MASK SIZE\n' +
              '+ POLARITY\n' +
              '+ SAME COORDINATE SPACE\n' +
              '→ SAFE COMPOSITE / INPAINT',
          },
        ],
      },
      {
        id: 'model-clip-conditioning',
        eyebrow: '05 · MODEL / CLIP / CONDITIONING',
        title: 'The model object and the prompt are separate parts of the system',
        paragraphs: [
          'MODEL represents the generative network. CLIP, or another text encoder, converts a STRING prompt into CONDITIONING. The sampler then receives the model, conditioning, and latent as separate inputs.',
          'This is an important mental model: the prompt does not “live inside the sampler.” It is encoded beforehand and passed in as a separate object.',
        ],
        codeExamples: [
          {
            title: 'Minimum generation chain',
            label: 'GRAPH GRAMMAR',
            code:
              'MODEL LOADER → MODEL\n' +
              'TEXT ENCODER + STRING → CONDITIONING\n' +
              'LATENT SOURCE → LATENT\n' +
              'MODEL + CONDITIONING + LATENT → SAMPLER',
          },
        ],
      },
      {
        id: 'scalars-controls',
        eyebrow: '06 · STRING / INT / FLOAT',
        title: 'Small data types often control very large branches',
        paragraphs: [
          'STRING, INT, and FLOAT look simpler than IMAGE or MODEL, but they often form the control plane. A single INT may choose the source for several selectors, while one FLOAT may define denoise or weight for an entire branch.',
          'That is why a linked control input matters more than a local widget value: when an input is connected, the effective value may come from elsewhere.',
        ],
      },
      {
        id: 'socket-compatibility',
        eyebrow: '07 · SOCKET COMPATIBILITY',
        title: 'A wire is a statement about data compatibility',
        paragraphs: [
          'Every link states that the output of one node is compatible with the input of another. If ComfyUI does not allow two sockets to connect, the issue is usually a type mismatch or a missing conversion step between them, not the interface itself.',
        ],
        table: {
          columns: ['Target type', 'Current type', 'Typical conversion'],
          rows: [
            ['LATENT', 'IMAGE', 'VAE Encode'],
            ['IMAGE', 'LATENT', 'VAE Decode'],
            ['CONDITIONING', 'STRING', 'Text Encode'],
            ['MASK', 'IMAGE / detection result', 'ImageToMask or segmentation stage'],
            ['CONTROL signal', 'IMAGE', 'Preprocessor + ControlNet/apply stage'],
          ],
        },
      },
      {
        id: 'reading-order',
        eyebrow: '08 · READING ORDER',
        title: 'How to read an unfamiliar node in 20 seconds',
        bullets: [
          'Check the type of every input.',
          'Check the type of every output.',
          'Determine whether the node transforms data or only routes it.',
          'Separate linked inputs from local widget values.',
          'Find one upstream source and one downstream consumer.',
          'Only then inspect the model name and parameters.',
        ],
      },
      {
        id: 'practice',
        eyebrow: '09 · PRACTICE',
        title: 'Practice: translate a small workflow from node language into plain language',
        paragraphs: [
          'Take any graph with 5–15 nodes. For every node, identify one input type, the operation, and the output type. Then describe the entire route in one sentence without using model names.',
        ],
        codeExamples: [
          {
            title: 'Translation example',
            label: 'EXERCISE',
            code:
              'LoadImage\n' +
              '→ VAEEncode\n' +
              '→ Sampler\n' +
              '→ VAEDecode\n' +
              '→ Preview\n\n' +
              'Plain language:\n' +
              'load an image → encode it into latent space → modify it with diffusion → decode it back to pixels → inspect the result',
          },
        ],
        facts: [
          {
            status: 'inferred',
            title: 'Readiness criterion',
            text: 'A learner is ready for Graph Literacy when they can explain a route by data type instead of relying only on specific model names.',
          },
        ],
      },
    ],
  },
];
