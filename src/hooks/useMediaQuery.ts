import { useSyncExternalStore } from 'react'

const stores = new Map<string, { subscribe: (cb: () => void) => () => void; get: () => boolean }>()

function storeFor(query: string) {
  let store = stores.get(query)
  if (!store) {
    store = {
      subscribe: (onChange) => {
        const media = window.matchMedia(query)
        media.addEventListener('change', onChange)
        return () => media.removeEventListener('change', onChange)
      },
      get: () => window.matchMedia(query).matches,
    }
    stores.set(query, store)
  }
  return store
}

/**
 * Subscribes to a media query. Memoised per query string because
 * useSyncExternalStore compares the subscribe function by identity; a fresh
 * closure each render would resubscribe on every render.
 */
export function useMediaQuery(query: string): boolean {
  const store = storeFor(query)
  return useSyncExternalStore(store.subscribe, store.get, () => false)
}
