import { useMemo } from 'react'
import { ConeGeometry, CylinderGeometry, type BufferGeometry } from 'three'
import { merged } from '../merged'

/**
 * The floating island the hero diorama sits on.
 *
 * Built from primitives rather than a model, in strata a cliff would show: a
 * turf cap, a soil band, a stone band, and a rock underside that breaks into
 * several hanging points rather than one smooth cone. Every layer is a
 * cylinder or cone pushed out of round by a fixed jitter, so the rim is a
 * hand-cut outline instead of a regular octagon, and every face catches the
 * light at a slightly different angle, which is what reads as faceted.
 *
 * The jitter is seeded, so the island is the same island on every load and in
 * the rendered still.
 */

const grass = '#6fbf57'
const grassDark = '#4e9c41'
const soil = '#8a5a3b'
const stone = '#98a0ae'
const rock = '#7a4d31'
const rockDark = '#694330'

/** A repeatable pseudo-random value in [-1, 1] for a vertex position. */
function noise(x: number, y: number, z: number, seed: number) {
  const value = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719 + seed * 4.1) * 43758.5453
  return (value - Math.floor(value)) * 2 - 1
}

/**
 * Pushes a geometry's vertices out of round. Keyed on position rather than
 * index, so the duplicated vertices along a seam move together and the mesh
 * does not tear. `lift` jitters height as well, for a turf top that is not a
 * table.
 */
function rugged<T extends BufferGeometry>(geometry: T, amount: number, seed: number, lift = 0) {
  const position = geometry.attributes.position
  if (!position) return geometry
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i)
    const y = position.getY(i)
    const z = position.getZ(i)
    const radius = Math.hypot(x, z)
    if (radius < 1e-4) continue
    const key = [Math.round(x * 1000), Math.round(y * 1000), Math.round(z * 1000)] as const
    const push = 1 + noise(key[0], 0, key[2], seed) * amount
    position.setXYZ(i, x * push, y + noise(key[0], key[1], key[2], seed + 1) * lift, z * push)
  }
  geometry.computeVertexNormals()
  return geometry
}

/** Turf hanging over the soil at the rim, as a mat of grass does: angle, length. */
const drips = [
  [0.3, 0.1],
  [1.25, 0.14],
  [2.0, 0.09],
  [2.9, 0.13],
  [3.7, 0.1],
  [4.6, 0.15],
  [5.5, 0.1],
] as const

/** The points the underside breaks into: offset, radius, depth, tone. */
const fangs = [
  { at: [0.55, -0.95, 0.35], radius: 0.55, depth: 1.1, tone: rock },
  { at: [-0.6, -0.9, -0.2], radius: 0.5, depth: 0.95, tone: rockDark },
  { at: [-0.2, -0.9, 0.7], radius: 0.38, depth: 0.7, tone: stone },
  { at: [0.35, -0.85, -0.7], radius: 0.4, depth: 0.75, tone: rockDark },
] as const

/** An islet drifting below the island: a turf cap on a point. */
export type Islet = { at: readonly [number, number, number]; size: number }

/** The far islet, on the screen's left, which nothing lands on. */
const drifter = { at: [-1.95, -1.85, 0.8], size: 0.24 } as const

function IsletBody({ size, seed }: { size: number; seed: number }) {
  const cap = useMemo(
    () => rugged(new CylinderGeometry(size, size * 0.85, size * 0.35, 7), 0.12, seed),
    [size, seed],
  )
  const point = useMemo(
    () => rugged(new ConeGeometry(size * 0.85, size * 1.6, 7), 0.15, seed + 3),
    [size, seed],
  )
  return (
    <>
      <mesh geometry={cap} castShadow>
        <meshStandardMaterial color={grass} flatShading roughness={1} />
      </mesh>
      <mesh geometry={point} position={[0, -size * 0.97, 0]} rotation={[Math.PI, 0, 0]}>
        <meshStandardMaterial color={rock} flatShading roughness={1} />
      </mesh>
    </>
  )
}

/**
 * `landing` is the islet the scene's waterfall lands on, so the scene owns
 * where it is and the water and the turf it arrives on cannot drift apart.
 */
export function Island({ landing }: { landing: Islet }) {
  const geometry = useMemo(
    () => ({
      turf: rugged(new CylinderGeometry(1.8, 1.74, 0.3, 12, 1), 0.07, 1, 0.025),
      lip: rugged(new CylinderGeometry(1.66, 1.56, 0.16, 12, 1), 0.06, 1),
      soil: rugged(new CylinderGeometry(1.64, 1.42, 0.3, 11, 1), 0.08, 2),
      stone: rugged(new CylinderGeometry(1.34, 1.06, 0.36, 10, 1), 0.08, 3),
      core: rugged(new ConeGeometry(1.12, 1.35, 9, 2), 0.14, 4),
      drips: merged(
        drips.map(([angle, length]) => ({
          geometry: new ConeGeometry(0.2, length, 5),
          position: [Math.cos(angle) * 1.6, -0.3 - length / 2, Math.sin(angle) * 1.6],
          rotation: [Math.PI, angle, 0],
        })),
      ),
      // The hanging points, baked into one mesh per tone. coneGeometry puts
      // its apex at +Y, so each is flipped; without the rotation the island
      // sits on a flat base and stops looking airborne.
      fangs: [rock, rockDark, stone].map((tone) => ({
        tone,
        shape: merged(
          fangs.flatMap((fang, index) =>
            fang.tone === tone
              ? [
                  {
                    geometry: rugged(
                      new ConeGeometry(fang.radius, fang.depth, 6, 1),
                      0.18,
                      10 + index,
                    ),
                    position: [fang.at[0], fang.at[1] - fang.depth / 2, fang.at[2]] as const,
                    rotation: [Math.PI, index, 0] as const,
                  },
                ]
              : [],
          ),
        ),
      })),
    }),
    [],
  )

  return (
    <group>
      <mesh geometry={geometry.turf} position={[0, -0.12, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={grass} flatShading roughness={1} />
      </mesh>
      {/* The turf's darker underlip, so the cap reads as a mat of grass
          lying over the soil rather than a green disc. */}
      <mesh geometry={geometry.lip} position={[0, -0.3, 0]}>
        <meshStandardMaterial color={grassDark} flatShading roughness={1} />
      </mesh>
      <mesh geometry={geometry.drips}>
        <meshStandardMaterial color={grassDark} flatShading roughness={1} />
      </mesh>
      <mesh geometry={geometry.soil} position={[0, -0.52, 0]}>
        <meshStandardMaterial color={soil} flatShading roughness={1} />
      </mesh>
      <mesh geometry={geometry.stone} position={[0, -0.85, 0]}>
        <meshStandardMaterial color={stone} flatShading roughness={1} />
      </mesh>

      {/* The underside, flipped for the same reason as the points. */}
      <mesh geometry={geometry.core} position={[0, -1.7, 0]} rotation={[Math.PI, 0.3, 0]}>
        <meshStandardMaterial color={rock} flatShading roughness={1} />
      </mesh>
      {geometry.fangs.map((fang) => (
        <mesh key={fang.tone} geometry={fang.shape}>
          <meshStandardMaterial color={fang.tone} flatShading roughness={1} />
        </mesh>
      ))}

      {[landing, drifter].map((islet, index) => (
        <group key={islet.size} position={[...islet.at]} rotation={[0, 7 + index * 4, 0]}>
          <IsletBody size={islet.size} seed={7 + index * 4} />
        </group>
      ))}
    </group>
  )
}
