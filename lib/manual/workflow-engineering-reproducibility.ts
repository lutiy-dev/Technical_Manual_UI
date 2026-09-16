import type { Chapter } from '../manual-types';

export const workflowEngineeringReproducibilityChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-reproducibility',
    navTitle: 'Reproducibility & Testing',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'Reproducibility & One-Variable Testing — как превращать эксперименты в инженерный процесс',
    lede:
      'Если два запуска отличаются одновременно seed, denoise, prompt, model и resolution, невозможно понять причину результата. Профессиональный workflow должен позволять повторить тест и изменять по одной переменной за итерацию.',
    status: 'confirmed',
    statusNote:
      'Принцип воспроизводимого benchmark напрямую связан с shared seed, linked controls, sampler settings и Golden Run concept, уже присутствующими в technical manual.',
    visual: 'checklist',
    category: 'workflow-engineering',
    stage: 'reproducibility',
    relatedChapters: [
      'workflow-engineering-debugging',
      'workflow-engineering-base-config',
      'control-panel',
      'checklist',
    ],
    sections: [
      {
        id: 'why-reproducibility',
        eyebrow: '01 · WHY',
        title: 'Повторяемость нужна не ради науки, а ради быстрых решений',
        paragraphs: [
          'Когда результат можно повторить, любое улучшение или ухудшение можно связать с конкретным изменением. Без этого пользователь оценивает набор случайностей и не строит надёжный production recipe.',
          'Для Archviz это особенно важно: мы должны отличать улучшение материала от изменения геометрии, света, seed или local mask.',
        ],
      },
      {
        id: 'minimum-state',
        eyebrow: '02 · TEST STATE',
        title: 'Что нужно фиксировать для воспроизводимого запуска',
        table: {
          columns: ['Категория', 'Что сохранить'],
          rows: [
            ['Workflow', 'точная версия JSON / commit / hash'],
            ['Inputs', 'те же images, masks, references'],
            ['Models', 'filenames / versions / relevant custom nodes'],
            ['Controls', 'effective values, включая linked inputs'],
            ['Sampling', 'seed, steps, sampler, scheduler, CFG/guidance, denoise'],
            ['Canvas', 'working resolution / resize mode / batch'],
            ['Runtime profile', 'какие groups enabled/bypassed'],
            ['Result', 'checkpoint previews + final output'],
          ],
        },
      },
      {
        id: 'one-variable',
        eyebrow: '03 · ONE VARIABLE',
        title: 'Менять одну переменную за тест',
        paragraphs: [
          'Если цель — определить влияние denoise, seed, prompt и ControlNet strength должны оставаться неизменными. Если тестируется Canny, Depth и sampler не меняются между вариантами.',
          'Это делает A/B comparison интерпретируемым.',
        ],
        codeExamples: [
          {
            title: 'Правильный benchmark',
            label: 'A/B TEST',
            code:
              'A · denoise 0.08 · SAME seed · SAME prompt · SAME controls\n' +
              'B · denoise 0.12 · SAME seed · SAME prompt · SAME controls\n\n' +
              'ONLY VARIABLE = denoise',
          },
        ],
      },
      {
        id: 'seed',
        eyebrow: '04 · SEED',
        title: 'Seed — часть конфигурации эксперимента, а не кнопка случайности',
        paragraphs: [
          'При сравнении архитектурных настроек seed нужно фиксировать. Иначе изменение композиционных деталей, людей или материалов может быть связано с новым noise pattern, а не с тестируемым параметром.',
          'В workflow со shared seed нужно проверить всех consumers: один источник может одновременно влиять на несколько samplers / noise nodes.',
        ],
      },
      {
        id: 'effective-values',
        eyebrow: '05 · EFFECTIVE VALUES',
        title: 'Записывать фактические значения, а не только то, что видно в widget',
        paragraphs: [
          'Если sampler получает steps или denoise через linked input, локально сохранённый widget не является authoritative. В benchmark log нужно записывать effective upstream value.',
          'То же относится к selectors: stored value и текущий selected source могут расходиться.',
        ],
      },
      {
        id: 'golden-run',
        eyebrow: '06 · GOLDEN RUN',
        title: 'Golden Run — эталон, относительно которого измеряются изменения',
        paragraphs: [
          'После того как workflow стабилен, полезно зафиксировать один проверенный прогон: inputs, model manifest, controls, seed, checkpoints и final output. Это становится baseline.',
          'Любое обновление custom nodes, model weights или topology можно затем проверять против Golden Run и быстро замечать regression.',
        ],
        codeExamples: [
          {
            title: 'Golden Run package',
            label: 'BASELINE',
            code:
              'WORKFLOW JSON + HASH\n' +
              '+ INPUT SET\n' +
              '+ MODEL / NODE MANIFEST\n' +
              '+ EFFECTIVE CONTROLS\n' +
              '+ SEED / SAMPLER STATE\n' +
              '+ CHECKPOINT PREVIEWS\n' +
              '+ FINAL OUTPUT',
          },
        ],
      },
      {
        id: 'benchmark-matrix',
        eyebrow: '07 · BENCHMARK MATRIX',
        title: 'Оценивать не «красивее», а заранее выбранные критерии',
        table: {
          columns: ['Критерий', 'Что наблюдать в Archviz'],
          rows: [
            ['Geometry preservation', 'камера, пропорции, openings, facade rhythm'],
            ['Material realism', 'microdetail, roughness cues, texture stability'],
            ['Lighting coherence', 'направление, exposure, local integration'],
            ['Artifact rate', 'AI chaos, halos, duplicated details, broken people'],
            ['Locality', 'изменения происходят только там, где разрешено'],
            ['Runtime cost', 'VRAM, время, количество активных моделей'],
          ],
        },
      },
      {
        id: 'version-drift',
        eyebrow: '08 · VERSION DRIFT',
        title: 'Обновление модели или custom node — это изменение системы',
        paragraphs: [
          'Даже если JSON не изменился, новая версия custom node может изменить inputs, defaults или execution behavior. Поэтому версия окружения входит в reproducibility contract.',
          'Production STABLE и experimental LAB полезно разделять именно по этой причине: эксперимент не должен незаметно менять baseline production workflow.',
        ],
      },
      {
        id: 'practice',
        eyebrow: '09 · PRACTICE',
        title: 'Практика: провести один настоящий A/B benchmark',
        bullets: [
          'Выбрать один стабильный input.',
          'Зафиксировать seed и все controls.',
          'Выбрать только одну переменную.',
          'Сделать A и B без других изменений.',
          'Сохранить одинаковые checkpoints.',
          'Оценить заранее выбранные критерии, а не общее впечатление.',
          'Записать вывод и оставить лучший вариант новым baseline только после повторной проверки.',
        ],
      },
    ],
  },
];
