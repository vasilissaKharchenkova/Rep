<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCollections } from '~/composables/useCollections'
import { useCart } from '~/composables/useCart'
import type { Collection } from '~/composables/useCollections'

const { collections, fetchCollections } = useCollections()
const { addItem } = useCart()
const loading = ref(true)

onMounted(async () => {
  await fetchCollections()
  loading.value = false
})

const benefits = [
  {
    icon: '💰',
    title: 'Экономия до 18%',
    description: 'При покупке комплекта вы экономите больше чем при покупке товаров по отдельности'
  },
  {
    icon: '🎨',
    title: 'Всё сочетается',
    description: 'Все товары в комплекте подобраны по стилю и цветовой гамме'
  },
  {
    icon: '📐',
    title: 'Готовый дизайн',
    description: 'Вам не нужно нанимать дизайнера - всё уже продумано'
  },
  {
    icon: '🚚',
    title: 'Одновременная доставка',
    description: 'Все товары приедут в один день, не нужно ждать несколько раз'
  }
]
</script>

<template>
  <main>
    <!-- Hero Section -->
    <section class="h-[400px] md:h-[500px] flex flex-col items-center justify-center relative overflow-hidden">
      <div class="absolute inset-0 bg-black/30 z-10"></div>
      <div class="absolute inset-0 bg-[url('/images/002.jpg')] bg-cover bg-center"></div>
      
      <div class="container mx-auto px-4 text-center relative z-20">
        <h1 class="font-heading text-white text-4xl md:text-6xl leading-tight tracking-wider">
          Готовые интерьерные решения
        </h1>
        <p class="font-body text-white/90 text-xl mt-6 max-w-2xl mx-auto">
          Полностью готовые наборы мебели для каждой комнаты вашего дома
        </p>
      </div>
    </section>

    <!-- Breadcrumbs -->
    <section class="py-4 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="flex items-center gap-2 text-sm text-textMain/60">
          <NuxtLink to="/" class="hover:text-textMain transition-colors">Главная</NuxtLink>
          <span>/</span>
          <span class="text-textMain">Готовые решения</span>
        </div>
      </div>
    </section>

    <!-- Loading state -->
    <section v-if="loading" class="py-20">
      <div class="container mx-auto px-4 text-center text-gray-400">Загрузка...</div>
    </section>

    <!-- Collections Grid -->
    <section v-else class="py-16">
      <div class="container mx-auto px-4">
        <div v-if="collections.length === 0" class="text-center py-20 text-gray-400">
          Нет доступных коллекций
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-[60px]">
          <NuxtLink
            :to="`/collection/${col.slug}`"
            v-for="col in collections"
            :key="col.id"
            class="group cursor-pointer block"
          >
            <div class="relative overflow-hidden">
              <img
                :src="col.image"
                :alt="col.name"
                class="w-full h-[320px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div v-if="col.discount > 0" class="absolute top-3 left-3 bg-primary/90 text-white text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-body">
                -{{ col.discount }}%
              </div>
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <span class="text-white font-body text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary px-6 py-3 rounded-full">
                  Собрать комплект
                </span>
              </div>
            </div>
            <div class="pt-4">
              <h3 class="font-heading text-textMain text-xl">{{ col.name }}</h3>
              <div class="flex items-center gap-2 mt-2">
                <img v-for="(item, i) in (col.products || []).slice(0, 5)" :key="i"
                     :src="item.image" class="w-8 h-8 rounded-full object-cover border border-border"
                     :title="item.name">
              </div>
              <div class="flex items-center gap-3 mt-2">
                <span class="font-body text-primary text-lg font-medium">{{ (col.setPrice || 0).toLocaleString('ru-RU') }} ₽</span>
                <span v-if="col.discount > 0" class="font-body text-sm text-gray-400 line-through">{{ (col.totalPrice || 0).toLocaleString('ru-RU') }} ₽</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="font-heading text-textMain text-4xl text-center mb-16">Преимущества готовых решений</h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="benefit in benefits" :key="benefit.title" 
               class="bg-white p-8 rounded-2xl border border-border text-center">
            <div class="text-5xl mb-6">{{ benefit.icon }}</div>
            <h3 class="font-heading text-textMain text-xl mb-4">{{ benefit.title }}</h3>
            <p class="font-body text-textMain/70 leading-relaxed">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>