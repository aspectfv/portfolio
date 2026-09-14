import { useRef } from 'react'
import { useCountUp } from '@/hooks/useCountUp'
import { useInView } from '@/hooks/useInView'

/**
 * A row of stat tags. Every value here is a real, derived number; there is no
 * invented level, score, or XP on this site. A fake stat is a lie in a game
 * costume.
 *
 * Drawn as tags rather than a grid of framed cells: they sit under running text
 * on an open band now, where three boxes would reintroduce the panel the
 * section just dropped. Rendered as a description list so the label and value
 * stay paired without the visual grouping.
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
    <dd className="font-display text-card font-semibold">{numeric === null ? value : counted}</dd>
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
  // No root margin, and false until the observer says otherwise: a number that
  // finishes counting before it is on screen has animated for nobody.
  const inView = useInView(ref, '0px', false)

  return (
    <dl ref={ref} aria-label={label} className="flex flex-wrap gap-3">
      {stats.map((stat) => (
        // Reversed for reading, not for order: a tag reads as "5 Projects",
        // while the list stays term-then-definition for anything that consumes
        // the markup. Nothing here is focusable, so visual order and focus
        // order cannot disagree.
        <div
          key={stat.label}
          className="bg-surface border-edge flex flex-row-reverse items-baseline gap-2 rounded-full border-2 border-b-(length:--edge-sm) px-4 py-2"
        >
          <dt className="text-meta text-ink-muted font-medium">{stat.label}</dt>
          <StatValue value={stat.value} active={inView} />
        </div>
      ))}
    </dl>
  )
}
