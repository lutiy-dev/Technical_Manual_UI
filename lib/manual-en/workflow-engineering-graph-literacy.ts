import type { Chapter } from '../manual-types';

export const workflowEngineeringGraphLiteracyChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-graph-literacy',
    navTitle: 'Graph Literacy',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'Graph Literacy — learn to read patterns, not individual nodes',
    lede:
      'After Node Literacy, the next step is to stop seeing a workflow as a collection of isolated blocks. Graph Literacy teaches you to recognize recurring patterns, branches, merge points, selectors, and data routes as sentences in the language of the graph.',
    status: 'confirmed',
    statusNote:
      'This chapter describes general graph patterns and uses the same route types found in the current Hansen workflow.',
    visual: 'graph-reading',
    category: 'workflow-engineering',
    stage: 'graph-literacy',
    relatedChapters: [
      'workflow-engineering-node-literacy',
      'workflow-engineering-overview',
      'graph-reading',
      'control-panel',
      'workflow-engineering-base-config',
    ],
    sections: [
      {
        id: 'from-nodes-to-patterns',
        eyebrow: '01 · PATTERNS',
        title: 'A node is a letter; a chain of nodes is a construction',
        paragraphs: [
          'In a large workflow, you almost never need to memorize every node individually. You need to recognize standard routes: model loading, prompt encoding, sampling, decoding, preprocessing, segmentation, compositing, and output.',
          'Once these constructions become familiar, a graph with hundreds of nodes visually collapses into a handful of understandable systems.',
        ],
        codeExamples: [
          {
            title: 'Common graph patterns',
            label: 'GRAPH GRAMMAR',
            code:
              'Loader → Encoder → Sampler → Decode\n' +
              'Image → Preprocessor → ControlNet → Conditioning\n' +
              'Image → Detection → Segmentation → Mask\n' +
              'Image + Mask + Overlay → Composite\n' +
              'Result → Selector → Return / Output',
          },
        ],
      },
      {
        id: 'data-plane',
        eyebrow: '02 · DATA PLANE',
        title: 'Find the main data path first',
        paragraphs: [
          'The data plane is the route taken by the major objects: IMAGE, LATENT, MASK, CONDITIONING, and MODEL. When reading an unfamiliar graph, begin with the primary IMAGE/LATENT path from input to output and inspect the smaller controls later.',
          'This quickly reveals where generation happens, where local processing occurs, and where the graph is only controlling parameters.',
        ],
      },
      {
        id: 'branching',
        eyebrow: '03 · BRANCH / MERGE',
        title: 'Fan-out and fan-in reveal the architecture of the task',
        paragraphs: [
          'Fan-out occurs when one source is reused by several branches, while fan-in occurs when several results are brought back together in a composite, selector, or conditioning stack.',
          'Fan-out shows source reuse; fan-in marks the point where independent decisions become one result.',
        ],
        table: {
          columns: ['Pattern', 'Shape', 'Meaning'],
          rows: [
            ['Fan-out', '1 output → multiple inputs', 'One source serves several branches'],
            ['Fan-in', 'Multiple outputs → one operation', 'Results / controls are merged'],
            ['Serial chain', 'A → B → C → D', 'Sequential transformation'],
            ['Parallel branches', 'A → B1 and A → B2', 'Independent alternative or supporting processes'],
          ],
        },
      },
      {
        id: 'selectors-routing',
        eyebrow: '04 · ROUTING',
        title: 'A selector changes the route, not necessarily the data',
        paragraphs: [
          'Routing nodes can look secondary, yet they often determine the actual runtime path. A selector may have several valid inputs and pass only one of them downstream.',
          'A connection existing in the topology therefore does not mean that the corresponding branch contributes to the current result. Connected, selected, and executed are separate states.',
        ],
        table: {
          columns: ['State', 'Meaning'],
          rows: [
            ['CONNECTED', 'The branch is physically connected to the graph'],
            ['SELECTED', 'The selector is actually choosing this input'],
            ['EXECUTED', 'The branch is not bypassed and is required by the current output'],
            ['DIAGNOSTIC', 'The result is used only by a preview / comparer'],
          ],
        },
      },
      {
        id: 'control-vs-data-links',
        eyebrow: '05 · LINK ROLE',
        title: 'Not every wire carries an image',
        paragraphs: [
          'A STRING, INT, or FLOAT can influence routing just as strongly as an IMAGE. After the first pass through the data plane, make a second pass through the control links.',
          'Pay special attention to linked values: a connected INT/FLOAT input can override the value displayed in a downstream widget.',
        ],
      },
      {
        id: 'module-boundaries',
        eyebrow: '06 · MODULE BOUNDARIES',
        title: 'A module boundary is defined by the meaning of its input and output',
        paragraphs: [
          'A module does not have to be an official ComfyUI subgraph node. In engineering terms, a module is a complete branch with one responsibility and a clear contract.',
          'A well-designed module can be isolated from the Master Workflow, supplied with test inputs, and have its output verified independently.',
        ],
        codeExamples: [
          {
            title: 'Example module boundary',
            label: 'PPL EXAMPLE',
            code:
              'BASE IMAGE + PPL CONTROLS\n' +
              '→ PEOPLE MODULE\n' +
              '→ COMPOSITED IMAGE\n' +
              '→ RETURN TO MAIN PIPELINE',
          },
        ],
      },
      {
        id: 'trace-method',
        eyebrow: '07 · TRACE METHOD',
        title: 'How to trace a branch through a large graph',
        bullets: [
          'Start from the final preview/save/output of the branch you want to inspect.',
          'Move upstream through IMAGE/LATENT links until you reach the first clear source.',
          'List MASK / CONDITIONING / MODEL inputs separately.',
          'Find selectors and verify which input is actually selected.',
          'Find linked INT/FLOAT/STRING controls that change branch behavior.',
          'Mark the final checkpoint before the branch merges with other systems.',
        ],
      },
      {
        id: 'practice',
        eyebrow: '08 · PRACTICE',
        title: 'Practice: compress a large graph into five sentences',
        paragraphs: [
          'Open a large workflow and resist the urge to understand every node immediately. Identify five major constructions and write them as short routes. For example: Input → ControlNet → SDXL; SDXL → Detail; PPL Generate → Segment → Composite; Result → FLUX; FLUX → Output.',
        ],
        facts: [
          {
            status: 'inferred',
            title: 'Readiness criterion',
            text: 'If someone can describe the graph architecture in 5–10 routes without listing hundreds of nodes, they are ready to move on to BASE CONFIG and the control plane.',
          },
        ],
      },
    ],
  },
];
