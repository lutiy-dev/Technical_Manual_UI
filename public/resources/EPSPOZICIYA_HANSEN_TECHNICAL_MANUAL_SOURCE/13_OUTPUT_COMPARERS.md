# Outputs, comparers and selection

> Source: `Epspoziciya_archviz_ph_sdxlflux_v001.json` only. SHA-256 `ea48f7df4d6d9727d45cd6f6d2fb9b54df7bc1cba8a436e30a1400628475be4e`.  
> Status vocabulary: **CONFIRMED** = directly present in graph data/topology; **INFERRED** = purpose inferred from naming/topology; **NOT CONFIRMED** = runtime behavior cannot be proved from workflow JSON alone.


| NODE ID | TITLE | TYPE | CURRENT VALUE | MODE | UPSTREAM | DOWNSTREAM |
|---|---|---|---|---|---|---|
| 39 | PreviewImage | PreviewImage | [] | 0 | 38 | — |
| 71 | Image Comparer INPUT / SDXL | Image Comparer (rgthree) | [[{"name": "A", "selected": true, "url": "/api/view?filename=rgthree.compare._temp_yskra_00001_.png&type=temp&subfolder=&rand=0.4819337102859328"}, {"name": "B", "selected": true, "url": "/api/view?filename=rgthree.compare._temp_yskra_00002_.png&type=temp&subfolder=&rand=0.6409433261569788"}]] | 0 | 79, 779 | — |
| 72 | Image Comparer SDXL / FLUX | Image Comparer (rgthree) | [[{"name": "A", "selected": true, "url": "/api/view?filename=rgthree.compare._temp_jnuzl_00001_.png&type=temp&subfolder=&rand=0.11998567934868709"}, {"name": "B", "selected": true, "url": "/api/view?filename=rgthree.compare._temp_jnuzl_00002_.png&type=temp&subfolder=&rand=0.8975468557213796"}]] | 0 | 53, 779 | — |
| 113 | PreviewImage | PreviewImage | [] | 0 | 550 | — |
| 141 | Image Comparer FLUX / UPSCALE | Image Comparer (rgthree) | [[{"name": "A", "selected": true, "url": "/api/view?filename=rgthree.compare._temp_xigic_00001_.png&type=temp&subfolder=&rand=0.5372788916996013"}, {"name": "B", "selected": true, "url": "/api/view?filename=rgthree.compare._temp_xigic_00002_.png&type=temp&subfolder=&rand=0.5816535080414749"}]] | 0 | 53, 833 | — |
| 167 | PreviewImage | PreviewImage | [] | 0 | 165 | — |
| 233 | PreviewImage | PreviewImage | — | 0 | 232 | — |
| 340 | PreviewImage | PreviewImage | [] | 0 | 339 | — |
| 341 | PreviewImage | PreviewImage | [] | 0 | 346 | — |
| 342 | PreviewImage | PreviewImage | [] | 0 | 347 | — |
| 343 | PreviewImage | PreviewImage | [] | 0 | 350 | — |
| 344 | PreviewImage | PreviewImage | [] | 0 | 349 | — |
| 345 | PreviewImage | PreviewImage | [] | 0 | 348 | — |
| 351 | PreviewImage | PreviewImage | [] | 0 | 352 | — |
| 353 | PreviewImage | PreviewImage | [] | 0 | 354 | — |
| 409 | PreviewImage | PreviewImage | [] | 0 | 829 | — |
| 480 | Image Comparer MASK / PPL | Image Comparer (rgthree) | [[{"name": "A", "selected": true, "url": "/api/view?filename=rgthree.compare._temp_pgeto_00001_.png&type=temp&subfolder=&rand=0.18648701954397406"}, {"name": "B", "selected": true, "url": "/api/view?filename=rgthree.compare._temp_pgeto_00002_.png&type=temp&subfolder=&rand=0.7322682602647028"}]] | 0 | 451, 459 | — |
| 507 | PreviewImage | PreviewImage | — | 0 | 503 | — |
| 508 | PreviewImage | PreviewImage | — | 0 | 522 | — |
| 518 | Image Comparer (rgthree) | Image Comparer (rgthree) | [[{"name": "A", "selected": true, "url": "/api/view?filename=rgthree.compare._temp_eycyi_00003_.png&type=temp&subfolder=&rand=0.39525045304489703"}, {"name": "B", "selected": true, "url": "/api/view?filename=rgthree.compare._temp_eycyi_00004_.png&type=temp&subfolder=&rand=0.06984953832887009"}]] | 0 | 509, 552 | — |
| 581 | PreviewImage | PreviewImage | [] | 0 | 583 | — |
| 675 | Image Comparer (rgthree) | Image Comparer (rgthree) | [[{"name": "A", "selected": true, "url": "/api/view?filename=rgthree.compare._temp_cctzb_00001_.png&type=temp&subfolder=&rand=0.531000941703363"}, {"name": "B", "selected": true, "url": "/api/view?filename=rgthree.compare._temp_cctzb_00002_.png&type=temp&subfolder=&rand=0.30558231650208634"}]] | 0 | 25, 833 | — |
| 779 | Image Filter | Image Filter | [60, "send none", "bfec27b9-f191-454b-ba4f-14c782302bb8", "", "", "", "", 0, "", 1, ""] | 0 | 565 | 232, 477, 157, 429, 71, 72, 509 |
| 730 | Image Save LQ | Image Save | ["ph\\[time(%Y-%m-%d)]", "ph01_archviz_sdxl2flux_LQ1", "_", 4, "false", "jpg", 72, 100, "true", "false", "false", "false", "true", "false", "false"] | 0 | 53 | — |
| 531 | Image Save HQ | Image Save | ["ph\\[time(%Y-%m-%d)]", "ph01_archviz_sdxl2flux_HQ", "_", 4, "false", "png", 300, 100, "true", "false", "false", "false", "true", "true", "false"] | 0 | 833 | — |
| 293 | Image Save LQ | Image Save | ["ph\\[time(%Y-%m-%d)]", "ph01_archviz_sdxl2flux_LQ2", "_", 4, "false", "jpg", 72, 100, "true", "false", "false", "false", "true", "false", "false"] | 0 | 849 | — |
| 15 | Preview FINAL IMAGE | PreviewImage | — | 0 | 849 | — |

- **CONFIRMED:** Image Filter node 779 uses timeout 60 and `send none`; it fans the selected image into preview/caption/composite paths. External send target UUID is serialized, but its receiver semantics are **NOT CONFIRMED**.
- **CONFIRMED:** comparers cover INPUT/SDXL (71), SDXL/FLUX (72), FLUX/UPSCALE (141), MASK/PPL (480), plus unnamed diagnostic comparers 518/675.
- **CONFIRMED:** LQ save 730 writes FLUX decode as JPG prefix `ph01_archviz_sdxl2flux_LQ1`; HQ 531 writes upscale output as PNG prefix `..._HQ`; LQ 293 writes final logo-overlay output as JPG prefix `..._LQ2`; preview 15 shows the final overlay chain.
