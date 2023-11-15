import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from '../models/clients.model';
import { CreateClientDto, UpdateClientDto } from '../dto/clients.dto';

@Injectable()
export class ClientRepository {
    constructor(
        @InjectModel(Client)
        private clientModel: typeof Client,
    ) { }

    async createClient(createClientDto: CreateClientDto): Promise<Client> {
        return this.clientModel.create(createClientDto);
    }

    async updateClient(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
        if (Object.keys(updateClientDto).length === 0)
            return this.clientModel.findByPk(id);
        const [affectedCount, Clients] = await this.clientModel.update(updateClientDto, { where: { id }, returning: true });
        return Clients[0];
    }

    async deleteClient(id: number): Promise<number> {
        return this.clientModel.destroy({ where: { id } });
    }

    async deleteAllClients(): Promise<number> {
        // return this.clientModel.destroy({ truncate: true });
        return this.clientModel.destroy({ where: {}, force: true });
    }

    async findClientByEmail(email: string): Promise<Client> {
        return this.clientModel.findOne({ where: { email } });
    }

    async findClientById(id: number): Promise<any> {
        return this.clientModel.findByPk(id);
    }

    async findAllClients(pageSize: number, offset: number): Promise<Client[]> {
        return this.clientModel.findAll({ limit: pageSize, offset: offset, order: [['createdAt', 'DESC']], paranoid: false });
    }
}
