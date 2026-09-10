import type { ProjectStatus } from '@/content/types'

export function StatusPill({ status }: { status: ProjectStatus }) {
  if (status !== 'in-progress') return null
  return (
    <span className="border-leaf-ink text-leaf-ink font-display text-eyebrow inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-medium tracking-[0.08em] uppercase">
      <span aria-hidden="true" className="bg-leaf-ink size-1.5 rounded-full" />
      In Progress
    </span>
  )
}
