# Detail conservation

> Source: `Epspoziciya_archviz_ph_sdxlflux_v001.json` only. SHA-256 `ea48f7df4d6d9727d45cd6f6d2fb9b54df7bc1cba8a436e30a1400628475be4e`.  
> Status vocabulary: **CONFIRMED** = directly present in graph data/topology; **INFERRED** = purpose inferred from naming/topology; **NOT CONFIRMED** = runtime behavior cannot be proved from workflow JSON alone.


| NODE ID | TITLE | TYPE | CURRENT VALUE | MODE | UPSTREAM | DOWNSTREAM |
|---|---|---|---|---|---|---|
| 565 | easy imageDetailTransfer | easy imageDetailTransfer | ["add", 0.5, 0.54, "Hide", "ComfyUI"] | 0 | 14, 720, 592, 754 | 779 |
| 573 | easy imageDetailTransfer | easy imageDetailTransfer | ["add", 0.5, 1, "Hide", "ComfyUI"] | 0 | 459, 720, 775, 754 | 67 |
| 720 | STAGE 1 & 2 STRENGTH | Float-🔬 | [0.09] | 0 | — | 565, 573 |
| 580 | Florence2Run | Florence2Run | ["house, building, facade", "caption_to_phrase_grounding", true, false, 1024, 12, true, "", 840615926744886, "randomize"] | 0 | 112, 591, 592 | 584 |
| 584 | Florence2toCoordinates | Florence2toCoordinates | ["", true] | 0 | 580 | 585 |
| 585 | Sam2Segmentation | Sam2Segmentation | [true, false] | 0 | 584, 107, 592 | 583, 775 |
| 775 | ImageCompositeMasked | ImageCompositeMasked | [0, 0, false] | 0 | 585, 776, 592 | 573, 834 |
| 747 | Cut By Mask | Cut By Mask | [0, 0] | 0 | 430, 751 | 749 |
| 749 | Paste By Mask | Paste By Mask | ["keep_ratio_fit"] | 0 | 583, 747, 451 | 754 |
| 751 | ColorCorrect | ColorCorrect | [-100, -90, -100, -100, -100, 0.2] | 0 | 430 | 747 |
| 754 | Image To Mask | Image To Mask | ["intensity"] | 0 | 749 | 573, 565, 834 |
| 834 | easy imageDetailTransfer | easy imageDetailTransfer | ["add", 0.5, 0.15, "Hide", "ComfyUI"] | 4 | 53, 775, 754 | 833 |

- **CONFIRMED:** node 565 target = SDXL decode 14, source = selected base image 592, mask = node 754; mode `add`, blur 0.5, effective blend linked from node 720 = 0.09.
- **CONFIRMED:** node 573 target = selected PPL/main image 459, source = detail composite 775, mask = node 754; same effective blend 0.09. Its output is encoded for main FLUX stage.
- **CONFIRMED:** node 834 is an upscale detail-transfer node (`add`, stored blend 0.15) but is bypassed (`mode=4`), so current runtime passes through per ComfyUI bypass semantics.
- **INFERRED:** the mask identifies building detail to preserve; actual visual effect is **NOT CONFIRMED** without runtime images.
