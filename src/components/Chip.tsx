/**
 * The slot: the unit that repeats everywhere a set of values is listed. A
 * technology, an inventory item, a thing found along the way — all the same
 * small raised cell with a solid bottom edge, text primary, never a logo wall.
 *
 * Two arrangements, one cell. `ChipList` wraps in flow, for a stack list that
 * is an aside inside a card. `ChipGrid` lays the same cells on a grid, because
 * a grid of cells is what an inventory screen looks like and Skills is the one
 * section whose whole subject is the kit.
 *
 * The grid starts at `sm`. Measured at 390px, a two-column grid of fixed cells
 * costs 155px of page height over the same cells wrapped in flow , `Bash` and
 * `Git` each taking half the width is most of that , and height is the scarce
 * resource on a phone. The cell is identical either way, so the narrow layout
 * loses an arrangement rather than an identity.
 */
export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <li className="bg-canvas border-edge text-meta rounded-sm border-2 border-b-(length:--edge-sm) px-2.5 py-1 font-medium">
      {children}
    </li>
  )
}

export function ChipList({ items, label }: { items: readonly string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Chip key={item}>{item}</Chip>
      ))}
    </ul>
  )
}

export function ChipGrid({ items, label }: { items: readonly string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2 sm:grid sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <li
          key={item}
          className="bg-canvas border-edge text-meta flex items-center gap-1.5 rounded-sm border-2 border-b-(length:--edge-sm) px-2 py-1 font-medium"
        >
          {/* The notch. Decorative, and the reason a cell reads as a slot
              rather than as a bordered word. Absent below `sm`: the extra width
              per cell pushes the kit onto enough further lines to cost 86px of
              page height, and density dropping on the narrow layout is the same
              rule the scenery follows. */}
          <span
            data-ornament=""
            aria-hidden="true"
            className="bg-edge hidden size-1.5 shrink-0 rotate-45 sm:block"
          />
          {/* Wraps rather than truncates. A slot is decoration; the word inside
              it is content, and no arrangement may hide one. */}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
