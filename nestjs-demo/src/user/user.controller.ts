import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  LoggerService,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';

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
  getUsers(): any {
    const user = {
      isAdmin: false,
    };
    if (!user.isAdmin) {
      throw new HttpException(
        'User is not admin ,Forbidden to access getAllUsers',
        HttpStatus.FORBIDDEN,
      );
    }
    this.logger.log('请求 user Controller 成功');
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
