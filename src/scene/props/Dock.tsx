/**
 * A plank dock on posts, reaching out over the water from the shore.
 *
 * The origin is the shore end at water level, the deck runs along +x, and the
 * deck surface sits at `height`, so anything set down on it goes at that y
 * and the seated traveller's origin lands on the boards. Planks alternate
 * two wood tones so the deck reads as boards rather than a slab, and the
 * stringers hang a hair below them so no two faces share a plane.
 *
 * The mooring post stands at the far corner with a rope loop on it, which
 * is what says a boat belongs here even before the boat is in frame.
 */
export function Dock({
  position = [0, 0, 0] as [number, number, number],
  rotation = 0,
  length = 2.8,
  width = 1.0,
  height = 0.42,
}) {
  const count = Math.round(length / 0.24)
  const planks = Array.from({ length: count }, (_, index) => index)
  const posts = [0.15, length / 2, length - 0.15] as const
  const sides = [width / 2 - 0.1, -(width / 2 - 0.1)] as const

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {planks.map((index) => (
        <mesh
          key={index}
          position={[index * 0.24 + 0.12, height - 0.03, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.2, 0.06, width]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? '#c98a4b' : '#b87b40'}
            flatShading
            roughness={1}
          />
        </mesh>
      ))}

      {/* Stringers, a hair under the planks so their tops share no plane. */}
      {sides.map((z) => (
        <mesh key={z} position={[length / 2, height - 0.11, z]} castShadow>
          <boxGeometry args={[length, 0.08, 0.08]} />
          <meshStandardMaterial color="#a06a34" flatShading roughness={1} />
        </mesh>
      ))}

      {/* Posts, driven into the water and standing a little proud of the deck. */}
      {posts.map((x) =>
        sides.map((z) => (
          <mesh key={`${x}:${z}`} position={[x, (height + 0.06 - 0.4) / 2, z * 1.06]} castShadow>
            <boxGeometry args={[0.1, height + 0.46, 0.1]} />
            <meshStandardMaterial color="#6b4429" flatShading roughness={1} />
          </mesh>
        )),
      )}

      {/* Mooring post and its rope loop. */}
      <group position={[length - 0.22, height, width / 2 - 0.14]}>
        <mesh position={[0, 0.25, 0]} castShadow>
          <boxGeometry args={[0.12, 0.5, 0.12]} />
          <meshStandardMaterial color="#6b4429" flatShading roughness={1} />
        </mesh>
        <mesh position={[0, 0.5, 0]} castShadow>
          <coneGeometry args={[0.09, 0.08, 4]} />
          <meshStandardMaterial color="#5a3820" flatShading roughness={1} />
        </mesh>
        <mesh position={[0, 0.36, 0]} rotation={[Math.PI / 2, 0, 0.3]}>
          <torusGeometry args={[0.1, 0.022, 5, 8]} />
          <meshStandardMaterial color="#e8cf9c" flatShading roughness={1} />
        </mesh>
      </group>
    </group>
  )
}
