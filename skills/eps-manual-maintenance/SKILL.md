# Skill · EPS Manual Maintenance

## Trigger

Use this skill whenever changing manual chapters, navigation, route count, sidebars, evidence labels, Labs, or production deployment.

## Source completion is not product completion

Never report an update as finished after editing source only.

Required content chain:

`CONTENT → manualChapters → ROUTE → SIDEBAR/COUNTER → BUILD → DEPLOY → VISUAL CHECK`

## Checklist

1. Update the correct `lib/manual/*.ts` file.
2. Verify unique slug.
3. Verify concise navTitle.
4. Register the slug in `manualChapters`.
5. Verify category and order.
6. Verify all following page indices/counts.
7. Build production output.
8. Verify GitHub Pages deploy success on the relevant commit.
9. Inspect deployed artifact or live route.
10. State explicitly what was and was not checked.

## Pedagogy guard

Do not create a new textbook for every new model.

Add new content only when it introduces:

- a new transferable concept;
- a new production system;
- a genuinely necessary workflow extension.

Otherwise treat it as an extension/reference.

## JSON rule

Do not publish pseudo-ComfyUI JSON as importable.

Exact workflow JSON requires confirmed serialized node classes, inputs, widgets, links, groups, and custom-node schema.

## Evidence rule

Do not lose CONFIRMED / INFERRED / NOT CONFIRMED distinctions during refactors.

## Cleanup

Temporary patch/finalizer workflows should not accumulate indefinitely. Remove obsolete workflow automation after its purpose is complete, while preserving the stable Pages deploy workflow.
