/**
 * Every moving thing in the world, in one table.
 *
 * Liveliness on this page is bought with **count**, not with amplitude. One
 * object moving a long way reads as a widget demanding attention; several
 * quiet ones read as a place that is alive. So the budget that matters is how
 * many things move in one place at once, and `scenery.test.ts` holds it at
 * eight per strip.
 *
 * Amplitude is bounded too, at 14px of travel and 3 degrees of rotation per
 * `docs/DESIGN.md`. That bound has already failed a build once, which is the
 * argument for keeping it in data where it can be asserted rather than in each
 * component where it can only be reviewed. For an object in a view, travel is
 * the on-screen peak at the desktop capture; the scene divides by its own
 * pixels-per-unit to get world units back.
 *
 * Durations are deliberately unequal and mostly do not divide evenly into one
 * another, so two actors in the same strip never fall into step.
 */

/** The places on the trail, one per section. */
export type Strip = 'hero' | 'about' | 'projects' | 'skills' | 'experience' | 'contact'

export type AmbientActor = {
  readonly strip: Strip
  /**
   * Fed straight to `animation-duration` for a drawn actor, so one driving two
   * animations at once carries both values here rather than splitting into
   * two entries. A scene actor reads the first value through `period`.
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
  /** Hero. The sky backdrops are drawn; the island and the screen are in the view. */
  clouds: { strip: 'hero', duration: '34s', travel: null, rotation: 0 },
  birds: { strip: 'hero', duration: '52s', travel: null, rotation: 0 },
  heroIsland: { strip: 'hero', duration: '10.5s', travel: 8, rotation: 2.9 },
  heroScreen: { strip: 'hero', duration: '3.9s', travel: 0, rotation: 0 },

  /** About. Late morning at the trailhead. */
  aboutFoliage: { strip: 'about', duration: '7s', travel: 0, rotation: 1.2 },
  aboutGrass: { strip: 'about', duration: '4.6s', travel: 0, rotation: 2.4 },
  aboutLeaves: { strip: 'about', duration: '11s', travel: 12, rotation: 0 },
  aboutPennant: { strip: 'about', duration: '5.5s', travel: 0, rotation: 2.6 },
  aboutButterflies: { strip: 'about', duration: '17s', travel: 6, rotation: 0 },

  /** Projects. Afternoon in the workshop yard. */
  projectsBanner: { strip: 'projects', duration: '5.5s', travel: 0, rotation: 2.4 },
  projectsWindow: { strip: 'projects', duration: '4.6s', travel: 0, rotation: 0 },
  projectsSmoke: { strip: 'projects', duration: '8.5s', travel: 13, rotation: 0 },
  projectsSawdust: { strip: 'projects', duration: '11s', travel: 10, rotation: 0 },
  projectsLantern: { strip: 'projects', duration: '3.7s', travel: 0, rotation: 0 },
  projectsSign: { strip: 'projects', duration: '6.3s', travel: 0, rotation: 2 },
  projectsStream: { strip: 'projects', duration: '5.2s', travel: 0, rotation: 0 },

  /** Skills. Golden hour at the work camp. */
  skillsLantern: { strip: 'skills', duration: '4.2s', travel: 0, rotation: 0 },
  skillsDust: { strip: 'skills', duration: '13s', travel: 12, rotation: 0 },
  skillsPalms: { strip: 'skills', duration: '7.6s', travel: 0, rotation: 1.4 },
  skillsCanvas: { strip: 'skills', duration: '5.1s', travel: 0, rotation: 2.2 },
  skillsPennant: { strip: 'skills', duration: '4.4s', travel: 0, rotation: 2.6 },
  skillsSteam: { strip: 'skills', duration: '6.6s', travel: 10, rotation: 0 },

  /** Experience. Night at the outpost. */
  experienceFlame: { strip: 'experience', duration: '3.2s', travel: 0, rotation: 0 },
  experienceEmbers: { strip: 'experience', duration: '7.4s', travel: 13, rotation: 0 },
  experienceSmoke: { strip: 'experience', duration: '9.6s', travel: 12, rotation: 0 },
  experienceStandard: { strip: 'experience', duration: '6.1s', travel: 0, rotation: 2.5 },
  experienceFireflies: { strip: 'experience', duration: '15s', travel: 6, rotation: 0 },
  experienceLantern: { strip: 'experience', duration: '4.8s', travel: 0, rotation: 0 },

  /** Contact. Dusk over the water. */
  contactShimmer: { strip: 'contact', duration: '3.8s', travel: 0, rotation: 0 },
  contactBoat: { strip: 'contact', duration: '6.4s', travel: 5, rotation: 1.5 },
  contactLantern: { strip: 'contact', duration: '4.5s', travel: 0, rotation: 0 },
  contactReeds: { strip: 'contact', duration: '5.8s', travel: 0, rotation: 2 },
  contactFireflies: { strip: 'contact', duration: '17s', travel: 6, rotation: 0 },
  contactBuoy: { strip: 'contact', duration: '7.7s', travel: 6, rotation: 0 },
} as const satisfies Record<string, AmbientActor>

export type AmbientActorName = keyof typeof ambientActors

/** The first duration of an actor, in seconds, for a scene driving it by clock. */
export function period(actor: AmbientActor): number {
  return parseFloat(actor.duration)
}
