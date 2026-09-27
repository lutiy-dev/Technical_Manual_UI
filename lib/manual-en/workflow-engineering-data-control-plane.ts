import type { Chapter } from '../manual-types';

export const workflowEngineeringDataControlPlaneChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-data-control-plane',
    navTitle: 'Data Plane vs Control Plane',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'Data Plane vs Control Plane — what moves through the graph and what controls it',
    lede:
      'A professional ComfyUI graph becomes much easier to read when you separate two layers: the data plane carries images, latents, masks, models, and conditioning, while the control plane defines modes, selectors, parameters, enable/bypass states, and the overall runtime profile.',
    status: 'confirmed',
    statusNote:
      'The data/control-plane distinction matches the actual Hansen topology: large data links and linked INT/FLOAT/STRING controls serve fundamentally different roles.',
    visual: 'graph-reading',
    category: 'workflow-engineering',
    stage: 'data-control-plane',
    relatedChapters: [
      'workflow-engineering-graph-literacy',
      'workflow-engineering-base-config',
      'control-panel',
      'inputs',
      'workflow-engineering-module-contracts',
    ],
    sections: [
      {
        id: 'two-layers',
        eyebrow: '01 · TWO LAYERS',
        title: 'A single graph contains at least two distinct kinds of logic',
        table: {
          columns: ['Layer', 'What it carries', 'Primary question'],
          rows: [
            ['DATA PLANE', 'IMAGE, MASK, LATENT, MODEL, CONDITIONING', 'What is being processed right now?'],
            ['CONTROL PLANE', 'INT, FLOAT, STRING, BOOLEAN, selectors, bypass', 'Which route and mode are active right now?'],
          ],
        },
      },
      {
        id: 'data-plane-route',
        eyebrow: '02 · DATA PLANE',
        title: 'The data plane reveals the result path from input to output',
        paragraphs: [
          'When you first inspect a large workflow, look for the major data objects. IMAGE flows into preprocessors, MASK limits the affected region, LATENT passes through the sampler, and MODEL plus CONDITIONING drive generation. This is the computational skeleton.',
          'If you mentally remove every small control wire, a readable data route should still remain.',
        ],
        codeExamples: [
          {
            title: 'Data-plane example',
            label: 'DATA ROUTE',
            code:
              'BASE IMAGE\n' +
              '→ PREPROCESS\n' +
              '→ GENERATION\n' +
              '→ LOCAL COMPOSITE\n' +
              '→ FINAL REFINEMENT\n' +
              '→ OUTPUT',
          },
        ],
      },
      {
        id: 'control-plane-route',
        eyebrow: '03 · CONTROL PLANE',
        title: 'The control plane defines the effective runtime state',
        paragraphs: [
          'The control plane may not modify pixels directly, but it determines which pixels reach downstream processing at all. It selects the source, strength, step count, denoise level, mode, resolution, and active modules.',
          'That means a small INT selector can matter more than an entire generative branch: one incorrect value can simply route execution through the wrong path.',
        ],
        codeExamples: [
          {
            title: 'Control-plane example',
            label: 'CONTROL ROUTE',
            code:
              'BASE CONFIG\n' +
              '→ MODULE ENABLE / BYPASS\n' +
              '→ MODE SELECTOR\n' +
              '→ SHARED PARAMETERS\n' +
              '→ EFFECTIVE RUNTIME PATH',
          },
        ],
      },
      {
        id: 'linked-overrides',
        eyebrow: '04 · LINKED VALUES',
        title: 'A visible widget value is not always the effective value',
        paragraphs: [
          'When a parameter input is linked to another control node, the downstream widget may still display a stored local value that no longer determines runtime behavior. The authoritative source is upstream.',
          'When diagnosing selectors and shared controls, always trace the link back to its source rather than trusting only the value shown inside the destination node.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Hansen example',
            text: 'This technical manual already documents selectors in which a linked input overrides the stored widget value.',
          },
        ],
      },
      {
        id: 'shared-control',
        eyebrow: '05 · SINGLE SOURCE OF TRUTH',
        title: 'One shared control should keep related parameters synchronized',
        paragraphs: [
          'When several branches must use the same mode, size, or seed, a single authoritative control is preferable to copying the value manually into multiple locations.',
          'This reduces configuration drift: the situation where one parameter has been updated while another still carries the previous value.',
        ],
        table: {
          columns: ['Shared control', 'Possible consumers'],
          rows: [
            ['Seed', 'SDXL sampler, FLUX noise, PPL generation'],
            ['Working size', 'Latent, resize, masks, composite canvas'],
            ['Mode', 'Latent source, denoise route, selectors'],
            ['People source', 'PPL selectors, downstream return'],
          ],
        },
      },
      {
        id: 'reading-strategy',
        eyebrow: '06 · TWO-PASS READING',
        title: 'Large graphs are easier to read in two passes',
        codeExamples: [
          {
            title: 'Pass 1 / Pass 2',
            label: 'READING METHOD',
            code:
              'PASS 1 · DATA\n' +
              'Input → Image/Latent/Mask route → Output\n\n' +
              'PASS 2 · CONTROL\n' +
              'BASE CONFIG → Selectors → Shared values → Bypass state',
            note: 'After the two passes, combine them into a single effective runtime map.',
          },
        ],
      },
      {
        id: 'effective-runtime-map',
        eyebrow: '07 · EFFECTIVE STATE',
        title: 'Graph topology and runtime path are not the same thing',
        paragraphs: [
          'Topology answers which connections exist in the saved workflow. The effective runtime map answers which of those connections actually determine the current result once selectors, linked controls, and bypass states are taken into account.',
          'This distinction is critical when auditing large graphs: a connected branch may be selected away, while a saved post-process stage may currently be bypassed.',
        ],
      },
      {
        id: 'practice',
        eyebrow: '08 · PRACTICE',
        title: 'Practice: draw two maps of the same workflow',
        bullets: [
          'Map A: keep only IMAGE / MASK / LATENT / MODEL / CONDITIONING links.',
          'Map B: list only selectors, INT/FLOAT/STRING controls, and bypass switches.',
          'For each selector, record its authoritative upstream value.',
          'Combine the maps and describe the effective runtime route in one sentence.',
        ],
        facts: [
          {
            status: 'inferred',
            title: 'Readiness criterion',
            text: 'If a learner can explain the data route and the control route independently, they are ready to move on to module contracts and interface design.',
          },
        ],
      },
    ],
  },
];
