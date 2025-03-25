import { Request, Response, NextFunction } from 'express';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dtos/order.dto';
import { AppError } from '../middlewares/error.middleware';

export class OrderController {
  static async createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }

      const orderData: CreateOrderDto = req.body;
      const order = await OrderService.createOrder(userId, orderData);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }

  static async getOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      const isAdmin = req.user?.role === 'admin';

      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }

      const orders = await OrderService.getOrders(userId, isAdmin);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }

  static async getOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      const isAdmin = req.user?.role === 'admin';

      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }

      const order = await OrderService.getOrderById(req.params.id, userId, isAdmin);
      if (!order) {
        throw new AppError('Order not found', 404);
      }
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
}