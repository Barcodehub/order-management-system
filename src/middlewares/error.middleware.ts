import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.stack);

  const statusCode = err instanceof AppError ? err.statusCode : 500;
  
  res.status(statusCode).json({
    message: err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};