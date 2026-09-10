import { Section } from '@/components/Section'
import { ChipList } from '@/components/Chip'
import { sections } from '@/content/profile'
import { education, experience } from '@/content/experience'

const meta = sections.find((section) => section.id === 'experience')!

export function Experience() {
  return (
    <Section id={meta.id} eyebrow={meta.eyebrow} heading={meta.heading}>
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="font-display text-eyebrow text-ink-muted font-medium tracking-[0.08em] uppercase">
            Work
          </h3>
          <ol className="mt-4 space-y-6">
            {experience.map((entry) => (
              <li key={entry.id} className="border-hairline border-l-2 pl-5">
                <h4 className="text-card font-semibold">{entry.role}</h4>
                <p className="text-ember-ink font-medium">{entry.company}</p>
                <p className="text-meta text-ink-muted">
                  {entry.period} · {entry.location}
                </p>
                <p className="mt-3">{entry.summary}</p>
                <div className="mt-3">
                  <ChipList items={entry.stack} label={`${entry.company} stack`} />
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="font-display text-eyebrow text-ink-muted font-medium tracking-[0.08em] uppercase">
            Education
          </h3>
          <ol className="mt-4 space-y-6">
            {education.map((entry) => (
              <li key={entry.id} className="border-hairline border-l-2 pl-5">
                <h4 className="text-card font-semibold">{entry.institution}</h4>
                <p className="text-leaf-ink font-medium">{entry.qualification}</p>
                <p className="text-meta text-ink-muted">
                  {entry.period} · {entry.location}
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
