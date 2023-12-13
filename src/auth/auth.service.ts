import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ){}

    async validateUser(username: string, password: string){
        const user = await this.userService.findOneWithUserName(username);
        if(user && (await bcrypt.compare(password, user.password))){
            const { password, ...result } = user;

            return result;
        }

        return null;
    }

    async login(user: User){
        
        const payload = {
            username: user.email,
            sub: {
                name: user.name,
            }
        }

        return {
            ...user,
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, { expiresIn: '60s' })
        }
    }

    async refreshToken(user: User){
        const payload = {
            username: user.email,
            sub: {
                name: user.name
            }
        }

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
