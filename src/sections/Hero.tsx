import { ActionLink } from '@/components/ActionLink'
import { Eyebrow } from '@/components/Eyebrow'
import { Stage } from '@/scene/Stage'
import { profile } from '@/content/profile'

/**
 * Text first, scene beside it. The grid collapses to one column below md, where
 * the scene sits under the copy rather than competing with it.
 *
 * The scene is decoration: everything a recruiter needs is in the text column,
 * and the page is complete if the canvas never runs.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="bg-canvas">
      <div className="mx-auto grid max-w-content gap-10 px-6 pt-16 pb-(--spacing-section) md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-center md:pt-24">
        <div>
          <Eyebrow>Portfolio</Eyebrow>
          <h1 id="hero-heading" className="text-hero font-display mt-3 font-semibold">
            {profile.name}
          </h1>
          <p className="text-lede text-ink-muted mt-3 font-medium">{profile.positioning}</p>
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
    </section>
  )
}
