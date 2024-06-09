export class CreateProductDto {
  name: string;
  price: number;
  category_id: number;
}

export class UpdateProductDto {
  name?: string;
  price?: number;
  category_id?: number;
}
