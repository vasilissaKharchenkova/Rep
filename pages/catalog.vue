<script setup>
import { ref, computed } from 'vue'
import { useCart } from '~/composables/useCart'

const { addItem } = useCart()

// ─── Data ────────────────────────────────────

const categories = [
  { id: 'all', name: 'все товары' },
  { id: 'sofas', name: 'диваны' },
  { id: 'chairs', name: 'кресла' },
  { id: 'storage', name: 'хранение' },
  { id: 'tables', name: 'столы' },
  { id: 'decor', name: 'декор' },
  { id: 'lighting', name: 'освещение' }
]

const styles = [
  { id: 'all', name: 'любой' },
  { id: 'scandi', name: 'сканди' },
  { id: 'minimal', name: 'минимализм' },
  { id: 'boho', name: 'бохо' },
  { id: 'artdeco', name: 'ар деко' }
]

const colors = [
  { id: 'all', name: 'любой', hex: 'transparent', border: true },
  { id: 'white', name: 'белый', hex: '#F5F5F0' },
  { id: 'brown', name: 'коричневый', hex: '#8B7355' },
  { id: 'gray', name: 'серый', hex: '#9E9E9E' },
  { id: 'black', name: 'чёрный', hex: '#2C2C2C' },
  { id: 'green', name: 'зелёный', hex: '#5B7B5E' }
]

const sortOptions = [
  { id: 'default', name: 'по умолчанию' },
  { id: 'price-asc', name: 'цена ↑' },
  { id: 'price-desc', name: 'цена ↓' },
  { id: 'name', name: 'по названию' }
]

