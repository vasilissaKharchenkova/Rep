<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const collectionSwiper = ref<any>(null)
const worksSwiper = ref<any>(null)

const sliderProducts = ref<any[]>([])
const fixedVariant = ref<Record<number, string | null>>({})

// Two permanent image slots per product. At any time one is visible (opacity 1),
// the other is invisible (opacity 0). On switch we preload the new src into the
// hidden slot, then toggle visibility — CSS transition handles the crossfade.
const imgSrcA = ref<Record<number, string>>({})
const imgSrcB = ref<Record<number, string>>({})
const showA = ref<Record<number, boolean>>({})

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = src
  })
}

async function switchImage(productId: number, newSrc: string) {
  if (!newSrc) return

  const currentVisible = showA.value[productId]
  const currentSrc = currentVisible ? imgSrcA.value[productId] : imgSrcB.value[productId]
  if (newSrc === currentSrc) return

  // Preload the new image (background, invisible to user)
  await preloadImage(newSrc)

  // Step 1: put the new src into the HIDDEN slot (no visible change yet)
  if (currentVisible) {
    imgSrcB.value[productId] = newSrc
  } else {
    imgSrcA.value[productId] = newSrc
  }

  // Step 2: wait for browser to paint the new image at current opacity (hidden)
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))

  // Step 3: now toggle visibility — browser will use CSS transition for the crossfade
  showA.value[productId] = !currentVisible
}

async function fetchSliderProducts() {
  try {
    sliderProducts.value = await $fetch('/api/slider')
    for (const p of sliderProducts.value) {
      const src = p.image || ''
      imgSrcA.value[p.id] = src
      imgSrcB.value[p.id] = src  // both same initially (no visible crossfade needed)
      showA.value[p.id] = true   // A is visible, B is hidden
    }
  } catch {
    sliderProducts.value = []
  }
}

function getMainImage(product: any): string {
  return product.image || ''
}

function onSlideClick(productId: number) {
  router.push(`/product/${productId}`)
}

function onVariantHover(productId: number, variantImage: string) {
  if (fixedVariant.value[productId] === undefined) {
    switchImage(productId, variantImage)
  }
}

function onVariantLeave(productId: number) {
  if (fixedVariant.value[productId] === undefined) {
    const product = sliderProducts.value.find(p => p.id === productId)
    if (product) {
      switchImage(productId, getMainImage(product))
    }
  }
}

function onVariantClick(productId: number, variantImage: string) {
  if (fixedVariant.value[productId] === variantImage) {
    // Unfix - revert to main image
    fixedVariant.value[productId] = undefined as any
    const product = sliderProducts.value.find(p => p.id === productId)
    if (product) {
      switchImage(productId, getMainImage(product))
    }
  } else {
    // Fix this variant
    fixedVariant.value[productId] = variantImage
    switchImage(productId, variantImage)
  }
}

function isVariantFixed(productId: number, variantImage: string): boolean {
  return fixedVariant.value[productId] === variantImage
}

onMounted(async () => {
  await fetchSliderProducts()

  // Динамический импорт Swiper и инициализация после рендеринга DOM
  const initSwipers = async () => {
    const Swiper = (await import('swiper')).default
    const { Navigation, Mousewheel, Keyboard } = await import('swiper/modules')
    await import('swiper/css')
    await import('swiper/css/navigation')

    // Слайдер для Новая коллекция
    collectionSwiper.value = new Swiper('.collection-slider', {
      modules: [Navigation, Mousewheel, Keyboard],
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      speed: 600,
      grabCursor: true,
      allowTouchMove: true,
      mousewheel: { forceToAxis: true, sensitivity: 1 },
      keyboard: { enabled: true },
      breakpoints: {
        768: {
          slidesPerView: 3
        }
      }
    })

    // Слайдер для Наши работы
    worksSwiper.value = new Swiper('.works-slider', {
      modules: [Navigation, Mousewheel, Keyboard],
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      speed: 600,
      grabCursor: true,
      allowTouchMove: true,
      mousewheel: { forceToAxis: true, sensitivity: 1 },
      keyboard: { enabled: true },
      breakpoints: {
        768: {
          slidesPerView: 3
        }
      }
    })
  }

  // Небольшая задержка для гарантии полного рендеринга DOM
  setTimeout(initSwipers, 120)
})

