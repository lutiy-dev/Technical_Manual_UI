import type { Chapter } from '../manual-types';

export const workflowEngineeringDataControlPlaneChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-data-control-plane',
    navTitle: 'Data Plane vs Control Plane',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'Data Plane vs Control Plane — what flows through the graph and what controls it',
    lede:
      'A professional ComfyUI graph is easier to read when you separate two layers: the data plane carries images, latent data, masks, models and conditioning; the control plane defines modes, selectors, parameters, enable/bypass state and the overall runtime profile.',
    status: 'confirmed',
    statusNote:
      'The data/control-plane distinction matches the actual Hansen topology: large data links and linked INT/FLOAT/STRING controls serve different roles.',
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
        title: 'One graph contains at least two different kinds of logic',
        table: {
          columns: ['Layer', 'What it carries', 'Primary question'],
          rows: [
            ['DATA PLANE', 'IMAGE, MASK, LATENT, MODEL, CONDITIONING', 'What is being processed right now?'],
            ['CONTROL PLANE', 'INT, FLOAT, STRING, BOOLEAN, selectors, bypass', 'Which route and mode are active?'],
          ],
        },
      },
      {
        id: 'data-plane-route',
        eyebrow: '02 · DATA PLANE',
        title: 'The data plane shows the path from input to output',
        paragraphs: [
          'On the first pass through a large workflow, follow the large objects. IMAGE moves through preprocessors, MASK constrains an area, LATENT passes through the sampler, and MODEL plus CONDITIONING provide the generative context. This is the computational skeleton.',
          'If you mentally remove the small control wires, the remaining data route should still be understandable.',
        ],
        codeExamples: [
          {
            title: 'Example data plane',
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
          'The control plane may not alter pixels directly, but it determines which pixels reach downstream. It selects the source, strength, steps, denoise, mode, resolution and active modules.',
          'A small INT selector can therefore be more important than an entire generative branch: the wrong value can simply route the graph somewhere else.',
        ],
        codeExamples: [
          {
            title: 'Example control plane',
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
        title: 'The visible widget value is not always the effective value',
        paragraphs: [
          'When a parameter input is linked to another control node, the downstream widget may display a saved local value that does not define the current runtime. The authoritative source is upstream.',
          'When debugging selectors and shared controls, trace the link back to its source rather than trusting only the value shown inside the destination node.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Hansen example',
            text: 'This manual already documents selectors in which a linked input overrides the stored widget value.',
          },
        ],
      },
      {
        id: 'shared-control',
        eyebrow: '05 · SINGLE SOURCE OF TRUTH',
        title: 'One shared control should keep related parameters in sync',
        paragraphs: [
          'When several branches must use the same mode, size or seed, one authoritative control is safer than copying the same value manually into several places.',
          'This reduces configuration drift: the situation where one parameter has been updated while another still uses an old value.',
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
        title: 'A large graph is easier to read in two passes',
        codeExamples: [
          {
            title: 'Pass 1 / Pass 2',
            label: 'READING METHOD',
            code:
              'PASS 1 · DATA\n' +
              'Input → Image/Latent/Mask route → Output\n\n' +
              'PASS 2 · CONTROL\n' +
              'BASE CONFIG → Selectors → Shared values → Bypass state',
            note: 'After these two passes, combine them into one effective runtime map.',
          },
        ],
      },
      {
        id: 'effective-runtime-map',
        eyebrow: '07 · EFFECTIVE STATE',
        title: 'Topology and runtime path are not the same thing',
        paragraphs: [
          'Topology answers which connections exist in the saved workflow. The effective runtime map answers which of those connections actually determine the current result after selectors, linked controls and bypass state are taken into account.',
          'This distinction is critical when auditing large graphs: a connected branch may be selected away, while a saved post-process may be in bypass.',
        ],
      },
      {
        id: 'practice',
        eyebrow: '08 · PRACTICE',
        title: 'Practice: draw two maps of the same workflow',
        bullets: [
          'Map A: keep only IMAGE / MASK / LATENT / MODEL / CONDITIONING links.',
          'Map B: list only selectors, INT/FLOAT/STRING controls and bypass switches.',
          'For every selector, record its authoritative upstream value.',
          'Combine the maps and describe the effective runtime route in one sentence.',
        ],
        facts: [
          {
            status: 'inferred',
            title: 'Readiness criterion',
            text: 'If you can explain the data route and control route separately, you are ready to move on to module contracts and interface design.',
          },
        ],
      },
    ],
  },
];
