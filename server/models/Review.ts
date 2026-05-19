import mongoose, { Schema, Document } from 'mongoose'

export interface IReview extends Document {
  productId: number
  userId: mongoose.Types.ObjectId
  userName: string
  rating: number
  text: string
  createdAt: Date
  updatedAt: Date
}

const ReviewSchema = new Schema<IReview>(
  {
    productId: { type: Number, required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, default: '' }
  },
  { timestamps: true }
)

// One review per user per product
ReviewSchema.index({ productId: 1, userId: 1 }, { unique: true })

export const Review = mongoose.model<IReview>('Review', ReviewSchema)