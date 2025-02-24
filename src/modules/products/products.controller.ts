import { ProductsServices } from './products.service';
import { Controller, Get, Param } from '@nestjs/common';
import { ProductDto } from 'src/common/dto/products.dto';

@Controller('api')
export class ProductsController {
  constructor(private readonly productsServices: ProductsServices) {}

  @Get('products')
  async getAllProduct(): Promise<ProductDto[]> {
    return this.productsServices.getAllProducts();
  }

  @Get('/products/:id')
  async getProduct(@Param('id') id: string): Promise<ProductDto> {
    return this.productsServices.getProduct(Number(id));
  }
}
