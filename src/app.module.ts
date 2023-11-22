import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './config/db.config';
import { UsersModule } from './modules/users.module';
import { AuthModule } from './modules/auth.module';
import { ClientsModule } from './modules/clients.module';
import { ProjectsModule } from './modules/projects.module';
import { ProjectUsersModule } from './modules/projectUser.module';
import { TasksModule } from './modules/tasks.module';
import { TimeSheetsModule } from './modules/timesheets.module';
import { LoggerModule } from './modules/logger.module';

@Module({
  imports: [
    SequelizeModule.forRoot(databaseConfig),
    AuthModule,
    UsersModule,
    ClientsModule,
    ProjectsModule,
    ProjectUsersModule,
    TasksModule,
    TimeSheetsModule,
    LoggerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }