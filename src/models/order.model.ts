import { Schema, model, Document, Types } from 'mongoose';
import { IProduct } from './product.model';
import { IUser } from './user.model';

export interface IOrderItem {
  product: Types.ObjectId | IProduct;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  user: Types.ObjectId | IUser;
  items: IOrderItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>({
  product: { 
    type: Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 }
});

const orderSchema = new Schema<IOrder>(
  {
    user: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    items: [orderItemSchema],
    total: { type: Number, required: true, min: 0 },
    status: { 
      type: String, 
      enum: ['pending', 'completed', 'cancelled'], 
      default: 'pending' 
    }
  },
  { timestamps: true }
);

export const Order = model<IOrder>('Order', orderSchema);