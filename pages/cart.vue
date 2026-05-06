<script setup>
import { useCart } from '~/composables/useCart'

const { cart, totalItems, totalPrice, addItem, clearCart } = useCart()

// Демо товары для тестирования (раскомментируйте чтобы добавить в корзину автоматически)
// const demoItems = [
//   {
//     id: 1,
//     name: 'Деревянный стол офисный',
//     article: 'ST-001',
//     price: 15990,
//     image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop'
//   },
//   {
//     id: 2,
//     name: 'Стул с мягким сиденьем',
//     article: 'CH-012',
//     price: 7490,
//     image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=200&h=200&fit=crop'
//   },
//   {
//     id: 3,
//     name: 'Шкаф для одежды',
//     article: 'WR-045',
//     price: 28990,
//     image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop'
//   }
// ]

// if (cart.value.length === 0) {
//   demoItems.forEach(item => addItem(item))
// }
</script>

<template>
  <main class="py-16">
    <div class="container mx-auto px-4">
      <!-- Breadcrumbs -->
      <div class="flex items-center gap-2 text-sm text-textMain/60 mb-8">
        <NuxtLink to="/" class="hover:text-textMain transition-colors">Главная</NuxtLink>
        <span>/</span>
        <span class="text-textMain">Корзина</span>
      </div>

      <h1 class="font-heading text-textMain text-4xl md:text-5xl mb-12">
        Корзина <span class="text-primary">({{ totalItems }})</span>
      </h1>

      <div v-if="cart.length === 0" class="text-center py-20">
        <div class="text-8xl mb-6">🛒</div>
        <h2 class="font-heading text-textMain text-2xl mb-4">Ваша корзина пуста</h2>
        <p class="font-body text-textMain/70 mb-8">Добавьте товары из каталога чтобы сделать заказ</p>
        <NuxtLink to="/catalog" class="inline-block bg-primary text-white px-10 py-4 rounded-full font-heading text-lg hover:bg-primaryDark transition-colors">
          Перейти к покупкам
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Список товаров -->
        <div class="lg:col-span-2 space-y-4">
          <CartItem v-for="item in cart" :key="item.id" :item="item" />
        </div>

        <!-- Сводка заказа -->
        <div class="lg:col-span-1">
          <div class="bg-white border border-border rounded-xl p-8 sticky top-8">
            <h3 class="font-heading text-textMain text-2xl mb-6">Итого</h3>
            
            <div class="space-y-4 font-body">
              <div class="flex justify-between">
                <span class="text-textMain/70">Товары:</span>
                <span>{{ totalItems }} шт.</span>
              </div>
              <div class="flex justify-between">
                <span class="text-textMain/70">Сумма:</span>
                <span>{{ totalPrice.toLocaleString('ru-RU') }} ₽</span>
              </div>
              <div class="flex justify-between">
                <span class="text-textMain/70">Доставка:</span>
                <span class="text-primary">рассчитывается при оформлении</span>
              </div>
              
              <div class="border-t border-border pt-4 mt-4">
                <div class="flex justify-between font-heading text-2xl">
                  <span>ИТОГО:</span>
                  <span class="text-primary">{{ totalPrice.toLocaleString('ru-RU') }} ₽</span>
                </div>
              </div>
            </div>

            <NuxtLink to="/checkout" class="block w-full bg-primary text-white text-center py-4 rounded-full font-heading text-lg mt-8 hover:bg-primaryDark transition-colors">
              Оформить заказ
            </NuxtLink>

            <NuxtLink to="/catalog" class="block w-full text-center py-4 mt-4 text-textMain hover:text-primary transition-colors">
              Продолжить покупки
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>