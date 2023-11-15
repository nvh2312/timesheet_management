import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientController } from '../controllers/clients.controller';
import { Client } from '../models/clients.model';
import { ClientRepository } from '../repositories/clients.repository';
import { ClientService } from '../services/clients.service';

@Module({
    imports: [SequelizeModule.forFeature([Client])],
    controllers: [ClientController],
    providers: [ClientRepository, ClientService],
    exports: [ClientService, ClientRepository]
})
export class ClientsModule { }
