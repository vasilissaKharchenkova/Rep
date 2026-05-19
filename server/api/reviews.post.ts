import { defineEventHandler, readBody, createError } from 'h3'
import { connectDB } from '../utils/mongoose'
import { Review } from '../models/Review'
import { Product } from '../models/Product'
import { User } from '../models/User'
import { authGuard } from '../utils/auth'

export default defineEventHandler(async (event) => {
  await authGuard(event)
  await connectDB()

  const auth = event.context.auth
  const body = await readBody(event)

  if (!body.productId || !body.rating) {
    throw createError({ statusCode: 400, statusMessage: 'productId and rating required' })
  }

  // Check product exists
  const product = await Product.findOne({ id: body.productId })
  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }

  const user = await User.findById(auth.userId)
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  // Upsert review
  const review = await Review.findOneAndUpdate(
    { productId: body.productId, userId: auth.userId },
    {
      productId: body.productId,
      userId: auth.userId,
      userName: user.firstName || user.phone,
      rating: body.rating,
      text: body.text || ''
    },
    { upsert: true, new: true }
  )

  // Recalculate product rating
  const stats = await Review.aggregate([
    { $match: { productId: body.productId } },
    { $group: { _id: null, avgRating: { $avg: '$rating' }, count: { $sum: 1 } } }
  ])

  if (stats.length > 0) {
    await Product.findOneAndUpdate(
      { id: body.productId },
      { rating: Math.round(stats[0].avgRating * 10) / 10, reviewsCount: stats[0].count }
    )
  }

  return review.toObject()
})