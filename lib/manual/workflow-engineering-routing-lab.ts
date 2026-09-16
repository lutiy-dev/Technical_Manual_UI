import type { Chapter } from '../manual-types';

export const workflowEngineeringRoutingLabChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-routing-lab',
    navTitle: 'LAB 01 · Routing Sandbox',
    eyebrow: 'PRACTICE LAB · WORKFLOW ENGINEERING',
    title: 'Routing Sandbox: selector, bypass, lazy execution и cache без генеративных моделей',
    lede:
      'Первый практикум специально убирает SDXL, FLUX, VAE и модели из поля зрения. Здесь остаётся только логика графа: два источника данных, selector, output, Queue Prompt, bypass и наблюдение за тем, какая ветка реально требуется движку.',
    status: 'confirmed',
    statusNote:
      'Лаборатория построена на уже установленном в ARCHVIZ_LAB ComfyUI-Easy-Use: textIndexSwitch использует lazy inputs, поэтому подходит для демонстрации selected route и dependency-driven execution.',
    visual: 'selectors',
    category: 'workflow-engineering',
    stage: 'workflow-engineering-practice-lab-01',
    relatedChapters: [
      'workflow-engineering-data-control-plane',
      'workflow-engineering-switches-routing',
      'workflow-engineering-execution-cache',
      'workflow-engineering-module-contracts',
    ],
    sections: [
      {
        id: 'goal',
        eyebrow: '01 · GOAL',
        title: 'Что ты должен почувствовать руками за 10–15 минут',
        paragraphs: [
          'Цель не в том, чтобы запомнить очередные названия nodes. Цель — увидеть разницу между CONNECTED, SELECTED, REQUIRED и EXECUTED.',
          'После практикума большой Hansen-граф должен читаться уже не как паутина, а как набор веток, из которых selector выбирает текущий runtime route.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Главный вопрос',
            text: 'Не «куда идёт провод?», а «какой upstream сейчас действительно требуется выбранному output?»',
          },
          {
            status: 'confirmed',
            title: 'Почему без моделей',
            text: 'Ни VRAM, ни sampler, ни prompt quality не должны отвлекать от routing logic.',
          },
        ],
      },
      {
        id: 'graph',
        eyebrow: '02 · BUILD',
        title: 'Собери минимальный граф из четырёх функциональных частей',
        codeExamples: [
          {
            title: 'Routing Sandbox v001',
            label: 'NODE FLOW',
            code:
              '[A · easy promptLine: ROUTE A]\n' +
              '                 ├──→ [easy textIndexSwitch] ──→ [easy showAnything · OUTPUT]\n' +
              '[B · easy promptLine: ROUTE B]\n' +
              '\n' +
              'index = 0 → ROUTE A\n' +
              'index = 1 → ROUTE B',
            note: 'У textIndexSwitch inputs lazy: selector запрашивает только выбранный textN.',
          },
        ],
        bullets: [
          'Создай два easy promptLine и подпиши группы ROUTE A и ROUTE B.',
          'В A напиши ROUTE A · ORIGINAL. В B — ROUTE B · ORIGINAL.',
          'Создай easy textIndexSwitch и подключи A → text0, B → text1.',
          'Выход text подключи в easy showAnything. Это единственный output лаборатории.',
          'Начальное значение selector: index = 0.',
        ],
      },
      {
        id: 'experiment-selector',
        eyebrow: '03 · EXPERIMENT A',
        title: 'CONNECTED ≠ SELECTED',
        table: {
          columns: ['Действие', 'Ожидаемый output', 'Что доказываем'],
          rows: [
            ['index = 0 → Queue Prompt', 'ROUTE A · ORIGINAL', 'A selected; B физически подключена, но не выбрана'],
            ['index = 1 → Queue Prompt', 'ROUTE B · ORIGINAL', 'Selector меняет effective route без переподключения проводов'],
            ['вернуть index = 0', 'ROUTE A · ORIGINAL', 'Topology не менялась; изменилось только control value'],
          ],
        },
        facts: [
          {
            status: 'confirmed',
            title: 'Механика textIndexSwitch',
            text: 'Index выбирает один textN; lazy status запрашивает только соответствующий вход.',
          },
        ],
      },
      {
        id: 'experiment-dependency',
        eyebrow: '04 · EXPERIMENT B',
        title: 'CONNECTED ≠ REQUIRED',
        paragraphs: [
          'Оставь index = 0. Измени текст только в ROUTE B на ROUTE B · CHANGED и нажми Queue Prompt.',
          'Главное наблюдение: output всё ещё должен показывать ROUTE A. Изменение невыбранной ветки не делает её частью текущего required path.',
        ],
        codeExamples: [
          {
            title: 'Dependency question',
            label: 'MENTAL MODEL',
            code:
              'OUTPUT\n' +
              '← textIndexSwitch(index = 0)\n' +
              '← text0\n' +
              '← ROUTE A\n' +
              '\n' +
              'ROUTE B exists, but current OUTPUT does not depend on it.',
          },
        ],
      },
      {
        id: 'experiment-cache',
        eyebrow: '05 · EXPERIMENT C',
        title: 'REQUIRED ≠ обязательно пересчитано с нуля',
        paragraphs: [
          'Не меняя index и ROUTE A, нажми Queue Prompt ещё раз. Затем поменяй ROUTE A на ROUTE A · CHANGED и снова запусти.',
          'Смысл опыта — привыкнуть разделять requirement graph и execution/cache. Один и тот же required route может частично использовать уже валидные результаты, пока изменение входа не инвалидирует соответствующий участок.',
        ],
        facts: [
          {
            status: 'inferred',
            title: 'Что наблюдать в UI',
            text: 'Смотри, какие nodes реально подсвечиваются как выполняющиеся после изменения выбранной и невыбранной ветки; конкретная визуализация зависит от версии frontend.',
          },
        ],
      },
      {
        id: 'experiment-bypass',
        eyebrow: '06 · EXPERIMENT D',
        title: 'BYPASS — отдельная ось управления',
        paragraphs: [
          'Теперь намеренно переведи одну из source nodes или тестовую группу в bypass и посмотри, чем это отличается от простого выбора другого selector index.',
          'Selector отвечает: какой вход использовать. Bypass отвечает: должна ли конкретная нода или группа работать в своём обычном режиме. Это не одно и то же состояние.',
        ],
        codeExamples: [
          {
            title: 'Do not merge these concepts',
            label: 'CONTROL PLANE',
            code:
              'SELECTOR → WHICH ROUTE?\n' +
              'BYPASS   → SHOULD THIS NODE/GROUP PROCESS NORMALLY?\n' +
              'CACHE    → CAN A VALID RESULT BE REUSED?\n' +
              'OUTPUT   → WHAT DOES THE ENGINE ACTUALLY NEED?',
          },
        ],
      },
      {
        id: 'hansen-transfer',
        eyebrow: '07 · TRANSFER TO HANSEN',
        title: 'После sandbox открой PEOPLE/PPL и задай те же четыре вопроса',
        table: {
          columns: ['Sandbox', 'Hansen PEOPLE/PPL'],
          rows: [
            ['index', 'master / linked selector value'],
            ['ROUTE A / B', 'FLUX person route / alternate route'],
            ['textIndexSwitch', '459 / 522 / 552 selector family'],
            ['showAnything output', 'return into downstream / final output'],
          ],
        },
        bullets: [
          'Какая ветка CONNECTED?',
          'Какая ветка SELECTED?',
          'Какая ветка REQUIRED текущему output?',
          'Что реально EXECUTED, а что могло прийти из cache?',
        ],
      },
      {
        id: 'pass',
        eyebrow: '08 · PASS CRITERIA',
        title: 'Практикум пройден, когда ты можешь объяснить это без подсказки',
        bullets: [
          'Почему подключённая ветка может не участвовать в результате.',
          'Почему selector не равен bypass.',
          'Почему положение ноды слева или справа не задаёт порядок исполнения.',
          'Почему изменение невыбранной ветки не обязательно влияет на текущий output.',
          'Почему повторный Queue Prompt не означает полный пересчёт всего canvas.',
          'Как найти effective runtime route в большом production workflow.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Критерий перехода дальше',
            text: 'Если эти шесть пунктов понятны на sandbox, можно переходить к Modules & I/O Contracts и затем разбирать Hansen уже как инженерный граф.',
          },
        ],
      },
    ],
  },
];
