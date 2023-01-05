import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  getUsers(): any {
    return {
      code: 0,
      data: [],
      msg: '请求列表成功',
    };
  }
}
