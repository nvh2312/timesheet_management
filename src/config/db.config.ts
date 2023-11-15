import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { config } from 'dotenv';

config();

export const databaseConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadModels: true,
  synchronize: true,
  logging: process.env.NODE_ENV !== 'production',
};