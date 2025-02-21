import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/models/products.model';
import { IProduct } from '../../common/product.interface';
import { AxiosError, AxiosResponse } from 'axios';

@Injectable()
export class ImportService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async importProducts() {
    try {
      const response: AxiosResponse<IProduct[]> = await lastValueFrom(
        this.httpService.get('https://fakestoreapi.com/products'),
      );

      const productsData: IProduct[] = response.data;

      console.log(productsData);

      const productsToSave = productsData.map((productApi) => ({
        id: productApi.id,
        name: productApi.title,
        description: productApi.description,
        price: productApi.price,
        amount: productApi.rating.count || 0,
        category: productApi.category,
        image: productApi.image,
      }));

      // Сохраняем продукты в БД
      await this.productRepository.save(productsToSave);

      console.log('Продукты успешно импортированы!');
    } catch (error) {
      console.error('Ошибка при импорте продуктов:', error.message);
    }
  }
}
