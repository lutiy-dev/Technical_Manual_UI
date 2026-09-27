import type { Chapter } from '../manual-types';

export const workflowEngineeringBaseConfigLabChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-base-config-lab',
    navTitle: 'LAB 02 · BASE CONFIG',
    eyebrow: 'PRACTICE LAB · WORKFLOW ENGINEERING',
    title: 'BASE CONFIG Lab: Fast Groups Bypasser as the graph control plane',
    lede:
      'The second lab moves routing logic up to the level of whole groups. The goal is to experience the difference between topology, the selected route and centralized enable/bypass control before adding SDXL, FLUX or any other heavy model.',
    status: 'confirmed',
    statusNote:
      'Fast Groups Bypasser behavior was checked against rgthree-comfy: the node discovers workflow groups automatically, creates Enable toggles, and places disabled groups into Comfy bypass mode 4. Title/color filtering and toggleRestriction are standard rgthree properties.',
    visual: 'controls',
    category: 'workflow-engineering',
    stage: 'workflow-engineering-practice-lab-02',
    relatedChapters: [
      'workflow-engineering-base-config',
      'workflow-engineering-data-control-plane',
      'workflow-engineering-switches-routing',
      'workflow-engineering-execution-cache',
      'workflow-engineering-routing-lab',
      'workflow-engineering-module-contracts',
    ],
    sections: [
      {
        id: 'goal',
        eyebrow: '01 · GOAL',
        title: 'What changes after LAB 01',
        paragraphs: [
          'LAB 01 taught route selection inside the data flow. LAB 02 moves one level higher: now we control the state of complete functional groups rather than an individual selector.',
          'This is the first real control plane. BASE CONFIG does not carry IMAGE or MASK data; it changes the state of the modules through which that data may flow.',
        ],
        codeExamples: [
          {
            title: 'Two levels of control',
            label: 'MENTAL MODEL',
            code:
              'BASE CONFIG / GROUP BYPASS  → WHICH MODULES ARE AVAILABLE?\n' +
              'SELECTOR / SWITCH            → WHICH AVAILABLE ROUTE IS SELECTED?\n' +
              'DATA PLANE                   → WHAT DATA ACTUALLY FLOWS?',
          },
        ],
      },
      {
        id: 'verified-mechanics',
        eyebrow: '02 · RGTHREE MECHANICS',
        title: 'What Fast Groups Bypasser actually does',
        paragraphs: [
          'Fast Groups Bypasser is a frontend/control node with no ordinary data input. It scans workflow groups and creates an Enable <group title> row for every matching group.',
          'When ON, nodes in the group return to normal execution mode. When OFF, Bypasser uses mode 4 — Comfy bypass. This differs from Fast Groups Muter, where OFF maps to NEVER/MUTE.',
        ],
        table: {
          columns: ['Property / Action', 'Purpose'],
          rows: [
            ['matchTitle', 'Filter groups by title; supports string/regex matching'],
            ['matchColors', 'Filter by group color'],
            ['sort', 'position / alphanumeric / custom alphabet'],
            ['showNav', 'Show a quick-navigation arrow to the group'],
            ['toggleRestriction', 'default / max one / always one'],
            ['Bypass all', 'Put managed groups into bypass subject to the restriction'],
            ['Enable all', 'Enable managed groups subject to the restriction'],
            ['Toggle all', 'Invert managed toggles subject to the restriction'],
          ],
        },
        facts: [
          {
            status: 'confirmed',
            title: 'Important restriction limitation',
            text: 'max one / always one is enforced when toggling through Fast Groups itself. Manually changing node modes inside a group can diverge from that policy.',
          },
        ],
      },
      {
        id: 'build',
        eyebrow: '03 · BUILD',
        title: 'Build a control plane on top of the Routing Sandbox',
        paragraphs: [
          'Use LAB 01 as the starting point. Keep the nodes simple: two text branches → selector → output. Now add groups and a centralized control panel.',
        ],
        codeExamples: [
          {
            title: 'LAB 02 topology',
            label: 'NODE FLOW',
            code:
              '[GROUP ROUTE_A]\n' +
              '  easy promptLine: ROUTE A\n' +
              '            \\n' +
              '             → [GROUP SELECTOR] easy textIndexSwitch → [GROUP OUTPUT] showAnything\n' +
              '            /\n' +
              '[GROUP ROUTE_B]\n' +
              '  easy promptLine: ROUTE B\n' +
              '\n' +
              '[BASE CONFIG · Fast Groups Bypasser]   ← no data cable required',
          },
        ],
        bullets: [
          'Create groups ROUTE_A, ROUTE_B, SELECTOR and OUTPUT.',
          'Place Fast Groups Bypasser separately, outside the groups it manages.',
          'In Fast Groups Bypasser Properties set matchTitle = ^ROUTE_.',
          'The panel should show only Enable ROUTE_A and Enable ROUTE_B.',
          'Keep toggleRestriction = default for the first experiment.',
          'Initial selector value: index = 0.',
        ],
      },
      {
        id: 'experiment-a',
        eyebrow: '04 · EXPERIMENT A',
        title: 'Bypass the unselected branch',
        table: {
          columns: ['State', 'Action', 'Expected meaning'],
          rows: [
            ['index = 0; A ON; B ON', 'Queue Prompt', 'Output depends on ROUTE_A'],
            ['index = 0; A ON; B OFF', 'Queue Prompt', 'ROUTE_B is bypassed, but the current selected route remains A'],
            ['index = 0; A ON; B ON', 'Enable ROUTE_B', 'Topology is unchanged; only group availability changes'],
          ],
        },
        facts: [
          {
            status: 'confirmed',
            title: 'What this proves',
            text: 'Group enabled state and selector state are independent. You can change the availability of an unselected branch without changing the selected route.',
          },
        ],
      },
      {
        id: 'experiment-b',
        eyebrow: '05 · EXPERIMENT B',
        title: 'Availability first, selection second',
        paragraphs: [
          'Return both groups to ON. Switch the selector to index = 1 and verify ROUTE_B, then return to index = 0. Train yourself to read the system with two consecutive questions: first “which modules are available?”, then “which available route is selected?”',
        ],
        codeExamples: [
          {
            title: 'Runtime reading order',
            label: 'CONTROL PLANE',
            code:
              '1. BASE CONFIG → ROUTE_A enabled? ROUTE_B enabled?\n' +
              '2. SELECTOR    → index 0 or 1?\n' +
              '3. OUTPUT      → which upstream is required?\n' +
              '4. CACHE       → what actually needs recomputation?',
          },
        ],
      },
      {
        id: 'experiment-c',
        eyebrow: '06 · EXPERIMENT C',
        title: 'max one and always one are policies, not data routing',
        paragraphs: [
          'Set toggleRestriction = max one. Toggle ROUTE_A and ROUTE_B through Fast Groups Bypasser itself and observe how the panel keeps at most one group enabled. Then try always one: the panel should attempt to keep at least one group active.',
          'Do not confuse this with the selector. The restriction defines valid control-plane states; it does not by itself decide which input a downstream selector chooses.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Not an absolute lock',
            text: 'rgthree explicitly notes that restrictions apply to actions performed through Fast Groups. Manually changing modes inside groups can violate the expected max-one/always-one state.',
          },
        ],
      },
      {
        id: 'experiment-d',
        eyebrow: '07 · EXPERIMENT D',
        title: 'Group filters are the foundation of a professional BASE CONFIG',
        paragraphs: [
          'Create a second Fast Groups Bypasser. Keep matchTitle = ^ROUTE_ on the first. On the second, use matchTitle = ^PROCESS_ after creating two empty training PROCESS groups.',
          'This demonstrates that one large workflow can expose several control panels — for example PPL CONFIG, PROCESS CONFIG and OUTPUT CONFIG. This is an architectural technique, not a model-specific trick.',
        ],
        codeExamples: [
          {
            title: 'Control-plane partitioning',
            label: 'ARCHITECTURE',
            code:
              'BASE CONFIG · ROUTES   → matchTitle ^ROUTE_\n' +
              'BASE CONFIG · PROCESS  → matchTitle ^PROCESS_\n' +
              'BASE CONFIG · OUTPUT   → matchTitle ^OUTPUT_',
            note: 'This is our production convention. rgthree provides the filtering mechanism; we define the naming architecture.',
          },
        ],
      },
      {
        id: 'hansen-transfer',
        eyebrow: '08 · TRANSFER TO HANSEN',
        title: 'Now read Hansen BASE CONFIG as a map of systems',
        paragraphs: [
          'After this lab, the large yellow Hansen panel should no longer look like a list of mysterious yes/no switches. It is a catalog of functional subsystems in a production workflow.',
        ],
        bullets: [
          'MODEL LOADERS — availability of resource-heavy loaders.',
          'INPUTS — input layer.',
          'CONTROL / SAMPLER CONFIGURATION — shared control layer.',
          'ControlNet PREPROCESSORS + EXTRAS — preprocessing subsystem.',
          'MASKS — mask subsystem.',
          'PPL FLUX Generate / SEGMENTATION / Composite / 3D Inpaint — independent PEOPLE stages.',
          'Process SEGMENTATION / SDXL / FLUX / UPSCALE / ADD LOGO — processing stages.',
          'OUTPUT — terminal stage.',
        ],
      },
      {
        id: 'profiles',
        eyebrow: '09 · PRODUCTION THINKING',
        title: 'The next level is runtime profiles',
        paragraphs: [
          'Named profiles such as MASK DEBUG, PEOPLE ONLY or FINAL FULL RUN are our architectural layer, not a built-in Fast Groups Bypasser feature. Their purpose is to predefine the minimum set of enabled modules for a specific task.',
        ],
        table: {
          columns: ['Profile', 'Idea'],
          rows: [
            ['INPUT CHECK', 'INPUTS + OUTPUT/preview; heavy process branches disabled'],
            ['MASK DEBUG', 'INPUTS + preprocessors + masks + diagnostic output'],
            ['PEOPLE LAB', 'Only the required PPL stages and return checkpoint'],
            ['BASE GENERATION', 'Main SDXL/ControlNet route without optional upscale/logo'],
            ['FINAL FULL RUN', 'Production route with final optional stages as required'],
          ],
        },
      },
      {
        id: 'pass',
        eyebrow: '10 · PASS CRITERIA',
        title: 'LAB 02 is complete when BASE CONFIG stops feeling like magic',
        bullets: [
          'You can explain why Fast Groups Bypasser does not need an ordinary data cable.',
          'You distinguish group ENABLE/BYPASS state from SELECTing a route.',
          'You understand matchTitle and can restrict the panel to a target family of groups.',
          'You know the difference between default, max one and always one.',
          'You can look at Hansen BASE CONFIG and name the subsystems rather than merely list switches.',
          'You can propose a minimal runtime profile for a specific test.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Next step',
            text: 'After LAB 02, move to LAB 03: Module Contract — INPUT → PROCESS → CHECKPOINT → RETURN. This is where we first build a small production-style module with a clear responsibility boundary.',
          },
        ],
      },
    ],
  },
];
