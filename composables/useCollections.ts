import { ref } from 'vue'

export interface CollectionItem {
  productId: number
  quantity: number
}

export interface CollectionProduct {
  id: number
  name: string
  article: string
  price: number
  image: string
  colorVariants?: { name: string; color: string; image: string; images: string[] }[]
}

export interface Collection {
  id: number
  name: string
  slug: string
  description: string
  fullDescription: string
  image: string
  items: CollectionItem[]
  discount: number
  totalPrice: number
  setPrice: number
  products: CollectionProduct[]
  createdAt: string
  updatedAt: string
}

const collections = ref<Collection[]>([])

export const useCollections = () => {
  const fetchCollections = async (): Promise<Collection[]> => {
    try {
      collections.value = await $fetch<Collection[]>('/api/collections')
    } catch {
      collections.value = []
    }
    return collections.value
  }

  const fetchCollection = async (slug: string): Promise<Collection | null> => {
    try {
      return await $fetch<Collection>(`/api/collections/${slug}`)
    } catch {
      return null
    }
  }

  return {
    collections,
    fetchCollections,
    fetchCollection
  }
}