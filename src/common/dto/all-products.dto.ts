import { Expose } from 'class-transformer';

export class AllProductDto {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  price!: number;

  @Expose()
  category?: string;

  @Expose()
  image?: string;
}
