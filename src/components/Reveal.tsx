import { useEffect, useRef } from 'react'

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
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const reveal = () => element.setAttribute('data-revealed', '')

    if (typeof IntersectionObserver === 'undefined') {
      reveal()
      return
    }

    // A block taller than the viewport can never reach 20% visibility, so it
    // would sit hidden forever. Those reveal as soon as any part is on screen.
    const tallerThanViewport = element.getBoundingClientRect().height > window.innerHeight * 0.8

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          reveal()
          observer.unobserve(entry.target)
        }
      },
      { threshold: tallerThanViewport ? 0 : 0.2 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} data-reveal="" className={className}>
      {children}
    </div>
  )
}
