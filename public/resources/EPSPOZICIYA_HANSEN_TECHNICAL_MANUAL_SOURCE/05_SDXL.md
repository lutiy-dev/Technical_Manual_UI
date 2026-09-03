# SDXL stage

> Source: `Epspoziciya_archviz_ph_sdxlflux_v001.json` only. SHA-256 `ea48f7df4d6d9727d45cd6f6d2fb9b54df7bc1cba8a436e30a1400628475be4e`.  
> Status vocabulary: **CONFIRMED** = directly present in graph data/topology; **INFERRED** = purpose inferred from naming/topology; **NOT CONFIRMED** = runtime behavior cannot be proved from workflow JSON alone.


| NODE ID | TITLE | TYPE | CURRENT VALUE | MODE | UPSTREAM | DOWNSTREAM |
|---|---|---|---|---|---|---|
| 2 | Load SDXL Checkpoint | CheckpointLoaderSimple | ["RealVisXL_V4.0.safetensors"] | 0 | — | 6, 7, 86, 14, 168, 536 |
| 86 | CLIPSetLastLayer | CLIPSetLastLayer | [-1] | 0 | 2 | 87 |
| 87 | Lora Loader Stack (rgthree) | Lora Loader Stack (rgthree) | ["None", 0.5, "None", 1, "None", 1, "None", 1] | 0 | 86, 168 | 1, 5 |
| 7 | IPAdapterAdvanced | IPAdapterAdvanced | [1, "style transfer", "concat", 0, 1, "V only"] | 0 | 9, 12, 13, 2, 721 | 168 |
| 168 | 1=SDXL/ 2=SDXL+IPA | CR Model Input Switch | [1] | 0 | 7, 2 | 87 |
| 5 | SDXL Prompt POSITIVE | CLIPTextEncode | ["masterpiece architecture photography of a black tinyhouse made entirely of straight vertical (black:1.5) woodplanks, the house has a glass facade on the right side with a glass parapet infront and a low horizontal window on the left side, a completely closed basement level, surrounded by a dense dark mystic forest of detailed old lush pine trees, dense wafts of fog surrounding the scene, moss, fern, mushrooms, vignette, low key photography"] | 0 | 87, 897 | 418 |
| 6 | SDXL Prompt NEGATIVE | CLIPTextEncode | ["(hands), text, error, cropped, (worst quality:1.2), (low quality:1.2), normal quality, (jpeg artifacts:1.3), signature, watermark, username, blurry, anime, cartoon, cgi, painting, sketch (copyright:1.2), "] | 0 | 2, 814 | 418 |
| 417 | Control Net Stacker DEPTH | Control Net Stacker | [0.39, 0, 1] | 0 | 21, 542, 723 | 419 |
| 419 | Control Net Stacker CANNY | Control Net Stacker | [1, 0, 1] | 0 | 23, 417, 722, 732 | 418 |
| 418 | Apply ControlNet Stack | Apply ControlNet Stack | — | 0 | 6, 5, 419 | 1, 1 |
| 3 | # PREVIEWS (ONLY IF GENERATION=1) | EmptyLatentImage | [512, 512, 4] | 0 | 783, 783 | 535 |
| 536 | VAEEncode | VAEEncode | — | 0 | 592, 2 | 535 |
| 535 | CR Latent Input Switch | CR Latent Input Switch | [1] | 0 | 3, 536, 541 | 1 |
| 230 | SDXL Config | KSampler Config (rgthree) | [28, 1, 3.4000000000000004, "dpmpp_3m_sde_gpu", "karras"] | 0 | — | 1, 1, 1, 1 |
| 231 | GLOBAL Seed | Seed (rgthree) | [1097719867246391, null, null, null] | 0 | — | 1, 61 |
| 600 | If ANY return A else B-🔬 | If ANY return A else B-🔬 | — | 0 | 602, 608, 607 | 1 |
| 1 | KSampler | KSampler | [269307996847904, "randomize", 25, 2.6, "dpmpp_2m_sde", "karras", 1] | 0 | 87, 230, 231, 230, 230, 230, 418, 418, 535, 600 | 14 |
| 14 | VAEDecode | VAEDecode | — | 0 | 2, 1 | 565, 715 |

- **CONFIRMED:** checkpoint `RealVisXL_V4.0.safetensors`; CLIP last layer `-1`; LoRA stack is `None` in all four slots.
- **CONFIRMED:** KSampler parameters come from node 230: steps 28, refiner step 1 (unused here), CFG 3.4, `dpmpp_3m_sde_gpu`, `karras`; seed node 231 = 1097719867246391 with UI randomization policy.
- **CONFIRMED:** current master mode makes latent node 3 at resized width/height, batch 4, and denoise 1.0. Mode 2 would encode node 592 image via node 536 and use node 608 = 0.3.
- **CONFIRMED:** VAE is checkpoint VAE output from node 2; decode node 14 feeds detail/PPL route. Runtime device/dtype and generated pixels are **NOT CONFIRMED**.
