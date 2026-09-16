import type { Chapter } from '../manual-types';

export const workflowEngineeringNodeLiteracyChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-node-literacy',
    navTitle: 'Node Literacy',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'Node Literacy — алфавит ComfyUI',
    lede:
      'Прежде чем читать большой workflow, нужно понимать базовые типы данных, входы и выходы нод. Эта глава учит видеть не название ноды, а то, какой объект она принимает, что делает с ним и что возвращает дальше.',
    status: 'confirmed',
    statusNote:
      'Глава описывает базовую модель чтения ComfyUI-графа и опирается на типы данных, которые реально встречаются в текущем Hansen workflow.',
    visual: 'graph-reading',
    category: 'workflow-engineering',
    stage: 'node-literacy',
    relatedChapters: [
      'workflow-engineering-overview',
      'graph-reading',
      'inputs',
      'models-dependencies',
    ],
    sections: [
      {
        id: 'node-anatomy',
        eyebrow: '01 · NODE ANATOMY',
        title: 'У каждой ноды есть три вопроса: что входит, что происходит, что выходит',
        paragraphs: [
          'Ноду нужно читать не по её названию, а как функцию. Слева находятся входы, внутри задаются параметры, справа находятся выходы. Если понимать тип каждого socket, большая часть графа перестаёт быть загадкой.',
          'Профессиональная привычка: прежде чем менять параметр, сначала определить тип входа и тип выхода. Это защищает от бессмысленных попыток соединить несовместимые части графа.',
        ],
        codeExamples: [
          {
            title: 'Базовая формула чтения ноды',
            label: 'NODE LITERACY',
            code:
              'INPUT TYPE\n' +
              '→ NODE OPERATION\n' +
              '→ OUTPUT TYPE',
            note: 'Сначала типы данных, потом название модели и значения widgets.',
          },
        ],
      },
      {
        id: 'core-types',
        eyebrow: '02 · CORE DATA TYPES',
        title: 'Главные «буквы» ComfyUI',
        table: {
          columns: ['Тип', 'Что это означает', 'Типичный пример'],
          rows: [
            ['IMAGE', 'Пиксельное изображение или batch изображений', 'LoadImage → PreviewImage'],
            ['MASK', 'Одноканальная карта области действия', 'SAM2 mask → composite / inpaint'],
            ['LATENT', 'Скрытое представление изображения для diffusion sampler', 'VAE Encode → KSampler'],
            ['MODEL', 'Объект генеративной модели после loader / patch', 'Checkpoint / UNet loader → sampler'],
            ['CLIP', 'Текстовый encoder / text-model interface', 'Loader → CLIP Text Encode'],
            ['CONDITIONING', 'Закодированная текстовая или control-информация', 'CLIP Text Encode → sampler / guider'],
            ['VAE', 'Encoder/decoder между IMAGE и LATENT', 'IMAGE → VAE Encode → LATENT'],
            ['STRING', 'Текст', 'Prompt field → text encoder'],
            ['INT', 'Целое число', 'steps, width, height, seed selector'],
            ['FLOAT', 'Число с плавающей точкой', 'denoise, strength, CFG, weight'],
          ],
        },
      },
      {
        id: 'image-latent',
        eyebrow: '03 · IMAGE VS LATENT',
        title: 'IMAGE и LATENT — это не одно и то же',
        paragraphs: [
          'IMAGE существует в пиксельном пространстве: его можно показать PreviewImage, сохранить, обработать маской или передать в preprocessor. LATENT существует в скрытом пространстве diffusion-модели и используется sampler-ом.',
          'Поэтому IMAGE нельзя напрямую подключать туда, где ожидается LATENT. Между ними нужен VAE Encode. В обратную сторону нужен VAE Decode.',
        ],
        codeExamples: [
          {
            title: 'Переходы между пространствами',
            label: 'CORE ROUTE',
            code:
              'IMAGE\n' +
              '→ VAE Encode\n' +
              '→ LATENT\n' +
              '→ Sampler\n' +
              '→ LATENT\n' +
              '→ VAE Decode\n' +
              '→ IMAGE',
          },
        ],
        facts: [
          {
            status: 'inferred',
            title: 'Debug rule',
            text: 'Если нода «не принимает картинку», сначала проверь, не ожидает ли она LATENT, MASK или CONDITIONING вместо IMAGE.',
          },
        ],
      },
      {
        id: 'mask-literacy',
        eyebrow: '04 · MASK',
        title: 'MASK отвечает за область действия, а не за само изображение',
        paragraphs: [
          'Маска описывает, где операция разрешена, запрещена или должна быть смешана. Белое и чёрное значения получают смысл только в контексте конкретной downstream-ноды, поэтому polarity нельзя угадывать по привычке.',
          'В production-графе всегда нужно проверять три вещи: размер mask, её polarity и совпадение coordinate space с изображением, к которому она применяется.',
        ],
        codeExamples: [
          {
            title: 'Минимальный mask contract',
            label: 'CHECK BEFORE USE',
            code:
              'MASK SIZE\n' +
              '+ POLARITY\n' +
              '+ SAME COORDINATE SPACE\n' +
              '→ SAFE COMPOSITE / INPAINT',
          },
        ],
      },
      {
        id: 'model-clip-conditioning',
        eyebrow: '05 · MODEL / CLIP / CONDITIONING',
        title: 'Model object и prompt — разные части системы',
        paragraphs: [
          'MODEL отвечает за генеративную сеть. CLIP или другой text encoder превращает STRING prompt в CONDITIONING. Sampler затем получает модель, conditioning и latent как разные входы.',
          'Это важная ментальная модель: prompt не «лежит внутри sampler». Он заранее кодируется и передаётся как отдельный объект.',
        ],
        codeExamples: [
          {
            title: 'Минимальная генеративная цепочка',
            label: 'GRAPH GRAMMAR',
            code:
              'MODEL LOADER → MODEL\n' +
              'TEXT ENCODER + STRING → CONDITIONING\n' +
              'LATENT SOURCE → LATENT\n' +
              'MODEL + CONDITIONING + LATENT → SAMPLER',
          },
        ],
      },
      {
        id: 'scalars-controls',
        eyebrow: '06 · STRING / INT / FLOAT',
        title: 'Маленькие типы часто управляют огромными ветками',
        paragraphs: [
          'STRING, INT и FLOAT выглядят проще IMAGE или MODEL, но именно они часто формируют control plane. Один INT может выбирать source в нескольких selectors, а один FLOAT одновременно задавать denoise или weight для целой ветки.',
          'Поэтому связанный control input важнее локального widget value: если input подключён, реальное значение может приходить извне.',
        ],
      },
      {
        id: 'socket-compatibility',
        eyebrow: '07 · SOCKET COMPATIBILITY',
        title: 'Провод можно читать как утверждение о совместимости данных',
        paragraphs: [
          'Каждый link говорит: output одной ноды совместим с input другой. Если ComfyUI не даёт соединить sockets, проблема обычно не в UI, а в несовместимости типов или в том, что между ними пропущен преобразующий шаг.',
        ],
        table: {
          columns: ['Нужно получить', 'Есть сейчас', 'Что обычно требуется между ними'],
          rows: [
            ['LATENT', 'IMAGE', 'VAE Encode'],
            ['IMAGE', 'LATENT', 'VAE Decode'],
            ['CONDITIONING', 'STRING', 'Text Encode'],
            ['MASK', 'IMAGE / detection result', 'ImageToMask или segmentation stage'],
            ['CONTROL signal', 'IMAGE', 'Preprocessor + ControlNet/apply stage'],
          ],
        },
      },
      {
        id: 'reading-order',
        eyebrow: '08 · READING ORDER',
        title: 'Как читать незнакомую ноду за 20 секунд',
        bullets: [
          'Посмотреть тип каждого входа.',
          'Посмотреть тип каждого выхода.',
          'Определить, меняет ли нода данные или только маршрутизирует их.',
          'Отделить linked inputs от локальных widget values.',
          'Найти один upstream source и один downstream consumer.',
          'Только после этого изучать название модели и параметры.',
        ],
      },
      {
        id: 'practice',
        eyebrow: '09 · PRACTICE',
        title: 'Практика: перевести маленький workflow с языка нод на обычный язык',
        paragraphs: [
          'Возьми любой граф из 5–15 нод. Для каждой ноды подпиши один входной тип, операцию и выходной тип. Затем одной фразой опиши весь маршрут без названий моделей.',
        ],
        codeExamples: [
          {
            title: 'Пример перевода',
            label: 'EXERCISE',
            code:
              'LoadImage\n' +
              '→ VAEEncode\n' +
              '→ Sampler\n' +
              '→ VAEDecode\n' +
              '→ Preview\n\n' +
              'Человеческий язык:\n' +
              'загрузить изображение → перевести в latent → изменить diffusion-моделью → вернуть в pixels → проверить результат',
          },
        ],
        facts: [
          {
            status: 'inferred',
            title: 'Критерий готовности',
            text: 'Ученик готов переходить к Graph Literacy, когда может объяснить маршрут по типам данных, не опираясь только на названия конкретных моделей.',
          },
        ],
      },
    ],
  },
];
