# Database Schema Map — CLICKWOOD

**Database:** MongoDB (`mongodb://127.0.0.1:27017/my_project`)
**ORM:** Mongoose 9.x
**Server:** Nuxt (Nitro) — `server/` directory

---

## 1. Collection: `users`

| Поле | Тип в MongoDB | Обязательное | Уникальное | Дефолт | Описание |
|------|---------------|-------------|-----------|--------|----------|
| `_id` | `ObjectId` | да | да | auto | MongoDB ID |
| `phone` | `String` | да | да | — | Номер телефона (уникальный идентификатор пользователя) |
| `passwordHash` | `String` | да | нет | — | bcrypt hash пароля |
| `lastName` | `String` | нет | нет | `''` | Фамилия |
| `firstName` | `String` | нет | нет | `''` | Имя |
| `middleName` | `String` | нет | нет | `''` | Отчество |
| `email` | `String` | нет | нет | `''` | Email |
| `city` | `String` | нет | нет | `''` | Город |
| `street` | `String` | нет | нет | `''` | Улица |
| `apartment` | `String` | нет | нет | `''` | Квартира |
| `zipCode` | `String` | нет | нет | `''` | Индекс |
| `address` | `String` | нет | нет | `''` | Адрес (полная строка) |
| `comment` | `String` | нет | нет | `''` | Комментарий к заказу |
| `newsletter` | `Boolean` | нет | нет | `false` | Подписка на рассылку |
| `isAdmin` | `Boolean` | нет | нет | `false` | Флаг администратора |
| `createdAt` | `Date` | auto | нет | auto | Timestamp создания |
| `updatedAt` | `Date` | auto | нет | auto | Timestamp обновления |

**Индексы:**
- `phone` — уникальный (основной)
- `_id` — по умолчанию

**Связи:**
- `users._id` → `orders.userId` (один ко многим)
- `users._id` → `questions.userId` (один ко многим)
- `users._id` → `reviews.userId` (один ко многим)

---

## 2. Collection: `products`

| Поле | Тип в MongoDB | Обязательное | Уникальное | Дефолт | Описание |
|------|---------------|-------------|-----------|--------|----------|
| `_id` | `ObjectId` | да | да | auto | MongoDB ID |
| `id` | `Number` | да | да | — | Числовой ID товара (бизнес-ключ) |
| `name` | `String` | да | нет | — | Название товара |
| `article` | `String` | да | нет | — | Артикул |
| `price` | `Number` | да | нет | — | Цена (руб.) |
| `categoryId` | `String` | да | нет | — | Категория (sofas, tables, chairs, storage, lighting, decor) |
| `styleId` | `String` | да | нет | — | Стиль (scandi, minimal, artdeco, boho) |
| `color` | `String` | да | нет | — | Основной цвет (gray, brown, black, green, white) |
| `inStock` | `Boolean` | нет | нет | `true` | Наличие |
| `image` | `String` | нет | нет | `''` | URL главного изображения |
| `description` | `String` | нет | нет | `''` | Описание |
| `characteristics` | `String` | нет | нет | `''` | Характеристики (многострочный текст) |
| `images` | `[String]` | нет | нет | `[]` | Массив URL доп. изображений |
| `colorVariants` | `[{ name, color, image, images }]` | нет | нет | `[]` | Варианты цветов |
| `discount` | `Number` | нет | нет | `0` | Скидка (0–100%) |
| `rating` | `Number` | нет | нет | `0` | Средний рейтинг |
| `reviewsCount` | `Number` | нет | нет | `0` | Количество отзывов |
| `questionsCount` | `Number` | нет | нет | `0` | Количество вопросов |
| `showOnSlider` | `Boolean` | нет | нет | `false` | Флаг показа в слайдере «Новая коллекция» |
| `sliderPosition` | `Number` | нет | нет | `0` | Порядковый номер для сортировки в слайдере |
| `createdAt` | `Date` | auto | нет | auto | Timestamp создания |
| `updatedAt` | `Date` | auto | нет | auto | Timestamp обновления |

**Вложенная схема — `colorVariants[]`:**
| Поле | Тип | Описание |
|------|-----|----------|
| `name` | `String` | Название цвета (например "Орех") |
| `color` | `String` | Tailwind класс цвета (например "bg-amber-800") |
| `image` | `String` | URL изображения для этого варианта |
| `images` | `[String]` | Массив URL изображений для этого варианта |

**Индексы:**
- `id` — уникальный (основной бизнес-ключ)
- `_id` — по умолчанию

