import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'
import { type AmbientActor, period } from '@/scenery/ambient'

/**
 * Small things rising and fading: leaves over a meadow, dust over sand,
 * embers and smoke off a fire. A Rise loop, continuous and slow, never a
 * burst. docs/DESIGN.md forbids the particle that fires because something
 * happened, and permits the one that has been running whether or not anybody
 * is watching.
 *
 * Each spot is one particle's start; the actor's travel is how far it climbs
 * before it is gone, and the spots are staggered so no two rise together. A
 * flake is a plane that tumbles as it goes; a puff is a faceted ball that
 * swells instead. Both scale to nothing at either end, so no transparency is
 * needed and nothing pops.
 */
export function Rise({
  actor,
  spots,
  px,
  size,
  color,
  emissive,
  puff = false,
  animate = true,
}: {
  actor: AmbientActor
  spots: readonly (readonly [number, number, number])[]
  /** Pixels per world unit at the strip's desktop capture. */
  px: number
  size: number
  color: string
  emissive?: string
  puff?: boolean
  animate?: boolean
}) {
  const group = useRef<Group>(null)

  useFrame((state) => {
    const root = group.current
    if (!animate || !root || actor.travel === null) return
    const t = state.clock.getElapsedTime()
    const seconds = period(actor)
    const travel = actor.travel / px
    root.children.forEach((particle, index) => {
      const base = spots[index]
      if (!base) return
      const phase = ((t + index * 1.37) % seconds) / seconds
      particle.position.y = base[1] + phase * travel
      const fade = Math.sin(phase * Math.PI)
      if (puff) {
        particle.scale.setScalar(fade * (0.6 + phase * 0.8))
        particle.position.x = base[0] + Math.sin(phase * Math.PI * 2 + index) * 0.04
      } else {
        particle.rotation.y = phase * Math.PI * 2
        particle.rotation.x = 0.4 + Math.sin(phase * Math.PI * 4) * 0.3
        particle.scale.setScalar(fade)
      }
    })
  })

  return (
    <group ref={group}>
      {spots.map(([x, y, z]) => (
        <mesh key={`${x}:${y}:${z}`} position={[x, y, z]}>
          {puff ? (
            <icosahedronGeometry args={[size, 0]} />
          ) : (
            <planeGeometry args={[size, size * 0.8]} />
          )}
          <meshStandardMaterial
            color={color}
            flatShading
            roughness={1}
            side={2}
            {...(emissive ? { emissive, emissiveIntensity: 1.4 } : {})}
          />
        </mesh>
      ))}
    </group>
  )
}
