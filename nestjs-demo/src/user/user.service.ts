import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Logs } from '../logs/logs.entity';
import { getUserDto } from './dto/getUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Logs) private readonly logsRepository: Repository<Logs>,
  ) {}

  async findAll(query: getUserDto) {
    return this.userRepository.find();
  }

  async find(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async create(user: User) {
    const userTmp = this.userRepository.create(user);
    return this.userRepository.save(userTmp);
  }
  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }
  async update(id: number, user: Partial<User>) {
    return this.userRepository.update(id, user);
  }

  async remove(id: number) {
    return this.userRepository.delete(id);
  }

  async findProfile(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        profile: true,
      },
    });
  }
  async findUserLogs(id: number) {
    const user = await this.findOne(id);
    return this.logsRepository.find({
      where: {
        user,
      },
      relations: {
        // user: true,
      },
    });
  }

  async findLogsByGroup(id: number) {
    // return this.logsRepository
    //   .createQueryBuilder('logs')
    //   .select('logs.result', 'result')
    //   .addSelect("COUNT('logs.result')", 'count')
    //   .leftJoinAndSelect('logs.user', 'users')
    //   .where('users.id = :id', { id })
    //   .groupBy('logs.result')
    //   .orderBy('result', 'DESC')
    //   .getRawMany();
    return this.logsRepository.query(`select * from logs`);
  }
}
