import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, type RefObject } from 'react'
import type { Group } from 'three'
import { useHostPointer } from './useHostPointer'

/** Rotation ceiling for pointer parallax; a few pixels of apparent shift, no more. */
const PARALLAX = 0.075

/**
 * The tap nudge, as a spring the group settles out of.
 *
 * A tap gives the group an impulse toward the tap point; the spring takes it
 * from there and parks it back on its idle inside about a second. `IMPULSE` is
 * an angular velocity, so the peak lean it produces is roughly
 * IMPULSE / sqrt(STIFFNESS), about eight degrees.
 */
const IMPULSE = 0.9
const STIFFNESS = 42
const DAMPING = 7

/**
 * The three things a place does: it idles, it leans toward a fine pointer, and
 * it wobbles when tapped. Shared by every strip whose focal object floats.
 *
 * Idle is driven by the clock so the motion is frame-rate independent: the
 * island floats at the same speed at 30fps and 120fps. `bob` and `yaw` are the
 * peak travel and rotation, recorded in the ambient roster against the
 * amplitude bound.
 */
export function useDiorama(
  host: RefObject<HTMLElement | null>,
  {
    active,
    parallax,
    bob,
    yaw,
    period,
  }: {
    active: boolean
    parallax: boolean
    bob: number
    yaw: number
    /** Seconds for one bob; the yaw runs at a slower, unrelated rhythm. */
    period: number
  },
): RefObject<Group | null> {
  const group = useRef<Group>(null)
  const pointer = useHostPointer(host)
  /** The eased parallax lean, held apart from the nudge so neither erases the other. */
  const lean = useRef({ yaw: 0, pitch: 0 })
  const nudge = useRef({ yaw: 0, pitch: 0, yawRate: 0, pitchRate: 0 })

  useEffect(() => {
    const element = host.current
    if (!element) return
    const push = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
      nudge.current.yawRate += x * IMPULSE
      nudge.current.pitchRate += -y * IMPULSE * 0.6
    }
    element.addEventListener('pointerdown', push)
    return () => element.removeEventListener('pointerdown', push)
  }, [host])

  useFrame((state, delta) => {
    const node = group.current
    if (!active || !node) return

    const t = state.clock.getElapsedTime()
    node.position.y = Math.sin((t * 2 * Math.PI) / period) * bob
    const idleYaw = Math.sin(t * 0.22) * yaw

    // Parallax eases toward the pointer instead of tracking it exactly, so a
    // fast mouse move reads as the object leaning rather than snapping.
    const leaning = parallax && pointer.current.over
    const targetYaw = idleYaw + (leaning ? pointer.current.x * PARALLAX : 0)
    const targetPitch = leaning ? -pointer.current.y * PARALLAX * 0.6 : 0
    const ease = 1 - Math.pow(0.001, delta)
    lean.current.yaw += (targetYaw - lean.current.yaw) * ease
    lean.current.pitch += (targetPitch - lean.current.pitch) * ease

    // The nudge, integrated as a damped spring. Clamped so a tab that was
    // backgrounded mid-wobble does not resume with one enormous step.
    const step = Math.min(delta, 1 / 30)
    const push = nudge.current
    push.yaw += push.yawRate * step
    push.yawRate += (-STIFFNESS * push.yaw - DAMPING * push.yawRate) * step
    push.pitch += push.pitchRate * step
    push.pitchRate += (-STIFFNESS * push.pitch - DAMPING * push.pitchRate) * step

    node.rotation.y = lean.current.yaw + push.yaw
    node.rotation.x = lean.current.pitch + push.pitch
  })

  return group
}
