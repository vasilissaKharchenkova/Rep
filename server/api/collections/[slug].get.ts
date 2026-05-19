import { defineEventHandler, createError, getRouterParam } from 'h3'
import { connectDB } from '../../utils/mongoose'
import { Collection } from '../../models/Collection'
import { Product } from '../../models/Product'

export default defineEventHandler(async (event) => {
  await connectDB()

  const slug = getRouterParam(event, 'slug')
  const collection = await Collection.findOne({ slug }).lean()

  if (!collection) {
    throw createError({ statusCode: 404, statusMessage: 'Collection not found' })
  }

  // Load referenced products and compute prices
  const productIds = collection.items.map((i: { productId: number }) => i.productId)
  const products = await Product.find({ id: { $in: productIds } }).lean()

  let totalPrice = 0
  for (const item of collection.items) {
    const product = products.find((p: any) => p.id === item.productId)
    if (product) {
      totalPrice += product.price * item.quantity
    }
  }
  const setPrice = Math.round(totalPrice * (1 - collection.discount / 100))

  return {
    ...collection,
    products,
    totalPrice,
    setPrice
  }
})