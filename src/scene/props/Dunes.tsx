export type Mound = {
  readonly at: readonly [number, number]
  readonly radius: number
  readonly height: number
  readonly tone: string
}

/**
 * Rolling sand: a handful of faceted mounds sunk into the plateau, higher
 * behind the camp and lower at its sides, so the ground has a shape of its
 * own before anything stands on it. Two tones of sand alternate so the
 * crests read against each other. A dune is a flattened sphere with few
 * segments; the facets are what make it sand rather than a bubble.
 */
export function Dunes({ mounds }: { mounds: readonly Mound[] }) {
  return (
    <group>
      {mounds.map((mound) => (
        <mesh
          key={`${mound.at[0]}:${mound.at[1]}`}
          position={[mound.at[0], -0.06, mound.at[1]]}
          scale={[1, mound.height / mound.radius, 0.85]}
          castShadow
          receiveShadow
        >
          <sphereGeometry args={[mound.radius, 7, 4, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={mound.tone} flatShading roughness={1} />
        </mesh>
      ))}
    </group>
  )
}
