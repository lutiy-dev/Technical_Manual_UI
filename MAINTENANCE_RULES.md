# EPSPOZICIYA ARCHVIZ · Manual Maintenance Rules

Это обязательный чек-лист для каждого обновления технического учебника.

## Главное правило

Добавление текста или новой главы в source-файл **не считается завершённым обновлением**, пока новая глава не подключена к реальному маршруту сайта и не проверена после deploy.

## Методология учебника

Главный порядок обучения фиксируется как обязательное правило:

> **Сначала архитектура графа, потом генеративные ноды, потом практика.**

### LEVEL 0 · GRAPH ARCHITECTURE

Сначала объяснять, как строится профессиональный управляемый workflow до добавления генеративных моделей:

- BASE CONFIG / control plane;
- группы и naming convention;
- bypass / enable-disable logic;
- model loaders и resource boundaries;
- inputs / outputs contract;
- shared controls и selectors;
- sampler configuration;
- debug / checkpoint strategy;
- return points между независимыми ветками.

### LEVEL 1 · GENERATIVE SYSTEMS

Только после архитектуры разбирать конкретные технологические блоки и их data flow: SDXL, FLUX, ControlNet, preprocessors, masks, Florence2, SAM2, PEOPLE/PPL, upscale и другие используемые системы.

### LEVEL 2 · PRACTICE LABS

После объяснения каждой технологии должна следовать практика: standalone JSON, упражнение, checkpoints, QC, troubleshooting и интеграция выхода модуля в следующий модуль или Master Workflow.

## Правило разбора Hansen по таймкодам

Видео Hansen разбирать последовательно по таймкодам. Каждый смысловой блок видео оформлять как отдельный учебный модуль, если его можно осмысленно запустить независимо.

Для каждого такого модуля по возможности готовить полный пакет:

1. Что делает ветка и зачем она нужна в Archviz.
2. Инфографика `нода → стрелка → нода`.
3. Standalone ComfyUI JSON, запускаемый независимо от Master Workflow.
4. Dependencies: custom nodes, models и обязательные файлы.
5. Input / Output contract.
6. Ключевые controls и widget values.
7. Промежуточные preview/checkpoints после важных стадий.
8. Практическое упражнение.
9. QC / troubleshooting.
10. Return contract — куда выход ветки подключается в большом production-графе.

Standalone JSON должен быть **учебным и рабочим одновременно**: только реальные node types/classes, никаких псевдо-нод; минимально необходимая ветка без unrelated частей Master Workflow; понятные группы и notes; промежуточные previews, чтобы пользователь мог пройти workflow нода за нодой.

Исходный Hansen workflow сохраняется как immutable reference. Учебные standalone-модули являются производными копиями и не должны менять смысл оригинальной topology без явной пометки.

## BASE CONFIG как фундамент

После разбора Hansen по таймкодам отдельно документировать то, что автор использует как уже готовую инфраструктуру, но почти не объясняет: построение BASE CONFIG для большого профессионального ComfyUI-графа.

BASE CONFIG рассматривать не как декоративную панель, а как **control plane** графа. Отдельно объяснять:

- Fast Groups Bypasser / централизованный bypass;
- MODEL LOADERS;
- INPUTS;
- CONTROL;
- SAMPLER CONFIGURATION;
- ControlNet PREPROCESSORS + EXTRAS;
- MASKS;
- PEOPLE/PPL sub-branches;
- Process SEGMENTATION / SDXL / FLUX / UPSCALE / ADD LOGO;
- OUTPUT;
- диагностические режимы и выбор минимального активного маршрута.

## Архитектура курса

Workflow Engineering for ComfyUI является самостоятельным обязательным разделом **перед** разбором Hansen. Порядок курса:

`PART I · Workflow Engineering → PART II · Generative Systems → PART III · Hansen by Timestamps → PART IV · Practice Labs → PART V · Master Build`

## При добавлении новой главы

1. Добавить или обновить контент главы в соответствующем `lib/manual/*.ts`.
2. Проверить уникальный `slug` и короткий `navTitle` для бокового меню.
3. Добавить `slug` в `manualChapters` в `lib/manual-data.ts` в правильном месте порядка страниц.
4. Проверить, что новая глава попала в `chapterBySlug` через `manualChapters` и открывается как отдельный route.
5. Если число глав изменилось, обновить заявленное количество маршрутов в README и других местах, где оно указано как фиксированное число.
6. Проверить sidebar: новый пункт должен быть видим в нужной категории, а все последующие номера должны сдвинуться корректно.
7. Проверить верхний счётчик страниц: например, после добавления 29-й главы он должен показывать `01 / 29`, а не старое `01 / 28`.
8. Запустить production build (`npm run build`) или убедиться, что GitHub Pages workflow выполнил эквивалентную production-сборку без ошибок.
9. Проверить GitHub Pages deploy: workflow должен завершиться `success` на коммите с изменением.
10. После deploy визуально открыть опубликованный сайт и убедиться, что новая глава реально появилась в меню и открывается. Нельзя считать обновление завершённым только потому, что commit существует.

## Правило отчётности

Не писать «учебник обновлён», если выполнено только изменение исходников. Корректная формулировка допускается только после проверки:

`CONTENT → manualChapters → ROUTE → SIDEBAR/COUNTER → BUILD → DEPLOY → VISUAL CHECK`

Если любой из этих этапов не подтверждён, в отчёте явно указывать, что именно ещё не проверено.

## PEOPLE / PPL

Новые способы работы с людьми документировать как отдельные workflow-варианты и не смешивать их смысл:

- Workflow 01 — генерация и добавление новых людей: `Generate separately → detect/segment → clean cutout → color integration → placement mask → composite → return`.
- Workflow 02 — AI replacement/enhancement уже размещённых людей: 3D/существующий proxy задаёт placement, AI улучшает visual quality.

Для Workflow 01 обязательно различать две независимые маски:

- `Person Mask` = **WHAT TO TAKE**;
- `Placement Mask` = **WHERE TO PUT IT**.

Для Workflow 02 использовать отдельную главу `ppl-workflow-02-replace-existing` и размещать её после Workflow 01 внутри секции PEOPLE / PPL.
