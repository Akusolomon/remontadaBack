import { UserService } from './../domain/user.service';
import { UserController } from './user.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [
        UserController, ],
  providers: [
        UserService, ],
})
export class UserModule {}
