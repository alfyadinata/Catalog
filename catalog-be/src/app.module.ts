import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
// import { CreateCategoryTable1717931877810 } from './migrations/1717931877810-CreateCategoryTable';
// import { CreateProductTable1717931914051 } from './migrations/1717931914051-CreateProductTable';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      password: process.env.POSTGRES_PASSWORD,
      username: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DATABASE,
      synchronize: false,
      logging: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // migrations: [
      //   CreateCategoryTable1717931877810,
      //   CreateProductTable1717931914051,
      // ],
    }),
    UserModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
