import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'
import { type AmbientActor, period } from '@/scenery/ambient'

/**
 * A stream cut across a plateau, and a footbridge over it.
 *
 * The channel is a shallow trench in the plateau top with water sitting a
 * hair below the ground, banked in the rim's soil so the cut reads as a cut.
 * The glints on it brighten and dim on the shimmer actor's count, the same
 * Blink the pond carries. The bridge is five planks on two beams with a
 * little rise in the middle: the one thing in the yard that says the stream
 * is crossed rather than merely there.
 */
export function Stream({
  length = 7,
  width = 0.9,
  rotation = -0.35,
  actor,
  glints,
  bridgeAt = 0,
  animate = true,
}: {
  length?: number
  width?: number
  rotation?: number
  actor: AmbientActor
  /** Positions along the stream, -length/2 to length/2. */
  glints: readonly number[]
  bridgeAt?: number
  animate?: boolean
}) {
  const group = useRef<Group>(null)

  useFrame((state) => {
    const root = group.current
    if (!animate || !root) return
    const t = state.clock.getElapsedTime()
    const turn = (t * 2 * Math.PI) / period(actor)
    root.children.forEach((sliver, index) => {
      sliver.scale.x = 0.4 + Math.max(0, Math.sin(turn + index * 1.3)) * 0.9
    })
  })

  const planks = [-0.5, -0.25, 0, 0.25, 0.5] as const

  return (
    <group rotation={[0, rotation, 0]}>
      {/* Banks, a little proud of the plateau so the channel has an edge */}
      {([-1, 1] as const).map((side) => (
        <mesh key={side} position={[0, 0.03, side * (width / 2 + 0.09)]} castShadow receiveShadow>
          <boxGeometry args={[length, 0.06, 0.18]} />
          <meshStandardMaterial color="#a06a34" flatShading roughness={1} />
        </mesh>
      ))}
      {/* The trench and the water in it */}
      <mesh position={[0, -0.04, 0]}>
        <boxGeometry args={[length, 0.08, width]} />
        <meshStandardMaterial color="#7a4d31" flatShading roughness={1} />
      </mesh>
      <mesh position={[0, -0.03, 0]} receiveShadow>
        <boxGeometry args={[length - 0.02, 0.06, width - 0.06]} />
        <meshStandardMaterial color="#8fc3e6" flatShading roughness={0.6} />
      </mesh>
      <group ref={group}>
        {glints.map((x) => (
          <mesh key={x} position={[x, 0.004, (x % 0.7) * 0.4]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.2, 0.03]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.5}
              roughness={1}
            />
          </mesh>
        ))}
      </group>

      {/* The footbridge, across the stream at right angles to it */}
      <group position={[bridgeAt, 0, 0]}>
        {([-0.32, 0.32] as const).map((x) => (
          <mesh key={x} position={[x, 0.16, 0]} castShadow>
            <boxGeometry args={[0.08, 0.06, width + 0.7]} />
            <meshStandardMaterial color="#8a5a3b" flatShading roughness={1} />
          </mesh>
        ))}
        {planks.map((z) => (
          <mesh
            key={z}
            position={[0, 0.21 + (0.5 - Math.abs(z)) * 0.08, z * (width + 0.5)]}
            castShadow
          >
            <boxGeometry args={[0.8, 0.05, 0.22]} />
            <meshStandardMaterial
              color={Math.abs(z) === 0.25 ? '#b87b40' : '#c98a4b'}
              flatShading
              roughness={1}
            />
          </mesh>
        ))}
        {/* Posts at each end */}
        {([-1, 1] as const).flatMap((end) =>
          ([-0.36, 0.36] as const).map((x) => (
            <mesh key={`${end}:${x}`} position={[x, 0.2, end * (width / 2 + 0.35)]} castShadow>
              <boxGeometry args={[0.07, 0.4, 0.07]} />
              <meshStandardMaterial color="#6b4429" flatShading roughness={1} />
            </mesh>
          )),
        )}
      </group>
    </group>
  )
}
