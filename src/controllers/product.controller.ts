import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { AppError } from '../middlewares/error.middleware';

export class ProductController {
  static async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productData: CreateProductDto = req.body;
      const product = await ProductService.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductService.getProducts();
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  static async getProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = await ProductService.getProductById(req.params.id);
      if (!product) {
        next(new AppError('Product not found', 404));
        return;
      }
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updateData: UpdateProductDto = req.body;
      const product = await ProductService.updateProduct(req.params.id, updateData);
      if (!product) {
        next(new AppError('Product not found', 404));
        return;
      }
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      await ProductService.deleteProduct(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}