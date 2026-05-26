<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
    <CartNotification />
  </div>
</template>

<script setup>
import Footer from '~/components/Footer.vue'
import CartNotification from '~/components/CartNotification.vue'
</script>
