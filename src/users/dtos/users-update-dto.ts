import {IsString,IsOptional,IsEmail} from 'class-validator'

export class UserUpdateDto{


    @IsEmail()
    @IsOptional()

    email:string;

    @IsString()
    @IsOptional()

    password:string;

}