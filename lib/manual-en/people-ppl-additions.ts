import type { Chapter } from '../manual-types';

export const peoplePplAdditions: Chapter[] = [
  {
    index: 0,
    slug: 'positioning',
    navTitle: 'Position, Scale & Coordinates',
    eyebrow: 'PEOPLE / PPL · SPATIAL CONTRACT',
    title: 'Where person size, crop, and coordinate space change',
    lede:
      'Generation and masking can both be correct, yet the figure may disappear or land in the wrong place when source image, mask bounds, and destination canvas diverge between 829, 780, 420, 449, and 429.',
    status: 'confirmed',
    statusNote: 'Resize/crop/paste topology is confirmed; exact visual position requires a runtime image',
    visual: 'positioning',
    category: 'people-ppl',
    stage: 'ppl-position',
    relatedNodes: [420, 429, 430, 449, 477, 552, 684, 685, 693, 780, 781, 782, 827, 829],
    relatedChapters: ['preparation-color-match', 'ppl-workflow-01-generate-place', 'selector-logic', 'composite', 'diagnostics'],
    sections: [
      {
        id: 'spaces',
        eyebrow: '01 · COORDINATE SPACES',
        title: 'PPL latent, detection canvas, and scene canvas do not share one resolution',
        table: {
          columns: ['Stage', 'Nodes', 'Stored / derived space', 'Risk'],
          rows: [
            ['PPL generation', '827 → 828 → 829', '1312 × 1920, batch 1', 'Figure framing differs from the scene'],
            ['Detection input', '552 → 780', 'Resize to 1920 × 1920', 'Aspect ratio / padding changes'],
            ['Mask crop', '146 + 780 → 420 → 781', 'Bounds from people mask', 'Loose/tight crop or empty region'],
            ['Prepared cutout', '422 → 477 → 449', 'Cropped person + alpha', 'Image/mask mismatch'],
            ['First paste', '779 + 449 + 451 → 429', 'Selected SDXL scene canvas', 'Scale/location outside frame'],
            ['Alternative return', '509 → 684 → 782 → 685', 'Restored original/resized canvas', 'Wrong mode 693'],
            ['Runtime mask test', 'Florence2 → BBOX → SAM2', 'Same 1280 × 720 source at both stages', 'Different images reproduce displaced/false masks'],
          ],
        },
      },
      {
        id: 'first-composite',
        eyebrow: '02 · FIRST PASTE',
        title: 'Node 429 ties together the base scene, prepared cutout, and position source',
        paragraphs: [
          'Paste By Mask 429 receives the base image from Image Filter 779, prepared person 449, and image/mask representation 451. Stored mode keep_ratio_fit affects insertion scaling.',
          'Output 429 passes through Images to RGB 672 and enters image1 of selector 459 for PPL mode 1.',
        ],
        facts: [
          { status: 'confirmed', title: 'Topology', text: '429 → 672 → image1 of 459.' },
          { status: 'not-confirmed', title: 'Exact placement', text: 'Coordinates and figure visibility cannot be proven without runtime preview 480/459.' },
        ],
      },
      {
        id: 'position-checklist',
        eyebrow: '03 · QA ORDER',
        title: 'Verify positioning before looking for a downstream failure',
        bullets: [
          'Before choosing a BBOX, prove that Florence2 and SAM2 receive the same image at the same dimensions.',
          'Compare the actual dimensions of image 829 and resized image 780.',
          'Verify that 146 contains foreground and has the correct polarity.',
          'Verify bounds/crop 420→781: the full person must lie inside the region.',
          'Verify alpha from 422/430 and its alignment with RGB 477/449.',
          'Verify first composite 429/672 before selector 459.',
          'Verify mode 693 when alternative return 685 is used.',
        ],
      },
      {
        id: 'quality',
        eyebrow: '04 · INTEGRATION QA',
        title: 'A technically valid signal does not automatically produce a convincing composite',
        facts: [
          { status: 'inferred', title: 'Perspective', text: 'Figure height and scale should match the horizon and architectural reference dimensions.' },
          { status: 'inferred', title: 'Grounding', text: 'Check foot contact, contact shadow, and absence of floating.' },
          { status: 'inferred', title: 'Light / occlusion', text: 'Light direction, contrast, and occlusion should agree with the environment.' },
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'ppl-workflow-02-replace-existing',
    navTitle: 'PPL Workflow 02 · Replace Existing People',
    eyebrow: 'PEOPLE / PPL · WORKFLOW 02',
    title: 'Improve and replace pre-positioned people with Florence2 + SAM2 + FLUX',
    lede:
      'This mode does not decide where a person belongs. Position, scale, perspective, and approximate pose are already established by the source 3D/SDXL scene; AI isolates the existing figure locally, regenerates it, and returns it to the same spatial slot.',
    status: 'confirmed',
    statusNote:
      'The detection → segmentation → local generation → cutout/color match → paste sequence is confirmed from the showcase; exact node IDs for this branch still require a separate source-JSON verification.',
    visual: 'composite',
    category: 'people-ppl',
    stage: 'ppl-replace-existing',
    relatedChapters: ['positioning', 'ppl-workflow-01-generate-place', 'preparation-color-match', 'composite', 'ppl-mode-2-inpaint', 'diagnostics'],
    sections: [
      {
        id: 'role',
        eyebrow: '01 · ROLE',
        title: '3D owns placement; AI owns visual quality',
        paragraphs: [
          'The source frame already contains a person as a spatial anchor: position, height, scale, perspective, and approximate pose are defined before generation. That anchor may be a 3D proxy, library character, cutout, or a person already present in the base image.',
          'AI does not redesign the scene composition or choose a new location for the character. Its task is to improve or replace the local figure while preserving the architectural context around it.',
        ],
        facts: [
          { status: 'confirmed', title: 'Placement contract', text: 'In the showcase, people are already present in the base image before the PPL replacement pass.' },
          { status: 'inferred', title: 'Archviz principle', text: 'For production work, this cleanly separates responsibility: 3D establishes spatial truth; the generator is responsible for visual realism.' },
        ],
      },
      {
        id: 'route',
        eyebrow: '02 · ROUTE',
        title: 'Complete Variant 2 route',
        codeExamples: [
          {
            title: 'Node flow',
            label: 'PPL WORKFLOW 02',
            code:
              'Base render with existing person\n→ Florence2 detection / grounding\n→ BBOX / coordinates\n→ SAM2 segmentation\n→ Person mask\n→ Crop by mask / region\n→ Resize local crop\n→ FLUX local regeneration\n→ Remove Background / Cut By Mask\n→ Color Match\n→ Paste By Mask\n→ Optional local detail / inpaint\n→ Final scene',
            note: 'Core principle: regenerate locally, composite globally.',
          },
        ],
      },
      {
        id: 'detection-segmentation',
        eyebrow: '03 · DETECTION + SEGMENTATION',
        title: 'Florence2 finds the person; SAM2 builds the precise mask',
        paragraphs: [
          'Florence2 performs semantic detection / phrase grounding and returns the person region as a bbox or coordinates. At this stage the model answers: “where is the person?”',
          'SAM2 receives the spatial cue from Florence2 and creates a pixel-level mask. The task is no longer class recognition, but separating the figure cleanly from architecture and surroundings.',
        ],
        table: {
          columns: ['Stage', 'Input', 'Output', 'QA'],
          rows: [
            ['Florence2', 'Base image + person/people prompt', 'BBOX / coordinates', 'BBox should cover the intended figure, not the entire frame'],
            ['SAM2', 'Same image + Florence spatial cue', 'Person mask', 'Head, hands, feet, and accessories without capturing the facade'],
          ],
        },
        bullets: [
          'Florence2 and SAM2 must receive the same source image in the same coordinate space.',
          'Do not continue downstream if the bbox or mask is already wrong.',
          'Image batch size and bbox count must agree; otherwise Sam2Segmentation can fail during indexing.',
        ],
      },
      {
        id: 'local-generation',
        eyebrow: '04 · LOCAL FLUX REGENERATION',
        title: 'The generator works on a crop, not the entire architectural frame',
        paragraphs: [
          'The mask or bbox defines a local crop around the person. The crop is resized to a working resolution and passed into a dedicated FLUX branch.',
          'Architecture outside the crop is therefore excluded from generation: the model can improve face, clothing, material response, hair, and photographic quality without being given freedom to rebuild the facade or camera.',
        ],
        facts: [
          { status: 'confirmed', title: 'Local scope', text: 'The showcase uses a dedicated PPL FLUX Generate section between segmentation and composite.' },
          { status: 'inferred', title: 'Production value', text: 'A local crop reduces the risk area and improves repeatability compared with full-frame img2img.' },
        ],
      },
      {
        id: 'cutout-color-match',
        eyebrow: '05 · PREPARE CUTOUT',
        title: 'The generated person becomes a compositing element',
        paragraphs: [
          'After generation, the result is separated from its local background using operations in the Remove Background / Cut By Mask class. The required output is an RGB figure with a clean alpha/mask representation.',
          'Before the figure returns to the scene, Color Match aligns it with the base image so it does not look pasted from a different lighting setup or camera.',
        ],
        table: {
          columns: ['Operation', 'Purpose', 'Typical failure'],
          rows: [
            ['Remove Background / Cut By Mask', 'Separate generated person from crop background', 'Halo, missing limbs, remnants of the old background'],
            ['Color Match', 'Match tone / contrast / temperature to the base render', 'Skin and clothing appear to come from another photograph'],
            ['Mask cleanup', 'Stabilize contour before paste', 'Hard edge, dirty alpha, floating silhouette'],
          ],
        },
      },
      {
        id: 'composite',
        eyebrow: '06 · COMPOSITE',
        title: 'Paste By Mask returns the figure to the original spatial slot',
        paragraphs: [
          'The prepared cutout is composited back into the base scene using the mask and positioning data. The goal is to replace the person’s visual appearance without changing the approved composition.',
          'After paste, verify scale, foot placement, surface contact, occlusion, and light consistency.',
        ],
        bullets: [
          'Verify the paste before any downstream selectors or upscale.',
          'Compare the generated-person silhouette with the original proxy; center or scale drift counts as an error.',
          'Do not use Color Match as a substitute for a correct lighting prompt: it improves integration but cannot fix physically incorrect lighting.',
        ],
      },
      {
        id: 'detail-pass',
        eyebrow: '07 · OPTIONAL DETAIL / INPAINT',
        title: 'The final local pass fixes integration rather than creating a new scene',
        paragraphs: [
          'After compositing, a separate detail/inpaint pass can repair hands, hair, clothing edges, foot contact, small intersections, and local shadow.',
          'This stage should remain local. If the mask expands over a significant part of the architecture, the workflow loses the central advantage of controlled replacement.',
        ],
      },
      {
        id: 'use-cases',
        eyebrow: '08 · WHERE TO USE',
        title: 'Where Variant 2 is especially useful',
        bullets: [
          'Hero people in the foreground and midground.',
          'Cyclists and characters with a prescribed pose.',
          'People near entrances, storefronts, or facades.',
          'Visitors in exhibitions and public spaces where placement is already approved in the scene.',
          'Replacing a library 3D character without changing camera / architecture.',
        ],
        facts: [
          { status: 'confirmed', title: 'Not crowd placement', text: 'Variant 2 is not an automatic system for placing new people into an empty scene.' },
          { status: 'confirmed', title: 'Workflow 01 documented separately', text: 'Generate & Place New People by Mask is documented in a separate chapter. Workflow 01 and Workflow 02 remain distinct because their spatial contracts are different.' },
        ],
      },
      {
        id: 'checklist',
        eyebrow: '09 · PRODUCTION CHECKLIST',
        title: 'Variant 2 pre-final checklist',
        bullets: [
          'The source person is already in the correct location and scale before the AI pass.',
          'Florence2 bbox covers only the intended character.',
          'SAM2 mask is clean and does not capture architecture.',
          'The crop contains the complete figure and enough context for generation.',
          'FLUX preserves the intended spatial role of the character.',
          'Background removal produces no halo or holes in limbs.',
          'Color Match aligns the person with the overall frame exposure.',
          'Paste preserves original scale / position.',
          'Feet, contact shadow, and occlusion are physically plausible.',
          'Final local inpaint does not alter architectural geometry.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'ppl-mode-2-inpaint',
    navTitle: 'PPL Mode 2 / 3D Inpaint',
    eyebrow: 'PEOPLE / PPL · ALTERNATIVE',
    title: 'Complete component-inpaint route and return into selector 459',
    lede:
      'With 543=2, selectors choose the alternative inputs. The mask is split into components, regions pass through a dedicated FLUX inpaint, the result is pasted back, and the image is restored to the scene canvas.',
    status: 'confirmed',
    statusNote: 'Internal topology is confirmed; the origin of the “3D rendered” source is not proven by a dedicated LoadImage',
    visual: 'inpaint',
    category: 'people-ppl',
    stage: 'ppl-alternative',
    relatedNodes: [58, 61, 64, 138, 146, 459, 494, 495, 496, 497, 498, 499, 500, 502, 503, 504, 505, 506, 507, 508, 509, 510, 516, 518, 522, 524, 543, 552, 684, 685, 715, 771, 782],
    relatedChapters: ['selector-logic', 'positioning', 'composite', 'main-flux'],
    sections: [
      {
        id: 'mode-truth',
        eyebrow: '01 · MODE 2 ENTRY',
        title: 'Node 543 switches four selectors with one linked value',
        table: {
          columns: ['Selector', 'Input selected when 543=2', 'Purpose'],
          rows: [
            ['715', 'image2 according to linked Input; stored widget 2 is no longer special', 'Return / Downstream source before 552'],
            ['552', 'image2 from 715', 'Source image for resize 780 and crop 503'],
            ['522', 'image2 mask/image from 524', 'Alternative mask preview 508'],
            ['459', 'image2 from 685', 'Alternative composite returned to main graph'],
          ],
        },
        facts: [
          { status: 'confirmed', title: 'Shared control', text: '543 connects to Input sockets of 459, 522, 552, and 715.' },
          { status: 'not-confirmed', title: '3D input contract', text: 'Significant inputs do not contain a dedicated LoadImage node explicitly named as a 3D person render.' },
        ],
      },
      {
        id: 'component-preparation',
        eyebrow: '02 · COMPONENTS + REGIONS',
        title: 'Mask 146 becomes a set of independent regions',
        table: {
          columns: ['Node', 'Role', 'Downstream'],
          rows: [
            ['500', 'MaskToImage from blurred PEOPLE mask 146', '499'],
            ['499', 'Separate Mask Components', '502, 503, 504, 509'],
            ['502', 'Mask To Region; padding/ratio/512 target settings', '503, 504, 509'],
            ['503', 'Cut selected source 552 by component region', '506, preview 507'],
            ['504', 'Cut mask/component representation', '505, 510, selector 522'],
            ['505 / 506', 'ImageToMask / RGB channel normalization', 'Inpaint conditioning 494'],
          ],
        },
      },
      {
        id: 'inpaint-sampler',
        eyebrow: '03 · FLUX INPAINT',
        title: 'The local crop uses the shared FLUX model, noise, sampler, and shared step count',
        table: {
          columns: ['Node', 'Input / setting', 'Result'],
          rows: [
            ['516', 'Prompt “a photo”', 'Positive conditioning for 494'],
            ['138', 'Empty FLUX negative encoder', 'Negative input for 494'],
            ['494', 'InpaintModelConditioning true', 'Conditioning + latent for sampler'],
            ['497', 'BasicGuider with model 64 / conditioning 494', 'Guider'],
            ['498', 'beta · shared steps 771=24 · denoise 0.35', 'Sigmas'],
            ['61 / 58', 'Shared noise / Euler sampler', 'Sampler 495'],
            ['495 → 496', 'SamplerCustomAdvanced → VAE Decode 54', 'Local inpainted crop'],
          ],
        },
      },
      {
        id: 'return',
        eyebrow: '04 · RETURN',
        title: 'The inpainted crop returns to the canvas and selector 459',
        paragraphs: [
          'Decode 496 and component representation 504 are combined by node 510. Paste By Mask 509 places the local result back into base image 779. Images to RGB 684 and resize 782 restore the result to the canvas; selector 685 applies control 693 before image2 reaches 459.',
        ],
        table: {
          columns: ['Probe', 'What to verify'],
          rows: [
            ['507', 'Source crop sent into inpaint'],
            ['508', 'Mask/image selected by 522'],
            ['518', '509 result compared with selected source 552'],
            ['480', 'Final selector 459 compared with scene mask/image 451'],
          ],
        },
      },
    ],
  },
];
