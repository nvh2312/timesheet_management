import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProjectController } from '../controllers/projects.controller';
import { Project } from '../models/projects.model';
import { ProjectRepository } from '../repositories/projects.repository';
import { ProjectService } from '../services/projects.service';
import { ClientsModule } from './clients.module';

@Module({
    imports: [ClientsModule,SequelizeModule.forFeature([Project])],
    controllers: [ProjectController],
    providers: [ProjectRepository, ProjectService],
    exports: [ProjectService]
})
export class ProjectsModule { }
