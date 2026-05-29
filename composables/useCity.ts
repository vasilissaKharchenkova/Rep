import { ref, onMounted } from 'vue'

export interface City {
  name: string
}

export const CITIES: City[] = [
  { name: 'Москва' },
  { name: 'Санкт-Петербург' },
  { name: 'Новосибирск' },
  { name: 'Екатеринбург' },
  { name: 'Казань' },
  { name: 'Нижний Новгород' },
  { name: 'Челябинск' },
  { name: 'Красноярск' },
  { name: 'Самара' },
  { name: 'Уфа' },
]

export const DEFAULT_CITY: City = { name: 'Москва' }

const selectedCity = ref<City>(DEFAULT_CITY)
const isOpen = ref(false)

function findCity(name: string): City {
  return CITIES.find(
    (city) => city.name.toLowerCase() === name.toLowerCase()
  ) ?? DEFAULT_CITY
}

function saveCity(city: City): void {
  if (process.client) {
    localStorage.setItem('clickwood_city', JSON.stringify(city))
  }
}

async function fetchCityByIP(): Promise<string | null> {
  try {
    const res = await fetch('https://ip-api.com/json')
    if (!res.ok) return null
    const data = await res.json()
    return data.city ?? null
  } catch {
    return null
  }
}

function loadCity(): void {
  if (process.client) {
    const saved = localStorage.getItem('clickwood_city')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed && parsed.name) {
          selectedCity.value = findCity(parsed.name)
          return
        }
      } catch {
        // invalid stored data, fall through to IP detection
      }
    }
    // No saved city — detect by IP
    fetchCityByIP().then((cityName) => {
      if (cityName) {
        const city = findCity(cityName)
        selectedCity.value = city
        saveCity(city)
      }
    })
  }
}

export const useCity = () => {
  onMounted(() => {
    loadCity()
  })

  function selectCity(city: City): void {
    selectedCity.value = city
    saveCity(city)
    isOpen.value = false
  }

  function toggleDropdown(): void {
    isOpen.value = !isOpen.value
  }

  function closeDropdown(): void {
    isOpen.value = false
  }

  return {
    selectedCity,
    isOpen,
    selectCity,
    toggleDropdown,
    closeDropdown,
  }
}