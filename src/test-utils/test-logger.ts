/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoggerService } from '@nestjs/common';

export class TestLogger implements LoggerService {
  log(message: string): void {
    //
  }
  error(message: string, trace: string): void {
    //
  }
  warn(message: string): void {
    //
  }
  debug(message: string): void {
    //
  }
  verbose(message: string): void {
    //
  }
}
