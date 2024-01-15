import { Post } from 'src/post/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column({ type: 'int', default: 1 })
  status: number;

  @CreateDateColumn()
  createdAt: Date;
  @CreateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}
