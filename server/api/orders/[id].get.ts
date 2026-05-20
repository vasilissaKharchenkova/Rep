import { defineEventHandler, createError, getRouterParam } from 'h3'
import { connectDB } from '../../utils/mongoose'
import { Order } from '../../models/Order'
import { adminGuard } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  await adminGuard(event)
  await connectDB()

  const id = getRouterParam(event, 'id')

  const order = await Order.findById(id).populate('userId', 'phone firstName lastName').lean()

  if (!order) {
    throw createError({ statusCode: 404, statusMessage: 'Order not found' })
  }

  return order
})