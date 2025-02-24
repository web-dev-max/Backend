import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom } from 'rxjs';
import { IProduct } from '../../common/interface/product.interface';
import { AxiosError, AxiosResponse } from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/models/products.model';

@Injectable()
export class ImportService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async importProducts() {
    const { data }: AxiosResponse<IProduct[]> = await lastValueFrom(
      this.httpService.get<IProduct[]>('https://fakestoreapi.com/products').pipe(
        catchError((error: AxiosError) => {
          console.error(error.message);
          throw new Error('An error happened!');
        }),
      ),
    );

    const productsToSave = data.map((productApi) => ({
      id: productApi.id,
      name: productApi.title,
      description: productApi.description,
      price: productApi.price,
      amount: productApi.rating.count || 0,
      category: productApi.category,
      image: productApi.image,
    }));

    await this.productRepository.save(productsToSave);
  }
}
