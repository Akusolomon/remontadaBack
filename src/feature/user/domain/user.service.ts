/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { UserEntity } from '../data/model/UserEntity';
import { UserLoginDto } from '../data/dto/UserLoginDto';
import { ValidationException } from 'util/exception/ValidationException';

@Injectable()
export class UserService {
    async createUser(data: { name: string,password:string }) {
        await UserEntity.create(data);
        return {name: data.name };
    }
       async getUsers() {
        const users = await UserEntity.find().select("-password -isActive");
        return users;
    }
      async login(userloginDto: UserLoginDto) {
    const { name, password } = userloginDto;

    if (!name || !password) {
      throw new ValidationException(`name or Password Incorrect`);
    }

    const user: any = await UserEntity.findOne(
    { name: name }
    ).select('+password');
  
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new ValidationException(`name or Password incorrect`);
    }
    return user;
  }
}
