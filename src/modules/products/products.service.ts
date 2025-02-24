import { Product } from 'src/models/products.model';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from 'src/common/dto/products.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProductsServices {
  constructor(
    @InjectRepository(Product)
    private readonly RepositoryProduct: Repository<Product>,
  ) {}

  async getAllProducts(): Promise<ProductDto[]> {
    const products = await this.RepositoryProduct.find();
    return plainToClass(ProductDto, products, { excludeExtraneousValues: true });
  }

  async getProduct(id: number): Promise<ProductDto> {
    const product = await this.RepositoryProduct.findOne({ where: { id } });

    if (!product) throw new Error(`Product with id ${id} not found`);

    return plainToClass(ProductDto, product, { excludeExtraneousValues: true });
  }

  async saveProduct(product: Partial<Product>): Promise<Product> {
    const savedProduct = await this.RepositoryProduct.save(product);
    return savedProduct;
  }
}
