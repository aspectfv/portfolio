import { achievements, getUnlocked, resetForTests, subscribe, unlock } from '@/achievements'

describe('achievements', () => {
  beforeEach(() => {
    localStorage.clear()
    resetForTests()
  })

  it('starts empty', () => {
    expect(getUnlocked().size).toBe(0)
  })

  it('records an unlock and persists it', () => {
    unlock('copied-email')
    expect(getUnlocked().has('copied-email')).toBe(true)
    expect(JSON.parse(localStorage.getItem('achievements') ?? '[]')).toEqual(['copied-email'])
  })

  it('is idempotent, so a repeated action does not re-announce', () => {
    unlock('copied-email')
    const first = getUnlocked()
    unlock('copied-email')
    // Same reference, so useSyncExternalStore sees no change and nothing rerenders.
    expect(getUnlocked()).toBe(first)
  })

  it('notifies subscribers only on a real change', () => {
    const seen = vi.fn()
    const stop = subscribe(seen)
    unlock('copied-email')
    expect(seen).toHaveBeenCalledTimes(1)
    unlock('copied-email')
    expect(seen).toHaveBeenCalledTimes(1)
    stop()
  })

  it('reads a previously stored set back', () => {
    localStorage.setItem('achievements', JSON.stringify(['reached-end']))
    resetForTests()
    expect(getUnlocked().has('reached-end')).toBe(true)
  })

  it('ignores unparseable storage rather than throwing on load', () => {
    localStorage.setItem('achievements', 'not json')
    resetForTests()
    expect(getUnlocked().size).toBe(0)
  })

  it('drops ids it no longer knows, so a rename cannot resurrect a stale entry', () => {
    localStorage.setItem('achievements', JSON.stringify(['reached-end', 'ancient-id', 42]))
    resetForTests()
    expect([...getUnlocked()]).toEqual(['reached-end'])
  })

  it('gates nothing: every achievement is feedback, never a key to content', () => {
    // A guard on the shape of the data rather than on any particular label:
    // the store holds ids and display strings and nothing resembling a payload.
    for (const achievement of achievements) {
      expect(Object.keys(achievement).sort()).toEqual(['id', 'label'])
    }
  })
})
