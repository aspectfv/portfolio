import { Suspense, lazy, useCallback, useState } from 'react'
import { SceneBoundary } from './SceneBoundary'
import { WorldContext } from './useWorld'
import { useIdle } from '@/hooks/useIdle'
import { usePageVisible } from '@/hooks/usePageVisible'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useWebGLSupport } from '@/hooks/useWebGLSupport'

/**
 * Dynamic import, so three and the R3F runtime land in their own chunk and
 * never enter the initial bundle. Nothing above this line imports three.
 */
const WorldCanvas = lazy(() =>
  import('./chunk').then((module) => ({ default: module.WorldCanvas })),
)

/**
 * Owns the one canvas the whole page draws into, and the decision whether it
 * runs.
 *
 * Every section's scene is a view scissored out of this canvas, so there is
 * one WebGL context, one capability probe and one frame loop for the page.
 * The loop runs only while some strip is on screen and the tab is
 * foregrounded; an idle scene is the most expensive thing on the page and
 * there is no reason to pay for it while nobody is looking at one.
 *
 * The probe waits for the browser to go idle, as the hero's always did:
 * creating a context has no business competing with first paint.
 */
export function World({ children }: { children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion()
  const idle = useIdle()
  const webgl = useWebGLSupport(idle)
  const pageVisible = usePageVisible()
  const [onScreen, setOnScreen] = useState<ReadonlySet<string>>(() => new Set())

  const report = useCallback((strip: string, visible: boolean) => {
    setOnScreen((previous) => {
      if (previous.has(strip) === visible) return previous
      const next = new Set(previous)
      if (visible) next.add(strip)
      else next.delete(strip)
      return next
    })
  }, [])

  const canRender = webgl && !reducedMotion

  return (
    <WorldContext value={{ canRender, report }}>
      {children}
      {canRender && (
        <SceneBoundary fallback={null}>
          <Suspense fallback={null}>
            <WorldCanvas running={pageVisible && onScreen.size > 0} />
          </Suspense>
        </SceneBoundary>
      )}
    </WorldContext>
  )
}
