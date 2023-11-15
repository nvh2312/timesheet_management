import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProjectUser } from '../models/projectUser.model';
import { CreateProjectUserDto } from '../dto/projectUsers.dto';

@Injectable()
export class ProjectUserRepository {
    constructor(
        @InjectModel(ProjectUser)
        private projectUserModel: typeof ProjectUser,
    ) { }

    async findOneProjectUser(userId: number, projectId: number): Promise<ProjectUser> {
        return this.projectUserModel.findOne({ where: { userId, projectId } });
    }

    async createProjectUser(createClientDto: CreateProjectUserDto): Promise<ProjectUser> {
        return this.projectUserModel.create(createClientDto);
    }

    async deleteProjectUser(userId: number, projectId: number): Promise<number> {
        return this.projectUserModel.destroy({ where: { userId, projectId } });
    }

    async deleteProjectUsers(projectId: number): Promise<number> {
        return this.projectUserModel.destroy({ where: { projectId } });
    }

    async deleteAllProjectUsers(): Promise<number> {
        // return this.ClientModel.destroy({ truncate: true });
        return this.projectUserModel.destroy({ where: {}, force: true });
    }

    async findProjectUsers(projectId: number, pageSize: number, offset: number): Promise<ProjectUser[]> {
        return this.projectUserModel.findAll({ where: { projectId }, limit: pageSize, offset: offset, order: [['createdAt', 'DESC']] });
    }

    async findAllProjectUsers(pageSize: number, offset: number): Promise<ProjectUser[]> {
        return this.projectUserModel.findAll({ limit: pageSize, offset: offset, order: [['createdAt', 'DESC']] });
    }

}
