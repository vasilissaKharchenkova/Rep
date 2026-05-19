import mongoose from 'mongoose'

let cached: typeof mongoose | null = null

export async function connectDB(): Promise<typeof mongoose> {
  if (cached) return cached

  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/my_project'

  try {
    cached = await mongoose.connect(uri)
    console.log('MongoDB connected:', uri)
  } catch (err) {
    console.error('MongoDB connection error:', err)
    throw err
  }

  return cached
}