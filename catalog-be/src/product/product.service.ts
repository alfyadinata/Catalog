import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: any) {
    return this.productRepository.save({
      ...createProductDto,
      category_id: parseInt(createProductDto.category_id),
    });
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOne({ where: { id } });
  }

  update(id: number, updateProductDto: any) {
    return this.productRepository.update(id, {
      ...updateProductDto,
      category_id: parseInt(updateProductDto.category_id),
    });
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }
}
