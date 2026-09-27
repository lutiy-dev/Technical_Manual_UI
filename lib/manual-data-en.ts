import type {
  Chapter,
  ChapterSection,
  ManualCategory,
} from './manual-types';
import { additionalChapters } from './manual-en';

export type {
  Chapter,
  ChapterSection,
  CodeExample,
  DataTable,
  EvidenceStatus,
  Fact,
  ManualCategory,
} from './manual-types';

export const sourceRoot =
  '/resources/EPSPOZICIYA_HANSEN_TECHNICAL_MANUAL_SOURCE';

const existingChapters = ([
  {
    index: 1,
    slug: 'overview',
    navTitle: 'Overview',
    eyebrow: 'PEOPLE / PPL',
    title: 'How a person moves through the Hansen graph',
    lede:
      'The PEOPLE / PPL branch is a self-contained mini-pipeline: it generates a person, builds a mask, prepares the cutout, composites it into the scene, and returns the result to the main image path.',
    status: 'confirmed',
    statusNote: 'Topology verified against the current workflow JSON',
    visual: 'overview',
    sections: [
      {
        id: 'what-it-does',
        eyebrow: '01 · ROLE',
        title: 'Controlled compositing, not a separate final image',
        paragraphs: [
          'The branch operates on top of the base architectural scene. The person is generated separately, isolated, matched to the scene lighting and color, and then composited into the image. After the selectors, the result returns to the main pipeline before the final FLUX pass.',
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
            text: 'A connected route does not prove mask quality or visible people without a runtime result.',
          },
        ],
      },
      {
        id: 'route',
        eyebrow: '02 · ROUTE',
        title: 'Exact return into the main chain',
        paragraphs: [
          'After the PEOPLE composite, node 459 sends the selected result to 573 (detail transfer), then 67 (VAE Encode), 57 (FLUX sampler), and 53 (VAE Decode). In the saved configuration, the active provable endpoint is LQ save 730; HQ / upscale / overlay nodes 832–851 are stored in bypass mode 4.',
        ],
        table: {
          columns: ['Stage', 'Key nodes', 'What to observe'],
          rows: [
            ['Prompt + generation', '408 → 823/824/820 → 831 → 830 → 828 → 829', 'People generated independently'],
            ['Mask', '550 → 114 → 115 → 144 → 146', 'Clean white silhouette without holes or noise'],
            ['Preparation', '420 → 422 → 477 → 449', 'Clean cutout with scene-matched color'],
            ['Composite', '429 / 499–510', 'People are in the intended position and scale'],
            ['Return', '543 → 459 → 573 → 67 → 57 → 53', 'The version with people continues downstream'],
            ['Current final', '53 → 730', 'People remain visible in the active LQ save'],
            ['Optional HQ chain', '53 → 833 → 848/849 → 15/293', 'Currently saved in BYPASS; verify after enabling'],
          ],
        },
      },
      {
        id: 'read-status',
        eyebrow: '03 · EVIDENCE',
        title: 'How to read evidence states in this manual',
        facts: [
          {
            status: 'confirmed',
            title: 'CONFIRMED',
            text: 'The statement is directly supported by a node, widget value, link topology, or saved specification.',
          },
          {
            status: 'inferred',
            title: 'INFERRED',
            text: 'The practical interpretation follows from names and connections, but has not been independently runtime-tested.',
          },
          {
            status: 'not-confirmed',
            title: 'NOT CONFIRMED',
            text: 'The workflow JSON does not contain enough evidence; runtime execution, preview, or logs are required.',
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
    title: 'PROMPT PPL FLUX — the brief for the person',
    lede:
      'Node 408 describes people for the dedicated FLUX generation branch: character type, clothing, action, scale, viewing angle, and relationship to the scene.',
    status: 'confirmed',
    statusNote: 'Title, text, and downstream links are present in the JSON',
    visual: 'prompt',
    sections: [
      {
        id: 'current-prompt',
        eyebrow: '01 · CURRENT VALUE',
        title: 'Current PPL prompt',
        paragraphs: [
          'Node 408 currently describes several residents of an old Middle Eastern city in beige clothing, naturally walking or standing on a stone square. The text is already aligned with the scene in materials, scale, and warm evening light.',
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
        title: 'How the text is assembled before encoding',
        paragraphs: [
          'Node 408 is not sent to CLIP on its own. It is concatenated with prefix 825, ENVIRONMENT 799, and LIGHT / STYLE 800. The result is encoded by node 831 and receives FLUX Guidance 2.1 at node 830.',
        ],
        table: {
          columns: ['Node', 'Role', 'Destination'],
          rows: [
            ['825', 'Prefix “fullbody portrait photo of”', '823'],
            ['408', 'Primary description of people', '823'],
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
        title: 'What to keep in the prompt so people do not break Archviz',
        bullets: [
          'Count and distance: one / a few, small or medium scale figures.',
          'Pose and action: walking, standing, candid; avoid a large portrait unless it is actually required.',
          'Camera: full body, view direction, distance to camera, readable silhouette.',
          'Clothing: specific period and restrained palette aligned with the scene.',
          'Integration: same light, scene context, realistic proportions.',
        ],
        facts: [
          {
            status: 'inferred',
            title: 'Prompt rule',
            text: 'The more explicitly scale, full-body framing, and scene lighting are stated, the lower the risk of producing a studio-style character.',
          },
          {
            status: 'not-confirmed',
            title: 'Dedicated PPL negative',
            text: 'A fully connected dedicated negative prompt for PPL is not proven in the exported route.',
          },
        ],
        codeExamples: [
          {
            title: 'Example for a neutral Archviz scene',
            label: 'INFERRED · practical template',
            code:
              'a few museum visitors, full body, naturally walking and standing, neutral earth-tone clothing, small and medium scale figures, candid documentary look, correct perspective, clean readable silhouettes, naturally integrated into the architecture, same ambient light as the scene',
            note: 'This is a practical template, not a saved workflow value.',
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
    title: 'From text to an independent FLUX image',
    lede:
      'The branch uses the shared FLUX model stack but has dedicated conditioning and its own sampling path for the person image.',
    status: 'confirmed',
    statusNote: 'Model loaders, encoder, guidance, scheduler, sampler, and decode are connected in the JSON',
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
            ['831', 'PPL CLIPTextEncode', 'Text from 820'],
            ['830', 'FluxGuidance', '2.1'],
          ],
        },
      },
      {
        id: 'sampling',
        eyebrow: '02 · SAMPLING',
        title: 'From conditioning to VAEDecode 829',
        paragraphs: [
          'Encoder 831 passes conditioning through Guidance 830 into guider 826. SamplerCustomAdvanced 828 receives the shared Euler sampler, noise / seed, scheduler 819, and latent source 827. Decode 829 creates the person image.',
          'Node 771 = 24 steps is linked to the PPL scheduler. The serialized BasicScheduler 819 widget shows beta, 4, and denoise 1; linked steps override the local step value.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Generation output',
            text: 'Node 829 is VAEDecode; it can be inspected in PreviewImage 409, and its output is connected to image1 of selector 552.',
          },
          {
            status: 'confirmed',
            title: 'Shared seed',
            text: 'RandomNoise 61 is linked to GLOBAL Seed 231 and is also used by sampler 828.',
          },
          {
            status: 'not-confirmed',
            title: 'Actual quality',
            text: 'The JSON proves parameters and connections, not pose, anatomy, or the visual quality of a particular render.',
          },
        ],
      },
      {
        id: 'generation-check',
        eyebrow: '03 · CHECKPOINT',
        title: 'The first diagnostic boundary',
        bullets: [
          'Open PreviewImage 409 after node 829.',
          'If there are no people here, inspect 408, concatenation 823/824/820, loader stack, seed, and sampler.',
          'If people are present here, generation is complete; do not keep changing the prompt blindly — continue to the mask chain.',
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
      'Segmentation finds people and related classes, converts bbox / points into a SAM2 mask, expands the edge, and softens it before crop and composite.',
    status: 'confirmed',
    statusNote: 'Nodes 550, 114, 115, 144, and 146 form a continuous chain',
    visual: 'mask',
    sections: [
      {
        id: 'detection',
        eyebrow: '01 · DETECTION',
        title: 'Florence2 searches for more than “person”',
        paragraphs: [
          'Node 550 runs caption_to_phrase_grounding at size 1024. The saved list contains people, human, face, hand, feet, shoe, leg, bag, backpack, pet, dog, cat, gun, animal.',
          'The broad list can help capture figure details and carried objects, but it can also introduce an unrelated nearby object into the mask.',
        ],
        codeExamples: [
          {
            title: 'Classes stored in node 550',
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
            ['420', 'easy imageCropFromMask', 'Crop around the person'],
            ['500 → 499', 'MaskToImage → Separate Mask Components', 'Individual components for inpaint'],
          ],
        },
      },
      {
        id: 'runtime-multi-bbox',
        eyebrow: '03 · CONFIRMED RUNTIME',
        title: 'One canvas plus individual_objects = ON produces the full-group mask',
        paragraphs: [
          'Runtime verification on 2026-09-07 confirmed the full Florence2 → BBOX → SAM2 route on a 1280 × 720 test image with six people. Florence2 and SAM2 must receive the same image: coordinates calculated on another size or frame produce shifted or false masks.',
          'In the installed ComfyUI-segment-anything-2 version, BBOX indices 0,1,2,3,4,5 produced a mask of the entire group only with individual_objects = ON. With OFF, the node returned a single silhouette even though Florence2 displayed boxes for all people.',
        ],
        table: {
          columns: ['Check', 'Confirmed value', 'Failure symptom'],
          rows: [
            ['Image contract', 'Florence2 image = SAM2 image = 1280 × 720', 'Mask covers a building, corner, or empty region'],
            ['Florence generation', 'num_beams 3 · do_sample OFF', 'Unstable boxes and changing indices'],
            ['BBOX selection', 'index 0,1,2,3,4,5', 'Only one object or the wrong object is selected'],
            ['SAM2 multi-object', 'individual_objects ON', 'With OFF, only one silhouette remains'],
            ['Mask cleanup', 'Threshold 0.30 in the test', 'Threshold still needs edge tuning around clothing and limbs'],
          ],
        },
        facts: [
          {
            status: 'confirmed',
            title: 'Six-person mask',
            text: 'A combined foreground mask for the complete group and a correct inverted protect-mask were produced.',
          },
          {
            status: 'not-confirmed',
            title: 'Final scene composite',
            text: 'The test confirms detection/segmentation, but does not yet prove the cutout survives positioning, selector, and final output.',
          },
        ],
      },
      {
        id: 'mask-quality',
        eyebrow: '04 · VISUAL QA',
        title: 'What counts as a usable mask',
        bullets: [
          'The white silhouette covers the complete figure, including feet and small objects that should remain.',
          'There are no large holes inside the body and no random islands far from the figure.',
          'The edge does not cut off hands, feet, or head covering.',
          'Grow 5 and blur 10 do not create a visible halo against a high-contrast background.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'No active InvertMask',
            text: 'No separate explicit InvertMask node was found in this branch.',
          },
          {
            status: 'not-confirmed',
            title: 'Hidden inversion',
            text: 'Internal behavior of third-party nodes cannot be determined from workflow JSON alone.',
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
      'After crop, the figure is cleaned with Inspyrenet, receives a mask, is color-matched to the scene, and is cut into a compositing-ready element.',
    status: 'confirmed',
    statusNote: 'The 420 → 422 / 475 → 477 → 449 chain is visible in topology',
    visual: 'preparation',
    sections: [
      {
        id: 'cleanup',
        eyebrow: '01 · BACKGROUND REMOVAL',
        title: 'Node 422 creates person + alpha',
        paragraphs: [
          'easy imageRemBg 422 receives crop 781 from 420 and uses the Inspyrenet model. The saved prefix is ph_ppl. Its image output goes to 475, while its mask passes through MaskToImage 430 to Cut By Mask 449 and diagnostic consumers.',
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
        title: 'Node 477 matches the figure to the scene',
        paragraphs: [
          'ColorMatch 477 uses method hm-mvgd-hm. The widget stores 0.6, but its strength input is linked to control 717, whose current value is 0.44. The environment reference comes from node 779.',
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
            text: 'Reduce the “sticker” effect by bringing figure temperature, brightness, and overall color closer to the environment.',
          },
        ],
      },
      {
        id: 'preparation-symptoms',
        eyebrow: '03 · SYMPTOMS',
        title: 'The image often reveals which preparation stage failed',
        table: {
          columns: ['Symptom', 'Likely area', 'Check'],
          rows: [
            ['Light / dark halo', 'Mask edge', '144 GrowMask, 146 MaskBlur, output 430'],
            ['Figure feels tonally foreign', 'ColorMatch', 'Reference 779 and effective strength 717'],
            ['Part of the old background remains', 'RemBg', 'Crop 781 and outputs 422'],
            ['Figure is blurred before paste', 'Resize / crop', '420, 475, 449'],
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
      'Shared PPL selector 543 distributes one controlling INT to several image switches. A number displayed inside a downstream selector may therefore be only a stored widget value rather than the active value.',
    status: 'confirmed',
    statusNote: 'Control links and values verified from workflow topology',
    visual: 'selectors',
    sections: [
      {
        id: 'master-selector',
        eyebrow: '01 · NODE 543',
        title: 'One control drives four selectors',
        paragraphs: [
          'Node 543 is titled SWITCH PPL: 1=FLUX / 2=INPUT and currently equals 1. Its output is connected to the control input of nodes 459, 522, 552, and 715.',
        ],
        table: {
          columns: ['Selector', 'Stored widget', 'Linked control', 'Effective now'],
          rows: [
            ['459 · PPL Switch', '1', '543 = 1', 'FLUX composite'],
            ['522 · People Input Switch', '1', '543 = 1', 'FLUX mask/inpaint source'],
            ['552 · People Input Switch', '1', '543 = 1', 'FLUX-generated input'],
            ['715 · Return / Downstream source selector', '2', '543 = 1', 'Returns BASE #79, but 552 currently ignores this input'],
          ],
        },
      },
      {
        id: 'node-715',
        eyebrow: '02 · NODE 715',
        title: 'Why “2” inside 715 does not mean mode 2',
        paragraphs: [
          '715 is a CR Image Input Switch titled “People Input Switch 1=FLUX / 2=3D rendered”. Its image1 comes from BASE IMAGE 79, image2 from SDXL VAEDecode 14, and its output connects to image2 of node 552. The widget stores 2, but control Input is linked to node 543.',
          'With the current 543 = 1, node 715 returns #79, while node 552 simultaneously selects its own image1 = PPL FLUX #829. Output 715 therefore does not enter the current production path. In this manual, 715 is retained as Return / Downstream Selector — a functional label for nested downstream source selection, not a standalone final composite.',
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
            text: 'Output node 715 is connected to an input of node 552.',
          },
          {
            status: 'inferred',
            title: 'Nested-switch nuance',
            text: 'Route #79 → 715 → 552 is unreachable under the standard 1/2 states: with 1, 552 ignores it; with 2, node 715 itself already selects #14.',
          },
        ],
      },
      {
        id: 'mode-change',
        eyebrow: '03 · SAFE SWITCHING',
        title: 'Change the mode at 543',
        bullets: [
          '1 — use the FLUX-generated people branch.',
          '2 — use the INPUT / 3D-rendered people branch.',
          'Do not manually align widgets 459/522/552/715 while their control input is linked to 543.',
          'After switching modes, verify not only the generation preview but also output node 459.',
        ],
      },
    ],
  },
  {
    index: 7,
    slug: 'composite',
    navTitle: 'Composite',
    eyebrow: 'MERGE + RETURN',
    title: 'Two levels of compositing and the return into FLUX',
    lede:
      'First, the prepared person is pasted into the scene by mask. Then a separate inpaint/detail branch can process mask components, after which selector 459 chooses the PPL result for the main pipeline.',
    status: 'confirmed',
    statusNote: 'Cut, paste, inpaint, and return links are present in graph data',
    visual: 'composite',
    sections: [
      {
        id: 'first-composite',
        eyebrow: '01 · FIRST COMPOSITE',
        title: 'Cut 449 → Paste 429',
        paragraphs: [
          'ColorMatch 477 and mask 430 meet in Cut By Mask 449. Paste By Mask 429 inserts the cutout into reference / main image 779 using placement mask 451 and keep_ratio_fit mode. Its output is node 672.',
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
          'Mask components 499/502 create regions for cuts 503/504. Inpaint conditioning 494, sampler 495, and decode 496 generate the processed fragment. Combine Masks 510 and Paste By Mask 509 return it to the scene.',
        ],
        table: {
          columns: ['Sub-chain', 'Nodes', 'Result'],
          rows: [
            ['Region split', '499 → 502', 'Separate mask regions'],
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
          'Selector 459 chooses the PPL composite and sends it to easy imageDetailTransfer 573. Blend comes from control 720 = 0.09; local widget 573 stores 1. VAEEncode 67 then begins the shared FLUX stage 57 → 53.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Route reaches final',
            text: '459 → 573 → 67 → 57 → 53 → active LQ save 730. The optional HQ chain exists but is saved in bypass.',
          },
          {
            status: 'confirmed',
            title: 'Direct LQ evidence point',
            text: 'Decode 53 is saved by node 730 before later overlay/output stages.',
          },
          {
            status: 'not-confirmed',
            title: 'Visual survival',
            text: 'After the HQ / overlay chain is enabled, later processing may alter people; in the current saved state that chain is bypassed.',
          },
        ],
      },
    ],
  },
  {
    index: 9,
    slug: 'diagnostics',
    navTitle: 'Diagnostics',
    eyebrow: 'FAILURE TRACE',
    title: 'Find where the people disappear',
    lede:
      'Diagnostics proceeds from left to right: do not change a late composite until generation and mask are proven to work.',
    status: 'inferred',
    statusNote: 'The checking order is derived from confirmed preview / comparer nodes',
    visual: 'diagnostics',
    sections: [
      {
        id: 'probe-points',
        eyebrow: '01 · PROBES',
        title: 'Diagnostic checkpoints already present in the workflow',
        table: {
          columns: ['What to verify', 'Node', 'Interpretation'],
          rows: [
            ['Generated people', '409 ← 829', 'If empty, the problem is before the mask chain'],
            ['Florence result', '113 ← 550', 'Detection should find the intended objects'],
            ['Cut / selected crop', '507 ← 503; 508 ← 522', 'Verify source switch and crop'],
            ['Mask vs PPL', '480 ← 451 / 459', 'Compare placement mask with selected composite'],
            ['Inpaint vs source', '518 ← 509 / 552', 'Compare processed result with selected input'],
            ['Current final save', '730 ← 53', 'Active result point for the saved configuration'],
            ['Optional FLUX vs Upscale', '141 ← 53 / 833', 'HQ / upscale chain is currently saved in bypass'],
            ['Optional final preview', '15 ← 849', 'Inspect only after enabling the overlay chain'],
          ],
        },
      },
      {
        id: 'symptom-matrix',
        eyebrow: '02 · SYMPTOM MATRIX',
        title: 'Symptom → likely area',
        table: {
          columns: ['Last working stage', 'Most likely failure', 'Next test'],
          rows: [
            ['No people in 409', 'Prompt / model / sampler', 'Verify 408 → 831 → 828 → 829'],
            ['Florence sees all boxes, SAM2 keeps one person', 'Sam2Segmentation multi-BBOX mode', 'Enable individual_objects and repeat with the same indices'],
            ['Mask lands on a building, corner, or empty region', 'Florence2 and SAM2 received different image / canvas', 'Feed the same-size source to detection and segmentation'],
            ['409 works, mask is poor', '550 / 114 / 115 / 144 / 146', 'Simplify classes and inspect edges'],
            ['Mask is good, cutout is dirty', '420 / 422 / 430', 'Inspect crop and RemBg outputs'],
            ['Composite exists, 459 selects the wrong result', '543 / linked selector inputs', 'Verify effective value = 1'],
            ['730 contains people, final 15 loses them after HQ is enabled', 'Upscale / overlay / late overwrite', 'Compare 141, 730, and 15'],
          ],
        },
      },
      {
        id: 'current-hypothesis',
        eyebrow: '03 · CURRENT CASE',
        title: 'What is known about the current case',
        facts: [
          {
            status: 'confirmed',
            title: 'Topology',
            text: 'The PPL branch reaches final output; there is no link break after node 459.',
          },
          {
            status: 'inferred',
            title: 'Likely area',
            text: 'If generation and mask are visibly present, investigate positioning, composite, selector output, or a late overwrite.',
          },
          {
            status: 'not-confirmed',
            title: 'Exact failure node',
            text: 'Without a current set of runtime previews, naming one responsible node would not be justified.',
          },
        ],
      },
    ],
  },
  {
    index: 10,
    slug: 'checklist',
    navTitle: 'Checklist',
    eyebrow: 'PRE-FLIGHT',
    title: 'PEOPLE checks before the final render',
    lede:
      'Mark items as they are verified. Progress is stored only in this browser and does not modify the workflow.',
    status: 'inferred',
    statusNote: 'The practical order is assembled from confirmed checkpoints',
    visual: 'checklist',
    sections: [
      {
        id: 'how-to-use',
        eyebrow: '01 · RULE',
        title: 'One stage, one piece of evidence',
        paragraphs: [
          'Do not mark a step “by eye” from the final frame. For every stage, open the specified preview / comparer and verify that its own output matches the expected result.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Workflow remains read-only',
            text: 'The checklist runs inside the site and writes nothing to the ComfyUI JSON.',
          },
          {
            status: 'inferred',
            title: 'Best practice',
            text: 'Keep one seed during diagnostics so routing problems are not confused with generation variability.',
          },
        ],
      },
      {
        id: 'completion',
        eyebrow: '02 · DONE CRITERIA',
        title: 'When the branch is genuinely ready',
        bullets: [
          'People are visible in Preview 409.',
          'Mask covers the figure and has a clean edge.',
          'Cutout matches the scene tonally.',
          'Node 543 selects the expected mode.',
          'Node 459 returns a composite containing people.',
          'In the current configuration Save 730 contains people; after enabling the HQ chain, final 15 is verified separately.',
        ],
      },
    ],
  },
  {
    index: 8,
    slug: 'output',
    navTitle: 'Output',
    eyebrow: 'SAVE / PREVIEW / COMPARE',
    title: 'Where to find the current PEOPLE / PPL result',
    lede:
      'The active provable output of the saved configuration is FLUX decode 53, written by node 730. HQ / upscale and the final overlay exist but are stored in BYPASS.',
    status: 'confirmed',
    statusNote: 'Save nodes, prefixes, formats, and bypass modes verified from graph data',
    visual: 'output',
    sections: [
      {
        id: 'active-output',
        eyebrow: '01 · CURRENT WRITE PATH',
        title: 'Current active file: node 53 → node 730',
        paragraphs: [
          'After the PEOPLE composite returns to the main pipeline, the chain ends at VAEDecode 53. Its image goes directly into Image Save LQ 730; this is the first place to verify whether people survived into the final active frame.',
        ],
        table: {
          columns: ['Node', 'Role', 'Confirmed value'],
          rows: [
            ['53', 'VAEDecode after main FLUX stage', 'Active upstream for save 730'],
            ['730', 'Image Save LQ', 'JPG · 72 dpi · quality 100'],
            ['Folder', 'Serialized subfolder', 'ph\\[time(%Y-%m-%d)]'],
            ['Prefix', 'Result name', 'ph01_archviz_sdxl2flux_LQ1'],
          ],
        },
        facts: [
          {
            status: 'confirmed',
            title: 'Primary inspection point',
            text: 'In the saved workflow, node 730 is the active write point for the direct output of node 53.',
          },
          {
            status: 'not-confirmed',
            title: 'Specific created file',
            text: 'Workflow JSON does not prove that the current run completed or that the file was actually written to disk.',
          },
        ],
      },
      {
        id: 'output-path',
        eyebrow: '02 · PATH',
        title: 'How to read the path without overstating what is known',
        paragraphs: [
          'JSON stores only the relative folder and prefix. The absolute root depends on the ComfyUI instance that is actually running. The serialized segment and the expected resolution through the standard output directory are therefore documented separately.',
        ],
        codeExamples: [
          {
            title: 'Path stored in node 730',
            label: 'CONFIRMED · serialized values',
            code:
              'folder: ph\\[time(%Y-%m-%d)]\\nprefix: ph01_archviz_sdxl2flux_LQ1\\nformat: jpg',
          },
          {
            title: 'Expected full template',
            label: 'INFERRED · resolve against active ComfyUI root',
            code:
              '<ACTIVE_COMFYUI_ROOT>\\output\\ph\\<YYYY-MM-DD>\\ph01_archviz_sdxl2flux_LQ1_....jpg',
            note: 'The absolute root is intentionally not inserted; verify it against the active ComfyUI instance.',
          },
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Stable serialized segment',
            text: 'ph\\[time(%Y-%m-%d)] + ph01_archviz_sdxl2flux_LQ1 are present in node 730.',
          },
          {
            status: 'not-confirmed',
            title: 'Absolute filesystem root',
            text: 'The technical archive does not contain a confirmed path to the active ComfyUI output root.',
          },
        ],
      },
      {
        id: 'optional-hq',
        eyebrow: '03 · OPTIONAL HQ',
        title: 'HQ and overlay form a separate route that is currently disabled',
        paragraphs: [
          'UltimateSDUpscale 833 and associated sizing / overlay nodes 832–851 are stored in mode 4 (BYPASS). Their save points are documented, but they are not the current active final.',
        ],
        table: {
          columns: ['Route', 'Output', 'Saved-graph state'],
          rows: [
            ['53 → 834 → 833 → 531', 'ph01_archviz_sdxl2flux_HQ · PNG · 300 dpi', 'BYPASS upstream'],
            ['53 → 833 → 848 → 849 → 293', 'ph01_archviz_sdxl2flux_LQ2 · JPG · 72 dpi', 'BYPASS overlay chain'],
            ['849 → 15', 'Preview FINAL IMAGE', 'Available after enabling overlay chain'],
            ['53 / 833 → 141', 'Image Comparer FLUX / UPSCALE', 'Compare after enabling HQ'],
          ],
        },
        facts: [
          {
            status: 'confirmed',
            title: 'Saved mode',
            text: 'Nodes 833, 834, and overlay nodes 832–851 have mode 4 / BYPASS.',
          },
          {
            status: 'not-confirmed',
            title: 'Runtime HQ result',
            text: 'A valid HQ / overlay file requires a separate run with the chain enabled.',
          },
        ],
      },
      {
        id: 'output-comparers',
        eyebrow: '04 · VISUAL CONTROL',
        title: 'Which previews and comparers to inspect before delivery',
        table: {
          columns: ['Node', 'Compares / shows', 'When to use'],
          rows: [
            ['409', 'Raw PPL decode 829', 'Prove that people were generated'],
            ['480', 'MASK / PPL: 451 vs 459', 'Verify placement and selected composite'],
            ['518', 'Inpaint composite 509 vs source 552', 'Verify INPUT / 3D path'],
            ['72', 'SDXL / FLUX: 779 vs 53', 'Inspect the change introduced by main FLUX'],
            ['141', 'FLUX / UPSCALE: 53 vs 833', 'Only after enabling the HQ chain'],
            ['15', 'Preview FINAL IMAGE from 849', 'Only after enabling the overlay chain'],
          ],
        },
      },
      {
        id: 'output-proof',
        eyebrow: '05 · DONE CRITERIA',
        title: 'When output can be considered verified',
        bullets: [
          'People are visible in 409 and match prompt 408.',
          'Comparer 480 shows a correct mask and selected composite.',
          'People remain after main FLUX decode 53.',
          'The file with LQ1 prefix is found in the current-date folder.',
          'If the HQ chain is manually enabled: 141, 531, 293, and Preview 15 are verified separately.',
        ],
      },
    ],
  },
  {
    index: 11,
    slug: 'examples',
    navTitle: 'Examples',
    eyebrow: 'VISUAL EXAMPLES',
    title: 'React atlas and practical scenarios',
    lede:
      'Three source infographics are reconstructed as responsive React blocks: overall logic, stage responsibilities, visual checks, and diagnostic order.',
    status: 'inferred',
    statusNote: 'The React diagrams explain confirmed topology; examples do not replace runtime previews',
    visual: 'examples',
    sections: [
      {
        id: 'scenario-old-city',
        eyebrow: '01 · SCENARIO',
        title: 'Old stone city',
        paragraphs: [
          'Current prompt 408 is aligned with this scene: a few residents, long beige clothing, small and medium figures, warm evening light.',
        ],
        codeExamples: [
          {
            title: 'Current prompt',
            label: 'CONFIRMED · node 408',
            code:
              'a few Middle Eastern townspeople wearing long beige robes and simple head coverings, naturally walking and standing in an old stone city square, realistic proportions, small and medium scale figures, candid documentary look, visually integrated into the scene, warm evening light',
          },
          {
            title: 'Variant: museum / contemporary gallery',
            label: 'INFERRED · example',
            code:
              'a few museum visitors in understated neutral clothing, full body, small and medium scale, naturally walking and pausing near exhibits, candid documentary look, correct perspective, clean silhouettes, soft indoor ambient light',
          },
        ],
      },
      {
        id: 'how-to-read-images',
        eyebrow: '02 · IMAGE GUIDE',
        title: 'What is simplified in the React reconstruction',
        facts: [
          {
            status: 'confirmed',
            title: '408 / 543 / 715',
            text: 'The roles of the key nodes are preserved without modification.',
          },
          {
            status: 'inferred',
            title: 'Icons and example images',
            text: 'These are visual models of the process, not screenshots of real execution for every node.',
          },
          {
            status: 'not-confirmed',
            title: 'Specific people shown in examples',
            text: 'Examples do not prove the result of the current seed or machine.',
          },
        ],
      },
    ],
  },
  {
    index: 12,
    slug: 'resources',
    navTitle: 'Resources',
    eyebrow: 'SOURCE FILES',
    title: 'Repositories, diagrams, and source documents',
    lede:
      'All links point either to upstream projects or to files extracted from the current technical archive.',
    status: 'confirmed',
    statusNote: 'External URLs verified against official sources on September 3, 2026',
    visual: 'resources',
    sections: [
      {
        id: 'upstream',
        eyebrow: '01 · UPSTREAM',
        title: 'Projects and documentation',
        paragraphs: [
          'ComfyUI is the base platform. rgthree-comfy and ComfyUI-Logic are relevant only where their specific nodes are used. Graphviz is used to prepare diagrams and does not execute the PEOPLE branch.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'ComfyUI canonical repo',
            text: 'The former comfyanonymous/ComfyUI address redirects to Comfy-Org/ComfyUI.',
          },
          {
            status: 'confirmed',
            title: 'ComfyUI-Logic archive',
            text: 'The theUpsider/ComfyUI-Logic repository was archived on June 13, 2025 and is marked unmaintained.',
          },
        ],
      },
      {
        id: 'downloads',
        eyebrow: '02 · DOWNLOADS',
        title: 'Technical workflow source package',
        paragraphs: [
          'The current ZIP contains 24 files: 16 Markdown chapters, two CSV tables, a JSON specification, one DOT file, and four SVG maps. Files 17_AUDIT_ERRATA.md and 18_WORKFLOW_MODEL_MANIFEST.md were added on top of the original 22-file audit; documents 01–16 were not rewritten.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Derived specification bundled',
            text: 'HANSEN_WORKFLOW_SPEC.json, two CSV tables, and four SVG maps are available for download.',
          },
          {
            status: 'not-confirmed',
            title: 'Raw workflow absent from bundle',
            text: 'Epspoziciya_archviz_ph_sdxlflux_v001.json was not found in the current workspace and is not included in the ZIP. The source-of-truth filename is known, but the raw JSON must be attached separately.',
          },
        ],
      },
      {
        id: 'provenance',
        eyebrow: '03 · PROVENANCE',
        title: 'What counts as current',
        facts: [
          {
            status: 'confirmed',
            title: 'Only current source',
            text: 'Epspoziciya_archviz_ph_sdxlflux_v001.json.',
          },
          {
            status: 'confirmed',
            title: 'Historical reference only',
            text: 'BEST / RU2EN / FINAL_CLEAN and other previous Hansen copies.',
          },
          {
            status: 'not-confirmed',
            title: 'Future drift',
            text: 'After the workflow changes, the manual must be rebuilt: saved node IDs and links may become outdated.',
          },
        ],
      },
    ],
  },
] satisfies Omit<Chapter, 'category'>[]).sort((a, b) => a.index - b.index);

const existingChapterMap = Object.fromEntries(
  existingChapters.map((chapter) => [chapter.slug, chapter]),
) as Record<string, (typeof existingChapters)[number]>;

const additionalChapterMap = Object.fromEntries(
  additionalChapters.map((chapter) => [chapter.slug, chapter]),
) as Record<string, Chapter>;

function existingChapter(
  slug: string,
  category: ManualCategory,
  overrides: Partial<Chapter> = {},
): Chapter {
  const chapter = existingChapterMap[slug];
  if (!chapter) throw new Error('Missing existing chapter: ' + slug);
  return { ...chapter, category, ...overrides } as Chapter;
}

function additionalChapter(slug: string): Chapter {
  const chapter = additionalChapterMap[slug];
  if (!chapter) throw new Error('Missing additional chapter: ' + slug);
  return chapter;
}

const peopleOverview = existingChapter('overview', 'people-ppl', {
  slug: 'people-ppl-overview',
  navTitle: 'PPL Overview',
  eyebrow: 'PEOPLE / PPL · MODULE',
  relatedChapters: ['node-408-prompt', 'positioning', 'selector-logic', 'main-flux'],
});

const selectorTruthSection: ChapterSection = {
  id: 'selector-truth-table',
  eyebrow: '04 · TRUTH TABLE',
  title: '543 × 693 × 715: which source is actually selected',
  table: {
    columns: ['543', '693', '715 effective', '552 source', '459 return'],
    rows: [
      ['1 · FLUX', '1 · resized', '1', 'PPL FLUX decode 829', 'First composite 672'],
      ['1 · FLUX', '2 · original', '1', 'PPL FLUX decode 829', 'First composite 672'],
      ['2 · INPUT', '1 · resized', '2', '715 selected input, then component inpaint', 'Resized return 685'],
      ['2 · INPUT', '2 · original', '2', '715 selected input, then component inpaint', 'Original-canvas return 685'],
    ],
  },
  facts: [
    {
      status: 'confirmed',
      title: 'Linked override',
      text: 'Stored widget 2 inside node 715 does not select mode 2 while Input is linked to node 543=1.',
    },
    {
      status: 'not-confirmed',
      title: '3D source semantics',
      text: 'Topology does not expose a dedicated LoadImage that proves the origin of the source labelled 3D rendered.',
    },
  ],
};

const fullDiagnosticsSection: ChapterSection = {
  id: 'whole-graph-probes',
  eyebrow: '04 · WHOLE GRAPH',
  title: 'Diagnostic ladder from input to optional HQ',
  table: {
    columns: ['Stage', 'Probe', 'Stop condition'],
    rows: [
      ['Preprocessors', '39 depth / 167 edge', 'Map is wrong — do not diagnose SDXL yet'],
      ['Main SDXL', '71: input 79 vs result 779', 'SDXL result is wrong — do not inspect PEOPLE yet'],
      ['Masks', '113 / 233 / 340–353 / 581', 'Verify polarity, bounds, and canvas size'],
      ['PEOPLE', '409 / 507 / 508 / 480 / 518', 'Find the last correct PPL stage'],
      ['Main FLUX', '72: 779 vs 53; active save 730', 'Verify survival after denoise 0.18'],
      ['Upscale / overlay', '141 / 675 / 15 / 531 / 293', 'Remove bypass first, then verify'],
    ],
  },
};

const workflowChecklistSection: ChapterSection = {
  id: 'whole-workflow-checklist',
  eyebrow: '03 · FULL WORKFLOW',
  title: 'Checks before and after PEOPLE/PPL',
  bullets: [
    'Input 79 and selected optional files are available in the active ComfyUI instance.',
    'Controls 541 / 456 / 168 / 453 / 543 / 693 have the expected effective values.',
    'Depth/Canny previews are verified before KSampler 1.',
    'SDXL result is correct in comparer 71.',
    'Architectural and PEOPLE masks have correct polarity and dimensions.',
    'Selected PPL result is visible at 459 / comparer 480.',
    'PEOPLE survives main FLUX decode 53 / save 730.',
    'HQ/overlay checkpoints are verified only after the mode-4 branch is deliberately enabled.',
  ],
};

const goldenRunSection: ChapterSection = {
  id: 'golden-run',
  eyebrow: '03 · GOLDEN RUN',
  title: 'A reference run has not yet been locked',
  paragraphs: [
    'Topology, controls, models, and checkpoints are documented, but the manual does not yet contain one reproducible run with fixed inputs, seed, effective selector values, runtime previews, and verified output files.',
  ],
  facts: [
    {
      status: 'not-confirmed',
      title: 'Golden Run artifact',
      text: 'There is no confirmed input + workflow JSON + seed + checkpoint screenshots + LQ/HQ output package that can be reproduced on a clean instance.',
    },
    {
      status: 'inferred',
      title: 'Minimum capture package',
      text: 'Capture workflow hash, input 79, optional inputs, model manifest, controls 541/456/168/453/543/693, seed, previews 39/167/71/409/480/72, and the actual file written by 730.',
    },
  ],
  bullets: [
    'Preserve the unchanged raw workflow and its SHA-256.',
    'Record the absolute ComfyUI root and custom-node package versions.',
    'Capture seed and effective linked values, not only visible widgets.',
    'Save intermediate probes and final LQ1; capture HQ/overlay in a separate run after bypass is removed.',
  ],
};

export const manualChapters: Chapter[] = [
  additionalChapter('workflow-engineering-overview'),
  additionalChapter('workflow-engineering-node-literacy'),
  additionalChapter('workflow-engineering-graph-literacy'),
  additionalChapter('workflow-engineering-groups-naming'),
  additionalChapter('workflow-engineering-base-config'),
  additionalChapter('workflow-engineering-data-control-plane'),
  additionalChapter('workflow-engineering-switches-routing'),
  additionalChapter('workflow-engineering-execution-cache'),
  additionalChapter('workflow-engineering-routing-lab'),
  additionalChapter('workflow-engineering-base-config-lab'),
  additionalChapter('workflow-engineering-module-contract-lab'),
  additionalChapter('workflow-engineering-module-contracts'),
  additionalChapter('workflow-engineering-coordinates-batch'),
  additionalChapter('workflow-engineering-debugging'),
  additionalChapter('workflow-engineering-reproducibility'),
  additionalChapter('overview'),
  additionalChapter('graph-reading'),
  additionalChapter('inputs'),
  additionalChapter('control-panel'),
  additionalChapter('models-dependencies'),
  additionalChapter('lab-04-master-graph-reading'),
  additionalChapter('global-prompts'),
  additionalChapter('sdxl'),
  additionalChapter('controlnet'),
  additionalChapter('ipadapter-lora'),
  additionalChapter('segmentation-masks'),
  additionalChapter('detail-conservation'),
  additionalChapter('lab-05-generative-systems-bench'),
  additionalChapter('hansen-00-39-production-method'),
  additionalChapter('hansen-01-08-input-data-txt2img'),
  additionalChapter('hansen-02-40-process1-txt2img'),
  additionalChapter('hansen-04-23-people-ppl'),
  additionalChapter('hansen-05-42-workflow-tips'),
  additionalChapter('hansen-06-32-controlnet-preprocessors'),
  additionalChapter('hansen-07-38-masks-detail-conservation'),
  additionalChapter('hansen-08-35-mode1-example'),
  additionalChapter('hansen-09-16-generation-mode1'),
  additionalChapter('hansen-11-35-mode2-img2img'),
  additionalChapter('hansen-12-53-generation-mode2'),
  additionalChapter('hansen-13-20-mode2-enhancement'),
  additionalChapter('hansen-13-55-output-parameters'),
  additionalChapter('hansen-14-43-conclusion'),
  peopleOverview,
  existingChapter('node-408-prompt', 'people-ppl'),
  existingChapter('generation', 'people-ppl', { navTitle: 'PPL Generation' }),
  existingChapter('segmentation-mask', 'people-ppl', { navTitle: 'PPL Segmentation / Mask' }),
  existingChapter('preparation-color-match', 'people-ppl'),
  additionalChapter('positioning'),
  additionalChapter('ppl-workflow-01-generate-place'),
  additionalChapter('ppl-workflow-02-replace-existing'),
  existingChapter('selector-logic', 'people-ppl', {
    sections: [...existingChapterMap['selector-logic'].sections, selectorTruthSection],
  }),
  additionalChapter('ppl-mode-2-inpaint'),
  existingChapter('composite', 'people-ppl'),
  additionalChapter('lab-06-people-ppl-production-run'),
  additionalChapter('main-flux'),
  additionalChapter('upscale-overlay'),
  existingChapter('output', 'final-pipeline', { navTitle: 'Output & Comparers' }),
  existingChapter('diagnostics', 'final-pipeline', {
    navTitle: 'Full Workflow Diagnostics',
    sections: [...existingChapterMap.diagnostics.sections, fullDiagnosticsSection],
  }),
  existingChapter('checklist', 'final-pipeline', {
    navTitle: 'Full Workflow Checklist',
    sections: [...existingChapterMap.checklist.sections, workflowChecklistSection],
  }),
  additionalChapter('lab-07-final-pipeline-delivery'),
  existingChapter('examples', 'evidence-reference', {
    navTitle: 'Examples & Golden Run',
    sections: [...existingChapterMap.examples.sections, goldenRunSection],
  }),
  additionalChapter('capstone-master-graph-certification'),
  additionalChapter('node-index'),
  existingChapter('resources', 'evidence-reference', { navTitle: 'Resources, Provenance & Errata' }),
].map((chapter, index) => ({ ...chapter, index: index + 1 }));

export const chapterBySlug = Object.fromEntries(
  manualChapters.map((chapter) => [chapter.slug, chapter]),
) as Record<string, Chapter>;

export const diagnosticChecklist = [
  { id: 'branch', label: 'PEOPLE / PPL branch is active and not bypassed', evidence: 'group / node modes' },
  { id: 'prompt', label: 'Node 408 contains the current prompt', evidence: '408 → 823' },
  { id: 'generated', label: 'People are visible after VAEDecode', evidence: 'Preview 409 ← 829' },
  { id: 'detected', label: 'Florence2 finds the intended figures', evidence: 'Preview 113 ← 550' },
  { id: 'mask', label: 'SAM2 mask is clean and covers the figure', evidence: '115 → 144 → 146' },
  { id: 'cutout', label: 'RemBg / ColorMatch produce a clean cutout', evidence: '422 → 477 → 449' },
  { id: 'mode', label: 'Node 543 selects the intended source mode', evidence: '543 = 1 or 2' },
  { id: 'selector', label: 'Nested-switch logic 715 → 552 is accounted for', evidence: 'links 1224 / 1228 / 983' },
  { id: 'composite', label: 'PPL composite is visible after selector', evidence: 'Comparer 480 ← 459' },
  { id: 'flux', label: 'People remain after main FLUX decode', evidence: '53 / Save 730' },
  { id: 'final', label: 'People are visible in the active current output', evidence: 'Save 730 ← 53' },
];

export const upstreamResources = [
  {
    title: 'ComfyUI',
    href: 'https://github.com/Comfy-Org/ComfyUI',
    meta: 'Canonical repository',
    description: 'Base node-based runtime and workflow interface.',
    warning: false,
  },
  {
    title: 'ComfyUI Docs · Workflows',
    href: 'https://docs.comfy.org/basic-concepts/workflow',
    meta: 'Official documentation',
    description: 'Nodes, links, and the visual-programming model.',
    warning: false,
  },
  {
    title: 'rgthree-comfy',
    href: 'https://github.com/rgthree/rgthree-comfy',
    meta: 'Upstream repository',
    description: 'Image Comparer, Seed, Fast Groups Bypasser, and utility nodes.',
    warning: false,
  },
  {
    title: 'ComfyUI-Logic',
    href: 'https://github.com/theUpsider/ComfyUI-Logic',
    meta: 'Archived · unmaintained',
    description: 'Compare / If logic. Use with a compatibility warning.',
    warning: true,
  },
  {
    title: 'Graphviz',
    href: 'https://graphviz.org/',
    meta: 'Official project',
    description: 'Rendering of DOT maps; a documentation tool, not part of runtime.',
    warning: false,
  },
  {
    title: 'Workflow JSON spec',
    href: 'https://docs.comfy.org/specs/workflow_json',
    meta: 'Official ComfyUI spec',
    description: 'Graph format, node IDs, links, and serialized values.',
    warning: false,
  },
  {
    title: 'Custom node troubleshooting',
    href: 'https://docs.comfy.org/troubleshooting/custom-node-issues',
    meta: 'Official ComfyUI guide',
    description: 'Procedure for isolating problems with third-party nodes.',
    warning: false,
  },
  {
    title: 'Graphviz DOT language',
    href: 'https://graphviz.org/doc/info/lang.html',
    meta: 'Official reference',
    description: 'Syntax reference for HANSEN_MASTER_MAP.dot.',
    warning: false,
  },
];

export const downloadResources = [
  {
    title: 'React source project',
    href: '/downloads/EPSPOZICIYA_ARCHVIZ_TECHNICAL_MANUAL_SOURCE.zip',
    meta: 'ZIP · source',
    description: 'React/TypeScript/CSS source, public assets, and GitHub Pages configuration without dependencies.',
  },
  {
    title: 'Ready static build',
    href: '/downloads/EPSPOZICIYA_ARCHVIZ_TECHNICAL_MANUAL_STATIC_BUILD.zip',
    meta: 'ZIP · static HTML',
    description: 'Standalone exported build with 28 route directories and GitHub Pages base path.',
  },
  {
    title: 'Complete technical archive',
    href: '/resources/EPSPOZICIYA_HANSEN_TECHNICAL_MANUAL_SOURCE.zip',
    meta: 'ZIP · 24 files',
    description: 'All Markdown, CSV, JSON, DOT, and SVG files from the current source package.',
  },
  {
    title: 'Master architecture',
    href: sourceRoot + '/01_MASTER_ARCHITECTURE.md',
    meta: 'Markdown',
    description: 'Complete architecture, active route, groups, and key topology.',
  },
  {
    title: 'Control panel',
    href: sourceRoot + '/02_CONTROL_PANEL.md',
    meta: 'Markdown',
    description: 'All selectors, linked controls, and current modes.',
  },
  {
    title: 'Inputs',
    href: sourceRoot + '/03_INPUTS.md',
    meta: 'Markdown',
    description: 'Serialized input filenames, roles, and mode-dependent sources.',
  },
  {
    title: 'Prompts & routing',
    href: sourceRoot + '/04_PROMPTS.md',
    meta: 'Markdown',
    description: 'Current prompt values and exact assembly.',
  },
  {
    title: 'Main SDXL',
    href: sourceRoot + '/05_SDXL.md',
    meta: 'Markdown',
    description: 'Checkpoint, conditioning, sampler, and latent modes.',
  },
  {
    title: 'ControlNet',
    href: sourceRoot + '/06_CONTROLNET.md',
    meta: 'Markdown · see errata',
    description: 'Depth/Canny chapter; corrected source topology is documented in 17_AUDIT_ERRATA.',
  },
  {
    title: 'IPAdapter references',
    href: sourceRoot + '/07_IPADAPTER_REFERENCES.md',
    meta: 'Markdown',
    description: 'Reference images, model switch, and current selected-away state.',
  },
  {
    title: 'PEOPLE / PPL route',
    href: sourceRoot + '/08_PEOPLE_PPL.md',
    meta: 'Markdown',
    description: 'Complete generation → final route with node IDs.',
  },
  {
    title: 'Masks & segmentation',
    href: sourceRoot + '/09_MASKS_SEGMENTATION.md',
    meta: 'Markdown',
    description: 'Florence2, SAM2, mask transforms, and consumers.',
  },
  {
    title: 'Detail conservation',
    href: sourceRoot + '/10_DETAIL_CONSERVATION.md',
    meta: 'Markdown',
    description: 'PPL return through imageDetailTransfer 573.',
  },
  {
    title: 'Main FLUX',
    href: sourceRoot + '/11_FLUX.md',
    meta: 'Markdown',
    description: 'Main img2img return 459 → 573 → 67 → 57 → 53.',
  },
  {
    title: 'Upscale & overlays',
    href: sourceRoot + '/12_UPSCALE.md',
    meta: 'Markdown',
    description: 'Saved mode-4 HQ, tiling, and logo overlay chain.',
  },
  {
    title: 'Output comparers',
    href: sourceRoot + '/13_OUTPUT_COMPARERS.md',
    meta: 'Markdown',
    description: 'Preview, comparer, save, and final-output points.',
  },
  {
    title: 'Legacy compatibility',
    href: sourceRoot + '/14_LEGACY_COMPATIBILITY.md',
    meta: 'Markdown',
    description: 'Historical copies and compatibility boundaries.',
  },
  {
    title: 'Audit errata',
    href: sourceRoot + '/17_AUDIT_ERRATA.md',
    meta: 'Markdown · NEW',
    description: 'Dedicated record of corrections, limitations, and unconfirmed data.',
  },
  {
    title: 'Workflow model manifest',
    href: sourceRoot + '/18_WORKFLOW_MODEL_MANIFEST.md',
    meta: 'Markdown · NEW',
    description: 'Model filenames, loader nodes, and package-provider mapping.',
  },
  {
    title: 'Master graph source',
    href: sourceRoot + '/HANSEN_MASTER_MAP.dot',
    meta: 'Graphviz DOT',
    description: 'Editable source of the overall graph map.',
  },
  {
    title: 'Master graph map',
    href: sourceRoot + '/HANSEN_MASTER_MAP.svg',
    meta: 'SVG',
    description: 'Complete Graphviz map of the workflow.',
  },
  {
    title: 'Master pipeline',
    href: sourceRoot + '/MASTER_PIPELINE.svg',
    meta: 'SVG',
    description: 'Compact active pipeline and optional continuation.',
  },
  {
    title: 'PEOPLE route map',
    href: sourceRoot + '/PEOPLE_PPL_ROUTE.svg',
    meta: 'SVG',
    description: 'Isolated Graphviz map of the PEOPLE branch.',
  },
  {
    title: 'Control switches map',
    href: sourceRoot + '/CONTROL_SWITCHES.svg',
    meta: 'SVG',
    description: 'Visual map of the 28 user-facing controls.',
  },
  {
    title: 'Workflow specification',
    href: sourceRoot + '/HANSEN_WORKFLOW_SPEC.json',
    meta: 'JSON',
    description: 'Machine-readable significant nodes, controls, and routes.',
  },
  {
    title: 'All nodes reference',
    href: sourceRoot + '/15_ALL_NODES_REFERENCE.csv',
    meta: 'CSV',
    description: '252 nodes with upstream / downstream references.',
  },
  {
    title: 'All controls reference',
    href: sourceRoot + '/16_ALL_CONTROLS_REFERENCE.csv',
    meta: 'CSV',
    description: '28 user-facing controls and their modes.',
  },
];
