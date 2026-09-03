# Masks and segmentation

> Source: `Epspoziciya_archviz_ph_sdxlflux_v001.json` only. SHA-256 `ea48f7df4d6d9727d45cd6f6d2fb9b54df7bc1cba8a436e30a1400628475be4e`.  
> Status vocabulary: **CONFIRMED** = directly present in graph data/topology; **INFERRED** = purpose inferred from naming/topology; **NOT CONFIRMED** = runtime behavior cannot be proved from workflow JSON alone.


| NODE ID | TITLE | TYPE | CURRENT VALUE | MODE | UPSTREAM | DOWNSTREAM |
|---|---|---|---|---|---|---|
| 337 | MaskFromRGBCMYBW+ | MaskFromRGBCMYBW+ | [0.3, 0.3, 0.3] | 0 | 338 | 339, 346, 347, 348, 349, 350, 352, 354 |
| 339 | MaskToImage | MaskToImage | — | 0 | 337 | 340 |
| 346 | MaskToImage | MaskToImage | — | 0 | 337 | 341 |
| 347 | MaskToImage | MaskToImage | — | 0 | 337 | 342 |
| 348 | MaskToImage | MaskToImage | — | 0 | 337 | 345 |
| 349 | MaskToImage | MaskToImage | — | 0 | 337 | 344 |
| 350 | MaskToImage | MaskToImage | — | 0 | 337 | 343 |
| 352 | MaskToImage | MaskToImage | — | 0 | 337 | 351 |
| 354 | MaskToImage | MaskToImage | — | 0 | 337 | 353 |
| 550 | Florence2Run | Florence2Run | ["people, human, face, hand, feet, shoe, leg, bag, backpack, pet, dog, cat, gun, animal", "caption_to_phrase_grounding", true, false, 1024, 3, true, "", 620874360642543, "randomize"] | 0 | 112, 780 | 113, 114 |
| 114 | Florence2toCoordinates | Florence2toCoordinates | ["", false] | 0 | 550 | 115 |
| 115 | Sam2Segmentation | Sam2Segmentation | [true, true] | 0 | 107, 114, 780 | 144, 524 |
| 144 | GrowMask | GrowMask | [5, true] | 0 | 115 | 146 |
| 146 | MaskBlur+ | MaskBlur+ | [10, "auto"] | 0 | 144 | 420, 500 |
| 420 | easy imageCropFromMask | easy imageCropFromMask | [1, 1, 1] | 0 | 146, 780 | 781 |
| 422 | easy imageRemBg | easy imageRemBg | ["Inspyrenet", "Save", "ph_ppl", true, "none", false] | 0 | 781 | 430, 475 |
| 430 | MaskToImage | MaskToImage | — | 0 | 422 | 747, 751, 449 |
| 449 | Cut By Mask | Cut By Mask | [0, 0] | 0 | 477, 430 | 429 |
| 451 | MaskToImage | MaskToImage | — | 0 | 79 | 429, 480, 749 |
| 499 | Separate Mask Components | Separate Mask Components | — | 0 | 500 | 502, 503, 504, 509 |
| 500 | MaskToImage | MaskToImage | — | 0 | 146 | 499 |
| 502 | Mask To Region | Mask To Region | [150, "keep_ratio", 2, 2, 512, 512, "match_ratio"] | 0 | 499 | 503, 504, 509 |
| 503 | Cut By Mask | Cut By Mask | [1920, 1920] | 0 | 502, 499, 552 | 506, 507 |
| 504 | Cut By Mask | Cut By Mask | [1920, 1920] | 0 | 499, 502 | 505, 510, 522 |
| 505 | Image To Mask | Image To Mask | ["intensity"] | 0 | 504 | 494 |
| 510 | Combine Masks | Combine Masks | ["multiply_alpha", "yes", "no"] | 0 | 496, 504 | 509 |
| 583 | MaskToImage | MaskToImage | — | 0 | 585 | 581, 749 |
| 580 | Florence2Run | Florence2Run | ["house, building, facade", "caption_to_phrase_grounding", true, false, 1024, 12, true, "", 840615926744886, "randomize"] | 0 | 112, 591, 592 | 584 |
| 584 | Florence2toCoordinates | Florence2toCoordinates | ["", true] | 0 | 580 | 585 |
| 585 | Sam2Segmentation | Sam2Segmentation | [true, false] | 0 | 584, 107, 592 | 583, 775 |
| 747 | Cut By Mask | Cut By Mask | [0, 0] | 0 | 430, 751 | 749 |
| 749 | Paste By Mask | Paste By Mask | ["keep_ratio_fit"] | 0 | 583, 747, 451 | 754 |
| 754 | Image To Mask | Image To Mask | ["intensity"] | 0 | 749 | 573, 565, 834 |
| 775 | ImageCompositeMasked | ImageCompositeMasked | [0, 0, false] | 0 | 585, 776, 592 | 573, 834 |

- **CONFIRMED:** node 337 splits RGB/CMY/B/W masks from node 338; MaskToImage nodes expose mask previews/consumers.
- **CONFIRMED:** people masks originate from Florence2 550 → coordinates 114 → SAM2 115 → grow 144 → blur 146. Cut/Paste nodes 449/429 perform the first composite; 499–510 separate components and perform inpaint composite.
- **CONFIRMED:** architectural detail mask originates from prompt 591 → Florence2 580 → coordinates 584 → SAM2 585. Node 775 composites the selected base/source using this mask; nodes 747/749 plus 754 produce conservation masks.
- **NOT CONFIRMED:** no explicit `InvertMask` node is active in this graph; inversion inside third-party node implementations cannot be established from JSON.
