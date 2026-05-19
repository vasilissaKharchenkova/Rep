import { defineEventHandler, readBody, createError } from 'h3'
import { connectDB } from '../utils/mongoose'
import { Order } from '../models/Order'
import { extractAuth } from '../utils/auth'

export default defineEventHandler(async (event) => {
  await connectDB()

  const auth = extractAuth(event)
  const body = await readBody(event)

  if (!body.items || body.items.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Cart is empty' })
  }

  const totalPrice = body.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)

  const orderData: any = {
    items: body.items,
    totalPrice,
    status: 'new',
    deliveryAddress: body.deliveryAddress || '',
    comment: body.comment || ''
  }

  // Attach userId only if user is authenticated
  if (auth) {
    orderData.userId = auth.userId
  }

  const order = await Order.create(orderData)

  return order.toObject()
})
