import type { Chapter } from '../manual-types';

export const workflowEngineeringRoutingLabChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-routing-lab',
    navTitle: 'LAB 01 · Routing Sandbox',
    eyebrow: 'PRACTICE LAB · WORKFLOW ENGINEERING',
    title: 'Routing Sandbox: selector, bypass, lazy execution, and cache without generative models',
    lede:
      'The first lab deliberately removes SDXL, FLUX, VAE, and model loading from view. What remains is pure graph logic: two data sources, a selector, one output, Queue Prompt, bypass, and observation of which branch the engine actually requires.',
    status: 'confirmed',
    statusNote:
      'The lab is built around ComfyUI-Easy-Use already installed in ARCHVIZ_LAB: textIndexSwitch uses lazy inputs, making it suitable for demonstrating selected routes and dependency-driven execution.',
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
          'The goal is not to memorize another set of node names. The goal is to experience the difference between CONNECTED, SELECTED, REQUIRED, and EXECUTED.',
          'After this lab, the large Hansen graph should read less like a web and more like a set of branches from which a selector chooses the current runtime route.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Primary question',
            text: 'Not “where does the wire go?” but “which upstream is actually required by the selected output right now?”',
          },
          {
            status: 'confirmed',
            title: 'Why no models',
            text: 'VRAM, samplers, and prompt quality should not distract from routing logic.',
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
            note: 'textIndexSwitch uses lazy inputs: the selector requests only the selected textN.',
          },
        ],
        bullets: [
          'Create two easy promptLine nodes and label their groups ROUTE A and ROUTE B.',
          'Enter ROUTE A · ORIGINAL in A and ROUTE B · ORIGINAL in B.',
          'Create easy textIndexSwitch and connect A → text0, B → text1.',
          'Connect its text output to easy showAnything. This is the only output in the lab.',
          'Initial selector value: index = 0.',
        ],
      },
      {
        id: 'experiment-selector',
        eyebrow: '03 · EXPERIMENT A',
        title: 'CONNECTED ≠ SELECTED',
        table: {
          columns: ['Action', 'Expected output', 'What it proves'],
          rows: [
            ['index = 0 → Queue Prompt', 'ROUTE A · ORIGINAL', 'A is selected; B is physically connected but not selected'],
            ['index = 1 → Queue Prompt', 'ROUTE B · ORIGINAL', 'The selector changes the effective route without rewiring the graph'],
            ['return index = 0', 'ROUTE A · ORIGINAL', 'Topology did not change; only the control value changed'],
          ],
        },
        facts: [
          {
            status: 'confirmed',
            title: 'textIndexSwitch mechanics',
            text: 'The index selects one textN input; lazy status requests only that corresponding input.',
          },
        ],
      },
      {
        id: 'experiment-dependency',
        eyebrow: '04 · EXPERIMENT B',
        title: 'CONNECTED ≠ REQUIRED',
        paragraphs: [
          'Leave index = 0. Change only ROUTE B to ROUTE B · CHANGED and press Queue Prompt.',
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
        title: 'REQUIRED ≠ necessarily recalculated from scratch',
        paragraphs: [
          'Without changing index or ROUTE A, press Queue Prompt again. Then change ROUTE A to ROUTE A · CHANGED and run once more.',
          'The purpose is to separate the requirement graph from execution/cache behavior. The same required route may reuse valid results until an input change invalidates the relevant portion.',
        ],
        facts: [
          {
            status: 'inferred',
            title: 'What to observe in the UI',
            text: 'Watch which nodes are actually highlighted as executing after changes to selected and unselected branches; the exact visualization depends on the frontend version.',
          },
        ],
      },
      {
        id: 'experiment-bypass',
        eyebrow: '06 · EXPERIMENT D',
        title: 'BYPASS is a separate control axis',
        paragraphs: [
          'Now deliberately place one source node or test group into bypass and compare that behavior with simply selecting a different index.',
          'Selector answers which input to use. Bypass answers whether a node or group should process normally. These are different states.',
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
          'What was actually EXECUTED, and what may have come from cache?',
        ],
      },
      {
        id: 'pass',
        eyebrow: '08 · PASS CRITERIA',
        title: 'The lab is complete when you can explain these points without prompts',
        bullets: [
          'Why a connected branch may not contribute to the result.',
          'Why selector is not the same as bypass.',
          'Why a node’s left/right screen position does not define execution order.',
          'Why changing an unselected branch does not necessarily affect the current output.',
          'Why another Queue Prompt does not imply full recalculation of the canvas.',
          'How to identify the effective runtime route in a large production workflow.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Readiness criterion',
            text: 'If these six points are clear in the sandbox, you are ready for Modules & I/O Contracts and can then read Hansen as an engineering graph.',
          },
        ],
      },
    ],
  },
];
