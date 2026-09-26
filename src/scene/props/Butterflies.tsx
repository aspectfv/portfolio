import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'
import { ambientActors, period } from '@/scenery/ambient'

const butterflies = ambientActors.aboutButterflies

/** Pixels per world unit at the ground, at the desktop capture. */
const PX = 75

/**
 * Two butterflies over the flowers. One actor: they drift a small circle at
 * the same slow rate, offset by half a turn, and flap as they go.
 *
 * The circle is the amplitude bound, so the drift is a few pixels; the flap
 * is a wing rotation on a tiny object and reads as life rather than as
 * motion. Both are the kind of thing a visitor notices without being able to
 * say what moved.
 */
const perches = [
  { at: [-1.1, 0.55, 0.85] as const, tint: '#f7c948', phase: 0 },
  { at: [1.65, 0.6, 0.95] as const, tint: '#e8552b', phase: Math.PI },
]

export function Butterflies({ animate = true }) {
  const group = useRef<Group>(null)

  useFrame((state) => {
    const root = group.current
    if (!animate || !root) return
    const t = state.clock.getElapsedTime()
    const radius = butterflies.travel / PX
    const turn = (t * 2 * Math.PI) / period(butterflies)
    root.children.forEach((butterfly, index) => {
      const perch = perches[index]
      if (!perch) return
      const angle = turn + perch.phase
      butterfly.position.set(
        perch.at[0] + Math.cos(angle) * radius,
        perch.at[1] + Math.sin(angle * 2) * radius * 0.4,
        perch.at[2] + Math.sin(angle) * radius,
      )
      butterfly.rotation.y = -angle
      const flap = Math.sin(t * 9 + perch.phase) * 0.7
      const [left, right] = butterfly.children
      if (left) left.rotation.z = flap
      if (right) right.rotation.z = -flap
    })
  })

  return (
    <group ref={group}>
      {perches.map((perch) => (
        <group key={perch.tint} position={[...perch.at]}>
          <mesh position={[-0.03, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.06, 0.05]} />
            <meshStandardMaterial color={perch.tint} flatShading roughness={1} side={2} />
          </mesh>
          <mesh position={[0.03, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.06, 0.05]} />
            <meshStandardMaterial color={perch.tint} flatShading roughness={1} side={2} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
