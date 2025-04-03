import { Request, Response } from 'express';
import { ProductService } from '../services/productService';
import { ProductDTO } from '../dtos/product.dto';

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  // Cria um novo produto
  async createProduct(req: Request, res: Response): Promise<Response> {
    try {
      const productDto: ProductDTO = req.body;
      const newProduct = await this.productService.createProduct(productDto);
      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  // Lista todos os produtos com paginação
  async getAllProducts(req: Request, res: Response): Promise<Response> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await this.productService.getAllProducts(page, limit);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  // Obtém um produto pelo ID
  async getProductById(req: Request, res: Response): Promise<Response> {
    try {
      const productId = req.params.id;
      const product = await this.productService.getProductById(productId);
      return res.status(200).json(product);
    } catch (error) {
      return res.status(404).json({ message: (error as Error).message });
    }
  }

  // Atualiza um produto pelo ID
  async updateProduct(req: Request, res: Response): Promise<Response> {
    try {
      const productId = req.params.id;
      const productDto: ProductDTO = req.body;
      const updatedProduct = await this.productService.updateProduct(productId, productDto);
      return res.status(200).json(updatedProduct);
    } catch (error) {
      return res.status(404).json({ message: (error as Error).message });
    }
  }

  // Deleta um produto pelo ID
  async deleteProduct(req: Request, res: Response): Promise<Response> {
    try {
      const productId = req.params.id;
      await this.productService.deleteProduct(productId);
      return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      return res.status(404).json({ message: (error as Error).message });
    }
  }
}
