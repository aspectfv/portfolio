import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, type RefObject } from 'react'
import { Vector3, type Object3D } from 'three'
import { useHostPointer } from './useHostPointer'

const projected = new Vector3()

/**
 * Whether the pointer is over one object in a view, within `radius` pixels of
 * where that object lands on screen.
 *
 * Projection rather than raycasting, on purpose. The canvas ignores the
 * pointer and R3F's event layer can only follow one tracking element at a
 * time, so a hit test through it is unreliable across several views. The
 * object's screen position is one matrix multiply per frame, and a circle
 * around it is a better hit area for a small figure than its own silhouette:
 * the traveller is a few pixels wide on a phone, and a fingertip needs
 * somewhere to land.
 *
 * Returned as state so the object can react in render, and `onEnter` fires on
 * the rising edge only, which is the beat the achievement is for.
 */
export function useSpot(
  host: RefObject<HTMLElement | null>,
  target: RefObject<Object3D | null>,
  { radius, onEnter }: { radius: number; onEnter?: (() => void) | undefined },
): boolean {
  const pointer = useHostPointer(host)
  const camera = useThree((state) => state.camera)
  const [over, setOver] = useState(false)
  const was = useRef(false)

  useFrame(() => {
    const object = target.current
    const current = pointer.current
    let hit = false
    if (object && current.over && current.width && current.height) {
      object.getWorldPosition(projected).project(camera)
      const dx = ((projected.x - current.x) / 2) * current.width
      const dy = ((projected.y - current.y) / 2) * current.height
      hit = dx * dx + dy * dy < radius * radius
    }
    if (hit === was.current) return
    was.current = hit
    setOver(hit)
    if (hit) onEnter?.()
  })

  return over
}
