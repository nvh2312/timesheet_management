import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from '../dto/tasks.dto';
import { TaskService } from '../services/tasks.service';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../constant/enum';
import { RolesGuard } from '../guards/roles.guard';
import { JwtGuard } from '../guards/jwt.guard';

@Controller('tasks')
export class TaskController {
    constructor(private taskService: TaskService) { }

    @Get()
    findAllTasks(@Req() request: any) {
        return this.taskService.findAllTasks(request);
    }

    @Roles(Role.Admin)
    @UseGuards(JwtGuard, RolesGuard)
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.createTask(createTaskDto);
    }

    @Roles(Role.Admin)
    @UseGuards(JwtGuard, RolesGuard)
    @Delete()
    deleteAllTasks() {
        return this.taskService.deleteAllTasks();
    }

    @Roles(Role.Admin)
    @UseGuards(JwtGuard, RolesGuard)
    @Patch(':id')
    updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.updateTask(id, updateTaskDto);
    }

    @Roles(Role.Admin)
    @UseGuards(JwtGuard, RolesGuard)
    @Delete(':id')
    deleteTask(@Param('id') id: number) {
        return this.taskService.deleteTask(id);
    }

    @Get(':id')
    findTaskById(@Param('id') id: number) {
        return this.taskService.findTaskById(id);
    }

    @Roles(Role.Admin)
    @UseGuards(JwtGuard, RolesGuard)
    @Patch(':id/achieve')
    achiveTask(@Param('id') id: number) {
        return this.taskService.achiveTask(id);
    }

}
