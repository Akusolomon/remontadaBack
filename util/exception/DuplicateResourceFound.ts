import { HttpStatus } from '@nestjs/common';
import { Exception } from './Exception';

export class DuplicateResouceFound extends Exception {

  constructor(message: string) {
    super(message, HttpStatus.CONFLICT)
  }

}