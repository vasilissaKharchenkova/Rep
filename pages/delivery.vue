<script setup>
import { ref } from 'vue'

const activeFaq = ref(null)

const deliveryMethods = [
  {
    icon: '🚚',
    title: 'Курьерская доставка по Москве и МО',
    price: 'от 500 ₽',
    time: '1-3 рабочих дня',
    description: 'Доставка до двери вашего дома или офиса. Курьер привезёт заказ в согласованное время интервалом 2 часа.'
  },
  {
    icon: '📦',
    title: 'Доставка по России',
    price: 'по тарифам ТК',
    time: '5-14 дней',
    description: 'Отправка заказа транспортными компаниями ПЭК, СДЭК, Деловые Линии до терминала или до двери.'
  },
  {
    icon: '🏪',
    title: 'Самовывоз из склада',
    price: 'Бесплатно',
    time: 'в день заказа',
    description: 'Вы можете забрать заказ самостоятельно с нашего склада по адресу: Москва, ул. Производственная, д. 12. Работаем ежедневно с 9:00 до 21:00.'
  },
  {
    icon: '⚡',
    title: 'Экспресс-доставка',
    price: 'от 1500 ₽',
    time: 'в день заказа',
    description: 'Срочная доставка по Москве в день оформления заказа, если заказ сделан до 14:00.'
  }
]

const deliveryConditions = [
  {
    title: 'Бесплатная доставка',
    description: 'При заказе на сумму от 50 000 ₽ доставка по Москве и до 10 км за МКАД осуществляется бесплатно.'
  },
  {
    title: 'Подъём на этаж',
    description: 'Подъём на лифте - 200 ₽ за этаж. Без лифта - 300 ₽ за этаж. Для крупногабаритных товаров стоимость рассчитывается индивидуально.'
  },
  {
    title: 'Сборка мебели',
    description: 'Профессиональная сборка мебели - 10% от стоимости товара. Сборка выполняется в день доставки отдельным специалистом.'
  },
  {
    title: 'График работы доставки',
    description: 'Доставка осуществляется ежедневно с 10:00 до 22:00. Возможна доставка в выходные и праздничные дни.'
  }
]

const paymentMethods = [
  { icon: '💵', title: 'Наличные курьеру', description: 'Оплата наличными при получении заказа' },
  { icon: '💳', title: 'Банковская карта онлайн', description: 'Оплата картой Visa, Mastercard, МИР на сайте' },
  { icon: '🏢', title: 'Безналичный расчёт', description: 'Для юридических лиц по счёту с НДС' },
  { icon: '💸', title: 'Рассрочка и кредит', description: 'Оплата частями на срок от 3 до 24 месяцев' }
]

const deliverySteps = [
  { step: '1', title: 'Оформление заказа', description: 'Вы выбираете товары и оформляете заказ на сайте' },
  { step: '2', title: 'Подтверждение', description: 'Менеджер связывается с вами для уточнения деталей' },
  { step: '3', title: 'Согласование даты', description: 'Вы выбираете удобную дату и время доставки' },
  { step: '4', title: 'Доставка', description: 'Курьер привозит заказ и вы проверяете товар' },
  { step: '5', title: 'Оплата', description: 'Вы оплачиваете заказ и получаете все документы' }
]

const faqItems = [
  {
    question: 'Можно ли отменить заказ после его оформления?',
    answer: 'Да, вы можете отменить заказ в любое время до момента отправки со склада. Если заказ уже отправлен, вам нужно будет отказаться от него при получении.'
  },
  {
    question: 'Что делать если товар пришёл повреждённым?',
    answer: 'При получении заказа обязательно проверяйте целостность упаковки. В случае обнаружения повреждений составьте акт при курьере и мы бесплатно заменим товар.'
  },
  {
    question: 'Могу ли я изменить адрес доставки после оплаты?',
    answer: 'Вы можете изменить адрес доставки в течение 24 часов после оплаты заказа. Для этого свяжитесь с нашим менеджером по телефону.'
  },
  {
    question: 'Как происходит оплата при получении?',
    answer: 'Вы оплачиваете заказ курьеру наличными или банковской картой только после полной проверки товара. Курьер выдаёт вам чек и гарантийный талон.'
  },
  {
    question: 'Доставляете ли вы заказы в праздничные дни?',
    answer: 'Да, мы осуществляем доставку в выходные и праздничные дни по стандартному графику. Доставка в праздничные дни оплачивается по стандартному тарифу.'
  },
  {
    question: 'Можно ли заказать доставку в определённое время?',
    answer: 'Мы доставляем заказы интервалом в 2 часа. При согласовании вы можете выбрать наиболее удобный для вас временной интервал.'
  },
  {
    question: 'Что входит в услугу сборки мебели?',
    answer: 'Специалист привозит все необходимые инструменты, собирает мебель, устанавливает её в указанное вами место и убирает упаковочный мусор.'
  }
]

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index
}
</script>

