<template>
  <main>
    <section class="h-[400px] md:h-[450px] flex flex-col items-center justify-center relative overflow-hidden bg-primary/10">
      <div class="container mx-auto px-4 text-center relative z-20">
        <h1 class="font-heading text-textMain text-5xl md:text-7xl leading-tight tracking-wider">Сертификаты</h1>
        <p class="font-body text-textMain/70 text-xl mt-6 max-w-2xl mx-auto">Вся наша продукция сертифицирована и соответствует стандартам качества</p>
      </div>
    </section>

    <section class="py-20">
      <div class="container mx-auto px-4 max-w-4xl">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(cert, index) in certificates" :key="index" class="bg-white border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
            <div class="text-5xl mb-4">{{ cert.icon }}</div>
            <h3 class="font-heading text-textMain text-lg mb-2">{{ cert.title }}</h3>
            <p class="font-body text-textMain/70 text-sm leading-relaxed">{{ cert.description }}</p>
          </div>
        </div>

        <div class="mt-12 bg-primary/5 border border-border rounded-2xl p-10">
          <h3 class="font-heading text-textMain text-2xl mb-6">Мы работаем в соответствии с законодательством РФ</h3>
          <p class="font-body text-textMain/80 leading-relaxed">Вся продукция CLICKWOOD имеет сертификаты соответствия требованиям Технического регламента Таможенного союза (ТР ТС). По запросу мы можем предоставить копии сертификатов на конкретное изделие. Для получения копии свяжитесь с нашим менеджером.</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
const certificates = [
  { icon: '📜', title: 'Сертификат соответствия ТР ТС', description: 'Продукция соответствует требованиям Технического регламента Таможенного союза о безопасности мебельной продукции.' },
  { icon: '🌱', title: 'Экологический сертификат', description: 'Используемые материалы безопасны для здоровья и окружающей среды, не содержат вредных веществ.' },
  { icon: '🔥', title: 'Пожарная безопасность', description: 'Материалы, используемые в производстве, соответствуют требованиям пожарной безопасности.' },
  { icon: '🔬', title: 'Гигиенический сертификат', description: 'Продукция прошла санитарно-эпидемиологическую экспертизу и безопасна для использования в жилых помещениях.' },
  { icon: '🪵', title: 'Сертификат происхождения древесины', description: 'Используемая древесина заготавливается легально, что подтверждается документами о происхождении.' },
  { icon: '🏆', title: 'Награды и дипломы', description: 'CLICKWOOD является лауреатом отраслевых выставок и конкурсов мебельной индустрии России.' }
]
</script>