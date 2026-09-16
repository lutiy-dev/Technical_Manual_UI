# EPSPOZICIYA ARCHVIZ · TECHNICAL WORKFLOW MANUAL

Интерактивный технический учебник по полному графу workflow
`Epspoziciya_archviz_ph_sdxlflux_v001`. PEOPLE/PPL сохранён как отдельный
учебный модуль внутри общей архитектуры.

Сайт разбит на 29 отдельных маршрутов, объединённых в пять групп:
Foundation, Base Generation, PEOPLE/PPL Module, Final Pipeline и Evidence &
Reference. В руководство входят полная архитектура, правила чтения графа,
inputs, 28 controls, модели, prompts, SDXL, ControlNet, IPAdapter/LoRA, четыре
системы масок, detail conservation, PEOPLE/PPL, main FLUX, optional
upscale/overlay, output, diagnostics, checklist, examples, интерактивный индекс
252 узлов и Resources.

## Онлайн-версия

После первой успешной публикации GitHub Pages учебник будет доступен по адресу:

<https://lutiy-dev.github.io/Technical_Manual_UI/>

## Локальный запуск

Требуется Node.js 22 или новее.

```bash
npm ci
npm run dev
```

Для проверки production-сборки:

```bash
npm run build
```

Статический результат создаётся в `dist/client`.

## Достоверность технических данных

Материалы явно разделяют утверждения на `CONFIRMED`, `INFERRED` и
`NOT CONFIRMED`. Это различие следует сохранять при обновлении учебника.

Исходные материалы и права на них остаются у соответствующих владельцев.
Открытая лицензия к репозиторию намеренно не добавлена.


## Правило обновления учебника

При добавлении новой главы недостаточно изменить только `lib/manual/*.ts`. Обновление считается завершённым только после цепочки: `CONTENT → manualChapters → ROUTE → SIDEBAR/COUNTER → BUILD → DEPLOY → VISUAL CHECK`. Полный обязательный чек-лист хранится в [`MAINTENANCE_RULES.md`](./MAINTENANCE_RULES.md).