**Связи:**
- `products.id` → `collections.items[].productId` (многие ко многим через embedded)
- `products.id` → `orders.items[].productId` (многие ко многим через embedded)
- `products.id` → `questions.productId` (один ко многим)
- `products.id` → `reviews.productId` (один ко многим)

---

## 3. Collection: `collections`

| Поле | Тип в MongoDB | Обязательное | Уникальное | Дефолт | Описание |
|------|---------------|-------------|-----------|--------|----------|
| `_id` | `ObjectId` | да | да | auto | MongoDB ID |
| `id` | `Number` | да | да | — | Числовой ID коллекции (бизнес-ключ) |
| `name` | `String` | да | нет | — | Название коллекции |
| `slug` | `String` | да | да | — | URL-слаг (уникальный) |
| `description` | `String` | нет | нет | `''` | Краткое описание |
| `fullDescription` | `String` | нет | нет | `''` | Полное описание |
| `image` | `String` | нет | нет | `''` | URL изображения коллекции |
| `items` | `[{ productId, quantity }]` | нет | нет | `[]` | Состав коллекции |
| `discount` | `Number` | нет | нет | `0` | Скидка на коллекцию (0–100%) |
| `createdAt` | `Date` | auto | нет | auto | Timestamp создания |
| `updatedAt` | `Date` | auto | нет | auto | Timestamp обновления |

**Вложенная схема — `items[]`:**
| Поле | Тип | Описание |
|------|-----|----------|
| `productId` | `Number` | ID товара (ссылается на `products.id`) |
| `quantity` | `Number` | Количество единиц |

**Индексы:**
- `id` — уникальный
- `slug` — уникальный
- `_id` — по умолчанию

**Связи:**
- `collections.items[].productId` → `products.id` (внешний ключ к продуктам)

---

## 4. Collection: `orders`

| Поле | Тип в MongoDB | Обязательное | Уникальное | Дефолт | Описание |
|------|---------------|-------------|-----------|--------|----------|
| `_id` | `ObjectId` | да | да | auto | MongoDB ID |
| `userId` | `ObjectId` | нет | нет | — | Ссылка на пользователя (`users._id`) |
| `items` | `[{ productId, name, price, quantity, image, article, colorName?, colorClass? }]` | да | нет | — | Состав заказа |
| `totalPrice` | `Number` | да | нет | — | Общая стоимость |
| `status` | `String (enum)` | нет | нет | `'new'` | Статус: `new`, `processing`, `shipped`, `delivered`, `cancelled` |
| `firstName` | `String` | да | нет | — | Имя покупателя |
| `lastName` | `String` | да | нет | — | Фамилия покупателя |
| `phone` | `String` | да | нет | — | Телефон |
| `email` | `String` | да | нет | — | Email |
| `deliveryAddress` | `String` | нет | нет | `''` | Адрес доставки |
| `comment` | `String` | нет | нет | `''` | Комментарий к заказу |
| `createdAt` | `Date` | auto | нет | auto | Timestamp создания |
| `updatedAt` | `Date` | auto | нет | auto | Timestamp обновления |

**Вложенная схема — `items[]`:**
| Поле | Тип | Описание |
|------|-----|----------|
| `productId` | `Number` | ID товара (бизнес-ключ из products) |
| `name` | `String` | Название товара на момент заказа |
| `price` | `Number` | Цена на момент заказа |
| `quantity` | `Number` | Количество |
| `image` | `String` | URL изображения |
| `article` | `String` | Артикул |
| `colorName` | `String?` | Выбранный цвет (опционально) |
| `colorClass` | `String?` | CSS класс цвета (опционально) |

**Связи:**
- `orders.userId` → `users._id` (внешний ключ)
- `orders.items[].productId` → `products.id` (логическая связь через бизнес-ключ, без formal ref)

---

## 5. Collection: `questions`

| Поле | Тип в MongoDB | Обязательное | Уникальное | Дефолт | Описание |
|------|---------------|-------------|-----------|--------|----------|
| `_id` | `ObjectId` | да | да | auto | MongoDB ID |
| `productId` | `Number` | да | нет (индекс) | — | ID товара (`products.id`) |
| `userId` | `ObjectId` | да | нет | — | Ссылка на пользователя (`users._id`) |
| `userName` | `String` | да | нет | — | Имя пользователя (денормализовано) |
| `text` | `String` | да | нет | — | Текст вопроса |
| `answer` | `String` | нет | нет | `''` | Ответ администратора |
| `answeredAt` | `Date` | нет | нет | — | Дата ответа |
| `createdAt` | `Date` | auto | нет | auto | Timestamp создания |
| `updatedAt` | `Date` | auto | нет | auto | Timestamp обновления |

