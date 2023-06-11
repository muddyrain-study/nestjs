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
    const db = this.configService.get('db');
    const db_port = this.configService.get('db_port');
    console.log(
      '🚀 ~ file: user.controller.ts:17 ~ UserController ~ getUsers ~ db_port:',
      db_port,
    );
    console.log(
      '🚀 ~ file: user.controller.ts:16 ~ UserController ~ getUsers ~ db:',
      db,
    );
    return this.userService.getUsers();
  }

  @Post()
  addUser(): any {
    return this.userService.addUser();
  }
}
