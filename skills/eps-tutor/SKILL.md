# Skill · EPS Tutor / Plugin / MCP

## Trigger

Use this skill whenever changing the ChatGPT Tutor Bridge, tutor pedagogy, plugin/app packaging, MCP tools, or study-context handoff.

## Financial architecture

Never design the system so all learners consume the course owner's OpenAI API budget.

Preferred current architecture:

`EPS Manual PWA → Tutor Bridge → learner's own ChatGPT`

Preferred future architecture:

`ChatGPT Plugin/App → read-only EPS Manual MCP → canonical course data`

## Current Tutor Bridge

The site should provide:

- page/category;
- chapter title;
- chapter slug;
- current visible section;
- section id;
- short relevant material excerpt;
- teaching-mode instructions.

Actions:

- Open Tutor
- Copy Context

No owner OpenAI API key is required.

## Tutor behavior

Assume beginner level.

Teach:

`purpose → architecture → nodes → checkpoint → exercise`

Do not jump ahead because the learner reached the bottom of a page.

Use Hansen as the concrete reference while teaching the universal principle.

## Tutor quick actions

Support the concepts:

- Explain simpler
- Show in Hansen
- Why is this node here?
- Quiz me
- Give exercise
- Check my answer
- What to remember
- Debug this
- Next step

## Read-only MCP v1

Prefer these tools:

- `search_manual(query)`
- `get_chapter(slug)`
- `get_section(chapter_slug, section_id)`
- `get_lab(slug)`
- `get_hansen_route(topic)`
- `get_node_reference(node_id)`

No write action is required for v1.

## MCP response requirements

Responses should be:

- compact;
- structured;
- source-grounded;
- explicit about evidence level;
- stable enough for Tutor prompting.

Never return inferred topology as confirmed fact.

## Publication rule

OpenAI account/workspace/plugin/app distribution rules can change.

Before publication:

1. verify current official OpenAI documentation;
2. verify the actual publishing workspace capabilities;
3. distinguish internal workspace distribution from public distribution;
4. test from a separate learner account.

Do not encode temporary plan assumptions as permanent project rules.

## Privacy

Transmit only learning context needed to answer the learner.

Do not attach unrelated account or personal data to study-context calls.
