/**
 * A small treasure chest, closed.
 *
 * Closed rather than open, and holding nothing: an open chest spilling coins
 * would imply a reward the site does not give, and this scene may not carry
 * information. It is here because the interface already uses a chest glyph for
 * the inventory, so putting the object in the world makes the two halves of the
 * design read as one place.
 */
export function Chest({
  position = [0, 0, 0] as [number, number, number],
  rotation = 0,
  scale = 1,
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      {/* Body */}
      <mesh position={[0, 0.09, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.34, 0.18, 0.24]} />
        <meshStandardMaterial color="#8a5a3b" flatShading roughness={1} />
      </mesh>

      {/* Lid, a half cylinder lying on its side */}
      <mesh position={[0, 0.18, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.34, 6, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#a9683f" flatShading roughness={1} side={2} />
      </mesh>

      {/* Bands and clasp */}
      <mesh position={[0, 0.12, 0.121]} castShadow>
        <boxGeometry args={[0.05, 0.2, 0.01]} />
        <meshStandardMaterial color="#f7c948" flatShading roughness={1} />
      </mesh>
    </group>
  )
}
