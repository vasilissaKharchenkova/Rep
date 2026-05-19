import { defineEventHandler, readBody, createError } from 'h3'
import { connectDB } from '../utils/mongoose'
import { Product } from '../models/Product'
import { adminGuard } from '../utils/auth'

export default defineEventHandler(async (event) => {
  await adminGuard(event)
  await connectDB()

  const body = await readBody(event)

  // Auto-generate id as max + 1
  const maxProduct = await Product.findOne().sort({ id: -1 })
  const newId = maxProduct ? maxProduct.id + 1 : 1

  const product = await Product.create({
    ...body,
    id: newId,
    rating: body.rating || 0,
    reviewsCount: body.reviewsCount || 0
  })

  return product.toObject()
})