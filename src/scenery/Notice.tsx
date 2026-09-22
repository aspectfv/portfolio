import { useEffect, useState } from 'react'
import { NOTICE_HOLD, type NoticeName } from './noticeReactions'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useViewMode } from '@/hooks/useViewMode'

/**
 * Makes one drawn object react to being pointed at or tapped.
 *
 * Hover is CSS, on the group itself. Tap is `pointerdown`, which is the whole
 * reason this is a component rather than another selector: a phone visitor gets
 * the same beat a desktop visitor gets, and touch has no hover to borrow.
 *
 * Under reduce and in plain view the wrapper is not rendered at all, so the
 * gate is a fact about the DOM rather than a CSS rule to be trusted. Plain view
 * already deletes the whole ornament layer; this makes the absence assertable
 * without a browser.
 *
 * The hit area is explicit because these objects are small — the traveller is
 * about twenty pixels wide on a phone — and a fingertip needs somewhere to
 * land. It is transparent rather than invisible: `pointer-events` needs a fill
 * to hit.
 */
export function Notice({
  reaction,
  hit,
  children,
}: {
  reaction: NoticeName
  /** Hit area in the host prop's own user units: x, y, width, height. */
  hit: readonly [number, number, number, number]
  children: React.ReactNode
}) {
  const [tapped, setTapped] = useState(false)
  const reducedMotion = usePrefersReducedMotion()
  const [viewMode] = useViewMode()

  useEffect(() => {
    if (!tapped) return
    const timer = setTimeout(() => setTapped(false), NOTICE_HOLD)
    return () => clearTimeout(timer)
  }, [tapped])

  if (reducedMotion || viewMode === 'plain') return <>{children}</>

  const [x, y, width, height] = hit

  return (
    <g
      className="notice"
      data-notice={reaction}
      {...(tapped ? { 'data-tapped': '' } : {})}
      onPointerDown={() => setTapped(true)}
    >
      <rect x={x} y={y} width={width} height={height} fill="transparent" />
      {children}
    </g>
  )
}
