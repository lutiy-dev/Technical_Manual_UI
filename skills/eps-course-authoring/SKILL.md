# Skill · EPS Course Authoring

## Trigger

Use this skill whenever adding, revising, or reviewing instructional content in the EPSPOZICIYA ARCHVIZ · Technical Workflow Manual.

## Goal

Create material that teaches transferable ComfyUI thinking, not a catalog of model-specific recipes.

## Mandatory teaching order

`ARCHITECTURE → SYSTEM PURPOSE → INPUT/OUTPUT CONTRACT → CONCRETE NODES → CHECKPOINT → PRACTICE → PASS CRITERIA`

Do not start from isolated node names unless the learner already understands where the node belongs in the system.

## Beginner contract

Assume the learner may not yet understand:

IMAGE, MASK, LATENT, MODEL, CLIP, CONDITIONING, VAE, scheduler, guider, selector, bypass, cache, batch, coordinate space.

Explain new terms just-in-time.

## Hansen doctrine

Hansen is the concrete production reference, but the course goal is universal.

Always distinguish:

- Hansen original behavior;
- EPS foundation / extension;
- general ComfyUI principle.

Use route notation:

`NODE → NODE → NODE`

## Evidence

All technical claims must preserve:

- CONFIRMED
- INFERRED
- NOT CONFIRMED

Never upgrade confidence without evidence.

Never invent importable JSON if exact custom-node serialization is unavailable.

## Practice

Every major concept must have either:

- an inline exercise;
- a dedicated LAB;
- a Capstone competency check.

Use one-variable tests:

`same input → same seed → same prompt → change one variable → compare checkpoints`

## Debugging

Teach:

`symptom → last correct checkpoint → first incorrect checkpoint → fix upstream`

Do not teach random parameter tweaking.

## Completion test

A chapter is successful if the learner can answer:

1. What problem does this system solve?
2. What enters it?
3. What leaves it?
4. What controls it?
5. Where is the checkpoint?
6. What fails when its contract is broken?
7. How does it return to the master workflow?
