import { useId, useState } from 'react'
import { useAchievements } from '@/hooks/useAchievements'
import type { ProjectDetail as Detail } from '@/content/types'

const sections = [
  { key: 'problem', label: 'The problem' },
  { key: 'built', label: 'What I built' },
  { key: 'decision', label: 'An interesting decision' },
  { key: 'result', label: 'Result' },
] as const

/**
 * The 1–2 minute read, as a disclosure.
 *
 * Focus deliberately stays on the trigger when the panel opens: the panel
 * follows the button in DOM order, so the next Tab lands inside it. Moving
 * focus into the panel would strand a keyboard user who only wanted to peek.
 * Collapsing therefore needs no focus restoration; focus never left.
 */
export function ProjectDetail({
  detail,
  projectName,
  className,
}: {
  detail: Detail
  projectName: string
  /**
   * `contents` from the flagship, so the trigger joins the actions row as a
   * sibling of the links while the panel below it still spans the whole
   * composition. The trigger has to stay in front of the panel in the DOM —
   * that is what lets the next Tab land inside it — so the two cannot simply
   * be placed separately by the caller.
   */
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const { unlock } = useAchievements()

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => {
          setOpen((value) => !value)
          if (!open) unlock('read-a-project')
        }}
        aria-expanded={open}
        aria-controls={panelId}
        className="border-ink-muted bg-surface hover:bg-sunken text-meta press inline-flex min-h-11 items-center gap-2 rounded-sm border-2 border-b-(length:--edge-md) px-4 font-medium"
      >
        {open ? 'Hide details' : 'Read more'}
        <span
          aria-hidden="true"
          className={`transition-transform duration-(--dur-base) ease-(--ease-standard) ${
            open ? 'rotate-180' : ''
          }`}
        >
          ▾
        </span>
        <span className="sr-only">about {projectName}</span>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="border-hairline disclose mt-5 w-full basis-full space-y-4 border-t pt-5"
      >
        {sections.map(({ key, label }) => (
          <div key={key}>
            <h4 className="font-display text-eyebrow text-ink-muted font-medium tracking-[0.08em] uppercase">
              {label}
            </h4>
            <p className="prose-measure mt-1.5">{detail[key]}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
