import { defineEventHandler, createError, getRouterParam } from 'h3'
import { connectDB } from '../../utils/mongoose'
import { Product } from '../../models/Product'
import { adminGuard } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  await adminGuard(event)
  await connectDB()

  const id = Number(getRouterParam(event, 'id'))
  const product = await Product.findOneAndDelete({ id })

  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }

  return { success: true }
})