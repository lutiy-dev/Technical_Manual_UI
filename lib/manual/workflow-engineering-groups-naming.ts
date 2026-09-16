import type { Chapter } from '../manual-types';

export const workflowEngineeringGroupsNamingChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-groups-naming',
    navTitle: 'Groups & Naming Standard',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'Graph Organization · Groups & Naming Standard — как сделать большой workflow читаемым',
    lede:
      'Большой production workflow должен читаться на трёх масштабах: весь canvas, функциональный module и отдельная node chain. Группы и naming standard превращают визуальную раскладку в навигацию, control API и документацию одновременно.',
    status: 'confirmed',
    statusNote:
      'Глава фиксирует OVizLAB production standard. Поведение Fast Groups Bypasser по group title/filter/sort подтверждено исходным кодом rgthree; конкретная схема именования является нашим инженерным стандартом поверх ComfyUI.',
    visual: 'graph-reading',
    category: 'workflow-engineering',
    stage: 'workflow-engineering-groups-naming',
    relatedChapters: [
      'workflow-engineering-graph-literacy',
      'workflow-engineering-base-config',
      'workflow-engineering-switches-routing',
      'workflow-engineering-module-contract-lab',
      'workflow-engineering-module-contracts',
    ],
    sections: [
      {
        id: 'why',
        eyebrow: '01 · WHY',
        title: 'Группа — это не цветная рамка, а часть архитектуры workflow',
        paragraphs: [
          'Если group используется только для визуального украшения, она не помогает читать или обслуживать граф. В production workflow название группы должно сразу отвечать на вопрос: какую ответственность выполняет этот участок и где он находится в общем маршруте.',
          'Правильная group architecture уменьшает когнитивную нагрузку: вместо сотен nodes пользователь сначала видит 10–15 систем, затем открывает нужный module и только потом читает конкретную chain.',
        ],
        codeExamples: [
          {
            title: 'Три уровня чтения',
            label: 'GRAPH ORGANIZATION',
            code:
              'MASTER WORKFLOW\n' +
              '→ MODULE / GROUP\n' +
              '→ NODE CHAIN',
            note: 'Читать большой graph нужно сверху вниз по смысловой иерархии, а не пытаться сразу отслеживать каждый link.',
          },
        ],
      },
      {
        id: 'top-level-standard',
        eyebrow: '02 · TOP LEVEL',
        title: 'Единый порядок главных production-групп',
        table: {
          columns: ['Prefix', 'Group', 'Responsibility'],
          rows: [
            ['00', 'BASE CONFIG', 'Глобальная availability / bypass логика и режимы запуска'],
            ['01', 'MODEL LOADERS', 'Models, CLIP, VAE и тяжёлые shared resources'],
            ['02', 'INPUTS', 'Base render, maps, references, logo и внешние данные'],
            ['03', 'CONTROL', 'Shared values, selectors, seed, size, mode controls'],
            ['04', 'PREPROCESS', 'Depth, Canny, resize, detection preparation'],
            ['05', 'BASE GENERATION', 'SDXL / FLUX base generation или img2img stage'],
            ['06', 'MASKS', 'Segmentation, protection masks, local edit regions'],
            ['07', 'PEOPLE / PPL', 'Generation / replacement / compositing of people'],
            ['08', 'LOCAL REFINE', 'Detail transfer, inpaint, local polish'],
            ['09', 'UPSCALE', 'High-resolution / final polish path'],
            ['10', 'OUTPUT', 'Preview, save, delivery outputs'],
          ],
        },
        facts: [
          {
            status: 'inferred',
            title: 'Почему numeric prefix',
            text: 'Префикс фиксирует intended reading order и делает сортировку групп предсказуемой даже при большом canvas.',
          },
        ],
      },
      {
        id: 'module-standard',
        eyebrow: '03 · MODULE LEVEL',
        title: 'Внутри module используем тот же принцип: stage number + responsibility',
        codeExamples: [
          {
            title: 'PEOPLE / PPL example',
            label: 'NAMING PATTERN',
            code:
              'PPL · 01 GENERATE\n' +
              '→ PPL · 02 DETECT\n' +
              '→ PPL · 03 SEGMENT\n' +
              '→ PPL · 04 PREPARE\n' +
              '→ PPL · 05 COMPOSITE\n' +
              '→ PPL · RETURN',
          },
          {
            title: 'ControlNet example',
            label: 'NAMING PATTERN',
            code:
              'CNET · 01 SOURCE\n' +
              '→ CNET · 02 PREPROCESS\n' +
              '→ CNET · 03 APPLY\n' +
              '→ CNET · CHECKPOINT\n' +
              '→ CNET · RETURN',
          },
        ],
        paragraphs: [
          'Название должно описывать функцию, а не историю редактирования. FINAL2, TEST_NEW, COPY3 и похожие названия не являются архитектурными именами и быстро превращают canvas в архив случайных состояний.',
        ],
      },
      {
        id: 'control-api',
        eyebrow: '04 · GROUP NAME = CONTROL API',
        title: 'Имена групп участвуют в управлении через Fast Groups Bypasser',
        paragraphs: [
          'Fast Groups Bypasser автоматически собирает groups и строит toggle rows по их titles. В properties можно фильтровать группы через matchTitle, ограничивать по цвету, сортировать по position, alphanumeric или custom alphabet.',
          'Поэтому group title становится частью control plane. Переименование группы может изменить то, как она попадает в BASE CONFIG filter, а нестабильные названия делают управление workflow хрупким.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'rgthree behavior',
            text: 'Fast Groups Bypasser использует group title для widget label и поддерживает matchTitle, sort и custom alphabet.',
          },
          {
            status: 'inferred',
            title: 'Production rule',
            text: 'Если BASE CONFIG использует title matching, имена production groups считаются интерфейсом и должны меняться осознанно.',
          },
        ],
      },
      {
        id: 'boundaries',
        eyebrow: '05 · BOUNDARIES',
        title: 'Границы group должны совпадать с границами ответственности',
        bullets: [
          'Не растягивать одну group через половину canvas только ради визуального охвата.',
          'Не помещать shared loader внутрь локального module, если им пользуются несколько веток.',
          'Не прятать return point внутри соседней group.',
          'Не перекрывать production groups без явной причины: один node не должен случайно принадлежать нескольким control regions.',
          'Checkpoint размещать внутри module перед RETURN, а не далеко в OUTPUT.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Overlap risk',
            text: 'rgthree отдельно предупреждает, что overlapping groups могут привести к состояниям, которые не соответствуют ограничениям max one / always one.',
          },
        ],
      },
      {
        id: 'colors',
        eyebrow: '06 · COLOR',
        title: 'Цвет помогает ориентироваться, но не заменяет название',
        paragraphs: [
          'Цвет useful как вторичный visual code: loaders, controls, masks, generation и output можно различать по palette. Но смысл group должен оставаться понятным в текстовом title без знания цветов.',
          'Это особенно важно при передаче workflow другому человеку, смене темы UI и использовании matchTitle в BASE CONFIG.',
        ],
      },
      {
        id: 'anti-patterns',
        eyebrow: '07 · ANTI-PATTERNS',
        title: 'Названия, которые запрещаем в production master',
        table: {
          columns: ['Anti-pattern', 'Почему плохо', 'Вместо этого'],
          rows: [
            ['final / final2 / final_final', 'Не описывает функцию и быстро устаревает', '09 · UPSCALE / 10 · OUTPUT'],
            ['test / new / copy', 'Неясно, что тестируется', 'LAB · CANNY STRENGTH TEST'],
            ['group 17', 'Нет semantic responsibility', '06 · MASKS · FOLIAGE'],
            ['PPL stuff', 'Смешивает несколько stages', 'PPL · 02 DETECT / PPL · 03 SEGMENT'],
            ['одна giant group', 'Скрывает module boundaries', 'Разделить по contracts и return points'],
          ],
        },
      },
      {
        id: 'labelling-rule',
        eyebrow: '08 · LABEL RULE',
        title: 'Формула имени, которую можно применять к любому будущему module',
        codeExamples: [
          {
            title: 'Canonical label',
            label: 'OVizLAB STANDARD',
            code:
              '[SYSTEM] · [STAGE NUMBER] [RESPONSIBILITY]\n' +
              'optional: · [MODE / VARIANT]\n\n' +
              'examples:\n' +
              'PPL · 03 SEGMENT\n' +
              'CNET · 02 PREPROCESS · DEPTH\n' +
              'FLUX · 04 LOCAL REFINE\n' +
              'OUTPUT · 01 LQ SAVE',
          },
        ],
      },
      {
        id: 'practice',
        eyebrow: '09 · PRACTICE',
        title: 'Практика: прочитать Hansen только по группам',
        bullets: [
          'Работать на копии workflow; Hansen Original оставить immutable reference.',
          'Сначала скрыть детали и выписать только названия крупных groups.',
          'Для каждой group сформулировать ответственность одной строкой.',
          'Отметить INPUT и RETURN каждого module.',
          'Проверить, какие group titles видит BASE CONFIG / Fast Groups Bypasser.',
          'Только после этого смотреть на внутренние nodes.',
        ],
      },
      {
        id: 'pass',
        eyebrow: '10 · PASS CRITERIA',
        title: 'Блок закрыт, когда canvas читается как карта системы',
        bullets: [
          'По одному title понятно назначение group.',
          'Порядок major groups читается без поиска по canvas.',
          'Любой local module имеет явные INPUT / CHECKPOINT / RETURN.',
          'BASE CONFIG может адресовать нужные groups устойчивыми именами.',
          'В production master нет временных названий final2 / test / copy.',
          'Новый человек может сначала прочитать modules, а уже потом nodes.',
        ],
      },
    ],
  },
];
