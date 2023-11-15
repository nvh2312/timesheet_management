import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TimeSheet } from '../models/timesheets.model';
import { CreateTimeSheetDto, UpdateTimeSheetDto } from '../dto/timesheets.dto';

@Injectable()
export class TimeSheetRepository {
    constructor(
        @InjectModel(TimeSheet)
        private timeSheetModel: typeof TimeSheet,
    ) { }

    async createTimeSheet(createTimeSheetDto: CreateTimeSheetDto): Promise<TimeSheet> {
        return this.timeSheetModel.create(createTimeSheetDto);
    }

    async updateTimeSheet(updateTimeSheetDto: UpdateTimeSheetDto, filter: any): Promise<TimeSheet[]> {
        const [affectedCount, TimeSheets] = await this.timeSheetModel.update(updateTimeSheetDto, { where: filter, returning: true });
        return TimeSheets;
    }

    async deleteTimeSheet(id: number): Promise<number> {
        return this.timeSheetModel.destroy({ where: { id } });
    }

    async deleteAllTimeSheets(): Promise<number> {
        return this.timeSheetModel.destroy();
    }

    async findTimeSheetById(id: number): Promise<TimeSheet> {
        return this.timeSheetModel.findByPk(id);
    }

    async findAllTimeSheets(pageSize: number, offset: number, filter: any): Promise<TimeSheet[]> {
        return this.timeSheetModel.findAll({ where: filter, limit: pageSize, offset: offset, order: [['date', 'DESC']] });
    }
}
