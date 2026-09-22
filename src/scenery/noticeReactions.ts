import type { Biome } from '@/components/Section'

/**
 * Every object in the world that reacts to being pointed at or tapped.
 *
 * The world below the hero was drawn, quietly animated on a timer, and
 * completely indifferent to the visitor. Acknowledgement is what the cozy
 * dialect this site speaks is built on: you approach, something notices. So
 * this is a roster rather than a flag on each prop, for the same reason the
 * ambient roster is one — the budget is a property of the page, not of any one
 * component, and a table can be asserted.
 *
 * **One focal object per band**, each doing the one thing that object would do.
 * A uniform reaction on every prop gives fifteen things that all wobble, which
 * is a page you poke at rather than one you read.
 *
 * Notice is **not an ambient actor** and consumes no slot from the
 * three-per-band cap. That is what lets the dock lantern react at all: it is
 * drawn lit but still, because the sky band's slots are spent on the clouds,
 * the birds and the shimmer.
 */

export type NoticeReaction = {
  readonly band: Biome
  /**
   * Lights are held, gestures are one-shot. A screen that goes dark while you
   * are still pointing at it reads as broken; a traveller who waves for as long
   * as the cursor rests on them reads as a bug. On touch there is no leave
   * event, so a held reaction runs as one-shot with a short hold.
   */
  readonly kind: 'held' | 'one-shot'
}

export const noticeReactions = {
  /** About: the standing traveller waves. */
  wave: { band: 'meadow', kind: 'one-shot' },
  /** Projects: the workshop screen brightens. */
  screen: { band: 'canvas', kind: 'held' },
  /** Skills: the chest lid lifts. */
  lid: { band: 'sand', kind: 'one-shot' },
  /** Experience: the brazier flares. */
  flare: { band: 'dusk', kind: 'held' },
  /** Contact: the dock lantern lights. */
  lantern: { band: 'sky', kind: 'held' },
} as const satisfies Record<string, NoticeReaction>

export type NoticeName = keyof typeof noticeReactions

/**
 * How long a tapped reaction is held before it returns to rest, in ms. Inside
 * the one second `docs/DESIGN.md` allows, and long enough that a one-shot
 * gesture finishes before the class is pulled out from under it.
 */
export const NOTICE_HOLD = 900
