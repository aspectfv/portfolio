/**
 * A thin fill bar. Decorative by construction: the scrollbar already reports
 * position to everyone, including assistive technology, so this repeats it in
 * the visual language of a HUD rather than adding a fact.
 */
export function Meter({ value, className = '' }: { value: number; className?: string }) {
  return (
    <div data-ornament="" aria-hidden="true" className={`bg-sunken h-1 w-full ${className}`}>
      <div
        className="bg-ember-strong h-full origin-left"
        style={{ scale: `${Math.min(1, Math.max(0, value))} 1` }}
      />
    </div>
  )
}
