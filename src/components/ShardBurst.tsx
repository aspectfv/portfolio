/**
 * A burst of faceted shards, flung out from the centre of whatever positioned
 * box holds it, once. The shards are triangles in the accent colours, cut in
 * the same facets the glyphs and the 3D world are, so the reward reads as a
 * piece of this world breaking loose rather than as generic confetti.
 *
 * Interface feedback only: it fires on a control the visitor just used or on
 * the announcement that just arrived, never in the scenery. Remount it with a
 * new key to fire again. Absent under reduced motion, in the stylesheet.
 */

const tones = ['bg-ember', 'bg-leaf', 'bg-tide-strong', 'bg-ember-strong', 'bg-leaf-strong']

const shards = Array.from({ length: 10 }, (_, index) => ({
  id: index,
  // Even spacing with a fixed jitter, so the burst reads as thrown rather than
  // as a clock face, and is identical every time it fires.
  angle: index * 36 + ((index * 17) % 13) - 6,
  distance: 38 + ((index * 11) % 4) * 8,
  spin: index % 2 === 0 ? 220 : -260,
  tone: tones[index % tones.length],
}))

export function ShardBurst({ className = '' }: { className?: string }) {
  return (
    <span
      data-burst=""
      aria-hidden="true"
      className={`pointer-events-none absolute top-1/2 left-1/2 ${className}`}
    >
      {shards.map((shard) => (
        <span
          key={shard.id}
          style={
            {
              '--shard-angle': `${shard.angle}deg`,
              '--shard-distance': `${shard.distance}px`,
              '--shard-spin': `${shard.spin}deg`,
            } as React.CSSProperties
          }
          className={`shard absolute -top-1.5 -left-1.5 size-3 ${shard.tone}`}
        />
      ))}
    </span>
  )
}
