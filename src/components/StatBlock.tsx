/**
 * A row of stat cells, the way a character sheet reports them. Every value
 * here is a real, derived number; there is no invented level, score, or XP on
 * this site. A fake stat is a lie in a game costume.
 *
 * Rendered as a description list so the label/value pairing survives without
 * the visual grouping.
 */
export function StatBlock({
  stats,
  label,
}: {
  stats: readonly { readonly label: string; readonly value: string }[]
  label: string
}) {
  return (
    <dl aria-label={label} className="grid grid-cols-3 gap-2">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-canvas border-edge rounded-sm border-2 border-b-(length:--edge-sm) px-3 py-2 text-center"
        >
          <dt className="text-eyebrow text-ink-muted font-medium tracking-[0.08em] uppercase">
            {stat.label}
          </dt>
          <dd className="font-display text-card mt-0.5 font-semibold">{stat.value}</dd>
        </div>
      ))}
    </dl>
  )
}
