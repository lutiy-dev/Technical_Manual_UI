import type { Chapter } from '../manual-types';

export const workflowEngineeringBaseConfigLabChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-base-config-lab',
    navTitle: 'LAB 02 · BASE CONFIG',
    eyebrow: 'PRACTICE LAB · WORKFLOW ENGINEERING',
    title: 'BASE CONFIG Lab: Fast Groups Bypasser как control plane графа',
    lede:
      'Второй практикум переносит routing logic на уровень целых групп. Задача — руками почувствовать разницу между topology, selected route и централизованным enable/bypass control до подключения SDXL, FLUX или других тяжёлых моделей.',
    status: 'confirmed',
    statusNote:
      'Механика Fast Groups Bypasser сверена с rgthree-comfy: нода автоматически собирает группы workflow, создаёт Enable-переключатели и переводит выключенные группы в Comfy bypass mode 4. Фильтрация по title/color и ограничения toggleRestriction являются штатными properties rgthree.',
    visual: 'controls',
    category: 'workflow-engineering',
    stage: 'workflow-engineering-practice-lab-02',
    relatedChapters: [
      'workflow-engineering-base-config',
      'workflow-engineering-data-control-plane',
      'workflow-engineering-switches-routing',
      'workflow-engineering-execution-cache',
      'workflow-engineering-routing-lab',
      'workflow-engineering-module-contracts',
    ],
    sections: [
      {
        id: 'goal',
        eyebrow: '01 · GOAL',
        title: 'Что меняется после LAB 01',
        paragraphs: [
          'LAB 01 учил выбирать маршрут внутри data flow. LAB 02 поднимается на уровень выше: теперь мы управляем не отдельным selector, а состоянием целых функциональных групп.',
          'Это и есть первый настоящий control plane. BASE CONFIG не переносит IMAGE или MASK. Он меняет состояние тех модулей, через которые эти данные могут проходить.',
        ],
        codeExamples: [
          {
            title: 'Два уровня управления',
            label: 'MENTAL MODEL',
            code:
              'BASE CONFIG / GROUP BYPASS  → WHICH MODULES ARE AVAILABLE?\n' +
              'SELECTOR / SWITCH            → WHICH AVAILABLE ROUTE IS SELECTED?\n' +
              'DATA PLANE                   → WHAT DATA ACTUALLY FLOWS?',
          },
        ],
      },
      {
        id: 'verified-mechanics',
        eyebrow: '02 · RGTHREE MECHANICS',
        title: 'Что Fast Groups Bypasser делает на самом деле',
        paragraphs: [
          'Fast Groups Bypasser — frontend/control node без обычного data input. Он сканирует группы workflow и создаёт строку Enable <group title> для каждой подходящей группы.',
          'В состоянии ON nodes группы переводятся в normal execution mode. В состоянии OFF Bypasser использует mode 4 — Comfy bypass. Это отличается от Fast Groups Muter, у которого OFF соответствует NEVER/MUTE.',
        ],
        table: {
          columns: ['Property / Action', 'Назначение'],
          rows: [
            ['matchTitle', 'Фильтрация групп по title; поддерживается строка/regex'],
            ['matchColors', 'Фильтрация по group color'],
            ['sort', 'position / alphanumeric / custom alphabet'],
            ['showNav', 'Показывает стрелку быстрого перехода к группе'],
            ['toggleRestriction', 'default / max one / always one'],
            ['Bypass all', 'Перевести управляемые группы в bypass с учётом restriction'],
            ['Enable all', 'Включить управляемые группы с учётом restriction'],
            ['Toggle all', 'Инвертировать управляемые toggles с учётом restriction'],
          ],
        },
        facts: [
          {
            status: 'confirmed',
            title: 'Важное ограничение restriction',
            text: 'max one / always one гарантируются при переключении через сам Fast Groups node. Если менять mode нод внутри групп вручную, состояние может разойтись с этой логикой.',
          },
        ],
      },
      {
        id: 'build',
        eyebrow: '03 · BUILD',
        title: 'Собери control-plane поверх Routing Sandbox',
        paragraphs: [
          'Возьми LAB 01 как основу. Ноды оставляем простыми: две text-ветки → selector → output. Теперь добавляем группы и центральную панель управления.',
        ],
        codeExamples: [
          {
            title: 'LAB 02 topology',
            label: 'NODE FLOW',
            code:
              '[GROUP ROUTE_A]\n' +
              '  easy promptLine: ROUTE A\n' +
              '            \\n' +
              '             → [GROUP SELECTOR] easy textIndexSwitch → [GROUP OUTPUT] showAnything\n' +
              '            /\n' +
              '[GROUP ROUTE_B]\n' +
              '  easy promptLine: ROUTE B\n' +
              '\n' +
              '[BASE CONFIG · Fast Groups Bypasser]   ← no data cable required',
          },
        ],
        bullets: [
          'Создай группы ROUTE_A, ROUTE_B, SELECTOR и OUTPUT.',
          'Fast Groups Bypasser поставь отдельно, вне управляемых групп.',
          'В Properties Fast Groups Bypasser задай matchTitle = ^ROUTE_.',
          'Панель должна показывать только Enable ROUTE_A и Enable ROUTE_B.',
          'Оставь toggleRestriction = default для первого опыта.',
          'Начальный selector: index = 0.',
        ],
      },
      {
        id: 'experiment-a',
        eyebrow: '04 · EXPERIMENT A',
        title: 'Bypass невыбранной ветки',
        table: {
          columns: ['Состояние', 'Действие', 'Ожидаемый смысл'],
          rows: [
            ['index = 0; A ON; B ON', 'Queue Prompt', 'Output зависит от ROUTE_A'],
            ['index = 0; A ON; B OFF', 'Queue Prompt', 'ROUTE_B bypassed, но current selected route остаётся A'],
            ['index = 0; A ON; B ON', 'Enable ROUTE_B', 'Topology прежняя; меняется только availability группы'],
          ],
        },
        facts: [
          {
            status: 'confirmed',
            title: 'Что мы доказываем',
            text: 'Group enabled state и selector state независимы. Можно изменить availability невыбранной ветки, не меняя selected route.',
          },
        ],
      },
      {
        id: 'experiment-b',
        eyebrow: '05 · EXPERIMENT B',
        title: 'Сначала availability, потом selection',
        paragraphs: [
          'Верни обе группы в ON. Переключи selector на index = 1 и проверь ROUTE_B. Затем верни index = 0. Задача — привыкнуть читать систему двумя вопросами подряд: сначала «какие модули доступны?», потом «какой из доступных маршрутов выбран?».',
        ],
        codeExamples: [
          {
            title: 'Runtime reading order',
            label: 'CONTROL PLANE',
            code:
              '1. BASE CONFIG → ROUTE_A enabled? ROUTE_B enabled?\n' +
              '2. SELECTOR    → index 0 or 1?\n' +
              '3. OUTPUT      → which upstream is required?\n' +
              '4. CACHE       → what actually needs recomputation?',
          },
        ],
      },
      {
        id: 'experiment-c',
        eyebrow: '06 · EXPERIMENT C',
        title: 'max one и always one — это policy, а не data routing',
        paragraphs: [
          'Поставь toggleRestriction = max one. Переключая ROUTE_A и ROUTE_B именно через Fast Groups Bypasser, посмотри, как панель удерживает максимум одну включённую группу. Затем попробуй always one: панель должна стремиться оставить хотя бы одну группу включённой.',
          'Не путай это с selector. Ограничение отвечает за допустимое состояние control plane, но не определяет само по себе, какой вход downstream selector выберет.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Не абсолютная блокировка',
            text: 'rgthree отдельно предупреждает: restriction применяется к действиям через Fast Groups node. Ручное изменение modes внутри групп может нарушить ожидаемое max-one/always-one состояние.',
          },
        ],
      },
      {
        id: 'experiment-d',
        eyebrow: '07 · EXPERIMENT D',
        title: 'Фильтр групп — основа профессионального BASE CONFIG',
        paragraphs: [
          'Сделай вторую копию Fast Groups Bypasser. Первую оставь с matchTitle = ^ROUTE_. Для второй используй matchTitle = ^PROCESS_ после создания двух пустых учебных PROCESS-групп.',
          'Так становится видно, что один большой workflow может иметь несколько control panels: например PPL CONFIG, PROCESS CONFIG и OUTPUT CONFIG. Это уже архитектурный приём, а не особенность конкретной модели.',
        ],
        codeExamples: [
          {
            title: 'Control-plane partitioning',
            label: 'ARCHITECTURE',
            code:
              'BASE CONFIG · ROUTES   → matchTitle ^ROUTE_\n' +
              'BASE CONFIG · PROCESS  → matchTitle ^PROCESS_\n' +
              'BASE CONFIG · OUTPUT   → matchTitle ^OUTPUT_',
            note: 'Это наша production convention. rgthree предоставляет filtering mechanism; конкретная naming architecture задаётся нами.',
          },
        ],
      },
      {
        id: 'hansen-transfer',
        eyebrow: '08 · TRANSFER TO HANSEN',
        title: 'Теперь прочитай BASE CONFIG Hansen как карту систем',
        paragraphs: [
          'После лаборатории большая жёлтая панель Hansen уже должна восприниматься не как набор загадочных yes/no. Это каталог функциональных подсистем production workflow.',
        ],
        bullets: [
          'MODEL LOADERS — availability ресурсоёмких loaders.',
          'INPUTS — входной слой.',
          'CONTROL / SAMPLER CONFIGURATION — shared control layer.',
          'ControlNet PREPROCESSORS + EXTRAS — preprocessing subsystem.',
          'MASKS — mask subsystem.',
          'PPL FLUX Generate / SEGMENTATION / Composite / 3D Inpaint — независимые PEOPLE stages.',
          'Process SEGMENTATION / SDXL / FLUX / UPSCALE / ADD LOGO — processing stages.',
          'OUTPUT — terminal stage.',
        ],
      },
      {
        id: 'profiles',
        eyebrow: '09 · PRODUCTION THINKING',
        title: 'Следующий уровень — runtime profiles',
        paragraphs: [
          'Named profiles вроде MASK DEBUG, PEOPLE ONLY или FINAL FULL RUN — это наша архитектурная надстройка, а не встроенная функция Fast Groups Bypasser. Их смысл — заранее определить минимальный набор enabled modules для конкретной задачи.',
        ],
        table: {
          columns: ['Profile', 'Идея'],
          rows: [
            ['INPUT CHECK', 'INPUTS + OUTPUT/preview; тяжёлые process branches выключены'],
            ['MASK DEBUG', 'INPUTS + preprocessors + masks + diagnostic output'],
            ['PEOPLE LAB', 'только необходимые PPL stages и return checkpoint'],
            ['BASE GENERATION', 'основной SDXL/ControlNet route без optional upscale/logo'],
            ['FINAL FULL RUN', 'production route с финальными optional stages по задаче'],
          ],
        },
      },
      {
        id: 'pass',
        eyebrow: '10 · PASS CRITERIA',
        title: 'LAB 02 пройден, когда BASE CONFIG перестаёт быть магией',
        bullets: [
          'Ты можешь объяснить, почему Fast Groups Bypasser не нуждается в обычном data cable.',
          'Ты различаешь ENABLE/BYPASS группы и SELECT конкретного маршрута.',
          'Ты понимаешь назначение matchTitle и можешь ограничить панель нужным семейством групп.',
          'Ты знаешь разницу между default, max one и always one.',
          'Ты можешь посмотреть на Hansen BASE CONFIG и назвать подсистемы, а не просто перечислить переключатели.',
          'Ты можешь предложить минимальный runtime profile для конкретного теста.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Следующий шаг',
            text: 'После LAB 02 переходим к LAB 03: Module Contract — INPUT → PROCESS → CHECKPOINT → RETURN. Там впервые соберём маленький production-style модуль с чёткой границей ответственности.',
          },
        ],
      },
    ],
  },
];
