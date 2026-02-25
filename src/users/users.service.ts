import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { Profile } from 'src/profile/profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  getAllUsers() {
    return this.userRepository.find({
      relations: {
        profile: true,
      },
    });
  }

  public async createUser(userDto: CreateUserDto) {
    //Create a profile and save
    userDto.profile = userDto.profile ?? {};

    //Create user object
    const user = this.userRepository.create(userDto);

    //Save the user object
    return await this.userRepository.save(user);
  }

  public async deteleUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    await this.userRepository.delete(id);

    if (user?.profile) {
      await this.profileRepository.delete(user.profile.id);
    }

    return { deleted: true };
  }
}
