<script setup>
import { useCart } from '~/composables/useCart'

const { addItem } = useCart()

const rooms = [
  {
    id: 'living',
    name: 'Гостиная',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop',
    items: [
      { name: 'Диван', price: 89000, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop' },
      { name: 'Журнальный стол', price: 35000, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=100&h=100&fit=crop' },
      { name: 'Кресло', price: 41000, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=100&h=100&fit=crop' },
      { name: 'Стеллаж', price: 59000, image: 'https://images.unsplash.com/photo-1611042553365-9b101441c135?q=80&w=100&h=100&fit=crop' }
    ],
    price: 224000,
    setPrice: 178000,
    discount: 15,
    description: 'Полный комплект мебели для стильной и уютной гостиной. Все предметы идеально сочетаются по стилю и цветовой гамме.'
  },
  {
    id: 'bedroom',
    name: 'Спальня',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop',
    items: [
      { name: 'Кровать', price: 48000, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop' },
      { name: 'Тумба', price: 22000, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=100&h=100&fit=crop' },
      { name: 'Комод', price: 52000, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=100&h=100&fit=crop' }
    ],
    price: 122000,
    setPrice: 96000,
    discount: 12,
    description: 'Гармоничный комплект для спальни, создающий атмосферу спокойствия и уюта.'
  },
  {
    id: 'kitchen',
    name: 'Кухня',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
    items: [
      { name: 'Кухонный стол', price: 45000, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop' },
      { name: 'Стулья (4 шт.)', price: 48000, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=100&h=100&fit=crop' },
      { name: 'Стеллаж для посуды', price: 35000, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=100&h=100&fit=crop' },
      { name: 'Настольная лампа', price: 18500, image: 'https://images.unsplash.com/photo-1611042553365-9b101441c135?q=80&w=100&h=100&fit=crop' }
    ],
    price: 146500,
    setPrice: 118000,
    discount: 18,
    description: 'Функциональный и стильный комплект мебели для вашей кухни.'
  },
  {
    id: 'kids',
    name: 'Детская',
    image: 'https://images.unsplash.com/photo-1617325247665-96e58a881527?w=800&h=600&fit=crop',
    items: [
      { name: 'Кровать детская', price: 35000, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop' },
      { name: 'Письменный стол', price: 28000, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=100&h=100&fit=crop' },
      { name: 'Стеллаж для игрушек', price: 22000, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=100&h=100&fit=crop' }
    ],
    price: 85000,
    setPrice: 70000,
    discount: 10,
    description: 'Безопасная и функциональная мебель для детской комнаты.'
  },
  {
    id: 'office',
    name: 'Кабинет',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=600&fit=crop',
    items: [
      { name: 'Письменный стол', price: 45000, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop' },
      { name: 'Кресло офисное', price: 36000, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=100&h=100&fit=crop' },
      { name: 'Стеллаж для книг', price: 32000, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=100&h=100&fit=crop' },
      { name: 'Настольная лампа', price: 18500, image: 'https://images.unsplash.com/photo-1611042553365-9b101441c135?q=80&w=100&h=100&fit=crop' }
    ],
    price: 131500,
    setPrice: 105000,
    discount: 15,
    description: 'Эргономичное решение для продуктивной работы из дома.'
  },
  {
    id: 'hallway',
    name: 'Прихожая',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
    items: [
      { name: 'Вешалка напольная', price: 15000, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop' },
      { name: 'Тумба для обуви', price: 18000, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=100&h=100&fit=crop' },
      { name: 'Зеркало', price: 12000, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=100&h=100&fit=crop' }
    ],
    price: 45000,
    setPrice: 37000,
    discount: 10,
    description: 'Компактный и функциональный комплект для прихожей.'
  },
  {
    id: 'bathroom',
    name: 'Ванная',
    image: 'https://images.unsplash.com/photo-1552321554300-156376675a3e?w=800&h=600&fit=crop',
    items: [
      { name: 'Тумба под раковину', price: 22000, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop' },
      { name: 'Шкаф навесной', price: 18000, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=100&h=100&fit=crop' },
      { name: 'Полка для ванной', price: 8000, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=100&h=100&fit=crop' },
      { name: 'Корзина для белья', price: 6000, image: 'https://images.unsplash.com/photo-1611042553365-9b101441c135?q=80&w=100&h=100&fit=crop' }
    ],
    price: 54000,
    setPrice: 44000,
    discount: 8,
    description: 'Стильный комплект мебели для вашей ванной комнаты.'
  },
  {
    id: 'dining',
    name: 'Столовая',
    image: 'https://images.unsplash.com/photo-1617806118233-682011157657?w=800&h=600&fit=crop',
    items: [
      { name: 'Обеденный стол', price: 62000, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop' },
      { name: 'Стулья (6 шт.)', price: 72000, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=100&h=100&fit=crop' },
      { name: 'Сервант', price: 48000, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=100&h=100&fit=crop' }
    ],
    price: 182000,
    setPrice: 148000,
    discount: 12,
    description: 'Элегантный комплект для уютных семейных обедов и приёма гостей.'
  }
]

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
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&h=1080&fit=crop')] bg-cover bg-center"></div>
      
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

    <!-- Rooms Grid (catalog-style cards) -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[60px]">
          <NuxtLink
            :to="`/collection/${room.id}`"
            v-for="room in rooms"
            :key="room.id"
            class="group cursor-pointer block"
          >
            <div class="relative overflow-hidden">
              <img
                :src="room.image"
                :alt="room.name"
                class="w-full h-[320px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute top-3 left-3 bg-primary/90 text-white text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-body">
                -{{ room.discount }}%
              </div>
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <span class="text-white font-body text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary px-6 py-3 rounded-full">
                  Собрать комплект
                </span>
              </div>
            </div>
            <div class="pt-4">
              <h3 class="font-heading text-textMain text-xl">{{ room.name }}</h3>
              <div class="flex items-center gap-2 mt-2">
                <img v-for="(item, i) in room.items" :key="i"
                     :src="item.image" class="w-8 h-8 rounded-full object-cover border border-border"
                     :title="item.name">
              </div>
              <div class="flex items-center gap-3 mt-2">
                <span class="font-body text-primary text-lg font-medium">{{ room.setPrice.toLocaleString('ru-RU') }} ₽</span>
                <span class="font-body text-sm text-gray-400 line-through">{{ room.price.toLocaleString('ru-RU') }} ₽</span>
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
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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