import { ref } from 'vue'
import type { ProductData } from '~/server/types/product'

const products = ref<ProductData[]>([])

// Standalone export for Header.vue compatibility
export async function searchProducts(query: string): Promise<ProductData[]> {
  const q = query.toLowerCase().trim()
  if (!q) return []
  try {
    const all = await $fetch<ProductData[]>('/api/products')
    return all.filter(
      p => p.name.toLowerCase().includes(q) || p.article.toLowerCase().includes(q)
    ).slice(0, 5)
  } catch {
    return []
  }
}

export const useProducts = () => {
  const fetchProducts = async (filters?: Record<string, any>): Promise<ProductData[]> => {
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
    products.value = await $fetch<ProductData[]>(url)
    return products.value
  }

  const fetchProduct = async (id: number): Promise<ProductData | null> => {
    try {
      return await $fetch<ProductData>(`/api/products/${id}`)
    } catch {
      return null
    }
  }

  return {
    products,
    fetchProducts,
    fetchProduct,
    searchProducts: searchProducts
  }
}
