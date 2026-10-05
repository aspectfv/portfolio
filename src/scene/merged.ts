import { Euler, Matrix4, Quaternion, Vector3, type BufferGeometry } from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

export type Placed = {
  geometry: BufferGeometry
  position: readonly [number, number, number]
  rotation?: readonly [number, number, number]
  scale?: readonly [number, number, number]
}

/**
 * Bakes a scatter of small same-coloured pieces into one geometry.
 *
 * Stones round a spring or turf hanging off a rim are a dozen meshes that
 * never move apart. As separate meshes each one is a React element to
 * reconcile and a draw call per frame, which on a phone landed on the main
 * thread while the hero mounted. One geometry is one mesh, and it looks the
 * same because flat shading takes its normals per face either way.
 *
 * Every part must share an index layout: all indexed or all not.
 */
export function merged(parts: readonly Placed[]) {
  const matrix = new Matrix4()
  const geometry = mergeGeometries(
    parts.map((part) => {
      matrix.compose(
        new Vector3(...part.position),
        new Quaternion().setFromEuler(new Euler(...(part.rotation ?? [0, 0, 0]))),
        new Vector3(...(part.scale ?? [1, 1, 1])),
      )
      return part.geometry.applyMatrix4(matrix)
    }),
  )
  for (const part of parts) part.geometry.dispose()
  return geometry
}
