import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './modules/products/products.module';
import { ImportModule } from './modules/import/import.module';
import { Product } from './models/products.model';
import { UserModel } from './models/user.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Product],
      synchronize: false,
      logging: true,
    }),
    ProductsModule,
    ImportModule,
    UserModel,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
