import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class ProductDTO {
  @IsString()
  @IsNotEmpty({ message: 'O campo name não pode estar vazio' })
  name?: string;

  @IsOptional()
  @IsNumber({}, { message: 'O campo price deve ser um número' })
  price?: number;

  @IsOptional()
  @IsString()
  description?: string;
}
