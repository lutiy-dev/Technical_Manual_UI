import type { Chapter } from '../manual-types';

export const workflowEngineeringSwitchesRoutingChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-switches-routing',
    navTitle: 'Switches, Selectors & Bypass',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'Switches, Selectors & Bypass Routing — как граф выбирает маршрут',
    lede:
      'Большой ComfyUI-граф перестаёт быть «кашей», когда разделяешь четыре разных механизма: group описывает модуль, bypass включает или исключает его из исполнения, selector выбирает один из маршрутов, а shared control задаёт authoritative value сразу нескольким переключателям.',
    status: 'confirmed',
    statusNote:
      'Логика selector tree подтверждена topology Hansen; поведение Fast Groups Bypasser подтверждено исходным кодом rgthree-comfy, где modeOff=4 используется как Comfy bypass.',
    visual: 'selectors',
    category: 'workflow-engineering',
    stage: 'switches-routing',
    relatedNodes: [459, 522, 543, 552, 685, 715, 829],
    relatedChapters: [
      'workflow-engineering-base-config',
      'workflow-engineering-data-control-plane',
      'workflow-engineering-module-contracts',
      'selector-logic',
      'positioning',
    ],
    sections: [
      {
        id: 'four-mechanisms',
        eyebrow: '01 · FOUR MECHANISMS',
        title: 'Group, Bypass, Selector и Shared Control — это не одно и то же',
        table: {
          columns: ['Mechanism', 'Главный вопрос', 'Что меняет'],
          rows: [
            ['GROUP', 'Что это за модуль?', 'Организацию и границы функционального блока'],
            ['BYPASS', 'Нужно ли этому модулю участвовать?', 'Execution state нод / группы'],
            ['SELECTOR / SWITCH', 'Какой вход идёт дальше?', 'Active data route'],
            ['SHARED CONTROL', 'Кто задаёт значение?', 'Authoritative INT / FLOAT / STRING для нескольких consumers'],
          ],
        },
        paragraphs: [
          'Самая частая ошибка при чтении больших workflow — воспринимать любой переключатель как «вкл/выкл». На практике часть controls выбирает branch, часть меняет node mode, часть только передаёт числовое значение downstream.',
          'Поэтому сначала определяй тип управления, и только потом пытайся понять конкретное значение 0/1/2.',
        ],
      },
      {
        id: 'mental-model',
        eyebrow: '02 · MENTAL MODEL',
        title: 'Четыре вопроса, которые сразу распутывают routing',
        codeExamples: [
          {
            title: 'Routing checklist',
            label: 'READ IN THIS ORDER',
            code:
              '1. GROUP      → какой это модуль?\n' +
              '2. BYPASS     → модуль вообще активен?\n' +
              '3. SELECTOR   → какой input выбран?\n' +
              '4. CONTROL    → откуда приходит значение selector?',
            note: 'Не начинай с цифры внутри switch. Начинай с источника управления и destination route.',
          },
        ],
      },
      {
        id: 'hansen-master-selector',
        eyebrow: '03 · HANSEN CASE',
        title: 'Node 543 — не «ещё одна цифра», а master selector PEOPLE/PPL',
        paragraphs: [
          'В Hansen workflow один linked INT control 543 управляет сразу несколькими selectors. Это означает, что изменение одного значения синхронно перестраивает несколько мест маршрута PEOPLE/PPL.',
          'Поэтому stored widget value внутри отдельного switch нельзя считать главным, если его Input socket связан с 543. Authoritative value находится upstream в 543.',
        ],
        table: {
          columns: ['Consumer', 'Что выбирает', 'Почему важно'],
          rows: [
            ['459', 'Какой PPL composite возвращается в main pipeline', 'Определяет итоговый people route перед 573 → 67 → 57'],
            ['522', 'Какой mask/image representation идёт в alternative branch', 'Влияет на inpaint / preview route'],
            ['552', 'Какой people source используется downstream', 'При mode 1 выбирается FLUX person 829; при alternative mode используется второй source'],
            ['715', 'Return / downstream source', 'Вложенный selector, который становится значим только когда downstream switch выбирает его ветку'],
          ],
        },
      },
      {
        id: 'nested-switch',
        eyebrow: '04 · NESTED SWITCH',
        title: 'Selector может быть подключён, но фактически не участвовать в текущем route',
        paragraphs: [
          'Node 715 подключён в graph topology, но при PEOPLE mode 1 downstream selector 552 выбирает свой первый вход — FLUX person 829. Значит output 715 существует в topology, но не определяет effective runtime route этого режима.',
          'При alternative mode downstream selectors переходят на вторые входы, и тогда 715 становится частью реально используемого пути. Именно поэтому topology и effective runtime map нужно читать отдельно.',
        ],
        codeExamples: [
          {
            title: 'Mode 1 vs alternative route',
            label: 'NESTED ROUTING',
            code:
              'MODE 1\n543 = 1\n→ 552 selects image1 = 829 FLUX person\n→ 715 connected but not selected downstream\n\n' +
              'ALTERNATIVE MODE\n543 selects second inputs\n→ 715 output enters 552 image2\n→ alternative route becomes effective',
          },
        ],
      },
      {
        id: 'bypass-vs-selector',
        eyebrow: '05 · BYPASS ≠ SELECT',
        title: 'Bypass отвечает «исполнять ли», selector — «что передать дальше»',
        paragraphs: [
          'Selector работает на уровне маршрутизации данных: он выбирает один из доступных входов. Bypass работает на уровне execution state ноды или группы. Эти механизмы могут существовать одновременно и решают разные задачи.',
          'В rgthree Fast Groups Bypasser официальный код переводит выключаемое состояние в mode 4, который прямо помечен как Comfy bypass. Этот node также предоставляет действия Bypass all, Enable all и Toggle all.',
        ],
        table: {
          columns: ['Ситуация', 'Что использовать'],
          rows: [
            ['Нужно временно исключить тяжёлый module из прогона', 'BYPASS / group bypass'],
            ['Нужно выбрать SDXL source или FLUX source', 'SELECTOR / SWITCH'],
            ['Нужно одним значением перестроить несколько switches', 'SHARED CONTROL'],
            ['Нужно просто визуально объединить related nodes', 'GROUP'],
          ],
        },
      },
      {
        id: 'fast-groups-bypasser',
        eyebrow: '06 · RGTHREE',
        title: 'Fast Groups Bypasser — панель управления execution state групп',
        paragraphs: [
          'Fast Groups Bypasser ищет groups в workflow и создаёт для них управляющие toggles. Это удобный control-plane layer: вместо ручного обхода десятков нод можно включать или bypass-ить целые functional blocks.',
          'Для учебного графа это особенно полезно: BASE CONFIG может содержать только понятные toggles типа INPUT, MASKS, PPL, SDXL, FLUX, UPSCALE, а внутренние ноды остаются внутри соответствующих групп.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'rgthree implementation',
            text: 'FastGroupsBypasser использует LiteGraph.ALWAYS для enabled state и mode 4 для bypass; exposed actions: Bypass all, Enable all, Toggle all.',
          },
        ],
      },
      {
        id: 'debug-order',
        eyebrow: '07 · DEBUG ORDER',
        title: 'Если «ветка не работает», проверяй routing раньше модели',
        bullets: [
          'Проверить, не находится ли нужная group в bypass.',
          'Найти selector непосредственно перед точкой, где исчезает нужный результат.',
          'Проследить linked control upstream до authoritative INT/FLOAT/STRING source.',
          'Подписать input1 / input2 реальными источниками, а не абстрактными номерами.',
          'Проверить nested selectors: выбран ли вообще upstream switch downstream-нодой.',
          'Только после подтверждения route диагностировать sampler, model, prompt или mask.',
        ],
      },
      {
        id: 'common-mistakes',
        eyebrow: '08 · COMMON MISTAKES',
        title: 'Почему переключатели кажутся хаосом',
        table: {
          columns: ['Ошибка чтения', 'Правильная трактовка'],
          rows: [
            ['Смотрим только на число 1/2 внутри switch', 'Сначала выясняем, что физически подключено к input1 / input2'],
            ['Верим visible widget value', 'Linked input может переопределять stored widget value'],
            ['Считаем connected branch активной', 'Connected не означает selected; нужен effective runtime route'],
            ['Путаем bypass и selector', 'Bypass меняет execution state, selector меняет data route'],
            ['Меняем сразу несколько switches вручную', 'Ищем shared upstream control / single source of truth'],
          ],
        },
      },
      {
        id: 'practice-hansen',
        eyebrow: '09 · PRACTICE',
        title: 'Практика на Hansen: вручную распутать PEOPLE selector tree',
        bullets: [
          'Найти node 543 и записать его текущее effective value.',
          'Проследить четыре links до 459, 522, 552 и 715.',
          'Для каждого selector выписать, что реально подключено к первому и второму входу.',
          'Отдельно нарисовать MODE 1 route и alternative route стрелками.',
          'Отметить, какие branches connected, но not selected в каждом режиме.',
          'После этого переключить один master value и проверить previews, не меняя модель, prompt или seed.',
        ],
        codeExamples: [
          {
            title: 'Цель упражнения',
            label: 'YOU SHOULD BE ABLE TO SAY',
            code:
              '543 is the authoritative PEOPLE mode control.\n' +
              'It drives 459 / 522 / 552 / 715.\n' +
              'A connected branch is not necessarily the active branch.\n' +
              'Bypass controls execution; selectors control routing.',
            note: 'Если это можно объяснить без открытия модели — переключатели перестали быть «магией».',
          },
        ],
      },
    ],
  },
];
