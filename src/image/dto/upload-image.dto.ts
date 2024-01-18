import { User } from 'src/user/entities/user.entity';

export class UploadImageDto {
  filepath: string;
  user: User;
}
