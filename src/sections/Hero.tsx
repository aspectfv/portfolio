import { ActionLink } from '@/components/ActionLink'
import { Icon } from '@/components/Icon'
import { Stage } from '@/scene/Stage'
import { profile } from '@/content/profile'

/**
 * Text first, scene beside it. The grid collapses to one column below md, where
 * the scene sits under the copy rather than competing with it.
 *
 * The scene is decoration: everything a recruiter needs is in the text column,
 * and the page is complete if the canvas never runs.
 *
 * The hero sits on the sky band and hands off to About's meadow through a
 * faceted horizon, so the world reads as continuing past the fold instead of
 * stopping at the edge of a 490px sticker in the corner.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="bg-sky">
      <div className="mx-auto grid max-w-content gap-10 px-6 pt-16 pb-12 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-center md:pt-24 md:pb-16">
        <div>
          <div className="bg-surface border-edge inline-flex items-center gap-2 rounded-full border-2 border-b-(length:--edge-sm) px-3 py-1.5">
            <Icon name="spark" className="size-4" />
            <p className="font-display text-eyebrow text-ember-ink font-medium tracking-[0.08em] uppercase">
              Portfolio
            </p>
          </div>

          <h1 id="hero-heading" className="text-hero font-display mt-4 font-semibold">
            {profile.name}
          </h1>
          <p className="text-lede text-ink-muted mt-2 font-medium">{profile.positioning}</p>
          <p className="prose-measure mt-6">{profile.personalStatement}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ActionLink href="#projects" variant="primary">
              View Projects
            </ActionLink>
            <ActionLink href={profile.links.resume.href} download>
              Resume
            </ActionLink>
            <ActionLink href={profile.links.github.href} external>
              GitHub
            </ActionLink>
            <ActionLink href={profile.links.linkedin.href} external>
              LinkedIn
            </ActionLink>
          </div>
        </div>

        <Stage className="aspect-square w-full" />
      </div>

      {/* Straight-edged on purpose: a smooth bezier hill would be the one curved
          form in a system built entirely from flat planes. */}
      <svg
        data-ornament=""
        aria-hidden="true"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="block h-10 w-full md:h-16"
      >
        <polygon
          points="0,80 0,46 240,16 560,54 900,12 1200,46 1440,24 1440,80"
          fill="var(--color-meadow)"
        />
        <polygon
          points="0,80 0,62 360,40 780,68 1140,44 1440,60 1440,80"
          fill="var(--color-meadow-edge)"
        />
      </svg>
    </section>
  )
}
