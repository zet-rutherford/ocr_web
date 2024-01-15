import { IsNotEmpty } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  thumbnail: string;
  stauts: number;
  user: User;
  @IsNotEmpty()
  category: Category;
}
