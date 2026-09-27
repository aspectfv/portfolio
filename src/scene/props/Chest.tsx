import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'

/**
 * A small treasure chest, closed.
 *
 * Closed rather than open, and holding nothing: an open chest spilling coins
 * would imply a reward the site does not give, and this scene may not carry
 * information. It is here because the interface already uses a chest glyph for
 * the inventory, so putting the object in the world makes the two halves of the
 * design read as one place.
 *
 * The lid is hinged at the back. `open` lifts it a little and it settles back
 * when released: the Skills strip's Notice, one-shot, and what it shows when
 * it lifts is the inside of an empty lid.
 */
export function Chest({
  position = [0, 0, 0] as [number, number, number],
  rotation = 0,
  scale = 1,
  open = false,
}) {
  const lid = useRef<Group>(null)
  const lift = useRef(0)

  useFrame((_, delta) => {
    const hinge = lid.current
    if (!hinge) return
    lift.current += ((open ? 1 : 0) - lift.current) * (1 - Math.pow(0.001, delta))
    hinge.rotation.x = -lift.current * 0.55
  })

  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      {/* Body */}
      <mesh position={[0, 0.09, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.34, 0.18, 0.24]} />
        <meshStandardMaterial color="#8a5a3b" flatShading roughness={1} />
      </mesh>

      {/* Lid, a half cylinder lying on its side, hinged along the back edge */}
      <group ref={lid} position={[0, 0.18, -0.12]}>
        <mesh position={[0, 0, 0.12]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.34, 6, 1, false, 0, Math.PI]} />
          <meshStandardMaterial color="#a9683f" flatShading roughness={1} side={2} />
        </mesh>
      </group>

      {/* Bands and clasp */}
      <mesh position={[0, 0.12, 0.121]} castShadow>
        <boxGeometry args={[0.05, 0.2, 0.01]} />
        <meshStandardMaterial color="#f7c948" flatShading roughness={1} />
      </mesh>
    </group>
  )
}
