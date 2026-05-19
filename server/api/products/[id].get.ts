import { defineEventHandler, createError, getRouterParam } from 'h3'
import { connectDB } from '../../utils/mongoose'
import { Product } from '../../models/Product'

export default defineEventHandler(async (event) => {
  await connectDB()

  const id = Number(getRouterParam(event, 'id'))
  const product = await Product.findOne({ id }).lean()

  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }

  return product
})