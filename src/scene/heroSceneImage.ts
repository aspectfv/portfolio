import type { SceneImage } from '@/components/SceneFallback'

/**
 * Static capture of the hero scene, shown whenever the canvas will not run.
 *
 * Regenerate after changing the scene: run the dev server, load the page in a
 * browser with WebGL, and export the canvas —
 *
 *   canvas.toDataURL('image/webp', 0.92)
 *
 * The canvas is created with `preserveDrawingBuffer: false`, so enable it in
 * HeroScene for the capture and turn it back off afterwards; leaving it on costs
 * frame time for every visitor. Update the dimensions below to match the export.
 */
export const heroSceneImage: SceneImage = {
  src: '/images/hero-scene.webp',
  width: 857,
  height: 857,
}

/**
 * The narrow composition has fewer props and a tighter camera, so it gets its
 * own still — a reduced-motion visitor on a phone should see the arrangement
 * that was designed for a phone.
 */
export const heroSceneImageCompact: SceneImage = {
  src: '/images/hero-scene-compact.webp',
  width: 598,
  height: 598,
}
