<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useQuestions } from '~/composables/useQuestions'
import { useAuth } from '~/composables/useAuth'

const props = defineProps<{
  productId: number
}>()

const { isLoggedIn } = useAuth()
const { questions, loading, fetchQuestions, submitQuestion } = useQuestions()

const newText = ref('')
const submitting = ref(false)
const submitError = ref('')

const handleSubmit = async () => {
  if (!newText.value.trim() || submitting.value) return
  submitting.value = true
  submitError.value = ''
  const ok = await submitQuestion(props.productId, newText.value.trim())
  submitting.value = false
  if (ok) {
    newText.value = ''
  } else {
    submitError.value = 'Не удалось отправить вопрос'
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
  fetchQuestions(props.productId)
})

watch(() => props.productId, () => {
  fetchQuestions(props.productId)
})
</script>

<template>
  <div class="space-y-8">
    <!-- Loading -->
    <div v-if="loading" class="text-gray-500">Загрузка вопросов...</div>

    <!-- Questions List -->
    <div v-else-if="questions.length > 0" class="space-y-6">
      <div v-for="question in questions" :key="question._id" class="border-b border-gray-200 pb-6">
        <div class="flex items-center justify-between mb-2">
          <span class="font-medium text-textMain">{{ question.userName }}</span>
          <span class="text-sm text-gray-400">{{ formatDate(question.createdAt) }}</span>
        </div>
        <p class="text-textMain/80 leading-relaxed mb-3">{{ question.text }}</p>

        <!-- Answer -->
        <div v-if="question.answer" class="ml-6 pl-4 border-l-2 border-primary bg-primary/5 rounded-r-lg p-4">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-sm font-medium text-primary">Ответ магазина</span>
            <span v-if="question.answeredAt" class="text-xs text-gray-400">{{ formatDate(question.answeredAt) }}</span>
          </div>
          <p class="text-textMain/80 leading-relaxed">{{ question.answer }}</p>
        </div>

        <!-- No answer yet -->
        <p v-else class="text-sm text-gray-400 ml-6">Ожидает ответа</p>
      </div>
    </div>

    <!-- No questions -->
    <div v-else class="text-gray-500">
      Пока нет вопросов. Задайте свой первый вопрос!
    </div>

    <!-- Error -->
    <div v-if="submitError" class="text-red-500 text-sm">{{ submitError }}</div>

    <!-- Question Form -->
    <div v-if="isLoggedIn" class="border-t border-gray-200 pt-8">
      <h3 class="text-xl font-heading text-textMain mb-4">Задать вопрос</h3>

      <textarea v-model="newText"
                placeholder="Напишите ваш вопрос о товаре"
                rows="3"
                class="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:border-primary transition-colors font-body">
      </textarea>

      <button @click="handleSubmit"
              :disabled="submitting || !newText.trim()"
              class="mt-4 px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 cursor-pointer border-none font-body">
        {{ submitting ? 'Отправка...' : 'Отправить вопрос' }}
      </button>
    </div>

    <!-- Not logged in -->
    <div v-else class="border-t border-gray-200 pt-8">
      <NuxtLink to="/login" class="inline-block px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors font-body">
        Войдите, чтобы задать вопрос
      </NuxtLink>
    </div>
  </div>
</template>