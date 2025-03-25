import { Order, IOrder, IOrderItem } from '../models/order.model';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { CreateOrderDto, OrderItemDto } from '../dtos/order.dto';
import { Types } from 'mongoose';

export class OrderService {
  static async createOrder(userId: string, orderData: CreateOrderDto): Promise<IOrder> {
    // Verify all products exist and have enough stock
    const items: IOrderItem[] = [];
    let total = 0;

    for (const item of orderData.items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product ${product.name}`);
      }

      items.push({
        product: product._id as Types.ObjectId,
        quantity: item.quantity,
        price: product.price
      });

      total += product.price * item.quantity;
    }

    // Create order
    const order = new Order({
      user: userId,
      items,
      total,
      status: 'pending'
    });

    // Save order and update product stock
    const session = await Order.startSession();
    session.startTransaction();

    try {
      await order.save({ session });

      for (const item of orderData.items) {
        await Product.findByIdAndUpdate(
          item.productId,
          { $inc: { stock: -item.quantity } },
          { session }
        );
      }

      await session.commitTransaction();
      session.endSession();

      return order;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  static async getOrders(userId: string, isAdmin: boolean): Promise<IOrder[]> {
    if (isAdmin) {
      return await Order.find().populate('user', 'name email');
    }
    return await Order.find({ user: userId }).populate('items.product', 'name price');
  }

  static async getOrderById(orderId: string, userId: string, isAdmin: boolean): Promise<IOrder | null> {
    const order = await Order.findById(orderId).populate('items.product', 'name price description');

    if (!order) {
      return null;
    }

    if (!isAdmin && order.user.toString() !== userId) {
      throw new Error('Unauthorized');
    }

    return order;
  }
}