import { Inject, Injectable } from '@nestjs/common';
import { createUserDto, updateUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        ){}

    async findAll(){
        return await this.userRepo.find();
    }

    async findOne(id: number){
        return await this.userRepo.findOne({where: {id: id}});
    }

    async create(createUserDto: createUserDto){

        const user = this.userRepo.create(createUserDto);

        return await this.userRepo.save(user)
    }

    async update(id: number, updateUserDto: updateUserDto){
        return this.userRepo.update(id, updateUserDto);
    }

    async remove(id: number){
        return this.userRepo.delete(id);
    }

}
