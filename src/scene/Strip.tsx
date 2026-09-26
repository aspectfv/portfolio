import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { SceneFallback } from '@/components/SceneFallback'
import { SceneBoundary } from './SceneBoundary'
import { useWorld } from './useWorld'
import { stills, type SceneName } from './stills'
import { NOTICE_HOLD, type NoticeName } from '@/scenery/noticeReactions'
import { useAchievements } from '@/hooks/useAchievements'
import { useCompactScene } from '@/hooks/useCompactScene'
import { useFinePointer } from '@/hooks/useFinePointer'
import { useInView } from '@/hooks/useInView'
import { useNear } from '@/hooks/useNear'
import { usePageVisible } from '@/hooks/usePageVisible'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/** Same chunk as the canvas; nothing above this line imports three. */
const StripView = lazy(() => import('./chunk').then((module) => ({ default: module.StripView })))

/**
 * A place in the world, sitting in a section's flow.
 *
 * The still shows first either way: when the world will not run it is the
 * only thing rendered, and when it will, it stays up until the scene has drawn
 * its first frame. The scene mounts when the strip comes near the viewport,
 * not before, so a strip below the fold costs nothing on the path to first
 * paint. The scene is an upgrade applied afterwards, never something content
 * waits on.
 *
 * The strip is also the surface a visitor touches. The canvas ignores the
 * pointer, so the scene reads it off this element; and a tap here is the beat
 * Notice gives a phone, held for the same moment a pointed-at object gets.
 * `data-notice` and `data-tapped` live on this element so the contract is a
 * fact about the DOM, assertable without a browser, exactly as it was when the
 * props were drawings. Under reduce neither exists.
 */
export function Strip({
  scene,
  reaction,
  priority = false,
  className = '',
}: {
  scene: SceneName
  /** This strip's one focal reaction, if it has one. The hero has none. */
  reaction?: NoticeName
  /** Above the fold: the still is fetched first rather than when scrolled near. */
  priority?: boolean
  className?: string
}) {
  const host = useRef<HTMLDivElement>(null)
  const { canRender, report } = useWorld()
  // Reported, not assumed: a strip below the fold must not start its scene,
  // and its models, before the visitor is anywhere near it. Once near, the
  // scene stays mounted; what is paid once on approach is not paid again on
  // every pass back through.
  const inView = useInView(host, '200px', false)
  const wanted = useNear(host)
  const pageVisible = usePageVisible()
  const compact = useCompactScene()
  const finePointer = useFinePointer()
  const reducedMotion = usePrefersReducedMotion()
  const { unlock } = useAchievements()
  const [tapped, setTapped] = useState(false)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    report(scene, inView)
    return () => report(scene, false)
  }, [scene, inView, report])

  useEffect(() => {
    if (!tapped) return
    const timer = setTimeout(() => setTapped(false), NOTICE_HOLD)
    return () => clearTimeout(timer)
  }, [tapped])

  const notices = reaction !== undefined && !reducedMotion
  const still = (
    <SceneFallback image={stills[scene][compact ? 'compact' : 'wide']} priority={priority} />
  )

  return (
    <div
      ref={host}
      data-ornament=""
      aria-hidden="true"
      {...(notices ? { 'data-notice': reaction } : {})}
      {...(notices && tapped ? { 'data-tapped': '' } : {})}
      onPointerDown={
        notices
          ? () => {
              setTapped(true)
              unlock('noticed-the-world')
            }
          : undefined
      }
      className={`relative overflow-hidden ${className}`}
    >
      {canRender && wanted ? (
        <SceneBoundary fallback={still}>
          {!drawn && still}
          <Suspense fallback={null}>
            <StripView
              scene={scene}
              host={host}
              active={inView && pageVisible}
              compact={compact}
              parallax={finePointer}
              noticed={tapped}
              onNoticed={notices ? () => unlock('noticed-the-world') : undefined}
              onFirstFrame={() => setDrawn(true)}
            />
          </Suspense>
        </SceneBoundary>
      ) : (
        still
      )}
    </div>
  )
}
