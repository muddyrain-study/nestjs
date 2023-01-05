import { Controller, Get, Req } from '@nestjs/common';
import { RangeService } from './range.service';
import { Request } from 'express';

@Controller('range')
export class RangeController {
  constructor(private rangeService: RangeService) {}
  @Get()
  getRange(@Req() req: Request): any {
    const { num } = req.query;
    return this.rangeService.getRange(Number(num || '0'));
  }
}
