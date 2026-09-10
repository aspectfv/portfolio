/** Game flavor. Always sits beside a conventional heading, never instead of one. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display text-eyebrow text-ember-ink font-medium tracking-[0.08em] uppercase">
      {children}
    </p>
  )
}
