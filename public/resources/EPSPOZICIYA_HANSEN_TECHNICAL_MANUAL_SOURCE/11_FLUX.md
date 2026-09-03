# FLUX stage

> Source: `Epspoziciya_archviz_ph_sdxlflux_v001.json` only. SHA-256 `ea48f7df4d6d9727d45cd6f6d2fb9b54df7bc1cba8a436e30a1400628475be4e`.  
> Status vocabulary: **CONFIRMED** = directly present in graph data/topology; **INFERRED** = purpose inferred from naming/topology; **NOT CONFIRMED** = runtime behavior cannot be proved from workflow JSON alone.


| NODE ID | TITLE | TYPE | CURRENT VALUE | MODE | UPSTREAM | DOWNSTREAM |
|---|---|---|---|---|---|---|
| 467 | UnetLoaderGGUF | UnetLoaderGGUF | ["flux1-dev-Q8_0.gguf"] | 0 | — | 64, 826 |
| 466 | DualCLIPLoaderGGUF | DualCLIPLoaderGGUF | ["t5-v1_1-xxl-encoder-Q8_0.gguf", "clip_l.safetensors", "flux"] | 0 | — | 52, 138, 516, 811, 831 |
| 64 | ModelSamplingFlux | ModelSamplingFlux | [1.15, 0.5, 1168, 1680] | 0 | 467, 783, 783 | 59, 60, 498, 497, 819, 833 |
| 54 | Load FLUX VAE | VAELoader | ["ae.safetensors"] | 0 | — | 53, 67, 496, 494, 829, 833 |
| 453 | SWITCH 1=GLOBAL Prompt / 2= Florence2 | CR Conditioning Input Switch | [1] | 0 | 52, 811 | 62, 833 |
| 811 | CLIPTextEncode | CLIPTextEncode | [""] | 0 | 466, 897 | 453 |
| 52 | FLUX Prompt POSITIVE (Florence2) | CLIPTextEncode | ["masterpiece architecture photography of a black tinyhouse made entirely of (black wood:1.5) planks in a dense forest of detailed old pine trees close to a beautiful lake with crystalclear water on a sunny day with warm sunlight"] | 0 | 466, 158 | 453 |
| 138 | FLUX Prompt NEGATIVE | CLIPTextEncode | [""] | 0 | 466 | 494, 833 |
| 62 | FluxGuidance | FluxGuidance | [2.4000000000000004] | 0 | 453 | 60 |
| 58 | KSamplerSelect | KSamplerSelect | ["euler"] | 0 | — | 57, 495, 828 |
| 59 | BasicScheduler | BasicScheduler | ["beta", 4, 0.18] | 0 | 64, 771 | 57 |
| 61 | RandomNoise | RandomNoise | [890292281185527, "randomize"] | 0 | 231 | 57, 495, 828 |
| 67 | VAEEncode | VAEEncode | — | 0 | 54, 573 | 57 |
| 57 | SamplerCustomAdvanced | SamplerCustomAdvanced | — | 0 | 61, 60, 58, 59, 67 | 53 |
| 53 | VAEDecode | VAEDecode | — | 0 | 57, 54 | 141, 72, 730, 834, 888 |
| 231 | GLOBAL Seed | Seed (rgthree) | [1097719867246391, null, null, null] | 0 | — | 1, 61 |
| 771 | Steps | Int-🔬 | [24] | 0 | — | 59, 498, 819, 833 |

- **CONFIRMED:** model `flux1-dev-Q8_0.gguf`; encoders `t5-v1_1-xxl-encoder-Q8_0.gguf` + `clip_l.safetensors`; VAE `ae.safetensors`.
- **CONFIRMED:** ModelSamplingFlux max shift 1.15, base shift 0.5, dimensions linked from resized BASE IMAGE. Guidance 2.4; sampler `euler`; scheduler `beta`; steps linked from node 771 = 24; denoise 0.18; seed from node 231.
- **CONFIRMED:** latent/image source is node 573 → VAEEncode 67. Current conditioning is GLOBAL node 811 selected by 453; negative node 138 is empty and is not consumed by BasicGuider 60.
