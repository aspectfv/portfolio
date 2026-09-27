import { ActionLink } from '@/components/ActionLink'
import { CopyEmail } from '@/components/CopyEmail'
import { Section } from '@/components/Section'
import { Strip } from '@/scene/Strip'
import { profile, sections } from '@/content/profile'

const meta = sections.find((section) => section.id === 'contact')!

/**
 * Bookends the hero on the same sky band, and ends the trail on open water
 * rather than inside one last box. The address is large, in plain text, and is
 * a link as well: a recruiter copying it by hand must never have to hunt for
 * it, and it is never only inside a button.
 *
 * The traveller sits on the dock here, which is their second and last
 * appearance. A beginning and an end is the whole statement. It is dusk on
 * this band, so the daytime clouds the hero drifts do not return.
 */
export function Contact() {
  return (
    <Section
      id={meta.id}
      eyebrow={meta.eyebrow}
      heading={meta.heading}
      headingStyle="open"
      biome="sky"
    >
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-center md:gap-12">
        <Strip
          scene="contact"
          reaction="lantern"
          className="-mx-6 h-[200px] md:h-[40vh] md:max-h-[520px] md:min-h-[300px] md:order-last md:mx-0 md:-mr-[calc((100vw-min(100vw,var(--container-content)))/2+1.5rem)]"
        />
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
      </div>
    </Section>
  )
}
