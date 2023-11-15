import { Column, DeletedAt, HasMany, IsEmail, Length, Model, Table } from 'sequelize-typescript';
import { Project } from './projects.model';

@Table
export class Client extends Model<Client> {
  @IsEmail
  @Column({ unique: true })
  email: string;

  @Length({ min: 3, max: 100 })
  @Column
  name: string;

  @DeletedAt
  deletionDate: Date;

  @HasMany(() => Project)
  projects: Project[];
}
