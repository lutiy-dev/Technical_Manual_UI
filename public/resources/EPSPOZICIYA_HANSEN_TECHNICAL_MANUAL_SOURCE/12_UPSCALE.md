# Upscale

> Source: `Epspoziciya_archviz_ph_sdxlflux_v001.json` only. SHA-256 `ea48f7df4d6d9727d45cd6f6d2fb9b54df7bc1cba8a436e30a1400628475be4e`.  
> Status vocabulary: **CONFIRMED** = directly present in graph data/topology; **INFERRED** = purpose inferred from naming/topology; **NOT CONFIRMED** = runtime behavior cannot be proved from workflow JSON alone.


| NODE ID | TITLE | TYPE | CURRENT VALUE | MODE | UPSTREAM | DOWNSTREAM |
|---|---|---|---|---|---|---|
| 153 | UpscaleModelLoader | UpscaleModelLoader | ["4x-UltraSharp.pth"] | 0 | — | 833 |
| 154 | UPSCALE BY FACTOR | easy float | [3] | 0 | — | 832, 833, 835 |
| 771 | Steps | Int-🔬 | [24] | 0 | — | 59, 498, 819, 833 |
| 833 | UltimateSDUpscale | UltimateSDUpscale | [2, 383593259663317, "randomize", 4, 1, "euler", "beta", 0.22, "Linear", 1024, 1024, 16, 32, "None", 0.25, 64, 16, 16, true, false, 1] | 4 | 834, 832, 835, 154, 64, 453, 138, 54, 153, 771 | 141, 531, 675, 848, 851 |
| 834 | easy imageDetailTransfer | easy imageDetailTransfer | ["add", 0.5, 0.15, "Hide", "ComfyUI"] | 4 | 53, 775, 754 | 833 |
| 832 | tile height (Math Expression 🐍) | MathExpression\|pysssss | ["a * b / 2 + 32"] | 4 | 154, 890 | 833 |
| 835 | tile height (Math Expression 🐍) | MathExpression\|pysssss | ["a * b / 2 + 32"] | 4 | 154, 893 | 833 |
| 840 | ImageResize+ | ImageResize+ | [0, 0, "lanczos", "keep proportion", "always", 8] | 4 | 850, 309 | 841, 842, 849 |
| 845 | ImageResize+ | ImageResize+ | [0, 0, "lanczos", "keep proportion", "always", 8] | 4 | 846, 301 | 844, 848 |
| 848 | Image Overlay | Image Overlay | ["Resize by rescale_factor", "nearest-exact", 1, 1024, 1024, 0, 300, 0, 0] | 4 | 845, 843, 844, 833, 301 | 849 |
| 849 | Image Overlay | Image Overlay | ["Resize by rescale_factor", "nearest-exact", 1, 1024, 1024, 0, 0, 0, 0] | 4 | 848, 840, 841, 842, 309 | 15, 293 |

- **CONFIRMED:** upscale model `4x-UltraSharp.pth`; user factor node 154 = 3.
- **CONFIRMED:** Ultimate SD Upscale node 833 is bypassed (`mode=4`). Stored settings: upscale factor 2, steps 4, CFG 1, `euler`, `beta`, denoise 0.22, mode `Linear`, tile 1024×1024, padding 16, mask blur 32, seam fix `None`, seam denoise 0.25, seam width 64, seam padding 16, seam mask blur 16.
- **CONFIRMED:** associated sizing/overlay nodes 832–851 are also bypassed. **INFERRED:** current graph therefore does not perform this upscale section; output resolution follows the upstream FLUX decode unless bypass handling of a third-party node differs. Runtime resolution is **NOT CONFIRMED**.
