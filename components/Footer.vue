<template>
  <footer class="bg-primary text-gray-300">
    <div class="container mx-auto px-4 py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
        
        <!-- Column 1: Brand -->
        <div>
          <NuxtLink to="/" class="font-heading text-white text-4xl md:text-5xl tracking-wider hover:opacity-80 transition-opacity block mb-6">
            CLICKWOOD
          </NuxtLink>
          
          <div class="space-y-3 font-body text-sm leading-relaxed">
            <p class="flex items-start gap-3">
              <svg class="w-4 h-4 mt-0.5 text-brown flex-shrink-0" viewBox="0 0 16 16" fill="none">
                <path d="M8 1C5.2 1 3 3.2 3 6c0 3.8 5 9 5 9s5-5.2 5-9c0-2.8-2.2-5-5-5z" stroke="currentColor" stroke-width="1.2"/>
                <circle cx="8" cy="6" r="1.5" stroke="currentColor" stroke-width="1.2"/>
              </svg>
              <span>Москва, ул. Производственная, 12</span>
            </p>
            <p class="flex items-center gap-3">
              <svg class="w-4 h-4 text-brown flex-shrink-0" viewBox="0 0 16 16" fill="none">
                <path d="M14.5 11.5l-3-1.5-2 2-4-4 2-2-1.5-3h-3C3 7 9 13 14.5 11.5z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <a href="tel:+74951234567" class="hover:text-white transition-colors">+7 (495) 123-45-67</a>
            </p>
            <p class="flex items-center gap-3">
              <svg class="w-4 h-4 text-brown flex-shrink-0" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="3" width="14" height="10" rx="1" stroke="currentColor" stroke-width="1.2"/>
                <path d="M1 4l7 5 7-5" stroke="currentColor" stroke-width="1.2"/>
              </svg>
              <a href="mailto:info@clickwood.ru" class="hover:text-white transition-colors">info@clickwood.ru</a>
            </p>
          </div>

          <!-- Social icons -->
          <div class="flex items-center gap-4 mt-8">
            <a href="#" class="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:border-white hover:text-white transition-all text-brown" aria-label="Instagram">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="#" class="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:border-white hover:text-white transition-all text-brown" aria-label="VK">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M15.684 0H8.316C3.73 0 0 3.73 0 8.316v7.368C0 20.27 3.73 24 8.316 24h7.368C20.27 24 24 20.27 24 15.684V8.316C24 3.73 20.27 0 15.684 0zm3.6 16.852h-1.464c-.66 0-.864-.516-2.052-1.704-1.032-.984-1.488-1.116-1.74-1.116-.36 0-.456.144-.456.564v1.476c0 .396-.132.636-1.176.636-1.728 0-3.636-1.068-4.968-3.048C5.184 11.088 4.56 9.312 4.56 8.976c0-.216.096-.408.564-.408h1.464c.42 0 .588.192.756.648.828 2.196 2.208 4.116 2.772 4.116.216 0 .312-.108.312-.696v-2.448c-.072-1.296-.744-1.404-.744-1.872 0-.228.18-.432.456-.432h2.304c.36 0 .492.204.492.648v3.516c0 .36.156.48.252.48.204 0 .372-.12.744-.492.84-.924 1.536-2.4 1.536-2.4.132-.288.324-.408.744-.408h1.464c.504 0 .612.276.504.648-.156.78-1.704 3.072-1.704 3.072-.132.216-.18.324 0 .552.12.144.528.432.804.708.696.672 1.236 1.236 1.38 1.62.204.456 0 .684-.492.684z"/></svg>
            </a>
            <a href="#" class="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:border-white hover:text-white transition-all text-brown" aria-label="Telegram">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.127.087.62.087.62s.272 2.855.27 4.266c0 .648-.18 1.08-.333 1.156-.276.138-.588-.086-.588-.086s-1.962-1.352-2.24-1.466c-.278-.114-.43-.01-.19.262.24.272.934.922 1.128 1.134.13.14.207.328.122.514-.084.186-.54.334-.54.334s-2.018.624-4.066.624c-.726 0-1.422-.186-1.422-.186s-.312-.068-.43-.252c-.116-.182-.088-.396.088-.596.762-.888 1.002-.93 1.548-1.242.33-.188.476-.604.34-.954-.136-.35-1.024-2.948-1.138-3.296-.114-.348.052-.52.244-.58.192-.058.464-.016.464-.016s1.163.016 1.72.016c.182 0 .322.062.388.22.072.172.146.544.146.544s.366 2.022.478 2.424c.112.402.29.702.556.702.278 0 .45-.146.534-.294.084-.148.466-1.78.466-1.78s.128-.538.162-.674c.034-.136.094-.24.276-.282.182-.042.272-.03.468-.03.288 0 .32.042.364.174.044.132.034.602.034.602s-.06 2.496.186 2.716c.16.144.652.168.952.076.342-.104.688-.282.89-.466.166-.152.36-.088.36-.088s.226.088.238.204c.012.116 0 .238 0 .238s.016.248-.16.442c-.176.194-.686.436-.974.524-.116.036-.238.078-.362.11.354.17.63.464.828.87.198.406.258.876.258 1.51 0 .636-.01 1.338-.01 1.576 0 .236.134.348.228.406.292.178.464.45.464.45s.058.082.058.318c0 .236-.116.414-.116.414z"/></svg>
            </a>
            <a href="#" class="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:border-white hover:text-white transition-all text-brown" aria-label="WhatsApp">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>

        <!-- Column 2: Navigation -->
        <div>
          <h4 class="text-white uppercase tracking-widest text-xs font-body mb-6">Навигация</h4>
          <ul class="space-y-3 font-body text-sm">
            <li><NuxtLink to="/" class="hover:text-white transition-colors">Главная</NuxtLink></li>
            <li><NuxtLink to="/catalog" class="hover:text-white transition-colors">Каталог</NuxtLink></li>
            <li><NuxtLink to="/collections" class="hover:text-white transition-colors">Коллекции</NuxtLink></li>
            <li><NuxtLink to="/about" class="hover:text-white transition-colors">О нас</NuxtLink></li>
            <li><NuxtLink to="/delivery" class="hover:text-white transition-colors">Доставка</NuxtLink></li>
            <li><a href="#contact" class="hover:text-white transition-colors">Контакты</a></li>
          </ul>
        </div>

        <!-- Column 3: For customers -->
        <div>
          <h4 class="text-white uppercase tracking-widest text-xs font-body mb-6">Покупателям</h4>
          <ul class="space-y-3 font-body text-sm">
            <li><a href="#" class="hover:text-white transition-colors">Оплата</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Возврат</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Гарантия</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Вопросы и ответы</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Сертификаты</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-gray-800">
      <div class="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="font-body text-xs text-brown">
          © {{ new Date().getFullYear() }} CLICKWOOD. Все права защищены.
        </p>
        <div class="flex items-center gap-6">
          <a href="#" class="font-body text-xs text-brown hover:text-white transition-colors">Политика конфиденциальности</a>
          <a href="#" class="font-body text-xs text-brown hover:text-white transition-colors">Пользовательское соглашение</a>
        </div>
      </div>
    </div>
  </footer>
</template>