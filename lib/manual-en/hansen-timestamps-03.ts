import type { Chapter } from '../manual-types';

export const hansenTimestampChapters03: Chapter[] = [
  {
    index: 0,
    slug: 'hansen-08-35-mode1-example',
    navTitle: '08:35 · Mode 1 Example',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 08:35',
    title: 'Mode 1 example — read the system state before judging the image',
    lede:
      'At this timestamp, Hansen shows the working graph and the Mode 1 result. For a beginner, this is a key transition: instead of evaluating only the image, we connect it to a specific control state, active route and set of checkpoints.',
    status: 'confirmed',
    statusNote:
      'Video review shows the full graph around 08:35; the source graph confirms saved Mode 1: generation control 541=1, empty latent selection through 535 and denoise 1.0 through 600.',
    visual: 'master',
    category: 'hansen-timestamps',
    stage: 'hansen-08-35',
    relatedNodes: [1, 3, 14, 230, 231, 535, 541, 600, 607, 608, 609, 783],
    relatedChapters: ['control-panel', 'sdxl', 'workflow-engineering-switches-routing', 'workflow-engineering-reproducibility'],
    sections: [
      {
        id: 'hansen-original',
        eyebrow: 'HANSEN ORIGINAL',
        title: 'Mode 1 — TXT + ControlNet to image',
        paragraphs: [
          'In the saved workflow, node 541 equals 1. This selects the txt2img-style route: node 535 takes Empty Latent 3, while the denoise logic through 602/600 selects fallback 1.0.',
          'The base image still participates as a structural source through resize, preprocessors, ControlNet maps, masks and downstream comparisons. Mode 1 therefore does not mean “from scratch with no source image.”',
        ],
        codeExamples: [
          {
            title: 'Mode 1 mental model',
            label: 'ACTIVE STATE',
            code:
              'BASE IMAGE / CONTROL MAPS\n' +
              '+ PROMPT / CONDITIONING\n' +
              '+ EMPTY LATENT\n' +
              '+ DENOISE 1.0\n' +
              '→ SDXL GENERATION',
          },
        ],
      },
      {
        id: 'read-state',
        eyebrow: 'ARCHVIZ FOUNDATION / EXTENSION',
        title: 'Read every example together with its state vector',
        table: {
          columns: ['Question', 'Mode 1 answer'],
          rows: [
            ['Which generation mode?', '541 = 1'],
            ['Which latent source?', 'Empty Latent 3 via selector 535'],
            ['Which denoise?', '1.0 via comparison/select logic 602 → 600'],
            ['Which structural guidance?', 'Depth + Canny stack'],
            ['Which seed/control config?', 'Shared control plane'],
          ],
        },
        paragraphs: [
          'Without this state vector, an “example” cannot be reproduced. A production screenshot only becomes meaningful when paired with the configuration that produced it.',
        ],
      },
      {
        id: 'checkpoint',
        eyebrow: 'CHECKPOINT',
        title: 'Compare INPUT → SDXL before comparing INPUT → FINAL',
        bullets: [
          'First compare the base input with SDXL decode 14.',
          'Check major geometry, perspective, openings and silhouette.',
          'Only then enable PEOPLE, detail transfer and main FLUX.',
        ],
      },
      {
        id: 'practice',
        eyebrow: 'PRACTICE',
        title: 'Exercise: reconstruct Mode 1 from controls only',
        bullets: [
          'Find node 541 and prove that mode=1.',
          'Trace 541 → 535 and identify the selected latent.',
          'Trace 541 → 602 → 600 and identify denoise.',
          'Do not run the graph until you can explain the route in words.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'hansen-09-16-generation-mode1',
    navTitle: '09:16 · Generation Mode 1',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 09:16',
    title: 'Generation Mode 1 — the full route from controls to the first provable image checkpoint',
    lede:
      'Here we turn Mode 1 from a concept into a route. The beginner’s main task is to follow the chain from shared controls through the SDXL sampler to decode without getting distracted by downstream PEOPLE and FLUX.',
    status: 'confirmed',
    statusNote:
      'Source topology confirms the SDXL route: model 2, prompts 5/6, ControlNet stack 417/419/418, latent selector 535, KSampler 1 and VAE Decode 14.',
    visual: 'sdxl',
    category: 'hansen-timestamps',
    stage: 'hansen-09-16',
    relatedNodes: [1, 2, 3, 5, 6, 14, 21, 23, 38, 165, 230, 231, 417, 418, 419, 535, 541, 600],
    relatedChapters: ['sdxl', 'controlnet', 'hansen-02-40-process1-txt2img', 'workflow-engineering-debugging'],
    sections: [
      {
        id: 'route',
        eyebrow: 'HANSEN ORIGINAL',
        title: 'Mode 1 SDXL route',
        codeExamples: [
          {
            title: 'Active generation path',
            label: 'CONFIRMED TOPOLOGY',
            code:
              'MODEL 2\n' +
              '+ POSITIVE 5 / NEGATIVE 6\n' +
              '+ DEPTH 417 → CANNY 419 → APPLY 418\n' +
              '+ EMPTY LATENT 3 → SELECTOR 535\n' +
              '+ CONFIG 230 / SEED 231 / DENOISE 600\n' +
              '→ KSAMPLER 1\n' +
              '→ VAE DECODE 14',
          },
        ],
      },
      {
        id: 'sampler-contract',
        eyebrow: 'BEGINNER FOUNDATION',
        title: 'The sampler does not “draw by itself” — it is where five systems meet',
        table: {
          columns: ['Input family', 'Meaning'],
          rows: [
            ['MODEL', 'Which generative network runs'],
            ['CONDITIONING', 'What we want + structural/control guidance'],
            ['LATENT', 'Which latent state generation starts from'],
            ['NOISE / SEED', 'Which stochastic realization is used'],
            ['SAMPLER CONFIG', 'How denoising steps are performed'],
          ],
        },
        paragraphs: [
          'This structure is universal. The specific sampler or model name can change, but these responsibility families remain.',
        ],
      },
      {
        id: 'decode',
        eyebrow: 'CHECKPOINT',
        title: 'Node 14 is the first image you can evaluate honestly',
        paragraphs: [
          'Before decode 14, most of the process exists in model/conditioning/latent space. After 14, we have IMAGE again and can compare it with the source.',
          'If the architecture is already broken here, downstream enhancement should not be used as an attempt to “fix everything later.”',
        ],
      },
      {
        id: 'qc',
        eyebrow: 'QC',
        title: 'Mode 1 verification order',
        bullets: [
          'Camera / perspective.',
          'Main massing and silhouette.',
          'Facade rhythm / openings.',
          'Ground and horizon relationship.',
          'Only then material/lighting/detail quality.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'hansen-11-35-mode2-img2img',
    navTitle: '11:35 · Mode 2 IMG2IMG',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 11:35',
    title: 'Mode 2 · IMG2IMG — the same sampler, a different initial condition',
    lede:
      'Mode 2 is particularly useful as a learning example: most of the production system stays the same while the latent source and denoise change. A mode switch therefore does not require a second workflow — it can reconfigure the contract of an existing module.',
    status: 'confirmed',
    statusNote:
      'Source control logic confirms generation mode 541, latent selector 535 and denoise selector 600. Stored img2img control 608 = 0.3; in mode 2 it becomes the relevant branch.',
    visual: 'sdxl',
    category: 'hansen-timestamps',
    stage: 'hansen-11-35',
    relatedNodes: [1, 14, 535, 536, 541, 592, 600, 602, 607, 608, 609, 695, 693],
    relatedChapters: ['sdxl', 'inputs', 'workflow-engineering-switches-routing', 'workflow-engineering-module-contracts'],
    sections: [
      {
        id: 'difference',
        eyebrow: 'HANSEN ORIGINAL',
        title: 'Mode 1 and Mode 2 differ primarily in starting latent and denoise',
        table: {
          columns: ['Parameter', 'Mode 1 · TXT+CNET2IMG', 'Mode 2 · IMG+CNET2IMG'],
          rows: [
            ['Latent source', 'Empty latent', 'VAE-encoded input image'],
            ['Denoise', '1.0', 'User control 608; stored 0.3'],
            ['Prompt / ControlNet / model', 'Shared system', 'Shared system'],
            ['Sampler/output contract', 'Same module role', 'Same module role'],
          ],
        },
      },
      {
        id: 'concept',
        eyebrow: 'BEGINNER FOUNDATION',
        title: 'IMG2IMG = generation with memory of the source image',
        paragraphs: [
          'In txt2img, the latent starts as an empty/noise canvas. In img2img, the source IMAGE is first encoded by the VAE into LATENT and the sampler modifies an existing representation.',
          'Denoise controls how much freedom the process has to change that representation. Lower denoise generally increases the influence of the initial latent; this is a useful mental model, not an absolute guarantee of geometry preservation.',
        ],
        codeExamples: [
          {
            title: 'Mode 2 contract',
            label: 'MODEL-AGNOSTIC',
            code:
              'INPUT IMAGE\n' +
              '→ VAE ENCODE\n' +
              '→ INITIAL LATENT\n' +
              '+ CONDITIONING / CONTROL\n' +
              '+ DENOISE < 1\n' +
              '→ SAMPLER\n' +
              '→ DECODE',
          },
        ],
      },
      {
        id: 'routing',
        eyebrow: 'CONTROL PLANE',
        title: 'One switch changes several downstream decisions',
        paragraphs: [
          'Node 541 does more than label the mode. It affects the latent route and denoise logic. This is a classic shared authoritative control: one production decision propagates into several technical branches.',
        ],
      },
      {
        id: 'practice',
        eyebrow: 'PRACTICE',
        title: 'Exercise: explain Mode 2 without Hansen node names',
        paragraphs: [
          'If you can explain Mode 2 as “input image → encode → latent → partial denoise → decode,” you understand the transferable principle.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'hansen-12-53-generation-mode2',
    navTitle: '12:53 · Generation Mode 2',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 12:53',
    title: 'Generation Mode 2 — control the change instead of merely launching a second preset',
    lede:
      'Hansen returns to the control/config area and Mode 2 generation. The key learning skill here is to separate source-preservation controls from aesthetic controls and understand which parameters truly change the freedom of generation.',
    status: 'confirmed',
    statusNote:
      'Video review around 12:53 shows the control area and Stage 1 preview. The source graph confirms working resolution, generation mode, denoise, ControlNet strengths, prompt selector and shared seed/steps controls.',
    visual: 'controls',
    category: 'hansen-timestamps',
    stage: 'hansen-12-53',
    relatedNodes: [231, 453, 456, 541, 600, 608, 702, 720, 721, 722, 723, 771],
    relatedChapters: ['control-panel', 'hansen-11-35-mode2-img2img', 'controlnet', 'workflow-engineering-reproducibility'],
    sections: [
      {
        id: 'control-families',
        eyebrow: 'ARCHVIZ FOUNDATION / EXTENSION',
        title: 'Separate controls by responsibility',
        table: {
          columns: ['Family', 'Examples', 'Question'],
          rows: [
            ['Geometry preservation', 'Mode, denoise, Depth/Canny strength', 'How much freedom does AI have?'],
            ['Canvas', 'Working resolution 702', 'At what size does the pipeline operate?'],
            ['Stochastic', 'Seed 231, steps 771', 'How can the sampling state be reproduced?'],
            ['Prompt/style', 'Prompt selector 453, IPA weight 721', 'Which visual intent is applied?'],
            ['Detail conservation', '720', 'How much source detail is restored?'],
          ],
        },
      },
      {
        id: 'change-one',
        eyebrow: 'EXPERIMENT DESIGN',
        title: 'For learning, change one control family at a time',
        paragraphs: [
          'If denoise, seed, prompt and ControlNet strength are changed together, the result cannot be interpreted. A valid A/B test changes one factor while holding the other controls fixed.',
        ],
        codeExamples: [
          {
            title: 'Good experiment',
            label: 'A/B',
            code:
              'FIX: INPUT + SEED + PROMPT + CONTROLNET + STEPS\n' +
              'CHANGE: DENOISE ONLY\n' +
              'COMPARE: GEOMETRY / MATERIAL / MICRODETAIL',
          },
        ],
      },
      {
        id: 'checkpoint',
        eyebrow: 'CHECKPOINT',
        title: 'Stage 1 preview is a mandatory stop',
        paragraphs: [
          'Mode 2 should first prove that base generation preserved the required architecture. PEOPLE, main FLUX and upscale are not part of that proof.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'hansen-13-20-mode2-enhancement',
    navTitle: '13:20 · Mode 2 Enhancement',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 13:20',
    title: 'Mode 2 enhancement — local modules return to the shared master pipeline',
    lede:
      'By this point the graph has completed base generation. The production pattern now becomes clear: local branches do not replace the master image permanently; they perform bounded work and return a standard result to the next shared refinement stage.',
    status: 'confirmed',
    statusNote:
      'Source topology confirms PEOPLE return through 459, detail transfer 573, VAE Encode 67, main FLUX sampler 57 and decode 53. Video review around 13:20 shows the downstream/right-side pipeline and result comparisons.',
    visual: 'flux-main',
    category: 'hansen-timestamps',
    stage: 'hansen-13-20',
    relatedNodes: [53, 57, 67, 459, 565, 573, 720, 754, 775],
    relatedChapters: ['people-ppl-overview', 'detail-conservation', 'main-flux', 'workflow-engineering-module-contracts'],
    sections: [
      {
        id: 'return-pattern',
        eyebrow: 'HANSEN ORIGINAL',
        title: 'PEOPLE and detail modules converge before main FLUX',
        codeExamples: [
          {
            title: 'Return to master',
            label: 'CONFIRMED ROUTE',
            code:
              'BASE / SDXL RESULT\n' +
              '→ LOCAL PEOPLE MODULE\n' +
              '→ SELECTOR 459\n' +
              '→ DETAIL TRANSFER 573\n' +
              '→ VAE ENCODE 67\n' +
              '→ MAIN FLUX 57\n' +
              '→ DECODE 53',
          },
        ],
      },
      {
        id: 'universal',
        eyebrow: 'ARCHVIZ FOUNDATION / EXTENSION',
        title: 'A local module needs a clear RETURN contract',
        paragraphs: [
          'A good module performs one responsibility and returns a standard data type understood by the next stage. This makes it possible to replace the PEOPLE implementation without rewriting the entire downstream pipeline.',
        ],
      },
      {
        id: 'main-flux',
        eyebrow: 'REFINEMENT',
        title: 'Main FLUX acts as a refinement stage here, not a new composition generator',
        paragraphs: [
          'The scene after PEOPLE/detail transfer is encoded to latent by 67 and passes through FLUX with stored denoise 0.18. The low denoise reflects an intended refinement role; actual preservation of specific objects still requires comparison.',
        ],
      },
      {
        id: 'qc',
        eyebrow: 'QC',
        title: 'Check survival after every return',
        bullets: [
          'Compare before/after PEOPLE.',
          'Compare before/after detail transfer.',
          'Compare 459/573 with decode 53 after main FLUX.',
          'Do not accept a beautiful final image if a local architectural error appeared earlier.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'hansen-13-55-output-parameters',
    navTitle: '13:55 · Output Parameters',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 13:55',
    title: 'Output parameters — the output stage is part of the production contract',
    lede:
      'The final image is not the end of engineering. You need to know which branch is actually saved, which branch merely exists in the graph, which branch is bypassed, and what LQ/HQ output means in the current state.',
    status: 'confirmed',
    statusNote:
      'The source graph confirms active save 730 from decode 53. The HQ/upscale/overlay chain is present, but processing nodes 832–851 and associated sizing logic are stored in bypass mode 4.',
    visual: 'output',
    category: 'hansen-timestamps',
    stage: 'hansen-13-55',
    relatedNodes: [15, 53, 153, 154, 293, 301, 309, 531, 730, 832, 833, 834, 848, 849],
    relatedChapters: ['upscale-overlay', 'output', 'main-flux', 'workflow-engineering-execution-cache'],
    sections: [
      {
        id: 'actual-output',
        eyebrow: 'HANSEN ORIGINAL',
        title: 'In the saved state, the provably active output is node 730',
        table: {
          columns: ['Output', 'Upstream', 'State'],
          rows: [
            ['730 · LQ1 JPG', 'Decode 53', 'Active route'],
            ['531 · HQ PNG', 'Upscale 833', 'Save node exists; upstream bypassed'],
            ['293 · LQ2 JPG', 'Overlay 849', 'Save node exists; upstream bypassed'],
            ['15 · Final Preview', 'Overlay 849', 'Preview exists; upstream bypassed'],
          ],
        },
      },
      {
        id: 'output-contract',
        eyebrow: 'BEGINNER FOUNDATION',
        title: 'OUTPUT = format + size + branch + filename + state',
        paragraphs: [
          'It is not enough to say “the workflow saves PNG.” You need to know which branch supplies the image, whether it passed through upscale, whether overlays were applied, and the execution state of upstream nodes.',
        ],
      },
      {
        id: 'upscale',
        eyebrow: 'OPTIONAL MODULE',
        title: 'Upscale is a separate module, not a mandatory part of generation',
        paragraphs: [
          'The graph contains Ultimate Upscale 833 with model 4x-UltraSharp, tile logic and optional detail transfer 834. This module can be bypassed without changing the logic of previous stages.',
          'This is an important production lesson: delivery-resolution processing should be detachable from content-generation processing.',
        ],
      },
      {
        id: 'pass',
        eyebrow: 'PASS CRITERIA',
        title: 'You should be able to answer: what exactly will be saved right now?',
        paragraphs: [
          'If the answer comes only from the name of a Save node, the output contract is not yet understood. Trace its upstream route to the last active processing checkpoint.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'hansen-14-43-conclusion',
    navTitle: '14:43 · Conclusion',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 14:43',
    title: 'Conclusion — from someone else’s workflow to your own engineering thinking',
    lede:
      'The final Hansen frame is not a target to “recreate the picture.” It demonstrates that a complex graph can be decomposed into reusable contracts. By the end of this chapter, the learner should see a system rather than 252 isolated nodes.',
    status: 'confirmed',
    statusNote:
      'The video conclusion shows a finished architectural image. The learning conclusions below are an ARCHVIZ FOUNDATION synthesis based on the analyzed topology of the full workflow.',
    visual: 'master',
    category: 'hansen-timestamps',
    stage: 'hansen-14-43',
    relatedChapters: [
      'workflow-engineering-overview',
      'graph-reading',
      'hansen-00-39-production-method',
      'ppl-workflow-01-generate-place',
      'main-flux',
      'upscale-overlay',
    ],
    sections: [
      {
        id: 'one-sentence',
        eyebrow: 'THE WHOLE GRAPH',
        title: 'The entire Hansen workflow in one line',
        codeExamples: [
          {
            title: 'Master mental model',
            label: 'MODEL-AGNOSTIC',
            code:
              'CONFIG\n' +
              '→ INPUT\n' +
              '→ STRUCTURAL CONTROL\n' +
              '→ BASE GENERATION\n' +
              '→ LOCAL MASKS / PEOPLE / DETAIL MODULES\n' +
              '→ GLOBAL REFINEMENT\n' +
              '→ OPTIONAL UPSCALE / OVERLAY\n' +
              '→ OUTPUT',
          },
        ],
      },
      {
        id: 'what-remains',
        eyebrow: 'FOUNDATION',
        title: 'What remains useful after the specific models become obsolete',
        bullets: [
          'Data types and contracts: IMAGE, MASK, LATENT, MODEL, CONDITIONING, VAE.',
          'Control plane vs data plane.',
          'Selectors, switches and bypass.',
          'Source → process → checkpoint → return.',
          'Coordinate and batch contracts.',
          'Local freedom instead of uncontrolled full-frame regeneration.',
          'Reproducible A/B experiments.',
          'Output as a traceable production contract.',
        ],
      },
      {
        id: 'not-model-course',
        eyebrow: 'COURSE BOUNDARY',
        title: 'Why we do not need a second manual for every new model',
        paragraphs: [
          'A new model changes loaders, conditioning details, sampler conventions and capabilities. It does not invalidate workflow engineering. After this course, the next step is to read the documentation for a new model independently and insert it into an architecture you already understand.',
          'The course has succeeded when an unfamiliar workflow looks like a set of familiar responsibilities even if you have never seen the node names before.',
        ],
      },
      {
        id: 'graduation',
        eyebrow: 'GRADUATION TEST',
        title: 'Final test: open an unfamiliar graph and stay oriented',
        bullets: [
          'Find outputs and walk upstream.',
          'Identify major groups/modules.',
          'Find the control plane and authoritative values.',
          'Identify active / selected / bypassed branches.',
          'Define the input/output contract of each important module.',
          'Find checkpoints before inspecting internal nodes.',
          'Describe the entire graph in one architectural sentence.',
        ],
      },
      {
        id: 'finish',
        eyebrow: 'NEXT',
        title: 'After the manual, independent learning begins',
        paragraphs: [
          'You do not need another foundational course. You need practice: take a new module, understand its I/O contract, verify dependencies, build a small lab, and then connect it safely to the Master Workflow.',
        ],
      },
    ],
  },
];
