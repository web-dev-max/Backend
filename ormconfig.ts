import { DataSource } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'your_username',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'your_database',
  entities: [path.join(__dirname, '/src/models/*.model.ts')],
  migrations: [path.join(__dirname, '/migration/*{.ts,.js}')],
  logging: true,
});
