import mongoose, { Schema, Document } from 'mongoose'

export interface IProductColorVariant {
  name: string
  color: string
  image?: string
  images?: string[]
}

export interface IProduct extends Document {
  id: number
  name: string
  article: string
  price: number
  categoryId: string
  styleId: string
  color: string
  inStock: boolean
  image: string
  description?: string
  characteristics?: string
  images?: string[]
  colorVariants?: IProductColorVariant[]
  rating: number
  reviewsCount: number
  questionsCount: number
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    article: { type: String, required: true },
    price: { type: Number, required: true },
    categoryId: { type: String, required: true },
    styleId: { type: String, required: true },
    color: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    image: { type: String, default: '' },
    description: { type: String, default: '' },
    characteristics: { type: String, default: '' },
    images: [{ type: String }],
    colorVariants: [{ name: String, color: String, image: String, images: [String] }],
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    questionsCount: { type: Number, default: 0 }
  },
  { timestamps: true }
)

export const Product = mongoose.model<IProduct>('Product', ProductSchema)