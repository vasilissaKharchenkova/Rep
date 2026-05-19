import { defineEventHandler, createError } from 'h3'
import { connectDB } from '../../utils/mongoose'
import { User } from '../../models/User'
import { authGuard } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  await authGuard(event)
  await connectDB()

  const auth = event.context.auth
  const user = await User.findById(auth.userId).lean()

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
