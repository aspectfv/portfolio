import { describe, expect, it } from 'vitest'
import { ambientActors, period } from './ambient'

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

  it('keeps at most eight actors moving in any one strip', () => {
    // The bound that actually does the work. Every actor above passes the
    // amplitude test on its own and a place can still end up twitching by
    // accumulation, which is how "alive" becomes "annoying". It was three
    // while the world was flat drawings on colour bands; a lit strip of thirty
    // objects with three moving things in it reads as a diorama behind glass.
    const perStrip = new Map<string, string[]>()

    for (const [name, actor] of entries) {
      perStrip.set(actor.strip, [...(perStrip.get(actor.strip) ?? []), name])
    }

    for (const [strip, names] of perStrip) {
      expect(names.length, `${strip} carries ${names.join(', ')}`).toBeLessThanOrEqual(8)
    }
  })

  it('gives every actor in a strip its own rhythm', () => {
    const seen = new Map<string, string>()

    for (const [name, actor] of entries) {
      const key = `${actor.strip}/${actor.duration}`
      expect(seen.get(key), `${name} moves in step with ${seen.get(key)}`).toBeUndefined()
      seen.set(key, name)
    }
  })

  it('reads a scene rhythm off the same duration a drawing would', () => {
    expect(period(ambientActors.aboutFoliage)).toBe(7)
    expect(period({ strip: 'hero', duration: '9s, 15s', travel: 0, rotation: 0 })).toBe(9)
  })
})
