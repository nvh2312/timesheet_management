import { IsNotEmpty, IsString, IsOptional, IsEmail, MinLength, MaxLength, IsNumber } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    @IsNumber()
    projectId: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    name: string;
}

export class UpdateTaskDto {
    @IsOptional()
    @IsNumber()
    projectId?: number;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    name?: string;
}
