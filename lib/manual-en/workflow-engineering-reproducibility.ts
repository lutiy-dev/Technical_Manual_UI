import type { Chapter } from '../manual-types';

export const workflowEngineeringReproducibilityChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-reproducibility',
    navTitle: 'Reproducibility & Testing',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'Reproducibility & One-Variable Testing — turning experiments into an engineering process',
    lede:
      'If two runs differ simultaneously in seed, denoise, prompt, model and resolution, the cause of the result is impossible to isolate. A professional workflow should support repeatable tests and one-variable changes per iteration.',
    status: 'confirmed',
    statusNote:
      'The reproducible-benchmark principle is directly connected to shared seed, linked controls, sampler settings and the Golden Run concept already present in the technical manual.',
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
        title: 'Repeatability is not academic overhead — it makes decisions faster',
        paragraphs: [
          'When a result can be reproduced, an improvement or regression can be tied to a specific change. Without that, you are judging a bundle of random variation rather than building a reliable production recipe.',
          'This is especially important in ArchViz, where we need to separate material improvement from changes in geometry, lighting, seed or a local mask.',
        ],
      },
      {
        id: 'minimum-state',
        eyebrow: '02 · TEST STATE',
        title: 'What to record for a reproducible run',
        table: {
          columns: ['Category', 'What to save'],
          rows: [
            ['Workflow', 'exact JSON version / commit / hash'],
            ['Inputs', 'the same images, masks and references'],
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
          'If the goal is to measure denoise, then seed, prompt and ControlNet strength should remain unchanged. If Canny is being tested, Depth and the sampler should not change between variants.',
          'That makes the A/B comparison interpretable.',
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
        title: 'Seed is part of the experiment configuration, not a randomness button',
        paragraphs: [
          'When comparing architectural settings, keep the seed fixed. Otherwise changes in composition, people or materials may come from a different noise pattern rather than the parameter under test.',
          'In a workflow with a shared seed, verify every consumer: one source may influence several samplers / noise nodes at once.',
        ],
      },
      {
        id: 'effective-values',
        eyebrow: '05 · EFFECTIVE VALUES',
        title: 'Record effective values, not only what the widget displays',
        paragraphs: [
          'If a sampler receives steps or denoise through a linked input, the locally stored widget value is not authoritative. A benchmark log should record the effective upstream value.',
          'The same applies to selectors: a stored value and the currently selected source can diverge.',
        ],
      },
      {
        id: 'golden-run',
        eyebrow: '06 · GOLDEN RUN',
        title: 'Golden Run — a reference state against which changes are measured',
        paragraphs: [
          'Once the workflow is stable, capture one validated run: inputs, model manifest, controls, seed, checkpoints and final output. This becomes the baseline.',
          'Updates to custom nodes, model weights or topology can then be checked against the Golden Run to reveal regressions quickly.',
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
        title: 'Evaluate against predefined criteria, not simply “looks better”',
        table: {
          columns: ['Criterion', 'What to observe in ArchViz'],
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
        title: 'Updating a model or custom node changes the system',
        paragraphs: [
          'Even when the JSON is unchanged, a new custom-node version can alter inputs, defaults or execution behavior. Environment versioning is therefore part of the reproducibility contract.',
          'This is exactly why separating production STABLE from experimental LAB is useful: experiments should not silently change the baseline production workflow.',
        ],
      },
      {
        id: 'practice',
        eyebrow: '09 · PRACTICE',
        title: 'Practice: run one real A/B benchmark',
        bullets: [
          'Choose one stable input.',
          'Lock seed and all controls.',
          'Choose exactly one variable.',
          'Produce A and B with no other changes.',
          'Save identical checkpoints.',
          'Evaluate against criteria chosen in advance, not general impression.',
          'Record the conclusion and promote the better variant to baseline only after a repeat check.',
        ],
      },
    ],
  },
];
