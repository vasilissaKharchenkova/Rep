<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useReviews } from '~/composables/useReviews'
import { useAuth } from '~/composables/useAuth'

const props = defineProps<{
  productId: number
}>()

const { isLoggedIn, authFetch, user } = useAuth()
const { reviews, loading, fetchReviews, submitReview, updateReview } = useReviews()

const canReview = ref(false)
const hasReviewed = ref(false)
const checkingAccess = ref(true)

const newRating = ref(5)
const newText = ref('')
const submitting = ref(false)
const submitError = ref('')
const editingReviewId = ref<string | null>(null)

const isOwnReview = (reviewUserId: string) => {
  return user.value?._id === reviewUserId
}

const checkReviewAccess = async () => {
  checkingAccess.value = true
  try {
    const res: any = await authFetch('/api/reviews/check', {
      params: { productId: props.productId }
    })
    canReview.value = res.canReview
    hasReviewed.value = res.hasReviewed
  } catch {
    canReview.value = false
    hasReviewed.value = false
  } finally {
    checkingAccess.value = false
  }
}

const startEdit = (review: { _id: string; rating: number; text: string }) => {
  editingReviewId.value = review._id
  newRating.value = review.rating
  newText.value = review.text
}

const cancelEdit = () => {
  editingReviewId.value = null
  newRating.value = 5
  newText.value = ''
  submitError.value = ''
}

const handleSubmit = async () => {
  if (!newRating.value || submitting.value) return
  submitting.value = true
  submitError.value = ''

  let ok = false
  if (editingReviewId.value) {
    ok = await updateReview(editingReviewId.value, props.productId, newRating.value, newText.value)
  } else {
    ok = await submitReview(props.productId, newRating.value, newText.value)
  }

  submitting.value = false
  if (ok) {
    newRating.value = 5
    newText.value = ''
    editingReviewId.value = null
    hasReviewed.value = true
  } else {
    submitError.value = editingReviewId.value
      ? 'Не удалось обновить отзыв'
      : 'Не удалось отправить отзыв. Возможно, вы ещё не купили этот товар.'
  }
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  fetchReviews(props.productId)
  checkReviewAccess()
})

watch(() => props.productId, () => {
  fetchReviews(props.productId)
  checkReviewAccess()
})
</script>

<template>
  <div class="space-y-8">
    <!-- Loading -->
    <div v-if="loading" class="text-gray-500">Загрузка отзывов...</div>

    <!-- Reviews List -->
    <div v-else-if="reviews.length > 0" class="space-y-6">
      <div v-for="review in reviews" :key="review._id" class="border-b border-gray-200 pb-6">
        <div class="flex items-center justify-between mb-2">
          <span class="font-medium text-textMain">{{ review.userName }}</span>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-400">{{ formatDate(review.createdAt) }}</span>
            <button v-if="isLoggedIn && isOwnReview(review.userId)"
                    @click="startEdit(review)"
                    class="text-sm text-primary hover:text-primary/70 transition-colors cursor-pointer border-none bg-transparent">
              Редактировать
            </button>
          </div>
        </div>
        <div class="flex items-center gap-1 mb-3">
          <span v-for="star in 5" :key="star" class="text-lg" :class="star <= review.rating ? 'text-amber-500' : 'text-gray-300'">★</span>
        </div>
        <p v-if="review.text" class="text-textMain/80 leading-relaxed">{{ review.text }}</p>
      </div>
    </div>

    <!-- No reviews -->
    <div v-else class="text-gray-500">
      Пока нет отзывов. Будьте первым, кто оставит отзыв!
    </div>

    <!-- Error -->
    <div v-if="submitError" class="text-red-500 text-sm">{{ submitError }}</div>

    <!-- Review Form -->
    <div v-if="isLoggedIn && checkingAccess" class="text-gray-500 text-sm">Проверка возможности оставить отзыв...</div>
    
    <div v-else-if="isLoggedIn && (editingReviewId || (canReview && !hasReviewed))" class="border-t border-gray-200 pt-8">
      <h3 class="text-xl font-heading text-textMain mb-4">{{ editingReviewId ? 'Редактировать отзыв' : 'Оставить отзыв' }}</h3>

      <!-- Rating selector -->
      <div class="flex items-center gap-2 mb-4">
        <span class="text-sm text-gray-500">Ваша оценка:</span>
        <div class="flex items-center gap-1">
          <button v-for="star in 5" :key="star" type="button"
                  @click="newRating = star"
                  class="text-2xl cursor-pointer transition-colors border-none"
                  :class="star <= newRating ? 'text-amber-500' : 'text-gray-300 hover:text-amber-300'">
            ★
          </button>
        </div>
      </div>

      <!-- Text field -->
      <textarea v-model="newText"
                placeholder="Напишите ваш отзыв (необязательно)"
                rows="4"
                class="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-primary transition-colors font-body">
      </textarea>

      <!-- Submit button -->
      <div class="flex items-center gap-4">
        <button @click="handleSubmit"
                :disabled="submitting"
                class="px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 cursor-pointer border-none font-body">
          {{ submitting ? 'Сохранение...' : editingReviewId ? 'Сохранить' : 'Отправить отзыв' }}
        </button>
        <button v-if="editingReviewId"
                @click="cancelEdit"
                class="px-6 py-3 border border-gray-300 text-gray-600 rounded-full hover:bg-gray-50 transition-colors cursor-pointer border-none font-body">
          Отмена
        </button>
      </div>
    </div>

    <!-- Already reviewed -->
    <div v-else-if="isLoggedIn && hasReviewed" class="text-sm text-gray-500 border-t border-gray-200 pt-8">
      Вы уже оставили отзыв на этот товар. Спасибо!
    </div>

    <!-- Not purchased -->
    <div v-else-if="isLoggedIn && !canReview" class="text-sm text-gray-500 border-t border-gray-200 pt-8">
      Вы можете оставить отзыв только после покупки товара.
    </div>

    <!-- Not logged in -->
    <div v-else class="border-t border-gray-200 pt-8">
      <NuxtLink to="/login" class="inline-block px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors font-body">
        Войдите, чтобы оставить отзыв
      </NuxtLink>
    </div>
  </div>
</template>