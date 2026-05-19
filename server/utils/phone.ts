export function normalizePhone(phone: string): string {
  // Remove everything except digits and leading '+'
  let cleaned = phone.replace(/[^\d+]/g, '')

  // If starts with 8, replace with +7
  if (cleaned.startsWith('8')) {
    cleaned = '+7' + cleaned.slice(1)
  }
  // If starts with 7 (but not +7), prepend +
  else if (cleaned.startsWith('7')) {
    cleaned = '+' + cleaned
  }
  // If doesn't start with +, add +7 as fallback
  else if (!cleaned.startsWith('+')) {
    cleaned = '+7' + cleaned
  }

  // Validate: must be exactly +7 + 10 digits = 12 characters
  if (!/^\+7\d{10}$/.test(cleaned)) {
    throw new Error('Неверный формат номера телефона. Введите российский номер в формате +7 (___) ___-__-__')
  }

  return cleaned
}
