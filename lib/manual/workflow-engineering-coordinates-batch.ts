import type { Chapter } from '../manual-types';

export const workflowEngineeringCoordinatesBatchChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-coordinates-batch',
    navTitle: 'Coordinates & Batch Semantics',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'Resolution, Coordinate Space & Batch Semantics — скрытая геометрия графа',
    lede:
      'Большая часть труднообъяснимых ошибок в production ComfyUI возникает не из-за модели, а из-за несовпадения размеров, coordinate space или batch cardinality. Этот раздел учит проверять геометрию данных до запуска тяжёлых генеративных стадий.',
    status: 'confirmed',
    statusNote:
      'Раздел опирается на реальные size/batch contracts Hansen и на подтверждённый тип ошибки Florence2 → SAM2, где cardinality bbox и image batch расходилась.',
    visual: 'inputs',
    category: 'workflow-engineering',
    stage: 'coordinates-batch',
    relatedChapters: [
      'workflow-engineering-module-contracts',
      'inputs',
      'segmentation-masks',
      'segmentation-mask',
    ],
    sections: [
      {
        id: 'three-contracts',
        eyebrow: '01 · THREE CONTRACTS',
        title: 'Перед соединением веток нужно проверить размер, координаты и cardinality',
        codeExamples: [
          {
            title: 'Минимальный spatial contract',
            label: 'PRE-FLIGHT',
            code:
              'DIMENSIONS\n' +
              '+ COORDINATE SPACE\n' +
              '+ BATCH CARDINALITY\n' +
              '→ SAFE DOWNSTREAM PROCESSING',
          },
        ],
      },
      {
        id: 'dimensions',
        eyebrow: '02 · DIMENSIONS',
        title: 'Одинаковый визуальный кадр может существовать в нескольких размерах',
        paragraphs: [
          'Base image, latent canvas, detection image, external depth, mask atlas и crop могут иметь разные resolution. Пока данные обрабатываются независимо, это допустимо. Проблема начинается в момент, когда координаты или mask из одного canvas применяются к другому.',
          'Поэтому resize — это не косметическая операция. Он меняет систему координат downstream.',
        ],
        table: {
          columns: ['Объект', 'Что проверить'],
          rows: [
            ['IMAGE', 'width × height и aspect ratio'],
            ['MASK', 'тот же canvas или явный resize'],
            ['LATENT', 'ожидаемый model canvas / divisible constraints'],
            ['BBOX / points', 'в координатах какого image они были вычислены'],
            ['CROP', 'origin + width/height относительно исходного canvas'],
          ],
        },
      },
      {
        id: 'coordinate-space',
        eyebrow: '03 · COORDINATE SPACE',
        title: 'BBOX имеет смысл только вместе с изображением, на котором он рассчитан',
        paragraphs: [
          'Bounding box — это не абстрактный прямоугольник. Координаты x/y привязаны к конкретным width/height. Если detection выполнялся после resize, bbox нельзя без преобразования применять к original image другого размера.',
          'То же относится к placement masks, crops и points для segmentation.',
        ],
        codeExamples: [
          {
            title: 'Правильная связка detection → segmentation',
            label: 'COORDINATE CONTRACT',
            code:
              'SOURCE IMAGE A\n' +
              '→ DETECTION ON IMAGE A\n' +
              '→ BBOX IN SPACE A\n' +
              '+ SAME IMAGE A\n' +
              '→ SEGMENTATION',
          },
        ],
      },
      {
        id: 'mask-coordinate-space',
        eyebrow: '04 · MASK SPACE',
        title: 'Маска должна совпадать с тем canvas, которым она управляет',
        paragraphs: [
          'Даже правильная по смыслу маска становится неправильной, если была построена на другом resize/crop. Перед composite/inpaint нужно проверить dimensions и mapping маски на target image.',
          'Для локального crop workflow полезно явно разделять local mask и full-scene mask — это разные contracts.',
        ],
      },
      {
        id: 'batch-basics',
        eyebrow: '05 · BATCH',
        title: 'Batch — это количество элементов, а не просто «несколько картинок»',
        paragraphs: [
          'IMAGE может содержать batch N. MASK может содержать другой batch. Detection result может содержать список объектов. Downstream node должен понимать, как эти cardinalities сопоставляются.',
          'Некоторые ноды broadcasting поддерживают, другие ожидают строгую пару 1:1. Нельзя предполагать поведение без проверки конкретной node implementation.',
        ],
        table: {
          columns: ['Сценарий', 'Риск'],
          rows: [
            ['1 image + 1 mask', 'Базовый и обычно безопасный'],
            ['N images + N masks', 'Нужно подтвердить порядок соответствия'],
            ['N images + 1 mask', 'Нужна поддержка broadcasting или явное повторение'],
            ['1 image + N object masks', 'Возможен object batch / combined mask режим'],
            ['N images + M bboxes', 'Опасно, если node индексирует bbox по image index'],
          ],
        },
      },
      {
        id: 'sam2-case',
        eyebrow: '06 · REAL FAILURE CASE',
        title: 'Почему segmentation может падать при правильных моделях',
        paragraphs: [
          'В нашем Florence2 → SAM2 тесте Florence уже успешно нашла объекты, но downstream segmentation получила несогласованную cardinality: image batch содержал больше элементов, чем список bbox. Node индексировала bbox по image index и получила выход за границу массива.',
          'Это пример важного принципа: ошибка после AI-model inference не обязательно означает проблему модели. Сначала проверяй data contract.',
        ],
        codeExamples: [
          {
            title: 'Логика ошибки',
            label: 'BATCH MISMATCH',
            code:
              'IMAGE BATCH = 4\n' +
              'BBOX COUNT = 2\n' +
              'SAM2 expects paired indexing\n' +
              '→ index 2 out of bounds',
          },
        ],
      },
      {
        id: 'single-image-debug',
        eyebrow: '07 · DEBUG RULE',
        title: 'Сначала доказать single-image route, потом увеличивать batch',
        paragraphs: [
          'Для сложной detection/segmentation ветки правильный benchmark начинается с batch=1. После успешного single-image результата можно отдельно проверять multiple objects и только затем multi-image batch.',
        ],
        codeExamples: [
          {
            title: 'Порядок усложнения',
            label: 'SAFE DEBUG',
            code:
              '1 IMAGE + 1 TARGET\n' +
              '→ 1 IMAGE + MULTIPLE TARGETS\n' +
              '→ MULTIPLE IMAGES + DEFINED PAIRING',
          },
        ],
      },
      {
        id: 'resize-policy',
        eyebrow: '08 · RESIZE POLICY',
        title: 'Resize должен иметь владельца и понятную точку в pipeline',
        paragraphs: [
          'Если каждая ветка произвольно resize-ит source, coordinate mapping быстро становится непрозрачным. Лучше иметь явные working canvases и подписывать, какая стадия владеет преобразованием размера.',
        ],
        facts: [
          {
            status: 'inferred',
            title: 'Engineering rule',
            text: 'Стараться выполнять spatially-coupled операции — image/mask/bbox/composite — на одном named working canvas, либо документировать transform между canvas.',
          },
        ],
      },
      {
        id: 'practice',
        eyebrow: '09 · PRACTICE',
        title: 'Практика: составить spatial ledger для одной ветки',
        table: {
          columns: ['Stage', 'W×H', 'Batch', 'Coordinate owner'],
          rows: [
            ['Input', 'заполнить', 'заполнить', 'BASE'],
            ['Resize', 'заполнить', 'заполнить', 'WORKING CANVAS'],
            ['Detection', 'заполнить', 'заполнить', 'DETECTION SPACE'],
            ['Mask', 'заполнить', 'заполнить', 'MASK SPACE'],
            ['Composite', 'заполнить', 'заполнить', 'DESTINATION SPACE'],
          ],
        },
        paragraphs: [
          'Если хотя бы одна строка неизвестна, ветка ещё не готова к надёжной интеграции в Master Workflow.',
        ],
      },
    ],
  },
];
