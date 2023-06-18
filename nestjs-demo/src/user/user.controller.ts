import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  LoggerService,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';
import { getUserDto } from './dto/getUser.dto';

@Controller('user')
export class UserController {
  // private logger = new Logger(UserController.name);
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    this.logger.log('User Controller Initialized11');
  }

  @Get('/:id')
  getUser(): any {
    return 'hello world';
  }

  @Get()
  getUsers(@Query() query: getUserDto): any {
    return this.userService.findAll(query);
  }

  @Post()
  addUser(@Body() dto: any): any {
    console.log(
      '🚀 ~ file: user.controller.ts:56 ~ UserController ~ addUser ~ dto:',
      dto,
    );

    const user = { username: 'muddyrain', password: '123456' } as User;
    return this.userService.create(user);
  }

  @Put('/:id')
  updateUser(@Body() dto: any, @Param('id') id: number): any {
    const user = { username: 'muddyrain', password: '123456789' } as User;
    return this.userService.update(1, user);
  }

  @Delete()
  deleteUser(): any {
    return this.userService.remove(1);
  }

  @Get('/profile')
  getUserProfile(): any {
    return this.userService.findProfile(2);
  }

  @Get('/logs')
  getUserLogs(): any {
    return this.userService.findUserLogs(2);
  }

  @Get('/logsByGroup')
  async getLogsByGroup(): Promise<any> {
    const res = await this.userService.findLogsByGroup(2);
    return res.map((item) => ({ result: item.result, count: item.count }));
  }
}
