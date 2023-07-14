import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(email: string, password: string): Promise<User> {
    const user = this.repo.create({ email, password });
    return await this.repo.save(user);
  }


  findOne(id: number): Promise<User> {
    return this.repo.findOne({ where: { id } });
  }
  
 
 
  find(email: string): Promise<User[]> {
    return this.repo.find({ where: { email } });
  }
  
 
 
 async update(id:number, attrs:Partial<User>){

      const user= await this.findOne(id)

      if(!user){

        throw new NotFoundException ('user not found')
      }

      Object.assign(user,attrs)

      return this.repo.save(user);
 
  }
 
   async remove(id:number){

    const user= await this.findOne(id)

    if(!user){

      throw new NotFoundException ('user not found')
    }

    this.repo.remove(user)
 
  }
}