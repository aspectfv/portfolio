import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group, PointLight } from 'three'
import { ambientActors, period } from '@/scenery/ambient'

const flame = ambientActors.experienceFlame

/** How much the fire grows while noticed. Held: it stays up until the pointer leaves. */
const FLARE = 1.25

/**
 * A brazier: an iron bowl on three legs, a fire in it, and the light it
 * throws. At night this is the light the outpost is seen by.
 *
 * The fire is three faceted cones, each on its own breath, so the flicker
 * reads as a fire rather than as one shape pulsing. The point light follows
 * the same breath, which is what makes the ground and the tower move with the
 * flame instead of sitting under a steady lamp.
 *
 * `noticed` is the Experience strip's Notice, held: the fire grows and the
 * light brightens while pointed at, eased both ways, and settles back when
 * the pointer leaves.
 */
export function Brazier({
  position = [0, 0, 0] as [number, number, number],
  rotation = 0,
  noticed = false,
  animate = true,
}) {
  const tongues = useRef<Group>(null)
  const light = useRef<PointLight>(null)
  const flare = useRef(1)

  useFrame((state, delta) => {
    const fire = tongues.current
    if (!fire || !light.current) return
    flare.current += ((noticed ? FLARE : 1) - flare.current) * (1 - Math.pow(0.002, delta))
    if (!animate) return
    const t = state.clock.getElapsedTime()
    const turn = (t * 2 * Math.PI) / period(flame)
    fire.children.forEach((tongue, index) => {
      const breath =
        1 +
        Math.sin(turn * (1 + index * 0.37) + index * 2.1) * 0.12 +
        Math.sin(t * 9.1 + index) * 0.05
      tongue.scale.set(
        flare.current * (1 - index * 0.04),
        flare.current * breath,
        flare.current * (1 - index * 0.04),
      )
      tongue.rotation.z = Math.sin(t * 2.3 + index * 1.7) * 0.06
    })
    light.current.intensity = 2.6 * flare.current + Math.sin(t * 6.7) * 0.25 + Math.sin(turn) * 0.2
  })

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Three legs, splayed */}
      {([0, 2.094, 4.189] as const).map((angle) => (
        <mesh
          key={angle}
          position={[Math.sin(angle) * 0.2, 0.19, Math.cos(angle) * 0.2]}
          rotation={[Math.cos(angle) * 0.28, 0, -Math.sin(angle) * 0.28]}
          castShadow
        >
          <boxGeometry args={[0.05, 0.4, 0.05]} />
          <meshStandardMaterial color="#3a3f4a" flatShading roughness={1} />
        </mesh>
      ))}

      {/* Bowl: a shallow six-sided dish, wider at the rim */}
      <mesh position={[0, 0.44, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.2, 0.2, 6]} />
        <meshStandardMaterial color="#4a505c" flatShading roughness={1} />
      </mesh>
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.34, 0.32, 0.04, 6]} />
        <meshStandardMaterial color="#3a3f4a" flatShading roughness={1} />
      </mesh>

      {/* Coals: a lit disc just inside the rim */}
      <mesh position={[0, 0.535, 0]}>
        <cylinderGeometry args={[0.27, 0.27, 0.05, 6]} />
        <meshStandardMaterial
          color="#c2401c"
          emissive="#ff6a2b"
          emissiveIntensity={0.9}
          roughness={1}
        />
      </mesh>

      {/* The fire: three tongues, each scaled from its base */}
      <group ref={tongues} position={[0, 0.56, 0]}>
        <group position={[0, 0, 0]}>
          <mesh position={[0, 0.26, 0]}>
            <coneGeometry args={[0.2, 0.52, 5]} />
            <meshStandardMaterial
              color="#ff7a2f"
              emissive="#ff8c3a"
              emissiveIntensity={1.6}
              roughness={1}
            />
          </mesh>
        </group>
        <group position={[0.08, 0, -0.06]}>
          <mesh position={[0, 0.2, 0]}>
            <coneGeometry args={[0.13, 0.4, 4]} />
            <meshStandardMaterial
              color="#ffb347"
              emissive="#ffc45a"
              emissiveIntensity={1.9}
              roughness={1}
            />
          </mesh>
        </group>
        <group position={[-0.09, 0, 0.07]}>
          <mesh position={[0, 0.15, 0]}>
            <coneGeometry args={[0.1, 0.3, 4]} />
            <meshStandardMaterial
              color="#ffe08a"
              emissive="#fff0b0"
              emissiveIntensity={2.2}
              roughness={1}
            />
          </mesh>
        </group>
      </group>

      <pointLight
        ref={light}
        position={[0, 0.9, 0]}
        color="#ff9e73"
        intensity={2.6}
        distance={6.5}
        decay={2}
      />
    </group>
  )
}
