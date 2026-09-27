import type { Chapter } from './manual-types';

export const existingPeopleChaptersEn = ([
  {
    index: 1,
    slug: 'overview',
    navTitle: 'Overview',
    eyebrow: 'PEOPLE / PPL',
    title: 'How a person moves through the Hansen graph',
    lede:
      'The PEOPLE / PPL branch is a self-contained mini-pipeline: it generates a person, builds a mask, prepares the cutout, composites it into the scene, and returns the result to the main image pipeline.',
    status: 'confirmed',
    statusNote: 'Topology verified against the current workflow JSON',
    visual: 'overview',
    sections: [
      {
        id: 'what-it-does',
        eyebrow: '01 · ROLE',
        title: 'Controlled compositing, not an isolated image',
        paragraphs: [
          'The branch operates on top of the base architectural scene. A person is generated separately, isolated, matched to the scene lighting and color, and then inserted into the approved frame. After the selector stage, the result returns to the main pipeline before the final FLUX pass.',
          'Graph topology proves that the PEOPLE branch is connected to the final output. It does not terminate at an intermediate preview.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Source of truth',
            text: 'Epspoziciya_archviz_ph_sdxlflux_v001.json; 252 nodes, 341 links, 28 controls.',
          },
          {
            status: 'confirmed',
            title: 'Key controls',
            text: '408 = PROMPT PPL FLUX; 543 = shared PPL Selector; 715 = Return / Downstream source selector nested before 552.',
          },
          {
            status: 'not-confirmed',
            title: 'Visibility in a specific render',
            text: 'A connected route does not prove mask quality or person visibility without a runtime result.',
          },
        ],
      },
      {
        id: 'route',
        eyebrow: '02 · ROUTE',
        title: 'Exact return into the main chain',
        paragraphs: [
          'After the PEOPLE composite, node 459 sends the selected result to 573 (detail transfer), then to 67 (VAE Encode), 57 (FLUX sampler) and 53 (VAE Decode). In the saved configuration, the active provable endpoint is LQ save 730; HQ / upscale / overlay nodes 832–851 are stored in bypass mode 4.',
        ],
        table: {
          columns: ['Stage', 'Key nodes', 'What to observe'],
          rows: [
            ['Prompt + generation', '408 → 823/824/820 → 831 → 830 → 828 → 829', 'People generated as a separate asset'],
            ['Mask', '550 → 114 → 115 → 144 → 146', 'Clean white silhouette without holes or noise'],
            ['Preparation', '420 → 422 → 477 → 449', 'Clean cutout with scene-compatible color'],
            ['Composite', '429 / 499–510', 'People are at the intended location and scale'],
            ['Return', '543 → 459 → 573 → 67 → 57 → 53', 'The people version continues downstream'],
            ['Current final', '53 → 730', 'People remain visible in the active LQ save'],
            ['Optional HQ chain', '53 → 833 → 848/849 → 15/293', 'Currently BYPASSED; verify after enabling'],
          ],
        },
      },
      {
        id: 'read-status',
        eyebrow: '03 · EVIDENCE',
        title: 'How to read evidence labels in this manual',
        facts: [
          {
            status: 'confirmed',
            title: 'CONFIRMED',
            text: 'The claim is directly supported by a node, widget value, link topology, runtime evidence, or the saved specification.',
          },
          {
            status: 'inferred',
            title: 'INFERRED',
            text: 'The practical role follows from names and connections but has not been independently confirmed by runtime testing.',
          },
          {
            status: 'not-confirmed',
            title: 'NOT CONFIRMED',
            text: 'The workflow JSON does not contain enough evidence; a run, preview or log is required.',
          },
        ],
      },
    ],
  },
  {
    index: 2,
    slug: 'node-408-prompt',
    navTitle: 'Node 408 Prompt',
    eyebrow: 'NODE 408',
    title: 'PROMPT PPL FLUX — the person brief',
    lede:
      'Node 408 describes people for a dedicated FLUX generation pass: character type, clothing, action, scale, camera relationship and integration with the scene.',
    status: 'confirmed',
    statusNote: 'Title, text and downstream links are present in the JSON',
    visual: 'prompt',
    sections: [
      {
        id: 'current-prompt',
        eyebrow: '01 · CURRENT VALUE',
        title: 'Current PPL prompt',
        paragraphs: [
          'Node 408 currently describes several residents of an old Middle Eastern city wearing beige clothing, naturally walking or standing in a stone square. The wording already aligns the characters with the scene in scale and warm evening lighting.',
        ],
        codeExamples: [
          {
            title: 'Exact node 408 text',
            label: 'CONFIRMED · workflow value',
            code:
              'a few Middle Eastern townspeople wearing long beige robes and simple head coverings, naturally walking and standing in an old stone city square, realistic proportions, small and medium scale figures, candid documentary look, visually integrated into the scene, warm evening light',
          },
        ],
      },
      {
        id: 'assembly',
        eyebrow: '02 · ASSEMBLY',
        title: 'How the text is assembled before the encoder',
        paragraphs: [
          'Node 408 is not sent to CLIP by itself. It is concatenated with prefix 825, ENVIRONMENT 799 and LIGHT / STYLE 800. The result is encoded by node 831 and receives FLUX Guidance 2.1 in node 830.',
        ],
        table: {
          columns: ['Node', 'Role', 'Destination'],
          rows: [
            ['825', 'Prefix “fullbody portrait photo of”', '823'],
            ['408', 'Primary person description', '823'],
            ['799', 'Shared environment', '824'],
            ['800 + 822', 'Light / style + additional instruction', '820'],
            ['831', 'CLIPTextEncode for PPL', '830'],
            ['830', 'FluxGuidance = 2.1', '826 → sampler 828'],
          ],
        },
      },
      {
        id: 'prompt-design',
        eyebrow: '03 · PRACTICE',
        title: 'What to include so people do not break an ArchViz frame',
        bullets: [
          'Count and distance: one / a few, small or medium scale figures.',
          'Pose and action: walking, standing, candid; avoid a large portrait unless it is intentional.',
          'Camera relationship: full body, viewing direction, distance to camera, readable silhouette.',
          'Clothing: period-specific and restrained palette aligned with the scene.',
          'Integration: same light, scene context, realistic proportions.',
        ],
        facts: [
          {
            status: 'inferred',
            title: 'Prompt rule',
            text: 'The more explicitly scale, full-body framing and scene-light relationship are defined, the lower the risk of getting a studio-style character.',
          },
          {
            status: 'not-confirmed',
            title: 'Dedicated PPL negative',
            text: 'A fully connected dedicated negative prompt for the PPL path is not proven by the exported chain.',
          },
        ],
        codeExamples: [
          {
            title: 'Neutral ArchViz template',
            label: 'INFERRED · practical template',
            code:
              'a few museum visitors, full body, naturally walking and standing, neutral earth-tone clothing, small and medium scale figures, candid documentary look, correct perspective, clean readable silhouettes, naturally integrated into the architecture, same ambient light as the scene',
            note: 'This is a practical template, not a stored workflow value.',
          },
        ],
      },
    ],
  },
  {
    index: 3,
    slug: 'generation',
    navTitle: 'Generation',
    eyebrow: 'PPL GENERATION',
    title: 'From text to a standalone FLUX image',
    lede:
      'The branch uses the shared FLUX model stack but separate conditioning and its own sampling path for the people image.',
    status: 'confirmed',
    statusNote: 'Model loaders, encoder, guidance, scheduler, sampler and decode are connected in the JSON',
    visual: 'generation',
    sections: [
      {
        id: 'stack',
        eyebrow: '01 · MODEL STACK',
        title: 'Models and encoder',
        table: {
          columns: ['Node', 'Component', 'Current value'],
          rows: [
            ['467', 'UNet Loader GGUF', 'flux1-dev-Q8_0.gguf'],
            ['466', 'Dual CLIP Loader GGUF', 't5-v1_1-xxl-encoder-Q8_0.gguf + clip_l.safetensors'],
            ['54', 'FLUX VAE', 'ae.safetensors'],
            ['831', 'PPL CLIPTextEncode', 'Text assembled by 820'],
            ['830', 'FluxGuidance', '2.1'],
          ],
        },
      },
      {
        id: 'sampling',
        eyebrow: '02 · SAMPLING',
        title: 'From conditioning to VAEDecode 829',
        paragraphs: [
          'Encoder 831 sends conditioning through Guidance 830 into guider 826. SamplerCustomAdvanced 828 receives the shared Euler sampler, noise / seed, scheduler 819 and latent source 827. Decode 829 produces the people image.',
          'Node 771 = 24 steps is linked to the PPL scheduler. The serialized BasicScheduler 819 widget stores beta, 4 and denoise 1; linked steps override the local step value.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Generation output',
            text: 'Node 829 is VAEDecode; it is visible in PreviewImage 409 and its output is connected to image1 of selector 552.',
          },
          {
            status: 'confirmed',
            title: 'Shared seed',
            text: 'RandomNoise 61 is linked to GLOBAL Seed 231 and is also used by sampler 828.',
          },
          {
            status: 'not-confirmed',
            title: 'Actual image quality',
            text: 'The JSON proves parameters and links, not pose, anatomy or quality of a specific render.',
          },
        ],
      },
      {
        id: 'generation-check',
        eyebrow: '03 · CHECKPOINT',
        title: 'The first diagnostic boundary',
        bullets: [
          'Open PreviewImage 409 after node 829.',
          'If there are no people here, inspect 408, assembly 823/824/820, loader stack, seed and sampler.',
          'If people are present here, generation is complete; do not keep changing the prompt blindly — move to the mask chain.',
        ],
      },
    ],
  },
  {
    index: 4,
    slug: 'segmentation-mask',
    navTitle: 'Segmentation / Mask',
    eyebrow: 'MASK CHAIN',
    title: 'Florence2 → SAM2 → grow → blur',
    lede:
      'Segmentation finds people and related classes, turns bbox / points into a SAM2 mask, expands the edge and softens it before crop and composite.',
    status: 'confirmed',
    statusNote: 'Nodes 550, 114, 115, 144 and 146 form a continuous chain',
    visual: 'mask',
    sections: [
      {
        id: 'detection',
        eyebrow: '01 · DETECTION',
        title: 'Florence2 searches for more than “person”',
        paragraphs: [
          'Node 550 runs caption_to_phrase_grounding at size 1024. The saved class list contains people, human, face, hand, feet, shoe, leg, bag, backpack, pet, dog, cat, gun, animal.',
          'The broad list can help capture figure details and carried objects, but it can also pull an unrelated nearby object into the mask.',
        ],
        codeExamples: [
          {
            title: 'Node 550 class list',
            label: 'CONFIRMED · serialized widget',
            code:
              'people, human, face, hand, feet, shoe, leg, bag, backpack, pet, dog, cat, gun, animal',
          },
        ],
      },
      {
        id: 'mask-pipeline',
        eyebrow: '02 · MASK',
        title: 'Edge-processing sequence',
        table: {
          columns: ['Node', 'Operation', 'Current value / output'],
          rows: [
            ['550', 'Florence2Run', 'Detection result + data'],
            ['114', 'Florence2toCoordinates', 'Coordinates for SAM2'],
            ['115', 'Sam2Segmentation', 'Mask output'],
            ['144', 'GrowMask', '5 px, tapered = true'],
            ['146', 'MaskBlur+', '10, auto'],
            ['420', 'easy imageCropFromMask', 'Person-region crop'],
            ['500 → 499', 'MaskToImage → Separate Mask Components', 'Independent components for inpaint'],
          ],
        },
      },
      {
        id: 'runtime-multi-bbox',
        eyebrow: '03 · CONFIRMED RUNTIME',
        title: 'One canvas + individual_objects = ON produces the full group mask',
        paragraphs: [
          'A runtime check on 2026-09-07 confirmed the full Florence2 → BBOX → SAM2 route on a 1280 × 720 test image containing six people. Florence2 and SAM2 must receive the same image: coordinates computed on another size or frame produce displaced or false masks.',
          'In the installed ComfyUI-segment-anything-2 version, BBOX indices 0,1,2,3,4,5 produced the full group mask only with individual_objects = ON. With OFF, the node returned one silhouette even though Florence2 showed boxes for all people.',
        ],
        table: {
          columns: ['Check', 'Confirmed value', 'Failure symptom'],
          rows: [
            ['Image contract', 'Florence2 image = SAM2 image = 1280 × 720', 'Mask lands on a building, corner or empty area'],
            ['Florence generation', 'num_beams 3 · do_sample OFF', 'Unstable boxes and changing indices'],
            ['BBOX selection', 'index 0,1,2,3,4,5', 'Only one object or the wrong object is selected'],
            ['SAM2 multi-object', 'individual_objects ON', 'OFF leaves only one silhouette'],
            ['Mask cleanup', 'Threshold 0.30 in the test', 'Threshold is refined against clothing/limb edges'],
          ],
        },
        facts: [
          {
            status: 'confirmed',
            title: 'Six-person mask',
            text: 'The test produced a combined foreground mask for all six people and a correct inverted protect mask.',
          },
          {
            status: 'not-confirmed',
            title: 'Final scene composite',
            text: 'The test confirms detection/segmentation but does not yet prove the cutout through positioning, selector and final output.',
          },
        ],
      },
      {
        id: 'mask-quality',
        eyebrow: '04 · VISUAL QA',
        title: 'What counts as a usable mask',
        bullets: [
          'The white silhouette covers the whole figure, including feet and small objects that must remain.',
          'There are no large holes inside the body or isolated islands far from the figure.',
          'The edge does not cut off arms, feet or headwear.',
          'Grow 5 and blur 10 do not create an obvious halo against a high-contrast background.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'No active InvertMask',
            text: 'No separate explicit InvertMask node is present in this branch.',
          },
          {
            status: 'not-confirmed',
            title: 'Hidden inversion',
            text: 'Internal polarity behavior of third-party nodes cannot be established from the workflow JSON alone.',
          },
        ],
      },
    ],
  },
  {
    index: 5,
    slug: 'preparation-color-match',
    navTitle: 'Preparation / Color Match',
    eyebrow: 'PREPARATION',
    title: 'Background cleanup and scene matching',
    lede:
      'After crop, the figure is cleaned with Inspyrenet, receives a mask, is color-matched to the scene, and becomes a ready-to-composite cutout.',
    status: 'confirmed',
    statusNote: 'The 420 → 422 / 475 → 477 → 449 chain is visible in topology',
    visual: 'preparation',
    sections: [
      {
        id: 'cleanup',
        eyebrow: '01 · BACKGROUND REMOVAL',
        title: 'Node 422 creates person + alpha',
        paragraphs: [
          'easy imageRemBg 422 receives crop 781 from 420 and uses Inspyrenet. The stored prefix is ph_ppl. Its image output goes to 475, while its mask passes through MaskToImage 430 to Cut By Mask 449 and diagnostic consumers.',
        ],
        table: {
          columns: ['Node', 'Input', 'Output / purpose'],
          rows: [
            ['420', 'Main image + mask 146', 'Crop 781'],
            ['422', 'Crop 781', 'Cleaned person + mask'],
            ['430', 'Mask from 422', 'Mask image for 449 / previews'],
            ['475', 'Person from 422', 'Image preparation for ColorMatch'],
          ],
        },
      },
      {
        id: 'color-match',
        eyebrow: '02 · COLOR MATCH',
        title: 'Node 477 aligns the figure with the scene',
        paragraphs: [
          'ColorMatch 477 uses the hm-mvgd-hm method. Its widget stores 0.6, but strength is linked to control 717, whose current value is 0.44. The reference environment comes from node 779.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Effective strength',
            text: 'Linked control 717 = 0.44 drives node 477 strength; local widget 0.6 should not be read as the runtime value.',
          },
          {
            status: 'inferred',
            title: 'Practical purpose',
            text: 'Reduce the pasted-on look by bringing temperature, brightness and overall color closer to the scene.',
          },
        ],
      },
      {
        id: 'preparation-symptoms',
        eyebrow: '03 · SYMPTOMS',
        title: 'The image often tells you which preparation stage failed',
        table: {
          columns: ['Symptom', 'Likely area', 'Check'],
          rows: [
            ['Light/dark halo', 'Mask edge', '144 GrowMask, 146 MaskBlur, output 430'],
            ['Figure feels tonally disconnected', 'ColorMatch', 'Reference 779 and effective strength 717'],
            ['Part of the old background remains', 'RemBg', 'Crop 781 and outputs 422'],
            ['Figure is already soft before paste', 'Resize / crop', '420, 475, 449'],
          ],
        },
      },
    ],
  },
  {
    index: 6,
    slug: 'selector-logic',
    navTitle: 'Selector Logic',
    eyebrow: 'NODES 543 / 715',
    title: 'Widget value ≠ effective runtime value',
    lede:
      'Shared PPL selector 543 distributes one control INT to several image switches. The number displayed inside a child selector may therefore be only a stored widget value, not the active runtime value.',
    status: 'confirmed',
    statusNote: 'Control links and values verified against workflow topology',
    visual: 'selectors',
    sections: [
      {
        id: 'master-selector',
        eyebrow: '01 · NODE 543',
        title: 'One control drives four selectors',
        paragraphs: [
          'Node 543 is titled SWITCH PPL: 1=FLUX / 2=INPUT and currently equals 1. Its output is connected to the control input of nodes 459, 522, 552 and 715.',
        ],
        table: {
          columns: ['Selector', 'Stored widget', 'Linked control', 'Effective now'],
          rows: [
            ['459 · PPL Switch', '1', '543 = 1', 'FLUX composite'],
            ['522 · People Input Switch', '1', '543 = 1', 'FLUX mask/inpaint source'],
            ['552 · People Input Switch', '1', '543 = 1', 'FLUX-generated input'],
            ['715 · Return / Downstream source selector', '2', '543 = 1', 'Outputs BASE #79, but 552 currently ignores this input'],
          ],
        },
      },
      {
        id: 'node-715',
        eyebrow: '02 · NODE 715',
        title: 'Why “2” inside node 715 does not mean mode 2',
        paragraphs: [
          '715 is a CR Image Input Switch titled “People Input Switch 1=FLUX / 2=3D rendered”. Its image1 comes from BASE IMAGE 79, image2 from SDXL VAEDecode 14, and its output feeds image2 of node 552. The widget stores 2, but control Input is linked to node 543.',
          'With current 543 = 1, node 715 outputs #79, while node 552 simultaneously chooses its own image1 = PPL FLUX #829. The output of 715 therefore does not enter the current production path. In this manual, 715 is labeled Return / Downstream Selector — a functional label for nested downstream source selection, not an independent final composite.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Current effective control',
            text: '543 = 1 makes 715 select BASE #79, but downstream 552 selects #829 and ignores output 715.',
          },
          {
            status: 'confirmed',
            title: 'Downstream',
            text: 'Node 715 output is connected to an input of node 552.',
          },
          {
            status: 'inferred',
            title: 'Nested-switch nuance',
            text: 'The #79 → 715 → 552 branch is unreachable under the normal 1/2 states: at 1, 552 ignores it; at 2, 715 itself selects #14.',
          },
        ],
      },
      {
        id: 'mode-change',
        eyebrow: '03 · SAFE SWITCHING',
        title: 'Change PPL mode at node 543',
        bullets: [
          '1 — use the FLUX-generated people branch.',
          '2 — use the INPUT / 3D-rendered people branch.',
          'Do not manually align widgets 459/522/552/715 while their control input remains linked to 543.',
          'After changing mode, verify not only generation preview but also output node 459.',
        ],
      },
    ],
  },
  {
    index: 7,
    slug: 'composite',
    navTitle: 'Composite',
    eyebrow: 'MERGE + RETURN',
    title: 'Two levels of composite and return into FLUX',
    lede:
      'The prepared person is first pasted into the scene by mask. A separate inpaint/detail branch can then process mask components, after which selector 459 chooses the PPL result for the main pipeline.',
    status: 'confirmed',
    statusNote: 'Cut, paste, inpaint and return links are present in graph data',
    visual: 'composite',
    sections: [
      {
        id: 'first-composite',
        eyebrow: '01 · FIRST COMPOSITE',
        title: 'Cut 449 → Paste 429',
        paragraphs: [
          'ColorMatch 477 and mask 430 converge in Cut By Mask 449. Paste By Mask 429 inserts the cutout into reference / main image 779 with placement mask 451 and keep_ratio_fit mode. Its output is node 672.',
        ],
        table: {
          columns: ['Node', 'Operation', 'Key input / output'],
          rows: [
            ['449', 'Cut By Mask', '477 + 430 → cutout'],
            ['429', 'Paste By Mask', '451 + 449 + 779 → 672'],
            ['480', 'Image Comparer MASK / PPL', '451 vs selected PPL output 459'],
          ],
        },
      },
      {
        id: 'second-composite',
        eyebrow: '02 · INPAINT / DETAIL',
        title: 'Mask components are processed independently',
        paragraphs: [
          'Mask components 499/502 create regions for cut 503/504. Inpaint conditioning 494, sampler 495 and decode 496 generate a processed fragment. Combine Masks 510 and Paste By Mask 509 return it to the scene.',
        ],
        table: {
          columns: ['Subchain', 'Nodes', 'Result'],
          rows: [
            ['Region split', '499 → 502', 'Independent mask regions'],
            ['Cut', '503 / 504', 'Person crop + local scene region'],
            ['Inpaint', '494 → 495 → 496', 'Processed latent / image'],
            ['Return paste', '510 → 509', 'Fragment returned to the main image'],
          ],
        },
      },
      {
        id: 'main-return',
        eyebrow: '03 · MAIN RETURN',
        title: 'Where PPL becomes part of the shared scene again',
        paragraphs: [
          'Selector 459 chooses the PPL composite and sends it to easy imageDetailTransfer 573. Blend comes from control 720 = 0.09; local widget 573 stores 1. VAEEncode 67 then starts the shared FLUX stage 57 → 53.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Route reaches final',
            text: '459 → 573 → 67 → 57 → 53 → active LQ save 730. The optional HQ chain exists but is stored in bypass.',
          },
          {
            status: 'confirmed',
            title: 'Direct LQ evidence point',
            text: 'Decode 53 is saved by node 730 before later overlay/output steps.',
          },
          {
            status: 'not-confirmed',
            title: 'Visual survival',
            text: 'If the HQ / overlay chain is enabled, later processing may alter people; in the current saved state that chain is bypassed.',
          },
        ],
      },
    ],
  },
] satisfies Omit<Chapter, 'category'>[]).sort((a, b) => a.index - b.index);
