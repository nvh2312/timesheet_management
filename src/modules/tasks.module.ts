import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskController } from '../controllers/tasks.controller';
import { Task } from '../models/tasks.model';
import { TaskRepository } from '../repositories/tasks.repository';
import { TaskService } from '../services/tasks.service';
import { ProjectsModule } from './projects.module';

@Module({
    imports: [ProjectsModule, SequelizeModule.forFeature([Task])],
    controllers: [TaskController],
    providers: [TaskRepository, TaskService],
    exports: [TaskService]
})
export class TasksModule { }
