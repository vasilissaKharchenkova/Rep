<script setup>
useHead({
  bodyAttrs: {
    class: 'font-body text-textMain m-0 p-0'
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease;
}
.page-enter-from {
  opacity: 0;
}
.page-leave-to {
  opacity: 0;
}

@font-face {
  font-family: 'Roscha';
  src: url('/fonts/ofont.ru_Roscha.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Arsenal SC';
  src: url('/fonts/ArsenalSC-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Arsenal SC';
  src: url('/fonts/ArsenalSC-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

* {
  box-sizing: border-box;
}

html, body {
  overflow-x: hidden;
  width: 100%;
}
</style>