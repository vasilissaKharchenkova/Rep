<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const router = useRouter()
const route = useRoute()
const { isLoggedIn } = useAuth()

// ─── Get data from query params ─────────────
const orderId = computed(() => route.query.orderId as string || '—')
const totalPrice = computed(() => {
  const val = route.query.totalPrice as string
  return val ? Number(val).toLocaleString('ru-RU') : '—'
})
const createdAt = computed(() => {
  const val = route.query.createdAt as string
  return val ? new Date(val).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) : '—'
})

// ─── Auto-redirect timer (60 seconds) ──────
const secondsLeft = ref(60)
let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  timer = setInterval(() => {
    secondsLeft.value--
    if (secondsLeft.value <= 0) {
      if (timer) clearInterval(timer)
      router.push('/')
    }
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

// ─── Animation state ───────────────────────
const pageVisible = ref(false)

onMounted(() => {
  // Trigger fade-in after mount
  requestAnimationFrame(() => {
    pageVisible.value = true
  })
})
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50/50"
    :class="pageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    style="transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
  >
    <div class="w-full max-w-md">
      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-10 md:p-12 text-center border border-border">
        <!-- Success icon with scale-in animation -->
        <div
          class="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8"
          :class="pageVisible ? 'scale-100' : 'scale-0'"
          style="transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s"
        >
          <svg
            class="w-10 h-10 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <!-- Title -->
        <h1
          class="font-heading text-textMain text-3xl md:text-4xl mb-3"
          :class="pageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition: all 0.5s ease 0.35s"
        >
          Спасибо за заказ!
        </h1>

        <!-- Subtitle -->
        <p
          class="font-body text-textMain/70 text-lg mb-2"
          :class="pageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition: all 0.5s ease 0.45s"
        >
          Ваш заказ успешно оформлен.
        </p>

        <p
          class="font-body text-textMain/50 text-sm mb-8"
          :class="pageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition: all 0.5s ease 0.55s"
        >
          Информацию о заказе вы можете найти в личном кабинете.
        </p>

        <!-- Order details card -->
        <div
          class="bg-gray-50 rounded-xl p-6 mb-8 space-y-4 text-left"
          :class="pageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition: all 0.5s ease 0.65s"
        >
          <div class="flex items-center justify-between">
            <span class="text-[11px] uppercase tracking-widest text-gray-400 font-body">Номер заказа</span>
            <span class="font-heading text-primary text-lg">{{ orderId }}</span>
          </div>
          <div class="flex items-center justify-between pt-3 border-t border-border">
            <span class="text-[11px] uppercase tracking-widest text-gray-400 font-body">Дата</span>
            <span class="font-body text-textMain text-sm">{{ createdAt }}</span>
          </div>
          <div class="flex items-center justify-between pt-3 border-t border-border">
            <span class="text-[11px] uppercase tracking-widest text-gray-400 font-body">Итого</span>
            <span class="font-heading text-primary text-xl">{{ totalPrice }} ₽</span>
          </div>
        </div>

        <!-- Buttons -->
        <div
          class="space-y-3"
          :class="pageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition: all 0.5s ease 0.75s"
        >
          <button
            v-if="isLoggedIn"
            @click="router.push('/account')"
            class="w-full py-4 bg-primary text-white rounded-xl font-body text-lg hover:bg-primaryDark transition-all shadow-sm active:scale-[0.98] cursor-pointer border-none"
          >
            Перейти в личный кабинет
          </button>
          <button
            v-else
            disabled
            class="w-full py-4 bg-gray-200 text-gray-400 rounded-xl font-body text-lg cursor-not-allowed border-none"
          >
            Перейти в личный кабинет
          </button>

          <NuxtLink
            to="/"
            class="block w-full py-4 border-2 border-border text-textMain rounded-xl font-body text-lg hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-[0.98]"
          >
            Вернуться на главную
          </NuxtLink>
        </div>
      </div>

      <!-- Auto-redirect countdown -->
      <p
        class="text-center text-sm text-gray-400 font-body mt-6"
        :class="pageVisible ? 'opacity-100' : 'opacity-0'"
        style="transition: opacity 0.5s ease 0.85s"
      >
        Автоматический переход через {{ secondsLeft }}...
      </p>
    </div>
  </div>
</template>