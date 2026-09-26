import { Canvas } from '@react-three/fiber'
import { View } from '@react-three/drei'

/**
 * The page's one canvas. Fixed to the viewport, transparent, and never in the
 * way of the pointer: every view draws into it through `View.Port`, cut to
 * the strip element it tracks, and the strip is what a visitor touches.
 *
 * It paints above the page, because the sections paint their own band colour
 * and a canvas behind them would never show. Its stacking level sits under the
 * sticky header and the toast, so a strip scrolling under the header is
 * covered rather than drawn over it.
 *
 * `never` while nothing is on screen: no render loop at all, not a cheaper
 * one. Views that are off screen skip their own draw anyway, so this is about
 * the loop itself.
 */
export function WorldCanvas({
  running,
  dpr = [1, 1.75],
}: {
  running: boolean
  dpr?: number | [number, number]
}) {
  return (
    <Canvas
      frameloop={running ? 'always' : 'never'}
      dpr={dpr}
      shadows
      gl={{ antialias: true, alpha: true }}
      // A <canvas> is not in the tab order by default, and every strip marks
      // its own subtree aria-hidden; this one carries no information either.
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 10, pointerEvents: 'none', outline: 'none' }}
    >
      <View.Port />
    </Canvas>
  )
}
