import {Injectable,BadRequestException,NotFoundException} from '@nestjs/common'
import {UsersService} from './users.service'
import {randomBytes,scrypt as _scrypt} from 'crypto'
import {promisify} from 'util'



const scrypt=promisify(_scrypt)


@Injectable()

export class AuthService {
    
    constructor( private usersService:UsersService){}


     async SignUp(email:string,password:string){

        const users= await this.usersService.find(email)

       if(users.length>0){

        throw new BadRequestException('email in use')
       }

       /// Generate a salt

       const salt=randomBytes(8).toString('hex')

       /// Hash the salt and the password together

       const hash=(await scrypt(password,salt,32)) as Buffer;

       /// join the hashed result and the salt together


       const result=salt + '.' + hash.toString('hex')

       // create a new user and save it

       const user=await this.usersService.create(email,result)

       // return the user


       return user;







     }



     async SignIn(email:string,password:string){


        const [user]= await this.usersService.find(email)


        if(!user){

            throw new NotFoundException('user not found')
        }

        const [salt,storedHash]=user.password.split('.');

        const hash=(await scrypt(password,salt,32)) as Buffer;

        if(storedHash!==hash.toString('hex')){

            throw new BadRequestException('password mismatch')
        }

        return user;

     }







}