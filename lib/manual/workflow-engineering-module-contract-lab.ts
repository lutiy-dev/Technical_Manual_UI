import type { Chapter } from '../manual-types';

export const workflowEngineeringModuleContractLabChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-module-contract-lab',
    navTitle: 'LAB 03 · Module Contract',
    eyebrow: 'PRACTICE LAB · WORKFLOW ENGINEERING',
    title: 'Module Contract Lab: INPUT → PROCESS → CHECKPOINT → RETURN',
    lede:
      'Третий практикум превращает группу из визуальной рамки в инженерный модуль. Мы соберём маленькую ветку только на core ComfyUI nodes и явно зададим её input contract, responsibility, checkpoint и return point.',
    status: 'confirmed',
    statusNote:
      'Для лаборатории используются базовые типы IMAGE и core nodes LoadImage, ImageInvert и PreviewImage. Генеративные модели не нужны: внимание остаётся на границах модуля и data contract.',
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
        title: 'Научиться видеть границу ответственности',
        paragraphs: [
          'В больших workflow одна из главных причин хаоса — неясно, где заканчивается одна задача и начинается следующая. LAB 03 заставляет провести эту границу буквально на canvas.',
          'После упражнения ты должен уметь взять любую ветку Hansen и сформулировать: что она получает, что делает, где проверяется и что официально возвращает в Master Workflow.',
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
        title: 'Минимальный IMAGE-модуль без моделей',
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
            note: 'LOCAL CHECKPOINT и MASTER OUTPUT получают один и тот же результат, но выполняют разные архитектурные роли.',
          },
        ],
        bullets: [
          'LoadImage оставь вне MODULE_01_INVERT: это upstream / Master Input.',
          'ImageInvert помести внутрь группы MODULE_01_INVERT.',
          'Первый PreviewImage помести внутрь группы и подпиши CHECKPOINT · MODULE RESULT.',
          'Второй PreviewImage оставь снаружи и подпиши MASTER DOWNSTREAM / OUTPUT.',
          'Один IMAGE output ImageInvert подключи одновременно к локальному checkpoint и downstream output.',
        ],
      },
      {
        id: 'input-contract',
        eyebrow: '03 · INPUT CONTRACT',
        title: 'Запиши contract до запуска',
        table: {
          columns: ['Поле', 'LAB 03'],
          rows: [
            ['Required input', 'IMAGE'],
            ['Source', 'MASTER INPUT · LoadImage'],
            ['Dimensions', 'принимаются от source image'],
            ['Batch', 'передаётся вместе с IMAGE tensor'],
            ['Coordinate space', 'тот же canvas, что у входного IMAGE'],
            ['Optional inputs', 'нет'],
          ],
        },
        facts: [
          {
            status: 'confirmed',
            title: 'Почему это contract',
            text: 'Модуль не имеет права скрыто требовать prompt, model, seed или mask. Его единственная внешняя зависимость в этой лаборатории — IMAGE.',
          },
        ],
      },
      {
        id: 'responsibility',
        eyebrow: '04 · ONE RESPONSIBILITY',
        title: 'Сформулируй задачу одной строкой',
        paragraphs: [
          'Ответственность MODULE_01_INVERT: принять IMAGE и вернуть инвертированный IMAGE. Всё. Он не загружает файл, не сохраняет delivery result, не выбирает route и не управляет другими группами.',
          'Если описание модуля требует длинного предложения с несколькими независимыми задачами, граница, скорее всего, проведена плохо.',
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
        title: 'Checkpoint доказывает исправность модуля до downstream',
        paragraphs: [
          'Запусти workflow и сначала смотри только LOCAL CHECKPOINT. Не оценивай MASTER OUTPUT, пока локальный результат не доказан.',
          'Это очень простое правило позже спасает часы в PPL, masks и main FLUX: локальная ветка должна уметь доказать собственный результат независимо от того, что происходит после return.',
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
        title: 'Return — это граница, а не обязательно отдельная нода',
        paragraphs: [
          'В LAB 03 return point — IMAGE link, который пересекает правую границу MODULE_01_INVERT и идёт в MASTER OUTPUT. Отдельная Return node не обязательна: важна однозначность интерфейса.',
          'В большом production graph return полезно дополнительно маркировать reroute/label/note, особенно если module extraction планируется как standalone JSON.',
        ],
        table: {
          columns: ['Return field', 'LAB 03'],
          rows: [
            ['Type', 'IMAGE'],
            ['Meaning', 'Processed module result'],
            ['Canvas', 'same logical image canvas as input'],
            ['Downstream assumption', 'получатель не должен знать внутреннюю реализацию module'],
          ],
        },
      },
      {
        id: 'replacement-test',
        eyebrow: '07 · EXPERIMENT A',
        title: 'Replacement test: модуль должен быть заменяемым',
        paragraphs: [
          'Создай вторую группу MODULE_02_PASS_THROUGH. Её задача — вернуть исходный IMAGE без изменения. Затем поставь selector после двух module outputs и переключай MODULE_01_INVERT / MODULE_02_PASS_THROUGH.',
          'Если downstream продолжает принимать один и тот же contract IMAGE, значит modules совместимы на уровне интерфейса, даже если делают совершенно разную внутреннюю работу.',
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
        title: 'Поймай hidden dependency специально',
        paragraphs: [
          'Добавь внутрь MODULE_01 ещё один внешний control или source, но не вписывай его в contract. Теперь попробуй мысленно вырезать группу в standalone workflow. Сразу становится видно: branch уже не автономен.',
          'Затем исправь contract: либо добавь dependency как явный module input, либо перенеси нужный control внутрь модуля. Это ровно тот аудит, который понадобится при extraction Hansen branches.',
        ],
      },
      {
        id: 'hansen-transfer',
        eyebrow: '09 · TRANSFER TO HANSEN',
        title: 'Как этим читать любую ветку Hansen',
        table: {
          columns: ['LAB 03 вопрос', 'Пример production branch'],
          rows: [
            ['INPUT CONTRACT?', 'BASE IMAGE / MASK / MODEL / prompt / controls'],
            ['ONE RESPONSIBILITY?', 'например Generate Person или Segment Person'],
            ['LOCAL CHECKPOINT?', 'raw generation / bbox / mask / clean cutout / composite'],
            ['RETURN CONTRACT?', 'IMAGE / MASK / LATENT, который возвращается downstream'],
            ['HIDDEN DEPENDENCIES?', 'shared seed, size, selector, loader, prompt fragment'],
          ],
        },
      },
      {
        id: 'pass',
        eyebrow: '10 · PASS CRITERIA',
        title: 'LAB 03 пройден, если ты можешь спроектировать модуль до нод',
        bullets: [
          'Ты сначала пишешь responsibility и contracts, а потом выбираешь nodes.',
          'Ты отличаешь локальный checkpoint от финального Master output.',
          'Ты можешь показать точный return point на canvas.',
          'Ты умеешь найти incoming links, пересекающие границу module.',
          'Ты понимаешь, почему два разных modules могут быть взаимозаменяемыми при одинаковом contract.',
          'Ты можешь объяснить, почему hidden dependency ломает standalone extraction.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'После трёх LAB',
            text: 'LAB 01 учит route selection; LAB 02 — centralized group control; LAB 03 — module boundaries. Вместе они дают минимальный практический фундамент для чтения Hansen production graph.',
          },
        ],
      },
    ],
  },
];
