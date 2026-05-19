<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCart } from '~/composables/useCart'
import { useProducts } from '~/composables/useProducts'
import type { Product } from '~/composables/useProducts'

const { addItem } = useCart()
const { fetchProduct } = useProducts()

const route = useRoute()
const productId = parseInt(route.params.id)

const product = ref<Product | null>(null)
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const data = await fetchProduct(productId)
    if (data) {
      product.value = data
    } else {
      error.value = 'Товар не найден'
    }
  } catch {
    error.value = 'Ошибка загрузки товара'
  } finally {
    loading.value = false
  }
})
const activeTab = ref('description')
const activeImage = ref(0)
const selectedColor = ref(0)

const productColors = [
  { name: 'Орех', color: 'bg-amber-800' },
  { name: 'Светлый дуб', color: 'bg-amber-200' }
]

const selectImage = (index) => {
  activeImage.value = index
}

const selectTab = (tab) => {
  activeTab.value = tab
}

const selectColor = (index) => {
  selectedColor.value = index
}

const openDeliveryInfo = () => {
  navigateTo('/delivery')
}

const openInstallmentInfo = () => {
  alert('Рассрочка без переплаты доступна на срок от 3 до 24 месяцев без первоначального взноса. Для оформления обратитесь в менеджеру по телефону.')
}

// ─── Image navigation & swipe ────────────────

const touchStartX = ref(0)
const touchStartY = ref(0)

const nextImage = () => {
  const imgs = product.value?.images || []
  if (imgs.length <= 1) return
  activeImage.value = (activeImage.value + 1) % imgs.length
}

const prevImage = () => {
  const imgs = product.value?.images || []
  if (imgs.length <= 1) return
  activeImage.value = (activeImage.value - 1 + imgs.length) % imgs.length
}

const onTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX
  touchStartY.value = e.touches[0].clientY
}

const onTouchEnd = (e: TouchEvent) => {
  const dx = e.changedTouches[0].clientX - touchStartX.value
  const dy = e.changedTouches[0].clientY - touchStartY.value
  // Only trigger swipe if horizontal movement is dominant and > 50px
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
    if (dx > 0) prevImage()
    else nextImage()
  }
}
</script>

