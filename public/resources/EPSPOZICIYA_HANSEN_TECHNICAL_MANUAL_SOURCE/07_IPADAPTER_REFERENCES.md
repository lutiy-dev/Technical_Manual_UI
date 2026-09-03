# IPAdapter references

> Source: `Epspoziciya_archviz_ph_sdxlflux_v001.json` only. SHA-256 `ea48f7df4d6d9727d45cd6f6d2fb9b54df7bc1cba8a436e30a1400628475be4e`.  
> Status vocabulary: **CONFIRMED** = directly present in graph data/topology; **INFERRED** = purpose inferred from naming/topology; **NOT CONFIRMED** = runtime behavior cannot be proved from workflow JSON alone.


| NODE ID | TITLE | TYPE | CURRENT VALUE | MODE | UPSTREAM | DOWNSTREAM |
|---|---|---|---|---|---|---|
| 41 | LoadImage | LoadImage | ["d40595bb-7497-4dd4-a433-c1d58c335220.jfif", "image"] | 0 | — | 793 |
| 42 | LoadImage | LoadImage | ["d40595bb-7497-4dd4-a433-c1d58c335220.jfif", "image"] | 0 | — | 630, 793 |
| 793 | IPAdapter Batch Images | BatchImagesNode | — | 0 | 42, 41 | 630 |
| 630 | IPA-INPUT IMG: 1=FIRST/ 2=BOTH | CR Image Input Switch | [1] | 0 | 42, 793 | 9 |
| 9 | IPAdapter Prep Img ClipVis | PrepImageForClipVision | ["LANCZOS", "center", 0] | 0 | 630 | 7 |
| 12 | Load SDXL CLIP Vision | CLIPVisionLoader | ["CLIP-ViT-H-14-laion2B-s32B-b79K.safetensors"] | 0 | — | 7 |
| 13 | Load SDXL IPAdapter Model | IPAdapterModelLoader | ["ip-adapter-plus_sdxl_vit-h.safetensors"] | 0 | — | 7 |
| 721 | IPADAPTER WEIGHT (strenght) | Float-🔬 | [0] | 0 | — | 7 |
| 7 | IPAdapterAdvanced | IPAdapterAdvanced | [1, "style transfer", "concat", 0, 1, "V only"] | 0 | 9, 12, 13, 2, 721 | 168 |
| 168 | 1=SDXL/ 2=SDXL+IPA | CR Model Input Switch | [1] | 0 | 7, 2 | 87 |

- **CONFIRMED:** CLIP Vision `CLIP-ViT-H-14-laion2B-s32B-b79K.safetensors`; IPAdapter `ip-adapter-plus_sdxl_vit-h.safetensors`; prep uses LANCZOS/center.
- **CONFIRMED:** node 630=1 selects first reference (node 42); mode 2 selects batch of nodes 42+41. Adapter mode is `style transfer`, `concat`, start 0, end 1, `V only`.
- **CONFIRMED:** node 721 weight is 0 and node 168 selects plain SDXL model input 1, so IPAdapter does not affect current SDXL sampling.
