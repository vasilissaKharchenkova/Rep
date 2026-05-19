<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const router = useRouter()
const { isLoggedIn, isAdmin, user, fetchMe, authFetch, logout, updateProfile } = useAuth()

const activeTab = ref('profile')
const orders = ref<any[]>([])
const loading = ref(true)

const form = ref({
  firstName: '',
  lastName: '',
  middleName: '',
  email: '',
  city: '',
  street: '',
  apartment: '',
  zipCode: '',
  address: '',
  newsletter: true
})

onMounted(async () => {
  await fetchMe()
  if (!isLoggedIn.value) {
    router.push('/login')
    return
  }

  if (user.value) {
    form.value = {
      firstName: user.value.firstName || '',
      lastName: user.value.lastName || '',
      middleName: user.value.middleName || '',
      email: user.value.email || '',
      city: user.value.city || '',
      street: user.value.street || '',
      apartment: user.value.apartment || '',
      zipCode: user.value.zipCode || '',
      address: user.value.address || '',
      newsletter: user.value.newsletter ?? false
    }
  }

  try {
    orders.value = await authFetch('/api/orders')
  } catch {}
  loading.value = false
})

const statusLabels: Record<string, string> = {
  new: 'Новый', processing: 'В обработке', shipped: 'Отправлен', delivered: 'Доставлен', cancelled: 'Отменён'
}

const saving = ref(false)
const saveSuccess = ref(false)

async function save() {
  saving.value = true
  saveSuccess.value = false
  try {
    await updateProfile(form.value)
    saveSuccess.value = true
    setTimeout(() => { saveSuccess.value = false }, 3000)
  } catch (e: any) {
    alert(e?.data?.statusMessage || 'Ошибка сохранения профиля')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <main v-if="!loading && isLoggedIn" class="py-16 bg-white min-h-screen">
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
            
            <button @click="activeTab = 'orders'" 
                    class="w-full flex items-center gap-3 px-4 py-3 text-left"
                    :class="activeTab === 'orders' ? 'border-b-2 border-textMain font-medium' : 'text-textMain/70'">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0 4 4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              Мои заказы
            </button>

            <!-- Admin link (only for admins) -->
            <NuxtLink v-if="isAdmin" to="/admin"
                      class="flex items-center gap-3 px-4 py-3 text-left text-textMain/70 hover:text-textMain transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17"/></svg>
              Админ-панель
            </NuxtLink>

            <!-- Logout button -->
            <button @click="logout(); router.push('/')"
                    class="w-full flex items-center gap-3 px-4 py-3 text-left text-red-500/70 hover:text-red-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m7 14l5-5-5-5m5 5H9"/></svg>
              Выйти
            </button>
          </nav>
        </div>

        <!-- Profile form -->
        <div class="lg:col-span-3" v-if="activeTab === 'profile'">
          <h1 class="font-heading text-textMain text-4xl md:text-5xl mb-12">Профиль пользователя</h1>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <!-- Personal data -->
            <div>
              <h2 class="font-heading text-textMain text-2xl mb-8">Личные данные</h2>
              
              <div class="space-y-5">
                <div>
                  <input v-model="form.lastName" type="text" placeholder="Фамилия"
                         class="w-full px-6 py-4 border border-textMain/60 rounded-2xl bg-transparent text-textMain placeholder:text-textMain/50 focus:outline-none focus:border-textMain transition-colors">
                </div>
                <div>
                  <input v-model="form.firstName" type="text" placeholder="Имя"
                         class="w-full px-6 py-4 border border-textMain/60 rounded-2xl bg-transparent text-textMain placeholder:text-textMain/50 focus:outline-none focus:border-textMain transition-colors">
                </div>
                <div>
                  <input v-model="form.middleName" type="text" placeholder="Отчество"
                         class="w-full px-6 py-4 border border-textMain/60 rounded-2xl bg-transparent text-textMain placeholder:text-textMain/50 focus:outline-none focus:border-textMain transition-colors">
                </div>
                <div>
                  <input v-model="form.email" type="email" placeholder="Email"
                         class="w-full px-6 py-4 border border-textMain/60 rounded-2xl bg-transparent text-textMain placeholder:text-textMain/50 focus:outline-none focus:border-textMain transition-colors">
                </div>
                <div>
                  <p class="text-sm text-gray-400 px-6 py-4">Телефон: {{ user?.phone }}</p>
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
                  <input v-model="form.city" type="text" placeholder="Город"
                         class="w-full px-6 py-4 border border-textMain/60 rounded-2xl bg-transparent text-textMain placeholder:text-textMain/50 focus:outline-none focus:border-textMain transition-colors">
                </div>
                <div>
                  <input v-model="form.street" type="text" placeholder="Улица, дом"
                         class="w-full px-6 py-4 border border-textMain/60 rounded-2xl bg-transparent text-textMain placeholder:text-textMain/50 focus:outline-none focus:border-textMain transition-colors">
                </div>
                <div>
                  <input v-model="form.apartment" type="text" placeholder="Квартира"
                         class="w-full px-6 py-4 border border-textMain/60 rounded-2xl bg-transparent text-textMain placeholder:text-textMain/50 focus:outline-none focus:border-textMain transition-colors">
                </div>
                <div>
                  <input v-model="form.zipCode" type="text" placeholder="Индекс"
                         class="w-full px-6 py-4 border border-textMain/60 rounded-2xl bg-transparent text-textMain placeholder:text-textMain/50 focus:outline-none focus:border-textMain transition-colors">
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 flex items-center gap-4">
            <button @click="save" :disabled="saving" class="px-10 py-3 bg-brown text-white rounded-full font-body hover:bg-brown/90 transition-colors disabled:opacity-50">
              {{ saving ? 'Сохранение...' : 'Сохранить' }}
            </button>
            <span v-if="saveSuccess" class="text-green-600 font-body text-sm">✓ Профиль сохранён</span>
          </div>
        </div>

        <!-- Orders tab -->
        <div class="lg:col-span-3" v-if="activeTab === 'orders'">
          <h1 class="font-heading text-textMain text-4xl md:text-5xl mb-12">Мои заказы</h1>

          <div v-if="orders.length === 0" class="text-center py-20 text-gray-400">
            У вас пока нет заказов
          </div>

          <div v-else class="space-y-4">
            <div v-for="order in orders" :key="order._id" class="border border-border rounded-xl p-6">
              <div class="flex items-center justify-between mb-3">
                <div>
                  <span class="font-heading text-lg text-textMain">Заказ #{{ order._id?.slice(-6) }}</span>
                  <span class="text-sm text-gray-400 ml-4">{{ new Date(order.createdAt).toLocaleDateString('ru-RU') }}</span>
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-body"
                      :class="{
                        'bg-blue-50 text-blue-600': order.status === 'new',
                        'bg-yellow-50 text-yellow-600': order.status === 'processing',
                        'bg-purple-50 text-purple-600': order.status === 'shipped',
                        'bg-green-50 text-green-600': order.status === 'delivered',
                        'bg-red-50 text-red-600': order.status === 'cancelled'
                      }">
                  {{ statusLabels[order.status] || order.status }}
                </span>
              </div>
              <div v-for="item in order.items" :key="item.article" class="flex items-center gap-3 text-sm py-1">
                <span class="text-textMain">{{ item.name }}</span>
                <span class="text-gray-400">× {{ item.quantity }}</span>
                <span class="text-gray-400">{{ item.price.toLocaleString('ru-RU') }} ₽</span>
              </div>
              <div class="font-heading text-textMain mt-2">Итого: {{ order.totalPrice.toLocaleString('ru-RU') }} ₽</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>