import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { MeshStandardMaterial } from 'three'

/**
 * An arcade cabinet, standing beside the desk.
 *
 * This is the object that carries the whole positioning: a workstation alone
 * reads "developer", and a workstation with a cabinet next to it reads
 * "developer who makes games". It is identity rather than decoration, which is
 * why it survives into the compact composition while density props do not.
 *
 * Built from boxes rather than sourced, for the same reason the desk is: every
 * man-made object here is code and every organic one comes from the kit, so a
 * cabinet from a different kit would arrive with different proportions and read
 * as imported.
 */
export function ArcadeCabinet({
  position = [0, 0, 0] as [number, number, number],
  rotation = 0,
  scale = 1,
  animate = true,
}) {
  const screen = useRef<MeshStandardMaterial>(null)

  // The attract-mode blink: the one ambient detail on the island that is not
  // motion. Slow and low-contrast on purpose; a fast blink beside body copy is
  // an accessibility problem, not charm.
  useFrame((state) => {
    const material = screen.current
    if (!animate || !material) return
    const t = state.clock.getElapsedTime()
    material.emissiveIntensity = 0.45 + Math.sin(t * 1.6) * 0.12
  })

  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      {/* Body */}
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.42, 0.84, 0.34]} />
        <meshStandardMaterial color="#d2453a" flatShading roughness={1} />
      </mesh>

      {/* Marquee, the lit header panel */}
      <mesh position={[0, 0.9, 0.02]} castShadow>
        <boxGeometry args={[0.44, 0.14, 0.3]} />
        <meshStandardMaterial color="#f7c948" flatShading roughness={1} />
      </mesh>

      {/* Screen, recessed and angled back */}
      <mesh position={[0, 0.66, 0.172]} rotation={[-0.18, 0, 0]}>
        <planeGeometry args={[0.3, 0.22]} />
        <meshStandardMaterial
          ref={screen}
          color="#2f8fd8"
          emissive="#6fd3f2"
          emissiveIntensity={0.45}
          roughness={1}
        />
      </mesh>

      {/* Control deck */}
      <mesh position={[0, 0.5, 0.22]} rotation={[0.32, 0, 0]} castShadow>
        <boxGeometry args={[0.42, 0.05, 0.18]} />
        <meshStandardMaterial color="#3a2f46" flatShading roughness={1} />
      </mesh>

      {/* Stick and two buttons */}
      <mesh position={[-0.11, 0.55, 0.235]} castShadow>
        <cylinderGeometry args={[0.014, 0.014, 0.09, 6]} />
        <meshStandardMaterial color="#1d1a26" flatShading roughness={1} />
      </mesh>
      <mesh position={[-0.11, 0.6, 0.235]} castShadow>
        <sphereGeometry args={[0.028, 8, 6]} />
        <meshStandardMaterial color="#e8552b" flatShading roughness={1} />
      </mesh>
      {([0.04, 0.11] as const).map((x) => (
        <mesh key={x} position={[x, 0.545, 0.238]} rotation={[0.32, 0, 0]} castShadow>
          <cylinderGeometry args={[0.026, 0.026, 0.02, 6]} />
          <meshStandardMaterial color="#f7c948" flatShading roughness={1} />
        </mesh>
      ))}

      {/* Base plinth */}
      <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.46, 0.08, 0.38]} />
        <meshStandardMaterial color="#8f2f28" flatShading roughness={1} />
      </mesh>
    </group>
  )
}
