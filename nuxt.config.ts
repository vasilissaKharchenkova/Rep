// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: false,
  vite: {
    server: {
      hmr: false
    }
  },
  modules: ['@nuxtjs/tailwindcss'],
  tailwindcss: {
    viewer: false,
    hotReload: false,
    config: {
      content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './app.vue',
        './app/**/*.vue'
      ]
    }
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI
  }
})
