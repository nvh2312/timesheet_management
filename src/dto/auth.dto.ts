import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ModelType } from 'sequelize-typescript';
import { User } from '../models/users.model';
import { Role } from '../constant/enum';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UserResponseDto {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @Expose()
  @IsNotEmpty()
  @IsString()
  email: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsNotEmpty()
  role: Role;

  @Expose()
  @IsNotEmpty()
  @IsString()
  createdAt: string;
}

export class AuthResponse {
  @IsNotEmpty()
  user: UserResponseDto;

  @IsNotEmpty()
  @IsString()
  accessToken: string;
}
