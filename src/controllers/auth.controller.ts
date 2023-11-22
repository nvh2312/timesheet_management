// auth.controller.ts
import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/auth.dto';
import { CreateUserDto } from '../dto/users.dto';
import { ResponseMessage } from '../decorators/message.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.signup(createUserDto);
    }

    @Post('login')
    @HttpCode(201)
    @ResponseMessage('Login successfully')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
}
