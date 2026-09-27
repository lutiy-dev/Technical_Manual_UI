import type { Chapter } from '../manual-types';

export const workflowEngineeringCoordinatesBatchChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-coordinates-batch',
    navTitle: 'Coordinates & Batch Semantics',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'Resolution, Coordinate Space & Batch Semantics — the hidden geometry of a graph',
    lede:
      'Many difficult-to-explain failures in production ComfyUI are caused not by the model, but by mismatched dimensions, coordinate spaces or batch cardinality. This chapter teaches you to verify data geometry before running expensive generative stages.',
    status: 'confirmed',
    statusNote:
      'This chapter is grounded in the actual Hansen size/batch contracts and in a confirmed Florence2 → SAM2 failure mode where bbox cardinality did not match the image batch.',
    visual: 'inputs',
    category: 'workflow-engineering',
    stage: 'coordinates-batch',
    relatedChapters: [
      'workflow-engineering-module-contracts',
      'inputs',
      'segmentation-masks',
      'segmentation-mask',
      'workflow-engineering-debugging',
    ],
    sections: [
      {
        id: 'three-contracts',
        eyebrow: '01 · THREE CONTRACTS',
        title: 'Before connecting branches, verify dimensions, coordinates and cardinality',
        codeExamples: [
          {
            title: 'Minimal spatial contract',
            label: 'PRE-FLIGHT',
            code:
              'DIMENSIONS\n' +
              '+ COORDINATE SPACE\n' +
              '+ BATCH CARDINALITY\n' +
              '→ SAFE DOWNSTREAM PROCESSING',
          },
        ],
      },
      {
        id: 'dimensions',
        eyebrow: '02 · DIMENSIONS',
        title: 'The same visual frame can exist at several resolutions',
        paragraphs: [
          'The base image, latent canvas, detection image, external depth map, mask atlas and crop can all have different resolutions. That is acceptable while they are processed independently. The problem starts when coordinates or a mask from one canvas are applied to another.',
          'Resize is therefore not a cosmetic operation. It changes the downstream coordinate system.',
        ],
        table: {
          columns: ['Object', 'What to verify'],
          rows: [
            ['IMAGE', 'width × height and aspect ratio'],
            ['MASK', 'same canvas or an explicit resize'],
            ['LATENT', 'expected model canvas / divisibility constraints'],
            ['BBOX / points', 'which image coordinate system produced them'],
            ['CROP', 'origin + width/height relative to the source canvas'],
          ],
        },
      },
      {
        id: 'coordinate-space',
        eyebrow: '03 · COORDINATE SPACE',
        title: 'A BBOX only has meaning together with the image on which it was calculated',
        paragraphs: [
          'A bounding box is not an abstract rectangle. Its x/y coordinates are tied to a specific width and height. If detection ran after a resize, that bbox cannot be applied directly to an original image of another size without a coordinate transform.',
          'The same rule applies to placement masks, crops and segmentation points.',
        ],
        codeExamples: [
          {
            title: 'Correct detection → segmentation pairing',
            label: 'COORDINATE CONTRACT',
            code:
              'SOURCE IMAGE A\n' +
              '→ DETECTION ON IMAGE A\n' +
              '→ BBOX IN SPACE A\n' +
              '+ SAME IMAGE A\n' +
              '→ SEGMENTATION',
          },
        ],
      },
      {
        id: 'mask-coordinate-space',
        eyebrow: '04 · MASK SPACE',
        title: 'A mask must match the canvas it controls',
        paragraphs: [
          'Even a semantically correct mask becomes wrong when it was created on a different resize or crop. Before composite/inpaint, verify the mask dimensions and its mapping to the target image.',
          'For local-crop workflows, it is useful to distinguish explicitly between a local mask and a full-scene mask — they are different contracts.',
        ],
      },
      {
        id: 'batch-basics',
        eyebrow: '05 · BATCH',
        title: 'Batch means element count, not simply “several images”',
        paragraphs: [
          'IMAGE may contain a batch of N elements. MASK may contain a different batch. A detection result may contain a list of objects. The downstream node must define how those cardinalities are paired.',
          'Some nodes support broadcasting while others expect a strict 1:1 relationship. Never assume the behavior without checking the specific node implementation.',
        ],
        table: {
          columns: ['Scenario', 'Risk'],
          rows: [
            ['1 image + 1 mask', 'Basic and usually safe'],
            ['N images + N masks', 'The pairing order must be confirmed'],
            ['N images + 1 mask', 'Requires broadcasting support or explicit repetition'],
            ['1 image + N object masks', 'May use object-batch / combined-mask behavior'],
            ['N images + M bboxes', 'Unsafe if the node indexes bbox by image index'],
          ],
        },
      },
      {
        id: 'sam2-case',
        eyebrow: '06 · REAL FAILURE CASE',
        title: 'Why segmentation can fail even when the models are correct',
        paragraphs: [
          'In our Florence2 → SAM2 test, Florence had already detected the objects successfully, but downstream segmentation received inconsistent cardinality: the image batch contained more elements than the bbox list. The node indexed bbox by image index and ran past the end of the array.',
          'This demonstrates an important principle: an error after AI-model inference does not necessarily mean the model is at fault. Verify the data contract first.',
        ],
        codeExamples: [
          {
            title: 'Failure logic',
            label: 'BATCH MISMATCH',
            code:
              'IMAGE BATCH = 4\n' +
              'BBOX COUNT = 2\n' +
              'SAM2 expects paired indexing\n' +
              '→ index 2 out of bounds',
          },
        ],
      },
      {
        id: 'single-image-debug',
        eyebrow: '07 · DEBUG RULE',
        title: 'Prove the single-image route before increasing batch size',
        paragraphs: [
          'For a complex detection/segmentation branch, a reliable benchmark starts with batch=1. Once the single-image route succeeds, test multiple objects separately, and only then move to a multi-image batch.',
        ],
        codeExamples: [
          {
            title: 'Safe progression',
            label: 'SAFE DEBUG',
            code:
              '1 IMAGE + 1 TARGET\n' +
              '→ 1 IMAGE + MULTIPLE TARGETS\n' +
              '→ MULTIPLE IMAGES + DEFINED PAIRING',
          },
        ],
      },
      {
        id: 'resize-policy',
        eyebrow: '08 · RESIZE POLICY',
        title: 'Resize should have an owner and an explicit place in the pipeline',
        paragraphs: [
          'If every branch resizes its source independently, coordinate mapping quickly becomes opaque. Prefer explicit working canvases and document which stage owns each size transformation.',
        ],
        facts: [
          {
            status: 'inferred',
            title: 'Engineering rule',
            text: 'Keep spatially coupled operations — image/mask/bbox/composite — on one named working canvas whenever possible, or document the transform between canvases.',
          },
        ],
      },
      {
        id: 'practice',
        eyebrow: '09 · PRACTICE',
        title: 'Practice: build a spatial ledger for one branch',
        table: {
          columns: ['Stage', 'W×H', 'Batch', 'Coordinate owner'],
          rows: [
            ['Input', 'fill in', 'fill in', 'BASE'],
            ['Resize', 'fill in', 'fill in', 'WORKING CANVAS'],
            ['Detection', 'fill in', 'fill in', 'DETECTION SPACE'],
            ['Mask', 'fill in', 'fill in', 'MASK SPACE'],
            ['Composite', 'fill in', 'fill in', 'DESTINATION SPACE'],
          ],
        },
        paragraphs: [
          'If even one row is unknown, the branch is not yet ready for reliable integration into the Master Workflow.',
        ],
      },
    ],
  },
];
