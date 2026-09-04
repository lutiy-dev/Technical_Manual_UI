# Workflow model and dependency manifest

> Source: bundled derived specification `HANSEN_WORKFLOW_SPEC.json`.
> This document records serialized filenames and providers. It does **not** prove that a file/package is currently installed or compatible.

## Model files

| LOADER NODE | SERIALIZED FILE / REPOSITORY | STAGE | CURRENT ROUTE STATUS | EVIDENCE |
|---|---|---|---|---|
| 2 | `RealVisXL_V4.0.safetensors` | Main SDXL checkpoint | active | CONFIRMED filename |
| 12 | `CLIP-ViT-H-14-laion2B-s32B-b79K.safetensors` | IPAdapter CLIP Vision | selected away | CONFIRMED filename |
| 13 | `ip-adapter-plus_sdxl_vit-h.safetensors` | SDXL IPAdapter | selected away; weight 721=0 | CONFIRMED filename |
| 21 | `diffusers_xl_depth_full.safetensors` | SDXL Depth ControlNet | active | CONFIRMED filename |
| 23 | `diffusers_xl_canny_full.safetensors` | SDXL Canny ControlNet | active | CONFIRMED filename |
| 38 | `depth_anything_v2_vitl.pth` | Depth preprocessor | available as selector input 2 | CONFIRMED filename |
| 54 | `ae.safetensors` | Main/PPL FLUX VAE | active | CONFIRMED filename |
| 107 | `sam2.1_hiera_base_plus.safetensors` | SAM2 single image | active | CONFIRMED filename |
| 112 | `gokaygokay/Florence-2-Flux-Large` | Florence2 caption/detection | active | CONFIRMED repository value |
| 153 | `4x-UltraSharp.pth` | Upscale model | upstream bypassed | CONFIRMED filename |
| 234 | `sam2.1_hiera_base_plus.safetensors` | SAM2 automask generator | diagnostic path | CONFIRMED filename |
| 466 | `t5-v1_1-xxl-encoder-Q8_0.gguf` + `clip_l.safetensors` | FLUX dual text encoder | active | CONFIRMED filenames |
| 467 | `flux1-dev-Q8_0.gguf` | Main/PPL FLUX UNet | active | CONFIRMED filename |

## LoRA and optional model patches

- **CONFIRMED:** node 87 stores `None` in all four LoRA slots.
- **CONFIRMED:** node 168 is `1` and selects the plain SDXL checkpoint model.
- **CONFIRMED:** node 721 is `0`, so the serialized IPAdapter weight is zero.
- **NOT CONFIRMED:** reference assets and adapter model availability on the active machine.

## Custom-node providers

| PROVIDER / PACKAGE | SIGNIFICANT NODES |
|---|---|
| `ComfyUI-GGUF` | 466, 467 |
| `ComfyUI-segment-anything-2` | 107, 114, 115, 232, 234, 584, 585 |
| `ComfyUI_Comfyroll_CustomNodes` | 168, 453, 459, 522, 535, 542, 552, 592, 630, 685, 695, 715, 732 |
| `cg-image-filter` | 779 |
| `comfyui-custom-scripts` | 158, 804, 832, 835, 841, 842, 843, 844, 846, 850 |
| `comfyui-easy-use` | 154, 420, 422, 565, 573, 702, 834 |
| `comfyui-florence2` | 112, 157, 550, 580 |
| `comfyui-kjnodes` | 456, 477, 541, 543, 693, 780, 781, 782, 783, 784, 785 |
| `ComfyUI-Logic` | 600, 602, 607, 608, 609, 717, 720, 721, 722, 723, 771, 887, 889, 890, 891, 892, 893 |
| `comfyui-post-processing-nodes` | 751 |
| `comfyui_controlnet_aux` | 38 |
| `comfyui_essentials` | 146, 337, 840, 845 |
| `comfyui_ipadapter_plus` | 7, 9, 13 |
| `ComfyUI_UltimateSDUpscale` | 833 |
| `efficiency-nodes-comfyui` | 417, 418, 419, 848, 849 |
| `masquerade-nodes-comfyui` | 429, 449, 499, 502, 503, 504, 505, 506, 509, 510, 747, 749, 754 |
| `rgthree-comfy` | 71, 72, 87, 141, 230, 231, 480, 518, 675 |
| `was-node-suite-comfyui` | 165, 293, 408, 475, 531, 591, 672, 684, 730 |

Core ComfyUI nodes are additionally used throughout the workflow.

## Compatibility status

- **CONFIRMED:** package identities are derived from serialized `cnr_id` values and node types.
- **CONFIRMED:** some node properties contain serialized versions/revisions.
- **NOT CONFIRMED:** the current machine's installed revision, Python version, Torch/CUDA combination, frontend compatibility, model license acceptance and runtime success.
- **CONFIRMED WARNING:** the upstream `theUpsider/ComfyUI-Logic` repository is archived/unmaintained and should be treated as a legacy dependency.

## Expected placement

Exact model directories can vary with the active ComfyUI installation and extra model paths. Do not publish an absolute path until the live ComfyUI root is verified.

Use the appropriate loader category inside the verified instance, then confirm that each loader resolves the exact serialized filename. This manifest intentionally avoids inventing a local root.
