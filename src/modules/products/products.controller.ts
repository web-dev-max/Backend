import { Product } from 'src/models/products.model';
import { ProductsServices } from './products.service';
import { Controller, Get } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsServices: ProductsServices) {}

  @Get()
  async getAllProduct(): Promise<Product[]> {
    return this.productsServices.getAllProducts();
  }
}
