import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'

/** One wave, raise and return, in seconds. Inside the second Notice allows. */
const WAVE = 0.8

const materials = {
  boot: '#6b4429',
  tunic: '#e8552b',
  skin: '#e8cf9c',
  sleeve: '#8a5a3b',
  hat: '#c98a4b',
} as const

/**
 * The one person in the world, built twice: standing by the trailhead where
 * the route starts, seated at the dock where it ends.
 *
 * Twice is the rule rather than an accident of the current layout. A figure on
 * every band is a mascot, and a mascot is the shortest route to the
 * template-with-game-assets look docs/PRODUCT.md forbids outright.
 *
 * Boxes, with a pivot at the shoulder so the wave is a rotation about the
 * joint rather than a second model, and a bend at the hip and the knee so the
 * seated pose is the same figure sat down. Standing puts the feet on y=0;
 * seated puts the surface being sat on at y=0 and hangs the lower legs below
 * it, so a host places the figure on a deck edge by putting 0 on the deck.
 *
 * The tunic is ember because it is the one hue that appears on no ground in
 * the world palette, which is what keeps a small figure findable on grass, on
 * timber and on a pale dock.
 *
 * Static until noticed. A character who is still until you arrive and then
 * greets you is the cozy beat; one who breathes gently and ignores you is
 * furniture.
 */
export function Traveller({
  pose = 'standing',
  waving = false,
}: {
  pose?: 'standing' | 'seated'
  /** Standing only: the near arm lifts and waves once on the rising edge. */
  waving?: boolean
}) {
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

  const seated = pose === 'seated'
  // Seated, the hips sit on the surface, so the torso starts at 0 instead of
  // on top of standing legs.
  const hip = seated ? 0 : 0.28

  return (
    <group>
      {seated
        ? // Thighs forward along +z, shins hanging from the knee.
          ([-0.07, 0.07] as const).map((x) => (
            <group key={x} position={[x, 0.05, 0]}>
              <mesh position={[0, 0, 0.13]} castShadow>
                <boxGeometry args={[0.1, 0.1, 0.26]} />
                <meshStandardMaterial color={materials.boot} flatShading roughness={1} />
              </mesh>
              <mesh position={[0, -0.13, 0.22]} castShadow>
                <boxGeometry args={[0.1, 0.24, 0.1]} />
                <meshStandardMaterial color={materials.boot} flatShading roughness={1} />
              </mesh>
            </group>
          ))
        : ([-0.07, 0.07] as const).map((x) => (
            <mesh key={x} position={[x, 0.14, 0]} castShadow>
              <boxGeometry args={[0.1, 0.28, 0.1]} />
              <meshStandardMaterial color={materials.boot} flatShading roughness={1} />
            </mesh>
          ))}

      <group position={[0, hip, 0]}>
        {/* Tunic */}
        <mesh position={[0, 0.17, 0]} castShadow>
          <boxGeometry args={[0.3, 0.34, 0.18]} />
          <meshStandardMaterial color={materials.tunic} flatShading roughness={1} />
        </mesh>

        {/* Far arm, at rest, or resting on the knee when seated */}
        <mesh
          position={seated ? [-0.19, 0.2, 0.06] : [-0.19, 0.16, 0]}
          rotation={seated ? [-0.6, 0, 0] : [0, 0, 0]}
          castShadow
        >
          <boxGeometry args={[0.08, 0.3, 0.08]} />
          <meshStandardMaterial color={materials.sleeve} flatShading roughness={1} />
        </mesh>

        {/* Near arm. The pivot is the shoulder: the corner where the arm meets
            the body. About its own centre it swings free of the shoulder and
            reads as a stick thrown in the air. */}
        <group ref={arm} position={[0.19, 0.32, 0]} rotation={seated ? [-0.6, 0, 0] : [0, 0, 0]}>
          <mesh position={[0, -0.15, 0]} castShadow>
            <boxGeometry args={[0.08, 0.3, 0.08]} />
            <meshStandardMaterial color={materials.sleeve} flatShading roughness={1} />
          </mesh>
        </group>

        {/* Head and hat */}
        <mesh position={[0, 0.45, 0]} castShadow>
          <boxGeometry args={[0.22, 0.22, 0.2]} />
          <meshStandardMaterial color={materials.skin} flatShading roughness={1} />
        </mesh>
        <mesh position={[0, 0.62, 0]} castShadow>
          <coneGeometry args={[0.2, 0.18, 5]} />
          <meshStandardMaterial color={materials.hat} flatShading roughness={1} />
        </mesh>
      </group>
    </group>
  )
}
