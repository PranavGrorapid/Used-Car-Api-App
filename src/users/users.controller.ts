import { NotFoundException,Controller,Post,Body,Param,Get,Query, Delete, Patch } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UserUpdateDto } from './dtos/users-update-dto';


@Controller('auth')
export class UsersController {

    constructor(private usersService:UsersService){}

    @Post('/signup')

    createUser(@Body() body:CreateUserDto){
   
         this.usersService.create(body.email,body.password)
    }

 @Get('/:id')

 async findUser(@Param('id') id:string){

     const User=  await this.usersService.findOne(parseInt(id))

     if(!User){

        return new NotFoundException('user not found')
     }

     return User
 }

@Get()

findAllUsers(@Query('email') email:string){

    return this.usersService.find(email)
}


@Delete('/:id')

removeUser(@Param('id') id:string){

    this.usersService.remove(parseInt(id))
}


@Patch('/:id')

updateUserById(@Param('id') id : string , @Body() body:UserUpdateDto){

     return this.usersService.update(parseInt(id),body)
}






}
