import { ref } from 'vue'

export interface ProductColorVariant {
  name: string
  color: string
  image?: string
  images?: string[]
}

export interface Product {
  id: number
  name: string
  article: string
  price: number
  categoryId: string
  styleId: string
  color: string
  inStock: boolean
  image: string
  description?: string
  characteristics?: string
  images?: string[]
  colorVariants?: ProductColorVariant[]
  rating: number
  reviewsCount: number
  questionsCount: number
}

const products = ref<Product[]>([])

// ─── Cache with TTL ──────────────────────────
interface CacheEntry<T> {
  data: T
  timestamp: number
}

const productsCache: CacheEntry<Product[]> = { data: [], timestamp: 0 }
const CACHE_TTL = 60000 // 1 minute

async function loadCache(): Promise<Product[]> {
  const now = Date.now()
  if (productsCache.data.length > 0 && now - productsCache.timestamp < CACHE_TTL) {
    return productsCache.data
  }
  try {
    productsCache.data = await $fetch<Product[]>('/api/products')
    productsCache.timestamp = now
  } catch {}
  return productsCache.data
}

// Standalone export for Header.vue compatibility
export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.toLowerCase().trim()
  if (!q) return []
  const all = await loadCache()
  return all.filter(
    p => p.name.toLowerCase().includes(q) || p.article.toLowerCase().includes(q)
  ).slice(0, 5)
}

export const useProducts = () => {
  const fetchProducts = async (filters?: Record<string, any>) => {
    const params = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== 'all') {
          params.set(key, String(value))
        }
      })
    }
    const qs = params.toString()
    const url = qs ? `/api/products?${qs}` : '/api/products'
    products.value = await $fetch<Product[]>(url)
    return products.value
  }

  const fetchProduct = async (id: number): Promise<Product | null> => {
    try {
      return await $fetch<Product>(`/api/products/${id}`)
    } catch {
      return null
    }
  }

  const searchLocalProducts = async (query: string): Promise<Product[]> => {
    const q = query.toLowerCase().trim()
    if (!q) return []
    const all = products.value.length ? products.value : await loadCache()
    return all.filter(
      p => p.name.toLowerCase().includes(q) || p.article.toLowerCase().includes(q)
    ).slice(0, 5)
  }

  return {
    products,
    fetchProducts,
    fetchProduct,
    searchProducts: searchLocalProducts
  }
}
