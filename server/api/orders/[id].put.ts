import { defineEventHandler, readBody, createError, getRouterParam } from 'h3'
import { connectDB } from '../../utils/mongoose'
import { Order } from '../../models/Order'
import { adminGuard } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  await adminGuard(event)
  await connectDB()

  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const order = await Order.findByIdAndUpdate(id, { $set: { status: body.status } }, { returnDocument: 'after' }).lean()

  if (!order) {
    throw createError({ statusCode: 404, statusMessage: 'Order not found' })
  }

  return order
})