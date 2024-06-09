export class CreateProductDto {
  name: string;
  price: number;
  categoryId: number;
}

export class UpdateProductDto {
  name?: string;
  price?: number;
  categoryId?: number;
}
