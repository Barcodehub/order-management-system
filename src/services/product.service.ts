import { Product, IProduct } from '../models/product.model';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';

export class ProductService {
  static async createProduct(productData: CreateProductDto): Promise<IProduct> {
    const product = new Product(productData);
    return await product.save();
  }

  static async getProducts(): Promise<IProduct[]> {
    return await Product.find();
  }

  static async getProductById(id: string): Promise<IProduct | null> {
    return await Product.findById(id);
  }

  static async updateProduct(id: string, updateData: UpdateProductDto): Promise<IProduct | null> {
    return await Product.findByIdAndUpdate(id, updateData, { new: true });
  }

  static async deleteProduct(id: string): Promise<void> {
    await Product.findByIdAndDelete(id);
  }
}