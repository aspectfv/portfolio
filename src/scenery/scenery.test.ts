import { describe, expect, it } from 'vitest'
import { ambientActors } from './ambient'

/**
 * The two bounds on ambient motion, asserted rather than reviewed.
 *
 * Neither proves the world looks alive; only a person looking at it does that.
 * These make the two known ways of getting it wrong impossible to author by
 * accident: one thing moving too far, and too many things moving at once.
 *
 * The amplitude assertion is inherited from the milestone before this one,
 * where it failed first and caught a prop over the cap. It is kept for exactly
 * that reason.
 */
const entries = Object.entries(ambientActors)

describe('ambient roster', () => {
  it('keeps every actor inside the amplitude bound', () => {
    // docs/DESIGN.md: a discrete scenery object stays under 14px of travel and
    // 3 degrees of rotation. A full-bleed backdrop is exempt and declares that
    // by carrying no pixel travel at all.
    for (const [name, actor] of entries) {
      if (actor.travel !== null) {
        expect(actor.travel, `${name} travels past the 14px cap`).toBeLessThan(14)
      }
      expect(actor.rotation, `${name} turns past the 3deg cap`).toBeLessThan(3)
    }
  })

  it('keeps at most three actors moving on any one band', () => {
    // The bound that actually does the work. Every actor above passes the
    // amplitude test on its own and a band can still end up twitching by
    // accumulation, which is how "alive" becomes "annoying".
    const perBand = new Map<string, string[]>()

    for (const [name, actor] of entries) {
      perBand.set(actor.band, [...(perBand.get(actor.band) ?? []), name])
    }

    for (const [band, names] of perBand) {
      expect(names.length, `${band} carries ${names.join(', ')}`).toBeLessThanOrEqual(3)
    }
  })

  it('gives every actor on a band its own rhythm', () => {
    const seen = new Map<string, string>()

    for (const [name, actor] of entries) {
      const key = `${actor.band}/${actor.duration}`
      expect(seen.get(key), `${name} moves in step with ${seen.get(key)}`).toBeUndefined()
      seen.set(key, name)
    }
  })
})
