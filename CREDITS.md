# Credits

## 3D models

All from Kenney's [Nature Kit](https://kenney.nl/assets/nature-kit), by
[Kenney](https://kenney.nl), under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).

| File | Kit model |
| --- | --- |
| `public/models/tree.glb` | `tree_default` |
| `public/models/pine.glb` | `tree_pineDefaultA` |
| `public/models/rock.glb` | `rock_smallA` |
| `public/models/grass.glb` | `grass` |
| `public/models/mushroom.glb` | `mushroom_red` |
| `public/models/logs.glb` | `log_stack` |

The island, workstation and monitor are built from primitives in code, not sourced.

CC0 waives the attribution requirement. Recording provenance anyway is honest and costs
nothing.

Models are re-exported through `scripts/optimize-model.sh` before entering `public/models/`,
so the files here are quantised derivatives rather than the originals.

## Typefaces

| Family | Source | License |
| --- | --- | --- |
| Manrope | [sharanda/manrope](https://github.com/sharanda/manrope) via [Fontsource](https://fontsource.org) | [SIL OFL 1.1](https://openfontlicense.org) |
| Baloo 2 | [EkType/Baloo-2](https://github.com/EkType/Baloo-2) via [Fontsource](https://fontsource.org) | [SIL OFL 1.1](https://openfontlicense.org) |

Only the latin subsets are vendored, in `public/fonts/`.
