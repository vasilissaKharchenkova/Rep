<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCart, type CartItem } from '~/composables/useCart'
import { useAuth } from '~/composables/useAuth'

// ─── Cart ────────────────────────────────────────

const router = useRouter()
const { cart, totalPrice, submitOrder: cartSubmitOrder } = useCart()
const { isLoggedIn, user, fetchMe } = useAuth()

// ─── Types ───────────────────────────────────────

interface CheckoutForm {
  firstName: string
  lastName: string
  phone: string
  email: string
  country: string
  city: string
  street: string
  apartment: string
  zipCode: string
  comment: string
  deliveryMethod: 'courier' | 'pickup' | 'transport'
  paymentMethod: 'card' | 'transfer' | 'cash'
  acceptedPolicy: boolean
}

type FormErrors = Partial<Record<keyof CheckoutForm, string>>

// ─── Form ────────────────────────────────────────

const form = ref<CheckoutForm>({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  country: 'russia',
  city: '',
  street: '',
  apartment: '',
  zipCode: '',
  comment: '',
  deliveryMethod: 'courier',
  paymentMethod: 'card',
  acceptedPolicy: false
})

const errors = ref<FormErrors>({})
const isSubmitting = ref(false)

const deliveryMethods = [
  { id: 'courier' as const, name: 'Курьер', price: 500, description: 'Доставка курьером до двери' },
  { id: 'pickup' as const, name: 'Самовывоз', price: 0, description: 'Бесплатный самовывоз из склада' },
  { id: 'transport' as const, name: 'Транспортная компания', price: 800, description: 'Отправка через ПЭК / СДЭК / Деловые Линии' }
]

