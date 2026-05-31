<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCart } from '~/composables/useCart'
import ProductReviews from '~/components/ProductReviews.vue'
import ProductQuestions from '~/components/ProductQuestions.vue'
import { useProducts } from '~/composables/useProducts'
import type { ProductData } from '~/server/types/product'

const { addItem } = useCart()
const { fetchProduct } = useProducts()

const route = useRoute()
const router = useRouter()
const productId = parseInt(route.params.id)

const productIdNum = Number(route.params.id)
const { data: product, pending: loading, error } = await useAsyncData<ProductData | null>(
  `product-${productId}`,
  () => fetchProduct(productIdNum)
)

// ─── SEO ────────────────────────────────────
const productTitle = computed(() => product.value ? `${product.value.name} — CLICKWOOD` : 'CLICKWOOD')
const productDescription = computed(() => product.value?.description?.slice(0, 160) || 'CLICKWOOD — стильная и надёжная мебель')

useHead({
  title: productTitle,
  meta: [
    { name: 'description', content: productDescription }
  ]
})

const activeTab = ref('description')
const activeImage = ref(0)
const selectedColor = ref<number | null>(null)

const productColors = computed(() => product.value?.colorVariants || [])

const currentVariantImages = computed(() => {
  const base = product.value?.images || [product.value?.image].filter(Boolean) as string[]
  if (selectedColor.value === null) return base
  const variant = productColors.value[selectedColor.value]
  if (variant?.images?.length) {
    return [...variant.images, ...base]
  }
  return base
})

const currentVariantMainImage = computed(() => {
  if (selectedColor.value === null) return product.value?.images?.[0] || product.value?.image || ''
  const variant = productColors.value[selectedColor.value]
  return variant?.image || product.value?.images?.[0] || product.value?.image || ''
})

const selectImage = (index: number) => {
  activeImage.value = index
}

const selectTab = (tab: string) => {
  activeTab.value = tab
}

const selectColor = (index: number) => {
  if (selectedColor.value === index) {
    selectedColor.value = null
  } else {
    selectedColor.value = index
  }
  activeImage.value = 0
}

const addToCart = () => {
  if (!product.value) return
  if (productColors.value.length && selectedColor.value === null) {
    alert('Пожалуйста, выберите цвет')
    return
  }
  const idx = selectedColor.value !== null ? selectedColor.value : 0
  const variant = productColors.value[idx]
  addItem({
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    image: variant?.image || product.value.images?.[0] || product.value.image,
    article: product.value.article,
    colorName: variant?.name,
    colorClass: variant?.color
  })
}

const buyNow = () => {
  addToCart()
  if (productColors.value.length && selectedColor.value === null) return
  router.push('/checkout')
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
  const imgs = currentVariantImages.value
  if (imgs.length <= 1) return
  activeImage.value = (activeImage.value + 1) % imgs.length
}

const prevImage = () => {
  const imgs = currentVariantImages.value
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
            <div class="flex flex-col gap-3 max-h-[516px] overflow-y-auto [&::-webkit-scrollbar]:hidden">
              <div v-for="(image, index) in currentVariantImages" :key="index" 
                   @click="selectImage(index)"
                   class="w-[120px] h-[120px] border-2 cursor-pointer transition-all"
                   :class="{ 'border-primary': activeImage === index, 'border-transparent': activeImage !== index }">
                <NuxtImg :src="image" class="w-full h-full object-cover" format="webp" />
              </div>
            </div>
            
            <!-- Main Image -->
            <div class="flex-1 relative select-none"
                 @touchstart="onTouchStart"
                 @touchend="onTouchEnd">
              <NuxtImg :src="currentVariantImages[activeImage] || currentVariantMainImage" :alt="product.name" class="w-full max-h-[500px] object-contain" format="webp" />
              
              <!-- Arrow buttons -->
              <button v-if="currentVariantImages.length > 1"
                      @click="prevImage"
                      class="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow transition cursor-pointer border-none">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button v-if="currentVariantImages.length > 1"
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
            <div v-if="productColors.length > 0" class="mb-6">
              <p class="text-sm text-gray-500 mb-2">Цвет:</p>
              <div class="flex items-center gap-3">
                <div v-for="(color, index) in productColors" :key="index" 
                     @click="selectColor(index)"
                     class="w-6 h-6 rounded-full cursor-pointer border-2 border-white shadow transition-all"
                     :class="selectedColor === index ? 'ring-2 ring-primary ring-offset-2' : ''"
                     :style="{ backgroundColor: color.color }"
                     :title="color.name">
                </div>
                <span v-if="selectedColor !== null" class="text-sm text-textMain/70">{{ productColors[selectedColor]?.name }}</span>
              </div>
            </div>

            <!-- Price -->
            <div class="font-body text-4xl text-textMain mb-6">
              <template v-if="product.discount > 0">
                <span class="text-gray-400 line-through text-2xl mr-3">{{ product.price.toLocaleString('ru-RU') }} ₽</span>
                <span class="text-primary">{{ Math.round(product.price * (1 - product.discount / 100)).toLocaleString('ru-RU') }} ₽</span>
                <span class="inline-block bg-red-500 text-white text-xs px-2 py-0.5 rounded-full ml-3 align-middle">-{{ product.discount }}%</span>
              </template>
              <template v-else>
                {{ product.price.toLocaleString('ru-RU') }} ₽
              </template>
            </div>

             <!-- Buttons -->
             <div class="flex flex-col gap-3 mb-8">
              <button @click="addToCart" class="w-full py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
                В корзину
              </button>
              <button @click="buyNow" class="w-full py-3 border border-primary text-primary rounded-full hover:bg-primary/5 transition-colors cursor-pointer">
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
              Вопросы о товаре ({{ product?.questionsCount || 0 }})
            </button>
          </div>

          <div class="max-w-3xl">
            <div v-if="activeTab === 'description'" class="font-body text-lg leading-relaxed whitespace-pre-line">
              {{ product.description || 'Описание отсутствует' }}
            </div>
            <div v-if="activeTab === 'characteristics'" class="font-body text-lg leading-relaxed whitespace-pre-line">
              {{ product.characteristics || 'Характеристики отсутствуют' }}
            </div>
            <div v-if="activeTab === 'reviews'">
              <ProductReviews :productId="productId" />
            </div>
            <div v-if="activeTab === 'questions'">
              <ProductQuestions :productId="productId" />
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>