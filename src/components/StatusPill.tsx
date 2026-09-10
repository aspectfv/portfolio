import type { ProjectStatus } from '@/content/types'

/**
 * A stamped badge rather than an outlined pill. Solid fill with a white label,
 * so it reads as something pressed onto the card; the dot is decorative and the
 * word carries the meaning on its own.
 */
export function StatusPill({ status }: { status: ProjectStatus }) {
  if (status !== 'in-progress') return null
  return (
    <span className="bg-leaf-strong border-leaf-edge font-display text-eyebrow inline-flex items-center gap-1.5 rounded-full border-2 border-b-(length:--edge-sm) px-2.5 py-0.5 font-semibold tracking-[0.08em] text-white uppercase">
      <span data-ornament="" aria-hidden="true" className="size-1.5 rounded-full bg-white" />
      In Progress
    </span>
  )
}
