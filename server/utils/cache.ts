interface CacheEntry<T> {
  data: T
  timestamp: number
}

export function createCache<T>(ttlMs: number = 60000) {
  const store = new Map<string, CacheEntry<T>>()

  function get(key: string): T | undefined {
    const entry = store.get(key)
    if (!entry) return undefined
    if (Date.now() - entry.timestamp > ttlMs) {
      store.delete(key)
      return undefined
    }
    return entry.data
  }

  function set(key: string, data: T): void {
    store.set(key, { data, timestamp: Date.now() })
  }

  function invalidate(key: string): void {
    store.delete(key)
  }

  function clear(): void {
    store.clear()
  }

  return { get, set, invalidate, clear }
}