<script setup>
import { useCart } from '~/composables/useCart'

const { totalItems } = useCart()
</script>

<template>
  <header class="w-full">
    <!-- Top bar -->
    <div class="h-[50px] bg-primary text-brown">
      <div class="container mx-auto px-4 h-full flex items-center justify-between">
        <span>Выбор города</span>
        <button>Связаться с нами</button>
      </div>
    </div>

    <!-- Main header -->
    <div class="py-4 border-b border-primaryDark">
        <div class="container mx-auto px-4 flex items-center justify-between md:grid md:grid-cols-3">
          <!-- Left menu -->
          <nav class="flex gap-8 md:justify-self-start">
          <NuxtLink to="/catalog" active-class="text-brown font-bold border-b-2 border-brown pb-1" class="text-brown font-body tracking-wide hover:opacity-80 transition-opacity font-medium">Каталог</NuxtLink>
          <NuxtLink to="/about" active-class="text-brown font-bold border-b-2 border-brown pb-1" class="text-brown font-body tracking-wide hover:opacity-80 transition-opacity font-medium">О нас</NuxtLink>
          <NuxtLink to="/collections" active-class="text-brown font-bold border-b-2 border-brown pb-1" class="text-brown font-body tracking-wide hover:opacity-80 transition-opacity font-medium">Коллекции</NuxtLink>
        </nav>

          <!-- Logo -->
          <NuxtLink to="/" class="font-heading font-bold text-3xl text-brown md:justify-self-center tracking-wider hover:opacity-80 transition-opacity">
          CLICKWOOD
        </NuxtLink>

          <!-- Right section -->
          <div class="flex items-center gap-6 md:justify-self-end">
          <NuxtLink to="/delivery" active-class="text-brown font-bold border-b-2 border-brown pb-1" class="text-brown font-body tracking-wide hover:opacity-80 transition-opacity font-medium">Доставка</NuxtLink>
          
          <div class="relative">
            <input 
              type="text" 
              placeholder="" 
              class="w-[120px] h-[32px] bg-brown/15 border border-brown/25 rounded-full px-3 text-sm text-brown placeholder-brown/60 outline-none focus:bg-brown/25 transition-all"
            />
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