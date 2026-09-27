import { useGLTF } from '@react-three/drei'

/**
 * Every kit model the world loads, by name. Files live under `public/models/`,
 * every one of them went through `scripts/optimize-model.sh`, and CREDITS.md
 * records where each came from.
 */
export const MODELS = {
  /** Nature Kit */
  tree: '/models/tree.glb',
  pine: '/models/pine.glb',
  rock: '/models/rock.glb',
  grass: '/models/grass.glb',
  mushroom: '/models/mushroom.glb',
  logs: '/models/logs.glb',
  oak: '/models/oak.glb',
  treeRound: '/models/tree-round.glb',
  treeSmall: '/models/tree-small.glb',
  treeSimple: '/models/tree-simple.glb',
  treeFat: '/models/tree-fat.glb',
  pineTall: '/models/pine-tall.glb',
  pineTallB: '/models/pine-tall-b.glb',
  pineB: '/models/pine-b.glb',
  coneDark: '/models/cone-dark.glb',
  palm: '/models/palm.glb',
  palmShort: '/models/palm-short.glb',
  cactus: '/models/cactus.glb',
  bush: '/models/bush.glb',
  bushLarge: '/models/bush-large.glb',
  flowerRed: '/models/flower-red.glb',
  flowerYellow: '/models/flower-yellow.glb',
  flowerPurple: '/models/flower-purple.glb',
  rockB: '/models/rock-b.glb',
  rockFlat: '/models/rock-flat.glb',
  stone: '/models/stone.glb',
  stoneTall: '/models/stone-tall.glb',
  grassLarge: '/models/grass-large.glb',
  grassLeafs: '/models/grass-leafs.glb',
  plantFlat: '/models/plant-flat.glb',
  mushrooms: '/models/mushrooms.glb',
  stump: '/models/stump.glb',
  stumpOld: '/models/stump-old.glb',
  log: '/models/log.glb',
  fence: '/models/fence.glb',
  pathStone: '/models/path-stone.glb',
  lilyLarge: '/models/lily-large.glb',
  lilySmall: '/models/lily-small.glb',
  canoe: '/models/canoe.glb',
  paddle: '/models/paddle.glb',
  reeds: '/models/reeds.glb',

  /** Survival Kit */
  planks: '/models/resource-planks.glb',
  timber: '/models/resource-wood.glb',
  treeLog: '/models/tree-log.glb',
  workbench: '/models/workbench.glb',
  axe: '/models/tool-axe.glb',
  hammer: '/models/tool-hammer.glb',
  pickaxe: '/models/tool-pickaxe.glb',
  shovel: '/models/tool-shovel.glb',
  box: '/models/box.glb',
  boxLarge: '/models/box-large.glb',
  boxOpen: '/models/box-open.glb',
  barrel: '/models/barrel.glb',
  bucket: '/models/bucket.glb',
  bottle: '/models/bottle.glb',
  tentCanvas: '/models/tent-canvas.glb',
  bedroll: '/models/bedroll.glb',
  fenceFortified: '/models/fence-fortified.glb',
  signpostSingle: '/models/signpost-single.glb',
  rockSandA: '/models/rock-sand-a.glb',
  rockSandB: '/models/rock-sand-b.glb',
  fishingStand: '/models/campfire-fishing-stand.glb',
  stoneResource: '/models/resource-stone.glb',

  /** Fantasy Town Kit */
  cart: '/models/cart.glb',
  poles: '/models/poles.glb',
  hedge: '/models/hedge.glb',
  wheel: '/models/wheel.glb',
} as const

export type ModelName = keyof typeof MODELS

/**
 * Starts the fetch for a scene's models when its module loads, so the first
 * frame is not waiting on a request that could have been in flight already.
 * Only the hero preloads: every other scene mounts when its strip comes near,
 * and its models are fetched then, off the path to first paint.
 */
export function preload(names: readonly ModelName[]) {
  for (const name of names) useGLTF.preload(MODELS[name])
}
