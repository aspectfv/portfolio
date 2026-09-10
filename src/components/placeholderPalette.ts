export interface Palette {
  readonly sky: string
  readonly ridge: string
  readonly ridgeFar: string
  /** Must contrast with `sky`; a sun the colour of its own sky is invisible. */
  readonly sun: string
}

export const placeholderPalettes: readonly Palette[] = [
  {
    sky: 'var(--color-world-sky)',
    ridge: 'var(--color-world-grass)',
    ridgeFar: 'var(--color-world-grass-dark)',
    sun: 'var(--color-world-sun)',
  },
  {
    sky: 'var(--color-world-sun)',
    ridge: 'var(--color-world-soil)',
    ridgeFar: 'var(--color-world-wood)',
    sun: 'var(--color-ember)',
  },
  {
    sky: 'var(--color-world-water)',
    ridge: 'var(--color-world-stone)',
    ridgeFar: 'var(--color-world-soil)',
    sun: 'var(--color-world-sun)',
  },
  {
    sky: 'var(--color-world-sky)',
    ridge: 'var(--color-world-wood)',
    ridgeFar: 'var(--color-world-soil)',
    sun: 'var(--color-world-sun)',
  },
]

/** Deterministic per project, so a card's placeholder never changes between loads. */
export function paletteFor(seed: string): Palette {
  const total = [...seed].reduce((sum, character) => sum + character.charCodeAt(0), 0)
  return placeholderPalettes[total % placeholderPalettes.length]!
}
