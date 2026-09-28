import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'
import { type AmbientActor, period } from '@/scenery/ambient'

/**
 * A pond: the plateau's cousin whose top is water.
 *
 * The same faceted chunk every other place stands on, with the surface in
 * the band's own blue and a stone rim under it, so the dock and its boat sit
 * in one object with a silhouette rather than on a sheet of water that has
 * to end somewhere. What says water is the glints, a scatter of small pale
 * slivers that brighten and dim on the shimmer actor's count, each on its
 * own phase. That is the Blink pattern in three dimensions.
 */
export function Water({
  radius = 3,
  stretch = [1, 1] as readonly [number, number],
  actor,
  glints,
  color = '#8fc3e6',
  glint = '#ffffff',
  rim = '#6e7787',
  rotation = 0.3,
  animate = true,
}: {
  radius?: number
  stretch?: readonly [number, number]
  actor: AmbientActor
  glints: readonly (readonly [number, number])[]
  color?: string
  glint?: string
  rim?: string
  rotation?: number
  animate?: boolean
}) {
  const group = useRef<Group>(null)

  useFrame((state) => {
    const root = group.current
    if (!animate || !root) return
    const t = state.clock.getElapsedTime()
    const turn = (t * 2 * Math.PI) / period(actor)
    root.children.forEach((sliver, index) => {
      sliver.scale.x = 0.4 + Math.max(0, Math.sin(turn + index * 1.1)) * 0.9
    })
  })

  return (
    <group>
      <group rotation={[0, rotation, 0]} scale={[stretch[0], 1, stretch[1]]}>
        <mesh position={[0, -0.09, 0]} receiveShadow>
          <cylinderGeometry args={[radius, radius * 0.96, 0.18, 8]} />
          <meshStandardMaterial color={color} flatShading roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.34, 0]}>
          <cylinderGeometry args={[radius * 0.96, radius * 0.8, 0.32, 8]} />
          <meshStandardMaterial color={rim} flatShading roughness={1} />
        </mesh>
      </group>
      <group ref={group}>
        {glints.map(([x, z]) => (
          <mesh key={`${x}:${z}`} position={[x, 0.012, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.22, 0.035]} />
            <meshStandardMaterial
              color={glint}
              emissive={glint}
              emissiveIntensity={0.5}
              roughness={1}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}
