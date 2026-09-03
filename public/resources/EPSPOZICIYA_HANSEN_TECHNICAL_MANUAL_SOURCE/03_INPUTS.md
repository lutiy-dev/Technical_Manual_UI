# Inputs

> Source: `Epspoziciya_archviz_ph_sdxlflux_v001.json` only. SHA-256 `ea48f7df4d6d9727d45cd6f6d2fb9b54df7bc1cba8a436e30a1400628475be4e`.  
> Status vocabulary: **CONFIRMED** = directly present in graph data/topology; **INFERRED** = purpose inferred from naming/topology; **NOT CONFIRMED** = runtime behavior cannot be proved from workflow JSON alone.


| NODE ID | TITLE | TYPE | CURRENT VALUE | MODE | UPSTREAM | DOWNSTREAM |
|---|---|---|---|---|---|---|
| 25 | LoadImage | LoadImage | ["V_1_d.jpg", "image"] | 0 | — | 784, 675 |
| 41 | LoadImage | LoadImage | ["d40595bb-7497-4dd4-a433-c1d58c335220.jfif", "image"] | 0 | — | 793 |
| 42 | LoadImage | LoadImage | ["d40595bb-7497-4dd4-a433-c1d58c335220.jfif", "image"] | 0 | — | 630, 793 |
| 79 | LoadImage | LoadImage | ["V_1_di.jpg", "image"] | 0 | — | 38, 165, 451, 71, 695, 715, 783, 785 |
| 301 | LoadImage | LoadImage | ["logo.png", "image"] | 0 | — | 845, 848 |
| 309 | LoadImage | LoadImage | ["Изображение Codex 26 авг. 2026 г., 15_00_59.png", "image"] | 0 | — | 840, 849 |
| 338 | LoadImage | LoadImage | ["V_1_g.jpg", "image"] | 0 | — | 337 |

- **CONFIRMED:** node 79 (`V_1_di.jpg`) is BASE IMAGE by connectivity and is mandatory per embedded note 761. It feeds resize/preprocessor, comparison and mask paths.
- **CONFIRMED:** node 25 (`V_1_d.jpg`) is the external depth input; node 456 chooses it versus generated depth from node 38.
- **CONFIRMED:** nodes 41 and 42 are IPAdapter references; node 630 chooses first versus batch node 793.
- **CONFIRMED:** node 338 (`V_1_g.jpg`) supplies RGB-coded masks through node 337.
- **CONFIRMED:** nodes 301 (`logo.png`) and 309 (second overlay image) feed final overlay nodes 848/849. Their image and mask outputs are connected.
- **INFERRED:** all inputs except BASE IMAGE are optional only when their consuming branch is bypassed or switched away. JSON cannot prove file availability.
