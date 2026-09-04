# Audit errata and source limitations

> Documentation product: `EPSPOZICIYA ARCHVIZ · TECHNICAL WORKFLOW MANUAL`
> Workflow named by the derived specification: `Epspoziciya_archviz_ph_sdxlflux_v001.json`
> Recorded SHA-256: `ea48f7df4d6d9727d45cd6f6d2fb9b54df7bc1cba8a436e30a1400628475be4e`

Status vocabulary:

- **CONFIRMED** — directly present in the bundled derived specification or checked bundle contents.
- **INFERRED** — an editorial or operational conclusion based on topology.
- **NOT CONFIRMED** — requires the raw workflow, installed runtime, preview, log or output image.

## 1. Raw workflow is not bundled

**CONFIRMED:** the technical resource directory and its ZIP contain the derived `HANSEN_WORKFLOW_SPEC.json`, Markdown chapters, CSV references, DOT and SVG maps.

**CONFIRMED:** the bundle does not contain `Epspoziciya_archviz_ph_sdxlflux_v001.json`.

**NOT CONFIRMED:** the recorded source hash cannot be independently recalculated in this checkout. The derived specification is therefore the current documentation source, not a replacement for the immutable raw workflow.

If the raw file becomes available, preserve it unchanged, compute SHA-256, compare it with the recorded value and stop if the values differ.

## 2. ControlNet Canny source correction

`06_CONTROLNET.md` previously states that Canny mode 1 uses external node 25 through selector 732. The input links stored in `HANSEN_WORKFLOW_SPEC.json` show a different route.

### Derived topology

- **Depth input 1:** `25 → 784 → 542`
- **Depth input 2:** `79 → 38 → 542`
- **Canny input 1:** `79 → 785 → 732`
- **Canny input 2:** `79 → 165 → 732`
- **Stack order:** `542 → 417 → 419 → 418`, with `732 → 419`

**CONFIRMED:** node 25 feeds resize 784 and selector 542. It does not feed selector 732 in the derived link topology.

**NOT CONFIRMED:** the historical wording “external Canny = node 25” should not be reused unless the immutable raw workflow is recovered and proves a different link arrangement.

## 3. Model README mismatch

An embedded workflow note referenced by the master architecture material says that a README contains the complete model list.

**CONFIRMED:** no workflow-specific README is present in the technical resource ZIP. The repository-level README documents the React application, not the complete ComfyUI model installation.

The replacement inventory is `18_WORKFLOW_MODEL_MANIFEST.md`. It lists filenames and serialized providers, but deliberately does not claim installed versions, availability, license acceptance or runtime compatibility.

## 4. Runtime and visual evidence

**CONFIRMED:** the graph topology reaches the active save `53 → 730` and preserves optional HQ/overlay routes.

**NOT CONFIRMED:** topology alone does not prove:

- successful execution on the current machine;
- installed model/custom-node availability;
- actual output resolution after third-party bypass semantics;
- visual presence of PEOPLE/PPL in a specific render;
- visual quality of masks, inpaint, detail transfer, upscale or overlays;
- meaning of the external receiver UUID serialized in node 779.

Illustrative images must not be presented as a same-run stage sequence unless input, seed, controls, model files and runtime metadata are verified together.

## 5. Current active/bypass wording

**CONFIRMED:** 227 nodes use `mode=0`; 25 nodes use `mode=4` in the derived specification.

`mode=0` does not always mean that a node affects the selected route. A selector may choose another input. Documentation must distinguish:

- active and selected;
- active but selected away;
- bypassed (`mode=4`);
- diagnostic-only preview/comparer;
- active save with bypassed upstream.

In particular, save nodes 531 and 293 are not themselves bypassed; their upstream processing through 833/848/849 is stored in mode 4.
