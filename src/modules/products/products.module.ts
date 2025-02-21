import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/models/products.model';
import { ProductsController } from './products.controller';
import { ProductsServices } from './products.service';
import { ProductsRepository } from './products.repository';
import { ImportService } from '../import/import.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsRepository, ProductsServices, ImportService],
})
export class ProductsModule {}
