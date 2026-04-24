<script setup>
import { ref } from 'vue'

const phone = ref('')
const password = ref('')

const login = () => {
  console.log('Login', { phone: phone.value, password: password.value })
}
</script>

<template>
  <main class="min-h-screen bg-white">
    <div class="container mx-auto px-4 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 overflow-hidden border border-textMain/20 rounded-3xl max-w-6xl mx-auto">
        <!-- Left image column -->
        <div class="relative">
          <img src="https://images.unsplash.com/photo-1600566753190-17f0baa206bf?w=900&h=1000&fit=crop" 
               alt="Интерьер" 
               class="w-full h-full min-h-[500px] lg:min-h-[700px] object-cover">
        </div>

        <!-- Right form column -->
        <div class="flex flex-col items-center justify-center p-8 lg:p-16">
          <h1 class="font-heading text-textMain text-4xl md:text-5xl mb-12">Вход</h1>

          <form @submit.prevent="login" class="w-full max-w-sm space-y-6">
            <div>
              <input v-model="phone" 
                     type="tel" 
                     placeholder="Телефон"
                     class="w-full px-6 py-4 border border-textMain/30 rounded-2xl bg-transparent text-textMain placeholder:text-textMain/50 focus:outline-none focus:border-textMain transition-colors">
            </div>

            <div>
              <input v-model="password" 
                     type="password" 
                     placeholder="Пароль"
                     class="w-full px-6 py-4 border border-textMain/30 rounded-2xl bg-transparent text-textMain placeholder:text-textMain/50 focus:outline-none focus:border-textMain transition-colors">
            </div>

            <button type="submit" 
                    class="w-full py-4 bg-brown text-white rounded-full font-body hover:bg-brown/90 transition-colors mt-4">
              Войти
            </button>

            <div class="text-center pt-6">
              <span class="font-body text-textMain/60 text-sm">Нет аккаунта? </span>
              <NuxtLink to="/register" class="font-body text-textMain text-sm underline">Зарегистрироваться</NuxtLink>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-primary py-16">
      <div class="container mx-auto px-4 text-center">
        <h2 class="font-heading text-textMain text-5xl">CLICKWOOD</h2>
      </div>
    </footer>
  </main>
</template>