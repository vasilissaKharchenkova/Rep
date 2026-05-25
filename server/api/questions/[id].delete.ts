import { defineEventHandler, createError, getRouterParam } from 'h3'
import { connectDB } from '../../utils/mongoose'
import { Question } from '../../models/Question'
import { Product } from '../../models/Product'
import { extractAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  await connectDB()

  const auth = extractAuth(event)
  if (!auth) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const id = getRouterParam(event, 'id')
  const question = await Question.findById(id)

  if (!question) {
    throw createError({ statusCode: 404, statusMessage: 'Question not found' })
  }

  // Only admin or the question author can delete
  if (String(question.userId) !== auth.userId && !auth.isAdmin) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  const productId = question.productId

  await Question.findByIdAndDelete(id)

  // Decrement questions count on the product
  await Product.findOneAndUpdate(
    { id: productId },
    { $inc: { questionsCount: -1 } }
  )

  return { success: true }
})