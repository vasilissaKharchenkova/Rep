import mongoose, { Schema, Document } from 'mongoose'

export interface IQuestion extends Document {
  productId: number
  userId: mongoose.Types.ObjectId
  userName: string
  text: string
  answer?: string
  answeredAt?: Date
  createdAt: Date
  updatedAt: Date
}

const QuestionSchema = new Schema<IQuestion>(
  {
    productId: { type: Number, required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    text: { type: String, required: true },
    answer: { type: String, default: '' },
    answeredAt: { type: Date }
  },
  { timestamps: true }
)

export const Question = mongoose.model<IQuestion>('Question', QuestionSchema)