import { Module } from '@nestjs/common';
import { RangeService } from './range.service';
import { RangeController } from './range.controller';

@Module({
  controllers: [RangeController],
  providers: [RangeService],
})
export class RangeModule {}
