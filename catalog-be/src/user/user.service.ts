import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RegisterDto, LoginDto } from './auth-dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const mySecret = process.env.SECRET_JWT;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { username, password } = registerDto;

    // Check if user with the given username already exists
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new BadRequestException('User with this username already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }

  async login(loginDto: LoginDto): Promise<string> {
    const { username, password } = loginDto;

    // Find the user by username
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      mySecret,
      { expiresIn: '1h' },
    );
    return token;
  }

  async getUserFromToken(token: string): Promise<User> {
    try {
      const decodedToken = jwt.verify(token, mySecret) as {
        userId: number;
      };
      return this.userRepository.findOne({
        where: { id: decodedToken.userId },
      });
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }
  }
}
