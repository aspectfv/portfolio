import { ActionLink } from '@/components/ActionLink'
import { Dock } from '@/scenery/props/Dock'
import { SceneryProp } from '@/scenery/SceneryProp'
import { CopyEmail } from '@/components/CopyEmail'
import { Clouds } from '@/scenery/Clouds'
import { Section } from '@/components/Section'
import { profile, sections } from '@/content/profile'

const meta = sections.find((section) => section.id === 'contact')!

/**
 * Bookends the hero on the same sky band, and ends the trail on open water
 * rather than inside one last box. The address is large, in plain text, and is
 * a link as well: a recruiter copying it by hand must never have to hunt for
 * it, and it is never only inside a button.
 *
 * The traveller sits on the dock here, which is their second and last
 * appearance. A beginning and an end is the whole statement.
 */
export function Contact() {
  return (
    <Section
      id={meta.id}
      eyebrow={meta.eyebrow}
      heading={meta.heading}
      headingStyle="open"
      biome="sky"
      backdrop={<Clouds />}
    >
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-12">
        <div>
          <p className="text-lede prose-measure font-medium">{profile.contactStatement}</p>

          {/* Large, but not --text-title: the address is one unbreakable word
              and the larger step overflows a 390px screen. */}
          <p className="text-section font-display mt-6 font-semibold break-words">
            <a
              href={`mailto:${profile.email}`}
              className="text-ember-ink underline decoration-2 underline-offset-[6px]"
            >
              {profile.email}
            </a>
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ActionLink href={`mailto:${profile.email}`} variant="primary">
              Email me
            </ActionLink>
            <CopyEmail email={profile.email} />
            <ActionLink href={profile.links.linkedin.href} external>
              LinkedIn
            </ActionLink>
            <ActionLink href={profile.links.github.href} external>
              GitHub
            </ActionLink>
            <ActionLink href={profile.links.resume.href} download>
              Resume
            </ActionLink>
          </div>
        </div>

        <SceneryProp
          viewBox="0 0 140 100"
          size="w-36 md:w-80"
          className="justify-self-center md:justify-self-end"
        >
          <Dock />
        </SceneryProp>
      </div>
    </Section>
  )
}
