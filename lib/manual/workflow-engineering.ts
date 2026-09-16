import type { Chapter } from '../manual-types';

export const workflowEngineeringChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-overview',
    navTitle: 'Workflow Engineering Overview',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'Сначала архитектура графа, потом генеративные ноды, потом практика',
    lede:
      'ComfyUI становится понятным только тогда, когда пользователь сначала учится читать язык графа, затем понимать типовые конструкции и только после этого проектировать большие управляемые workflow. Этот раздел задаёт фундамент перед разбором Hansen.',
    status: 'confirmed',
    statusNote:
      'Методология утверждена как обязательная структура учебника: graph architecture → generative systems → practice labs.',
    visual: 'graph-reading',
    category: 'workflow-engineering',
    stage: 'workflow-engineering-foundation',
    relatedChapters: [
      'graph-reading',
      'inputs',
      'control-panel',
      'models-dependencies',
      'sdxl',
      'people-ppl-overview',
    ],
    sections: [
      {
        id: 'why-this-exists',
        eyebrow: '01 · WHY',
        title: 'Почему большие ComfyUI-графы кажутся непонятными',
        paragraphs: [
          'Большинство обучающих материалов начинают с генеративных нод: loaders, encoders, samplers, ControlNet и VAE. Но до этого пользователю редко объясняют сам язык графа — типы данных, маршруты, состояния, selectors, modules и точки возврата.',
          'Из-за этого большой production workflow воспринимается как сотни коробок и проводов. Для автора того же графа это, наоборот, несколько крупных систем: control plane, data plane, генеративные модули, диагностические checkpoints и output routes.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Главный порядок обучения',
            text: 'Сначала архитектура графа, потом генеративные ноды, потом практика.',
          },
          {
            status: 'inferred',
            title: 'Учебная аналогия',
            text: 'Нельзя уверенно читать production workflow, пока не освоен его «алфавит»: типы данных, sockets, links и базовые конструкции.',
          },
        ],
      },
      {
        id: 'three-levels',
        eyebrow: '02 · THREE LEVELS OF LITERACY',
        title: 'От букв к языку workflow',
        table: {
          columns: ['Уровень', 'Что изучаем', 'Результат'],
          rows: [
            [
              'LEVEL 1 · Node Literacy',
              'IMAGE, MASK, LATENT, MODEL, CLIP, CONDITIONING, VAE, STRING, INT, FLOAT, sockets и links',
              'Человек понимает, что именно входит и выходит из ноды',
            ],
            [
              'LEVEL 2 · Graph Literacy',
              'Loader → Encoder → Sampler → Decode; Image → Preprocessor → ControlNet; Detection → Segmentation → Mask',
              'Человек видит не отдельные nodes, а стандартные конструкции',
            ],
            [
              'LEVEL 3 · Workflow Engineering',
              'BASE CONFIG, groups, control plane, modules, contracts, selectors, checkpoints, return points, reproducibility',
              'Человек умеет проектировать и диагностировать большой production graph',
            ],
          ],
        },
      },
      {
        id: 'professional-workflow',
        eyebrow: '03 · SYSTEM THINKING',
        title: 'Нода — это ещё не workflow',
        paragraphs: [
          'Набор соединённых nodes может что-то генерировать, но production workflow требует архитектуры: понятного входа, управляемого маршрута, модулей с границами ответственности, диагностических портов и предсказуемого выхода.',
          'Главная задача Workflow Engineering — превратить ComfyUI canvas из «паутины» в систему, которую можно читать, тестировать, расширять и передавать другому человеку.',
        ],
        codeExamples: [
          {
            title: 'Production module pattern',
            label: 'WORKFLOW ENGINEERING',
            code:
              'BASE CONFIG\n' +
              '→ INPUT CONTRACT\n' +
              '→ MODULE ENABLE / BYPASS\n' +
              '→ PROCESS\n' +
              '→ CHECKPOINT\n' +
              '→ SELECTOR / RETURN\n' +
              '→ OUTPUT CONTRACT',
            note: 'Это архитектурный шаблон, а не конкретная генеративная ветка.',
          },
        ],
      },
      {
        id: 'base-config',
        eyebrow: '04 · BASE CONFIG',
        title: 'BASE CONFIG — control plane большого графа',
        paragraphs: [
          'BASE CONFIG должен рассматриваться как центральная панель управления workflow, а не как декоративный блок. Он отвечает за то, какие крупные ветки активны, какие bypassed и какой runtime profile собирается из модулей.',
          'Числовые controls и selectors отвечают на другой вопрос: как работает уже активная ветка. Поэтому enable/bypass logic и parameter controls нельзя смешивать в одну концепцию.',
        ],
        bullets: [
          'MODEL LOADERS',
          'INPUTS',
          'CONTROL',
          'SAMPLER CONFIGURATION',
          'ControlNet PREPROCESSORS + EXTRAS',
          'MASKS',
          'PEOPLE / PPL sub-branches',
          'Process SEGMENTATION / SDXL / FLUX / UPSCALE / ADD LOGO',
          'OUTPUT',
        ],
      },
      {
        id: 'modules-contracts',
        eyebrow: '05 · MODULES & CONTRACTS',
        title: 'Каждая ветка должна иметь понятный вход и выход',
        paragraphs: [
          'Профессиональный граф проще читать, когда каждая крупная задача оформлена как модуль: ControlNet, SDXL, PEOPLE, FLUX, UPSCALE и OUTPUT. Модуль должен явно показывать, какие типы данных получает и что возвращает downstream.',
          'Такой Input / Output contract позволяет изучать ветку отдельно, тестировать её независимо и позже собирать Master Workflow как систему совместимых блоков.',
        ],
        codeExamples: [
          {
            title: 'Module contract',
            label: 'GENERIC',
            code:
              'INPUTS\n' +
              '→ MODULE\n' +
              '→ CHECKPOINT\n' +
              '→ RESULT\n' +
              '→ RETURN TO NEXT MODULE',
          },
        ],
      },
      {
        id: 'diagnostics',
        eyebrow: '06 · CHECKPOINTS',
        title: 'Большой workflow должен быть наблюдаемым',
        paragraphs: [
          'Preview и comparer nodes должны работать как диагностические порты. Проверять финальный output бессмысленно, если неизвестно, где именно результат перестал быть корректным.',
          'Базовое правило диагностики: доказать текущий checkpoint и только после этого переходить к следующему.',
        ],
        codeExamples: [
          {
            title: 'Diagnostic ladder',
            label: 'PRACTICE RULE',
            code:
              'INPUT\n' +
              '→ PREPROCESS CHECKPOINT\n' +
              '→ GENERATION CHECKPOINT\n' +
              '→ MASK / LOCAL CHECKPOINT\n' +
              '→ COMPOSITE CHECKPOINT\n' +
              '→ FINAL PROCESS CHECKPOINT\n' +
              '→ OUTPUT',
          },
        ],
      },
      {
        id: 'reproducibility',
        eyebrow: '07 · REPRODUCIBILITY',
        title: 'Профессиональный эксперимент должен быть воспроизводимым',
        paragraphs: [
          'Seed, model, prompt, sampler, scheduler, steps, denoise, resolution и effective selector values образуют конфигурацию эксперимента. Если одновременно менять несколько параметров, нельзя доказать, что именно улучшило или ухудшило результат.',
        ],
        bullets: [
          'Фиксировать seed и effective linked values.',
          'Менять одну переменную за тест.',
          'Сохранять checkpoints, а не только final image.',
          'Отделять runtime fact от предположения по topology.',
        ],
      },
      {
        id: 'course-map',
        eyebrow: '08 · COURSE ARCHITECTURE',
        title: 'Как теперь будет устроен весь учебник',
        table: {
          columns: ['Part', 'Назначение'],
          rows: [
            ['PART I · Workflow Engineering', 'Алфавит, язык графа, архитектура, BASE CONFIG, contracts, debugging'],
            ['PART II · Generative Systems', 'SDXL, FLUX, ControlNet, Florence2, SAM2, masks, composite, upscale'],
            ['PART III · Hansen by Timestamps', 'Разбор production workflow строго по видео и таймкодам'],
            ['PART IV · Practice Labs', 'Standalone JSON для каждой независимой ветки, упражнения и QC'],
            ['PART V · Master Build', 'Сборка изученных модулей обратно в большой управляемый workflow'],
          ],
        },
      },
      {
        id: 'practice',
        eyebrow: '09 · FIRST PRACTICE',
        title: 'Первое упражнение: научиться читать маршрут до изучения модели',
        bullets: [
          'Открыть любой небольшой ComfyUI workflow.',
          'Не смотреть сначала на названия моделей.',
          'Для каждой ноды определить входной и выходной тип данных.',
          'Найти начало data plane и конечный output.',
          'Разбить граф на 3–5 смысловых модулей.',
          'Отметить хотя бы один checkpoint между модулями.',
        ],
        facts: [
          {
            status: 'inferred',
            title: 'Цель упражнения',
            text: 'Научиться видеть структуру до того, как внимание переключится на конкретные модели и параметры генерации.',
          },
        ],
      },
    ],
  },
];