<template>
  <main>
    <!-- Hero Section -->
    <section class="h-[400px] md:h-[450px] flex flex-col items-center justify-center relative overflow-hidden bg-primary/10">
      <div class="container mx-auto px-4 text-center relative z-20">
        <h1 class="font-heading text-textMain text-5xl md:text-7xl leading-tight tracking-wider">
          Доставка и оплата
        </h1>
        <p class="font-body text-textMain/70 text-xl mt-6 max-w-2xl mx-auto">
          Быстрая и надёжная доставка по всей России. Удобные способы оплаты для каждого клиента
        </p>
      </div>
    </section>

    <!-- Delivery Methods Section -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <h2 class="font-heading text-textMain text-4xl md:text-5xl text-center mb-16 tracking-wider">
          Способы доставки
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(method, index) in deliveryMethods" :key="index" 
               class="bg-white border border-border rounded-xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div class="text-5xl mb-6">{{ method.icon }}</div>
            <h3 class="font-heading text-textMain text-xl mb-4">{{ method.title }}</h3>
            <div class="font-heading text-primary text-2xl mb-2">{{ method.price }}</div>
            <div class="font-body text-textMain/60 text-sm mb-4">{{ method.time }}</div>
            <p class="font-body text-textMain/80 leading-relaxed text-sm">{{ method.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Delivery Conditions Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="font-heading text-textMain text-4xl md:text-5xl text-center mb-16 tracking-wider">
          Условия доставки
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div v-for="(condition, index) in deliveryConditions" :key="index" 
               class="bg-white border border-border rounded-xl p-8">
            <h3 class="font-heading text-textMain text-xl mb-4">{{ condition.title }}</h3>
            <p class="font-body text-textMain/80 leading-relaxed">{{ condition.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Payment Methods Section -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <h2 class="font-heading text-textMain text-4xl md:text-5xl text-center mb-16 tracking-wider">
          Способы оплаты
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div v-for="(method, index) in paymentMethods" :key="index" 
               class="text-center p-8 border border-border rounded-xl hover:border-primary transition-colors">
            <div class="text-5xl mb-6">{{ method.icon }}</div>
            <h3 class="font-heading text-textMain text-lg mb-3">{{ method.title }}</h3>
            <p class="font-body text-textMain/70 text-sm">{{ method.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Delivery Steps Section -->
    <section class="py-20 bg-primary/5">
      <div class="container mx-auto px-4">
        <h2 class="font-heading text-textMain text-4xl md:text-5xl text-center mb-16 tracking-wider">
          Как происходит доставка
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
          <div v-for="(step, index) in deliverySteps" :key="index" class="text-center relative">
            <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="font-heading text-white text-2xl">{{ step.step }}</span>
            </div>
            <h3 class="font-heading text-textMain text-lg mb-3">{{ step.title }}</h3>
            <p class="font-body text-textMain/70 text-sm leading-relaxed">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="font-heading text-textMain text-4xl md:text-5xl text-center mb-16 tracking-wider">
          Часто задаваемые вопросы
        </h2>
        
        <div class="space-y-4">
          <div v-for="(item, index) in faqItems" :key="index" 
               class="border border-border rounded-xl overflow-hidden">
            <button @click="toggleFaq(index)" 
                    class="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
              <span class="font-heading text-textMain text-lg">{{ item.question }}</span>
              <svg class="w-6 h-6 text-primary transition-transform" :class="{ 'rotate-180': activeFaq === index }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div v-if="activeFaq === index" class="px-6 pb-6">
              <p class="font-body text-textMain/80 leading-relaxed">{{ item.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Return Policy Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="font-heading text-textMain text-4xl md:text-5xl text-center mb-12 tracking-wider">
          Возврат товара
        </h2>
        
        <div class="bg-white border border-border rounded-2xl p-10">
          <p class="font-body text-textMain text-lg leading-relaxed">
            Вы можете вернуть товар в течение 14 дней с момента получения, если он не был в использовании, сохранён товарный вид, потребительские свойства, а также документ подтверждающий факт покупки. Возврат крупногабаритных товаров осуществляется силами покупателя. При получении товара ненадлежащего качества возврат и доставка осуществляются за счёт компании.
          </p>
          <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div class="font-heading text-4xl text-primary mb-2">14</div>
              <p class="font-body text-textMain">дней на возврат</p>
            </div>
            <div>
              <div class="font-heading text-4xl text-primary mb-2">100%</div>
              <p class="font-body text-textMain">возврат средств</p>
            </div>
            <div>
              <div class="font-heading text-4xl text-primary mb-2">3</div>
              <p class="font-body text-textMain">дня на обработку</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-primary py-16">
      <div class="container mx-auto px-4 text-center">
        <h2 class="font-heading text-textMain text-5xl">CLICKWOOD</h2>
      </div>
    </footer>
  </main>
</template>

<style scoped>
svg {
  transition: transform 0.3s ease;
}
</style>