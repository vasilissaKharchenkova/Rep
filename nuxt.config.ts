// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: true,
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'CLICKWOOD — Интерьерная мебель',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'CLICKWOOD — стильная и надёжная мебель для вашего интерьера. Диваны, кресла, столы, стеллажи и декор.' },
        { name: 'keywords', content: 'мебель, интерьер, диваны, кресла, столы, CLICKWOOD' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  vite: {
    server: {
      hmr: false
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id: string) => {
            if (id.includes('swiper')) return 'swiper'
            if (id.includes('node_modules')) return 'vendor'
          }
        }
      }
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
    mongodbUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET
  }
})
