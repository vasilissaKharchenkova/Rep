import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

export interface QuestionData {
  _id: string
  productId: number
  userId: string
  userName: string
  text: string
  answer?: string
  answeredAt?: string
  createdAt: string
  updatedAt: string
}

export const useQuestions = () => {
  const { authFetch } = useAuth()
  const questions = ref<QuestionData[]>([])
  const loading = ref(false)
  const error = ref('')

  const fetchQuestions = async (productId: number): Promise<void> => {
    loading.value = true
    error.value = ''
    try {
      const data = await $fetch<QuestionData[]>('/api/questions', {
        params: { productId }
      })
      questions.value = data
    } catch (e: any) {
      error.value = e?.statusMessage || 'Ошибка загрузки вопросов'
    } finally {
      loading.value = false
    }
  }

  const submitQuestion = async (productId: number, text: string): Promise<boolean> => {
    error.value = ''
    try {
      await authFetch('/api/questions', {
        method: 'POST',
        body: { productId, text }
      })
      await fetchQuestions(productId)
      return true
    } catch (e: any) {
      error.value = e?.statusMessage || 'Ошибка при отправке вопроса'
      return false
    }
  }

  const answerQuestion = async (questionId: string, productId: number, answer: string): Promise<boolean> => {
    error.value = ''
    try {
      await authFetch(`/api/questions/${questionId}`, {
        method: 'PUT',
        body: { answer }
      })
      await fetchQuestions(productId)
      return true
    } catch (e: any) {
      error.value = e?.statusMessage || 'Ошибка при ответе на вопрос'
      return false
    }
  }

  const deleteQuestion = async (questionId: string, productId: number): Promise<boolean> => {
    error.value = ''
    try {
      await authFetch(`/api/questions/${questionId}`, {
        method: 'DELETE'
      })
      await fetchQuestions(productId)
      return true
    } catch (e: any) {
      error.value = e?.statusMessage || 'Ошибка при удалении вопроса'
      return false
    }
  }

  return {
    questions,
    loading,
    error,
    fetchQuestions,
    submitQuestion,
    answerQuestion,
    deleteQuestion
  }
}