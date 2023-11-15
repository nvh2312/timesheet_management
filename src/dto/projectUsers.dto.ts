import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateProjectUserDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    projectId: number;
}