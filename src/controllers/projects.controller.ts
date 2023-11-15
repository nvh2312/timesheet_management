import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProjectDto, UpdateProjectDto } from '../dto/projects.dto';
import { ProjectService } from '../services/projects.service';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../constant/enum';
import { RolesGuard } from '../guards/roles.guard';
import { JwtGuard } from '../guards/jwt.guard';



@Controller('projects')
export class ProjectController {
    constructor(private ProjectService: ProjectService) { }

    @Get()
    findAllProjects(@Req() request: any) {
        return this.ProjectService.findAllProjects(request);
    }

    @Roles(Role.Admin)
    @UseGuards(JwtGuard, RolesGuard)
    @Post()
    @UsePipes(new ValidationPipe())
    createProject(@Body() createProjectDto: CreateProjectDto) {
        return this.ProjectService.createProject(createProjectDto);
    }

    @Roles(Role.Admin)
    @UseGuards(JwtGuard, RolesGuard)
    @Patch(':id')
    @UsePipes(new ValidationPipe())
    updateProject(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
        return this.ProjectService.updateProject(id, updateProjectDto);
    }

    @Roles(Role.Admin)
    @UseGuards(JwtGuard, RolesGuard)
    @Delete(':id')
    deleteProject(@Param('id') id: number) {
        return this.ProjectService.deleteProject(id);
    }

    @Get('get-hidden-projects')
    findHiddenProjects(@Param('id') id: number) {
        return this.ProjectService.findAllHidden();
    }

    @Get(':id')
    findProjectById(@Param('id') id: number) {
        return this.ProjectService.findProjectById(id);
    }

}
