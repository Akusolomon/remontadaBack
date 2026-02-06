import { IsNotEmpty, IsString } from "class-validator"

export class UserLoginDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    password: string
}