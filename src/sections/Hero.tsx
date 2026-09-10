import { ActionLink } from '@/components/ActionLink'
import { Eyebrow } from '@/components/Eyebrow'
import { profile } from '@/content/profile'

/**
 * Single column until the hero scene lands. Reserving an empty column for it
 * now would read as a broken layout, and the hero has to look finished at
 * every point — the scene is added beside this text, never in front of it.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="bg-canvas">
      <div className="mx-auto max-w-content px-6 pt-16 pb-(--spacing-section) md:pt-28">
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
      </div>
    </section>
  )
}
