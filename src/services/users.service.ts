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
    // Check if email is exists, throw bad request
    const isExist = await this.userRepository.findUserByEmail(createUserDto.email);
    if (isExist) throw new HttpException('Email is already signed up', HttpStatus.CONFLICT);
    // Hash password from dto before create new user
    const hashedPassword = await hash(createUserDto.password, 10);
    const createUserDtoWithHashedPassword = { ...createUserDto, password: hashedPassword };
    // Create new user
    return this.userRepository.createUser(createUserDtoWithHashedPassword);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto, currentUser: User): Promise<User> {
    // Check if user is not admin and not owner, dto include role, throw not permission
    if (currentUser.role !== Role.Admin) {
      if (currentUser.id !== +id || updateUserDto.role)
        throw new HttpException('Not permission', HttpStatus.FORBIDDEN);
    }
    // If dto include email, return bad request
    if (updateUserDto.email) throw new HttpException('Cannot update email user', HttpStatus.BAD_REQUEST);
    // Update and return updated User
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
    // Get page and page size from request query
    const page = req.query?.page ?? 1;
    const pageSize = req.query?.limit ?? 5;
    const offset = (page - 1) * pageSize;
    // Get list users with paginate
    return this.userRepository.findAllUsers(pageSize, offset);
  }
  async deleteAllUsers(): Promise<Number> {
    return this.userRepository.deleteAllUsers();
  }
}
