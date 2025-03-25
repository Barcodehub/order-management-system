import { Document } from 'mongoose';
import { UserRole } from '../models/user.model';

export interface IAuthTokenPayload {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface IAuthRequest extends Request {
  user?: IAuthTokenPayload;
}