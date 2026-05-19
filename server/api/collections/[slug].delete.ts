import { defineEventHandler, createError, getRouterParam } from 'h3'
import { connectDB } from '../../utils/mongoose'
import { Collection } from '../../models/Collection'
import { adminGuard } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  await adminGuard(event)
  await connectDB()

  const slug = getRouterParam(event, 'slug')
  const collection = await Collection.findOneAndDelete({ slug })

  if (!collection) {
    throw createError({ statusCode: 404, statusMessage: 'Collection not found' })
  }

  return { success: true }
})