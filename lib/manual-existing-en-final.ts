import type { Chapter } from './manual-types';

export const existingFinalChaptersEn = ([
  {
    index: 8,
    slug: 'output',
    navTitle: 'Output',
    eyebrow: 'SAVE / PREVIEW / COMPARE',
    title: 'Where to find the current PEOPLE / PPL result',
    lede:
      'The active provable output of the saved configuration is FLUX decode 53, written by node 730. HQ / upscale and the final overlay chain exist but are stored in BYPASS.',
    status: 'confirmed',
    statusNote: 'Save nodes, prefixes, formats and bypass modes verified against graph data',
    visual: 'output',
    sections: [
      {
        id: 'active-output',
        eyebrow: '01 · CURRENT WRITE PATH',
        title: 'Current active file: node 53 → node 730',
        paragraphs: [
          'After the PEOPLE composite returns to the main pipeline, the active chain reaches VAEDecode 53. Its image feeds Image Save LQ 730 directly; this is the first place to verify that people survived into the current final frame.',
        ],
        table: {
          columns: ['Node', 'Role', 'Confirmed value'],
          rows: [
            ['53', 'VAEDecode after the main FLUX stage', 'Active upstream for save 730'],
            ['730', 'Image Save LQ', 'JPG · 72 dpi · quality 100'],
            ['Folder', 'Serialized subfolder', 'ph\\[time(%Y-%m-%d)]'],
            ['Prefix', 'Result name', 'ph01_archviz_sdxl2flux_LQ1'],
          ],
        },
        facts: [
          {
            status: 'confirmed',
            title: 'Primary inspection point',
            text: 'In the saved workflow, node 730 is the active write point for the direct result of node 53.',
          },
          {
            status: 'not-confirmed',
            title: 'Specific output file',
            text: 'The workflow JSON does not prove that the current run completed or that a file was actually written to disk.',
          },
        ],
      },
      {
        id: 'output-path',
        eyebrow: '02 · PATH',
        title: 'How to read the path without inventing facts',
        paragraphs: [
          'The JSON stores only the relative folder and prefix. The absolute root depends on the ComfyUI instance that is actually running. The serialized segment and the expected resolution against the standard output directory are therefore documented separately.',
        ],
        codeExamples: [
          {
            title: 'Path stored in node 730',
            label: 'CONFIRMED · serialized values',
            code:
              'folder: ph\\[time(%Y-%m-%d)]\nprefix: ph01_archviz_sdxl2flux_LQ1\nformat: jpg',
          },
          {
            title: 'Expected full template',
            label: 'INFERRED · resolve against active ComfyUI root',
            code:
              '<ACTIVE_COMFYUI_ROOT>\\output\\ph\\<YYYY-MM-DD>\\ph01_archviz_sdxl2flux_LQ1_....jpg',
            note: 'The absolute root is intentionally not filled in; it must be verified against the active ComfyUI instance.',
          },
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Stable serialized segment',
            text: 'ph\\[time(%Y-%m-%d)] + ph01_archviz_sdxl2flux_LQ1 are stored in node 730.',
          },
          {
            status: 'not-confirmed',
            title: 'Absolute filesystem root',
            text: 'The technical archive does not contain a confirmed path to the active ComfyUI output root.',
          },
        ],
      },
      {
        id: 'optional-hq',
        eyebrow: '03 · OPTIONAL HQ',
        title: 'HQ and overlay are a separate route that is currently disabled',
        paragraphs: [
          'UltimateSDUpscale 833 and related sizing / overlay nodes 832–851 are stored in mode 4 (BYPASS). Their save points are documented but are not the current active final.',
        ],
        table: {
          columns: ['Route', 'Output', 'Saved-graph state'],
          rows: [
            ['53 → 834 → 833 → 531', 'ph01_archviz_sdxl2flux_HQ · PNG · 300 dpi', 'BYPASS upstream'],
            ['53 → 833 → 848 → 849 → 293', 'ph01_archviz_sdxl2flux_LQ2 · JPG · 72 dpi', 'BYPASS overlay chain'],
            ['849 → 15', 'Preview FINAL IMAGE', 'Available after the overlay chain is enabled'],
            ['53 / 833 → 141', 'Image Comparer FLUX / UPSCALE', 'Use after HQ is enabled'],
          ],
        },
        facts: [
          {
            status: 'confirmed',
            title: 'Saved mode',
            text: 'Nodes 833, 834 and overlay nodes 832–851 have mode 4 / BYPASS.',
          },
          {
            status: 'not-confirmed',
            title: 'Runtime HQ result',
            text: 'A valid HQ / overlay file requires a separate run with the chain enabled.',
          },
        ],
      },
      {
        id: 'output-comparers',
        eyebrow: '04 · VISUAL CONTROL',
        title: 'Which previews and comparers to inspect before delivery',
        table: {
          columns: ['Node', 'Shows / compares', 'When to use it'],
          rows: [
            ['409', 'Raw PPL decode 829', 'Prove that people were generated'],
            ['480', 'MASK / PPL: 451 vs 459', 'Verify placement and selected composite'],
            ['518', 'Inpaint composite 509 vs source 552', 'Verify INPUT / 3D path'],
            ['72', 'SDXL / FLUX: 779 vs 53', 'Inspect the main FLUX change'],
            ['141', 'FLUX / UPSCALE: 53 vs 833', 'Only after HQ is enabled'],
            ['15', 'Preview FINAL IMAGE from 849', 'Only after the overlay chain is enabled'],
          ],
        },
      },
      {
        id: 'output-proof',
        eyebrow: '05 · DONE CRITERIA',
        title: 'When the output can be considered verified',
        bullets: [
          'People are visible in 409 and match prompt 408.',
          'Comparer 480 shows the correct mask and selected composite.',
          'People remain after main FLUX decode 53.',
          'A file with the LQ1 prefix exists in the current-date folder.',
          'If the HQ chain is enabled manually: 141, 531, 293 and Preview 15 are verified separately.',
        ],
      },
    ],
  },
  {
    index: 9,
    slug: 'diagnostics',
    navTitle: 'Diagnostics',
    eyebrow: 'FAILURE TRACE',
    title: 'Find the stage where people disappear',
    lede:
      'Diagnosis proceeds from upstream to downstream: do not tune a late composite until generation and masking are proven to work.',
    status: 'inferred',
    statusNote: 'The diagnostic order is derived from confirmed preview / comparer nodes',
    visual: 'diagnostics',
    sections: [
      {
        id: 'probe-points',
        eyebrow: '01 · PROBES',
        title: 'Checkpoints already present in the workflow',
        table: {
          columns: ['What to verify', 'Node', 'Interpretation'],
          rows: [
            ['Generated people', '409 ← 829', 'If empty, the problem is upstream of the mask chain'],
            ['Florence result', '113 ← 550', 'Detection should find the intended objects'],
            ['Cut / selected crop', '507 ← 503; 508 ← 522', 'Verify source switch and crop'],
            ['Mask vs PPL', '480 ← 451 / 459', 'Compare placement mask and selected composite'],
            ['Inpaint vs source', '518 ← 509 / 552', 'Compare processed result and selected source'],
            ['Current final save', '730 ← 53', 'Active result point of the saved configuration'],
            ['Optional FLUX vs Upscale', '141 ← 53 / 833', 'HQ / upscale chain is currently stored in bypass'],
            ['Optional final preview', '15 ← 849', 'Check only after enabling the overlay chain'],
          ],
        },
      },
      {
        id: 'symptom-matrix',
        eyebrow: '02 · SYMPTOM MATRIX',
        title: 'Symptom → likely failure area',
        table: {
          columns: ['Last working stage', 'Most likely failure', 'Next test'],
          rows: [
            ['No people in 409', 'Prompt / model / sampler', 'Check 408 → 831 → 828 → 829'],
            ['Florence shows every box, SAM2 leaves one person', 'Sam2Segmentation multi-BBOX mode', 'Enable individual_objects and repeat with the same indices'],
            ['Mask lands on a building, corner or empty region', 'Florence2 and SAM2 received different images/canvases', 'Feed the same-size source into detection and segmentation'],
            ['409 works, mask is wrong', '550 / 114 / 115 / 144 / 146', 'Simplify classes and inspect the edge'],
            ['Mask is good, cutout is dirty', '420 / 422 / 430', 'Inspect crop and RemBg outputs'],
            ['Composite exists, 459 selects the wrong result', '543 / linked selector inputs', 'Verify effective value = 1'],
            ['730 contains people, final 15 loses them after HQ is enabled', 'Upscale / overlay / late overwrite', 'Compare 141, 730 and 15'],
          ],
        },
      },
      {
        id: 'current-hypothesis',
        eyebrow: '03 · CURRENT CASE',
        title: 'What is known about the current case',
        facts: [
          {
            status: 'confirmed',
            title: 'Topology',
            text: 'The PPL branch reaches the final output; there is no broken link after node 459.',
          },
          {
            status: 'inferred',
            title: 'Likely area',
            text: 'If generation and mask are visibly present, investigate positioning, composite, selector output or a later overwrite.',
          },
          {
            status: 'not-confirmed',
            title: 'Exact failure node',
            text: 'Without a current set of runtime previews, naming one guilty node would not be justified.',
          },
        ],
      },
    ],
  },
  {
    index: 10,
    slug: 'checklist',
    navTitle: 'Checklist',
    eyebrow: 'PRE-FLIGHT',
    title: 'PEOPLE pre-final checklist',
    lede:
      'Check each item as it is verified. Progress is stored only in this browser and does not modify the workflow.',
    status: 'inferred',
    statusNote: 'Practical order assembled from confirmed checkpoints',
    visual: 'checklist',
    sections: [
      {
        id: 'how-to-use',
        eyebrow: '01 · RULE',
        title: 'One stage — one piece of evidence',
        paragraphs: [
          'Do not mark an item by looking only at the final frame. For every step, open the specified preview / comparer and verify that its output matches the expected state.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Workflow remains read-only',
            text: 'The checklist operates inside the site and writes nothing to the ComfyUI JSON.',
          },
          {
            status: 'inferred',
            title: 'Best practice',
            text: 'Keep one seed during diagnosis so routing problems are not confused with generation variability.',
          },
        ],
      },
      {
        id: 'completion',
        eyebrow: '02 · DONE CRITERIA',
        title: 'When the branch is genuinely ready',
        bullets: [
          'People are readable in Preview 409.',
          'The mask covers the figure and has a clean edge.',
          'The cutout matches the scene tonally.',
          'Node 543 selects the expected mode.',
          'Node 459 returns a composite containing people.',
          'In the current configuration, Save 730 contains people; after enabling the HQ chain, final 15 is checked separately.',
        ],
      },
    ],
  },
  {
    index: 11,
    slug: 'examples',
    navTitle: 'Examples',
    eyebrow: 'VISUAL EXAMPLES',
    title: 'React atlas and practical scenarios',
    lede:
      'Three source infographics are reconstructed as responsive React blocks: overall logic, stage responsibilities, visual checks and diagnostic order.',
    status: 'inferred',
    statusNote: 'React diagrams explain confirmed topology; examples do not replace runtime preview',
    visual: 'examples',
    sections: [
      {
        id: 'scenario-old-city',
        eyebrow: '01 · SCENARIO',
        title: 'Old stone city',
        paragraphs: [
          'Current prompt 408 is aligned with this scene: a few residents, long beige clothing, small and medium-scale figures, and warm evening light.',
        ],
        codeExamples: [
          {
            title: 'Current prompt',
            label: 'CONFIRMED · node 408',
            code:
              'a few Middle Eastern townspeople wearing long beige robes and simple head coverings, naturally walking and standing in an old stone city square, realistic proportions, small and medium scale figures, candid documentary look, visually integrated into the scene, warm evening light',
          },
          {
            title: 'Variant: museum / contemporary gallery',
            label: 'INFERRED · example',
            code:
              'a few museum visitors in understated neutral clothing, full body, small and medium scale, naturally walking and pausing near exhibits, candid documentary look, correct perspective, clean silhouettes, soft indoor ambient light',
          },
        ],
      },
      {
        id: 'how-to-read-images',
        eyebrow: '02 · IMAGE GUIDE',
        title: 'What is simplified in the React reconstruction',
        facts: [
          {
            status: 'confirmed',
            title: '408 / 543 / 715',
            text: 'The roles of the key nodes are preserved without modification.',
          },
          {
            status: 'inferred',
            title: 'Icons and example images',
            text: 'They are an explanatory model of the process, not screenshots of actual execution for every node.',
          },
          {
            status: 'not-confirmed',
            title: 'Specific people in illustrations',
            text: 'The examples do not prove the result of the current seed or the current machine.',
          },
        ],
      },
    ],
  },
  {
    index: 12,
    slug: 'resources',
    navTitle: 'Resources',
    eyebrow: 'SOURCE FILES',
    title: 'Repositories, diagrams and source documents',
    lede:
      'All links point either to upstream projects or to files extracted from the current technical archive.',
    status: 'confirmed',
    statusNote: 'External URLs were verified against official sources on 3 September 2026',
    visual: 'resources',
    sections: [
      {
        id: 'upstream',
        eyebrow: '01 · UPSTREAM',
        title: 'Projects and documentation',
        paragraphs: [
          'ComfyUI is the base platform. rgthree-comfy and ComfyUI-Logic are relevant only where their specific nodes are used. Graphviz is used to produce documentation diagrams and does not execute the PEOPLE branch.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'ComfyUI canonical repo',
            text: 'The old comfyanonymous/ComfyUI address redirects to Comfy-Org/ComfyUI.',
          },
          {
            status: 'confirmed',
            title: 'ComfyUI-Logic archive',
            text: 'theUpsider/ComfyUI-Logic was archived on 13 June 2025 and is marked unmaintained.',
          },
        ],
      },
      {
        id: 'downloads',
        eyebrow: '02 · DOWNLOADS',
        title: 'Technical workflow source package',
        paragraphs: [
          'The current ZIP contains 24 files: 16 Markdown chapters, two CSV tables, a JSON specification, DOT source and four SVG maps. 17_AUDIT_ERRATA.md and 18_WORKFLOW_MODEL_MANIFEST.md were added on top of the original 22-file audit; documents 01–16 were not rewritten.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Derived specification bundled',
            text: 'HANSEN_WORKFLOW_SPEC.json, two CSV tables and four SVG maps are available for download.',
          },
          {
            status: 'not-confirmed',
            title: 'Raw workflow absent from bundle',
            text: 'Epspoziciya_archviz_ph_sdxlflux_v001.json is not present in the current workspace and was not added to the ZIP. The source-of-truth filename is known, but the raw JSON must be supplied separately.',
          },
        ],
      },
      {
        id: 'provenance',
        eyebrow: '03 · PROVENANCE',
        title: 'What counts as current',
        facts: [
          {
            status: 'confirmed',
            title: 'Only current source',
            text: 'Epspoziciya_archviz_ph_sdxlflux_v001.json.',
          },
          {
            status: 'confirmed',
            title: 'Historical reference only',
            text: 'BEST / RU2EN / FINAL_CLEAN and other earlier Hansen copies.',
          },
          {
            status: 'not-confirmed',
            title: 'Future drift',
            text: 'After the workflow changes, the manual must be rebuilt because stored node IDs and links may become stale.',
          },
        ],
      },
    ],
  },
] satisfies Omit<Chapter, 'category'>[]).sort((a, b) => a.index - b.index);
