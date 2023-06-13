import { ConfigEnum } from './../enum/config.enum';
import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  @Get()
  getUsers(): any {
    return this.userService.findAll();
  }

  @Post()
  addUser(): any {
    const user = { username: 'muddyrain', password: '123456' } as User;
    return this.userService.create(user);
  }

  @Put()
  updateUser(): any {
    const user = { username: 'muddyrain', password: '123456789' } as User;
    return this.userService.update(1, user);
  }

  @Delete()
  deleteUser(): any {
    return this.userService.remove(1);
  }
}
