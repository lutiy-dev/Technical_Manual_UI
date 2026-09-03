export const branchPurposes = [
  'Генерирует людей как отдельный mini-pipeline.',
  'Создаёт маску и сегментацию.',
  'Подготавливает фигуры для вставки в сцену.',
  'Возвращает выбранный composite в основной граф.',
  'Если люди есть в промежуточных шагах, но отсутствуют в output, проверяй routing, selector, composite и overwrite.',
] as const;

export const keyPeopleNodes = [
  {
    node: '408',
    title: 'PROMPT PPL FLUX',
    text: 'Описание типа персонажа, одежды, позы, масштаба и связи со сценой.',
  },
  {
    node: '543',
    title: 'PPL Selector',
    text: 'Общий INT control: 1 = FLUX, 2 = INPUT / 3D.',
  },
  {
    node: '715',
    title: 'Return / Downstream Selector',
    text: 'Вложенный source selector перед node 552; не самостоятельный final composite.',
  },
] as const;

export const overviewPipeline = [
  ['408', 'Prompt'],
  ['828 / 829', 'Generate'],
  ['550–146', 'Mask'],
  ['420–449', 'Prepare'],
  ['451 / 429', 'Position'],
  ['429 / 459', 'Composite'],
  ['573 → 53', 'Return'],
] as const;

export const preparationCriteria = [
  ['Масштаб', 'Соответствует глубине сцены'],
  ['Положение', 'Фигура находится в нужной зоне кадра'],
  ['Край маски', 'Чистый, без обрезки и ореола'],
  ['Яркость', 'Близка к окружению'],
  ['Контраст', 'Без выбитых светов и провалов'],
] as const;

export const stageQualityRows = [
  {
    stage: 'Prompt',
    expected: 'Текст понятный, полный, задаёт людей и сцену.',
    broken: 'Не те люди, одежда или поза.',
    inspect: 'Тип, одежда, поза, дистанция, взгляд.',
  },
  {
    stage: 'Generate',
    expected: 'Фигуры читаемые, ракурс подходит, без артефактов.',
    broken: 'Кривые позы, мыло, лишние детали.',
    inspect: 'Prompt, model stack, seed, sampler, preview 409.',
  },
  {
    stage: 'Mask',
    expected: 'Чистый силуэт без дыр, мусора и ореолов.',
    broken: 'Части тела пропали, остался фон.',
    inspect: '550 → 115 → 144 → 146, classes и edge cleanup.',
  },
  {
    stage: 'Composite',
    expected: 'Люди естественно вписаны и остаются в output.',
    broken: 'Неверный масштаб, тон, тени или routing.',
    inspect: '451, 429, 459, 573, 53 и save 730.',
  },
] as const;

export const failurePoints = [
  ['01', 'Prompt слабый или пустой', 'Люди не создаются или выглядят случайно.'],
  ['02', 'Сегментация плохая', 'Рваная mask, лишний фон, потерянные части тела.'],
  ['03', 'Selector выбран не тот', 'В main path уходит другая ветка.'],
  ['04', 'Composite неверен', 'Люди есть отдельно, но не попадают в сцену.'],
  ['05', 'Position / scale неверны', 'Люди слишком малы, вне кадра или за пределами mask.'],
] as const;

export const diagnosticOrder = [
  ['408 / 831', 'Prompt'],
  ['828 / 829', 'Generate'],
  ['550–146', 'Mask'],
  ['451 / 429', 'Position'],
  ['459', 'Composite'],
  ['573 → 53', 'Return'],
  ['730', 'Final output'],
] as const;
