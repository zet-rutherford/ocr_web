import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  SetMetadata,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
// import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @SetMetadata('role', ['admin'])
  @ApiQuery({ name: 'page' })
  @ApiQuery({ name: 'itemsPerPage' })
  @ApiQuery({ name: 'search' })
  @Get()
  findAll(@Query() query: FilterUserDto): Promise<User[]> {
    console.log(query);

    return this.userService.findAll(query);
  }

  @Get('profile')
  profile(@Req() req: any): Promise<User> {
    return this.userService.findOne(Number(req.userData.id));
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(Number(id));
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
  @SetMetadata('role', ['admin'])
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(Number(id), updateUserDto);
  }
  @SetMetadata('role', ['admin'])
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(Number(id));
  }
}
