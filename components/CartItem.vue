<script setup>
import { useCart } from '~/composables/useCart'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
const { updateQuantity, removeItem } = useCart()
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-6 p-6 bg-white border border-border rounded-xl">
    <img :src="item.image" :alt="item.name" class="w-full sm:w-32 h-32 object-cover rounded-lg">
    
    <div class="flex-1 flex flex-col sm:flex-row justify-between gap-4">
      <div>
        <h3 class="font-heading text-textMain text-xl">{{ item.name }}</h3>
        <p class="font-body text-textMain/60 text-sm mt-1">Артикул: {{ item.article }}</p>
        <p class="font-heading text-primary text-lg mt-2">{{ item.price.toLocaleString('ru-RU') }} ₽</p>
      </div>
      
      <div class="flex sm:flex-col items-center justify-between sm:items-end gap-4">
        <div class="flex items-center border border-border rounded-full overflow-hidden">
          <button @click="updateQuantity(item.id, item.quantity - 1)" 
                  class="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors">
            −
          </button>
          <span class="w-12 text-center font-medium">{{ item.quantity }}</span>
          <button @click="updateQuantity(item.id, item.quantity + 1)"
                  class="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors">
            +
          </button>
        </div>
        
        <div class="flex items-center justify-between sm:flex-col gap-4">
          <p class="font-heading text-textMain text-xl">{{ (item.price * item.quantity).toLocaleString('ru-RU') }} ₽</p>
          <button @click="removeItem(item.id)" class="text-textMain/60 hover:text-red-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>