import { useReveal } from '@/hooks/useReveal'

/**
 * Fades a block in with a small rise as it enters view, once.
 *
 * Deliberately not "hidden until revealed" in the default stylesheet. The
 * hidden state lives inside a `prefers-reduced-motion: no-preference` block, so
 * a visitor who asked for less motion, or a browser without
 * IntersectionObserver; gets the content outright rather than a blank page
 * waiting for an observer that will never fire.
 */
export function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useReveal<HTMLDivElement>()

  return (
    <div ref={ref} data-reveal="" className={className}>
      {children}
    </div>
  )
}
