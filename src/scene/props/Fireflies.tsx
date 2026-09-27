import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group, Mesh, MeshStandardMaterial } from 'three'
import { type AmbientActor, period } from '@/scenery/ambient'

/**
 * Fireflies, for the hours after the sun goes: a handful of points of warm
 * light drifting slow figure-eights around where they started, each pulsing
 * on its own count. One actor, however many there are; the drift radius is
 * the actor's travel and nothing here ever moves further than that.
 */
export function Fireflies({
  actor,
  spots,
  px,
  color = '#f7c948',
  animate = true,
}: {
  actor: AmbientActor
  spots: readonly (readonly [number, number, number])[]
  /** Pixels per world unit at the strip's desktop capture. */
  px: number
  color?: string
  animate?: boolean
}) {
  const group = useRef<Group>(null)

  useFrame((state) => {
    const root = group.current
    if (!animate || !root || actor.travel === null) return
    const t = state.clock.getElapsedTime()
    const radius = actor.travel / px
    const turn = (t * 2 * Math.PI) / period(actor)
    root.children.forEach((fly, index) => {
      const base = spots[index]
      if (!base) return
      const angle = turn + index * 1.9
      fly.position.set(
        base[0] + Math.sin(angle) * radius,
        base[1] + Math.sin(angle * 2) * radius * 0.5,
        base[2] + Math.cos(angle) * radius * 0.6,
      )
      const material = (fly as Mesh).material as MeshStandardMaterial
      material.emissiveIntensity = 0.6 + Math.max(0, Math.sin(t * 1.7 + index * 2.3)) * 1.6
    })
  })

  return (
    <group ref={group}>
      {spots.map(([x, y, z]) => (
        <mesh key={`${x}:${y}:${z}`} position={[x, y, z]}>
          <icosahedronGeometry args={[0.025, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1}
            roughness={1}
          />
        </mesh>
      ))}
    </group>
  )
}
