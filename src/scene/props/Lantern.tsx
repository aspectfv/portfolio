import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { MeshStandardMaterial, PointLight } from 'three'
import { type AmbientActor, period } from '@/scenery/ambient'

/**
 * A lantern on a post: a cage with a lit pane, and the light it throws.
 *
 * `level` is how lit it is, 0 to 1, and it is eased toward rather than
 * switched, so a lantern that a visitor notices comes up and goes down rather
 * than flicking. With a `flicker` actor the flame breathes on that actor's
 * rhythm; without one it holds steady. The point light is real: at golden
 * hour, night and dusk it is one of the few things lighting the ground, which
 * is what makes a lit object read as lit instead of merely bright.
 */
export function Lantern({
  position = [0, 0, 0] as [number, number, number],
  height = 1.1,
  level = 1,
  flicker,
  color = '#f7c948',
  power = 2.2,
  animate = true,
}: {
  position?: [number, number, number]
  height?: number
  level?: number
  flicker?: AmbientActor
  color?: string
  /** Point light intensity at level 1. */
  power?: number
  animate?: boolean
}) {
  const pane = useRef<MeshStandardMaterial>(null)
  const light = useRef<PointLight>(null)
  const glow = useRef(level)

  useFrame((state, delta) => {
    if (!pane.current || !light.current) return
    glow.current += (level - glow.current) * (1 - Math.pow(0.002, delta))
    const t = state.clock.getElapsedTime()
    const breath =
      animate && flicker
        ? Math.sin((t * 2 * Math.PI) / period(flicker)) * 0.08 + Math.sin(t * 7.3) * 0.04
        : 0
    const lit = Math.max(0, glow.current + breath)
    pane.current.emissiveIntensity = 0.15 + lit * 1.6
    light.current.intensity = lit * power
  })

  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]} castShadow>
        <boxGeometry args={[0.06, height, 0.06]} />
        <meshStandardMaterial color="#6b4429" flatShading roughness={1} />
      </mesh>
      {/* Arm and hook */}
      <mesh position={[0.12, height - 0.04, 0]} castShadow>
        <boxGeometry args={[0.24, 0.04, 0.04]} />
        <meshStandardMaterial color="#6b4429" flatShading roughness={1} />
      </mesh>
      <group position={[0.22, height - 0.2, 0]}>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.02, 0.1, 0.02]} />
          <meshStandardMaterial color="#3a2f46" flatShading roughness={1} />
        </mesh>
        {/* Cap and base of the cage */}
        <mesh position={[0, 0.04, 0]} castShadow>
          <coneGeometry args={[0.1, 0.06, 4]} />
          <meshStandardMaterial color="#3a2f46" flatShading roughness={1} />
        </mesh>
        <mesh position={[0, -0.14, 0]}>
          <boxGeometry args={[0.14, 0.02, 0.14]} />
          <meshStandardMaterial color="#3a2f46" flatShading roughness={1} />
        </mesh>
        {/* The pane, lit from inside */}
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[0.11, 0.16, 0.11]} />
          <meshStandardMaterial
            ref={pane}
            color={color}
            emissive={color}
            emissiveIntensity={1}
            roughness={1}
          />
        </mesh>
        <pointLight
          ref={light}
          position={[0, -0.05, 0]}
          color={color}
          intensity={power}
          distance={4.5}
          decay={2}
        />
      </group>
    </group>
  )
}
