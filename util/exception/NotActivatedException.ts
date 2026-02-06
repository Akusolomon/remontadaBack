import { HttpStatus } from '@nestjs/common';
import { Exception } from './Exception';

export class NotActivatedException extends Exception {

  constructor(message: string) {
    super(message, HttpStatus.FAILED_DEPENDENCY)
  }

}