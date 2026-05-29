# CLICKWOOD — Интернет-магазин мебели

Современный интернет-магазин дизайнерской мебели с корзиной, оформлением заказов, личным кабинетом и админ-панелью.

**Стек:** Nuxt 4 (SSR) + Vue 3 + TypeScript + Tailwind CSS + MongoDB + Mongoose

---

## 📋 Требования к серверу

| Компонент | Версия | Где взять |
|-----------|--------|-----------|
| **Node.js** | 20 или выше | https://nodejs.org/ |
| **MongoDB** | 6.x или 7.x | https://www.mongodb.com/try/download/community |
| **Git** | любая | https://git-scm.com/ |
| **npm** | идёт в комплекте с Node.js | — |

---

## 🚀 Быстрый старт

### 1. Клонировать репозиторий
```bash
git clone https://github.com/vasilissaKharchenkova/Rep.git
cd Rep
```

### 2. Установить зависимости
```bash
npm install
```

### 3. Настроить переменные окружения
Создайте файл `.env` в корне проекта (или скопируйте `office.env`):

```env
MONGODB_URI=mongodb://127.0.0.1:27017/my_project
JWT_SECRET=clickwood-secret-key-change-in-production
UPLOAD_DIR=public/images
```

**Обязательно измените `JWT_SECRET` на свой уникальный ключ перед запуском в production.**

### 4. Убедиться, что MongoDB запущена
```bash
# Windows — должен быть запущен сервис MongoDB
# Linux / macOS
mongod --dbpath /path/to/data
```

### 5. Запустить сервер разработки
```bash
npm run dev
```

Сайт будет доступен по адресу: **http://localhost:3000**

### 6. (Опционально) Наполнить БД тестовыми данными
После запуска отправьте POST-запрос от имени администратора:
```bash
curl -X POST http://localhost:3000/api/products/seed \
  -H "Authorization: Bearer <admin-токен>"
```

---

## 🔧 Доступные команды

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запустить сервер разработки с HMR |
| `npm run build` | Собрать production-сборку |
| `npm run preview` | Запустить production-сборку локально |
| `npm run generate` | Сгенерировать статический сайт |
| `npm run postinstall` | Подготовить Nuxt (выполняется автоматически после npm install) |

---

## 🗂️ Структура проекта

```
Rep/
├── app.vue                # Корневой компонент (шрифты, CSS, layout)
├── nuxt.config.ts         # Конфигурация Nuxt
├── tailwind.config.js     # Настройки Tailwind CSS
├── tsconfig.json          # Настройки TypeScript
├── office.env             # Пример переменных окружения
│
├── pages/                 # Страницы сайта
│   ├── index.vue          # Главная
│   ├── catalog.vue        # Каталог товаров с фильтрами
│   ├── cart.vue           # Корзина
│   ├── checkout.vue       # Оформление заказа
│   ├── collections.vue    # Список коллекций
│   ├── collection/        # Страница отдельной коллекции
│   │   └── [id].vue
│   ├── product/           # Страница товара
│   │   └── [id].vue
│   ├── account.vue        # Личный кабинет
│   ├── admin.vue          # Админ-панель
│   ├── login.vue          # Вход
│   ├── register.vue       # Регистрация
│   ├── success.vue        # Успешный заказ
│   ├── about.vue          # О компании
│   ├── delivery.vue       # Доставка
│   ├── payment.vue        # Оплата
│   ├── warranty.vue       # Гарантия
│   ├── faq.vue            # Вопросы и ответы
│   ├── certificates.vue   # Сертификаты
│   ├── privacy.vue        # Политика конфиденциальности
│   └── terms.vue          # Пользовательское соглашение
│
├── components/            # Переиспользуемые компоненты
│   ├── Header.vue
│   ├── Footer.vue
│   ├── CartItem.vue
│   ├── CartNotification.vue
│   ├── ProductReviews.vue
│   └── ProductQuestions.vue
│
├── composables/           # Логика (Pinia-free, composables pattern)
│   ├── useAuth.ts         # Авторизация (JWT)
│   ├── useCart.ts         # Корзина (localStorage)
│   ├── useCity.ts         # Выбор города
│   ├── useProducts.ts     # Товары
│   ├── useCollections.ts  # Коллекции
│   ├── useReviews.ts      # Отзывы
│   └── useQuestions.ts    # Вопросы
│
├── layouts/
│   └── default.vue        # Основной макет (Header + Footer)
│
├── server/                # Серверная часть (Nitro)
│   ├── api/               # API-роуты
│   │   ├── auth/          # login, register, me, profile
│   │   ├── products/      # CRUD товаров + seed
│   │   ├── collections/   # CRUD коллекций
│   │   ├── orders/        # CRUD заказов
│   │   ├── reviews/       # CRUD отзывов
│   │   ├── questions/     # CRUD вопросов
│   │   ├── upload.post.ts # Загрузка изображений
│   │   └── ...
│   ├── models/            # Mongoose-модели
│   │   ├── Product.ts
│   │   ├── Collection.ts
│   │   ├── Order.ts
│   │   ├── User.ts
│   │   ├── Review.ts
│   │   └── Question.ts
│   └── utils/             # Серверные утилиты
│       ├── mongoose.ts    # Подключение к БД
│       ├── auth.ts        # JWT sign/verify/guard
│       ├── phone.ts       # Нормализация номера
│       └── cache.ts       # In-memory кэш с TTL
│
└── public/                # Статические файлы
    ├── images/            # Изображения
    └── fonts/             # Шрифты
```

