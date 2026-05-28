<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCart } from '~/composables/useCart'
import { useCollections } from '~/composables/useCollections'
import type { Collection } from '~/composables/useCollections'

const { fetchCollection } = useCollections()
const { addItem } = useCart()
const route = useRoute()

const collection = ref<Collection | null>(null)
const loading = ref(true)
const error = ref('')
const addedToCart = ref(false)
const itemAddedMessages = ref<Record<number, boolean>>({})

onMounted(async () => {
  const slug = route.params.id as string
  if (!slug) {
    error.value = 'Коллекция не указана'
    loading.value = false
    return
  }
  const data = await fetchCollection(slug)
  if (data) {
    collection.value = data
  } else {
    error.value = 'Коллекция не найдена'
  }
  loading.value = false
})

const addItemToCart = (item: { id: number; name: string; price: number; image: string; article: string }) => {
  const discount = collection.value?.discount || 0
  const discountedPrice = discount > 0 ? Math.round(item.price * (1 - discount / 100)) : item.price
  addItem({
    id: item.id,
    name: item.name,
    price: discountedPrice,
    image: item.image,
    article: item.article,
    originalPrice: discount > 0 ? item.price : undefined,
    collectionSlug: collection.value?.slug
  })
  itemAddedMessages.value[item.id] = true
  setTimeout(() => {
    itemAddedMessages.value[item.id] = false
  }, 1500)
}

const addAllToCart = () => {
  if (!collection.value?.products) return
  const discount = collection.value.discount || 0
  collection.value.products.forEach(product => {
    const discountedPrice = discount > 0 ? Math.round(product.price * (1 - discount / 100)) : product.price
    addItem({
      id: product.id,
      name: product.name,
      price: discountedPrice,
      image: product.image,
      article: product.article,
      originalPrice: discount > 0 ? product.price : undefined,
      collectionSlug: collection.value?.slug
    })
  })
  addedToCart.value = true
  setTimeout(() => {
    addedToCart.value = false
  }, 2000)
}
</script>

