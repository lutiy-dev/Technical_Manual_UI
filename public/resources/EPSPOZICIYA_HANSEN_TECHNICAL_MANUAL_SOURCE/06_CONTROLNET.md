# ControlNet

> Source: `Epspoziciya_archviz_ph_sdxlflux_v001.json` only. SHA-256 `ea48f7df4d6d9727d45cd6f6d2fb9b54df7bc1cba8a436e30a1400628475be4e`.  
> Status vocabulary: **CONFIRMED** = directly present in graph data/topology; **INFERRED** = purpose inferred from naming/topology; **NOT CONFIRMED** = runtime behavior cannot be proved from workflow JSON alone.


| NODE ID | TITLE | TYPE | CURRENT VALUE | MODE | UPSTREAM | DOWNSTREAM |
|---|---|---|---|---|---|---|
| 21 | Load SDXL DEPTH-ControlNet Model | ControlNetLoader | ["diffusers_xl_depth_full.safetensors"] | 0 | — | 417 |
| 23 | Load SDXL CANNY-ControlNet Model | ControlNetLoader | ["diffusers_xl_canny_full.safetensors"] | 0 | — | 419 |
| 25 | LoadImage | LoadImage | ["V_1_d.jpg", "image"] | 0 | — | 784, 675 |
| 38 | DepthAnythingV2Preprocessor | DepthAnythingV2Preprocessor | ["depth_anything_v2_vitl.pth", 1536] | 0 | 79 | 39, 542 |
| 165 | Image Edge Detection Filter | Image Edge Detection Filter | ["normal"] | 0 | 79 | 167, 732 |
| 456 | SWITCH CNET: 1=EXTRA / 2=PREPROCESS | INTConstant | [1] | 0 | — | 542, 732 |
| 542 | CR Image Input Switch | CR Image Input Switch | [1] | 0 | 456, 784, 38 | 417 |
| 732 | CR Image Input Switch | CR Image Input Switch | [1] | 0 | 456, 785, 165 | 419 |
| 723 | ControlNet STRENGTH DEPTH | Float-🔬 | [0.36] | 0 | — | 417 |
| 722 | ControlNet STRENGTH CANNY | Float-🔬 | [0.31] | 0 | — | 419 |
| 417 | Control Net Stacker DEPTH | Control Net Stacker | [0.39, 0, 1] | 0 | 21, 542, 723 | 419 |
| 419 | Control Net Stacker CANNY | Control Net Stacker | [1, 0, 1] | 0 | 23, 417, 722, 732 | 418 |
| 418 | Apply ControlNet Stack | Apply ControlNet Stack | — | 0 | 6, 5, 419 | 1, 1 |

- **CONFIRMED:** Depth model `diffusers_xl_depth_full.safetensors`; generated depth uses DepthAnythingV2 ViT-L at 1536. Node 456=1 selects external node 25 through node 542. Strength 0.36, start 0, end 1.
- **CONFIRMED:** Canny model `diffusers_xl_canny_full.safetensors`; generated map uses Image Edge Detection Filter node 165 (`normal`). Node 456=1 selects external node 25 through node 732. Strength 0.31, start 0, end 1.
- **CONFIRMED:** stack order is Depth 417 then Canny 419, applied to positive/negative SDXL conditioning by 418.
