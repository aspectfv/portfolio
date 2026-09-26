import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'
import { ambientActors, period } from '@/scenery/ambient'

const pennant = ambientActors.aboutPennant

/**
 * The trailhead: a board where the route starts, and the pack set down beside
 * it. A board at the start of a trail is where you find out who you are
 * following.
 *
 * Wordless, like every other prop. The two pale slabs on the board are the
 * shape of writing, not writing; the scene may not carry information.
 */
export function Trailhead({
  position = [0, 0, 0] as [number, number, number],
  rotation = 0,
  animate = true,
}) {
  const flag = useRef<Group>(null)

  useFrame((state) => {
    if (!animate || !flag.current) return
    const t = state.clock.getElapsedTime()
    flag.current.rotation.y =
      Math.sin((t * 2 * Math.PI) / period(pennant)) * ((pennant.rotation * Math.PI) / 180)
  })

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Posts */}
      {([-0.3, 0.3] as const).map((x) => (
        <mesh key={x} position={[x, 0.5, 0]} castShadow>
          <boxGeometry args={[0.08, 1.0, 0.08]} />
          <meshStandardMaterial color="#6b4429" flatShading roughness={1} />
        </mesh>
      ))}

      {/* Board, proud of the posts so no face is shared with them. */}
      <mesh position={[0, 0.78, 0.06]} castShadow>
        <boxGeometry args={[0.84, 0.4, 0.06]} />
        <meshStandardMaterial color="#c98a4b" flatShading roughness={1} />
      </mesh>
      <mesh position={[0, 0.58, 0.061]} castShadow>
        <boxGeometry args={[0.84, 0.06, 0.062]} />
        <meshStandardMaterial color="#a06a34" flatShading roughness={1} />
      </mesh>
      {/* The shape of writing */}
      <mesh position={[-0.14, 0.84, 0.095]}>
        <boxGeometry args={[0.36, 0.09, 0.012]} />
        <meshStandardMaterial color="#e8cf9c" flatShading roughness={1} />
      </mesh>
      <mesh position={[0.1, 0.7, 0.095]}>
        <boxGeometry args={[0.5, 0.06, 0.012]} />
        <meshStandardMaterial color="#c4a670" flatShading roughness={1} />
      </mesh>

      {/* Pennant on the left post, swinging about the post. */}
      <group ref={flag} position={[-0.3, 1.06, 0]}>
        <mesh position={[0, 0.06, 0]} castShadow>
          <boxGeometry args={[0.03, 0.22, 0.03]} />
          <meshStandardMaterial color="#6b4429" flatShading roughness={1} />
        </mesh>
        <mesh position={[0.13, 0.1, 0]} castShadow>
          <boxGeometry args={[0.24, 0.12, 0.012]} />
          <meshStandardMaterial color="#e8552b" flatShading roughness={1} />
        </mesh>
      </group>

      {/* The pack, set down at the foot of the board, with the bedroll on top. */}
      <group position={[0.62, 0, 0.28]} rotation={[0, 0.5, 0]}>
        <mesh position={[0, 0.14, 0]} castShadow>
          <boxGeometry args={[0.26, 0.28, 0.18]} />
          <meshStandardMaterial color="#8a5a3b" flatShading roughness={1} />
        </mesh>
        <mesh position={[0, 0.16, 0.091]}>
          <boxGeometry args={[0.26, 0.05, 0.012]} />
          <meshStandardMaterial color="#c4a670" flatShading roughness={1} />
        </mesh>
        <mesh position={[0, 0.33, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 0.3, 6]} />
          <meshStandardMaterial color="#e8cf9c" flatShading roughness={1} />
        </mesh>
      </group>
    </group>
  )
}
