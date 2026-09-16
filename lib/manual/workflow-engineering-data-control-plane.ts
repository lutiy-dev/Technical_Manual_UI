import type { Chapter } from '../manual-types';

export const workflowEngineeringDataControlPlaneChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-data-control-plane',
    navTitle: 'Data Plane vs Control Plane',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'Data Plane vs Control Plane — что течёт по графу и что им управляет',
    lede:
      'Профессиональный ComfyUI-граф легче читать, если разделить два слоя: data plane переносит изображения, latent, masks, models и conditioning; control plane задаёт режимы, selectors, параметры, enable/bypass и общий runtime profile.',
    status: 'confirmed',
    statusNote:
      'Разделение data/control plane согласуется с реальной topology Hansen: крупные data links и linked INT/FLOAT/STRING controls выполняют разные роли.',
    visual: 'graph-reading',
    category: 'workflow-engineering',
    stage: 'data-control-plane',
    relatedChapters: [
      'workflow-engineering-graph-literacy',
      'workflow-engineering-base-config',
      'control-panel',
      'inputs',
    ],
    sections: [
      {
        id: 'two-layers',
        eyebrow: '01 · TWO LAYERS',
        title: 'Один граф содержит как минимум два разных типа логики',
        table: {
          columns: ['Layer', 'Что несёт', 'Главный вопрос'],
          rows: [
            ['DATA PLANE', 'IMAGE, MASK, LATENT, MODEL, CONDITIONING', 'Что сейчас обрабатывается?'],
            ['CONTROL PLANE', 'INT, FLOAT, STRING, BOOLEAN, selectors, bypass', 'Какой маршрут и режим сейчас активен?'],
          ],
        },
      },
      {
        id: 'data-plane-route',
        eyebrow: '02 · DATA PLANE',
        title: 'Data plane показывает путь результата от input до output',
        paragraphs: [
          'При первом чтении большого workflow ищи крупные объекты. IMAGE переходит в preprocessors, MASK ограничивает область, LATENT идёт через sampler, MODEL и CONDITIONING обеспечивают генерацию. Это скелет вычисления.',
          'Если удалить мысленно все маленькие control wires, должен остаться понятный маршрут данных.',
        ],
        codeExamples: [
          {
            title: 'Пример data plane',
            label: 'DATA ROUTE',
            code:
              'BASE IMAGE\n' +
              '→ PREPROCESS\n' +
              '→ GENERATION\n' +
              '→ LOCAL COMPOSITE\n' +
              '→ FINAL REFINEMENT\n' +
              '→ OUTPUT',
          },
        ],
      },
      {
        id: 'control-plane-route',
        eyebrow: '03 · CONTROL PLANE',
        title: 'Control plane формирует effective runtime state',
        paragraphs: [
          'Control plane может не менять пиксели напрямую, но определяет, какие pixels вообще попадут downstream. Он выбирает source, strength, steps, denoise, mode, resolution и active modules.',
          'Поэтому маленький INT selector иногда важнее целой генеративной ветки: неверное значение просто выберет другой путь.',
        ],
        codeExamples: [
          {
            title: 'Пример control plane',
            label: 'CONTROL ROUTE',
            code:
              'BASE CONFIG\n' +
              '→ MODULE ENABLE / BYPASS\n' +
              '→ MODE SELECTOR\n' +
              '→ SHARED PARAMETERS\n' +
              '→ EFFECTIVE RUNTIME PATH',
          },
        ],
      },
      {
        id: 'linked-overrides',
        eyebrow: '04 · LINKED VALUES',
        title: 'Видимое widget value не всегда является фактическим значением',
        paragraphs: [
          'Если input параметра связан с другой control-нодой, downstream widget может отображать сохранённое локальное значение, которое не определяет текущий runtime. Authoritative source находится upstream.',
          'При диагностике selectors и shared controls всегда нужно трассировать link до источника, а не доверять только подписи внутри конечной ноды.',
        ],
        facts: [
          {
            status: 'confirmed',
            title: 'Hansen example',
            text: 'В текущем technical manual уже зафиксированы selectors, где linked input переопределяет stored widget value.',
          },
        ],
      },
      {
        id: 'shared-control',
        eyebrow: '05 · SINGLE SOURCE OF TRUTH',
        title: 'Один shared control должен управлять связанными параметрами согласованно',
        paragraphs: [
          'Когда несколько branch должны использовать один режим, размер или seed, лучше иметь единый authoritative control, чем копировать значение вручную в нескольких местах.',
          'Это уменьшает configuration drift: ситуацию, когда один parameter уже изменён, а второй остался старым.',
        ],
        table: {
          columns: ['Shared control', 'Возможные consumers'],
          rows: [
            ['Seed', 'SDXL sampler, FLUX noise, PPL generation'],
            ['Working size', 'Latent, resize, masks, composite canvas'],
            ['Mode', 'Latent source, denoise route, selectors'],
            ['People source', 'PPL selectors, downstream return'],
          ],
        },
      },
      {
        id: 'reading-strategy',
        eyebrow: '06 · TWO-PASS READING',
        title: 'Большой граф лучше читать в два прохода',
        codeExamples: [
          {
            title: 'Pass 1 / Pass 2',
            label: 'READING METHOD',
            code:
              'PASS 1 · DATA\n' +
              'Input → Image/Latent/Mask route → Output\n\n' +
              'PASS 2 · CONTROL\n' +
              'BASE CONFIG → Selectors → Shared values → Bypass state',
            note: 'После двух проходов можно соединить их в один effective runtime map.',
          },
        ],
      },
      {
        id: 'effective-runtime-map',
        eyebrow: '07 · EFFECTIVE STATE',
        title: 'Topology и runtime path — не одно и то же',
        paragraphs: [
          'Topology отвечает: какие связи вообще существуют в сохранённом workflow. Effective runtime map отвечает: какие из этих связей реально определяют текущий результат с учётом selectors, linked controls и bypass state.',
          'Это различие критично для аудита больших графов: connected branch может быть selected away, а сохранённый post-process может находиться в bypass.',
        ],
      },
      {
        id: 'practice',
        eyebrow: '08 · PRACTICE',
        title: 'Практика: нарисовать две карты одного workflow',
        bullets: [
          'Карта A: оставить только IMAGE / MASK / LATENT / MODEL / CONDITIONING links.',
          'Карта B: выписать только selectors, INT/FLOAT/STRING controls и bypass switches.',
          'Для каждого selector записать его authoritative upstream value.',
          'Соединить карты и описать одной фразой effective runtime route.',
        ],
        facts: [
          {
            status: 'inferred',
            title: 'Критерий готовности',
            text: 'Если пользователь может объяснить отдельно data route и control route, он готов переходить к module contracts и interface design.',
          },
        ],
      },
    ],
  },
];