<template>
  <main v-if="product">
    <!-- Breadcrumbs -->
    <section class="py-4 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="flex items-center gap-2 text-sm text-gray-600">
          <NuxtLink to="/" class="hover:text-primary">Главная</NuxtLink>
          <span>/</span>
          <NuxtLink to="/catalog" class="hover:text-primary">Каталог</NuxtLink>
          <span>/</span>
          <span class="text-textMain">{{ product.name }}</span>
        </div>
      </div>
    </section>

    <!-- Product Page -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <!-- Images Column -->
          <div class="flex gap-4">
            <!-- Thumbnails -->
            <div class="flex flex-col gap-3">
              <div v-for="(image, index) in product.images" :key="index" 
                   @click="selectImage(index)"
                   class="w-[120px] h-[120px] border-2 cursor-pointer transition-all"
                   :class="{ 'border-primary': activeImage === index, 'border-transparent': activeImage !== index }">
                <img :src="image" class="w-full h-full object-cover" />
              </div>
            </div>
            
            <!-- Main Image -->
            <div class="flex-1 relative select-none"
                 @touchstart="onTouchStart"
                 @touchend="onTouchEnd">
              <img :src="(product.images || [product.image])[activeImage]" :alt="product.name" class="w-full max-h-[500px] object-contain" />
              
              <!-- Arrow buttons -->
              <button v-if="(product.images || []).length > 1"
                      @click="prevImage"
                      class="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow transition cursor-pointer border-none">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button v-if="(product.images || []).length > 1"
                      @click="nextImage"
                      class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow transition cursor-pointer border-none">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>

          <!-- Info Column -->
          <div>
            <h1 class="font-heading text-textMain text-4xl mb-2">{{ product.name }}</h1>
            
            <div class="text-gray-500 mb-4">Код товара: {{ product.article }}</div>
            
            <!-- Rating -->
            <div class="flex items-center gap-3 mb-6">
              <div class="flex">
                <span v-for="star in 5" :key="star" class="text-xl" :class="star <= product.rating ? 'text-amber-500' : 'text-gray-300'">★</span>
              </div>
              <span class="text-gray-500 underline cursor-pointer">{{ product.reviewsCount }} отзывов</span>
            </div>

            <!-- Colors -->
            <div class="flex gap-3 mb-6">
              <div v-for="(color, index) in productColors" :key="index" 
                   @click="selectColor(index)"
                   class="w-6 h-6 rounded-full cursor-pointer border-2 border-white shadow transition-all"
                   :class="[color.color, selectedColor === index ? 'ring-2 ring-primary ring-offset-2' : '']">
              </div>
            </div>

            <!-- Price -->
            <div class="font-body text-4xl text-textMain mb-6">{{ product.price.toLocaleString('ru-RU') }} ₽</div>

             <!-- Buttons -->
             <div class="flex flex-col gap-3 mb-8">
               <button @click="addItem({ id: product.id, name: product.name, price: product.price, image: product.images?.[0] || product.image, article: product.article, colorName: productColors[selectedColor]?.name, colorClass: productColors[selectedColor]?.color })" class="w-full py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
                 В корзину
               </button>
              <button class="w-full py-3 border border-primary text-primary rounded-full hover:bg-primary/5 transition-colors">
                Купить в 1 клик
              </button>
            </div>

            <!-- Additional info -->
            <div class="space-y-4">
              <div @click="openDeliveryInfo" class="flex items-center justify-between py-3 border-b border-gray-200 cursor-pointer hover:text-primary">
                <span>Стоимость доставки</span>
                <span>›</span>
              </div>
              <div @click="openInstallmentInfo" class="flex items-center justify-between py-3 border-b border-gray-200 cursor-pointer hover:text-primary">
                <span>Рассрочка без переплаты</span>
                <span>›</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabs Section -->
        <div class="mt-16">
          <div class="flex gap-12 border-b border-gray-200 mb-8">
            <button @click="selectTab('description')" 
                    class="pb-4 font-body text-lg"
                    :class="{ 'border-b-2 border-primary text-primary': activeTab === 'description', 'text-gray-500': activeTab !== 'description' }">
              Описание
            </button>
            <button @click="selectTab('characteristics')" 
                    class="pb-4 font-body text-lg"
                    :class="{ 'border-b-2 border-primary text-primary': activeTab === 'characteristics', 'text-gray-500': activeTab !== 'characteristics' }">
              Характеристики
            </button>
            <button @click="selectTab('reviews')" 
                    class="pb-4 font-body text-lg"
                    :class="{ 'border-b-2 border-primary text-primary': activeTab === 'reviews', 'text-gray-500': activeTab !== 'reviews' }">
              Отзывы о товаре ({{ product.reviewsCount }})
            </button>
            <button @click="selectTab('questions')" 
                    class="pb-4 font-body text-lg"
                    :class="{ 'border-b-2 border-primary text-primary': activeTab === 'questions', 'text-gray-500': activeTab !== 'questions' }">
              Вопросы о товаре (0)
            </button>
          </div>

          <div class="max-w-3xl">
            <div v-if="activeTab === 'description'" class="font-body text-lg leading-relaxed whitespace-pre-line">
              {{ product.description || 'Описание отсутствует' }}
            </div>
            <div v-if="activeTab === 'characteristics'" class="font-body text-lg leading-relaxed whitespace-pre-line">
              {{ product.characteristics || 'Характеристики отсутствуют' }}
            </div>
            <div v-if="activeTab === 'reviews'" class="text-gray-500">
              Отзывы будут загружены позже
            </div>
            <div v-if="activeTab === 'questions'" class="text-gray-500">
              Вопросы будут загружены позже
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>