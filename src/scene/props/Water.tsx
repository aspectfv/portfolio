import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'
import { type AmbientActor, period } from '@/scenery/ambient'

/**
 * Open water, and the light on it.
 *
 * The surface is one flat plane; what says water is the glints, a scatter of
 * small pale slivers that brighten and dim on the shimmer actor's count, each
 * on its own phase. That is the Blink pattern in three dimensions, and it
 * costs nothing on the main thread.
 */
export function Water({
  size,
  actor,
  glints,
  color = '#4fa9d8',
  glint = '#dff0fa',
  position = [0, 0, 0] as [number, number, number],
  animate = true,
}: {
  size: readonly [number, number]
  actor: AmbientActor
  glints: readonly (readonly [number, number])[]
  color?: string
  glint?: string
  position?: [number, number, number]
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
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[size[0], size[1]]} />
        <meshStandardMaterial color={color} flatShading roughness={0.6} />
      </mesh>
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
