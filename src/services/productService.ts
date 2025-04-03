import { ProductDTO } from "../dtos/product.dto";
import { Product } from '../models/product.model';

export class ProductService {

  // Método para criar um novo produto
  async createProduct(productDto: ProductDTO): Promise<Product> {
    const product = new Product(productDto);
    return product.save();
  }

  // Método para obter todos os produtos com paginação
  async getAllProducts(page: number = 1, limit: number = 10): Promise<{ products: Product[], total: number }> {
    const skip = (page - 1) * limit;
    const products = await Product.find().skip(skip).limit(limit);
    const total = await Product.countDocuments();
    return { products, total };
  }

  // Método para obter um produto pelo ID
  async getProductById(productId: string): Promise<Product> {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  // Método para atualizar um produto pelo ID
  async updateProduct(productId: string, productDto: ProductDTO): Promise<Product> {
    const updatedProduct = await Product.findByIdAndUpdate(productId, productDto, { new: true });
    if (!updatedProduct) {
      throw new Error('Product not found');
    }
    return updatedProduct;
  }

  // Método para deletar um produto pelo ID
  async deleteProduct(productId: string): Promise<void> {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      throw new Error('Product not found');
    }
  }
}
