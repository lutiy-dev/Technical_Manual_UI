# Compatibility and custom nodes

> Source: `Epspoziciya_archviz_ph_sdxlflux_v001.json` only. SHA-256 `ea48f7df4d6d9727d45cd6f6d2fb9b54df7bc1cba8a436e30a1400628475be4e`.  
> Status vocabulary: **CONFIRMED** = directly present in graph data/topology; **INFERRED** = purpose inferred from naming/topology; **NOT CONFIRMED** = runtime behavior cannot be proved from workflow JSON alone.


- **CONFIRMED:** `ComfyUI-GGUF` — nodes 466, 467.
- **CONFIRMED:** `ComfyUI-segment-anything-2` — nodes 107, 114, 115, 232, 234, 584, 585.
- **CONFIRMED:** `ComfyUI_Comfyroll_CustomNodes` — nodes 168, 453, 459, 522, 535, 542, 552, 592, 630, 685, 695, 715, 732.
- **CONFIRMED:** `cg-image-filter` — nodes 779.
- **CONFIRMED:** `comfy-core` — nodes 1, 2, 3, 5, 6, 12, 14, 15, 21, 23, 25, 39, 41, 42, 52, 53, 54, 57, 58, 59, 60, 61, 62, 64, 67, 79, 86, 113, 138, 144, 153, 167, 233, 301, 309, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 409, 430, 451, 494, 495, 496, 497, 498, 500, 507, 508, 516, 524, 536, 581, 583, 775, 776, 793, 797, 799, 800, 801, 802, 803, 811, 813, 814, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 829, 830, 831, 851, 883, 884, 888, 894, 895, 896, 897.
- **CONFIRMED:** `comfyui-custom-scripts` — nodes 158, 804, 832, 835, 841, 842, 843, 844, 846, 850.
- **CONFIRMED:** `comfyui-easy-use` — nodes 154, 420, 422, 565, 573, 702, 834.
- **CONFIRMED:** `comfyui-florence2` — nodes 112, 157, 550, 580.
- **CONFIRMED:** `comfyui-kjnodes` — nodes 456, 477, 541, 543, 693, 780, 781, 782, 783, 784, 785.
- **CONFIRMED:** `comfyui-logic` — nodes 600, 602, 607, 608, 609, 717, 720, 721, 722, 723, 771, 887, 889, 890, 891, 892, 893.
- **CONFIRMED:** `comfyui-post-processing-nodes` — nodes 751.
- **CONFIRMED:** `comfyui_controlnet_aux` — nodes 38.
- **CONFIRMED:** `comfyui_essentials` — nodes 146, 337, 840, 845.
- **CONFIRMED:** `comfyui_ipadapter_plus` — nodes 7, 9, 13.
- **CONFIRMED:** `comfyui_ultimatesdupscale` — nodes 833.
- **CONFIRMED:** `efficiency-nodes-comfyui` — nodes 417, 418, 419, 848, 849.
- **CONFIRMED:** `masquerade-nodes-comfyui` — nodes 429, 449, 499, 502, 503, 504, 505, 506, 509, 510, 747, 749, 754.
- **CONFIRMED:** `rgthree-comfy` — nodes 71, 72, 87, 141, 230, 231, 480, 518, 675.
- **CONFIRMED:** `was-node-suite-comfyui` — nodes 165, 293, 408, 475, 531, 591, 672, 684, 730.

- **CONFIRMED:** rgthree supplies labels, LoRA stack, sampler config, seed, comparers and Fast Groups Bypasser.
- **CONFIRMED:** ComfyUI-Logic nodes have mojibake suffixes in serialized type names but retain exact type strings and links.
- **CONFIRMED:** Comfyroll switches, KJNodes, Florence2/SAM2, EasyUse, GGUF loaders, Image Filter and other custom packages are required by node types in the graph.
- **NOT CONFIRMED:** installed package versions, frontend compatibility and runtime success cannot be derived from the workflow alone. No compatibility fixes were applied and no workflow field was changed.
