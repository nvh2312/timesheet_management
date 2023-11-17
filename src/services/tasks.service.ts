import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskRepository } from '../repositories/tasks.repository';
import { CreateTaskDto, UpdateTaskDto } from '../dto/tasks.dto';
import { Task } from '../models/tasks.model';
import { Op } from 'sequelize';
import { ProjectService } from './projects.service';

@Injectable()
export class TaskService {
    constructor(private taskRepository: TaskRepository, private projectService: ProjectService) { }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        // Check if project not exists, throw bad request
        const isExist = await this.projectService.findProjectById(createTaskDto.projectId);
        if (!isExist) throw new HttpException('Project not found', HttpStatus.BAD_REQUEST);
        // Create new Task for project
        return this.taskRepository.createTask(createTaskDto);
    }

    async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
        if (updateTaskDto.projectId) throw new HttpException('Cannot change project', HttpStatus.BAD_REQUEST);
        const Task = await this.taskRepository.updateTask(id, updateTaskDto);
        return Task;
    }

    async achiveTask(id: number): Promise<number> {
        return this.taskRepository.achiveTask(id);
    }

    async deleteTask(id: number): Promise<number> {
        return this.taskRepository.deleteTask(id);
    }

    async findTaskById(id: number): Promise<Task> {
        const Task = await this.taskRepository.findTaskById(id);
        return Task;
    }

    async findAllTasks(req: any): Promise<Task[]> {
        // Get page and page size from request query.
        const page = req.query?.page ?? 1;
        const pageSize = req.query?.limit ?? 5;
        const filter: any = {};
        // Add filter if request query include projectId||name||archive=true
        if (req.query?.projectId) {
            filter.projectId = req.query.projectId;
        }

        if (req.query?.name) {
            filter.name = req.query.name;
        }

        if (req.query?.achive) {
            filter.achiveAt = req.query?.achive == true ? {
                [Op.ne]: null
            } : null;
        }
        const offset = (page - 1) * pageSize;
        // Get list tasks with filter and paginate
        return this.taskRepository.findAllTasks(pageSize, offset, filter);
    }

    async deleteAllTasks(): Promise<Number> {
        return this.taskRepository.deleteAllTasks();
    }
}
