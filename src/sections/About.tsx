import { Section } from '@/components/Section'
import { profile, sections } from '@/content/profile'

const meta = sections.find((section) => section.id === 'about')!

export function About() {
  return (
    <Section id={meta.id} eyebrow={meta.eyebrow} heading={meta.heading} tone="sunken">
      <div className="prose-measure space-y-5">
        {profile.about.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>
    </Section>
  )
}
