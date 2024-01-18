import { Image } from 'src/image/entities/image.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: null, nullable: true })
  refreshToken: string;

  @Column({ default: 'user' })
  role: string;

  @CreateDateColumn()
  createdAt: Date;
  @CreateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Image, (image) => image.user)
  images: Image[];
}
