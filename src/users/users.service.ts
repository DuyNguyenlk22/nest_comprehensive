import {
  HttpException,
  HttpStatus,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { Profile } from 'src/profile/profile.entity';
import { ConfigService } from '@nestjs/config';
import { UserAlreadyExistsException } from 'src/CustomExceptions/user-already-exists.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,

    private readonly configService: ConfigService,
  ) {}

  public async getAllUsers() {
    try {
      return this.userRepository.find({
        relations: {
          profile: true,
        },
      });
    } catch {
      throw new RequestTimeoutException(
        'An error has ocurred , please try again later',
        {
          description: 'Could not connect to the database',
        },
      );
    }
  }

  public async createUser(userDto: CreateUserDto) {
    try {
      //Create a profile and save
      userDto.profile = userDto.profile ?? {};

      //Check if user with same username / email already exists
      const existingUserWithUsername = await this.userRepository.findOne({
        where: [{ username: userDto.username }],
      });

      if (existingUserWithUsername) {
        throw new UserAlreadyExistsException('username', userDto.username);
      }

      const existingUserWithEmail = await this.userRepository.findOne({
        where: [{ email: userDto.email }],
      });

      if (existingUserWithEmail) {
        throw new UserAlreadyExistsException('email', userDto.email);
      }

      //Create user object
      const user = this.userRepository.create(userDto);

      //Save the user object
      return await this.userRepository.save(user);
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 'ECONNREFUSED') {
        throw new RequestTimeoutException(
          'An error has ocurred , please try again later',
          {
            description: 'Could not connect to the database',
          },
        );
      }

      throw error;
    }
  }

  public async deteleUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    await this.userRepository.delete(id);

    if (user?.profile) {
      await this.profileRepository.delete(user.profile.id);
    }

    return { deleted: true };
  }

  public async findUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'The user with ID' + id + ' was not found',
          table: 'user',
        },
        HttpStatus.NOT_FOUND,
        {
          description:
            'The exception occured because a user with ID' +
            id +
            ' was not found in the database',
        },
      );
    }

    return user;
  }
}
