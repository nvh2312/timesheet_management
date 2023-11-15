import { IsNotEmpty, IsString, IsOptional, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateClientDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    name: string;
}

export class UpdateClientDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    email?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    name?: string;
}
