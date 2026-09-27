import type { Chapter } from '../manual-types';

export const peoplePplWorkflow01Chapters: Chapter[] = [
  {
    index: 0,
    slug: 'ppl-workflow-01-generate-place',
    navTitle: 'PPL Workflow 01 · Generate & Place',
    eyebrow: 'PEOPLE / PPL · WORKFLOW 01',
    title: 'Generate & Place New People by Mask — generate the person separately, solve placement separately',
    lede:
      'Workflow 01 is used when the required person does not yet exist in the base render. The character is generated independently, segmentation turns it into a clean compositing element, and a scene placement mask defines where it enters the architectural frame.',
    status: 'confirmed',
    statusNote:
      'Generation, segmentation, preparation, first composite and return topology are confirmed by source documentation for Epspoziciya_archviz_ph_sdxlflux_v001. A standalone JSON is intentionally not published as “ready” until the raw source workflow with complete serialized schemas is available for safe extraction.',
    visual: 'composite',
    category: 'people-ppl',
    stage: 'ppl-generate-place',
    relatedNodes: [
      53, 54, 57, 58, 60, 61, 64, 67, 107, 112, 114, 115, 144, 146, 408,
      409, 420, 422, 429, 430, 449, 451, 459, 466, 467, 475, 477, 543, 550,
      552, 573, 672, 715, 717, 730, 771, 779, 780, 781, 819, 820, 823, 824,
      825, 826, 827, 828, 829, 830, 831,
    ],
    relatedChapters: [
      'node-408-prompt',
      'generation',
      'segmentation-mask',
      'preparation-color-match',
      'positioning',
      'ppl-workflow-02-replace-existing',
      'selector-logic',
      'composite',
      'main-flux',
    ],
    sections: [
      {
        id: 'role',
        eyebrow: '01 · ROLE',
        title: 'When to use Workflow 01',
        paragraphs: [
          'Use this mode when the required person does not exist in the original 3D/Corona scene and stock or 3D assets cannot provide the required period, clothing, pose or character type. AI creates the person asset separately from the architecture.',
          'Architecture should not be regenerated together with the character. Generate the person as a separate image asset first, isolate and prepare it, then insert it into the approved scene canvas.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Core principle',
            text: 'PPL FLUX generation node 829 exists as a separate decoded image before composite; the main architectural scene enters later at the paste stage.',
          },
          {
            status: 'inferred',
            title: 'Production value',
            text: 'Separating person generation from the architectural canvas reduces the risk of unintended changes to facade, perspective and composition.',
          },
        ],
      },
      {
        id: 'workflow01-vs-02',
        eyebrow: '02 · WORKFLOW 01 VS 02',
        title: 'The key difference between the two PEOPLE workflows',
        table: {
          columns: ['Workflow', 'What defines placement', 'AI responsibility'],
          rows: [
            ['01 · Generate & Place', 'Scene placement mask / target region', 'Create a new person, isolate them and place them'],
            ['02 · Replace Existing', 'Existing 3D / rendered person', 'Improve or replace the person in the same spatial slot'],
          ],
        },
        facts: [
          {
            status: 'confirmed',
            title: 'Keep them separate',
            text: 'Workflow 01 and Workflow 02 use similar generation / segmentation / preparation tools but operate under different spatial contracts.',
          },
        ],
      },
      {
        id: 'full-route',
        eyebrow: '03 · FULL ROUTE',
        title: 'Complete production route for Workflow 01',
        codeExamples: [
          {
            title: 'Generate separately → isolate cleanly → place locally → refine globally',
            label: 'PPL WORKFLOW 01',
            code:
              'PPL Prompt 408\n' +
              '→ prompt assembly 823 / 824 / 820\n' +
              '→ CLIP encode 831\n' +
              '→ FluxGuidance 830\n' +
              '→ guider / scheduler / sampler 826 / 819 / 828\n' +
              '→ FLUX person decode 829\n' +
              '→ People source selector 552\n' +
              '→ resize / detection canvas 780\n' +
              '→ Florence2 550\n' +
              '→ coordinates 114\n' +
              '→ SAM2 115\n' +
              '→ grow / blur 144 / 146\n' +
              '→ crop 420 / 781\n' +
              '→ Remove BG 422\n' +
              '→ Color Match 477\n' +
              '→ Cut By Mask 449\n' +
              '→ placement input 451 + base scene 779\n' +
              '→ Paste By Mask 429\n' +
              '→ RGB 672\n' +
              '→ PPL selector 459\n' +
              '→ detail transfer 573\n' +
              '→ main FLUX encode / sample / decode 67 / 57 / 53\n' +
              '→ active LQ save 730',
            note: 'Main FLUX after 459 is MASTER WORKFLOW refinement. The standalone PPL module logically ends at composite / return before that boundary.',
          },
        ],
      },
      {
        id: 'generate',
        eyebrow: '04 · GENERATE PERSON',
        title: 'The person is generated first as an independent FLUX image',
        table: {
          columns: ['Stage', 'Nodes', 'Function'],
          rows: [
            ['Prompt', '825 + 408 + 799 + 800 + 822', 'Person + environment/light/style context'],
            ['Assembly', '823 → 824 → 820', 'Assemble the final PPL text'],
            ['Encode', '831 → 830', 'CLIP conditioning + FluxGuidance 2.1'],
            ['Sample', '826 + 819 + 827 + 61 + 58 → 828', 'Independent person generation'],
            ['Decode', '829', 'Person image before segmentation'],
            ['Checkpoint', '409', 'Verify the person before mask / composite'],
          ],
        },
        bullets: [
          'If the person is already wrong at Preview 409, do not continue to mask/composite.',
          'The prompt should describe full body, scale, action, clothing and lighting context.',
          'Placement in the architectural scene is not solved at this stage.',
        ],
      },
      {
        id: 'isolate',
        eyebrow: '05 · ISOLATE PERSON',
        title: 'Florence2 answers WHERE; SAM2 answers WHAT EXACTLY',
        paragraphs: [
          'The generated person passes through People source selector 552 and is normalized to detection canvas 780. Florence2 550 performs phrase grounding, 114 converts detection into coordinates, and SAM2 115 builds the pixel mask.',
          'The mask is then expanded and softened by nodes 144 / 146, after which 420/781 create the crop used to prepare the compositing element.',
        ],
        codeExamples: [
          {
            title: 'Segmentation chain',
            label: 'PERSON MASK',
            code:
              '829 person image\n' +
              '→ 552 source selector\n' +
              '→ 780 resize\n' +
              '→ 550 Florence2\n' +
              '→ 114 coordinates\n' +
              '→ 115 SAM2\n' +
              '→ 144 Grow\n' +
              '→ 146 Blur\n' +
              '→ PERSON MASK',
          },
        ],
        bullets: [
          'Florence2 and SAM2 must operate in the same coordinate space.',
          'Person Mask should describe the figure, not its future position in the scene.',
          'Image / bbox / mask batch cardinality must be consistent before downstream processing.',
        ],
      },
      {
        id: 'two-masks',
        eyebrow: '06 · TWO-MASK PRINCIPLE',
        title: 'Person Mask ≠ Placement Mask',
        table: {
          columns: ['Mask', 'Question', 'Responsibility'],
          rows: [
            ['Person Mask', 'WHAT TO TAKE?', 'Isolate the generated person for crop / alpha / cutout'],
            ['Placement Mask / placement input', 'WHERE TO PUT?', 'Define the target region / spatial placement in the base scene'],
          ],
        },
        paragraphs: [
          'This is the central idea of Workflow 01. The mask used to cut out the person and the mask/placement input used to position the person in the scene serve different roles and should never be treated as one conceptual object.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'First composite topology',
            text: 'Paste By Mask 429 receives separate upstream inputs from 451, prepared person 449 and base scene 779.',
          },
          {
            status: 'not-confirmed',
            title: 'Exact semantic source of 451',
            text: 'Source documentation confirms incoming topology 451 → 429, but without the raw workflow export in the current assets we do not publish a standalone JSON with unverified serialization of this placement input.',
          },
        ],
      },
      {
        id: 'prepare',
        eyebrow: '07 · PREPARE CUTOUT',
        title: 'The generated image becomes a compositing element',
        table: {
          columns: ['Node', 'Role', 'QC'],
          rows: [
            ['420 / 781', 'Crop by person mask', 'Entire figure stays inside the crop'],
            ['422', 'Remove Background / Inspyrenet', 'No halo or residual generated background'],
            ['477', 'Color Match', 'Tone/contrast closer to the base scene'],
            ['449', 'Cut By Mask', 'RGB and alpha/mask remain aligned'],
          ],
        },
        paragraphs: [
          'Color Match helps integration but does not replace a correct lighting prompt. A wrong light direction cannot be fixed by color correction alone.',
        ],
      },
      {
        id: 'place',
        eyebrow: '08 · PLACE LOCALLY',
        title: 'Node 429 is the boundary between the person asset and the architectural scene',
        paragraphs: [
          'Paste By Mask 429 receives prepared person 449, base scene 779 and a separate placement-related input 451. Stored mode keep_ratio_fit shows that scale/fit is part of composite behavior.',
          'After 429, the output passes through 672 and reaches image1 of selector 459. At this point the independent person asset becomes part of the master scene data plane again.',
        ],
        codeExamples: [
          {
            title: 'First composite',
            label: 'MODULE RETURN',
            code:
              'BASE SCENE 779\n' +
              '+ PREPARED PERSON 449\n' +
              '+ PLACEMENT INPUT 451\n' +
              '→ Paste By Mask 429\n' +
              '→ RGB 672\n' +
              '→ PPL selector 459',
          },
        ],
      },
      {
        id: 'refine',
        eyebrow: '09 · REFINE GLOBALLY',
        title: 'After PPL return, the person enters shared master refinement',
        paragraphs: [
          'Selector 459 returns the composited scene to the main pipeline. Node 573 then performs detail transfer, 67 encodes the result to latent, 57 runs main FLUX sampling and 53 decodes the result.',
          'This stage helps seamless integration, but methodologically it belongs outside the standalone PPL module: the person should already be correctly placed before entering main FLUX.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Active return',
            text: '459 → 573 → 67 → 57 → 53; node 53 has an active LQ save route to 730.',
          },
        ],
      },
      {
        id: 'checkpoints',
        eyebrow: '10 · CHECKPOINTS',
        title: 'Five checkpoints where we stop and prove the result',
        table: {
          columns: ['Checkpoint', 'What must be proven'],
          rows: [
            ['A · 409 / after 829', 'The person generation itself is correct'],
            ['B · after 115 / 146', 'Person Mask is clean and matches the intended figure'],
            ['C · after 422 / 449', 'Cutout is clean, halo-free and alpha is aligned'],
            ['D · after 429 / 672', 'Scale, position and scene composite are correct'],
            ['E · 53 / 730', 'Main FLUX refinement preserved both the person and the architecture'],
          ],
        },
      },
      {
        id: 'archviz-value',
        eyebrow: '11 · ARCHVIZ VALUE',
        title: 'Why this workflow is especially valuable for historical and unusual scenes',
        bullets: [
          'Create a period-specific person unavailable in a stock library.',
          'Match clothing, action and visual language to the architecture.',
          'Keep the approved architectural base as a separate source.',
          'Correct person-generation errors independently from the main scene.',
          'Control placement locally instead of regenerating the full frame.',
        ],
      },
      {
        id: 'production-checklist',
        eyebrow: '12 · PRODUCTION CHECKLIST',
        title: 'Workflow 01 is ready for the Master only after these checks',
        bullets: [
          'The generated person reads as full body and matches the required role.',
          'Person Mask and Placement Mask are not confused.',
          'Florence2 / SAM2 use a consistent source size / coordinate space.',
          'The crop does not cut off limbs or accessories.',
          'Remove BG leaves no halo.',
          'Color Match is not being used to hide an incorrect light direction.',
          'Paste preserves a believable scale relative to horizon and architecture.',
          'Feet have credible ground contact; no floating.',
          'Occlusion relative to architecture is physically plausible.',
          'Main FLUX refinement does not alter approved scene geometry.',
        ],
      },
      {
        id: 'standalone-contract',
        eyebrow: '13 · STANDALONE JSON CONTRACT',
        title: 'What belongs in the independent training JSON and where it should end',
        codeExamples: [
          {
            title: 'Standalone module boundary',
            label: 'PPL W01 LAB',
            code:
              'LOCAL LOADERS / INPUTS\n' +
              '→ PPL GENERATE\n' +
              '→ PERSON SEGMENTATION\n' +
              '→ PREPARE CUTOUT\n' +
              '→ BASE SCENE + PLACEMENT INPUT\n' +
              '→ COMPOSITE CHECKPOINT\n' +
              '→ RETURN IMAGE\n' +
              '----- MASTER WORKFLOW ONLY -----\n' +
              '→ MAIN FLUX REFINEMENT',
            note: 'The standalone JSON should not drag in the entire Master. Every external dependency must become a local input/loader/control.',
          },
        ],
        facts: [
          {
            status: 'not-confirmed',
            title: 'Why the JSON is not published yet',
            text: 'The current repository / Library assets do not include raw Epspoziciya_archviz_ph_sdxlflux_v001.json with complete custom-node serialization. Under our rules, a reconstructed pseudo-JSON cannot be presented as an importable workflow.',
          },
        ],
      },
      {
        id: 'pass',
        eyebrow: '14 · PASS CRITERIA',
        title: 'Workflow 01 is understood when you can explain it in one sentence',
        codeExamples: [
          {
            title: 'The sentence',
            label: 'MEMORY MODEL',
            code:
              'GENERATE SEPARATELY\n' +
              '→ ISOLATE CLEANLY\n' +
              '→ PLACE LOCALLY\n' +
              '→ REFINE GLOBALLY',
          },
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Spatial rule',
            text: 'Workflow 01: placement is defined by a target region / placement input. Workflow 02: placement is defined by an existing person.',
          },
        ],
      },
    ],
  },
];
