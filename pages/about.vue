<script setup>
import { ref, onMounted } from 'vue'
import Swiper from 'swiper'
import { Navigation, Mousewheel, Keyboard } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

let gallerySwiper = ref(null)

onMounted(() => {
  setTimeout(() => {
    gallerySwiper.value = new Swiper('.gallery-slider', {
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

const prevGallery = () => gallerySwiper.value?.slidePrev()
const nextGallery = () => gallerySwiper.value?.slideNext()

const advantages = [
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    title: 'Качественные материалы',
    description: 'Используем только сертифицированное дерево, экологичные лаки и надёжную фурнитуру европейских производителей.'
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    title: 'Гарантия на всю продукцию',
    description: 'Предоставляем официальную гарантию 3 года на всю мебель. В случае проблем мы бесплатно ремонтируем или заменяем изделие.'
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 14-6.17-3.23a2 2 0 0 0-1.66 0L2 14"/></svg>`,
    title: 'Быстрая доставка',
    description: 'Собственный автопарк позволяет доставлять заказы по Москве и Московской области в течение 3 рабочих дней.'
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    title: 'Индивидуальный подход',
    description: 'Мы создаём мебель по индивидуальным размерам, подбираем материалы и цвета специально под ваш интерьер.'
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v12"/><path d="M18 9V3"/><path d="M2 21h20"/><path d="M12 3v18"/><path d="M12 9h8"/><path d="M12 3h4"/><path d="M12 15h4"/><path d="M6 9h4"/><path d="M6 5h2"/></svg>`,
    title: 'Собственное производство',
    description: 'Весь производственный цикл находится под нашим контролем: от распила дерева до финальной сборки и упаковки.'
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    title: 'Экологичность',
    description: 'Вся наша продукция соответствует европейским стандартам экологической безопасности, безопасна для детей и аллергиков.'
  }
]

const team = [
  {
    name: 'Александр Петров',
    position: 'Основатель и генеральный директор',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop'
  },
  {
    name: 'Мария Иванова',
    position: 'Главный дизайнер',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop'
  },
  {
    name: 'Дмитрий Смирнов',
    position: 'Руководитель производства',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop'
  },
  {
    name: 'Елена Козлова',
    position: 'Руководитель отдела продаж',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop'
  }
]

const galleryImages = [
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'
]
</script>

<template>
  <main>
    <!-- Hero Section -->
    <section class="h-[500px] md:h-[600px] flex flex-col items-center justify-center relative overflow-hidden">
      <div class="absolute inset-0 bg-black/30 z-10"></div>
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&h=1080&fit=crop')] bg-cover bg-center"></div>
      
      <div class="container mx-auto px-4 text-center relative z-20">
        <h1 class="font-heading text-white text-5xl md:text-7xl leading-tight tracking-wider">
          О нас
        </h1>
        <div class="w-24 h-1 bg-primary mx-auto mt-8 rounded-full"></div>
      </div>
    </section>

    <!-- History Section -->
    <section class="py-20">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="font-heading text-textMain text-4xl md:text-5xl text-center mb-16 tracking-wider">
          История CLICKWOOD
        </h2>
        
        <div class="space-y-8 font-body text-textMain text-lg leading-relaxed">
          <p>
            <span class="font-heading text-4xl md:text-5xl text-primary font-bold">CLICKWOOD</span> был основан в 2010 году с простой идеей: создавать мебель, которая будет служить десятилетиями, радовать глаз и приносить уют в каждый дом. Начав с небольшой мастерской в подмосковном городе, мы выросли до современного производства площадью более 5000 квадратных метров.
          </p>
          
          <p>
            За годы работы мы создали более 15 000 уникальных изделий для частных клиентов, офисов, ресторанов и гостиниц. Мы не гонимся за массовостью и низкими ценами — каждый наш продукт создаётся с вниманием к малейшим деталям, из проверенных материалов и на современном оборудовании.
          </p>
          
          <p>
            Сегодня у нас работает команда из 42 профессионалов: дизайнеры, столяры, отделочники, сборщики и логисты. Мы гордимся тем, что каждая вещь, покидающая нашу мастерскую, несёт тепло рук и заботу о тех, кто будет ею пользоваться.
          </p>
        </div>
      </div>
    </section>

    <!-- Advantages Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="font-heading text-textMain text-4xl md:text-5xl text-center mb-16 tracking-wider">
          Наши преимущества
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(advantage, index) in advantages" :key="index" 
               class="bg-white p-8 border border-border rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div class="text-primary mb-6" v-html="advantage.icon"></div>
            <h3 class="font-heading text-textMain text-2xl mb-4">{{ advantage.title }}</h3>
            <p class="font-body text-textMain/80 leading-relaxed">{{ advantage.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <h2 class="font-heading text-textMain text-4xl md:text-5xl text-center mb-16 tracking-wider">
          Наша команда
        </h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(member, index) in team" :key="index" 
               class="group">
            <div class="relative overflow-hidden rounded-xl mb-6">
              <img :src="member.image" :alt="member.name" 
                   class="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 class="font-heading text-textMain text-xl">{{ member.name }}</h3>
            <p class="font-body text-primary mt-2">{{ member.position }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="font-heading text-textMain text-4xl md:text-5xl text-center mb-12 tracking-wider">
          Наше производство
        </h2>
        
        <div class="flex items-center justify-between mb-8">
          <p class="font-body text-textMain/70 max-w-2xl">
            Посмотрите как создаётся мебель CLICKWOOD — от раскроя массива до финальной отделки
          </p>
          
          <div class="flex gap-3">
            <button @click="prevGallery" class="w-10 h-10 border border-textMain rounded-full flex items-center justify-center hover:bg-textMain hover:text-white transition">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button @click="nextGallery" class="w-10 h-10 border border-textMain rounded-full flex items-center justify-center hover:bg-textMain hover:text-white transition">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="gallery-slider swiper">
          <div class="swiper-wrapper">
            <div v-for="(image, index) in galleryImages" :key="index" class="swiper-slide">
              <img :src="image" alt="Производство CLICKWOOD" class="w-full h-[380px] object-cover rounded-xl">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-20">
      <div class="container mx-auto px-4 max-w-5xl">
        <h2 class="font-heading text-textMain text-4xl md:text-5xl text-center mb-16 tracking-wider">
          Наша миссия
        </h2>
        
        <div class="bg-primary/5 border border-border rounded-2xl p-10 md:p-16">
          <blockquote class="font-heading text-textMain text-2xl md:text-3xl leading-relaxed text-center italic">
            «Мы создаём мебель не для того чтобы просто заполнить пространство. Мы создаём вещи, которые становятся частью вашей жизни, хранят воспоминания о семейных ужинах, вечерах с близкими и тихих моментах уюта»
          </blockquote>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
            <div class="text-center">
              <div class="font-heading text-5xl text-primary mb-3">14</div>
              <p class="font-body text-textMain">лет на рынке</p>
            </div>
            <div class="text-center">
              <div class="font-heading text-5xl text-primary mb-3">15 000+</div>
              <p class="font-body text-textMain">готовых проектов</p>
            </div>
            <div class="text-center">
              <div class="font-heading text-5xl text-primary mb-3">42</div>
              <p class="font-body text-textMain">сотрудников</p>
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