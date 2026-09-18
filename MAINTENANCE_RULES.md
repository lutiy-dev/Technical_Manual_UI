# EPSPOZICIYA ARCHVIZ · Manual Maintenance Rules

Это обязательный чек-лист для каждого обновления технического учебника, PWA и Tutor layer.

## Главное правило

Добавление текста, новой главы, PWA-функции или Tutor-функции в source-файл **не считается завершённым обновлением**, пока изменение не подключено к реальному продукту и не проверено после deploy.

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

После объяснения каждой крупной технологии должна следовать практика: упражнение, checkpoints, QC, troubleshooting и интеграция выхода модуля в следующий модуль или Master Workflow.

Standalone JSON публиковать только тогда, когда exact serialized node schema действительно подтверждена. Псевдо-JSON не считать учебным артефактом.

## Правило разбора Hansen по таймкодам

Видео Hansen разбирать последовательно по таймкодам. Каждый смысловой блок видео оформлять как отдельный учебный модуль, если его можно осмысленно запустить независимо.

Для каждого такого модуля по возможности готовить полный пакет:

1. Что делает ветка и зачем она нужна в Archviz.
2. Инфографика `нода → стрелка → нода`.
3. Standalone ComfyUI JSON — **только если точная сериализация подтверждена**.
4. Dependencies: custom nodes, models и обязательные файлы.
5. Input / Output contract.
6. Ключевые controls и effective widget values.
7. Промежуточные preview/checkpoints.
8. Практическое упражнение.
9. QC / troubleshooting.
10. Return contract — куда выход ветки подключается в большом production-графе.

Исходный Hansen workflow сохраняется как immutable reference. Учебные standalone-модули являются производными копиями и не должны менять смысл оригинальной topology без явной пометки.

## BASE CONFIG как фундамент

BASE CONFIG рассматривать не как декоративную панель, а как **control plane** графа.

Обязательно объяснять:

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

Workflow Engineering for ComfyUI является самостоятельным обязательным разделом **перед** разбором Hansen.

Порядок курса:

`PART I · Workflow Engineering → PART II · Generative Systems → PART III · Hansen by Timestamps → PART IV · Practice Labs → PART V · Master Build`

Practice chain:

`LAB 01 → LAB 02 → LAB 03 → LAB 04 → LAB 05 → LAB 06 → LAB 07 → CAPSTONE`

Экспериментальный стандарт:

`SAME INPUT → SAME SEED → SAME PROMPT → CHANGE ONE VARIABLE → COMPARE CHECKPOINTS`

Debug standard:

`SYMPTOM → LAST CORRECT CHECKPOINT → FIRST INCORRECT CHECKPOINT → FIX UPSTREAM`

## При добавлении новой главы

1. Добавить или обновить контент главы в соответствующем `lib/manual/*.ts`.
2. Проверить уникальный `slug` и короткий `navTitle`.
3. Добавить `slug` в `manualChapters` в `lib/manual-data.ts` в правильном месте.
4. Проверить, что глава попала в `chapterBySlug` и открывается отдельным route.
5. Если число глав изменилось, обновить фиксированные route counts.
6. Проверить sidebar и номера.
7. Проверить верхний счётчик страниц.
8. Запустить production build.
9. Проверить GitHub Pages deploy на коммите с изменением.
10. Визуально проверить опубликованный route.

## PWA · обязательные правила

Учебник является installable PWA. PWA считается исправным только при одновременном выполнении следующих условий:

- `manifest.webmanifest` доступен из deployed project root;
- service worker доступен и регистрируется в нужном scope;
- `display: standalone`;
- start URL и scope учитывают GitHub Pages base path;
- EPS launcher icons доступны в deployed artifact;
- Android получает 192×192 и 512×512 PNG;
- manifest имеет отдельный `maskable` icon entry;
- iOS получает 180×180 Apple touch icon.

### Critical Pages packaging rule

Файл в `public/` ещё не гарантирует, что он попадёт в опубликованный project-root artifact.

