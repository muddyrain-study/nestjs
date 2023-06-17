import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Logs } from './src/logs/logs.entity';
import { Roles } from './src/roles/roles.entity';
import { Profile } from './src/user/profile.entity';
import { User } from './src/user/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
export const connectionParams = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'mm001030',
  database: 'nest-study',
  entities: [User, Profile, Logs, Roles],
  // 同步本地 schema 与 数据库
  synchronize: true,
  // logging: process.env.NODE_ENV === 'development',
  logging: ['error'],
  retryDelay: 5000,
  retryAttempts: Infinity,
} as TypeOrmModuleOptions;

export default new DataSource({
  ...connectionParams,
  migrations: ['src/migrations/**'],
  subscribers: [],
} as DataSourceOptions);
