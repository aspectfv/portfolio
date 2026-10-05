import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { BufferGeometry, Float32BufferAttribute, IcosahedronGeometry, type Group } from 'three'
import { merged } from '../merged'
import { type AmbientActor, period } from '@/scenery/ambient'

/**
 * A spring on the island's turf, a short run to the rim, and the water going
 * over the edge and landing on the islet below.
 *
 * Local +X is downstream. The group's origin is the lip of the fall, on the
 * turf, so a scene places it on the rim, turns it to face outward, and passes
 * the drop to whatever the water lands on.
 *
 * The fall is one faceted ribbon that leaves the lip almost vertical and bows
 * outward as it drops, the way water leaves a ledge. It breaks into foam at
 * the lip and again where it lands.
 *
 * It is one-sided and one colour on purpose: per-vertex colour or a
 * double-sided material each compile a shader variant nothing else in the
 * world uses, and that compile landed on a phone's main thread as blocking
 * time.
 *
 * The pale streaks on it lengthen and shorten on the actor's count, each on
 * its own phase and tilted to follow the curve, which is the same Blink the
 * creek and the pond carry, turned on its side. They stand a little proud of
 * the face rather than on it, so the two never share a depth.
 */

const water = '#4fa9d8'
const shallow = '#8fc3e6'
const foam = '#ffffff'
const stone = '#98a0ae'
const glint = '#d8effa'

/**
 * Water surface heights above the lip. The turf under them is jittered by a
 * couple of hundredths, so the water stands clear of its highest point, and
 * the pool and the run sit at different heights: two coplanar water faces
 * z-fight, which reads as the water flickering.
 */
const POOL = 0.075
const RUN = 0.065

/** How far the fall bows out by the time it lands. */
const REACH = 0.3
const ROWS = 6

/** The fall's centre line: outward travel at a fraction of the way down. */
function bow(t: number) {
  return 0.02 + REACH * t * t
}

/** Streaks on the falling face: lateral offset, fraction of the way down, length. */
const streaks = [
  [-0.08, 0.18, 0.28],
  [0.07, 0.4, 0.34],
  [-0.03, 0.62, 0.3],
  [0.09, 0.8, 0.24],
] as const

/** Foam where the water lands: offset from the impact, size. */
const splash = [
  [0.04, 0.0, 0.07],
  [-0.08, 0.1, 0.06],
  [0.1, -0.12, 0.055],
  [-0.05, -0.13, 0.05],
] as const

/** The stones ringing the spring: angle around it, size. */
const ring = [
  [0.2, 0.07],
  [1.3, 0.06],
  [2.3, 0.08],
  [3.4, 0.06],
  [4.5, 0.075],
  [5.5, 0.06],
] as const

function fallGeometry(drop: number) {
  const positions: number[] = []
  for (let row = 0; row <= ROWS; row++) {
    const t = row / ROWS
    // Alternate rows a little wider, so the faces are not all one plane. The
    // wobble is sideways rather than outward: an outward one pushed the face
    // through the streaks lying on it, which flickered.
    const x = bow(t)
    const half = 0.13 + 0.05 * t + (row % 2 === 0 ? 0 : 0.012)
    positions.push(x, -t * drop, -half, x, -t * drop, half)
  }
  const index: number[] = []
  for (let row = 0; row < ROWS; row++) {
    const a = row * 2
    // Wound to face downstream, toward the camera; the back is never seen.
    index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2)
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  geometry.setIndex(index)
  geometry.computeVertexNormals()
  return geometry
}

export function Waterfall({
  run = 0.7,
  drop,
  actor,
  animate = true,
}: {
  /** The length of the channel from the spring to the lip. */
  run?: number
  /** From the lip down to the surface the water lands on. */
  drop: number
  actor: AmbientActor
  animate?: boolean
}) {
  const group = useRef<Group>(null)
  const fall = useMemo(() => fallGeometry(drop), [drop])
  // The stones and the foam never move apart, so each is baked into one mesh.
  const stones = useMemo(
    () =>
      merged(
        ring.map(([angle, size]) => ({
          geometry: new IcosahedronGeometry(size, 0),
          position: [Math.cos(angle) * 0.32, size * 0.4, Math.sin(angle) * 0.32],
          rotation: [angle, angle * 2, 0],
          scale: [1, 0.7, 1],
        })),
      ),
    [],
  )
  const froth = useMemo(
    () =>
      merged([
        // Where it tips over
        {
          geometry: new IcosahedronGeometry(0.07, 0),
          position: [0.02, RUN, 0.03],
          scale: [1, 0.5, 1.3],
        },
        {
          geometry: new IcosahedronGeometry(0.05, 0),
          position: [0, RUN, -0.07],
          scale: [1, 0.5, 1],
        },
        // Where it lands
        ...splash.map(([x, z, size]) => ({
          geometry: new IcosahedronGeometry(size, 0),
          position: [bow(1) + x, -drop + size * 0.3, z] as const,
          scale: [1, 0.55, 1] as const,
        })),
      ]),
    [drop],
  )

  useFrame((state) => {
    const root = group.current
    if (!animate || !root) return
    const t = state.clock.getElapsedTime()
    const turn = (t * 2 * Math.PI) / period(actor)
    root.children.forEach((streak, index) => {
      streak.scale.y = 0.45 + Math.max(0, Math.sin(turn + index * 1.7)) * 0.8
    })
  })

  return (
    <group>
      {/* The spring: a faceted pool in a ring of stones */}
      <group position={[-run, 0, 0]}>
        <mesh position={[0, POOL - 0.04, 0]} rotation={[0, 0.4, 0]} receiveShadow>
          <cylinderGeometry args={[0.28, 0.28, 0.08, 6]} />
          <meshStandardMaterial color={shallow} flatShading roughness={0.5} />
        </mesh>
        <mesh geometry={stones} castShadow>
          <meshStandardMaterial color={stone} flatShading roughness={1} />
        </mesh>
      </group>

      {/* The run to the lip, stopping short of it so nothing overhangs */}
      <mesh position={[-run / 2 + 0.02, RUN - 0.035, 0]} receiveShadow>
        <boxGeometry args={[run - 0.04, 0.07, 0.2]} />
        <meshStandardMaterial color={water} flatShading roughness={0.5} />
      </mesh>

      {/* Foam where it tips over and where it lands */}
      <mesh geometry={froth}>
        <meshStandardMaterial color={foam} flatShading roughness={1} />
      </mesh>

      {/* The fall */}
      <mesh geometry={fall}>
        <meshStandardMaterial
          color={water}
          emissive={water}
          emissiveIntensity={0.3}
          flatShading
          roughness={0.5}
        />
      </mesh>

      <group ref={group}>
        {streaks.map(([z, t, length]) => (
          <mesh
            key={t}
            position={[bow(t) + 0.02, -t * drop, z]}
            rotation={[0, 0, Math.atan((2 * REACH * t) / drop)]}
          >
            <boxGeometry args={[0.01, length, 0.022]} />
            <meshStandardMaterial
              color={glint}
              emissive={glint}
              emissiveIntensity={0.3}
              roughness={1}
            />
          </mesh>
        ))}
      </group>

      {/* Where it lands: a pale pool */}
      <mesh position={[bow(1), -drop + 0.012, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.02, 7]} />
        <meshStandardMaterial color={shallow} flatShading roughness={0.5} />
      </mesh>
    </group>
  )
}
