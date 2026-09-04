# PEOPLE / PPL — Hansen Technical Manual

Интерактивный технический учебник по ветке PEOPLE/PPL workflow
`Epspoziciya_archviz_ph_sdxlflux_v001`.

Сайт разбит на отдельные маршруты: Overview, Node 408 Prompt, Generation,
Segmentation/Mask, Preparation/Color Match, Selector Logic, Composite, Output,
Diagnostics, Checklist, Examples и Resources.

## Онлайн-версия

После первой успешной публикации GitHub Pages учебник будет доступен по адресу:

<https://lutiy-dev.github.io/people-ppl-hansen-manual/>

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
