import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { createUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req){
        return await this.authService.login(req.user);
    }

    @Post('register')
    async register(@Body() createUserDto:createUserDto){
        return await this.userService.create(createUserDto);
    }

    @UseGuards(RefreshJwtAuthGuard)
    @Post('refresh')
    async refresh(@Request() req){
        return await this.authService.refreshToken(req.user);
    }
}
