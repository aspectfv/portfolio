import { paletteFor, placeholderPalettes } from '@/components/placeholderPalette'
import { projects } from '@/content/projects'

describe('placeholder palettes', () => {
  it('never paints the sun the colour of its own sky', () => {
    for (const palette of placeholderPalettes) {
      expect(palette.sun).not.toBe(palette.sky)
    }
  })

  it('never paints a ridge the colour of its sky', () => {
    for (const palette of placeholderPalettes) {
      expect(palette.ridge).not.toBe(palette.sky)
      expect(palette.ridgeFar).not.toBe(palette.sky)
    }
  })

  it('is stable for a given project', () => {
    for (const project of projects) {
      expect(paletteFor(project.id)).toBe(paletteFor(project.id))
    }
  })
})
