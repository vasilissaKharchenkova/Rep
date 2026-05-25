import { defineEventHandler, createError, getRouterParam, readBody } from 'h3'
import { connectDB } from '../../utils/mongoose'
import { Question } from '../../models/Question'
import { authGuard, extractAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  await connectDB()

  const auth = extractAuth(event)
  if (!auth) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const question = await Question.findById(id)
  if (!question) {
    throw createError({ statusCode: 404, statusMessage: 'Question not found' })
  }

  // Admin can answer; the author can edit their text
  if (!auth.isAdmin && String(question.userId) !== auth.userId) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  if (auth.isAdmin && body.answer !== undefined) {
    // Admin is answering
    question.answer = body.answer
    question.answeredAt = body.answer ? new Date() : undefined
  }

  // Author can edit the question text
  if (String(question.userId) === auth.userId && body.text !== undefined) {
    question.text = body.text
  }

  await question.save()
  return question.toObject()
})