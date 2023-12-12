import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentService {
    
    async findUserComment(userId: string){
        return "this Comment user";
    }

}
