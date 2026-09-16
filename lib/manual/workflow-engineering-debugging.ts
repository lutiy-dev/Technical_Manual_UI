import type { Chapter } from '../manual-types';

export const workflowEngineeringDebuggingChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-debugging',
    navTitle: 'Checkpoints & Debugging',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'Checkpoints & Debugging — как находить последний доказуемо корректный этап',
    lede:
      'Большой workflow нельзя диагностировать по финальной картинке. Надёжная отладка строится как лестница checkpoints: после каждого смыслового модуля должен существовать наблюдаемый результат, позволяющий доказать, где именно pipeline перестал быть корректным.',
    status: 'confirmed',
    statusNote:
      'Метод соответствует уже документированным probes Hansen: preprocessors, SDXL, masks, PEOPLE, main FLUX и output имеют промежуточные preview/comparer точки.',
    visual: 'diagnostics',
    category: 'workflow-engineering',
    stage: 'debugging',
    relatedChapters: [
      'workflow-engineering-module-contracts',
      'workflow-engineering-coordinates-batch',
      'diagnostics',
      'checklist',
      'workflow-engineering-reproducibility',
    ],
    sections: [
      {
        id: 'observability',
        eyebrow: '01 · OBSERVABILITY',
        title: 'Если модуль нельзя наблюдать отдельно, его трудно отлаживать',
        paragraphs: [
          'PreviewImage, MaskPreview, comparer, text/json preview и save probes — это не декоративные элементы. Они создают observability: возможность проверить состояние данных до того, как они смешались со следующей системой.',
          'Чем длиннее цепочка без checkpoint, тем больше потенциальных причин одной и той же финальной ошибки.',
        ],
        codeExamples: [
          {
            title: 'Правило наблюдаемого модуля',
            label: 'DEBUG ARCHITECTURE',
            code:
              'INPUT\n' +
              '→ PROCESS\n' +
              '→ CHECKPOINT\n' +
              '→ RETURN / NEXT MODULE',
          },
        ],
      },
      {
        id: 'last-good-stage',
        eyebrow: '02 · LAST GOOD STAGE',
        title: 'Главный вопрос отладки: где последний правильный результат?',
        paragraphs: [
          'Не начинай с вопроса «почему финал плохой?». Начинай с конца и двигайся upstream до последнего checkpoint, который выглядит и структурно ведёт себя правильно.',
          'Следующий после него stage становится первым подозреваемым. Так search space сокращается с сотен нод до одной ветки.',
        ],
        codeExamples: [
          {
            title: 'Диагностический алгоритм',
            label: 'BINARY-LIKE TRACE',
            code:
              'FINAL WRONG\n' +
              '→ CHECK PREVIOUS CHECKPOINT\n' +
              '→ IF GOOD: fault is downstream\n' +
              '→ IF BAD: continue upstream\n' +
              '→ FIND LAST GOOD STAGE',
          },
        ],
      },
      {
        id: 'checkpoint-types',
        eyebrow: '03 · CHECKPOINT TYPES',
        title: 'Разным типам данных нужны разные probes',
        table: {
          columns: ['Data', 'Checkpoint', 'Что проверяем'],
          rows: [
            ['IMAGE', 'PreviewImage / comparer', 'pixels, composition, color, geometry'],
            ['MASK', 'MaskPreview', 'silhouette, polarity, holes, bounds'],
            ['BBOX / JSON', 'text/json preview', 'coordinates, count, labels'],
            ['STRING', 'text preview', 'собранный prompt / control text'],
            ['LATENT', 'обычно decode-only debug path', 'визуальный результат после VAE Decode'],
            ['OUTPUT FILE', 'SaveImage + actual file check', 'действительно ли delivery path сработал'],
          ],
        },
      },
      {
        id: 'debug-ladder',
        eyebrow: '04 · DEBUG LADDER',
        title: 'Проверять нужно в порядке зависимостей',
        codeExamples: [
          {
            title: 'Archviz debug ladder',
            label: 'PRODUCTION ORDER',
            code:
              'INPUT\n' +
              '→ PREPROCESSORS\n' +
              '→ BASE GENERATION\n' +
              '→ MASKS / DETAIL\n' +
              '→ PEOPLE / LOCAL MODULES\n' +
              '→ MAIN FLUX\n' +
              '→ UPSCALE / OUTPUT',
            note: 'Если upstream checkpoint неверен, downstream диагностика временно не имеет смысла.',
          },
        ],
      },
      {
        id: 'minimal-runtime',
        eyebrow: '05 · MINIMAL REPRODUCTION',
        title: 'Для ошибки включай минимальный набор модулей',
        paragraphs: [
          'BASE CONFIG должен позволять выключить всё, что не требуется для воспроизведения проблемы. Если тестируется SAM2 mask, не нужно одновременно считать main FLUX и upscale.',
          'Минимальный runtime ускоряет iteration и снижает вероятность, что побочный branch скрывает настоящий источник проблемы.',
        ],
      },
      {
        id: 'error-classification',
        eyebrow: '06 · ERROR CLASSIFICATION',
        title: 'Сначала классифицируй ошибку, потом меняй параметры',
        table: {
          columns: ['Класс', 'Примеры', 'Первое действие'],
          rows: [
            ['Dependency', 'missing node / model / loader', 'Проверить manifest и paths'],
            ['Type contract', 'IMAGE vs LATENT / missing CONDITIONING', 'Проверить socket types'],
            ['Spatial contract', 'mask shift / bbox mismatch', 'Проверить W×H и coordinate space'],
            ['Batch contract', 'index out of bounds / cardinality mismatch', 'Проверить batch counts'],
            ['Routing', 'не тот source / ветка не влияет', 'Проверить selector + bypass'],
            ['Generation quality', 'анатомия / материал / prompt mismatch', 'Только после технического preflight менять AI parameters'],
          ],
        },
      },
      {
        id: 'dont-tune-blind',
        eyebrow: '07 · ANTI-PATTERN',
        title: 'Не лечить topology параметрами генерации',
        paragraphs: [
          'Если маска смещена из-за resize, изменение denoise не поможет. Если selector выбрал другой source, prompt не исправит маршрут. Если CLIP input отсутствует, CFG не имеет значения.',
          'Production debugging начинается с architecture/data contracts и только после этого переходит к generation tuning.',
        ],
      },
      {
        id: 'debug-record',
        eyebrow: '08 · DEBUG RECORD',
        title: 'Для повторяемой диагностики сохраняй состояние теста',
        bullets: [
          'Какой input использован.',
          'Какие modules включены в BASE CONFIG.',
          'Effective selector values.',
          'Seed и sampling parameters.',
          'Размеры и batch на проблемном участке.',
          'Последний корректный checkpoint.',
          'Точный error message / node ID.',
        ],
      },
      {
        id: 'practice',
        eyebrow: '09 · PRACTICE',
        title: 'Практика: сломать ветку специально и локализовать ошибку',
        paragraphs: [
          'Возьми небольшой standalone workflow с тремя checkpoints. Осознанно измени один contract — например, selector source или mask size. Не исправляй сразу. Пройди debug ladder и зафиксируй, на каком checkpoint впервые появляется расхождение.',
        ],
        facts: [
          {
            status: 'inferred',
            title: 'Критерий готовности',
            text: 'Ученик освоил debugging, когда может назвать последний корректный stage и класс ошибки до того, как начинает менять prompt или sampler.',
          },
        ],
      },
    ],
  },
];
