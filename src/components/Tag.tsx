/** A technology label. Text stays primary; this is never a logo wall. */
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <li className="bg-canvas border-hairline text-meta text-ink-muted rounded-full border px-2.5 py-0.5">
      {children}
    </li>
  )
}

export function TagList({ items, label }: { items: readonly string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </ul>
  )
}
