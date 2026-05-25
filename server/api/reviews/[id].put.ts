import { defineEventHandler, createError, getRouterParam, readBody } from 'h3'
import { connectDB } from '../../utils/mongoose'
import { Review } from '../../models/Review'
import { Product } from '../../models/Product'
import { authGuard } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  await authGuard(event)
  await connectDB()

  const auth = event.context.auth
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!body.rating) {
    throw createError({ statusCode: 400, statusMessage: 'rating is required' })
  }

  const review = await Review.findById(id)
  if (!review) {
    throw createError({ statusCode: 404, statusMessage: 'Review not found' })
  }

  // Only the review author can edit
  if (String(review.userId) !== auth.userId) {
    throw createError({ statusCode: 403, statusMessage: 'Вы можете редактировать только свой отзыв' })
  }

  // Update review
  review.rating = body.rating
  review.text = body.text || ''
  await review.save()

  // Recalculate product rating
  const stats = await Review.aggregate([
    { $match: { productId: review.productId } },
    { $group: { _id: null, avgRating: { $avg: '$rating' }, count: { $sum: 1 } } }
  ])

  if (stats.length > 0) {
    await Product.findOneAndUpdate(
      { id: review.productId },
      { rating: Math.round(stats[0].avgRating * 10) / 10, reviewsCount: stats[0].count }
    )
  }

  return review.toObject()
})