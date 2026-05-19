import { defineEventHandler } from 'h3'
import { connectDB } from '../utils/mongoose'
import { Collection } from '../models/Collection'
import { Product } from '../models/Product'

export default defineEventHandler(async (event) => {
  await connectDB()

  const collections = await Collection.find().sort({ id: 1 }).lean()

  // For each collection, load the referenced products and compute prices
  const enriched = await Promise.all(
    collections.map(async (col) => {
      const productIds = col.items.map((i: { productId: number }) => i.productId)
      const products = await Product.find({ id: { $in: productIds } }).lean()

      let totalPrice = 0
      for (const item of col.items) {
        const product = products.find((p: any) => p.id === item.productId)
        if (product) {
          totalPrice += product.price * item.quantity
        }
      }
      const setPrice = Math.round(totalPrice * (1 - col.discount / 100))

      return {
        ...col,
        products,
        totalPrice,
        setPrice
      }
    })
  )

  return enriched
})