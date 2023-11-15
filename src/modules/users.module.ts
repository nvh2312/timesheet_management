import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from '../controllers/users.controller';
import { User } from '../models/users.model';
import { UserRepository } from '../repositories/users.repository';
import { UserService } from '../services/users.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports:[UserService]
})
export class UsersModule {}
