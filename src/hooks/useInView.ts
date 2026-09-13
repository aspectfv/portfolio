import { useEffect, useState, type RefObject } from 'react'

/**
 * Whether an element is on screen. Used to stop the render loop for a canvas
 * nobody is looking at; an idle 3D scene is the most expensive thing on the
 * page and there is no reason to pay for it while scrolled past.
 */
export function useInView(
  ref: RefObject<Element | null>,
  rootMargin = '200px',
  /**
   * What to assume before the observer has reported. `true` keeps a scene
   * running if the observer never arrives, which is right for something that
   * would otherwise sit frozen. A caller that starts work on the transition to
   * visible wants `false`, or it starts that work off-screen and finishes
   * before anyone can see it.
   */
  initial = true,
): boolean {
  const [inView, setInView] = useState(initial)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? false),
      { rootMargin },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  return inView
}
