<script setup>
const rooms = [
  {
    id: 'living',
    name: 'Гостиная',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop',
    items: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1611042553365-9b101441c135?q=80&w=100&h=100&fit=crop'
    ],
    price: 124000,
    discount: 15
  },
  {
    id: 'bedroom',
    name: 'Спальня',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop',
    items: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=100&h=100&fit=crop'
    ],
    price: 89000,
    discount: 12
  },
  {
    id: 'kitchen',
    name: 'Кухня',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
    items: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1611042553365-9b101441c135?q=80&w=100&h=100&fit=crop'
    ],
    price: 156000,
    discount: 18
  },
  {
    id: 'kids',
    name: 'Детская',
    image: 'https://images.unsplash.com/photo-1617325247665-96e58a881527?w=800&h=600&fit=crop',
    items: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=100&h=100&fit=crop'
    ],
    price: 78000,
    discount: 10
  },
  {
    id: 'office',
    name: 'Кабинет',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=600&fit=crop',
    items: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1611042553365-9b101441c135?q=80&w=100&h=100&fit=crop'
    ],
    price: 92000,
    discount: 15
  },
  {
    id: 'hallway',
    name: 'Прихожая',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
    items: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=100&h=100&fit=crop'
    ],
    price: 45000,
    discount: 10
  },
  {
    id: 'bathroom',
    name: 'Ванная',
    image: 'https://images.unsplash.com/photo-1552321554300-156376675a3e?w=800&h=600&fit=crop',
    items: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1611042553365-9b101441c135?q=80&w=100&h=100&fit=crop'
    ],
    price: 38000,
    discount: 8
  },
  {
    id: 'dining',
    name: 'Столовая',
    image: 'https://images.unsplash.com/photo-1617806118233-682011157657?w=800&h=600&fit=crop',
    items: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=100&h=100&fit=crop'
    ],
    price: 112000,
    discount: 12
  }
]

const benefits = [
  {
    icon: '💰',
    title: 'Экономия до 15%',
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
      <div class="absolute inset-0 bg-[url(\'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&h=1080&fit=crop\')] bg-cover bg-center"></div>
      
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

    <!-- Rooms Grid -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="room in rooms" :key="room.id" 
               class="group relative rounded-2xl overflow-hidden border border-border cursor-pointer hover:shadow-xl transition-all duration-300">
            <div class="relative h-[280px]">
              <img :src="room.image" :alt="room.name" 
                   class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
              
              <div class="absolute top-4 right-4 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                -{{ room.discount }}%
              </div>
            </div>
            
            <div class="p-6">
              <h3 class="font-heading text-textMain text-2xl mb-4">{{ room.name }}</h3>
              
              <div class="flex items-center gap-2 mb-4">
                <img v-for="item in room.items" :key="item" 
                     :src="item" class="w-10 h-10 rounded-lg object-cover border border-border">
              </div>
              
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-heading text-primary text-2xl">от {{ room.price.toLocaleString('ru-RU') }} ₽</div>
                </div>
                <button class="bg-primary text-white px-6 py-3 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Собрать комплект
                </button>
              </div>
            </div>
          </div>
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

    <!-- Footer -->
    <footer class="bg-primary py-16">
      <div class="container mx-auto px-4 text-center">
        <h2 class="font-heading text-textMain text-5xl">CLICKWOOD</h2>
      </div>
    </footer>
  </main>
</template>