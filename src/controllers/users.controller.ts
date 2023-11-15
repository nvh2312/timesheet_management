import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dto/users.dto';
import { UserService } from '../services/users.service';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../constant/enum';
import { RolesGuard } from '../guards/roles.guard';
import { JwtGuard } from '../guards/jwt.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserResponseDto } from '../dto/auth.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    findAllUsers(@Req() request:any) {
        return this.userService.findAllUsers(request);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Delete()
    deleteAllUsers() {
        return this.userService.deleteAllUsers();
    }

    @UseGuards(JwtGuard)
    @Patch(':id')
    @Serialize(UserResponseDto)
    updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto, @Req() request: any) {
        const currentUser = request.user;
        return this.userService.updateUser(id, updateUserDto, currentUser);
    }
    @Roles(Role.Admin)
    @UseGuards(JwtGuard, RolesGuard)
    @Delete(':id')
    deleteUser(@Param('id') id: number) {
        return this.userService.deleteUser(id);
    }
    
    @Get(':id')
    findUserById(@Param('id') id: number) {
        return this.userService.findUserById(id);
    }

    @Get(':email')
    findUserByEmail(@Param('email') email: string) {
        return this.userService.findUserByEmail(email);
    }

}
