import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CreateClientDto, UpdateClientDto } from '../dto/clients.dto';
import { ClientService } from '../services/clients.service';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../constant/enum';
import { RolesGuard } from '../guards/roles.guard';
import { JwtGuard } from '../guards/jwt.guard';

@Roles(Role.Admin)
@UseGuards(JwtGuard, RolesGuard)

@Controller('clients')
export class ClientController {
    constructor(private clientService: ClientService) { }

    @Get()
    findAllClients(@Req() request: any) {
        return this.clientService.findAllClients(request);
    }

    @Post()
    createClient(@Body() createClientDto: CreateClientDto) {
        return this.clientService.createClient(createClientDto);
    }

    @Delete()
    deleteAllClients() {
        return this.clientService.deleteAllClients();
    }

    @Patch(':id')
    updateClient(@Param('id') id: number, @Body() updateClientDto: UpdateClientDto) {
        return this.clientService.updateClient(id, updateClientDto);
    }

    @Delete(':id')
    deleteClient(@Param('id') id: number) {
        return this.clientService.deleteClient(id);
    }

    @Get(':id')
    findClientById(@Param('id') id: number) {
        return this.clientService.findClientById(id);
    }

    @Get(':email')
    findClientByEmail(@Param('email') email: string) {
        return this.clientService.findClientByEmail(email);
    }

}
