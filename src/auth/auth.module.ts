import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import authConfig from './config/auth.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(authConfig),
    TypeOrmModule.forFeature([User]),
  ],
})
export class AuthModule {}
