import { useRef } from 'react'
import { useCountUp } from '@/hooks/useCountUp'
import { useInView } from '@/hooks/useInView'

/**
 * A character sheet. Every value here is a real, derived number; there is no
 * invented level, score, or XP on this site. A fake stat is a lie in a game
 * costume.
 *
 * Drawn as a character sheet: one framed surface, the numbers large, the labels
 * under them, divided rather than individually boxed. Three separate tags on an
 * open band read as three loose stickers; one sheet reads as a record of a
 * person, which is what the section is. The frame comes from `Panel`, so the
 * rivets and the inset rule arrive with it.
 *
 * Rendered as a description list, so the label and value stay paired whatever
 * the visual arrangement does.
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
    <dd className="font-display text-title font-semibold">{numeric === null ? value : counted}</dd>
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
    <dl ref={ref} aria-label={label} className="divide-hairline grid grid-cols-3 divide-x-2">
      {stats.map((stat) => (
        // Reversed for reading, not for order: the number reads first, while
        // the list stays term-then-definition for anything consuming the
        // markup. Nothing here is focusable, so visual order and focus order
        // cannot disagree.
        <div
          key={stat.label}
          className="flex flex-col-reverse items-center gap-0.5 px-2 first:pl-0 last:pr-0"
        >
          <dt className="text-meta text-ink-muted text-center font-medium">{stat.label}</dt>
          <StatValue value={stat.value} active={inView} />
        </div>
      ))}
    </dl>
  )
}
