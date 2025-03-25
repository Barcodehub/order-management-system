import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, adminMiddleware, ProductController.createProduct);
router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProduct);
router.put('/:id', authMiddleware, adminMiddleware, ProductController.updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, ProductController.deleteProduct);

export default router;