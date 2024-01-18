import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { Image } from './entities/image.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User, Image])],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
