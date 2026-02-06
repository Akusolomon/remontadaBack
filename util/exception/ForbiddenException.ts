import { HttpStatus } from '@nestjs/common';
import { Exception } from './Exception';

export class ForbiddenException extends Exception {

  constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN)
  }

}