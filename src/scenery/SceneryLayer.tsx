import { useRef } from 'react'
import { useAmbient } from '@/hooks/useAmbient'
import { useViewMode } from '@/hooks/useViewMode'

/**
 * Owns the decorative contract (`aria-hidden`, `data-ornament`, so plain view
 * removes the layer wholesale) and the ambient gate. `data-ambient` appears
 * only while motion is allowed, and the stylesheet runs animations only inside
 * a subtree carrying it, so scenery is paused by construction rather than by
 * discipline.
 */
function AmbientGate({ className, children }: { className: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const ambient = useAmbient(ref)

  return (
    <div
      ref={ref}
      data-ornament=""
      aria-hidden="true"
      {...(ambient ? { 'data-ambient': '' } : {})}
      className={className}
    >
      {children}
    </div>
  )
}

export function SceneryLayer({
  className = '',
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const [viewMode] = useViewMode()

  /**
   * Keyed by view mode so the gate remounts with a fresh IntersectionObserver.
   * Plain view hides scenery with `display: none`, which makes the observer
   * report "off screen"; switching back reveals the element, but an observer
   * that recorded the hidden state can be left holding it, and the scenery
   * stays frozen until some later layout change happens to wake it. Remounting
   * costs nothing here and removes the race outright.
   */
  return (
    <AmbientGate key={viewMode} className={className}>
      {children}
    </AmbientGate>
  )
}
