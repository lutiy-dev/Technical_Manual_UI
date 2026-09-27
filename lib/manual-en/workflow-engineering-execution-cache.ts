import type { Chapter } from '../manual-types';

export const workflowEngineeringExecutionCacheChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-execution-cache',
    navTitle: 'Execution Model, Queue & Cache',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'Execution Model, Queue & Cache — why the graph does not run left to right',
    lede:
      'ComfyUI executes a dependency graph, not the drawing on the canvas. A node’s screen position does not define execution order: runtime resolves topological dependencies from the requested outputs, reuses valid cache entries, and recalculates only what became dirty or no longer matches its input signature.',
    status: 'confirmed',
    statusNote:
      'In current ComfyUI, ExecutionList is built on topological sorting; execution.py reports cached nodes separately, while caching.py derives cache keys from class type, inputs, and ancestry.',
    visual: 'graph-reading',
    category: 'workflow-engineering',
    stage: 'execution-cache',
    relatedChapters: [
      'workflow-engineering-graph-literacy',
      'workflow-engineering-switches-routing',
      'workflow-engineering-module-contracts',
      'workflow-engineering-debugging',
      'workflow-engineering-reproducibility',
    ],
    sections: [
      {
        id: 'not-left-to-right',
        eyebrow: '01 · FIRST PRINCIPLE',
        title: 'Canvas layout helps people read the graph, but it does not define execution order',
        paragraphs: [
          'A node on the right can execute only after all of its real upstream dependencies are ready. A node on the left that is not required by the selected output route does not have to participate in the current run simply because it appears “earlier” on the canvas.',
          'Professional layout matters for readability, but runtime truth lives in the links and dependency graph.',
        ],
        codeExamples: [
          {
            title: 'Human layout vs runtime dependency',
            label: 'MENTAL MODEL',
            code:
              'CANVAS VIEW\n' +
              'left → middle → right\n\n' +
              'RUNTIME VIEW\n' +
              'requested output\n' +
              '← required ancestor\n' +
              '← required ancestor\n' +
              '← source',
            note: 'Read the graph in both directions: downstream to understand signal flow, and from the output back to its ancestors to understand execution.',
          },
        ],
      },
      {
        id: 'topological-execution',
        eyebrow: '02 · TOPOLOGICAL ORDER',
        title: 'ExecutionList resolves dependencies, not node coordinates',
        paragraphs: [
          'In current ComfyUI, ExecutionList is built on topological sorting. Before a node can execute, runtime needs the values produced by the upstream nodes it depends on.',
          'This is why a large canvas can be arranged freely into groups and columns: visual order is for people; dependency order is for the engine.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'ComfyUI implementation',
            text: 'comfy_execution/graph.py describes ExecutionList as a topological dissolve of the graph and tracks the staged node, dependencies, and cached values separately.',
          },
        ],
      },
      {
        id: 'output-driven',
        eyebrow: '03 · OUTPUT TARGETS',
        title: 'The required result is identified first, then its upstream requirements are resolved',
        paragraphs: [
          'The execution engine builds a list of output targets and adds them to the execution list. It then expands the dependencies needed to produce them. This is a useful diagnostic model: if you want to know why a branch executes, find the output that depends on it.',
          'In a complex production workflow this matters especially for previews, saves, and alternative branches: the presence of a node in the JSON does not mean that it is required by the current result path.',
        ],
        codeExamples: [
          {
            title: 'Output-driven route',
            label: 'DEPENDENCY WALK',
            code:
              'SAVE / PREVIEW / OUTPUT\n' +
              '← FINAL IMAGE\n' +
              '← SELECTED BRANCH\n' +
              '← PROCESSING MODULE\n' +
              '← SOURCE + CONTROLS',
          },
        ],
      },
      {
        id: 'cache-basics',
        eyebrow: '04 · CACHE',
        title: 'A second Queue does not necessarily mean the entire graph is recalculated',
        paragraphs: [
          'ComfyUI stores intermediate outputs and can reuse a cached result on the next run when the node’s input signature and dependency context remain valid.',
          'execution.py collects cached nodes separately and sends them to the client through the execution_cached event. This is not “skipped work”; it is normal graph optimization.',
        ],
        table: {
          columns: ['What changed', 'Expected behavior'],
          rows: [
            ['Nothing relevant changed', 'Most of the route may be served from cache'],
            ['An upstream parameter changed', 'That node and its dependent downstream route require recalculation'],
            ['An unrelated branch changed', 'An independent output route may keep its valid cache'],
            ['A node reports its own IS_CHANGED / fingerprint', 'Cache validity includes that signal'],
          ],
        },
      },
      {
        id: 'cache-signature',
        eyebrow: '05 · INPUT SIGNATURE',
        title: 'Cache depends on more than the node ID — inputs and ancestry matter too',
        paragraphs: [
          'The current caching implementation builds a signature from class type, change fingerprint, and inputs. Linked inputs include the ancestor and socket in the signature, and ancestry is traversed deterministically.',
          'A key production consequence follows: changing a master control high in the control plane can make several downstream stages dirty even when you edited only a small control node.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'CacheKeySetInputSignature',
            text: 'ComfyUI caching.py includes both the immediate node signature and ordered ancestry in the input-signature cache key.',
          },
        ],
      },
      {
        id: 'dirty-propagation',
        eyebrow: '06 · DIRTY PROPAGATION',
        title: 'Evaluate a change by its downstream impact radius',
        paragraphs: [
          'If a shared seed, working resolution, or selector changes high in the control plane, the impact radius can be large. If a local Color Match changes after a cutout has already been prepared, recalculation is usually limited to the later part of the route.',
          'This is another reason to design workflows modularly: good boundaries reduce the recalculation area and make diagnostics easier to understand.',
        ],
        codeExamples: [
          {
            title: 'Impact radius',
            label: 'ENGINEERING VIEW',
            code:
              'CHANGE UPSTREAM CONTROL\n' +
              '→ invalidate affected node\n' +
              '→ invalidate dependent downstream path\n' +
              '→ keep unrelated cached path when valid',
          },
        ],
      },
      {
        id: 'queue-vs-execution',
        eyebrow: '07 · QUEUE',
        title: 'Queue Prompt requests a graph state — it does not mean “run every node”',
        paragraphs: [
          'Pressing Queue sends the runtime a description of the required graph state. The engine then validates dependencies, identifies cached nodes, and executes the missing portion of the route.',
          'Two runs of the same workflow can therefore differ significantly in duration: the first may build heavy intermediates, while the next can reuse a large portion of the results.',
        ],
      },
      {
        id: 'debug-reading',
        eyebrow: '08 · DEBUG METHOD',
        title: 'When behavior looks strange, ask three questions: selected? required? cached?',
        table: {
          columns: ['Question', 'What to verify'],
          rows: [
            ['SELECTED?', 'Does the selector / switch actually route through this branch?'],
            ['REQUIRED?', 'Is there a current output that depends on this branch?'],
            ['CACHED?', 'Did the node execute again, or did runtime reuse a saved output?'],
          ],
        },
        paragraphs: [
          'These three questions separate routing problems from execution problems. Only after that does it make sense to investigate model loading, sampler behavior, masks, or VRAM.',
        ],
      },
      {
        id: 'hansen-application',
        eyebrow: '09 · HANSEN APPLICATION',
        title: 'How this changes the way you read the large Hansen workflow',
        bullets: [
          'Do not read 252 nodes as a left-to-right list — start from one specific output/checkpoint.',
          'Walk upstream from that output and record only the required route.',
          'At every selector, identify the selected branch.',
          'Mark bypassed modules separately so they are not included in the effective runtime map.',
          'After Queue, check which checkpoints were updated and which remained cached.',
          'Change one variable per test and evaluate its downstream impact radius.',
        ],
      },
      {
        id: 'practice',
        eyebrow: '10 · PRACTICE',
        title: 'Practice: prove cache behavior and dependency execution on a small graph',
        bullets: [
          'Run a simple route to Preview/Save and record the duration of the first run.',
          'Change nothing and Queue again; note which nodes runtime reports as cached.',
          'Change one late-stage parameter and observe how short the recalculated tail becomes.',
          'Change one early shared control and compare the impact radius.',
          'Switch a selector to an alternative branch and observe how the required ancestry changes.',
          'Explain in plain language which node became dirty first and why downstream had to be recalculated.',
        ],
        codeExamples: [
          {
            title: 'Understanding criterion',
            label: 'YOU SHOULD BE ABLE TO SAY',
            code:
              'ComfyUI does not execute by screen position.\n' +
              'It resolves dependencies for requested outputs.\n' +
              'Valid cached outputs are reused.\n' +
              'Changing an upstream control expands the recalculation radius downstream.',
          },
        ],
      },
    ],
  },
];
