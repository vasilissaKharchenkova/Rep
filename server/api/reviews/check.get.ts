import { defineEventHandler, getQuery, createError } from 'h3'
import { connectDB } from '../../utils/mongoose'
import { Order } from '../../models/Order'
import { Review } from '../../models/Review'
import { extractAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const productId = Number(query.productId)

  if (!productId) {
    throw createError({ statusCode: 400, statusMessage: 'productId required' })
  }

  const auth = extractAuth(event)

  if (!auth) {
    return { canReview: false, hasReviewed: false, isLoggedIn: false }
  }

  await connectDB()

  // Check if user bought this product
  const order = await Order.findOne({
    userId: auth.userId,
    'items.productId': productId
  })

  // Check if user already reviewed
  const existingReview = await Review.findOne({
    productId,
    userId: auth.userId
  })

  return {
    canReview: !!order,
    hasReviewed: !!existingReview,
    isLoggedIn: true
  }
})