import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RangeModule } from './range/range.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import configuration from './configuration';

// const envFilePath = `.env.${process.env.NODE_ENV}`;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath,
      // load: [() => dotenv.config({ path: '.env' })],
      load: [configuration],
    }),
    UserModule,
    RangeModule,
  ],
  providers: [],
})
export class AppModule {}
