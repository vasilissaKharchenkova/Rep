import { defineEventHandler, getQuery } from 'h3'
import { connectDB } from '../utils/mongoose'
import { Order } from '../models/Order'
import { extractAuth } from '../utils/auth'

export default defineEventHandler(async (event) => {
  await connectDB()

  const auth = extractAuth(event)
  const query = getQuery(event)

  const filter: any = {}

  // If admin, can see all orders; otherwise only own orders
  if (!auth || !auth.isAdmin) {
    if (!auth) {
      filter.userId = 'none'
    } else {
      filter.userId = auth.userId
    }
  }

  if (query.status) {
    filter.status = query.status
  }

  const sort: any = { createdAt: -1 }
  const orders = await Order.find(filter).sort(sort).populate('userId', 'phone firstName lastName').lean()

  return orders
})
