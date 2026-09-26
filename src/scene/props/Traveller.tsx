import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'

/** One wave, raise and return, in seconds. Inside the second Notice allows. */
const WAVE = 0.8

/**
 * The one person in the world, standing by the trailhead where the route
 * starts. The seated figure at the dock, where it ends, arrives with that strip.
 *
 * Twice is the rule rather than an accident of the current layout. A figure on
 * every band is a mascot, and a mascot is the shortest route to the
 * template-with-game-assets look docs/PRODUCT.md forbids outright.
 *
 * Boxes, with a pivot at the shoulder so the wave is a rotation about the
 * joint rather than a second model. The tunic is ember because it is the one
 * hue that appears on no ground in the world palette, which is what keeps a
 * small figure findable on grass, on timber and on a pale dock.
 *
 * Static until noticed. A character who is still until you arrive and then
 * greets you is the cozy beat; one who breathes gently and ignores you is
 * furniture.
 */
export function Traveller({ waving = false }: { waving?: boolean }) {
  const arm = useRef<Group>(null)
  const started = useRef<number | null>(null)
  const armed = useRef(false)

  // One-shot: the rising edge starts a wave, and the wave plays through to rest
  // whether or not the pointer is still there. A traveller who waves for as
  // long as the cursor rests on them reads as a bug.
  useFrame((state) => {
    const joint = arm.current
    if (!joint) return
    const now = state.clock.getElapsedTime()
    if (waving && !armed.current) {
      armed.current = true
      started.current = now
    }
    if (!waving) armed.current = false

    if (started.current === null) return
    const progress = (now - started.current) / WAVE
    if (progress >= 1) {
      started.current = null
      joint.rotation.z = 0
      return
    }
    // Up over the first third, two shakes, then down; ease with a half sine so
    // the arm arrives at rest rather than stopping.
    const lift = Math.sin(progress * Math.PI) * 2.4
    const shake = progress > 0.3 && progress < 0.8 ? Math.sin(progress * Math.PI * 8) * 0.25 : 0
    joint.rotation.z = lift + shake
  })

  return (
    <group>
      {/* Legs */}
      {([-0.07, 0.07] as const).map((x) => (
        <mesh key={x} position={[x, 0.14, 0]} castShadow>
          <boxGeometry args={[0.1, 0.28, 0.1]} />
          <meshStandardMaterial color="#6b4429" flatShading roughness={1} />
        </mesh>
      ))}

      {/* Tunic */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <boxGeometry args={[0.3, 0.34, 0.18]} />
        <meshStandardMaterial color="#e8552b" flatShading roughness={1} />
      </mesh>

      {/* Far arm, at rest */}
      <mesh position={[-0.19, 0.44, 0]} castShadow>
        <boxGeometry args={[0.08, 0.3, 0.08]} />
        <meshStandardMaterial color="#8a5a3b" flatShading roughness={1} />
      </mesh>

      {/* Near arm. The pivot is the shoulder: the corner where the arm meets
          the body. About its own centre it swings free of the shoulder and
          reads as a stick thrown in the air. */}
      <group ref={arm} position={[0.19, 0.6, 0]}>
        <mesh position={[0, -0.15, 0]} castShadow>
          <boxGeometry args={[0.08, 0.3, 0.08]} />
          <meshStandardMaterial color="#8a5a3b" flatShading roughness={1} />
        </mesh>
      </group>

      {/* Head and hat */}
      <mesh position={[0, 0.73, 0]} castShadow>
        <boxGeometry args={[0.22, 0.22, 0.2]} />
        <meshStandardMaterial color="#e8cf9c" flatShading roughness={1} />
      </mesh>
      <mesh position={[0, 0.9, 0]} castShadow>
        <coneGeometry args={[0.2, 0.18, 5]} />
        <meshStandardMaterial color="#c98a4b" flatShading roughness={1} />
      </mesh>
    </group>
  )
}
