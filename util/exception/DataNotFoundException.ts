import { Exception } from './Exception';
import { HttpStatus } from '@nestjs/common';

export class DataNotFoundException extends Exception  {
  
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND)
  }
  
}
