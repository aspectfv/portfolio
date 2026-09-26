import { useEffect, useRef, type RefObject } from 'react'

export type HostPointer = {
  /** Normalised device coordinates over the strip, -1 to 1, y up. */
  x: number
  y: number
  /** The strip's box at the last event, so a radius can be measured in pixels. */
  width: number
  height: number
  over: boolean
}

/**
 * Where the pointer is over the strip, read off the strip element itself.
 *
 * The shared canvas ignores the pointer, so R3F's own pointer state never
 * updates for a view. The strip is the surface a visitor actually touches, and
 * a tap is a pointerdown with no move before it, so that updates the position
 * too; on a phone the last mouse position is nowhere at all.
 */
export function useHostPointer(host: RefObject<HTMLElement | null>): RefObject<HostPointer> {
  const pointer = useRef<HostPointer>({ x: 0, y: 0, width: 0, height: 0, over: false })

  useEffect(() => {
    const element = host.current
    if (!element) return

    const move = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const current = pointer.current
      current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      current.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
      current.width = rect.width
      current.height = rect.height
      current.over = true
    }
    const leave = () => {
      pointer.current.over = false
    }

    element.addEventListener('pointermove', move)
    element.addEventListener('pointerdown', move)
    element.addEventListener('pointerleave', leave)
    return () => {
      element.removeEventListener('pointermove', move)
      element.removeEventListener('pointerdown', move)
      element.removeEventListener('pointerleave', leave)
    }
  }, [host])

  return pointer
}
