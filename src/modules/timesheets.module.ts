import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TimeSheetController } from '../controllers/timesheets.controller';
import { TimeSheet } from '../models/timesheets.model';
import { TimeSheetRepository } from '../repositories/timesheets.repository';
import { TimeSheetService } from '../services/timesheets.service';
import { ProjectsModule } from './projects.module';

@Module({
    imports: [ProjectsModule, SequelizeModule.forFeature([TimeSheet])],
    controllers: [TimeSheetController],
    providers: [TimeSheetService, TimeSheetRepository],
    exports: [TimeSheetService, TimeSheetRepository]
})
export class TimeSheetsModule { }
