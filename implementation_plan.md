# Implementation Plan

Оптимизация и исправление ошибок в Nuxt 4 проекте интернет-магазина CLICKWOOD.

## [Overview]

Комплексное исправление ошибок и оптимизация существующего кода интернет-магазина мебели CLICKWOOD на Nuxt 4 с MongoDB.

Анализ выявил 10 проблем: от багов фильтрации до нерабочих путей к изображениям и неиспользуемого кэша. План охватывает серверную (API, модели, утилиты) и клиентскую (composables, pages, components) части. Основные направления: интеграция серверного кэша, исправление фильтрации по цвету, удаление дублирования типов и интерфейсов, исправление путей к статическим ресурсам, очистка dead code, улучшение SSR-безопасности.

## [Types]

Удаление дублирующегося клиентского интерфейса Product из composables/useProducts.ts и связывание клиентского кода с серверным IProduct через единый импорт.

Конкретные изменения:
- Удалить `interface ProductColorVariant` и `interface Product` из `composables/useProducts.ts`
- Импортировать `IProduct` и `IProductColorVariant` из `server/models/Product`
- Обновить все composables и компоненты, использующие старые типы
- Исправить поле _id в типах: клиент получает `_id` как строку от API, сервер использует ObjectId

## [Files]

Изменения затрагивают 12 файлов: исправление багов, удаление дублирования, интеграция кэша, очистка dead code.

- `composables/useProducts.ts` — удаление дублирующихся интерфейсов, импорт из серверной модели, удаление клиентского кэша и функции `searchProducts`
- `composables/useCart.ts` — удаление неиспользуемой функции `searchProducts`, вынос динамического импорта `useAuth` в статический
- `composables/useCity.ts` — вызов `loadCity()` без `onMounted` (loadCity сам проверяет process.client)
- `server/api/products.get.ts` — исправление фильтрации по цвету, интеграция серверного кэша
- `server/api/products/[id].get.ts` — интеграция серверного кэша
- `server/api/slider/index.get.ts` — интеграция серверного кэша, добавление try/catch
- `server/utils/image.ts` — исправление `getWebPFilename` для сохранения оригинальных имён
- `server/api/upload.post.ts` — использование исправленного именования, интеграция серверного кэша (инвалидация)
- `pages/index.vue` — исправление путей к изображениям с `../public/images/` на `/images/`
- `pages/catalog.vue` — перенос `window.addEventListener` в `onMounted` с guard `process.client`
- `pages/admin.vue` — исправление вызова `loadSliderProducts` при активации таба слайдера
- `nuxt.config.ts` — проверка runtimeConfig (убрать process.env из определения, использовать переменные окружения через defaults)

## [Functions]

**Новые функции:**
- `server/utils/cache.ts` — export функции `invalidatePrefix` (инвалидация по префиксу ключа)

**Модифицированные функции:**
- `server/utils/image.ts` — `getWebPFilename` изменена для сохранения оригинального имени файла
- `server/api/products.get.ts` — добавлено кэширование ответа через `createCache`, исправлена логика цветового фильтра
- `server/api/products/[id].get.ts` — добавлено кэширование
- `server/api/slider/index.get.ts` — добавлено кэширование и try/catch
- `server/api/upload.post.ts` — добавлена инвалидация кэша после загрузки
- `composables/useProducts.ts` — удаление `loadCache`, `searchProducts`, `searchLocalProducts`; `fetchProduct` и `fetchProducts` теперь без кэша на клиенте
- `composables/useCart.ts` — `submitOrder` использует статический импорт `useAuth` вместо динамического
- `composables/useCity.ts` — `loadCity` вызывается в корне функции `useCity` (вне `onMounted`) для моментальной загрузки
- `pages/catalog.vue` — `window.addEventListener` перенесён в `onMounted`

**Удалённые функции:**
- `composables/useProducts.ts` — `loadCache`, `searchProducts` (standalone export), `searchLocalProducts`
- `composables/useCart.ts` — `searchProducts` (дубликат)

## [Classes]

Изменения классов/компонентов не требуются. Все изменения касаются функций и логики внутри существующих файлов.

## [Dependencies]

Изменения зависимостей не требуются. Все необходимые пакеты уже установлены:
- `nuxt` ^4.4.2
- `mongoose` ^9.4.1
- `sharp` ^0.34.5
- `swiper` ^12.1.3
- `@nuxtjs/tailwindcss` ^6.14.0
- `@nuxt/image` ^2.0.0

## [Testing]

Ручное тестирование после каждого изменения:

1. Проверить загрузку главной страницы — слайдер с товарами, секции "Новая коллекция" и "Наши работы"
2. Проверить каталог: фильтрация по категории, цене, цвету, стилю; сортировка; переключение сетки
3. Проверить страницу товара: переключение изображений, выбор цвета, добавление в корзину
4. Проверить корзину: добавление, удаление, изменение количества
5. Проверить админ-панель: логин, просмотр заказов, управление товарами/слайдером/коллекциями
6. Проверить загрузку изображений через админку
7. Проверить отсутствие ошибок в консоли браузера и серверных логах

## [Implementation Order]

Последовательность изменений минимизирует конфликты и позволяет тестировать каждый шаг:

1. Исправление `server/utils/image.ts` — `getWebPFilename` сохраняет оригинальное имя
2. Интеграция серверного кэша: `server/api/products.get.ts`, `server/api/products/[id].get.ts`, `server/api/slider/index.get.ts`
3. Исправление `server/api/products.get.ts` — фильтрация по цвету через `colorVariants.color`
4. Инвалидация кэша в `server/api/upload.post.ts`
5. Удаление дублирующихся интерфейсов и клиентского кэша в `composables/useProducts.ts`
6. Очистка `composables/useCart.ts` — удаление дублирующейся `searchProducts`, статический импорт `useAuth`
7. Исправление `composables/useCity.ts` — вызов `loadCity` вне `onMounted`
8. Исправление путей к изображениям в `pages/index.vue`
9. SSR-безопасность: исправление `window.addEventListener` в `pages/catalog.vue`
10. Исправление вызова `loadSliderProducts` в `pages/admin.vue`
11. Финальная проверка всех страниц и функциональности