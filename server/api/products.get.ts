import { defineEventHandler, getQuery } from 'h3'
import { connectDB } from '../utils/mongoose'
import { Product } from '../models/Product'

export default defineEventHandler(async (event) => {
  await connectDB()

  const query = getQuery(event)
  const filter: any = {}

  if (query.category && query.category !== 'all') filter.categoryId = query.category
  if (query.style && query.style !== 'all') filter.styleId = query.style
  if (query.color && query.color !== 'all') filter.color = query.color
  if (query.inStock === 'true') filter.inStock = true

  if (query.priceMin || query.priceMax) {
    filter.price = {}
    if (query.priceMin) filter.price.$gte = Number(query.priceMin)
    if (query.priceMax) filter.price.$lte = Number(query.priceMax)
  }

  let sort: any = { id: 1 }
  if (query.sort === 'price-asc') sort = { price: 1 }
  else if (query.sort === 'price-desc') sort = { price: -1 }
  else if (query.sort === 'name') sort = { name: 1 }

  const products = await Product.find(filter).sort(sort).lean()
  return products
})