const prevCollection = () => collectionSwiper.value?.slidePrev()
const nextCollection = () => collectionSwiper.value?.slideNext()
const prevWorks = () => worksSwiper.value?.slidePrev()
const nextWorks = () => worksSwiper.value?.slideNext()
</script>

<template>
  <main>
    <!-- Hero section -->
    <section class="h-[724px] bg-gray-200 flex flex-col items-center justify-center relative">
      <div class="absolute inset-0 bg-black/15"></div>
      <div class="absolute inset-0 bg-[url('/images/news_bg.png')] bg-cover bg-center"></div>
      <div class="container mx-auto px-4 text-center relative z-10">
        <h1 class="font-heading text-white text-5xl md:text-6xl max-w-3xl mx-auto leading-tight">
          Создайте интерьер своей мечты вместе с нами!
        </h1>
        
        <p class="font-body text-white text-xl md:text-2xl mt-6 max-w-2xl mx-auto">
          У нас вы найдете стильную и надежную мебель, которая идеально впишется в ритм вашей жизни и подчеркнет ваш вкус.
        </p>
      </div>
    </section>

    <!-- Newsletter section -->
    <section class="bg-primary mt-20 pt-10 pb-12 relative">
      <img src="/images/4df9807e9d3e419d1c0d0bd39c60a19f-no-bg-preview (carve.photos) 2.png" alt="Стул" class="hidden md:block absolute left-8 -top-10 h-[350px] object-contain z-10" style="filter: drop-shadow(0 8px 12px rgba(0,0,0,0.25));">
      <div class="container mx-auto px-4">
        <h2 class="text-white text-[clamp(1.5rem,3vw,2.25rem)] text-center mb-10 font-[Arsenal_SC]">
          Дополнительная скидка до 5 000 ₽ за подписку на рассылку
        </h2>

        <div class="flex flex-col md:flex-row items-center justify-center gap-6">
          <input type="email" placeholder="EMAIL" class="px-8 py-4 rounded-[24px] w-full md:w-[480px] text-lg outline-none border-none">
          <button class="bg-[#5D4433] text-white px-12 py-4 rounded-[24px] text-xl hover:opacity-90 transition font-[Arsenal_SC]">
            Подписаться
          </button>

          <div class="text-sm text-white/90 max-w-xs ml-6">
            <div class="flex items-start gap-2 mb-2">
              <input type="checkbox" checked class="w-5 h-5 mt-1 rounded border-none">
              <span>Я согласен на обработку персональных данных в соответствии с политикой</span>
            </div>
            <div class="flex items-start gap-2">
              <input type="checkbox" class="w-5 h-5 mt-1 rounded border-none">
              <span>Я согласен с правилами сайта DIVANBOSS.RU и согласен получать информационную рассылку</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- New collection section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between mb-12">
          <h2 class="text-textMain text-5xl font-[Roscha]" style="letter-spacing: 0.05em;">Новая коллекция</h2>
          <div class="flex gap-3">
            <button @click="prevCollection" class="w-8 h-8 border border-textMain rounded-full flex items-center justify-center hover:bg-textMain hover:text-white transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button @click="nextCollection" class="w-8 h-8 border border-textMain rounded-full flex items-center justify-center hover:bg-textMain hover:text-white transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="collection-slider swiper">
          <div class="swiper-wrapper">
            <div v-for="product in sliderProducts" :key="product.id" class="swiper-slide cursor-pointer" @click="onSlideClick(product.id)">
              <div class="border border-border p-0 relative group">
                <div class="w-full h-[540px] overflow-hidden relative bg-gray-100">
                  <!-- Image A (visible when showA is true) -->
                  <img
                    :src="imgSrcA[product.id] || product.image"
                    :alt="product.name"
                    class="w-full h-full object-cover absolute inset-0 transition-all duration-500 ease-in-out"
                    :class="showA[product.id] ? 'opacity-100' : 'opacity-0'"
                    loading="lazy"
                  />
                  <!-- Image B (visible when showA is false) -->
                  <img
                    :src="imgSrcB[product.id] || product.image"
                    :alt="product.name"
                    class="w-full h-full object-cover absolute inset-0 transition-all duration-500 ease-in-out"
                    :class="!showA[product.id] ? 'opacity-100' : 'opacity-0'"
                    loading="lazy"
                  />
                </div>
                <!-- Color variants -->
                <div v-if="product.colorVariants && product.colorVariants.length > 0" class="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
                  <div
                    v-for="variant in product.colorVariants"
                    :key="variant.name"
                    class="w-6 h-6 rounded-full border-2 border-white shadow-md cursor-pointer transition-all duration-200 hover:scale-125"
                    :class="{ 'ring-2 ring-primary scale-110': isVariantFixed(product.id, variant.image || product.image) }"
                    :style="{ backgroundColor: variant.color || '#ccc' }"
                    :title="variant.name"
                    @mouseenter="onVariantHover(product.id, variant.image || product.image)"
                    @mouseleave="onVariantLeave(product.id)"
                    @click.stop="onVariantClick(product.id, variant.image || product.image)"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-textMain text-5xl text-center mb-12 font-[Roscha]" style="letter-spacing: 0.05em;">
          О нас
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <!-- Текст занимает первые 2 колонки -->
          <div class="col-span-2 flex flex-col justify-between h-full">
            <p class="text-xl leading-relaxed font-[Roscha] mb-12">
              <span class="text-6xl font-bold">CLICKWOOD</span> – это пространство, где рождаются идеи для вашего интерьера.
              Мы объединили проверенное качество, продуманный дизайн и заботу о каждом клиенте. Наша цель — помочь вам создать дом вашей мечты, где будет комфортно жить, работать и отдыхать всей семьей. Мы любим то, что делаем, и гарантируем, что каждая покупка у нас станет вкладом в ваш уют
            </p>
            
            <!-- Две маленькие картинки прижаты к самому низу -->
            <div class="grid grid-cols-2 gap-6 mt-auto">
              <img src="/images/about_stol.png" alt="Стол" class="w-full h-full object-cover">
              <img src="/images/about_divan.png" alt="Кресло" class="w-full h-full object-cover">
            </div>
          </div>

          <!-- Большая картинка справа занимает всю высоту -->
          <div class="col-span-1">
            <img src="/images/about_divan_2.png" alt="Диван" class="w-full h-full object-cover">
          </div>
        </div>
      </div>
    </section>

    <!-- Our works section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between mb-12">
          <h2 class="text-textMain text-5xl font-[Roscha]" style="letter-spacing: 0.05em;">Наши работы</h2>
          <div class="flex gap-3">
            <button @click="prevWorks" class="w-8 h-8 border border-textMain rounded-full flex items-center justify-center hover:bg-textMain hover:text-white transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button @click="nextWorks" class="w-8 h-8 border border-textMain rounded-full flex items-center justify-center hover:bg-textMain hover:text-white transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="works-slider swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="border border-border p-0">
                <img src="/images/7e4e3f32978cee127ef43a663a42e67d 1.png" alt="Проект 1" class="w-full h-[555px] object-cover">
              </div>
            </div>
            <div class="swiper-slide">
              <div class="border border-border p-0">
                <img src="/images/6be3d25fdaf6d60d8a89454f3e4527be 1.png" alt="Проект 2" class="w-full h-[555px] object-cover">
              </div>
            </div>
            <div class="swiper-slide">
              <div class="border border-border p-0">
                <img src="/images/722f587adca9f6a9e5ea8c50f9cd79ca 1.png" alt="Проект 3" class="w-full h-[555px] object-cover">
              </div>
            </div>
            <div class="swiper-slide">
              <div class="border border-border p-0">
                <img src="/images/3998af9f9062ea929622b61627c0015f.jpg" alt="Проект 4" class="w-full h-[555px] object-cover">
              </div>
            </div>
            <div class="swiper-slide">
              <div class="border border-border p-0">
                <img src="/images/1172ae6558b40a5c8ec6e2e8af3e8d52.jpg" alt="Проект 5" class="w-full h-[555px] object-cover">
              </div>
            </div>
            <div class="swiper-slide">
              <div class="border border-border p-0">
                <img src="/images/797f407b8a9213dda489d6ce38310d71.jpg" alt="Проект 6" class="w-full h-[555px] object-cover">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>

<style>
.swiper {
  cursor: grab;
}

.swiper:active {
  cursor: grabbing;
}

.swiper-slide {
  user-select: none;
}
</style>
