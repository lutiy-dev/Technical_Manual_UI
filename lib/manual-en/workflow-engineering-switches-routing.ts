import type { Chapter } from '../manual-types';

export const workflowEngineeringSwitchesRoutingChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-switches-routing',
    navTitle: 'Switches, Selectors & Bypass',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'Switches, Selectors & Bypass Routing — how the graph chooses a route',
    lede:
      'A large ComfyUI graph stops looking chaotic once you separate four mechanisms: a group defines a module, bypass includes or excludes it from execution, a selector chooses one route, and a shared control provides one authoritative value to several switches.',
    status: 'confirmed',
    statusNote:
      'The selector-tree logic is confirmed by the Hansen topology; Fast Groups Bypasser behavior is confirmed by rgthree-comfy source code, where modeOff=4 maps to Comfy bypass.',
    visual: 'selectors',
    category: 'workflow-engineering',
    stage: 'switches-routing',
    relatedNodes: [459, 522, 543, 552, 685, 715, 829],
    relatedChapters: [
      'workflow-engineering-base-config',
      'workflow-engineering-data-control-plane',
      'workflow-engineering-module-contracts',
      'selector-logic',
      'positioning',
    ],
    sections: [
      {
        id: 'four-mechanisms',
        eyebrow: '01 · FOUR MECHANISMS',
        title: 'Group, Bypass, Selector and Shared Control are different mechanisms',
        table: {
          columns: ['Mechanism', 'Primary question', 'What it changes'],
          rows: [
            ['GROUP', 'What module is this?', 'Organization and functional boundaries'],
            ['BYPASS', 'Should this module participate?', 'Execution state of nodes / group'],
            ['SELECTOR / SWITCH', 'Which input continues downstream?', 'Active data route'],
            ['SHARED CONTROL', 'Where does the value come from?', 'Authoritative INT / FLOAT / STRING for several consumers'],
          ],
        },
        paragraphs: [
          'A common mistake in large workflows is to treat every switch as a simple on/off control. In practice, some controls choose a branch, some change node mode, and others only forward a numeric value downstream.',
          'Identify the type of control first; only then interpret the specific 0/1/2 value.',
        ],
      },
      {
        id: 'mental-model',
        eyebrow: '02 · MENTAL MODEL',
        title: 'Four questions that quickly untangle routing',
        codeExamples: [
          {
            title: 'Routing checklist',
            label: 'READ IN THIS ORDER',
            code:
              '1. GROUP      → what module is this?\n' +
              '2. BYPASS     → is the module active at all?\n' +
              '3. SELECTOR   → which input is selected?\n' +
              '4. CONTROL    → where does the selector value come from?',
            note: 'Do not start with the number inside the switch. Start with the control source and the destination route.',
          },
        ],
      },
      {
        id: 'hansen-master-selector',
        eyebrow: '03 · HANSEN CASE',
        title: 'Node 543 is not “just another number” — it is the PEOPLE/PPL master selector',
        paragraphs: [
          'In the Hansen workflow, one linked INT control — node 543 — drives several selectors at once. Changing a single value therefore rebuilds multiple points of the PEOPLE/PPL route in sync.',
          'A stored widget value inside an individual switch is not authoritative when its Input socket is linked to node 543. The authoritative value is upstream in 543.',
        ],
        table: {
          columns: ['Consumer', 'What it selects', 'Why it matters'],
          rows: [
            ['459', 'Which PPL composite returns to the main pipeline', 'Defines the final people route before 573 → 67 → 57'],
            ['522', 'Which mask/image representation enters the alternative branch', 'Affects the inpaint / preview route'],
            ['552', 'Which people source is used downstream', 'Mode 1 selects FLUX person 829; the alternative mode uses the second source'],
            ['715', 'Return / downstream source', 'A nested selector that becomes relevant only when the downstream switch selects its branch'],
          ],
        },
      },
      {
        id: 'nested-switch',
        eyebrow: '04 · NESTED SWITCH',
        title: 'A selector can be connected without participating in the current route',
        paragraphs: [
          'Node 715 is connected in the graph topology, but in PEOPLE mode 1 the downstream selector 552 chooses its first input — FLUX person 829. The output of 715 therefore exists in topology but does not define the effective runtime route in this mode.',
          'In the alternative mode, downstream selectors move to their second inputs and 715 becomes part of the path that is actually used. This is exactly why topology and the effective runtime map must be read separately.',
        ],
        codeExamples: [
          {
            title: 'Mode 1 vs alternative route',
            label: 'NESTED ROUTING',
            code:
              'MODE 1\n543 = 1\n→ 552 selects image1 = 829 FLUX person\n→ 715 connected but not selected downstream\n\n' +
              'ALTERNATIVE MODE\n543 selects second inputs\n→ 715 output enters 552 image2\n→ alternative route becomes effective',
          },
        ],
      },
      {
        id: 'bypass-vs-selector',
        eyebrow: '05 · BYPASS ≠ SELECT',
        title: 'Bypass answers “should it execute?”; a selector answers “what should continue?”',
        paragraphs: [
          'A selector works at the data-routing level: it chooses one of the available inputs. Bypass works at the execution-state level of a node or group. Both can exist at the same time and solve different problems.',
          'In the official rgthree Fast Groups Bypasser code, the disabled state is mapped to mode 4, explicitly identified as Comfy bypass. The node also exposes Bypass all, Enable all and Toggle all actions.',
        ],
        table: {
          columns: ['Situation', 'Use'],
          rows: [
            ['Temporarily exclude a heavy module from a run', 'BYPASS / group bypass'],
            ['Choose an SDXL source or a FLUX source', 'SELECTOR / SWITCH'],
            ['Use one value to reconfigure several switches', 'SHARED CONTROL'],
            ['Visually organize related nodes', 'GROUP'],
          ],
        },
      },
      {
        id: 'fast-groups-bypasser',
        eyebrow: '06 · RGTHREE',
        title: 'Fast Groups Bypasser — a control panel for group execution state',
        paragraphs: [
          'Fast Groups Bypasser finds groups in the workflow and creates control toggles for them. This is a useful control-plane layer: instead of manually visiting dozens of nodes, you can enable or bypass entire functional blocks.',
          'This is especially useful in a training graph. BASE CONFIG can expose only clear toggles such as INPUT, MASKS, PPL, SDXL, FLUX and UPSCALE while the internal nodes remain inside their respective groups.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'rgthree implementation',
            text: 'FastGroupsBypasser uses LiteGraph.ALWAYS for the enabled state and mode 4 for bypass; exposed actions include Bypass all, Enable all and Toggle all.',
          },
        ],
      },
      {
        id: 'debug-order',
        eyebrow: '07 · DEBUG ORDER',
        title: 'When a branch “does not work,” check routing before the model',
        bullets: [
          'Check whether the required group is in bypass.',
          'Find the selector immediately before the point where the expected result disappears.',
          'Trace the linked control upstream to its authoritative INT/FLOAT/STRING source.',
          'Label input1 / input2 with their real sources rather than abstract numbers.',
          'Check nested selectors: is the upstream switch even selected by the downstream node?',
          'Only after the route is confirmed should you diagnose sampler, model, prompt or mask.',
        ],
      },
      {
        id: 'common-mistakes',
        eyebrow: '08 · COMMON MISTAKES',
        title: 'Why switches can look chaotic',
        table: {
          columns: ['Reading mistake', 'Correct interpretation'],
          rows: [
            ['Looking only at the 1/2 number inside the switch', 'First identify what is physically connected to input1 / input2'],
            ['Trusting the visible widget value', 'A linked input can override the stored widget value'],
            ['Assuming a connected branch is active', 'Connected does not mean selected; determine the effective runtime route'],
            ['Confusing bypass with selector logic', 'Bypass changes execution state; a selector changes the data route'],
            ['Changing several switches manually', 'Look for a shared upstream control / single source of truth'],
          ],
        },
      },
      {
        id: 'practice-hansen',
        eyebrow: '09 · PRACTICE',
        title: 'Hansen practice: manually untangle the PEOPLE selector tree',
        bullets: [
          'Find node 543 and record its current effective value.',
          'Trace its four links to 459, 522, 552 and 715.',
          'For every selector, write down what is actually connected to the first and second inputs.',
          'Draw the MODE 1 route and the alternative route separately with arrows.',
          'Mark which branches are connected but not selected in each mode.',
          'Then change only the master value and inspect the previews without changing model, prompt or seed.',
        ],
        codeExamples: [
          {
            title: 'Exercise target',
            label: 'YOU SHOULD BE ABLE TO SAY',
            code:
              '543 is the authoritative PEOPLE mode control.\n' +
              'It drives 459 / 522 / 552 / 715.\n' +
              'A connected branch is not necessarily the active branch.\n' +
              'Bypass controls execution; selectors control routing.',
            note: 'If you can explain this without opening the model, the switches are no longer “magic.”',
          },
        ],
      },
    ],
  },
];
