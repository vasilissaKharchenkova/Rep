import { defineEventHandler, getQuery } from 'h3'
import { connectDB } from '../utils/mongoose'
import { Question } from '../models/Question'

export default defineEventHandler(async (event) => {
  await connectDB()

  const query = getQuery(event)

  const filter: any = {}
  if (query.productId) {
    filter.productId = Number(query.productId)
  }

  const questions = await Question.find(filter).sort({ createdAt: -1 }).lean()
  return questions
})