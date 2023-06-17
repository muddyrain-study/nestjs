import { LogEnum } from './../enum/config.enum';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import * as winston from 'winston';
import { WinstonModule, utilities } from 'nest-winston';
import { Console } from 'winston/lib/winston/transports';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const consoleTansPorts = new Console({
          level: 'info',
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike(),
          ),
        });

        const dailyTransport = new DailyRotateFile({
          level: 'warn',
          dirname: 'logs',
          filename: 'warn-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        });

        const dailyInfoTransport = new DailyRotateFile({
          level: config.get(LogEnum.LOG_LEVEL),
          dirname: 'logs',
          filename: 'info-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        });
        return {
          transports: [
            consoleTansPorts,
            ...(config.get(LogEnum.LOG_ON)
              ? [dailyTransport, dailyInfoTransport]
              : []),
          ],
        };
      },
    }),
  ],
})
export class LogsModule {}
