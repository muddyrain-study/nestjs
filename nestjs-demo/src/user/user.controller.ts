import { ConfigEnum } from './../enum/config.enum';
import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  @Get()
  getUsers(): any {
    const data = this.configService.get('db');
    console.log(
      '🚀 ~ file: user.controller.ts:16 ~ UserController ~ getUsers ~ data:',
      data,
    );
    return this.userService.getUsers();
  }

  @Post()
  addUser(): any {
    return this.userService.addUser();
  }
}
