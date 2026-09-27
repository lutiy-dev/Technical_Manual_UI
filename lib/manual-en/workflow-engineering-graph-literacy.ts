import type { Chapter } from '../manual-types';

export const workflowEngineeringGraphLiteracyChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-graph-literacy',
    navTitle: 'Graph Literacy',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'Graph Literacy — learn to read patterns, not isolated nodes',
    lede:
      'After Node Literacy, the next step is to stop seeing a workflow as a collection of individual blocks. Graph Literacy teaches you to recognize recurring patterns, branches, merge points, selectors and data routes as sentences in the language of the graph.',
    status: 'confirmed',
    statusNote:
      'This chapter describes general graph patterns and uses the same route types that appear in the current Hansen workflow.',
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
          'In a large workflow, you rarely need to memorize every node individually. What matters is recognizing standard routes: model loading, prompt encoding, sampling, decode, preprocessing, segmentation, compositing and output.',
          'Once these constructions become familiar, a graph with hundreds of nodes visually compresses into a handful of understandable systems.',
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
          'The data plane is the route followed by the large objects: IMAGE, LATENT, MASK, CONDITIONING and MODEL. When reading an unfamiliar graph, start with the primary IMAGE/LATENT route from input to output and inspect the smaller controls later.',
          'This quickly reveals where generation happens, where local processing happens, and where the graph is only controlling parameters.',
        ],
        codeExamples: [
          {
            title: 'First pass through an unfamiliar graph',
            label: 'READING STRATEGY',
            code:
              'INPUT\n' +
              '→ MAIN PROCESS\n' +
              '→ LOCAL BRANCHES\n' +
              '→ MERGE / SELECT\n' +
              '→ FINAL PROCESS\n' +
              '→ OUTPUT',
          },
        ],
      },
      {
        id: 'branching',
        eyebrow: '03 · BRANCH / MERGE',
        title: 'Fan-out and fan-in reveal the architecture of the task',
        paragraphs: [
          'Fan-out occurs when one source is reused by several branches: for example, a base image may feed Depth, Canny, segmentation and preview at the same time. Fan-in occurs when several results converge again in a composite, selector or conditioning stack.',
          'These are important architectural points: fan-out reveals source reuse, while fan-in shows where independent decisions become a single result.',
        ],
        table: {
          columns: ['Pattern', 'What it looks like', 'What it means'],
          rows: [
            ['Fan-out', '1 output → several inputs', 'One source feeds several branches'],
            ['Fan-in', 'Several outputs → one operation', 'Results / controls are merged'],
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
          'Routing nodes can look secondary, but they often define the actual runtime path. A selector may have several prepared inputs while forwarding only one of them downstream.',
          'A connection in the topology therefore does not prove that a branch contributes to the current result. Keep three states separate: connected, selected and executed.',
        ],
        table: {
          columns: ['State', 'Meaning'],
          rows: [
            ['CONNECTED', 'The branch is physically connected to the graph'],
            ['SELECTED', 'The selector is currently choosing this input'],
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
          'Visually, one link can look much like another, but STRING, INT or FLOAT values can control the route just as strongly as IMAGE. After the first pass through the data plane, make a second pass through the control links.',
          'Pay particular attention to linked values. A connected INT/FLOAT input can override the value shown in the downstream node widget.',
        ],
      },
      {
        id: 'module-boundaries',
        eyebrow: '06 · MODULE BOUNDARIES',
        title: 'A module boundary is defined by the meaning of its input and output',
        paragraphs: [
          'A module does not have to be an official ComfyUI subgraph node. In engineering terms, a module is a complete branch with one responsibility and a clear contract.',
          'A well-designed module can be mentally cut out of the Master Workflow, fed with test inputs, and validated independently through its output.',
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
          'Start from the final preview/save/output of the branch you are investigating.',
          'Move upstream through IMAGE/LATENT links until you reach a source you understand.',
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
            text: 'If you can explain the architecture of a graph in 5–10 routes without listing hundreds of nodes, you are ready to move on to BASE CONFIG and the control plane.',
          },
        ],
      },
    ],
  },
];
