import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import type { ConfigType } from '@nestjs/config';
import authConfig from './config/auth.config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
  ) {}

  async login(body: LoginDto) {
    console.log('log >>>', this.authConfiguration.sharedSecret);
    const user = await this.userRepository.findOneBy({
      email: body.email,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'Login successful',
      email: body.email,
      code: 200,
    };
  }
}
