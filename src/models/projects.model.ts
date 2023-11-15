import { AllowNull, BelongsTo, BelongsToMany, Column, DeletedAt, ForeignKey, HasMany, Length, Model, Table } from 'sequelize-typescript';
import { Client } from './clients.model';
import { User } from './users.model';
import { ProjectUser } from './projectUser.model';
import { Task } from './tasks.model';
import { TimeSheet } from './timesheets.model';

@Table
export class Project extends Model<Project> {
  @ForeignKey(() => Client)
  @AllowNull(false)
  @Column
  clientId: number;

  @Length({ min: 3, max: 100 })
  @Column
  name: string;

  @Length({ min: 3, max: 500 })
  @Column
  description: string;

  @Column({ defaultValue: false})
  status: boolean;

  @DeletedAt
  deletionDate: Date;

  @BelongsTo(() => Client)
  client: Client;

  @HasMany(() => Task)
  tasks: Task[];

  @HasMany(() => TimeSheet)
  timesheets: TimeSheet[];

  @BelongsToMany(() => User, {
    through:
      { model: () => ProjectUser }
  })
  users: User;
}
