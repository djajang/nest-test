import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { createUserDto, updateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { CommentService } from 'src/comment/comment.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly commentService: CommentService
    ){}

    @Get()
    async findAll(){
        return this.userService.findAll();
    }

    @Get(":id")
    async findOne(@Param('id') id: number) {
        return this.userService.findOne(id);
    }
    
    @Post()
    async create(@Body() body: createUserDto){
        return this.userService.create(body);
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id/comment")
    async getUserComment(@Param("id") id: string){
        return this.commentService.findUserComment(id);
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() updateUserDto: updateUserDto){
        return this.userService.update(id, updateUserDto);
    }

    @Delete(":id")
    async remove(@Param("id") id: number){
        return this.userService.remove(id);
    }
}
