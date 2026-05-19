# Implementation Plan

Создание полноценного функционала коллекций (интерьерных решений) в админ-панели и на витрине сайта. Коллекции хранятся в MongoDB, ссылаются на существующие товары (Product), стоимость коллекции автоматически суммируется из цен товаров, админ может редактировать скидку и состав коллекции. Параллельно удаляются дублирующие страницы админки (orders, products, reviews), так как весь функционал уже есть в admin.vue.

[Types]

Новые типы для коллекций в серверной и клиентской частях.

**Server Model (server/models/Collection.ts):**
```typescript
interface ICollectionItem {
  productId: number  // ссылка на Product.id
  quantity: number   // количество единиц этого товара (по умолчанию 1)
}

interface ICollection extends Document {
  id: number           // автоинкремент
  name: string         // название коллекции (например "Гостиная")
  slug: string         // url-friendly идентификатор (living, bedroom, ...)
  description: string  // краткое описание (для карточки в списке)
  fullDescription: string // полное описание (на странице коллекции)
  image: string        // главное изображение
  items: ICollectionItem[] // товары в коллекции
  discount: number     // скидка в процентах (0-100)
  createdAt: Date
  updatedAt: Date
}
```

**Client Interface (composables/useCollections.ts):**
```typescript
interface CollectionItem {
  productId: number
  quantity: number
  // Данные товара подгружаются отдельно через populate на сервере
}

interface Collection {
  id: number
  name: string
  slug: string
  description: string
  fullDescription: string
  image: string
  items: CollectionItem[]
  discount: number
  // Вычисляемые поля
  totalPrice: number       // сумма цен всех товаров
  setPrice: number         // цена со скидкой
  products: Product[]      // подгруженные товары
}
```

[Files]

Создаются новые файлы, модифицируются существующие, удаляются ненужные.

**Новые файлы:**
1. `server/models/Collection.ts` — Mongoose модель коллекции
2. `server/api/collections.get.ts` — GET /api/collections (список всех коллекций с подгруженными товарами)
3. `server/api/collections/[slug].get.ts` — GET /api/collections/[slug] (одна коллекция с товарами)
4. `server/api/collections/index.post.ts` — POST /api/collections (создание коллекции, admin)
5. `server/api/collections/[slug].put.ts` — PUT /api/collections/[slug] (обновление, admin)
6. `server/api/collections/[slug].delete.ts` — DELETE /api/collections/[slug] (удаление, admin)
7. `composables/useCollections.ts` — composable для работы с коллекциями на клиенте

**Модифицируемые файлы:**
8. `pages/admin.vue` — добавлен таб "Коллекции" с полным CRUD
9. `pages/collections.vue` — полностью переписан под динамические данные из API
10. `pages/collection/[id].vue` — полностью переписан под динамическую загрузку из API

**Удаляемые файлы:**
11. `pages/admin/orders.vue` — дублирует таб "Заказы" в admin.vue
12. `pages/admin/products.vue` — дублирует таб "Товары" в admin.vue
13. `pages/admin/products/[id].vue` — дублирует inline-редактор в admin.vue
14. `pages/admin/reviews.vue` — дублирует таб "Отзывы" в admin.vue

[Functions]

**Серверные (API обработчики):**

1. `server/api/collections.get.ts`:
   - `defineEventHandler` — GET список коллекций
   - Загружает коллекции, для каждой подгружает товары по `items[].productId`
   - Вычисляет `totalPrice` = сумма `(product.price * item.quantity)` для каждого товара
   - Вычисляет `setPrice` = `totalPrice * (1 - discount/100)`

2. `server/api/collections/[slug].get.ts`:
   - `defineEventHandler` — GET одной коллекции по slug
   - Аналогично подгружает товары и вычисляет цены

3. `server/api/collections/index.post.ts`:
   - `defineEventHandler` — POST создание коллекции
   - `adminGuard` — только для админа
   - Автоинкремент id (аналогично Product)

4. `server/api/collections/[slug].put.ts`:
   - `defineEventHandler` — PUT обновление коллекции
   - `adminGuard`
   - Обновляет все поля, кроме id

5. `server/api/collections/[slug].delete.ts`:
   - `defineEventHandler` — DELETE удаление коллекции
   - `adminGuard`

**Клиентские (composable):**

6. `composables/useCollections.ts`:
   - `fetchCollections()` — загрузка списка коллекций
   - `fetchCollection(slug)` — загрузка одной коллекции с товарами
   - Возвращает объекты с `totalPrice` и `setPrice` уже вычисленными на сервере

**В admin.vue (script setup):**
7. `loadCollections()` — загрузка списка коллекций для таба
8. `startNewCollection()` — подготовка формы для новой коллекции
9. `startEditCollection(id)` — загрузка коллекции в форму
10. `saveCollection()` — создание/обновление через API
11. `deleteCollection(id)` — удаление
12. `addCollectionItem()` — добавление товара в состав коллекции (по productId)
13. `removeCollectionItem(index)` — удаление товара из состава

**В pages/collections.vue:**
14. Вызов `fetchCollections()` при монтировании
15. Рендеринг списка динамически из полученных данных

**В pages/collection/[id].vue:**
16. Вызов `fetchCollection(route.params.id)` при монтировании
17. Рендеринг детальной страницы с динамическими товарами и ценами

[Classes]

Нет классов. В проекте используется функциональный подход (Vue composition API + Nuxt server handlers).

[Dependencies]

Новые зависимости не требуются. Используются существующие: mongoose, nuxt, vue.

[Testing]

Ручное тестирование:
1. Открыть /admin — проверить, что все табы работают (dashboard, products, orders, reviews, collections)
2. Создать коллекцию через админку: ввести название, slug, описание, изображение, выбрать товары из списка
3. Проверить, что цена рассчитана автоматически = сумма товаров
4. Установить скидку — цена со скидкой должна пересчитаться
5. Отредактировать коллекцию (удалить товар, добавить другой)
6. Проверить /collections — список коллекций загружается из БД
7. Проверить /collection/:slug — детальная страница с товарами и ценами
8. Работа кнопок "В корзину" для отдельных товаров и "Купить комплект"
9. Проверить, что удалённые страницы admin/orders, admin/products, admin/reviews недоступны (404)
10. Основная admin.vue не сломалась — табы products, orders, reviews продолжают работать

[Implementation Order]

Изменения выполняются в указанном порядке для минимизации конфликтов.

1. Создать `server/models/Collection.ts` — Mongoose модель
2. Создать API endpoints для коллекций (5 файлов: get, get/[slug], post, put/[slug], delete/[slug])
3. Создать `composables/useCollections.ts` — клиентский composable
4. Модифицировать `pages/admin.vue` — добавить таб "Коллекции" с inline-редактором
5. Переписать `pages/collections.vue` — динамическая загрузка из API
6. Переписать `pages/collection/[id].vue` — динамическая загрузка из API
7. Удалить файлы: `pages/admin/orders.vue`, `pages/admin/products.vue`, `pages/admin/products/[id].vue`, `pages/admin/reviews.vue`