import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

interface UserInfo {
  _id: string
  phone: string
  firstName: string
  lastName: string
  middleName?: string
  email?: string
  city?: string
  street?: string
  apartment?: string
  zipCode?: string
  address?: string
  comment?: string
  newsletter?: boolean
  isAdmin: boolean
}

const token = ref<string | null>(null)
const user = ref<UserInfo | null>(null)

// Initialize on module load — runs once regardless of refreshKey
if (process.client) {
  const saved = localStorage.getItem('auth_token')
  if (saved) {
    token.value = saved
  }
}

export const useAuth = () => {
  const router = useRouter()

  const isLoggedIn = computed(() => !!token.value)
  const isAdmin = computed(() => !!user.value?.isAdmin)

  const login = async (phone: string, password: string) => {
    const res: any = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { phone, password }
    })
    token.value = res.token
    user.value = res.user
    if (process.client) {
      localStorage.setItem('auth_token', res.token)
    }
    return res
  }

  const register = async (phone: string, password: string, firstName?: string, lastName?: string) => {
    const res: any = await $fetch('/api/auth/register', {
      method: 'POST',
      body: { phone, password, firstName, lastName }
    })
    token.value = res.token
    user.value = res.user
    if (process.client) {
      localStorage.setItem('auth_token', res.token)
    }
    return res
  }

  const logout = () => {
    token.value = null
    user.value = null
    if (process.client) {
      localStorage.removeItem('auth_token')
    }
  }

  const fetchMe = async (): Promise<void> => {
    if (!token.value) return
    try {
      const res: any = await $fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token.value}` }
      })
      user.value = res.user
    } catch {
      token.value = null
      user.value = null
      if (process.client) {
        localStorage.removeItem('auth_token')
      }
      router.push('/login')
    }
  }

  const authFetch = async <T = any>(url: string, options: any = {}): Promise<T> => {
    const headers = { ...options.headers }
    if (token.value) {
      headers.Authorization = `Bearer ${token.value}`
    }
    return await $fetch(url, { ...options, headers })
  }

  const updateProfile = async (data: Partial<UserInfo>): Promise<UserInfo> => {
    const res: any = await authFetch('/api/auth/profile', {
      method: 'PUT',
      body: data
    })
    user.value = res.user
    return res.user as UserInfo
  }

  return {
    token,
    user,
    isLoggedIn,
    isAdmin,
    login,
    register,
    logout,
    fetchMe,
    authFetch,
    updateProfile
  }
}
