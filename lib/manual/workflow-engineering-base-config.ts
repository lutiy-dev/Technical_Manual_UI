import type { Chapter } from '../manual-types';

export const workflowEngineeringBaseConfigChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-base-config',
    navTitle: 'BASE CONFIG / Control Plane',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'BASE CONFIG — центральная панель управления профессиональным графом',
    lede:
      'Большой ComfyUI workflow становится управляемым только тогда, когда крупные processing-системы можно включать, отключать и тестировать из одного места. BASE CONFIG — это control plane графа: он определяет, какие модули участвуют в текущем runtime profile.',
    status: 'confirmed',
    statusNote:
      'Структура BASE CONFIG и список управляемых групп подтверждены по Hansen workflow / видео; рекомендации по debug presets и naming оформлены как engineering practice.',
    visual: 'controls',
    category: 'workflow-engineering',
    stage: 'base-config',
    relatedChapters: [
      'workflow-engineering-overview',
      'workflow-engineering-node-literacy',
      'workflow-engineering-graph-literacy',
      'control-panel',
      'models-dependencies',
      'workflow-engineering-data-control-plane',
    ],
    sections: [
      {
        id: 'control-plane-role',
        eyebrow: '01 · ROLE',
        title: 'BASE CONFIG отвечает на вопрос «что вообще запускается?»',
        paragraphs: [
          'В большом production graph недостаточно уметь менять CFG, denoise или steps. Сначала нужно решить, какие крупные системы вообще участвуют в текущем прогоне: loaders, inputs, preprocessors, masks, PEOPLE, SDXL, FLUX, upscale и output.',
          'BASE CONFIG централизует это решение. Он не заменяет параметры отдельных нод: он находится уровнем выше и управляет архитектурным состоянием workflow.',
        ],
        codeExamples: [
          {
            title: 'Два уровня управления',
            label: 'WORKFLOW ENGINEERING',
            code:
              'BASE CONFIG = WHAT RUNS\n' +
              'Controls / Widgets = HOW IT RUNS',
            note: 'Не смешивать enable/bypass logic с настройками strength, denoise, steps, seed и т.п.',
          },
        ],
      },
      {
        id: 'hansen-groups',
        eyebrow: '02 · HANSEN BASE CONFIG',
        title: 'Какие processing-группы Hansen управляет централизованно',
        table: {
          columns: ['Group toggle', 'Назначение'],
          rows: [
            ['MODEL LOADERS', 'Загрузка checkpoints, UNet, CLIP, VAE и других моделей'],
            ['INPUTS', 'Base image, references, maps и другие входные данные'],
            ['CONTROL', 'Shared controls / selectors / общие параметры'],
            ['SAMPLER CONFIGURATION', 'Seed, steps, sampler, scheduler и связанные настройки'],
            ['ControlNet Preprocessors + Extras', 'Depth, edge и вспомогательная предобработка'],
            ['MASKS', 'Архитектурные и локальные маски'],
            ['PPL FLUX Generate', 'Отдельная генерация людей'],
            ['PPL SEGMENTATION', 'Detection / segmentation людей'],
            ['PPL FLUX Composite', 'Подготовка и compositing людей'],
            ['PPL 3D INPAINT Detail', 'Альтернативная ветка работы с уже размещёнными людьми'],
            ['Process SEGMENTATION', 'Общая segmentation processing'],
            ['Process SDXL', 'Основной SDXL stage'],
            ['Process FLUX', 'Основной FLUX refinement'],
            ['Process UPSCALE', 'Upscale / HQ processing'],
            ['Process ADD LOGO', 'Overlay / logo post-process'],
            ['OUTPUT', 'Preview / save / delivery stage'],
          ],
        },
      },
      {
        id: 'bypass-vs-selector',
        eyebrow: '03 · EXECUTION STATES',
        title: 'Bypass, selected-away и disabled — не одно и то же',
        paragraphs: [
          'В большом графе важно различать физическое наличие ветки, выбор её результата и само выполнение processing. Иначе пользователь видит подключённую ветку и ошибочно считает, что она участвует в текущем output.',
        ],
        table: {
          columns: ['Состояние', 'Что происходит', 'Как читать'],
          rows: [
            ['ACTIVE', 'Группа выполняется и её output нужен downstream', 'Участвует в runtime'],
            ['BYPASSED', 'Processing сохранён в графе, но пропускается', 'Архитектура есть, вычисление выключено'],
            ['SELECTED AWAY', 'Ветка может быть активна, но selector выбирает другой source', 'Не влияет на текущий result'],
            ['DIAGNOSTIC ONLY', 'Результат идёт в preview/comparer, а не в production output', 'Нужен для наблюдения'],
          ],
        },
      },
      {
        id: 'fast-groups-bypasser',
        eyebrow: '04 · FAST GROUPS BYPASSER',
        title: 'Централизованный bypass превращает группы в управляемые модули',
        paragraphs: [
          'Идея Fast Groups Bypasser в том, что пользователь не бегает по canvas и не выключает десятки нод вручную. Он управляет именованными группами из одной панели, а group names становятся частью архитектурного API workflow.',
          'Отсюда следует важное правило: названия групп должны быть стабильными и однозначными. Если control plane обращается к группам по имени, переименование без системы ломает читаемость и может нарушить управление.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Hansen pattern',
            text: 'BASE CONFIG на видео используется как единая панель enable/bypass для крупных групп workflow.',
          },
          {
            status: 'inferred',
            title: 'Engineering rule',
            text: 'Group name следует считать частью интерфейса модуля: коротким, стабильным и отражающим функцию, а не историю редактирования.',
          },
        ],
      },
      {
        id: 'naming-standard',
        eyebrow: '05 · NAMING',
        title: 'Имена групп должны объяснять ответственность, а не автора или версию',
        table: {
          columns: ['Плохо', 'Лучше'],
          rows: [
            ['group 1', 'INPUTS'],
            ['test2', 'CONTROLNET · DEPTH'],
            ['new final', 'PROCESS · FLUX'],
            ['people stuff', 'PPL · SEGMENTATION'],
            ['final final', 'OUTPUT'],
          ],
        },
        codeExamples: [
          {
            title: 'Рекомендуемый шаблон',
            label: 'NAMING CONVENTION',
            code:
              'DOMAIN · STAGE · PURPOSE\n\n' +
              'PPL · 01 GENERATE\n' +
              'PPL · 02 SEGMENT\n' +
              'PPL · 03 PREPARE\n' +
              'PPL · 04 COMPOSITE',
          },
        ],
      },
      {
        id: 'dependency-order',
        eyebrow: '06 · DEPENDENCIES',
        title: 'Группы нужно включать не случайно, а по dependency chain',
        paragraphs: [
          'У модулей есть зависимости. PROCESS FLUX бессмысленно тестировать, если его input не сформирован предыдущей стадией. PPL Composite не работает без подготовленного человека и placement data. Поэтому BASE CONFIG должен читаться как карта зависимостей, а не как список независимых переключателей.',
        ],
        codeExamples: [
          {
            title: 'Типовой порядок',
            label: 'CONTROL PLANE',
            code:
              'MODEL LOADERS\n' +
              '→ INPUTS\n' +
              '→ CONTROL / SAMPLER CONFIG\n' +
              '→ PREPROCESSORS / MASKS\n' +
              '→ GENERATION MODULES\n' +
              '→ LOCAL MODULES\n' +
              '→ FINAL PROCESS\n' +
              '→ OUTPUT',
          },
        ],
      },
      {
        id: 'debug-presets',
        eyebrow: '07 · DEBUG PROFILES',
        title: 'Профессиональный BASE CONFIG должен поддерживать минимальные тестовые профили',
        paragraphs: [
          'При диагностике не нужно запускать весь Master Workflow. Чем меньше активных систем, тем проще понять источник ошибки и тем меньше расход VRAM / времени.',
        ],
        table: {
          columns: ['Preset', 'Что оставляем активным', 'Зачем'],
          rows: [
            ['TEST INPUT ONLY', 'Loaders + Inputs + Preview', 'Проверить файлы, размеры и canvas'],
            ['TEST PREPROCESS', 'Inputs + нужный preprocessor + Preview', 'Проверить depth / edge / map до генерации'],
            ['TEST MASKS ONLY', 'Inputs + segmentation/masks + Preview', 'Проверить polarity, bounds и coordinate space'],
            ['TEST PPL ONLY', 'PPL Generate + Segment + Composite + local previews', 'Изолировать PEOPLE module'],
            ['TEST SDXL ONLY', 'Loaders + Inputs + SDXL + checkpoint preview', 'Проверить base generation'],
            ['TEST FLUX ONLY', 'Готовый input + FLUX + preview', 'Проверить финальный refinement'],
            ['FINAL FULL RUN', 'Все утверждённые production modules', 'Финальный интеграционный прогон'],
          ],
        },
        facts: [
          {
            status: 'inferred',
            title: 'Debug principle',
            text: 'Активировать минимальный маршрут, который способен воспроизвести проблему; только после исправления возвращать downstream-модули.',
          },
        ],
      },
      {
        id: 'resource-control',
        eyebrow: '08 · RESOURCES',
        title: 'BASE CONFIG также управляет стоимостью запуска',
        paragraphs: [
          'Отключение тяжёлой ветки — это не только визуальная чистота. Это способ не загружать лишние модели, не держать ненужные preprocessors в памяти и не выполнять downstream, который сейчас не тестируется.',
          'Особенно это важно на GPU с ограниченной VRAM: архитектурное управление графом становится частью performance engineering.',
        ],
      },
      {
        id: 'practice',
        eyebrow: '09 · PRACTICE',
        title: 'Практика: спроектировать BASE CONFIG до добавления генеративных нод',
        paragraphs: [
          'Создай пустой учебный canvas и сначала нарисуй только группы: MODEL LOADERS, INPUTS, CONTROL, PREPROCESS, MASKS, PROCESS A, PROCESS B, OUTPUT. Затем запиши, какие группы должны быть активны для трёх режимов: Input Test, Module Test и Full Run.',
          'На этом упражнении не требуется ни одна AI-модель. Цель — научиться проектировать control plane до того, как граф станет большим.',
        ],
        codeExamples: [
          {
            title: 'Будущий standalone lab',
            label: 'PLANNED JSON',
            code: 'HANSEN_00_BASE_CONFIG_PRO_GRAPH_v01.json',
            note: 'Отдельный учебный JSON будет содержать только группы, bypass/control logic, demo branches, debug profiles и notes — без генеративных моделей.',
          },
        ],
      },
    ],
  },
];
