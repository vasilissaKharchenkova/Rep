<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'
import { useCollections } from '~/composables/useCollections'

const router = useRouter()
const { isAdmin, user, fetchMe, authFetch } = useAuth()

// ─── Auth guard ──────────────────────────────
const loading = ref(true)

onMounted(async () => {
  await fetchMe()
  if (!isAdmin.value) {
    router.push('/')
    return
  }
  await loadDashboard()
  await loadProducts()
  await loadOrders()
  await loadReviews()
  loading.value = false
})

// ─── Active tab ──────────────────────────────
const activeTab = ref<'dashboard' | 'products' | 'orders' | 'reviews' | 'collections' | 'order-detail'>('dashboard')

// ═══════════════════════════════════════════════
//  DASHBOARD TAB
// ═══════════════════════════════════════════════
const stats = ref({ products: 0, orders: 0, users: 0 })

async function loadDashboard() {
  try {
    const [prods, ords] = await Promise.all([
      authFetch('/api/products'),
      authFetch('/api/orders')
    ])
    stats.value.products = (prods as any[]).length
    stats.value.orders = (ords as any[]).length
  } catch {}
}

// ═══════════════════════════════════════════════
//  PRODUCTS TAB
// ═══════════════════════════════════════════════
const products = ref<any[]>([])
const editingProduct = ref<any | null>(null)
const isNewProduct = ref(false)

const productForm = ref({
  name: '',
  article: '',
  price: 0,
  categoryId: 'sofas',
  styleId: 'scandi',
  color: 'gray',
  inStock: true,
  image: '',
  images: [] as string[],
  description: '',
  characteristics: ''
})

async function loadProducts() {
  try {
    products.value = await authFetch('/api/products')
  } catch {}
}

function startNewProduct() {
  isNewProduct.value = true
  editingProduct.value = null
  productForm.value = {
    name: '',
    article: '',
    price: 0,
    categoryId: 'sofas',
    styleId: 'scandi',
    color: 'gray',
    inStock: true,
    image: '',
    images: [],
    description: '',
    characteristics: ''
  }
}

async function startEditProduct(id: number) {
  isNewProduct.value = false
  try {
    const p: any = await authFetch(`/api/products/${id}`)
    editingProduct.value = id
    productForm.value = {
      name: p.name || '',
      article: p.article || '',
      price: p.price || 0,
      categoryId: p.categoryId || 'sofas',
      styleId: p.styleId || 'scandi',
      color: p.color || 'gray',
      inStock: p.inStock !== false,
      image: p.image || '',
      images: p.images || [],
      description: p.description || '',
      characteristics: p.characteristics || ''
    }
  } catch {}
}

function cancelEdit() {
  editingProduct.value = null
  isNewProduct.value = false
}

const saving = ref(false)
const uploading = ref(false)
const newImageUrl = ref('')

const uploadImages = async (files: FileList | null) => {
  if (!files || files.length === 0) return
  uploading.value = true
  try {
    const fd = new FormData()
    for (const file of files) {
      fd.append('images', file)
    }
    const result: any = await authFetch('/api/upload', { method: 'POST', body: fd })
    if (result?.urls) {
      productForm.value.images.push(...result.urls)
    }
  } catch (e: any) {
    alert(e?.data?.statusMessage || 'Ошибка загрузки изображений')
  } finally {
    uploading.value = false
  }
}

const uploadMainImage = async (files: FileList | null) => {
  if (!files || files.length === 0) return
  uploading.value = true
  try {
    const fd = new FormData()
    fd.append('images', files[0])
    const result: any = await authFetch('/api/upload', { method: 'POST', body: fd })
    if (result?.urls?.[0]) {
      productForm.value.image = result.urls[0]
    }
  } catch (e: any) {
    alert(e?.data?.statusMessage || 'Ошибка загрузки изображения')
  } finally {
    uploading.value = false
  }
}

const removeImage = (index: number) => {
  productForm.value.images.splice(index, 1)
}

const moveImageUp = (index: number) => {
  if (index <= 0) return
  const arr = productForm.value.images
  ;[arr[index - 1], arr[index]] = [arr[index], arr[index - 1]]
}

const moveImageDown = (index: number) => {
  const arr = productForm.value.images
  if (index >= arr.length - 1) return
  ;[arr[index], arr[index + 1]] = [arr[index + 1], arr[index]]
}

const addImageUrl = () => {
  const url = newImageUrl.value.trim()
  if (!url) return
  productForm.value.images.push(url)
  newImageUrl.value = ''
}

