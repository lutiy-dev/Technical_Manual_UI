# EPS ComfyUI Tutor Plugin · Product / Teaching Specification

Status: **ACTIVE DESIGN + BRIDGE IMPLEMENTED · Plugin/MCP not yet published**

This document defines the teaching and integration contract for the future ChatGPT plugin/app that accompanies the EPSPOZICIYA ARCHVIZ · Technical Workflow Manual.

## 1. Product model

The learning system has three layers:

1. **EPS Manual PWA** — canonical course interface and source of truth.
2. **Tutor Bridge** — current working bridge from the visible chapter/section to the learner's own ChatGPT.
3. **Future Plugin/App + read-only MCP** — direct structured access to the manual without requiring copy/paste context.

The plugin is not a generic ComfyUI assistant. It is a teaching layer for one fundamental course.

Core doctrine:

> We do not study all of ComfyUI. We study the production system and the reusable thinking patterns behind it.

The learner should move from “I see a scary graph” to “I can read, explain, test and debug an unfamiliar workflow”.

## 2. Cost / account model

The tutor must **not** depend on the course owner's OpenAI API key for learner conversations.

Each learner uses their own ChatGPT account.

Current bridge:

`EPS Manual → context copy → learner's ChatGPT`

Future integration:

`ChatGPT Plugin/App → EPS Manual MCP → course data`

The course owner may pay for hosting small read-only infrastructure if needed, but not for every learner's model inference.

## 3. Current Tutor Bridge · implemented

The PWA currently tracks:

- course page/category;
- chapter title;
- chapter slug;
- current visible section;
- section id;
- a short excerpt/material summary;
- teaching-mode instructions.

The bridge provides two actions:

- **Open Tutor** — copy context, then open ChatGPT;
- **Copy Context** — copy only, useful when the learner already has an active course chat.

No owner OpenAI API key is used.

## 4. Teaching behavior

The tutor should:

1. Assume the learner is a beginner unless the learner demonstrates otherwise.
2. Explain from simple to complex.
3. Start with purpose and architecture before individual nodes.
4. Preserve the EPS learning order:
   - Workflow Engineering
   - Foundation
   - Generative Systems
   - Hansen by Timestamps
   - PEOPLE / PPL
   - Final Pipeline
   - Labs
   - Capstone
5. Stop and explain unknown terms instead of silently assuming them.
6. Prefer node routes in the form:
   `NODE → NODE → NODE`
7. Distinguish:
   - Hansen original behavior
   - EPS foundation / extension
   - confirmed vs inferred vs not-confirmed
8. Never invent importable ComfyUI JSON when exact node serialization is unavailable.
9. Teach debugging through the first incorrect checkpoint, not random parameter changes.
10. Encourage one-variable A/B tests with fixed seed/input.
11. Do not advance merely because text was read; advance when the learner can explain or apply the concept.
12. Treat Labs and Capstone as competency checks, not decorative appendices.

## 5. Tutor commands

Suggested quick actions:

- **Explain simpler** — explain current section using simpler language and one analogy.
- **Show in Hansen** — map the current concept to the Hansen master workflow.
- **Why is this node here?** — explain purpose, input, output, upstream and downstream role.
- **Quiz me** — ask 2–4 short objective questions without revealing answers immediately.
- **Give exercise** — provide one practical task using the current course material.
- **Check my answer** — evaluate the learner’s explanation and identify the missing concept.
- **What to remember** — reduce the current section to 3–5 durable rules.
- **Debug this** — guide from symptom → last correct checkpoint → first incorrect checkpoint.
- **Next step** — only advance when the current concept is sufficiently understood.

## 6. Context contract from the website

Current manual-side bridge provides:

- course page number
- category
- chapter title
- chapter slug
- current visible section
- section id
- section text excerpt
- teaching-mode instructions

Future optional fields:

- completed chapters
- completed labs
- learner notes
- difficult concepts
- last study date
- current device

Do not transmit sensitive user data that is unnecessary for teaching.

## 7. Future read-only MCP interface

Preferred architecture:

`ChatGPT Plugin/App → EPS Manual MCP → Technical Manual repository/data`

No write access is required for v1.

### search_manual

Input:
- `query: string`

Output:
- matching chapter slugs
- section ids
- titles
- short excerpts
- evidence status

### get_chapter

Input:
- `slug: string`

Output:
- chapter metadata
- sections
- related chapters
- related nodes
- evidence status

### get_section

Input:
- `chapter_slug: string`
- `section_id: string`

Output:
- exact current section content
- related node ids
- related lab
- source/evidence metadata

### get_lab

Input:
- `slug: string`

Output:
- goal
- exercises
- checkpoints
- pass criteria

### get_hansen_route

Input:
- `topic: string`

Output:
- confirmed node route
- control points
- checkpoints
- return path
- confidence/evidence state

### get_node_reference

Input:
- `node_id: number`

Output:
- title/class when known
- upstream/downstream
- serialized values when confirmed
- chapters that explain it

## 8. MCP response principles

MCP responses should be:

- read-only;
- compact;
- source-grounded;
- structured;
- explicit about evidence level;
- stable enough for tutor prompting;
- independent of visual UI wording where possible.

A tool should not return “best guesses” as graph facts.

## 9. Safety / evidence rules

The tutor must never present inferred topology or model behavior as confirmed.

The three evidence labels remain authoritative:

- `CONFIRMED`
- `INFERRED`
- `NOT CONFIRMED`

When a question exceeds the manual, the tutor should explicitly say it is going beyond the course source.

## 10. User experience

Desktop:

`MANUAL | CONTENT | CHATGPT TUTOR`

Mobile:

- sidebar card: **ChatGPT · Репетитор**
- one tap copies context and opens ChatGPT
- second action copies context only

Future Plugin/App + MCP should remove the manual copy/paste step while preserving the same teaching context contract.

## 11. Distribution rule

Do not hard-code assumptions such as “Business always publishes to Plus” or “Plus always supports custom MCP”.

OpenAI account, workspace, plugin/app, and distribution rules can change.

Before any real publication step:

1. check current official OpenAI documentation;
2. verify the actual capabilities of the publishing workspace/account;
3. distinguish internal workspace distribution from public directory distribution;
4. test installation from a separate learner account.

## 12. Definition of done for future plugin/app

A plugin/app version is complete when a new learner can:

1. install/connect it in their own ChatGPT, where supported;
2. ask about any course chapter by name;
3. retrieve exact current manual content through read-only tools;
4. receive beginner-appropriate explanations following EPS pedagogy;
5. complete a lab with checkpoints and pass criteria;
6. use their own ChatGPT account rather than the course owner's inference budget;
7. reproduce the experience on a second device/account under the supported distribution model.

## 13. Non-goals

Do not turn the tutor into:

- a marketplace of ComfyUI models;
- a generic prompt generator;
- an autonomous workflow mutator;
- a tool that installs arbitrary custom nodes;
- an API proxy billed to the course owner;
- a hidden source of undocumented graph modifications.

The tutor exists to teach transferable ComfyUI thinking.
