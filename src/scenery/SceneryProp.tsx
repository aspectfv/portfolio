import { SceneryLayer } from './SceneryLayer'

/**
 * Places a piece of scenery inside a section's composition.
 *
 * Always in the flow, never absolutely positioned, so it can never overlap text
 * at a width nobody tested. Where it sits is the caller's decision, because the
 * compositions differ: a section with no panel can give its prop a column of
 * its own, and one built from panels puts it in the margin.
 *
 * What it does NOT do is decide the drawing. Each prop owns its own viewBox and
 * its own aspect, which is the point of the rebuild this file came out of: five
 * sections once shared one 120x132 island frame, and sharing the frame is what
 * made everything drawn in it come out the same shape.
 */
export function SceneryProp({
  viewBox,
  size,
  className = '',
  children,
}: {
  viewBox: string
  /** Width utilities, smaller at narrow widths where height is scarce. */
  size: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <SceneryLayer className={`pointer-events-none ${className}`}>
      <svg viewBox={viewBox} className={size}>
        {children}
      </svg>
    </SceneryLayer>
  )
}
