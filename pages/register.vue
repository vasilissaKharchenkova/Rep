<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const router = useRouter()
const { register } = useAuth()

const name = ref('')
const phone = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleRegister = async () => {
  error.value = ''
  loading.value = true
  try {
    await register(phone.value, password.value, name.value)
    router.push('/')
  } catch (e: any) {
    error.value = e?.data?.statusMessage || 'Ошибка регистрации. Попробуйте другой телефон.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="min-h-screen bg-white">
    <div class="container mx-auto px-4 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 overflow-hidden border border-textMain/20 rounded-3xl max-w-6xl mx-auto">
        <!-- Left image column -->
        <div class="relative">
          <img src="../public/images/register_bg.png" 
               alt="Интерьер" 
               class="w-full h-full min-h-[500px] lg:min-h-[700px] object-cover">
        </div>

        <!-- Right form column -->
        <div class="flex flex-col items-center justify-center p-8 lg:p-16">
          <h1 class="font-heading text-textMain text-4xl md:text-5xl mb-12">Регистрация</h1>

          <form @submit.prevent="handleRegister" class="w-full max-w-sm space-y-6">
            <div v-if="error" class="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">
              {{ error }}
            </div>

            <div>
              <input v-model="name" 
                     type="text" 
                     placeholder="Имя"
                     class="w-full px-6 py-4 border border-textMain/30 rounded-2xl bg-transparent text-textMain placeholder:text-textMain/50 focus:outline-none focus:border-textMain transition-colors">
            </div>

            <div>
              <input v-model="phone" 
                     type="tel" 
                     placeholder="+7 (___) ___-__-__"
                     inputmode="numeric"
                     class="w-full px-6 py-4 border border-textMain/30 rounded-2xl bg-transparent text-textMain placeholder:text-textMain/50 focus:outline-none focus:border-textMain transition-colors">
            </div>

            <div>
              <input v-model="password" 
                     type="password" 
                     placeholder="Пароль"
                     class="w-full px-6 py-4 border border-textMain/30 rounded-2xl bg-transparent text-textMain placeholder:text-textMain/50 focus:outline-none focus:border-textMain transition-colors">
            </div>

            <button type="submit" :disabled="loading"
                    class="w-full py-4 bg-brown text-white rounded-full font-body hover:bg-brown/90 transition-colors mt-4 disabled:opacity-50">
              {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
            </button>

            <div class="text-center pt-6">
              <span class="font-body text-textMain/60 text-sm">У вас уже есть аккаунт? </span>
              <NuxtLink to="/login" class="font-body text-textMain text-sm underline">Войти</NuxtLink>
            </div>
          </form>
        </div>
      </div>
    </div>

  </main>
</template>