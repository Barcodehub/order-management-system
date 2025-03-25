import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, OrderController.createOrder);
router.get('/', authMiddleware, OrderController.getOrders);
router.get('/:id', authMiddleware, OrderController.getOrder);

export default router;