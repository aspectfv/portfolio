/**
 * A crag: the ground raised in tiers, each a faceted slab set back from the
 * one below, with steps cut between them. The outpost's ground is tall
 * because a watchpost is a place you climb to, and the tiers are what let
 * the tower stand on the summit, the fire on a ledge below it, and the camp
 * at the foot, all in one silhouette.
 *
 * The scene owns the tier heights and puts things on them; the crag only
 * builds to them.
 */
export function Crag({
  ledge,
  summit,
  top = '#27344a',
  rim = '#141c2b',
}: {
  ledge: number
  summit: number
  top?: string
  rim?: string
}) {
  const TIERS = { ledge, summit }
  return (
    <group>
      {/* Ledge */}
      <group position={[-0.5, 0, -0.35]} rotation={[0, 0.5, 0]}>
        <mesh position={[0, TIERS.ledge - 0.05, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[2.1, 2.0, 0.1, 7]} />
          <meshStandardMaterial color={top} flatShading roughness={1} />
        </mesh>
        <mesh position={[0, (TIERS.ledge - 0.1) / 2, 0]} castShadow>
          <cylinderGeometry args={[2.0, 2.25, TIERS.ledge - 0.1, 7]} />
          <meshStandardMaterial color={rim} flatShading roughness={1} />
        </mesh>
      </group>
      {/* Summit */}
      <group position={[-1.15, 0, -0.75]} rotation={[0, 0.2, 0]}>
        <mesh position={[0, TIERS.summit - 0.05, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.3, 1.22, 0.1, 6]} />
          <meshStandardMaterial color={top} flatShading roughness={1} />
        </mesh>
        <mesh position={[0, TIERS.ledge + (TIERS.summit - TIERS.ledge - 0.1) / 2, 0]} castShadow>
          <cylinderGeometry args={[1.22, 1.45, TIERS.summit - TIERS.ledge - 0.1, 6]} />
          <meshStandardMaterial color={rim} flatShading roughness={1} />
        </mesh>
      </group>
      {/* Steps: foot to ledge at the front right, ledge to summit at the back */}
      {[0, 1, 2, 3].map((step) => (
        <mesh
          key={`a${step}`}
          position={[1.35 - step * 0.28, (step + 0.5) * (TIERS.ledge / 4), 0.95 - step * 0.12]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.36, TIERS.ledge / 4, 0.5]} />
          <meshStandardMaterial color={rim} flatShading roughness={1} />
        </mesh>
      ))}
      {[0, 1, 2, 3].map((step) => (
        <mesh
          key={`b${step}`}
          position={[
            0.2 - step * 0.3,
            TIERS.ledge + (step + 0.5) * ((TIERS.summit - TIERS.ledge) / 4),
            -1.5,
          ]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.36, (TIERS.summit - TIERS.ledge) / 4, 0.5]} />
          <meshStandardMaterial color={rim} flatShading roughness={1} />
        </mesh>
      ))}
    </group>
  )
}
