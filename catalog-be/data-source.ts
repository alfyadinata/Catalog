import { DataSource } from 'typeorm';
import { Category } from './src/entities/category.entity';
import { Product } from './src/entities/product.entity';
// import { CreateCategoryTable1717931877810 } from './src/migrations/1717931877810-CreateCategoryTable';
// import { CreateProductTable1717931914051 } from './src/migrations/1717931914051-CreateProductTable';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'catalog',
  synchronize: false,
  logging: true,
  entities: [Category, Product],
  //   migrations: [
  //     CreateCategoryTable1717931877810,
  //     CreateProductTable1717931914051,
  //   ],
  migrations: ['src/migrations/*.ts'],
});
