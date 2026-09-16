import type { Chapter } from '../manual-types';

export const workflowEngineeringGraphLiteracyChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-graph-literacy',
    navTitle: 'Graph Literacy',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'Graph Literacy — учимся читать не ноды, а конструкции',
    lede:
      'После Node Literacy следующий шаг — перестать воспринимать workflow как набор отдельных блоков. Graph Literacy учит узнавать повторяющиеся конструкции, ветвления, точки слияния, selectors и маршруты данных как предложения в языке графа.',
    status: 'confirmed',
    statusNote:
      'Глава описывает общие графовые конструкции и использует те же типы маршрутов, которые встречаются в текущем Hansen workflow.',
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
        title: 'Одна нода — буква, связка нод — конструкция',
        paragraphs: [
          'В большом workflow почти никогда не нужно запоминать все ноды по отдельности. Нужно узнавать типовые маршруты: загрузка модели, кодирование prompt, sampling, decode, preprocessing, segmentation, composite и output.',
          'Когда конструкции становятся знакомыми, граф из сотен нод визуально сжимается до нескольких понятных систем.',
        ],
        codeExamples: [
          {
            title: 'Типовые конструкции',
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
        title: 'Сначала найди главный путь данных',
        paragraphs: [
          'Data plane — это маршрут крупных объектов: IMAGE, LATENT, MASK, CONDITIONING и MODEL. Начинать чтение незнакомого графа лучше с основного IMAGE/LATENT пути от input к output, а мелкие controls разбирать позже.',
          'Такой подход быстро показывает, где находится генерация, где локальная обработка, а где только управление параметрами.',
        ],
        codeExamples: [
          {
            title: 'Первый проход по незнакомому графу',
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
        title: 'Fan-out и fan-in показывают архитектуру задачи',
        paragraphs: [
          'Fan-out возникает, когда один source используется несколькими ветками: например, base image одновременно идёт в Depth, Canny, segmentation и preview. Fan-in возникает, когда несколько результатов снова объединяются в composite, selector или conditioning stack.',
          'Это важные архитектурные точки: fan-out показывает повторное использование source, а fan-in — место, где независимые решения становятся единым результатом.',
        ],
        table: {
          columns: ['Паттерн', 'Как выглядит', 'Что означает'],
          rows: [
            ['Fan-out', '1 output → несколько inputs', 'Один source питает несколько веток'],
            ['Fan-in', 'Несколько outputs → одна операция', 'Слияние результатов / controls'],
            ['Serial chain', 'A → B → C → D', 'Последовательное преобразование'],
            ['Parallel branches', 'A → B1 и A → B2', 'Независимые альтернативные или вспомогательные процессы'],
          ],
        },
      },
      {
        id: 'selectors-routing',
        eyebrow: '04 · ROUTING',
        title: 'Selector меняет маршрут, а не обязательно данные',
        paragraphs: [
          'Routing-ноды часто выглядят второстепенными, но именно они определяют фактический runtime path. Selector может иметь несколько готовых входов и пропускать дальше только один из них.',
          'Поэтому наличие связи в topology ещё не означает, что конкретная ветка участвует в текущем результате. Нужно отдельно различать connected, selected и executed.',
        ],
        table: {
          columns: ['Состояние', 'Смысл'],
          rows: [
            ['CONNECTED', 'Ветка физически подключена к графу'],
            ['SELECTED', 'Selector действительно выбирает этот вход'],
            ['EXECUTED', 'Ветка не bypassed и нужна текущему output'],
            ['DIAGNOSTIC', 'Результат уходит только в preview / comparer'],
          ],
        },
      },
      {
        id: 'control-vs-data-links',
        eyebrow: '05 · LINK ROLE',
        title: 'Не все провода несут изображение',
        paragraphs: [
          'Визуально любой link похож на другой, но STRING, INT или FLOAT могут управлять маршрутом так же сильно, как IMAGE. Поэтому после первого прохода по data plane нужно сделать второй проход по control links.',
          'Особое внимание — linked values. Подключённый INT/FLOAT может переопределять значение, которое видно внутри widget downstream-ноды.',
        ],
      },
      {
        id: 'module-boundaries',
        eyebrow: '06 · MODULE BOUNDARIES',
        title: 'Границу модуля видно по смыслу входа и выхода',
        paragraphs: [
          'Модуль — это не обязательно официальная ComfyUI subgraph-нода. В инженерном смысле модулем является законченная ветка с одной ответственностью и понятным contract.',
          'Хороший модуль можно мысленно вырезать из Master Workflow, заменить тестовыми inputs и отдельно проверить его output.',
        ],
        codeExamples: [
          {
            title: 'Пример границы модуля',
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
        title: 'Как проследить ветку в большом графе',
        bullets: [
          'Начать с конечного preview/save/output интересующей ветки.',
          'Идти upstream по IMAGE/LATENT links до первого понятного source.',
          'Отдельно выписать MASK / CONDITIONING / MODEL inputs.',
          'Найти selectors и проверить, какой input выбран фактически.',
          'Найти linked INT/FLOAT/STRING controls, которые меняют поведение ветки.',
          'Отметить последний checkpoint до слияния с другими системами.',
        ],
      },
      {
        id: 'practice',
        eyebrow: '08 · PRACTICE',
        title: 'Практика: сжать большой граф до пяти предложений',
        paragraphs: [
          'Открой большой workflow и не пытайся сразу понять каждую ноду. Найди пять крупных конструкций и запиши их как короткие маршруты. Например: Input → ControlNet → SDXL; SDXL → Detail; PPL Generate → Segment → Composite; Result → FLUX; FLUX → Output.',
        ],
        facts: [
          {
            status: 'inferred',
            title: 'Критерий готовности',
            text: 'Если человек может пересказать архитектуру графа 5–10 маршрутами, не перечисляя сотни nodes, он готов переходить к BASE CONFIG и control plane.',
          },
        ],
      },
    ],
  },
];
