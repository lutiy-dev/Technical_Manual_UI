import type { Chapter } from '../manual-types';

export const workflowEngineeringModuleContractsChapters: Chapter[] = [
  {
    index: 0,
    slug: 'workflow-engineering-module-contracts',
    navTitle: 'Modules & I/O Contracts',
    eyebrow: 'PART I · WORKFLOW ENGINEERING FOR COMFYUI',
    title: 'Modules & Input/Output Contracts — проектируем ветки как заменяемые блоки',
    lede:
      'Профессиональный workflow легче строить и обслуживать, если каждая крупная ветка имеет одну ответственность, понятные входы, понятный выход и независимый checkpoint. Тогда Master Workflow превращается из монолита в систему модулей.',
    status: 'confirmed',
    statusNote:
      'Модульный подход соответствует уже документированной структуре Hansen: SDXL, masks, PEOPLE/PPL, main FLUX и output образуют отдельные смысловые ветки с точками слияния и возврата.',
    visual: 'graph-reading',
    category: 'workflow-engineering',
    stage: 'module-contracts',
    relatedChapters: [
      'workflow-engineering-data-control-plane',
      'workflow-engineering-base-config',
      'people-ppl-overview',
      'main-flux',
      'workflow-engineering-coordinates-batch',
    ],
    sections: [
      {
        id: 'what-is-module',
        eyebrow: '01 · MODULE',
        title: 'Модуль — это законченная ответственность, а не просто цветная рамка',
        paragraphs: [
          'Группа становится инженерным модулем только тогда, когда можно сформулировать её задачу одной фразой, перечислить обязательные inputs и назвать один или несколько ожидаемых outputs.',
          'Хороший модуль можно временно отделить от Master Workflow, подать тестовые входы, получить результат и понять, исправен ли он сам по себе.',
        ],
        codeExamples: [
          {
            title: 'Минимальная формула модуля',
            label: 'MODULE CONTRACT',
            code:
              'KNOWN INPUTS\n' +
              '→ ONE RESPONSIBILITY\n' +
              '→ CHECKPOINT\n' +
              '→ KNOWN OUTPUTS',
          },
        ],
      },
      {
        id: 'input-contract',
        eyebrow: '02 · INPUT CONTRACT',
        title: 'Input contract говорит, что модуль имеет право ожидать',
        paragraphs: [
          'Нельзя проектировать ветку с неявными предположениями. Если модулю нужен IMAGE 1536 px, MASK того же canvas, MODEL определённого семейства и FLOAT denoise, это должно быть известно до подключения.',
          'Input contract включает не только тип socket, но и форму данных: размер, batch, coordinate space, polarity, model family и обязательность параметра.',
        ],
        table: {
          columns: ['Contract field', 'Пример'],
          rows: [
            ['Type', 'IMAGE / MASK / LATENT / MODEL'],
            ['Dimensions', '1536 × 1024'],
            ['Batch', '1 image / N masks'],
            ['Coordinate space', 'Same as BASE IMAGE'],
            ['Model family', 'SDXL / FLUX-compatible'],
            ['Required / optional', 'BASE IMAGE required; reference optional'],
          ],
        },
      },
      {
        id: 'output-contract',
        eyebrow: '03 · OUTPUT CONTRACT',
        title: 'Output contract определяет, что downstream может безопасно получить',
        paragraphs: [
          'Output должен быть пригоден для следующего модуля без догадок. Если PEOPLE branch возвращает composited IMAGE того же canvas, downstream FLUX может использовать его как предсказуемый source. Если branch возвращает crop другого размера, это уже другой contract.',
        ],
        codeExamples: [
          {
            title: 'Пример PEOPLE contract',
            label: 'PPL MODULE',
            code:
              'INPUT:\n' +
              'BASE IMAGE + PPL prompt + placement data\n\n' +
              'PROCESS:\n' +
              'Generate → Segment → Prepare → Composite\n\n' +
              'OUTPUT:\n' +
              'COMPOSITED IMAGE · same scene canvas',
          },
        ],
      },
      {
        id: 'return-contract',
        eyebrow: '04 · RETURN CONTRACT',
        title: 'Return point — официальный выход ветки обратно в Master Workflow',
        paragraphs: [
          'У сложной ветки должен быть один хорошо читаемый return point. Это место, где локальная задача завершена и результат снова становится частью основного data plane.',
          'Return point полезно маркировать отдельно: он облегчает extraction standalone JSON, debug и замену реализации модуля без перестройки всего downstream.',
        ],
        codeExamples: [
          {
            title: 'Модульный маршрут',
            label: 'RETURN CONTRACT',
            code:
              'MASTER SOURCE\n' +
              '→ MODULE INPUT\n' +
              '→ LOCAL PROCESSING\n' +
              '→ MODULE OUTPUT / RETURN\n' +
              '→ MASTER DOWNSTREAM',
          },
        ],
      },
      {
        id: 'single-responsibility',
        eyebrow: '05 · RESPONSIBILITY',
        title: 'Один модуль — одна основная задача',
        table: {
          columns: ['Модуль', 'Ответственность'],
          rows: [
            ['CONTROLNET', 'Создать/применить geometry guidance'],
            ['SDXL', 'Получить base generation / img2img result'],
            ['MASKS', 'Сформировать области защиты/изменения'],
            ['PPL', 'Создать или заменить людей и вернуть composite'],
            ['MAIN FLUX', 'Выполнить controlled final refinement'],
            ['UPSCALE', 'Увеличить output с сохранением согласованности'],
            ['OUTPUT', 'Сохранить / показать delivery result'],
          ],
        },
      },
      {
        id: 'hidden-dependencies',
        eyebrow: '06 · HIDDEN DEPENDENCIES',
        title: 'Неявная зависимость делает standalone-модуль ложным',
        paragraphs: [
          'Если ветка выглядит отдельной, но использует seed, size, prompt fragment или model object из далёкой части Master Workflow, она фактически не автономна. Перед extraction необходимо найти все такие external links.',
          'Standalone JSON считается независимым только тогда, когда каждый обязательный external dependency заменён локальным input/control/loader либо явно указан в contract.',
        ],
        facts: [
          {
            status: 'inferred',
            title: 'Extraction rule',
            text: 'Перед экспортом ветки строить список всех incoming links, которые пересекают границу выбранной группы; каждый link должен стать локальным dependency или явным input.',
          },
        ],
      },
      {
        id: 'module-checkpoint',
        eyebrow: '07 · MODULE CHECKPOINT',
        title: 'У каждого модуля должен быть собственный доказуемый результат',
        paragraphs: [
          'Если единственный preview находится в самом конце Master Workflow, невозможно быстро понять, какой module сломался. Поэтому локальный output модуля должен иметь Preview / MaskPreview / comparer или другой диагностический probe.',
        ],
        codeExamples: [
          {
            title: 'Checkpoint pattern',
            label: 'OBSERVABILITY',
            code:
              'MODULE INPUT\n' +
              '→ PROCESS\n' +
              '→ LOCAL CHECKPOINT\n' +
              '→ RETURN',
          },
        ],
      },
      {
        id: 'lego-master',
        eyebrow: '08 · MASTER BUILD',
        title: 'Master Workflow должен собираться как LEGO из изученных модулей',
        codeExamples: [
          {
            title: 'Высокоуровневая архитектура',
            label: 'ARCHVIZ MASTER',
            code:
              'INPUT\n' +
              '→ CONTROLNET MODULE\n' +
              '→ SDXL MODULE\n' +
              '→ DETAIL / MASK MODULES\n' +
              '→ PEOPLE MODULE\n' +
              '→ FLUX MODULE\n' +
              '→ UPSCALE MODULE\n' +
              '→ OUTPUT',
          },
        ],
      },
      {
        id: 'practice',
        eyebrow: '09 · PRACTICE',
        title: 'Практика: оформить contract для одной знакомой ветки',
        bullets: [
          'Выбрать одну ветку текущего workflow.',
          'Сформулировать её ответственность одной строкой.',
          'Выписать все external incoming links.',
          'Для каждого input записать type, size/batch и required/optional.',
          'Назвать один официальный output/return point.',
          'Добавить checkpoint непосредственно перед return.',
          'Проверить, можно ли заменить upstream тестовыми inputs и запустить ветку отдельно.',
        ],
      },
    ],
  },
];
