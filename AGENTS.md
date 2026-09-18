# EPSPOZICIYA ARCHVIZ · AGENT INSTRUCTIONS

This file is the operational instruction layer for assistants, coding agents, and future EPS Tutor tooling working on this repository.

## 1. Project identity

This repository is the source for **EPSPOZICIYA ARCHVIZ · Technical Workflow Manual** — a fundamental ComfyUI course built around production-first reverse engineering of the Hansen archviz workflow.

The project has three connected product layers:

1. **Manual** — the canonical learning content.
2. **PWA** — the installable mobile/desktop study application.
3. **Tutor layer** — ChatGPT bridge now, Plugin/MCP later.

## 2. Teaching doctrine

Do not turn the project into a generic ComfyUI encyclopedia.

Use this order:

`GRAPH ARCHITECTURE → GENERATIVE SYSTEMS → HANSEN → PRACTICE → MASTER BUILD`

Teach the learner to see systems before individual nodes.

Preferred route notation:

`NODE → NODE → NODE`

For every concept, prefer:

`purpose → architecture placement → input/output contract → concrete nodes → checkpoint → exercise → pass criteria`

Never assume the learner already understands IMAGE, MASK, LATENT, MODEL, CLIP, CONDITIONING, VAE, scheduler, guider, selector, bypass, cache, batch, or coordinate space.

## 3. Evidence discipline

Every technical claim must preserve the existing evidence model:

- `CONFIRMED`
- `INFERRED`
- `NOT CONFIRMED`

Never present inferred topology as confirmed.

Never invent importable ComfyUI JSON when exact serialized custom-node data is unavailable.

The original Hansen workflow is an immutable reference.

## 4. Practice doctrine

A chapter is not considered pedagogically complete merely because the explanation is correct.

Major learning layers require hands-on reinforcement.

Current practice chain:

`LAB 01 Routing Sandbox`
→ `LAB 02 BASE CONFIG`
→ `LAB 03 Module Contract`
→ `LAB 04 Read the Master`
→ `LAB 05 Generative Bench`
→ `LAB 06 PEOPLE/PPL Production Run`
→ `LAB 07 Final Delivery`
→ `CAPSTONE Master Graph`

Experimental rule:

`same input → same seed → same prompt → change one variable → compare checkpoints`

Debugging rule:

`symptom → last correct checkpoint → first incorrect checkpoint → fix upstream`

## 5. PWA product rules

The manual is an installable Progressive Web App.

Required behavior:

- installable on desktop and Android without an app store;
- standalone display mode;
- EPS-branded launcher icon;
- no browser chrome after proper install;
- service worker for app-shell/static caching;
- heavy `downloads/` and `resources/` should not be aggressively cached;
- install UX must prefer the browser-native install prompt;
- fallback instructions must be inline/non-modal, not blocking `alert()` dialogs.

### Critical GitHub Pages rule

A PWA asset existing in `public/` is **not enough**.

The Pages assembly script must copy these assets into the deployed project-root artifact:

- `manifest.webmanifest`
- `sw.js`
- `pwa-install-capture.js`
- `icons/`
- favicon / required static metadata

If these are absent from the final artifact, Android may create a generic browser shortcut instead of a real branded PWA.

### Install event rule

Capture `beforeinstallprompt` as early as possible, before React hydration, and hand it to the client UI.

Do not assume React mounted in time to receive the event.

### Icon QA

Maintain at minimum:

- 180×180 Apple touch icon;
- 192×192 PNG;
- 512×512 PNG;
- 512×512 maskable entry.

When testing a changed Android icon, remove the previously installed shortcut/app first because launcher/browser caches may preserve the old icon.

## 6. Tutor architecture

The course owner must **not** pay for other learners' inference usage through one shared OpenAI API key.

Preferred architecture:

`EPS Manual PWA → Tutor Bridge → learner's own ChatGPT`

Future architecture:

`ChatGPT Plugin/App → read-only EPS Manual MCP → canonical course data`

The website may pass chapter/section context, but generation should occur inside the learner's own ChatGPT account.

Current bridge context includes:

- page/category;
- chapter title + slug;
- current visible section;
- section id;
- short section material;
- teaching-mode instructions.

## 7. Plugin / MCP doctrine

The EPS Tutor is a teaching layer, not a general-purpose autonomous ComfyUI operator.

Future read-only MCP surface should prefer:

- `search_manual`
- `get_chapter`
- `get_section`
- `get_lab`
- `get_hansen_route`
- `get_node_reference`

Write actions are out of scope for v1.

Do not expose a shared private API key in browser code.

## 8. Release completion rule

No change is “done” at source level.

For content:

`CONTENT → manualChapters → ROUTE → SIDEBAR/COUNTER → BUILD → DEPLOY → VISUAL CHECK`

For PWA:

`SOURCE → BUILD → PAGES ASSEMBLY → DEPLOY → ARTIFACT CHECK → FRESH INSTALL TEST`

For Tutor Bridge:

`CURRENT CHAPTER/SECTION DETECTION → CONTEXT COPY → CHATGPT OPEN → MOBILE/DESKTOP CHECK`

Always state which checks are complete and which are still pending.

## 9. Scope control

Do not endlessly grow the textbook for every new model.

New models/packages are extensions on top of the learned architecture unless they introduce a genuinely new transferable concept.

The course is complete when the learner can read, test, explain, and debug an unfamiliar graph independently.
