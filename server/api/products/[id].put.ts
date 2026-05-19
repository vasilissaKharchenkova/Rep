import { defineEventHandler, readBody, createError, getRouterParam } from 'h3'
import { connectDB } from '../../utils/mongoose'
import { Product } from '../../models/Product'
import { adminGuard } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  await adminGuard(event)
  await connectDB()

  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)

  const product = await Product.findOneAndUpdate({ id }, { $set: body }, { returnDocument: 'after' }).lean()

  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }

  return product
})