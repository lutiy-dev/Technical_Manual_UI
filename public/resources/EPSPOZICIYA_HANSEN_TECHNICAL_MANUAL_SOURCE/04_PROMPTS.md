# Prompts and routing

> Source: `Epspoziciya_archviz_ph_sdxlflux_v001.json` only. SHA-256 `ea48f7df4d6d9727d45cd6f6d2fb9b54df7bc1cba8a436e30a1400628475be4e`.  
> Status vocabulary: **CONFIRMED** = directly present in graph data/topology; **INFERRED** = purpose inferred from naming/topology; **NOT CONFIRMED** = runtime behavior cannot be proved from workflow JSON alone.


| NODE ID | TITLE | TYPE | CURRENT VALUE | MODE | UPSTREAM | DOWNSTREAM |
|---|---|---|---|---|---|---|
| 797 | PROMPT **Positive** OBJECT | PrimitiveStringMultiline | ["masterpiece architectural photography of an old stone city square, a historical museum set inspired by an ancient Middle Eastern town, with small houses built from weathered limestone, rough plaster and stucco, wooden beams, wooden balconies, arched passageways and recessed doorways, a paved cobblestone square in the foreground, a single palm tree near the center of the scene, authentic handcrafted details, realistic stone and plaster materials, subtle age and wear, clean composition, preserve the original geometry, massing, proportions, perspective and camera angle"] | 0 | — | 895 |
| 799 | PROMPT **Positive** ENVIRONMENT | PrimitiveStringMultiline | [""] | 0 | — | 824, 895 |
| 800 | PROMPT **Positive** LIGHT, STYLE | PrimitiveStringMultiline | ["a softly clouded sky and warm evening light are illuminating the scene, creating cinematic contrast, gentle atmospheric depth, subtle vignette, low key architectural photography, realistic shadows, natural highlights, crisp material definition, slight tilt shift lens, preserve the original mood and camera setup"] | 0 | — | 821, 896 |
| 801 | PROMPT **Positive** ADDITIONAL | PrimitiveStringMultiline | [""] | 0 | — | 896 |
| 802 | PROMPT **Negative** IMAGE SPECIFIC | PrimitiveStringMultiline | ["modern architecture, modern windows, contemporary doors, metal cladding, glass curtain walls, concrete high-rise elements, asphalt roads, cars, modern street furniture, neon signs, modern signage, futuristic details, excessive ornamentation, ruined buildings, collapsed walls, broken arches, distorted windows, deformed facades, extra doors, extra windows, altered openings, changed building proportions"] | 0 | — | 813 |
| 803 | PROMPT **Negative** GLOBAL | PrimitiveStringMultiline | ["(hands), text, error, cropped, (worst quality:1.2), (low quality:1.2), normal quality, (jpeg artifacts:1.3), signature, watermark, username, blurry, anime, cartoon, cgi, painting, sketch, (copyright:1.2), nsfw"] | 0 | — | 814 |
| 408 | PROMPT PPL FLUX | Text Multiline | ["a few Middle Eastern townspeople wearing long beige robes and simple head coverings, naturally walking and standing in an old stone city square, realistic proportions, small and medium scale figures, candid documentary look, visually integrated into the scene, warm evening light"] | 0 | — | 823 |
| 591 | PROMPT CREATE DETAIL MASK | Text Multiline | ["old stone buildings, facades, archways, balconies, windows, doors, wooden beams"] | 0 | — | 580, 813 |
| 895 | StringConcatenate | StringConcatenate | ["", "", ","] | 0 | 797, 799 | 897 |
| 896 | StringConcatenate | StringConcatenate | ["", "", ","] | 0 | 800, 801 | 897 |
| 897 | StringConcatenate | StringConcatenate | ["", "", ","] | 0 | 895, 896 | 5, 804, 811 |
| 811 | CLIPTextEncode | CLIPTextEncode | [""] | 0 | 466, 897 | 453 |
| 52 | FLUX Prompt POSITIVE (Florence2) | CLIPTextEncode | ["masterpiece architecture photography of a black tinyhouse made entirely of (black wood:1.5) planks in a dense forest of detailed old pine trees close to a beautiful lake with crystalclear water on a sunny day with warm sunlight"] | 0 | 466, 158 | 453 |
| 453 | SWITCH 1=GLOBAL Prompt / 2= Florence2 | CR Conditioning Input Switch | [1] | 0 | 52, 811 | 62, 833 |
| 813 | StringConcatenate | StringConcatenate | ["", "", ""] | 0 | 591, 802 | 814 |
| 814 | StringConcatenate | StringConcatenate | ["", "", ""] | 0 | 803, 813 | 6 |

## Exact assembly

- **CONFIRMED:** positive OBJECT 797 + ENVIRONMENT 799 are joined by 895; LIGHT/STYLE 800 + ADDITIONAL 801 by 896; node 897 joins both strings with comma and feeds SDXL encoder 5, FLUX GLOBAL encoder 811, and cached display 804.
- **CONFIRMED:** CREATE DETAIL MASK 591 + IMAGE-SPECIFIC negative 802 are joined by 813; node 814 appends GLOBAL negative 803 and feeds SDXL negative encoder 6.
- **CONFIRMED:** PPL prompt is assembled as node 825 (`fullbody portrait photo of `) + node 408 + node 799, then node 820 appends LIGHT/STYLE 800 + close-up instruction 822; encoder 831 feeds PPL FLUX.
- **CONFIRMED:** Florence2 node 157 captions the filtered image; its caption feeds encoder 52. Node 453 currently selects GLOBAL encoder 811.
- **NOT CONFIRMED:** free-text semantic quality and model interpretation require runtime output and cannot be proven from JSON.
