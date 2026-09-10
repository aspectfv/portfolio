import { useEffect, useState, type RefObject } from 'react'

/**
 * Whether an element is on screen. Used to stop the render loop for a canvas
 * nobody is looking at — an idle 3D scene is the most expensive thing on the
 * page and there is no reason to pay for it while scrolled past.
 */
export function useInView(ref: RefObject<Element | null>, rootMargin = '200px'): boolean {
  const [inView, setInView] = useState(true)

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
