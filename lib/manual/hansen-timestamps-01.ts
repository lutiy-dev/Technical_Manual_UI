import type { Chapter } from '../manual-types';

export const hansenTimestampChapters01: Chapter[] = [
  {
    index: 0,
    slug: 'hansen-00-39-production-method',
    navTitle: '00:39 · Production Method',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 00:39',
    title: 'Как читать большой workflow: сначала production method, потом ноды',
    lede:
      'В начале showcase Hansen показывает workflow как систему этапов, а не как одну длинную цепь. Для начинающего это главный поворот мышления: сначала определить крупные зоны ответственности, затем понять маршрут между ними, и только потом разбирать конкретные nodes.',
    status: 'confirmed',
    statusNote:
      'Видеокадр 00:39 показывает весь canvas с крупными секциями I–VI; source graph подтверждает непрерывный production path от BASE IMAGE через SDXL, PEOPLE/PPL, FLUX и final output.',
    visual: 'master',
    category: 'hansen-timestamps',
    stage: 'hansen-00-39',
    relatedNodes: [79, 783, 2, 1, 14, 459, 573, 67, 57, 53, 730],
    relatedChapters: [
      'workflow-engineering-overview',
      'workflow-engineering-graph-literacy',
      'workflow-engineering-groups-naming',
      'overview',
      'graph-reading',
    ],
    sections: [
      {
        id: 'hansen-original',
        eyebrow: 'HANSEN ORIGINAL',
        title: 'Что реально видно на 00:39',
        paragraphs: [
          'На canvas одновременно видны несколько крупных секций, разделённых визуально и подписанных римскими цифрами. Это не «252 случайных boxes», а production system, разбитая на смысловые зоны.',
          'Справа находится final/output-зона с последовательностью промежуточных и финальных изображений. Слева и в центре — controls, inputs, generation и processing stages. Уже по композиции canvas видно, что workflow рассчитан на движение данных через несколько модулей.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Video evidence',
            text: 'Кадр 00:39 показывает полный ComfyUI canvas с крупными секциями I–VI и final image area справа.',
          },
          {
            status: 'confirmed',
            title: 'Graph evidence',
            text: 'Source topology связывает BASE IMAGE 79 → resize 783 → SDXL → PPL/detail → FLUX 67/57/53 → output routes.',
          },
        ],
      },
      {
        id: 'beginner-model',
        eyebrow: 'ARCHVIZ FOUNDATION / EXTENSION',
        title: 'Первое правило новичка: не читать огромный graph по одной ноде',
        codeExamples: [
          {
            title: 'Правильный zoom level',
            label: 'MENTAL MODEL',
            code:
              'WHOLE CANVAS\n' +
              '→ SYSTEM / GROUP\n' +
              '→ MODULE\n' +
              '→ NODE CHAIN\n' +
              '→ SINGLE NODE',
            note: 'Если начать сразу с отдельных nodes, связи и назначение быстро теряются. Сначала строим карту.',
          },
        ],
        paragraphs: [
          'Для этого учебника Hansen graph — не объект, который надо запомнить. Он используется как учебный стенд, чтобы освоить универсальную логику ComfyUI: data flow, controls, masks, branching, local processing и return contracts.',
        ],
      },
      {
        id: 'six-questions',
        eyebrow: 'READING METHOD',
        title: 'Шесть вопросов к любому модулю',
        bullets: [
          'Зачем этот module существует?',
          'Какой INPUT он получает?',
          'Что он меняет: image, mask, latent, conditioning или control value?',
          'Какими shared controls он управляется?',
          'Где его CHECKPOINT?',
          'Куда идёт RETURN?',
        ],
        paragraphs: [
          'Эти вопросы важнее знания названия конкретной модели. Модель можно заменить; контракт и роль модуля остаются.',
        ],
      },
      {
        id: 'master-route',
        eyebrow: 'PRODUCTION ROUTE',
        title: 'Большой graph сжимаем до одной строки',
        codeExamples: [
          {
            title: 'Master route',
            label: 'CONFIRMED · SOURCE TOPOLOGY',
            code:
              'BASE IMAGE\n' +
              '→ PREPROCESS / CONTROL\n' +
              '→ BASE GENERATION\n' +
              '→ LOCAL MODULES / PEOPLE / MASKS\n' +
              '→ MAIN FLUX REFINEMENT\n' +
              '→ OPTIONAL UPSCALE / OVERLAY\n' +
              '→ OUTPUT',
          },
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Current saved state',
            text: 'Source documentation confirms active LQ save at node 730; HQ/upscale/overlay chain exists but some nodes are stored in bypass.',
          },
        ],
      },
      {
        id: 'practice',
        eyebrow: 'PRACTICE',
        title: 'Упражнение: карта без проводов',
        bullets: [
          'Открыть Hansen workflow и уменьшить zoom так, чтобы видеть весь canvas.',
          'Не отслеживать links и не запускать generation.',
          'Найти крупные zones: controls/config, inputs, base generation, masks/people, final processing/output.',
          'Для каждой zone написать одну фразу: «эта область отвечает за ...».',
          'Только после этого приблизить одну область и посмотреть её внутренние nodes.',
        ],
      },
      {
        id: 'pass',
        eyebrow: 'PASS CRITERIA',
        title: 'Когда урок 00:39 усвоен',
        paragraphs: [
          'Ты больше не описываешь workflow как «страшную стену нод». Ты можешь показать несколько крупных систем и примерно объяснить, в каком порядке через них проходит изображение.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'hansen-01-08-input-data-txt2img',
    navTitle: '01:08 · Input Data · TXT2IMG',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 01:08',
    title: 'Input data — почему production workflow начинается не с prompt',
    lede:
      'В этом блоке showcase Hansen показывает подготовленные входные данные до генерации. Для archviz это принципиально: workflow получает не только текст, а набор визуальных источников, которые несут геометрию, структуру, маски, reference и downstream controls.',
    status: 'confirmed',
    statusNote:
      'Видео в диапазоне вокруг 01:08 показывает несколько подготовленных passes/reference images; source graph документирует семь LoadImage nodes и их конкретные downstream branches.',
    visual: 'inputs',
    category: 'hansen-timestamps',
    stage: 'hansen-01-08',
    relatedNodes: [25, 41, 42, 79, 301, 309, 338, 38, 337, 456, 630, 783],
    relatedChapters: [
      'inputs',
      'workflow-engineering-coordinates-batch',
      'controlnet',
      'segmentation-masks',
    ],
    sections: [
      {
        id: 'hansen-original',
        eyebrow: 'HANSEN ORIGINAL',
        title: 'Что показано как input data',
        paragraphs: [
          'Видеоряд показывает несколько типов подготовленной визуальной информации: stylized/false-color render, depth-like pass, RGB-coded mask-like pass, reference/final-look images и сам 3D scene context. Это демонстрирует production-first подход: AI не обязан угадывать всё из одного prompt.',
          'Source graph подтверждает несколько независимых LoadImage sources: BASE IMAGE, external depth, IPAdapter references, RGB-coded mask source и final overlay assets.',
        ],
      },
      {
        id: 'input-contract',
        eyebrow: 'ARCHVIZ FOUNDATION / EXTENSION',
        title: 'INPUT CONTRACT: каждый файл должен иметь одну понятную роль',
        table: {
          columns: ['Input type', 'Source evidence', 'Role'],
          rows: [
            ['BASE IMAGE', 'node 79', 'Главный architectural source; feeds resize, preprocess, compare and mask paths'],
            ['External depth', 'node 25', 'Alternative geometry/depth source selected downstream'],
            ['Reference images', 'nodes 41 / 42', 'Optional IPAdapter reference inputs'],
            ['RGB-coded masks', 'node 338', 'Source for mask extraction by color'],
            ['Logo / overlays', 'nodes 301 / 309', 'Final delivery overlay stage'],
          ],
        },
        facts: [
          {
            status: 'confirmed',
            title: 'Mandatory base',
            text: 'Source notes identify node 79 as BASE IMAGE by connectivity and embedded workflow note.',
          },
          {
            status: 'inferred',
            title: 'Optional means branch-dependent',
            text: 'Other inputs are optional only when their consuming branch is bypassed or selected away; «optional» is a routing property, not an intrinsic property of the file.',
          },
        ],
      },
      {
        id: 'data-types',
        eyebrow: 'BEGINNER FOUNDATION',
        title: 'Не все картинки в workflow означают одно и то же',
        table: {
          columns: ['Visual input', 'Human interpretation', 'Machine role'],
          rows: [
            ['Beauty / base render', 'Как выглядит сцена', 'IMAGE source'],
            ['Depth', 'Что ближе / дальше', 'Geometry guidance'],
            ['RGB ID / mask pass', 'Какая зона чему принадлежит', 'Region selection'],
            ['Reference image', 'Какой визуальный язык нужен', 'Style / appearance guidance'],
            ['Logo / overlay', 'Что добавить в delivery', 'Post-process asset'],
          ],
        },
        paragraphs: [
          'Для новичка это один из главных навыков: смотреть не на thumbnail, а спрашивать, какую информацию несёт изображение и какой downstream node её читает.',
        ],
      },
      {
        id: 'source-size',
        eyebrow: 'DATA CONTRACT',
        title: 'Размер и coordinate space входят в контракт input',
        paragraphs: [
          'Одинаково выглядящие images могут быть несовместимы, если они имеют разные dimensions, aspect ratio или coordinate space. Поэтому resize 783, external-map sizes и later detection canvases — не «техническая мелочь», а часть архитектуры.',
        ],
        codeExamples: [
          {
            title: 'Rule',
            label: 'DATA CONTRACT',
            code: 'CONTENT + SIZE + COORDINATE SPACE + BATCH = INPUT CONTRACT',
          },
        ],
      },
      {
        id: 'practice',
        eyebrow: 'PRACTICE',
        title: 'Упражнение: инвентаризация inputs',
        bullets: [
          'Найти все LoadImage nodes в INPUTS area.',
          'Для каждого записать не filename, а функцию: BASE / DEPTH / REFERENCE / MASK / OVERLAY.',
          'Проследить только первый downstream link каждого input.',
          'Отметить, какие inputs участвуют в active route, а какие относятся к bypassed/optional branches.',
        ],
      },
      {
        id: 'pass',
        eyebrow: 'PASS CRITERIA',
        title: 'Когда урок 01:08 усвоен',
        paragraphs: [
          'Ты понимаешь, что production ComfyUI начинается с проектирования входных данных. Prompt — только один из inputs системы, а не вся система.',
        ],
      },
    ],
  },
  {
    index: 0,
    slug: 'hansen-02-40-process1-txt2img',
    navTitle: '02:40 · Process 1 · TXT2IMG',
    eyebrow: 'PART III · HANSEN BY TIMESTAMPS · 02:40',
    title: 'Process 1 · TXT2IMG — как из inputs собирается первая управляемая генерация',
    lede:
      'На 02:40 Hansen возвращается к большому graph и показывает первый основной production process. Учебная задача здесь не запомнить RealVisXL или конкретный sampler, а понять универсальный паттерн: controls + conditioning + structural guidance + latent source → sampler → decoded image.',
    status: 'confirmed',
    statusNote:
      'Видео 02:40 показывает соответствующую generation area; source topology подтверждает SDXL path model 2 → conditioning / ControlNet → latent selector 535 → sampler 1 → decode 14.',
    visual: 'generation',
    category: 'hansen-timestamps',
    stage: 'hansen-02-40',
    relatedNodes: [1, 2, 3, 5, 6, 7, 14, 21, 23, 38, 87, 168, 230, 231, 417, 418, 419, 535, 541, 600, 783],
    relatedChapters: [
      'sdxl',
      'controlnet',
      'ipadapter-lora',
      'workflow-engineering-switches-routing',
      'workflow-engineering-execution-cache',
    ],
    sections: [
      {
        id: 'hansen-original',
        eyebrow: 'HANSEN ORIGINAL',
        title: 'Process 1 — один module с несколькими источниками контроля',
        paragraphs: [
          'Source graph показывает SDXL generation path: model loader 2, prompt conditioning, optional IPAdapter model route, ControlNet stack, latent selector, KSampler 1 и VAE Decode 14.',
          'Current master mode 541=1 соответствует TXT+CNET2IMG. В этом mode latent selector 535 выбирает EmptyLatentImage 3, а denoise route выбирает full generation behavior.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Current generation mode',
            text: 'Node 541 = 1; source notes identify this as TXT+CNET2IMG.',
          },
          {
            status: 'confirmed',
            title: 'Decode checkpoint',
            text: 'Sampler 1 feeds VAEDecode 14; decoded image then continues into downstream detail/PPL logic.',
          },
        ],
      },
      {
        id: 'universal-pattern',
        eyebrow: 'ARCHVIZ FOUNDATION / EXTENSION',
        title: 'Универсальный паттерн генерации — модель здесь вторична',
        codeExamples: [
          {
            title: 'Generation sentence',
            label: 'MODEL-AGNOSTIC',
            code:
              'MODEL\n' +
              '+ CONDITIONING\n' +
              '+ OPTIONAL STRUCTURAL GUIDANCE\n' +
              '+ LATENT / SOURCE STATE\n' +
              '+ SAMPLER CONFIG\n' +
              '→ SAMPLER\n' +
              '→ DECODED IMAGE',
            note: 'Позже модель можно заменить. Логика сборки generation module остаётся узнаваемой.',
          },
        ],
      },
      {
        id: 'five-subsystems',
        eyebrow: 'MODULE ANATOMY',
        title: 'Process 1 читаем как пять подсистем, а не как десятки nodes',
        table: {
          columns: ['Subsystem', 'Hansen example', 'Beginner question'],
          rows: [
            ['Model source', '2 / 168 / 87', 'Какой MODEL реально приходит в sampler?'],
            ['Text conditioning', '5 / 6', 'Что модель должна сделать / чего избегать?'],
            ['Structural control', 'Depth/Canny ControlNet stack', 'Что удерживает geometry / edges?'],
            ['Runtime controls', '230 / 231 / 541 / 600', 'Какие shared values определяют режим?'],
            ['Execution', '535 → 1 → 14', 'Откуда latent, где sampling, где image появляется снова?'],
          ],
        },
      },
      {
        id: 'latent-beginner',
        eyebrow: 'BEGINNER FOUNDATION',
        title: 'Почему внутри generation на время исчезает обычная картинка',
        paragraphs: [
          'Sampler работает не с обычным RGB image, а с latent representation. Поэтому перед sampling route может начинаться с Empty Latent или VAE-encoded image, а после sampling нужен VAE Decode, чтобы снова получить IMAGE.',
          'Это универсальная идея ComfyUI: IMAGE и LATENT — разные типы данных. Link между несовместимыми типами нельзя воспринимать как обычный «провод картинки».',
        ],
        codeExamples: [
          {
            title: 'Type transition',
            label: 'SIGNAL TYPE',
            code: 'IMAGE → VAE ENCODE → LATENT → SAMPLER → LATENT → VAE DECODE → IMAGE',
            note: 'В чистом txt2img initial latent может быть Empty Latent, поэтому IMAGE до sampler не обязателен.',
          },
        ],
      },
      {
        id: 'controls',
        eyebrow: 'CONTROL PLANE',
        title: 'Режим workflow задаётся не одним sampler widget',
        paragraphs: [
          'Hansen выносит sampling config, seed и generation mode в shared controls. Это позволяет нескольким downstream nodes читать одно authoritative value и делает A/B testing воспроизводимым.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Shared sampler config',
            text: 'Node 230 distributes KSampler settings to node 1; node 231 provides GLOBAL Seed and also feeds FLUX noise downstream.',
          },
        ],
      },
      {
        id: 'checkpoint',
        eyebrow: 'CHECKPOINT',
        title: 'Первый meaningful output — decode 14',
        paragraphs: [
          'До decode 14 мы проверяем inputs/controls/conditioning. После decode 14 уже можно оценивать изображение. Это естественная diagnostic boundary: если проблема видна здесь, PEOPLE, main FLUX и upscale ещё не виноваты.',
        ],
      },
      {
        id: 'debug-order',
        eyebrow: 'TROUBLESHOOTING',
        title: 'Если Process 1 дал плохой результат — проверяем сверху вниз',
        bullets: [
          'INPUT: правильный ли base/reference/control source выбран?',
          'MODE: node 541 действительно указывает нужный generation mode?',
          'MODEL: какой route выбран node 168 и какие loaders реально активны?',
          'CONDITIONING: positive / negative и linked text values?',
          'CONTROL: Depth/Canny sources, strength и active stack?',
          'LATENT: что выбрал selector 535?',
          'SAMPLER CONFIG: seed / steps / CFG / sampler / scheduler / denoise?',
          'DECODE 14: есть ли корректный image checkpoint до downstream modules?',
        ],
      },
      {
        id: 'practice',
        eyebrow: 'PRACTICE',
        title: 'Упражнение: прочитать SDXL branch без запуска',
        bullets: [
          'Найти node 1 KSampler и идти от него только upstream.',
          'Разделить incoming links на MODEL, CONDITIONING, LATENT и CONFIG.',
          'Для каждого input найти authoritative source.',
          'Затем пройти downstream: node 1 → node 14 → следующий module.',
          'Сформулировать branch одной фразой без названий конкретных моделей.',
        ],
      },
      {
        id: 'return',
        eyebrow: 'RETURN CONTRACT',
        title: 'Process 1 заканчивается IMAGE, пригодным для следующего module',
        codeExamples: [
          {
            title: 'Module contract',
            label: 'RETURN CONTRACT',
            code:
              'INPUTS + CONTROLS\n' +
              '→ BASE GENERATION\n' +
              '→ CHECKPOINT: DECODE 14\n' +
              '→ RETURN IMAGE TO DETAIL / PEOPLE / NEXT PROCESS',
          },
        ],
      },
      {
        id: 'pass',
        eyebrow: 'PASS CRITERIA',
        title: 'Когда урок 02:40 усвоен',
        paragraphs: [
          'Ты можешь открыть незнакомую generation branch и независимо от названия модели найти model source, conditioning, structural controls, latent/source state, sampler config, sampler, decode и return image.',
        ],
      },
    ],
  },
];