const paymentMethods = [
  {
    id: 'card' as const,
    name: 'Банковская карта',
    description: 'Visa, Mastercard, МИР',
    icon: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`
  },
  {
    id: 'transfer' as const,
    name: 'Банковский перевод',
    description: 'Оплата по счёту для юр. лиц',
    icon: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`
  },
  {
    id: 'cash' as const,
    name: 'Оплата при получении',
    description: 'Наличными или картой курьеру',
    icon: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/></svg>`
  }
]

const countries = [
  { value: 'russia', label: 'Россия' },
  { value: 'kazakhstan', label: 'Казахстан' },
  { value: 'belarus', label: 'Беларусь' }
]

// ─── Computed ────────────────────────────────────

const subtotal = computed(() => totalPrice.value)

const deliveryCost = computed(() => {
  return deliveryMethods.find(m => m.id === form.value.deliveryMethod)?.price ?? 0
})

const total = computed(() => subtotal.value + deliveryCost.value)

const isFormValid = computed(() => {
  return (
    form.value.firstName.trim() !== '' &&
    form.value.lastName.trim() !== '' &&
    form.value.phone.trim() !== '' &&
    form.value.email.trim() !== '' &&
    form.value.city.trim() !== '' &&
    form.value.street.trim() !== '' &&
    form.value.zipCode.trim() !== '' &&
    form.value.acceptedPolicy === true &&
    Object.keys(errors.value).length === 0
  )
})

const promocode = ref('')
const promocodeApplied = ref(false)
const promocodeError = ref('')

// ─── Validation ──────────────────────────────────

const validateForm = (): FormErrors => {
  const e: FormErrors = {}

  if (!form.value.firstName.trim()) e.firstName = 'Укажите имя'
  if (!form.value.lastName.trim()) e.lastName = 'Укажите фамилию'
  if (!form.value.phone.trim()) {
    e.phone = 'Укажите телефон'
  } else if (form.value.phone.replace(/\D/g, '').length < 10) {
    e.phone = 'Неверный формат телефона'
  }
  if (!form.value.email.trim()) {
    e.email = 'Укажите email'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    e.email = 'Неверный формат email'
  }
  if (!form.value.city.trim()) e.city = 'Укажите город'
  if (!form.value.street.trim()) e.street = 'Укажите улицу и дом'
  if (!form.value.zipCode.trim()) {
    e.zipCode = 'Укажите индекс'
  } else if (!/^\d{5,6}$/.test(form.value.zipCode.trim())) {
    e.zipCode = 'Неверный формат индекса'
  }
  if (!form.value.acceptedPolicy) e.acceptedPolicy = 'Необходимо согласие'

  return e
}

const clearError = (field: keyof CheckoutForm) => {
  const newErrors = { ...errors.value }
  delete newErrors[field]
  errors.value = newErrors
}

const scrollToFirstError = async () => {
  const e = errors.value
  const firstKey = Object.keys(e)[0]
  if (!firstKey) return

  await nextTick()
  const el = document.querySelector(`[data-field="${firstKey}"]`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    ;(el as HTMLElement).focus()
  }
}

// ─── Phone formatting ────────────────────────────

const formatPhone = () => {
  let value = form.value.phone.replace(/\D/g, '')
  if (value.length > 0 && !value.startsWith('7') && !value.startsWith('8')) {
    value = '7' + value
  }
  if (value.startsWith('8')) value = '7' + value.slice(1)
  const match = value.match(/^(\d{1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/)
  if (match) {
    let formatted = '+7'
    if (match[2]) formatted += ` (${match[2]}`
    if (match[3]) formatted += `) ${match[3]}`
    if (match[4]) formatted += `-${match[4]}`
    if (match[5]) formatted += `-${match[5]}`
    form.value.phone = formatted
  }
}

// ─── Promocode ───────────────────────────────────

const applyPromocode = () => {
  if (promocode.value.trim().toUpperCase() === 'WELCOME10') {
    promocodeApplied.value = true
    promocodeError.value = ''
  } else {
    promocodeError.value = 'Неверный промокод'
    promocodeApplied.value = false
  }
}

// ─── Submit ──────────────────────────────────────

const handleSubmit = async () => {
  const validationErrors = validateForm()
  errors.value = validationErrors

  if (Object.keys(validationErrors).length > 0) {
    await scrollToFirstError()
    return
  }

  isSubmitting.value = true

  try {
    const address = `${form.value.country}, ${form.value.city}, ${form.value.street}, кв. ${form.value.apartment}`
    const comment = form.value.comment || ''
    const order = await cartSubmitOrder(
      cart.value,
      address,
      comment,
      {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        phone: form.value.phone,
        email: form.value.email
      }
    )
    router.push({
      path: '/success',
      query: {
        orderId: order._id,
        totalPrice: order.totalPrice?.toString() || totalPrice.value.toString(),
        createdAt: order.createdAt || new Date().toISOString()
      }
    })
  } catch (e: any) {
    const msg = e?.data?.statusMessage || 'Ошибка оформления заказа'
    alert(msg)
  } finally {
    isSubmitting.value = false
  }
}

// ─── Pre-fill from user profile ──────────────────

onMounted(async () => {
  if (!isLoggedIn.value) {
    await fetchMe()
  }
  if (isLoggedIn.value && user.value) {
    if (user.value.firstName) form.value.firstName = user.value.firstName
    if (user.value.lastName) form.value.lastName = user.value.lastName
    if (user.value.email) form.value.email = user.value.email
    if (user.value.phone) form.value.phone = user.value.phone
    if (user.value.city) form.value.city = user.value.city
    if (user.value.street) form.value.street = user.value.street
    if (user.value.apartment) form.value.apartment = user.value.apartment
    if (user.value.zipCode) form.value.zipCode = user.value.zipCode
    if (user.value.comment) form.value.comment = user.value.comment
  }
})

// ─── Empty cart ──────────────────────────────────
</script>

<template>
  <main v-if="cart.length === 0" class="min-h-[60vh] flex items-center justify-center">
    <div class="text-center py-20">
      <div class="text-7xl mb-6">🛒</div>
      <h2 class="font-heading text-textMain text-3xl mb-4">Корзина пуста</h2>
      <p class="font-body text-textMain/70 mb-8 max-w-md mx-auto">
        Добавьте товары в корзину, чтобы оформить заказ
      </p>
      <NuxtLink
        to="/catalog"
        class="inline-block px-10 py-4 bg-primary text-white rounded-xl font-body text-lg hover:bg-primaryDark transition-colors"
      >
        Перейти в каталог
      </NuxtLink>
    </div>
  </main>

  <main v-else class="py-12 md:py-16">
    <div class="container mx-auto px-4">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-sm text-textMain/60 mb-8">
        <NuxtLink to="/" class="hover:text-textMain transition-colors">Главная</NuxtLink>
        <span>/</span>
        <NuxtLink to="/cart" class="hover:text-textMain transition-colors">Корзина</NuxtLink>
        <span>/</span>
        <span class="text-textMain">Оформление заказа</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <!-- Left column: Form -->
        <div class="lg:col-span-7">
          <h1 class="font-heading text-textMain text-4xl md:text-5xl mb-10">
            Оформление заказа
          </h1>

          <form @submit.prevent="handleSubmit" novalidate>
            <!-- 1. Contact Info -->
            <section data-section="contact" class="border border-border rounded-xl p-6 md:p-8 mb-6 transition-all duration-300">
              <h2 class="font-heading text-textMain text-xl mb-6 flex items-center gap-3">
                <span class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-body">1</span>
                Контактные данные
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label class="text-[11px] uppercase tracking-widest text-gray-400 font-body block mb-1.5">Имя *</label>
                    <input
                    v-model="form.firstName"
                    data-field="firstName"
                    @input="clearError('firstName')"
                    class="px-4 py-3 border rounded-lg w-full font-body text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    :class="errors.firstName ? 'border-red-400' : 'border-border'"
                    placeholder="Иван"
                  />
                  <p v-if="errors.firstName" class="text-red-500 text-xs mt-1 font-body">{{ errors.firstName }}</p>
                </div>
                <div>
                  <label class="text-[11px] uppercase tracking-widest text-gray-400 font-body block mb-1.5">Фамилия *</label>
                    <input
                    v-model="form.lastName"
                    data-field="lastName"
                    @input="clearError('lastName')"
                    class="px-4 py-3 border rounded-lg w-full font-body text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    :class="errors.lastName ? 'border-red-400' : 'border-border'"
                    placeholder="Петров"
                  />
                  <p v-if="errors.lastName" class="text-red-500 text-xs mt-1 font-body">{{ errors.lastName }}</p>
                </div>
                <div>
                  <label class="text-[11px] uppercase tracking-widest text-gray-400 font-body block mb-1.5">Телефон *</label>
                    <input
                    v-model="form.phone"
                    data-field="phone"
                    @input="formatPhone(); clearError('phone')"
                    class="px-4 py-3 border rounded-lg w-full font-body text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    :class="errors.phone ? 'border-red-400' : 'border-border'"
                    placeholder="+7 (999) 123-45-67"
                  />
                  <p v-if="errors.phone" class="text-red-500 text-xs mt-1 font-body">{{ errors.phone }}</p>
                </div>
                <div>
                  <label class="text-[11px] uppercase tracking-widest text-gray-400 font-body block mb-1.5">Email *</label>
                    <input
                    v-model="form.email"
                    data-field="email"
                    type="email"
                    @input="clearError('email')"
                    class="px-4 py-3 border rounded-lg w-full font-body text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    :class="errors.email ? 'border-red-400' : 'border-border'"
                    placeholder="ivan@example.com"
                  />
                  <p v-if="errors.email" class="text-red-500 text-xs mt-1 font-body">{{ errors.email }}</p>
                </div>
              </div>
            </section>

            <!-- 2. Delivery Address -->
            <section data-section="address" class="border border-border rounded-xl p-6 md:p-8 mb-6 transition-all duration-300">
              <h2 class="font-heading text-textMain text-xl mb-6 flex items-center gap-3">
                <span class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-body">2</span>
                Адрес доставки
              </h2>
              <div class="space-y-5">
                <div>
                  <label class="text-[11px] uppercase tracking-widest text-gray-400 font-body block mb-1.5">Страна / Регион</label>
                  <select
                    v-model="form.country"
                    class="px-4 py-3 border border-border rounded-lg w-full font-body text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none bg-white"
                  >
                    <option v-for="c in countries" :key="c.value" :value="c.value">{{ c.label }}</option>
                  </select>
                </div>
                <div>
                  <label class="text-[11px] uppercase tracking-widest text-gray-400 font-body block mb-1.5">Город *</label>
                    <input
                    v-model="form.city"
                    data-field="city"
                    @input="clearError('city')"
                    class="px-4 py-3 border rounded-lg w-full font-body text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    :class="errors.city ? 'border-red-400' : 'border-border'"
                    placeholder="Москва"
                  />
                  <p v-if="errors.city" class="text-red-500 text-xs mt-1 font-body">{{ errors.city }}</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="md:col-span-2">
                    <label class="text-[11px] uppercase tracking-widest text-gray-400 font-body block mb-1.5">Улица, дом *</label>
                    <input
                    v-model="form.street"
                    data-field="street"
                    @input="clearError('street')"
                    class="px-4 py-3 border rounded-lg w-full font-body text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    :class="errors.street ? 'border-red-400' : 'border-border'"
                    placeholder="ул. Производственная, 12"
                  />
                    <p v-if="errors.street" class="text-red-500 text-xs mt-1 font-body">{{ errors.street }}</p>
                  </div>
                  <div>
                    <label class="text-[11px] uppercase tracking-widest text-gray-400 font-body block mb-1.5">Квартира</label>
                    <input
                      v-model="form.apartment"
                      class="px-4 py-3 border border-border rounded-lg w-full font-body text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="45"
                    />
                  </div>
                </div>
                <div>
                  <label class="text-[11px] uppercase tracking-widest text-gray-400 font-body block mb-1.5">Индекс *</label>
                    <input
                    v-model="form.zipCode"
                    data-field="zipCode"
                    @input="clearError('zipCode')"
                    class="px-4 py-3 border rounded-lg w-full font-body text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary max-w-[200px]"
                    :class="errors.zipCode ? 'border-red-400' : 'border-border'"
                    placeholder="123456"
                  />
                  <p v-if="errors.zipCode" class="text-red-500 text-xs mt-1 font-body">{{ errors.zipCode }}</p>
                </div>
                <div>
                  <label class="text-[11px] uppercase tracking-widest text-gray-400 font-body block mb-1.5">Комментарий к заказу</label>
                  <textarea
                    v-model="form.comment"
                    rows="4"
                    class="px-4 py-3 border border-border rounded-lg w-full font-body text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    placeholder="Удобное время доставки, код домофона и т.д."
                  ></textarea>
                </div>
              </div>
            </section>

            <!-- 3. Delivery Method -->
            <section data-section="delivery" class="border border-border rounded-xl p-6 md:p-8 mb-6 transition-all duration-300">
              <h2 class="font-heading text-textMain text-xl mb-6 flex items-center gap-3">
                <span class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-body">3</span>
                Способ доставки
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label
                  v-for="method in deliveryMethods"
                  :key="method.id"
                  class="border rounded-xl p-4 cursor-pointer transition-all hover:border-primary font-body"
                  :class="form.deliveryMethod === method.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border'"
                >
                  <input type="radio" :value="method.id" v-model="form.deliveryMethod" class="sr-only" />
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-medium text-textMain text-sm">{{ method.name }}</span>
                    <span v-if="method.price === 0" class="text-primary text-sm font-medium">Бесплатно</span>
                    <span v-else class="text-textMain text-sm font-medium">{{ method.price.toLocaleString('ru-RU') }} ₽</span>
                  </div>
                  <p class="text-xs text-gray-400">{{ method.description }}</p>
                </label>
              </div>
            </section>

            <!-- 4. Payment Method -->
            <section data-section="payment" class="border border-border rounded-xl p-6 md:p-8 mb-6 transition-all duration-300">
              <h2 class="font-heading text-textMain text-xl mb-6 flex items-center gap-3">
                <span class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-body">4</span>
                Способ оплаты
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label
                  v-for="method in paymentMethods"
                  :key="method.id"
                  class="border rounded-xl p-4 cursor-pointer transition-all hover:border-primary font-body"
                  :class="form.paymentMethod === method.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border'"
                >
                  <input type="radio" :value="method.id" v-model="form.paymentMethod" class="sr-only" />
                  <div class="flex items-center gap-3 mb-2">
                    <span class="text-primary" v-html="method.icon"></span>
                    <span class="font-medium text-textMain text-sm">{{ method.name }}</span>
                  </div>
                  <p class="text-xs text-gray-400">{{ method.description }}</p>
                </label>
              </div>
            </section>

            <!-- 5. Policy checkbox -->
            <div class="mb-8">
              <label class="flex items-start gap-3 cursor-pointer">
              <input
                  type="checkbox"
                  v-model="form.acceptedPolicy"
                  @change="clearError('acceptedPolicy')"
                  class="mt-0.5 w-4 h-4 accent-primary rounded"
                />
                <span class="font-body text-sm text-textMain/70">
                  Я согласен на
                  <a href="#" class="text-primary underline hover:no-underline">обработку персональных данных</a>
                  и принимаю условия
                  <a href="#" class="text-primary underline hover:no-underline">публичной оферты</a> *
                </span>
              </label>
              <p v-if="errors.acceptedPolicy" class="text-red-500 text-xs mt-1 font-body">{{ errors.acceptedPolicy }}</p>
            </div>

            <!-- Submit button (visible on mobile, hidden on desktop) -->
            <button
              type="submit"
              :disabled="!isFormValid || isSubmitting"
              class="lg:hidden w-full py-4 bg-primary text-white rounded-xl font-body text-lg hover:bg-primaryDark transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <svg v-if="isSubmitting" class="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span v-if="isSubmitting">Оформляем...</span>
              <span v-else>Оформить заказ</span>
            </button>
          </form>
        </div>

        <!-- Right column: Order Summary (sticky) -->
        <div class="lg:col-span-5 self-start">
          <div class="sticky top-24">
            <div class="bg-gray-50/50 border border-border rounded-xl p-6 md:p-8">
              <h2 class="font-heading text-textMain text-xl mb-6">Ваш заказ</h2>

              <!-- Items list -->
              <div class="space-y-4 mb-6 divide-y divide-border">
                <div
                  v-for="item in cart"
                  :key="item.id"
                  class="flex items-center gap-4 pt-4 first:pt-0"
                >
                  <div class="w-16 h-16 rounded-lg overflow-hidden border border-border flex-shrink-0 bg-white">
                    <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="font-body text-sm text-textMain truncate">{{ item.name }}</h4>
                    <p class="text-xs text-gray-400 mt-0.5">Код: {{ item.article }}</p>
                    <p class="font-body text-sm text-textMain mt-1">{{ item.quantity }} × {{ item.price.toLocaleString('ru-RU') }} ₽</p>
                  </div>
                  <div class="font-body text-sm text-textMain font-medium">
                    {{ (item.price * item.quantity).toLocaleString('ru-RU') }} ₽
                  </div>
                </div>
              </div>

              <!-- Promocode -->
              <div class="mb-6">
                <div class="flex gap-2">
                  <input
                    v-model="promocode"
                    class="flex-1 px-4 py-2.5 border border-border rounded-lg font-body text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Промокод"
                  />
                  <button
                    @click="applyPromocode"
                    class="px-5 py-2.5 border border-primary text-primary rounded-lg font-body text-sm hover:bg-primary/5 transition-colors whitespace-nowrap"
                  >
                    Применить
                  </button>
                </div>
                <p v-if="promocodeError" class="text-red-500 text-xs mt-1 font-body">{{ promocodeError }}</p>
                <p v-if="promocodeApplied" class="text-primary text-xs mt-1 font-body">Скидка 10% применена!</p>
              </div>

              <!-- Totals -->
              <div class="space-y-3 font-body border-t border-border pt-6">
                <div class="flex justify-between text-sm">
                  <span class="text-textMain/60">Товары ({{ cart.length }} {{ cart.length === 1 ? 'позиция' : 'позиции' }})</span>
                  <span class="text-textMain">{{ subtotal.toLocaleString('ru-RU') }} ₽</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-textMain/60">Доставка</span>
                  <span v-if="deliveryCost === 0" class="text-primary font-medium">Бесплатно</span>
                  <span v-else class="text-textMain">{{ deliveryCost.toLocaleString('ru-RU') }} ₽</span>
                </div>
                <div v-if="promocodeApplied" class="flex justify-between text-sm">
                  <span class="text-primary">Скидка 10%</span>
                  <span class="text-primary">-{{ Math.round(subtotal * 0.1).toLocaleString('ru-RU') }} ₽</span>
                </div>
                <div class="flex justify-between pt-3 border-t border-border">
                  <span class="font-heading text-textMain text-lg">Итого</span>
                  <span class="font-heading text-primary text-2xl">
                    {{ (promocodeApplied ? total - Math.round(subtotal * 0.1) : total).toLocaleString('ru-RU') }} ₽
                  </span>
                </div>
              </div>

              <!-- Submit button (desktop) -->
              <button
                type="submit"
                :disabled="!isFormValid || isSubmitting"
                @click="handleSubmit"
                class="hidden lg:flex w-full mt-8 py-4 bg-primary text-white rounded-xl font-body text-lg hover:bg-primaryDark transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center gap-3"
              >
                <svg v-if="isSubmitting" class="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span v-if="isSubmitting">Оформляем...</span>
                <span v-else>Оформить заказ</span>
              </button>

              <p class="text-[11px] text-gray-400 text-center mt-4 font-body">
                Нажимая «Оформить заказ», вы соглашаетесь с условиями обработки данных
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </main>
</template>

<style scoped>
/* Section appearance animation */
[data-section] {
  animation: fadeUp 0.4s ease both;
}
[data-section]:nth-child(2) { animation-delay: 0.05s; }
[data-section]:nth-child(3) { animation-delay: 0.1s; }
[data-section]:nth-child(4) { animation-delay: 0.15s; }
[data-section]:nth-child(5) { animation-delay: 0.2s; }

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>