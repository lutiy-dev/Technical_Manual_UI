import type { Chapter } from '../manual-types';

export const workflowEngineeringRoutingLabChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-routing-lab',
    navTitle: 'LAB 01 · Routing Sandbox',
    eyebrow: 'PRACTICE LAB · WORKFLOW ENGINEERING',
    title: 'Routing Sandbox: selector, bypass, lazy execution and cache without generative models',
    lede:
      'The first lab deliberately removes SDXL, FLUX, VAE and model concerns from view. What remains is pure graph logic: two data sources, a selector, one output, Queue Prompt, bypass, and observation of which branch the engine actually requires.',
    status: 'confirmed',
    statusNote:
      'The lab uses ComfyUI-Easy-Use already installed in ARCHVIZ_LAB: textIndexSwitch uses lazy inputs, making it suitable for demonstrating selected routes and dependency-driven execution.',
    visual: 'selectors',
    category: 'workflow-engineering',
    stage: 'workflow-engineering-practice-lab-01',
    relatedChapters: [
      'workflow-engineering-data-control-plane',
      'workflow-engineering-switches-routing',
      'workflow-engineering-execution-cache',
      'workflow-engineering-module-contracts',
    ],
    sections: [
      {
        id: 'goal',
        eyebrow: '01 · GOAL',
        title: 'What you should understand hands-on in 10–15 minutes',
        paragraphs: [
          'The goal is not to memorize more node names. The goal is to experience the difference between CONNECTED, SELECTED, REQUIRED and EXECUTED.',
          'After this lab, the large Hansen graph should no longer look like a web of wires, but like a set of branches from which a selector chooses the current runtime route.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Primary question',
            text: 'Not “where does this wire go?”, but “which upstream path is actually required by the selected output right now?”',
          },
          {
            status: 'confirmed',
            title: 'Why no models',
            text: 'VRAM, samplers and prompt quality should not distract from routing logic.',
          },
        ],
      },
      {
        id: 'graph',
        eyebrow: '02 · BUILD',
        title: 'Build a minimal graph from four functional parts',
        codeExamples: [
          {
            title: 'Routing Sandbox v001',
            label: 'NODE FLOW',
            code:
              '[A · easy promptLine: ROUTE A]\n' +
              '                 ├──→ [easy textIndexSwitch] ──→ [easy showAnything · OUTPUT]\n' +
              '[B · easy promptLine: ROUTE B]\n' +
              '\n' +
              'index = 0 → ROUTE A\n' +
              'index = 1 → ROUTE B',
            note: 'textIndexSwitch uses lazy inputs: the selector requests only the selected textN input.',
          },
        ],
        bullets: [
          'Create two easy promptLine nodes and group them as ROUTE A and ROUTE B.',
          'Set A to ROUTE A · ORIGINAL. Set B to ROUTE B · ORIGINAL.',
          'Create easy textIndexSwitch and connect A → text0, B → text1.',
          'Connect the text output to easy showAnything. This is the only output in the lab.',
          'Start with selector index = 0.',
        ],
      },
      {
        id: 'experiment-selector',
        eyebrow: '03 · EXPERIMENT A',
        title: 'CONNECTED ≠ SELECTED',
        table: {
          columns: ['Action', 'Expected output', 'What this proves'],
          rows: [
            ['index = 0 → Queue Prompt', 'ROUTE A · ORIGINAL', 'A is selected; B is physically connected but not selected'],
            ['index = 1 → Queue Prompt', 'ROUTE B · ORIGINAL', 'The selector changes the effective route without rewiring the graph'],
            ['return index = 0', 'ROUTE A · ORIGINAL', 'Topology did not change; only the control value changed'],
          ],
        },
        facts: [
          {
            status: 'confirmed',
            title: 'textIndexSwitch behavior',
            text: 'Index selects one textN input; lazy status requests only the corresponding input.',
          },
        ],
      },
      {
        id: 'experiment-dependency',
        eyebrow: '04 · EXPERIMENT B',
        title: 'CONNECTED ≠ REQUIRED',
        paragraphs: [
          'Keep index = 0. Change only ROUTE B to ROUTE B · CHANGED and press Queue Prompt.',
          'The key observation: the output should still show ROUTE A. Changing an unselected branch does not make it part of the current required path.',
        ],
        codeExamples: [
          {
            title: 'Dependency question',
            label: 'MENTAL MODEL',
            code:
              'OUTPUT\n' +
              '← textIndexSwitch(index = 0)\n' +
              '← text0\n' +
              '← ROUTE A\n' +
              '\n' +
              'ROUTE B exists, but current OUTPUT does not depend on it.',
          },
        ],
      },
      {
        id: 'experiment-cache',
        eyebrow: '05 · EXPERIMENT C',
        title: 'REQUIRED does not necessarily mean recomputed from scratch',
        paragraphs: [
          'Without changing index or ROUTE A, press Queue Prompt again. Then change ROUTE A to ROUTE A · CHANGED and run once more.',
          'The point of the experiment is to separate the requirement graph from execution/cache behavior. The same required route can reuse valid intermediate results until an input change invalidates the relevant segment.',
        ],
        facts: [
          {
            status: 'inferred',
            title: 'What to observe in the UI',
            text: 'Watch which nodes are actually highlighted as executing after changes to the selected and unselected branches; the exact visualization depends on the frontend version.',
          },
        ],
      },
      {
        id: 'experiment-bypass',
        eyebrow: '06 · EXPERIMENT D',
        title: 'BYPASS is a separate control axis',
        paragraphs: [
          'Now deliberately put one source node or a test group into bypass and compare that behavior with simply selecting a different index.',
          'A selector answers which input to use. Bypass answers whether a particular node or group should perform its normal processing. These are different states.',
        ],
        codeExamples: [
          {
            title: 'Do not merge these concepts',
            label: 'CONTROL PLANE',
            code:
              'SELECTOR → WHICH ROUTE?\n' +
              'BYPASS   → SHOULD THIS NODE/GROUP PROCESS NORMALLY?\n' +
              'CACHE    → CAN A VALID RESULT BE REUSED?\n' +
              'OUTPUT   → WHAT DOES THE ENGINE ACTUALLY NEED?',
          },
        ],
      },
      {
        id: 'hansen-transfer',
        eyebrow: '07 · TRANSFER TO HANSEN',
        title: 'After the sandbox, open PEOPLE/PPL and ask the same four questions',
        table: {
          columns: ['Sandbox', 'Hansen PEOPLE/PPL'],
          rows: [
            ['index', 'master / linked selector value'],
            ['ROUTE A / B', 'FLUX person route / alternate route'],
            ['textIndexSwitch', '459 / 522 / 552 selector family'],
            ['showAnything output', 'return into downstream / final output'],
          ],
        },
        bullets: [
          'Which branch is CONNECTED?',
          'Which branch is SELECTED?',
          'Which branch is REQUIRED by the current output?',
          'What actually EXECUTED, and what may have come from cache?',
        ],
      },
      {
        id: 'pass',
        eyebrow: '08 · PASS CRITERIA',
        title: 'You pass the lab when you can explain these points without prompts',
        bullets: [
          'Why a connected branch may not contribute to the result.',
          'Why a selector is not the same as bypass.',
          'Why left/right screen position does not define execution order.',
          'Why changing an unselected branch does not necessarily affect the current output.',
          'Why a repeated Queue Prompt does not imply a full recomputation of the canvas.',
          'How to find the effective runtime route in a large production workflow.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Progression criterion',
            text: 'Once these six points are clear in the sandbox, move on to Modules & I/O Contracts and then read the Hansen workflow as an engineering graph.',
          },
        ],
      },
    ],
  },
];
