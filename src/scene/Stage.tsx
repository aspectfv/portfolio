import { Suspense, lazy, useRef } from 'react'
import { SceneFallback } from '@/components/SceneFallback'
import { heroSceneImage } from './heroSceneImage'
import { useInView } from '@/hooks/useInView'
import { usePageVisible } from '@/hooks/usePageVisible'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
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
  const webgl = useWebGLSupport()
  const inView = useInView(containerRef)
  const pageVisible = usePageVisible()

  const canRender = webgl && !reducedMotion

  return (
    <div ref={containerRef} aria-hidden="true" className={`relative ${className}`}>
      {canRender ? (
        <Suspense fallback={<SceneFallback image={heroSceneImage} />}>
          <HeroScene active={inView && pageVisible} />
        </Suspense>
      ) : (
        <SceneFallback image={heroSceneImage} />
      )}
    </div>
  )
}
