<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useCart } from '~/composables/useCart'
import { ref } from 'vue'

const { addItem } = useCart()
const route = useRoute()
const roomId = route.params.id as string

const addedToCart = ref(false)
const itemAddedMessages = ref<Record<number, boolean>>({})

const rooms = [
  {
    id: 'living',
    name: 'Гостиная',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=700&fit=crop',
    items: [
      { id: 101, name: 'Диван "НИМБУС"', price: 89000, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400&h=400&fit=crop', article: 'SOFA-101' },
      { id: 102, name: 'Журнальный стол "ВУД"', price: 35000, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=400&h=400&fit=crop', article: 'TABLE-102' },
      { id: 103, name: 'Кресло "ЛАГУНА"', price: 41000, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400&h=400&fit=crop', article: 'CHAIR-103' },
      { id: 104, name: 'Стеллаж "ВЕРТИКАЛЬ"', price: 59000, image: 'https://images.unsplash.com/photo-1611042553365-9b101441c135?q=80&w=400&h=400&fit=crop', article: 'SHELF-104' }
    ],
    price: 224000,
    setPrice: 178000,
    discount: 15,
    description: 'Полный комплект мебели для стильной и уютной гостиной. Все предметы идеально сочетаются по стилю и цветовой гамме.',
    fullDescription: 'Этот комплект объединяет всё необходимое для создания уютной и функциональной гостиной. Мягкий диван станет центром притяжения для всей семьи, журнальный стол добавит стильный акцент, а кресло и стеллаж завершат образ. Все предметы выполнены в единой цветовой гамме и подчеркнут ваш безупречный вкус.'
  },
  {
    id: 'bedroom',
    name: 'Спальня',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&h=700&fit=crop',
    items: [
      { id: 201, name: 'Кровать "Соня"', price: 48000, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400&h=400&fit=crop', article: 'BED-201' },
      { id: 202, name: 'Тумба "НОРД"', price: 22000, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=400&h=400&fit=crop', article: 'TBL-202' },
      { id: 203, name: 'Комод "ВИМ"', price: 52000, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400&h=400&fit=crop', article: 'CHEST-203' }
    ],
    price: 122000,
    setPrice: 96000,
    discount: 12,
    description: 'Гармоничный комплект для спальни, создающий атмосферу спокойствия и уюта.',
    fullDescription: 'Комплект для спальни включает всё необходимое для комфортного отдыха. Удобная кровать с ортопедическим основанием, вместительный комод для хранения вещей и элегантная тумба — идеальное сочетание функциональности и стиля.'
  },
  {
    id: 'kitchen',
    name: 'Кухня',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=700&fit=crop',
    items: [
      { id: 301, name: 'Кухонный стол', price: 45000, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400&h=400&fit=crop', article: 'KIT-301' },
      { id: 302, name: 'Стулья (4 шт.)', price: 48000, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=400&h=400&fit=crop', article: 'KIT-302' },
      { id: 303, name: 'Стеллаж для посуды', price: 35000, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400&h=400&fit=crop', article: 'KIT-303' },
      { id: 304, name: 'Настольная лампа', price: 18500, image: 'https://images.unsplash.com/photo-1611042553365-9b101441c135?q=80&w=400&h=400&fit=crop', article: 'LAMP-304' }
    ],
    price: 146500,
    setPrice: 118000,
    discount: 18,
    description: 'Функциональный и стильный комплект мебели для вашей кухни.',
    fullDescription: 'Создайте уютную и функциональную кухню с этим комплектом. Просторный стол, удобные стулья, стеллаж для посуды и стильная лампа — всё, что нужно для приготовления и приёма пищи.'
  },
  {
    id: 'kids',
    name: 'Детская',
    image: 'https://images.unsplash.com/photo-1617325247665-96e58a881527?w=1200&h=700&fit=crop',
    items: [
      { id: 401, name: 'Кровать детская', price: 35000, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400&h=400&fit=crop', article: 'KID-401' },
      { id: 402, name: 'Письменный стол', price: 28000, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=400&h=400&fit=crop', article: 'KID-402' },
      { id: 403, name: 'Стеллаж для игрушек', price: 22000, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400&h=400&fit=crop', article: 'KID-403' }
    ],
    price: 85000,
    setPrice: 70000,
    discount: 10,
    description: 'Безопасная и функциональная мебель для детской комнаты.',
    fullDescription: 'Создайте уютное пространство для вашего ребёнка. Удобная кровать для здорового сна, письменный стол для занятий и стеллаж для игрушек — всё продумано до мелочей.'
  },
  {
    id: 'office',
    name: 'Кабинет',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1200&h=700&fit=crop',
    items: [
      { id: 501, name: 'Письменный стол "ОФИС"', price: 45000, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400&h=400&fit=crop', article: 'OFF-501' },
      { id: 502, name: 'Кресло "ТРИЭЛЬ"', price: 36000, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=400&h=400&fit=crop', article: 'CHAIR-502' },
      { id: 503, name: 'Стеллаж для книг', price: 32000, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400&h=400&fit=crop', article: 'SHELF-503' },
      { id: 504, name: 'Настольная лампа', price: 18500, image: 'https://images.unsplash.com/photo-1611042553365-9b101441c135?q=80&w=400&h=400&fit=crop', article: 'LAMP-504' }
    ],
    price: 131500,
    setPrice: 105000,
    discount: 15,
    description: 'Эргономичное решение для продуктивной работы из дома.',
    fullDescription: 'Оборудуйте домашний офис с максимальным комфортом. Просторный письменный стол, эргономичное кресло, вместительный стеллаж и стильная лампа — для продуктивной работы.'
  },
  {
    id: 'hallway',
    name: 'Прихожая',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=700&fit=crop',
    items: [
      { id: 601, name: 'Вешалка напольная', price: 15000, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400&h=400&fit=crop', article: 'HALL-601' },
      { id: 602, name: 'Тумба для обуви', price: 18000, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=400&h=400&fit=crop', article: 'HALL-602' },
      { id: 603, name: 'Зеркало', price: 12000, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400&h=400&fit=crop', article: 'HALL-603' }
    ],
    price: 45000,
    setPrice: 37000,
    discount: 10,
    description: 'Компактный и функциональный комплект для прихожей.',
    fullDescription: 'Встречайте гостей стильно! Компактная вешалка, удобная тумба для обуви и большое зеркало — всё необходимое для функциональной прихожей.'
  },
  {
    id: 'bathroom',
    name: 'Ванная',
    image: 'https://images.unsplash.com/photo-1552321554300-156376675a3e?w=1200&h=700&fit=crop',
    items: [
      { id: 701, name: 'Тумба под раковину', price: 22000, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400&h=400&fit=crop', article: 'BATH-701' },
      { id: 702, name: 'Шкаф навесной', price: 18000, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=400&h=400&fit=crop', article: 'BATH-702' },
      { id: 703, name: 'Полка для ванной', price: 8000, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400&h=400&fit=crop', article: 'BATH-703' },
      { id: 704, name: 'Корзина для белья', price: 6000, image: 'https://images.unsplash.com/photo-1611042553365-9b101441c135?q=80&w=400&h=400&fit=crop', article: 'BATH-704' }
    ],
    price: 54000,
    setPrice: 44000,
    discount: 8,
    description: 'Стильный комплект мебели для вашей ванной комнаты.',
    fullDescription: 'Преобразите ванную комнату с этим стильным комплектом. Функциональная тумба, вместительный шкаф, удобная полка и корзина для белья — всё для порядка и уюта.'
  },
  {
    id: 'dining',
    name: 'Столовая',
    image: 'https://images.unsplash.com/photo-1617806118233-682011157657?w=1200&h=700&fit=crop',
    items: [
      { id: 801, name: 'Обеденный стол', price: 62000, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400&h=400&fit=crop', article: 'DINE-801' },
      { id: 802, name: 'Стулья (6 шт.)', price: 72000, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=400&h=400&fit=crop', article: 'DINE-802' },
      { id: 803, name: 'Сервант', price: 48000, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400&h=400&fit=crop', article: 'DINE-803' }
    ],
    price: 182000,
    setPrice: 148000,
    discount: 12,
    description: 'Элегантный комплект для уютных семейных обедов и приёма гостей.',
    fullDescription: 'Создайте атмосферу для незабываемых ужинов с этим элегантным комплектом. Просторный обеденный стол, комплект стильных стульев и изящный сервант — всё для вашей столовой.'
  }
]

const room = rooms.find(r => r.id === roomId)

const addItemToCart = (item: { id: number; name: string; price: number; image: string; article: string }) => {
  addItem({ id: item.id, name: item.name, price: item.price, image: item.image, article: item.article })
  itemAddedMessages.value[item.id] = true
  setTimeout(() => {
    itemAddedMessages.value[item.id] = false
  }, 1500)
}

const addAllToCart = () => {
  if (!room) return
  room.items.forEach(item => {
    addItem({ id: item.id, name: item.name, price: item.price, image: item.image, article: item.article })
  })
  addedToCart.value = true
  setTimeout(() => {
    addedToCart.value = false
  }, 2000)
}
</script>

<template>
  <main v-if="room">
    <!-- Breadcrumbs -->
    <section class="py-4 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="flex items-center gap-2 text-sm text-textMain/60">
          <NuxtLink to="/" class="hover:text-textMain transition-colors">Главная</NuxtLink>
          <span>/</span>
          <NuxtLink to="/collections" class="hover:text-textMain transition-colors">Готовые решения</NuxtLink>
          <span>/</span>
          <span class="text-textMain">{{ room.name }}</span>
        </div>
      </div>
    </section>

    <!-- Hero -->
    <section class="h-[400px] md:h-[500px] flex flex-col items-center justify-center relative overflow-hidden">
      <div class="absolute inset-0 bg-black/30 z-10"></div>
      <img :src="room.image" :alt="room.name" class="absolute inset-0 w-full h-full object-cover" />
      <div class="container mx-auto px-4 text-center relative z-20">
        <span class="inline-block bg-primary/90 text-white text-xs uppercase tracking-wider px-4 py-1.5 rounded-full font-body mb-4">
          Экономия {{ room.discount }}%
        </span>
        <h1 class="font-heading text-white text-4xl md:text-6xl leading-tight tracking-wider">
          {{ room.name }}
        </h1>
        <p class="font-body text-white/90 text-lg md:text-xl mt-4 max-w-2xl mx-auto">
          {{ room.description }}
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
            
            <div class="space-y-4">
              <div
                v-for="(item, i) in room.items"
                :key="item.id"
                class="border border-border rounded-xl overflow-hidden transition-all duration-300"
                style="animation: fadeUp 0.3s ease both;"
                :style="{ animationDelay: `${i * 0.05}s` }"
              >
                <div class="flex items-center gap-4 p-4">
                  <div class="w-20 h-20 rounded-lg overflow-hidden border border-border flex-shrink-0 bg-white">
                    <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="font-body text-textMain font-medium">{{ item.name }}</h3>
                    <p class="text-xs text-gray-400 mt-0.5">Код: {{ item.article }}</p>
                    <p class="font-body text-lg text-textMain mt-1">{{ item.price.toLocaleString('ru-RU') }} ₽</p>
                  </div>
                  <button
                    @click="addItemToCart(item)"
                    class="px-5 py-2.5 border border-primary text-primary rounded-lg font-body text-sm hover:bg-primary hover:text-white transition-all whitespace-nowrap flex-shrink-0"
                    :class="{ 'bg-primary text-white': itemAddedMessages[item.id] }"
                  >
                    <span v-if="itemAddedMessages[item.id]">✓ Добавлено</span>
                    <span v-else>В корзину</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Full description -->
            <div class="mt-10">
              <h3 class="font-heading text-textMain text-xl mb-4">О решении</h3>
              <p class="font-body text-textMain/80 leading-relaxed">{{ room.fullDescription }}</p>
            </div>

            <!-- Features mini -->
            <div class="grid grid-cols-3 gap-4 mt-8">
              <div class="bg-primary/5 rounded-xl p-4 text-center">
                <div class="font-heading text-2xl text-primary">{{ room.items.length }}</div>
                <p class="font-body text-xs text-textMain/70 mt-1">предметов</p>
              </div>
              <div class="bg-primary/5 rounded-xl p-4 text-center">
                <div class="font-heading text-2xl text-primary">-{{ room.discount }}%</div>
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

                <div class="space-y-4 font-body">
                  <div v-for="item in room.items" :key="item.id" class="flex justify-between text-sm">
                    <span class="text-textMain/70">{{ item.name }}</span>
                    <span class="text-textMain">{{ item.price.toLocaleString('ru-RU') }} ₽</span>
                  </div>
                </div>

                <div class="border-t border-border mt-6 pt-6 space-y-2">
                  <div class="flex justify-between text-sm">
                    <span class="text-textMain/60">Сумма по отдельности</span>
                    <span class="text-textMain line-through">{{ room.price.toLocaleString('ru-RU') }} ₽</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-textMain/60">Скидка</span>
                    <span class="text-primary font-medium">−{{ (room.price - room.setPrice).toLocaleString('ru-RU') }} ₽</span>
                  </div>
                  <div class="flex justify-between pt-3 border-t border-border">
                    <span class="font-heading text-textMain text-lg">Цена комплекта</span>
                    <span class="font-heading text-primary text-2xl">{{ room.setPrice.toLocaleString('ru-RU') }} ₽</span>
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

  <!-- 404 -->
  <main v-else class="min-h-[60vh] flex items-center justify-center">
    <div class="text-center py-20">
      <div class="text-6xl mb-4">🔍</div>
      <h2 class="font-heading text-textMain text-3xl mb-4">Решение не найдено</h2>
      <p class="font-body text-textMain/70 mb-8">Запрошенный комплект не существует</p>
      <NuxtLink to="/collections"
        class="inline-block px-8 py-3 bg-primary text-white rounded-xl font-body text-lg hover:bg-primaryDark transition-colors">
        Вернуться к решениям
      </NuxtLink>
    </div>
  </main>
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