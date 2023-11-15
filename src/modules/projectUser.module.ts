import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProjectUser } from '../models/projectUser.model';
import { ProjectUserController } from '../controllers/projectUsers.controller';
import { ProjectUserService } from '../services/projectUsers.service';
import { ProjectUserRepository } from '../repositories/projectUsers.repository';
import { UsersModule } from './users.module';
import { ProjectsModule } from './projects.module';

@Module({
    imports: [UsersModule,ProjectsModule,SequelizeModule.forFeature([ProjectUser])],
    controllers: [ProjectUserController],
    providers: [ProjectUserService, ProjectUserRepository],
    exports: [ProjectUserService]
})
export class ProjectUsersModule { }
