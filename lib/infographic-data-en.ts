export const branchPurposes = [
  'Generates people as an independent mini-pipeline.',
  'Builds masks and segmentation.',
  'Prepares figures for insertion into the scene.',
  'Returns the selected composite to the main graph.',
  'If people exist in intermediate stages but disappear from output, inspect routing, selectors, composite, and downstream overwrite.',
] as const;

export const keyPeopleNodes = [
  {
    node: '408',
    title: 'PROMPT PPL FLUX',
    text: 'Defines character type, clothing, pose, scale, and relationship to the scene.',
  },
  {
    node: '543',
    title: 'PPL Selector',
    text: 'Shared INT control: 1 = FLUX, 2 = INPUT / 3D.',
  },
  {
    node: '715',
    title: 'Return / Downstream Selector',
    text: 'Nested source selector before node 552; not a standalone final composite.',
  },
] as const;

export const overviewPipeline = [
  ['408', 'Prompt'],
  ['828 / 829', 'Generate'],
  ['550–146', 'Mask'],
  ['420–449', 'Prepare'],
  ['451 / 429', 'Position'],
  ['429 / 459', 'Composite'],
  ['573 → 53', 'Return'],
] as const;

export const preparationCriteria = [
  ['Scale', 'Matches scene depth and perspective'],
  ['Position', 'Figure occupies the intended region'],
  ['Mask edge', 'Clean, without clipping or halo'],
  ['Brightness', 'Consistent with the environment'],
  ['Contrast', 'No blown highlights or crushed shadows'],
] as const;

export const stageQualityRows = [
  {
    stage: 'Prompt',
    expected: 'Clear, complete text describing both people and scene context.',
    broken: 'Wrong people, clothing, or pose.',
    inspect: 'Type, clothing, pose, distance, gaze, scene context.',
  },
  {
    stage: 'Generate',
    expected: 'Readable figures, suitable viewpoint, no major artifacts.',
    broken: 'Broken poses, softness, unwanted details.',
    inspect: 'Prompt, model stack, seed, sampler, preview 409.',
  },
  {
    stage: 'Mask',
    expected: 'Clean silhouette without holes, debris, or halos.',
    broken: 'Body parts disappear or background remains.',
    inspect: '550 → 115 → 144 → 146, classes, and edge cleanup.',
  },
  {
    stage: 'Composite',
    expected: 'People integrate naturally and remain in output.',
    broken: 'Wrong scale, tone, shadow, or routing.',
    inspect: '451, 429, 459, 573, 53, and save 730.',
  },
] as const;

export const failurePoints = [
  ['01', 'Prompt is weak or incomplete', 'People fail to generate or appear arbitrary.'],
  ['02', 'Segmentation is poor', 'Torn mask, residual background, missing body parts.'],
  ['03', 'Wrong selector route', 'A different branch reaches the main path.'],
  ['04', 'Composite is incorrect', 'People exist independently but never enter the scene.'],
  ['05', 'Position / scale is wrong', 'People are too small, outside the frame, or outside the intended mask.'],
] as const;

export const diagnosticOrder = [
  ['408 / 831', 'Prompt'],
  ['828 / 829', 'Generate'],
  ['550–146', 'Mask'],
  ['451 / 429', 'Position'],
  ['459', 'Composite'],
  ['573 → 53', 'Return'],
  ['730', 'Final output'],
] as const;
