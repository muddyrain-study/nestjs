import { Injectable } from '@nestjs/common';

@Injectable()
export class RangeService {
  getRange(num: number) {
    if (num > 0) {
      return {
        data: Array.from({ length: num }).map((_, index) => String(index + 1)),
      };
    } else {
      return {
        data: [],
      };
    }
  }
}
