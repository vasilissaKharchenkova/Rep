import { defineEventHandler, createError, getHeader } from 'h3'
import jwt from 'jsonwebtoken'
import type { H3Event } from 'h3'

export interface AuthPayload {
  userId: string
  isAdmin: boolean
}

const getSecret = (): string => {
  return process.env.JWT_SECRET || 'clickwood-secret-key-change-in-production'
}

export function signToken(payload: AuthPayload): string {
  return jwt.sign(payload, getSecret(), { expiresIn: '7d' })
}

export function verifyToken(token: string): AuthPayload {
  return jwt.verify(token, getSecret()) as AuthPayload
}

export function extractAuth(event: H3Event): AuthPayload | null {
  const authHeader = getHeader(event, 'Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null

  try {
    const token = authHeader.slice(7)
    return verifyToken(token)
  } catch {
    return null
  }
}

export const authGuard = defineEventHandler(async (event: H3Event) => {
  const auth = extractAuth(event)
  if (!auth) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  event.context.auth = auth
})

export const adminGuard = defineEventHandler(async (event: H3Event) => {
  const auth = extractAuth(event)
  if (!auth) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  if (!auth.isAdmin) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }
  event.context.auth = auth
})