async function saveProduct() {
  saving.value = true
  try {
    if (isNewProduct.value) {
      await authFetch('/api/products', { method: 'POST', body: productForm.value })
    } else {
      await authFetch(`/api/products/${editingProduct.value}`, { method: 'PUT', body: productForm.value })
    }
    cancelEdit()
    await loadProducts()
  } catch (e: any) {
    alert(e?.data?.statusMessage || 'Ошибка сохранения')
  } finally {
    saving.value = false
  }
}

async function deleteProduct(id: number) {
  if (!confirm('Удалить товар?')) return
  try {
    await authFetch(`/api/products/${id}`, { method: 'DELETE' })
    products.value = products.value.filter(p => p.id !== id)
  } catch (e: any) {
    alert(e?.data?.statusMessage || 'Ошибка удаления')
  }
}

// ═══════════════════════════════════════════════
//  ORDERS TAB
// ═══════════════════════════════════════════════
const orders = ref<any[]>([])

const statusOptions = ['new', 'processing', 'shipped', 'delivered', 'cancelled']
const statusLabels: Record<string, string> = {
  new: 'Новый', processing: 'В обработке', shipped: 'Отправлен', delivered: 'Доставлен', cancelled: 'Отменён'
}

async function loadOrders() {
  try {
    orders.value = await authFetch('/api/orders')
  } catch {}
}

async function updateOrderStatus(orderId: string, status: string) {
  try {
    await authFetch(`/api/orders/${orderId}`, { method: 'PUT', body: { status } })
    const o = orders.value.find(o => o._id === orderId)
    if (o) o.status = status
  } catch {}
}

// ─── Order detail sub-view ────────────────
const selectedOrder = ref<any | null>(null)

function openOrderDetail(order: any) {
  selectedOrder.value = order
  activeTab.value = 'order-detail'
}

