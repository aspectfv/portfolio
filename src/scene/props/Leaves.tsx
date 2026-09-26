import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'
import { ambientActors, period } from '@/scenery/ambient'

const leaves = ambientActors.aboutLeaves

/** Pixels per world unit at the ground, at the desktop capture. */
const PX = 75

/**
 * Leaves adrift over the meadow: a Rise loop, continuous and slow, never a
 * burst. docs/DESIGN.md forbids the particle that fires because something
 * happened, and permits the one that has been running whether or not anybody
 * is watching.
 *
 * Each leaf is one actor's worth of travel, spread across the strip and
 * staggered so no two rise together. They fade at the top rather than
 * wrapping visibly.
 */
const spots = [
  [-3.1, 0.5, 0.2],
  [-2.0, 0.9, 0.9],
  [-0.9, 0.7, -0.8],
  [0.3, 1.1, 0.6],
  [1.4, 0.6, 1.0],
  [2.3, 1.0, -0.5],
  [3.2, 0.7, 0.4],
  [-1.4, 1.3, 1.3],
] as const

export function Leaves({ animate = true }) {
  const group = useRef<Group>(null)

  useFrame((state) => {
    const root = group.current
    if (!animate || !root) return
    const t = state.clock.getElapsedTime()
    const seconds = period(leaves)
    const travel = leaves.travel / PX
    root.children.forEach((leaf, index) => {
      const phase = ((t + index * 1.37) % seconds) / seconds
      const base = spots[index]
      if (!base) return
      leaf.position.y = base[1] + phase * travel
      leaf.rotation.y = phase * Math.PI * 2
      leaf.rotation.x = 0.4 + Math.sin(phase * Math.PI * 4) * 0.3
      leaf.scale.setScalar(Math.sin(phase * Math.PI))
    })
  })

  return (
    <group ref={group}>
      {spots.map(([x, y, z]) => (
        <mesh key={`${x}:${z}`} position={[x, y, z]}>
          <planeGeometry args={[0.09, 0.07]} />
          <meshStandardMaterial color="#4e9c41" flatShading roughness={1} side={2} />
        </mesh>
      ))}
    </group>
  )
}
