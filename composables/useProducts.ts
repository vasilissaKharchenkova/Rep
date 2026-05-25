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

let productsCache: Product[] = []

async function loadCache() {
  if (productsCache.length === 0) {
    try {
      productsCache = await $fetch<Product[]>('/api/products')
    } catch {}
  }
  return productsCache
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

  const searchProducts = async (query: string): Promise<Product[]> => {
    const q = query.toLowerCase().trim()
    if (!q) return []
    // Load all products and search locally for quick response
    const all = products.value.length ? products.value : await fetchProducts()
    return all.filter(
      p => p.name.toLowerCase().includes(q) || p.article.toLowerCase().includes(q)
    ).slice(0, 5)
  }

  return {
    products,
    fetchProducts,
    fetchProduct,
    searchProducts
  }
}