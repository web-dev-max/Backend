import { Expose } from 'class-transformer';

export class ProductDto {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  description!: string;

  @Expose()
  price!: number;

  @Expose()
  amount!: number;

  @Expose()
  category?: string;

  @Expose()
  image?: string;
}
