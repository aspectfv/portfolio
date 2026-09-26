import { useRef } from 'react'
import { useAmbient } from '@/hooks/useAmbient'

/**
 * Owns the decorative contract (`aria-hidden`, `data-ornament`) and the ambient
 * gate. `data-ambient` appears
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
  return <AmbientGate className={className}>{children}</AmbientGate>
}
