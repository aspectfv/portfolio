/**
 * A signpost with two blank boards.
 *
 * Deliberately wordless. Text in the scene would be a second, unreadable copy
 * of navigation that already exists in the header, and `CLAUDE.md` is explicit
 * that the canvas carries identity rather than information. The shape alone is
 * the adventure-game cue; it also rhymes with the signpost glyph the interface
 * already uses, so the scene and the UI reference the same object.
 */
export function Signpost({
  position = [0, 0, 0] as [number, number, number],
  rotation = 0,
  scale = 1,
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.04, 0.6, 6]} />
        <meshStandardMaterial color="#8a5a3b" flatShading roughness={1} />
      </mesh>

      <mesh position={[0.14, 0.5, 0]} rotation={[0, 0, -0.06]} castShadow>
        <boxGeometry args={[0.32, 0.12, 0.04]} />
        <meshStandardMaterial color="#c98a4b" flatShading roughness={1} />
      </mesh>

      <mesh position={[-0.12, 0.34, 0]} rotation={[0, 0, 0.05]} castShadow>
        <boxGeometry args={[0.26, 0.1, 0.04]} />
        <meshStandardMaterial color="#c98a4b" flatShading roughness={1} />
      </mesh>
    </group>
  )
}
