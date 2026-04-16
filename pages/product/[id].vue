<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const productId = parseInt(route.params.id)

// Общий массив товаров (такой же как на странице каталога)
const products = [
  { id: 1, name: 'ДИВАН "НИМБУС"', price: '89 000 руб.', categoryId: 'sofas', code: '4789651', rating: 4, reviews: 17,
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80',
      'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80',
      'https://images.unsplash.com/photo-1611042553365-9b101441c135?q=80'
    ],
    description: 'Трендовая форма и безупречная функциональность объединились в этом диване. Мягкие формы и современный дизайн идеально впишутся в любой интерьер.',
    characteristics: 'Ширина: 220 см\nГлубина: 95 см\nВысота: 85 см\nМатериал: велюр\nКаркас: массив сосны'
  },
  { id: 2, name: 'ДИВАН "ОАЗИС"', price: '76 000 руб.', categoryId: 'sofas', code: '4789652', rating: 5, reviews: 24,
    images: [
      'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80',
      'https://images.unsplash.com/photo-1611042553365-9b101441c135?q=80'
    ],
    description: 'Комфортный диван для отдыха всей семьи. Удобные подушки подголовника и мягкое сиденье обеспечат максимальный комфорт.',
    characteristics: 'Ширина: 200 см\nГлубина: 90 см\nВысота: 80 см\nМатериал: рогожка\nКаркас: береза'
  },
  { id: 3, name: 'ДИВАН "ВЕГАС"', price: '102 000 руб.', categoryId: 'sofas', code: '4789653', rating: 4, reviews: 12,
    images: [
      'https://images.unsplash.com/photo-1611042553365-9b101441c135?q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80',
      'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80'
    ],
    description: 'Премиум диван с механизмом трансформации. Легко превращается в полноценное спальное место.',
    characteristics: 'Ширина: 240 см\nГлубина: 100 см\nВысота: 90 см\nМатериал: кожзам\nКаркас: бук'
  },
  { id: 4, name: 'ЖУРНАЛЬНЫЙ СТОЛ "БУД"', price: '80 000 руб.', categoryId: 'tables', code: '4789654', rating: 5, reviews: 31,
    images: [
      'https://images.unsplash.com/photo-1550581190-9c1c48d21d66?q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80'
    ],
    description: 'Уникальный журнальный стол ручной работы из массива дуба. Каждый экземпляр имеет уникальный рисунок древесины.',
    characteristics: 'Диаметр: 80 см\nВысота: 45 см\nМатериал: массив дуба\nПокрытие: масло'
  },
  { id: 5, name: 'ЖУРНАЛЬНЫЙ СТОЛ "ГЛАСС"', price: '52 000 руб.', categoryId: 'tables', code: '4789655', rating: 4, reviews: 19,
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80',
      'https://images.unsplash.com/photo-1550581190-9c1c48d21d66?q=80'
    ],
    description: 'Современный журнальный стол с стеклянной столешницей и металлическим основанием. Легкий и элегантный дизайн.',
    characteristics: 'Диаметр: 70 см\nВысота: 42 см\nМатериал: закаленное стекло, сталь\nПокрытие: порошковое'
  },
  { id: 6, name: 'КРЕСЛО "ТРИЭЛЬ"', price: '36 000 руб.', categoryId: 'chairs', code: '4789656', rating: 5, reviews: 42,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80',
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80'
    ],
    description: 'Эргономичное кресло с анатомической спинкой. Идеально для долгого отдыха и работы за компьютером.',
    characteristics: 'Ширина: 75 см\nГлубина: 70 см\nВысота: 85 см\nМатериал: микрофибра\nКаркас: массив'
  },
  { id: 7, name: 'КРЕСЛО "ЛАГУНА"', price: '41 000 руб.', categoryId: 'chairs', code: '4789657', rating: 4, reviews: 28,
    images: [
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80'
    ],
    description: 'Кресло с высокой спинкой и плавными линиями. Создает атмосферу уюта в любом помещении.',
    characteristics: 'Ширина: 80 см\nГлубина: 75 см\nВысота: 95 см\nМатериал: вельвет\nКаркас: береза'
  },
  { id: 8, name: 'КОМОД "ВИМ"', price: '72 000 руб.', categoryId: 'storage', code: '4789658', rating: 5, reviews: 22,
    images: [
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80',
      'https://images.unsplash.com/photo-1611267254323-4db7b39c732c?q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80'
    ],
    description: 'Просторный комод с шестью ящиками. Идеальное решение для хранения одежды и домашних принадлежностей.',
    characteristics: 'Ширина: 150 см\nГлубина: 45 см\nВысота: 80 см\nМатериал: МДФ, шпон дуба\nФурнитура: Blum'
  },
  { id: 9, name: 'ТУМБА "НОРД"', price: '48 000 руб.', categoryId: 'storage', code: '4789659', rating: 4, reviews: 15,
    images: [
      'https://images.unsplash.com/photo-1611267254323-4db7b39c732c?q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80'
    ],
    description: 'Компактная тумба под ТВ с двумя откидными дверцами. Низкий профиль и современный дизайн.',
    characteristics: 'Ширина: 120 см\nГлубина: 40 см\nВысота: 50 см\nМатериал: ЛДСП\nФурнитура: Hettich'
  },
  { id: 10, name: 'СТЕЛЛАЖ "ВЕРТИКАЛЬ"', price: '59 000 руб.', categoryId: 'storage', code: '4789660', rating: 5, reviews: 37,
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80'
    ],
    description: 'Высокий стеллаж с пятью открытыми полками. Универсальное решение для хранения книг, декора и посуды.',
    characteristics: 'Ширина: 80 см\nГлубина: 35 см\nВысота: 200 см\nМатериал: массив сосны\nПокрытие: лак'
  },
  { id: 11, name: 'ПОДВЕСНОЙ СВЕТИЛЬНИК', price: '27 000 руб.', categoryId: 'lighting', code: '4789661', rating: 4, reviews: 21,
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80'
    ],
    description: 'Дизайнерский подвесной светильник с матовым стеклом. Создает мягкий рассеянный свет.',
    characteristics: 'Диаметр: 40 см\nВысота: 120 см\nМатериал: металл, стекло\nТип цоколя: E27'
  },
  { id: 12, name: 'НАСТОЛЬНАЯ ЛАМПА', price: '18 500 руб.', categoryId: 'lighting', code: '4789662', rating: 5, reviews: 45,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80'
    ],
    description: 'Элегантная настольная лампа с регулировкой яркости. Идеально для рабочего стола или прикроватной тумбы.',
    characteristics: 'Высота: 45 см\nДиаметр абажура: 25 см\nМатериал: ткань, металл\nРегулировка яркости: да'
  },
  { id: 13, name: 'ВАЗА ДЛЯ ЦВЕТОВ', price: '9 200 руб.', categoryId: 'decor', code: '4789663', rating: 5, reviews: 53,
    images: [
      'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80'
    ],
    description: 'Ручная работа керамическая ваза. Каждая ваза уникальна и имеет легкие неровности придающие особый шарм.',
    characteristics: 'Высота: 30 см\nДиаметр: 15 см\nМатериал: керамика\nПроизводство: Россия'
  }
]

