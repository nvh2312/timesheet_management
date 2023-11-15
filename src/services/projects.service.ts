import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProjectRepository } from '../repositories/projects.repository';
import { CreateProjectDto, UpdateProjectDto } from '../dto/projects.dto';
import { Project } from '../models/projects.model';
import { ClientRepository } from '../repositories/clients.repository';

@Injectable()
export class ProjectService {
    constructor(private ProjectRepository: ProjectRepository, private ClientRepository: ClientRepository) { }

    async createProject(CreateProjectDto: CreateProjectDto): Promise<Project> {
        const client = await this.ClientRepository.findClientById(CreateProjectDto.clientId);
        if (!client) throw new HttpException('Invalid Client', HttpStatus.BAD_REQUEST);
        return this.ProjectRepository.createProject(CreateProjectDto);
    }

    async updateProject(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
        if (updateProjectDto.clientId) throw new HttpException('Cannot change Client', HttpStatus.BAD_REQUEST);
        const Project = await this.ProjectRepository.updateProject(id, updateProjectDto);
        return Project;
    }

    async deleteProject(id: number): Promise<number> {
        return this.ProjectRepository.deleteProject(id);
    }


    async findProjectById(id: number): Promise<Project> {
        const Project = await this.ProjectRepository.findProjectById(id);
        return Project;
    }

    async findAllProjects(req: any): Promise<Project[]> {
        const page = req.query?.page ?? 1;
        const pageSize = req.query?.limit ?? 5;
        const offset = (page - 1) * pageSize;
        return this.ProjectRepository.findAllProjects(pageSize, offset);
    }

    async findAllHidden(): Promise<Project[]> {
        return this.ProjectRepository.findAllHidden();
    }

}
