<template>
  <Transition name="notification">
    <div
      v-if="notificationVisible"
      class="fixed top-6 right-6 z-[100] max-w-sm w-full"
    >
      <div class="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-border p-5 flex items-start gap-4">
        <!-- Success icon -->
        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg class="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <!-- Text -->
        <div class="flex-1 min-w-0">
          <p class="font-body text-sm text-textMain font-medium">{{ notificationText }}</p>
          <NuxtLink
            to="/cart"
            class="inline-block mt-2 text-xs text-primary font-body hover:text-primaryDark transition-colors underline underline-offset-2"
          >
            Перейти в корзину →
          </NuxtLink>
        </div>

        <!-- Close button -->
        <button
          @click="notificationVisible = false"
          class="w-6 h-6 flex items-center justify-center flex-shrink-0 text-gray-400 hover:text-textMain transition-colors cursor-pointer bg-transparent border-none rounded-full hover:bg-gray-100"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useCart } from '~/composables/useCart'

const { notificationText, notificationVisible } = useCart()
</script>

<style scoped>
.notification-enter-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.notification-leave-active {
  transition: all 0.2s ease-in;
}
.notification-enter-from {
  opacity: 0;
  transform: translateX(60px) scale(0.95);
}
.notification-leave-to {
  opacity: 0;
  transform: translateX(40px) scale(0.95);
}
</style>