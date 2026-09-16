# EPSPOZICIYA ARCHVIZ · TECHNICAL WORKFLOW MANUAL

Интерактивный технический учебник по полному графу workflow
`Epspoziciya_archviz_ph_sdxlflux_v001`. PEOPLE/PPL сохранён как отдельный
учебный модуль внутри общей архитектуры.

Сайт разбит на 30 отдельных маршрутов, объединённых в шесть групп:
Workflow Engineering, Foundation, Base Generation, PEOPLE/PPL Module, Final Pipeline и Evidence &
Reference. В руководство входят полная архитектура, правила чтения графа,
inputs, 28 controls, модели, prompts, SDXL, ControlNet, IPAdapter/LoRA, четыре
системы масок, detail conservation, PEOPLE/PPL, main FLUX, optional
upscale/overlay, output, diagnostics, checklist, examples, интерактивный индекс
252 узлов и Resources.

## Архитектура обучения

Учебник следует обязательному порядку: **сначала архитектура графа, потом генеративные ноды, потом практика**.

1. **Part I · Workflow Engineering for ComfyUI** — Node Literacy, Graph Literacy, BASE CONFIG, control/data plane, modules, contracts, checkpoints и reproducibility.
2. **Part II · Generative Systems** — SDXL, FLUX, ControlNet, Florence2, SAM2, masks, composite и upscale.
3. **Part III · Hansen by Timestamps** — разбор production workflow по таймкодам видео.
4. **Part IV · Practice Labs** — независимые standalone JSON-модули, упражнения и QC.
5. **Part V · Master Build** — сборка изученных модулей в большой production workflow.

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

При добавлении новой главы недостаточно изменить только `lib/manual/*.ts`. Обновление считается завершённым только после цепочки:

`CONTENT → manualChapters → ROUTE → SIDEBAR/COUNTER → BUILD → DEPLOY → VISUAL CHECK`

Полный обязательный чек-лист хранится в [`MAINTENANCE_RULES.md`](./MAINTENANCE_RULES.md).

Нельзя сообщать, что учебник обновлён, если новая глава есть только в исходниках, но не подключена к `manualChapters`, не появилась в sidebar/счётчике страниц или не проверена после GitHub Pages deploy.