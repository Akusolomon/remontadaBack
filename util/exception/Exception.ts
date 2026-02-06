import { HttpException } from "@nestjs/common";

export class Exception extends HttpException {

  constructor(public message: string, status: number){
    super(message, status)
  }

}