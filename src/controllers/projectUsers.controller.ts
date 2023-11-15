import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProjectUserDto } from '../dto/projectUsers.dto';
import { ProjectUserService } from '../services/projectUsers.service';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../constant/enum';
import { RolesGuard } from '../guards/roles.guard';
import { JwtGuard } from '../guards/jwt.guard';


@Controller('project-users')
export class ProjectUserController {
    constructor(private projectUserService: ProjectUserService) { }

    @Get()
    findAllProjectUsers(@Req() request: any) {
        return this.projectUserService.findAllProjectUsers(request);
    }

    @Roles(Role.Admin)
    @UseGuards(JwtGuard, RolesGuard)
    @Post()
    @UsePipes(new ValidationPipe())
    createProjectUser(@Body() createProjectUserDto: CreateProjectUserDto) {
        return this.projectUserService.createProjectUser(createProjectUserDto);
    }

    @Roles(Role.Admin)
    @UseGuards(JwtGuard, RolesGuard)
    @Delete()
    deleteAllClients() {
        return this.projectUserService.deleteAllProjectUsers();
    }

    @Get(':projectId')
    @UsePipes(new ValidationPipe())
    getProjectUsers(@Param('projectId') projectId: number, @Req() request: any) {
        return this.projectUserService.findProjectUsers(projectId, request);
    }

    @Roles(Role.Admin)
    @UseGuards(JwtGuard, RolesGuard)
    @Delete(':projectId')
    deleteProjectUsers(@Param('projectId') projectId: number) {
        return this.projectUserService.deleteProjectUsers(projectId);
    }

    @Roles(Role.Admin)
    @UseGuards(JwtGuard, RolesGuard)
    @Delete(':projectId/:userId')
    deleteProjectUser(@Param('projectId') projectId: number, @Param('userId') userId: number,) {
        return this.projectUserService.deleteProjectUser(userId, projectId);
    }
}
