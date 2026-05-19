import { defineEventHandler, readBody } from 'h3'
import { connectDB } from '../utils/mongoose'
import { Collection } from '../models/Collection'
import { adminGuard } from '../utils/auth'

export default defineEventHandler(async (event) => {
  await adminGuard(event)
  await connectDB()

  const body = await readBody(event)

  // Auto-generate id as max + 1
  const maxCollection = await Collection.findOne().sort({ id: -1 })
  const newId = maxCollection ? maxCollection.id + 1 : 1

  const collection = await Collection.create({
    ...body,
    id: newId,
    discount: body.discount || 0
  })

  return collection.toObject()
})