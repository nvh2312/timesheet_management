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
        // Payload containing user information
        const payload: JwtPayload = { userId: user.id, email: user.email, role: user.role };
        // Sign payload to generate an access token
        const accessToken = this.jwtService.sign(payload);
        return accessToken;
    }

    async signup(createUserDto: CreateUserDto): Promise<AuthResponse> {
        // Create a new user
        const user = await this.userService.createUser(createUserDto);
        // Convert user data to a response DTO
        const data = plainToInstance(UserResponseDto, user.dataValues, {
            excludeExtraneousValues: true,
        })
        // Sign token for user
        const accessToken = this.signToken(user);
        return { user: data, accessToken };
    }

    async login(loginDto: LoginDto): Promise<AuthResponse> {
        // Find user by email
        const user = await this.userService.findUserByEmail(loginDto.email);
        // If user is not found, throw an unauthorized exception
        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }
        // Check if password matches
        const passwordMatch = await compare(loginDto.password, user.password);
        // If password does not match, throw an unauthorized exception
        if (!passwordMatch) {
            throw new HttpException('Email or password is invalid', HttpStatus.UNAUTHORIZED);
        }
        // Convert user data to a response DTO
        const data = plainToInstance(UserResponseDto, user.dataValues, {
            excludeExtraneousValues: true,
        })
        // Sign a token for user
        const accessToken = this.signToken(user);
        return { user: data, accessToken };
    }

    async validateUserById(userId: number): Promise<User> {
        return this.userService.findUserById(userId);
    }

}
