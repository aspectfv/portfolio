import type { ProjectStatus } from '@/content/types'

export function StatusPill({ status }: { status: ProjectStatus }) {
  if (status !== 'in-progress') return null
  return (
    <span className="border-leaf-ink text-leaf-ink font-display text-eyebrow rounded-full border px-2.5 py-0.5 font-medium tracking-[0.08em] uppercase">
      In Progress
    </span>
  )
}
