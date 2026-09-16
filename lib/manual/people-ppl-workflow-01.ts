import type { Chapter } from '../manual-types';

export const peoplePplWorkflow01Chapters: Chapter[] = [
  {
    index: 0,
    slug: 'ppl-workflow-01-generate-place',
    navTitle: 'PPL Workflow 01 · Generate & Place',
    eyebrow: 'PEOPLE / PPL · WORKFLOW 01',
    title: 'Generate & Place New People by Mask — новый человек отдельно, placement отдельно',
    lede:
      'Workflow 01 нужен, когда подходящего человека ещё нет в base render. Персонаж генерируется отдельно, segmentation превращает его в чистый compositing element, а scene placement mask определяет, куда он попадёт в архитектурный кадр.',
    status: 'confirmed',
    statusNote:
      'Generation, segmentation, preparation, first composite и return topology подтверждены source documentation по Epspoziciya_archviz_ph_sdxlflux_v001. Standalone JSON намеренно не публикуется как «готовый», пока нет сырого source workflow с полными serialized schemas для безопасной extraction.',
    visual: 'composite',
    category: 'people-ppl',
    stage: 'ppl-generate-place',
    relatedNodes: [
      53, 54, 57, 58, 60, 61, 64, 67, 107, 112, 114, 115, 144, 146, 408,
      409, 420, 422, 429, 430, 449, 451, 459, 466, 467, 475, 477, 543, 550,
      552, 573, 672, 715, 717, 730, 771, 779, 780, 781, 819, 820, 823, 824,
      825, 826, 827, 828, 829, 830, 831,
    ],
    relatedChapters: [
      'node-408-prompt',
      'generation',
      'segmentation-mask',
      'preparation-color-match',
      'positioning',
      'ppl-workflow-02-replace-existing',
      'selector-logic',
      'composite',
      'main-flux',
    ],
    sections: [
      {
        id: 'role',
        eyebrow: '01 · ROLE',
        title: 'Когда использовать Workflow 01',
        paragraphs: [
          'Этот режим нужен, когда нужного человека нет в исходной 3D/Corona сцене и stock / 3D asset не даёт нужную эпоху, одежду, позу или character type. AI создаёт person asset отдельно от архитектуры.',
          'Архитектура не должна генерироваться вместе с персонажем. Сначала создаётся человек как отдельный image asset, затем он изолируется, подготавливается и только после этого вставляется в утверждённый scene canvas.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Core principle',
            text: 'PPL FLUX generation node 829 существует как отдельный decoded image before composite; main architecture scene входит позже на paste stage.',
          },
          {
            status: 'inferred',
            title: 'Production value',
            text: 'Разделение person generation и architecture canvas уменьшает риск случайного изменения фасада, перспективы и композиции.',
          },
        ],
      },
      {
        id: 'workflow01-vs-02',
        eyebrow: '02 · WORKFLOW 01 VS 02',
        title: 'Главное различие двух PEOPLE workflows',
        table: {
          columns: ['Workflow', 'Кто определяет placement', 'AI responsibility'],
          rows: [
            ['01 · Generate & Place', 'Scene placement mask / target region', 'Создать нового человека, очистить и разместить'],
            ['02 · Replace Existing', 'Уже существующий 3D / rendered person', 'Улучшить или заменить человека в том же spatial slot'],
          ],
        },
        facts: [
          {
            status: 'confirmed',
            title: 'Не смешивать',
            text: 'Workflow 01 и Workflow 02 используют похожие generation / segmentation / preparation инструменты, но имеют разный spatial contract.',
          },
        ],
      },
      {
        id: 'full-route',
        eyebrow: '03 · FULL ROUTE',
        title: 'Полный production route Workflow 01',
        codeExamples: [
          {
            title: 'Generate separately → isolate cleanly → place locally → refine globally',
            label: 'PPL WORKFLOW 01',
            code:
              'PPL Prompt 408\n' +
              '→ prompt assembly 823 / 824 / 820\n' +
              '→ CLIP encode 831\n' +
              '→ FluxGuidance 830\n' +
              '→ guider / scheduler / sampler 826 / 819 / 828\n' +
              '→ FLUX person decode 829\n' +
              '→ People source selector 552\n' +
              '→ resize / detection canvas 780\n' +
              '→ Florence2 550\n' +
              '→ coordinates 114\n' +
              '→ SAM2 115\n' +
              '→ grow / blur 144 / 146\n' +
              '→ crop 420 / 781\n' +
              '→ Remove BG 422\n' +
              '→ Color Match 477\n' +
              '→ Cut By Mask 449\n' +
              '→ placement input 451 + base scene 779\n' +
              '→ Paste By Mask 429\n' +
              '→ RGB 672\n' +
              '→ PPL selector 459\n' +
              '→ detail transfer 573\n' +
              '→ main FLUX encode / sample / decode 67 / 57 / 53\n' +
              '→ active LQ save 730',
            note: 'Main FLUX после 459 — уже MASTER WORKFLOW refinement; standalone PPL module логически заканчивается на composite / return перед этим boundary.',
          },
        ],
      },
      {
        id: 'generate',
        eyebrow: '04 · GENERATE PERSON',
        title: 'Person сначала рождается как отдельный FLUX image',
        table: {
          columns: ['Stage', 'Nodes', 'Function'],
          rows: [
            ['Prompt', '825 + 408 + 799 + 800 + 822', 'Person + environment/light/style context'],
            ['Assembly', '823 → 824 → 820', 'Собрать final PPL text'],
            ['Encode', '831 → 830', 'CLIP conditioning + FluxGuidance 2.1'],
            ['Sample', '826 + 819 + 827 + 61 + 58 → 828', 'Отдельная person generation'],
            ['Decode', '829', 'Person image before segmentation'],
            ['Checkpoint', '409', 'Проверить person до mask / composite'],
          ],
        },
        bullets: [
          'Если person уже плох на Preview 409 — не переходить к mask/composite.',
          'Prompt должен описывать full body, scale, action, clothing и light context.',
          'На этом этапе placement в архитектурной сцене ещё не решается.',
        ],
      },
      {
        id: 'isolate',
        eyebrow: '05 · ISOLATE PERSON',
        title: 'Florence2 отвечает WHERE, SAM2 — WHAT EXACTLY',
        paragraphs: [
          'Generated person проходит через People source selector 552 и приводится к detection canvas 780. Florence2 550 выполняет phrase grounding, 114 переводит detection в coordinates, SAM2 115 строит pixel mask.',
          'Дальше mask расширяется и смягчается nodes 144 / 146, после чего 420/781 формируют crop для подготовки compositing element.',
        ],
        codeExamples: [
          {
            title: 'Segmentation chain',
            label: 'PERSON MASK',
            code:
              '829 person image\n' +
              '→ 552 source selector\n' +
              '→ 780 resize\n' +
              '→ 550 Florence2\n' +
              '→ 114 coordinates\n' +
              '→ 115 SAM2\n' +
              '→ 144 Grow\n' +
              '→ 146 Blur\n' +
              '→ PERSON MASK',
          },
        ],
        bullets: [
          'Florence2 и SAM2 должны работать в одном coordinate space.',
          'Person Mask должна описывать фигуру, а не будущую позицию в scene.',
          'Batch cardinality image / bbox / masks должна быть согласована до дальнейшей обработки.',
        ],
      },
      {
        id: 'two-masks',
        eyebrow: '06 · TWO-MASK PRINCIPLE',
        title: 'Person Mask ≠ Placement Mask',
        table: {
          columns: ['Mask', 'Вопрос', 'Responsibility'],
          rows: [
            ['Person Mask', 'WHAT TO TAKE?', 'Выделить generated person для crop / alpha / cutout'],
            ['Placement Mask / placement input', 'WHERE TO PUT?', 'Определить target region / spatial placement в base scene'],
          ],
        },
        paragraphs: [
          'Это центральная идея Workflow 01. Маска, которой мы вырезаем человека, и маска/placement input, определяющая место человека в сцене, выполняют разные роли и не должны концептуально сливаться в одну сущность.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'First composite topology',
            text: 'Paste By Mask 429 получает отдельные upstream inputs от 451, prepared person 449 и base scene 779.',
          },
          {
            status: 'not-confirmed',
            title: 'Exact semantic source of 451',
            text: 'Source documentation подтверждает incoming topology 451 → 429, но без raw workflow export в текущих assets не публикуем самостоятельный JSON с неподтверждённой сериализацией этого placement input.',
          },
        ],
      },
      {
        id: 'prepare',
        eyebrow: '07 · PREPARE CUTOUT',
        title: 'Generated image превращается в compositing element',
        table: {
          columns: ['Node', 'Role', 'QC'],
          rows: [
            ['420 / 781', 'Crop by person mask', 'Фигура целиком внутри crop'],
            ['422', 'Remove Background / Inspyrenet', 'Нет halo и остатков generated background'],
            ['477', 'Color Match', 'Tone/contrast ближе к base scene'],
            ['449', 'Cut By Mask', 'RGB и alpha/mask согласованы'],
          ],
        },
        paragraphs: [
          'Color Match помогает интеграции, но не заменяет правильный lighting prompt. Неверное направление света нельзя исправить одной цветовой коррекцией.',
        ],
      },
      {
        id: 'place',
        eyebrow: '08 · PLACE LOCALLY',
        title: 'Node 429 — граница между person asset и architectural scene',
        paragraphs: [
          'Paste By Mask 429 получает prepared person 449, base scene 779 и отдельный placement-related input 451. Stored mode keep_ratio_fit показывает, что scale/fit является частью composite behavior.',
          'После 429 output проходит 672 и попадает в image1 selector 459. Именно здесь отдельный person asset снова становится частью master scene data plane.',
        ],
        codeExamples: [
          {
            title: 'First composite',
            label: 'MODULE RETURN',
            code:
              'BASE SCENE 779\n' +
              '+ PREPARED PERSON 449\n' +
              '+ PLACEMENT INPUT 451\n' +
              '→ Paste By Mask 429\n' +
              '→ RGB 672\n' +
              '→ PPL selector 459',
          },
        ],
      },
      {
        id: 'refine',
        eyebrow: '09 · REFINE GLOBALLY',
        title: 'После PPL return человек проходит общий master refinement',
        paragraphs: [
          'Selector 459 возвращает composited scene в основной pipeline. Затем 573 выполняет detail transfer, 67 кодирует result в latent, 57 выполняет main FLUX sampling и 53 декодирует итог.',
          'Эта часть полезна для seamless integration, но методически должна быть отделена от standalone PPL module: человек должен быть уже корректно размещён до входа в main FLUX.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Active return',
            text: '459 → 573 → 67 → 57 → 53; node 53 имеет active LQ save route to 730.',
          },
        ],
      },
      {
        id: 'checkpoints',
        eyebrow: '10 · CHECKPOINTS',
        title: 'Пять точек, где останавливаемся и доказываем результат',
        table: {
          columns: ['Checkpoint', 'Что должно быть доказано'],
          rows: [
            ['A · 409 / after 829', 'Person generation сама по себе корректна'],
            ['B · after 115 / 146', 'Person Mask чистая и соответствует нужной фигуре'],
            ['C · after 422 / 449', 'Cutout чистый, без halo, alpha согласована'],
            ['D · after 429 / 672', 'Scale, position и scene composite корректны'],
            ['E · 53 / 730', 'Main FLUX refinement не сломал человека и архитектуру'],
          ],
        },
      },
      {
        id: 'archviz-value',
        eyebrow: '11 · ARCHVIZ VALUE',
        title: 'Почему этот workflow особенно ценен для исторических и нестандартных сцен',
        bullets: [
          'Можно создать персонажа нужной эпохи, которого нет в stock library.',
          'Можно согласовать одежду, действие и visual language с конкретной архитектурой.',
          'Architecture base остаётся отдельным утверждённым source.',
          'Ошибку person generation можно исправлять независимо от main scene.',
          'Placement можно контролировать локально вместо full-frame regeneration.',
        ],
      },
      {
        id: 'production-checklist',
        eyebrow: '12 · PRODUCTION CHECKLIST',
        title: 'Workflow 01 считается готовым к Master только после этих проверок',
        bullets: [
          'Generated person читается как full body и соответствует нужной роли.',
          'Person Mask и Placement Mask не перепутаны.',
          'Florence2 / SAM2 используют согласованный source size / coordinate space.',
          'Crop не обрезает конечности и аксессуары.',
          'Remove BG не оставляет halo.',
          'Color Match не скрывает ошибку lighting direction.',
          'Paste сохраняет правдоподобный scale относительно горизонта и архитектуры.',
          'Ступни имеют корректный contact with ground; нет floating.',
          'Occlusion относительно архитектуры выглядит физически правдоподобно.',
          'Main FLUX refinement не меняет утверждённую геометрию scene.',
        ],
      },
      {
        id: 'standalone-contract',
        eyebrow: '13 · STANDALONE JSON CONTRACT',
        title: 'Что войдёт в независимый учебный JSON и где он должен закончиться',
        codeExamples: [
          {
            title: 'Standalone module boundary',
            label: 'PPL W01 LAB',
            code:
              'LOCAL LOADERS / INPUTS\n' +
              '→ PPL GENERATE\n' +
              '→ PERSON SEGMENTATION\n' +
              '→ PREPARE CUTOUT\n' +
              '→ BASE SCENE + PLACEMENT INPUT\n' +
              '→ COMPOSITE CHECKPOINT\n' +
              '→ RETURN IMAGE\n' +
              '----- MASTER WORKFLOW ONLY -----\n' +
              '→ MAIN FLUX REFINEMENT',
            note: 'Standalone JSON не должен тащить весь Master. Все external dependencies должны стать локальными inputs/loaders/controls.',
          },
        ],
        facts: [
          {
            status: 'not-confirmed',
            title: 'Почему JSON ещё не публикуем',
            text: 'В текущих repository / Library assets нет raw Epspoziciya_archviz_ph_sdxlflux_v001.json с полной сериализацией custom nodes. По нашему правилу нельзя выдавать реконструированный pseudo-JSON как импортируемый workflow.',
          },
        ],
      },
      {
        id: 'pass',
        eyebrow: '14 · PASS CRITERIA',
        title: 'Workflow 01 понят, когда ты можешь объяснить его одной фразой',
        codeExamples: [
          {
            title: 'The sentence',
            label: 'MEMORY MODEL',
            code:
              'GENERATE SEPARATELY\n' +
              '→ ISOLATE CLEANLY\n' +
              '→ PLACE LOCALLY\n' +
              '→ REFINE GLOBALLY',
          },
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Spatial rule',
            text: 'Workflow 01: placement определяется target region / placement input. Workflow 02: placement определяется уже существующим человеком.',
          },
        ],
      },
    ],
  },
];
