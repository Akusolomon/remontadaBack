import { HttpStatus } from '@nestjs/common';
import { Exception } from './Exception';

export class ValidationException extends Exception {

  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST)
  }
  
}