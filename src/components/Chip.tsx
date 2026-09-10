/**
 * A technology label, drawn as an inventory slot: a small raised cell with a
 * solid bottom edge. Text stays primary; this is never a logo wall.
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
