import type { Chapter } from '../manual-types';

export const workflowEngineeringExecutionCacheChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-execution-cache',
    navTitle: 'Execution Model, Queue & Cache',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'Execution Model, Queue & Cache — почему граф запускается не слева направо',
    lede:
      'ComfyUI исполняет не рисунок на canvas, а dependency graph. Положение ноды на экране не задаёт порядок вычисления: runtime строит топологическую зависимость от requested outputs, переиспользует валидный cache и пересчитывает только то, что стало dirty или больше не совпадает по input signature.',
    status: 'confirmed',
    statusNote:
      'ExecutionList в текущем ComfyUI реализован поверх topological sort; execution.py отдельно сообщает cached nodes, а caching.py строит cache keys из class type, inputs и ancestry.',
    visual: 'graph-reading',
    category: 'workflow-engineering',
    stage: 'execution-cache',
    relatedChapters: [
      'workflow-engineering-graph-literacy',
      'workflow-engineering-switches-routing',
      'workflow-engineering-module-contracts',
      'workflow-engineering-debugging',
      'workflow-engineering-reproducibility',
    ],
    sections: [
      {
        id: 'not-left-to-right',
        eyebrow: '01 · FIRST PRINCIPLE',
        title: 'Canvas layout помогает человеку, но не определяет execution order',
        paragraphs: [
          'Нода справа может вычислиться только после того, как готовы все её реальные upstream dependencies. Нода слева, которая не нужна выбранному output route, не обязана участвовать в текущем выполнении только потому, что визуально находится «раньше».',
          'Поэтому professional layout важен для чтения, но runtime truth находится в links и dependency graph.',
        ],
        codeExamples: [
          {
            title: 'Human layout vs runtime dependency',
            label: 'MENTAL MODEL',
            code:
              'CANVAS VIEW\n' +
              'left → middle → right\n\n' +
              'RUNTIME VIEW\n' +
              'requested output\n' +
              '← required ancestor\n' +
              '← required ancestor\n' +
              '← source',
            note: 'Читай graph в обе стороны: для понимания сигнала — downstream, для понимания execution — от output к его ancestors.',
          },
        ],
      },
      {
        id: 'topological-execution',
        eyebrow: '02 · TOPOLOGICAL ORDER',
        title: 'ExecutionList разрешает зависимости, а не координаты нод',
        paragraphs: [
          'В текущем ComfyUI ExecutionList построен поверх topological sort. Перед выполнением ноды runtime должен иметь готовые значения тех upstream nodes, от которых она зависит.',
          'Это объясняет, почему большое полотно можно свободно раскладывать по группам и колонкам: визуальный порядок предназначен для человека, dependency order — для engine.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'ComfyUI implementation',
            text: 'comfy_execution/graph.py описывает ExecutionList как topological dissolve of the graph и отдельно отслеживает staged node, dependencies и cached values.',
          },
        ],
      },
      {
        id: 'output-driven',
        eyebrow: '03 · OUTPUT TARGETS',
        title: 'Сначала определяется нужный результат, затем его upstream requirements',
        paragraphs: [
          'Execution engine формирует список output targets и добавляет их в execution list. Дальше вычисление раскрывает необходимые dependencies. Это полезная модель для диагностики: если хочешь понять, почему выполняется ветка, найди output, который от неё зависит.',
          'В сложном production workflow это особенно важно для previews, saves и alternative branches: наличие ноды в JSON ещё не означает, что она нужна текущему result path.',
        ],
        codeExamples: [
          {
            title: 'Output-driven route',
            label: 'DEPENDENCY WALK',
            code:
              'SAVE / PREVIEW / OUTPUT\n' +
              '← FINAL IMAGE\n' +
              '← SELECTED BRANCH\n' +
              '← PROCESSING MODULE\n' +
              '← SOURCE + CONTROLS',
          },
        ],
      },
      {
        id: 'cache-basics',
        eyebrow: '04 · CACHE',
        title: 'Повторный Queue не обязательно означает повторный расчёт всего графа',
        paragraphs: [
          'ComfyUI хранит промежуточные outputs и при следующем запуске может использовать cached result, если input signature соответствующей ноды и её dependency context не изменились.',
          'В execution.py cached nodes собираются отдельно и отправляются клиенту событием execution_cached. Это не «пропущенная» работа, а нормальная оптимизация графа.',
        ],
        table: {
          columns: ['Что произошло', 'Ожидаемое поведение'],
          rows: [
            ['Ничего relevant не изменилось', 'Большая часть route может прийти из cache'],
            ['Изменён upstream parameter', 'Изменившаяся нода и зависимый downstream route требуют нового расчёта'],
            ['Изменён unrelated branch', 'Независимый output route может сохранить валидный cache'],
            ['Node сообщает собственный IS_CHANGED / fingerprint', 'Cache validity учитывает этот сигнал'],
          ],
        },
      },
      {
        id: 'cache-signature',
        eyebrow: '05 · INPUT SIGNATURE',
        title: 'Cache связан не только с ID ноды, но и с её inputs и ancestry',
        paragraphs: [
          'Текущая caching implementation строит signature из class type, change fingerprint и inputs. Для linked inputs в signature учитывается ancestor и socket, а ancestry обходится детерминированно.',
          'Отсюда важный production вывод: изменение master control upstream способно сделать dirty несколько downstream stages даже тогда, когда визуально ты редактировал только маленькую control-ноду.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'CacheKeySetInputSignature',
            text: 'ComfyUI caching.py включает immediate node signature и ordered ancestry в cache key для input-signature cache.',
          },
        ],
      },
      {
        id: 'dirty-propagation',
        eyebrow: '06 · DIRTY PROPAGATION',
        title: 'Изменение нужно оценивать по downstream impact radius',
        paragraphs: [
          'Если shared seed, working resolution или selector изменён высоко в control plane, impact radius может быть большим. Если изменён локальный Color Match после готового cutout, пересчёт обычно ограничивается более поздней частью route.',
          'Это ещё одна причина проектировать workflow модульно: хороший boundary уменьшает область пересчёта и делает диагностику понятнее.',
        ],
        codeExamples: [
          {
            title: 'Impact radius',
            label: 'ENGINEERING VIEW',
            code:
              'CHANGE UPSTREAM CONTROL\n' +
              '→ invalidate affected node\n' +
              '→ invalidate dependent downstream path\n' +
              '→ keep unrelated cached path when valid',
          },
        ],
      },
      {
        id: 'queue-vs-execution',
        eyebrow: '07 · QUEUE',
        title: 'Queue Prompt — это запрос на вычисление graph state, а не команда «пройти все ноды»',
        paragraphs: [
          'Нажатие Queue отправляет runtime описание нужного состояния графа. Затем engine валидирует dependencies, определяет cached nodes и исполняет недостающую часть route.',
          'Поэтому две очереди одного workflow могут заметно отличаться по времени: первая строит тяжёлые intermediates, следующая может переиспользовать значительную часть результатов.',
        ],
      },
      {
        id: 'debug-reading',
        eyebrow: '08 · DEBUG METHOD',
        title: 'При странном поведении задавай три вопроса: selected? required? cached?',
        table: {
          columns: ['Question', 'Что проверяем'],
          rows: [
            ['SELECTED?', 'Selector / switch действительно ведёт по этой ветке?'],
            ['REQUIRED?', 'Есть ли текущий output, который зависит от этой ветки?'],
            ['CACHED?', 'Node реально исполнилась заново или runtime использовал сохранённый output?'],
          ],
        },
        paragraphs: [
          'Эти три вопроса отделяют routing problem от execution problem. После них уже имеет смысл разбирать model loading, sampler, mask или VRAM.',
        ],
      },
      {
        id: 'hansen-application',
        eyebrow: '09 · HANSEN APPLICATION',
        title: 'Как это меняет чтение большого Hansen workflow',
        bullets: [
          'Не читать 252 nodes как список слева направо — сначала выбрать конкретный output/checkpoint.',
          'От output пройти upstream и выписать только required route.',
          'На каждом selector определить selected branch.',
          'Отдельно отметить bypassed modules, чтобы не включать их в effective runtime map.',
          'После Queue смотреть, какие checkpoints обновились, а какие остались cached.',
          'При тесте менять одну переменную и оценивать её downstream impact radius.',
        ],
      },
      {
        id: 'practice',
        eyebrow: '10 · PRACTICE',
        title: 'Практика: доказать cache и dependency execution на маленьком графе',
        bullets: [
          'Запустить простой route до Preview/Save и зафиксировать время первого run.',
          'Ничего не менять и повторить Queue; отметить, какие nodes runtime считает cached.',
          'Изменить один поздний parameter и посмотреть, насколько коротким становится recalculated tail.',
          'Изменить один ранний shared control и сравнить impact radius.',
          'Переключить selector на alternative branch и увидеть, как меняется required ancestry.',
          'Сформулировать словами: какая нода стала dirty первой и почему downstream пришлось пересчитать.',
        ],
        codeExamples: [
          {
            title: 'Критерий понимания',
            label: 'YOU SHOULD BE ABLE TO SAY',
            code:
              'ComfyUI does not execute by screen position.\n' +
              'It resolves dependencies for requested outputs.\n' +
              'Valid cached outputs are reused.\n' +
              'Changing an upstream control expands the recalculation radius downstream.',
          },
        ],
      },
    ],
  },
];