const product = products.find(p => p.id === productId)
const activeTab = ref('description')
const activeImage = ref(0)

const selectImage = (index) => {
  activeImage.value = index
}

const selectTab = (tab) => {
  activeTab.value = tab
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
            <div class="flex-1">
              <img :src="product.images[activeImage]" :alt="product.name" class="w-full max-h-[500px] object-contain" />
            </div>
          </div>

          <!-- Info Column -->
          <div>
            <h1 class="font-heading text-textMain text-4xl mb-2">{{ product.name }}</h1>
            
            <div class="text-gray-500 mb-4">Код товара: {{ product.code }}</div>
            
            <!-- Rating -->
            <div class="flex items-center gap-3 mb-6">
              <div class="flex">
                <span v-for="star in 5" :key="star" class="text-xl" :class="star <= product.rating ? 'text-amber-500' : 'text-gray-300'">★</span>
              </div>
              <span class="text-gray-500 underline cursor-pointer">{{ product.reviews }} отзывов</span>
            </div>

            <!-- Colors -->
            <div class="flex gap-3 mb-6">
              <div class="w-6 h-6 rounded-full bg-amber-800 cursor-pointer border-2 border-white shadow"></div>
              <div class="w-6 h-6 rounded-full bg-amber-200 cursor-pointer border-2 border-white shadow"></div>
            </div>

            <!-- Price -->
            <div class="font-body text-4xl text-textMain mb-6">{{ product.price }}</div>

            <!-- Buttons -->
            <div class="flex flex-col gap-3 mb-8">
              <button class="w-full py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
                В корзину
              </button>
              <button class="w-full py-3 border border-primary text-primary rounded-full hover:bg-primary/5 transition-colors">
                Купить в 1 клик
              </button>
            </div>

            <!-- Additional info -->
            <div class="space-y-4">
              <div class="flex items-center justify-between py-3 border-b border-gray-200 cursor-pointer hover:text-primary">
                <span>Стоимость доставки</span>
                <span>›</span>
              </div>
              <div class="flex items-center justify-between py-3 border-b border-gray-200 cursor-pointer hover:text-primary">
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
              Отзывы о товаре ({{ product.reviews }})
            </button>
            <button @click="selectTab('questions')" 
                    class="pb-4 font-body text-lg"
                    :class="{ 'border-b-2 border-primary text-primary': activeTab === 'questions', 'text-gray-500': activeTab !== 'questions' }">
              Вопросы о товаре (0)
            </button>
          </div>

          <div class="max-w-3xl">
            <div v-if="activeTab === 'description'" class="font-body text-lg leading-relaxed whitespace-pre-line">
              {{ product.description }}
            </div>
            <div v-if="activeTab === 'characteristics'" class="font-body text-lg leading-relaxed whitespace-pre-line">
              {{ product.characteristics }}
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

    <!-- Footer -->
    <footer class="bg-primary py-16 mt-16">
      <div class="container mx-auto px-4 text-center">
        <NuxtLink to="/" class="font-heading text-textMain text-5xl hover:opacity-80 transition-opacity">CLICKWOOD</NuxtLink>
      </div>
    </footer>
  </main>
</template>