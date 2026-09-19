/**
 * The floating island the diorama sits on: a shallow grass disc over a tapering
 * underside of rock.
 *
 * Built from primitives rather than a model; a cylinder and two cones at eight
 * segments give the faceted silhouette the art direction wants for a few dozen
 * triangles, and no asset to download.
 */
export function Island() {
  return (
    <group>
      {/* Grass cap */}
      <mesh position={[0, -0.12, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.75, 1.68, 0.34, 8]} />
        <meshStandardMaterial color="#6fbf57" flatShading roughness={1} metalness={0} />
      </mesh>

      {/* Soil band directly beneath the turf */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[1.68, 1.3, 0.24, 8]} />
        <meshStandardMaterial color="#8a5a3b" flatShading roughness={1} metalness={0} />
      </mesh>

      {/* Underside, tapering to a point. coneGeometry puts its apex at +Y, so
          this is flipped; without the rotation the island sits on a flat base
          and stops looking airborne. */}
      <mesh position={[0, -1.53, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[1.3, 1.95, 8]} />
        <meshStandardMaterial color="#7a4d31" flatShading roughness={1} metalness={0} />
      </mesh>

      {/* A smaller shard drifting below, so the island reads as airborne. It
          takes the underside's own colour: it is a piece of this island, and
          in stone grey it read as a separate object that had wandered in. */}
      <mesh position={[1.72, -2.15, 0.62]} rotation={[Math.PI - 0.35, 0.6, 0.22]}>
        <coneGeometry args={[0.26, 0.5, 6]} />
        <meshStandardMaterial color="#7a4d31" flatShading roughness={1} metalness={0} />
      </mesh>
    </group>
  )
}
