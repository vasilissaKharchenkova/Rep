import mongoose, { Schema, Document } from 'mongoose'

export interface ICollectionItem {
  productId: number
  quantity: number
}

export interface ICollection extends Document {
  id: number
  name: string
  slug: string
  description: string
  fullDescription: string
  image: string
  items: ICollectionItem[]
  discount: number
  createdAt: Date
  updatedAt: Date
}

const CollectionItemSchema = new Schema<ICollectionItem>(
  {
    productId: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 }
  },
  { _id: false }
)

const CollectionSchema = new Schema<ICollection>(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    fullDescription: { type: String, default: '' },
    image: { type: String, default: '' },
    items: [CollectionItemSchema],
    discount: { type: Number, default: 0, min: 0, max: 100 }
  },
  { timestamps: true }
)

export const Collection = mongoose.model<ICollection>('Collection', CollectionSchema)