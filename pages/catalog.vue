<script setup>
import { ref, computed } from 'vue'
import { useCart } from '~/composables/useCart'

const { addItem } = useCart()

const categories = [
  { id: 'all', name: 'все товары', active: true },
  { id: 'sofas', name: 'диваны', active: false },
  { id: 'chairs', name: 'кресла', active: false },
  { id: 'storage', name: 'хранение', active: false },
  { id: 'tables', name: 'столы', active: false },
  { id: 'decor', name: 'декор', active: false },
  { id: 'lighting', name: 'освещение', active: false }
]

const activeCategoryId = ref('all')

const selectCategory = (categoryId) => {
  activeCategoryId.value = categoryId
  categories.forEach(cat => cat.active = (cat.id === categoryId))
}

const styles = [
  { id: 'all', name: 'все стили', image: '' },
  { id: 'scandi', name: 'сканди', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80' },
  { id: 'minimal', name: 'минимализм', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80' },
  { id: 'boho', name: 'бохо', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80' },
  { id: 'artdeco', name: 'ар деко', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80' }
]

const activeStyleId = ref('all')

const selectStyle = (styleId) => {
  activeStyleId.value = activeStyleId.value === styleId ? 'all' : styleId
}

const bestsellers = [
  { image: 'https://images.unsplash.com/photo-1611042553365-9b101441c135?q=80' },
  { image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80' },
  { image: 'https://images.unsplash.com/photo-1611267254323-4db7b39c732c?q=80' }
]

const products = [
  { id: 1, name: 'ДИВАН "НИМБУС"', price: 89000, categoryId: 'sofas', styleId: 'scandi', image: 'images/nimbus.png', article: 'SOFA-001' },
  { id: 2, name: 'ЖУРНАЛЬНЫЙ СТОЛ "ВУД"', price: 76000, categoryId: 'sofas', styleId: 'minimal', image: 'images/vod.png', article: 'TABLE-002' },
  { id: 3, name: 'ЖУРНАЛЬНЫЙ СТОЛ "ГЛАСС"', price: 102000, categoryId: 'sofas', styleId: 'artdeco', image: 'images/glas.png', article: 'TABLE-003' },
  { id: 4, name: 'КРЕСЛО "Гринэль"', price: 80000, categoryId: 'tables', styleId: 'boho', image: 'images/grinel.png', article: 'CHAIR-004' },
  { id: 5, name: 'КОМОД "Бим"', price: 52000, categoryId: 'tables', styleId: 'scandi', image: 'images/bim.png', article: 'CHEST-005' },
  { id: 6, name: 'КРЕСЛО "ТРИЭЛЬ"', price: 36000, categoryId: 'chairs', styleId: 'minimal', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80', article: 'CHAIR-006' },
  { id: 7, name: 'КРЕСЛО "ЛАГУНА"', price: 41000, categoryId: 'chairs', styleId: 'boho', image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80', article: 'CHAIR-007' },
  { id: 8, name: 'КОМОД "ВИМ"', price: 72000, categoryId: 'storage', styleId: 'artdeco', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80', article: 'CHEST-008' },
  { id: 9, name: 'ТУМБА "НОРД"', price: 48000, categoryId: 'storage', styleId: 'scandi', image: 'https://images.unsplash.com/photo-1611267254323-4db7b39c732c?q=80', article: 'DRAWER-009' },
  { id: 10, name: 'СТЕЛЛАЖ "ВЕРТИКАЛЬ"', price: 59000, categoryId: 'storage', styleId: 'minimal', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80', article: 'SHELF-010' },
  { id: 11, name: 'ПОДВЕСНОЙ СВЕТИЛЬНИК', price: 27000, categoryId: 'lighting', styleId: 'boho', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80', article: 'LAMP-011' },
  { id: 12, name: 'НАСТОЛЬНАЯ ЛАМПА', price: 18500, categoryId: 'lighting', styleId: 'artdeco', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80', article: 'LAMP-012' },
  { id: 13, name: 'ВАЗА ДЛЯ ЦВЕТОВ', price: 9200, categoryId: 'decor', styleId: 'scandi', image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80', article: 'DECOR-013' }
]

const filteredProducts = computed(() => {
  let result = products
  
  if (activeCategoryId.value !== 'all') {
    result = result.filter(product => product.categoryId === activeCategoryId.value)
  }
  
  if (activeStyleId.value !== 'all') {
    result = result.filter(product => product.styleId === activeStyleId.value)
  }
  
  return result
})
</script>

<template>
  <main>
    <!-- Categories navigation -->
    <section class="bg-primary py-3">
      <div class="container mx-auto px-4">
        <nav class="flex gap-8 overflow-x-auto">
          <button v-for="category in categories" :key="category.id" 
                  @click="selectCategory(category.id)"
                  class="text-white font-body tracking-wide hover:opacity-80 transition-opacity whitespace-nowrap bg-transparent border-none cursor-pointer"
                  :class="{ 'opacity-100 font-medium border-b-2 border-white': category.active, 'opacity-70': !category.active }">
            {{ category.name }}
          </button>
        </nav>
      </div>
    </section>

    <!-- Interior Styles Section -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <h2 class="font-heading text-textMain text-4xl text-center mb-10">Стиль интерьера</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="style in styles.filter(s => s.id !== 'all')" :key="style.id" 
               @click="selectStyle(style.id)"
               class="relative rounded-3xl overflow-hidden h-[280px] group cursor-pointer transition-all duration-300"
               :class="activeStyleId === style.id ? 'ring-4 ring-primary ring-offset-2' : ''">
            <img :src="style.image" :alt="style.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div class="absolute inset-0 bg-black/20"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="font-heading text-white text-2xl uppercase tracking-wider">{{ style.name }}</span>
            </div>
            <div v-if="activeStyleId === style.id" class="absolute top-4 right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
              ✓
            </div>
          </div>
        </div>

        <div v-if="activeStyleId !== 'all'" class="text-center mt-8">
          <button @click="selectStyle('all')" class="text-primary font-body underline hover:no-underline">
            Сбросить фильтр по стилю
          </button>
        </div>
      </div>
    </section>

    <!-- Bestsellers Section -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <h2 class="font-heading text-textMain text-4xl text-center mb-10">Бестеллеры</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-[90px]">
          <div v-for="(item, index) in bestsellers" :key="index" class="border-r border-border last:border-r-0 p-6">
            <img :src="item.image" alt="Бестселлер" class="w-full h-[320px] object-contain" />
          </div>
        </div>
      </div>
    </section>

    <!-- All Products Section -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <h2 class="font-heading text-textMain text-4xl text-center mb-10">Все товары</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-[90px]">
           <NuxtLink :to="`/product/${product.id}`" v-for="(product, index) in filteredProducts" :key="product.id" class="border-r border-border hover:bg-gray-50 transition-colors cursor-pointer block">
             <img :src="product.image" :alt="product.name" class="w-full h-[320px] object-cover" />
             <div class="p-6">
               <h3 class="font-body text-textMain text-lg">{{ product.name }}</h3>
               <p class="font-body text-textMain mt-1">{{ product.price.toLocaleString('ru-RU') }} ₽</p>
             </div>
           </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-primary py-16 mt-16">
      <div class="container mx-auto px-4 text-center">
        <NuxtLink to="/" class="font-heading text-textMain text-5xl hover:opacity-80 transition-opacity">CLICKWOOD</NuxtLink>
      </div>
    </footer>
  </main>
</template>