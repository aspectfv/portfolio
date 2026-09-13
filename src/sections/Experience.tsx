import { ChipList } from '@/components/Chip'
import { Icon } from '@/components/Icon'
import { Section } from '@/components/Section'
import { sections } from '@/content/profile'
import { education, experience } from '@/content/experience'

const meta = sections.find((section) => section.id === 'experience')!

/**
 * A track heading. Small, and not part of the document outline's main spine:
 * these are h3 because the entries beneath them are h4.
 */
function TrackHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display text-eyebrow text-ink-muted mb-4 font-medium tracking-[0.08em] uppercase">
      {children}
    </h3>
  )
}

/**
 * A timeline entry: a framed card sitting to the right of a rail, with a node
 * marker on the rail beside it. The marker is decorative; the ordered list and
 * the printed period carry the sequence on their own.
 */
function TimelineItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="border-edge relative border-l-2 pl-6">
      <span
        data-ornament=""
        aria-hidden="true"
        className="bg-surface border-ember-strong absolute top-5 -left-[9px] size-4 rounded-full border-4"
      />
      <div className="bg-surface border-edge rounded-md border-2 border-b-(length:--edge-md) p-4 md:p-5">
        {children}
      </div>
    </li>
  )
}

export function Experience() {
  return (
    <Section
      id={meta.id}
      eyebrow={meta.eyebrow}
      heading={meta.heading}
      biome="dusk"
      nextBiome="sky"
      ridge="hills"
    >
      <div className="grid gap-10 md:grid-cols-2 md:gap-8">
        <div>
          <TrackHeading>Work</TrackHeading>
          <ol data-stagger="" className="space-y-6">
            {experience.map((entry) => (
              <TimelineItem key={entry.id}>
                <div className="flex items-start gap-3">
                  <span
                    data-ornament=""
                    className="bg-canvas border-edge inline-flex size-9 shrink-0 items-center justify-center rounded-sm border-2"
                  >
                    <Icon name="hammer" className="size-5" />
                  </span>
                  <div>
                    <h4 className="text-card font-display font-semibold">{entry.role}</h4>
                    <p className="text-ember-ink font-medium">{entry.company}</p>
                  </div>
                </div>
                <p className="text-meta text-ink-muted mt-2">
                  {entry.period} · {entry.location}
                </p>
                <p className="mt-3">{entry.summary}</p>
                <div className="mt-4">
                  <ChipList items={entry.stack} label={`${entry.company} stack`} />
                </div>
              </TimelineItem>
            ))}
          </ol>
        </div>

        <div>
          <TrackHeading>Education</TrackHeading>
          <ol data-stagger="" className="space-y-6">
            {education.map((entry) => (
              <TimelineItem key={entry.id}>
                <div className="flex items-start gap-3">
                  <span
                    data-ornament=""
                    className="bg-canvas border-edge inline-flex size-9 shrink-0 items-center justify-center rounded-sm border-2"
                  >
                    <Icon name="scroll" className="size-5" />
                  </span>
                  <div>
                    <h4 className="text-card font-display font-semibold">{entry.institution}</h4>
                    <p className="text-leaf-ink font-medium">{entry.qualification}</p>
                  </div>
                </div>
                <p className="text-meta text-ink-muted mt-2">
                  {entry.period} · {entry.location}
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </TimelineItem>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
