/**
 * A chunk of ground for a place to stand on: the hero island's cap without
 * the island's underside, a faceted plateau with a soil rim, in a tone drawn
 * from the band it sits on.
 *
 * Every place is one object with a silhouette, the way the hero and About
 * are, rather than a row of things strewn across the section. A wide flat
 * slab read as a block dropped on the page; a plateau reads as terrain,
 * because its outline is a polygon with corners rather than a rectangle and
 * its rim tapers under it. `stretch` makes it longer than it is deep, and
 * `rotation` turns the polygon so no edge runs parallel to the strip.
 */
export function Plateau({
  radius = 3,
  stretch = [1, 1] as readonly [number, number],
  top = '#6fbf57',
  rim = '#7a4d31',
  height = 0.22,
  segments = 8,
  rotation = 0.3,
}) {
  return (
    <group rotation={[0, rotation, 0]} scale={[stretch[0], 1, stretch[1]]}>
      <mesh position={[0, -height / 2, 0]} receiveShadow>
        <cylinderGeometry args={[radius, radius * 0.95, height, segments]} />
        <meshStandardMaterial color={top} flatShading roughness={1} />
      </mesh>
      <mesh position={[0, -height - 0.17, 0]}>
        <cylinderGeometry args={[radius * 0.95, radius * 0.8, 0.34, segments]} />
        <meshStandardMaterial color={rim} flatShading roughness={1} />
      </mesh>
    </group>
  )
}
