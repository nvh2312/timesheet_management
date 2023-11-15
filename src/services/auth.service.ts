import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './users.service';
import { User } from '../models/users.model';
import { compare } from 'bcrypt';
import { CreateUserDto } from '../dto/users.dto';
import { AuthResponse, LoginDto, UserResponseDto } from '../dto/auth.dto';
import { JwtPayload } from '../interfaces/jwt-payload';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    signToken(user: User): string {
        const payload: JwtPayload = { userId: user.id, email: user.email, role: user.role };
        const accessToken = this.jwtService.sign(payload);
        return accessToken;
    }

    async signup(createUserDto: CreateUserDto): Promise<AuthResponse> {
        const user = await this.userService.createUser(createUserDto);
        const data = plainToInstance(UserResponseDto, user.dataValues, {
            excludeExtraneousValues: true,
        })
        const accessToken = this.signToken(user);
        return { user: data, accessToken };
    }

    async login(loginDto: LoginDto): Promise<AuthResponse> {
        const user = await this.userService.findUserByEmail(loginDto.email);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        const passwordMatch = await compare(loginDto.password, user.password);
        if (!passwordMatch) {
            throw new HttpException('Email or password is invalid', HttpStatus.UNAUTHORIZED);
        }
        const data = plainToInstance(UserResponseDto, user.dataValues, {
            excludeExtraneousValues: true,
        })
        const accessToken = this.signToken(user);
        return { user: data, accessToken };
    }

    async validateUserById(userId: number): Promise<User> {
        return this.userService.findUserById(userId);
    }

}
