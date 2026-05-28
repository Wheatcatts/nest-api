import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: 'Título é obrigatório' })
  @IsString({ message: 'Título deve ser uma string' })
  title: string;

  @IsNotEmpty({ message: 'Conteúdo é obrigatório' })
  @IsString({ message: 'Conteúdo deve ser uma string' })
  content: string;

  @IsNotEmpty({ message: 'userId é obrigatório' })
  @IsInt({ message: 'userId deve ser um número inteiro' })
  @IsPositive({ message: 'userId deve ser positivo' })
  userId: number;
}
