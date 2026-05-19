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

  const existing = await User.findOne({ phone: normalizedPhone })
  if (existing) {
    throw createError({ statusCode: 409, statusMessage: 'User with this phone already exists' })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await User.create({
    phone: normalizedPhone,
    passwordHash,
    firstName: body.firstName || '',
    lastName: body.lastName || ''
  })

  const token = signToken({ userId: String(user._id), isAdmin: user.isAdmin })

  return {
    token,
    user: {
      _id: user._id,
      phone: user.phone,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin
    }
  }
})