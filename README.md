# EPSPOZICIYA ARCHVIZ · TECHNICAL WORKFLOW MANUAL

[![Paul Hansen · Archviz x AI Free ComfyUI SDXL x FLUX Workflow — Showcase](https://img.youtube.com/vi/6aXJqRhjXo0/maxresdefault.jpg)](https://www.youtube.com/watch?v=6aXJqRhjXo0)

## COURSE RESOURCES

| Resource | Link | Purpose |
| --- | --- | --- |
| ▶ **Original Hansen Video** | [Watch on YouTube](https://www.youtube.com/watch?v=6aXJqRhjXo0) | Исходный showcase, который разбирается в курсе по таймкодам |
| ⬇ **Original Hansen Workflow / JSON** | [Official workflow download](https://civitai.com/models/920108/phs-archviz-x-ai-comfyui-workflow-sdxl-flux) | Оригинальный workflow Paul Hansen для практики |
| 📘 **EPS Technical Manual** | [Open the manual](https://lutiy-dev.github.io/Technical_Manual_UI/) | Учебник, Labs, Capstone и Tutor Bridge |

> **Practice rule:** original Hansen workflow = immutable reference. Не редактируйте оригинал напрямую — перед упражнениями сделайте рабочую копию.

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

## PWA · устанавливаемое приложение

Учебник работает как Progressive Web App:

- устанавливается на desktop и Android без магазина приложений;
- запускается в `standalone` режиме без обычной браузерной строки;
- использует EPS-branded launcher icons;
- регистрирует service worker;
- сохраняет лёгкий app shell / посещённые страницы, не заполняя кэш тяжёлыми `downloads/` и `resources/`;
- использует нативный browser install prompt, когда он доступен.

Критический опыт эксплуатации: наличие `manifest.webmanifest`, `sw.js` и `icons/` в `public/` недостаточно. Они должны быть явно включены в итоговый GitHub Pages artifact через `scripts/prepare-github-pages.mjs`. Иначе Android может создать generic browser shortcut вместо полноценного EPS PWA.

При тестировании новой launcher icon на Android старую установленную версию нужно удалить перед повторной установкой из-за launcher/browser cache.

## ChatGPT · Репетитор

В PWA добавлен Tutor Bridge:

`EPS Manual → current chapter/section context → clipboard → learner's own ChatGPT`

Сайт отслеживает текущую главу/секцию, готовит учебный контекст и открывает ChatGPT. OpenAI API владельца курса для этого не используется.

Главный финансовый/архитектурный принцип:

> **Каждый учащийся использует свой ChatGPT. Владелец учебника не оплачивает inference всех пользователей через единый API key.**

Будущий слой:

`ChatGPT Plugin/App → read-only EPS Manual MCP → canonical course data`

Спецификация: [`docs/EPS_COMFYUI_TUTOR_PLUGIN_SPEC.md`](./docs/EPS_COMFYUI_TUTOR_PLUGIN_SPEC.md).

## Инструкции и project-local skills

Главная инструкция для агентов и разработчиков:

- [`AGENTS.md`](./AGENTS.md)

Project-local skills:

- [`skills/eps-course-authoring/SKILL.md`](./skills/eps-course-authoring/SKILL.md) — педагогика и контент;
- [`skills/eps-manual-maintenance/SKILL.md`](./skills/eps-manual-maintenance/SKILL.md) — routing/build/deploy/QC;
- [`skills/eps-pwa-release/SKILL.md`](./skills/eps-pwa-release/SKILL.md) — PWA install, icons, Pages artifact;
- [`skills/eps-tutor/SKILL.md`](./skills/eps-tutor/SKILL.md) — Tutor Bridge, Plugin/MCP contract.

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

Для PWA:

`SOURCE → BUILD → PAGES ASSEMBLY → DEPLOY → ARTIFACT CHECK → FRESH INSTALL TEST`

Полный обязательный чек-лист хранится в [`MAINTENANCE_RULES.md`](./MAINTENANCE_RULES.md).

Нельзя сообщать, что учебник или приложение обновлены, если изменение есть только в исходниках, но не подтверждено в опубликованной сборке.
