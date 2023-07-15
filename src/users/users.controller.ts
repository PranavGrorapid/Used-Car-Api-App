import { NotFoundException,Controller,Post,Body,Param,Get,Query, Delete, Patch,UseInterceptors,ClassSerializerInterceptor, Session } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UserUpdateDto } from './dtos/users-update-dto';
import { serializeInterceptor } from 'src/interceptor/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class UsersController {

    constructor(
        
        private usersService:UsersService,
        private authService:AuthService
        
        ){}

    @Post('/signup')

     async createUser(@Body() body:CreateUserDto, @Session() Session:any){
   
    const user=await this.authService.SignUp (body.email,body.password)
    Session.userId=user.id
    return user;

    }

    @Get('/whoami')

    whoAmI(@Session() Session:any){

        return this.usersService.findOne(Session.userId)
    }

    @Post('/signout')

    signOut(@Session() Session:any){

        Session.userId=null;
    }

    
    @Post('/signin')

    async signin(@Body() body:CreateUserDto, @Session() Session:any){
   
      const user = await    this.authService.SignIn (body.email,body.password)
      return user;
    }


 @UseInterceptors( new serializeInterceptor(UserDto))
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
