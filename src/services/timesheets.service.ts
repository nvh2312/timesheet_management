import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TimeSheetRepository } from '../repositories/timesheets.repository';
import { ApprovedWeeklyTimeSheetDto, CreateTimeSheetDto, SubmitWeeklyTimeSheetDto, UpdateTimeSheetDto } from '../dto/timesheets.dto';
import { TimeSheet } from '../models/timesheets.model';
import { Op } from 'sequelize';
import { ProjectService } from './projects.service';
import { Role, Status } from '../constant/enum';

@Injectable()
export class TimeSheetService {
    constructor(private timeSheetRepository: TimeSheetRepository, private projectService: ProjectService) { }

    async getTimeSheetAndCheckOwner(timeSheetId: number, req: any): Promise<TimeSheet> {
        const timeSheet = await this.timeSheetRepository.findTimeSheetById(timeSheetId);
        if (!timeSheet) throw new HttpException('TimeSheet not found', HttpStatus.BAD_REQUEST);
        if (req.user.role !== Role.Admin && req.user.id !== timeSheet.userId) throw new HttpException('Not Permission', HttpStatus.BAD_REQUEST);
        return timeSheet;
    }

    async createTimeSheet(createTimeSheetDto: CreateTimeSheetDto, req: any): Promise<TimeSheet> {
        const isExist = await this.projectService.findProjectById(createTimeSheetDto.projectId);
        if (!isExist) throw new HttpException('Project not found', HttpStatus.BAD_REQUEST);
        createTimeSheetDto.userId = req.user.id;
        return this.timeSheetRepository.createTimeSheet(createTimeSheetDto);
    }

    async updateTimeSheet(id: number, updateTimeSheetDto: UpdateTimeSheetDto, req: any): Promise<TimeSheet> {
        const timeSheet = await this.getTimeSheetAndCheckOwner(id, req);
        if (!timeSheet) throw new HttpException('TimeSheet not found', HttpStatus.BAD_REQUEST);
        if (Object.keys(updateTimeSheetDto).length === 0)
            return timeSheet;
        if (updateTimeSheetDto.projectId) {
            const isExist = await this.projectService.findProjectById(updateTimeSheetDto.projectId);
            if (!isExist) throw new HttpException('Project not found', HttpStatus.BAD_REQUEST);
        }
        if (updateTimeSheetDto.status) throw new HttpException('Status only change by PM', HttpStatus.BAD_REQUEST);
        if (timeSheet.status === Status.APPROVED) throw new HttpException('This Timesheet has been approved by PM', HttpStatus.BAD_REQUEST);
        await timeSheet.update(updateTimeSheetDto);
        return timeSheet;
    }

    async submitWeeklyTimeSheet(submitWeeklyTimeSheet: SubmitWeeklyTimeSheetDto, req: any): Promise<TimeSheet[]> {
        const filter = {
            userId: req.user.id,
            date: {
                [Op.between]: [submitWeeklyTimeSheet.startDate, submitWeeklyTimeSheet.endDate]
            }
        }
        const updatedData: UpdateTimeSheetDto = {
            status: Status.PENDING
        }
        return this.timeSheetRepository.updateTimeSheet(updatedData, filter);
    }

    async approvedWeeklyTimeSheet(approvedWeeklyTimeSheet: ApprovedWeeklyTimeSheetDto, req: any): Promise<TimeSheet[]> {
        const filter = {
            userId: approvedWeeklyTimeSheet.userId,
            date: {
                [Op.between]: [approvedWeeklyTimeSheet.startDate, approvedWeeklyTimeSheet.endDate]
            },
            status: Status.PENDING
        }
        const updatedData: UpdateTimeSheetDto = {
            status: Status.APPROVED
        }
        return this.timeSheetRepository.updateTimeSheet(updatedData, filter);
    }

    async deleteTimeSheet(id: number, req: any): Promise<any> {
        const timeSheet = await this.getTimeSheetAndCheckOwner(id, req);
        if (timeSheet.status === Status.APPROVED) throw new HttpException('TimeSheet has been approved', HttpStatus.BAD_REQUEST);
        return await timeSheet.destroy();
    }

    async findTimeSheetById(id: number): Promise<TimeSheet> {
        const TimeSheet = await this.timeSheetRepository.findTimeSheetById(id);
        return TimeSheet;
    }

    async findPendingTimeSheet(req: any): Promise<TimeSheet[]> {
        const page = req.query?.page ?? 1;
        const pageSize = req.query?.limit ?? 7;
        const filter: any = {};
        if (req.query?.projectId) {
            filter.projectId = req.query.projectId;
        }

        if (req.query?.userId) {
            filter.userId = req.query.userId;
        }

        if (req.query?.startDate && req.query?.endDate) {
            filter.date = {
                [Op.between]: [req.query.startDate, req.query.endDate]
            };
        }
        filter.status = Status.PENDING;
        const offset = (page - 1) * pageSize;
        return this.timeSheetRepository.findAllTimeSheets(pageSize, offset, filter);
    }

    async findAllTimeSheets(req: any): Promise<TimeSheet[]> {
        const page = req.query?.page ?? 1;
        const pageSize = req.query?.limit ?? 7;
        const filter: any = {};
        if (req.query?.projectId) {
            filter.projectId = req.query.projectId;
        }

        if (req.query?.userId) {
            filter.userId = req.query.userId;
        }

        if (req.query?.status) {
            filter.status = req.query.status;
        }

        if (req.query?.startDate && req.query?.endDate) {
            filter.date = {
                [Op.between]: [req.query.startDate, req.query.endDate]
            };
        }
        const offset = (page - 1) * pageSize;
        return this.timeSheetRepository.findAllTimeSheets(pageSize, offset, filter);
    }

    async findMyTimeSheets(req: any): Promise<TimeSheet[]> {
        const page = req.query?.page ?? 1;
        const pageSize = req.query?.limit ?? 7;
        const filter: any = { userId: req.user.id };

        if (req.query?.startDate && req.query?.endDate) {
            filter.date = {
                [Op.between]: [req.query.startDate, req.query.endDate]
            };
        }
        const offset = (page - 1) * pageSize;
        return this.timeSheetRepository.findAllTimeSheets(pageSize, offset, filter);
    }

    async deleteAllTimeSheets(): Promise<Number> {
        return this.timeSheetRepository.deleteAllTimeSheets();
    }
}
