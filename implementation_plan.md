# Implementation Plan

## Overview
Комплексная оптимизация производительности и исправление ошибок в Nuxt 4 + MongoDB интернет-магазине мебели CLICKWOOD для улучшения скорости загрузки, SEO и стабильности работы в локальной сети.

Проект представляет собой SPA (ssr: false) на Nuxt 4 с Tailwind CSS, MongoDB/Mongoose и JWT-аутентификацией. Сайт будет разворачиваться на локальном сервере внутри закрытой сети, где Node.js доступен. Основные проблемы: отключенный SSR (все страницы грузятся как клиентское приложение), неоптимизированные изображения, N+1 запросы к БД в коллекциях, баги в seed-данных, логике корзины, небезопасный HTTP запрос к внешнему API. План включает исправление всех найденных багов, включение SSR, оптимизацию запросов к БД, изображений и клиентского кода.

---

## Types
Изменения типов не требуются — все интерфейсы остаются прежними, добавятся только новые типы для опций кэширования.

Новые локальные типы (внутри файлов):
- `CacheEntry<T>`: `{ data: T; timestamp: number }` — для кэша API-запросов на клиенте

---

## Files

### Новые файлы:
- `server/utils/cache.ts` — утилита серверного кэширования данных MongoDB (in-memory Map с TTL)

### Модифицируемые файлы:

**Конфигурация и ядро:**
1. `nuxt.config.ts` — включить SSR (`ssr: true`), добавить оптимизации Vite (code splitting, tree shaking), добавить meta-тэги SEO, настроить `buildAssetsDir`, включить сжатие, добавить prerender для статических страниц
2. `app.vue` — добавить глобальные SEO meta, добавить скрипт аналитики/мониторинга, настроить preconnect для шрифтов

**Серверные файлы (оптимизация + исправление багов):**
3. `server/utils/mongoose.ts` — добавить настройки пула соединений, replicaSet, индексы
4. `server/api/collections.get.ts` — исправить N+1: загрузить все коллекции и все продукты одним запросом (`$in`), соединить в памяти
5. `server/api/products/seed.post.ts` — исправить seed-данные: заменить поле `colors` на `colorVariants` в соответствии со схемой Product
6. `server/utils/phone.ts` — (необязательно) добавить обработку краевых случаев

**Клиентские композаблы (оптимизация):**
7. `composables/useProducts.ts` — добавить кэширование ответов с TTL, добавить серверный поиск с пагинацией
8. `composables/useCollections.ts` — добавить кэширование
9. `composables/useCity.ts` — заменить `http://ip-api.com/json` на `https://ip-api.com/json` (HTTPS) и добавить try/catch с fallback на localStorage

**Компоненты (оптимизация):**
10. `components/Header.vue` — динамический импорт Swiper, добавить debounce для поиска с AbortController, добавить `navigateTo` из `vue-router`
11. `components/Footer.vue` — (опционально) статика без изменений

**Страницы (оптимизация + баги):**
12. `pages/index.vue` — переписать Swiper инициализацию: динамический импорт (`defineAsyncComponent`) для секций с каруселями, использовать `useLazyAsyncData` для футера/баннеров, загружать изображения с lazy loading
13. `pages/catalog.vue` — добавить `useLazyAsyncData` для загрузки товаров, виртуальную прокрутку/пагинацию, использовать `<NuxtImg>` для изображений
14. `pages/product/[id].vue` — добавить `useHead` для SEO мета-тэгов, динамический импорт `ProductReviews` и `ProductQuestions`, prefetch соседних товаров
15. `pages/checkout.vue` — исправить двойной `onMounted` (один для пре-филла + второй ненужный)
16. `pages/success.vue` — исправить двойной `onMounted` при объявлении таймера
17. `pages/cart.vue` — динамический импорт `CartItem`
18. `pages/collections.vue` — динамический импорт, кэширование
19. `pages/collection/[id].vue` — useHead для SEO, динамический импорт
20. `pages/admin.vue` — исправить общую переменную `newVariantImageUrl` (сейчас одна на все варианты), разделить на массив per-variant

---

## Functions

### Новые функции:
- `server/utils/cache.ts`:
  - `createCache<T>(ttlMs: number): { get(key: string): T | undefined; set(key: string, data: T): void; invalidate(key: string): void; clear(): void }`

### Модифицированные функции:

**`server/api/collections.get.ts`:**
- Изменить: заменить последовательные `Product.find()` на один `Product.find({ id: { $in: allProductIds } })`, затем сгруппировать по коллекциям в памяти

**`composables/useProducts.ts`:**
- Изменить `fetchProducts`: добавить кэширование с TTL 60000ms
- Изменить `searchProducts`: добавить AbortController, передавать query на сервер с лимитом 5

**`composables/useCity.ts`:**
- Изменить `fetchCityByIP`: `http://` → `https://`

**`pages/index.vue`:**
- Изменить инициализацию Swiper: использовать `defineAsyncComponent` для секций, lazy load изображений
- Переписать: убрать `setTimeout` для инициализации Swiper

**`pages/success.vue`:**
- Исправить: объединить два `onMounted` в один

**`pages/admin.vue`:**
- Исправить: заменить общую `const newVariantImageUrl = ref('')` на массив `newVariantImageUrls = ref<Record<number, string>>({})`

**`components/Header.vue`:**
- Исправить: добавить `import { navigateTo } from 'nuxt/app'` или использовать `useRouter().push()`

**`composables/useCart.ts`:**
- Исправить `removeItem`: текущая логика фильтрации некорректна — при `colorName` строка удаляет все элементы с совпадающим id, а не только конкретный вариант

---

## Dependencies
Новых зависимостей не требуется. Возможна установка:
- `@nuxtjs/device` — для определения мобильных устройств (опционально)
- `@nuxt/image` — для автоматической оптимизации изображений (но в локальной сети может не понадобиться, т.к. не будет CDN)

Изменения:
- В `package.json` уже есть все необходимые зависимости
- В `nuxt.config.ts` модуль `@nuxtjs/tailwindcss` уже подключён

---

## Testing

**Ручное тестирование (QA checklist):**
1. Открыть главную — карусели работают, изображения загружаются
2. Перейти в каталог — фильтры работают, пагинация/подгрузка
3. Перейти на карточку товара — SEO мета в заголовке, отзывы/вопросы загружаются
4. Добавить в корзину через коллекцию — то же самое через "Купить комплект"
5. Оформить заказ — редирект на success, данные корректные
6. Проверить админку — CRUD товаров, заказов, коллекций
7. Проверить авторизацию — логин/регистрация, профиль
8. Проверить поиск — работает с debounce, показывает результаты
9. Проверить выбор города — HTTPS запрос, сохранение в localStorage
10. Запустить `npm run build` — сборка без ошибок

---

## Implementation Order
Реализация в порядке: сначала исправление критических багов, затем включение SSR, затем оптимизация производительности по убыванию эффекта.

1. Исправить критические баги: seed-данные (colors→colorVariants), корзину (removeItem), double onMounted в success.vue, общую переменную URL в админке
2. Исправить HTTP → HTTPS в ip-api.com
3. Включить SSR в nuxt.config.ts, добавить SEO-мета в app.vue и страницы
4. Исправить N+1 в коллекциях (collections.get.ts)
5. Добавить кэширование API-запросов (серверное in-memory cache)
6. Оптимизировать клиентские композаблы (кэш с TTL, AbortController для поиска)
7. Динамические импорты для тяжёлых компонентов (Swiper, ProductReviews, ProductQuestions)
8. Оптимизация изображений (lazy loading, NuxtImg)
9. Финальная проверка и сборка