import mongoose, { Schema, Document } from 'mongoose'

export interface IOrderItem {
  productId: number
  name: string
  price: number
  quantity: number
  image: string
  article: string
  colorName?: string
  colorClass?: string
}

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId
  items: IOrderItem[]
  totalPrice: number
  status: 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  deliveryAddress: string
  comment: string
  createdAt: Date
  updatedAt: Date
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    productId: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, default: '' },
    article: { type: String, required: true },
    colorName: { type: String },
    colorClass: { type: String }
  },
  { _id: false }
)

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [OrderItemSchema],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['new', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'new'
    },
    deliveryAddress: { type: String, default: '' },
    comment: { type: String, default: '' }
  },
  { timestamps: true }
)

export const Order = mongoose.model<IOrder>('Order', OrderSchema)