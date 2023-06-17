import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Logs } from '../logs/logs.entity';
import { resolve } from 'path';
console.log(resolve(__dirname, '../../logs/log.txt'));
@Module({
  imports: [TypeOrmModule.forFeature([User, Logs])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
