// Pure TypeScript types — no mongoose dependency
// These are used both on server and client side

export interface ProductColorVariant {
  name: string
  color: string
  image?: string
  images?: string[]
}

export interface ProductData {
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
  discount: number
  rating: number
  reviewsCount: number
  questionsCount: number
  showOnSlider: boolean
  sliderPosition: number
  createdAt: string
  updatedAt: string
}