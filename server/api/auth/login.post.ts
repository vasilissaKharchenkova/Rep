import { defineEventHandler, readBody, createError } from 'h3'
import bcrypt from 'bcrypt'
import { connectDB } from '../../utils/mongoose'
import { User } from '../../models/User'
import { signToken } from '../../utils/auth'
import { normalizePhone } from '../../utils/phone'

export default defineEventHandler(async (event) => {
  await connectDB()

  const body = await readBody(event)
  const { phone, password } = body

  if (!phone || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Phone and password required' })
  }

  let normalizedPhone: string
  try {
    normalizedPhone = normalizePhone(phone)
  } catch (e: any) {
    throw createError({ statusCode: 400, statusMessage: e.message || 'Неверный формат телефона' })
  }

  const user = await User.findOne({ phone: normalizedPhone })
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  const match = await bcrypt.compare(password, user.passwordHash)
  if (!match) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }

  const token = signToken({ userId: String(user._id), isAdmin: user.isAdmin })

  return {
    token,
    user: {
      _id: user._id,
      phone: user.phone,
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      address: user.address,
      comment: user.comment,
      newsletter: user.newsletter,
      isAdmin: user.isAdmin
    }
  }
})