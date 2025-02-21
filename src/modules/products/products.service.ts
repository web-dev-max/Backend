import { Product } from 'src/models/products.model';
import { ProductsRepository } from './products.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsServices {
  constructor(private readonly productsRepository: ProductsRepository) {}

  getAllProducts(): Promise<Product[]> {
    return this.productsRepository.getAll();
  }
}
