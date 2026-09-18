import type { Chapter } from '../manual-types';

export const coursePracticeLabChapters: Chapter[] = [
  {
    index: 0,
    slug: 'lab-04-master-graph-reading',
    navTitle: 'LAB 04 · Read the Master',
    eyebrow: 'PRACTICE LAB · FOUNDATION',
    title: 'Read the Master — понять большой graph до первого Queue Prompt',
    lede:
      'Лаборатория закрывает Foundation практикой: научиться читать Hansen как карту systems, inputs, controls, resources и return points, не запуская генерацию. Это обязательный переход от «вижу сотни нод» к «вижу несколько модулей и их contracts».',
    status: 'confirmed',
    statusNote:
      'Это ARCHVIZ FOUNDATION / EXTENSION. Упражнение использует подтверждённую архитектуру Hansen; цель — навык чтения graph, а не воспроизведение конкретной модели.',
    visual: 'graph-reading',
    category: 'foundation',
    stage: 'practice-lab-04',
    relatedChapters: ['overview', 'graph-reading', 'inputs', 'control-panel', 'models-dependencies'],
    sections: [
      {
        id: 'goal',
        eyebrow: '01 · GOAL',
        title: 'Что должен уметь студент после LAB 04',
        bullets: [
          'Найти BASE CONFIG, INPUTS, MODEL LOADERS, CONTROL, PROCESS modules и OUTPUT без чтения каждой ноды.',
          'Показать active route и отличить его от connected-but-not-selected и bypassed branches.',
          'Назвать минимум пять authoritative controls и их consumers.',
          'Найти model/resource boundaries: где workflow загружает тяжёлые assets и где переиспользует их.',
          'Для одного module сформулировать INPUT → PROCESS → CHECKPOINT → RETURN.',
        ],
      },
      {
        id: 'exercise-a',
        eyebrow: '02 · EXERCISE A',
        title: 'Canvas map: сначала районы, потом улицы',
        bullets: [
          'Открыть копию Hansen workflow и ничего не запускать.',
          'На листе или в заметке выписать крупные groups слева направо.',
          'Для каждой group одной фразой написать ответственность.',
          'Не отслеживать внутренние links, пока карта major modules не готова.',
        ],
      },
      {
        id: 'exercise-b',
        eyebrow: '03 · EXERCISE B',
        title: 'Control hunt: найти, кто реально управляет graph',
        bullets: [
          'Найти generation mode 541, PEOPLE mode 543, ControlNet source 456, working resolution 702 и shared steps 771.',
          'Для каждого control найти минимум один downstream consumer.',
          'Если downstream widget показывает другое значение — определить effective linked value.',
        ],
      },
      {
        id: 'exercise-c',
        eyebrow: '04 · EXERCISE C',
        title: 'Resource boundary: где живут модели',
        bullets: [
          'Найти SDXL checkpoint / VAE / ControlNet loaders.',
          'Найти FLUX UNet / CLIP / VAE loaders.',
          'Отметить, какие loaders обслуживают несколько downstream modules.',
          'Объяснить, почему loader — это ресурсная граница, а не «просто ещё одна нода».',
        ],
      },
      {
        id: 'pass',
        eyebrow: '05 · PASS CRITERIA',
        title: 'LAB 04 пройден, если graph можно объяснить без запуска',
        bullets: [
          'Ты можешь за 2–3 минуты описать маршрут INPUT → BASE GENERATION → LOCAL MODULES → FINAL → OUTPUT.',
          'Ты не путаешь control plane и data plane.',
          'Ты умеешь показать один bypassed branch и один selector-controlled branch.',
          'Ты можешь объяснить, почему 252 nodes — это не 252 независимые задачи.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'lab-05-generative-systems-bench',
    navTitle: 'LAB 05 · Generative Bench',
    eyebrow: 'PRACTICE LAB · GENERATIVE SYSTEMS',
    title: 'Generative Bench — один кадр, один seed, одна изменяемая переменная',
    lede:
      'Лаборатория закрывает Global Prompts, SDXL, ControlNet, IPAdapter/LoRA, masks и detail conservation. Главный навык — не «крутить всё сразу», а проводить контролируемый A/B test, где меняется ровно одна причина.',
    status: 'confirmed',
    statusNote:
      'ARCHVIZ FOUNDATION / EXTENSION. Конкретные Hansen settings используются как reference baseline; учебная цель — универсальный экспериментальный метод.',
    visual: 'sdxl',
    category: 'base-generation',
    stage: 'practice-lab-05',
    relatedChapters: ['global-prompts', 'sdxl', 'controlnet', 'ipadapter-lora', 'segmentation-masks', 'detail-conservation'],
    sections: [
      {
        id: 'rule',
        eyebrow: '01 · LAB RULE',
        title: 'Один benchmark — одна изменяемая переменная',
        codeExamples: [
          {
            title: 'A/B discipline',
            label: 'CONTROLLED TEST',
            code:
              'SAME INPUT\n' +
              '→ SAME SEED\n' +
              '→ SAME PROMPT\n' +
              '→ SAME SIZE\n' +
              '→ CHANGE ONE PARAMETER\n' +
              '→ COMPARE CHECKPOINTS',
          },
        ],
      },
      {
        id: 'prompt',
        eyebrow: '02 · PROMPT EXERCISE',
        title: 'Prompt: отделить content от style/light',
        bullets: [
          'Зафиксировать seed и geometry controls.',
          'Сделать baseline с текущим GLOBAL prompt.',
          'Изменить только LIGHT STYLE или один material descriptor.',
          'Сравнить не «красивее/хуже», а что именно изменилось: материал, свет, композиция, геометрия.',
        ],
      },
      {
        id: 'sdxl',
        eyebrow: '03 · SDXL EXERCISE',
        title: 'SDXL: доказать роль latent source и denoise',
        bullets: [
          'Сделать baseline Mode 1.',
          'Перейти к image-seeded варианту с тем же seed и минимальным denoise.',
          'Изменять denoise ступенями, не меняя prompt/control.',
          'Отметить порог, после которого начинает плыть архитектура.',
        ],
      },
      {
        id: 'controlnet',
        eyebrow: '04 · CONTROLNET EXERCISE',
        title: 'Depth vs Canny: удерживают разные типы структуры',
        table: {
          columns: ['Run', 'Control', 'Что оценить'],
          rows: [
            ['A', 'Depth only', 'Объём, перспектива, крупная геометрия'],
            ['B', 'Canny only', 'Контуры, рамы, тонкие фасадные линии'],
            ['C', 'Depth + Canny', 'Компромисс structure lock / freedom'],
          ],
        },
      },
      {
        id: 'ipadapter',
        eyebrow: '05 · REFERENCE EXERCISE',
        title: 'IPAdapter / LoRA: включать только после baseline',
        bullets: [
          'Сначала доказать baseline без reference conditioning.',
          'Подать reference и начать с малого weight.',
          'Сравнить, переносится ли желаемый visual language без разрушения архитектуры.',
          'Если результат нельзя объяснить одной переменной — тест считается недействительным.',
        ],
      },
      {
        id: 'masks',
        eyebrow: '06 · MASK EXERCISE',
        title: 'Mask сначала доказать как data, потом использовать для edit',
        bullets: [
          'Получить mask и вывести её в отдельный preview.',
          'Проверить границы до подключения inpaint/composite.',
          'Сделать grow/blur A/B и посмотреть только edge quality.',
          'Лишь после этого использовать mask в downstream operation.',
        ],
      },
      {
        id: 'detail',
        eyebrow: '07 · DETAIL CONSERVATION EXERCISE',
        title: 'Detail transfer: искать минимальную достаточную силу',
        bullets: [
          'Сравнить 0 / baseline / повышенную strength при одинаковом seed.',
          'Проверять окна, фасадный ритм, швы, мелкие конструктивные элементы.',
          'Выбрать минимальное значение, которое реально возвращает detail.',
        ],
      },
      {
        id: 'qc',
        eyebrow: '08 · QC / PASS',
        title: 'LAB 05 пройден, если результат можно объяснить причинно',
        bullets: [
          'Каждый comparison имеет baseline.',
          'В каждом run меняется только одна контролируемая переменная.',
          'Seed и input зафиксированы.',
          'Есть промежуточные previews, а не только финальный кадр.',
          'Ты можешь сказать, какой module вызвал конкретное изменение.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'lab-06-people-ppl-production-run',
    navTitle: 'LAB 06 · PEOPLE / PPL Run',
    eyebrow: 'PRACTICE LAB · PEOPLE / PPL',
    title: 'PEOPLE / PPL Production Run — пройти человека по checkpoints, а не по надежде',
    lede:
      'Практика связывает prompt, generation, Florence2/SAM2, preparation, positioning, selectors и composite. Студент проходит сначала Workflow 01, затем Workflow 02 и учится останавливаться на первом неправильном checkpoint.',
    status: 'confirmed',
    statusNote:
      'ARCHVIZ FOUNDATION / EXTENSION на базе подтверждённой PPL topology. Standalone importable JSON не заявляется: практика выполняется на копии Hansen master workflow до появления проверенного raw export.',
    visual: 'composite',
    category: 'people-ppl',
    stage: 'practice-lab-06',
    relatedChapters: [
      'node-408-prompt',
      'generation',
      'segmentation-mask',
      'preparation-color-match',
      'positioning',
      'ppl-workflow-01-generate-place',
      'ppl-workflow-02-replace-existing',
      'selector-logic',
      'ppl-mode-2-inpaint',
      'composite',
    ],
    sections: [
      {
        id: 'workflow01',
        eyebrow: '01 · WORKFLOW 01',
        title: 'Generate & Place: новый человек',
        codeExamples: [
          {
            title: 'Checkpoint route',
            label: 'PPL W01',
            code:
              'PROMPT\n' +
              '→ PERSON GENERATION [CHECK A]\n' +
              '→ DETECT / SEGMENT [CHECK B]\n' +
              '→ CUTOUT / COLOR MATCH [CHECK C]\n' +
              '→ POSITION / PASTE [CHECK D]\n' +
              '→ MAIN RETURN [CHECK E]',
          },
        ],
        bullets: [
          'Не чинить mask, если generated person уже плох на Check A.',
          'Не чинить composite, если cutout имеет halo на Check C.',
          'Person Mask и Placement Mask проверять отдельно.',
        ],
      },
      {
        id: 'workflow02',
        eyebrow: '02 · WORKFLOW 02',
        title: 'Replace Existing: spatial slot уже задан сценой',
        bullets: [
          'Выбрать существующего 3D/rendered person как placement truth.',
          'Проверить, что detection/crop относятся именно к нужной фигуре.',
          'Сгенерировать/улучшить appearance, не меняя исходный spatial slot.',
          'Сравнить original placement и returned composite по ногам, масштабу, окклюзиям и горизонту.',
        ],
      },
      {
        id: 'selector',
        eyebrow: '03 · SELECTOR EXERCISE',
        title: '543 и связанные switches: доказать effective route',
        bullets: [
          'Переключить PEOPLE mode осознанно.',
          'Проверить, какие downstream selectors получают linked control.',
          'Не верить локальному widget, пока не проверен incoming link.',
          'Отследить return до 459 и дальше в main pipeline.',
        ],
      },
      {
        id: 'failure-drill',
        eyebrow: '04 · FAILURE DRILL',
        title: 'Найти первый неправильный checkpoint',
        table: {
          columns: ['Симптом', 'Первое место проверки'],
          rows: [
            ['Неправильный человек', 'generation checkpoint'],
            ['Кусок тела пропал', 'SAM2 / grow / blur'],
            ['Белый/тёмный halo', 'Remove BG / cutout'],
            ['Человек «летит»', 'position / ground contact'],
            ['После FLUX человек изменился', 'PPL return vs main FLUX decode'],
          ],
        },
      },
      {
        id: 'pass',
        eyebrow: '05 · PASS CRITERIA',
        title: 'LAB 06 пройден, когда PEOPLE можно отладить по этапам',
        bullets: [
          'Ты различаешь Workflow 01 и Workflow 02 по spatial contract.',
          'Ты различаешь Person Mask и Placement Mask.',
          'Ты можешь показать пять checkpoints от person source до master return.',
          'При ошибке ты идёшь к первому неверному checkpoint, а не крутишь весь graph.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'lab-07-final-pipeline-delivery',
    navTitle: 'LAB 07 · Final Delivery',
    eyebrow: 'PRACTICE LAB · FINAL PIPELINE',
    title: 'Final Delivery — main FLUX, upscale и output как проверяемая цепочка',
    lede:
      'Финальная лаборатория перед capstone учит не путать улучшение результата с сохранением результата. Main FLUX, optional upscale и delivery outputs проверяются отдельными A/B checkpoints.',
    status: 'confirmed',
    statusNote:
      'ARCHVIZ FOUNDATION / EXTENSION. Active main FLUX route и bypassed upscale state опираются на подтверждённую topology текущего Hansen snapshot.',
    visual: 'output',
    category: 'final-pipeline',
    stage: 'practice-lab-07',
    relatedChapters: ['main-flux', 'upscale-overlay', 'output', 'diagnostics', 'checklist', 'examples'],
    sections: [
      {
        id: 'main-flux',
        eyebrow: '01 · MAIN FLUX',
        title: 'Сравнить PPL return и финальный decode',
        bullets: [
          'Зафиксировать seed и prompt.',
          'Сохранить checkpoint до main FLUX.',
          'Запустить main FLUX с baseline denoise.',
          'Сравнить архитектуру, людей и локальные детали до/после.',
          'Не считать refinement успешным, если он «красивее», но изменил утверждённую геометрию.',
        ],
      },
      {
        id: 'upscale',
        eyebrow: '02 · UPSCALE',
        title: 'Снять bypass только после принятого LQ',
        bullets: [
          'Сначала принять LQ output как content master.',
          'Включить upscale branch отдельно.',
          'Проверить seams, повторные детали, окна, людей и edge artifacts.',
          'Если HQ отличается по content, а не только по resolution/detail — вернуть branch в диагностику.',
        ],
      },
      {
        id: 'output',
        eyebrow: '03 · OUTPUT',
        title: 'Не путать разные save routes',
        bullets: [
          'Показать, какой save node является current active delivery.',
          'Отдельно обозначить optional HQ/LQ2 outputs.',
          'Проверить filename, resolution и upstream source каждого output.',
        ],
      },
      {
        id: 'golden-run',
        eyebrow: '04 · GOLDEN RUN',
        title: 'Сделать один эталонный прогон',
        bullets: [
          'Зафиксировать input files, seed, effective controls, enabled/bypassed modules.',
          'Сохранить ключевые checkpoints: base, people composite, pre-FLUX, final LQ, optional HQ.',
          'Этот run становится reference для будущих изменений workflow.',
        ],
      },
      {
        id: 'pass',
        eyebrow: '05 · PASS CRITERIA',
        title: 'LAB 07 пройден, когда delivery воспроизводим',
        bullets: [
          'Можно повторить run с теми же effective settings.',
          'Понятно, какой module отвечает за каждое отличие между checkpoints.',
          'LQ/HQ/output routes не смешаны.',
          'Есть один Golden Run, относительно которого можно делать regression checks.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'capstone-master-graph-certification',
    navTitle: 'CAPSTONE · Master Graph',
    eyebrow: 'FINAL PRACTICE · COURSE COMPLETION',
    title: 'Capstone — объяснить, запустить и диагностировать Hansen без подсказки',
    lede:
      'Это не экзамен на память названий нод. Финальная проверка отвечает на один вопрос: сформировалось ли универсальное мышление ComfyUI, которое переносится на следующий незнакомый workflow.',
    status: 'confirmed',
    statusNote:
      'Финальный pedagogical extension. Прохождение означает готовность перейти от учебника к самостоятельному освоению новых models/modules без нового курса.',
    visual: 'master',
    category: 'evidence-reference',
    stage: 'capstone',
    relatedChapters: ['overview', 'workflow-engineering-debugging', 'hansen-14-43-conclusion', 'checklist', 'examples'],
    sections: [
      {
        id: 'part-a',
        eyebrow: 'PART A · READ',
        title: 'Без Queue Prompt объяснить architecture',
        bullets: [
          'Назвать major modules и их responsibilities.',
          'Показать data plane и control plane.',
          'Показать active route, bypassed branch и selector-controlled alternative.',
          'Объяснить один module через INPUT → PROCESS → CHECKPOINT → RETURN.',
        ],
      },
      {
        id: 'part-b',
        eyebrow: 'PART B · RUN',
        title: 'Сделать controlled production run',
        bullets: [
          'Выбрать режим осознанно и записать effective controls.',
          'Зафиксировать seed.',
          'Сохранить промежуточные checkpoints.',
          'Изменить ровно одну переменную и сделать A/B comparison.',
        ],
      },
      {
        id: 'part-c',
        eyebrow: 'PART C · DEBUG',
        title: 'Намеренно создать одну проблему и найти её upstream',
        bullets: [
          'Например: неверный selector, слишком сильный denoise, плохая mask edge или bypass нужного module.',
          'Не искать проблему по всему canvas: идти от симптома к первому неверному checkpoint.',
          'После исправления повторить тот же seed и доказать изменение comparison.',
        ],
      },
      {
        id: 'part-d',
        eyebrow: 'PART D · TEACH BACK',
        title: 'Объяснить workflow своими словами',
        paragraphs: [
          'Если ты можешь объяснить другому человеку, зачем существуют controls, selectors, latent, mask, ControlNet, PEOPLE module и final refinement — ты уже не просто запускаешь чужой workflow. Ты понимаешь систему.',
        ],
      },
      {
        id: 'graduation',
        eyebrow: 'COURSE COMPLETE',
        title: 'Критерий завершения единственного фундаментального учебника',
        codeExamples: [
          {
            title: 'Transfer skill',
            label: 'FINAL RULE',
            code:
              'NEW WORKFLOW\n' +
              '→ IDENTIFY INPUTS\n' +
              '→ FIND CONTROLS\n' +
              '→ MAP MODULES\n' +
              '→ LOCATE CHECKPOINTS\n' +
              '→ TRACE RETURN\n' +
              '→ TEST ONE VARIABLE\n' +
              '→ DEBUG UPSTREAM',
            note: 'Если этот алгоритм работает на незнакомом graph, цель курса достигнута.',
          },
        ],
      },
    ],
  },
];
