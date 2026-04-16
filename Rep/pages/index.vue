<script setup>
import { ref, onMounted } from 'vue'
import Swiper from 'swiper'
import { Navigation, Mousewheel, Keyboard } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

let collectionSwiper = ref(null)
let worksSwiper = ref(null)

onMounted(() => {
  // Исправление для Nuxt 4 + Swiper 12: инициализация после полной отрисовки DOM
  setTimeout(() => {
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
  }, 120)
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
    <section class="bg-[#708473] mt-20 pt-10 pb-12 relative">
      <img src="../public/images/4df9807e9d3e419d1c0d0bd39c60a19f-no-bg-preview (carve.photos) 2.png" alt="Стул" class="absolute left-8 -top-10 h-[350px] object-contain z-10" style="filter: drop-shadow(0 8px 12px rgba(0,0,0,0.25));">
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
            <div class="swiper-slide">
              <div class="border border-border p-0">
                <img src="../public/images/collect_stul.png" alt="Кресло" class="w-full h-[540px] object-cover">
              </div>
            </div>
            <div class="swiper-slide">
              <div class="border border-border p-0">
                <img src="../public/images/collect_stol.png" alt="Тумба" class="w-full h-[540px] object-cover">
              </div>
            </div>
            <div class="swiper-slide">
              <div class="border border-border p-0">
                <img src="../public/images/collect_tumb.png" alt="Диванчик" class="w-full h-[540px] object-cover">
              </div>
            </div>
            <div class="swiper-slide">
              <div class="border border-border p-0">
                <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80" alt="Обеденный стол" class="w-full h-[540px] object-cover">
              </div>
            </div>
            <div class="swiper-slide">
              <div class="border border-border p-0">
                <img src="https://images.unsplash.com/photo-1550581190-9c1c48d21d66?q=80" alt="Современное кресло" class="w-full h-[540px] object-cover">
              </div>
            </div>
            <div class="swiper-slide">
              <div class="border border-border p-0">
                <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80" alt="Мягкий диван" class="w-full h-[540px] object-cover">
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
              <img src="../public/images/about_stol.png" alt="Стол" class="w-full h-full object-cover">
              <img src="../public/images/about_divan.png" alt="Кресло" class="w-full h-full object-cover">
            </div>
          </div>

          <!-- Большая картинка справа занимает всю высоту -->
          <div class="col-span-1">
            <img src="../public/images/about_divan_2.png" alt="Диван" class="w-full h-full object-cover">
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
                <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80" alt="Проект 1" class="w-full h-[555px] object-cover">
              </div>
            </div>
            <div class="swiper-slide">
              <div class="border border-border p-0">
                <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80" alt="Проект 2" class="w-full h-[555px] object-cover">
              </div>
            </div>
            <div class="swiper-slide">
              <div class="border border-border p-0">
                <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80" alt="Проект 3" class="w-full h-[555px] object-cover">
              </div>
            </div>
            <div class="swiper-slide">
              <div class="border border-border p-0">
                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80" alt="Проект 4" class="w-full h-[555px] object-cover">
              </div>
            </div>
            <div class="swiper-slide">
              <div class="border border-border p-0">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80" alt="Проект 5" class="w-full h-[555px] object-cover">
              </div>
            </div>
            <div class="swiper-slide">
              <div class="border border-border p-0">
                <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80" alt="Проект 6" class="w-full h-[555px] object-cover">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-primary py-16 mt-16">
      <div class="container mx-auto px-4 text-center">
        <h2 class="font-heading text-textMain text-5xl">CLICKWOOD</h2>
      </div>
    </footer>
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
