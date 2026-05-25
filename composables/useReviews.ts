import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

export interface ReviewData {
  _id: string
  productId: number
  userId: string
  userName: string
  rating: number
  text: string
  createdAt: string
  updatedAt: string
}

export const useReviews = () => {
  const { authFetch } = useAuth()
  const reviews = ref<ReviewData[]>([])
  const loading = ref(false)
  const error = ref('')

  const fetchReviews = async (productId: number): Promise<void> => {
    loading.value = true
    error.value = ''
    try {
      const data = await $fetch<ReviewData[]>('/api/reviews', {
        params: { productId }
      })
      reviews.value = data
    } catch (e: any) {
      error.value = e?.statusMessage || 'Ошибка загрузки отзывов'
    } finally {
      loading.value = false
    }
  }

  const submitReview = async (productId: number, rating: number, text: string): Promise<boolean> => {
    error.value = ''
    try {
      await authFetch('/api/reviews', {
        method: 'POST',
        body: { productId, rating, text }
      })
      await fetchReviews(productId)
      return true
    } catch (e: any) {
      error.value = e?.statusMessage || 'Ошибка при отправке отзыва'
      return false
    }
  }

  const updateReview = async (reviewId: string, productId: number, rating: number, text: string): Promise<boolean> => {
    error.value = ''
    try {
      await authFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        body: { rating, text }
      })
      await fetchReviews(productId)
      return true
    } catch (e: any) {
      error.value = e?.statusMessage || 'Ошибка при редактировании отзыва'
      return false
    }
  }

  const deleteReview = async (reviewId: string, productId: number): Promise<boolean> => {
    error.value = ''
    try {
      await authFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
      })
      await fetchReviews(productId)
      return true
    } catch (e: any) {
      error.value = e?.statusMessage || 'Ошибка при удалении отзыва'
      return false
    }
  }

  return {
    reviews,
    loading,
    error,
    fetchReviews,
    submitReview,
    updateReview,
    deleteReview
  }
}