import { defineEventHandler, createError, getRouterParam } from 'h3'
import { connectDB } from '../../utils/mongoose'
import { Review } from '../../models/Review'
import { extractAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  await connectDB()

  const auth = extractAuth(event)
  if (!auth) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const id = getRouterParam(event, 'id')
  const review = await Review.findById(id)

  if (!review) {
    throw createError({ statusCode: 404, statusMessage: 'Review not found' })
  }

  // Only admin or the review author can delete
  if (String(review.userId) !== auth.userId && !auth.isAdmin) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  const productId = review.productId
  await Review.findByIdAndDelete(id)

  // Recalculate product rating
  const stats = await Review.aggregate([
    { $match: { productId } },
    { $group: { _id: null, avgRating: { $avg: '$rating' }, count: { $sum: 1 } } }
  ])

  const { Product } = await import('../../models/Product')
  if (stats.length > 0) {
    await Product.findOneAndUpdate(
      { id: productId },
      { rating: Math.round(stats[0].avgRating * 10) / 10, reviewsCount: stats[0].count }
    )
  } else {
    await Product.findOneAndUpdate(
      { id: productId },
      { rating: 0, reviewsCount: 0 }
    )
  }

  return { success: true }
})