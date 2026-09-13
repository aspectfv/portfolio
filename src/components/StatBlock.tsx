import { useRef } from 'react'
import { useCountUp } from '@/hooks/useCountUp'
import { useInView } from '@/hooks/useInView'

/**
 * A row of stat cells, the way a character sheet reports them. Every value
 * here is a real, derived number; there is no invented level, score, or XP on
 * this site. A fake stat is a lie in a game costume.
 *
 * Rendered as a description list so the label/value pairing survives without
 * the visual grouping.
 */

/**
 * A purely numeric value counts up on first view; anything else renders as
 * written. The count is decoration on a correct number, so a non-numeric stat
 * simply does not animate rather than needing a special case anywhere else.
 */
function StatValue({ value, active }: { value: string; active: boolean }) {
  const numeric = /^\d+$/.test(value) ? Number(value) : null
  const counted = useCountUp(numeric ?? 0, active && numeric !== null)

  return (
    <dd className="font-display text-card mt-0.5 font-semibold">
      {numeric === null ? value : counted}
    </dd>
  )
}

export function StatBlock({
  stats,
  label,
}: {
  stats: readonly { readonly label: string; readonly value: string }[]
  label: string
}) {
  const ref = useRef<HTMLDListElement>(null)
  // No root margin: a number that finishes counting before it is on screen has
  // animated for nobody.
  const inView = useInView(ref, '0px')

  return (
    <dl ref={ref} aria-label={label} className="grid grid-cols-3 gap-2">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-canvas border-edge rounded-sm border-2 border-b-(length:--edge-sm) px-3 py-2 text-center"
        >
          <dt className="text-eyebrow text-ink-muted font-medium tracking-[0.08em] uppercase">
            {stat.label}
          </dt>
          <StatValue value={stat.value} active={inView} />
        </div>
      ))}
    </dl>
  )
}
