import { Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductCreateRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface IProductUpdateRequest {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}