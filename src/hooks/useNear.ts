import { useEffect, useState, type RefObject } from 'react'

/**
 * Whether an element has ever come near the viewport. Latches: once true, it
 * stays true and the observer is dropped.
 *
 * For work that should start on approach and then stay done, like mounting a
 * scene. `useInView` answers the live question; this one answers "has the
 * visitor been here", which is what decides whether to pay a one-time cost.
 */
export function useNear(ref: RefObject<Element | null>, rootMargin = '200px'): boolean {
  const [near, setNear] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setNear(true)
        observer.disconnect()
      },
      { rootMargin },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  return near
}
