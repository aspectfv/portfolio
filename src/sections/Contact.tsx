import { ActionLink } from '@/components/ActionLink'
import { CopyEmail } from '@/components/CopyEmail'
import { Panel } from '@/components/Panel'
import { Section } from '@/components/Section'
import { profile, sections } from '@/content/profile'

const meta = sections.find((section) => section.id === 'contact')!

/**
 * Bookends the hero on the same sky band. One panel, one primary action, and
 * the address in plain text above it: the email is never only inside a button,
 * because a recruiter copying it by hand must not have to hunt.
 */
export function Contact() {
  return (
    <Section id={meta.id} eyebrow={meta.eyebrow} heading={meta.heading} biome="sky">
      <Panel className="max-w-3xl">
        <p className="prose-measure">{profile.contactStatement}</p>

        <p className="text-lede mt-6 font-medium">
          <a
            href={`mailto:${profile.email}`}
            className="text-ember-ink underline underline-offset-4"
          >
            {profile.email}
          </a>
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
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
      </Panel>
    </Section>
  )
}
