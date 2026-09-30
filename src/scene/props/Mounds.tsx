export type Mound = {
  readonly at: readonly [number, number]
  readonly radius: number
  readonly height: number
  readonly tone: string
}

/**
 * Rolling ground: a handful of faceted mounds rising off the floor, so a
 * place has a shape of its own before anything stands on it. Dunes in the
 * camp, a knoll at the trailhead. Two tones alternate so the crests read
 * against each other. A mound is a flattened half-sphere with few segments;
 * the facets are what make it ground rather than a bubble. Its base sits on
 * the floor, never under it: the floor hides nothing.
 */
export function Mounds({ mounds }: { mounds: readonly Mound[] }) {
  return (
    <group>
      {mounds.map((mound) => (
        <mesh
          key={`${mound.at[0]}:${mound.at[1]}`}
          position={[mound.at[0], 0, mound.at[1]]}
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
