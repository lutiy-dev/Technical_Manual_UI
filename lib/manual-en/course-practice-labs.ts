import type { Chapter } from '../manual-types';

export const coursePracticeLabChapters: Chapter[] = [
  {
    index: 0,
    slug: 'lab-04-master-graph-reading',
    navTitle: 'LAB 04 · Read the Master',
    eyebrow: 'PRACTICE LAB · FOUNDATION',
    title: 'Read the Master — understand the large graph before the first Queue Prompt',
    lede:
      'This lab closes the Foundation section with practice: learn to read Hansen as a map of systems, inputs, controls, resources and return points without running generation. It is the required transition from “I see hundreds of nodes” to “I see a small number of modules and contracts.”',
    status: 'confirmed',
    statusNote:
      'This is an ARCHVIZ FOUNDATION / EXTENSION exercise. It uses the confirmed Hansen architecture; the goal is graph-reading skill rather than reproducing a specific model.',
    visual: 'graph-reading',
    category: 'foundation',
    stage: 'practice-lab-04',
    relatedChapters: ['overview', 'graph-reading', 'inputs', 'control-panel', 'models-dependencies'],
    sections: [
      {
        id: 'goal',
        eyebrow: '01 · GOAL',
        title: 'What the learner should be able to do after LAB 04',
        bullets: [
          'Find BASE CONFIG, INPUTS, MODEL LOADERS, CONTROL, PROCESS modules and OUTPUT without reading every node.',
          'Show the active route and distinguish it from connected-but-not-selected and bypassed branches.',
          'Name at least five authoritative controls and their consumers.',
          'Find model/resource boundaries: where the workflow loads heavy assets and where those assets are reused.',
          'Describe one module as INPUT → PROCESS → CHECKPOINT → RETURN.',
        ],
      },
      {
        id: 'exercise-a',
        eyebrow: '02 · EXERCISE A',
        title: 'Canvas map: districts first, streets second',
        bullets: [
          'Open a copy of the Hansen workflow and do not run anything.',
          'List the major groups from left to right in a note.',
          'Describe the responsibility of each group in one sentence.',
          'Do not trace internal links until the map of major modules is complete.',
        ],
      },
      {
        id: 'exercise-b',
        eyebrow: '03 · EXERCISE B',
        title: 'Control hunt: find what actually drives the graph',
        bullets: [
          'Find generation mode 541, PEOPLE mode 543, ControlNet source 456, working resolution 702 and shared steps 771.',
          'For each control, find at least one downstream consumer.',
          'If a downstream widget shows another value, determine the effective linked value.',
        ],
      },
      {
        id: 'exercise-c',
        eyebrow: '04 · EXERCISE C',
        title: 'Resource boundary: where the models live',
        bullets: [
          'Find the SDXL checkpoint / VAE / ControlNet loaders.',
          'Find the FLUX UNet / CLIP / VAE loaders.',
          'Mark which loaders serve several downstream modules.',
          'Explain why a loader is a resource boundary, not “just another node.”',
        ],
      },
      {
        id: 'pass',
        eyebrow: '05 · PASS CRITERIA',
        title: 'LAB 04 is complete when you can explain the graph without running it',
        bullets: [
          'You can describe INPUT → BASE GENERATION → LOCAL MODULES → FINAL → OUTPUT in 2–3 minutes.',
          'You do not confuse the control plane with the data plane.',
          'You can point to one bypassed branch and one selector-controlled branch.',
          'You can explain why 252 nodes are not 252 independent tasks.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'lab-05-generative-systems-bench',
    navTitle: 'LAB 05 · Generative Bench',
    eyebrow: 'PRACTICE LAB · GENERATIVE SYSTEMS',
    title: 'Generative Bench — one frame, one seed, one variable',
    lede:
      'This lab closes Global Prompts, SDXL, ControlNet, IPAdapter/LoRA, masks and detail conservation. The key skill is not “turn everything at once,” but running controlled A/B tests in which exactly one cause changes.',
    status: 'confirmed',
    statusNote:
      'ARCHVIZ FOUNDATION / EXTENSION. Specific Hansen settings are used as a reference baseline; the learning goal is a transferable experimental method.',
    visual: 'sdxl',
    category: 'base-generation',
    stage: 'practice-lab-05',
    relatedChapters: ['global-prompts', 'sdxl', 'controlnet', 'ipadapter-lora', 'segmentation-masks', 'detail-conservation'],
    sections: [
      {
        id: 'rule',
        eyebrow: '01 · LAB RULE',
        title: 'One benchmark — one changed variable',
        codeExamples: [
          {
            title: 'A/B discipline',
            label: 'CONTROLLED TEST',
            code:
              'SAME INPUT\n' +
              '→ SAME SEED\n' +
              '→ SAME PROMPT\n' +
              '→ SAME SIZE\n' +
              '→ CHANGE ONE PARAMETER\n' +
              '→ COMPARE CHECKPOINTS',
          },
        ],
      },
      {
        id: 'prompt',
        eyebrow: '02 · PROMPT EXERCISE',
        title: 'Prompt: separate content from style/light',
        bullets: [
          'Lock seed and geometry controls.',
          'Create a baseline with the current GLOBAL prompt.',
          'Change only LIGHT STYLE or one material descriptor.',
          'Compare not “better/worse,” but what actually changed: material, light, composition or geometry.',
        ],
      },
      {
        id: 'sdxl',
        eyebrow: '03 · SDXL EXERCISE',
        title: 'SDXL: prove the role of latent source and denoise',
        bullets: [
          'Create a Mode 1 baseline.',
          'Switch to the image-seeded variant with the same seed and minimal denoise.',
          'Increase denoise in steps without changing prompt/control.',
          'Record the threshold at which architecture starts to drift.',
        ],
      },
      {
        id: 'controlnet',
        eyebrow: '04 · CONTROLNET EXERCISE',
        title: 'Depth vs Canny: they preserve different kinds of structure',
        table: {
          columns: ['Run', 'Control', 'What to evaluate'],
          rows: [
            ['A', 'Depth only', 'Volume, perspective, major geometry'],
            ['B', 'Canny only', 'Contours, frames, fine facade lines'],
            ['C', 'Depth + Canny', 'Trade-off between structure lock and freedom'],
          ],
        },
      },
      {
        id: 'ipadapter',
        eyebrow: '05 · REFERENCE EXERCISE',
        title: 'IPAdapter / LoRA: enable only after the baseline is proven',
        bullets: [
          'Prove the baseline without reference conditioning first.',
          'Add the reference and begin with a low weight.',
          'Compare whether the intended visual language transfers without damaging architecture.',
          'If the result cannot be explained by one variable, the test is invalid.',
        ],
      },
      {
        id: 'masks',
        eyebrow: '06 · MASK EXERCISE',
        title: 'Prove the mask as data before using it for an edit',
        bullets: [
          'Generate the mask and expose it in a dedicated preview.',
          'Check boundaries before connecting inpaint/composite.',
          'Run grow/blur A/B and evaluate only edge quality.',
          'Only then use the mask in the downstream operation.',
        ],
      },
      {
        id: 'detail',
        eyebrow: '07 · DETAIL CONSERVATION EXERCISE',
        title: 'Detail transfer: find the minimum sufficient strength',
        bullets: [
          'Compare 0 / baseline / increased strength with the same seed.',
          'Inspect windows, facade rhythm, joints and small structural elements.',
          'Choose the lowest value that genuinely restores detail.',
        ],
      },
      {
        id: 'qc',
        eyebrow: '08 · QC / PASS',
        title: 'LAB 05 is complete when every result can be explained causally',
        bullets: [
          'Every comparison has a baseline.',
          'Only one controlled variable changes in each run.',
          'Seed and input are fixed.',
          'Intermediate previews exist; evaluation is not limited to the final frame.',
          'You can identify which module caused a specific change.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'lab-06-people-ppl-production-run',
    navTitle: 'LAB 06 · PEOPLE / PPL Run',
    eyebrow: 'PRACTICE LAB · PEOPLE / PPL',
    title: 'PEOPLE / PPL Production Run — move a person through checkpoints, not through hope',
    lede:
      'This practice connects prompt, generation, Florence2/SAM2, preparation, positioning, selectors and composite. The learner runs Workflow 01 first, then Workflow 02, and learns to stop at the first incorrect checkpoint.',
    status: 'confirmed',
    statusNote:
      'ARCHVIZ FOUNDATION / EXTENSION based on confirmed PPL topology. A standalone importable JSON is not claimed: practice runs on a copy of the Hansen master until a verified raw export is available.',
    visual: 'composite',
    category: 'people-ppl',
    stage: 'practice-lab-06',
    relatedChapters: [
      'node-408-prompt',
      'generation',
      'segmentation-mask',
      'preparation-color-match',
      'positioning',
      'ppl-workflow-01-generate-place',
      'ppl-workflow-02-replace-existing',
      'selector-logic',
      'ppl-mode-2-inpaint',
      'composite',
    ],
    sections: [
      {
        id: 'workflow01',
        eyebrow: '01 · WORKFLOW 01',
        title: 'Generate & Place: a new person',
        codeExamples: [
          {
            title: 'Checkpoint route',
            label: 'PPL W01',
            code:
              'PROMPT\n' +
              '→ PERSON GENERATION [CHECK A]\n' +
              '→ DETECT / SEGMENT [CHECK B]\n' +
              '→ CUTOUT / COLOR MATCH [CHECK C]\n' +
              '→ POSITION / PASTE [CHECK D]\n' +
              '→ MAIN RETURN [CHECK E]',
          },
        ],
        bullets: [
          'Do not fix the mask if the generated person is already wrong at Check A.',
          'Do not fix the composite if the cutout has a halo at Check C.',
          'Verify Person Mask and Placement Mask separately.',
        ],
      },
      {
        id: 'workflow02',
        eyebrow: '02 · WORKFLOW 02',
        title: 'Replace Existing: the scene already defines the spatial slot',
        bullets: [
          'Use the existing 3D/rendered person as placement truth.',
          'Verify that detection/crop targets the intended figure.',
          'Generate/improve appearance without changing the original spatial slot.',
          'Compare original placement and returned composite by feet, scale, occlusion and horizon.',
        ],
      },
      {
        id: 'selector',
        eyebrow: '03 · SELECTOR EXERCISE',
        title: '543 and linked switches: prove the effective route',
        bullets: [
          'Switch PEOPLE mode deliberately.',
          'Verify which downstream selectors receive the linked control.',
          'Do not trust a local widget until its incoming link is checked.',
          'Trace the return through 459 and into the main pipeline.',
        ],
      },
      {
        id: 'failure-drill',
        eyebrow: '04 · FAILURE DRILL',
        title: 'Find the first incorrect checkpoint',
        table: {
          columns: ['Symptom', 'First place to check'],
          rows: [
            ['Wrong person', 'generation checkpoint'],
            ['Part of the body is missing', 'SAM2 / grow / blur'],
            ['White/dark halo', 'Remove BG / cutout'],
            ['Person is floating', 'position / ground contact'],
            ['Person changes after FLUX', 'PPL return vs main FLUX decode'],
          ],
        },
      },
      {
        id: 'pass',
        eyebrow: '05 · PASS CRITERIA',
        title: 'LAB 06 is complete when PEOPLE can be debugged stage by stage',
        bullets: [
          'You distinguish Workflow 01 and Workflow 02 by spatial contract.',
          'You distinguish Person Mask and Placement Mask.',
          'You can show five checkpoints from person source to master return.',
          'When something fails, you go to the first incorrect checkpoint rather than tuning the entire graph.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'lab-07-final-pipeline-delivery',
    navTitle: 'LAB 07 · Final Delivery',
    eyebrow: 'PRACTICE LAB · FINAL PIPELINE',
    title: 'Final Delivery — main FLUX, upscale and output as a verifiable chain',
    lede:
      'The final lab before the capstone teaches the difference between improving a result and preserving a result. Main FLUX, optional upscale and delivery outputs are verified through separate A/B checkpoints.',
    status: 'confirmed',
    statusNote:
      'ARCHVIZ FOUNDATION / EXTENSION. The active main FLUX route and bypassed upscale state are grounded in the confirmed topology of the current Hansen snapshot.',
    visual: 'output',
    category: 'final-pipeline',
    stage: 'practice-lab-07',
    relatedChapters: ['main-flux', 'upscale-overlay', 'output', 'diagnostics', 'checklist', 'examples'],
    sections: [
      {
        id: 'main-flux',
        eyebrow: '01 · MAIN FLUX',
        title: 'Compare PPL return with final decode',
        bullets: [
          'Lock seed and prompt.',
          'Save the checkpoint before main FLUX.',
          'Run main FLUX with baseline denoise.',
          'Compare architecture, people and local details before/after.',
          'Do not accept refinement as successful if it looks “better” but changes approved geometry.',
        ],
      },
      {
        id: 'upscale',
        eyebrow: '02 · UPSCALE',
        title: 'Remove bypass only after LQ is accepted',
        bullets: [
          'Accept LQ output as the content master first.',
          'Enable the upscale branch separately.',
          'Check seams, repeated detail, windows, people and edge artifacts.',
          'If HQ changes content rather than only resolution/detail, return the branch to diagnostics.',
        ],
      },
      {
        id: 'output',
        eyebrow: '03 · OUTPUT',
        title: 'Do not confuse different save routes',
        bullets: [
          'Identify which save node is the current active delivery.',
          'Mark optional HQ/LQ2 outputs separately.',
          'Verify filename, resolution and upstream source for each output.',
        ],
      },
      {
        id: 'golden-run',
        eyebrow: '04 · GOLDEN RUN',
        title: 'Create one reference run',
        bullets: [
          'Lock input files, seed, effective controls and enabled/bypassed modules.',
          'Save key checkpoints: base, people composite, pre-FLUX, final LQ, optional HQ.',
          'This run becomes the reference for future workflow changes.',
        ],
      },
      {
        id: 'pass',
        eyebrow: '05 · PASS CRITERIA',
        title: 'LAB 07 is complete when delivery is reproducible',
        bullets: [
          'The run can be repeated with the same effective settings.',
          'You can identify which module causes every difference between checkpoints.',
          'LQ/HQ/output routes are kept distinct.',
          'One Golden Run exists for future regression checks.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'capstone-master-graph-certification',
    navTitle: 'CAPSTONE · Master Graph',
    eyebrow: 'FINAL PRACTICE · COURSE COMPLETION',
    title: 'Capstone — explain, run and diagnose Hansen without prompts',
    lede:
      'This is not a memory test for node names. The final assessment asks one question: have you developed a transferable way of thinking about ComfyUI that works on the next unfamiliar workflow?',
    status: 'confirmed',
    statusNote:
      'Final pedagogical extension. Completion means the learner is ready to study new models/modules independently without another foundational course.',
    visual: 'master',
    category: 'evidence-reference',
    stage: 'capstone',
    relatedChapters: ['overview', 'workflow-engineering-debugging', 'hansen-14-43-conclusion', 'checklist', 'examples'],
    sections: [
      {
        id: 'part-a',
        eyebrow: 'PART A · READ',
        title: 'Explain the architecture without Queue Prompt',
        bullets: [
          'Name the major modules and their responsibilities.',
          'Show the data plane and control plane.',
          'Show the active route, a bypassed branch and a selector-controlled alternative.',
          'Explain one module as INPUT → PROCESS → CHECKPOINT → RETURN.',
        ],
      },
      {
        id: 'part-b',
        eyebrow: 'PART B · RUN',
        title: 'Perform a controlled production run',
        bullets: [
          'Choose the mode deliberately and record effective controls.',
          'Lock the seed.',
          'Save intermediate checkpoints.',
          'Change exactly one variable and create an A/B comparison.',
        ],
      },
      {
        id: 'part-c',
        eyebrow: 'PART C · DEBUG',
        title: 'Create one deliberate failure and find it upstream',
        bullets: [
          'For example: wrong selector, excessive denoise, poor mask edge or bypassed required module.',
          'Do not search the whole canvas: move from the symptom to the first incorrect checkpoint.',
          'After fixing it, repeat the same seed and prove the change with comparison.',
        ],
      },
      {
        id: 'part-d',
        eyebrow: 'PART D · TEACH BACK',
        title: 'Explain the workflow in your own words',
        paragraphs: [
          'If you can explain to another person why controls, selectors, latent, mask, ControlNet, PEOPLE module and final refinement exist, you are no longer merely running someone else’s workflow. You understand the system.',
        ],
      },
      {
        id: 'graduation',
        eyebrow: 'COURSE COMPLETE',
        title: 'Completion criterion for the single foundational manual',
        codeExamples: [
          {
            title: 'Transfer skill',
            label: 'FINAL RULE',
            code:
              'NEW WORKFLOW\n' +
              '→ IDENTIFY INPUTS\n' +
              '→ FIND CONTROLS\n' +
              '→ MAP MODULES\n' +
              '→ LOCATE CHECKPOINTS\n' +
              '→ TRACE RETURN\n' +
              '→ TEST ONE VARIABLE\n' +
              '→ DEBUG UPSTREAM',
            note: 'If this algorithm works on an unfamiliar graph, the course goal has been achieved.',
          },
        ],
      },
    ],
  },
];
