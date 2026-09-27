import type { Chapter } from '../manual-types';

export const workflowEngineeringReproducibilityChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-reproducibility',
    navTitle: 'Reproducibility & Testing',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'Reproducibility & One-Variable Testing — turning experiments into an engineering process',
    lede:
      'If two runs differ in seed, denoise, prompt, model, and resolution at the same time, the cause of the result cannot be isolated. A professional workflow should make tests repeatable and let you change one variable at a time.',
    status: 'confirmed',
    statusNote:
      'The reproducible-benchmark principle directly connects to shared seed, linked controls, sampler settings, and the Golden Run concept already present in this technical manual.',
    visual: 'checklist',
    category: 'workflow-engineering',
    stage: 'reproducibility',
    relatedChapters: [
      'workflow-engineering-debugging',
      'workflow-engineering-base-config',
      'control-panel',
      'checklist',
    ],
    sections: [
      {
        id: 'why-reproducibility',
        eyebrow: '01 · WHY',
        title: 'Repeatability is not academic overhead — it enables faster decisions',
        paragraphs: [
          'When a result can be reproduced, every improvement or regression can be tied to a specific change. Without repeatability, you are evaluating a bundle of random differences rather than building a reliable production recipe.',
          'This matters especially in Archviz, where we need to distinguish a material improvement from a change in geometry, lighting, seed, or local mask.',
        ],
      },
      {
        id: 'minimum-state',
        eyebrow: '02 · TEST STATE',
        title: 'What to record for a reproducible run',
        table: {
          columns: ['Category', 'What to preserve'],
          rows: [
            ['Workflow', 'exact JSON version / commit / hash'],
            ['Inputs', 'the same images, masks, and references'],
            ['Models', 'filenames / versions / relevant custom nodes'],
            ['Controls', 'effective values, including linked inputs'],
            ['Sampling', 'seed, steps, sampler, scheduler, CFG/guidance, denoise'],
            ['Canvas', 'working resolution / resize mode / batch'],
            ['Runtime profile', 'which groups are enabled/bypassed'],
            ['Result', 'checkpoint previews + final output'],
          ],
        },
      },
      {
        id: 'one-variable',
        eyebrow: '03 · ONE VARIABLE',
        title: 'Change one variable per test',
        paragraphs: [
          'If the goal is to measure the effect of denoise, seed, prompt, and ControlNet strength should remain unchanged. If Canny is being tested, Depth and sampler settings should stay fixed between variants.',
          'That is what makes an A/B comparison interpretable.',
        ],
        codeExamples: [
          {
            title: 'A valid benchmark',
            label: 'A/B TEST',
            code:
              'A · denoise 0.08 · SAME seed · SAME prompt · SAME controls\n' +
              'B · denoise 0.12 · SAME seed · SAME prompt · SAME controls\n\n' +
              'ONLY VARIABLE = denoise',
          },
        ],
      },
      {
        id: 'seed',
        eyebrow: '04 · SEED',
        title: 'Seed is part of the experiment configuration, not just a randomize button',
        paragraphs: [
          'When comparing architectural settings, keep the seed fixed. Otherwise, changes in composition, people, or material detail may come from a different noise pattern rather than the parameter being tested.',
          'In a workflow with a shared seed, verify every consumer: one source can influence several samplers / noise nodes at once.',
        ],
      },
      {
        id: 'effective-values',
        eyebrow: '05 · EFFECTIVE VALUES',
        title: 'Record effective values, not only what is visible in a widget',
        paragraphs: [
          'If a sampler receives steps or denoise through a linked input, its locally stored widget value is not authoritative. The benchmark log should record the effective upstream value.',
          'The same applies to selectors: a stored value and the currently selected source may differ.',
        ],
      },
      {
        id: 'golden-run',
        eyebrow: '06 · GOLDEN RUN',
        title: 'Golden Run — a reference baseline for measuring change',
        paragraphs: [
          'Once a workflow is stable, preserve one verified run: inputs, model manifest, controls, seed, checkpoints, and final output. This becomes the baseline.',
          'Updates to custom nodes, model weights, or topology can then be checked against the Golden Run so regressions are detected quickly.',
        ],
        codeExamples: [
          {
            title: 'Golden Run package',
            label: 'BASELINE',
            code:
              'WORKFLOW JSON + HASH\n' +
              '+ INPUT SET\n' +
              '+ MODEL / NODE MANIFEST\n' +
              '+ EFFECTIVE CONTROLS\n' +
              '+ SEED / SAMPLER STATE\n' +
              '+ CHECKPOINT PREVIEWS\n' +
              '+ FINAL OUTPUT',
          },
        ],
      },
      {
        id: 'benchmark-matrix',
        eyebrow: '07 · BENCHMARK MATRIX',
        title: 'Evaluate predefined criteria, not simply “which looks better”',
        table: {
          columns: ['Criterion', 'What to observe in Archviz'],
          rows: [
            ['Geometry preservation', 'camera, proportions, openings, facade rhythm'],
            ['Material realism', 'microdetail, roughness cues, texture stability'],
            ['Lighting coherence', 'direction, exposure, local integration'],
            ['Artifact rate', 'AI chaos, halos, duplicated details, broken people'],
            ['Locality', 'changes occur only where they are allowed'],
            ['Runtime cost', 'VRAM, time, number of active models'],
          ],
        },
      },
      {
        id: 'version-drift',
        eyebrow: '08 · VERSION DRIFT',
        title: 'Updating a model or custom node is a system change',
        paragraphs: [
          'Even when the JSON is unchanged, a new custom-node version may alter inputs, defaults, or execution behavior. Environment versioning therefore belongs in the reproducibility contract.',
          'This is exactly why production STABLE and experimental LAB environments are useful: an experiment should not silently change the baseline production workflow.',
        ],
      },
      {
        id: 'practice',
        eyebrow: '09 · PRACTICE',
        title: 'Practice: run one real A/B benchmark',
        bullets: [
          'Choose one stable input.',
          'Fix the seed and all controls.',
          'Choose exactly one variable.',
          'Produce A and B without any other changes.',
          'Save identical checkpoints for both variants.',
          'Evaluate predefined criteria rather than overall impression.',
          'Record the conclusion and promote the better variant to a new baseline only after a repeat verification.',
        ],
      },
    ],
  },
];
