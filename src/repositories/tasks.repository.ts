import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from '../models/tasks.model';
import { CreateTaskDto, UpdateTaskDto } from '../dto/tasks.dto';
import { Op } from 'sequelize';

@Injectable()
export class TaskRepository {
    constructor(
        @InjectModel(Task)
        private taskModel: typeof Task,
    ) { }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskModel.create(createTaskDto);
    }

    async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
        if (Object.keys(updateTaskDto).length === 0)
            return this.taskModel.findByPk(id);
        const [affectedCount, Tasks] = await this.taskModel.update(updateTaskDto, { where: { id }, returning: true });
        return Tasks[0];
    }

    async achiveTask(id: number): Promise<number> {
        return this.taskModel.destroy({ where: { id }, truncate: true });
    }

    async deleteTask(id: number): Promise<number> {
        return this.taskModel.destroy({ where: { id }, force: true });
    }

    async deleteAllTasks(): Promise<number> {
        return this.taskModel.destroy({ where: {}, force: true });
    }

    async findTaskById(id: number): Promise<Task> {
        return this.taskModel.findByPk(id);
    }

    async findAllTasks(pageSize: number, offset: number, filter: any): Promise<Task[]> {
        return this.taskModel.findAll({ where: filter, limit: pageSize, offset: offset, order: [['createdAt', 'DESC']], paranoid: false });
    }
}
