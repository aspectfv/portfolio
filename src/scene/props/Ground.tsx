/**
 * The band is the ground.
 *
 * A place that stands on the band gets no slab of its own: a block of green on
 * the cream band, or of tan on the sand band, read as a diorama dropped on the
 * page rather than a place the page is set in. Instead the ground is an
 * invisible plane that only catches shadows, so every object throws its
 * shadow onto the section's own colour and the strip has no edge of its own.
 */
export function Ground({
  opacity = 0.28,
  color = '#3c2a18',
}: {
  opacity?: number
  color?: string
}) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]} receiveShadow>
      <planeGeometry args={[60, 60]} />
      <shadowMaterial transparent opacity={opacity} color={color} />
    </mesh>
  )
}

/**
 * Firelight on the ground. A light source alone lights the objects around it
 * and nothing under it, because the ground is only shadow; this puts the warm
 * pool a fire or a lantern throws onto the band itself, as a flat disc fading
 * at its rim.
 */
export function LightPool({
  position = [0, 0, 0] as [number, number, number],
  radius = 1.4,
  color = '#ff9e73',
  opacity = 0.32,
}) {
  return (
    <group position={[position[0], position[1] + 0.004, position[2]]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius, 16]} />
        <meshBasicMaterial color={color} transparent opacity={opacity * 0.45} depthWrite={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <circleGeometry args={[radius * 0.55, 12]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
      </mesh>
    </group>
  )
}
