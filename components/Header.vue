<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useCart } from '~/composables/useCart'
import { useCity, CITIES } from '~/composables/useCity'
import { searchProducts, type Product } from '~/composables/useProducts'

const { totalItems } = useCart()
const { selectedCity, isOpen, selectCity, toggleDropdown, closeDropdown } = useCity()

// ─── City dropdown ref ────────────────────────
const dropdownRef = ref<HTMLElement | null>(null)

function handleClickOutside(e: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    closeDropdown()
  }
}

// ─── Search ───────────────────────────────────
const searchQuery = ref('')
const searchResults = ref<Product[]>([])
const isSearchOpen = ref(false)
const searchRef = ref<HTMLElement | null>(null)
let debounceTimer: ReturnType<typeof setTimeout> | null = null

async function handleSearchInput() {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(async () => {
    if (searchQuery.value.trim()) {
      searchResults.value = await searchProducts(searchQuery.value)
      isSearchOpen.value = searchResults.value.length > 0
    } else {
      searchResults.value = []
      isSearchOpen.value = false
    }
  }, 300)
}

function selectProduct(product: Product) {
  navigateTo({
    path: `/product/${product.id}`,
    query: { q: searchQuery.value }
  })
  searchQuery.value = ''
  searchResults.value = []
  isSearchOpen.value = false
}

function handleSearchKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    closeSearch()
  } else if (e.key === 'Enter' && searchResults.value.length > 0) {
    selectProduct(searchResults.value[0]!)
  }
}

function closeSearch() {
  searchResults.value = []
  isSearchOpen.value = false
}

function handleSearchOutsideClick(e: MouseEvent) {
  if (searchRef.value && !searchRef.value.contains(e.target as Node)) {
    closeSearch()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('click', handleSearchOutsideClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('click', handleSearchOutsideClick)
})
</script>

<template>
  <header class="w-full">
    <!-- Top bar -->
    <div class="h-[50px] bg-primary text-brown">
      <div class="container mx-auto px-4 h-full flex items-center justify-between">
        <div ref="dropdownRef" class="relative">
          <button
            @click="toggleDropdown"
            class="flex items-center gap-1.5 hover:opacity-80 transition-opacity text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {{ selectedCity.name }}
            <svg
              :class="{ 'rotate-180': isOpen }"
              class="transition-transform duration-200"
              xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          <!-- Dropdown menu -->
          <Transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="opacity-0 -translate-y-1"
            leave-active-class="transition duration-100 ease-in"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <div
              v-if="isOpen"
              class="absolute top-full left-0 mt-1.5 w-56 bg-white text-brown shadow-lg rounded-lg border border-primaryDark/20 py-1 z-50"
            >
              <div class="px-3 py-1.5 text-xs text-brown/60 font-medium border-b border-primaryDark/10">
                Выберите город
              </div>
              <button
                v-for="city in CITIES"
                :key="city.name"
                @click="selectCity(city)"
                class="w-full text-left px-3 py-2 text-sm hover:bg-primary/10 transition-colors flex items-center justify-between"
                :class="{ 'font-semibold text-primary': selectedCity.name === city.name }"
              >
                {{ city.name }}
                <svg
                  v-if="selectedCity.name === city.name"
                  xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </button>
            </div>
          </Transition>
        </div>
        <button>Связаться с нами</button>
      </div>
    </div>

    <!-- Main header -->
    <div class="py-4 border-b border-primaryDark">
        <div class="container mx-auto px-4 flex items-center justify-between md:grid md:grid-cols-3">
          <!-- Left menu -->
          <nav class="flex gap-8 md:justify-self-start">
          <NuxtLink to="/catalog" active-class="text-brown font-bold border-b-2 border-brown pb-1" class="text-brown font-body tracking-wide hover:opacity-80 transition-opacity font-medium">Каталог</NuxtLink>
          <NuxtLink to="/collections" active-class="text-brown font-bold border-b-2 border-brown pb-1" class="text-brown font-body tracking-wide hover:opacity-80 transition-opacity font-medium">Коллекции</NuxtLink>
          <NuxtLink to="/about" active-class="text-brown font-bold border-b-2 border-brown pb-1" class="text-brown font-body tracking-wide hover:opacity-80 transition-opacity font-medium">О нас</NuxtLink>
        </nav>

          <!-- Logo -->
          <NuxtLink to="/" class="font-heading font-bold text-3xl text-brown md:justify-self-center tracking-wider hover:opacity-80 transition-opacity">
          CLICKWOOD
        </NuxtLink>

          <!-- Right section -->
          <div class="flex items-center gap-6 md:justify-self-end">
          <NuxtLink to="/delivery" active-class="text-brown font-bold border-b-2 border-brown pb-1" class="text-brown font-body tracking-wide hover:opacity-80 transition-opacity font-medium">Доставка</NuxtLink>
          
          <div ref="searchRef" class="relative">
            <input
              v-model="searchQuery"
              @input="handleSearchInput"
              @keydown="handleSearchKeydown"
              type="text"
              placeholder="Поиск..."
              class="w-[140px] h-[32px] bg-brown/15 border border-brown/25 rounded-full px-3 text-sm text-brown placeholder-brown/60 outline-none focus:bg-brown/25 transition-all"
            />

            <!-- Search results dropdown -->
            <Transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="opacity-0 -translate-y-1"
              leave-active-class="transition duration-100 ease-in"
              leave-to-class="opacity-0 -translate-y-1"
            >
              <div
                v-if="isSearchOpen && searchResults.length > 0"
                class="absolute top-full right-0 mt-1.5 w-72 bg-white text-brown shadow-lg rounded-lg border border-primaryDark/20 py-1 z-50"
              >
                <div
                  v-for="product in searchResults"
                  :key="product.id"
                  @click="selectProduct(product)"
                  class="flex items-start gap-3 px-3 py-2.5 hover:bg-primary/10 transition-colors cursor-pointer border-b border-primaryDark/10 last:border-b-0"
                >
                  <img
                    :src="product.image"
                    :alt="product.name"
                    class="w-10 h-10 rounded object-cover flex-shrink-0"
                  />
                  <div class="min-w-0 flex-1">
                    <p class="text-sm font-medium truncate">{{ product.name }}</p>
                    <p class="text-xs text-brown/60">{{ product.price.toLocaleString('ru-RU') }} ₽</p>
                  </div>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Cart icon -->
          <NuxtLink to="/cart" class="hover:text-primary transition-colors relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="8" cy="21" r="1"/>
              <circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
            <span v-if="totalItems > 0" class="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">{{ totalItems }}</span>
          </NuxtLink>

          <!-- Account icon -->
          <NuxtLink to="/account" class="hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>