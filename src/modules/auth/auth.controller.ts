import { CreateUserDto } from 'src/common/dto/auth/create-auth';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginUserDto } from 'src/common/dto/auth/login-auth';
import { AuthGuard } from '@nestjs/passport';

@Controller('api')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authServices.postCreateUsers(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authServices.signIn(loginUserDto);
  }

  // @Get('profile')
  // @UseGuards(AuthGuard('jwt'))
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
