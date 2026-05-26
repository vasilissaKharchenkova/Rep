<template>
  <main>
    <section class="h-[400px] md:h-[450px] flex flex-col items-center justify-center relative overflow-hidden bg-primary/10">
      <div class="container mx-auto px-4 text-center relative z-20">
        <h1 class="font-heading text-textMain text-5xl md:text-7xl leading-tight tracking-wider">Вопросы и ответы</h1>
        <p class="font-body text-textMain/70 text-xl mt-6 max-w-2xl mx-auto">Часто задаваемые вопросы о нашей продукции и сервисе</p>
      </div>
    </section>

    <section class="py-20">
      <div class="container mx-auto px-4 max-w-4xl">
        <div class="space-y-4">
          <div v-for="(item, index) in faqItems" :key="index" class="border border-border rounded-xl overflow-hidden">
            <button @click="toggleFaq(index)" class="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
              <span class="font-heading text-textMain text-lg">{{ item.q }}</span>
              <svg class="w-6 h-6 text-primary transition-transform flex-shrink-0 ml-4" :class="{ 'rotate-180': activeIndex === index }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div v-if="activeIndex === index" class="px-6 pb-6">
              <p class="font-body text-textMain/80 leading-relaxed">{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const activeIndex = ref(null)

const toggleFaq = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

const faqItems = [
  { q: 'Какие сроки изготовления мебели на заказ?', a: 'Стандартный срок изготовления мебели по индивидуальным размерам составляет 14–30 рабочих дней в зависимости от сложности изделия. После подтверждения заказа менеджер сообщит точные сроки.' },
  { q: 'Можно ли вернуть товар, если он не подошёл по размеру?', a: 'Да, вы можете вернуть товар в течение 14 дней с момента получения, если он не был в использовании, сохранён товарный вид и упаковка. Возврат крупногабаритных товаров осуществляется силами покупателя.' },
  { q: 'Предоставляете ли вы образцы материалов?', a: 'Да, мы можем предоставить образцы ткани, шпона и цвета. Для этого свяжитесь с нашим менеджером — мы отправим каталог образцов курьерской службой.' },
  { q: 'Как ухаживать за мебелью из дерева?', a: 'Рекомендуем протирать мебель мягкой сухой или слегка влажной тканью, избегать попадания прямых солнечных лучей и размещения рядом с источниками тепла. Не используйте абразивные чистящие средства.' },
  { q: 'Можно ли заказать мебель нестандартных размеров?', a: 'Да, мы принимаем заказы на изготовление мебели по индивидуальным размерам. Свяжитесь с нашим менеджером для расчёта стоимости и сроков.' },
  { q: 'Как осуществляется доставка в регионы?', a: 'Отправка заказов в регионы России осуществляется транспортными компаниями ПЭК, СДЭК и Деловые Линии. Стоимость доставки рассчитывается индивидуально.' },
  { q: 'Есть ли у вас шоурум для просмотра мебели?', a: 'Да, вы можете посетить наш выставочный зал по адресу: Москва, ул. Производственная, 12. Работаем ежедневно с 9:00 до 21:00.' },
  { q: 'Можно ли заказать сборку мебели?', a: 'Да, мы предлагаем профессиональную сборку мебели. Стоимость сборки составляет 10% от стоимости заказа. Сборка выполняется в день доставки.' }
]
</script>
