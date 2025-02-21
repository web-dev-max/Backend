import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/models/products.model';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly ProductRepo: Repository<Product>,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.ProductRepo.find();
  }
}
