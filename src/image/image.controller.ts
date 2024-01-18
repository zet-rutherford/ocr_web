import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Get,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'helpers/config';
import { AuthGuard } from 'src/auth/auth.guard';
import { extname } from 'path';
import { ApiTags } from '@nestjs/swagger';
import { ImageService } from './image.service';
import { UploadImageDto } from './dto/upload-image.dto';
import { Image } from './entities/image.entity';
import { FilterImageDto } from './dto/filter-image.dto';

@ApiTags('Images')
@Controller('images')
export class ImageController {
  constructor(private imageService: ImageService) {}
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: storageConfig('image'),
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname);
        const allowedExtArr = ['.jpg', '.png', '.jpeg'];
        if (!allowedExtArr.includes(ext)) {
          req.fileValidationError = `Wrong extension type. Accepted ${allowedExtArr.toString()}`;
          cb(null, false);
        } else {
          const fileSize = parseInt(req.headers['content-length']);
          if (fileSize > 1024 * 1024 * 5) {
            req.fileValidationError = `File too largre. Upload file less than 5MB`;
            cb(null, false);
          } else {
            cb(null, true);
          }
        }
      },
    }),
  )
  create(
    @Req() req: any,
    @Body() uploadImageDto: UploadImageDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(req['userData']);
    console.log(uploadImageDto);
    console.log(file);
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.imageService.create(req['userData'].id, {
      ...uploadImageDto,
      filepath: file.destination + '/' + file.filename,
    });
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query() query: FilterImageDto): Promise<any> {
    return this.imageService.findAll(query);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findDetail(@Param('id') id: string): Promise<Image> {
    return this.imageService.findDetail(Number(id));
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.imageService.delete(Number(id));
  }
}
