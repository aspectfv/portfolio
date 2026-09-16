import type { Biome } from '@/components/Section'

/**
 * Every moving thing in the world, in one table.
 *
 * Liveliness on this page is bought with **count**, not with amplitude. One
 * object moving a long way reads as a widget demanding attention; several
 * quiet ones read as a place that is alive. So the budget that matters is how
 * many things move on a single band at once, and `scenery.test.ts` holds it at
 * three.
 *
 * Amplitude is bounded too, at 14px of travel and 3 degrees of rotation per
 * `docs/DESIGN.md`. That bound has already failed a build once, which is the
 * argument for keeping it in data where it can be asserted rather than in each
 * component where it can only be reviewed.
 *
 * Durations are deliberately unequal and mostly do not divide evenly into one
 * another, so two actors on the same band never fall into step.
 */

export type AmbientActor = {
  readonly band: Biome
  /**
   * Fed straight to `animation-duration`, so an actor driving two animations
   * at once carries both values here rather than splitting into two entries.
   */
  readonly duration: string
  /**
   * Peak travel in px. `null` for a full-bleed backdrop, which is bounded
   * relative to its own width instead: what distracts is angular speed against
   * the viewport, and a discrete object's pixel budget spread across a 1440px
   * layer is a motion nobody can see at all.
   */
  readonly travel: number | null
  /** Peak rotation in degrees. */
  readonly rotation: number
}

export const ambientActors = {
  /** Sky. */
  clouds: { band: 'sky', duration: '34s', travel: null, rotation: 0 },
  birds: { band: 'sky', duration: '52s', travel: null, rotation: 0 },
  shimmer: { band: 'sky', duration: '3.8s', travel: 0, rotation: 0 },

  /** Meadow. The island's bob and tilt run together off one entry. */
  campIsland: { band: 'meadow', duration: '9s, 15s', travel: 6, rotation: 1.4 },
  campFoliage: { band: 'meadow', duration: '7s', travel: 0, rotation: 1.1 },
  leaves: { band: 'meadow', duration: '11s', travel: 12, rotation: 0 },

  /** Canvas. */
  banner: { band: 'canvas', duration: '5.5s', travel: 0, rotation: 2.4 },
  screen: { band: 'canvas', duration: '4.6s', travel: 0, rotation: 0 },

  /** Sand. */
  motes: { band: 'sand', duration: '13s', travel: 12, rotation: 0 },
  lantern: { band: 'sand', duration: '4.2s', travel: 0, rotation: 0 },

  /** Dusk. */
  brazier: { band: 'dusk', duration: '3.2s', travel: 0, rotation: 0 },
  embers: { band: 'dusk', duration: '7.4s', travel: 13, rotation: 0 },
} as const satisfies Record<string, AmbientActor>

export type AmbientActorName = keyof typeof ambientActors
