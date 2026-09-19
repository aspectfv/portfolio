import { useEffect, useRef } from 'react'

/**
 * Marks an element `data-revealed` the first time it comes into view.
 *
 * The hidden state that pairs with this lives in the stylesheet, behind a
 * `prefers-reduced-motion: no-preference` query. That split is deliberate: this
 * hook can only ever *add* the marker, so an element it never observes — under
 * reduce, or in a browser with no IntersectionObserver — is simply visible.
 * There is no code path here that can hide content.
 *
 * Used by both the section reveal and by staggered lists, which need their own
 * trigger: a list near the foot of a tall section is released by the section's
 * observer long before anyone has scrolled far enough to watch it arrive.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

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

  return ref
}
