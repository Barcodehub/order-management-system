import { Document, Types } from 'mongoose';

export interface IProductReference {
  _id: Types.ObjectId;
  name: string;
  price: number;
  description?: string;
}

export interface IOrderItem {
  product: Types.ObjectId | IProductReference;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  user: Types.ObjectId;
  items: IOrderItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}