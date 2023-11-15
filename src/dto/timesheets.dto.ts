import { IsNotEmpty, IsString, IsOptional, IsEmail, MinLength, MaxLength, IsNumber, IsDate, IsInt, Min, Max, isString } from 'class-validator';
import { Status } from '../constant/enum';

export class CreateTimeSheetDto {
    @IsOptional()
    @IsNumber()
    userId: number

    @IsNotEmpty()
    @IsNumber()
    projectId: number

    @IsNotEmpty()
    @IsDate()
    date: Date

    @IsInt()
    @Min(0)
    @Max(15)
    hours_worked: number
}

export class UpdateTimeSheetDto {
    @IsOptional()
    @IsNumber()
    userId?: number

    @IsOptional()
    @IsNumber()
    projectId?: number

    @IsOptional()
    @IsDate()
    date?: Date

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(15)
    hours_worked?: number

    @IsOptional()
    @IsString()
    status?: Status
}

export class SubmitWeeklyTimeSheetDto {
    @IsNotEmpty()
    @IsDate()
    startDate: Date

    @IsNotEmpty()
    @IsDate()
    endDate: Date
}

export class ApprovedWeeklyTimeSheetDto {
    @IsNotEmpty()
    @IsDate()
    startDate: Date

    @IsNotEmpty()
    @IsDate()
    endDate: Date

    @IsNotEmpty()
    @IsNumber()
    userId: number
}