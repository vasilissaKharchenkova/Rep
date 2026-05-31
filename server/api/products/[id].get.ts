import { defineEventHandler, createError, getRouterParam } from 'h3'
import { connectDB } from '../../utils/mongoose'
import { Product } from '../../models/Product'
import { createCache } from '../../utils/cache'

const cache = createCache<any>(120000) // 2 minute TTL

export default defineEventHandler(async (event) => {
  await connectDB()

  const id = Number(getRouterParam(event, 'id'))
  const cacheKey = `product:${id}`
  const cached = cache.get(cacheKey)
  if (cached) return cached

  const product = await Product.findOne({ id }).lean()

  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }

  cache.set(cacheKey, product)
  return product
})
