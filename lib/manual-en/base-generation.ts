import type { Chapter } from '../manual-types';

export const baseGenerationChapters: Chapter[] = [
  {
    index: 0,
    slug: 'global-prompts',
    navTitle: 'Global Prompts',
    eyebrow: 'TEXT ARCHITECTURE',
    title: 'How global strings feed SDXL, FLUX, and PEOPLE/PPL',
    lede:
      'The main prompt does not live in a single field. OBJECT, ENVIRONMENT, LIGHT/STYLE, and ADDITIONAL are assembled by nodes 895–897 and reused across several stages.',
    status: 'confirmed',
    statusNote: 'String links and conditioning consumers are confirmed by topology',
    visual: 'prompts-global',
    category: 'base-generation',
    stage: 'conditioning',
    relatedNodes: [5, 6, 52, 138, 157, 158, 408, 453, 591, 797, 799, 800, 801, 802, 803, 811, 813, 814, 820, 823, 824, 831, 895, 896, 897],
    relatedChapters: ['node-408-prompt', 'sdxl', 'main-flux', 'detail-conservation'],
    sections: [
      {
        id: 'positive-assembly',
        eyebrow: '01 · POSITIVE',
        title: 'Four semantic blocks become one global string',
        table: {
          columns: ['Node', 'Block', 'Assembly / consumers'],
          rows: [
            ['797', 'OBJECT', '797 + 799 → 895'],
            ['799', 'ENVIRONMENT', '895; also PPL assembly 824'],
            ['800', 'LIGHT / STYLE', '800 + 801 → 896; also PPL assembly 820'],
            ['801', 'ADDITIONAL', '896'],
            ['895 + 896', 'Partial strings', '→ 897 with comma separator'],
            ['897', 'GLOBAL positive string', 'SDXL encoder 5, display 804, FLUX encoder 811'],
          ],
        },
        facts: [
          { status: 'confirmed', title: 'Shared dependency', text: 'Changing 799 or 800 affects more than one stage: both nodes participate in the global prompt and the PPL prompt.' },
          { status: 'inferred', title: 'Editing rule', text: 'OBJECT describes the scene; ENVIRONMENT defines context; LIGHT/STYLE defines the visual regime; ADDITIONAL holds local constraints.' },
        ],
      },
      {
        id: 'negative-assembly',
        eyebrow: '02 · SDXL NEGATIVE',
        title: 'Detail-mask text is included in SDXL negative conditioning',
        paragraphs: [
          'Node 591 describes architectural elements used to create the detail mask. At the same time, it is joined with IMAGE-SPECIFIC negative 802 through 813. GLOBAL negative 803 is then added in 814, which feeds encoder 6.',
        ],
        table: {
          columns: ['Route', 'Result'],
          rows: [
            ['591 + 802 → 813', 'Detail terms + image-specific exclusions'],
            ['803 + 813 → 814', 'Final SDXL negative string'],
            ['814 → 6 → 418', 'Negative conditioning after the ControlNet stack'],
          ],
        },
      },
      {
        id: 'florence-route',
        eyebrow: '03 · ALTERNATIVE FLUX PROMPT',
        title: 'Node 453 selects GLOBAL encoder or Florence2 caption',
        paragraphs: [
          'Image Filter 779 sends the image to Florence2Run 157. The caption is displayed through 158 and sent to encoder 52. Selector 453 chooses 811 or 52; the current value 1 selects GLOBAL 811.',
        ],
        facts: [
          { status: 'confirmed', title: 'Current selection', text: '453 = 1, so main FLUX receives conditioning 811.' },
          { status: 'not-confirmed', title: 'Caption quality', text: 'The stored text in 158 does not prove caption quality for the next run.' },
        ],
      },
      {
        id: 'ppl-context',
        eyebrow: '04 · PEOPLE CONTEXT',
        title: 'Node 408 is a specialized brief inside the shared prompt system',
        paragraphs: [
          'PPL assembly uses prefix 825, PEOPLE text 408, and ENVIRONMENT 799 through 823/824. Node 820 adds LIGHT/STYLE 800 and framing instruction 822. Encoder 831 and FluxGuidance 830 produce dedicated PPL conditioning.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'sdxl',
    navTitle: 'Main SDXL Stage',
    eyebrow: 'BASE GENERATION',
    title: 'The main SDXL pass builds the scene before PEOPLE/PPL',
    lede:
      'The SDXL stage combines RealVisXL, optional IPAdapter, positive/negative conditioning, two ControlNets, and mode-dependent latent/denoise logic.',
    status: 'confirmed',
    statusNote: 'Loader filenames, selectors, sampler controls, and links are present in the derived specification',
    visual: 'sdxl',
    category: 'base-generation',
    stage: 'sdxl',
    relatedNodes: [1, 2, 3, 5, 6, 7, 14, 86, 87, 168, 230, 231, 417, 418, 419, 535, 536, 541, 600, 602, 607, 608, 609],
    relatedChapters: ['global-prompts', 'controlnet', 'ipadapter-lora', 'detail-conservation'],
    sections: [
      {
        id: 'model-conditioning',
        eyebrow: '01 · MODEL + CONDITIONING',
        title: 'RealVisXL receives LoRA/IPAdapter selection before encoder 5',
        table: {
          columns: ['Node', 'Role', 'Current value / route'],
          rows: [
            ['2', 'CheckpointLoaderSimple', 'RealVisXL_V4.0.safetensors'],
            ['86', 'CLIPSetLastLayer', '-1'],
            ['87', 'LoRA stack', 'All four slots = None'],
            ['7 / 168', 'IPAdapterAdvanced / model switch', '168=1 selects plain SDXL'],
            ['5', 'Positive encoder', 'String 897 + model CLIP path'],
            ['6', 'Negative encoder', 'String 814'],
            ['417→419→418', 'Depth + Canny stack', 'Applied to 5/6'],
          ],
        },
      },
      {
        id: 'latent-modes',
        eyebrow: '02 · GENERATION MODES',
        title: 'Node 541 changes latent source, base image, and denoise in sync',
        table: {
          columns: ['Mode', 'Latent', 'Denoise', 'Use'],
          rows: [
            ['541 = 1 · current', 'EmptyLatent 3; W/H from 783; batch 4', '607 = 1.0 through 600', 'TXT+CNET2IMG'],
            ['541 = 2', 'Selected image 592 → VAEEncode 536', '608 = 0.3 through 600', 'IMG+CNET2IMG'],
          ],
        },
        paragraphs: [
          'Compare 602 checks 609 against 541. If node 600 selects either 1.0 or the user img2img denoise value 0.3. Stored widgets inside 535/592 remain subordinate to the linked control.',
        ],
      },
      {
        id: 'sampling',
        eyebrow: '03 · SAMPLING',
        title: 'KSampler 1 receives parameters from upstream controls, not only its visible widgets',
        table: {
          columns: ['Source', 'Value', 'Destination'],
          rows: [
            ['230', '28 steps · CFG 3.4 · dpmpp_3m_sde_gpu · karras', 'KSampler 1'],
            ['231', 'Global seed + randomize policy', 'KSampler 1 and FLUX noise 61'],
            ['418', 'Positive + negative after ControlNet', 'KSampler 1'],
            ['535', 'Mode-selected latent', 'KSampler 1'],
            ['600', '1.0 or 0.3', 'denoise of KSampler 1'],
            ['1 → 14', 'Sampled latent → checkpoint VAE decode', 'Detail stage 565'],
          ],
        },
      },
      {
        id: 'verification',
        eyebrow: '04 · CHECKPOINT',
        title: 'The first shared visual checkpoint appears after 565/779',
        facts: [
          { status: 'confirmed', title: 'Topology', text: 'Decode 14 feeds detail transfer 565; its output reaches Image Filter 779 and comparer 71.' },
          { status: 'not-confirmed', title: 'Generated pixels', text: 'The JSON does not contain the actual batch output, memory usage, or runtime errors.' },
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'controlnet',
    navTitle: 'ControlNet & Preprocessors',
    eyebrow: 'DEPTH · CANNY',
    title: 'Map source is selected once; the stack is applied sequentially',
    lede:
      'Control 456 drives both Depth switch 542 and Canny switch 732. The real Canny topology differs from an older Markdown description and is therefore documented with errata.',
    status: 'confirmed',
    statusNote: 'The routes below were verified from node input links in HANSEN_WORKFLOW_SPEC.json',
    visual: 'controlnet',
    category: 'base-generation',
    stage: 'controlnet',
    relatedNodes: [21, 23, 25, 38, 39, 79, 165, 167, 417, 418, 419, 456, 542, 722, 723, 732, 784, 785],
    relatedChapters: ['inputs', 'control-panel', 'sdxl', 'resources'],
    sections: [
      {
        id: 'depth',
        eyebrow: '01 · DEPTH',
        title: 'Node 542 selects external depth or DepthAnythingV2',
        table: {
          columns: ['Mode', 'Route', 'Preview / model'],
          rows: [
            ['456 = 1 · current', '25 V_1_d.jpg → resize 784 → image1 of 542', 'ControlNet model 21'],
            ['456 = 2', '79 BASE → DepthAnythingV2 38 → image2 of 542', 'Preview 39 · model 21'],
            ['After selection', '542 → stack 417', 'strength 723 = 0.36 · start 0 · end 1'],
          ],
        },
      },
      {
        id: 'canny',
        eyebrow: '02 · CANNY',
        title: 'Canny input 1 comes from BASE IMAGE, not node 25',
        table: {
          columns: ['Mode', 'Route', 'Preview / model'],
          rows: [
            ['456 = 1 · current', '79 BASE → resize 785 → image1 of 732', 'ControlNet model 23'],
            ['456 = 2', '79 BASE → Edge Filter 165 → image2 of 732', 'Preview 167 · model 23'],
            ['After selection', '732 → stack 419', 'strength 722 = 0.31 · start 0 · end 1'],
          ],
        },
        facts: [
          { status: 'confirmed', title: 'Derived topology', text: 'Input links of 732 are 785 and 165; node 25 does not connect to 732.' },
          { status: 'not-confirmed', title: 'Old wording', text: '06_CONTROLNET.md described node 25 as the external Canny source. Until the raw JSON is available, that statement is treated as incorrect/unconfirmed.' },
        ],
      },
      {
        id: 'stack-order',
        eyebrow: '03 · APPLY ORDER',
        title: 'Depth 417 passes its stack into Canny 419, then 418 applies the result to both conditioning branches',
        paragraphs: [
          'The stack order is confirmed by links: 417 → 419 → 418. Apply ControlNet Stack 418 receives positive 5, negative 6, and prepared stack 419, then feeds KSampler 1 twice.',
        ],
      },
      {
        id: 'preflight',
        eyebrow: '04 · QA',
        title: 'Verify maps before SDXL sampling',
        bullets: [
          'For generated depth, inspect preview 39 first.',
          'For generated edge, inspect preview 167 first.',
          'Verify the effective value of control 456 on both switches.',
          'Verify that resize 784/785 does not distort aspect ratio relative to BASE.',
          'Only then diagnose sampler 1.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'ipadapter-lora',
    navTitle: 'IPAdapter & LoRA',
    eyebrow: 'OPTIONAL STYLE PATH',
    title: 'References, CLIP Vision, adapter weight, and model selection',
    lede:
      'IPAdapter and LoRA are fully present in topology, but the current saved profile selects plain SDXL, zero adapter weight, and empty LoRA slots.',
    status: 'confirmed',
    statusNote: 'The branch is proven by links; its absence from current sampling is proven by values 168=1 and 721=0',
    visual: 'ipadapter',
    category: 'base-generation',
    stage: 'sdxl-optional',
    relatedNodes: [7, 9, 12, 13, 41, 42, 86, 87, 168, 630, 721, 793],
    relatedChapters: ['inputs', 'models-dependencies', 'sdxl'],
    sections: [
      {
        id: 'reference-route',
        eyebrow: '01 · IMAGE REFERENCES',
        title: 'Node 630 selects the first reference or a batch of two',
        table: {
          columns: ['Mode', 'Source', 'Next'],
          rows: [
            ['630 = 1 · current', 'Node 42', 'Prep 9'],
            ['630 = 2', '42 + 41 → BatchImages 793', 'Prep 9'],
            ['Prep 9', 'LANCZOS · center · padding 0', 'IPAdapterAdvanced 7'],
          ],
        },
      },
      {
        id: 'adapter',
        eyebrow: '02 · MODEL PATCH',
        title: 'Node 7 creates an optional SDXL model variant',
        table: {
          columns: ['Input / setting', 'Stored value'],
          rows: [
            ['CLIP Vision 12', 'CLIP-ViT-H-14-laion2B-s32B-b79K.safetensors'],
            ['IPAdapter model 13', 'ip-adapter-plus_sdxl_vit-h.safetensors'],
            ['Weight 721', '0'],
            ['Mode', 'style transfer'],
            ['Embeds', 'concat'],
            ['Range', 'start 0 · end 1'],
            ['Channels', 'V only'],
          ],
        },
      },
      {
        id: 'current-effect',
        eyebrow: '03 · CURRENT EFFECT',
        title: 'The branch is selected away and also has weight 0',
        facts: [
          { status: 'confirmed', title: 'Model selector', text: '168=1 selects checkpoint model 2 rather than IPAdapterAdvanced output 7.' },
          { status: 'confirmed', title: 'LoRA stack', text: 'Node 87 stores None in all four slots.' },
          { status: 'not-confirmed', title: 'Visual style transfer', text: 'The reference image and adapter cannot be considered influential on the current render.' },
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'segmentation-masks',
    navTitle: 'General Segmentation & Masks',
    eyebrow: 'MASK SYSTEMS',
    title: 'PEOPLE, architectural detail, automatic SAM2, and RGB atlas',
    lede:
      'The full graph contains several independent mask systems. They must not be collapsed into one abstract “mask”: each has its own source, coordinate space, and downstream consumer.',
    status: 'confirmed',
    statusNote: 'Four mask systems are separated by topology and formal groups',
    visual: 'masks-global',
    category: 'base-generation',
    stage: 'segmentation',
    relatedNodes: [107, 112, 114, 115, 144, 146, 232, 233, 234, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 550, 580, 583, 584, 585, 591],
    relatedChapters: ['segmentation-mask', 'detail-conservation', 'positioning'],
    sections: [
      {
        id: 'mask-families',
        eyebrow: '01 · FOUR SYSTEMS',
        title: 'Source and purpose of each mask family',
        table: {
          columns: ['Family', 'Route', 'Purpose', 'Main consumers'],
          rows: [
            ['PEOPLE', '550 → 114 → 115 → 144 → 146', 'Isolate person/human/face/hands/feet/accessories', '420, 500'],
            ['Architectural detail', '591 → 580 → 584 → 585', 'Isolate building/facade/detail', '583, 775'],
            ['Automatic SAM2', '234 + 779 → 232 → 233', 'Automask diagnostic', 'Preview 233'],
            ['RGB/CMY/B/W atlas', '338 → 337 → 339/346/347/348/349/350/352/354', 'Split a color-coded mask image', 'Previews 340–353'],
          ],
        },
      },
      {
        id: 'people-mask',
        eyebrow: '02 · PEOPLE',
        title: 'Florence2 coordinates drive the SAM2 single-image model',
        paragraphs: [
          'Florence2Run 550 receives resized source 780 and model 112. Coordinates 114 feed SAM2 115 together with single-image model 107. GrowMask 144 expands the region by 5 px; MaskBlur+ 146 creates a soft edge at 10/auto.',
          'Confirmed by runtime testing: detection and SAM2 must receive the same image/canvas. For multiple Florence2 BBOX outputs, the local Sam2Segmentation version requires individual_objects = ON; with OFF, the test retained only one silhouette.',
        ],
        facts: [
          { status: 'confirmed', title: 'Multi-person runtime', text: 'On a 1280 × 720 source, indices 0–5 with individual_objects ON produced a combined mask of six people.' },
          { status: 'not-confirmed', title: 'Production composite', text: 'The runtime test confirms the mask chain in isolation; downstream positioning and compositing are verified by later probes.' },
        ],
      },
      {
        id: 'detail-mask',
        eyebrow: '03 · ARCHITECTURE',
        title: 'The detail mask is built on selected base image 592',
        paragraphs: [
          'Prompt 591 and source 592 feed Florence2Run 580. Coordinates 584 and SAM2 585 create the mask used by MaskToImage 583 and ImageCompositeMasked 775.',
        ],
      },
      {
        id: 'polarity',
        eyebrow: '04 · POLARITY',
        title: 'MASK↔IMAGE conversions require visual verification',
        facts: [
          { status: 'confirmed', title: 'No explicit InvertMask', text: 'There is no separate active InvertMask in the significant topology between PEOPLE detection and composite.' },
          { status: 'not-confirmed', title: 'Hidden inversion', text: 'Third-party nodes may interpret intensity/polarity internally; this requires preview or runtime testing.' },
          { status: 'inferred', title: 'QA rule', text: 'Verify white foreground, black background, holes, islands, and size alignment with the image.' },
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'detail-conservation',
    navTitle: 'Detail Conservation',
    eyebrow: 'STAGE 1 · STAGE 2 · BRIDGE',
    title: 'How architectural detail survives SDXL, PEOPLE, and main FLUX',
    lede:
      'One architectural mask controls two active easy imageDetailTransfer stages and one saved post-FLUX transfer. After Stage 1, node 779 fans the image out into seven downstream branches.',
    status: 'confirmed',
    statusNote: 'Targets, sources, masks, and downstream links are confirmed by topology',
    visual: 'detail',
    category: 'base-generation',
    stage: 'detail',
    relatedNodes: [14, 53, 67, 157, 232, 429, 451, 565, 573, 580, 583, 584, 585, 592, 720, 747, 749, 751, 754, 775, 779, 834],
    relatedChapters: ['segmentation-masks', 'people-ppl-overview', 'main-flux', 'output'],
    sections: [
      {
        id: 'detail-mask-build',
        eyebrow: '01 · MASK BUILD',
        title: 'The SAM2 building mask is converted into transfer mask 754',
        paragraphs: [
          'Architectural SAM2 output 585 feeds MaskToImage 583 and ImageCompositeMasked 775. PEOPLE alpha/image from 430 passes through ColorCorrect 751, Cut 747, and Paste 749 on architectural mask representation 583; Image To Mask 754 produces the shared transfer mask.',
        ],
        table: {
          columns: ['Route', 'Role'],
          rows: [
            ['430 → 751 → 747', 'Create a high-contrast PEOPLE-derived cutout for mask placement'],
            ['583 + 747 + 451 → 749', 'Paste on architectural mask/image context'],
            ['749 → 754', 'Intensity mask for transfers'],
            ['585 + 776 + 592 → 775', 'Detail composite source'],
          ],
        },
      },
      {
        id: 'stage-one-two',
        eyebrow: '02 · ACTIVE TRANSFERS',
        title: '565 runs before PPL; 573 runs after the PPL selection',
        table: {
          columns: ['Node', 'Target', 'Source', 'Mask', 'Output'],
          rows: [
            ['565', 'SDXL decode 14', 'Selected base 592', '754', 'Image Filter 779'],
            ['573', 'Selected PPL/main image 459', 'Detail composite 775', '754', 'VAEEncode 67'],
            ['834 · mode 4', 'Main FLUX decode 53', 'Detail composite 775', '754', 'UltimateSDUpscale 833'],
          ],
        },
        facts: [
          { status: 'confirmed', title: 'Effective strength', text: 'Nodes 565/573 receive linked value 720 = 0.09; their stored internal blend widgets are not authoritative.' },
          { status: 'not-confirmed', title: 'Visual preservation', text: 'Topology proves application, not how much facade detail is visually preserved.' },
        ],
      },
      {
        id: 'image-filter',
        eyebrow: '03 · CENTRAL FAN-OUT',
        title: 'Node 779 connects the SDXL result to captioning, masks, PEOPLE, and QA',
        table: {
          columns: ['Consumer', 'Purpose'],
          rows: [
            ['232', 'Automatic SAM2 preview'],
            ['477', 'Environment reference for ColorMatch'],
            ['157', 'Florence2 caption for alternative FLUX prompt'],
            ['429', 'Base scene for first PPL Paste By Mask'],
            ['71', 'INPUT / SDXL comparer'],
            ['72', 'SDXL / FLUX comparer'],
            ['509', 'Base scene for alternative inpaint return'],
          ],
        },
        facts: [
          { status: 'confirmed', title: 'Stored settings', text: 'Timeout 60, send none, external receiver UUID serialized.' },
          { status: 'not-confirmed', title: 'Receiver semantics', text: 'The purpose of the external UUID cannot be inferred from workflow JSON.' },
        ],
      },
    ],
  },
];
