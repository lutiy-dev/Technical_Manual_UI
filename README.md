# EPSPOZICIYA ARCHVIZ · TECHNICAL WORKFLOW MANUAL

Интерактивный технический учебник по полному графу workflow
`Epspoziciya_archviz_ph_sdxlflux_v001`. PEOPLE/PPL сохранён как отдельный
учебный модуль внутри общей архитектуры.

Сайт разбит на 64 отдельных маршрута, объединённых в семь групп:
Workflow Engineering, Foundation, Base Generation, Hansen by Timestamps, PEOPLE/PPL Module, Final Pipeline и Evidence &
Reference. В руководство входят полная архитектура, правила чтения графа,
inputs, 28 controls, модели, prompts, SDXL, ControlNet, IPAdapter/LoRA, четыре
системы масок, detail conservation, PEOPLE/PPL (Workflow 01 Generate & Place + Workflow 02 Replace Existing), main FLUX, optional
upscale/overlay, output, diagnostics, checklist, examples, интерактивный индекс
252 узлов и Resources.

## Архитектура обучения

Учебник следует обязательному порядку: **сначала архитектура графа, потом генеративные ноды, потом практика**.

1. **Part I · Workflow Engineering for ComfyUI** — Node Literacy, Graph Literacy, Groups & Naming Standard, BASE CONFIG, control/data plane, switches/selectors/bypass, execution/queue/cache, LAB 01 Routing Sandbox, LAB 02 BASE CONFIG, LAB 03 Module Contract, modules, contracts, checkpoints и reproducibility.
2. **Part II · Generative Systems** — SDXL, FLUX, ControlNet, Florence2, SAM2, masks, composite и upscale.
3. **Part III · Hansen by Timestamps** — полный production-first reverse engineering showcase: 00:39 Production Method → 01:08 Input Data → 02:40 Process 1 → 04:23 PEOPLE → 05:42 Workflow Tips → 06:32 ControlNet → 07:38 Masks/Detail → 08:35 Mode 1 Example → 09:16 Generation Mode 1 → 11:35 Mode 2 IMG2IMG → 12:53 Generation Mode 2 → 13:20 Enhancement → 13:55 Output → 14:43 Conclusion. Главная цель — универсальная логика ComfyUI, а не каталог моделей.
4. **Part IV · Practice Labs** — LAB 01 Routing Sandbox, LAB 02 BASE CONFIG, LAB 03 Module Contract, LAB 04 Read the Master, LAB 05 Generative Bench, LAB 06 PEOPLE/PPL Production Run, LAB 07 Final Delivery.
5. **Part V · Master Build / Capstone** — controlled production run, Golden Run, диагностика и финальный Capstone: прочитать, запустить, сломать и восстановить Master Graph без подсказки.

Current Hansen timestamp coverage: **00:39 → 14:43 · COMPLETE**. Таймкодный разбор showcase закрыт; дальше учебник используется как фундамент для самостоятельного освоения новых моделей и modules.

**Course scope:** это один фундаментальный учебник по ComfyUI. Новые модели и будущие packages рассматриваются как самостоятельные extensions поверх изученной архитектуры, а не как новые отдельные учебники.

**Practice coverage:** после педагогического аудита каждый крупный слой курса имеет hands-on закрепление: graph/routing, BASE CONFIG, module contracts, Foundation/master reading, generative systems, PEOPLE/PPL и final delivery. Финальная проверка — Capstone на перенос навыка на незнакомый graph.

## Онлайн-версия

Актуальная GitHub Pages версия учебника доступна по адресу:

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