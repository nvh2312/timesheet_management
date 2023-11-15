import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTimeSheetDto, UpdateTimeSheetDto, SubmitWeeklyTimeSheetDto, ApprovedWeeklyTimeSheetDto } from '../dto/timesheets.dto';
import { TimeSheetService } from '../services/timesheets.service';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../constant/enum';
import { RolesGuard } from '../guards/roles.guard';
import { JwtGuard } from '../guards/jwt.guard';
import { DateTransform } from '../interceptors/dateTransform.interceptor';

@Controller('timesheets')
@DateTransform()
export class TimeSheetController {
    constructor(private timeSheetService: TimeSheetService) { }

    @Roles(Role.Admin, Role.PM)
    @UseGuards(JwtGuard, RolesGuard)
    @Get()
    findAllTimeSheets(@Req() request: any) {
        return this.timeSheetService.findAllTimeSheets(request);
    }

    @UseGuards(JwtGuard)
    @Post()
    @UsePipes(new ValidationPipe())
    createTimeSheet(@Body() createTimeSheetDto: CreateTimeSheetDto, @Req() req: any) {
        return this.timeSheetService.createTimeSheet(createTimeSheetDto, req);
    }

    @Roles(Role.Admin)
    @UseGuards(JwtGuard, RolesGuard)
    @Delete()
    deleteAllTimeSheets() {
        return this.timeSheetService.deleteAllTimeSheets();
    }

    @UseGuards(JwtGuard)
    @Get('my-timesheet')
    getMyTimeSheet(@Req() req: any) {
        return this.timeSheetService.findMyTimeSheets(req);
    }

    @Roles(Role.PM)
    @UseGuards(JwtGuard, RolesGuard)
    @Get('pending-timesheet')
    getPendingTimeSheet(@Req() req: any) {
        return this.timeSheetService.findPendingTimeSheet(req);
    }

    @UseGuards(JwtGuard)
    @Patch('submit-timesheet')
    submitWeeklyTimeSheet(@Body() submitWeeklyTimesheet: SubmitWeeklyTimeSheetDto, @Req() req: any) {
        return this.timeSheetService.submitWeeklyTimeSheet(submitWeeklyTimesheet, req);
    }

    @Roles(Role.Admin, Role.PM)
    @UseGuards(JwtGuard, RolesGuard)
    @Patch('approved-timesheet')
    approvedWeeklyTimeSheet(@Body() approvedWeeklyTimesheet: ApprovedWeeklyTimeSheetDto, @Req() req: any) {
        return this.timeSheetService.approvedWeeklyTimeSheet(approvedWeeklyTimesheet, req);
    }

    @UseGuards(JwtGuard)
    @Patch(':id')
    @UsePipes(new ValidationPipe())
    updateTimeSheet(@Param('id') id: number, @Body() updateTimeSheetDto: UpdateTimeSheetDto, @Req() req: any) {
        return this.timeSheetService.updateTimeSheet(id, updateTimeSheetDto, req);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    deleteTimeSheet(@Param('id') id: number, @Req() req: any) {
        return this.timeSheetService.deleteTimeSheet(id, req);
    }

    @Get(':id')
    findTimeSheetById(@Param('id') id: number) {
        return this.timeSheetService.findTimeSheetById(id);
    }


}