---

## 🌐 API Endpoints

| Метод | Путь | Аутентификация | Описание |
|-------|------|---------------|----------|
| GET | `/api/products` | — | Список товаров (с фильтрацией) |
| GET | `/api/products/:id` | — | Один товар |
| POST | `/api/products` | admin | Создать товар |
| PUT | `/api/products/:id` | admin | Обновить товар |
| DELETE | `/api/products/:id` | admin | Удалить товар |
| POST | `/api/products/seed` | admin | Наполнить тестовыми данными |
| GET | `/api/collections` | — | Список коллекций |
| GET | `/api/collections/:slug` | — | Одна коллекция |
| POST | `/api/collections` | admin | Создать коллекцию |
| GET | `/api/orders` | auth | Список заказов (свои / все для admin) |
| POST | `/api/orders` | auth* | Создать заказ |
| GET | `/api/orders/:id` | admin | Детали заказа |
| PUT | `/api/orders/:id` | admin | Изменить статус заказа |
| POST | `/api/auth/login` | — | Вход |
| POST | `/api/auth/register` | — | Регистрация |
| GET | `/api/auth/me` | auth | Данные текущего пользователя |
| PUT | `/api/auth/profile` | auth | Обновить профиль |
| GET | `/api/reviews` | — | Отзывы товара (query: productId) |
| POST | `/api/reviews` | auth | Создать отзыв |
| GET | `/api/questions` | — | Вопросы товара (query: productId) |
| POST | `/api/questions` | auth | Задать вопрос |
| POST | `/api/upload` | admin | Загрузить изображения |

> `*` — заказ можно создать без авторизации, но userId привязывается только для авторизованных

---

## 🏗️ Production-сборка

```bash
# Сборка
npm run build

# Запуск (на production-сервере)
node .output/server/index.mjs
```

Для production требуется:
- **Node.js** 20+
- **MongoDB**
- Файл `.env` с корректными переменными
- (Опционально) reverse proxy: Nginx или Caddy для HTTPS и проксирования на порт

---

## 📌 Особенности реализации

- ✅ **SSR** — серверный рендеринг для SEO и скорости загрузки
- ✅ **JWT-аутентификация** — токен хранится в localStorage, автоматическая проверка
- ✅ **Корзина** — сохраняется в localStorage, не сбрасывается при перезагрузке
- ✅ **Выбор города** — автоматическое определение по IP (ip-api.com) + ручной выбор
- ✅ **Динамический импорт Swiper** — тяжёлая библиотека не грузится без необходимости
- ✅ **Кэширование** — in-memory кэш на сервере и TTL-кэш на клиенте
- ✅ **Адаптивность** — мобильная верстка через Tailwind CSS
- ✅ **Сборочные чанки** — swiper и vendor разделены для эффективного кэширования

---

> Разработано с ❤️ для CLICKWOOD