# Control panel

> Source: `Epspoziciya_archviz_ph_sdxlflux_v001.json` only. SHA-256 `ea48f7df4d6d9727d45cd6f6d2fb9b54df7bc1cba8a436e30a1400628475be4e`.  
> Status vocabulary: **CONFIRMED** = directly present in graph data/topology; **INFERRED** = purpose inferred from naming/topology; **NOT CONFIRMED** = runtime behavior cannot be proved from workflow JSON alone.


| NODE ID | TITLE | CURRENT VALUE | MODE 1 / MODE 2 / OTHER MODES | EFFECT | DOWNSTREAM | STATUS |
|---|---|---|---|---|---|---|
| 168 | 1=SDXL/ 2=SDXL+IPA | 1 | 1 plain SDXL; 2 SDXL+IPAdapter | 87 | CONFIRMED |
| 453 | SWITCH 1=GLOBAL Prompt / 2= Florence2 | 1 | 1 GLOBAL prompt; 2 Florence2 caption | 62, 833 | CONFIRMED |
| 456 | SWITCH CNET: 1=EXTRA / 2=PREPROCESS | 1 | 1 external maps; 2 preprocessors | 542, 732 | CONFIRMED |
| 459 | PPL Switch 1=FLUX / 2=3D | 1 (widget; overridden by link) | Selects FLUX or 3D PPL composite input | 480, 573 | CONFIRMED |
| 479 | Fast Groups Bypasser (rgthree) | None | UI group bypass controller; exact saved toggles absent | — | CONFIRMED |
| 522 | People Input Switch 1=FLUX / 2=3D rendered | 1 (widget; overridden by link) | Selects FLUX-generated or 3D people crop | 508 | CONFIRMED |
| 535 | CR Latent Input Switch | 1 (widget; overridden by link) | Selects empty or VAE-encoded SDXL latent | 1 | CONFIRMED |
| 541 | 1=TXT+CNET2IMG / 2=IMG+CNET2IMG | 1 | 1 txt2img; 2 img2img | 535, 592, 602 | CONFIRMED |
| 543 | SWITCH PPL: 1=FLUX / 2=INPUT | 1 | Shared PPL selector: 1 FLUX; 2 input/3D | 459, 522, 552, 715 | CONFIRMED |
| 552 | People Input Switch 1=FLUX / 2=3D rendered | 1 (widget; overridden by link) | Selects FLUX or 3D people for inpaint preparation | 503, 518, 780 | CONFIRMED |
| 592 | CR Image Input Switch | 1 (widget; overridden by link) | Selects resized or original main image | 585, 580, 536, 775, 565 | CONFIRMED |
| 600 | If ANY return A else B-🔬 | None | Selects denoise from comparison | 1 | CONFIRMED |
| 602 | Compare-🔬 | a != b | Generation-mode comparison | 600 | CONFIRMED |
| 607 | Float-🔬 | 1 | Fallback denoise 1.0 | 600 | CONFIRMED |
| 608 | DENOISE (ONLY IF GENERATION=2) | 0.3 | Img2img denoise | 600 | CONFIRMED |
| 609 | Int-🔬 | 1 | Comparison constant 1 | 602 | CONFIRMED |
| 630 | IPA-INPUT IMG: 1=FIRST/ 2=BOTH | 1 | First or batched IPA references | 9 | CONFIRMED |
| 685 | CR Image Input Switch | 1 (widget; overridden by link) | Selects resized or original people composite | 459 | CONFIRMED |
| 693 | 1=RESIZE INPUT / 2=ORIGINAL INPUT | 1 | 1 resized input; 2 original | 695, 685 | CONFIRMED |
| 695 | CR Image Input Switch | 1 (widget; overridden by link) | Selects resized or original base | 592 | CONFIRMED |
| 702 | RESIZE TO | 1536 | Working resolution | 783, 783 | CONFIRMED |
| 715 | People Input Switch 1=FLUX / 2=3D rendered | 2 (widget; overridden by link) | Final people source switch | 552 | CONFIRMED |
| 717 | COLOR FROM ENVIRONMENT STRENGHT | 0.44 | Color-match strength | 477 | CONFIRMED |
| 720 | STAGE 1 & 2 STRENGTH | 0.09 | Detail-transfer strength | 565, 573 | CONFIRMED |
| 721 | IPADAPTER WEIGHT (strenght) | 0 | IPAdapter weight | 7 | CONFIRMED |
| 722 | ControlNet STRENGTH CANNY | 0.31 | Canny ControlNet strength | 419 | CONFIRMED |
| 723 | ControlNet STRENGTH DEPTH | 0.36 | Depth ControlNet strength | 417 | CONFIRMED |
| 771 | Steps | 24 | Shared FLUX/PPL step count | 59, 498, 819, 833 | CONFIRMED |

## Fast Groups Bypasser

**CONFIRMED:** node 479 exists and is active (`mode=0`) with `showAllGraphs=true`, but has no serialized widget values or outgoing links. **NOT CONFIRMED:** the JSON does not serialize a per-group on/off state, so the precise UI toggle state cannot be asserted. Actual node bypass state is independently visible as node `mode`; nodes 832–851 and 883–894 are bypassed (`mode=4`).