const products = [
  { id: 1, name: 'ДИВАН "НИМБУС"', price: 89000, categoryId: 'sofas', styleId: 'scandi', color: 'gray', inStock: true, image: 'images/nimbus.png', article: 'SOFA-001' },
  { id: 2, name: 'ЖУРНАЛЬНЫЙ СТОЛ "ВУД"', price: 76000, categoryId: 'sofas', styleId: 'minimal', color: 'brown', inStock: true, image: 'images/vod.png', article: 'TABLE-002' },
  { id: 3, name: 'ЖУРНАЛЬНЫЙ СТОЛ "ГЛАСС"', price: 102000, categoryId: 'sofas', styleId: 'artdeco', color: 'black', inStock: false, image: 'images/glas.png', article: 'TABLE-003' },
  { id: 4, name: 'КРЕСЛО "Гринэль"', price: 80000, categoryId: 'tables', styleId: 'boho', color: 'green', inStock: true, image: 'images/grinel.png', article: 'CHAIR-004' },
  { id: 5, name: 'КОМОД "Бим"', price: 52000, categoryId: 'tables', styleId: 'scandi', color: 'white', inStock: true, image: 'images/bim.png', article: 'CHEST-005' },
  { id: 6, name: 'КРЕСЛО "ТРИЭЛЬ"', price: 36000, categoryId: 'chairs', styleId: 'minimal', color: 'gray', inStock: true, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80', article: 'CHAIR-006' },
  { id: 7, name: 'КРЕСЛО "ЛАГУНА"', price: 41000, categoryId: 'chairs', styleId: 'boho', color: 'green', inStock: false, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80', article: 'CHAIR-007' },
  { id: 8, name: 'КОМОД "ВИМ"', price: 72000, categoryId: 'storage', styleId: 'artdeco', color: 'black', inStock: true, image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80', article: 'CHEST-008' },
  { id: 9, name: 'ТУМБА "НОРД"', price: 48000, categoryId: 'storage', styleId: 'scandi', color: 'white', inStock: true, image: 'https://images.unsplash.com/photo-1611267254323-4db7b39c732c?q=80', article: 'DRAWER-009' },
  { id: 10, name: 'СТЕЛЛАЖ "ВЕРТИКАЛЬ"', price: 59000, categoryId: 'storage', styleId: 'minimal', color: 'gray', inStock: true, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80', article: 'SHELF-010' },
  { id: 11, name: 'ПОДВЕСНОЙ СВЕТИЛЬНИК', price: 27000, categoryId: 'lighting', styleId: 'boho', color: 'black', inStock: true, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80', article: 'LAMP-011' },
  { id: 12, name: 'НАСТОЛЬНАЯ ЛАМПА', price: 18500, categoryId: 'lighting', styleId: 'artdeco', color: 'white', inStock: true, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80', article: 'LAMP-012' },
  { id: 13, name: 'ВАЗА ДЛЯ ЦВЕТОВ', price: 9200, categoryId: 'decor', styleId: 'scandi', color: 'brown', inStock: false, image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80', article: 'DECOR-013' }
]

// ─── Reactive State ──────────────────────────

const activeCategoryId = ref('all')
const activeStyleId = ref('all')
const activeColorId = ref('all')
const activePriceMin = ref(0)
const activePriceMax = ref(150000)
const onlyInStock = ref(false)
const sortBy = ref('default')
const gridColumns = ref(3)

const activeDropdown = ref(null)

// ─── Computed ────────────────────────────────

const activeCategoryName = computed(() => {
  const cat = categories.find(c => c.id === activeCategoryId.value)
  return cat ? cat.name : 'все товары'
})

const activeStyleName = computed(() => {
  const s = styles.find(st => st.id === activeStyleId.value)
  return s ? s.name : 'любой'
})

const activeColorName = computed(() => {
  const c = colors.find(col => col.id === activeColorId.value)
  return c ? c.name : 'любой'
})

const filteredProducts = computed(() => {
  let result = products

  // category
  if (activeCategoryId.value !== 'all') {
    result = result.filter(p => p.categoryId === activeCategoryId.value)
  }
  // style
  if (activeStyleId.value !== 'all') {
    result = result.filter(p => p.styleId === activeStyleId.value)
  }
  // color
  if (activeColorId.value !== 'all') {
    result = result.filter(p => p.color === activeColorId.value)
  }
  // price
  result = result.filter(p => p.price >= activePriceMin.value && p.price <= activePriceMax.value)
  // in stock
  if (onlyInStock.value) {
    result = result.filter(p => p.inStock)
  }
  // sort
  switch (sortBy.value) {
    case 'price-asc':
      result = [...result].sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result = [...result].sort((a, b) => b.price - a.price)
      break
    case 'name':
      result = [...result].sort((a, b) => a.name.localeCompare(b.name))
      break
  }
  return result
})

// ─── Methods ─────────────────────────────────

const selectCategory = (id) => {
  activeCategoryId.value = id
  activeDropdown.value = null
}

const selectStyle = (id) => {
  activeStyleId.value = id
  activeDropdown.value = null
}

const selectColor = (id) => {
  activeColorId.value = id
  activeDropdown.value = null
}

const toggleDropdown = (name) => {
  activeDropdown.value = activeDropdown.value === name ? null : name
}

const toggleGrid = (cols) => {
  gridColumns.value = cols
}

const resetAllFilters = () => {
  activeCategoryId.value = 'all'
  activeStyleId.value = 'all'
  activeColorId.value = 'all'
  activePriceMin.value = 0
  activePriceMax.value = 150000
  onlyInStock.value = false
  sortBy.value = 'default'
}

const hasActiveFilters = computed(() => {
  return activeCategoryId.value !== 'all'
    || activeStyleId.value !== 'all'
    || activeColorId.value !== 'all'
    || activePriceMin.value > 0
    || activePriceMax.value < 150000
    || onlyInStock.value
})

const formatPrice = (price) => price.toLocaleString('ru-RU')

// close dropdown on outside click
if (typeof window !== 'undefined') {
  window.addEventListener('click', (e) => {
    if (!e.target.closest('.filter-dropdown')) {
      activeDropdown.value = null
    }
  })
}
</script>

<template>
  <main>
    <!-- Top bar: categories (like IKEA header nav) -->
    <section class="bg-primary py-3">
      <div class="container mx-auto px-4">
        <nav class="flex gap-8 overflow-x-auto">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="selectCategory(category.id)"
            class="text-white font-body tracking-wide hover:opacity-80 transition-opacity whitespace-nowrap bg-transparent border-none cursor-pointer"
            :class="{
              'opacity-100 font-medium border-b-2 border-white': category.id === activeCategoryId,
              'opacity-70': category.id !== activeCategoryId
            }"
          >
            {{ category.name }}
          </button>
        </nav>
      </div>
    </section>

    <!-- Filter Bar -->
    <section class="py-6 border-b border-border">
      <div class="container mx-auto px-4">
        <!-- Desktop filter bar -->
        <div class="hidden lg:flex items-center justify-between gap-4">
          <!-- Left: filters -->
          <div class="flex items-center gap-3 flex-wrap">

            <!-- Category dropdown -->
            <div class="filter-dropdown relative">
              <button
                @click.stop="toggleDropdown('category')"
                class="flex items-center gap-2 px-4 py-2.5 border border-border rounded text-sm font-body text-textMain hover:border-primary transition-colors cursor-pointer bg-white"
                :class="{ 'border-primary': activeCategoryId !== 'all' }"
              >
                <span class="uppercase text-[11px] tracking-wider text-gray-400">Категория</span>
                <span class="text-textMain font-medium">{{ activeCategoryName }}</span>
                <svg :class="{ 'rotate-180': activeDropdown === 'category' }" class="w-3 h-3 ml-1 transition-transform" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </button>
              <Transition name="dropdown">
                <div v-if="activeDropdown === 'category'" class="absolute top-full left-0 mt-1 w-52 bg-white border border-border rounded-lg shadow-lg z-50 py-1">
                  <button
                    v-for="cat in categories"
                    :key="cat.id"
                    @click="selectCategory(cat.id)"
                    class="w-full text-left px-4 py-2.5 text-sm font-body transition-colors hover:bg-gray-50 cursor-pointer border-none bg-transparent"
                    :class="{ 'text-primary font-medium': cat.id === activeCategoryId, 'text-textMain': cat.id !== activeCategoryId }"
                  >
                    {{ cat.name }}
                  </button>
                </div>
              </Transition>
            </div>

            <!-- Price dropdown -->
            <div class="filter-dropdown relative">
              <button
                @click.stop="toggleDropdown('price')"
                class="flex items-center gap-2 px-4 py-2.5 border border-border rounded text-sm font-body text-textMain hover:border-primary transition-colors cursor-pointer bg-white"
                :class="{ 'border-primary': activePriceMin > 0 || activePriceMax < 150000 }"
              >
                <span class="uppercase text-[11px] tracking-wider text-gray-400">Цена</span>
                <span class="text-textMain font-medium">{{ formatPrice(activePriceMin) }}–{{ formatPrice(activePriceMax) }} ₽</span>
                <svg :class="{ 'rotate-180': activeDropdown === 'price' }" class="w-3 h-3 ml-1 transition-transform" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </button>
              <Transition name="dropdown">
                <div v-if="activeDropdown === 'price'" class="absolute top-full left-0 mt-1 w-64 bg-white border border-border rounded-lg shadow-lg z-50 p-5">
                  <div class="flex gap-3 mb-4">
                    <div>
                      <label class="text-[11px] uppercase tracking-wider text-gray-400 block mb-1">От</label>
                      <input
                        v-model.number="activePriceMin"
                        type="number"
                        min="0"
                        max="150000"
                        step="1000"
                        class="w-full px-3 py-2 border border-border rounded text-sm font-body focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label class="text-[11px] uppercase tracking-wider text-gray-400 block mb-1">До</label>
                      <input
                        v-model.number="activePriceMax"
                        type="number"
                        min="0"
                        max="150000"
                        step="1000"
                        class="w-full px-3 py-2 border border-border rounded text-sm font-body focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <div class="relative h-2 mb-1">
                    <div class="absolute inset-0 bg-border rounded-full"></div>
                    <div
                      class="absolute h-full bg-primary rounded-full"
                      :style="{ left: (activePriceMin / 150000 * 100) + '%', right: (100 - activePriceMax / 150000 * 100) + '%' }"
                    ></div>
                  </div>
                  <input
                    v-model.number="activePriceMin"
                    type="range"
                    min="0"
                    max="150000"
                    step="1000"
                    class="absolute inset-0 w-full opacity-0 pointer-events-none"
                  />
                  <div class="flex justify-between text-[11px] text-gray-400 mt-1">
                    <span>0 ₽</span>
                    <span>150 000 ₽</span>
                  </div>
                </div>
              </Transition>
            </div>

            <!-- Color dropdown -->
            <div class="filter-dropdown relative">
              <button
                @click.stop="toggleDropdown('color')"
                class="flex items-center gap-2 px-4 py-2.5 border border-border rounded text-sm font-body text-textMain hover:border-primary transition-colors cursor-pointer bg-white"
                :class="{ 'border-primary': activeColorId !== 'all' }"
              >
                <span class="uppercase text-[11px] tracking-wider text-gray-400">Цвет</span>
                <span v-if="activeColorId !== 'all'" class="inline-block w-4 h-4 rounded-full border border-border" :style="{ backgroundColor: colors.find(c => c.id === activeColorId)?.hex }"></span>
                <span class="text-textMain font-medium">{{ activeColorName }}</span>
                <svg :class="{ 'rotate-180': activeDropdown === 'color' }" class="w-3 h-3 ml-1 transition-transform" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </button>
              <Transition name="dropdown">
                <div v-if="activeDropdown === 'color'" class="absolute top-full left-0 mt-1 w-56 bg-white border border-border rounded-lg shadow-lg z-50 p-4">
                  <button
                    v-for="col in colors"
                    :key="col.id"
                    @click="selectColor(col.id)"
                    class="w-full flex items-center gap-3 px-3 py-2 rounded text-sm font-body transition-colors hover:bg-gray-50 cursor-pointer border-none bg-transparent"
                    :class="{ 'text-primary font-medium': col.id === activeColorId, 'text-textMain': col.id !== activeColorId }"
                  >
                    <span
                      class="w-5 h-5 rounded-full border flex-shrink-0"
                      :class="{ 'border-gray-300': col.id === 'all', 'border-border': col.id !== 'all' }"
                      :style="col.hex === 'transparent' ? {} : { backgroundColor: col.hex }"
                    >
                      <svg v-if="col.id === 'all'" class="w-full h-full p-1 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </span>
                    {{ col.name }}
                  </button>
                </div>
              </Transition>
            </div>

            <!-- Style dropdown -->
            <div class="filter-dropdown relative">
              <button
                @click.stop="toggleDropdown('style')"
                class="flex items-center gap-2 px-4 py-2.5 border border-border rounded text-sm font-body text-textMain hover:border-primary transition-colors cursor-pointer bg-white"
                :class="{ 'border-primary': activeStyleId !== 'all' }"
              >
                <span class="uppercase text-[11px] tracking-wider text-gray-400">Стиль</span>
                <span class="text-textMain font-medium">{{ activeStyleName }}</span>
                <svg :class="{ 'rotate-180': activeDropdown === 'style' }" class="w-3 h-3 ml-1 transition-transform" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </button>
              <Transition name="dropdown">
                <div v-if="activeDropdown === 'style'" class="absolute top-full left-0 mt-1 w-48 bg-white border border-border rounded-lg shadow-lg z-50 py-1">
                  <button
                    v-for="s in styles"
                    :key="s.id"
                    @click="selectStyle(s.id)"
                    class="w-full text-left px-4 py-2.5 text-sm font-body transition-colors hover:bg-gray-50 cursor-pointer border-none bg-transparent"
                    :class="{ 'text-primary font-medium': s.id === activeStyleId, 'text-textMain': s.id !== activeStyleId }"
                  >
                    {{ s.name }}
                  </button>
                </div>
              </Transition>
            </div>

            <!-- In Stock toggle -->
            <button
              @click="onlyInStock = !onlyInStock"
              class="flex items-center gap-2 px-4 py-2.5 border rounded text-sm font-body transition-all cursor-pointer bg-white"
              :class="onlyInStock ? 'border-primary bg-primary/5 text-primary' : 'border-border text-textMain hover:border-primary'"
            >
              <span class="uppercase text-[11px] tracking-wider text-gray-400">Наличие</span>
              <span class="font-medium">в наличии</span>
              <span
                class="w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors"
                :class="onlyInStock ? 'bg-primary border-primary' : 'border-border'"
              >
                <svg v-if="onlyInStock" class="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6L5 9L10 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </button>

            <!-- Reset filters button -->
            <button
              v-if="hasActiveFilters"
              @click="resetAllFilters"
              class="flex items-center gap-1 px-3 py-2.5 text-sm text-gray-400 hover:text-secondary transition-colors cursor-pointer border-none bg-transparent"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              <span class="text-[11px] uppercase tracking-wider">Сбросить</span>
            </button>
          </div>

          <!-- Right: sort + grid toggle -->
          <div class="flex items-center gap-3 flex-shrink-0">
            <!-- Sort -->
            <div class="relative filter-dropdown">
              <button
                @click.stop="toggleDropdown('sort')"
                class="flex items-center gap-2 px-4 py-2.5 border border-border rounded text-sm font-body text-textMain hover:border-primary transition-colors cursor-pointer bg-white"
              >
                <span class="text-textMain">{{ sortOptions.find(o => o.id === sortBy)?.name }}</span>
                <svg :class="{ 'rotate-180': activeDropdown === 'sort' }" class="w-3 h-3 transition-transform" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </button>
              <Transition name="dropdown">
                <div v-if="activeDropdown === 'sort'" class="absolute top-full right-0 mt-1 w-44 bg-white border border-border rounded-lg shadow-lg z-50 py-1">
                  <button
                    v-for="opt in sortOptions"
                    :key="opt.id"
                    @click="sortBy = opt.id; activeDropdown = null"
                    class="w-full text-left px-4 py-2.5 text-sm font-body transition-colors hover:bg-gray-50 cursor-pointer border-none bg-transparent"
                    :class="{ 'text-primary font-medium': opt.id === sortBy, 'text-textMain': opt.id !== sortBy }"
                  >
                    {{ opt.name }}
                  </button>
                </div>
              </Transition>
            </div>

            <!-- Grid toggle -->
            <div class="flex border border-border rounded overflow-hidden">
              <button
                @click="toggleGrid(3)"
                class="p-2.5 transition-colors cursor-pointer border-none"
                :class="gridColumns === 3 ? 'bg-primary text-white' : 'bg-white text-gray-400 hover:text-textMain'"
                title="3 колонки"
              >
                <svg class="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="1" y="1" width="4" height="4" rx="1"/><rect x="7" y="1" width="4" height="4" rx="1"/><rect x="13" y="1" width="4" height="4" rx="1"/>
                  <rect x="1" y="7" width="4" height="4" rx="1"/><rect x="7" y="7" width="4" height="4" rx="1"/><rect x="13" y="7" width="4" height="4" rx="1"/>
                  <rect x="1" y="13" width="4" height="4" rx="1"/><rect x="7" y="13" width="4" height="4" rx="1"/><rect x="13" y="13" width="4" height="4" rx="1"/>
                </svg>
              </button>
              <button
                @click="toggleGrid(4)"
                class="p-2.5 transition-colors cursor-pointer border-none"
                :class="gridColumns === 4 ? 'bg-primary text-white' : 'bg-white text-gray-400 hover:text-textMain'"
                title="4 колонки"
              >
                <svg class="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="0.5" y="0.5" width="3" height="3" rx="0.5"/><rect x="4.5" y="0.5" width="3" height="3" rx="0.5"/><rect x="8.5" y="0.5" width="3" height="3" rx="0.5"/><rect x="12.5" y="0.5" width="3" height="3" rx="0.5"/>
                  <rect x="0.5" y="4.5" width="3" height="3" rx="0.5"/><rect x="4.5" y="4.5" width="3" height="3" rx="0.5"/><rect x="8.5" y="4.5" width="3" height="3" rx="0.5"/><rect x="12.5" y="4.5" width="3" height="3" rx="0.5"/>
                  <rect x="0.5" y="8.5" width="3" height="3" rx="0.5"/><rect x="4.5" y="8.5" width="3" height="3" rx="0.5"/><rect x="8.5" y="8.5" width="3" height="3" rx="0.5"/><rect x="12.5" y="8.5" width="3" height="3" rx="0.5"/>
                  <rect x="0.5" y="12.5" width="3" height="3" rx="0.5"/><rect x="4.5" y="12.5" width="3" height="3" rx="0.5"/><rect x="8.5" y="12.5" width="3" height="3" rx="0.5"/><rect x="12.5" y="12.5" width="3" height="3" rx="0.5"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile filter bar -->
        <div class="flex lg:hidden items-center justify-between">
          <button
            @click="toggleDropdown('mobile')"
            class="flex items-center gap-2 px-4 py-2.5 border border-border rounded text-sm font-body text-textMain cursor-pointer bg-white"
          >
            <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none"><path d="M2 4H14M4 8H12M6 12H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            <span class="font-medium">Фильтры</span>
            <span v-if="hasActiveFilters" class="w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold">!</span>
          </button>
          <div class="flex items-center gap-3">
            <div class="relative">
              <select
                v-model="sortBy"
                class="px-3 py-2.5 border border-border rounded text-sm font-body text-textMain bg-white cursor-pointer"
              >
                <option v-for="opt in sortOptions" :key="opt.id" :value="opt.id">{{ opt.name }}</option>
              </select>
            </div>
            <div class="flex border border-border rounded overflow-hidden">
              <button @click="toggleGrid(3)" class="p-2 transition-colors cursor-pointer border-none" :class="gridColumns === 3 ? 'bg-primary text-white' : 'bg-white text-gray-400'">
                <svg class="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="1" y="1" width="4" height="4" rx="1"/><rect x="7" y="1" width="4" height="4" rx="1"/><rect x="13" y="1" width="4" height="4" rx="1"/>
                  <rect x="1" y="7" width="4" height="4" rx="1"/><rect x="7" y="7" width="4" height="4" rx="1"/><rect x="13" y="7" width="4" height="4" rx="1"/>
                  <rect x="1" y="13" width="4" height="4" rx="1"/><rect x="7" y="13" width="4" height="4" rx="1"/><rect x="13" y="13" width="4" height="4" rx="1"/>
                </svg>
              </button>
              <button @click="toggleGrid(4)" class="p-2 transition-colors cursor-pointer border-none" :class="gridColumns === 4 ? 'bg-primary text-white' : 'bg-white text-gray-400'">
                <svg class="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="0.5" y="0.5" width="3" height="3" rx="0.5"/><rect x="4.5" y="0.5" width="3" height="3" rx="0.5"/><rect x="8.5" y="0.5" width="3" height="3" rx="0.5"/><rect x="12.5" y="0.5" width="3" height="3" rx="0.5"/>
                  <rect x="0.5" y="4.5" width="3" height="3" rx="0.5"/><rect x="4.5" y="4.5" width="3" height="3" rx="0.5"/><rect x="8.5" y="4.5" width="3" height="3" rx="0.5"/><rect x="12.5" y="4.5" width="3" height="3" rx="0.5"/>
                  <rect x="0.5" y="8.5" width="3" height="3" rx="0.5"/><rect x="4.5" y="8.5" width="3" height="3" rx="0.5"/><rect x="8.5" y="8.5" width="3" height="3" rx="0.5"/><rect x="12.5" y="8.5" width="3" height="3" rx="0.5"/>
                  <rect x="0.5" y="12.5" width="3" height="3" rx="0.5"/><rect x="4.5" y="12.5" width="3" height="3" rx="0.5"/><rect x="8.5" y="12.5" width="3" height="3" rx="0.5"/><rect x="12.5" y="12.5" width="3" height="3" rx="0.5"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile filters panel -->
        <Transition name="slide">
          <div v-if="activeDropdown === 'mobile'" class="lg:hidden mt-4 p-4 border border-border rounded-lg bg-white shadow-lg">
            <!-- Category -->
            <div class="mb-4">
              <label class="text-[11px] uppercase tracking-wider text-gray-400 block mb-2">Категория</label>
              <select v-model="activeCategoryId" class="w-full px-3 py-2.5 border border-border rounded text-sm font-body bg-white">
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
              </select>
            </div>
            <!-- Price -->
            <div class="mb-4">
              <label class="text-[11px] uppercase tracking-wider text-gray-400 block mb-2">Цена</label>
              <div class="flex gap-3">
                <input v-model.number="activePriceMin" type="number" min="0" max="150000" step="1000" placeholder="от" class="w-full px-3 py-2 border border-border rounded text-sm font-body" />
                <input v-model.number="activePriceMax" type="number" min="0" max="150000" step="1000" placeholder="до" class="w-full px-3 py-2 border border-border rounded text-sm font-body" />
              </div>
            </div>
            <!-- Color -->
            <div class="mb-4">
              <label class="text-[11px] uppercase tracking-wider text-gray-400 block mb-2">Цвет</label>
              <div class="flex gap-2 flex-wrap">
                <button
                  v-for="col in colors"
                  :key="col.id"
                  @click="selectColor(col.id)"
                  class="w-8 h-8 rounded-full border-2 transition-all cursor-pointer"
                  :class="col.id === activeColorId ? 'border-primary scale-110' : 'border-border'"
                  :style="col.hex === 'transparent' ? { background: 'white' } : { backgroundColor: col.hex }"
                  :title="col.name"
                ></button>
              </div>
            </div>
            <!-- Style -->
            <div class="mb-4">
              <label class="text-[11px] uppercase tracking-wider text-gray-400 block mb-2">Стиль</label>
              <select v-model="activeStyleId" class="w-full px-3 py-2.5 border border-border rounded text-sm font-body bg-white">
                <option v-for="s in styles" :key="s.id" :value="s.id">{{ s.name }}</option>
              </select>
            </div>
            <!-- In stock -->
            <div class="mb-4">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" v-model="onlyInStock" class="w-4 h-4 accent-primary" />
                <span class="text-sm font-body text-textMain">Только в наличии</span>
              </label>
            </div>
            <!-- Reset -->
            <button
              v-if="hasActiveFilters"
              @click="resetAllFilters"
              class="w-full px-4 py-2.5 border border-border rounded text-sm font-body text-gray-400 hover:text-secondary transition-colors cursor-pointer bg-transparent"
            >
              Сбросить все фильтры
            </button>
          </div>
        </Transition>
      </div>
    </section>

    <!-- Products Grid -->
    <section class="py-10">
      <div class="container mx-auto px-4">
        <!-- Results count -->
        <p class="font-body text-sm text-gray-400 mb-6">
          {{ filteredProducts.length }} {{ filteredProducts.length === 1 ? 'товар' : 'товаров' }}
        </p>

        <div
          class="grid gap-x-[60px] gap-y-12"
          :class="gridColumns === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'"
        >
          <NuxtLink
            :to="`/product/${product.id}`"
            v-for="product in filteredProducts"
            :key="product.id"
            class="group cursor-pointer block"
          >
            <div class="relative overflow-hidden">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-[320px] object-cover transition-transform duration-500 group-hover:scale-105"
                :class="{ 'opacity-50': !product.inStock }"
              />
              <div v-if="!product.inStock" class="absolute top-3 left-3 bg-gray-800/80 text-white text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-body">
                нет в наличии
              </div>
            </div>
            <div class="pt-4">
              <h3 class="font-body text-textMain text-sm uppercase tracking-wider">{{ product.name }}</h3>
              <p class="font-body text-textMain mt-1 text-sm">{{ product.price.toLocaleString('ru-RU') }} ₽</p>
              <div class="flex items-center gap-1.5 mt-1.5">
                <span class="w-3 h-3 rounded-full inline-block border border-border" :style="{ backgroundColor: colors.find(c => c.id === product.color)?.hex ?? '#ccc' }"></span>
                <span class="text-[11px] text-gray-400">{{ styles.find(s => s.id === product.styleId)?.name }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Empty state -->
        <div v-if="filteredProducts.length === 0" class="text-center py-20">
          <p class="font-body text-lg text-gray-400 mb-2">Ничего не найдено</p>
          <p class="font-body text-sm text-gray-300 mb-6">Попробуйте изменить параметры фильтрации</p>
          <button
            @click="resetAllFilters"
            class="px-6 py-3 bg-primary text-white text-sm font-body uppercase tracking-wider rounded hover:bg-primaryDark transition-colors cursor-pointer border-none"
          >
            Сбросить фильтры
          </button>
        </div>
      </div>
    </section>

  </main>
</template>

<style scoped>
/* Dropdown transitions */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}
.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}

/* Mobile slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>