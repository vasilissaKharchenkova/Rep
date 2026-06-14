<template>
  <main>
    <section class="h-[400px] md:h-[450px] flex flex-col items-center justify-center relative overflow-hidden bg-primary/10">
      <div class="container mx-auto px-4 text-center relative z-20">
        <h1 class="font-heading text-textMain text-5xl md:text-7xl leading-tight tracking-wider">Оплата</h1>
        <p class="font-body text-textMain/70 text-xl mt-6 max-w-2xl mx-auto">Удобные способы оплаты для каждого клиента</p>
      </div>
    </section>

    <section class="py-20">
      <div class="container mx-auto px-4 max-w-4xl">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div class="bg-white border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div class="text-5xl mb-6">💵</div>
            <h3 class="font-heading text-textMain text-xl mb-4">Наличные курьеру</h3>
            <p class="font-body text-textMain/80 leading-relaxed">Оплата наличными при получении заказа. Курьер выдаёт чек и гарантийный талон.</p>
          </div>
          <div class="bg-white border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div class="text-5xl mb-6">💳</div>
            <h3 class="font-heading text-textMain text-xl mb-4">Банковская карта онлайн</h3>
            <p class="font-body text-textMain/80 leading-relaxed">Оплата картой Visa, Mastercard, МИР на сайте через защищённое соединение.</p>
          </div>
          <div class="bg-white border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div class="text-5xl mb-6">🏢</div>
            <h3 class="font-heading text-textMain text-xl mb-4">Безналичный расчёт</h3>
            <p class="font-body text-textMain/80 leading-relaxed">Для юридических лиц по счёту с НДС. Выставляем счета на оплату с полным пакетом документов.</p>
          </div>
          <div class="bg-white border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div class="text-5xl mb-6">💸</div>
            <h3 class="font-heading text-textMain text-xl mb-4">Рассрочка и кредит</h3>
            <p class="font-body text-textMain/80 leading-relaxed">Оплата частями на срок от 3 до 24 месяцев без первоначального взноса. Без переплаты при соблюдении условий.</p>
          </div>
        </div>

        <div class="mt-12 bg-primary/5 border border-border rounded-2xl p-10">
          <h3 class="font-heading text-textMain text-2xl mb-6">Безопасность платежей</h3>
          <p class="font-body text-textMain/80 leading-relaxed mb-4">Все онлайн-платежи на нашем сайте проходят через защищённые каналы связи. Мы не храним данные ваших банковских карт. Платёжная информация передаётся напрямую в процессинговый центр банка с использованием современных протоколов шифрования.</p>
          <p class="font-body text-textMain/80 leading-relaxed">После успешного списания средств вы получите электронный чек на указанную при оформлении электронную почту.</p>
        </div>
      </div>
    </section>
  </main>
</template>
