import { Schema, model, Document } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client'
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.CLIENT }
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);