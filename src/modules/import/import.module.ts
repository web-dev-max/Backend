import { Module } from '@nestjs/common';
import { ImportService } from './import.service';
import { ImportController } from './import.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/models/products.model';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Product])],
  controllers: [ImportController],
  providers: [ImportService],
})
export class ImportModule {}
