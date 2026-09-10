import { Section } from '@/components/Section'
import { ChipList } from '@/components/Chip'
import { sections } from '@/content/profile'
import { skillGroups } from '@/content/skills'

const meta = sections.find((section) => section.id === 'skills')!

export function Skills() {
  return (
    <Section id={meta.id} eyebrow={meta.eyebrow} heading={meta.heading} tone="sunken">
      <div className="grid gap-6 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div
            key={group.id}
            className="bg-surface border-hairline border-b-edge rounded-lg border border-b-[3px] p-5 shadow-card"
          >
            <h3 className="font-display text-eyebrow text-ink-muted font-medium tracking-[0.08em] uppercase">
              {group.label}
            </h3>
            <div className="mt-3">
              <ChipList items={group.items} label={group.label} />
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