function closeOrderDetail() {
  selectedOrder.value = null
  activeTab.value = 'orders'
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// ═══════════════════════════════════════════════
//  REVIEWS TAB
// ═══════════════════════════════════════════════
const reviews = ref<any[]>([])

async function loadReviews() {
  try {
    reviews.value = await authFetch('/api/reviews')
  } catch {}
}

async function deleteReview(id: string) {
  if (!confirm('Удалить отзыв?')) return
  try {
    await authFetch(`/api/reviews/${id}`, { method: 'DELETE' })
    reviews.value = reviews.value.filter(r => r._id !== id)
  } catch {}
}

// ═══════════════════════════════════════════════
//  COLLECTIONS TAB
// ═══════════════════════════════════════════════
const { collections, fetchCollections } = useCollections()
const editingCollection = ref<any | null>(null)
const isNewCollection = ref(false)

const collectionForm = ref({
  name: '',
  slug: '',
  description: '',
  fullDescription: '',
  image: '',
  items: [] as { productId: number; quantity: number }[],
  discount: 0
})

async function loadCollections() {
  await fetchCollections()
}

function startNewCollection() {
  isNewCollection.value = true
  editingCollection.value = null
  collectionForm.value = {
    name: '',
    slug: '',
    description: '',
    fullDescription: '',
    image: '',
    items: [],
    discount: 0
  }
}

function startEditCollection(col: any) {
  isNewCollection.value = false
  editingCollection.value = col.slug
  collectionForm.value = {
    name: col.name || '',
    slug: col.slug || '',
    description: col.description || '',
    fullDescription: col.fullDescription || '',
    image: col.image || '',
    items: (col.items || []).map((i: any) => ({ productId: i.productId, quantity: i.quantity })),
    discount: col.discount || 0
  }
}

function cancelEditCollection() {
  editingCollection.value = null
  isNewCollection.value = false
}

function addCollectionItem() {
  collectionForm.value.items.push({ productId: 0, quantity: 1 })
}

function removeCollectionItem(index: number) {
  collectionForm.value.items.splice(index, 1)
}

const computedCollectionPrice = computed(() => {
  let total = 0
  for (const item of collectionForm.value.items) {
    const product = products.value.find((p: any) => p.id === item.productId)
    if (product) {
      total += product.price * item.quantity
    }
  }
  return total
})

async function saveCollection() {
  saving.value = true
  try {
    if (isNewCollection.value) {
      await authFetch('/api/collections', { method: 'POST', body: collectionForm.value })
    } else {
      await authFetch(`/api/collections/${editingCollection.value}`, { method: 'PUT', body: collectionForm.value })
    }
    cancelEditCollection()
    await loadCollections()
  } catch (e: any) {
    alert(e?.data?.statusMessage || 'Ошибка сохранения коллекции')
  } finally {
    saving.value = false
  }
}

async function deleteCollection(col: any) {
  if (!confirm(`Удалить коллекцию "${col.name}"?`)) return
  try {
    await authFetch(`/api/collections/${col.slug}`, { method: 'DELETE' })
    await loadCollections()
  } catch (e: any) {
    alert(e?.data?.statusMessage || 'Ошибка удаления коллекции')
  }
}

// ─── Helpers ─────────────────────────────────
const formatPrice = (price: number) => price.toLocaleString('ru-RU')

const categories = [
  { id: 'sofas', name: 'Диваны' },
  { id: 'chairs', name: 'Кресла' },
  { id: 'storage', name: 'Хранение' },
  { id: 'tables', name: 'Столы' },
  { id: 'decor', name: 'Декор' },
  { id: 'lighting', name: 'Освещение' }
]

const styles = [
  { id: 'scandi', name: 'Сканди' },
  { id: 'minimal', name: 'Минимализм' },
  { id: 'boho', name: 'Бохо' },
  { id: 'artdeco', name: 'Ар деко' }
]

const colors = [
  { id: 'white', name: 'Белый' },
  { id: 'brown', name: 'Коричневый' },
  { id: 'gray', name: 'Серый' },
  { id: 'black', name: 'Чёрный' },
  { id: 'green', name: 'Зелёный' }
]
</script>

<template>
  <main v-if="!loading && isAdmin" class="py-12 bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4">
      <h1 class="font-heading text-textMain text-4xl mb-8">Админ-панель</h1>

      <!-- Tab navigation -->
      <div class="flex gap-1 mb-8 border-b border-border">
        <button @click="activeTab = 'dashboard'" 
                class="px-6 py-3 font-body text-sm transition-colors border-b-2 -mb-px cursor-pointer bg-transparent"
                :class="activeTab === 'dashboard' ? 'border-primary text-primary font-medium' : 'border-transparent text-gray-400 hover:text-textMain'">
          📊 Дашборд
        </button>
        <button @click="activeTab = 'products'" 
                class="px-6 py-3 font-body text-sm transition-colors border-b-2 -mb-px cursor-pointer bg-transparent"
                :class="activeTab === 'products' ? 'border-primary text-primary font-medium' : 'border-transparent text-gray-400 hover:text-textMain'">
          📦 Товары
        </button>
        <button @click="activeTab = 'orders'" 
                class="px-6 py-3 font-body text-sm transition-colors border-b-2 -mb-px cursor-pointer bg-transparent"
                :class="activeTab === 'orders' ? 'border-primary text-primary font-medium' : 'border-transparent text-gray-400 hover:text-textMain'">
          📋 Заказы
        </button>
        <button @click="activeTab = 'reviews'" 
                class="px-6 py-3 font-body text-sm transition-colors border-b-2 -mb-px cursor-pointer bg-transparent"
                :class="activeTab === 'reviews' ? 'border-primary text-primary font-medium' : 'border-transparent text-gray-400 hover:text-textMain'">
          ⭐ Отзывы
        </button>
        <button @click="activeTab = 'collections'; loadCollections()" 
                class="px-6 py-3 font-body text-sm transition-colors border-b-2 -mb-px cursor-pointer bg-transparent"
                :class="activeTab === 'collections' ? 'border-primary text-primary font-medium' : 'border-transparent text-gray-400 hover:text-textMain'">
          📚 Коллекции
        </button>
      </div>

      <!-- ══════════════════════════════════════ -->
      <!--  DASHBOARD TAB                        -->
      <!-- ══════════════════════════════════════ -->
      <div v-if="activeTab === 'dashboard'">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-xl p-6 border border-border">
            <h3 class="text-sm font-body text-gray-400 uppercase tracking-wider">Товары</h3>
            <p class="font-heading text-4xl text-textMain mt-2">{{ stats.products }}</p>
          </div>
          <div class="bg-white rounded-xl p-6 border border-border">
            <h3 class="text-sm font-body text-gray-400 uppercase tracking-wider">Заказы</h3>
            <p class="font-heading text-4xl text-textMain mt-2">{{ stats.orders }}</p>
          </div>
          <div class="bg-white rounded-xl p-6 border border-border">
            <h3 class="text-sm font-body text-gray-400 uppercase tracking-wider">Пользователи</h3>
            <p class="font-heading text-4xl text-textMain mt-2">{{ stats.users }}</p>
          </div>
        </div>
      </div>

      <!-- ══════════════════════════════════════ -->
      <!--  PRODUCTS TAB                         -->
      <!-- ══════════════════════════════════════ -->
      <div v-if="activeTab === 'products'">
        <!-- Product editor (inline) -->
        <div v-if="editingProduct !== null || isNewProduct" class="bg-white rounded-xl border border-border p-6 mb-8">
          <h2 class="font-heading text-2xl text-textMain mb-6">{{ isNewProduct ? 'Добавить товар' : 'Редактировать товар' }}</h2>
          <form @submit.prevent="saveProduct" class="space-y-5 max-w-3xl">
            <div class="grid grid-cols-2 gap-5">
              <div>
                <label class="text-sm font-body text-gray-400 block mb-1">Название</label>
                <input v-model="productForm.name" class="w-full px-4 py-3 border border-border rounded-xl" required />
              </div>
              <div>
                <label class="text-sm font-body text-gray-400 block mb-1">Артикул</label>
                <input v-model="productForm.article" class="w-full px-4 py-3 border border-border rounded-xl" required />
              </div>
            </div>
            <div class="grid grid-cols-3 gap-5">
              <div>
                <label class="text-sm font-body text-gray-400 block mb-1">Цена (₽)</label>
                <input v-model.number="productForm.price" type="number" class="w-full px-4 py-3 border border-border rounded-xl" required />
              </div>
              <div>
                <label class="text-sm font-body text-gray-400 block mb-1">Категория</label>
                <select v-model="productForm.categoryId" class="w-full px-4 py-3 border border-border rounded-xl bg-white">
                  <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
                </select>
              </div>
              <div>
                <label class="text-sm font-body text-gray-400 block mb-1">Стиль</label>
                <select v-model="productForm.styleId" class="w-full px-4 py-3 border border-border rounded-xl bg-white">
                  <option v-for="s in styles" :key="s.id" :value="s.id">{{ s.name }}</option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-5">
              <div>
                <label class="text-sm font-body text-gray-400 block mb-1">Цвет</label>
                <select v-model="productForm.color" class="w-full px-4 py-3 border border-border rounded-xl bg-white">
                  <option v-for="c in colors" :key="c.id" :value="c.id">{{ c.name }}</option>
                </select>
              </div>
              <div>
                <label class="text-sm font-body text-gray-400 block mb-1">Главное изображение</label>
                <div v-if="productForm.image" class="mb-2">
                  <img :src="productForm.image" class="w-24 h-24 object-cover rounded-lg border border-border" />
                </div>
                <input type="file" accept="image/*" @change="uploadMainImage(($event.target as HTMLInputElement).files)" class="w-full px-4 py-3 border border-border rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white file:cursor-pointer" />
                <input v-model="productForm.image" placeholder="Или введите URL" class="w-full mt-2 px-4 py-3 border border-border rounded-xl" />
              </div>
            </div>

            <!-- Gallery Manager -->
            <div>
              <label class="text-sm font-body text-gray-400 block mb-2">Галерея изображений</label>
              <div class="space-y-3">
                <div v-for="(img, index) in productForm.images" :key="index" class="flex items-center gap-3 p-3 bg-white border border-border rounded-xl">
                  <img :src="img" class="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                  <span class="flex-1 text-sm font-body text-gray-500 truncate">{{ img }}</span>
                  <div class="flex gap-1 flex-shrink-0">
                    <button type="button" @click="moveImageUp(index)" :disabled="index === 0"
                      class="w-8 h-8 flex items-center justify-center border border-border rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer bg-white">
                      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>
                    </button>
                    <button type="button" @click="moveImageDown(index)" :disabled="index === productForm.images.length - 1"
                      class="w-8 h-8 flex items-center justify-center border border-border rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer bg-white">
                      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                    </button>
                    <button type="button" @click="removeImage(index)"
                      class="w-8 h-8 flex items-center justify-center border border-red-200 text-red-500 rounded-lg hover:bg-red-50 cursor-pointer bg-white">
                      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </div>
                </div>
              </div>
              <div class="flex gap-3 mt-3">
                <input type="file" multiple accept="image/*" @change="uploadImages(($event.target as HTMLInputElement).files)" class="flex-1 px-4 py-3 border border-border rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white file:cursor-pointer" />
                <div v-if="uploading" class="flex-shrink-0 flex items-center text-sm text-primary">Загрузка...</div>
              </div>
              <div class="flex gap-3 mt-2">
                <input v-model="newImageUrl" placeholder="Или введите URL вручную" class="flex-1 px-4 py-3 border border-border rounded-xl" @keyup.enter="addImageUrl" />
                <button type="button" @click="addImageUrl" class="px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 cursor-pointer border-none flex-shrink-0">Добавить</button>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <input type="checkbox" v-model="productForm.inStock" class="w-4 h-4" id="inStock" />
              <label for="inStock" class="text-sm font-body">В наличии</label>
            </div>
            <div>
              <label class="text-sm font-body text-gray-400 block mb-1">Описание</label>
              <textarea v-model="productForm.description" rows="4" class="w-full px-4 py-3 border border-border rounded-xl"></textarea>
            </div>
            <div>
              <label class="text-sm font-body text-gray-400 block mb-1">Характеристики</label>
              <textarea v-model="productForm.characteristics" rows="4" class="w-full px-4 py-3 border border-border rounded-xl"></textarea>
            </div>
            <div class="flex gap-4 pt-4">
              <button type="submit" :disabled="saving" class="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 cursor-pointer border-none">
                {{ saving ? 'Сохранение...' : 'Сохранить' }}
              </button>
              <button @click="cancelEdit" type="button" class="px-8 py-3 border border-border rounded-xl hover:bg-gray-50 cursor-pointer bg-white">Отмена</button>
            </div>
          </form>
        </div>

        <!-- Products table -->
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-heading text-2xl text-textMain">Все товары</h2>
          <button @click="startNewProduct" class="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors cursor-pointer border-none">
            + Добавить товар
          </button>
        </div>

        <div v-if="products.length === 0" class="text-center py-20 text-gray-400 bg-white rounded-xl border border-border">
          Нет товаров
        </div>

        <div v-else class="bg-white rounded-xl border border-border overflow-hidden">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left px-6 py-4 text-sm font-body text-gray-400">ID</th>
                <th class="text-left px-6 py-4 text-sm font-body text-gray-400">Название</th>
                <th class="text-left px-6 py-4 text-sm font-body text-gray-400">Артикул</th>
                <th class="text-left px-6 py-4 text-sm font-body text-gray-400">Цена</th>
                <th class="text-left px-6 py-4 text-sm font-body text-gray-400">Наличие</th>
                <th class="text-right px-6 py-4 text-sm font-body text-gray-400">Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in products" :key="p.id" class="border-t border-border hover:bg-gray-50">
                <td class="px-6 py-4 font-body text-sm">{{ p.id }}</td>
                <td class="px-6 py-4 font-body text-sm">{{ p.name }}</td>
                <td class="px-6 py-4 font-body text-sm text-gray-400">{{ p.article }}</td>
                <td class="px-6 py-4 font-body text-sm">{{ formatPrice(p.price) }} ₽</td>
                <td class="px-6 py-4">
                  <span :class="p.inStock ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'" class="px-3 py-1 rounded-full text-xs font-body">
                    {{ p.inStock ? 'В наличии' : 'Нет' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button @click="startEditProduct(p.id)" class="text-primary hover:underline text-sm mr-4 border-none bg-transparent cursor-pointer">Редактировать</button>
                  <button @click="deleteProduct(p.id)" class="text-red-500 hover:underline text-sm border-none bg-transparent cursor-pointer">Удалить</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ══════════════════════════════════════ -->
      <!--  ORDERS TAB                           -->
      <!-- ══════════════════════════════════════ -->
      <div v-if="activeTab === 'orders'">
        <h2 class="font-heading text-2xl text-textMain mb-6">Управление заказами</h2>

        <div v-if="orders.length === 0" class="text-center py-20 text-gray-400 bg-white rounded-xl border border-border">
          Нет заказов
        </div>

        <div v-else class="bg-white rounded-xl border border-border overflow-hidden">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left px-6 py-4 text-sm font-body text-gray-400">Заказ</th>
                <th class="text-left px-6 py-4 text-sm font-body text-gray-400">Клиент</th>
                <th class="text-left px-6 py-4 text-sm font-body text-gray-400">Сумма</th>
                <th class="text-left px-6 py-4 text-sm font-body text-gray-400">Статус</th>
                <th class="text-right px-6 py-4 text-sm font-body text-gray-400">Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order._id" class="border-t border-border hover:bg-gray-50">
                <td class="px-6 py-4">
                  <div class="font-body text-sm text-textMain">#{{ order._id?.slice(-6) }}</div>
                  <div class="text-xs text-gray-400">{{ new Date(order.createdAt).toLocaleDateString('ru-RU') }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="font-body text-sm text-textMain">{{ order.firstName }} {{ order.lastName }}</div>
                  <div class="text-xs text-gray-400">{{ order.phone }}</div>
                </td>
                <td class="px-6 py-4 font-body text-sm">{{ formatPrice(order.totalPrice) }} ₽</td>
                <td class="px-6 py-4">
                  <select :value="order.status" @change="updateOrderStatus(order._id, ($event.target as HTMLSelectElement).value)"
                          class="px-3 py-2 border border-border rounded-lg text-sm bg-white">
                    <option v-for="s in statusOptions" :key="s" :value="s">{{ statusLabels[s] }}</option>
                  </select>
                </td>
                <td class="px-6 py-4 text-right">
                  <button
                    @click="openOrderDetail(order)"
                    class="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primaryDark transition-colors cursor-pointer border-none"
                  >
                    Подробнее
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ══════════════════════════════════════ -->
      <!--  REVIEWS TAB                          -->
      <!-- ══════════════════════════════════════ -->
      <div v-if="activeTab === 'reviews'">
        <h2 class="font-heading text-2xl text-textMain mb-6">Управление отзывами</h2>

        <div v-if="reviews.length === 0" class="text-center py-20 text-gray-400 bg-white rounded-xl border border-border">
          Нет отзывов
        </div>

        <div v-else class="space-y-4">
          <div v-for="review in reviews" :key="review._id" class="bg-white rounded-xl border border-border p-6">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-3">
                <span class="font-body font-medium text-textMain">{{ review.userName || 'Аноним' }}</span>
                <span class="flex gap-1">
                  <span v-for="s in 5" :key="s" class="text-sm" :class="s <= review.rating ? 'text-amber-500' : 'text-gray-200'">★</span>
                </span>
              </div>
              <button @click="deleteReview(review._id)" class="text-red-500 hover:underline text-sm border-none bg-transparent cursor-pointer">Удалить</button>
            </div>
            <div class="text-sm text-gray-400 mb-2">Товар #{{ review.productId }}</div>
            <p class="font-body text-textMain">{{ review.text || 'Без текста' }}</p>
            <div class="text-xs text-gray-400 mt-2">{{ new Date(review.createdAt).toLocaleDateString('ru-RU') }}</div>
          </div>
        </div>
      </div>

      <!-- ══════════════════════════════════════ -->
      <!--  ORDER DETAIL TAB                     -->
      <!-- ══════════════════════════════════════ -->
      <div v-if="activeTab === 'order-detail' && selectedOrder" class="max-w-4xl">
        <!-- Back button -->
        <button
          @click="closeOrderDetail"
          class="mb-6 flex items-center gap-2 text-sm text-gray-400 hover:text-textMain transition-colors cursor-pointer border-none bg-transparent"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Назад к списку заказов
        </button>

        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="font-heading text-textMain text-2xl">Заказ #{{ selectedOrder._id?.slice(-6) }}</h2>
            <p class="font-body text-sm text-gray-400 mt-1">Создан {{ formatDate(selectedOrder.createdAt) }}</p>
          </div>
          <div class="flex items-center gap-3">
            <label class="text-sm font-body text-gray-400">Статус:</label>
            <select
              :value="selectedOrder.status"
              @change="updateOrderStatus(selectedOrder._id, ($event.target as HTMLSelectElement).value)"
              class="px-4 py-2 border border-border rounded-lg text-sm bg-white"
            >
              <option v-for="s in statusOptions" :key="s" :value="s">{{ statusLabels[s] }}</option>
            </select>
          </div>
        </div>

        <!-- Client info -->
        <section class="bg-white rounded-xl border border-border p-6 mb-6">
          <h3 class="font-heading text-textMain text-lg mb-4">👤 Данные клиента</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p class="text-[11px] uppercase tracking-widest text-gray-400 font-body">Имя</p>
              <p class="font-body text-textMain mt-1">{{ selectedOrder.firstName }}</p>
            </div>
            <div>
              <p class="text-[11px] uppercase tracking-widest text-gray-400 font-body">Фамилия</p>
              <p class="font-body text-textMain mt-1">{{ selectedOrder.lastName }}</p>
            </div>
            <div>
              <p class="text-[11px] uppercase tracking-widest text-gray-400 font-body">Телефон</p>
              <p class="font-body text-textMain mt-1">{{ selectedOrder.phone }}</p>
            </div>
            <div>
              <p class="text-[11px] uppercase tracking-widest text-gray-400 font-body">Email</p>
              <p class="font-body text-textMain mt-1">{{ selectedOrder.email }}</p>
            </div>
          </div>
          <div v-if="selectedOrder.userId" class="mt-4 pt-4 border-t border-border">
            <p class="text-[11px] uppercase tracking-widest text-gray-400 font-body">Авторизованный пользователь</p>
            <p class="font-body text-textMain mt-1">
              {{ (selectedOrder.userId as any)?.firstName }} {{ (selectedOrder.userId as any)?.lastName }} — {{ (selectedOrder.userId as any)?.phone }}
            </p>
          </div>
        </section>

        <!-- Delivery -->
        <section class="bg-white rounded-xl border border-border p-6 mb-6">
          <h3 class="font-heading text-textMain text-lg mb-4">🚚 Доставка</h3>
          <div>
            <p class="text-[11px] uppercase tracking-widest text-gray-400 font-body">Адрес</p>
            <p class="font-body text-textMain mt-1">{{ selectedOrder.deliveryAddress || '—' }}</p>
          </div>
          <div v-if="selectedOrder.comment" class="mt-4">
            <p class="text-[11px] uppercase tracking-widest text-gray-400 font-body">Комментарий</p>
            <p class="font-body text-textMain mt-1">{{ selectedOrder.comment }}</p>
          </div>
        </section>

        <!-- Order items -->
        <section class="bg-white rounded-xl border border-border p-6 mb-6">
          <h3 class="font-heading text-textMain text-lg mb-4">📦 Состав заказа</h3>
          <div class="space-y-4">
            <div
              v-for="item in selectedOrder.items"
              :key="item.article"
              class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
            >
              <div class="w-20 h-20 rounded-lg overflow-hidden border border-border flex-shrink-0 bg-white">
                <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="font-body font-medium text-textMain">{{ item.name }}</h4>
                <p class="text-xs text-gray-400 mt-0.5">Артикул: {{ item.article }}</p>
                <p v-if="item.colorName" class="text-xs text-gray-400">Цвет: {{ item.colorName }}</p>
                <div class="flex items-center gap-4 mt-2">
                  <span class="font-body text-sm text-textMain">{{ item.quantity }} × {{ formatPrice(item.price) }} ₽</span>
                  <span class="font-body text-sm font-medium text-primary">{{ formatPrice(item.price * item.quantity) }} ₽</span>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-6 pt-4 border-t border-border flex items-center justify-between">
            <span class="font-heading text-textMain text-lg">Итого</span>
            <span class="font-heading text-primary text-2xl">{{ formatPrice(selectedOrder.totalPrice) }} ₽</span>
          </div>
        </section>

        <!-- Timestamps -->
        <section class="bg-white rounded-xl border border-border p-6">
          <h3 class="font-heading text-textMain text-lg mb-4">🕐 Время</h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-[11px] uppercase tracking-widest text-gray-400 font-body">Создан</p>
              <p class="font-body text-textMain mt-1">{{ formatDate(selectedOrder.createdAt) }}</p>
            </div>
            <div>
              <p class="text-[11px] uppercase tracking-widest text-gray-400 font-body">Обновлён</p>
              <p class="font-body text-textMain mt-1">{{ formatDate(selectedOrder.updatedAt) }}</p>
            </div>
          </div>
        </section>
      </div>

      <!-- ══════════════════════════════════════ -->
      <!--  COLLECTIONS TAB                      -->
      <!-- ══════════════════════════════════════ -->
      <div v-if="activeTab === 'collections'">
        <!-- Collection editor (inline) -->
        <div v-if="editingCollection !== null || isNewCollection" class="bg-white rounded-xl border border-border p-6 mb-8">
          <h2 class="font-heading text-2xl text-textMain mb-6">{{ isNewCollection ? 'Добавить коллекцию' : 'Редактировать коллекцию' }}</h2>
          <form @submit.prevent="saveCollection" class="space-y-5 max-w-3xl">
            <div class="grid grid-cols-2 gap-5">
              <div>
                <label class="text-sm font-body text-gray-400 block mb-1">Название</label>
                <input v-model="collectionForm.name" class="w-full px-4 py-3 border border-border rounded-xl" required />
              </div>
              <div>
                <label class="text-sm font-body text-gray-400 block mb-1">Slug (url)</label>
                <input v-model="collectionForm.slug" class="w-full px-4 py-3 border border-border rounded-xl" required placeholder="living, bedroom..." />
              </div>
            </div>
            <div>
              <label class="text-sm font-body text-gray-400 block mb-1">Главное изображение (URL)</label>
              <div v-if="collectionForm.image" class="mb-2">
                <img :src="collectionForm.image" class="w-24 h-24 object-cover rounded-lg border border-border" />
              </div>
              <input v-model="collectionForm.image" placeholder="https://..." class="w-full px-4 py-3 border border-border rounded-xl" />
            </div>
            <div>
              <label class="text-sm font-body text-gray-400 block mb-1">Краткое описание</label>
              <textarea v-model="collectionForm.description" rows="2" class="w-full px-4 py-3 border border-border rounded-xl"></textarea>
            </div>
            <div>
              <label class="text-sm font-body text-gray-400 block mb-1">Полное описание</label>
              <textarea v-model="collectionForm.fullDescription" rows="4" class="w-full px-4 py-3 border border-border rounded-xl"></textarea>
            </div>

            <!-- Collection Items -->
            <div>
              <label class="text-sm font-body text-gray-400 block mb-2">Состав коллекции</label>
              <div v-for="(item, index) in collectionForm.items" :key="index" class="flex items-center gap-3 mb-3 p-4 bg-gray-50 border border-border rounded-xl">
                <div class="flex-1">
                  <label class="text-xs text-gray-400 block mb-1">Товар (ID)</label>
                  <select v-model.number="item.productId" class="w-full px-3 py-2 border border-border rounded-lg bg-white">
                    <option v-for="p in products" :key="p.id" :value="p.id">{{ p.name }} (ID: {{ p.id }})</option>
                  </select>
                </div>
                <div class="w-24">
                  <label class="text-xs text-gray-400 block mb-1">Количество</label>
                  <input v-model.number="item.quantity" type="number" min="1" class="w-full px-3 py-2 border border-border rounded-lg" />
                </div>
                <button type="button" @click="removeCollectionItem(index)" class="mt-5 w-8 h-8 flex items-center justify-center border border-red-200 text-red-500 rounded-lg hover:bg-red-50 cursor-pointer bg-white">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <button type="button" @click="addCollectionItem" class="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 cursor-pointer bg-transparent">+ Добавить товар</button>
            </div>

            <div>
              <label class="text-sm font-body text-gray-400 block mb-1">Скидка (%)</label>
              <input v-model.number="collectionForm.discount" type="number" min="0" max="100" class="w-32 px-4 py-3 border border-border rounded-xl" />
            </div>

            <!-- Price preview -->
            <div v-if="computedCollectionPrice > 0" class="p-4 bg-gray-50 border border-border rounded-xl">
              <div class="text-sm text-gray-400">Сумма товаров: <strong class="text-textMain">{{ formatPrice(computedCollectionPrice) }} ₽</strong></div>
              <div v-if="collectionForm.discount > 0" class="text-sm text-gray-400">
                Цена со скидкой: <strong class="text-primary">{{ formatPrice(Math.round(computedCollectionPrice * (1 - collectionForm.discount / 100))) }} ₽</strong>
              </div>
            </div>

            <div class="flex gap-4 pt-4">
              <button type="submit" :disabled="saving" class="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 cursor-pointer border-none">
                {{ saving ? 'Сохранение...' : 'Сохранить' }}
              </button>
              <button @click="cancelEditCollection" type="button" class="px-8 py-3 border border-border rounded-xl hover:bg-gray-50 cursor-pointer bg-white">Отмена</button>
            </div>
          </form>
        </div>

        <!-- Collections table -->
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-heading text-2xl text-textMain">Все коллекции</h2>
          <button @click="startNewCollection" class="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors cursor-pointer border-none">
            + Добавить коллекцию
          </button>
        </div>

        <div v-if="collections.length === 0" class="text-center py-20 text-gray-400 bg-white rounded-xl border border-border">
          Нет коллекций
        </div>

        <div v-else class="bg-white rounded-xl border border-border overflow-hidden">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left px-6 py-4 text-sm font-body text-gray-400">ID</th>
                <th class="text-left px-6 py-4 text-sm font-body text-gray-400">Название</th>
                <th class="text-left px-6 py-4 text-sm font-body text-gray-400">Товаров</th>
                <th class="text-left px-6 py-4 text-sm font-body text-gray-400">Цена</th>
                <th class="text-left px-6 py-4 text-sm font-body text-gray-400">Скидка</th>
                <th class="text-right px-6 py-4 text-sm font-body text-gray-400">Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="col in collections" :key="col.id" class="border-t border-border hover:bg-gray-50">
                <td class="px-6 py-4 font-body text-sm">{{ col.id }}</td>
                <td class="px-6 py-4 font-body text-sm">{{ col.name }}</td>
                <td class="px-6 py-4 font-body text-sm">{{ col.items?.length || 0 }}</td>
                <td class="px-6 py-4 font-body text-sm">{{ formatPrice(col.totalPrice || 0) }} ₽</td>
                <td class="px-6 py-4 font-body text-sm text-primary">{{ col.discount }}%</td>
                <td class="px-6 py-4 text-right">
                  <button @click="startEditCollection(col)" class="text-primary hover:underline text-sm mr-4 border-none bg-transparent cursor-pointer">Редактировать</button>
                  <button @click="deleteCollection(col)" class="text-red-500 hover:underline text-sm border-none bg-transparent cursor-pointer">Удалить</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>
