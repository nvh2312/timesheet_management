import { IsEmail, IsNotEmpty, IsString, IsOptional, MinLength, MaxLength } from 'class-validator';
import { Role } from '../constant/enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(36)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  email?: string;
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(36)
  name?: string;

  @IsOptional()
  @IsString()
  role?: Role;
}
