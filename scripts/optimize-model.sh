#!/usr/bin/env bash
# Optimise a source .glb into public/models/.
#
# Every model entering the repo goes through this — source kits ship with
# duplicate materials, unwelded vertices and oversized textures, none of which
# the flat-shaded art direction needs.
#
#   ./scripts/optimize-model.sh path/to/source.glb name
#
# Produces public/models/<name>.glb and prints the size delta.
set -euo pipefail

if [ $# -lt 2 ]; then
  echo "usage: $0 <source.glb> <output-name>" >&2
  exit 1
fi

SRC="$1"
NAME="$2"
OUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/public/models"
OUT="$OUT_DIR/$NAME.glb"

[ -f "$SRC" ] || { echo "no such file: $SRC" >&2; exit 1; }
mkdir -p "$OUT_DIR"

# Quantisation, not Draco. Draco saves a few more kilobytes per model but needs
# a ~200 KB wasm decoder that three fetches from a Google CDN by default — far
# more than it saves at this scale, and an external dependency for the hero.
# KHR_mesh_quantization is native to three and costs nothing to decode.
# --simplify is off: these are already low-poly, and decimation ruins the
# faceted silhouette the art direction depends on.
pnpm exec gltf-transform optimize "$SRC" "$OUT" \
  --compress quantize \
  --texture-compress webp \
  --simplify false

BEFORE=$(wc -c < "$SRC" | tr -d ' ')
AFTER=$(wc -c < "$OUT" | tr -d ' ')
echo "$NAME: $BEFORE B -> $AFTER B ($(( 100 - AFTER * 100 / BEFORE ))% smaller)"
