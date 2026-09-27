import type { Chapter } from '../manual-types';

export const workflowEngineeringGroupsNamingChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-groups-naming',
    navTitle: 'Groups & Naming Standard',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'Graph Organization · Groups & Naming Standard — making a large workflow readable',
    lede:
      'A large production workflow should be readable at three scales: the full canvas, the functional module, and the individual node chain. Groups and a consistent naming standard turn visual layout into navigation, a control API, and documentation at the same time.',
    status: 'confirmed',
    statusNote:
      'This chapter defines the OVizLAB production standard. Fast Groups Bypasser behavior around group title/filter/sort is confirmed by rgthree source code; the naming scheme itself is our engineering standard layered on top of ComfyUI.',
    visual: 'graph-reading',
    category: 'workflow-engineering',
    stage: 'workflow-engineering-groups-naming',
    relatedChapters: [
      'workflow-engineering-graph-literacy',
      'workflow-engineering-base-config',
      'workflow-engineering-switches-routing',
      'workflow-engineering-module-contract-lab',
      'workflow-engineering-module-contracts',
    ],
    sections: [
      {
        id: 'why',
        eyebrow: '01 · WHY',
        title: 'A group is not a colored frame — it is part of workflow architecture',
        paragraphs: [
          'If a group is used only as visual decoration, it does not help anyone read or maintain the graph. In a production workflow, a group name should immediately answer two questions: what responsibility does this section own, and where does it sit in the overall route?',
          'Good group architecture reduces cognitive load. Instead of seeing hundreds of nodes first, the user sees 10–15 systems, then opens the relevant module, and only then reads the specific node chain.',
        ],
        codeExamples: [
          {
            title: 'Three levels of reading',
            label: 'GRAPH ORGANIZATION',
            code:
              'MASTER WORKFLOW\n' +
              '→ MODULE / GROUP\n' +
              '→ NODE CHAIN',
            note: 'Read a large graph top-down through its semantic hierarchy rather than trying to trace every link immediately.',
          },
        ],
      },
      {
        id: 'top-level-standard',
        eyebrow: '02 · TOP LEVEL',
        title: 'A consistent order for the main production groups',
        table: {
          columns: ['Prefix', 'Group', 'Responsibility'],
          rows: [
            ['00', 'BASE CONFIG', 'Global availability / bypass logic and run modes'],
            ['01', 'MODEL LOADERS', 'Models, CLIP, VAE, and heavy shared resources'],
            ['02', 'INPUTS', 'Base render, maps, references, logo, and external data'],
            ['03', 'CONTROL', 'Shared values, selectors, seed, size, and mode controls'],
            ['04', 'PREPROCESS', 'Depth, Canny, resize, and detection preparation'],
            ['05', 'BASE GENERATION', 'SDXL / FLUX base generation or img2img stage'],
            ['06', 'MASKS', 'Segmentation, protection masks, and local edit regions'],
            ['07', 'PEOPLE / PPL', 'Generation / replacement / compositing of people'],
            ['08', 'LOCAL REFINE', 'Detail transfer, inpaint, and local polish'],
            ['09', 'UPSCALE', 'High-resolution / final-polish path'],
            ['10', 'OUTPUT', 'Preview, save, and delivery outputs'],
          ],
        },
        facts: [
          {
            status: 'inferred',
            title: 'Why use numeric prefixes',
            text: 'The prefix establishes the intended reading order and makes group sorting predictable even on a large canvas.',
          },
        ],
      },
      {
        id: 'module-standard',
        eyebrow: '03 · MODULE LEVEL',
        title: 'Use the same principle inside a module: stage number + responsibility',
        codeExamples: [
          {
            title: 'PEOPLE / PPL example',
            label: 'NAMING PATTERN',
            code:
              'PPL · 01 GENERATE\n' +
              '→ PPL · 02 DETECT\n' +
              '→ PPL · 03 SEGMENT\n' +
              '→ PPL · 04 PREPARE\n' +
              '→ PPL · 05 COMPOSITE\n' +
              '→ PPL · RETURN',
          },
          {
            title: 'ControlNet example',
            label: 'NAMING PATTERN',
            code:
              'CNET · 01 SOURCE\n' +
              '→ CNET · 02 PREPROCESS\n' +
              '→ CNET · 03 APPLY\n' +
              '→ CNET · CHECKPOINT\n' +
              '→ CNET · RETURN',
          },
        ],
        paragraphs: [
          'A name should describe function, not editing history. FINAL2, TEST_NEW, COPY3, and similar labels are not architectural names; they quickly turn the canvas into an archive of accidental states.',
        ],
      },
      {
        id: 'control-api',
        eyebrow: '04 · GROUP NAME = CONTROL API',
        title: 'Group names participate in control through Fast Groups Bypasser',
        paragraphs: [
          'Fast Groups Bypasser automatically collects groups and builds toggle rows from their titles. Its properties can filter groups through matchTitle, restrict them by color, and sort them by position, alphanumeric order, or a custom alphabet.',
          'That makes the group title part of the control plane. Renaming a group can change how it is picked up by a BASE CONFIG filter, and unstable names make workflow control fragile.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'rgthree behavior',
            text: 'Fast Groups Bypasser uses the group title as the widget label and supports matchTitle, sort, and custom alphabet behavior.',
          },
          {
            status: 'inferred',
            title: 'Production rule',
            text: 'When BASE CONFIG relies on title matching, production group names are part of the interface and should only be changed deliberately.',
          },
        ],
      },
      {
        id: 'boundaries',
        eyebrow: '05 · BOUNDARIES',
        title: 'Group boundaries should match responsibility boundaries',
        bullets: [
          'Do not stretch one group across half the canvas simply for visual coverage.',
          'Do not place a shared loader inside a local module when several branches depend on it.',
          'Do not hide a return point inside a neighboring group.',
          'Do not overlap production groups without a clear reason: one node should not accidentally belong to several control regions.',
          'Place the checkpoint inside the module before RETURN, not far away in OUTPUT.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Overlap risk',
            text: 'rgthree explicitly warns that overlapping groups can create states that violate max-one / always-one constraints.',
          },
        ],
      },
      {
        id: 'colors',
        eyebrow: '06 · COLOR',
        title: 'Color helps navigation, but it does not replace naming',
        paragraphs: [
          'Color is useful as a secondary visual code: loaders, controls, masks, generation, and output can use distinct palette roles. But the meaning of a group should remain clear from its text title even when the color scheme is unknown.',
          'This matters when a workflow is handed to another person, when the UI theme changes, and when BASE CONFIG uses matchTitle.',
        ],
      },
      {
        id: 'anti-patterns',
        eyebrow: '07 · ANTI-PATTERNS',
        title: 'Names that are not allowed in a production master',
        table: {
          columns: ['Anti-pattern', 'Why it fails', 'Use instead'],
          rows: [
            ['final / final2 / final_final', 'Does not describe function and becomes outdated quickly', '09 · UPSCALE / 10 · OUTPUT'],
            ['test / new / copy', 'Does not say what is being tested', 'LAB · CANNY STRENGTH TEST'],
            ['group 17', 'No semantic responsibility', '06 · MASKS · FOLIAGE'],
            ['PPL stuff', 'Mixes several stages together', 'PPL · 02 DETECT / PPL · 03 SEGMENT'],
            ['one giant group', 'Hides module boundaries', 'Split by contracts and return points'],
          ],
        },
      },
      {
        id: 'labelling-rule',
        eyebrow: '08 · LABEL RULE',
        title: 'A naming formula that works for any future module',
        codeExamples: [
          {
            title: 'Canonical label',
            label: 'OVizLAB STANDARD',
            code:
              '[SYSTEM] · [STAGE NUMBER] [RESPONSIBILITY]\n' +
              'optional: · [MODE / VARIANT]\n\n' +
              'examples:\n' +
              'PPL · 03 SEGMENT\n' +
              'CNET · 02 PREPROCESS · DEPTH\n' +
              'FLUX · 04 LOCAL REFINE\n' +
              'OUTPUT · 01 LQ SAVE',
          },
        ],
      },
      {
        id: 'practice',
        eyebrow: '09 · PRACTICE',
        title: 'Practice: read the Hansen workflow using groups only',
        bullets: [
          'Work on a copy of the workflow; keep Hansen Original as an immutable reference.',
          'Hide detail first and list only the names of the major groups.',
          'Describe each group responsibility in one line.',
          'Mark the INPUT and RETURN of every module.',
          'Check which group titles are visible to BASE CONFIG / Fast Groups Bypasser.',
          'Only then inspect the internal nodes.',
        ],
      },
      {
        id: 'pass',
        eyebrow: '10 · PASS CRITERIA',
        title: 'This block is complete when the canvas reads like a system map',
        bullets: [
          'A group title alone makes its purpose clear.',
          'The order of major groups is readable without searching the canvas.',
          'Every local module has explicit INPUT / CHECKPOINT / RETURN points.',
          'BASE CONFIG can address the required groups through stable names.',
          'The production master contains no temporary final2 / test / copy labels.',
          'A new user can read modules first and nodes second.',
        ],
      },
    ],
  },
];
