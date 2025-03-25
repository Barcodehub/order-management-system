import { Document } from 'mongoose';
import { UserRole } from '../models/user.model';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCreateRequest {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface IUserLoginRequest {
  email: string;
  password: string;
}

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}