import { defineEventHandler, readBody, createError } from 'h3'
import { connectDB } from '../../utils/mongoose'
import { User } from '../../models/User'
import { authGuard } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  await authGuard(event)
  await connectDB()

  const auth = event.context.auth
  const body = await readBody(event)

  // Allowed fields to update
  const allowedFields = [
    'firstName', 'lastName', 'middleName',
    'email', 'city', 'street', 'apartment', 'zipCode',
    'address', 'comment', 'newsletter'
  ]

  const updateData: any = {}
  for (const field of allowedFields) {
    if (body[field] !== undefined) {
      updateData[field] = body[field]
    }
  }

  const user = await User.findByIdAndUpdate(
    auth.userId,
    { $set: updateData },
    { returnDocument: 'after' }
  ).lean()

  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  const { passwordHash, ...userWithoutPassword } = user
  return {
    user: {
      ...userWithoutPassword,
      isAdmin: !!user.isAdmin
    }
  }
})