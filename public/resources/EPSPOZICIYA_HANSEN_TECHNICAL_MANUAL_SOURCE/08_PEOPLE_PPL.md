# PEOPLE / PPL route

> Source: `Epspoziciya_archviz_ph_sdxlflux_v001.json` only. SHA-256 `ea48f7df4d6d9727d45cd6f6d2fb9b54df7bc1cba8a436e30a1400628475be4e`.  
> Status vocabulary: **CONFIRMED** = directly present in graph data/topology; **INFERRED** = purpose inferred from naming/topology; **NOT CONFIRMED** = runtime behavior cannot be proved from workflow JSON alone.


## Generation → segmentation → mask → composite → main image → final

**CONFIRMED:** PPL FLUX text 825+408+799+800+822 → encoder 831 → guidance 830 → sampler 828 → decode 829. Node 543=1 drives selectors 552/522/459/715 to their FLUX inputs. Florence2 550 detects people on resized main image, SAM2 115 creates the crop mask, node 420 crops, color match 477 and background removal 422 prepare the generated person, then 449/429 paste it into the main image. A second inpaint/detail route uses 499–510 and returns through 509. Node 459 returns the PPL result into detail-transfer node 573 and FLUX VAE encode node 67. The resulting FLUX decode node 53 reaches upscale and all final outputs.

| NODE ID | TITLE | TYPE | CURRENT VALUE | MODE | UPSTREAM | DOWNSTREAM |
|---|---|---|---|---|---|---|
| 408 | PROMPT PPL FLUX | Text Multiline | ["a few Middle Eastern townspeople wearing long beige robes and simple head coverings, naturally walking and standing in an old stone city square, realistic proportions, small and medium scale figures, candid documentary look, visually integrated into the scene, warm evening light"] | 0 | — | 823 |
| 825 | PrimitiveStringMultiline | PrimitiveStringMultiline | ["fullbody portrait photo of "] | 0 | — | 823 |
| 823 | StringConcatenate | StringConcatenate | ["", "", ""] | 0 | 825, 408 | 824 |
| 824 | StringConcatenate | StringConcatenate | ["", "", ""] | 0 | 823, 799 | 820 |
| 820 | StringConcatenate | StringConcatenate | ["", "", ", "] | 0 | 824, 821 | 831 |
| 831 | CLIPTextEncode | CLIPTextEncode | [""] | 0 | 820, 466 | 830 |
| 830 | FluxGuidance | FluxGuidance | [2.1] | 0 | 831 | 826 |
| 819 | BasicScheduler | BasicScheduler | ["beta", 4, 1] | 0 | 64, 771 | 828 |
| 828 | SamplerCustomAdvanced | SamplerCustomAdvanced | — | 0 | 826, 819, 827, 61, 58 | 829 |
| 829 | VAEDecode | VAEDecode | — | 0 | 828, 54 | 409, 552 |
| 543 | SWITCH PPL: 1=FLUX / 2=INPUT | INTConstant | [1] | 0 | — | 459, 522, 552, 715 |
| 552 | People Input Switch 1=FLUX / 2=3D rendered | CR Image Input Switch | [1] | 0 | 543, 715, 829 | 503, 518, 780 |
| 550 | Florence2Run | Florence2Run | ["people, human, face, hand, feet, shoe, leg, bag, backpack, pet, dog, cat, gun, animal", "caption_to_phrase_grounding", true, false, 1024, 3, true, "", 620874360642543, "randomize"] | 0 | 112, 780 | 113, 114 |
| 114 | Florence2toCoordinates | Florence2toCoordinates | ["", false] | 0 | 550 | 115 |
| 115 | Sam2Segmentation | Sam2Segmentation | [true, true] | 0 | 107, 114, 780 | 144, 524 |
| 420 | easy imageCropFromMask | easy imageCropFromMask | [1, 1, 1] | 0 | 146, 780 | 781 |
| 477 | ColorMatch | ColorMatch | ["hm-mvgd-hm", 0.6, true] | 0 | 475, 717, 779 | 449 |
| 422 | easy imageRemBg | easy imageRemBg | ["Inspyrenet", "Save", "ph_ppl", true, "none", false] | 0 | 781 | 430, 475 |
| 449 | Cut By Mask | Cut By Mask | [0, 0] | 0 | 477, 430 | 429 |
| 429 | Paste By Mask | Paste By Mask | ["keep_ratio_fit"] | 0 | 451, 449, 779 | 672 |
| 522 | People Input Switch 1=FLUX / 2=3D rendered | CR Image Input Switch | [1] | 0 | 504, 524, 543 | 508 |
| 494 | InpaintModelConditioning | InpaintModelConditioning | [true] | 0 | 54, 505, 506, 138, 516 | 495, 497 |
| 495 | SamplerCustomAdvanced | SamplerCustomAdvanced | — | 0 | 497, 498, 494, 61, 58 | 496 |
| 496 | VAEDecode | VAEDecode | — | 0 | 495, 54 | 510 |
| 499 | Separate Mask Components | Separate Mask Components | — | 0 | 500 | 502, 503, 504, 509 |
| 502 | Mask To Region | Mask To Region | [150, "keep_ratio", 2, 2, 512, 512, "match_ratio"] | 0 | 499 | 503, 504, 509 |
| 503 | Cut By Mask | Cut By Mask | [1920, 1920] | 0 | 502, 499, 552 | 506, 507 |
| 504 | Cut By Mask | Cut By Mask | [1920, 1920] | 0 | 499, 502 | 505, 510, 522 |
| 509 | Paste By Mask | Paste By Mask | ["keep_ratio_fill"] | 0 | 510, 502, 499, 779 | 518, 684 |
| 459 | PPL Switch 1=FLUX / 2=3D | CR Image Input Switch | [1] | 0 | 543, 672, 685 | 480, 573 |
| 573 | easy imageDetailTransfer | easy imageDetailTransfer | ["add", 0.5, 1, "Hide", "ComfyUI"] | 0 | 459, 720, 775, 754 | 67 |
| 67 | VAEEncode | VAEEncode | — | 0 | 54, 573 | 57 |
| 57 | SamplerCustomAdvanced | SamplerCustomAdvanced | — | 0 | 61, 60, 58, 59, 67 | 53 |
| 53 | VAEDecode | VAEDecode | — | 0 | 57, 54 | 141, 72, 730, 834, 888 |
| 715 | People Input Switch 1=FLUX / 2=3D rendered | CR Image Input Switch | [2] | 0 | 79, 14, 543 | 552 |

- **PEOPLE FINAL COMPOSITE SELECTOR:** **CONFIRMED**, node 715; widget value `2`, but linked `Input` from node 543 currently supplies `1`, so effective current value is `1` (FLUX input node 829).
- **CURRENT PEOPLE ROUTE REACHES FINAL:** **YES — CONFIRMED by graph topology.** PPL composite returns through node 459 → 573 → 67 → 57 → 53 → 833 → 848/849 → 15/293, and node 53 also saves at 730.
- **NOT CONFIRMED:** successful runtime segmentation, mask quality and actual visible people require execution evidence.
