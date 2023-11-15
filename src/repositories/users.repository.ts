import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/users.model';
import { CreateUserDto, UpdateUserDto } from '../dto/users.dto';
import { Op } from 'sequelize';
import { Role } from '../constant/enum';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const [affectedCount, users] = await this.userModel.update(updateUserDto, { where: { id }, returning: true });
    return users[0];
  }

  async deleteUser(id: number): Promise<number> {
    return this.userModel.destroy({ where: { id } });
  }

  async deleteAllUsers(): Promise<number> {
    // return this.userModel.destroy({ truncate: true });
    return this.userModel.destroy({ where: {}, force: true });
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ where: { email } });
  }

  async findUserById(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }

  async findAllUsers(pageSize: number, offset: number): Promise<User[]> {
    return this.userModel.findAll({
      where: {
        role: {
          [Op.not]: Role.Admin
        }
      }, limit: pageSize, offset: offset, order: [['createdAt', 'DESC']], attributes: { exclude: ['password'] }, paranoid: false
    });
  }
}