<template>
<div>
  <!-- Loading -->
  <main v-if="loading" class="min-h-[60vh] flex items-center justify-center">
    <div class="text-center py-20 text-gray-400">Загрузка...</div>
  </main>

  <!-- Error / Not Found -->
  <main v-else-if="error || !collection" class="min-h-[60vh] flex items-center justify-center">
    <div class="text-center py-20">
      <div class="text-6xl mb-4">🔍</div>
      <h2 class="font-heading text-textMain text-3xl mb-4">Решение не найдено</h2>
      <p class="font-body text-textMain/70 mb-8">{{ error || 'Запрошенный комплект не существует' }}</p>
      <NuxtLink to="/collections"
        class="inline-block px-8 py-3 bg-primary text-white rounded-xl font-body text-lg hover:bg-primaryDark transition-colors">
        Вернуться к решениям
      </NuxtLink>
    </div>
  </main>

  <!-- Collection Detail -->
  <main v-else>
    <!-- Breadcrumbs -->
    <section class="py-4 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="flex items-center gap-2 text-sm text-textMain/60">
          <NuxtLink to="/" class="hover:text-textMain transition-colors">Главная</NuxtLink>
          <span>/</span>
          <NuxtLink to="/collections" class="hover:text-textMain transition-colors">Готовые решения</NuxtLink>
          <span>/</span>
          <span class="text-textMain">{{ collection.name }}</span>
        </div>
      </div>
    </section>

    <!-- Hero -->
    <section class="h-[400px] md:h-[500px] flex flex-col items-center justify-center relative overflow-hidden">
      <div class="absolute inset-0 bg-black/30 z-10"></div>
      <img :src="collection.image" :alt="collection.name" class="absolute inset-0 w-full h-full object-cover" />
      <div class="container mx-auto px-4 text-center relative z-20">
        <span v-if="collection.discount > 0" class="inline-block bg-primary/90 text-white text-xs uppercase tracking-wider px-4 py-1.5 rounded-full font-body mb-4">
          Экономия {{ collection.discount }}%
        </span>
        <h1 class="font-heading text-white text-4xl md:text-6xl leading-tight tracking-wider">
          {{ collection.name }}
        </h1>
        <p class="font-body text-white/90 text-lg md:text-xl mt-4 max-w-2xl mx-auto">
          {{ collection.description }}
        </p>
      </div>
    </section>

    <!-- Content -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <!-- Left: Items list -->
          <div class="lg:col-span-7">
            <h2 class="font-heading text-textMain text-3xl mb-8">Состав комплекта</h2>
            
            <div v-if="!collection.products || collection.products.length === 0" class="text-center py-10 text-gray-400">
              В этой коллекции пока нет товаров
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="(product, i) in collection.products"
                :key="product.id"
                class="border border-border rounded-xl overflow-hidden transition-all duration-300"
                style="animation: fadeUp 0.3s ease both;"
                :style="{ animationDelay: `${i * 0.05}s` }"
              >
                <div class="flex items-center gap-4 p-4">
                  <div class="w-20 h-20 rounded-lg overflow-hidden border border-border flex-shrink-0 bg-white">
                    <img :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="font-body text-textMain font-medium">{{ product.name }}</h3>
                    <p class="text-xs text-gray-400 mt-0.5">Код: {{ product.article }}</p>
                    <p class="font-body text-lg text-textMain mt-1">{{ product.price.toLocaleString('ru-RU') }} ₽</p>
                  </div>
                  <button
                    @click="addItemToCart({ id: product.id, name: product.name, price: product.price, image: product.image, article: product.article })"
                    class="px-5 py-2.5 border border-primary text-primary rounded-lg font-body text-sm hover:bg-primary hover:text-white transition-all whitespace-nowrap flex-shrink-0"
                    :class="{ 'bg-primary text-white': itemAddedMessages[product.id] }"
                  >
                    <span v-if="itemAddedMessages[product.id]">✓ Добавлено</span>
                    <span v-else>В корзину</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Full description -->
            <div v-if="collection.fullDescription" class="mt-10">
              <h3 class="font-heading text-textMain text-xl mb-4">О решении</h3>
              <p class="font-body text-textMain/80 leading-relaxed">{{ collection.fullDescription }}</p>
            </div>

            <!-- Features mini -->
            <div class="grid grid-cols-3 gap-4 mt-8">
              <div class="bg-primary/5 rounded-xl p-4 text-center">
                <div class="font-heading text-2xl text-primary">{{ collection.products?.length || 0 }}</div>
                <p class="font-body text-xs text-textMain/70 mt-1">предметов</p>
              </div>
              <div class="bg-primary/5 rounded-xl p-4 text-center">
                <div class="font-heading text-2xl text-primary">-{{ collection.discount }}%</div>
                <p class="font-body text-xs text-textMain/70 mt-1">экономия</p>
              </div>
              <div class="bg-primary/5 rounded-xl p-4 text-center">
                <div class="font-heading text-2xl text-primary">1</div>
                <p class="font-body text-xs text-textMain/70 mt-1">доставка</p>
              </div>
            </div>
          </div>

          <!-- Right: Summary + CTA -->
          <div class="lg:col-span-5 self-start">
            <div class="sticky top-24">
              <div class="bg-gray-50/50 border border-border rounded-xl p-6 md:p-8">
                <h3 class="font-heading text-textMain text-xl mb-6">Цена комплекта</h3>

                <div v-if="collection.products" class="space-y-4 font-body">
                  <div v-for="product in collection.products" :key="product.id" class="flex justify-between text-sm">
                    <span class="text-textMain/70">{{ product.name }}</span>
                    <span class="text-textMain">{{ product.price.toLocaleString('ru-RU') }} ₽</span>
                  </div>
                </div>

                <div class="border-t border-border mt-6 pt-6 space-y-2">
                  <div class="flex justify-between text-sm">
                    <span class="text-textMain/60">Сумма по отдельности</span>
                    <span class="text-textMain line-through">{{ (collection.totalPrice || 0).toLocaleString('ru-RU') }} ₽</span>
                  </div>
                  <div v-if="collection.discount > 0" class="flex justify-between">
                    <span class="text-textMain/60">Скидка</span>
                    <span class="text-primary font-medium">−{{ ((collection.totalPrice || 0) - (collection.setPrice || 0)).toLocaleString('ru-RU') }} ₽</span>
                  </div>
                  <div class="flex justify-between pt-3 border-t border-border">
                    <span class="font-heading text-textMain text-lg">Цена комплекта</span>
                    <span class="font-heading text-primary text-2xl">{{ (collection.setPrice || 0).toLocaleString('ru-RU') }} ₽</span>
                  </div>
                </div>

                <button
                  @click="addAllToCart"
                  class="w-full mt-6 py-4 bg-primary text-white rounded-xl font-body text-lg hover:bg-primaryDark transition-all shadow-sm flex items-center justify-center gap-2"
                  :class="{ 'bg-green-600 hover:bg-green-700': addedToCart }"
                >
                  <svg v-if="!addedToCart" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                  </svg>
                  <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span v-if="addedToCart">Добавлено в корзину!</span>
                  <span v-else>Купить комплект целиком</span>
                </button>

                <p class="text-[11px] text-gray-400 text-center mt-4 font-body">
                  Все товары будут добавлены в корзину одной кнопкой
                </p>
              </div>

              <!-- Benefits mini -->
              <div class="mt-6 space-y-3">
                <div v-for="(benefit, i) in [
                  { icon: '🚚', text: 'Доставка одним заказом' },
                  { icon: '✅', text: 'Гарантия на все предметы' },
                  { icon: '🔄', text: 'Возврат в течение 14 дней' }
                ]" :key="i" class="flex items-center gap-3 text-sm font-body text-textMain/70">
                  <span>{{ benefit.icon }}</span>
                  <span>{{ benefit.text }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</div>
</template>

<style scoped>
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>