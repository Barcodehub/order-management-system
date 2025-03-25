import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { AppError } from './error.middleware';

declare module 'express' {
  interface Request {
    user?: {
      id: string;
      role: string;
    };
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new AppError('Authentication required', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as {
      id: string;
      role: string;
    };

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new AppError('User not found', 401);
    }

    req.user = {
      id: user.id,
      role: user.role
    };

    next();
  } catch (error) {
    next(error);
  }
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    next(new AppError('Admin access required', 403));
    return;
  }
  next();
};