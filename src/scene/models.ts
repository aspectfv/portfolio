import { useGLTF } from '@react-three/drei'

/**
 * Every kit model the world loads, by name. Files live under `public/models/`,
 * every one of them went through `scripts/optimize-model.sh`, and CREDITS.md
 * records where each came from.
 */
export const MODELS = {
  tree: '/models/tree.glb',
  pine: '/models/pine.glb',
  rock: '/models/rock.glb',
  grass: '/models/grass.glb',
  mushroom: '/models/mushroom.glb',
  logs: '/models/logs.glb',
  oak: '/models/oak.glb',
  treeRound: '/models/tree-round.glb',
  treeSmall: '/models/tree-small.glb',
  pineTall: '/models/pine-tall.glb',
  bush: '/models/bush.glb',
  bushLarge: '/models/bush-large.glb',
  flowerRed: '/models/flower-red.glb',
  flowerYellow: '/models/flower-yellow.glb',
  flowerPurple: '/models/flower-purple.glb',
  rockB: '/models/rock-b.glb',
  stone: '/models/stone.glb',
  grassLarge: '/models/grass-large.glb',
  mushrooms: '/models/mushrooms.glb',
  stump: '/models/stump.glb',
  fence: '/models/fence.glb',
  pathStone: '/models/path-stone.glb',
} as const

export type ModelName = keyof typeof MODELS

/**
 * Starts the fetch for a scene's models when its module loads, so the first
 * frame is not waiting on a request that could have been in flight already.
 */
export function preload(names: readonly ModelName[]) {
  for (const name of names) useGLTF.preload(MODELS[name])
}
