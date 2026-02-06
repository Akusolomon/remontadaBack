import { HttpStatus } from '@nestjs/common';
import { Exception } from './Exception';

export class SystemErrorException extends Exception {
  constructor(message?: string) {
    message = 'Something went wrong. Please try again later'
    super(message, HttpStatus.INTERNAL_SERVER_ERROR)
  }
}