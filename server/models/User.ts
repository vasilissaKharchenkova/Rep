import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  phone: string
  passwordHash: string
  lastName: string
  firstName: string
  middleName: string
  email: string
  city: string
  street: string
  apartment: string
  zipCode: string
  address: string
  comment: string
  newsletter: boolean
  isAdmin: boolean
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    phone: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    lastName: { type: String, default: '' },
    firstName: { type: String, default: '' },
    middleName: { type: String, default: '' },
    email: { type: String, default: '' },
    city: { type: String, default: '' },
    street: { type: String, default: '' },
    apartment: { type: String, default: '' },
    zipCode: { type: String, default: '' },
    address: { type: String, default: '' },
    comment: { type: String, default: '' },
    newsletter: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false }
  },
  { timestamps: true }
)

export const User = mongoose.model<IUser>('User', UserSchema)