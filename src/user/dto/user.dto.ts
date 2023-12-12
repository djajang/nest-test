import { IsEmail, IsString, IsNumber } from "class-validator"
import { PartialType } from "@nestjs/mapped-types";

export class createUserDto{

    @IsString()
    name: string
    
    @IsEmail()
    email: string

    @IsString()
    address: string

    @IsString()
    password: string

}

export class updateUserDto extends PartialType(createUserDto){}