import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from '../models/projects.model';
import { CreateProjectDto, UpdateProjectDto } from '../dto/projects.dto';
import { Op } from 'sequelize';

@Injectable()
export class ProjectRepository {
    constructor(
        @InjectModel(Project)
        private projectModel: typeof Project,
    ) { }

    async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
        return this.projectModel.create(createProjectDto);
    }

    async updateProject(id: number, updateClientDto: UpdateProjectDto): Promise<Project> {
        if (Object.keys(updateClientDto).length === 0)
            return this.projectModel.findByPk(id);
        const [affectedCount, Clients] = await this.projectModel.update(updateClientDto, { where: { id }, returning: true });
        return Clients[0];
    }

    async deleteProject(id: number): Promise<number> {
        return this.projectModel.destroy({ where: { id } });
    }

    async findProjectById(id: number): Promise<Project> {
        return this.projectModel.findByPk(id);
    }

    async findAllProjects(pageSize: number, offset: number): Promise<Project[]> {
        return this.projectModel.findAll({
            limit: pageSize,
            offset: offset,
            order: [['createdAt', 'DESC']],
        });
    }

    async findAllHidden(): Promise<Project[]> {
        return this.projectModel.findAll({
            paranoid: false, where: {
                deletionDate: {
                    [Op.ne]: null
                },
            },
        });
    }

}