import { defineEventHandler, readBody, createError, getRouterParam } from 'h3'
import { connectDB } from '../../utils/mongoose'
import { Collection } from '../../models/Collection'
import { adminGuard } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  await adminGuard(event)
  await connectDB()

  const slug = getRouterParam(event, 'slug')
  const body = await readBody(event)

  const collection = await Collection.findOneAndUpdate(
    { slug },
    { $set: body },
    { returnDocument: 'after' }
  ).lean()

  if (!collection) {
    throw createError({ statusCode: 404, statusMessage: 'Collection not found' })
  }

  return collection
})