**Индексы:**
- `productId` — для быстрого поиска вопросов по товару

**Связи:**
- `questions.productId` → `products.id` (один ко многим)
- `questions.userId` → `users._id` (один ко многим)

---

## 6. Collection: `reviews`

| Поле | Тип в MongoDB | Обязательное | Уникальное | Дефолт | Описание |
|------|---------------|-------------|-----------|--------|----------|
| `_id` | `ObjectId` | да | да | auto | MongoDB ID |
| `productId` | `Number` | да | нет (индекс) | — | ID товара (`products.id`) |
| `userId` | `ObjectId` | да | нет | — | Ссылка на пользователя (`users._id`) |
| `userName` | `String` | да | нет | — | Имя пользователя (денормализовано) |
| `rating` | `Number` | да | нет | — | Оценка (1–5) |
| `text` | `String` | нет | нет | `''` | Текст отзыва |
| `createdAt` | `Date` | auto | нет | auto | Timestamp создания |
| `updatedAt` | `Date` | auto | нет | auto | Timestamp обновления |

**Индексы:**
- `productId` — для быстрого поиска отзывов по товару
- `{ productId: 1, userId: 1 }` — **составной уникальный** (один отзыв на пользователя на товар)

**Связи:**
- `reviews.productId` → `products.id` (один ко многим)
- `reviews.userId` → `users._id` (один ко многим)

---

## Client-Side: Cart (корзина)

Корзина **не хранится в MongoDB**. Она полностью клиентская:

- **Хранилище:** `localStorage` (ключ: `clickwood_cart`)
- **Тип данных:** `CartItem[]` (интерфейс в `composables/useCart.ts`)
- **Интерфейс CartItem:**
  | Поле | Тип | Описание |
  |------|-----|----------|
  | `id` | `number` | ID товара (`products.id`) |
  | `name` | `string` | Название товара |
  | `article` | `string` | Артикул |
  | `price` | `number` | Цена |
  | `quantity` | `number` | Количество |
  | `image` | `string` | URL изображения |
  | `colorName` | `string?` | Выбранный вариант цвета |
  | `colorClass` | `string?` | CSS класс цвета |
  | `originalPrice` | `number?` | Исходная цена до скидки |
  | `collectionSlug` | `string?` | Слаг коллекции (если товар из коллекции) |

- **Жизненный цикл:** При оформлении заказа (`submitOrder`) данные корзины отправляются на сервер → создаётся документ `orders` в MongoDB → корзина очищается.

---

## Relationships Summary (для Visio)

```
┌───────────┐          ┌─────────────┐
│   users   │          │  products   │
│ (ObjectId)│          │  id (Number)│
└─────┬─────┘          └──────┬──────┘
      │                       │
      │ 1:N                   │ 1:N
      ▼                       ▼
┌───────────┐          ┌─────────────┐
│  orders   │          │  questions  │
│  .userId  │          │  .productId │
└───────────┘          └─────────────┘
      │                       │
      │ 1:N                   │ 1:N
      ▼                       ▼
┌───────────┐          ┌─────────────┐
│  reviews  │          │ collections │
│  .userId  │          │  .items[]   │
└───────────┘          │  .productId │
      │                └─────────────┘
      │ 1:N
      ▼
┌───────────┐
│ questions │
│  .userId  │
└───────────┘

Embedded (вложенные документы):
- products.colorVariants[]
- collections.items[]
- orders.items[]
```

---

## Business Keys Summary

| Сущность | Бизнес-ключ | Тип |
|----------|-----------|------|
| User | `phone` | String (уникальный) |
| Product | `id` | Number (уникальный) |
| Collection | `id` / `slug` | Number / String (оба уникальные) |
| Order | `_id` | ObjectId |
| Question | `_id` | ObjectId |
| Review | `_id` | ObjectId (уникальность: один review на user + product) |

---

## Enum Values

**Order Status:**
| Значение | Описание |
|----------|----------|
| `new` | Новый заказ |
| `processing` | В обработке |
| `shipped` | Отправлен |
| `delivered` | Доставлен |
| `cancelled` | Отменён |

**Category IDs (categoryId):**
| Значение | Описание |
|----------|----------|
| `sofas` | Диваны |
| `tables` | Столы |
| `chairs` | Кресла |
| `storage` | Хранение (комоды, тумбы, стеллажи) |
| `lighting` | Освещение |
| `decor` | Декор |

**Style IDs (styleId):**
| Значение | Описание |
|----------|----------|
| `scandi` | Скандинавский |
