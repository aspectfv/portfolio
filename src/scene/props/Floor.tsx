/**
 * The ground a place stands on: the section's own band, seen through.
 *
 * Nothing is drawn but the shadows that fall on it. A chunk of terrain with a
 * rim and a silhouette read as an object pasted onto the page; with the band
 * itself as the ground, the camp or the workshop stands in the section rather
 * than on a coaster in it, and its shadows land on the same colour the text
 * sits on. The strip's bottom edge is the band's floor, so the place stands
 * where the section meets the next one.
 *
 * Nothing in a scene may go below it: the floor hides nothing, so a rim or an
 * underside under it would show through.
 */
export function Floor({ shade = '#3c2a18', opacity = 0.2 }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[40, 24]} />
      <shadowMaterial color={shade} opacity={opacity} transparent depthWrite={false} />
    </mesh>
  )
}
