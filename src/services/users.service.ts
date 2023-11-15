import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/users.repository';
import { CreateUserDto, UpdateUserDto } from '../dto/users.dto';
import { User } from '../models/users.model';
import { hash } from 'bcrypt';
import { Role } from '../constant/enum';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) { }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const isExist = await this.userRepository.findUserByEmail(createUserDto.email);
    if (isExist) throw new HttpException('Email is already signed up', HttpStatus.CONFLICT);
    const hashedPassword = await hash(createUserDto.password, 10);
    const createUserDtoWithHashedPassword = { ...createUserDto, password: hashedPassword };
    return this.userRepository.createUser(createUserDtoWithHashedPassword);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto, currentUser: User): Promise<User> {
    if (currentUser.role !== Role.Admin) {
      if (currentUser.id !== +id || updateUserDto.role)
        throw new HttpException('Not permission', HttpStatus.FORBIDDEN);
    }
    if (updateUserDto.email) throw new HttpException('Cannot update email user', HttpStatus.BAD_REQUEST);
    const user = await this.userRepository.updateUser(id, updateUserDto);
    return user;
  }

  async deleteUser(id: number): Promise<number> {
    return this.userRepository.deleteUser(id);
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findUserByEmail(email);
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findUserById(id);
    return user;
  }

  async findAllUsers(req: any): Promise<User[]> {
    const page = req.query?.page ?? 1;
    const pageSize = req.query?.limit ?? 5;
    const offset = (page - 1) * pageSize;
    return this.userRepository.findAllUsers(pageSize, offset);
  }
  async deleteAllUsers(): Promise<Number> {
    return this.userRepository.deleteAllUsers();
  }
}
