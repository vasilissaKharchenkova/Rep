<script setup>
import { ref } from 'vue'

const activeTab = ref('profile')

const form = ref({
  lastName: '',
  firstName: '',
  middleName: '',
  phone: '',
  subscribe: '',
  address: '',
  comment: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  newsletter: true
})

const save = () => {
  console.log('Save profile', form.value)
}
</script>

<template>
  <main class="py-16 bg-white min-h-screen">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <!-- Sidebar menu -->
        <div class="lg:col-span-1">
          <nav class="space-y-4">
            <button @click="activeTab = 'profile'" 
                    class="w-full flex items-center gap-3 px-4 py-3 text-left"
                    :class="activeTab === 'profile' ? 'border-b-2 border-textMain font-medium' : 'text-textMain/70'">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"/></svg>
              Профиль и настройки
            </button>
            
            <button @click="activeTab = 'favorites'" 
                    class="w-full flex items-center gap-3 px-4 py-3 text-left text-textMain/70">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c0 4.418-7 10-7 10s-7-5.582-7-10a7 7 0 0 1 14 0z"/></svg>
              Избранное
            </button>
            
            <button @click="activeTab = 'orders'" 
                    class="w-full flex items-center gap-3 px-4 py-3 text-left text-textMain/70">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0 4 4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              Мои заказы
            </button>
          </nav>
        </div>

        <!-- Profile form -->
        <div class="lg:col-span-3">
          <h1 class="font-heading text-textMain text-4xl md:text-5xl mb-12">Профиль пользователя</h1>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <!-- Personal data -->
            <div>
              <h2 class="font-heading text-textMain text-2xl mb-8">Личные данные</h2>
              
              <div class="space-y-5">
                <div>
                  <input v-model="form.lastName" 
                         type="text" 
                         placeholder="Фамилия"
                         class="w-full px-6 py-4 border border-textMain/60 rounded-2xl bg-transparent text-textMain placeholder:text-textMain/50 focus:outline-none focus:border-textMain transition-colors">
                </div>

                <div>
                  <input v-model="form.firstName" 
                         type="text" 
                         placeholder="Имя"
                         class="w-full px-6 py-4 border border-textMain/60 rounded-2xl bg-transparent text-textMain placeholder:text-textMain/50 focus:outline-none focus:border-textMain transition-colors">
                </div>

                <div>
                  <input v-model="form.middleName" 
                         type="text" 
                         placeholder="Отчество"
                         class="w-full px-6 py-4 border border-textMain/60 rounded-2xl bg-transparent text-textMain placeholder:text-textMain/50 focus:outline-none focus:border-textMain transition-colors">
                </div>

                <div>
                  <input v-model="form.phone" 
                         type="tel" 
                         placeholder="Телефон"
                         class="w-full px-6 py-4 border border-textMain/60 rounded-2xl bg-transparent text-textMain placeholder:text-textMain/50 focus:outline-none focus:border-textMain transition-colors">
                </div>

                <div class="flex items-center gap-3 mt-4">
                  <input v-model="form.newsletter" type="checkbox" id="newsletter" class="w-4 h-4">
                  <label for="newsletter" class="font-body text-textMain/70 text-sm">Подписаться на анонсы событий и акции</label>
                </div>
              </div>
            </div>

            <!-- Delivery address -->
            <div>
              <h2 class="font-heading text-textMain text-2xl mb-8">Адрес доставки</h2>
              
              <div class="space-y-5">
                <div>
                  <input v-model="form.address" 
                         type="text" 
                         placeholder="Адрес доставки"
                         class="w-full px-6 py-4 border border-textMain/60 rounded-2xl bg-transparent text-textMain placeholder:text-textMain/50 focus:outline-none focus:border-textMain transition-colors">
                </div>

                <div>
                  <textarea v-model="form.comment" 
                            placeholder="Комментарий курьеру"
                            rows="6"
                            class="w-full px-6 py-4 border border-textMain/60 rounded-2xl bg-transparent text-textMain placeholder:text-textMain/50 focus:outline-none focus:border-textMain transition-colors resize-none"></textarea>
                </div>
              </div>
            </div>
          </div>

          <!-- Change password -->
          <div class="mt-16 max-w-md">
            <h2 class="font-heading text-textMain text-2xl mb-8">Смена пароля</h2>
            
            <div class="space-y-5">
              <div>
                <input v-model="form.currentPassword" 
                       type="password" 
                       placeholder="Ваш текущий пароль"
                       class="w-full px-6 py-4 border border-textMain/60 rounded-2xl bg-transparent text-textMain placeholder:text-textMain/50 focus:outline-none focus:border-textMain transition-colors">
              </div>

              <div>
                <input v-model="form.newPassword" 
                       type="password" 
                       placeholder="Новый пароль"
                       class="w-full px-6 py-4 border border-textMain/60 rounded-2xl bg-transparent text-textMain placeholder:text-textMain/50 focus:outline-none focus:border-textMain transition-colors">
              </div>

              <div>
                <input v-model="form.confirmPassword" 
                       type="password" 
                       placeholder="Новый пароль еще раз"
                       class="w-full px-6 py-4 border border-textMain/60 rounded-2xl bg-transparent text-textMain placeholder:text-textMain/50 focus:outline-none focus:border-textMain transition-colors">
              </div>

              <button @click="save" 
                      class="mt-6 px-10 py-3 bg-brown text-white rounded-full font-body hover:bg-brown/90 transition-colors">
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-primary py-16 mt-16">
      <div class="container mx-auto px-4 text-center">
        <h2 class="font-heading text-textMain text-5xl">CLICKWOOD</h2>
      </div>
    </footer>
  </main>
</template>