import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProjectUserRepository } from '../repositories/projectUsers.repository';
import { CreateProjectUserDto } from '../dto/projectUsers.dto';
import { ProjectUser } from '../models/projectUser.model';
import { UserService } from './users.service';
import { ProjectService } from './projects.service';

@Injectable()
export class ProjectUserService {
    constructor(private projectUser: ProjectUserRepository, private userService: UserService, private projectService: ProjectService) { }

    async createProjectUser(createProjectUser: CreateProjectUserDto): Promise<ProjectUser> {
        // Check if user or project not found or user-project is exists, throw bad request exception
        const { userId, projectId } = createProjectUser
        const promiseUser = this.userService.findUserById(userId);
        const promiseProject = this.projectService.findProjectById(projectId);
        const promiseExist = this.projectUser.findOneProjectUser(userId, projectId);
        const [user, project, isExist] = await Promise.all([promiseUser, promiseProject, promiseExist]);
        if (!user || !project || isExist) throw new HttpException('Invalid data', HttpStatus.CONFLICT);
        // Create new project-user
        return this.projectUser.createProjectUser(createProjectUser);
    }

    async deleteProjectUser(userId: number, projectId: number): Promise<number> {
        return this.projectUser.deleteProjectUser(userId, projectId);
    }

    async deleteProjectUsers(projectId: number): Promise<number> {
        return this.projectUser.deleteProjectUsers(projectId);
    }

    async deleteAllProjectUsers(): Promise<Number> {
        return this.projectUser.deleteAllProjectUsers();
    }

    async findProjectUsers(projectId: number, req: any): Promise<ProjectUser[]> {
        // Get page and pageSize from request query
        const page = req.query?.page ?? 1;
        const pageSize = req.query?.limit ?? 5;
        const offset = (page - 1) * pageSize;
        // Get list of members in project id with pagesize and offset
        const data = await this.projectUser.findProjectUsers(projectId, pageSize, offset);
        return data;
    }

    async findAllProjectUsers(req: any): Promise<ProjectUser[]> {
        // Get page and pageSize from request query
        const page = req.query?.page ?? 1;
        const pageSize = req.query?.limit ?? 5;
        const offset = (page - 1) * pageSize;
        // Get list of project members with pagesize and offset
        return this.projectUser.findAllProjectUsers(pageSize, offset);
    }
}
