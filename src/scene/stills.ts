import type { SceneImage } from '@/components/SceneFallback'

/**
 * The rendered still behind every view, one per scene and composition.
 *
 * Written by `scripts/render-stills.mjs`, which mounts each scene at these
 * sizes on the dev-only /stills route and captures it at 2x, so the files are
 * twice these dimensions. The wide still is the desktop composition; the
 * compact one is what a phone gets, with a tighter camera and fewer props
 * where a scene makes that distinction. Projects, Skills and Experience bleed
 * both edges on desktop, so their wide stills are the full width.
 *
 * Re-run the script whenever a scene changes. A still that drifts from the
 * live view is the state most likely to rot unnoticed, because nobody with
 * WebGL ever sees it.
 */
export const stills = {
  hero: {
    wide: { src: '/images/scenes/hero.webp', width: 640, height: 640 },
    compact: { src: '/images/scenes/hero-compact.webp', width: 342, height: 342 },
  },
  about: {
    wide: { src: '/images/scenes/about.webp', width: 560, height: 300 },
    compact: { src: '/images/scenes/about-compact.webp', width: 390, height: 220 },
  },
  projects: {
    wide: { src: '/images/scenes/projects.webp', width: 1440, height: 340 },
    compact: { src: '/images/scenes/projects-compact.webp', width: 390, height: 200 },
  },
  skills: {
    wide: { src: '/images/scenes/skills.webp', width: 1440, height: 340 },
    compact: { src: '/images/scenes/skills-compact.webp', width: 390, height: 200 },
  },
  experience: {
    wide: { src: '/images/scenes/experience.webp', width: 1440, height: 340 },
    compact: { src: '/images/scenes/experience-compact.webp', width: 390, height: 200 },
  },
  contact: {
    wide: { src: '/images/scenes/contact.webp', width: 800, height: 360 },
    compact: { src: '/images/scenes/contact-compact.webp', width: 390, height: 220 },
  },
} as const satisfies Record<string, { wide: SceneImage; compact: SceneImage }>

export type SceneName = keyof typeof stills
