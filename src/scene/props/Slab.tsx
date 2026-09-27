/**
 * A grounded base for a place that stands on the band rather than floating
 * above it: a straight-edged block with a thin surface layer over a soil
 * body. The island's cousin with its edges squared off, which is what
 * separates a structure, a cluster, a marker and a platform from the one
 * island the world keeps.
 */
export function Slab({
  size,
  top = '#6fbf57',
  side = '#7a4d31',
  position = [0, 0, 0] as [number, number, number],
}: {
  /** Width and depth in world units. */
  size: readonly [number, number]
  top?: string
  side?: string
  position?: [number, number, number]
}) {
  const [width, depth] = size
  return (
    <group position={position}>
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[width, 0.1, depth]} />
        <meshStandardMaterial color={top} flatShading roughness={1} />
      </mesh>
      <mesh position={[0, -0.28, 0]}>
        <boxGeometry args={[width * 0.985, 0.36, depth * 0.985]} />
        <meshStandardMaterial color={side} flatShading roughness={1} />
      </mesh>
    </group>
  )
}
