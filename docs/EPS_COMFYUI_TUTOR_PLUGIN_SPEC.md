# EPS ComfyUI Tutor Plugin · Product / Teaching Specification

Status: **DESIGN SPEC · not yet an installable plugin**

This document defines the future ChatGPT plugin for the EPSPOZICIYA ARCHVIZ · Technical Workflow Manual.

## 1. Purpose

The plugin is not a generic ComfyUI assistant. It is a teaching layer for one fundamental course.

Core doctrine:

> We do not study all of ComfyUI. We study the production system and the reusable thinking patterns behind it.

The plugin should help a beginner move from “I see a scary graph” to “I can read, explain, test and debug an unfamiliar workflow”.

## 2. Cost / account model

The plugin must not depend on the course owner’s OpenAI API key.

Each learner uses their own ChatGPT account. The website only provides course context and, later, a read-only MCP data source.

## 3. Teaching behavior

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

## 4. Tutor commands

Suggested quick actions:

- **Explain simpler** — explain current section using simpler language and one analogy.
- **Show in Hansen** — map the current concept to the Hansen master workflow.
- **Why is this node here?** — explain purpose, input, output, upstream and downstream role.
- **Quiz me** — ask 2–4 short questions without revealing answers immediately.
- **Give exercise** — provide one practical task using the current course material.
- **Check my answer** — evaluate the learner’s explanation and identify one missing concept.
- **What to remember** — reduce the current section to 3–5 durable rules.
- **Debug this** — guide from symptom → last correct checkpoint → first incorrect checkpoint.
- **Next step** — only advance when the current concept is sufficiently understood.

## 5. Context contract from the website

Current manual-side bridge can provide:

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

## 6. Future read-only MCP interface

The preferred future architecture is:

`ChatGPT Plugin → EPS Manual MCP → Technical Manual repository/data`

No write access is required for v1.

Proposed MCP tools:

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

## 7. Safety / evidence rules

The tutor must never present an inferred topology or model behavior as confirmed.

The three evidence labels remain authoritative:

- `CONFIRMED`
- `INFERRED`
- `NOT CONFIRMED`

When a question exceeds the manual, the tutor should explicitly say it is going beyond the course source.

## 8. User experience

Desktop:

`MANUAL | CONTENT | CHATGPT TUTOR`

The tutor can be opened from the manual sidebar. The website copies the current study context and opens ChatGPT.

Mobile:

- sidebar card: **ChatGPT · Репетитор**
- one tap copies context and opens ChatGPT
- second action copies context only

Future plugin + MCP removes the manual copy/paste step.

## 9. Definition of done for future plugin

A plugin version is complete when a new learner can:

1. install/connect the plugin in their own ChatGPT;
2. ask about any course chapter by name;
3. retrieve the exact current manual content through read-only tools;
4. receive beginner-appropriate explanations following EPS pedagogy;
5. complete a lab with checkpoints and pass criteria;
6. move to another device without relying on the course owner’s API key.

## 10. Non-goals

Do not turn the plugin into:

- a marketplace of ComfyUI models;
- a generic prompt generator;
- an autonomous workflow mutator;
- a tool that installs arbitrary custom nodes;
- an API proxy billed to the course owner.

The plugin exists to teach transferable ComfyUI thinking.
