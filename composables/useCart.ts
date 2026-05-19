import { ref, computed, watch, onMounted } from 'vue'

export interface CartItem {
  id: number
  name: string
  article: string
  price: number
  quantity: number
  image: string
  colorName?: string
  colorClass?: string
}

const cart = ref<CartItem[]>([])

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
    const existingItem = cart.value.find(i => i.id === item.id && i.colorName === item.colorName)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.value.push({ ...item, quantity: 1 })
    }
    
    saveCart()
  }

  const removeItem = (id: number, colorName?: string) => {
    cart.value = cart.value.filter(item => item.id !== id || (colorName && item.colorName !== colorName))
    saveCart()
  }

  const updateQuantity = (id: number, quantity: number, colorName?: string) => {
    const item = cart.value.find(i => i.id === id && i.colorName === colorName)
    
    if (item) {
      if (quantity < 1) {
        removeItem(id, colorName)
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

  const submitOrder = async (deliveryAddress: string, comment: string) => {
    const { useAuth } = await import('./useAuth')
    const { authFetch } = useAuth()
    const order = await authFetch('/api/orders', {
      method: 'POST',
      body: { items: cart.value, deliveryAddress, comment }
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
    totalPrice
  }
}