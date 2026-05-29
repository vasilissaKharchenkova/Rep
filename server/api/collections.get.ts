import { defineEventHandler } from 'h3'
import { connectDB } from '../utils/mongoose'
import { Collection } from '../models/Collection'
import { Product } from '../models/Product'

export default defineEventHandler(async (event) => {
  await connectDB()

  const collections = await Collection.find().sort({ id: 1 }).lean()

  if (collections.length === 0) return []

  // Collect all product IDs from all collections
  const allProductIds = [...new Set(
    collections.flatMap(col => col.items.map((i: { productId: number }) => i.productId))
  )]

  // Single query for all products
  const products = await Product.find({ id: { $in: allProductIds } }).lean()
  const productsMap = new Map(products.map((p: any) => [p.id, p]))

  // Enrich each collection using the map
  const enriched = collections.map((col) => {
    let totalPrice = 0
    for (const item of col.items) {
      const product = productsMap.get(item.productId)
      if (product) {
        totalPrice += product.price * item.quantity
      }
    }
    const setPrice = Math.round(totalPrice * (1 - col.discount / 100))

    const colProducts = col.items
      .map((item: { productId: number }) => productsMap.get(item.productId))
      .filter(Boolean)

    return {
      ...col,
      products: colProducts,
      totalPrice,
      setPrice
    }
  })

  return enriched
})