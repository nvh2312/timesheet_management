import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClientRepository } from '../repositories/clients.repository';
import { CreateClientDto, UpdateClientDto } from '../dto/clients.dto';
import { Client } from '../models/clients.model';

@Injectable()
export class ClientService {
    constructor(private ClientRepository: ClientRepository) { }

    async createClient(createClientDto: CreateClientDto): Promise<Client> {
        // Check mail exist
        const isExist = await this.ClientRepository.findClientByEmail(createClientDto.email);
        if (isExist) throw new HttpException('Email is already signed up', HttpStatus.CONFLICT);
        // Create new client
        return this.ClientRepository.createClient(createClientDto);
    }

    async updateClient(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
        // Check if the updateClientDto contains email field throw exception
        if (updateClientDto.email) throw new HttpException('Cannot update email Client', HttpStatus.BAD_REQUEST);
        // Update client with dto
        const Client = await this.ClientRepository.updateClient(id, updateClientDto);
        return Client;
    }

    async deleteClient(id: number): Promise<number> {
        return this.ClientRepository.deleteClient(id);
    }

    async findClientByEmail(email: string): Promise<Client> {
        return this.ClientRepository.findClientByEmail(email);
    }

    async findClientById(id: number): Promise<Client> {
        const client = await this.ClientRepository.findClientById(id);
        return client;
    }

    async findAllClients(req: any): Promise<Client[]> {
        // Get page and pageSize from request query
        const page = req.query?.page ?? 1;
        const pageSize = req.query?.limit ?? 5;
        const offset = (page - 1) * pageSize;
        // Get list of clients with pagesize and offset
        return this.ClientRepository.findAllClients(pageSize, offset);
    }
    async deleteAllClients(): Promise<Number> {
        return this.ClientRepository.deleteAllClients();
    }
}
