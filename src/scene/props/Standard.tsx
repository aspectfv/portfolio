import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'
import { ambientActors, period } from '@/scenery/ambient'

const banner = ambientActors.experienceStandard

/**
 * A standard: a tall pole with a banner hung from a crossbar. The thing a
 * post is raised under, and the object that says somewhere was held rather
 * than passed through.
 *
 * The banner swings from the crossbar about the pole, on its own actor's
 * count. Wordless, like every drawn object: the pale band across it is the
 * shape of a device, not one.
 */
export function Standard({
  position = [0, 0, 0] as [number, number, number],
  rotation = 0,
  height = 2.7,
  animate = true,
}) {
  const cloth = useRef<Group>(null)

  useFrame((state) => {
    if (!animate || !cloth.current) return
    const t = state.clock.getElapsedTime()
    const swing = Math.sin((t * 2 * Math.PI) / period(banner)) * ((banner.rotation * Math.PI) / 180)
    cloth.current.rotation.y = swing
    cloth.current.rotation.x = swing * 0.4
  })

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Pole, with a footing so it does not read as pushed into the grass */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <boxGeometry args={[0.2, 0.1, 0.2]} />
        <meshStandardMaterial color="#4a505c" flatShading roughness={1} />
      </mesh>
      <mesh position={[0, height / 2, 0]} castShadow>
        <boxGeometry args={[0.07, height, 0.07]} />
        <meshStandardMaterial color="#6b4429" flatShading roughness={1} />
      </mesh>
      {/* Crossbar and finial */}
      <mesh position={[0.24, height - 0.06, 0]} castShadow>
        <boxGeometry args={[0.56, 0.05, 0.05]} />
        <meshStandardMaterial color="#6b4429" flatShading roughness={1} />
      </mesh>
      <mesh position={[0, height + 0.08, 0]} castShadow>
        <coneGeometry args={[0.06, 0.16, 4]} />
        <meshStandardMaterial color="#f7c948" flatShading roughness={1} />
      </mesh>

      {/* The banner hangs from the crossbar's outer half and swings from it */}
      <group ref={cloth} position={[0.3, height - 0.09, 0]}>
        <mesh position={[0, -0.42, 0]} castShadow>
          <boxGeometry args={[0.42, 0.84, 0.02]} />
          <meshStandardMaterial color="#c9401f" flatShading roughness={1} />
        </mesh>
        <mesh position={[0, -0.42, 0.012]}>
          <boxGeometry args={[0.42, 0.14, 0.008]} />
          <meshStandardMaterial color="#f5d9a8" flatShading roughness={1} />
        </mesh>
        {/* Swallow tail: two small dark wedges cut from the bottom edge */}
        <mesh position={[0, -0.88, 0]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.1, 0.12, 4]} />
          <meshStandardMaterial color="#c9401f" flatShading roughness={1} />
        </mesh>
      </group>
    </group>
  )
}
