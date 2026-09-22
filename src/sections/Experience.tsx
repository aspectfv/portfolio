import { ChipList } from '@/components/Chip'
import { SceneryProp } from '@/scenery/SceneryProp'
import { Outpost } from '@/scenery/props/Outpost'
import { Icon } from '@/components/Icon'
import { Section } from '@/components/Section'
import { sections } from '@/content/profile'
import { useReveal } from '@/hooks/useReveal'
import { education, experience } from '@/content/experience'

const meta = sections.find((section) => section.id === 'experience')!

/**
 * A track heading. Small, and not part of the document outline's main spine:
 * these are h3 because the entries beneath them are h4.
 */
function TrackHeading({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h3
      className={`font-display text-eyebrow text-ink-muted mb-4 font-medium tracking-[0.08em] uppercase ${className}`}
    >
      {children}
    </h3>
  )
}

/**
 * A station on the route: a framed card beside the rail, with a node marking
 * where it sits. The marker is decorative; the ordered list and the printed
 * period carry the sequence on their own.
 *
 * The offset puts the node on the rail, which is the container's left border.
 * A border rather than a drawn line, so the rail is continuous by construction
 * and cannot break at a gap between two lists.
 */
function Station({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative">
      <span
        data-ornament=""
        aria-hidden="true"
        className="bg-surface border-ember-strong absolute top-5 -left-[35px] size-4 rounded-full border-4"
      />
      <div className="bg-surface border-edge rounded-md border-2 border-b-(length:--edge-md) p-4 md:p-5">
        {children}
      </div>
    </li>
  )
}

/**
 * The night band, and the only section that runs as one continuous route.
 *
 * Two parallel columns made the reader choose a side and read one of them; a
 * single line through work and then study is the actual shape of the thing
 * being described. Dark is a token scope on the section, so nothing in here
 * knows about it.
 */
export function Experience() {
  // Each track is its own trigger: the education list sits a full screen below
  // the work list, and a shared one would cascade it off-screen.
  const work = useReveal<HTMLOListElement>()
  const study = useReveal<HTMLOListElement>()

  return (
    <Section
      id={meta.id}
      eyebrow={meta.eyebrow}
      heading={meta.heading}
      biome="dusk"
      dark
      nextBiome="sky"
      ridge="hills"
    >
      <div className="border-edge max-w-3xl border-l-2 pl-7">
        <TrackHeading>Work</TrackHeading>
        <ol ref={work} data-stagger="" className="space-y-5">
          {experience.map((entry) => (
            <Station key={entry.id}>
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
              <p className="prose-measure mt-3">{entry.summary}</p>
              <div className="mt-4">
                <ChipList items={entry.stack} label={`${entry.company} stack`} />
              </div>
            </Station>
          ))}
        </ol>

        <TrackHeading className="mt-10">Education</TrackHeading>
        <ol ref={study} data-stagger="" className="space-y-5">
          {education.map((entry) => (
            <Station key={entry.id}>
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
              <ul className="prose-measure mt-3 list-disc space-y-1 pl-5">
                {entry.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </Station>
          ))}
        </ol>
      </div>

      <SceneryProp
        viewBox="0 0 120 112"
        size="w-28 md:w-52"
        className="mt-6 flex justify-center md:mt-10 md:justify-end"
      >
        <Outpost />
      </SceneryProp>
    </Section>
  )
}
