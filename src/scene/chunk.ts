/**
 * The one lazy chunk the world loads.
 *
 * `World` needs the canvas and every `Strip` needs its view, and each is
 * imported lazily from a different file. Two lazy imports that share three
 * would be split by the bundler into two chunks plus a shared one, which is
 * two extra requests on the path that decides mobile LCP. Both lazies point
 * here instead, so the bundler emits a single chunk for all of it.
 */
export { StripView } from './StripView'
export { WorldCanvas } from './WorldCanvas'
