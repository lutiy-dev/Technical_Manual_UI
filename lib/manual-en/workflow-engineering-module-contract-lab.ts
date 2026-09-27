import type { Chapter } from '../manual-types';

export const workflowEngineeringModuleContractLabChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-module-contract-lab',
    navTitle: 'LAB 03 · Module Contract',
    eyebrow: 'PRACTICE LAB · WORKFLOW ENGINEERING',
    title: 'Module Contract Lab: INPUT → PROCESS → CHECKPOINT → RETURN',
    lede:
      'The third lab turns a group from a visual frame into an engineering module. We will build a small branch using only core ComfyUI nodes and explicitly define its input contract, responsibility, checkpoint and return point.',
    status: 'confirmed',
    statusNote:
      'The lab uses the basic IMAGE type and core nodes LoadImage, ImageInvert and PreviewImage. No generative models are required, so attention stays on module boundaries and the data contract.',
    visual: 'graph-reading',
    category: 'workflow-engineering',
    stage: 'workflow-engineering-practice-lab-03',
    relatedChapters: [
      'workflow-engineering-module-contracts',
      'workflow-engineering-routing-lab',
      'workflow-engineering-base-config-lab',
      'workflow-engineering-coordinates-batch',
      'workflow-engineering-debugging',
    ],
    sections: [
      {
        id: 'goal',
        eyebrow: '01 · GOAL',
        title: 'Learn to see responsibility boundaries',
        paragraphs: [
          'One of the main sources of chaos in a large workflow is not knowing where one responsibility ends and the next begins. LAB 03 forces that boundary to become explicit on the canvas.',
          'After the exercise, you should be able to take any Hansen branch and state what it receives, what it does, where its result is verified, and what it officially returns to the Master Workflow.',
        ],
        codeExamples: [
          {
            title: 'Canonical module pattern',
            label: 'MODULE CONTRACT',
            code:
              'INPUT CONTRACT\n' +
              '→ PROCESS\n' +
              '→ LOCAL CHECKPOINT\n' +
              '→ RETURN CONTRACT\n' +
              '→ MASTER DOWNSTREAM',
          },
        ],
      },
      {
        id: 'build',
        eyebrow: '02 · BUILD',
        title: 'A minimal IMAGE module without models',
        codeExamples: [
          {
            title: 'LAB 03 topology',
            label: 'NODE FLOW',
            code:
              '[MASTER INPUT] LoadImage\n' +
              '        ↓ IMAGE\n' +
              '┌──────────────────────── MODULE_01_INVERT ────────────────────────┐\n' +
              '│ [ImageInvert] ─────┬────→ [PreviewImage · LOCAL CHECKPOINT]       │\n' +
              '│                    │                                             │\n' +
              '└────────────────────┼─────────────────────────────────────────────┘\n' +
              '                     ↓ IMAGE · RETURN\n' +
              '            [PreviewImage · MASTER OUTPUT]',
            note: 'LOCAL CHECKPOINT and MASTER OUTPUT receive the same result but serve different architectural roles.',
          },
        ],
        bullets: [
          'Keep LoadImage outside MODULE_01_INVERT: it is the upstream / Master Input.',
          'Place ImageInvert inside the MODULE_01_INVERT group.',
          'Place the first PreviewImage inside the group and label it CHECKPOINT · MODULE RESULT.',
          'Keep the second PreviewImage outside and label it MASTER DOWNSTREAM / OUTPUT.',
          'Connect the single IMAGE output of ImageInvert to both the local checkpoint and downstream output.',
        ],
      },
      {
        id: 'input-contract',
        eyebrow: '03 · INPUT CONTRACT',
        title: 'Write the contract before you run the graph',
        table: {
          columns: ['Field', 'LAB 03'],
          rows: [
            ['Required input', 'IMAGE'],
            ['Source', 'MASTER INPUT · LoadImage'],
            ['Dimensions', 'Inherited from the source image'],
            ['Batch', 'Passed with the IMAGE tensor'],
            ['Coordinate space', 'Same canvas as the input IMAGE'],
            ['Optional inputs', 'None'],
          ],
        },
        facts: [
          {
            status: 'confirmed',
            title: 'Why this is a contract',
            text: 'The module must not hide dependencies on prompt, model, seed or mask. Its only external dependency in this lab is IMAGE.',
          },
        ],
      },
      {
        id: 'responsibility',
        eyebrow: '04 · ONE RESPONSIBILITY',
        title: 'State the task in one line',
        paragraphs: [
          'MODULE_01_INVERT has one responsibility: receive IMAGE and return an inverted IMAGE. Nothing more. It does not load the file, save the delivery result, choose a route or control other groups.',
          'If a module description requires a long sentence containing several independent tasks, the boundary is probably poorly drawn.',
        ],
        codeExamples: [
          {
            title: 'Responsibility test',
            label: 'RULE',
            code:
              'GOOD:  "Invert input IMAGE and return IMAGE."\n' +
              'BAD:   "Load image, resize it, invert it, choose mode, upscale, save and compare."',
          },
        ],
      },
      {
        id: 'checkpoint',
        eyebrow: '05 · CHECKPOINT',
        title: 'A checkpoint proves the module before downstream',
        paragraphs: [
          'Run the workflow and inspect only the LOCAL CHECKPOINT first. Do not judge MASTER OUTPUT until the local result is proven.',
          'This simple rule saves hours later in PPL, masks and main FLUX: a local branch should be able to prove its own result independently of whatever happens after return.',
        ],
        codeExamples: [
          {
            title: 'Debug direction',
            label: 'OBSERVABILITY',
            code:
              'INPUT OK?\n' +
              '  ↓\n' +
              'MODULE CHECKPOINT OK?\n' +
              '  ↓\n' +
              'RETURN OK?\n' +
              '  ↓\n' +
              'DOWNSTREAM OK?',
          },
        ],
      },
      {
        id: 'return-contract',
        eyebrow: '06 · RETURN CONTRACT',
        title: 'Return is a boundary, not necessarily a dedicated node',
        paragraphs: [
          'In LAB 03, the return point is the IMAGE link that crosses the right boundary of MODULE_01_INVERT and continues to MASTER OUTPUT. A separate Return node is not required; what matters is an unambiguous interface.',
          'In a large production graph, return points are worth marking with a reroute/label/note, especially if the module may later be extracted as a standalone JSON.',
        ],
        table: {
          columns: ['Return field', 'LAB 03'],
          rows: [
            ['Type', 'IMAGE'],
            ['Meaning', 'Processed module result'],
            ['Canvas', 'Same logical image canvas as input'],
            ['Downstream assumption', 'The consumer should not need to know the module’s internal implementation'],
          ],
        },
      },
      {
        id: 'replacement-test',
        eyebrow: '07 · EXPERIMENT A',
        title: 'Replacement test: the module should be replaceable',
        paragraphs: [
          'Create a second group, MODULE_02_PASS_THROUGH. Its job is to return the original IMAGE unchanged. Then place a selector after the two module outputs and switch between MODULE_01_INVERT and MODULE_02_PASS_THROUGH.',
          'If downstream continues to receive the same IMAGE contract, the modules are interface-compatible even though their internal behavior is completely different.',
        ],
        codeExamples: [
          {
            title: 'Interchangeable modules',
            label: 'SYSTEM DESIGN',
            code:
              'MASTER IMAGE → MODULE A ──┐\n' +
              '                          ├→ SELECTOR → MASTER DOWNSTREAM\n' +
              'MASTER IMAGE → MODULE B ──┘\n' +
              '\n' +
              'A OUTPUT CONTRACT = IMAGE\n' +
              'B OUTPUT CONTRACT = IMAGE',
          },
        ],
      },
      {
        id: 'hidden-dependency-test',
        eyebrow: '08 · EXPERIMENT B',
        title: 'Deliberately create a hidden dependency and catch it',
        paragraphs: [
          'Add another external control or source inside MODULE_01, but do not include it in the contract. Now imagine extracting the group into a standalone workflow. The problem becomes obvious: the branch is no longer autonomous.',
          'Then fix the contract: either add the dependency as an explicit module input or move the required control inside the module. This is exactly the audit needed when extracting Hansen branches.',
        ],
      },
      {
        id: 'hansen-transfer',
        eyebrow: '09 · TRANSFER TO HANSEN',
        title: 'Use the same questions on any Hansen branch',
        table: {
          columns: ['LAB 03 question', 'Production branch example'],
          rows: [
            ['INPUT CONTRACT?', 'BASE IMAGE / MASK / MODEL / prompt / controls'],
            ['ONE RESPONSIBILITY?', 'For example Generate Person or Segment Person'],
            ['LOCAL CHECKPOINT?', 'raw generation / bbox / mask / clean cutout / composite'],
            ['RETURN CONTRACT?', 'IMAGE / MASK / LATENT returned downstream'],
            ['HIDDEN DEPENDENCIES?', 'shared seed, size, selector, loader, prompt fragment'],
          ],
        },
      },
      {
        id: 'pass',
        eyebrow: '10 · PASS CRITERIA',
        title: 'LAB 03 is complete when you can design a module before choosing nodes',
        bullets: [
          'You write the responsibility and contracts before selecting nodes.',
          'You distinguish a local checkpoint from the final Master output.',
          'You can point to the exact return point on the canvas.',
          'You can identify incoming links that cross the module boundary.',
          'You understand why two very different modules can be interchangeable when they share the same contract.',
          'You can explain why a hidden dependency breaks standalone extraction.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'After the first three labs',
            text: 'LAB 01 teaches route selection; LAB 02 teaches centralized group control; LAB 03 teaches module boundaries. Together they provide the minimum practical foundation for reading the Hansen production graph.',
          },
        ],
      },
    ],
  },
];
