import {
  Body,
  Controller,
  Post,
  SetMetadata,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  @SetMetadata('isPublic', true)
  register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    console.log('register api');
    console.log(registerUserDto);
    return this.authService.register(registerUserDto);
  }
  @Post('login')
  @SetMetadata('isPublic', true)
  @ApiResponse({ status: 201, description: 'Login successfully' })
  @ApiResponse({ status: 401, description: 'Invaid Login infomation' })
  @UsePipes(ValidationPipe)
  login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    console.log('login api');
    console.log(loginUserDto);
    return this.authService.login(loginUserDto);
  }
  @Post('refresh-token')
  @SetMetadata('isPublic', true)
  refreshToken(@Body() { refreshToken }): Promise<any> {
    console.log('refresh token api');
    return this.authService.refreshToken(refreshToken);
  }
}
