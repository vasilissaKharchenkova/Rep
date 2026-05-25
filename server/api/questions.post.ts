import { defineEventHandler, readBody, createError } from 'h3'
import { connectDB } from '../utils/mongoose'
import { Question } from '../models/Question'
import { Product } from '../models/Product'
import { User } from '../models/User'
import { authGuard } from '../utils/auth'

export default defineEventHandler(async (event) => {
  await authGuard(event)
  await connectDB()

  const auth = event.context.auth
  const body = await readBody(event)

  if (!body.productId || !body.text) {
    throw createError({ statusCode: 400, statusMessage: 'productId and text are required' })
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

  const question = await Question.create({
    productId: body.productId,
    userId: auth.userId,
    userName: user.firstName || user.phone,
    text: body.text
  })

  // Increment questions count on the product
  await Product.findOneAndUpdate(
    { id: body.productId },
    { $inc: { questionsCount: 1 } }
  )

  return question.toObject()
})