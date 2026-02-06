import { HttpStatus } from '@nestjs/common';
import { Exception } from './Exception';

export class SuccessException extends Exception {

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(message: any) {
    super(message, HttpStatus.OK)
  }

}