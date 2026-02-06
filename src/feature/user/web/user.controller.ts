/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { JwtService } from '@nestjs/jwt';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../domain/user.service';
import { AuthenticatedUser } from '../domain/AuthenticatedUser';
import { UserLoginDto } from '../data/dto/UserLoginDto';
import { JwtSign } from 'util/auth/jwt/JwtSign';
import { JwtAuthGuard } from 'util/auth/jwt/JwtAuthGuard';

@Controller('user')
export class UserController {
  jwtService: JwtService;

  constructor(private readonly userService: UserService) {
    this.jwtService = new JwtService({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIERS_IN,
      },
    });
  }

  @Post('add')
  createUser(@Body() body: { name: string; password: string }) {
    return this.userService.createUser(body);
  }
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() userLoginDto: UserLoginDto) {
    const userData = await this.userService.login(userLoginDto);
    let access_token;
    let user;
    if (userData) {
      access_token = new JwtSign(this.jwtService, {
        userId: userData.id,
        name: userData.name,
      }).execute();
      user = AuthenticatedUser.getInstance();
    }
    return { access_token, user };
  }
}
