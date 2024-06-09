import { DataSource } from 'typeorm';
import { Category } from './src/entities/category.entity';
import { Product } from './src/entities/product.entity';

export type DatabaseDialect = 'mysql' | 'mariadb' | 'postgres';

export const AppDataSource = new DataSource({
  type: (process.env.DATABASE_DIALECT || 'postgres') as DatabaseDialect,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DATABASE || 'catalog',
  synchronize: false,
  logging: true,
  entities: [Category, Product],
  migrations: ['src/migrations/*.ts'],
});
