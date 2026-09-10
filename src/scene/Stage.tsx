import { Suspense, lazy, useRef } from 'react'
import { SceneFallback } from '@/components/SceneFallback'
import { SceneBoundary } from './SceneBoundary'
import { heroSceneImage, heroSceneImageCompact } from './heroSceneImage'
import { useIdle } from '@/hooks/useIdle'
import { useInView } from '@/hooks/useInView'
import { usePageVisible } from '@/hooks/usePageVisible'
import { useCompactScene } from '@/hooks/useCompactScene'
import { useFinePointer } from '@/hooks/useFinePointer'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useViewMode } from '@/hooks/useViewMode'
import { useWebGLSupport } from '@/hooks/useWebGLSupport'

/**
 * Dynamic import, so three and the R3F runtime land in their own chunk and
 * never enter the initial bundle. Nothing above this line imports three.
 */
const HeroScene = lazy(() =>
  import('./HeroScene').then((module) => ({ default: module.HeroScene })),
)

/**
 * Decides whether a scene runs at all, and renders the static image when it
 * does not.
 *
 * The image shows first either way: when the gate fails it is the only thing
 * rendered, and when the gate passes it is the Suspense fallback until the 3D
 * chunk arrives. The scene is an upgrade applied afterwards, never something
 * content waits on.
 */
export function Stage({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const idle = useIdle()
  const webgl = useWebGLSupport(idle)
  const compact = useCompactScene()
  const finePointer = useFinePointer()
  const inView = useInView(containerRef)
  const pageVisible = usePageVisible()
  const [viewMode] = useViewMode()

  // Plain view is a request for the document without the game presentation, and
  // a live 3D canvas is the loudest part of that presentation. It gets the same
  // still every other declined path gets.
  const canRender = webgl && !reducedMotion && viewMode === 'game'
  const fallback = compact ? heroSceneImageCompact : heroSceneImage

  return (
    <div ref={containerRef} aria-hidden="true" className={`relative ${className}`}>
      {canRender ? (
        <SceneBoundary fallback={<SceneFallback image={fallback} />}>
          <Suspense fallback={<SceneFallback image={fallback} />}>
            <HeroScene active={inView && pageVisible} compact={compact} parallax={finePointer} />
          </Suspense>
        </SceneBoundary>
      ) : (
        <SceneFallback image={fallback} />
      )}
    </div>
  )
}
