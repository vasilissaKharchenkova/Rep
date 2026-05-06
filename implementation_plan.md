# Implementation Plan

[Overview]
Создание современного премиального футера в стиле Westwing/BoConcept для сайта CLICKWOOD. Футер вынесен в отдельный компонент и подключён через layout вместо дублирования на каждой странице.

[Changes]
### Создано
- `Rep/components/Footer.vue` — новый компонент футера

### Изменено
- `Rep/layouts/default.vue` — добавлен `<Footer />` после `<slot />`

### Удалены футеры со страниц
- `Rep/pages/index.vue` — удалён `<footer class="bg-primary py-16 ...">`
- `Rep/pages/catalog.vue` — удалён `<footer class="bg-primary py-16 mt-16 ...">`
- `Rep/pages/about.vue` — удалён `<footer class="bg-primary py-16 mt-16 ...">`
- `Rep/pages/account.vue` — удалён `<footer class="bg-primary py-16 mt-16 ...">`
- `Rep/pages/collections.vue` — удалён `<footer class="bg-primary py-16 ...">`
- `Rep/pages/delivery.vue` — удалён `<footer class="bg-primary py-16 ...">`
- `Rep/pages/login.vue` — удалён `<footer class="bg-primary py-16 ...">`
- `Rep/pages/register.vue` — удалён `<footer class="bg-primary py-16 ...">`
- `Rep/pages/product/[id].vue` — удалён `<footer class="bg-primary py-16 mt-16 ...">`
- `Rep/pages/cart.vue` — футера не было

[Footer structure]
**Тёмный фон #1A1A1A** (charcoal, как у Westwing/BoConcept)

**Колонка 1 — Бренд:**
- CLICKWOOD (font-heading, 4xl/5xl, белый)
- Адрес: Москва, ул. Производственная, 12 (с иконкой)
- Телефон: +7 (495) 123-45-67 (с иконкой)
- Email: info@clickwood.ru (с иконкой)
- 4 соцсети: Instagram, VK, Telegram, WhatsApp (круглые иконки с border)

**Колонка 2 — Навигация:**
- Главная, Каталог, Коллекции, О нас, Доставка, Контакты (NuxtLink)

**Колонка 3 — Покупателям:**
- Оплата, Возврат, Гарантия, Вопросы и ответы, Сертификаты

**Нижняя плашка:**
- © 2026 CLICKWOOD. Все права защищены.
- Политика конфиденциальности | Пользовательское соглашение

**Адаптивность:**
- Desktop: 3 колонки (grid-cols-3)
- Mobile: 1 колонка (grid-cols-1)

[Dependencies]
Нет новых зависимостей.

[Testing]
1. Футер отображается на всех страницах (подключён через layout)
2. Навигационные ссылки работают (NuxtLink)
3. Соцсети ведут на заглушки (#)
4. Адаптивность: 3 колонки на десктопе → 1 колонка на мобайле
5. Нижняя плашка корректно разделена границей