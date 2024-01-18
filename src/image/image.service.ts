import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Image } from './entities/image.entity';
import { UploadImageDto } from './dto/upload-image.dto';
import { FilterImageDto } from './dto/filter-image.dto';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Image) private imageRepository: Repository<Image>,
  ) {}
  async create(userId: number, uploadImageDto: UploadImageDto): Promise<Image> {
    const user = await this.userRepository.findOneBy({ id: userId });
    try {
      const res = await this.imageRepository.save({ ...uploadImageDto, user });
      return await this.imageRepository.findOneBy({ id: res.id });
    } catch (error) {
      throw new HttpException('Cannot upload image', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(query: FilterImageDto): Promise<any> {
    const itemsPerPage = Number(query.itemsPerPage) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * itemsPerPage;
    const [res, total] = await this.imageRepository.findAndCount({
      order: { createdAt: 'DESC' },
      take: itemsPerPage,
      skip: skip,
      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,
          name: true,
          email: true,
        },
      },
    });
    const lastPage = Math.ceil(total / itemsPerPage);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data: res,
      total,
      currentPage: page,
      nextPage,
      prevPage,
      lastPage,
    };
  }

  async findDetail(id: number): Promise<Image> {
    return await this.imageRepository.findOne({
      where: { id },
      relations: ['user'],
      select: {
        user: {
          id: true,
          name: true,
          email: true,
        },
      },
    });
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.imageRepository.delete(id);
  }
}
