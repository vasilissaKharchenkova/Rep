interface CacheEntry<T> {
  data: T
  timestamp: number
}

// Global cache store — shared across all API routes
const globalStore = new Map<string, CacheEntry<any>>()

const DEFAULT_TTL = 60000 // 1 minute

export function createCache<T>(ttlMs: number = DEFAULT_TTL) {
  function get(key: string): T | undefined {
    const entry = globalStore.get(key)
    if (!entry) return undefined
    if (Date.now() - entry.timestamp > ttlMs) {
      globalStore.delete(key)
      return undefined
    }
    return entry.data as T
  }

  function set(key: string, data: T): void {
    globalStore.set(key, { data, timestamp: Date.now() })
  }

  function invalidate(key: string): void {
    globalStore.delete(key)
  }

  function invalidatePrefix(prefix: string): void {
    for (const key of globalStore.keys()) {
      if (key.startsWith(prefix)) {
        globalStore.delete(key)
      }
    }
  }

  function clear(): void {
    globalStore.clear()
  }

  return { get, set, invalidate, invalidatePrefix, clear }
}