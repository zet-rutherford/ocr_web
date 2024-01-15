import { Post } from 'src/post/entities/post.entity';
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
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: null, nullable: true })
  refreshToken: string;

  @Column({ default: null, nullable: true })
  avatar: string;

  @Column({ default: 1 })
  status: number;

  @Column({ default: 'user' })
  role: string;

  @CreateDateColumn()
  createdAt: Date;
  @CreateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