После изменения PWA обязательно проверить, что `scripts/prepare-github-pages.mjs` копирует:

- `manifest.webmanifest`;
- `sw.js`;
- `pwa-install-capture.js`;
- `icons/`;
- favicon и связанные static assets.

Отсутствие этих файлов в artifact может привести к тому, что Android создаст generic Chrome/browser shortcut вместо настоящего EPS PWA.

### Install prompt rule

`beforeinstallprompt` может сработать до React hydration.

Поэтому:

1. перехватывать событие как можно раньше;
2. сохранять deferred prompt;
3. клиентской кнопкой вызывать нативный `prompt()`;
4. не использовать `window.alert()` как основной UX;
5. fallback показывать как inline hint/toast.

### Icon testing rule

После изменения launcher icons:

1. удалить старую установленную версию/shortcut;
2. обновить сайт;
3. установить заново;
4. проверить реальную иконку на launcher/home screen;
5. открыть приложение и убедиться в standalone mode.

Причина: Android launcher / Chrome могут кэшировать старые icon metadata.

### PWA release completion rule

`SOURCE → BUILD → PAGES ASSEMBLY → DEPLOY → ARTIFACT CHECK → FRESH INSTALL TEST`

Нельзя писать «PWA исправлено», если проверена только source-часть.

## Tutor Bridge

Current architecture:

`EPS Manual PWA → chapter/section context → clipboard → learner's ChatGPT`

Tutor Bridge должен:

- определять текущую главу;
- определять текущую видимую секцию;
- передавать краткий material excerpt;
- добавлять teaching-mode instructions;
- открывать ChatGPT пользователя;
- не использовать shared OpenAI API key владельца курса.

Financial architecture rule:

> **Нельзя строить обучение так, чтобы все пользователи расходовали API budget владельца курса.**

Каждый пользователь должен разговаривать через собственный ChatGPT account.

## EPS Tutor Plugin / MCP

Будущая архитектура:

`ChatGPT Plugin/App → read-only EPS Manual MCP → canonical course data`

Для v1 MCP должен быть read-only.

Предпочтительные tools:

- `search_manual`
- `get_chapter`
- `get_section`
- `get_lab`
- `get_hansen_route`
- `get_node_reference`

Перед публикацией Plugin/App всегда заново проверять актуальные требования OpenAI к account/workspace/distribution. Не кодировать текущие plan/rollout assumptions как вечные правила проекта.

## Evidence discipline

Все технические данные разделять на:

- `CONFIRMED`
- `INFERRED`
- `NOT CONFIRMED`

Tutor и учебник не должны повышать уровень уверенности без новых доказательств.

Если вопрос выходит за пределы manual source, явно сообщать, что ответ использует внешнее знание.

## Правило отчётности

Для content:

`CONTENT → manualChapters → ROUTE → SIDEBAR/COUNTER → BUILD → DEPLOY → VISUAL CHECK`

Для PWA:

`SOURCE → BUILD → PAGES ASSEMBLY → DEPLOY → ARTIFACT CHECK → FRESH INSTALL TEST`

Для Tutor Bridge:

`CONTEXT DETECTION → COPY → CHATGPT OPEN → MOBILE CHECK → DESKTOP CHECK`

Если любой этап не подтверждён, в отчёте явно указывать, что именно ещё не проверено.

## PEOPLE / PPL

Новые способы работы с людьми документировать как отдельные workflow-варианты и не смешивать их смысл:

- Workflow 01 — генерация и добавление новых людей: `Generate separately → detect/segment → clean cutout → color integration → placement mask → composite → return`.
- Workflow 02 — AI replacement/enhancement уже размещённых людей: 3D/существующий proxy задаёт placement, AI улучшает visual quality.

Для Workflow 01 обязательно различать две независимые маски:

- `Person Mask` = **WHAT TO TAKE**;
- `Placement Mask` = **WHERE TO PUT IT**.

Для Workflow 02 использовать отдельную главу `ppl-workflow-02-replace-existing` и размещать её после Workflow 01 внутри секции PEOPLE / PPL.
