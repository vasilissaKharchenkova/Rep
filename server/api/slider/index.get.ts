import { defineEventHandler, createError } from 'h3'
import { connectDB } from '../../utils/mongoose'
import { Product } from '../../models/Product'
import { createCache } from '../../utils/cache'

const cache = createCache<any[]>(120000) // 2 minute TTL

export default defineEventHandler(async (event) => {
  await connectDB()

  const cacheKey = 'slider:products'
  const cached = cache.get(cacheKey)
  if (cached) return cached

  try {
    const products = await Product
      .find({ showOnSlider: true })
      .sort({ sliderPosition: 1 })
      .lean()

    cache.set(cacheKey, products)
    return products
  } catch (err) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to load slider products' })
  }
})
