// user.controller.ts
import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerDto: any): Promise<User> {
    return this.userService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: any): Promise<{ token: string }> {
    console.log('contr loginDto', loginDto);
    const token = await this.userService.login(loginDto);
    return { token };
  }

  @Post('verify-token')
  async verifyToken(@Body() { token }: { token: string }): Promise<User> {
    const user = await this.userService.getUserFromToken(token);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }
}
