import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserParamDto } from './dtos/get-user-param.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('{isMarried}')
  getUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Param() param: GetUserParamDto,
  ) {
    console.log(param);

    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    console.log('🚀 ~ UserController ~ createUser ~ user:', user);
    // this.userService.createUser(user);

    return `A new user has been created.`;
  }

  @Patch()
  updateUser(@Body() body: UpdateUserDto) {
    console.log('🚀 ~ UserController ~ updateUser ~ body:', body);
    return `A user has been updated.`;
  }
}
