import { ref, computed, watch, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

export interface CartItem {
  id: number
  name: string
  article: string
  price: number
  quantity: number
  image: string
  colorName?: string
  colorClass?: string
  originalPrice?: number
  collectionSlug?: string
}

const cart = ref<CartItem[]>([])

// ─── Notification state ──────────────────────
const notificationText = ref('')
const notificationVisible = ref(false)
const notificationType = ref<'success' | 'warning'>('success')
let notificationTimer: ReturnType<typeof setTimeout> | null = null

function showAddNotification(name: string) {
  if (notificationTimer) clearTimeout(notificationTimer)
  notificationText.value = `«${name}» добавлен в корзину`
  notificationType.value = 'success'
  notificationVisible.value = true
  notificationTimer = setTimeout(() => {
    notificationVisible.value = false
  }, 2500)
}

function showWarning(text: string) {
  if (notificationTimer) clearTimeout(notificationTimer)
  notificationText.value = text
  notificationType.value = 'warning'
  notificationVisible.value = true
  notificationTimer = setTimeout(() => {
    notificationVisible.value = false
  }, 3000)
}

export const useCart = () => {
  const loadCart = () => {
    if (process.client) {
      const savedCart = localStorage.getItem('clickwood_cart')
      if (savedCart) {
        try {
          cart.value = JSON.parse(savedCart)
        } catch (e) {
          cart.value = []
        }
      }
    }
  }

  const saveCart = () => {
    if (process.client) {
      localStorage.setItem('clickwood_cart', JSON.stringify(cart.value))
    }
  }

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    const existingItem = cart.value.find(i => i.id === item.id && i.colorName === item.colorName && i.collectionSlug === item.collectionSlug)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.value.push({ ...item, quantity: 1 })
    }
    
    saveCart()
    showAddNotification(item.name)
  }

  const removeItem = (id: number, colorName?: string, collectionSlug?: string) => {
    // Check if the item being removed belongs to a collection with discount
    const itemToRemove = cart.value.find(
      i => i.id === id && i.colorName === colorName && i.collectionSlug === collectionSlug
    )
    const hadCollectionDiscount = itemToRemove && itemToRemove.collectionSlug && itemToRemove.originalPrice && itemToRemove.originalPrice !== itemToRemove.price

    cart.value = cart.value.filter(item => 
      !(item.id === id && item.colorName === colorName && item.collectionSlug === collectionSlug)
    )

    // If removed item had a collection discount, remove discount from all other items of the same collection
    if (hadCollectionDiscount && collectionSlug) {
      cart.value.forEach(item => {
        if (item.collectionSlug === collectionSlug && item.originalPrice && item.originalPrice !== item.price) {
          item.price = item.originalPrice
          item.originalPrice = undefined
        }
      })
    }

    saveCart()
  }

  const updateQuantity = (id: number, quantity: number, colorName?: string, collectionSlug?: string) => {
    const item = cart.value.find(i => i.id === id && i.colorName === colorName && i.collectionSlug === collectionSlug)
    
    if (item) {
      if (quantity < 1) {
        removeItem(id, colorName, collectionSlug)
      } else {
        item.quantity = quantity
        saveCart()
      }
    }
  }

  const clearCart = () => {
    cart.value = []
    saveCart()
  }

  const submitOrder = async (
    items: CartItem[],
    deliveryAddress: string,
    comment: string,
    contact: { firstName: string; lastName: string; phone: string; email: string }
  ) => {
    const { authFetch } = useAuth()
    const mappedItems = items.map(item => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      article: item.article,
      colorName: item.colorName,
      colorClass: item.colorClass
    }))
    const order = await authFetch('/api/orders', {
      method: 'POST',
      body: { items: mappedItems, deliveryAddress, comment, ...contact }
    })
    clearCart()
    return order
  }

  const totalItems = computed(() => {
    return cart.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  })

  onMounted(() => {
    loadCart()
  })

  watch(cart, saveCart, { deep: true })

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    submitOrder,
    totalItems,
    totalPrice,
    notificationText,
    notificationVisible,
    notificationType,
    showWarning
  }
}