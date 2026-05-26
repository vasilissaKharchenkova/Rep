<template>
  <main>
    <section class="h-[400px] md:h-[450px] flex flex-col items-center justify-center relative overflow-hidden bg-primary/10">
      <div class="container mx-auto px-4 text-center relative z-20">
        <h1 class="font-heading text-textMain text-5xl md:text-7xl leading-tight tracking-wider">Гарантия</h1>
        <p class="font-body text-textMain/70 text-xl mt-6 max-w-2xl mx-auto">Мы уверены в качестве нашей продукции</p>
      </div>
    </section>

    <section class="py-20">
      <div class="container mx-auto px-4 max-w-4xl">
        <div class="bg-white border border-border rounded-2xl p-10 mb-8">
          <div class="text-5xl mb-6">🛡️</div>
          <h2 class="font-heading text-textMain text-3xl mb-6">Официальная гарантия 3 года</h2>
          <p class="font-body text-textMain/80 leading-relaxed mb-6">На всю продукцию CLICKWOOD предоставляется официальная гарантия сроком 3 года с момента получения заказа. Гарантия распространяется на производственные дефекты и недостатки материалов.</p>
          <p class="font-body text-textMain/80 leading-relaxed">В течение гарантийного срока мы бесплатно устраняем любые недостатки, связанные с качеством изготовления мебели. В случае невозможности ремонта производится замена изделия.</p>
        </div>

        <h2 class="font-heading text-textMain text-3xl mb-8">Условия гарантийного обслуживания</h2>
        <div class="space-y-6">
          <div class="bg-white border border-border rounded-xl p-8">
            <h3 class="font-heading text-textMain text-xl mb-4">🔧 Что покрывается гарантией</h3>
            <ul class="font-body text-textMain/80 space-y-2 leading-relaxed">
              <li>— Производственные дефекты каркаса и корпусных элементов</li>
              <li>— Деформация и разрушение соединений, не связанные с нарушением эксплуатации</li>
              <li>— Отслоение шпона, обивки или декоративных покрытий</li>
              <li>— Неисправность трансформирующих механизмов</li>
              <li>— Сколы и трещины в конструкции, возникшие не по вине покупателя</li>
            </ul>
          </div>

          <div class="bg-white border border-border rounded-xl p-8">
            <h3 class="font-heading text-textMain text-xl mb-4">❌ Что не покрывается гарантией</h3>
            <ul class="font-body text-textMain/80 space-y-2 leading-relaxed">
              <li>— Повреждения, возникшие в результате неправильной транспортировки и сборки</li>
              <li>— Естественный износ (изменение цвета, потёртости, потеря блеска)</li>
              <li>— Механические повреждения (царапины, сколы, вмятины после передачи товара)</li>
              <li>— Повреждения из-за нарушения условий эксплуатации (влажность, температура)</li>
              <li>— Дефекты, возникшие в результате самостоятельного ремонта или модификации</li>
            </ul>
          </div>

          <div class="bg-white border border-border rounded-xl p-8">
            <h3 class="font-heading text-textMain text-xl mb-4">📋 Как получить гарантийное обслуживание</h3>
            <ol class="font-body text-textMain/80 space-y-2 leading-relaxed list-decimal list-inside">
              <li>Свяжитесь с нашим менеджером по телефону или email, указав номер заказа</li>
              <li>Опишите характер дефекта и приложите фотографии</li>
              <li>Наш специалист свяжется с вами в течение 1 рабочего дня</li>
              <li>Производится диагностика и согласование способа устранения</li>
              <li>Ремонт или замена изделия выполняется в течение 7–14 рабочих дней</li>
            </ol>
          </div>
        </div>

        <div class="mt-12 bg-primary/5 border border-border rounded-2xl p-10 text-center">
          <h3 class="font-heading text-textMain text-2xl mb-4">Остались вопросы?</h3>
          <p class="font-body text-textMain/80 mb-6">Свяжитесь с нами, и мы подробно ответим на все вопросы о гарантии</p>
          <NuxtLink to="/#contact" class="inline-block px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors font-body">Связаться с нами</NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>
